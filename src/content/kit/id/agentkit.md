---
title: Agentkit
description: "Addon v7 opsional berbasis coding-agents-kit: satu perintah ak untuk setiap coding agent terminal, otonomi secara default dengan opt-out, dan delegasi headless."
kind: addon
lang: id
order: 8
---

# Addon Agentkit

Setiap coding agent terminal memiliki flag sendiri untuk melanjutkan sesi, caranya sendiri untuk memisahkan akun kedua, mode headless-nya sendiri, dan sakelarnya sendiri untuk melewati prompt izin. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** menyatukan semuanya di bawah satu permukaan perintah: `ak <kind> [@profile]`.

Addon ini mengintegrasikan kit tersebut ke dalam **DWP v7** (paket `v7.1.4`) sebagai transport delegasi **headless**. Addon ini opsional: tanpanya, setiap tugas berjalan di sesi saat ini, persis seperti sebelumnya. Kit itu sendiri adalah produk MIT yang bekerja tanpa Deep Work Plan.

## Yang diberikan kit ini

- **Satu tata bahasa untuk setiap CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, dan `ak grok`, ditambah varian penyedia (GLM, Azure, xAI), dengan flag sesi yang sama: `-c` melanjutkan, `-r <id>` memulihkan.
- **Profil.** `ak claude @work` menjalankan akun kedua di home-nya sendiri, terpisah dari akun pertama.
- **Eksekusi headless.** `ak run <kind> -- "<prompt>"` menjalankan satu prompt secara non-interaktif dan mengembalikan kode keluar yang terdokumentasi, opsional sebagai satu objek JSON.
- **Doctor.** `ak doctor --json` melaporkan CLI mana yang terinstal, profil-profilnya, dan nama kunci yang telah disetel — tidak pernah nilainya.
- **Instalasi terverifikasi.** `ak install <cli>` menginstal CLI yang belum ada dari kanal resmi vendornya pada versi yang dipatok, diperiksa terhadap sha256 yang dipatok atau integrity dari registri npm.
- **Nama yang familier.** Dua preset alias, nonaktif sampai Anda mengaktifkannya: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) dan `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), masing-masing berupa satu `ak <kind>`.

## Instalasi

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Persyaratan: `bash` di macOS atau Linux, dan `python3` 3.9 atau lebih baru; tidak ada yang lain. Windows menggunakan `install.ps1`. Patok `v0.3.0`: `v0.2.0` dan `v0.2.1` tidak didukung. Verifikasi rilis dengan aset `SHA256SUMS`-nya.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/coding-agents-kit`, tag `v0.3.0`, antarmuka 1 |
| Kunci registri | `agentkit` di `.dwp/config.json` |
| Transport | headless: satu `ak run` per agen delegasi di dalam worktree git khusus |
| Menyediakan | `subagents`, `cancel_children`, `model_routing` |
| Membutuhkan | izin `agent_delegation` dari kontrak rencana |

## Otonomi secara default, dengan opt-out yang selalu menang

Sejak `v0.2.0`, `ak <kind>` meluncurkan setiap agen dalam mode **otonom**: ia menambahkan flag otonomi milik CLI itu sendiri, yang hanya disimpan di `providers.toml` milik kit. Otonomi ditujukan untuk lingkungan sekali pakai atau ber-sandbox, seperti dev container.

**Opt-out selalu menang**: `--ask` pada satu perintah, atau `AGENTKIT_PERMISSIONS=ask` di environment atau di file env milik kit, menekan flag tersebut bahkan ketika perintah yang sama menyebut `--auto`. Sesi yang telah opt-out meneruskan opt-out tersebut ke agen yang dimulainya. Di host, setel opt-out.

Addon ini tidak menuliskan flag otonomi apa pun dan tidak pernah meneruskan `--auto`. Ia meneruskan `--ask` ketika sebuah rencana mencatat opt-out. Rencana yang memberikan izin `agent_delegation` di host menerima agen delegasi otonom yang dibatasi pada worktree-nya sendiri, yang bukan sebuah sandbox.

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
