---
title: Vue + Vite
description: "Preset onboarding untuk proyek Vue + Vite, dengan petunjuk penalaran untuk single-file component, Composition API, store Pinia, dan pengujian Vitest."
kind: preset
lang: id
order: 2
stack: Vue + Vite
---

# Preset Vue + Vite

Panduan penalaran yang dipakai alur onboard untuk proyek Vue + Vite. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `vite.config.*` dan `vue` dalam dependensi (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Package manager disimpulkan dari lockfile yang ada.

## Yang perlu dipertimbangkan

- Script lint, type-check (`vue-tsc --noEmit`), test (Vitest/Jest), dan build yang sebenarnya — dicatat apa adanya.
- Konvensi pengujian (`*.spec.ts` / `*.test.ts`) dan pola `@vue/test-utils`.
- Skill yang sesuai dengan stack: `component`, `store-module`, `composable`, `view`/`route`.

## Catatan

Jika `react` ada dalam dependensi alih-alih `vue`, gunakan penalaran yang sama dengan skill yang disesuaikan untuk React.
