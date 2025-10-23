from typing import Optional, Any, Dict, List
from pydantic import BaseModel, Field

# Authentication
class LoginRequest(BaseModel):
    username: str = Field(..., description="Username for login")
    password: str = Field(..., description="Password for login")

class LoginResponse(BaseModel):
    token: str = Field(..., description="JWT bearer token")

# Chat
class ChatRequest(BaseModel):
    message: str = Field(..., description="Message from the user")
    language: str = Field(..., description="Language code (e.g., en, hi, mr)")

class ChatResponse(BaseModel):
    response: str = Field(..., description="Assistant response")
    language: str = Field(..., description="Response language code")

# Feedback
class FeedbackRequest(BaseModel):
    feedback: str = Field(..., description="Feedback provided by user")
    rating: Optional[int] = Field(None, description="Optional rating 1-5")

class FeedbackResponse(BaseModel):
    status: str = Field(..., description="Submission status")

# Guidance (API v1)
class GuidanceRequest(BaseModel):
    userId: str = Field(..., description="Unique identifier for the user")
    query: str = Field(..., description="User's guidance query")
    language: str = Field(..., description="Preferred language for response")

class GuidanceResponse(BaseModel):
    response: str = Field(..., description="AI-generated guidance response")
    language: str = Field(..., description="Language of the response")

# Document processing (API v1)
class DocumentProcessingResponse(BaseModel):
    extractedData: Dict[str, Any] = Field(..., description="Structured data extracted from the document")

# Documents upload (frontend integration)
class DocumentUploadResponse(BaseModel):
    extractedData: Dict[str, Any] = Field(..., description="Structured data extracted from uploaded document")
