from typing import Optional, cast
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import settings
from .repositories.interfaces import RepoBundle
from .repositories.simulated import SimulatedRepoBundle
from .repositories.mongo import MongoRepoBundle

_client: Optional[AsyncIOMotorClient] = None
_db: Optional[AsyncIOMotorDatabase] = None
_repos: Optional[RepoBundle] = None

# PUBLIC_INTERFACE
async def connect_to_backend() -> None:
    """
    Initialize backend data layer:
    - If USE_SIMULATED_DB=true (default), create in-memory repositories.
    - Else connect to MongoDB (Motor) and create mongo repositories.
    """
    global _client, _db, _repos
    if settings.USE_SIMULATED_DB:
        _client = None
        _db = None
        _repos = cast(RepoBundle, SimulatedRepoBundle())
    else:
        if _client is None:
            _client = AsyncIOMotorClient(settings.MONGODB_URI)
            _db = _client[settings.MONGODB_DB_NAME]
        _repos = cast(RepoBundle, MongoRepoBundle(_db))  # type: ignore[arg-type]

# PUBLIC_INTERFACE
async def close_backend() -> None:
    """Close MongoDB client if used; simulated backend needs no cleanup."""
    global _client
    if _client:
        _client.close()
        _client = None

# PUBLIC_INTERFACE
def get_repositories() -> RepoBundle:
    """
    Return repository bundle for current mode.

    Raises:
        AssertionError: if connect_to_backend has not been called on startup.
    """
    assert _repos is not None, "Backend not initialized. Ensure startup event executed."
    return _repos
