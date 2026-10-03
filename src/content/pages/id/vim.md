---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim adalah editor terminal Deep Work Plan: konfigurasi Neovim 0.12+ dengan indeks perintah otomatis, peramban rencana, dan penampil Markdown."
lastUpdated: 2026-10-03
---

## Apa itu

Konfigurasi Neovim untuk manusia dan agen coding yang hidup di terminal — Deep Work Plans, dokumentasi, dan indeks perintah Anda hanya satu ketukan jauhnya.

## Instalasi

Satu baris memasang DeepWorkPlan Vim sebagai konfigurasi Neovim Anda. Penginstal menjelaskan apa yang akan dilakukannya dan bertanya sebelum menyentuh penataan yang sudah ada.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Persetujuan lebih dulu: konfigurasi Neovim yang sudah ada tidak pernah ditimpa tanpa persetujuan tegas Anda. Penginstal berhenti dan menunjukkan jalur manual.

Di Windows perintah satu baris tidak berlaku; jalur manual didokumentasikan di README repositori. [Jalur instalasi Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Apa yang dilakukannya

Lima fitur, sengaja dibatasi cakupannya. Masing-masing dipetakan ke pintasan papan tombol yang bisa Anda periksa di indeks perintah yang dibuat otomatis.

| Fitur | Apa itu | Pemetaan |
|---|---|---|
| Indeks perintah otomatis | Indeks perintah dibuat dari konfigurasi yang aktif, sehingga daftar pintasan selalu mutakhir. | `SPC h h` |
| Gaya gerakan VS Code | Gestur penyuntingan yang dibentuk editor grafis: pilih semua, dan salin ke papan klip sistem. | `<C-a>`, `y`, `<leader>y` |
| Peramban Deep Work Plan | Panel untuk menelusuri rencana di repositori — baca sebuah rencana, tugas-tugasnya, dan gerbang validasinya tanpa meninggalkan editor. | `SPC P` |
| Penampil Markdown | Pratinjau Markdown di peramban atau render di buffer — dokumentasi dan rencana tetap di tempat kerja terjadi. | `SPC m p`, `SPC m r` |
| Penginstal satu baris | Penginstal mandiri untuk macOS dan Linux, dengan jalur manual terdokumentasi untuk Windows. | — |

## Persyaratan

- Neovim 0.12 atau lebih baru, dengan Lua (lua, lua5.4, atau luajit) tersedia
- macOS dan Linux; Windows didukung melalui jalur manual terdokumentasi
- Berlisensi GPL-3.0 — bebas digunakan, dipelajari, dan dimodifikasi

## Tautan terkait

- [Baca dokumen addon di kit](/kit/vim)
- [Lihat repositori sumber](https://github.com/DailybotHQ/deepworkplan-vim)
- Pasang DeepWorkPlan Vim, buka Neovim, dan baca Deep Work Plans Anda di terminal yang sama dengan agen Anda.
