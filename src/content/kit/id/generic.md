---
title: Generic
description: "Preset onboarding cadangan untuk proyek apa pun, dengan petunjuk penalaran yang agnostik terhadap stack untuk mendeteksi command build dan test dari repositori."
kind: preset
lang: id
order: 100
stack: Generic
---

# Preset Generic

Panduan penalaran cadangan yang dipakai alur onboard ketika tidak ada preset khusus stack yang berlaku. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Yang perlu dipertimbangkan

- Deteksi command build dan test yang sebenarnya dari manifest, Makefile, atau CI — dicatat apa adanya.
- Terapkan konvensi umum; jangan membuat asumsi khusus stack.
- Hasilkan hanya skill, agent, dan dokumen yang sesuai dengan alur kerja nyata repositori.

## Catatan

Cadangan ketika tidak ada satu pun dari Django, Vue + Vite, Astro/Svelte, Node/TS service, atau Python package/CLI yang cocok.
