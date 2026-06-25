from typing import List, Optional

from pydantic import BaseModel


class FieldCreate(BaseModel):
    label: str
    field_type: str
    required: bool = False
    placeholder: Optional[str] = None
    options: Optional[list] = None
    field_order: int = 0


class FormCreate(BaseModel):
    title: str
    description: Optional[str] = None
    fields: List[FieldCreate]