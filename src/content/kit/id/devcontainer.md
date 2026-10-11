---
title: Devcontainer
description: "Dev container yang dapat direproduksi per repositori dari satu templat: agen siap lewat ak, Herdr terhubung dua arah, dan tanpa kunci SSH di dalamnya."
kind: addon
lang: id
order: 1
---

# Addon Devcontainer

Berikan repositori sebuah dev container yang reproducible dan terisolasi — yang dapat digunakan oleh orang, editor, dan coding agent. Dalam **DWP v7** (paket `v7.5.0`), addon ini mengintegrasikan **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, produk MIT yang bekerja tanpa Deep Work Plan. Addon ini opsional: sebuah repositori sepenuhnya konform tanpanya.

## Yang disediakan devcontainer-kit

- **Sebuah template**, dibangun di atas spesifikasi [Dev Containers](https://containers.dev), yang dirender oleh `dck init` ke dalam repositori dengan satu tata letak tetap: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml`, dan `dev.sh`. Jika dijalankan lagi nanti, ia melakukan rekonsiliasi dan tidak pernah menimpa suntingan Anda; setiap perubahan pada file yang sudah ada ditampilkan terlebih dahulu dan memerlukan persetujuan.
- **Container milik repositori itu sendiri.** Dockerfile dimulai dari image resmi runtime yang dipatok berdasarkan digest — `node-24`, `python-3.13`, atau `debian` — dan menyalin langkah build kit ke dalam `docker/local/<service>/dck/`. Tidak ada base image bersama yang terlibat.
- **`dev.sh` dan `dck`.** `bash dev.sh up` mem-build, menjalankan, dan menyambungkan ke container dari terminal biasa; `shell`, `rebuild`, `doctor`, dan lainnya bekerja dengan atau tanpa VS Code atau Cursor.
- **Herdr dua arah.** [Herdr](https://herdr.dev) di host menyambungkan setiap container sebagai mesin melalui server SSH yang hanya mendengarkan di loopback, dan container terbuka dengan sidebar standar: App, Editor, Development, dan Agents. Setiap workspace dan panel, termasuk yang dibuka kemudian, dimulai di path aplikasi (`/app` secara default). Di dalamnya, [herdr-peers](/kit/herdr) memungkinkan agen bertanya kepada agen di host dan di container lain.
- **Skill `dck-dockerfile`.** Sebuah agen membuat atau meregenerasi container sebuah repositori atas permintaan dan membuktikannya dengan build sungguhan.

## Instalasi

```bash
git clone --branch v0.2.10 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Persyaratan: `bash` 3.2 atau lebih baru dan `python3` 3.11 atau lebih baru di host Linux atau macOS, serta Docker dengan Compose v2 untuk perintah container. Verifikasi rilis dengan aset `SHA256SUMS`-nya. Patok `v0.2.10`: `v0.2.0` tidak didukung.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/devcontainer-kit`, tag `v0.2.10`, antarmuka 2 |
| Kunci registri | `devcontainer` di `.dwp/config.json` |
| Konfigurasi per repositori | `.devcontainer/dck.toml` |
| Deteksi | `dck doctor --json` |

## Lapisan

Setiap container membawa alat pengembangan — git, gh, ripgrep, server SSH, Herdr, dan herdr-peers — dan tidak membawa secret. Sisanya adalah lapisan yang Anda pilih di `dck.toml`:

| Lapisan | Default | Yang ditambahkan |
|---|---|---|
| `agents` | nonaktif | [coding-agents-kit](/kit/agentkit) dari rilisnya yang terverifikasi dan CLI yang Anda daftarkan, masing-masing dengan volume persisten sendiri, ditambah preset `classic` (`claudex`, `codexx`, …) dan `providers` (`claude-glm`, `codex-azure`, …). Agen berjalan dalam mode otonom secara default — container itulah sandbox-nya. Opt-out: `AGENTKIT_PERMISSIONS=ask` di `.env` milik service. |
| `editor` | aktif | Neovim dengan [DeepWorkPlan Vim](/kit/vim) yang dipatok berdasarkan tag; jika nonaktif, Anda mendapat editor biasa. |
| `dailybot` | nonaktif | Dailybot CLI, untuk addon dailybot. |

Login, `gh`, konfigurasi Herdr, dan identitas git tetap bertahan setelah `bash dev.sh rebuild`.

## Agen lintas mesin

Sejak `v0.2.3`, `dck up` menyambungkan mesh dua arah tanpa langkah manual, di Docker Desktop:

- **Container dan host.** Agen di dalam container menjangkau agen Herdr di host, di setiap container dck lain, dan di container loopback lain yang sudah dikelola Herdr di host Anda — dan agen-agen itu dapat menjangkau balik. Setiap rekan membawa kunci host yang dipatok; tidak ada yang dipercaya pada penggunaan pertama.
- **Listener host opsional.** `dck setup` menawarkan, satu kali, server SSH tingkat pengguna di `127.0.0.1` yang hanya menerima kunci dck dan dijaga tetap berjalan oleh launchd (macOS). Jika Anda sudah menjalankan listener loopback, arahkan profil host ke listener tersebut. `dck host listener disable` menghapusnya.
- **Bertahan setelah rebuild.** Katalog mesin Herdr milik container berada di sebuah volume, sehingga `bash dev.sh rebuild` mempertahankan setiap mesin yang terdaftar di dalamnya.
- **Balasan dari host juga.** `dck setup` memasang [herdr-peers](/kit/herdr) yang terverifikasi di host, sehingga `dck agents` dan `dck ask` berfungsi di sana, dan agen host menjawab dengan `herdr-peers reply`.
- **Container yang tidak dibuat oleh kit.** Cantumkan kunci publik yang mereka gunakan untuk login di bawah `[ssh] authorized_extra` dalam profil host Anda, dan mereka juga dapat menjangkau container dck.

Padukan dengan [coding-agents-kit](/kit/agentkit) di host dan di container, dan `ak` yang sama menjalankan agen di kedua sisi.

## Default keamanan

- Setiap port yang dipublikasikan terikat ke `127.0.0.1` kecuali `dck.toml` menyetel `bind`.
- Git melalui SSH berjalan lewat SSH agent milik host — socket-nya, tidak pernah file kunci dan tidak pernah `~/.ssh` atau `~/.gitconfig` yang di-mount. Identitas git berasal dari nilai `DCK_GIT_*` yang diisi oleh `dck setup`.
- Kunci host SSH dibuat saat runtime ke dalam volume per proyek, tidak pernah ditanamkan ke dalam image; server hanya menerima kunci publik, tanpa login root dan tanpa kata sandi.
- Template tidak menambahkan `cap_add`, mode `privileged`, maupun socket Docker.
- Setiap unduhan dipatok berdasarkan versi dan diverifikasi dengan checksum; base image dipatok berdasarkan digest.
- Mesh Herdr yang memungkinkan agen di satu container menjangkau container lain aktif secara default dan didokumentasikan beserta cara menonaktifkannya dalam threat model kit. Listener host memungkinkan kode di container yang sedang berjalan membuka shell di host sebagai Anda: listener ini bersifat opt-in, hanya loopback, hanya menerima kunci dck, dan dihapus dengan `dck host listener disable`.

## Catatan

Opsional dan tidak pernah wajib. Sebuah repositori sepenuhnya konform tanpa addon opsional sama sekali. v0.2 mendukung host Linux dan macOS; mesh antar-container memerlukan Docker Desktop.
