---
title: "Pengembang — API agent Deep Work Plan"
description: "Permukaan agen Deep Work Plan: API read-only tanpa autentikasi dan berversi, dengan OpenAPI, server MCP, dan Markdown per halaman dalam 17 bahasa."
---

## Tanpa autentikasi secara desain

Tidak ada kunci API untuk dibuat, tidak ada alur OAuth, dan tidak ada sandbox yang terpisah dari produksi — permukaan produksi itu sendirilah sandbox-nya. Ini adalah properti metodologi yang disengaja: agent tidak bisa mengisi formulir "hubungi sales", jadi situs ini tidak pernah memintanya.

- **Read-only** — setiap operasi adalah GET yang aman dan dapat di-cache, kecuali endpoint MCP (POST). Tidak ada operasi tulis di mana pun.
- **Tanpa kunci API** — tidak ada registrasi, token, atau tingkat rate limit. Akses anonim adalah kontrak terdokumentasi, dinyatakan di [/auth.md](https://deepworkplan.com/auth.md).
- **Gratis dan open source** — konten situs dan skill DWP berlisensi MIT.
- **Machine-first** — error JSON terstruktur pada `/api/*`, body pemulihan 404 Markdown, katalog API RFC 9727, dan manifest kapabilitas ARD.

## Merencanakan dan menjalankan dengan skill

API di atas memungkinkan agent membaca situs ini. Skill DWP adalah yang memungkinkan agent menjalankan metodologinya — pasang sekali di sebuah repositori, dan skill ini membawa router beserta sembilan sub-skill, dipanggil sebagai slash command (atau dengan namanya, untuk agent yang meng-intercept slash — kebanyakan memakai `#` sebagai gantinya, misalnya `#dwp-execute`).

Setiap rencana memilih satu nilai dari masing-masing dua sumbu yang independen:

- **Lite** — Catatan tugas hidup langsung di README rencana, di balik anchor `#task-N` yang stabil. Dibuat untuk pekerjaan kecil dan berbatas: satu concern, kira-kira satu sesi kerja.
- **Full** — Satu file per tugas di bawah `N.task_<slug>.md`, untuk pekerjaan berjangka panjang yang berlangsung berjam-jam atau berhari-hari, atau ketika ada dependensi nyata antar tugas. Sebuah rencana Lite dipromosikan ke Full belakangan dengan `/dwp-refine promote`.
- **Guided (bawaan)** — `dwp-create` menganalisis goal, menguraikannya, dan mewujudkan rencana yang dapat ditinjau, lalu bertanya: pertahankan, promosikan Lite ke Full, edit, atau hentikan. Manusia tetap berada dalam loop sebelum pekerjaan produk apa pun dimulai.
- **Trust (atau auto)** — Tambahkan `trust` (atau `auto`) sebagai kata terakhir, misalnya `/dwp-create <goal> trust`, dan agent melewati putaran review lalu langsung mengembalikan perintah execute.

Sembilan sub-skill:

| Perintah | Tujuan |
|---------|---------|
| `/dwp-create <goal>` | Mengubah sebuah goal menjadi rencana — Lite secara bawaan, Full untuk pekerjaan yang lebih besar. |
| `/dwp-execute` | Menjalankan rencana yang ada tugas demi tugas: membacanya secara utuh, mengeksekusi setiap tugas secara berurutan, memvalidasi gate-nya, memperbarui progres. |
| `/dwp-refine` | Menambah, menghapus, atau menyusun ulang urutan tugas dalam rencana yang ada sambil menjaga pekerjaan yang sudah selesai beserta buktinya yang tercatat. |
| `/dwp-resume` | Merekonstruksi status dari file-file rencana itu sendiri dan melanjutkan rencana yang terhenti dari tugas pertamanya yang belum selesai. |
| `/dwp-status` | Melaporkan progres sebuah rencana — tugas yang selesai, sedang berjalan, tertunda — tanpa membuat perubahan apa pun. |
| `/dwp-verify` | Memeriksa secara mekanis apakah repositori bersifat AI-first dan apakah rencananya terbentuk dengan baik. Tidak mengubah apa pun; melaporkan lulus atau gagal. |
| `/deepworkplan-onboard` | Menjadikan sebuah repositori AI-first: bernalar tentang stack-nya, lalu menghasilkan `AGENTS.md`, `docs/`, `.agents/` yang disesuaikan, dan `.dwp/` yang di-gitignore. |
| `/skill-create`, `/agent-create` | Sub-skill penulis: menumbuhkan kit milik repositori itu sendiri — sebuah skill yang dapat dipakai ulang untuk prosedur yang berulang, atau sebuah agent untuk peran berulang. |
| `/dwp-upgrade` | Memeriksa apakah ada rilis skill baru yang dipublikasikan dan, hanya setelah persetujuan eksplisit, memasangnya lalu menjalankan ulang onboarding. |

Perbaikan kecil dan berbatas — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Pekerjaan berjangka panjang — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

Output setiap rencana — manifest, progress log, catatan tugas, bukti gate — hidup di dalam direktori `.dwp/` yang di-gitignore, di dalam repositori itu sendiri. Tidak ada yang dikirim ke atau disimpan oleh deepworkplan.com; skill ini sama sekali tidak melakukan panggilan jaringan.

## Endpoint

| Metode | Path | Tujuan |
|--------|------|---------|
| GET | `/openapi.json` | Spesifikasi OpenAPI 3.1 dari seluruh API agent. |
| GET | `/llms.txt` | Indeks panduan LLM terkurasi — titik masuk yang direkomendasikan. |
| GET | `/init.md` | Prompt adopsi DWP kanonik. |
| GET | `/{page}.md` | Halaman apa pun sebagai Markdown sumber, dalam semua 17 bahasa. |
| GET | `/api/health.json` | Penanda health statis. |
| GET | `/api/v1/index.json` | Katalog berversi dari keluarga v1: jalur endpoint, versi situs, dan tautan ke spesifikasi. |
| GET | `/api/v1/sections.json` | Peta situs sebagai JSON bertipe — nama, jalur, dan deskripsi per bagian. |
| GET | `/api/v1/pages.json` | Setiap endpoint Markdown dalam setiap bahasa, dikelompokkan per kode bahasa. |
| GET | `/api/v1/health.json` | Penanda kesehatan berversi — cermin v1 dari `/api/health.json`. |
| POST | `/api/mcp` | Server MCP (Streamable HTTP, stateless). |
| GET | `/.well-known/ai-catalog.json` | Manifest kapabilitas ARD (agentmap). |

Path `/api/*` yang tidak dikenal mengembalikan error JSON terstruktur dengan petunjuk resolusi, bukan halaman error HTML.

## Pemberversian dan deprekasi

Keluarga JSON berversi berada di bawah `/api/v1/` — index, sections, pages, dan health — dan jalur kanonik tanpa versi (`/llms.txt`, `/{page}.md`, `/api/mcp`) termasuk dalam kontrak v1 yang sama. Perubahan yang merusak kompatibilitas hanya dikirim dalam keluarga `/api/v{N+1}/` baru, tidak pernah di dalam v1. Saat sebuah endpoint dideprekasi, responsnya membawa `Deprecation: true` dan tanggal `Sunset` setidaknya 180 hari sebelum penghapusan, dan header `Link` menunjuk ke penerusnya.

## Batas laju permintaan

Respons pada `/api/*` membawa header batas laju RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, dan `RateLimit-Policy` — agar agent dapat mengatur dirinya secara real-time; respons `429` menambahkan `Retry-After`. Penegakan dilakukan sebaik mungkin di edge (120 permintaan per 60 detik per pengunjung) dan akses tetap anonim: tanpa kunci, tanpa pendaftaran, tanpa tingkatan.

## Server MCP

Server Model Context Protocol stateless melalui Streamable HTTP di `https://deepworkplan.com/api/mcp`. Tiga tool read-only:

- `get_init_prompt` — prompt adopsi /init.md kanonik.
- `list_site_sections` — peta situs dengan deskripsi satu baris.
- `read_page` — halaman apa pun sebagai Markdown sumber native, mis. `/init` atau `/es/methodology/01-manifesto`.

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

Versi protokol 2025-03-26 dan 2025-06-18 didukung; tidak ada sesi yang diperlukan. Manifest: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Kartu server: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown untuk agent

Setiap halaman yang dirender diterbitkan sebagai Markdown sumber native — bukan konversi HTML:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Pasang kit

Jalur instalasi resmi untuk skill Deep Work Plan — perintah yang sama dengan yang diberikan endpoint /init kepada agent. Bekerja dengan coding agent apa pun yang kompatibel dengan skills (Claude Code, Cursor, Codex, Gemini, dan lainnya):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Skill di-vendor ke dalam `.agents/skills/deepworkplan/` di dalam repositori Anda, sehingga setiap agent yang menyentuh repo berbagi metodologi yang sama. CLI resmi `deepworkplan` — klien tanpa dependensi di atas API yang sama (`init`, `sections`, `read`, `open`, `mcp`) — telah disiapkan untuk npm dan berada di direktori [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) repositori situs hingga dipublikasikan.

## Sumber daya yang dapat dibaca mesin

- [Spesifikasi OpenAPI](https://deepworkplan.com/openapi.json)
- [Deklarasi akses & autentikasi agent](https://deepworkplan.com/auth.md)
- [Katalog API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifest MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Kontak keamanan](https://deepworkplan.com/.well-known/security.txt)
- [Deskriptor repo situs](https://deepworkplan.com/.well-known/dwp.json)
