---
title: AI Diff Reviewer
description: "Tinjauan lokal wajib di setiap Final Review DWP sejak standar 2.3.0, dipasang oleh onboarding; gerbang CI Flow B (v2), extension bersama, dan apply-review tetap opsional."
kind: addon
lang: id
order: 5
---

# Add-on AI Diff Reviewer

Menghubungkan eksekusi Deep Work Plan ke **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (daftar marketplace **"AI Diff Reviewer"**, versi saat ini **v2.0.0**) sehingga pemeriksaan keamanan dari **Final Review** wajib menjalankan tinjauan lokal terstruktur — putusan, tabel temuan, dan tingkat keparahan — dan, saat memilih Flow B, setiap pull request dapat dibatasi oleh tinjauan yang sama di CI. Sejak standar 2.3.0 **tinjauan lokal adalah bagian dari baseline**: onboarding memasangnya dan setiap Final Review menjalankannya. Hanya permukaan CI yang bersifat opt-in.

Yang tetap netral terhadap vendor adalah batas yang penting: pengulas adalah skill MIT yang dipatok pada tag dan dijalankan oleh coding agent **Anda sendiri** — tidak ada alur Deep Work Plan yang memerlukan layanan komersial, penyedia CI, atau secret. Flow A (hanya lokal) adalah baseline yang diperoleh setiap repositori yang telah di-onboarding; Flow B (CI Action) ditawarkan secara eksplisit dan tidak pernah dipasang tanpa diminta. Pengembang boleh menolak pengulas lokal; penolakan itu dicatat sebagai pengecualian yang dinyatakan dan `verify` melaporkan repositori sebagai tidak sesuai pada poin tersebut hingga ia dipasang.

## Kapan Menggunakannya

| Sinyal | Tindakan |
|--------|--------|
| Setiap repositori yang telah di-onboarding | **Flow A dipasang** pada Fase 7a onboarding (skill vendored + `.review/extension.md`); upgrade harness tertarget menambahkannya ke repositori yang di-onboarding lebih awal |
| Tim menginginkan gerbang gabungan PR CI dengan temuan terstruktur | **Tawarkan Flow B** — opt-in eksplisit, tidak pernah menjadi default |
| Repositori pribadi atau eksperimental; tinjauan lokal sudah cukup | **Tetap di Flow A** — baseline sudah lengkap |

## Dua Alur Adopsi

| Alur | Yang Anda Dapatkan |
|------|----------------|
| **A — hanya lokal (baseline)** | Skill bawaan + `.review/extension.md` yang diperlukan (melalui `generate-extension`). Menjalankan tinjauan lokal di dalam pemeriksaan keamanan setiap Final Review. Tanpa alur kerja GitHub Actions. |
| **B — permukaan ganda** | Flow A ditambah `setup` menulis `.github/workflows/pr-review.yml` (Action `@v2`), file ekstensi yang sama untuk lokal dan CI. Pendamping `apply-review` opsional setelah CI memposting temuan. |

Deteksi untuk tinjauan lokal memerlukan **skill + file ekstensi** di salah satu dari: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, atau `.github/ai-pr-reviewer/extension.md`. Skill saja tidak cukup.

## Yang Dihubungkan Add-on Ini (sengaja dibatasi)

Add-on DWP **tidak** menemukan ulang pengulas. Ini mendelegasikan instalasi, metodologi, wizard CI, penulisan ekstensi, pembuatan draf PR, dan walkthrough pasca-CI ke lima sub-skill skill upstream (alur default induk, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Tinjauan lokal yang wajib

`create` menambahkan langkah tinjauan lokal ke pemeriksaan keamanan setiap Final Review dan `execute` menjalankannya. Output ditambahkan di bawah `## AI Diff Reviewer local review` di `analysis_results/SECURITY_REVIEW.md`.

- **Pengulas tidak ada — dicatat, tidak pernah dilewati diam-diam:** skill atau ekstensi yang hilang menjadi temuan `local reviewer not installed`; ketika eksekusi boleh menulis ke harness (mode trust atau persetujuan eksplisit), agent memasang bagian yang hilang lalu meninjau, jika tidak, temuan itu dibawa ke laporan penyelesaian.
- **Kegagalan lunak (hanya pemanggilan):** tinjauan yang bisa dimulai tetapi gagal → peringatkan sekali, catat, lanjutkan; jangan pernah gagalkan tugas karena hal itu.
- **Gerbang setelah penerusan selesai:** temuan `critical` masih memblokir penyelesaian Final Review hingga diperbaiki atau diterima secara eksplisit. `warning` / `info` didokumentasikan tetapi tidak memblokir.
- **Flow A tidak memerlukan secret CI.** `CURSOR_API_KEY` yang tidak disetel tidak boleh menekan penerusan lokal.

### Gerbang CI Flow B (opsional)

Action tetap `DailybotHQ/ai-diff-reviewer@v2`, biasanya dibatasi label (`ready`), dengan pekerjaan **AI review gate** bernama stabil untuk perlindungan cabang dan label lewati opsional `skip-review-label: skip-ai-review`. `prompt.md` bersama + ekstensi menyelaraskan metodologi dan tingkat keparahan; di bawah Tinjauan Sadar Iterasi, putaran CI 2+ mungkin lebih pendek sementara penerusan lokal tetap penuh.

### Pendamping `apply-review` Opsional

Setelah CI memposting tinjauan, pengembang dapat memanggil `apply-review` selama `execute` untuk menelusuri temuan satu per satu (terapkan / tunda / lewati) dengan persetujuan. Hanya baca secara default; tidak pernah sebagai file tugas rencana (akan merusak urutan tugas akhir wajib).

## Perilaku

- **Flow A adalah baseline; Flow B ditanyakan, tidak pernah ditebak.** Menginstal alur kerja tanpa diminta memiliki jejak yang lebih besar daripada tetap di Flow A.
- **Rekonsiliasi, jangan menimpa.** Skill, ekstensi, atau `pr-review.yml` yang ada dipertahankan; isi hanya celah.
- **Autentikasi ditunda.** Secret penyedia untuk CI dikonfigurasi oleh pemelihara; add-on ini tidak pernah menyimpan kredensial.
- **Netral terhadap vendor.** Tidak pernah ada layanan komersial, penyedia CI, atau secret yang diperlukan; permukaan CI adalah satu-satunya bagian yang menyentuh penyedia.

## Catatan

Tinjauan lokal wajib sejak standar 2.3.0; permukaan CI opsional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Halaman spesifikasi: [Add-ons](/spec/addons).
