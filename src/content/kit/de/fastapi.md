---
title: FastAPI
description: "Ein Onboarding-Preset für FastAPI-Services mit Reasoning-Hinweisen zu Routern, Pydantic-Modellen, asynchronen Endpunkten, Dependency Injection und dem Test-Runner."
kind: preset
lang: de
order: 7
stack: FastAPI
---

# FastAPI-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für FastAPI-Services nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `fastapi` in `pyproject.toml` / `requirements.txt`, ein ASGI-Server (`uvicorn`, `gunicorn` mit `uvicorn.workers`) und eine `app = FastAPI()`-Instanz.
- `APIRouter`-Module, `async def`-Pfadoperationen sowie Pydantic-Modelle oder `pydantic-settings`.
- Paketmanager und Test-Runner werden aus dem vorhandenen Manifest und der Lockfile abgeleitet.

## Worüber nachzudenken ist

- Der echte Test-Befehl (oft `pytest` mit `httpx`/`TestClient`) und das Lint/Type-Check-Gate (`ruff`, `mypy`) — wortwörtlich erfasst.
- Router-Struktur, der Fluss Request → Dependency → Handler → Response-Modell sowie der Ort von Einstellungen und Geheimnissen.
- Synchrone vs. asynchrone Endpunkte, blockierende Aufrufe in der Event-Loop und stack-passende Skills für Router, Schemas und Dependencies.

## Hinweise

Festhalten, wie die App zusammengesetzt wird (`include_router`), den Start-Befehl (`uvicorn app.main:app`) und ob Alembic Migrationen verwaltet.
