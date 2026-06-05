---
title: Laravel
description: "Preset di onboarding per progetti Laravel, con spunti di ragionamento per model Eloquent, controller, route, migrazioni, comandi Artisan e test runner."
kind: preset
lang: it
order: 11
stack: Laravel (PHP)
---

# Preset Laravel

Una guida di ragionamento che il flusso di onboard usa per i progetti Laravel. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `composer.json` con `laravel/framework`, uno script console `artisan` e un albero `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` e `routes/api.php`, `database/migrations/` e model Eloquent.
- Test runner e strumenti di lint/format dedotti da `composer.json` e dai file di configurazione presenti.

## Su cosa ragionare

- Il comando di test reale (`php artisan test`, `vendor/bin/phpunit` o `vendor/bin/pest`) e l'eventuale gate di lint/format (Pint, PHP-CS-Fixer, PHPStan/Larastan) — catturati alla lettera.
- Convenzioni di routing, controller ed Eloquent; il workflow delle migrazioni; layout di ambiente e configurazione (`.env`, `config/`).
- Skill adatte allo stack per model, controller, migrazioni e comandi Artisan.

## Note

Utile per applicazioni Laravel che seguono il layout standard del progetto. Se il repository usa Sail/Docker, verificare se i gate di test e lint girano all'interno del container.
