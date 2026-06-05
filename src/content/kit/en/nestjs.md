---
title: NestJS
description: "An onboarding preset for NestJS applications, with reasoning cues for modules, controllers, providers, DTOs, the decorator model, and the test runner."
kind: preset
lang: en
order: 8
stack: NestJS
---

# NestJS preset

A reasoning guide the onboard flow uses for NestJS applications. It is a checklist, not a template — detected reality wins.

## Signals

- `nest-cli.json`, `@nestjs/*` packages in `package.json`, and `main.ts` calling `NestFactory.create`.
- The decorator model: `@Module`, `@Controller`, `@Injectable`, and feature folders with modules, controllers, services, and DTOs.
- Package manager inferred from the lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## What to reason about

- The real test command (Jest unit `*.spec.ts` and e2e `*.e2e-spec.ts`), the lint gate (`eslint`), and the build script — captured verbatim.
- Module boundaries, dependency injection, providers, guards/pipes/interceptors, and where configuration lives (`@nestjs/config`).
- Stack-appropriate skills for modules, controllers, providers, and DTOs.

## Notes

Capture how feature modules are wired into the root module and whether the app uses TypeORM/Prisma, microservices, or GraphQL.
