---
title: NestJS
description: "Preset de incorporación para aplicaciones NestJS, con pistas de razonamiento para módulos, controladores, providers, DTOs, el modelo de decoradores y el test runner."
kind: preset
lang: es
order: 8
stack: NestJS
---

# Preset NestJS

Guía de razonamiento que el flujo de onboard usa para aplicaciones NestJS. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `nest-cli.json`, paquetes `@nestjs/*` en `package.json` y `main.ts` llamando a `NestFactory.create`.
- El modelo de decoradores: `@Module`, `@Controller`, `@Injectable` y carpetas de características con módulos, controladores, servicios y DTOs.
- El gestor de paquetes se infiere del lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Qué razonar

- El comando de prueba real (Jest unitario `*.spec.ts` y e2e `*.e2e-spec.ts`), la compuerta de lint (`eslint`) y el script de compilación — capturados al pie de la letra.
- Límites de módulos, inyección de dependencias, providers, guards/pipes/interceptors y dónde vive la configuración (`@nestjs/config`).
- Skills adecuadas al stack para módulos, controladores, providers y DTOs.

## Notas

Captura cómo se conectan los módulos de características al módulo raíz y si la aplicación usa TypeORM/Prisma, microservicios o GraphQL.
