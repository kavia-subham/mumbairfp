# Maharashtra AI Agents Platform - Frontend

This frontend is a minimal React app wired to the FastAPI backend.

## Environment

Copy `.env.example` to `.env` and adjust as needed:
```
REACT_APP_API_BASE=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:3001/ws
```

- REACT_APP_API_BASE: Base URL of the backend. If you run uvicorn on 8000 locally, use `http://localhost:8000`.
- REACT_APP_WS_URL: Reserved for future WebSocket integration. Backend stub exposes no WS endpoints currently.

## Dev Run

```
npm install
npm start
```

The app will run on http://localhost:3000

Ensure backend is running (default http://localhost:8000).

## Endpoint Mapping

The frontend calls the following backend endpoints relative to REACT_APP_API_BASE:
- POST /auth/login
- POST /chat/send
- POST /documents/upload
- POST /feedback

Versioned endpoints under /api/v1 (e.g., /api/v1/guide) are not used by the current UI but remain available for future features.
