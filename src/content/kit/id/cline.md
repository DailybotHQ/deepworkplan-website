---
title: Cline
description: "Adapter DWP untuk Cline, agent sumber terbuka, dengan dukungan penuh melalui aturan markdown dan prosedur command yang dipanggil dengan prefix hash."
kind: adapter
lang: id
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adapter Cline

Cline, coding agent sumber terbuka, mendukung DWP melalui aturan markdown dan prosedur command.

## Tingkat dukungan

**Penuh** — Cline membaca aturan markdown dan menjalankan setiap command dwp-* dari file prosedurnya.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent melalui aturan Cline.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Cline membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
