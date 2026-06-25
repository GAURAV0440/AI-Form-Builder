from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.response import Response

router = APIRouter(
    prefix="/responses",
    tags=["Responses"]
)


@router.post("/")
def submit_response(
    data: dict,
    db: Session = Depends(get_db)
):
    response = Response(
        form_id=data["form_id"],
        response_data=data["responses"]
    )

    db.add(response)
    db.commit()
    db.refresh(response)

    return {
        "message": "Response submitted successfully"
    }

@router.delete("/{response_id}")
def delete_response(
    response_id: int,
    db: Session = Depends(get_db)
):
    response = (
        db.query(Response)
        .filter(Response.id == response_id)
        .first()
    )

    if not response:
        raise HTTPException(
            status_code=404,
            detail="Response not found"
        )

    db.delete(response)
    db.commit()

    return {
        "message": "Response deleted successfully"
    }

@router.get("/")
def get_responses(
    db: Session = Depends(get_db)
):
    return db.query(Response).all()