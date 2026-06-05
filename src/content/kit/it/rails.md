---
title: Ruby on Rails
description: "Preset di onboarding per applicazioni Ruby on Rails, con spunti di ragionamento per il layout MVC, le migrazioni, il framework di test e la pipeline di asset e config."
kind: preset
lang: it
order: 10
stack: Ruby on Rails
---

# Preset Ruby on Rails

Una guida di ragionamento che il flusso di onboard usa per le applicazioni Ruby on Rails. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- Un `Gemfile` con `rails`, l'eseguibile `bin/rails` e il layout MVC `app/{models,controllers,views}`.
- `config/routes.rb`, migrazioni in `db/migrate/` e `db/schema.rb`.
- Framework di test dedotto da ciò che esiste: RSpec (`spec/`, `.rspec`) o Minitest (`test/`).

## Su cosa ragionare

- Il comando di test reale (`bin/rails test` o `bundle exec rspec`) e il gate di lint (`rubocop`) — catturati alla lettera.
- Flusso request → route → controller → model → view, il workflow delle migrazioni e dove risiedono le credenziali e la configurazione.
- Skill adatte allo stack per model, controller, migrazioni e, se presenti, job e mailer.

## Note

Catturare se sono in uso Active Job/Sidekiq e Hotwire/Turbo, e come vengono gestite le credenziali cifrate (`config/credentials`).
