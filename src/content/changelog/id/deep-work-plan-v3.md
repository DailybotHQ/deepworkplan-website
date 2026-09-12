---
title: "DWP v3: efisiensi token sebagai bagian dari desain"
description: "Deep Work Plan v3 membangun ulang harness di sekitar biaya konteks — pengungkapan bertahap, validasi yang hanya menyasar bagian terdampak, dan satu tinjauan akhir wajib — sekaligus menaikkan standar kepercayaan dan kepatuhan."
date: 2026-09-10
version: "v3 · Efisiensi token"
kind: release
lang: id
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Hari ini kami merilis Deep Work Plan v3. Konteks adalah sumber daya paling langka bagi agen, dan rilis ini memperlakukannya sebagai masalah rekayasa, bukan sekadar janji informal: yang dipadatkan adalah perancahnya, bukan instruksinya.

`GUIDE.md` kini menjadi indeks perutean, bukan dokumen yang dibaca penuh oleh setiap agen, sehingga agen hanya memuat panduan yang benar-benar dibutuhkan pada langkah tertentu. Gerbang validasi kini dipilih berdasarkan permukaan terdampak tiap tugas, bukan dengan menjalankan ulang seluruh rangkaian pengujian pada setiap perubahan, dan pembuatan rencana dapat langsung masuk ke mode kepercayaan ketika pengembang sudah tahu yang diinginkannya, melewati tinjauan perantara. Tak satu pun dari ini melemahkan gerbang: yang dihilangkan adalah pembacaan berulang, pemuatan konteks yang berlebihan, dan pekerjaan validasi yang tidak sesuai dengan apa yang sebenarnya berubah.

Selain kerja efisiensi ini, rilis ini juga menaikkan standar kepercayaan. Satu tinjauan akhir wajib menggantikan tiga tugas penutup yang dulu mengakhiri sebuah rencana, tinjauan lokal AI Diff Reviewer menjadi komponen dasar wajib, dan kepatuhan kini dimulai dari nol add-on opsional — keamanan dan asal-usul adalah persyaratan, bukan sekadar polesan opsional. `AGENTS.md` mencatat asal-usul standar DWP repositori, dan rencana lama tetap mempertahankan bentuk tercatatnya dengan jalur migrasi eksplisit alih-alih ditulis ulang secara diam-diam.

Rilis ini mengikuti standar DWP `2.3.0`. Beban instruksi dan perilaku replay diukur terhadap buku besar evaluasi publik, bukan dilaporkan sebagai persentase penghematan yang direka-reka.

Baca [arsitektur efisiensi token](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) dan [catatan evaluasinya](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), atau jelajahi [spesifikasi normatif](https://deepworkplan.com/spec) dan [kit](https://deepworkplan.com/kit/).
