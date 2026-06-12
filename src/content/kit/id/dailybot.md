---
title: Dailybot
description: "Addon opsional yang menghubungkan repositori AI-first ke tim Dailybot: laporan progres dan milestone best-effort dalam eksekusi rencana, plus lapisan hook otonom opsional."
kind: addon
lang: id
order: 2
---

# Addon Dailybot

Tampilkan progres Deep Work Plan ke tim Dailybot. Addon opsional untuk tim yang sudah memakai Dailybot.

## Yang ditambahkan

- Instalasi opsional skill agent Dailybot (saat ini 1.7.x, yang juga menambahkan chat tim di Slack, Microsoft Teams, Discord, dan Google Chat) dan/atau CLI Dailybot, melalui alur consent masing-masing.
- Laporan progres/milestone best-effort yang disambungkan ke eksekusi rencana, sehingga penyelesaian sebuah rencana terlihat oleh tim.
- Lapisan hook deterministik opsional (skill agent Dailybot 1.6.0+, CLI 1.12.0+): hook harness yang di-commit mendeteksi pekerjaan yang belum dilaporkan dari buku besar lokal dan mengingatkan agent di akhir giliran, sehingga pelaporan tetap otonom bahkan dalam sesi panjang tanpa pengawasan ketika instruksi prompt memudar.

## Perilaku

Addon ini **menyerahkan** — tidak menciptakan ulang. Skill agent Dailybot yang menangani instalasi, consent, autentikasi, template hook, dan gaya penulisan; addon ini hanya menawarkan untuk memasangnya, menyambungkan langkah laporan opsional, dan menawarkan konfigurasi hook di tingkat repositori. Laporan bersifat best-effort sepenuhnya dan tidak pernah menghambat pekerjaan jika Dailybot tidak ada, belum terautentikasi, atau tidak dapat dijangkau.

Kedua lapisan saling melengkapi tanpa laporan ganda: laporan siklus hidup yang berhasil mengatur ulang buku besar hook, sehingga hook diam setelah sebuah laporan dan hanya bertindak sebagai pengaman deterministik ketika sebuah peristiwa siklus hidup terlewat. Perintah hook hanya membaca keadaan lokal dan selalu keluar dengan kode nol, jadi mereka juga tidak pernah bisa menghambat pekerjaan.

## Catatan

Metodologi inti Deep Work Plan **tidak memiliki** ketergantungan apa pun pada Dailybot. Tawarkan hanya ketika developer atau tim sudah memakai Dailybot; jangan pernah memasangnya otomatis untuk semua orang.
