from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings, openapi_tags
from app.api.routers.auth import router as auth_router
from app.api.routers.feedback import router as feedback_router
from app.api.routers.documents import router as documents_router
from app.api.routers.guide import router as guide_router
from app.api.routers.chat import router as chat_router
from app.services.db import connect_to_backend, close_backend

# PUBLIC_INTERFACE
def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application.

    Returns:
        FastAPI: Configured app with middleware, routers, and startup/shutdown events.
    """
    app = FastAPI(
        title="AI Coach REST API",
        description="AI-powered guidance and document processing API for Maharashtra Government citizen services",
        version="1.0.0",
        openapi_tags=openapi_tags
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
    app.include_router(chat_router, tags=["Chat"])
    app.include_router(feedback_router, tags=["Feedback"])
    app.include_router(documents_router, tags=["Documents"])
    app.include_router(guide_router, prefix="/api/v1", tags=["Guidance and Processing"])

    # Backend lifecycle (simulated or mongo based on USE_SIMULATED_DB)
    @app.on_event("startup")
    async def startup_event():
        await connect_to_backend()

    @app.on_event("shutdown")
    async def shutdown_event():
        await close_backend()

    # WebSocket usage help placeholder (requirement mentions documenting websockets if any)
    @app.get("/ws-info", summary="WebSocket usage info", tags=["Guidance and Processing"])
    async def ws_info():
        """
        WebSocket usage information.

        Returns:
            dict: A simple note indicating that there are no WebSocket endpoints in this stub.
        """
        return {"message": "No WebSocket endpoints are exposed in this implementation."}

    return app


app = create_app()
