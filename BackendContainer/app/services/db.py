from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional
from app.core.config import settings

_client: Optional[AsyncIOMotorClient] = None
_db: Optional[AsyncIOMotorDatabase] = None

# PUBLIC_INTERFACE
async def connect_to_mongo() -> None:
    """Create global MongoDB (motor) client and database connection."""
    global _client, _db
    if _client is None:
        _client = AsyncIOMotorClient(settings.MONGODB_URI)
        _db = _client[settings.MONGODB_DB_NAME]

# PUBLIC_INTERFACE
async def close_mongo_connection() -> None:
    """Close MongoDB connection on shutdown."""
    global _client
    if _client:
        _client.close()
        _client = None

# PUBLIC_INTERFACE
def get_db() -> AsyncIOMotorDatabase:
    """Return motor database instance. Ensure connect_to_mongo is called on startup."""
    assert _db is not None, "Database not initialized. Ensure startup event executed."
    return _db
