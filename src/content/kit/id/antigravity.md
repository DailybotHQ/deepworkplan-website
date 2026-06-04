---
title: Antigravity
description: "Adapter DWP untuk Antigravity, dengan dukungan parsial melalui prosedur command markdown dan prefix hash yang menjalankan alur kerja sekuensial."
kind: adapter
lang: id
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Adapter Antigravity

Antigravity mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Parsial** — command inti berjalan melalui file prosedur.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent saat dipanggil.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Antigravity membaca file prosedur dan menjalankan alur kerja DWP yang sekuensial.
