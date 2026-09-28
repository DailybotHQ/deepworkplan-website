---
title: "DWP v6: metodologi sama, kontrak lebih ketat"
description: "Deep Work Plan v6 mempertahankan metodologi v5 dan menambahkan struktur eksekusi yang lebih ketat. Non-inferioritas hasil agen belum diukur."
date: 2026-09-28
version: "v6 · Struktur lebih ketat"
kind: release
lang: id
order: 0
featured: true
sourceLabel: "Kumpulan skema v6 yang diterbitkan"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 mempertahankan metodologi v5, antarmuka perintah, dan lokasi `.dwp/plans/`. Versi ini menambahkan struktur yang lebih ketat untuk mewakili otoritas rencana, bukti eksekusi, konteks tugas, penjadwalan, dan status aktif.

Kumpulan skema v6 mendefinisikan manifest identitas, kontrak hasil dan otoritas, peristiwa jurnal append-only, manifest konteks per tugas, dan snapshot aktif. Proyeksi aktif v6 adalah snapshot, sehingga `plan-state/v5.json` tetap menjadi skema status untuk rencana v5; `plan-state/v6.json` tidak ada. Rencana yang ada mempertahankan generasi tercatat dan tidak pernah ditulis ulang diam-diam.

Keputusan arsitektur adalah GO: v6 mempertahankan metodologi yang sama dengan struktur rekayasa yang lebih ketat. Ini bukan klaim keunggulan empiris. Non-inferioritas hasil agen belum diukur.

Rencana baru mendapat ID numerik yang meningkat monoton dengan sedikitnya tiga digit (misalnya `PLAN_001_add_payment_webhooks/`). Skema v5 yang dibekukan menghitung ID numerik sebagai satu kata, sehingga slug v5 terdiri dari 2–4 kata dan slug v6 dari 2–5 kata. Folder lama tanpa nomor `PLAN_<slug>/` tetap dapat dibaca dan tidak pernah diganti namanya. Jika ada rencana bernomor, `latest` merujuk ke rencana dengan ID numerik tertinggi.
