from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"


class FieldType(str, Enum):
    TEXT = "text"
    TEXTAREA = "textarea"
    NUMBER = "number"
    DATE = "date"
    DROPDOWN = "dropdown"
    CHECKBOX = "checkbox"


class FormStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"