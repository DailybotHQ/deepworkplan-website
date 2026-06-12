---
title: "Spesifikasi Deep Work Plan"
description: "Spesifikasi Deep Work Plan yang dapat dibaca: format DWP, protokol agent, arketipe, standar dokumentasi, dan mekanisme addon. Acuan bersama manusia dan agent."
lastUpdated: 2026-05-30
---

## Spesifikasi Deep Work Plan

Spesifikasi adalah definisi metodologi yang presisi dan mudah dibaca — struktur dan protokol yang dibagikan antara manusia dan agent. Ia menyatakan, dalam istilah normatif RFC-2119, bagaimana sebuah rencana spec-driven distrukturkan dan bagaimana agent harus mengeksekusi terhadapnya: rencana adalah sumber kebenaran, validation gate bersifat biner, dan repositori itu sendiri membawa harness yang dibutuhkan agent. Ia disusun ke dalam dokumen-dokumen berurutan:

- **Standar dokumentasi** — struktur repositori AI-first.
- **Spesifikasi DWP** (v1.2) — struktur rencana, anatomi tugas, loop eksekusi, bagian Delta untuk perubahan brownfield, Protokol Resume DWP, tingkatan rigor proporsional (micro/standard/deep), dan lapisan status rencana yang dapat dibaca mesin.
- **Protokol agent** (v1.2) — perilaku lintas agent yang diwajibkan, pemetaan command, supported agents (termasuk OpenClaw dan Hermes), dan profil eksekusi (interaktif versus tanpa pengawasan) beserta kondisi berhenti dan kelanjutan terjadwal.
- **Arketipe** (v1.1) — repo individual, orchestrator hub, dan ruang kerja agent (rumah long-lived dari agent otonom: ruang kerja OpenClaw, direktori layanan Hermes, volume cloud agent); heuristik klasifikasi dan bagaimana onboarding berbeda.
- **Addon** — mekanisme opt-in untuk menambahkan kemampuan opsional, termasuk sub-skill author (sehingga sebuah repositori menumbuhkan kit-nya sendiri), addon perawatan seperti dependency-upgrade, dan addon design-system (sebuah `docs/DESIGN.md` yang dinalar dari sumber desain nyata repo, dengan profil untuk UI visual, output CLI, dan permukaan percakapan).
- **Konformansi** — definisi normatif dari sebuah repositori AI-first: artefak yang HARUS dan SEBAIKNYA dimiliki sebuah repositori, apa yang membuat sebuah rencana terbentuk dengan baik, dan cara memverifikasinya secara objektif dengan `/dwp-verify`.
- **Status rencana** — lapisan status yang dapat dibaca mesin: `manifest.json` dan `state.json`, catatan gate, catatan outcome sebagai memori episodik, rekonsiliasi (markdown menang), dan kapan lapisan ini diwajibkan.

- [Baca spesifikasinya](/spec)
- [Baca metodologinya](/methodology)
