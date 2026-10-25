---
title: OpenAI Codex
description: "Adapter DWP untuk OpenAI Codex, dengan dukungan penuh melalui prosedur command markdown dan prefix hash yang menjalankan loop Deep Work Plan secara lengkap."
kind: adapter
lang: id
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Adapter OpenAI Codex

Codex mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Penuh** (Teruji perilaku) — setiap perintah dwp-* dijalankan dari file prosedurnya, terbukti dalam benchmark serah terima pembuatan dan pemulihan dua arah antar model.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent saat dipanggil; aturan dipasang di bawah `.codex/`.

Opsional: [coding-agents-kit](/kit/agentkit) dapat memasang CLI ini dan menjalankannya dengan `ak codex`. Penginstal resmi dari vendor juga sama baiknya.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Bundel offline disarankan. Codex membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
