---
title: Add-ons
description: "Ekstensi opsional untuk metodologi inti DWP: skill, agent, preset, adapter, dan contoh, serta bagaimana masing-masing memperluas alur kerja tanpa menjadi wajib."
order: 5
lang: id
section: Addons
---

# Add-ons

**Versi 1.0.** Add-on adalah ekstensi opsional untuk metodologi inti DWP. Ia tidak diwajibkan untuk konformansi tetapi menyediakan kemampuan tambahan.

## Skills

Skill adalah prosedur yang dapat dipakai ulang yang dipanggil berdasarkan nama. Sebuah skill mengemas alur kerja yang dapat diulang (menjalankan test, memperbaiki lint, membuat sebuah komponen).

Metodologi membawa sekumpulan kecil sub-skill inti. Di antaranya, sub-skill **author** memungkinkan sebuah repositori **menumbuhkan kit-nya sendiri**: dipanggil melalui `/skill-create` dan `/agent-create`, ia bernalar tentang tata letak `.agents/` dan konvensi repositori yang ada, lalu menulis skill, agent, atau delegator command tipis yang baru yang sesuai dengannya, dan menjaga katalog tetap selaras. Sub-skill yang sama mengeksekusi tugas wajib Skills & Agents Discovery.

## Agents

Agent adalah pekerja terspesialisasi dengan peran yang terdefinisi (reviewer, executor, architect).

## Add-on perawatan

Add-on perawatan adalah ekstensi opt-in, tidak pernah diwajibkan untuk konformansi, yang membantu sebuah repositori memelihara dirinya sendiri. Add-on **dependency-upgrade** bernalar tentang package manager yang sebenarnya ada di repositori (alih-alih mengasumsikan npm) dan memperbarui dependensi dalam batch-batch kecil yang tervalidasi dan dapat dikembalikan: ia mendeteksi manager dari manifes dan lockfile yang nyata, mengklasifikasikan peningkatan menurut semver, memperbarui dalam batch, menjalankan validation gate nyata repositori setelah setiap batch, mengembalikan batch apa pun yang gagal, dan merangkum tanpa meng-commit secara otomatis. Sebuah add-on dipasang hanya ketika ia diterima selama onboarding.

## Add-on design-system

Add-on **design-system** adalah ekstensi opt-in bercakupan permukaan-antarmuka yang memberi sebuah repositori sebuah `DESIGN.md` — sebuah berkas sistem desain berformat Markdown yang dibaca agent coding mana pun untuk menghasilkan keluaran antarmuka yang konsisten dengan konvensi milik repositori itu sendiri. Ia mencakup tiga **profil**, dideteksi secara independen dari berkas nyata dan ditumpuk ke dalam satu berkas yang sama: **visual-ui** (UI web/mobile/desktop yang dirender), **cli-output** (output terminal yang bergaya: warna semantik, komponen output seperti panel dan spinner, konvensi tata letak, degradasi TTY/`NO_COLOR`), dan **conversational** (produk berbicara lewat chat atau email: suara dan register, anatomi pesan, perenderan per-platform dengan fallback teks polos). Ia bernalar tentang sumber desain nyata repositori (CSS custom properties, sebuah konfigurasi Tailwind, berkas token, gaya komponen — atau sebuah modul display CLI, atau helper penyusunan pesan) alih-alih menyalin sebuah berkas brand, dan memvalidasi integritas setiap profil: kontras WCAG AA untuk pasangan teks visual, warna tidak pernah menjadi satu-satunya pembawa makna dalam output terminal, fallback teks polos untuk pesan kaya, dan referensi token yang dapat di-resolve. Ia merekonsiliasikan sebuah `DESIGN.md` yang sudah ada alih-alih menimpanya.

Berkas tersebut berada di `docs/DESIGN.md`, berdampingan dengan spesifikasi lain repositori, dan dirujuk dari `AGENTS.md` sehingga agent menemukannya dengan cara yang sama seperti mereka menemukan dokumen lainnya (akar repositori dipakai hanya ketika tidak ada pohon `docs/`). Penemuan dilakukan lewat referensi, bukan lewat lokasi fisik. Kekuatan profil berbeda-beda: **visual-ui aktif secara default ketika terdeteksi** — ketika sebuah permukaan UI visual hadir, onboarding menerapkannya dalam mode trust dan sangat merekomendasikannya dalam mode terpandu — sementara **cli-output dan conversational direkomendasikan ketika terdeteksi dan selalu ditanyakan, tidak pernah diterapkan otomatis**. Add-on ini tidak pernah ditawarkan untuk repositori tanpa permukaan antarmuka apa pun (library murni, layanan headless, repositori hanya-infrastruktur), dan sebuah repositori dengan nol add-on tetap sepenuhnya konforman. Sebuah `DESIGN.md` yang dibuat sebelum profil ada adalah berkas visual satu-profil yang valid — tanpa migrasi.

Berkas sistem desain tingkat-repositori ini berbeda dari sebuah dokumen desain teknis per-fitur ("requirements → design → tasks" `design.md` dari alur kerja spec-driven yang terikat tooling). DWP tidak membawa archetype dokumen-desain per-fitur terpisah: README sebuah rencana, acceptance criteria setiap tugas, dan validation gate sudah mencakup peran itu. Add-on ini mengisi satu celah yang tidak dicakup peran tersebut: konteks desain antarmuka yang tahan lama dan repo-native.

## Presets

Preset menyesuaikan DWP dengan tech stack tertentu (Django, React, Go).

## Adapters

Adapter memetakan command DWP ke sistem command sebuah agent tertentu (Claude Code, Cursor, Codex).

## Examples

Contoh mendemonstrasikan DWP dalam praktik (perbandingan sebelum/sesudah, rencana contoh, studi kasus).
