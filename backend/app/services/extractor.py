import fitz
from PIL import Image
import io


def extract_text_from_pdf(file_path: str) -> str:
    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text.strip()


def extract_text_from_image(file_path: str) -> str:
    """
    Placeholder for OCR.

    We'll add OCR later if needed.
    NIA can also process images directly.
    """
    return ""


def extract_text(file_path: str) -> str:

    file_path = file_path.lower()

    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)

    if (
        file_path.endswith(".png")
        or file_path.endswith(".jpg")
        or file_path.endswith(".jpeg")
    ):
        return extract_text_from_image(file_path)

    return ""