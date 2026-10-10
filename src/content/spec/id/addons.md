---
title: Add-on
description: "Addon DWP: tujuh ekstensi opsional, tinjauan lokal AI Diff Reviewer yang wajib dengan permukaan CI opsional, kontrak addon, dan konsep kit."
order: 6
lang: id
section: Addons
---

# Add-on

> **Cakupan versi:** Ini adalah dokumen dasar v5.0.0 yang dipertahankan. Standar saat ini, DWP 7.0.0, juga mewajibkan ekstensi `V6_*.md` dan `V7_*.md` yang berlaku dan tercantum dalam [indeks spesifikasi](/spec). Rencana v5 dan v6 yang ada mempertahankan aturan yang tercatat.

**Versi 2.1.0.** Add-on adalah ekstensi dari metodologi Deep Work Plan inti. Tujuh dari delapan bersifat opsional dan **tidak pernah diperlukan untuk konformitas** — repositori tanpa addon opsional sepenuhnya AI-first dan konforman DWP. Setiap addon opsional ditawarkan saat onboarding, diterima atau ditolak secara eksplisit, dan — jika diterima — **merekonsiliasi** dengan setup yang ada alih-alih menimpanya. Satu komponen adalah pengecualian yang dinyatakan: sejak standar 2.3.0 **tinjauan lokal AI Diff Reviewer** adalah bagian dari baseline wajib — onboarding menginstalnya dan setiap Final Review menjalankannya — sementara permukaan CI-nya tetap opt-in.

## Kontrak addon

Setiap addon yang dikirim menyediakan empat komponen wajib:

| Komponen | Tujuan |
|-----------|---------|
| **Spec** | Deskripsi normatif RFC-2119 tentang apa yang disediakan addon dan arti "konforman dengan addon ini" |
| **Reasoning templates** | Panduan yang diisi agen dengan menalar tentang stack repo target — bukan salin-tempel |
| **Onboarding hook** | Titik masuk `SKILL.md` yang dipanggil alur `onboard` saat pengembang menerima |
| **Validation step** | Checklist yang mengonfirmasi addon diterapkan dengan benar |

Penemuan: alur `onboard` mengekstrak `skills/deepworkplan/addons/` dan menyajikan setiap addon sebagai langkah opt-in di **Fase 7b**, setelah scaffolding inti.

## Addon yang dikirim (delapan)

Delapan addon tersedia hari ini — tujuh opt-in ditambah tinjauan lokal yang wajib. Masing-masing memiliki **halaman katalog kit** dengan detail untuk pengguna dan **spec normatif** di dalam skill Deep Work Plan. Empat di antaranya — devcontainer, Herdr, DeepWorkPlan Vim, dan Agentkit — adalah integrator tipis yang dipatok pada tag ke sebuah produk dengan repositori dan siklus rilisnya sendiri; setiap produk berfungsi tanpa Deep Work Plan. Addon yang diterima dicatat dalam registri addon `.dwp/config.json` (DWP 7.0.0), yang hanya dapat menawarkan atau memperkuat — tidak pernah menghalangi konformitas maupun sebuah rencana.

### Devcontainer (addon pertama)

Integrator tipis untuk [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, dipatok pada `v0.2.2`, antarmuka `2`): template Dev Containers yang dirender `dck init` ke dalam repositori sebagai container miliknya sendiri, ditambah skill `dck-dockerfile`.

- **Halaman kit:** [Devcontainer](/kit/devcontainer)
- **Yang ditambahkan:** `docker/local/<service>/Dockerfile` dari image resmi runtime yang dipatok dengan digest (`python-3.13`, `node-24`, atau `debian`, tanpa image dasar bersama), `dev.sh` di atas launcher `dck` (`up`, `shell`, `rebuild`, `doctor`), agen coding sebagai lapisan opt-in, port khusus loopback, git melalui SSH lewat agen milik host tanpa kunci di dalamnya, dan mesin Herdr per container dengan tata letak standar
- **Perilaku:** dideteksi melalui `dck doctor --json` (antarmuka 2); `dck init` merekonsiliasi devcontainer yang ada hanya setelah diff-nya diterima, dan mencadangkan file terlebih dahulu — tidak pernah ditimpa
- **Kapan ditawarkan:** sebagian besar repo dengan Docker atau layanan yang mendapat manfaat dari dev container terisolasi

