from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from app.models.schemas import ChatRequest, ChatResponse
from app.core.security import get_current_user
from app.services.db import get_db

router = APIRouter()

@router.post(
    "/chat/send",
    response_model=ChatResponse,
    summary="Send chat or voice message",
    description="Protected route. Stores conversation and returns AI stub response",
)
async def send_chat(req: ChatRequest, username: str = Depends(get_current_user)):
    """
    Accept a chat message, store it in the conversations collection, and return a stub assistant response.

    Args:
        req (ChatRequest): Message text and language.
        username (str): Derived from JWT token.

    Returns:
        ChatResponse: Assistant response and language.
    """
    db = get_db()
    convo_doc = {
        "user_id": None,
        "channel": "web",
        "messages": [{"role": "user", "text": req.message, "ts": datetime.now(timezone.utc).isoformat()}],
        "language": req.language,
        "timestamp": datetime.now(timezone.utc)
    }
    await db.get_collection("conversations").insert_one(convo_doc)
    ai_response = f"[{req.language.upper()}] Hello {username}, you said: '{req.message}'. This is a stub response."
    return ChatResponse(response=ai_response, language=req.language)
