---
title: Windsurf
description: "Adapter DWP untuk Windsurf, dengan dukungan penuh melalui sistem aturannya dan prosedur command markdown yang dipanggil dengan prefix hash."
kind: adapter
lang: id
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Adapter Windsurf

Windsurf mendukung DWP melalui sistem aturannya dan prosedur command markdown.

## Tingkat dukungan

**Penuh** (Teruji instalasi) — Windsurf membaca aturan proyek dan menjalankan setiap perintah dwp-* dari file prosedurnya. Rute dipastikan oleh rangkaian pengujian otomatis.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent melalui sistem aturan Windsurf.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Windsurf membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
