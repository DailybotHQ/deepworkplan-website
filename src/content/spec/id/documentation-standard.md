---
title: Documentation standard
description: "Standar normatif tentang bagaimana Deep Work Plan mendokumentasikan struktur, tugas, dan kemajuannya: aturan README, penanda status, dan tiga tugas akhir wajib."
order: 1
lang: id
section: Standard
---

# Documentation standard

**Versi 1.0.** Standar ini mendefinisikan bagaimana Deep Work Plan mendokumentasikan struktur, tugas, dan kemajuannya. Ia berlaku untuk setiap rencana yang dibuat di bawah metodologi DWP. Kata kunci MUST, SHOULD, dan MAY digunakan sebagaimana didefinisikan dalam RFC 2119.

## README rencana

Setiap rencana MUST memiliki sebuah `README.md` yang berisi:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — pernyataan dalam prosa tentang tujuan rencana.
- **Source material** — tautan atau path ke masukan kanonis (opsional).
- **Tasks** — sebuah tabel Markdown dengan nomor tugas, nama, dan kotak centang status.
- **Status** — sebuah baris dalam bentuk `<n>/<total> tasks complete`.

## Berkas tugas

Setiap berkas tugas MUST bernama `<n>.task_<slug>.md` dan berisi anatomi sembilan bagian.

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

## Tiga tugas akhir wajib

Setiap rencana MUST diakhiri dengan tiga tugas standar:

1. **Security Review** — mengaudit seluruh set perubahan rencana untuk secret, risiko injeksi, dan permukaan serangan baru, serta memverifikasi bahwa `docs/SECURITY.md` masih mencerminkan kenyataan. Sebuah temuan kritis memblokir penyelesaian.
2. **Skills & Agents Discovery** — mengidentifikasi skill dan agent yang dapat dipakai ulang yang dibuat.
3. **Executive Report** — ringkasan hasil untuk pemangku kepentingan.