### Dailybot (addon kedua)

Koneksi opt-in ke **tim Dailybot** pengembang untuk visibilitas progres agen.

- **Halaman kit:** [Dailybot](/kit/dailybot) — referensi kemampuan lengkap
- **Yang dihubungkan addon DWP:** empat laporan siklus hidup rencana (kickoff, significant task, blocked, completion) melalui sub-skill dailybot `report`; penegakan hook deterministik opsional (`dailybot hook`, CLI `>= 3.9.0`)
- **Skill yang dipasangkan:** menginstal [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (saat ini **3.23.3**) mengekspos **17 kemampuan** — chat di Slack/Teams/Discord/Google Chat, check-in, authoring formulir, ask AI, kudos, board dan tugas Plan, label organisasi, API key per repo (`.dailybot/env.json`), email, dan lainnya. Addon DWP hanya menghubungkan **report**; kemampuan lain dipanggil melalui skill Dailybot secara langsung
- **Auth:** sepenuhnya ditunda ke skill Dailybot (`dailybot login` atau `DAILYBOT_API_KEY`); addon ini tidak pernah menyimpan kredensial
- **Pagar vendor-neutral:** DWP inti memiliki **nol** ketergantungan Dailybot; jangan pernah menginstal otomatis untuk semua orang
- **Kapan ditawarkan:** pengembang atau tim sudah menggunakan Dailybot, atau secara eksplisit meminta pelaporan tim

### Dependency upgrade (addon ketiga)

Upgrade dependensi agnostik package manager, bertahap, tervalidasi, dan dapat dibalik.

- **Halaman kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Yang ditambahkan:** mendeteksi **manajer nyata** repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), upgrade dalam batch yang diklasifikasikan semver, menjalankan validation gate repo setelah setiap batch, membalikkan kegagalan, merangkum tanpa commit otomatis
- **Perintah:** menginstal `/lib-upgrade` ke `.agents/commands/` hanya jika diterima
- **Kapan ditawarkan:** ditawarkan untuk setiap repo dengan dependensi yang dideklarasikan; delegator inert `/lib-upgrade` dipasang di bawah persetujuan onboarding kecuali ditolak secara eksplisit — sebuah instalasi tidak menjalankan upgrade apa pun

### Design system (addon keempat)

`DESIGN.md` dengan cakupan permukaan antarmuka yang dibaca agen kode mana pun untuk output UI, CLI, atau percakapan yang konsisten.

- **Halaman kit:** [Design system](/kit/design-system)
- **Yang ditambahkan:** `docs/DESIGN.md` (direferensikan dari `AGENTS.md`) dengan hingga tiga **profil** ditumpuk dalam satu file: **visual-ui** (token dan komponen UI yang dirender), **cli-output** (gaya terminal semantik, degradasi TTY/`NO_COLOR`), **conversational** (suara, anatomi pesan, rendering per platform dengan fallback teks biasa)
- **Kekuatan profil:** deteksi menjadikan penawaran wajib; instalasi dijaga oleh penerimaan, baik dalam mode terpandu maupun mode trust — visual-ui **sangat direkomendasikan saat terdeteksi**; cli-output dan conversational **direkomendasikan saat terdeteksi, selalu ditanyakan, tidak pernah diterapkan otomatis**
- **Kapan ditawarkan:** hanya ketika permukaan antarmuka pengguna terdeteksi — bukan untuk pustaka murni, layanan headless, atau repo hanya infrastruktur

