---
title: "Deep Work Plan — eksekusi terstruktur untuk AI coding agent"
description: "Konteks lebih penting daripada model. Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur tempat coding agent menyelesaikan pekerjaan jangka panjang."
lastUpdated: 2026-09-10
---

## Model itu penting. Konteks lebih penting.

Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur — konteks, pagar pengaman, dan rencana yang tahan lama — tempat agen coding mana pun mengeksekusi dengan presisi dan efisien serta menyelesaikan kerja jangka panjang.

Deep Work Plan (DWP) adalah metodologi dan kit terbuka berlisensi MIT untuk merencanakan dan mengeksekusi pekerjaan perangkat lunak yang kompleks bersama AI agent. Anda tidak memilih metode pemasangan atau menyalin template — Anda menyalin prompt init.md dan menempelkannya ke agent Anda:

> Salin prompt init.md dan tempelkan ke agent coding Anda — Claude Code, Cursor, Codex, atau lainnya — untuk menjadikan repositori apa pun AI-first.

> Deep Work Plan adalah spec-driven development tempat repositori itu sendiri menjadi harness.

- [Buka prompt /init](/init)
- [Baca metodologinya](/methodology)

---

## Masalah dan jawabannya

Dalam ledakan singkat, agen coding mengesankan. Serahkan misi jangka panjang — sebuah migrasi, subsistem baru, refaktor puluhan file — dan mereka menyimpang: konteks penuh, keputusan sebelumnya memudar, dan kerja berjam-jam mandek di tengah jalan.

Deep Work Plan menjawabnya dengan pengembangan berbasis spesifikasi: rencana yang tahan lama, tugas atomik, dan gerbang verifikasi yang harus dilalui agen. Pekerjaan tetap dapat diverifikasi — dan agen mana pun dapat melanjutkannya lintas sesi.

Dan karena konteks adalah sumber daya paling langka bagi agen Anda, harness dirancang untuk efisiensi token: instruksi dimuat progresif, verifikasi hanya menyentuh yang berubah, dan setiap tugas belajar secara lokal — kerja panjang tetap terjangkau.
---

## Manusia memegang kemudi. Agent mengeksekusi.

Anda yang memutuskan arti selesai dan di mana batasnya. Rencana membawa niat Anda; agen yang menghabiskan waktu — tanpa pengawasan terus-menerus, tanpa koreksi setiap dua puluh menit.

- Anda: maksud, kriteria penerimaan, tinjauan
- Agent: eksekusi, tugas demi tugas
- Rencana: kontrak di antara keduanya

[Baca metodologi](/id/methodology)

---

## Rencana yang tidak bisa disimpangi oleh agen.

Tugas panjang mengisi konteks model mana pun. Detail hilang dan agen menyimpang. Rencana tertulis — tugas atomik, gerbang verifikasi, status yang dapat dilanjutkan — adalah tempat kembali setiap putaran.

1. Rencana
2. Tugas atomik
3. Gerbang validasi
4. Penyelesaian
5. Status yang dapat dilanjutkan

[Lihat loop inti](/id/methodology)

---

## Selesai itu kontrak, bukan perasaan.

Setiap tugas menyebutkan kriteria penerimaan dan pemeriksaan yang harus lulus. Agen tidak bisa merasa selesai — harus lulus, atau tugas tetap terbuka.

- Tes lolos
- Tipe terverifikasi
- Kriteria penerimaan terpenuhi
- Atau tugas tetap terbuka

[Baca spesifikasi](/id/spec)

---

## Repositori adalah harness.

Konteks, alat, pagar pengaman, dan status tinggal di repositori Anda sebagai berkas sederhana yang dapat dibaca agen mana pun. Tanpa lock-in, tanpa otak eksternal — bertahan melewati reset konteks.

- Spesifikasi awet di disk
- Gerbang validasi, bukan perasaan
- Selamat dari reset konteks

**PE · ASK · HECK · TAT · OOL**

[Lihat hasil onboarding](/id/quickstart)
---

## Apa yang Anda dapatkan

- AGENTS.md di akar repositori, dipikirkan matang dari stack dan perintah nyata Anda.
- `docs/` terkategori dan dokumentasi per modul.
- Sebuah direktori `.agents/` (skills, agents, commands) dengan symlink `.claude` ke `.agents`.
- Skill Deep Work Plan, dipasang sekali untuk setiap agent — termasuk sub-skill author, sehingga repositori dapat menumbuhkan skill, agent, dan command-nya sendiri, ditambah addon opt-in seperti dependency-upgrade dan addon design-system untuk permukaan antarmuka apa pun yang menghadap pengguna.
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
