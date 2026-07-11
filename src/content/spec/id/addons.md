---
title: Add-on
description: "Ekstensi DWP opsional: empat addon yang dikirim (devcontainer, Dailybot, dependency-upgrade, design-system), kontrak addon, dan konsep kit (skill, agen, preset, adapter, contoh)."
order: 5
lang: id
section: Addons
---

# Add-on

**Versi 2.0.** Add-on adalah ekstensi opsional dari metodologi Deep Work Plan inti. Add-on **tidak pernah diperlukan untuk konformitas** — repositori tanpa addon sepenuhnya AI-first dan konforman DWP. Setiap addon ditawarkan saat onboarding, diterima atau ditolak secara eksplisit, dan — jika diterima — **merekonsiliasi** dengan setup yang ada alih-alih menimpanya.

## Kontrak addon

Setiap addon yang dikirim menyediakan empat komponen wajib:

| Komponen | Tujuan |
|-----------|---------|
| **Spec** | Deskripsi normatif RFC-2119 tentang apa yang disediakan addon dan arti "konforman dengan addon ini" |
| **Reasoning templates** | Panduan yang diisi agen dengan menalar tentang stack repo target — bukan salin-tempel |
| **Onboarding hook** | Titik masuk `SKILL.md` yang dipanggil alur `onboard` saat pengembang menerima |
| **Validation step** | Checklist yang mengonfirmasi addon diterapkan dengan benar |

Penemuan: alur `onboard` mengekstrak `skills/deepworkplan/addons/` dan menyajikan setiap addon sebagai langkah opt-in di **Fase 7b**, setelah scaffolding inti.

## Addon yang dikirim (empat)

Empat addon tersedia hari ini. Masing-masing memiliki **halaman katalog kit** dengan detail untuk pengguna dan **spec normatif** di dalam skill Deep Work Plan.

### Devcontainer (addon pertama)

Setup `.devcontainer/` + `docker/` berbasis compose yang dirasionalkan dari stack yang terdeteksi.

