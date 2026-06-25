import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func

from app.core.database import Base


class Form(Base):
    __tablename__ = "forms"

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(20),
        default="draft"
    )

    created_by = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    owner = relationship(
        "User",
        backref="forms"
    )

    fields = relationship(
        "Field",
        back_populates="form",
        cascade="all, delete-orphan"
    )

    documents = relationship(
        "Document",
        back_populates="form",
        cascade="all, delete-orphan"
    )

    responses = relationship(
        "Response",
        back_populates="form",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Form {self.title}>"