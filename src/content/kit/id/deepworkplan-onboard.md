---
title: deepworkplan-onboard
description: "Jadikan repositori AI-first dengan menalar stack dan arketipenya, lalu menghasilkan AGENTS.md, docs/, .agents/, dan .dwp/ ber-gitignore yang teradaptasi."
kind: command
lang: id
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Ubah sebuah repositori menjadi codebase AI-first yang spec-driven. Ini adalah sub-skill onboard dari skill Deep Work Plan.

## Fungsinya

`deepworkplan-onboard` memeriksa repositori yang **nyata** — bahasa, framework, package manager, command build/test/lint, modul, konvensi pengujian, bentuk deployment — lalu menghasilkan artefak yang teradaptasi untuknya. Ia menalar; ia tidak pernah menyalin template atau meninggalkan placeholder.

## Penggunaan

```
/deepworkplan-onboard
```

## Perilaku

1. Reconnaissance — deteksi stack dan command validasi yang sebenarnya; cocokkan dengan preset onboarding terdekat.
2. Arketipe — klasifikasikan sebagai repositori individual atau orchestrator hub.
3. Hasilkan `AGENTS.md` + symlink `CLAUDE.md` dengan blok Quick Commands yang nyata.
4. Hasilkan `docs/` (arsitektur, standar, pengujian, keamanan, dan lainnya) serta dokumen per modul.
5. Hasilkan `.agents/` (agent, command `dwp-*` yang ramping, skill sesuai stack, katalog) + `.claude → .agents`.
6. Pasang skill dan siapkan `.dwp/` ber-gitignore (plan, draft) serta ruang kerja sementara `tmp/`.
7. Tawarkan addon opsional, lalu lakukan swauji.

## Catatan

Sebuah repositori sepenuhnya konform tanpa addon sama sekali. Realitas yang terdeteksi selalu mengalahkan asumsi preset.
