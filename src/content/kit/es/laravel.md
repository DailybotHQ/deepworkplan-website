---
title: Laravel
description: "Preset de incorporación para proyectos Laravel, con pistas de razonamiento para modelos Eloquent, controladores, rutas, migraciones, comandos Artisan y el test runner."
kind: preset
lang: es
order: 11
stack: Laravel (PHP)
---

# Preset Laravel

Guía de razonamiento que el flujo de onboard usa para proyectos Laravel. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `composer.json` con `laravel/framework`, un script de consola `artisan` y un árbol `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` y `routes/api.php`, `database/migrations/` y modelos Eloquent.
- El test runner y las herramientas de lint/formato se infieren de `composer.json` y los archivos de configuración que existan.

## Qué razonar

- El comando de prueba real (`php artisan test`, `vendor/bin/phpunit` o `vendor/bin/pest`) y cualquier compuerta de lint/formato (Pint, PHP-CS-Fixer, PHPStan/Larastan) — capturados al pie de la letra.
- Convenciones de enrutamiento, controladores y Eloquent; el flujo de trabajo de migraciones; estructura de entorno y configuración (`.env`, `config/`).
- Skills adecuadas al stack para modelos, controladores, migraciones y comandos Artisan.

## Notas

Útil para aplicaciones Laravel con la estructura de proyecto estándar. Si el repositorio usa Sail/Docker, captura si las compuertas de prueba y lint se ejecutan dentro del contenedor.
