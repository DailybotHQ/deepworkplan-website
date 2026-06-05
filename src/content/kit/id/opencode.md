---
title: OpenCode
description: "Adapter DWP untuk OpenCode, agent sumber terbuka, dengan dukungan penuh melalui AGENTS.md native dan prosedur command markdown yang dipanggil dengan prefix hash."
kind: adapter
lang: id
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adapter OpenCode

OpenCode, coding agent sumber terbuka, mendukung DWP melalui AGENTS.md native dan prosedur command markdown.

## Tingkat dukungan

**Penuh** — OpenCode membaca AGENTS.md secara native dan menjalankan setiap command dwp-* dari file prosedurnya.

## Instalasi

DWP mengirimkan AGENTS.md dan prosedur command di dalam repositori; OpenCode menemukannya sebagai konteks proyek.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

OpenCode membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
