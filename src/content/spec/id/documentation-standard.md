---
title: Documentation standard
description: "Standar normatif tentang bagaimana Deep Work Plan mendokumentasikan struktur, tugas, dan kemajuannya: aturan README, penanda status, anatomi tugas sepuluh bagian, dan Final Review."
order: 1
lang: id
section: Standard
---

# Documentation standard

**Versi 5.0.0.** Standar ini mendefinisikan bagaimana Deep Work Plan mendokumentasikan struktur, tugas, dan kemajuannya, serta bagaimana sebuah repositori mendokumentasikan dirinya sendiri agar sebuah agent dapat bertindak dengan aman di dalamnya. Ia berlaku untuk setiap rencana yang dibuat di bawah metodologi DWP. Versi ini menyelaraskan nomor versi dokumen ini dengan standar DWP yang menyertainya — tidak ada persyaratan yang ada berubah — dan menambahkan penegakan anggaran indeks-ramping serta tier fitur yang dijelaskan di bawah. Kata kunci MUST, SHOULD, dan MAY digunakan sebagaimana didefinisikan dalam RFC 2119.

## AGENTS.md sebagai titik masuk yang ringkas

Berkas `AGENTS.md` di root SHOULD tetap berada dalam anggaran 150–500 baris. Ketika konten yang dihasilkan atau dipelihara harness akan melebihinya, agent MUST memindahkan detailnya ke panduan `docs/` (atau dokumen modul/fitur) yang memilikinya dan menautkannya dari indeks — tidak ada yang dibuang, hanya dipindahkan, dan indeks MUST menautkan setiap dokumen yang menerima konten yang dipindahkan. Sebuah `AGENTS.md` tulisan tangan yang sudah melebihi anggaran tidak pernah ditulis ulang secara diam-diam: agent mengusulkan sebuah migrasi konkret (apa yang pindah ke mana, tautan apa yang ditambahkan) dan menerapkannya hanya dengan persetujuan pengembang. Sebuah pemeriksa konformansi memperlakukan anggaran ini sebagai advisory, karena jumlah baris bersifat objektif tetapi kepenulisan tidak — MUST ini mengikat harness yang menghasilkan atau memperbarui berkas tersebut, bukan tebakan pemeriksa tentang siapa yang menulisnya. `AGENTS.md` MUST NOT menautkan sebuah berkas `docs/` yang tidak ada.

Di atas tier dokumentasi per-modul (di bawah) terdapat sebuah **tier fitur**: sebuah area kemampuan utama — lebih besar dari satu modul — mendapatkan `docs/`-nya sendiri di samping kodenya, dimasuki melalui `README.md`-nya sendiri. Sebuah area memenuhi syarat ketika ia mencakup dua atau lebih modul utama, memiliki direktori sub-app atau subsistem yang berdiri sendiri, atau membawa kontraknya sendiri (sebuah permukaan API, kontrak event atau schema) yang bergantung padanya banyak konsumen. Setelah sebuah area dicatat sebagai utama, `docs/` fiturnya SHOULD ada, dan entri paling signifikannya SHOULD ditautkan dari modul-modul yang dicakup area tersebut dan dari indeks `AGENTS.md` root, persis seperti dokumen per-modul. Sebuah area yang sengaja dibiarkan tidak terdokumentasi membawa alasan yang tercatat — sebuah keputusan, bukan sebuah kelalaian.

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
