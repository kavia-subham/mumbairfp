from datetime import datetime, timezone
from typing import Dict, Any
from app.services.db import get_repositories

# PUBLIC_INTERFACE
async def store_feedback(username: str, feedback: str, rating: int | None) -> Dict[str, Any]:
    """
    Store user feedback with optional rating.

    Args:
        username: The username from JWT subject.
        feedback: Feedback text.
        rating: Optional rating.

    Returns:
        Inserted document details.
    """
    repos = get_repositories()
    # Ensure user exists (simulated or mongo)
    await repos.users.create_stub_if_missing(username=username)
    payload = {
        "action": "feedback_submit",
        "details": {
            "username": username,
            "feedback": feedback,
            "rating": rating,
        },
        "timestamp": datetime.now(timezone.utc),
    }
    res = await repos.feedback.add_audit_log(payload)
    return {"id": res.inserted_id}
