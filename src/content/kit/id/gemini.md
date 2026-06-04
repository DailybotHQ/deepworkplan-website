---
title: Google Gemini
description: "Adapter DWP untuk Google Gemini, dengan dukungan parsial melalui prosedur command markdown dan prefix hash yang menjalankan alur kerja sekuensial."
kind: adapter
lang: id
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Adapter Google Gemini

Google Gemini mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Parsial** — command inti berjalan melalui file prosedur.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Gemini membaca file prosedur dan menjalankan alur kerja DWP yang sekuensial.
