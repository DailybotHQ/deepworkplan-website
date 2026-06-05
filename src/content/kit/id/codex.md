---
title: OpenAI Codex
description: "Adapter DWP untuk OpenAI Codex, dengan dukungan penuh melalui prosedur command markdown dan prefix hash yang menjalankan loop Deep Work Plan secara lengkap."
kind: adapter
lang: id
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Adapter OpenAI Codex

Codex mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Penuh** — setiap command dwp-* berjalan dari file prosedurnya.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent saat dipanggil; aturan dipasang di bawah `.codex/`.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Bundel offline disarankan. Codex membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
