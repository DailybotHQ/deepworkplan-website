---
title: NestJS
description: "Un preset d'onboarding pour les applications NestJS, avec des indices de raisonnement sur les modules, contrôleurs, providers, DTOs, le modèle de décorateurs et le test runner."
kind: preset
lang: fr
order: 8
stack: NestJS
---

# Preset NestJS

Un guide de raisonnement que le flux d'onboarding utilise pour les applications NestJS. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `nest-cli.json`, les packages `@nestjs/*` dans `package.json`, et `main.ts` appelant `NestFactory.create`.
- Le modèle de décorateurs : `@Module`, `@Controller`, `@Injectable`, et des dossiers de fonctionnalités contenant modules, contrôleurs, services et DTOs.
- Le gestionnaire de paquets est déduit depuis le lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sur quoi raisonner

- La vraie commande de test (Jest unitaire `*.spec.ts` et e2e `*.e2e-spec.ts`), la porte de lint (`eslint`) et le script de build — capturés verbatim.
- Les frontières de modules, l'injection de dépendances, les providers, les guards/pipes/interceptors, et l'endroit où vit la configuration (`@nestjs/config`).
- Les skills adaptés à la stack pour les modules, contrôleurs, providers et DTOs.

## Notes

Capturer comment les modules de fonctionnalités sont connectés au module racine et si l'application utilise TypeORM/Prisma, des microservices ou GraphQL.
