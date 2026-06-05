---
title: Ruby on Rails
description: "Preset onboardingowy dla aplikacji Ruby on Rails, ze wskazówkami do rozumowania o układzie MVC, migracjach, frameworku testowym i potoku zasobów oraz konfiguracji."
kind: preset
lang: pl
order: 10
stack: Ruby on Rails
---

# Preset Ruby on Rails

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla aplikacji Ruby on Rails. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `Gemfile` z `rails`, plik wykonywalny `bin/rails` oraz układ MVC `app/{models,controllers,views}`.
- `config/routes.rb`, migracje `db/migrate/` oraz `db/schema.rb`.
- Framework testowy wnioskowany z tego, co istnieje: RSpec (`spec/`, `.rspec`) lub Minitest (`test/`).

## O czym należy rozumować

- Rzeczywiste polecenie testowe (`bin/rails test` lub `bundle exec rspec`) oraz bramka lint (`rubocop`) — zapisane dosłownie.
- Przepływ żądanie → trasa → kontroler → model → widok, proces migracji oraz miejsce przechowywania poświadczeń i konfiguracji.
- Skille właściwe dla stosu dotyczące modeli, kontrolerów, migracji oraz (jeśli obecne) zadań i mailerów.

## Uwagi

Zapisz, czy używane są Active Job/Sidekiq i Hotwire/Turbo oraz jak zarządzane są zaszyfrowane poświadczenia (`config/credentials`).
