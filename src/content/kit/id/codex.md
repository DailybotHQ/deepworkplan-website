---
title: OpenAI Codex
description: "Adapter DWP untuk OpenAI Codex, dengan dukungan parsial melalui prosedur command markdown dan prefix hash; fitur team agent tidak tersedia."
kind: adapter
lang: id
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# Adapter OpenAI Codex

OpenAI Codex mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Parsial** — command inti berjalan; fitur lanjutan (team agent) tidak tersedia.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent saat dipanggil.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Fitur team agent hanya ada di Claude; Codex mendukung alur kerja sekuensial.
