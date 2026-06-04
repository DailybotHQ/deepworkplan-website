---
title: "Deep Work Plan — eksekusi terstruktur untuk AI coding agent"
description: "Konteks lebih penting daripada model. Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur tempat coding agent menyelesaikan pekerjaan jangka panjang."
lastUpdated: 2026-06-03
---

## Model itu penting. Konteks lebih penting.

Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur — konteks, pengaman, dan rencana yang tahan lama — tempat coding agent mana pun mengeksekusi dengan presisi dan menyelesaikan pekerjaan jangka panjang.

Deep Work Plan (DWP) adalah metodologi dan kit terbuka berlisensi MIT untuk merencanakan dan mengeksekusi pekerjaan perangkat lunak yang kompleks bersama AI agent. Anda tidak memilih metode pemasangan atau menyalin template — Anda menyerahkan satu baris kepada agent Anda:

> Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.

> Deep Work Plan adalah spec-driven development tempat repositori itu sendiri menjadi harness.

- [Buka prompt /init](/init)
- [Baca metodologinya](/methodology)

---

## Masalah dan jawabannya

AI coding agent sangat efektif dalam tugas singkat. Pada pekerjaan jangka panjang — migrasi, subsistem baru, atau refaktor lintas puluhan berkas — mereka melenceng: konteks penuh, keputusan terlupakan, dan tugas multijam ditinggalkan di tengah jalan.

Deep Work Plan menjawabnya dengan **spec-driven development**: rencana adalah sumber kebenaran yang tahan lama, dan agent mengeksekusi terhadap acceptance criteria serta validation gate yang eksplisit. Penyimpangan berkurang, pekerjaan tetap dapat diverifikasi, dan agent mana pun dapat melanjutkannya lintas sesi. Tidak seperti alat spec-driven yang terikat pada satu IDE atau vendor (GitHub Spec Kit, Amazon Kiro, Tessl), DWP agnostik terhadap alat dan repo-native.

Ini juga **harness engineering** yang dibuat portabel. Sebuah agent harness adalah perancah di sekitar model — konteks, alat, control loop, pengaman, status yang dapat dilanjutkan — yang membuatnya andal. Deep Work Plan memasang harness itu ke dalam repositori itu sendiri, sehingga agent mana pun dapat mengemudikan repo mana pun.

---

## Apa yang Anda dapatkan

- AGENTS.md di akar repositori, dipikirkan matang dari stack dan perintah nyata Anda.
- `docs/` terkategori dan dokumentasi per modul.
- Sebuah direktori `.agents/` (skills, agents, commands) dengan symlink `.claude` ke `.agents`.
- Skill Deep Work Plan, dipasang sekali untuk setiap agent — termasuk sub-skill author, sehingga repositori dapat menumbuhkan skill, agent, dan command-nya sendiri, ditambah addon perawatan opt-in seperti dependency-upgrade.
- Rencana jangka panjang yang dapat dilanjutkan di folder `.dwp/` yang di-gitignore.

---

## Apa yang terjadi saat Anda menjalankannya

1. **Agent Anda membuka [/init.md](/init.md)** — ia membaca prompt onboarding beserta metodologi, spec, dan kit yang ditautkannya.
2. **Ia memasang skill Deep Work Plan** — mesinnya, identik di setiap repositori: router ditambah sub-skill-nya (create, execute, refine, resume, status, verify, onboard, author), untuk Claude Code, Cursor, Codex, Gemini, dan Copilot.
3. **Ia menyesuaikan repositori Anda** — dengan bernalar tentang stack nyata Anda (tidak pernah menyalin-tempel), ia menulis AGENTS.md, `docs/`, README per modul, kit `.agents/` yang dipikirkan matang, dan `.dwp/` yang di-gitignore. Repositori Anda menjadi harness.
4. **Anda merencanakan dan mengeksekusi** — Deep Work Plan jangka panjang, dijalankan langkah demi langkah terhadap acceptance criteria dan validation gate yang eksplisit, secara otonom selama berjam-jam.

Skill adalah mesin yang dapat dipakai ulang, dipasang dengan cara yang sama di mana saja; yang disesuaikan adalah repositori Anda. Mekanisme pemasangan (Skills CLI, OpenClaw, atau git clone) ada di prompt [/init.md](/init.md) dan di [quickstart](/quickstart).

---

## Metodologi, spesifikasi, dan kit

- [Baca metodologinya](/methodology) — apa itu DWP, prinsipnya, alur kerjanya, dan cara mengadopsinya.
- [Baca spesifikasinya](/spec) — anatomi tugas, validation gate, completion protocol, arketipe, dan addon.
- [Jelajahi kit](/kit) — preset, adapter, dan command untuk memasang DWP ke dalam sebuah repositori.
- [Lihat contoh](/examples) — panduan sebelum-dan-sesudah dari pekerjaan teknik nyata.

---

## Siapa yang membangunnya

Deep Work Plan tumbuh dari pekerjaan teknik nyata di [Dailybot](https://www.dailybot.com) dan dirawat oleh Dailybot bersama komunitas sumber terbuka.

- [Tentang metodologi](/about)
- [Komunitas & kontak](/contact)
- [Repositori GitHub](https://github.com/DailybotHQ/deepworkplan-website)
