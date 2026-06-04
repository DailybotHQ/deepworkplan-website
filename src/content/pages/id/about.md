---
title: "Tentang metodologi"
description: "Deep Work Plan adalah metodologi terbuka dan agnostik terhadap framework untuk pekerjaan teknik yang serius dengan AI coding agent. Dari mana asalnya dan siapa yang merawatnya."
lastUpdated: 2026-05-30
---

## Apa itu

Deep Work Plan (DWP) adalah metodologi, bukan produk. Ia mendefinisikan cara mengubah sebuah tujuan menjadi rencana yang disepakati, memecah rencana itu menjadi tugas-tugas atomik yang dapat diverifikasi secara independen, dan menjalankan setiap tugas dalam loop yang fokus dan diakhiri dengan pemeriksaan.

Ia adalah metodologi spec-driven: rencana adalah sumber kebenaran yang tahan lama, dan agent mengeksekusi terhadap acceptance criteria serta validation gate yang eksplisit. Tidak seperti sistem spec-driven yang terikat pada alat seperti GitHub Spec Kit, Amazon Kiro, atau Tessl, DWP agnostik terhadap alat dan repo-native. Ia juga harness engineering yang dibuat portabel — konteks, pengaman, dan status yang dapat dilanjutkan yang membuat agent andal dipasang ke dalam repositori itu sendiri (AGENTS.md, docs, rumah skill .agents/, dan skill DWP), sehingga agent mana pun dapat mengemudikan repo mana pun.

Ia sengaja dibuat agnostik terhadap AI agent atau stack yang Anda pakai — adapter menerjemahkan core loop yang sama ke Claude, Cursor, Copilot, Codex, Gemini, dan lainnya. Rencana, tugas, dan log eksekusi semuanya berupa Markdown polos, sehingga pekerjaan tetap dapat dibaca, ditinjau, dan dikendalikan versi.

---

## Prinsip inti

- **Rencanakan sebelum eksekusi** — Tidak ada kode yang ditulis sebelum rencana disepakati. Rencana adalah kontrak antara Anda dan agent. [Baca metodologinya](/methodology)
- **Tugas bersifat atomik** — Setiap tugas dibatasi agar dapat dieksekusi dan diverifikasi secara mandiri, lalu di-commit secara atomik. [Lihat spesifikasinya](/spec)
- **Verifikasi semuanya** — Setiap tugas diakhiri dengan pemeriksaan eksplisit sebelum tugas berikutnya dimulai, dengan kemajuan tercatat di git. [Jelajahi kit](/kit)

---

## Sekilas

- Metodologi terbuka, berlisensi MIT
- Agnostik terhadap framework dan agent
- Dirawat oleh Dailybot dan komunitas
- Mencakup spesifikasi, command, adapter, preset, dan contoh
- Hanya Markdown — tanpa runtime, tanpa lock-in
- Mengubah repositori apa pun menjadi basis kode AI-first yang dapat dikemudikan agent

---

## Siapa yang merawatnya

Deep Work Plan tumbuh dari pekerjaan teknik nyata di [Dailybot](https://www.dailybot.com) dan kini dirawat oleh Dailybot bersama komunitas sumber terbuka. Metodologi, spesifikasi, dan kit dirilis di bawah lisensi MIT — bebas dipakai, diadaptasi, dan dikembangkan.

- [Baca metodologinya](/methodology)
- [Mulai Cepat](/quickstart)
- [Repositori GitHub](https://github.com/DailybotHQ/deepworkplan-website)
