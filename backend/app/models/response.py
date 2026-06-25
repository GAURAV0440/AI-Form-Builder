from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import JSON
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Response(Base):
    __tablename__ = "responses"

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

    response_data = Column(
        JSON,
        nullable=False
    )

    submitted_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    form = relationship(
        "Form",
        back_populates="responses"
    )

    def __repr__(self):
        return f"<Response {self.id}>"