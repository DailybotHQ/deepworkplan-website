---
title: AI Diff Reviewer
description: "Tinjauan lokal kritis terverifikasi di setiap Final Review sejak standar 2.3.0; gerbang CI dengan grok dan loop address-review tetap opsional."
kind: addon
lang: id
order: 5
---

# Add-on AI Diff Reviewer

Setiap Deep Work Plan berakhir dengan cara yang sama: sebuah **Final Review** wajib yang membaca seluruh himpunan perubahan yang dikumpulkan rencana itu sebelum pekerjaan boleh disebut selesai. Pemeriksaan keamanan di dalamnya adalah titik terakhir di mana sesuatu masih bisa tertangkap. Tanpa bantuan, satu-satunya pembaca pada titik itu adalah agent yang sama yang menulis kodenya.

Add-on ini menempatkan pembaca kedua pada diff tersebut. Ia menghubungkan **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — terdaftar di marketplace sebagai "AI Diff Reviewer", rilis saat ini **v3.1.1** — ke pemeriksaan keamanan, tempat ia mengembalikan sesuatu yang terstruktur alih-alih prosa: sebuah putusan, tabel temuan, dan tingkat keparahan untuk setiap temuan. Sejak v3, temuan `critical` berarti verifikator add-on telah mengonfirmasinya dengan panggilan model kedua yang berbasis kode; hanya kritis terverifikasi yang memblokir penyelesaian sampai diperbaiki atau diterima secara eksplisit. Tinjauan ini adalah gerbang, bukan komentar.

Sejak standar 2.3.0 tinjauan lokal itu **bagian dari baseline, bukan tambahan**. Onboarding memasangnya; setiap Final Review menjalankannya. Yang tetap opsional adalah permukaan CI — Flow B, tempat tinjauan yang sama mengawal pull request melalui GitHub Action.

Batas yang membuat ini aman diadopsi sengaja dibuat sempit. Peninjau adalah skill berlisensi MIT yang dipatok ke sebuah tag dan dijalankan oleh coding agent yang sudah Anda pakai, sehingga tidak ada alur Deep Work Plan yang bergantung pada layanan komersial, penyedia CI, atau sebuah secret. **Flow A** (hanya lokal) adalah yang diterima setiap repositori yang telah di-onboarding; **Flow B** ditawarkan secara eksplisit dan tidak pernah dipasang tanpa diminta. Pengembang juga boleh menolak peninjau itu sama sekali — penolakan tersebut dicatat sebagai pengecualian yang dinyatakan, dan `verify` melaporkan repositori sebagai tidak sesuai pada poin itu sampai peninjau dipasang.

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
| **B — permukaan ganda** | Flow A ditambah `setup` menulis alur kerja tinjauan (Action `@v3`), file ekstensi yang sama untuk lokal dan CI. Pendamping `apply-review` dan `address-review` opsional setelah CI memposting temuan. |

Deteksi untuk tinjauan lokal memerlukan **skill + file ekstensi** di salah satu dari: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, atau `.github/ai-pr-reviewer/extension.md`. Skill saja tidak cukup.

## Yang Dihubungkan Add-on Ini (sengaja dibatasi)

