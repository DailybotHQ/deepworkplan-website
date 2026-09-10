---
title: "Deep Work Plan dibandingkan dengan alternatifnya"
description: "Relasi Deep Work Plan dengan tool spec-driven, framework agent, dan mode rencana vendor: masing-masing menurut istilahnya, dengan sumber dan tanggal tinjauan."
lastUpdated: 2026-09-10
---

## Deep Work Plan dan alternatifnya

Pilih lapisan yang tepat untuk situasi Anda. Setiap alternatif dideskripsikan menurut istilahnya sendiri, setiap fakta merunut ke dokumentasi resminya, dan halaman ini mencantumkan kapan terakhir ia ditinjau. Ini adalah peta, bukan peringkat.

## Cara membaca halaman ini

Tiga nilai mendeskripsikan setiap kapabilitas. Nilai itu menyatakan di mana sebuah kapabilitas berada di dalam sebuah tool, bukan seberapa bagus tool-nya.

- **Bawaan**
- **Opsional atau melalui ekstensi**
- **Di luar cakupan**

Terakhir ditinjau: 2026-09-10

## Alternatifnya, menurut istilah masing-masing

### Tool spec-driven

**GitHub Spec Kit** — Mengubah sebuah fitur menjadi spesifikasi yang dapat dieksekusi melalui konstitusi, spesifikasi, rencana, dan daftar tugas, digerakkan oleh slash command yang berintegrasi dengan lebih dari lima puluh coding agent. Tim yang menginginkan alur specify, plan, tasks, dan implement yang dapat diulang di dalam agent yang sudah mereka pakai. [Situs resmi](https://github.com/github/spec-kit)

**OpenSpec** — Menangkap setiap perubahan sebagai proposal dengan spesifikasi delta (ditambahkan, diubah, dihapus) dan kebutuhan RFC 2119 beserta skenarionya, lalu mengarsipkannya menjadi spesifikasi hidup. Tim yang bekerja pada sistem yang sudah ada dan ingin spesifikasinya bertumbuh satu perubahan dalam satu waktu. [Situs resmi](https://openspec.dev)

**Amazon Kiro** — IDE dan CLI agentic yang spesifikasinya bergerak dari kebutuhan bergaya EARS ke desain lalu ke tugas, dengan file steering dan hook yang berjalan pada event editor. Pengembang yang menginginkan pengembangan spec-driven di dalam editor mereka, dengan tooling yang ditopang AWS. [Situs resmi](https://kiro.dev)

### Framework alur kerja agent

**BMAD Method** — Framework agile berisi peran agent yang terspesialisasi (analisis, produk, arsitektur, pengembangan, kualitas) yang menghasilkan brief, kebutuhan, dokumen arsitektur, dan file story. Tim yang menyukai seremoni berbasis peran dan menginginkan siklus hidup agile penuh untuk pekerjaan agent. [Situs resmi](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Pustaka skill dan alur kerja untuk brainstorming, perencanaan dalam langkah test-first kecil, eksekusi dengan subagent, dan peninjauan sebelum selesai. Pengembang yang menginginkan eksekusi test-driven yang disiplin di dalam coding agent mereka. [Situs resmi](https://github.com/obra/superpowers)

**Get Shit Done** — Sistem perencanaan dengan direktori .planning, id kebutuhan, rencana fase, eksekusi konteks segar, dan pemeriksaan verifikasi terhadap must-have yang dinyatakan. Pengembang solo dan tim kecil yang menginginkan context engineering dan verifikasi dengan sedikit seremoni. [Situs resmi](https://github.com/open-gsd/gsd-core)

### Mode rencana bawaan vendor

**Mode rencana bawaan vendor** — Claude Code, Codex, Cursor, dan Gemini CLI menghadirkan mode rencana, file instruksi, dan skill yang mengikuti standar AGENTS.md dan Agent Skills. Siapa pun yang menginginkan perencanaan di dalam satu agent tanpa harus mengadopsi sebuah metodologi. [Situs resmi](https://agents.md)

## Matriks kapabilitas

Di mana setiap kapabilitas berada, per tool. Bawaan, opsional atau melalui ekstensi, atau di luar cakupan. Ditinjau terhadap dokumentasi resmi.

| Kapabilitas | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Mode rencana bawaan vendor |
|---|---|---|---|---|---|---|---|---|
| Bekerja dengan coding agent mana pun | Bawaan | Bawaan | Bawaan | Di luar cakupan | Bawaan | Bawaan | Bawaan | Di luar cakupan |
| Menulis harness agent ke dalam repositori | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi |
| Kriteria penerimaan per tugas | Bawaan | Opsional atau melalui ekstensi | Bawaan | Bawaan | Bawaan | Bawaan | Bawaan | Opsional atau melalui ekstensi |
| Gerbang verifikasi per tugas | Bawaan | Opsional atau melalui ekstensi | Di luar cakupan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi |
| Status yang dapat dilanjutkan di disk | Bawaan | Bawaan | Bawaan | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi |
| Tinjauan penutup wajib dengan pemeriksaan keamanan | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi |
| Pemeriksa konformansi yang dapat dieksekusi | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan | Di luar cakupan | Di luar cakupan | Opsional atau melalui ekstensi |
| Pengukuran beban instruksi yang dipublikasikan | Bawaan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan |
| Onboarding yang menyusun kerangka dokumentasi | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan | Bawaan | Opsional atau melalui ekstensi |
| Spesifikasi hidup untuk sistem yang sudah ada | Di luar cakupan | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan | Opsional atau melalui ekstensi | Di luar cakupan |

## Apa yang dibawa Deep Work Plan

- **Agnostik tool dan native repositori.** Harness dan rencananya adalah file di repositori Anda, dibaca oleh agent mana pun yang mengikuti standar AGENTS.md dan Agent Skills. Berganti agent tidak kehilangan rencana.
- **Validasi dipilih dari apa yang disentuh setiap tugas.** Setiap tugas menyatakan permukaan yang disentuhnya dan menjalankan test dari perilaku yang berubah beserta konsumennya, diperluas ke seluruh suite ketika dampaknya tidak bisa dibatasi. Nol test terpilih tidak pernah dianggap lulus.
- **Satu Final Review dengan pemeriksaan keamanan.** Sebuah rencana ditutup dengan tinjauan keamanan atas kumpulan perubahan yang terkumpul, termasuk tinjauan lokal atas diff yang diwajibkan, dan validasi status akhir. Temuan kritis memblokir penyelesaian.
- **Status yang bertahan lintas sesi dan agent.** Centang README, log tugas, indeks kerja yang terbatas, dan berkas status terbaca mesin ditulis di setiap batas, sehingga sesi lain atau agent lain melanjutkan dari disk. Bahkan pembuatan rencana yang terputus bisa dipulihkan.
- **Pemeriksa konformansi untuk repositorinya sendiri.** Script baca-saja memverifikasi harness dan setiap rencana terhadap spesifikasi, memahami kedua siklus hidup rencana, dan keluar dengan kode yang ramah CI.
- **Beban instruksi diukur dan dipublikasikan.** Script yang di-commit mengukur berapa byte yang dimuat setiap alur; hasilnya, termasuk kenaikan, dipublikasikan sebagai byte, tidak pernah sebagai persentase token atau biaya.

## Keterbatasan yang jujur

Deep Work Plan tidak memiliki mekanisme spesifikasi hidup maupun delta; OpenSpec dan tool sejenis lebih kuat di aspek itu. Belum ada benchmark independen atas metodologi ini; sebuah evaluasi publik yang praregistrasi sedang direncanakan. Ledger beban instruksi mengukur byte yang dimuat, bukan token, biaya, atau hasil.

## Bantu kami menjaga keakuratan halaman ini

Halaman ini ditinjau pada tanggal yang tertera dan dikoreksi atas permintaan. Jika deskripsi tool Anda kedaluwarsa atau tidak lengkap, bukalah issue dan kami akan memperbaikinya.

[Buka issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Sumber

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
