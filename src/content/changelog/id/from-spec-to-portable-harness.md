---
title: "DWP v1: dari siklus penulisan rencana menjadi harness portabel"
description: "Deep Work Plan berkembang dari satu siklus penulisan rencana menjadi kit adopsi portabel — kepercayaan dan asal-usul, cakupan host agen yang lebih luas, dan pemeriksa kepatuhan yang dapat dijalankan repositori mana pun."
date: 2026-06-12
version: "v1 · Fondasi"
kind: foundation
lang: id
order: 5
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Selama ini, Deep Work Plan adalah siklus penulisan rencana yang diikuti satu agen dalam satu sesi. Rangkaian rilis ini mengubahnya menjadi sesuatu yang dapat diadopsi oleh repositori sesuai kebutuhannya sendiri — versi pertama yang didedikasikan untuk menjangkau lebih dari satu agen dan satu sesi kerja.

Skill ini mendapatkan pernyataan kepercayaan dengan asal-usul yang diverifikasi checksum, sehingga pengembang dapat melihat persis apa yang dibaca dan ditulisnya sebelum dipasang. Preset onboarding dan host agen yang didukung meluas secara signifikan, disiplin pengujian menjadi bagian utama dari setiap tugas alih-alih tambahan belakangan, dan pemeriksa kepatuhan memungkinkan repositori memverifikasi — secara objektif, bukan asumsi — bahwa ia memenuhi standar. Protokol status-dan-lanjutkan berarti rencana yang terputus dapat melanjutkan dari titik terakhir alih-alih memulai dari awal. Di balik layar, kompatibilitas `.claude` dan `.cursor` menyatu ke satu direktori kanonik `.agents`, sehingga setiap agen yang didukung membaca kit yang sama.

Bersama-sama, rilis-rilis ini meletakkan fondasi untuk tahap berikutnya: repositori tidak lagi sekadar tempat menyimpan rencana, melainkan mulai menjadi harness kerja agen.

Tinjau [riwayat rilis skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) untuk urutan lengkapnya.
