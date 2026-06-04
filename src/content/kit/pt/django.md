---
title: Django
description: "Um preset de onboarding para projetos Django, com pistas de raciocínio para apps, migrações, settings, comandos de gerenciamento e o test runner."
kind: preset
lang: pt
order: 1
stack: Django
---

# Preset Django

Um guia de raciocínio que o fluxo de onboarding usa para projetos Django. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `manage.py` e `settings.py`; apps com `models.py`, `views.py`, `migrations/`.
- Gerenciador de pacotes e test runner inferidos a partir do manifesto e do lockfile existentes.

## Sobre o que raciocinar

- O comando de teste real (frequentemente `python manage.py test` ou `pytest`) e qualquer gate de lint/verificação de tipos — capturados literalmente.
- As convenções de apps e migrações, o layout de settings e de ambiente e os padrões de comandos de gerenciamento.
- Skills apropriadas à stack para apps, models, views e migrações.

## Notas

Útil para apps Django que seguem o layout de projeto padrão.
