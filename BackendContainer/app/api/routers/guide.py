from fastapi import APIRouter, Depends, UploadFile, File
from app.core.security import get_current_user
from app.models.schemas import GuidanceRequest, GuidanceResponse, DocumentProcessingResponse
from app.services.guidance_service import generate_guidance
from app.services.document_service import process_document

router = APIRouter()

@router.post(
    "/guide",
    response_model=GuidanceResponse,
    summary="Get AI-powered guidance",
    description="Protected route that accepts GuidanceRequest and returns GuidanceResponse",
)
async def guide(req: GuidanceRequest, _: str = Depends(get_current_user)):
    """
    Provide AI-powered guidance (stub implementation).

    Args:
        req (GuidanceRequest): userId, query, and language.

    Returns:
        GuidanceResponse: response text and language.
    """
    return await generate_guidance(req)

@router.post(
    "/document/process",
    response_model=DocumentProcessingResponse,
    summary="Process unstructured documents",
    description="Protected route that accepts multipart file and returns extractedData",
)
async def document_process(file: UploadFile = File(...), _: str = Depends(get_current_user)):
    """
    Process document (stub) as per API v1.

    Args:
        file (UploadFile): uploaded file.

    Returns:
        DocumentProcessingResponse: extractedData with basic metadata.
    """
    result = await process_document(file)
    return DocumentProcessingResponse(**result)
