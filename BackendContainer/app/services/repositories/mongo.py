from __future__ import annotations
from typing import Any, Dict
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from .interfaces import UsersRepo, ConversationsRepo, FeedbackRepo, DocumentsRepo, InsertResult

class _UsersMongo(UsersRepo):
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self._db = db

    async def create_stub_if_missing(self, username: str, language: str = "en") -> Dict[str, Any]:
        users = self._db.get_collection("users")
        existing = await users.find_one({"username": username})
        if existing:
            return existing
        doc = {
            "username": username,
            "language": language,
            "preferences": {},
            "created_at": datetime.now(timezone.utc),
        }
        res = await users.insert_one(doc)
        created = await users.find_one({"_id": res.inserted_id})
        return created or {**doc, "_id": res.inserted_id}

class _ConversationsMongo(ConversationsRepo):
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self._db = db

    async def add_conversation(self, doc: Dict[str, Any]) -> InsertResult:
        res = await self._db.get_collection("conversations").insert_one(doc)
        return InsertResult(inserted_id=str(res.inserted_id))

class _FeedbackMongo(FeedbackRepo):
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self._db = db

    async def add_audit_log(self, doc: Dict[str, Any]) -> InsertResult:
        res = await self._db.get_collection("audit_logs").insert_one(doc)
        return InsertResult(inserted_id=str(res.inserted_id))

class _DocumentsMongo(DocumentsRepo):
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self._db = db

    async def add_document_meta(self, doc: Dict[str, Any]) -> InsertResult:
        res = await self._db.get_collection("documents").insert_one(doc)
        return InsertResult(inserted_id=str(res.inserted_id))

class MongoRepoBundle:
    """Aggregates mongo repositories."""
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self.users = _UsersMongo(db)
        self.conversations = _ConversationsMongo(db)
        self.feedback = _FeedbackMongo(db)
        self.documents = _DocumentsMongo(db)
