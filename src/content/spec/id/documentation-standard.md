---
title: Documentation standard
description: "Standar normatif tentang bagaimana Deep Work Plan mendokumentasikan struktur, tugas, dan kemajuannya: aturan README, penanda status, anatomi tugas sepuluh bagian, dan Final Review."
order: 1
lang: id
section: Standard
---

# Documentation standard

**Versi 1.1.** Standar ini mendefinisikan bagaimana Deep Work Plan mendokumentasikan struktur, tugas, dan kemajuannya. Ia berlaku untuk setiap rencana yang dibuat di bawah metodologi DWP. Kata kunci MUST, SHOULD, dan MAY digunakan sebagaimana didefinisikan dalam RFC 2119.

## README rencana

Setiap rencana MUST memiliki sebuah `README.md` yang berisi:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — pernyataan dalam prosa tentang tujuan rencana.
- **Source material** — tautan atau path ke masukan kanonis (opsional).
- **Tasks** — sebuah tabel Markdown dengan nomor tugas, nama, dan kotak centang status.
- **Status** — sebuah baris dalam bentuk `<n>/<total> tasks complete`.

## Berkas tugas

Setiap berkas tugas MUST bernama `<n>.task_<slug>.md` dan berisi anatomi sepuluh bagian — sembilan bagian klasik ditambah **Touched Surface**: kontrak antara apa yang diubah tugas dan apa yang harus divalidasi (permukaan yang direncanakan vs. yang aktual, konsumen yang terdampak, kelas risiko *isolated*, *seam*, *shared/core*, atau *unknown*, pemetaan test yang dipakai, serta gate yang dipilih beserta alasannya).

## PROGRESS.md

`PROGRESS.md` adalah log eksekusi yang hanya bisa ditambahi (append-only). Setiap entri MUST mencatat:

- Sebuah stempel waktu ISO 8601.
- Nomor dan nama tugas.
- Apa yang dilakukan.
- Penyimpangan atau alasan pelewatan apa pun.

## Penanda status

- `[ ]` — belum dimulai.
- `[~]` — sedang berjalan.
- `[x]` — selesai.
- `[!]` — terhambat.

## Judul

Semua judul MUST menggunakan sentence case. Dokumen SHOULD menghindari bahasa pemasaran dan tanda seru.

## Final Review, keputusan skills per-tugas, dan laporan opsional

Setiap rencana yang ditulis di bawah versi ini MUST diakhiri dengan tepat satu tugas wajib: **Final Review** — pemeriksaan keamanan atas seluruh set perubahan rencana, validasi status akhir pada status relevan terakhir, dan rekonsiliasi keputusan skills. Sebuah temuan keamanan kritis memblokir penyelesaian.

- **Keputusan skills per-tugas.** Completion & Log setiap tugas membawa sebuah **disposisi skills** — `none`, pembaruan atas skill atau agent yang ada, sebuah penciptaan yang dinamai, atau penundaan disertai alasan dan pemiliknya. Penulisan yang beralasan terjadi di dalam tugas pemiliknya, sebelum validation gate-nya, setelah pemeriksaan duplikat terhadap katalog `.agents/`; entri yang beralasan dicatat sebagai kandidat stabil (`T{task}-{seq}`) dalam ledger kandidat skills rencana.
- **Executive Report bersifat opsional, atas permintaan.** Ditawarkan sekali saat penyelesaian; dihasilkan hanya atas permintaan eksplisit dari bukti yang tahan lama. Tanpa jawaban, atau pada eksekusi tanpa pengawasan, rencana tetap selesai tanpanya.
- **Rencana lama.** Rencana yang ditulis di bawah versi sebelumnya diakhiri dengan tiga tugas akhir wajib dan tetap konforman — pemeriksa konformitas MUST menerima bentuk itu.
