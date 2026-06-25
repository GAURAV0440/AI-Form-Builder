from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.form import Form
from app.models.field import Field
from app.schemas.form import FormCreate

router = APIRouter(
    prefix="/forms",
    tags=["Forms"]
)


@router.post("/")
def create_form(
    data: FormCreate,
    db: Session =Depends(get_db)
):
    form = Form(
        title=data.title,
        description=data.description,
        created_by=1,
        status="draft"
    )

    db.add(form)
    db.flush()

    for item in data.fields:
        field = Field(
            form_id=form.id,
            label=item.label,
            field_type=item.field_type,
            required=item.required,
            placeholder=item.placeholder,
            options=item.options,
            field_order=item.field_order
        )
        db.add(field)

    db.commit()
    db.refresh(form)

    return {
        "message": "Form created successfully",
        "form_id": form.id
    }


@router.get("/")
def get_forms(
    db: Session = Depends(get_db)
):
    forms = db.query(Form).all()

    return forms

@router.delete("/{form_id}")
def delete_form(
    form_id: str,
    db: Session = Depends(get_db)
):
    form = (
        db.query(Form)
        .filter(Form.id == form_id)
        .first()
    )

    if not form:
        return {
            "message": "Form not found"
        }

    db.delete(form)
    db.commit()

    return {
        "message": "Form deleted successfully"
    }

@router.get("/{form_id}")
def get_form(
    form_id: str,
    db: Session = Depends(get_db)
):
    form = (
        db.query(Form)
        .filter(Form.id == form_id)
        .first()
    )

    if not form:
        return {
            "message": "Form not found"
        }

    fields = (
        db.query(Field)
        .filter(Field.form_id == form_id)
        .order_by(Field.field_order)
        .all()
    )

    return {
        "id": form.id,
        "title": form.title,
        "description": form.description,
        "created_by": form.created_by,
        "status": form.status,
        "created_at": form.created_at,
        "fields": [
            {
                "id": field.id,
                "label": field.label,
                "field_type": field.field_type,
                "required": field.required,
                "placeholder": field.placeholder,
                "options": field.options,
                "field_order": field.field_order,
            }
            for field in fields
        ],
    }