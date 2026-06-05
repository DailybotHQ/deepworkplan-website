---
title: FastAPI
description: "Preset di onboarding per servizi FastAPI, con spunti di ragionamento per router, modelli Pydantic, endpoint asincroni, dependency injection e test runner."
kind: preset
lang: it
order: 7
stack: FastAPI
---

# Preset FastAPI

Una guida di ragionamento che il flusso di onboard usa per i servizi FastAPI. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `fastapi` in `pyproject.toml` / `requirements.txt`, un server ASGI (`uvicorn`, `gunicorn` con `uvicorn.workers`) e un'istanza `app = FastAPI()`.
- Moduli `APIRouter`, path operation con `async def`, e modelli Pydantic o `pydantic-settings`.
- Package manager e test runner dedotti dal manifest e dal lockfile presenti.

## Su cosa ragionare

- Il comando di test reale (spesso `pytest` con `httpx`/`TestClient`) e il gate di lint/type-check (`ruff`, `mypy`) — catturati alla lettera.
- Struttura dei router, flusso request → dependency → handler → response model, e dove risiedono le impostazioni e i segreti.
- Endpoint sincroni vs asincroni, chiamate bloccanti nell'event loop, e skill adatte allo stack per router, schemi e dependency.

## Note

Catturare come viene assemblata l'applicazione (`include_router`), il comando di avvio (`uvicorn app.main:app`) e se Alembic gestisce le migrazioni.
