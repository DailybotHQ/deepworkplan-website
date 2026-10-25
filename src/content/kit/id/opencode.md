---
title: OpenCode
description: "Adapter DWP untuk OpenCode, agent sumber terbuka, dengan dukungan penuh melalui AGENTS.md native dan prosedur command markdown yang dipanggil dengan prefix."
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

**Penuh** (Teruji instalasi) — OpenCode membaca AGENTS.md secara native dan menjalankan setiap perintah dwp-* dari file prosedurnya. Rute dipastikan oleh rangkaian pengujian otomatis.

## Instalasi

DWP mengirimkan AGENTS.md dan prosedur command di dalam repositori; OpenCode menemukannya sebagai konteks proyek.

Opsional: [coding-agents-kit](/kit/agentkit) dapat memasang CLI ini dan menjalankannya dengan `ak opencode`. Penginstal resmi dari vendor juga sama baiknya.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

OpenCode membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
