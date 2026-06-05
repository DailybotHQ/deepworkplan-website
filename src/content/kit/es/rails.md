---
title: Ruby on Rails
description: "Preset de incorporación para aplicaciones Ruby on Rails, con pistas de razonamiento para la estructura MVC, migraciones, el framework de pruebas y el pipeline de assets y config."
kind: preset
lang: es
order: 10
stack: Ruby on Rails
---

# Preset Ruby on Rails

Guía de razonamiento que el flujo de onboard usa para aplicaciones Ruby on Rails. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- Un `Gemfile` con `rails`, el ejecutable `bin/rails` y la estructura MVC `app/{models,controllers,views}`.
- `config/routes.rb`, migraciones en `db/migrate/` y `db/schema.rb`.
- El framework de pruebas se infiere de lo que exista: RSpec (`spec/`, `.rspec`) o Minitest (`test/`).

## Qué razonar

- El comando de prueba real (`bin/rails test` o `bundle exec rspec`) y la compuerta de lint (`rubocop`) — capturados al pie de la letra.
- Flujo solicitud → ruta → controlador → modelo → vista, el flujo de trabajo de migraciones y dónde viven las credenciales y la configuración.
- Skills adecuadas al stack para modelos, controladores, migraciones y, si están presentes, jobs y mailers.

## Notas

Captura si Active Job/Sidekiq y Hotwire/Turbo están en uso, y cómo se gestionan las credenciales cifradas (`config/credentials`).
