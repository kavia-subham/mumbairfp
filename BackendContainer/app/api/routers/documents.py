from fastapi import APIRouter, UploadFile, File, Depends
from app.core.security import get_current_user
from app.models.schemas import DocumentUploadResponse
from app.services.document_service import process_document

router = APIRouter()

@router.post(
    "/documents/upload",
    response_model=DocumentUploadResponse,
    summary="Upload document",
    description="Protected route to upload a document and receive extractedData",
)
async def upload_document(file: UploadFile = File(...), username: str = Depends(get_current_user)):
    """
    Upload a document as multipart/form-data and process it.

    Args:
        file (UploadFile): uploaded file in multipart.
        username (str): authenticated user.

    Returns:
        DocumentUploadResponse: extractedData stub.
    """
    result = await process_document(file)
    return DocumentUploadResponse(**result)
