---
title: Ruby on Rails
description: "An onboarding preset for Ruby on Rails applications, with reasoning cues for MVC layout, migrations, the test framework, and the asset and config pipeline."
kind: preset
lang: en
order: 10
stack: Ruby on Rails
---

# Ruby on Rails preset

A reasoning guide the onboard flow uses for Ruby on Rails applications. It is a checklist, not a template — detected reality wins.

## Signals

- A `Gemfile` with `rails`, the `bin/rails` executable, and the `app/{models,controllers,views}` MVC layout.
- `config/routes.rb`, `db/migrate/` migrations, and `db/schema.rb`.
- Test framework inferred from what exists: RSpec (`spec/`, `.rspec`) or Minitest (`test/`).

## What to reason about

- The real test command (`bin/rails test` or `bundle exec rspec`) and the lint gate (`rubocop`) — captured verbatim.
- Request → route → controller → model → view flow, the migration workflow, and where credentials and config live.
- Stack-appropriate skills for models, controllers, migrations, and (if present) jobs and mailers.

## Notes

Capture whether Active Job/Sidekiq and Hotwire/Turbo are in use, and how encrypted credentials (`config/credentials`) are managed.
