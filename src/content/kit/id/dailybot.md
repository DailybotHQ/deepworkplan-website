---
title: Dailybot
description: "Addon opsional yang menghubungkan repositori AI-first ke tim Dailybot, menyambungkan laporan progres dan milestone best-effort ke dalam eksekusi rencana."
kind: addon
lang: id
order: 2
---

# Addon Dailybot

Tampilkan progres Deep Work Plan ke tim Dailybot. Addon opsional untuk tim yang sudah memakai Dailybot.

## Yang ditambahkan

- Instalasi opsional skill agent Dailybot dan/atau CLI Dailybot, melalui alur consent masing-masing.
- Laporan progres/milestone best-effort yang disambungkan ke eksekusi rencana, sehingga penyelesaian sebuah rencana terlihat oleh tim.

## Perilaku

Addon ini **menyerahkan** — tidak menciptakan ulang. Skill agent Dailybot yang menangani instalasi, consent, autentikasi, dan gaya penulisan; addon ini hanya menawarkan untuk memasangnya dan menyambungkan langkah laporan opsional. Laporan bersifat best-effort sepenuhnya dan tidak pernah menghambat pekerjaan jika Dailybot tidak ada, belum terautentikasi, atau tidak dapat dijangkau.

## Catatan

Metodologi inti Deep Work Plan **tidak memiliki** ketergantungan apa pun pada Dailybot. Tawarkan hanya ketika developer atau tim sudah memakai Dailybot; jangan pernah memasangnya otomatis untuk semua orang.
