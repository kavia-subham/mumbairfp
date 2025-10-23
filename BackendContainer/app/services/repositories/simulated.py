from __future__ import annotations
from typing import Dict, Any
from datetime import datetime, timezone
from uuid import uuid4

from .interfaces import UsersRepo, ConversationsRepo, FeedbackRepo, DocumentsRepo, InsertResult

class _UsersSim(UsersRepo):
    def __init__(self, store: Dict[str, Dict[str, Any]]) -> None:
        self._store = store  # key: username

    async def create_stub_if_missing(self, username: str, language: str = "en") -> Dict[str, Any]:
        user = self._store.get(username)
        if not user:
            user = {
                "_id": str(uuid4()),
                "username": username,
                "language": language,
                "preferences": {},
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
            self._store[username] = user
        return user

class _ConversationsSim(ConversationsRepo):
    def __init__(self, coll: Dict[str, Dict[str, Any]]) -> None:
        self._coll = coll  # id -> doc

    async def add_conversation(self, doc: Dict[str, Any]) -> InsertResult:
        _id = str(uuid4())
        new_doc = dict(doc)
        new_doc["_id"] = _id
        self._coll[_id] = new_doc
        return InsertResult(inserted_id=_id)

class _FeedbackSim(FeedbackRepo):
    def __init__(self, coll: Dict[str, Dict[str, Any]]) -> None:
        self._coll = coll

    async def add_audit_log(self, doc: Dict[str, Any]) -> InsertResult:
        _id = str(uuid4())
        new_doc = dict(doc)
        new_doc["_id"] = _id
        self._coll[_id] = new_doc
        return InsertResult(inserted_id=_id)

class _DocumentsSim(DocumentsRepo):
    def __init__(self, coll: Dict[str, Dict[str, Any]]) -> None:
        self._coll = coll

    async def add_document_meta(self, doc: Dict[str, Any]) -> InsertResult:
        _id = str(uuid4())
        new_doc = dict(doc)
        new_doc["_id"] = _id
        self._coll[_id] = new_doc
        return InsertResult(inserted_id=_id)

class SimulatedRepoBundle:
    """Aggregates simulated repositories with in-memory collections."""
    def __init__(self) -> None:
        self._users_store: Dict[str, Dict[str, Any]] = {}
        self._conversations_store: Dict[str, Dict[str, Any]] = {}
        self._audit_store: Dict[str, Dict[str, Any]] = {}
        self._documents_store: Dict[str, Dict[str, Any]] = {}

        self.users = _UsersSim(self._users_store)
        self.conversations = _ConversationsSim(self._conversations_store)
        self.feedback = _FeedbackSim(self._audit_store)
        self.documents = _DocumentsSim(self._documents_store)
