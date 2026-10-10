---
title: "Kit Deep Work Plan"
description: "Skill dan sembilan sub-skill-nya, command, adapter agent, preset onboarding, addon opt-in, dan contoh yang membuat Deep Work Plan dapat dijalankan di mana saja."
lastUpdated: 2026-10-09
---

## Kit Deep Work Plan

Kit adalah semua yang Anda perlukan untuk menjalankan metodologi dalam praktik. Ia dipasang dari
`DailybotHQ/deepworkplan-skill`:

```bash
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.1.0 --skill deepworkplan -y
```

Paket 7.x saat ini membuat rencana baru menggunakan v7 secara default. Rencana yang ada mempertahankan generasi tercatat; migrasi memerlukan permintaan eksplisit.

### Skill dan sub-skill-nya

Skill Deep Work Plan adalah sebuah router ditambah sembilan sub-skill:

- **create** — menguraikan sebuah tujuan menjadi rencana terstruktur (`/dwp-create`).
- **execute** — menjalankan rencana tugas demi tugas, memvalidasi setiap gate (`/dwp-execute`).
- **refine** — menambah, menghapus, atau menyusun ulang tugas sambil mempertahankan pekerjaan yang selesai (`/dwp-refine`).
- **resume** — merekonstruksi status dan melanjutkan rencana yang terhenti (`/dwp-resume`).
- **status** — melaporkan kemajuan tanpa membuat perubahan (`/dwp-status`).
- **verify** — memeriksa konformansi repositori dan rencana secara objektif (`/dwp-verify`).
- **onboard** — menjadikan sebuah repositori AI-first (`/deepworkplan-onboard`).
- **author** — membuat atau mengembangkan skill, agent, dan command milik repo sendiri (`/skill-create`, `/agent-create`).
- **upgrade** — memindahkan skill terpasang ke rilis lebih baru dengan aman (`/dwp-upgrade`).

### Command

Slash command tipis mendelegasikan ke sub-skill dan addon:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — loop plan-execute-verify.
- `skill-create`, `agent-create` — mendelegasikan ke sub-skill author.
- `lib-upgrade` — mendelegasikan ke addon dependency-upgrade (dipasang hanya ketika addon itu diterima).

### Adapter

Integrasi per-agent yang tipis untuk Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini,
OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes, dan cloud/background agent (tugas remote Claude Code, Codex cloud, kelas Jules). OpenClaw dan Hermes adalah platform agent otonom yang menjalankan rencana di bawah profil eksekusi tanpa pengawasan, dijalankan oleh penjadwalan heartbeat atau cron.

### Preset onboarding

Panduan penalaran per-stack yang dipakai alur onboard untuk menyesuaikan docs, skill, dan perintah validasi —
bukan template. Enam preset: Django, Vue + Vite, Astro/Svelte, layanan Node/TS, paket/CLI Python,
dan sebuah fallback generik.

### Addon (opt-in)

Kemampuan yang ditambahkan alur onboard ke sebuah repo. Tujuh bersifat opsional dan tidak pernah menjadi bagian dari baseline AI-first; tinjauan lokal AI Diff Reviewer wajib sejak standar 2.3.0:

- **Devcontainer** — kontainer pengembangan yang terisolasi dan dapat direproduksi dengan autentikasi AI-CLI yang persisten.
- **Dailybot** — pelaporan kemajuan dan milestone secara best-effort untuk tim yang memakai Dailybot.
- **Dependency upgrade** — peningkatan yang agnostik terhadap package manager, terkelompok, tervalidasi, dan dapat dikembalikan.
- **Sistem desain** — sebuah `DESIGN.md` bercakupan antarmuka (di `docs/DESIGN.md`, dirujuk dari `AGENTS.md`) yang dinalar dari sumber desain nyata repo, dengan profil untuk UI visual, output CLI yang bergaya, dan perpesanan percakapan, sehingga agent menghasilkan keluaran antarmuka yang sesuai brand; ketika sebuah sistem desain terdeteksi, penawarannya wajib tetapi instalasinya dijaga oleh penerimaan — profil visual sangat direkomendasikan saat terdeteksi, profil CLI dan percakapan direkomendasikan ketika terdeteksi dan selalu ditanyakan.
- **AI Diff Reviewer** — tinjauan lokal yang wajib: onboarding memasang [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, dan pemeriksaan keamanan setiap Final Review menjalankannya; Flow B opsional menambahkan gerbang merge PR CI yang berbagi ekstensi yang sama, ditawarkan secara eksplisit dan tidak pernah dipasang tanpa diminta.
- **[Herdr](/id/kit/herdr)** — delegasi interaktif: sebuah rencana menyerahkan tugas terbatas kepada coding agent di pane Herdr lain dan mencatat satu-satunya balasan yang diizinkan.
- **[DeepWorkPlan Vim](/id/kit/vim)** — editor terminal untuk Deep Work Plan, dengan indeks perintah, penjelajah rencana hanya-baca, dan penampil Markdown.
- **[Agentkit](/id/kit/agentkit)** — satu perintah `ak` untuk setiap coding agent terminal, dan delegasi headless untuk tugas rencana yang terbatas.

### Ekosistem

**Metodologi bekerja sendiri. Addon memperkuatnya.** Setiap addon adalah integrator tipis di dalam skill Deep Work Plan, dipatok berdasarkan tag ke sebuah produk dengan repositori, rilis, dan versi antarmukanya sendiri. Setiap produk berfungsi tanpa Deep Work Plan, dan tidak ada addon yang wajib.

- **Skill Deep Work Plan** — Membuat, menjalankan, memverifikasi, melanjutkan, dan menyempurnakan rencana. Tidak memerlukan addon.
- **[herdr](/id/kit/herdr)** — Rekan di panel Herdr, di mesin mana pun: delegasi interaktif dengan satu balasan yang diotorisasi. Dipatok pada `herdr-peers@v0.1.0`.
- **[agentkit](/id/kit/agentkit)** — Satu perintah ak untuk setiap coding agent di terminal: otonomi secara default dengan opt-out, dan delegasi headless di dalam worktree. Dipatok pada `coding-agents-kit@v0.3.0`.
- **[devcontainer](/id/kit/devcontainer)** — Dev container milik setiap repositori dari satu template: agen melalui ak, Herdr dua arah, tanpa kunci SSH di dalamnya. Dipatok pada `devcontainer-kit@v0.2.1`.
- **[vim](/id/kit/vim)** — Editor terminal, dengan penjelajah rencana hanya-baca dan penampil Markdown. Dipatok pada `deepworkplan-vim@v0.5.1`.

Registri addon dan deskriptor dikirimkan dalam Deep Work Plan v7: `v7.0.0`

### Contoh

Panduan langkah demi langkah, sebelum-dan-sesudah.

- [Telusuri kit](/kit)
- [Mulai Cepat](/quickstart)
- [Lihat contoh](/examples)
