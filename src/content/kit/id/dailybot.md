---
title: Dailybot
description: "Addon DWP opt-in: menghubungkan siklus hidup rencana ke tim Dailybot, penegakan hook opsional, dan skill agen Dailybot lengkap 3.4.0 (chat, check-in, formulir, ask AI, dan lainnya)."
kind: addon
lang: id
order: 2
---

# Addon Dailybot

Hubungkan eksekusi Deep Work Plan ke **tim Dailybot** agar manusia melihat apa yang dibangun agen — kickoff, progres pertengahan rencana, pemblokiran, dan penyelesaian — tanpa menambah rapat atau toolchain kedua. Addon **opt-in** untuk tim yang sudah menggunakan [Dailybot](https://www.dailybot.com).

Metodologi Deep Work Plan inti memiliki **nol** ketergantungan pada Dailybot. Repositori tanpa addon sepenuhnya konforman. Tawarkan addon ini hanya ketika pengembang atau tim sudah menggunakan Dailybot; jangan pernah menginstal otomatis untuk semua orang.

## Kapan menggunakannya

| Sinyal | Tindakan |
|--------|--------|
| Tim sudah menggunakan Dailybot (Slack, Teams, Discord, Google Chat, atau dashboard) | **Rekomendasikan** saat onboarding |
| Pengembang meminta visibilitas progres agen atau pembaruan gaya standup | **Tawarkan** addon |
| Repositori greenfield tanpa akun Dailybot | **Lewati** — baseline vendor-neutral sudah cukup |
| Pekerjaan klien di bawah NDA di mana progres tidak boleh keluar dari repo | **Lewati**, atau commit `.dailybot/disabled` sebagai kill-switch lokal |

## Yang dihubungkan addon ini (sengaja sempit)

Addon DWP Dailybot **tidak** menciptakan ulang Dailybot. Addon ini menghubungkan eksekusi rencana ke sub-skill dailybot **`report`** dan secara opsional meng-commit hook harness. Segala hal lain — instalasi, persetujuan, autentikasi, gaya penulisan — **ditunda** ke [skill agen Dailybot](https://github.com/DailybotHQ/agent-skill) resmi (saat ini **3.4.0**).

### Empat peristiwa siklus hidup

Selama DWP `create` / `execute`, addon menghubungkan **empat pembaruan agen best-effort**. Setiap peristiwa bersyarat (Dailybot ada dan terautentikasi), tidak memblokir, dan menghormati `.dailybot/disabled`.

| Peristiwa | Pemicu | Level | Persyaratan |
|-------|---------|-------|-------------|
| **Kickoff** | Rencana dimaterialisasi dan disetujui, atau giliran `execute` pertama | regular | SHOULD |
| **Significant task** | Fitur, perbaikan bug, atau refactor besar selesai — bukan tugas setup | regular | MAY |
| **Blocked** | Rencana berhenti; `state.json.blocked` terisi (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | Semua tugas selesai; rencana selesai | **milestone** | SHOULD |

Payload berasal dari lapisan status rencana (`state.json`) jika ada: `completed` sebagai hasil (bukan nomor tugas), `in_progress` dari tugas saat ini, `blockers` dari `state.json.blocked`. Pesan menjelaskan **apa yang dibangun dan mengapa** — bukan jalur file, statistik git, nama branch, atau ID rencana.

### Penegakan hook opsional

Dengan `dailybot-cli >= 3.1.2`, addon **dapat** meng-commit hook harness tingkat repo (`dailybot hook session-start | activity | post-commit | stop | dismiss`) yang didukung ledger lokal per repo. Harness mengingatkan agen di akhir giliran ketika peristiwa siklus hidup terlewat — penting untuk sesi panjang tanpa pengawasan di mana instruksi prompt memudar.

Laporan siklus hidup yang berhasil **mereset** ledger hook, sehingga kedua lapisan tidak pernah melaporkan ganda. Perintah hook hanya membaca status lokal dan selalu keluar dengan `0`.

### Identitas repo dan kebijakan laporan

Secara opsional commit `.dailybot/profile.json` (atau `.dailybot_example/profile.json` sebagai template) agar setiap kontributor dan agen menandatangani laporan dengan cara yang sama. **Jangan** pernah memasukkan kredensial ke file itu — field `key` adalah kesalahan fatal.

File yang sama dapat membawa kebijakan laporan yang dihormati hook:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` sangat berguna untuk repo yang berat riset atau dokumentasi: pekerjaan tanpa commit (analisis, dokumen desain, rencana) segera diingatkan.

## Instalasi (semua opt-in)

Addon **menawarkan** jalur instalasi; skill Dailybot mengelola persetujuan dan verifikasi.

| Komponen | Perintah / jalur |
|-----------|----------------|
| **Skill agen Dailybot** (direkomendasikan) | `npx skills add DailybotHQ/agent-skill` |
| **Perbarui skill yang ada** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (minimum `>= 3.1.2`) | Diinstal oleh skill saat penggunaan pertama melalui `shared/auth.md` terverifikasi; atau `pip install 'dailybot-cli>=3.1.2'`, Homebrew, atau installer terverifikasi checksum di [cli.dailybot.com](https://cli.dailybot.com) |

Periksa versi: `dailybot --version` dan `dailybot version --check`. Upgrade: `dailybot upgrade`.

## Autentikasi — ditunda

Addon ini **tidak pernah** meminta email, OTP, atau API key, dan **tidak pernah** menyimpan kredensial. Autentikasi dimiliki oleh [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) skill Dailybot:

- `dailybot login` (email OTP), atau
- `DAILYBOT_API_KEY` / `dailybot config key=...`

Jika autentikasi ditolak atau tidak tersedia, pelaporan dilewati secara diam-diam — pekerjaan berlanjut.

## Skill Dailybot yang dipasangkan — 13 kemampuan (3.4.0)

Menginstal skill agen Dailybot membawa jauh lebih banyak daripada yang dihubungkan addon DWP. Paket skill resmi (skill **3.4.0**, CLI **>= 3.1.2**, publish saat ini **3.2.1**) mengekspos **13 sub-skill terkoordinasi**:

| Sub-skill | Fungsinya |
|-----------|--------------|
| **Progress reports** | Pembaruan agen gaya standup ke dashboard Dailybot |
| **Ask the AI** | Kueri one-shot headless ke asisten AI Dailybot |
| **Message polling** | Periksa instruksi tim saat sesi dimulai atau saat idle |
| **Email** | Kirim email dengan pemeriksaan keamanan wajib sebelum kirim |
| **Chat** | Kirim atau edit di Slack, Microsoft Teams, Discord, atau Google Chat — channel, DM, tim, thread gaya laporan, send-as-user (Slack, admin) |
| **Conversations** | Buka atau gunakan ulang group DM Slack dengan bot dan rekan tim yang disebutkan; posting laporan dalam panggilan yang sama |
| **Health and status** | Umumkan agen online/offline untuk sesi berjalan lama |
| **Check-ins** | Selesaikan standup; **author** check-in (jadwal, peserta, pertanyaan, pengingat, pengaturan AI) |
| **Kudos** | Kenali rekan tim atau seluruh tim; jelajahi feed pengakuan, feed org, wall of fame |
| **Teams** | Daftar tim, periksa anggota, selesaikan nama ke UUID; `me`, `org`, profil pengguna |
| **Forms** | Daftar, kirim, perbarui, transisi formulir; **author** formulir (status workflow, izin, ChatOps) |
| **Workflows** | Baca workflow org (`workflow list` / `workflow get`; hanya baca) |
| **Report channels** | Temukan UUID channel untuk formulir atau check-in |

**Addon DWP hanya menghubungkan `report` ke eksekusi rencana.** Panggil skill Dailybot langsung untuk segala hal lain — misalnya, posting ringkasan deploy ke `#releases`, selesaikan standup, atau minta AI Dailybot merangkum tren check-in.

Referensi publik: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Sumber: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Model kepercayaan: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) di paket skill.

## Perilaku — tunda, jangan pernah blokir

| Aturan | Detail |
|------|--------|
| **Tunda** | Skill Dailybot mengelola instalasi, persetujuan, auth, template hook, gaya penulisan |
| **Jangan pernah blokir** | CLI tidak ada, auth gagal, error jaringan → peringatkan sekali, lanjutkan pekerjaan utama |
| **Tanpa retry** | Jangan masuk loop diagnostik; pelaporan adalah best-effort |
| **Rekonsiliasi** | Skill, CLI, profile, hook, atau wiring laporan yang ada dipertahankan — hanya isi celah |
| **Vendor-neutral** | DWP tidak memerlukan Dailybot; addon ini adalah visibilitas tim tambahan |

## Alur onboarding

Selama DWP `onboard` **Fase 7b**, setelah scaffolding AI-first inti, alur menawarkan empat addon opt-in. Jika pengembang menerima Dailybot:

1. Deteksi setup yang ada (skill, CLI, `.dailybot/profile.json`, hook, langkah laporan).
2. Tawarkan instalasi skill/CLI melalui alur persetujuan Dailybot.
3. Tunda autentikasi ke `shared/auth.md`.
4. Hubungkan empat peristiwa siklus hidup ke `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Secara opsional tawarkan penegakan hook dan `.dailybot/profile.json`.
6. Jalankan validasi (SPEC §8 di `addons/dailybot/SPEC.md` skill).

Kontrak normatif di skill Deep Work Plan: `addons/dailybot/SPEC.md` (versi **2.3.0**).

## Entri kit terkait

- [Devcontainer](/kit/devcontainer) — lingkungan dev yang dapat direproduksi dengan persistensi CLI Dailybot (addon pertama)
- [Dependency upgrade](/kit/dependency-upgrade) — upgrade dependensi bertahap dan tervalidasi (addon ketiga)
- [Design system](/kit/design-system) — `DESIGN.md` berorientasi agen untuk permukaan antarmuka (addon keempat)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — sub-skill onboarding yang menawarkan addon
