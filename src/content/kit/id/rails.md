---
title: Ruby on Rails
description: "Preset onboarding untuk aplikasi Ruby on Rails, dengan petunjuk penalaran untuk tata letak MVC, migrasi, framework test, serta pipeline aset dan konfigurasi."
kind: preset
lang: id
order: 10
stack: Ruby on Rails
---

# Preset Ruby on Rails

Panduan penalaran yang dipakai alur onboard untuk aplikasi Ruby on Rails. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `Gemfile` dengan `rails`, executable `bin/rails`, dan tata letak MVC `app/{models,controllers,views}`.
- `config/routes.rb`, migrasi `db/migrate/`, dan `db/schema.rb`.
- Framework test disimpulkan dari yang ada: RSpec (`spec/`, `.rspec`) atau Minitest (`test/`).

## Yang perlu dipertimbangkan

- Command test yang sebenarnya (`bin/rails test` atau `bundle exec rspec`) dan gate lint (`rubocop`) — dicatat apa adanya.
- Alur request → route → controller → model → view, alur kerja migrasi, serta tempat penyimpanan kredensial dan konfigurasi.
- Skill yang sesuai stack untuk model, controller, migrasi, serta (jika ada) job dan mailer.

## Catatan

Catat apakah Active Job/Sidekiq dan Hotwire/Turbo digunakan, serta cara pengelolaan kredensial terenkripsi (`config/credentials`).