### AI Diff Reviewer (addon kelima — tinjauan lokal wajib, permukaan CI opsional)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**) memberi pemeriksaan keamanan Final Review wajib sebuah tinjauan lokal terstruktur, dan secara opsional mengontrol pull request di CI. Sejak standar 2.3.0 **tinjauan lokal adalah bagian dari baseline**; hanya permukaan CI yang opt-in. Addon ini diperbarui otomatis setiap rilis, sehingga tag yang ditampilkan di bawah adalah tag yang berlaku saat tulisan ini dibuat dan dapat tertinggal dari salinan yang di-vendor — `SKILL.md` milik addon itu sendiri dan rilis GitHub-nya adalah acuan resmi untuk tag yang benar-benar terpasang. Pemasangan selalu dipatok ke tag yang sudah dirilis, tidak pernah ke branch yang bergerak.

- **Halaman kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — referensi kemampuan lengkap
- **Wajib saat onboarding (Fase 7a):** instalasi skill vendored yang dipatok pada tag (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) plus `.review/extension.md` yang disesuaikan dengan repo (melalui `generate-extension`), di bawah persetujuan onboarding; upgrade harness tertarget merekonsiliasi keduanya bila hilang; penolakan dicatat sebagai pengecualian yang dinyatakan dan dilaporkan oleh `verify` hingga terinstal
- **Wajib di setiap Final Review:** pemeriksaan keamanan menjalankan alur default induk upstream atas kumpulan perubahan yang terakumulasi dan menambahkan outputnya ke `analysis_results/SECURITY_REVIEW.md` milik plan tersebut (di dalam folder plan itu sendiri, bukan di root repo); skill atau ekstensi yang hilang menjadi temuan `local reviewer not installed` yang tercatat — tidak pernah dilewati diam-diam, dan tidak pernah menjadi bootstrap kejutan: instalasi milik persetujuan onboarding atau invokasi addon yang eksplisit; **temuan kritis terverifikasi** dari penerusan yang selesai memblokir penyelesaian hingga diperbaiki atau diterima secara eksplisit (v3, BC-07 — klaim kritis yang belum terverifikasi muncul sebagai peringatan beranotasi, dan tinjauan `incomplete`/`timeout` bukan kelulusan yang bersih, BC-04)
- **Permukaan CI opsional (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v3`) melalui sub-skill `setup` upstream, plus pendamping `apply-review` (hanya baca) dan `address-review` (commit, push, dan mengarmkan kembali; baru di v3.1.1) sebagai kenyamanan yang dipanggil pengembang — ditawarkan secara eksplisit, tidak pernah diinstal tanpa diminta, tidak pernah menjadi default, tidak pernah menjadi tugas rencana
- **Tidak pernah memblokir (hanya pemanggilan):** tinjauan lokal yang bisa dimulai tetapi gagal bersifat peringat-sekali-catat-dan-lanjut; itu tidak pernah menggagalkan tugas
- **Paritas (Flow B):** `prompt.md` bersama + ekstensi menyelaraskan metodologi/tingkat keparahan; Tinjauan Sadar Iterasi CI dapat mempersingkat putaran 2+ sementara penerusan lokal tetap penuh
- **Pengamanan netral vendor:** tidak ada alur Deep Work Plan yang memerlukan layanan komersial, penyedia CI, atau rahasia — reviewer adalah skill MIT yang dipatok pada tag dan dijalankan oleh coding agent pengembang sendiri
- **Konformitas:** `verify` melaporkan reviewer lokal yang hilang sebagai kegagalan untuk repositori yang menyatakan standar 2.3.0 atau lebih baru, dan sebagai temuan versi-harness untuk repositori lama

### Herdr (addon keenam)

Integrator tipis dari [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (dipatok `v0.1.0`, protokol `1`), transport delegasi **interaktif** untuk rencana v7.

- **Halaman kit:** [Herdr](/kit/herdr)
- **Yang ditambahkan:** sebuah rencana dapat menyerahkan tugas terbatas kepada coding agent di pane [Herdr](https://herdr.dev) lain, di mesin yang sama atau mesin yang dijangkau Herdr melalui SSH, dan mencatat satu-satunya balasan yang diizinkan di jurnal
- **Perilaku:** protokol peer (stamp, grant, reply, loop guard, batas kedalaman dan fan-out) berada di herdr-peers, tidak pernah di dalam paket; setiap penggunaan memerlukan grant kontrak `agent_delegation`, dan hasil delegasi tetap berstatus klaim sampai runner milik rencana itu sendiri mengamatinya
- **Kapan ditawarkan:** opt-in eksplisit selama Fase 7b; deteksi hanya-baca atas `herdr` dan `herdr-peers`; transport hanya dapat digunakan di dalam sesi Herdr

### DeepWorkPlan Vim (addon ketujuh)

Integrator tipis dari [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (dipatok `v0.6.0`, antarmuka `1`), editor terminal untuk Deep Work Plan (Neovim 0.12+).

- **Halaman kit:** [DeepWorkPlan Vim](/kit/vim)
- **Yang ditambahkan:** permukaan editor opsional tingkat mesin untuk agen dan manusia — indeks perintah yang dihasilkan, penjelajah rencana hanya-baca, dan penampil Markdown; setiap klaim dibaca dari permukaan produk yang dapat dibaca mesin dan telah dipatok
- **Perilaku:** konfigurasi Neovim yang ada tidak pernah ditimpa tanpa persetujuan eksplisit; deteksi bersifat hanya-baca
- **Kapan ditawarkan:** opt-in eksplisit selama Fase 7b; hanya bersifat informatif ketika Neovim 0.12+ tidak tersedia

### Agentkit (addon kedelapan)

Integrator tipis dari [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, dipatok `v0.3.0`, antarmuka `1`), transport delegasi **headless** untuk rencana v7.

- **Halaman kit:** [Agentkit](/kit/agentkit)
- **Yang ditambahkan:** satu permukaan perintah `ak` di atas coding agent terminal, digunakan untuk menjalankan tugas rencana terbatas secara headless; addon ini menyumbangkan kemampuan `subagents`, `cancel_children`, dan `model_routing` hanya saat runtime, ketika diaktifkan, terdeteksi, dan berada pada antarmuka yang kompatibel
- **Perilaku:** setiap penggunaan memerlukan grant kontrak `agent_delegation`; kit menjalankan agen dalam mode otonom secara default dan opt-out-nya (`--ask` atau `AGENTKIT_PERMISSIONS=ask`) selalu menang — addon tidak menuliskan flag otonomi apa pun, meneruskan `--ask` saat rencana mencatat opt-out dan selalu untuk delegasi baca-saja; addon ini tidak pernah memasang CLI coding agent dengan sendirinya dan tidak pernah membaca nilai kunci penyedia
- **Kapan ditawarkan:** opt-in eksplisit selama Fase 7b; deteksi hanya-baca melalui `ak doctor --json`

## Skill

Skill adalah prosedur yang dapat digunakan kembali yang dipanggil berdasarkan nama. Skill mengemas alur kerja yang dapat diulang (menjalankan tes, memperbaiki lint, membuat komponen).

Metodologi menyediakan seperangkat kecil sub-skill inti. Di antaranya, sub-skill **author** memungkinkan repositori **menumbuhkan kit sendiri**: dipanggil melalui `/skill-create` dan `/agent-create`, menalar tentang tata letak `.agents/` dan konvensi repo yang ada, lalu menulis skill, agen, atau delegator perintah tipis baru yang sesuai, dan menjaga katalog tetap sinkron. Sub-skill yang sama menopang pass rekonsiliasi skills pada Final Review.

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
