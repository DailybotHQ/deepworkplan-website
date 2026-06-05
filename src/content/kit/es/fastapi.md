---
title: FastAPI
description: "Preset de incorporación para servicios FastAPI, con pistas de razonamiento para routers, modelos Pydantic, endpoints async, inyección de dependencias y el test runner."
kind: preset
lang: es
order: 7
stack: FastAPI
---

# Preset FastAPI

Guía de razonamiento que el flujo de onboard usa para servicios FastAPI. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `fastapi` en `pyproject.toml` / `requirements.txt`, un servidor ASGI (`uvicorn`, `gunicorn` con `uvicorn.workers`) y una instancia `app = FastAPI()`.
- Módulos `APIRouter`, operaciones de ruta con `async def` y modelos Pydantic o `pydantic-settings`.
- El gestor de paquetes y el test runner se infieren del manifiesto y del lockfile que existan.

## Qué razonar

- El comando de prueba real (a menudo `pytest` con `httpx`/`TestClient`) y la compuerta de lint/verificación de tipos (`ruff`, `mypy`) — capturados al pie de la letra.
- Estructura de routers, el flujo solicitud → dependencia → manejador → modelo de respuesta, y dónde viven los ajustes y los secretos.
- Endpoints síncronos vs asíncronos, llamadas bloqueantes en el event loop y skills adecuadas al stack para routers, esquemas y dependencias.

## Notas

Captura cómo se ensambla la aplicación (`include_router`), el comando de arranque (`uvicorn app.main:app`) y si Alembic gestiona las migraciones.
