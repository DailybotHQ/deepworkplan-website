---
title: FastAPI
description: "Preset onboarding untuk layanan FastAPI, dengan petunjuk penalaran untuk router, model Pydantic, endpoint async, dependency injection, dan test runner."
kind: preset
lang: id
order: 7
stack: FastAPI
---

# Preset FastAPI

Panduan penalaran yang dipakai alur onboard untuk layanan FastAPI. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `fastapi` di `pyproject.toml` / `requirements.txt`, sebuah ASGI server (`uvicorn`, `gunicorn` dengan `uvicorn.workers`), dan instans `app = FastAPI()`.
- Modul `APIRouter`, operasi path `async def`, serta model Pydantic atau `pydantic-settings`.
- Package manager dan test runner disimpulkan dari manifest dan lockfile yang ada.

## Yang perlu dipertimbangkan

- Command test yang sebenarnya (sering `pytest` dengan `httpx`/`TestClient`) dan gate lint/type-check (`ruff`, `mypy`) — dicatat apa adanya.
- Struktur router, alur request → dependency → handler → response model, serta tempat penyimpanan pengaturan dan rahasia.
- Endpoint sinkron vs asinkron, panggilan yang memblokir di event loop, dan skill yang sesuai stack untuk router, skema, dan dependency.

## Catatan

Catat cara aplikasi dirakit (`include_router`), command jalankan (`uvicorn app.main:app`), dan apakah Alembic mengelola migrasi.
