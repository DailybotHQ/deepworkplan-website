---
title: Devcontainer
description: "Dev container yang dapat direproduksi per repositori dari satu templat: agen pada akun host lewat ak, Herdr terhubung dua arah, kunci SSH hanya jika opt-in."
kind: addon
lang: id
order: 1
---

# Addon Devcontainer

Berikan repositori sebuah dev container yang reproducible dan terisolasi — yang dapat digunakan oleh orang, editor, dan coding agent. Dalam **DWP v7** (paket `v7.7.1`), addon ini mengintegrasikan **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, produk MIT yang bekerja tanpa Deep Work Plan. Addon ini opsional: sebuah repositori sepenuhnya konform tanpanya.

## Yang disediakan devcontainer-kit

- **Sebuah template**, dibangun di atas spesifikasi [Dev Containers](https://containers.dev), yang dirender oleh `dck init` ke dalam repositori dengan satu tata letak tetap: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml`, dan `dev.sh`. Jika dijalankan lagi nanti, ia melakukan rekonsiliasi dan tidak pernah menimpa suntingan Anda; setiap perubahan pada file yang sudah ada ditampilkan terlebih dahulu dan memerlukan persetujuan.
- **Container milik repositori itu sendiri.** Dockerfile dimulai dari image resmi runtime yang dipatok berdasarkan digest — `node-24`, `python-3.13`, atau `debian` — dan menyalin langkah build kit ke dalam `docker/local/<service>/dck/`. Tidak ada base image bersama yang terlibat.
- **`dev.sh` dan `dck`.** `bash dev.sh up` mem-build, menjalankan, dan menyambungkan ke container dari terminal biasa; `shell`, `rebuild`, `doctor`, dan lainnya bekerja dengan atau tanpa VS Code atau Cursor.
- **Herdr dua arah.** [Herdr](https://herdr.dev) di host menyambungkan setiap container sebagai mesin melalui server SSH yang hanya mendengarkan di loopback, dan container terbuka dengan sidebar standar: App, Editor, Development, dan Agents. Setiap workspace dan panel, termasuk yang dibuka kemudian, dimulai di path aplikasi (`/app` secara default). Di dalamnya, [herdr-peers](/kit/herdr) memungkinkan agen bertanya kepada agen di host dan di container lain.
- **Skill `dck-dockerfile`.** Sebuah agen membuat atau meregenerasi container sebuah repositori atas permintaan dan membuktikannya dengan build sungguhan.

## Instalasi

```bash
git clone --branch v0.3.7 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Persyaratan: `bash` 3.2 atau lebih baru dan `python3` 3.11 atau lebih baru di host Linux atau macOS, serta Docker dengan Compose v2 untuk perintah container. Verifikasi rilis dengan aset `SHA256SUMS`-nya. Patok `v0.3.7`: `v0.2.0` tidak didukung.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/devcontainer-kit`, tag `v0.3.7`, antarmuka 2 |
| Kunci registri | `devcontainer` di `.dwp/config.json` |
| Konfigurasi per repositori | `.devcontainer/dck.toml` |
| Deteksi | `dck doctor --json` |

## Lapisan

Setiap container membawa alat pengembangan — git, gh, ripgrep, server SSH, Herdr, dan herdr-peers — dan tidak membawa secret kecuali Anda memilih [akun host](#akun-host-di-dalam-container). Sisanya adalah lapisan yang Anda pilih di `dck.toml`:

| Lapisan | Default | Yang ditambahkan |
|---|---|---|
| `agents` | nonaktif | [coding-agents-kit](/kit/agentkit) dari rilisnya yang terverifikasi dan CLI yang Anda daftarkan, masing-masing dengan volume persisten sendiri, ditambah preset `classic` (`claudex`, `codexx`, …) dan `providers` (`claude-glm`, `codex-azure`, …). Agen berjalan dalam mode otonom secara default — container itulah sandbox-nya. Opt-out: `AGENTKIT_PERMISSIONS=ask` di `.env` milik service. |
| `editor` | aktif | Neovim dengan [DeepWorkPlan Vim](/kit/vim) yang dipatok berdasarkan tag; jika nonaktif, Anda mendapat editor biasa. |
| `dailybot` | nonaktif | Dailybot CLI, untuk addon dailybot. |

Login, `gh`, konfigurasi Herdr, dan identitas git tetap bertahan setelah `bash dev.sh rebuild`. Dengan lapisan `agents`, image juga membawa tiga skill coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), yang ditautkan ke direktori skill setiap agen pada setiap start, sehingga container yang dibuat ulang tetap memilikinya.

Volume state (kunci host SSH, `~/.ssh`, login `gh`, state klien Herdr, riwayat) bernama `state`. Jika beberapa service berbagi satu proyek compose, beri masing-masing nama sendiri dengan `[compose] state_volume` di `dck.toml` (atau `dck init --state-volume NAME`); jika tidak, semuanya me-mount volume yang sama, dan `dck doctor` memberitahukannya.

## Agen lintas mesin

Sejak `v0.2.3`, `dck up` menyambungkan mesh dua arah tanpa langkah manual, di Docker Desktop:

- **Container dan host.** Agen di dalam container menjangkau agen Herdr di host, di setiap container dck lain, dan di container loopback lain yang sudah dikelola Herdr di host Anda — dan agen-agen itu dapat menjangkau balik. Setiap rekan membawa kunci host yang dipatok; tidak ada yang dipercaya pada penggunaan pertama.
- **Listener host opsional.** `dck setup` menawarkan, satu kali, server SSH tingkat pengguna di `127.0.0.1` yang hanya menerima kunci dck dan dijaga tetap berjalan oleh launchd (macOS). Jika Anda sudah menjalankan listener loopback, arahkan profil host ke listener tersebut. `dck host listener disable` menghapusnya.
- **Bertahan setelah rebuild.** Katalog mesin Herdr milik container berada di sebuah volume, sehingga `bash dev.sh rebuild` mempertahankan setiap mesin yang terdaftar di dalamnya. Sejak `v0.3.2`, `rebuild`, `start`, dan `restart` menjalankan langkah yang sama dengan `up`: container didaftarkan lagi ke Herdr milik host, kunci host-nya dipatok ulang, dan mesh-nya didorong, sehingga container yang dibangun dari nol langsung menjangkau host dan peer-nya.
- **Panel Codex di dalam container.** Agen Codex memerlukan `HERDR_PEERS_SELF`, yaitu ID mesin container sebagaimana tersimpan di host, untuk bertanya kepada peer di mesin lain. Sejak `v0.3.3`, kit mencatat ID tersebut pada setiap registrasi dan login shell container mengekspornya, sehingga tidak ada agen yang perlu menyetelnya secara manual; `dck doctor` menandai ketidakcocokan. Sejak `v0.3.4`, konfigurasi Codex milik container sendiri melewati pemeriksaan pembaruan saat startup Codex dan daemon latar belakangnya (kit mem-pin setiap versi CLI), tanpa pernah menyentuh home Codex di host Anda atau profil bersama.
- **Balasan dari host juga.** `dck setup` memasang [herdr-peers](/kit/herdr) yang terverifikasi di host, sehingga `dck agents` dan `dck ask` berfungsi di sana, dan agen host menjawab dengan `herdr-peers reply`.
- **Container yang tidak dibuat oleh kit.** Cantumkan kunci publik yang mereka gunakan untuk login di bawah `[ssh] authorized_extra` dalam profil host Anda, dan mereka juga dapat menjangkau container dck.

Padukan dengan [coding-agents-kit](/kit/agentkit) di host dan di container, dan `ak` yang sama menjalankan agen di kedua sisi.

## Akun host di dalam container

Sebuah container dapat menggunakan akun yang sudah Anda miliki di host, seperti git yang sudah bekerja melalui SSH agent milik host, tanpa login di dalamnya. Fitur ini bersifat opt-in dan berada di **profil host** Anda, tidak pernah di `dck.toml` milik repositori:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

Dengan `host_profiles` aktif, `dck up` hanya membagikan profil dari CLI yang diinstal oleh repositori:

- **Claude Code** melalui token berumur panjang per profil: `CLAUDE_CODE_OAUTH_TOKEN` untuk `@default` dan `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` untuk `@name` (sufiks dalam huruf kapital, dengan setiap karakter di luar `A-Z`, `0-9`, dan `_` diubah menjadi `_`).
- **Codex** melalui file auth-nya, untuk `@default` dan untuk setiap profil.
- **File env milik kit**, hanya-baca dan dibatasi pada nama-nama di `host_env_keys`.

Seluruh home agentkit tidak pernah di-mount, dan profil yang menyimpan path absolut host akan dilewati. Login Codex yang dibagikan dalam mode baca-tulis dapat diperbarui oleh dua penulis sekaligus: pertahankan satu agen aktif per akun Codex. `[agents] default_profile` di profil host (misalnya `{ claude = "@work3" }`) membuat `ak claude` tanpa argumen di dalam container menggunakan akun bersama tersebut (coding-agents-kit ≥ `v0.5.2`); login Claude `@default` di macOS tersimpan di Keychain dan tidak dapat dibagikan. Sejak `v0.3.4`, shell container juga mengarahkan `claude` atau `codex` tanpa argumen ke akun tersebut, sehingga panel yang dipulihkan Herdr terbuka pada akun itu, bukan pada layar login. Di dalam container, `ak <kind> @<profile>` yang sama berjalan pada akun yang sama seperti di host, dan inilah yang memungkinkan lead memberikan kepada lane di container akun-akun yang dipilih `ak pick` — lihat [Menjalankan banyak agent](/methodology/06-orchestration).

## Beberapa repositori, satu stack compose

Sejak `v0.3.3`, repositori yang service-nya merupakan bagian dari proyek compose yang lebih besar (API, aplikasi web, worker, dan database yang berbagi satu proyek) dapat bergabung ke proyek tersebut tanpa mengedit secara manual apa yang di-render oleh dck. Semuanya bersifat aditif: repositori yang tidak menyetel satu pun kunci ini di-render persis seperti sebelumnya.

- **Satu proyek, satu volume state per service.** `[compose] project` menamai proyek bersama di setiap repositori; `state_volume`, `[compose] networks`, dan `[compose] volumes` menjaga state setiap service serta volume data dan network milik stack tetap terpisah.
- **Blok pengguna.** Baris di antara `# >>> user:<service> >>>` dan `# <<< user:<service> <<<` di dalam service dck dipertahankan apa adanya: kunci biasa untuk hal yang tidak di-render dck (`depends_on`, `healthcheck`), dan `x-dck-merge:` untuk kunci yang di-render-nya. File yang hanya memiliki sebagian penanda dck ditolak beserta cara memperbaikinya, alih-alih ditulis ulang.
- **String port.** `ssh_port` dan `ports` menerima ekspresi compose seperti `"${API_PORT:-8000}:8000"`; keduanya tetap di `127.0.0.1` kecuali string tersebut menyebutkan IP host.
- **Build bersama dan launcher Anda sendiri.** `[build] context` dan `[build] dockerfile` mencakup Dockerfile yang dipakai bersama oleh beberapa service; `dev_sh = false` mempertahankan `dev.sh` milik repositori itu sendiri.
- **Satelit workspace.** Sejak `v0.3.5`, instance kedua dari service di proyek compose-nya sendiri dijalankan dan dihentikan melalui dck (`dck --project P --compose-file F --service S up` atau `down`), sehingga mendapatkan host key, akun, identitas git, dan mesin Herdr yang sama dengan instance utama; `up --seed-state-from VOLUME` hanya menyalin login ke volume state-nya yang masih kosong. Dalam file overlay, `extends` harus menyebutkan file yang diperluasnya.
- **Node untuk agen.** Node milik agen berada di `/opt/dck/node` dan tidak pernah menggantikan Node milik image; `[agents] node_first = true` menempatkannya di urutan pertama PATH ketika tooling repositori membutuhkannya.

## Kunci SSH host di dalam container

Beberapa tool hanya membaca file kunci dan mengabaikan agent yang diteruskan: `gh auth login`, misalnya, menawarkan untuk membuat kunci baru. Sejak `v0.3.2` Anda dapat memilih opt-in, hanya di **profil host** Anda (`dck.toml` milik repositori tidak dapat menyetelnya; `dck setup` bertanya sekali, default tidak):

```toml
[ssh]
copy_keys = true              # default false
```

Selama aktif, `dck up` me-mount `~/.ssh` milik host secara read-only di `~/.ssh_host`, dan setiap start menyalin kunci `id_*`-nya ke `~/.ssh` milik container (kunci privat `0600`), tetap selaras dengan host. Penerusan agent tidak berubah, dan mematikannya menghapus salinan tersebut pada start berikutnya. Konsekuensinya: seluruh `~/.ssh` milik host dapat dibaca di dalam container, dan kunci privat tersimpan di volume state.

## Default keamanan

- Setiap port yang dipublikasikan terikat ke `127.0.0.1` kecuali `dck.toml` menyetel `bind`.
- Git melalui SSH berjalan lewat SSH agent milik host — socket-nya, tidak pernah file kunci dan tidak pernah `~/.ssh` atau `~/.gitconfig` yang di-mount, kecuali Anda menyalakan [`copy_keys`](#kunci-ssh-host-di-dalam-container) di profil host Anda. Identitas git berasal dari nilai `DCK_GIT_*` yang diisi oleh `dck setup`.
- Kunci host SSH dibuat saat runtime ke dalam volume per proyek, tidak pernah ditanamkan ke dalam image; server hanya menerima kunci publik, tanpa login root dan tanpa kata sandi.
- Template tidak menambahkan `cap_add`, mode `privileged`, maupun socket Docker.
- Setiap unduhan dipatok berdasarkan versi dan diverifikasi dengan checksum; base image dipatok berdasarkan digest.
- Mesh Herdr yang memungkinkan agen di satu container menjangkau container lain aktif secara default dan didokumentasikan beserta cara menonaktifkannya dalam threat model kit. Listener host memungkinkan kode di container yang sedang berjalan membuka shell di host sebagai Anda: listener ini bersifat opt-in, hanya loopback, hanya menerima kunci dck, dan dihapus dengan `dck host listener disable`.

## Catatan

Opsional dan tidak pernah wajib. Sebuah repositori sepenuhnya konform tanpa addon opsional sama sekali. v0.2 mendukung host Linux dan macOS; mesh antar-container memerlukan Docker Desktop.
