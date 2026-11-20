---
title: "DWP v8: spec-first dengan siklus tertutup"
description: "Deep Work Plan v8 menyatukan rencana spec-first, repositori sebagai harness, Loop engineering, dan efisiensi terukur; siklus menuntaskan rencana yang disetujui."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: id
order: 0
featured: true
sourceLabel: "Rilis skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Rilis skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Rilis skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Rilis skill v8.0.6"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.6"
  - label: "LOOP_ENGINEERING.md (normatif, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering di pembaca spesifikasi"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Skema plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Skema journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Skema plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Penulis antrean rencana (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Rilis skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Rilis skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Rilis skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.2"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.2"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 menyatukan empat gagasan: pengembangan spec-first, repositori sebagai harness agen, Loop engineering, dan efisiensi terukur. Kalimat kerjanya: “Spec-first, loop-closed: repositori adalah harness dan rencana berjalan sendiri hingga selesai.”

## Empat pilar

1. **Spec-first.** Rencana dan spesifikasinya adalah sumber kebenaran yang tahan lama, dengan kriteria penerimaan dan gerbang validasi yang jelas.
2. **Repositori adalah harness.** Konteks, alat, aturan kendali, dan status yang dapat dilanjutkan berada bersama kode agar berbagai agen bekerja dari repositori yang sama.
3. **Loop engineering.** Rencana yang disetujui dapat menempuh siklus hidup tercatatnya hingga selesai.
4. **Efisiensi terukur.** Efisiensi dinyatakan dalam byte instruksi per alur dengan jalur pengukuran yang dipublikasikan; persentase token tidak disimpulkan.

## Arti Loop engineering

Rencana mencatat pemimpin dan urutan penerus. Seseorang memulai daemon Herdr opsional dengan `herdr-peers autopilot --loop`; pengingatnya meminta pemimpin melanjutkan tanpa memberi wewenang baru. Jika pemimpin tidak tersedia, loop dapat meminta penerus yang tercatat untuk mengambil alih. Peristiwa rencana dapat dikirim ke notifier Dailybot paket, dan tampilan fleet menunjukkan agen serta rencana pada mesin yang diaktifkan. Seseorang tetap bertanggung jawab memulai daemon; addon Herdr bersifat opsional.

## Rilis yang membawa mekanisme ini

Penguatan paket v7.11.0 serta rilis pendaftaran rencana dan notifikasi v7.12.x menyediakan mekanisme di sisi rencana. herdr-peers v1.3.x menambahkan loop, laporan, dan tampilan fleet; v2.0.0 menambahkan brain protocol 2 dan konsumen antrean. coding-agents-kit v1.3.0 menyediakan kontrak peluncuran pick-v2, sementara v1.4.0 menambahkan updater terverifikasi. herdr-peers v2.1.0 membaca blocker terstruktur v8, dan coding-agents-kit v1.5.0 mengukur token yang dilaporkan saja. Deskriptor addon paket 8.0.0 menetapkan herdr-peers v2.1.0, coding-agents-kit v1.5.0, dan devcontainer-kit v1.3.0. Rilis bertag ditautkan di atas. Paket tetap berfungsi tanpa addon opsional ini.

## Kontrak v8

Rilis 8.0.0 menerapkan standar DWP 8.0.0. Rencana baru dibuat dengan `plan-contract/v8`; rencana v7, v6, dan v5 mempertahankan generasi tercatat dan hanya berpindah melalui migrasi eksplisit `refine migrate`. Rencana v8 mempertahankan lini `plan-manifest/v7`, dan `journal-event/v7` tetap didukung untuk rencana yang ada. Sumber normatifnya adalah `LOOP_ENGINEERING.md`, beserta tiga skema yang diterbitkan.

- **Blok `autonomy`.** Blok opsional dan tertutup dalam `plan-contract/v8` yang mencatat wewenang loop rencana: `stall_budget` (1–10, default 3), pane `promptable` (default hanya pemimpin), target `notify` (default tidak ada), `brain` (default `false`), dan `queue` (`prompt-lead`, `launch`, atau `none`, default `none`). Jika blok tidak ada, semua nilai default berlaku dan manusia tetap menjadi penyelesai.
- **Blocker terstruktur.** Blocker adalah peristiwa `blocker` dari `journal-event/v8`, dibuat dan diselesaikan hanya melalui helper ledger, dengan tugas, alasan, satu baris `needs`, kelas wajib C1–C7, dan resolver opsional. `resolver: lead` ditolak untuk C1, C2, C5, dan C6; loop hanya meminta pemimpin menyelesaikan blocker yang ditandai `resolver: lead` oleh rencana itu sendiri. `state.json` menjadi `plan-snapshot/v8`, dengan blocker aktif dan status turunan `blocked`; `PROGRESS.md` diawali header empat baris: tujuan, tugas saat ini, tindakan berikutnya, dan kebutuhan.
- **Antrean rencana.** `.dwp/queue.json` (`dwp-queue-v1`) hanya ditulis oleh `shared/queue.py` paket atau manusia; saat disetujui, `create` menambahkan rencana dan daemon Herdr hanya membaca antrean. Antrean menampung maksimal 64 rencana dan menjalankan satu rencana per repositori kecuali rencana mengatur `parallel: true`. Antrean yang rusak tidak pernah menghentikan siklus hidup.

Rilis v7 terakhir adalah **7.12.2**.

Rilis skill yang terpasang: **8.0.6**.
