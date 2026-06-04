---
title: Django
description: "Preset onboarding untuk proyek Django, dengan petunjuk penalaran untuk app, migrasi, settings, management command, dan test runner."
kind: preset
lang: id
order: 1
stack: Django
---

# Preset Django

Panduan penalaran yang dipakai alur onboard untuk proyek Django. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `manage.py` dan `settings.py`; app dengan `models.py`, `views.py`, `migrations/`.
- Package manager dan test runner disimpulkan dari manifest dan lockfile yang ada.

## Yang perlu dipertimbangkan

- Command test yang sebenarnya (sering kali `python manage.py test` atau `pytest`) dan gate lint/type-check mana pun — dicatat apa adanya.
- Konvensi app dan migrasi, tata letak settings dan environment, serta pola management command.
- Skill yang sesuai dengan stack untuk app, model, view, dan migrasi.

## Catatan

Berguna untuk app Django yang mengikuti tata letak proyek standar.
