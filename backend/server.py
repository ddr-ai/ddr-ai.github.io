import os
import asyncio
import logging
from datetime import datetime, UTC
from typing import Annotated, Any, Optional

import resend
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(ROOT_DIR, ".env"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Mongo setup ---
mongo_client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = mongo_client[os.environ["DB_NAME"]]

# --- Resend setup ---
resend.api_key = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL")


def _validate_object_id(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str):
        return v
    raise ValueError("Invalid ObjectId")


PyObjectId = Annotated[str, BeforeValidator(_validate_object_id)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc is None:
            return None
        return cls(**doc)

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude={"id"})
        return data


class ContactMessage(BaseDocument):
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)


class ContactResponse(BaseModel):
    status: str
    message: str


app = FastAPI(title="Dain Ramnauth Portfolio API")
api_router = APIRouter(prefix="/api")

CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api_router.get("/health")
async def health_check():
    return {"status": "ok"}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest):
    contact = ContactMessage(name=payload.name, email=payload.email, message=payload.message)
    await db.contact_messages.insert_one(contact.to_mongo())

    if not resend.api_key or not RECIPIENT_EMAIL:
        logger.warning("Resend not fully configured; skipping email send.")
        return ContactResponse(status="success", message="Message received.")

    html_content = f"""
    <table style="width:100%;font-family:monospace;">
      <tr><td style="padding:8px 0;color:#64748B;">From</td><td style="padding:8px 0;color:#1E293B;"><b>{payload.name}</b> ({payload.email})</td></tr>
      <tr><td style="padding:8px 0;color:#64748B;vertical-align:top;">Message</td><td style="padding:8px 0;color:#1E293B;white-space:pre-wrap;">{payload.message}</td></tr>
    </table>
    """
    params = {
        "from": f"Portfolio Contact <{SENDER_EMAIL}>",
        "to": [RECIPIENT_EMAIL],
        "reply_to": payload.email,
        "subject": f"New portfolio message from {payload.name}",
        "html": html_content,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        raise HTTPException(status_code=500, detail="Message saved but email delivery failed.")

    return ContactResponse(status="success", message="Message sent successfully.")


app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    mongo_client.close()
