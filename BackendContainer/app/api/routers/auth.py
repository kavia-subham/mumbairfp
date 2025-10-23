from datetime import timedelta
from fastapi import APIRouter, HTTPException, status, Depends
from app.models.schemas import LoginRequest, LoginResponse
from app.core.security import create_access_token
from app.core.config import settings

router = APIRouter()

@router.post(
    "/login",
    response_model=LoginResponse,
    summary="User login",
    description="Authenticate user and return JWT token",
)
async def login(payload: LoginRequest):
    """
    Authenticate a user and return a JWT bearer token.

    Parameters:
        payload (LoginRequest): username and password.

    Returns:
        LoginResponse: token string.

    Notes:
        - This is a stub authenticator. Any username/password is accepted if password is not empty.
        - Replace with real user verification against MongoDB users collection.
    """
    if not payload.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(
        subject=payload.username,
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return LoginResponse(token=token)
