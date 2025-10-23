from typing import Dict, Any
from fastapi import UploadFile

# PUBLIC_INTERFACE
async def process_document(file: UploadFile) -> Dict[str, Any]:
    """
    Stub document processing. Reads first bytes and returns fake structure.

    Args:
        file: UploadFile from multipart.

    Returns:
        Dict with extractedData containing filename, contentType, size (bytes read), and samplePreview.
    """
    content = await file.read(4096)
    size_guess = len(content)
    preview = content[:64].hex() if content else ""
    return {
        "extractedData": {
            "filename": file.filename,
            "contentType": file.content_type,
            "sizePreviewBytes": size_guess,
            "samplePreviewHex": preview,
        }
    }
