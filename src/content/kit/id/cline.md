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

Opsional: [coding-agents-kit](/kit/agentkit) dapat memasang CLI ini dan menjalankannya dengan `ak cline`. Penginstal resmi dari vendor juga sama baiknya.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Cline membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
