---
title: Google Gemini
description: "Adapter DWP untuk Google Gemini, dengan dukungan penuh melalui prosedur command markdown dan prefix hash yang menjalankan loop Deep Work Plan secara lengkap."
kind: adapter
lang: id
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Adapter Google Gemini

Gemini mendukung DWP melalui prosedur command markdown.

## Tingkat dukungan

**Penuh** (Teruji instalasi) — setiap perintah dwp-* dijalankan dari file prosedurnya. Rute dipastikan oleh rangkaian pengujian otomatis; alur kerja perilaku berjalan pada baseline sekuensial. Memerlukan eksekusi alat dan akses file ruang kerja.

## Instalasi

Command DWP tersimpan sebagai prosedur markdown yang dibaca agent saat dipanggil.

## Pemanggilan

Gunakan prefix `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Catatan

Gemini membaca file prosedur dan menjalankan loop Deep Work Plan sekuensial secara penuh.
