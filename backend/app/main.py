from fastapi import FastAPI

from app.core.config import settings
from app.core.database import Base, engine
from app.models.user import User
from app.models.user import User
from app.models.form import Form
from app.models.field import Field
from app.models.document import Document
from app.models.response import Response
from app.api.auth import router as auth_router
from app.api.forms import router as form_router
from app.api.upload import router as upload_router
from app.api.extract import router as extract_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    debug=settings.DEBUG
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(form_router)
app.include_router(upload_router)
app.include_router(extract_router)

@app.on_event("startup")
def startup():

    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():

    return {
        "message": "AI Form Builder Backend Running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }