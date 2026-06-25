from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "AI Form Builder"

    DEBUG: bool = True

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    DATABASE_URL: str = "sqlite:///./app.db"

    SECRET_KEY: str = "change_this_to_a_long_random_secret_key_123456"

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    UPLOAD_FOLDER: str = "app/uploads"

    MAX_UPLOAD_SIZE: int = 10485760

    NIA_API_KEY: str

    NIA_BASE_URL: str

    ADMIN_EMAIL: str = "admin@example.com"

    ADMIN_PASSWORD: str = "Admin@123"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()