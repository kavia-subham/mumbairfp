# Maharashtra AI Agents Platform - Backend (FastAPI)

This backend provides REST APIs for authentication, chat, feedback, document upload, and AI guidance/document processing (API v1).

Features:
- FastAPI app with OpenAPI at /docs
- CORS allowing http://localhost:3000
- JWT authentication (stub login)
- Motor (MongoDB) connection using env MONGODB_URI and MONGODB_DB_NAME
- Endpoints:
  - POST /auth/login
  - POST /chat/send (protected)
  - POST /feedback (protected)
  - POST /documents/upload (protected, multipart)
  - POST /api/v1/guide (protected)
  - POST /api/v1/document/process (protected)

Environment variables:
- MONGODB_URI
- MONGODB_DB_NAME
- JWT_SECRET_KEY
- CORS_ORIGINS (optional, default: http://localhost:3000)

## Setup

1) Create a virtual environment and install dependencies:
```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2) Configure environment:
- Copy `.env.example` to `.env` and set values.
- Ensure MongoDB is running and accessible.
- Optionally initialize DB collections using the provided script:
  See: mumbairfp/BackendContainer/db/README.md

3) Run server:
```
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Open API docs at:
- http://localhost:8000/docs

## Notes

- Authentication is stubbed: any non-empty password is accepted. Replace with real user verification and password hashing.
- Document and guidance services are placeholders. Integrate LLMs and extraction pipelines as needed.
