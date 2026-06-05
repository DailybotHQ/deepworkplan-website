---
title: Laravel
description: "Preset onboarding untuk proyek Laravel, dengan petunjuk penalaran untuk model Eloquent, controller, route, migrasi, command Artisan, dan test runner."
kind: preset
lang: id
order: 11
stack: Laravel (PHP)
---

# Preset Laravel

Panduan penalaran yang dipakai alur onboard untuk proyek Laravel. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `composer.json` dengan `laravel/framework`, skrip konsol `artisan`, dan pohon `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` dan `routes/api.php`, `database/migrations/`, serta model Eloquent.
- Test runner dan tooling lint/format disimpulkan dari `composer.json` dan file konfigurasi yang ada.

## Yang perlu dipertimbangkan

- Command test yang sebenarnya (`php artisan test`, `vendor/bin/phpunit`, atau `vendor/bin/pest`) dan gate lint/format apa pun (Pint, PHP-CS-Fixer, PHPStan/Larastan) — dicatat apa adanya.
- Konvensi routing, controller, dan Eloquent; alur kerja migrasi; tata letak environment dan konfigurasi (`.env`, `config/`).
- Skill yang sesuai stack untuk model, controller, migrasi, dan command Artisan.

## Catatan

Cocok untuk aplikasi Laravel yang mengikuti tata letak proyek standar. Jika repositori menggunakan Sail/Docker, catat apakah gate test dan lint berjalan di dalam container.
