# Maharashtra AI Agents Platform - Backend (FastAPI)

This backend provides REST APIs for authentication, chat, feedback, document upload, and AI guidance/document processing (API v1).

Features:
- FastAPI app with OpenAPI at /docs
- CORS allowing http://localhost:3000 by default (configurable via CORS_ORIGINS)
- JWT authentication (stub login)
- Repository-based data access with feature flag:
  - Simulated in-memory repositories (default)
  - MongoDB via Motor when USE_SIMULATED_DB=false
- Endpoints:
  - POST /auth/login
  - POST /chat/send (protected)
  - POST /feedback (protected)
  - POST /documents/upload (protected, multipart)
  - POST /api/v1/guide (protected)
  - POST /api/v1/document/process (protected)

Environment variables (set in .env):
- USE_SIMULATED_DB (true|false) — default true
- MONGODB_URI
- MONGODB_DB_NAME
- JWT_SECRET_KEY  (JWT_SECRET also accepted; prefer JWT_SECRET_KEY)
- CORS_ORIGINS (optional, default: http://localhost:3000)

## Setup

1) Create a virtual environment and install dependencies:
```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2) Configure environment:
- Copy `.env.example` (see mumbairfp/BackendContainer/.env.example) to `.env` and set values.
- To run without MongoDB, keep `USE_SIMULATED_DB=true` (default when missing).
- To use MongoDB, set `USE_SIMULATED_DB=false` and configure Mongo vars.
- Optionally initialize DB collections using the provided script:
  See: mumbairfp/BackendContainer/db/README.md

3) Run server:
```
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Open API docs at:
- http://localhost:8000/docs

## Frontend Integration

- Frontend should set REACT_APP_API_BASE to the backend base URL (e.g., http://localhost:8000).
- Non-versioned endpoints used by the frontend: /auth/login, /chat/send, /documents/upload, /feedback.
- Versioned endpoints under /api/v1 (e.g., /api/v1/guide) remain available for future integration.

## Notes

- Authentication is stubbed: any non-empty password is accepted. Replace with real user verification and password hashing.
- Document and guidance services are placeholders. Integrate LLMs and extraction pipelines as needed.
- In-memory mode resets data on server restart.
