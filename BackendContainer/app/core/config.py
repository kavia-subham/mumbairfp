import os
from pydantic import BaseModel
from functools import lru_cache

class Settings(BaseModel):
    """Application settings loaded from environment variables."""
    APP_NAME: str = "AI Coach REST API"
    APP_VERSION: str = "1.0.0"
    # Prefer JWT_SECRET_KEY; support JWT_SECRET as fallback
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", os.getenv("JWT_SECRET", "change-me-in-production"))
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "ai_agents_platform_db")

    # Feature flag: when true, run with in-memory simulated repositories and no MongoDB dependency.
    USE_SIMULATED_DB: bool = os.getenv("USE_SIMULATED_DB", "true").lower() in ("1", "true", "yes", "y", "on")

    # CORS allowed origins
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000")

@lru_cache()
def get_settings() -> Settings:
    """Return cached settings."""
    return Settings()

settings = get_settings()

openapi_tags = [
    {"name": "Authentication", "description": "JWT-based authentication and session management"},
    {"name": "Chat", "description": "Chat endpoints"},
    {"name": "Feedback", "description": "User feedback submission and storage"},
    {"name": "Documents", "description": "Document upload and processing"},
    {"name": "Guidance and Processing", "description": "AI Guidance and Document processing (API v1)"},
]
