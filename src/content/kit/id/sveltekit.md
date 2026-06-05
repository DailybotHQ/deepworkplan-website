---
title: SvelteKit
description: "Preset onboarding untuk proyek SvelteKit, dengan petunjuk penalaran untuk route, fungsi load, endpoint server, adapter yang dipilih, dan pengujian."
kind: preset
lang: id
order: 13
stack: SvelteKit
---

# Preset SvelteKit

Panduan penalaran yang dipakai alur onboard untuk proyek SvelteKit. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `svelte.config.js` dan `vite.config.*`, dengan `@sveltejs/kit` di dependensi.
- `src/routes/` berisi `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte`, dan endpoint `+server.ts`.
- Package manager disimpulkan dari lockfile yang ada (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Yang perlu dipertimbangkan

- Skrip lint (`eslint`), type-check (`svelte-check`), test (Vitest, ditambah Playwright e2e), dan build (`vite build`) yang sebenarnya — dicatat apa adanya.
- Model routing dan `load` (server vs universal load), form action, dan endpoint API `+server.ts`; adapter yang dikonfigurasi.
- Skill yang sesuai stack: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Catatan

Catat adapter yang dikonfigurasi (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — ini membentuk cerita build dan deploy.
