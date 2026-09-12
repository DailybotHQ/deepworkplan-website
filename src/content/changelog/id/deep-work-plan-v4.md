---
title: "DWP v4: rencana yang sesuai dengan bobot pekerjaannya"
description: "Deep Work Plan v4 membuat format rencana mengikuti bobot pekerjaan, bukan sebaliknya — rencana Lite kini menjadi proposal lengkap dan langsung dapat dijalankan untuk tugas berbatas, dan tahap draf terpisah dihapuskan."
date: 2026-09-11
version: "v4 · Rencana Lite-first"
kind: release
lang: id
order: 2
featured: false
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Hari ini kami merilis Deep Work Plan v4. Rilis ini tentang kelincahan dan keserbagunaan: metodologi yang sama harus terasa ringan untuk perbaikan berbatas, sekaligus tetap kukuh untuk pekerjaan yang berlangsung berjam-jam atau berhari-hari, tanpa memaksa pengembang memilih format "serius" hanya demi mendapatkan gerbang validasi yang sesungguhnya.

Membuat rencana untuk pekerjaan berbatas kini tidak lagi berarti menulis draf sekali pakai untuk ditinjau lalu menyusun rencana akhir yang terpisah. `create` kini langsung mewujudkan **rencana Lite**: proposal kompak dan sepenuhnya dapat dijalankan dengan catatan tugas sebaris, masing-masing membawa kriteria penerimaannya sendiri, gerbang validasi, dan log penyelesaian. Tidak ada lagi tahap `.dwp/drafts/` — draf dan rencana adalah artefak yang sama, dapat ditinjau dan dijalankan sejak pertama kali ditulis.

Rencana Full dengan berkas per tugas tetap berada di tempatnya: pekerjaan yang lebih panjang dan berisiko tetap mendapat satu berkas per tugas, catatan analisis khusus, dan lapisan status yang sama-sama dapat dilanjutkan. Rencana Lite dapat dinaikkan ke Full kapan pun sebuah persyaratan atau gerbang validasi tidak lagi muat dalam catatan yang kompak, dan representasi mana yang dipakai sejak awal mengikuti sinyal eksplisit yang tercatat — jumlah tugas, permukaan terdampak, risiko, keterbalikan — bukan tebakan.

Rilis ini mengikuti standar DWP `2.4.0`. Baca [spesifikasi normatif](https://deepworkplan.com/spec), jelajahi [kit](https://deepworkplan.com/kit/), atau mulai adopsi dari [`/init`](https://deepworkplan.com/init).
