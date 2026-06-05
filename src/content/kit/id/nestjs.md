---
title: NestJS
description: "Preset onboarding untuk aplikasi NestJS, dengan petunjuk penalaran untuk modul, controller, provider, DTO, model dekorator, dan test runner."
kind: preset
lang: id
order: 8
stack: NestJS
---

# Preset NestJS

Panduan penalaran yang dipakai alur onboard untuk aplikasi NestJS. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `nest-cli.json`, paket `@nestjs/*` di `package.json`, dan `main.ts` yang memanggil `NestFactory.create`.
- Model dekorator: `@Module`, `@Controller`, `@Injectable`, serta folder fitur berisi modul, controller, service, dan DTO.
- Package manager disimpulkan dari lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Yang perlu dipertimbangkan

- Command test yang sebenarnya (Jest unit `*.spec.ts` dan e2e `*.e2e-spec.ts`), gate lint (`eslint`), dan skrip build — dicatat apa adanya.
- Batas modul, dependency injection, provider, guard/pipe/interceptor, serta tempat penyimpanan konfigurasi (`@nestjs/config`).
- Skill yang sesuai stack untuk modul, controller, provider, dan DTO.

## Catatan

Catat cara modul fitur dihubungkan ke modul root dan apakah aplikasi menggunakan TypeORM/Prisma, microservice, atau GraphQL.
