---
title: FastAPI
description: "FastAPI सेवाओं के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें routers, Pydantic models, async endpoints, dependency injection और test runner के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 7
stack: FastAPI
---

# FastAPI preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह FastAPI सेवाओं के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `pyproject.toml` / `requirements.txt` में `fastapi`, एक ASGI सर्वर (`uvicorn`, `gunicorn` with `uvicorn.workers`), और एक `app = FastAPI()` इंस्टेंस।
- `APIRouter` मॉड्यूल, `async def` path operations, और Pydantic models या `pydantic-settings`।
- Package manager और test runner को मौजूद manifest और lockfile से अनुमानित किया जाता है।

## किस बारे में तर्क करें

- वास्तविक test कमांड (अक्सर `pytest` with `httpx`/`TestClient`) और lint/type-check गेट (`ruff`, `mypy`) — हूबहू दर्ज किए गए।
- Router संरचना, request → dependency → handler → response model प्रवाह, और settings तथा secrets कहाँ रहते हैं।
- Sync बनाम async endpoints, event loop में blocking calls, और routers, schemas तथा dependencies के लिए stack-उपयुक्त skills।

## टिप्पणियाँ

यह दर्ज करें कि app कैसे जोड़ा जाता है (`include_router`), run कमांड (`uvicorn app.main:app`), और क्या Alembic माइग्रेशन प्रबंधित करता है।
