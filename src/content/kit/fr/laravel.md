---
title: Laravel
description: "Un preset d'onboarding pour les projets Laravel, avec des indices de raisonnement sur les modèles Eloquent, contrôleurs, routes, migrations, commandes Artisan et le test runner."
kind: preset
lang: fr
order: 11
stack: Laravel (PHP)
---

# Preset Laravel

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Laravel. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `composer.json` avec `laravel/framework`, un script console `artisan` et une arborescence `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` et `routes/api.php`, `database/migrations/` et les modèles Eloquent.
- Le test runner et les outils de lint/formatage sont déduits depuis `composer.json` et les fichiers de configuration présents.

## Sur quoi raisonner

- La vraie commande de test (`php artisan test`, `vendor/bin/phpunit` ou `vendor/bin/pest`) et toute porte de lint/formatage (Pint, PHP-CS-Fixer, PHPStan/Larastan) — capturées verbatim.
- Les conventions de routage, de contrôleur et Eloquent ; le workflow de migration ; la structure d'environnement et de configuration (`.env`, `config/`).
- Les skills adaptés à la stack pour les modèles, contrôleurs, migrations et commandes Artisan.

## Notes

Utile pour les applications Laravel suivant la structure de projet standard. Si le dépôt utilise Sail/Docker, capturer si les portes de test et de lint s'exécutent à l'intérieur du conteneur.
