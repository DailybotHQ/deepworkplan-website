---
title: Django
description: "Un preset di onboarding per progetti Django, con spunti di ragionamento per app, migrazioni, settings, management command e il test runner."
kind: preset
lang: it
order: 1
stack: Django
---

# Preset Django

Una guida di ragionamento che il flusso di onboard usa per i progetti Django. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `manage.py` e `settings.py`; app con `models.py`, `views.py`, `migrations/`.
- Package manager e test runner dedotti dal manifest e dal lockfile esistenti.

## Su cosa ragionare

- Il comando di test reale (spesso `python manage.py test` o `pytest`) e qualsiasi gate di lint/type-check — catturati alla lettera.
- Le convenzioni di app e migrazioni, la struttura di settings e ambiente e i pattern dei management command.
- Skill adatte allo stack per app, model, view e migrazioni.

## Note

Utile per app Django che seguono la struttura di progetto standard.
