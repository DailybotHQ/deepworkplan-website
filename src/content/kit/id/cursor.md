---
title: Cursor
description: "Adapter DWP untuk Cursor AI, dengan dukungan penuh melalui sistem project rules dan prefix command hash, karena Cursor memakai slash untuk dirinya sendiri."
kind: adapter
lang: id
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adapter Cursor

Cursor mendukung DWP melalui project rules dan command file.

## Tingkat dukungan

**Penuh** — command DWP berjalan melalui sistem rules milik Cursor.

## Instalasi

Command DWP tersimpan sebagai markdown di dalam proyek. Cursor membacanya melalui sistem rules-nya.

## Pemanggilan

Gunakan prefix `#` (Cursor menangkap `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Gunakan `#` karena Cursor memakai `/` untuk command-nya sendiri.
