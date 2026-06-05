---
title: Antigravity
description: "Adapter DWP untuk Antigravity, dengan dukungan penuh melalui prosedur command markdown dan prefix hash yang menjalankan loop Deep Work Plan secara lengkap."
kind: adapter
lang: id
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Adapter Antigravity

Antigravity mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Penuh** — setiap command dwp-* berjalan dari file prosedurnya melalui permukaan command native.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent saat dipanggil.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Antigravity membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
