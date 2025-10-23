from __future__ import annotations
from typing import Protocol, Any, Dict, List, Optional
from dataclasses import dataclass

@dataclass
class InsertResult:
    inserted_id: str

# PUBLIC_INTERFACE
class UsersRepo(Protocol):
    """Repository interface for user-related operations."""
    async def create_stub_if_missing(self, username: str, language: str = "en") -> Dict[str, Any]:
        """Create a stub user if not exists; return user document."""

# PUBLIC_INTERFACE
class ConversationsRepo(Protocol):
    """Repository interface for conversations."""
    async def add_conversation(self, doc: Dict[str, Any]) -> InsertResult:
        """Insert a conversation document."""

# PUBLIC_INTERFACE
class FeedbackRepo(Protocol):
    """Repository interface for feedback/audit logs."""
    async def add_audit_log(self, doc: Dict[str, Any]) -> InsertResult:
        """Insert an audit log entry."""

# PUBLIC_INTERFACE
class DocumentsRepo(Protocol):
    """Repository interface for documents metadata if needed."""
    async def add_document_meta(self, doc: Dict[str, Any]) -> InsertResult:
        """Insert a document metadata record."""

# PUBLIC_INTERFACE
class RepoBundle(Protocol):
    """Group of repositories provided by a backend (mongo or simulated)."""
    users: UsersRepo
    conversations: ConversationsRepo
    feedback: FeedbackRepo
    documents: DocumentsRepo
