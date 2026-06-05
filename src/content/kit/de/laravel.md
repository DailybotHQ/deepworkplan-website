---
title: Laravel
description: "Ein Onboarding-Preset für Laravel-Projekte mit Reasoning-Hinweisen zu Eloquent-Modellen, Controllern, Routen, Migrationen, Artisan-Befehlen und dem Test-Runner."
kind: preset
lang: de
order: 11
stack: Laravel (PHP)
---

# Laravel-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Laravel-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `composer.json` mit `laravel/framework`, ein `artisan`-Konsolenskript und ein `app/`-Baum (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` und `routes/api.php`, `database/migrations/` sowie Eloquent-Modelle.
- Test-Runner und Lint/Format-Werkzeuge werden aus `composer.json` und vorhandenen Konfigurationsdateien abgeleitet.

## Worüber nachzudenken ist

- Der echte Test-Befehl (`php artisan test`, `vendor/bin/phpunit` oder `vendor/bin/pest`) und etwaige Lint/Format-Gates (Pint, PHP-CS-Fixer, PHPStan/Larastan) — wortwörtlich erfasst.
- Routing-, Controller- und Eloquent-Konventionen; der Migrations-Workflow; Umgebungs- und Konfigurations-Layout (`.env`, `config/`).
- Stack-passende Skills für Models, Controller, Migrationen und Artisan-Befehle.

## Hinweise

Geeignet für Laravel-Apps, die das Standard-Projektlayout verwenden. Falls das Repository Sail/Docker nutzt, festhalten, ob Test- und Lint-Gates innerhalb des Containers ausgeführt werden.
