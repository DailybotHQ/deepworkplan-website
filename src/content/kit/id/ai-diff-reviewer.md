---
title: AI Diff Reviewer
description: "Add-on DWP opsional: perkuat Tinjauan Keamanan dengan penerusan lokal AI Diff Reviewer, gerbang gabungan CI Flow B opsional (v2), file ekstensi bersama, dan pendamping apply-review."
kind: addon
lang: id
order: 5
---

# Add-on AI Diff Reviewer

Menghubungkan eksekusi Deep Work Plan ke **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (daftar marketplace **"AI Diff Reviewer"**, versi saat ini **v2.0.0**) sehingga tugas akhir wajib **Tinjauan Keamanan** memperoleh tinjauan lokal terstruktur — putusan, tabel temuan, dan tingkat keparahan — dan, saat memilih Flow B, setiap pull request dapat dibatasi oleh tinjauan yang sama di CI. Add-on **opsional**; tidak pernah diperlukan untuk kesesuaian AI-first.

Metodologi inti Deep Work Plan memiliki **nol** ketergantungan pada AI Diff Reviewer. Repositori tanpa add-on sepenuhnya sesuai. Tawarkan add-on ini hanya ketika pengembang atau tim menginginkan kualitas tinjauan terstruktur; jangan pernah menginstal otomatis untuk semua orang. Selalu tanyakan Flow A atau Flow B — jangan pernah mengasumsikan nilai default.

## Kapan Menggunakannya

| Sinyal | Tindakan |
|--------|--------|
| Tim menginginkan gerbang gabungan CI dengan temuan terstruktur | **Rekomendasikan Flow B** saat orientasi |
| Repositori pribadi atau eksperimental; tinjauan lokal sebelum push sudah cukup | **Tawarkan Flow A** |
| Tidak ada keinginan untuk permukaan tinjauan tambahan | **Lewati** — Tinjauan Keamanan dasar tetap berlaku |

## Dua Alur Adopsi

| Alur | Yang Anda Dapatkan |
|------|----------------|
| **A — hanya lokal** | Skill bawaan + `.review/extension.md` yang diperlukan (melalui `generate-extension`). Memperkuat Tinjauan Keamanan dengan penerusan lokal. Tanpa alur kerja GitHub Actions. |
| **B — permukaan ganda** | Flow A ditambah `setup` menulis `.github/workflows/pr-review.yml` (Action `@v2`), file ekstensi yang sama untuk lokal dan CI. Pendamping `apply-review` opsional setelah CI memposting temuan. |

Deteksi untuk peningkatan Tinjauan Keamanan memerlukan **skill + file ekstensi** di salah satu dari: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, atau `.github/ai-pr-reviewer/extension.md`. Skill saja tidak cukup.

## Yang Dihubungkan Add-on Ini (sengaja dibatasi)

Add-on DWP **tidak** menemukan ulang pengulas. Ini mendelegasikan instalasi, metodologi, wizard CI, penulisan ekstensi, pembuatan draf PR, dan walkthrough pasca-CI ke lima sub-skill skill upstream (alur default induk, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Peningkatan Tinjauan Keamanan

Saat terdeteksi, `create` / `execute` menambahkan langkah tinjauan lokal ke tugas Tinjauan Keamanan wajib. Output ditambahkan di bawah `## AI Diff Reviewer local review` di `analysis_results/SECURITY_REVIEW.md`.

- **Kegagalan lunak (hanya pemanggilan):** skill tidak ada, ekstensi tidak ada, atau kesalahan pemanggilan → peringatkan sekali dan lanjutkan; jangan pernah gagalkan tugas karena hal ini.
- **Gerbang setelah penerusan selesai:** temuan `critical` masih memblokir penyelesaian Tinjauan Keamanan hingga diperbaiki atau diterima secara eksplisit (kontrak SR yang ada). `warning` / `info` didokumentasikan tetapi tidak memblokir.
- **Flow A tidak memerlukan secret CI.** `CURSOR_API_KEY` yang tidak disetel tidak boleh menekan penerusan lokal.

### Gerbang CI Flow B (opsional)

Action tetap `DailybotHQ/ai-diff-reviewer@v2`, biasanya dibatasi label (`ready`), dengan pekerjaan **AI review gate** bernama stabil untuk perlindungan cabang dan label lewati opsional `skip-review-label: skip-ai-review`. `prompt.md` bersama + ekstensi menyelaraskan metodologi dan tingkat keparahan; di bawah Tinjauan Sadar Iterasi, putaran CI 2+ mungkin lebih pendek sementara penerusan lokal tetap penuh.

### Pendamping `apply-review` Opsional

Setelah CI memposting tinjauan, pengembang dapat memanggil `apply-review` selama `execute` untuk menelusuri temuan satu per satu (terapkan / tunda / lewati) dengan persetujuan. Hanya baca secara default; tidak pernah sebagai file tugas rencana (akan merusak urutan tugas akhir wajib).

## Perilaku

- **Tanyakan alurnya; jangan pernah menebak.** Menginstal alur kerja tanpa diminta memiliki jejak yang lebih besar daripada tetap di Flow A.
- **Rekonsiliasi, jangan menimpa.** Skill, ekstensi, atau `pr-review.yml` yang ada dipertahankan; isi hanya celah.
- **Autentikasi ditunda.** Secret penyedia untuk CI dikonfigurasi oleh pemelihara; add-on ini tidak pernah menyimpan kredensial.
- **Netral terhadap vendor.** Menolak meninggalkan repositori yang sepenuhnya AI-first.

## Catatan

Opsional dan tidak pernah diperlukan. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Halaman spesifikasi: [Add-ons](/spec/addons).
