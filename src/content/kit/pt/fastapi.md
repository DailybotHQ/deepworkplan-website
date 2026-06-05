---
title: FastAPI
description: "Um preset de onboarding para serviços FastAPI, com pistas de raciocínio para roteadores, modelos Pydantic, endpoints assíncronos, injeção de dependência e o test runner."
kind: preset
lang: pt
order: 7
stack: FastAPI
---

# Preset FastAPI

Um guia de raciocínio que o fluxo de onboarding usa para serviços FastAPI. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `fastapi` em `pyproject.toml` / `requirements.txt`, um servidor ASGI (`uvicorn`, `gunicorn` com `uvicorn.workers`) e uma instância `app = FastAPI()`.
- Módulos `APIRouter`, operações de rota com `async def` e modelos Pydantic ou `pydantic-settings`.
- Gerenciador de pacotes e test runner inferidos a partir do manifesto e do lockfile presentes.

## Sobre o que raciocinar

- O comando de teste real (geralmente `pytest` com `httpx`/`TestClient`) e o gate de lint/verificação de tipos (`ruff`, `mypy`) — capturados literalmente.
- Estrutura de roteadores, fluxo request → dependência → handler → modelo de resposta, e onde ficam configurações e segredos.
- Endpoints síncronos vs assíncronos, chamadas bloqueantes no event loop e skills adequadas à stack para roteadores, schemas e dependências.

## Notas

Capturar como o app é montado (`include_router`), o comando de execução (`uvicorn app.main:app`) e se o Alembic gerencia as migrações.
