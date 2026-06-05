---
title: GitHub Copilot
description: "Adapter DWP untuk GitHub Copilot, dengan dukungan penuh melalui AGENTS.md dan prosedur command markdown yang dipanggil dengan prefix hash."
kind: adapter
lang: id
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Adapter GitHub Copilot

Copilot mendukung DWP melalui AGENTS.md dan prosedur command markdown.

## Tingkat dukungan

**Penuh** — Copilot membaca AGENTS.md dan file prosedur dwp-*, serta menjalankan setiap command dari sana.

## Instalasi

DWP mengirimkan AGENTS.md dan prosedur command di dalam repositori; Copilot membacanya sebagai konteks repositori.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Copilot membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
