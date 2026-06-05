---
title: FastAPI
description: "Un preset d'onboarding pour les services FastAPI, avec des indices de raisonnement sur les routeurs, les modèles Pydantic, les endpoints asynchrones, l'injection de dépendances et le test runner."
kind: preset
lang: fr
order: 7
stack: FastAPI
---

# Preset FastAPI

Un guide de raisonnement que le flux d'onboarding utilise pour les services FastAPI. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `fastapi` dans `pyproject.toml` / `requirements.txt`, un serveur ASGI (`uvicorn`, `gunicorn` avec `uvicorn.workers`) et une instance `app = FastAPI()`.
- Des modules `APIRouter`, des opérations de chemin `async def`, et des modèles Pydantic ou `pydantic-settings`.
- Le gestionnaire de paquets et le test runner sont déduits depuis le manifeste et le lockfile présents.

## Sur quoi raisonner

- La vraie commande de test (souvent `pytest` avec `httpx`/`TestClient`) et la porte de lint/vérification de types (`ruff`, `mypy`) — capturées verbatim.
- La structure des routeurs, le flux requête → dépendance → handler → modèle de réponse, et l'endroit où vivent les paramètres et secrets.
- Les endpoints synchrones et asynchrones, les appels bloquants dans la boucle d'événements, et les skills adaptés à la stack pour les routeurs, les schémas et les dépendances.

## Notes

Capturer comment l'application est assemblée (`include_router`), la commande d'exécution (`uvicorn app.main:app`) et si Alembic gère les migrations.
