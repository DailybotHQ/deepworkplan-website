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
7. Pasang tinjauan lokal AI Diff Reviewer yang wajib, tawarkan addon opsional, lalu lakukan swauji.

## Catatan

Sebuah repositori sepenuhnya konform tanpa addon opsional sama sekali; tinjauan lokal AI Diff Reviewer adalah bagian dari baseline sejak standar 2.3.0. Realitas yang terdeteksi selalu mengalahkan asumsi preset.

## Referensi skema v6

Untuk rencana v6, katalog skema yang dapat dibaca mesin diterbitkan pada URL stabil berikut. Proyeksi aktif v6 adalah snapshot; `plan-state/v6.json` tidak ada. Rencana v5 yang ada tetap menggunakan skema status v5, dan rencana lama tidak pernah ditulis ulang secara diam-diam.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

Rencana baru mendapat ID numerik yang meningkat monoton dengan sedikitnya tiga digit (misalnya `PLAN_001_add_payment_webhooks/`). Skema v5 yang dibekukan menghitung ID numerik sebagai satu kata, sehingga slug v5 terdiri dari 2–4 kata dan slug v6 dari 2–5 kata. Folder lama tanpa nomor `PLAN_<slug>/` tetap dapat dibaca dan tidak pernah diganti namanya. Jika ada rencana bernomor, `latest` merujuk ke rencana dengan ID numerik tertinggi.
