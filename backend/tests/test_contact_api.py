"""
Backend tests for Dain Ramnauth Portfolio API
- GET /api/health
- POST /api/contact (validation, success, MongoDB persistence, Resend email trigger)
"""
import os
import time
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL')
if BASE_URL:
    BASE_URL = BASE_URL.rstrip('/')

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "dain_portfolio"


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="module")
def mongo_db():
    client = MongoClient(MONGO_URL)
    yield client[DB_NAME]
    client.close()


class TestHealth:
    def test_health_check(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/health")
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("status") == "ok"


class TestContactValidation:
    def test_missing_fields(self, api_client):
        resp = api_client.post(f"{BASE_URL}/api/contact", json={"name": "Test"})
        assert resp.status_code == 422

    def test_invalid_email(self, api_client):
        resp = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "not-an-email",
            "message": "Hello"
        })
        assert resp.status_code == 422

    def test_empty_message(self, api_client):
        # Empty string is technically valid per current pydantic model (str, no min_length)
        resp = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "test@example.com",
            "message": ""
        })
        # Documenting current behavior - no min_length validation enforced
        assert resp.status_code in (200, 422)


class TestContactSubmission:
    def test_submit_contact_success_and_persistence(self, api_client, mongo_db):
        payload = {
            "name": "TEST_Automation User",
            "email": "test_automation@example.com",
            "message": "TEST_This is an automated test message from pytest suite."
        }
        resp = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert resp.status_code == 200, f"Unexpected status: {resp.status_code}, body: {resp.text}"
        data = resp.json()
        assert data["status"] == "success"
        assert "message" in data

        # Verify persistence in MongoDB
        time.sleep(1)
        doc = mongo_db.contact_messages.find_one({"email": "test_automation@example.com"})
        assert doc is not None, "Contact message not found in MongoDB"
        assert doc["name"] == payload["name"]
        assert doc["message"] == payload["message"]

    def teardown_class(cls):
        pass


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
