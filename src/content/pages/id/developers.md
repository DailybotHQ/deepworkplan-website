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
