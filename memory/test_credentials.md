# Test Credentials

No authentication/login system exists in this app — it is a public personal portfolio
website with no user accounts.

## Third-party service credentials (in /app/backend/.env)
- RESEND_API_KEY: re_WAzjjoZb_3UMMHWuDebb1aviqWponBdvD (active, verified working — previous key re_JPb1U6Gt_6t44bg9bAtPEy7cSrEgMAZJr was revoked/invalidated on Resend's side)
- SENDER_EMAIL: onboarding@resend.dev
- RECIPIENT_EMAIL: daindannyr@gmail.com (contact form submissions are emailed here)

## Database
- MONGO_URL: mongodb://localhost:27017
- DB_NAME: dain_portfolio
- Collection: contact_messages (stores all contact form submissions)
