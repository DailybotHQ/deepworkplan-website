---
title: Agentkit
description: "Satu perintah untuk setiap agen coding terminal: satu akun per profil, ak pick untuk akun dengan ruang terbanyak, otonomi dengan opt-out, dan eksekusi headless."
kind: addon
lang: id
order: 8
---

# Addon Agentkit

Setiap coding agent terminal memiliki flag sendiri untuk melanjutkan sesi, caranya sendiri untuk memisahkan akun kedua, mode headless-nya sendiri, dan sakelarnya sendiri untuk melewati prompt izin. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** menyatukan semuanya di bawah satu permukaan perintah: `ak <kind> [@profile]`.

Addon ini mengintegrasikan kit tersebut ke dalam **DWP v7** (paket `v7.8.1`) sebagai transport delegasi **headless**. Addon ini opsional: tanpanya, setiap tugas berjalan di sesi saat ini, persis seperti sebelumnya. Kit itu sendiri adalah produk MIT yang bekerja tanpa Deep Work Plan.

## Yang diberikan kit ini

- **Satu tata bahasa untuk setiap CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok`, dan `ak antigravity`, ditambah rute penyedia (Z.AI GLM, Azure OpenAI, xAI, dan Gemini API), dengan flag sesi yang sama: `-c` melanjutkan, `-r <id>` memulihkan.
- **Profil.** `ak claude @work` menjalankan akun kedua di home-nya sendiri, terpisah dari akun pertama.
- **Eksekusi headless.** `ak run <kind> -- "<prompt>"` menjalankan satu prompt secara non-interaktif dan mengembalikan kode keluar yang terdokumentasi, opsional sebagai satu objek JSON.
- **Doctor.** `ak doctor --json` melaporkan CLI mana yang terinstal, profil-profilnya, dan nama kunci yang telah disetel — tidak pernah nilainya.
- **Instalasi terverifikasi.** `ak install <cli>` menginstal CLI yang belum ada dari kanal resmi vendornya pada versi yang dipatok, diperiksa terhadap sha256 yang dipatok atau integrity dari registri npm.
- **Nama yang familier.** Dua preset alias, nonaktif sampai Anda mengaktifkannya: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) dan `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), masing-masing berupa satu `ak <kind>`.

## Akun, kuota, dan memilih akun

Sejak `v1.0.1`, setiap profil — termasuk `@default` — adalah akun independen di direktorinya sendiri di bawah root profil, mencegah kebocoran status dan tabrakan kredensial. `ak profiles` menampilkan daftarnya beserta status login dan nama kuncinya; `ak profiles --json` memberikan daftar yang sama kepada tool (skema `profiles-v1`). Sejak `v0.5.1`, perintah ini melaporkan di mana token Claude Code sebenarnya berada — `file`, `keychain` (macOS), `none`, atau `unknown` — hanya berdasarkan keberadaannya, tanpa pernah membaca secret-nya, dan login Cursor di Linux, di dalam container atau di host Linux, kini dikenali. Sejak `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` menentukan akun yang dipakai oleh `ak <cli>` tanpa argumen (`@profile` posisional tetap diutamakan); dengan cara inilah dev container memilih akun host yang dibagikannya. Sejak `v0.5.3`, `ak codex` menambahkan `--no-daemon` ketika home Codex yang dibagikan dengan mesin lain mencatat daemon latar belakang yang tidak ada di mesin ini.

`ak usage` (juga `ak status`) mencantumkan setiap akun dari setiap CLI yang dikenal kit, satu baris per akun dan profil, di bawah CLI-nya: kuota langsung untuk langganan Claude Code (jendela 5 jam, mingguan, dan per model), login Codex melalui ChatGPT, kunci paket coding Z.AI, dan, sejak `v0.7.0`, login Google Antigravity di Linux dan di dalam container (jendela lima jam dan mingguan dari panel `/usage` milik agy sendiri). Akun yang kuotanya tidak dapat dibaca tetap memiliki barisnya: `n/d` beserta cara akun itu terhubung dan alasannya — Cursor, Grok, xAI, Azure OpenAI, kunci API Gemini, atau login Antigravity yang disimpan di Keychain macOS — atau `no login` beserta perintah untuk login, sehingga tabel juga menunjukkan akun mana dari setiap CLI yang sudah terhubung. Perintah ini hanya membaca: tidak pernah memperbarui login, tidak pernah mencetak token, dan tidak pernah menulis ke dalam profil. `--json` memberikan daftar yang sama kepada tool (skema `usage-v1`). Endpoint pemakaian bersifat internal vendor dan tidak resmi.

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

Untuk lane interaktif yang panjang, setiap lane berjalan di panel [Herdr](/kit/herdr) pada akunnya sendiri. Bab metodologi [Menjalankan banyak agent](/methodology/06-orchestration) menjelaskan model lengkapnya: lead dan lane-nya, akun yang dipilih berdasarkan sisa kuota, koordinasi herdr-peers, serta satu branch dan satu rilis per repositori; [Otonomi swarm](/id/methodology/07-swarm-autonomy) menambahkan pemeriksaan kapasitas, handoff, dan suksesi lead.

