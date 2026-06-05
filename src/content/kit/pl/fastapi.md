---
title: FastAPI
description: "Preset onboardingowy dla serwisów FastAPI, ze wskazówkami do rozumowania o routerach, modelach Pydantic, endpointach async, wstrzykiwaniu zależności i testach."
kind: preset
lang: pl
order: 7
stack: FastAPI
---

# Preset FastAPI

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla serwisów FastAPI. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `fastapi` w `pyproject.toml` / `requirements.txt`, serwer ASGI (`uvicorn`, `gunicorn` z `uvicorn.workers`) oraz instancja `app = FastAPI()`.
- Moduły `APIRouter`, operacje ścieżek `async def` oraz modele Pydantic lub `pydantic-settings`.
- Menedżer pakietów i narzędzie testowe wnioskowane z manifestu i pliku blokady, które istnieją.

## O czym należy rozumować

- Rzeczywiste polecenie testowe (często `pytest` z `httpx`/`TestClient`) oraz bramka lint/type-check (`ruff`, `mypy`) — zapisane dosłownie.
- Struktura routerów, przepływ żądanie → zależność → handler → model odpowiedzi oraz miejsce przechowywania ustawień i sekretów.
- Synchroniczne a asynchroniczne endpointy, blokujące wywołania w pętli zdarzeń oraz skille właściwe dla stosu dotyczące routerów, schematów i zależności.

## Uwagi

Zapisz sposób składania aplikacji (`include_router`), polecenie uruchomienia (`uvicorn app.main:app`) oraz to, czy migracjami zarządza Alembic.
