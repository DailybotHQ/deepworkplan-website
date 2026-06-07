---
title: "Spesifikasi Deep Work Plan"
description: "Spesifikasi Deep Work Plan yang dapat dibaca: format DWP, protokol agent, arketipe, standar dokumentasi, dan mekanisme addon. Acuan bersama manusia dan agent."
lastUpdated: 2026-05-30
---

## Spesifikasi Deep Work Plan

Spesifikasi adalah definisi metodologi yang presisi dan mudah dibaca — struktur dan protokol yang dibagikan antara manusia dan agent. Ia menyatakan, dalam istilah normatif RFC-2119, bagaimana sebuah rencana spec-driven distrukturkan dan bagaimana agent harus mengeksekusi terhadapnya: rencana adalah sumber kebenaran, validation gate bersifat biner, dan repositori itu sendiri membawa harness yang dibutuhkan agent. Ia disusun ke dalam dokumen-dokumen berurutan:

- **Standar dokumentasi** — struktur repositori AI-first.
- **Spesifikasi DWP** — struktur rencana, anatomi tugas, dan loop eksekusi.
- **Protokol agent** — perilaku lintas agent yang diwajibkan dan pemetaan command.
- **Arketipe** — repo individual versus orchestrator hub.
- **Addon** — mekanisme opt-in untuk menambahkan kemampuan opsional, termasuk sub-skill author (sehingga sebuah repositori menumbuhkan kit-nya sendiri), addon perawatan seperti dependency-upgrade, dan addon design-system frontend (sebuah `docs/DESIGN.md` yang dinalar dari token desain nyata repo).
- **Konformansi** — definisi normatif dari sebuah repositori AI-first: artefak yang HARUS dan SEBAIKNYA dimiliki sebuah repositori, apa yang membuat sebuah rencana terbentuk dengan baik, dan cara memverifikasinya secara objektif dengan `/dwp-verify`.

- [Baca spesifikasinya](/spec)
- [Baca metodologinya](/methodology)
