---
title: Ruby on Rails
description: "Ein Onboarding-Preset für Ruby-on-Rails-Anwendungen mit Reasoning-Hinweisen zum MVC-Layout, Migrationen, dem Test-Framework sowie der Asset- und Konfigurations-Pipeline."
kind: preset
lang: de
order: 10
stack: Ruby on Rails
---

# Ruby-on-Rails-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Ruby-on-Rails-Anwendungen nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- Ein `Gemfile` mit `rails`, die ausführbare Datei `bin/rails` und das MVC-Layout `app/{models,controllers,views}`.
- `config/routes.rb`, Migrationen in `db/migrate/` und `db/schema.rb`.
- Test-Framework wird aus dem Vorhandenen abgeleitet: RSpec (`spec/`, `.rspec`) oder Minitest (`test/`).

## Worüber nachzudenken ist

- Der echte Test-Befehl (`bin/rails test` oder `bundle exec rspec`) und das Lint-Gate (`rubocop`) — wortwörtlich erfasst.
- Der Fluss Request → Route → Controller → Model → View, der Migrations-Workflow sowie der Ort von Credentials und Konfiguration.
- Stack-passende Skills für Models, Controller, Migrationen und — falls vorhanden — Jobs und Mailer.

## Hinweise

Festhalten, ob Active Job/Sidekiq und Hotwire/Turbo im Einsatz sind und wie verschlüsselte Credentials (`config/credentials`) verwaltet werden.
