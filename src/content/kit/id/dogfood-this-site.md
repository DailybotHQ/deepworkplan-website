---
title: "Studi kasus: situs ini"
description: "Bagaimana deepworkplan.com sendiri berjalan di atas Deep Work Plan — kisah nyata repositori Astro produksi yang dijadikan AI-first dengan metodologi yang didokumentasikannya."
kind: example
lang: id
order: 2
---

# Studi kasus: situs ini

Situs yang sedang Anda baca berjalan di atas metodologi yang didokumentasikannya. Ia melakukan dogfooding terhadap Deep Work Plan: skill yang sama, alur `/init` yang sama, rencana `.dwp/` yang sama seperti yang akan dipakai repositori mana pun. Ini kisah nyata, bukan hipotesis.

## Sebelum

Seperti kebanyakan repositori, repositori ini tidak dibangun untuk agent. Konteks tersimpan di kepala orang dan catatan yang terserak, tidak ada satu sumber kebenaran yang dapat dibaca agent, dan onboarding agent baru berarti menjelaskan ulang proyek setiap sesi. Pekerjaan jangka panjang kehilangan arah.

## Mengadopsi DWP

Repositori dijadikan AI-first dengan satu Deep Work Plan, diuraikan menjadi tugas-tugas atomik dengan validation gate:

1. Pasang skill Deep Work Plan sebagai reference install, dipin oleh `skills-lock.json`.
2. Jalankan onboarding untuk menghasilkan `AGENTS.md` yang bernalar, pohon `docs/`, dan dokumen per modul dari stack nyata repositori.
3. Bangun kit `.agents/` lintas agent — delegator command `dwp-*` yang ramping dan katalog yang sesuai dengan isi disk.
4. Siapkan ruang kerja `.dwp/` ber-gitignore untuk rencana dan draf.
5. Verifikasi konformansi dengan `/dwp-verify`.

Setiap tugas divalidasi terhadap gate nyata repositori — `biome`, `astro:check`, test suite, build produksi, dan pemeriksaan paritas agent-endpoint — sebelum ditandai selesai.

## Sesudah

Repositori kini AI-first menurut spesifikasinya sendiri: `AGENTS.md` yang bernalar, pohon `docs/` terkategori, kit `.agents/` lintas agent, dan ruang kerja `.dwp/` ber-gitignore. Agent mana pun — Claude Code, Cursor, Codex, Gemini, Copilot — dapat membukanya, membaca harness, dan mengeksekusi rencana jangka panjang tanpa bimbingan per sesi.

## Hasil

Metodologi ini membuktikan dirinya pada sumbernya sendiri: situs ini dibangun dan dipelihara dengan cara yang sama seperti yang ia anjurkan untuk membangun milik Anda — dengan mengikuti [`/init.md`](/init.md). Jika standar ini berjalan di sini, dalam produksi, ia juga berjalan untuk repositori Anda.
