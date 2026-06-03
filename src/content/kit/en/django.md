---
title: Django
description: "An onboarding preset for Django projects, with reasoning cues for apps, migrations, settings, management commands, and the test runner."
kind: preset
lang: en
order: 1
stack: Django
---

# Django preset

A reasoning guide the onboard flow uses for Django projects. It is a checklist, not a template — detected reality wins.

## Signals

- `manage.py` and `settings.py`; apps with `models.py`, `views.py`, `migrations/`.
- Package manager and test runner inferred from the manifest and lockfile that exist.

## What to reason about

- The real test command (often `python manage.py test` or `pytest`) and any lint/type-check gate — captured verbatim.
- App and migration conventions, the settings and environment layout, and management-command patterns.
- Stack-appropriate skills for apps, models, views, and migrations.

## Notes

Useful for Django apps following the standard project layout.
