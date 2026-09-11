---
title: "Deep Work Plan dibandingkan dengan alternatifnya"
description: "Relasi Deep Work Plan dengan tool spec-driven, framework agent, dan mode rencana vendor: masing-masing menurut istilahnya, dengan sumber dan tanggal tinjauan."
lastUpdated: 2026-09-11
---

## Deep Work Plan dan alternatifnya

Pilih lapisan yang tepat untuk situasi Anda. Setiap alternatif dideskripsikan menurut istilahnya sendiri, setiap fakta merunut ke dokumentasi resminya, dan halaman ini mencantumkan kapan terakhir ia ditinjau. Ini adalah peta, bukan peringkat.

## Cara membaca halaman ini

Tiga nilai mendeskripsikan setiap kapabilitas. Nilai itu menyatakan di mana sebuah kapabilitas berada di dalam sebuah tool, bukan seberapa bagus tool-nya.

- **Bawaan**
- **Opsional atau melalui ekstensi**
- **Di luar cakupan**

Terakhir ditinjau: 2026-09-11

## Alternatifnya, menurut istilah masing-masing

### Tool spec-driven

**GitHub Spec Kit** — Mengubah sebuah fitur menjadi spesifikasi yang dapat dieksekusi melalui konstitusi, spesifikasi, rencana, dan daftar tugas, digerakkan oleh slash command yang berintegrasi dengan lebih dari lima puluh coding agent, dan dapat memeriksa agar semua artefak tetap konsisten satu sama lain sebelum implementasi dimulai. Tim yang menginginkan alur specify, plan, tasks, dan implement yang dapat diulang di dalam agent yang sudah mereka pakai. [Situs resmi](https://github.com/github/spec-kit)

**OpenSpec** — Menangkap setiap perubahan sebagai proposal dengan spesifikasi delta (ditambahkan, diubah, dihapus) dan kebutuhan RFC 2119 beserta skenarionya, lalu mengarsipkannya menjadi spesifikasi hidup, dengan validator yang memeriksa kelengkapan proposal dan cakupan skenario sebelum sebuah perubahan diterima. Tim yang bekerja pada sistem yang sudah ada dan ingin spesifikasinya bertumbuh satu perubahan dalam satu waktu. [Situs resmi](https://openspec.dev)

**Amazon Kiro** — IDE dan CLI agentic yang spesifikasinya bergerak dari kebutuhan bergaya EARS ke desain lalu ke tugas, dengan file steering dan hook yang berjalan pada event editor, serta dapat menghasilkan spesifikasi untuk basis kode yang sudah ada guna menangkap celah kebutuhan sebelum desain dimulai. Pengembang yang menginginkan pengembangan spec-driven di dalam editor mereka, dengan tooling yang ditopang AWS. [Situs resmi](https://kiro.dev)

### Framework alur kerja agent

**BMAD Method** — Framework agile berisi peran agent yang terspesialisasi (analisis, produk, arsitektur, pengembangan, kualitas) yang menghasilkan brief, kebutuhan, dokumen arsitektur, dan file story, dengan Definition of Done yang mewajibkan setiap story ditinjau oleh rekan tim atau peninjau sejawat AI sebelum dianggap selesai. Tim yang menyukai seremoni berbasis peran dan menginginkan siklus hidup agile penuh untuk pekerjaan agent. [Situs resmi](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Pustaka skill dan alur kerja untuk brainstorming, perencanaan dalam langkah test-first kecil, eksekusi dengan subagent, dan peninjauan sebelum selesai, terintegrasi dengan lebih banyak host coding agent dibanding alternatif lain di sini, ditambah peninjauan subagent dua tahap (kesesuaian spec, lalu kualitas kode) pada setiap tugas. Pengembang yang menginginkan eksekusi test-driven yang disiplin di dalam coding agent mereka. [Situs resmi](https://github.com/obra/superpowers)

**GSD Core** — Sistem perencanaan dengan direktori .planning, id kebutuhan, rencana fase, eksekusi konteks segar, dan pemeriksaan verifikasi terhadap deliverable yang dapat diamati pengguna yang diekstrak dari ringkasan tiap rencana, dirancang khusus untuk melawan “context rot” dengan menjalankan riset, perencanaan, dan eksekusi dalam subagent sekali pakai serta menangkap verifikasi yang basi lewat pemeriksaan sidik jari konten. Pengembang solo dan tim kecil yang menginginkan context engineering dan verifikasi dengan sedikit seremoni. [Situs resmi](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Mengonfigurasi coding agent yang sudah Anda pakai dengan memori persisten yang juga merutekan lintas sesi dan model, skill terkurasi, server MCP, persona, dan opsi Spec-Driven Development atau Receipt-Driven Development. Konfigurasinya secara default ditulis ke pengaturan agent global Anda; pemasangan dengan cakupan workspace bersifat opt-in. Pengembang yang menginginkan ekosistem agent yang sudah dikonfigurasi, mengingat pekerjaan lintas sesi, dan dapat menghasilkan bukti sesuai permintaan. [Situs resmi](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**AI-native SDLC dari Claude** — Loop enam tahap dari Plan dan Design melalui Build, Test, Deploy, dan Maintain, dengan persetujuan manusia yang diwajibkan di setiap tahap, artefak tahan lama yang di-commit ke repositori di antara tahap, satu putaran peninjauan berlabel keamanan khusus sebelum deploy, dan evaluasi berkelanjutan yang mempublikasikan indikator pengiriman leading dan lagging. Tim yang mengevaluasi playbook pengiriman perangkat lunak ujung-ke-ujung dari Claude Code dan siklus umpan balik produksinya. [Situs resmi](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Mode rencana bawaan vendor

**Mode rencana bawaan vendor** — Claude Code, Codex, Cursor, dan Gemini CLI dapat menghadirkan mode rencana, file instruksi, dan skill yang dibangun di atas standar AGENTS.md dan Agent Skills yang terbuka dan lintas vendor, meskipun perilaku mode rencana yang persis tetap bergantung pada vendor, klien, dan versinya. Agent Skills khususnya hanya memuat ringkasan singkat saat startup dan memuat instruksi lengkap hanya saat diaktifkan, sehingga kapasitas yang tidak dipakai tidak membebani konteks. Siapa pun yang menginginkan perencanaan di dalam satu agent tanpa harus mengadopsi sebuah metodologi. [Situs resmi](https://agents.md)

## Matriks kapabilitas

Di mana setiap kapabilitas berada, per tool. Bawaan, opsional atau melalui ekstensi, atau di luar cakupan. Ditinjau terhadap dokumentasi resmi.

| Kapabilitas | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | AI-native SDLC dari Claude | Mode rencana bawaan vendor |
|---|---|---|---|---|---|---|---|---|---|---|
| Bekerja dengan coding agent mana pun | Bawaan | Bawaan | Bawaan | Di luar cakupan | Bawaan | Bawaan | Bawaan | Bawaan | Di luar cakupan | Di luar cakupan |
| Menulis harness agent ke dalam repositori | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi |
| Kriteria penerimaan per tugas | Bawaan | Opsional atau melalui ekstensi | Bawaan | Bawaan | Bawaan | Bawaan | Bawaan | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi |
| Gerbang verifikasi per tugas | Bawaan | Opsional atau melalui ekstensi | Di luar cakupan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Bawaan | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi |
| Status yang dapat dilanjutkan di disk | Bawaan | Bawaan | Bawaan | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Bawaan | Bawaan | Bawaan | Opsional atau melalui ekstensi |
| Tinjauan penutup wajib dengan pemeriksaan keamanan | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi |
| Pemeriksa konformansi yang dapat dieksekusi | Bawaan | Opsional atau melalui ekstensi | Bawaan | Opsional atau melalui ekstensi | Di luar cakupan | Di luar cakupan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi |
| Pengukuran beban instruksi yang dipublikasikan | Bawaan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan |
| Onboarding yang menyusun kerangka dokumentasi | Bawaan | Bawaan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan | Bawaan | Di luar cakupan | Bawaan | Opsional atau melalui ekstensi |
| Spesifikasi hidup untuk sistem yang sudah ada | Di luar cakupan | Opsional atau melalui ekstensi | Bawaan | Bawaan | Opsional atau melalui ekstensi | Di luar cakupan | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Opsional atau melalui ekstensi | Di luar cakupan |
| Memori agen yang persisten lintas proyek | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Bawaan | Di luar cakupan | Opsional atau melalui ekstensi |
| Peran agen khusus yang berbeda-beda | Opsional atau melalui ekstensi | Di luar cakupan | Di luar cakupan | Di luar cakupan | Bawaan | Di luar cakupan | Di luar cakupan | Opsional atau melalui ekstensi | Di luar cakupan | Di luar cakupan |
| Hadir sebagai IDE atau editornya sendiri | Di luar cakupan | Di luar cakupan | Di luar cakupan | Bawaan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Di luar cakupan | Opsional atau melalui ekstensi |

## Apa yang dibawa Deep Work Plan

- **Agnostik tool dan native repositori.** Harness dan rencananya adalah file di repositori Anda, dibaca oleh agent mana pun yang mengikuti standar AGENTS.md dan Agent Skills. Berganti agent tidak kehilangan rencana.
- **Validasi dipilih dari apa yang disentuh setiap tugas.** Setiap tugas menyatakan permukaan yang disentuhnya dan menjalankan test dari perilaku yang berubah beserta konsumennya, diperluas ke seluruh suite ketika dampaknya tidak bisa dibatasi. Nol test terpilih tidak pernah dianggap lulus.
- **Satu Final Review dengan pemeriksaan keamanan.** Sebuah rencana ditutup dengan tinjauan keamanan atas kumpulan perubahan yang terkumpul, termasuk tinjauan lokal atas diff yang diwajibkan, dan validasi status akhir. Temuan kritis memblokir penyelesaian.
- **Status yang bertahan lintas sesi dan agent.** Centang README, log tugas, indeks kerja yang terbatas, dan berkas status terbaca mesin ditulis di setiap batas, sehingga sesi lain atau agent lain melanjutkan dari disk. Bahkan pembuatan rencana yang terputus bisa dipulihkan.
- **Pemeriksa konformansi untuk repositorinya sendiri.** Script baca-saja memverifikasi harness dan setiap rencana terhadap spesifikasi, memahami kedua siklus hidup rencana, dan keluar dengan kode yang ramah CI.
- **Beban instruksi diukur dan dipublikasikan.** Script yang di-commit mengukur berapa byte yang dimuat setiap alur; hasilnya, termasuk kenaikan, dipublikasikan sebagai byte, tidak pernah sebagai persentase token atau biaya.

## Keterbatasan yang jujur

Deep Work Plan tidak memiliki mekanisme spesifikasi hidup maupun delta; OpenSpec dan tool sejenis lebih kuat di aspek itu. Belum ada benchmark independen atas metodologi ini; sebuah evaluasi publik yang praregistrasi sedang direncanakan. Ledger beban instruksi mengukur byte yang dimuat, bukan token, biaya, atau hasil. DWP secara sengaja dibatasi pada repositori: ini bukan sistem memori lintas proyek, bukan kerangka kerja agen berbasis peran, dan bukan IDE, sehingga tidak bersaing di sumbu-sumbu itu juga — padukan dengan alat yang mencakup salah satu sumbu tersebut saat pekerjaan membutuhkannya.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- AI-native SDLC dari Claude — https://claude.com/blog/the-ai-native-sdlc-playbook
- Mode rencana bawaan vendor — https://agentskills.io
