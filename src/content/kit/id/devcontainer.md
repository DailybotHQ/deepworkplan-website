---
title: Devcontainer
description: "Addon opsional berbasis devcontainer-kit: template Dev Containers yang dirender oleh dck init, base image tanpa agen, dan mesin Herdr untuk setiap container."
kind: addon
lang: id
order: 1
---

# Addon Devcontainer

Berikan repositori sebuah dev container yang reproducible dan terisolasi — yang dapat digunakan oleh orang, editor, dan coding agent. Dalam **DWP v7 beta** (`v7.0.0-beta.1`, sebuah pra-rilis), addon ini mengintegrasikan **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, produk MIT yang bekerja tanpa Deep Work Plan, dan menggantikan template yang sebelumnya dibawa oleh paket. Addon ini opsional: sebuah repositori sepenuhnya konform tanpanya.

## Yang disediakan devcontainer-kit

- **Sebuah template**, dibangun di atas spesifikasi [Dev Containers](https://containers.dev), yang dirender oleh `dck init` ke dalam repositori: `devcontainer.json`, sebuah file compose, dan `docker/local/`. Jika dijalankan lagi nanti, ia melakukan rekonsiliasi dan tidak pernah menimpa suntingan Anda; setiap perubahan pada file yang sudah ada ditampilkan terlebih dahulu dan memerlukan persetujuan.
- **`dck`**, sebuah launcher yang menjalankan container dari terminal biasa — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — dengan atau tanpa VS Code atau Cursor.
- **Base image** dalam tiga varian, `python-3.13`, `node-24`, dan `debian`, yang dikirim **tanpa** coding agent.
- **Pustaka entrypoint** untuk volume persisten, SSH, dan environment sesi SSH, alih-alih entrypoint yang disalin manual per repositori.
- **Mesin Herdr.** Setiap container dapat bergabung dengan [Herdr](https://herdr.dev) melalui server SSH yang hanya mendengarkan di loopback, sehingga agen di dalamnya menjadi rekan (peer) yang dapat dijangkau.

## Instalasi

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Persyaratan: `bash` 3.2 atau lebih baru dan `python3` 3.11 atau lebih baru di host Linux atau macOS, serta Docker dengan Compose v2 untuk perintah container. Verifikasi rilis dengan aset `SHA256SUMS`-nya.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/devcontainer-kit`, tag `v0.1.4`, antarmuka 1 |
| Kunci registri | `devcontainer` di `.dwp/config.json` |
| Konfigurasi per repositori | `.devcontainer/dck.toml` |
| Deteksi | `dck doctor --json` |

## Lapisan bersifat opt-in

Base image membawa alat pengembangan — git, gh, ripgrep, server SSH, Herdr, dan Neovim dengan DeepWorkPlan Vim yang dipatok berdasarkan tag — dan tidak membawa coding agent, CLI pelaporan, maupun secret. Segala hal lainnya adalah lapisan yang Anda aktifkan di `dck.toml`:

| Lapisan | Default | Yang ditambahkan |
|---|---|---|
| `agents` | nonaktif | Menginstal [coding-agents-kit](/kit/agentkit) dan CLI yang Anda daftarkan, masing-masing dengan volume persisten sendiri. Tidak ada flag untuk melewati izin yang disetel. |
| `editor` | aktif | Neovim dengan DeepWorkPlan Vim; jika nonaktif, Anda mendapat editor biasa. |

## Default keamanan

- Setiap port yang dipublikasikan terikat ke `127.0.0.1` kecuali `dck.toml` menyetel `bind`.
- Penerusan SSH agent dari host; kunci privat host tidak pernah disalin ke dalam container.
- Kunci host SSH dibuat saat runtime ke dalam volume per proyek, tidak pernah ditanamkan ke dalam image; server hanya menerima kunci publik, tanpa login root dan tanpa kata sandi.
- Template tidak menambahkan `cap_add`, mode `privileged`, maupun socket Docker.
- Base image dan alat dipatok berdasarkan versi dan diverifikasi dengan checksum; compose merujuk base image berdasarkan digest setiap kali digest tersebut dapat di-resolve.

## Catatan

Opsional dan tidak pernah wajib. Sebuah repositori sepenuhnya konform tanpa addon opsional sama sekali. v0.1 mendukung host Linux dan macOS.
