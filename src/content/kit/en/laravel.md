---
title: Laravel
description: "An onboarding preset for Laravel projects, with reasoning cues for Eloquent models, controllers, routes, migrations, Artisan commands, and the test runner."
kind: preset
lang: en
order: 11
stack: Laravel (PHP)
---

# Laravel preset

A reasoning guide the onboard flow uses for Laravel projects. It is a checklist, not a template — detected reality wins.

## Signals

- `composer.json` with `laravel/framework`, an `artisan` console script, and an `app/` tree (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` and `routes/api.php`, `database/migrations/`, and Eloquent models.
- Test runner and lint/format tooling inferred from `composer.json` and config files that exist.

## What to reason about

- The real test command (`php artisan test`, `vendor/bin/phpunit`, or `vendor/bin/pest`) and any lint/format gate (Pint, PHP-CS-Fixer, PHPStan/Larastan) — captured verbatim.
- Routing, controller, and Eloquent conventions; the migration workflow; environment and config layout (`.env`, `config/`).
- Stack-appropriate skills for models, controllers, migrations, and Artisan commands.

## Notes

Useful for Laravel apps following the standard project layout. If the repo uses Sail/Docker, capture whether the test and lint gates run inside the container.
