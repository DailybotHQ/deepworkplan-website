---
title: FastAPI
description: "An onboarding preset for FastAPI services, with reasoning cues for routers, Pydantic models, async endpoints, dependency injection, and the test runner."
kind: preset
lang: en
order: 7
stack: FastAPI
---

# FastAPI preset

A reasoning guide the onboard flow uses for FastAPI services. It is a checklist, not a template — detected reality wins.

## Signals

- `fastapi` in `pyproject.toml` / `requirements.txt`, an ASGI server (`uvicorn`, `gunicorn` with `uvicorn.workers`), and an `app = FastAPI()` instance.
- `APIRouter` modules, `async def` path operations, and Pydantic models or `pydantic-settings`.
- Package manager and test runner inferred from the manifest and lockfile that exist.

## What to reason about

- The real test command (often `pytest` with `httpx`/`TestClient`) and the lint/type-check gate (`ruff`, `mypy`) — captured verbatim.
- Router structure, request → dependency → handler → response model flow, and where settings and secrets live.
- Sync vs async endpoints, blocking calls in the event loop, and Stack-appropriate skills for routers, schemas, and dependencies.

## Notes

Capture how the app is assembled (`include_router`), the run command (`uvicorn app.main:app`), and whether Alembic manages migrations.