- **Halaman kit:** [Devcontainer](/kit/devcontainer)
- **Yang ditambahkan:** volume auth AI-CLI persisten (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, alias validasi (`codecheck`, `check`, `fix`, `test`), kebersihan rahasia OSS publik
- **Perilaku:** ~85% kerangka stabil; ~15% dirasionalkan per stack. Devcontainer yang ada direkonsiliasi, tidak pernah ditimpa
- **Kapan ditawarkan:** sebagian besar repo dengan Docker atau layanan yang mendapat manfaat dari dev container terisolasi

### Dailybot (addon kedua)

Koneksi opt-in ke **tim Dailybot** pengembang untuk visibilitas progres agen.

- **Halaman kit:** [Dailybot](/kit/dailybot) — referensi kemampuan lengkap
- **Yang dihubungkan addon DWP:** empat laporan siklus hidup rencana (kickoff, significant task, blocked, completion) melalui sub-skill dailybot `report`; penegakan hook deterministik opsional (`dailybot hook`, CLI `>= 3.1.2`)
- **Skill yang dipasangkan:** menginstal [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (saat ini **3.4.0**) mengekspos **13 kemampuan** — chat di Slack/Teams/Discord/Google Chat, check-in, authoring formulir, ask AI, kudos, email, dan lainnya. Addon DWP hanya menghubungkan **report**; kemampuan lain dipanggil melalui skill Dailybot secara langsung
- **Auth:** sepenuhnya ditunda ke skill Dailybot (`dailybot login` atau `DAILYBOT_API_KEY`); addon ini tidak pernah menyimpan kredensial
- **Pagar vendor-neutral:** DWP inti memiliki **nol** ketergantungan Dailybot; jangan pernah menginstal otomatis untuk semua orang
- **Kapan ditawarkan:** pengembang atau tim sudah menggunakan Dailybot, atau secara eksplisit meminta pelaporan tim

### Dependency upgrade (addon ketiga)

Upgrade dependensi agnostik package manager, bertahap, tervalidasi, dan dapat dibalik.

- **Halaman kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Yang ditambahkan:** mendeteksi **manajer nyata** repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), upgrade dalam batch yang diklasifikasikan semver, menjalankan validation gate repo setelah setiap batch, membalikkan kegagalan, merangkum tanpa commit otomatis
- **Perintah:** menginstal `/lib-upgrade` ke `.agents/commands/` hanya jika diterima
- **Kapan ditawarkan:** lockfile ada dan stack dengan banyak dependensi; rekomendasikan hanya jika relevan

### Design system (addon keempat)

`DESIGN.md` dengan cakupan permukaan antarmuka yang dibaca agen kode mana pun untuk output UI, CLI, atau percakapan yang konsisten.

- **Halaman kit:** [Design system](/kit/design-system)
- **Yang ditambahkan:** `docs/DESIGN.md` (direferensikan dari `AGENTS.md`) dengan hingga tiga **profil** ditumpuk dalam satu file: **visual-ui** (token dan komponen UI yang dirender), **cli-output** (gaya terminal semantik, degradasi TTY/`NO_COLOR`), **conversational** (suara, anatomi pesan, rendering per platform dengan fallback teks biasa)
- **Kekuatan profil:** visual-ui **aktif default saat terdeteksi**; cli-output dan conversational **direkomendasikan saat terdeteksi, selalu ditanyakan, tidak pernah diterapkan otomatis**
- **Kapan ditawarkan:** hanya ketika permukaan antarmuka pengguna terdeteksi — bukan untuk pustaka murni, layanan headless, atau repo hanya infrastruktur

## Skill

Skill adalah prosedur yang dapat digunakan kembali yang dipanggil berdasarkan nama. Skill mengemas alur kerja yang dapat diulang (menjalankan tes, memperbaiki lint, membuat komponen).

Metodologi menyediakan seperangkat kecil sub-skill inti. Di antaranya, sub-skill **author** memungkinkan repositori **menumbuhkan kit sendiri**: dipanggil melalui `/skill-create` dan `/agent-create`, menalar tentang tata letak `.agents/` dan konvensi repo yang ada, lalu menulis skill, agen, atau delegator perintah tipis baru yang sesuai, dan menjaga katalog tetap sinkron. Sub-skill yang sama menjalankan tugas wajib Skills & Agents Discovery.

Entri kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agen

Agen adalah pekerja khusus dengan peran yang ditentukan (reviewer, executor, architect). Mereka berada di `.agents/agents/` dan dikatalogkan di `.agents/docs/`.

## Addon pemeliharaan

Addon **dependency-upgrade** (di atas) adalah addon pemeliharaan utama. Addon ini menalar tentang package manager aktual repositori alih-alih mengasumsikan npm, mengklasifikasikan upgrade berdasarkan semver, mengupgrade dalam batch aman, menjalankan validasi setelah setiap batch, dan membalikkan batch yang gagal.

## Addon design-system

Lihat [Design system](/kit/design-system) di bawah addon yang dikirim. `DESIGN.md` tingkat repo berbeda dari dokumen desain teknis per fitur: README rencana DWP, kriteria penerimaan tugas, dan validation gate sudah mencakup desain per fitur. Addon design-system mengisi konteks desain **antarmuka** yang tahan lama dan native repo.

## Preset

Preset mengadaptasi DWP ke stack teknologi tertentu (Django, React, Go, Astro + Svelte, dan lainnya). Jelajahi [katalog kit](/kit).

## Adapter

Adapter memetakan perintah DWP ke sistem perintah agen tertentu (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw, dan lainnya). Entri adapter berada di kit di bawah nama setiap agen.

## Contoh

Contoh mendemonstrasikan DWP dalam praktik: perbandingan sebelum/sesudah, rencana contoh, studi kasus. Lihat [Examples](/examples) dan [Dogfood this site](/kit/dogfood-this-site).

## Pengingat konformitas

Repositori **HARUS** sepenuhnya konforman dengan **nol** addon. Addon adalah kemampuan opt-in berlapis — bukan prasyarat. Lihat [Conformance](/spec/conformance).
