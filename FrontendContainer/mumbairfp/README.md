# Maharashtra AI Agents Platform - Monorepo

This repository contains:
- BackendContainer: FastAPI backend
- FrontendContainer: React frontend

## Quick Start

Backend (FastAPI):
1. cd mumbairfp/BackendContainer
2. python3 -m venv .venv && source .venv/bin/activate
3. pip install -r requirements.txt
4. cp .env.example .env and set:
   - MONGODB_URI
   - MONGODB_DB_NAME
   - JWT_SECRET_KEY
   - CORS_ORIGINS (optional, defaults to http://localhost:3000)
5. Run: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
6. Docs: http://localhost:8000/docs

Frontend (React):
1. cd mumbairfp/FrontendContainer
2. cp .env.example .env and set REACT_APP_API_BASE (e.g., http://localhost:8000)
3. npm install
4. npm start (http://localhost:3000)

## Endpoints

Frontend uses non-versioned endpoints:
- POST /auth/login
- POST /chat/send
- POST /documents/upload
- POST /feedback

Versioned endpoints (available for future integration):
- POST /api/v1/guide
- POST /api/v1/document/process
