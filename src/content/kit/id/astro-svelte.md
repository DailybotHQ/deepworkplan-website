---
title: Astro / Svelte
description: "Preset onboarding untuk situs Astro, opsional dengan island Svelte, dengan petunjuk penalaran untuk content collection, validasi skema, dan hidrasi island."
kind: preset
lang: id
order: 3
stack: Astro / Svelte
---

# Preset Astro / Svelte

Panduan penalaran yang dipakai alur onboard untuk situs Astro, opsional dengan island Svelte. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `astro.config.*`; opsional `@astrojs/svelte` dan komponen `.svelte`.
- Content Collection di bawah `src/content/` dengan skema Zod.

## Yang perlu dipertimbangkan

- Script lint, type-check (`astro check`), test, dan build yang sebenarnya — dicatat apa adanya.
- Skema content-collection dan konvensi hidrasi island (`client:visible` ketimbang `client:load`).
- Skill yang sesuai dengan stack untuk komponen, halaman, dan entri konten.

## Catatan

Berguna untuk situs berbasis konten yang memakai arsitektur island Astro dengan interaktivitas selektif.
