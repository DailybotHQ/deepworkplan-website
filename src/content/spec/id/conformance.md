---
title: Conformance
description: "Definisi normatif sebuah repositori konforman DWP yang AI-first: artefak yang HARUS dan SEBAIKNYA dimilikinya, apa yang membuat rencana terbentuk baik, dan cara memverifikasinya."
order: 6
lang: id
section: Conformance
---

# Conformance

**Versi 1.0. Status: Stabil.** Dokumen ini mendefinisikan apa artinya sebuah repositori menjadi *konforman terhadap Deep Work Plan* — yaitu, AI-first dan dapat dikemudikan agent. Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

Konformansi ada agar "AI-first" menjadi properti yang objektif dan dapat diperiksa, bukan sekadar kesan. Sebuah repositori entah memenuhi kriteria di bawah atau tidak. [Sub-skill `verify`](/kit) (`/dwp-verify`) memeriksanya secara mekanis.

## Sebuah repositori yang konforman

Sebuah repositori konforman DWP MUST memenuhi semua hal berikut. Setiap artefak MUST **dipikirkan untuk repositori** — disesuaikan dengan bahasa, framework, dan perintahnya yang nyata. Sebuah stub generik, sebuah placeholder, atau konten yang disalin dari repositori lain tidak memenuhi sebuah kriteria.

1. **`AGENTS.md` di akar.** Repositori MUST berisi sebuah `AGENTS.md` di akar yang mencakup (a) sebuah indeks dokumentasi, (b) aturan-aturan wajib untuk repositori, dan (c) sebuah blok Quick Commands yang perintah-perintahnya **nyata dan dapat dijalankan** di repositori ini. Perintah placeholder (misalnya, `npm test` di repositori yang tidak memakai npm) MUST NOT muncul.
2. **`CLAUDE.md` me-resolve ke `AGENTS.md`.** Sebuah `CLAUDE.md` MUST ada dan me-resolve ke `AGENTS.md` (sebuah symlink, atau padanan yang menjamin satu sumber kebenaran). Keduanya MUST NOT menyimpang.
3. **Sebuah hierarki `docs/`.** Repositori MUST berisi sebuah direktori `docs/` yang mencakup kategori-kategori standar (arsitektur, standar, pengujian, perintah pengembangan, keamanan, dan onboarding agent) dengan konten nyata yang spesifik repositori. Modul kompleks SHOULD membawa `README.md`-nya sendiri.
4. **Sebuah rumah `.agents/`.** Repositori MUST berisi sebuah direktori `.agents/` dengan `agents/`, `commands/`, dan `skills/`, ditambah sebuah katalog di bawah `.agents/docs/` yang **sesuai dengan apa yang ada di disk**. Command `dwp-*` MUST menjadi delegator tipis ke skill yang terpasang. Sebuah path `.claude` MUST me-resolve ke `.agents`.
5. **Sebuah ruang kerja `.dwp/` yang di-gitignore.** Repositori MUST berisi sebuah direktori `.dwp/` dengan `plans/` dan `drafts/`, dan `.dwp/` MUST di-gitignore. Sebuah ruang scratch `tmp/` SHOULD ada dan SHOULD di-gitignore.
6. **Skill metodologi dapat di-resolve.** Skill Deep Work Plan MUST terpasang atau dirujuk sedemikian rupa sehingga sebuah agent di repositori dapat memanggil sub-skill-nya.

Sebuah repositori **sepenuhnya konforman dengan nol addon**. Addon (devcontainer, Dailybot, dependency-upgrade) bersifat opt-in dan MUST NOT diwajibkan untuk konformansi.

## Sebuah rencana yang terbentuk baik

Sebuah Deep Work Plan di `.dwp/plans/` terbentuk baik ketika:

1. Setiap tugas MUST mendeklarasikan **lingkup**, **acceptance criteria**, dan setidaknya satu **validation gate** (sebuah perintah atau pemeriksaan yang secara objektif lulus atau gagal) yang eksplisit.
2. Rencana MUST mempersistenkan kemajuan sehingga pekerjaan bertahan dari interupsi dan dapat dilanjutkan oleh agent yang berbeda.
3. Rencana MUST menyertakan dua tugas akhir wajib — Skills & Agents Discovery dan Executive Report.
4. Tugas SHOULD berlabuh kembali ke tujuan rencana sebelum mengeksekusi, untuk mencegah penyimpangan sepanjang rentang yang panjang.

## Memverifikasi konformansi

Konformansi SHOULD diverifikasi secara mekanis ketimbang dengan inspeksi. Menjalankan `/dwp-verify` menghasilkan laporan lulus/gagal terhadap kriteria di atas: keberadaan dan kenyataan-konten `AGENTS.md`, resolusi `CLAUDE.md`, kategori-kategori `docs/`, kecocokan katalog-versus-disk `.agents/`, status gitignore `.dwp/` dan `tmp/`, dan — untuk sebuah rencana — bahwa setiap tugas membawa acceptance criteria dan sebuah validation gate.

Sebuah repositori SHOULD diverifikasi ulang setelah onboarding dan setelah setiap rencana yang selesai, sehingga konformansi dipelihara ketimbang ditegaskan sekali saja.
