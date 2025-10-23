from datetime import datetime, timezone
from typing import Dict, Any
from bson import ObjectId
from app.services.db import get_db

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
    db = get_db()
    doc = {
        "username": username,
        "feedback": feedback,
        "rating": rating,
        "timestamp": datetime.now(timezone.utc),
    }
    res = await db.get_collection("audit_logs").insert_one({
        "user_id": ObjectId(),  # Placeholder; in a real system map to users._id
        "action": "feedback_submit",
        "details": doc,
        "timestamp": datetime.now(timezone.utc),
    })
    return {"id": str(res.inserted_id)}
