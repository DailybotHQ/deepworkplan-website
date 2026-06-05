---
title: Next.js
description: "Preset onboarding untuk proyek Next.js, dengan petunjuk penalaran untuk App vs Pages Router, Server dan Client Components, route handler, dan pengujian."
kind: preset
lang: id
order: 12
stack: Next.js (React)
---

# Preset Next.js

Panduan penalaran yang dipakai alur onboard untuk proyek Next.js. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `package.json` dengan `next` dan `react`, ditambah `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Components, route handler) atau `pages/` (Pages Router, API route) — deteksi mana yang digunakan.
- Package manager disimpulkan dari lockfile yang ada (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Yang perlu dipertimbangkan

- Skrip lint (`eslint` dengan `next/core-web-vitals`), test (Jest/Vitest, ditambah Playwright/Cypress e2e), dan build (`next build`) yang sebenarnya — dicatat apa adanya.
- Model router (App vs Pages), pemisahan Server vs Client Component, serta tempat pengambilan data dan route handler.
- Skill yang sesuai stack: `page`/`route`, `server-component`, `route-handler`, `component`.

## Catatan

Deteksi router terlebih dahulu sebelum menghasilkan skill — App Router dan Pages Router memiliki konvensi file dan model pengambilan data yang berbeda.
