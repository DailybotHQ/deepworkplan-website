---
title: "Kit Deep Work Plan"
description: "Skill dan delapan sub-skill-nya, command, adapter agent, preset onboarding, addon opt-in, dan contoh yang membuat Deep Work Plan dapat dijalankan di mana saja."
lastUpdated: 2026-05-31
---

## Kit Deep Work Plan

Kit adalah semua yang Anda perlukan untuk menjalankan metodologi dalam praktik. Ia dipasang dari
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### Skill dan sub-skill-nya

Skill Deep Work Plan adalah sebuah router ditambah delapan sub-skill:

- **create** — menguraikan sebuah tujuan menjadi rencana terstruktur (`/dwp-create`).
- **execute** — menjalankan rencana tugas demi tugas, memvalidasi setiap gate (`/dwp-execute`).
- **refine** — menambah, menghapus, atau menyusun ulang tugas sambil mempertahankan pekerjaan yang selesai (`/dwp-refine`).
- **resume** — merekonstruksi status dan melanjutkan rencana yang terhenti (`/dwp-resume`).
- **status** — melaporkan kemajuan tanpa membuat perubahan (`/dwp-status`).
- **verify** — memeriksa konformansi repositori dan rencana secara objektif (`/dwp-verify`).
- **onboard** — menjadikan sebuah repositori AI-first (`/deepworkplan-onboard`).
- **author** — membuat atau mengembangkan skill, agent, dan command milik repo sendiri (`/skill-create`, `/agent-create`).

### Command

Slash command tipis mendelegasikan ke sub-skill dan addon:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — loop plan-execute-verify.
- `skill-create`, `agent-create` — mendelegasikan ke sub-skill author.
- `lib-upgrade` — mendelegasikan ke addon dependency-upgrade (dipasang hanya ketika addon itu diterima).

### Adapter

Integrasi per-agent yang tipis untuk Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini,
OpenCode, Windsurf, Cline, dan Antigravity.

### Preset onboarding

Panduan penalaran per-stack yang dipakai alur onboard untuk menyesuaikan docs, skill, dan perintah validasi —
bukan template. Enam preset: Django, Vue + Vite, Astro/Svelte, layanan Node/TS, paket/CLI Python,
dan sebuah fallback generik.

### Addon (opt-in)

Kemampuan opsional yang dapat ditambahkan alur onboard ke sebuah repo — tidak pernah menjadi bagian dari baseline AI-first:

- **Devcontainer** — kontainer pengembangan yang terisolasi dan dapat direproduksi dengan autentikasi AI-CLI yang persisten.
- **Dailybot** — pelaporan kemajuan dan milestone secara best-effort untuk tim yang memakai Dailybot.
- **Dependency upgrade** — peningkatan yang agnostik terhadap package manager, terkelompok, tervalidasi, dan dapat dikembalikan.
- **Sistem desain** — sebuah `DESIGN.md` bercakupan frontend (di `docs/DESIGN.md`, dirujuk dari `AGENTS.md`) yang dinalar dari token desain nyata repo, sehingga agent menghasilkan UI yang sesuai brand; aktif secara default ketika sebuah sistem desain terdeteksi.

### Contoh

Panduan langkah demi langkah, sebelum-dan-sesudah.

- [Telusuri kit](/kit)
- [Mulai Cepat](/quickstart)
- [Lihat contoh](/examples)