Add-on DWP **tidak** menemukan ulang pengulas. Ini mendelegasikan instalasi, metodologi, wizard CI, penulisan ekstensi, pembuatan draf PR, dan loop tinjauan pasca-CI ke enam sub-skill skill upstream (alur default induk, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### Tinjauan lokal yang wajib

`create` menambahkan langkah tinjauan lokal ke pemeriksaan keamanan setiap Final Review dan `execute` menjalankannya. Output ditambahkan di bawah `## AI Diff Reviewer local review` di `analysis_results/SECURITY_REVIEW.md` milik plan tersebut (di dalam folder plan itu sendiri, bukan di root repo).

- **Pengulas tidak ada — dicatat, tidak pernah dilewati diam-diam:** skill atau ekstensi yang hilang menjadi temuan `local reviewer not installed`; Final Review menjalankan penerusan lokal saat skill ada dan sebaliknya membawa temuan itu ke laporan penyelesaian — instalasi milik persetujuan onboarding atau invokasi addon yang eksplisit, tidak pernah menjadi bootstrap kejutan.
- **Kegagalan lunak (hanya pemanggilan):** tinjauan yang bisa dimulai tetapi gagal → peringatkan sekali, catat, lanjutkan; jangan pernah gagalkan tugas karena hal itu.
- **Gerbang setelah penerusan selesai:** **kritis terverifikasi** memblokir penyelesaian Final Review hingga diperbaiki atau diterima secara eksplisit (BC-07). Klaim kritis yang belum terverifikasi muncul sebagai peringatan beranotasi — terlihat, tidak memblokir, kecuali `strict-unverified-criticals: true` memulihkan penyaringan berbasis klaim. Tinjauan yang menghabiskan batas putarannya (`incomplete`) atau jam dindingnya (`timeout`) bukan kelulusan yang bersih di bawah ketatan yang memblokir (BC-04). `warning` / `info` didokumentasikan tetapi tidak memblokir.
- **Flow A tidak memerlukan secret CI.** Kunci penyedia yang tidak disetel tidak boleh menekan penerusan lokal.

### Gerbang CI Flow B (opsional)

Action `DailybotHQ/ai-diff-reviewer@v3`, biasanya dibatasi label (`ready`), dengan pekerjaan **AI review gate** bernama stabil untuk perlindungan cabang dan label lewati opsional `skip-review-label: skip-ai-review`. Sejak v3, anggaran tinjauan mengikuti tingkat risiko deterministik dari perubahan — 8/20/30/40 putaran dari `low` hingga `critical` di bawah `budget-profile: auto` (`fixed` memulihkan konstanta pra-v3 selama transisi) — dan push yang tidak mengubah kode menjalankan satu putaran khusus verifikator. `prompt.md` bersama + ekstensi menyelaraskan metodologi dan tingkat keparahan; lokal dan CI tetap identik secara metodologi, sementara putaran CI 2+ mungkin lebih pendek di bawah Tinjauan Sadar Iterasi dan penerusan lokal tetap penuh.

### Pendamping tinjauan opsional

Dua sub-skill yang dapat dipanggil pengembang menutup loop setelah CI memposting tinjauan; tidak satu pun pernah menjadi file tugas rencana (itu akan merusak urutan tugas akhir wajib).

- `apply-review` menelusuri temuan satu per satu (terapkan / tunda / lewati) dengan persetujuan. Hanya baca secara default; tidak pernah melakukan commit atau push.
- `address-review` (baru di v3.1.1) adalah loop satu pemanggilan: temukan PR yang terbuka pada cabang tersebut, periksa bahwa tinjauan sudah mencakup head saat ini, sajikan temuan dengan rencana terapkan/tunda/lewati, lalu — dengan satu ya — terapkan, commit dalam batch kecil Conventional Commits, push, dan lengkapi kembali peninjau sesuai cara repo memicunya (dibatasi label → toggle labelnya; dipicu push → konfirmasi putaran baru). Berbeda dari `apply-review`, ia melakukan commit dan push; itulah inti dari loop ini. Pada tinjauan ensemble teragregasi ia membaca dokumen agregat dan penanda `ai-pr-reviewer-aggregate`.
- Jalur untuk mesin adalah output terstruktur, bukan isi tinjauan: dokumen `review-output/3.0` (`.aiprr/review-output.json`, dilokasikan melalui output `structured-output-path` dan `structured-output-sha256`) membawa catatan eksekusi, temuan dengan bukti dan verifikasi, temuan yang dibantah, dan gerbang. Isi tinjauan yang menyatakan `Recommendation: approve` bukan bukti bahwa pemeriksaan lulus — baca dulu blok Highest severity / Strictness gate / Check status pada penanda pelacakan.

## Apa yang berubah di v3

Tiga rilis tiba pada 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) dan v3.1.1 menyusul dengan sub-skill `address-review`. Tidak satu pun mengubah cara add-on ini menghubungkan peninjau — Flow A, ketiga jalur deteksi, dan tangga tidak-pernah-memblokir tetap sama — tetapi semuanya mengubah apa yang diperoleh penggunanya.

