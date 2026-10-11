---
title: Agentkit
description: "Satu perintah untuk setiap agen coding terminal: satu akun per profil, ak pick untuk akun dengan ruang terbanyak, otonomi dengan opt-out, dan eksekusi headless."
kind: addon
lang: id
order: 8
---

# Addon Agentkit

Setiap coding agent terminal memiliki flag sendiri untuk melanjutkan sesi, caranya sendiri untuk memisahkan akun kedua, mode headless-nya sendiri, dan sakelarnya sendiri untuk melewati prompt izin. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** menyatukan semuanya di bawah satu permukaan perintah: `ak <kind> [@profile]`.

Addon ini mengintegrasikan kit tersebut ke dalam **DWP v7** (paket `v7.5.1`) sebagai transport delegasi **headless**. Addon ini opsional: tanpanya, setiap tugas berjalan di sesi saat ini, persis seperti sebelumnya. Kit itu sendiri adalah produk MIT yang bekerja tanpa Deep Work Plan.

## Yang diberikan kit ini

- **Satu tata bahasa untuk setiap CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, dan `ak grok`, ditambah varian penyedia (GLM, Azure, xAI), dengan flag sesi yang sama: `-c` melanjutkan, `-r <id>` memulihkan.
- **Profil.** `ak claude @work` menjalankan akun kedua di home-nya sendiri, terpisah dari akun pertama.
- **Eksekusi headless.** `ak run <kind> -- "<prompt>"` menjalankan satu prompt secara non-interaktif dan mengembalikan kode keluar yang terdokumentasi, opsional sebagai satu objek JSON.
- **Doctor.** `ak doctor --json` melaporkan CLI mana yang terinstal, profil-profilnya, dan nama kunci yang telah disetel — tidak pernah nilainya.
- **Instalasi terverifikasi.** `ak install <cli>` menginstal CLI yang belum ada dari kanal resmi vendornya pada versi yang dipatok, diperiksa terhadap sha256 yang dipatok atau integrity dari registri npm.
- **Nama yang familier.** Dua preset alias, nonaktif sampai Anda mengaktifkannya: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) dan `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), masing-masing berupa satu `ak <kind>`.

## Akun, kuota, dan memilih akun

Kit ini memperlakukan setiap login atau kunci yang Anda miliki sebagai sebuah **akun**: satu CLI × satu profil. `@default` (atau `@1`) adalah home milik CLI itu sendiri; `@2`, `@work`, atau `@client-x` adalah login terpisah, masing-masing di direktorinya sendiri di bawah akar profil, yang berjalan berdampingan. `ak profiles` menampilkan daftarnya beserta status login dan nama kuncinya; `ak profiles --json` memberikan daftar yang sama kepada tool (skema `profiles-v1`).

`ak usage` menampilkan kuota dan pemakaian setiap akun yang dapat dilihat kit, satu baris per akun dan profil: langsung untuk langganan Claude Code (jendela 5 jam, mingguan, dan per model), login Codex melalui ChatGPT, serta kunci paket coding Z.AI; Cursor, Grok, xAI, dan Azure OpenAI menampilkan `n/d` beserta alasannya. Perintah ini hanya membaca: tidak pernah memperbarui login, tidak pernah mencetak token, dan tidak pernah menulis ke dalam profil. `--json` memberikan daftar yang sama kepada tool (skema `usage-v1`). Endpoint pemakaian bersifat internal vendor dan tidak resmi.

`ak pick <kind>` membaca baris yang sama dan menyebut akun dengan ruang terbanyak. `--count N` mengembalikan hingga N akun, yang terbaik lebih dulu; `--exclude @<profile>` mengecualikan akun yang sedang sibuk; `--model` menghitung jendela mingguan satu model; `--need 5h:40` menolak memilih tanpa ruang sebesar itu. `--json` memberikan skema `pick-v1`.

```bash
ak usage                   # kuota setiap akun dan profil
ak pick claude --count 3   # tiga akun Claude dengan ruang terbanyak
ak claude @work --trust-cwd  # akun kedua, folder sudah dipercaya
ak profiles --json         # profiles-v1, untuk tool
ak setup verify            # pemeriksaan berurutan, masing-masing dengan perintah perbaikannya
```

`--trust-cwd` (atau `AGENTKIT_TRUST_CWD=1`) mempercayai sejak awal folder tempat agen dimulai, sehingga Claude Code dan Codex terbuka tanpa layar kepercayaan folder. `ak setup probe | verify | docker` adalah helper hanya-baca, dipandu oleh skill `agentkit-setup`, yang memeriksa mesin, memverifikasi instalasi, dan menghasilkan resep container yang dipatok ke tag dan terverifikasi.

## Beberapa agen, beberapa akun

Skill `agentkit-orchestrate` (`ak --skill orchestrate`) mengajarkan agen untuk menyebarkan pekerjaan ke beberapa agen, akun, dan vendor: satu `ak usage` sebelum batch, `ak pick --count N` untuk memilih akun, satu agen delegasi per akun, gate milik repositori itu sendiri pada setiap hasil, dan failover ke akun berikutnya ketika satu akun mencapai batas. Kit ini mengamati, menghitung, dan menjalankan; ia tidak pernah menjadwalkan. Lead — Anda, atau agen yang Anda minta — yang memutuskan, hanya menggunakan akun Anda sendiri dan dalam batas ketentuan setiap vendor.

Untuk lane interaktif yang panjang, setiap lane berjalan di panel [Herdr](/kit/herdr) pada akunnya sendiri. Bab metodologi [Menjalankan banyak agent](/methodology/06-orchestration) menjelaskan model lengkapnya: lead dan lane-nya, akun yang dipilih berdasarkan sisa kuota, koordinasi herdr-peers, serta satu branch dan satu rilis per repositori.

## Instalasi

```bash
git clone --branch v0.4.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Persyaratan: `bash` di macOS atau Linux, dan `python3` 3.9 atau lebih baru; tidak ada yang lain. Windows menggunakan `install.ps1`. Patok `v0.4.0`: `v0.2.0` dan `v0.2.1` tidak didukung. Verifikasi rilis dengan aset `SHA256SUMS`-nya.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/coding-agents-kit`, tag `v0.4.0`, antarmuka 1 |
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

Keduanya dapat dipadukan: herdr-peers dapat meluncurkan rekan di sebuah panel dengan environment yang dicetak oleh `ak env <kind> @profile`. Untuk banyak lane sekaligus, lihat [Menjalankan banyak agent](/methodology/06-orchestration).

## Catatan

Opsional dan tidak pernah wajib. Nilai kunci API tidak pernah dicetak, dicatat di log, atau ditulis ke file konfigurasi; pengecualian yang terdokumentasi adalah Cline, yang menerima kuncinya melalui baris perintah. Ekstraksi hasil untuk OpenCode, Pi, Cline, dan Grok dibangun dari dokumentasi vendor dan belum diuji terhadap akun nyata; keluaran yang tidak dikenali akan kembali ke teks mentah.
