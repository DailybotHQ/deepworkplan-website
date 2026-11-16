---
title: "DWP v8: spec-first dengan siklus tertutup"
description: "Deep Work Plan v8 menyatukan rencana spec-first, repositori sebagai harness, Loop engineering, dan efisiensi terukur; siklus menuntaskan rencana yang disetujui."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: id
order: 0
featured: true
sourceLabel: "Rilis bertag dan draf kontrak v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 menyatukan pengembangan spec-first, repositori sebagai harness agen, Loop engineering, dan efisiensi terukur. Kalimat kerja: “Spec-first, siklus tertutup: repositori adalah harness dan rencana berjalan sendiri hingga selesai.”

## Empat pilar

1. **Spec-first:** rencana dan spesifikasi adalah sumber kebenaran tahan lama dengan kriteria penerimaan serta gerbang validasi. 2. **Repositori adalah harness:** konteks, alat, kendali, dan status yang dapat dilanjutkan tinggal bersama kode. 3. **Loop engineering:** rencana yang disetujui mengikuti siklus tercatat sampai selesai. 4. **Efisiensi terukur:** byte instruksi per alur dengan jalur ukur terbuka; persentase token tidak disimpulkan.

## Arti Loop engineering

Rencana mendaftarkan pemimpin dan suksesi berurutan. Manusia memulai daemon Herdr opsional dengan herdr-peers autopilot --loop; pengingat meminta pemimpin melanjutkan tanpa wewenang baru. Jika pemimpin tidak ada, penerus yang tercantum dapat mengambil alih. Peristiwa rencana menuju notifier Dailybot; fleet menampilkan agen dan rencana pada mesin aktif. Manusia memulai daemon; Herdr opsional.

## Rilis yang membawa mekanismenya

Penguatan paket v7.11.0 serta pendaftaran rencana dan notifikasi v7.12.x menyediakan mekanisme rencana. herdr-peers v1.3.x menambah siklus, pelaporan, dan fleet; v2.0.0 menambah brain protocol 2 dan konsumen antrean. coding-agents-kit v1.3.0 menyediakan pick-v2, v1.4.0 pembaru vendor terverifikasi. Tautan rilis bertag ada di atas; addon bersifat opsional.

## Kontrak v8 — RE-VERIFY AT 8.0.0

Draf origin/feat/v8-line menambahkan autonomy ke plan-contract/v8: batas macet, pane yang dapat diberi dorongan, tujuan notifikasi, izin brain bertindak, dan perilaku antrean. Draf juga menetapkan dwp-queue-v1 untuk .dwp/queue.json; paket menulis status antrean dan Herdr membacanya. Klaim sementara harus dicocokkan dengan artefak bertag 8.0.0 sebelum diterbitkan.