| Perubahan | Artinya bagi repositori DWP |
|-----------|------------------------------|
| **`critical` hanya diterbitkan ketika terverifikasi** (v3.0.0) | Setiap klaim kritis — ditambah sampel 30 % dari peringatan — mendapat pemeriksaan kedua yang singkat dan berbasis kode oleh panggilan model terpisah (≈ 3 k token, 10 detik, dan $0.009 per temuan terverifikasi). Kritis terverifikasi yang menyaring pemeriksaan keamanan; klaim yang dibantah tetap terlihat sebagai peringatan beranotasi dan didaftarkan dalam output terstruktur, tidak pernah inline. |
| **Anggaran mengikuti tingkat risiko** (v3.0.0) | 8/20/30/40 putaran dari `low` hingga `critical`, diturunkan dari inventaris perubahan (`budget-profile: auto`). Push tanpa perubahan kode menjalankan satu putaran khusus verifikator dengan biaya −93 %. `budget-profile: fixed` memulihkan konstanta pra-v3 sebesar 30 putaran. |
| **Tinjauan yang belum selesai berwarna merah** (v3.0.0) | `incomplete` (batas putaran) dan `timeout` (jam dinding) memposting temuan parsial dan gagal di bawah ketatan yang memblokir — "tanpa temuan" kini selalu berarti peninjau sudah melihat dan tidak menemukan apa pun. |
| **Output terstruktur adalah jalur untuk mesin** (v3.0.0) | Dokumen `review-output/3.0` membawa catatan eksekusi, inventaris perubahan, temuan dengan bukti bertipe dan verifikasi, yang dibantah, dan gerbang. Baca dokumennya, bukan menggores isi tinjauan. |
| **Enam sub-skill** (v3.1.1) | `address-review` bergabung ke router: satu pemanggilan menerapkan, commit, push, dan melengkapi kembali peninjau. |
| **Ensemble opsional** (v3.0.0) | Kaki `mode: emit` hanya-baca plus satu pekerjaan `aggregate` memverifikasi temuan gabungan sekali dan menerbitkan satu tinjauan tunggal. |
| **`@v2` tetap berfungsi** | Jalur v2 dibekukan di `release/v2` dengan enam bulan pemeliharaan keamanan dan katalog. v3 adalah rekomendasi, bukan migrasi paksa. |

Dua di antaranya lebih penting bagi metodologi daripada sisanya.

**Gerbang kritis terverifikasi mengeraskan pemeriksaan keamanan.** Sebelum v3, model dapat mengklaim `critical` secara bebas dan gerbang mengikuti klaim itu. Kini temuan kritis dalam sebuah Final Review berarti panggilan model kedua telah mengonfirmasinya terhadap kode, dan kampanye rilis mengukur bedanya: 771 run evaluasi berbayar dalam sepuluh kampanye dengan total sekitar $83, tingkat kritis mencapai 63/63 recall dengan presisi yang diadugasi 1.0, dan putaran inkremental memangkas token input 62–76 %. Angka-angka ini adalah pengukuran yang diterbitkan upstream, bukan milik Deep Work Plan.

**`economy` sengaja tidak lebih murah.** Tolok ukur upstream pada 2026-09-16 mengukur `grok-4.3` pada 0 dari 5 cacat yang diketahui — ia menyetujui tanpa meninjau — sementara `grok-4.5` menyamai `grok-4.6` dengan 3 dari 5 tanpa positif palsu, pada biaya yang sama dan seperempat waktu. Karena tidak ada model xAI yang lebih murah yang masih benar-benar meninjau, `economy` teruraikan ke model yang sama dengan `balanced`, alih-alih menjadi tingkatan yang tidak menemukan apa pun; pada runner grok, yang menskalakan biaya adalah anggaran putaran tingkat risiko, bukan pilihan model. Karena itu jalur xAI naik dari sekitar $0,07 menjadi sekitar $0,40–0,75 per tinjauan melalui CLI; `model: grok-4.3` masih dapat dipatok secara eksplisit untuk mempertahankan perilaku sebelumnya. Angka-angka ini adalah pengukuran yang diterbitkan upstream, bukan milik Deep Work Plan.

## Perilaku

- **Flow A adalah baseline; Flow B ditanyakan, tidak pernah ditebak.** Menginstal alur kerja tanpa diminta memiliki jejak yang lebih besar daripada tetap di Flow A.
- **Rekonsiliasi, jangan menimpa.** Skill, ekstensi, atau alur kerja tinjauan yang ada dipertahankan; isi hanya celah.
- **Autentikasi ditunda.** Secret penyedia untuk CI dikonfigurasi oleh pemelihara; add-on ini tidak pernah menyimpan kredensial.
- **Netral terhadap vendor.** Tidak pernah ada layanan komersial, penyedia CI, atau secret yang diperlukan; permukaan CI adalah satu-satunya bagian yang menyentuh penyedia.

## Catatan

Tinjauan lokal wajib sejak standar 2.3.0; permukaan CI opsional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Panduan migrasi upstream: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Halaman spesifikasi: [Add-ons](/spec/addons).
