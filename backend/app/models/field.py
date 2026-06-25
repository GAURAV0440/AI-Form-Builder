from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import JSON

from sqlalchemy.orm import relationship

from app.core.database import Base


class Field(Base):
    __tablename__ = "fields"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    form_id = Column(
        String(36),
        ForeignKey("forms.id", ondelete="CASCADE"),
        nullable=False
    )

    label = Column(
        String(255),
        nullable=False
    )

    field_type = Column(
        String(50),
        nullable=False
    )

    required = Column(
        Boolean,
        default=False
    )

    placeholder = Column(
        String(255),
        nullable=True
    )

    options = Column(
        JSON,
        nullable=True
    )

    field_order = Column(
        Integer,
        default=0
    )

    form = relationship(
        "Form",
        back_populates="fields"
    )

    def __repr__(self):
        return f"<Field {self.label}>"