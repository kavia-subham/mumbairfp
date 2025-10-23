from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from app.models.schemas import ChatRequest, ChatResponse
from app.core.security import get_current_user
from app.services.db import get_repositories

router = APIRouter()

@router.post(
    "/chat/send",
    response_model=ChatResponse,
    summary="Send chat or voice message",
    description="Protected route. Stores conversation and returns AI stub response",
)
async def send_chat(req: ChatRequest, username: str = Depends(get_current_user)):
    """
    Accept a chat message, store it in the conversations repository, and return a stub assistant response.

    Args:
        req (ChatRequest): Message text and language.
        username (str): Derived from JWT token.

    Returns:
        ChatResponse: Assistant response and language.
    """
    repos = get_repositories()
    # Ensure user exists (simulated or mongo)
    await repos.users.create_stub_if_missing(username=username, language=req.language)

    convo_doc = {
        "user_id": None,  # Placeholder in both modes
        "channel": "web",
        "messages": [{"role": "user", "text": req.message, "ts": datetime.now(timezone.utc).isoformat()}],
        "language": req.language,
        "timestamp": datetime.now(timezone.utc)
    }
    await repos.conversations.add_conversation(convo_doc)
    ai_response = f"[{req.language.upper()}] Hello {username}, you said: '{req.message}'. This is a stub response."
    return ChatResponse(response=ai_response, language=req.language)
