import os

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.form import Form
from app.models.field import Field
from app.services.extractor import extract_text
from app.services.nia_service import extract_form_data

router = APIRouter(
    prefix="/extract",
    tags=["AI Extraction"]
)


@router.post("/{form_id}")
def extract_document(
    form_id: str,
    filename: str,
    db: Session = Depends(get_db)
):

    form = db.query(Form).filter(
        Form.id == form_id
    ).first()

    if not form:
        raise HTTPException(
            status_code=404,
            detail="Form not found"
        )

    fields = (
        db.query(Field)
        .filter(Field.form_id == form_id)
        .order_by(Field.field_order)
        .all()
    )

    form_fields = []

    for field in fields:
        form_fields.append(
            {
                "label": field.label,
                "type": field.field_type,
                "required": field.required
            }
        )

    file_path = os.path.join(
        "app/uploads",
        filename
    )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Uploaded file not found"
        )

    document_text = extract_text(file_path)
    print(document_text[:1000])
    
    ai_result = extract_form_data(
        document_text=document_text,
        form_fields=form_fields
    )

    return {
        "form_id": form_id,
        "title": form.title,
        "fields": [
            {
                "id": field.id,
                "label": field.label,
                "field_type": field.field_type,
                "required": field.required,
                "options": field.options,
                "order": field.field_order
            }
            for field in fields
        ],
        "autofill": ai_result
    }