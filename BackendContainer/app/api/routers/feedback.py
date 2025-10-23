from fastapi import APIRouter, Depends
from app.models.schemas import FeedbackRequest, FeedbackResponse
from app.core.security import get_current_user
from app.services.feedback_service import store_feedback

router = APIRouter()

@router.post(
    "/feedback",
    response_model=FeedbackResponse,
    summary="Submit user feedback",
    description="Protected route to submit feedback and optional rating",
)
async def submit_feedback(req: FeedbackRequest, username: str = Depends(get_current_user)):
    """
    Store user feedback.

    Args:
        req (FeedbackRequest): feedback text and optional rating.
        username (str): current user from JWT.

    Returns:
        FeedbackResponse: status of operation.
    """
    await store_feedback(username=username, feedback=req.feedback, rating=req.rating)
    return FeedbackResponse(status="ok")
