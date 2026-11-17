---
title: "Spesifikasi Deep Work Plan"
description: "Spesifikasi Deep Work Plan yang dapat dibaca: format DWP, protokol agent, arketipe, standar dokumentasi, dan mekanisme addon. Acuan bersama manusia dan agent."
lastUpdated: 2026-09-28
---

## Spesifikasi Deep Work Plan

**Standar saat ini: DWP 8.0.0 (rilis `v8.0.0`).** Dasar yang dipertahankan mencakup lapisan catatan v6 dan ekstensi v7; rencana baru menggunakan `plan-contract/v8` secara default. Rencana v5, v6, dan v7 yang ada mempertahankan generasi tercatat dan hanya dimigrasikan melalui `refine migrate` yang eksplisit. v8 mempertahankan `plan-manifest/v7` serta menambahkan `plan-contract/v8`, `journal-event/v8`, dan `plan-snapshot/v8`; skema manifest dan journal-event v7 tetap didukung untuk rencana yang ada. [Manifest v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [kontrak v8](https://deepworkplan.com/schema/plan-contract/v8.json), [peristiwa journal v8](https://deepworkplan.com/schema/journal-event/v8.json), dan [snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

Spesifikasi adalah definisi metodologi yang presisi dan mudah dibaca — struktur dan protokol yang dibagikan antara manusia dan agent. Ia menyatakan, dalam istilah normatif RFC-2119, bagaimana sebuah rencana spec-driven distrukturkan dan bagaimana agent harus mengeksekusi terhadapnya: rencana adalah sumber kebenaran, validation gate bersifat biner, dan repositori itu sendiri membawa harness yang dibutuhkan agent. Ia disusun ke dalam dokumen-dokumen berurutan:

- **Lapisan rekaman** — lapisan rekaman berbasis bukti: kontrak, jurnal, kelas bukti (ditegaskan vs diamati), persetujuan, dan tanda terima.
- **Sumber daya dan kemampuan** — eksekusi terbatas: manifes konteks, batas sumber daya, kemampuan host, dan registri addon.
- **Delegasi** — eksekusi multi-agen dan kawanan: worktree paralel yang aman, peristiwa delegasi, dan suksesi pemimpin bertahap.
- **Status rencana** — lapisan status yang dapat dibaca mesin: snapshot turunan dari jurnal di v6/v7 (`ledger.py project`), lapisan status historis v5, dan rekonsiliasi.
- **Spesifikasi DWP** — struktur rencana, anatomi tugas, loop eksekusi, bagian Delta untuk perubahan brownfield, Protokol Resume DWP, tingkatan rigor proporsional (micro/standard/deep), dan lapisan status rencana yang dapat dibaca mesin.
- **Protokol agent** — perilaku lintas agent yang diwajibkan, pemetaan command, supported agents (termasuk OpenClaw dan Hermes), dan profil eksekusi (interaktif versus tanpa pengawasan) beserta kondisi berhenti dan kelanjutan terjadwal.
- **Arketipe** — repo individual, orchestrator hub, dan ruang kerja agent (rumah long-lived dari agent otonom: ruang kerja OpenClaw, direktori layanan Hermes, volume cloud agent); heuristik klasifikasi dan bagaimana onboarding berbeda.
- **Addon** — mekanisme opt-in untuk menambahkan kemampuan opsional, termasuk sub-skill author (sehingga sebuah repositori menumbuhkan kit-nya sendiri), addon perawatan seperti dependency-upgrade, dan addon design-system (sebuah `docs/DESIGN.md` yang dinalar dari sumber desain nyata repo, dengan profil untuk UI visual, output CLI, dan permukaan percakapan).
- **Konformansi** — definisi normatif dari sebuah repositori AI-first: artefak yang HARUS dan SEBAIKNYA dimiliki sebuah repositori, apa yang membuat sebuah rencana terbentuk dengan baik, dan cara memverifikasinya secara objektif dengan `/dwp-verify`.
- **Status rencana** — lapisan status yang dapat dibaca mesin: `manifest.json` dan `state.json`, catatan gate, catatan outcome sebagai memori episodik, rekonsiliasi (markdown menang), dan kapan lapisan ini diwajibkan.

- [Baca spesifikasinya](/spec)
- [Baca metodologinya](/methodology)
