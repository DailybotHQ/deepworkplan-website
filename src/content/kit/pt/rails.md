---
title: Ruby on Rails
description: "Um preset de onboarding para aplicações Ruby on Rails, com pistas de raciocínio para o layout MVC, migrations, o framework de testes e o pipeline de assets e configuração."
kind: preset
lang: pt
order: 10
stack: Ruby on Rails
---

# Preset Ruby on Rails

Um guia de raciocínio que o fluxo de onboarding usa para aplicações Ruby on Rails. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- Um `Gemfile` com `rails`, o executável `bin/rails` e o layout MVC `app/{models,controllers,views}`.
- `config/routes.rb`, migrations em `db/migrate/` e `db/schema.rb`.
- Framework de testes inferido a partir do que existe: RSpec (`spec/`, `.rspec`) ou Minitest (`test/`).

## Sobre o que raciocinar

- O comando de teste real (`bin/rails test` ou `bundle exec rspec`) e o gate de lint (`rubocop`) — capturados literalmente.
- Fluxo request → rota → controller → model → view, o fluxo de trabalho de migration e onde ficam credenciais e configurações.
- Skills adequadas à stack para models, controllers, migrations e, se presentes, jobs e mailers.

## Notas

Capturar se Active Job/Sidekiq e Hotwire/Turbo estão em uso e como as credenciais encriptadas (`config/credentials`) são gerenciadas.
