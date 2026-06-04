---
title: GitHub Copilot
description: "Adapter DWP untuk GitHub Copilot, dengan dukungan parsial melalui prosedur command markdown dan prefix hash; sebagian otomasi dilakukan secara manual."
kind: adapter
lang: id
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Adapter GitHub Copilot

GitHub Copilot mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Parsial** — command inti berjalan melalui file prosedur; sebagian otomasi bersifat manual.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown di dalam repositori.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Copilot membaca file prosedur, tetapi eksekusinya kurang otonom dibanding Claude Code.
