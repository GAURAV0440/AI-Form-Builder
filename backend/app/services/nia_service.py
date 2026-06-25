import json
import re
import requests

from app.core.config import settings


def extract_form_data(document_text: str, form_fields: list):

    prompt = f"""
You are an AI information extraction system.

Your job is to extract values from the document.

IMPORTANT RULES:

1. Return ONLY a valid JSON object.
2. Do NOT use markdown.
3. Do NOT wrap the JSON inside ```json.
4. Do NOT explain anything.
5. If a value is missing, return an empty string "".
6. Never guess values.

Form Fields:
{json.dumps(form_fields, indent=2)}

Document:
{document_text}
"""

    response = requests.post(
        f"{settings.NIA_BASE_URL}/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.NIA_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "nia-a-1.0",
            "temperature": 0,
            "messages": [
                {
                    "role": "system",
                    "content": "Return ONLY valid JSON. No markdown. No explanation.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        },
        timeout=120,
    )

    response.raise_for_status()

    data = response.json()

    content = data["choices"][0]["message"]["content"]

    print("\n========== NIA RAW RESPONSE ==========")
    print(content)
    print("======================================\n")

    content = content.strip()

    # Remove ```json
    content = re.sub(r"^```json", "", content, flags=re.IGNORECASE)

    # Remove ```
    content = re.sub(r"```$", "", content)

    content = content.strip()

    try:
        return json.loads(content)

    except Exception:

        # Try extracting the JSON object only
        match = re.search(r"\{.*\}", content, re.DOTALL)

        if match:
            return json.loads(match.group())

        raise Exception(
            f"NIA returned invalid JSON:\n\n{content}"
        )