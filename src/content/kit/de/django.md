---
title: Django
description: "Ein Onboarding-Preset für Django-Projekte, mit Reasoning-Hinweisen für Apps, Migrationen, Settings, Management-Befehle und den Test-Runner."
kind: preset
lang: de
order: 1
stack: Django
---

# Django Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Django-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `manage.py` und `settings.py`; Apps mit `models.py`, `views.py`, `migrations/`.
- Paketmanager und Test-Runner werden aus dem vorhandenen Manifest und der Lockfile abgeleitet.

## Worüber nachzudenken ist

- Der echte Test-Befehl (oft `python manage.py test` oder `pytest`) und ein etwaiges Lint-/Type-Check-Gate — wortwörtlich erfasst.
- App- und Migrationskonventionen, das Settings- und Environment-Layout und Management-Befehlsmuster.
- Stack-passende Skills für Apps, Models, Views und Migrationen.

## Hinweise

Nützlich für Django-Apps, die dem Standard-Projektlayout folgen.
