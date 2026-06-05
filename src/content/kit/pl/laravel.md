---
title: Laravel
description: "Preset onboardingowy dla projektów Laravel, ze wskazówkami do rozumowania o modelach Eloquent, kontrolerach, trasach, migracjach, komendach Artisan i narzędziu testowym."
kind: preset
lang: pl
order: 11
stack: Laravel (PHP)
---

# Preset Laravel

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Laravel. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `composer.json` z `laravel/framework`, skrypt konsolowy `artisan` oraz drzewo `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` i `routes/api.php`, `database/migrations/` oraz modele Eloquent.
- Narzędzie testowe i lint/format wnioskowane z `composer.json` oraz plików konfiguracyjnych, które istnieją.

## O czym należy rozumować

- Rzeczywiste polecenie testowe (`php artisan test`, `vendor/bin/phpunit` lub `vendor/bin/pest`) oraz ewentualna bramka lint/format (Pint, PHP-CS-Fixer, PHPStan/Larastan) — zapisane dosłownie.
- Konwencje routingu, kontrolerów i Eloquent; proces migracji; układ środowiska i konfiguracji (`.env`, `config/`).
- Skille właściwe dla stosu dotyczące modeli, kontrolerów, migracji i komend Artisan.

## Uwagi

Przydatny dla aplikacji Laravel zgodnych ze standardowym układem projektu. Jeśli repo korzysta z Sail/Docker, zapisz, czy bramki testowe i lint działają wewnątrz kontenera.