## Kapasitas dan lease

Mulai `v0.6.0`, sebuah agen dapat menanyakan berapa banyak ruang yang tersisa di akunnya sendiri, dengan murah, di setiap batas tugas — sinyal yang memungkinkan sebuah swarm menyerahkan pekerjaan sebelum sebuah akun habis ([Otonomi swarm](/id/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (skema `capacity-v1`) memberikan `headroom_pct` akun yang sedang berjalan, `binding_window`, `resets_at`, dan sebuah `verdict`: `ok`, `low` (25 % atau kurang), `critical` (10 % atau kurang, atau terkena rate limit), atau `unknown` (tanpa sumber kuota: Cursor, Grok, atau Antigravity di macOS). Perintah ini memakai aritmetika `ak pick`, sehingga keduanya tidak pernah berselisih, dan membaca cache penggunaan yang disimpan selama 300 detik (`--max-age`), sehingga pemeriksaan di setiap batas tugas tetap murah. `--self` menentukan akun yang diluncurkan `ak`; di luar peluncuran `ak`, ia keluar dengan kode 3 dan tidak pernah menebak. `ak usage` tetap membaca secara langsung dan menyegarkan cache.
- **Ambang batas dan latihan.** `AGENTKIT_CAPACITY_LOW` dan `AGENTKIT_CAPACITY_CRITICAL` (atau `--low` dan `--critical`) menggeser ambang batas. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` hanya dapat menurunkan sebuah pembacaan — begitulah sebuah latihan membuat akun tampak miskin — dan tidak pernah dapat membuat akun tampak lebih kaya.
- **`ak lease <kind> @<profile> --owner <addr>`** menahan sebuah akun untuk satu lane; `ak lease release …` membebaskannya setelah penerus menerima handoff, dan `ak lease ls` mencantumkan lease (skema `leases-v1`). Profil Codex hanya menerima satu lease — satu penulis per file auth — dan hanya pemiliknya yang dapat melepaskan sebuah lease. Lease kedaluwarsa dan merupakan catatan anjuran berisi angka, nama profil, dan alamat panel, tidak pernah kredensial.
- **`ak pick <kind> --owner <lead>`** menghitung setiap lease aktif, termasuk milik pemilik itu sendiri: ia memeringkat kandidat dengan `headroom / (1 + leases)` dan tidak pernah menawarkan akun Codex yang sedang di-lease, bahkan kepada pemegangnya. `--reuse @<profile>` meneruskan salah satu lease milik pemilik itu sendiri, misalnya kepada penerus sebuah lane. Tanpa `--owner`, peringkatnya tidak berubah.

```bash
ak capacity --self --json                        # ruang dan verdict milik agen ini sendiri
ak lease claude @work --owner local:w2:p1        # menahan akun untuk sebuah lane
ak pick codex --owner local:w1:p1 --count 2      # melewati akun yang di-lease ke pihak lain
```

Pekerjaan hanya berpindah di antara akun yang Anda deklarasikan untuk rencana, dalam batas ketentuan setiap vendor: tidak ada agen yang membuat akun, memperbarui login, atau memakai reset Codex. Pack Deep Work Plan membaca verdict melalui helper-nya sendiri dan mengubahnya menjadi lanjutkan, bersiap, atau serahkan; tanpa kit, atau dengan kit yang lebih lama, kapasitas dilaporkan sebagai tidak diketahui, tidak pernah sebagai ok.

## Instalasi

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Persyaratan: `bash` di macOS atau Linux, dan `python3` 3.9 atau lebih baru; tidak ada yang lain. Windows menggunakan `install.ps1`. Patok `v1.0.1`: `v0.2.0` dan `v0.2.1` tidak didukung. Verifikasi rilis dengan aset `SHA256SUMS`-nya.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/coding-agents-kit`, tag `v1.1.0`, antarmuka 1 |
| Kunci registri | `agentkit` di `.dwp/config.json` |
| Transport | headless: satu `ak run` per agen delegasi di dalam worktree git khusus |
| Menyediakan | `subagents`, `cancel_children`, `model_routing` |
| Membutuhkan | izin `agent_delegation` dari kontrak rencana |

**Stabil sejak `v1.0.0`.** Antarmuka publik kit ini mengikuti semantic versioning dan hanya berubah secara tidak kompatibel pada versi mayor baru: permukaan perintah (`ak <kind> [@profile]` untuk setiap kind di `providers.toml`, serta setiap verb beserta flag yang terdokumentasi), postur izin, antarmuka 1 (`ak doctor --json`, `ak env`, tata bahasa dan envelope `ak run`), skema JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, dan `setup-verify-v1`), serta tata letak instalasi dan nama variabel di berkas env. `v1.0.0` tidak mengubah perintah, flag, kunci, atau skema apa pun dari `v0.7.1`.

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
