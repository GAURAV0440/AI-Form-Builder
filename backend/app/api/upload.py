import os
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.core.config import settings

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg"
}


@router.post("/")
async def upload_document(
    file: UploadFile = File(...)
):

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    os.makedirs(
        settings.UPLOAD_FOLDER,
        exist_ok=True
    )

    filename = f"{uuid.uuid4()}{extension}"

    filepath = os.path.join(
        settings.UPLOAD_FOLDER,
        filename
    )

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "File uploaded successfully",
        "filename": filename,
        "filepath": filepath
    }