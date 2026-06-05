---
title: Ruby on Rails
description: "Un preset d'onboarding pour les applications Ruby on Rails, avec des indices de raisonnement sur la structure MVC, les migrations, le framework de test et le pipeline d'assets et de configuration."
kind: preset
lang: fr
order: 10
stack: Ruby on Rails
---

# Preset Ruby on Rails

Un guide de raisonnement que le flux d'onboarding utilise pour les applications Ruby on Rails. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- Un `Gemfile` avec `rails`, l'exécutable `bin/rails` et la structure MVC `app/{models,controllers,views}`.
- `config/routes.rb`, les migrations `db/migrate/` et `db/schema.rb`.
- Le framework de test est déduit depuis ce qui existe : RSpec (`spec/`, `.rspec`) ou Minitest (`test/`).

## Sur quoi raisonner

- La vraie commande de test (`bin/rails test` ou `bundle exec rspec`) et la porte de lint (`rubocop`) — capturées verbatim.
- Le flux requête → route → contrôleur → modèle → vue, le workflow de migration, et l'endroit où vivent les credentials et la configuration.
- Les skills adaptés à la stack pour les modèles, contrôleurs, migrations et (si présents) les jobs et mailers.

## Notes

Capturer si Active Job/Sidekiq et Hotwire/Turbo sont utilisés, et comment les credentials chiffrés (`config/credentials`) sont gérés.
