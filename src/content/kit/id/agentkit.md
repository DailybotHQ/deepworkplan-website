---
title: Agentkit
description: "Addon v7 opsional berbasis coding-agents-kit: satu perintah ak untuk setiap coding agent terminal, serta delegasi headless untuk tugas rencana yang terbatas."
kind: addon
lang: id
order: 8
---

# Addon Agentkit

Setiap coding agent terminal memiliki flag sendiri untuk melanjutkan sesi, caranya sendiri untuk memisahkan akun kedua, mode headless-nya sendiri, dan sakelarnya sendiri untuk melewati prompt izin. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** menyatukan semuanya di bawah satu permukaan perintah: `ak <kind> [@profile]`.

Addon ini mengintegrasikan kit tersebut ke dalam **DWP v7** (`v7.0.0`) sebagai transport delegasi **headless**. Addon ini opsional: tanpanya, setiap tugas berjalan di sesi saat ini, persis seperti sebelumnya. Kit itu sendiri adalah produk MIT yang bekerja tanpa Deep Work Plan.

## Yang diberikan kit ini

- **Satu tata bahasa untuk setiap CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, dan `ak grok`, ditambah varian penyedia (GLM, Azure, xAI), dengan flag sesi yang sama: `-c` melanjutkan, `-r <id>` memulihkan.
- **Profil.** `ak claude @work` menjalankan akun kedua di home-nya sendiri, terpisah dari akun pertama.
- **Eksekusi headless.** `ak run <kind> -- "<prompt>"` menjalankan satu prompt secara non-interaktif dan mengembalikan kode keluar yang terdokumentasi, opsional sebagai satu objek JSON.
- **Doctor.** `ak doctor --json` melaporkan CLI mana yang terinstal, profil-profilnya, dan nama kunci yang telah disetel — tidak pernah nilainya.
- **Instalasi.** `ak install <cli>` menginstal CLI yang belum ada dari kanal resmi vendornya.

## Instalasi

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Persyaratan: `bash` di macOS atau Linux, dan `python3` 3.9 atau lebih baru; tidak ada yang lain. Windows menggunakan `install.ps1`. Patok `v0.1.1`: versi ini menggantikan `v0.1.0` dan membawa perbaikan keamanan. Verifikasi rilis dengan aset `SHA256SUMS`-nya.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, antarmuka 1 |
| Kunci registri | `agentkit` di `.dwp/config.json` |
| Transport | headless: satu `ak run` per agen delegasi di dalam worktree git khusus |
| Menyediakan | `subagents`, `cancel_children`, `model_routing` |
| Membutuhkan | izin `agent_delegation` dari kontrak rencana |

## Izin diteruskan apa adanya

`ak <kind>` **tidak** menambahkan flag untuk melewati izin. Otonomi adalah opt-in eksplisit: `--auto` pada satu perintah, atau `AGENTKIT_PERMISSIONS=auto` di environment, menambahkan flag otonomi milik CLI itu sendiri untuk peluncuran tersebut. Preset alias `classic`, yang membuat ulang pintasan seperti `claudex`, dikirim dalam keadaan nonaktif.

Addon ini tidak pernah menambahkan flag otonomi atas inisiatifnya sendiri. Sebuah rencana menggunakan `--auto` hanya atas opt-in pengembang yang eksplisit dan tercatat, dan hanya di dalam worktree atau container yang terisolasi.

## Yang ditambahkan ke rencana

Pada rencana v7 yang kontraknya memberikan izin `agent_delegation`, `execute` dapat menyerahkan tugas `parallel_safe` ke CLI lain: ia membuat worktree git khusus, menjalankan `ak run` di sana dengan batas waktu, dan mengumpulkan hasilnya ke `analysis_results/delegations/` milik rencana. Hasilnya adalah bukti `asserted` sampai penjalan gerbang (gate runner) milik rencana itu sendiri mengamatinya. Membatalkan sebuah agen delegasi menghentikan seluruh pohon prosesnya.

## Agentkit atau Herdr

| Situasi | Gunakan |
|---|---|
| Tugas `parallel_safe` yang terbatas dengan keluaran yang dideklarasikan | Agentkit (headless) |
| Tugas memerlukan interaksi, berjalan lama, atau berada di mesin lain | [Herdr](/kit/herdr) (rekan di panel) |

Keduanya dapat dipadukan: herdr-peers dapat meluncurkan rekan di sebuah panel dengan environment yang dicetak oleh `ak env <kind> @profile`.

## Catatan

Opsional dan tidak pernah wajib. Nilai kunci API tidak pernah dicetak, dicatat di log, atau ditulis ke file konfigurasi; pengecualian yang terdokumentasi adalah Cline, yang menerima kuncinya melalui baris perintah. Ekstraksi hasil untuk OpenCode, Pi, Cline, dan Grok dibangun dari dokumentasi vendor dan belum diuji terhadap akun nyata; keluaran yang tidak dikenali akan kembali ke teks mentah.
