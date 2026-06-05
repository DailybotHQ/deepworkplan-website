---
title: NestJS
description: "Um preset de onboarding para aplicações NestJS, com pistas de raciocínio para módulos, controllers, providers, DTOs, o modelo de decorators e o test runner."
kind: preset
lang: pt
order: 8
stack: NestJS
---

# Preset NestJS

Um guia de raciocínio que o fluxo de onboarding usa para aplicações NestJS. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `nest-cli.json`, pacotes `@nestjs/*` em `package.json` e `main.ts` chamando `NestFactory.create`.
- O modelo de decorators: `@Module`, `@Controller`, `@Injectable` e pastas de feature com módulos, controllers, services e DTOs.
- Gerenciador de pacotes inferido a partir do lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Sobre o que raciocinar

- O comando de teste real (Jest unitário `*.spec.ts` e e2e `*.e2e-spec.ts`), o gate de lint (`eslint`) e o script de build — capturados literalmente.
- Fronteiras de módulo, injeção de dependência, providers, guards/pipes/interceptors e onde a configuração fica (`@nestjs/config`).
- Skills adequadas à stack para módulos, controllers, providers e DTOs.

## Notas

Capturar como os módulos de feature são conectados ao módulo raiz e se o app usa TypeORM/Prisma, microserviços ou GraphQL.
