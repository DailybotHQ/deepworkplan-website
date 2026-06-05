---
title: NestJS
description: "Preset di onboarding per applicazioni NestJS, con spunti di ragionamento per moduli, controller, provider, DTO, il modello dei decorator e il test runner."
kind: preset
lang: it
order: 8
stack: NestJS
---

# Preset NestJS

Una guida di ragionamento che il flusso di onboard usa per le applicazioni NestJS. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `nest-cli.json`, pacchetti `@nestjs/*` in `package.json` e `main.ts` che chiama `NestFactory.create`.
- Il modello dei decorator: `@Module`, `@Controller`, `@Injectable`, e cartelle feature con moduli, controller, service e DTO.
- Package manager dedotto dal lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Su cosa ragionare

- Il comando di test reale (Jest unit `*.spec.ts` ed e2e `*.e2e-spec.ts`), il gate di lint (`eslint`) e lo script di build — catturati alla lettera.
- Confini dei moduli, dependency injection, provider, guard/pipe/interceptor e dove risiede la configurazione (`@nestjs/config`).
- Skill adatte allo stack per moduli, controller, provider e DTO.

## Note

Catturare come i moduli feature vengono collegati al modulo root e se l'applicazione usa TypeORM/Prisma, microservizi o GraphQL.
