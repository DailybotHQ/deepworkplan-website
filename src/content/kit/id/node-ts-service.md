---
title: Node / TS service
description: "Preset onboarding untuk service Node dan TypeScript serta API serverless, dengan petunjuk penalaran untuk siklus hidup request, integrasi, dan pengujian."
kind: preset
lang: id
order: 4
stack: Node / TS service
---

# Preset Node / TS service

Panduan penalaran yang dipakai alur onboard untuk service Node/TypeScript dan API serverless. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `tsconfig.json` ditambah framework server (`express`, `fastify`, `@nestjs/*`) atau handler serverless (`serverless.yml`, `template.yaml`, direktori `functions/`).
- Package manager disimpulkan dari lockfile yang ada.

## Yang perlu dipertimbangkan

- Script lint, type-check (`tsc --noEmit`), test (Jest/Vitest), dan build yang sebenarnya — dicatat apa adanya.
- Apakah ini service yang berjalan lama atau serverless — hal ini memengaruhi dokumen arsitektur dan performa.
- Skill yang sesuai dengan stack: `endpoint`/`handler`, `service`, `middleware`, `integration`, atau `lambda-fn`.

## Catatan

Tangkap siklus hidup request atau event, titik integrasi, dan lokasi penyimpanan secret serta konfigurasi.
