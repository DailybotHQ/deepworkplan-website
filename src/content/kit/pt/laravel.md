---
title: Laravel
description: "Um preset de onboarding para projetos Laravel, com pistas de raciocínio para models Eloquent, controllers, rotas, migrations, comandos Artisan e o test runner."
kind: preset
lang: pt
order: 11
stack: Laravel (PHP)
---

# Preset Laravel

Um guia de raciocínio que o fluxo de onboarding usa para projetos Laravel. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `composer.json` com `laravel/framework`, um script de console `artisan` e uma árvore `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` e `routes/api.php`, `database/migrations/` e models Eloquent.
- Test runner e ferramentas de lint/formatação inferidos a partir de `composer.json` e dos arquivos de configuração presentes.

## Sobre o que raciocinar

- O comando de teste real (`php artisan test`, `vendor/bin/phpunit` ou `vendor/bin/pest`) e qualquer gate de lint/formatação (Pint, PHP-CS-Fixer, PHPStan/Larastan) — capturados literalmente.
- Convenções de roteamento, controller e Eloquent; o fluxo de trabalho de migration; layout de ambiente e configuração (`.env`, `config/`).
- Skills adequadas à stack para models, controllers, migrations e comandos Artisan.

## Notas

Útil para apps Laravel que seguem o layout de projeto padrão. Se o repositório usar Sail/Docker, verificar se os gates de teste e lint rodam dentro do container.
