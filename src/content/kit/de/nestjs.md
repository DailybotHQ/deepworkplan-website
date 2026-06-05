---
title: NestJS
description: "Ein Onboarding-Preset für NestJS-Anwendungen mit Reasoning-Hinweisen zu Modulen, Controllern, Providern, DTOs, dem Decorator-Modell und dem Test-Runner."
kind: preset
lang: de
order: 8
stack: NestJS
---

# NestJS-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für NestJS-Anwendungen nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `nest-cli.json`, `@nestjs/*`-Pakete in `package.json` und `main.ts` mit Aufruf von `NestFactory.create`.
- Das Decorator-Modell: `@Module`, `@Controller`, `@Injectable` sowie Feature-Ordner mit Modulen, Controllern, Services und DTOs.
- Paketmanager wird aus der Lockfile abgeleitet (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Worüber nachzudenken ist

- Der echte Test-Befehl (Jest-Unit `*.spec.ts` und e2e `*.e2e-spec.ts`), das Lint-Gate (`eslint`) und das Build-Skript — wortwörtlich erfasst.
- Modulgrenzen, Dependency Injection, Provider, Guards/Pipes/Interceptors und der Ort der Konfiguration (`@nestjs/config`).
- Stack-passende Skills für Module, Controller, Provider und DTOs.

## Hinweise

Festhalten, wie Feature-Module in das Root-Modul eingebunden werden und ob die App TypeORM/Prisma, Microservices oder GraphQL verwendet.
