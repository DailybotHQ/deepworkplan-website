---
title: Nuxt
description: "Preset onboarding untuk proyek Nuxt, dengan petunjuk penalaran untuk halaman, route API server, composable, engine server Nitro, dan pengujian."
kind: preset
lang: id
order: 14
stack: Nuxt (Vue)
---

# Preset Nuxt

Panduan penalaran yang dipakai alur onboard untuk proyek Nuxt. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `nuxt.config.ts` dan `nuxt` di dependensi, dengan titik masuk `app.vue`.
- `pages/` (routing berbasis file), `server/api/` (endpoint Nitro), `composables/`, dan `components/` yang di-auto-import.
- Package manager disimpulkan dari lockfile yang ada (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Yang perlu dipertimbangkan

- Skrip lint (`eslint`), type-check (`nuxi typecheck`), test (Vitest dengan `@nuxt/test-utils`), dan build (`nuxt build`) yang sebenarnya — dicatat apa adanya.
- Routing dan pengambilan data (`useFetch`/`useAsyncData`), route `server/api/` Nitro, composable, serta konvensi auto-import; mode render (SSR/SSG/SPA).
- Skill yang sesuai stack: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Catatan

Auto-import (komponen, composable, utils) adalah konvensi Nuxt — pertimbangkan hal ini daripada menambahkan import eksplisit di mana-mana.
