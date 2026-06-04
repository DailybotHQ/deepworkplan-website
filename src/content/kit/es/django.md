---
title: Django
description: "Un preset de incorporación para proyectos Django, con pistas de razonamiento para apps, migraciones, ajustes, comandos de administración y pruebas."
kind: preset
lang: es
order: 1
stack: Django
---

# Preset de Django

Una guía de razonamiento que el flujo de onboard usa para proyectos Django. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `manage.py` y `settings.py`; apps con `models.py`, `views.py`, `migrations/`.
- Gestor de paquetes y ejecutor de pruebas inferidos del manifiesto y el lockfile que existen.

## Qué razonar

- El comando de prueba real (a menudo `python manage.py test` o `pytest`) y cualquier compuerta de lint/tipos — capturado al pie de la letra.
- Convenciones de apps y migraciones, la disposición de ajustes y entorno, y los patrones de comandos de administración.
- Skills adaptadas para apps, modelos, vistas y migraciones.

## Notas

Útil para apps Django que siguen el diseño de proyecto estándar.
