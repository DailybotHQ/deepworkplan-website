---
title: Django
description: "Preset onboardingowy dla projektów Django, z wskazówkami do rozumowania o aplikacjach, migracjach, ustawieniach, komendach zarządzających i runnerze testów."
kind: preset
lang: pl
order: 1
stack: Django
---

# Preset Django

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Django. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `manage.py` i `settings.py`; aplikacje z `models.py`, `views.py`, `migrations/`.
- Menedżer pakietów i runner testów wywnioskowane z istniejącego manifestu i pliku lock.

## O czym należy rozumować

- Rzeczywista komenda testowa (często `python manage.py test` lub `pytest`) oraz wszelkie bramki lint/sprawdzania typów — zapisane dosłownie.
- Konwencje aplikacji i migracji, układ ustawień i środowiska oraz wzorce komend zarządzających.
- Skille odpowiednie dla stacku do obsługi aplikacji, modeli, widoków i migracji.

## Uwagi

Przydatny dla aplikacji Django stosujących standardowy układ projektu.
