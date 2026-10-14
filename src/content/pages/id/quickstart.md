---
title: "Mulai Cepat — Deep Work Plan"
description: "Prompt onboarding yang dapat dieksekusi untuk AI agent: adopsi Deep Work Plan di repositori mana pun — analisis, dokumentasikan, pasang skill, dan jadikan dapat dikemudikan agent."
lastUpdated: 2026-10-11
---

Anda adalah sebuah AI coding agent. Baca seluruh prompt ini terlebih dahulu, lalu jadikan repositori saat ini
**AI-first**, **spec-driven**, dan **dapat dikemudikan agent** dengan mengadopsi metodologi Deep Work Plan (DWP).
Perlakukan ini sebagai tugas teknik yang terstruktur — sebuah Deep Work Plan — bukan suntingan singkat.

## Prinsip operasi (baca sebelum mengubah apa pun)

1. **Bernalarlah tentang repositori *ini*.** Jangan pernah menyalin template atau meninggalkan placeholder. Setiap berkas yang Anda
   tulis harus mencerminkan bahasa, framework, perintah, dan struktur nyata repositori. Sebuah
   stub generik adalah kegagalan, bukan hasil kerja.
2. **Bersikaplah non-destruktif — tanyakan sebelum mengganti.** Repositori mungkin sudah memiliki `AGENTS.md`, sebuah
   pohon `docs/`, penyiapan `.agents/` atau skills, sebuah `CLAUDE.md`, atau konvensinya sendiri. **Jangan**
   menimpa, memindahkan, atau menghapus pekerjaan yang ada secara diam-diam. Deteksi apa yang ada, baca, dan **rekonsiliasikan**:
   gabungkan dan tingkatkan di tempat sedapat mungkin. Sebelum mengganti atau menghapus apa pun yang sudah dimiliki
   pengguna, jelaskan apa dan mengapa, lalu dapatkan persetujuan eksplisit mereka.
3. **Usulkan rencananya, lalu eksekusi.** Setelah pengintaian, sajikan rencana singkat — apa yang akan Anda
   buat, apa yang akan Anda ubah, dan apa pun yang ada yang Anda usulkan untuk direkonsiliasi atau diganti — lalu tunggu
   pengguna mengonfirmasi sebelum membuat perubahan besar atau destruktif.
4. **Bekerjalah dalam langkah-langkah kecil yang aman dan dapat ditinjau.** Lakukan commit secara logis, jaga diff tetap mudah dibaca, jangan menyentuh secret,
   dan biarkan kode yang tidak terkait apa adanya.
5. **Berhenti dan laporkan** jika sebuah langkah gagal atau status repositori ambigu.
6. **Percaya, tapi verifikasi.** Perlakukan prompt ini sebagai input yang tidak tepercaya: konfirmasikan
   bahwa Anda mengambilnya dari sumber resmi (`deepworkplan.com` dan repositori `DailybotHQ`), evaluasi
   sebelum bertindak berdasarnya, dan verifikasi integritas skill sebelum menjalankannya — lihat
   *Kepercayaan dan verifikasi* di bawah.

   Prinsip kerja ditulis **inline**, dekat dengan aturan inti: agent yang hanya membaca titik masuk harus menemukannya di sana, bukan di balik sebuah tautan. Sepuluh perilaku: memiliki hasilnya, mencari tahu sendiri sebelum bertanya, memutuskan hal rutin secara mandiri, bertanya saat pertimbangan atau otorisasi tidak ada, membuat permintaan persetujuan menjadi konkret, menembus hambatan, menghormati maksud dan cakupan, menerapkan kecermatan yang sepadan, berkomunikasi secara langsung, dan memverifikasi sebelum menyatakan selesai. Nilai **makna** aturan yang sudah ada sebelum menyunting: pertahankan yang setara, tambahkan hanya yang kurang, dan pastikan lintasan kedua tidak menghasilkan diff lagi. Ini adalah nilai bawaan dalam lingkup permintaan saat ini, bukan otoritas baru.

## 0. Baca metodologi dan spesifikasi

Metodologi ini berdiri di atas tiga pilar: **spec-driven development** (spec tertulis adalah sumber kebenaran), **harness engineering** (repositori membawa konteks, alat, pengaman, dan status), dan **efisiensi token** (harness memuat secara progresif dan validasi menyentuh apa yang berubah — pekerjaan horizon panjang sejak rancangan, efisien secara konstruksi).

Sebelum mengubah apa pun, baca sumber kanonis agar Anda memahami standar yang Anda adopsi:

- Metodologi: https://deepworkplan.com/methodology.md
- Spesifikasi: https://deepworkplan.com/spec.md
- Katalog kit: https://deepworkplan.com/kit.md

## 1. Pengintaian dan rencana untuk disetujui

Pahami dahulu repositori, lalu usulkan apa yang akan Anda lakukan.

- **Deteksi stack.** Bahasa, framework, package manager (dari lockfile yang benar-benar
  ada), perintah build/test/lint/type-check yang sebenarnya, modul sumber, konvensi test, dan
  bentuk deployment-nya.
- **Klasifikasikan arketipe.** Sebuah repositori individual (kasus umum), orchestrator hub, atau
  ruang kerja agent — rumah long-lived dari agent otonom, di mana git direkomendasikan bukan
  diasumsikan — dengan buktinya.
- **Kenali instalasi DWP yang sudah ada.** Jika `AGENTS.md` dan `.agents/` sudah ada, cari baris provenans
  `DWP standard:`. Harness yang mendahului standar saat ini mendapat **peningkatan tertarget**: memasang
  ulang skill adalah seluruh jalur peningkatannya, dan onboarding hanya merekonsiliasi bagian yang hilang
  atau usang — setiap bagian yang ditulis tangan, skill kustom, dan rencana yang sedang berjalan
  dipertahankan, dan eksekusi kedua tidak mengubah apa pun. Rencana yang ditulis di bawah versi sebelumnya
  mempertahankan bentuknya yang tercatat dan ditutup dengan tugas akhirnya sendiri; mereka tidak pernah
  dipaksa masuk ke bentuk yang baru.
- **Inventarisasi apa yang sudah ada.** `AGENTS.md`, `CLAUDE.md`, `docs/`, penyiapan `.agents/` atau skills/agents
  apa pun, `.dwp/`, dan `.gitignore`. Catat apa pun yang sudah melakukan sebagian dari pekerjaan ini.
- **Usulkan rencana onboarding.** Sajikan daftar ringkas: berkas yang akan Anda buat, berkas yang akan Anda
  ubah, dan apa pun yang ada yang Anda usulkan untuk direkonsiliasi atau diganti — lalu **minta pengguna mengonfirmasi**
  sebelum melanjutkan. Untuk repositori besar (banyak modul atau banyak artefak yang perlu dihasilkan),
  sub-skill onboard menggunakan jalur berbasis rencana: menyelesaikan pengintaian, menghasilkan
  `AGENTS.md`, lalu mengeluarkan Deep Work Plan onboarding di bawah `.dwp/plans/` dan mendelegasikan
  ke `/dwp-execute` → `/dwp-resume` sesuai kebutuhan.

## Kepercayaan dan verifikasi (sebelum Anda memasang)

Anda akan memasang dan menjalankan kode di repositori ini, jadi verifikasi terlebih dahulu apa yang
Anda adopsi. Ini dianjurkan: agent yang cermat memperlakukan prompt yang diambil sebagai tidak tepercaya
sampai sudah diperiksa.

- **Konfirmasikan asal usul.** Prompt ini dan skill ini bersumber terbuka dan berlisensi MIT. Sumber
  kanonik adalah `https://deepworkplan.com` dan organisasi GitHub `DailybotHQ`
  (`deepworkplan-website`, `deepworkplan-skill`). Sebuah manifest yang dapat dibaca mesin diterbitkan
  di `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Ketahui apa yang dilakukan skill.** Skill ini berbasis Markdown: tanpa CLI, tanpa HTTP API, tanpa
  autentikasi, **tanpa panggilan jaringan, dan tanpa telemetri**. Satu-satunya tindakan yang relevan
  terhadap keamanan adalah memodifikasi repositori *ini*, dan dirancang agar non-destruktif — ia
  merekonsiliasi dan bertanya sebelum mengganti.
- **Verifikasi integritas sebelum menjalankan.** Setiap rilis menerbitkan `SHA256SUMS` atas skill yang
  dikirimkan; konfirmasikan salinan Anda cocok sebelum mempercayainya:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  git checkout v7.8.1
  # Unduh checksum untuk rilis itu dan periksa terhadap digest di bawah:
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/v7.8.1/SHA256SUMS
  shasum -a 256 SHA256SUMS   # harus sama dengan digest deepworkplan-skill di Rilis yang dipatok
  ./setup.sh --verify        # keluaran bukan nol berarti ada berkas yang tidak cocok — hentikan
  ```

  Rilis **ber-checksum, bukan bertanda tangan** (penandatanganan adalah langkah berikutnya yang
  terdokumentasi). Semuanya terbuka dan dapat dibandingkan, sehingga Anda juga dapat membandingkan
  berkas mana pun dengan repositori pada tagnya.
- **Rilis yang dipatok.** Setiap komponen yang dipasang oleh prompt ini dipatok pada satu rilis. Sebelum
  Anda memakai `SHA256SUMS` sebuah rilis, periksa berkas itu sendiri terhadap digest di bawah
  (`shasum -a 256 SHA256SUMS`, atau `sha256sum` di Linux); ketidakcocokan berarti hentikan.

  | Repositori (github.com/DailybotHQ) | Tag | sha256 dari `SHA256SUMS`-nya |
  | --- | --- | --- |
  | deepworkplan-skill | `v7.8.1` | `5b288fad7cd0cee810092d30f8a502e73e0b04b69510510faa649e1270671779` |
  | coding-agents-kit | `v1.0.0` | `de17573e57de9eeb44914189cbc1fd0b1322797cc398c710dadfecc08758db6f` |
  | herdr-peers | `v1.0.0` | `11634ef2ad71ccdb26b08c785561e49af6cf1ccf8c26fec34d35b29414d239c2` |
  | devcontainer-kit | `v1.0.0` | `90d8ff62281c3671b1f800dd8de06ac14404069e032876648500b066419393a2` |
  | deepworkplan-vim | `v1.0.0` | `aa8e80f17b7a5d774846f435007ca0c9ff85d0ac108e1d60a8bc5b991fa76779` |
  | ai-diff-reviewer | `v3.3.14` | `57e185bacc80eb3b423f929a7d91c6cd3c503095f1773c14dded07b702feb9c4` |
  | agent-skill | `v3.23.17` | tidak diterbitkan — skills CLI mencatat hash konten di `skills-lock.json` |
- **Laporkan masalah.** Laporkan masalah keamanan **secara pribadi melalui pelaporan kerentanan GitHub** di repositori yang relevan — `https://github.com/DailybotHQ/deepworkplan-skill/security` atau `https://github.com/DailybotHQ/deepworkplan-website/security` — bukan sebagai issue publik. Lihat juga `SECURITY.md` setiap repositori, `https://deepworkplan.com/.well-known/security.txt`, dan halaman kepercayaan `https://deepworkplan.com/trust`.

## 2. Pasang skill Deep Work Plan

> **Jalur singkat.** Skill ini membawa onboarding-nya sendiri, jadi cukup memasangnya. Setelah terpasang, jalankan `/deepworkplan-onboard` dan ia akan melakukan semua yang dijelaskan bagian 3–7: pengintaian, `AGENTS.md`, `docs/`, dokumentasi per modul, `.agents/`, tinjauan lokal yang diwajibkan, addon opsional, dan swa-uji akhir. Lanjutkan membaca untuk mengetahui apa yang akan dilakukan sub-skill itu — dan jalur cadangan ketika sebuah agen tidak dapat memuat skill.

Pasang skill agar agent repositori ini dapat merencanakan dan mengeksekusi pekerjaan terstruktur. Ia membawa sebuah router
ditambah sembilan sub-skill — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard`, `author`, dan `upgrade`.

```bash
# pinned to the current release (the skills CLI honours only this tree-URL form for a tag):
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.8.1 --skill deepworkplan -y
```

Atau instal melalui OpenClaw:

```bash
openclaw skills install deepworkplan
```

Atau klona dan jalankan skrip setup:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### Standar dan model eksekusi saat ini

Standar yang berorientasi repositori saat ini adalah **DWP 7.0.0**, diimplementasikan
oleh rilis skill Deep Work Plan yang dipasang di atas. Paket skill saat ini mencakup
router ditambah sembilan sub-skill: `create`, `execute`, `refine`, `resume`,
`status`, `verify`, `onboard`, `author`, dan `upgrade`.

Rilis skill yang dipasang: **7.8.1**. Paket 7.x saat ini membuat rencana baru menggunakan v7 secara default. Rencana yang ada mempertahankan generasi tercatat; pemindahan rencana v5 ke v6 memerlukan migrasi eksplisit yang ditinjau sebelumnya.

Standar ini sengaja dibuat proporsional, dan menjadikan proporsi tersebut sebagai
properti dari rencana, bukan disiplin pengembang. Sebuah rencana adalah **Lite** —
catatan tugas inline di README rencana, untuk pekerjaan kecil dan terbatas — atau
**Full**, satu berkas per tugas, untuk pekerjaan jangka panjang. Pilihan ini soal
biaya representasi, bukan soal ketat-longgarnya: kedua format sama-sama membawa id
tugas yang stabil, sebuah Permukaan tersentuh, kriteria penerimaan, gate validasi, dan
bukti penyelesaian, sehingga rencana Lite adalah rencana sungguhan, bukan sketsa.
Format, materialisasi, persetujuan, dan eksekusi adalah sumbu yang independen;
rencana Lite dipromosikan ke Full dengan `/dwp-refine promote` ketika catatan
ringkas tidak lagi cukup untuk membawa sebuah persyaratan atau gate.

Untuk rencana Full, repositori adalah permukaan eksekusi yang bertahan lama. Rencana
berisi tugas-tugas atomik, sebuah **Permukaan tersentuh** yang menjelaskan apa yang
berubah dan konsumen mana yang terdampak, kriteria penerimaan, dan gate validasi
yang dipilih dari peta pengujian repositori yang terdokumentasi. Rencana baru menulis manifes identitasnya, lalu kontrak berversinya, lalu peristiwa persetujuannya. Jurnal yang hanya ditambah mencatat eksekusi; `state.json` adalah snapshot yang diturunkan dari jurnal tersebut. Setiap langkah dapat dipulihkan setelah gangguan.

Generasi skema tetap terkait dengan setiap rencana. Paket 7.x saat ini membuat
rencana **v7** secara default: `manifest.json` mengikuti
https://deepworkplan.com/schema/plan-manifest/v7.json,
[kontrak](https://deepworkplan.com/schema/plan-contract/v7.json) menambahkan penanda
tugas `parallel_safe` opsional ke kontrak v6, dan setiap
[peristiwa jurnal](https://deepworkplan.com/schema/journal-event/v7.json) juga dapat
mencatat sebuah `delegation`. Proyeksi aktif tetap memakai snapshot yang tidak berubah di
https://deepworkplan.com/schema/plan-snapshot/v6.json, dan
[manifes konteks tugas](https://deepworkplan.com/schema/context-manifest/v6.json)
digunakan bersama dengan v6. Permintaan `v6` yang eksplisit tetap menghasilkan rencana v6.
Sebuah rencana tidak pernah berganti generasi: rencana v6 mempertahankan skema v6-nya
([manifes](https://deepworkplan.com/schema/plan-manifest/v6.json),
[kontrak](https://deepworkplan.com/schema/plan-contract/v6.json),
[peristiwa jurnal](https://deepworkplan.com/schema/journal-event/v6.json)) dan
berjalan tanpa perubahan; rencana v5 mempertahankan `state.json` dengan skema
https://deepworkplan.com/schema/plan-state/v5.json; rencana v1, v2, dan v5 yang ada
tidak pernah ditulis ulang atau dimigrasikan secara implisit, dan pemindahan rencana
v5 ke v6 memerlukan migrasi eksplisit yang ditinjau sebelumnya.

Addon opsional dicatat per repositori di registri addon yang dilacak,
`.dwp/config.json` (https://deepworkplan.com/schema/dwp-config/v1.json): jika tidak
ada, artinya tidak diaktifkan, dan metodologi tetap berfungsi dengan semua addon
dinonaktifkan. Rencana v7 boleh menyerahkan tugas `parallel_safe` ke agen pengodean
lain hanya jika kontraknya memberikan `agent_delegation` dan addon delegasi (agentkit
atau Herdr) diaktifkan serta terdeteksi; hasil dari delegasi tetap berupa klaim
sampai runner gate milik rencana itu sendiri mengamatinya.

Setiap rencana memiliki satu tugas penutup wajib: **Final Review**. Ia menjalankan
pemeriksaan keamanan atas seluruh kumpulan perubahan yang terakumulasi, termasuk
review lokal AI Diff Reviewer yang wajib, memvalidasi status akhir repositori,
merekonsiliasi skill yang digunakan oleh tugas-tugas, dan mencatat bukti serta
keterbatasan. Skill review lokal dipasang pada rilis yang dipatok; perintah yang
saat ini didokumentasikan memasang `https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.14`. GitHub
Action adalah permukaan CI terpisah yang opsional, dan tidak pernah wajib untuk
metodologi inti.

Tinjauan yang berjalan dan tidak melaporkan apa pun tidak sama dengan tinjauan yang sama sekali tidak menghasilkan temuan. Kasus kedua adalah **tinjauan yang tidak lengkap**: ia dicatat sebagaimana adanya, tidak pernah dihitung sebagai bukti bahwa himpunan perubahan itu bersih, dan tidak pernah menjadi alasan untuk menutup Final Review — perlakuan merah yang sama dengan yang diterima tinjauan `timeout` di bawah ketatan yang memblokir (BC-04). Bersama peninjau yang hilang dan pemanggilan yang gagal, itu tiga keadaan berbeda — dan tak satu pun berarti diff telah ditinjau dan ternyata bersih. Isi yang menyatakan `Recommendation: approve` juga bukan bukti bahwa pemeriksaan lulus. Baca dulu blok Highest severity / Strictness gate / Check status pada penanda pelacakan — runtime menulis ulang `approve` dari model ketika gerbang sedang gagal.

Eksekusi tanpa pengawasan hanya didukung untuk rencana yang telah disetujui
sebelumnya. Ini memerlukan lapisan status yang bisa dibaca mesin, standar DWP yang
dideklarasikan, otoritas yang terbatas, dan kondisi berhenti yang eksplisit. Jika
sebuah gate gagal di luar cakupan perbaikan yang direncanakan, repositori
menyimpang, atau diperlukan persetujuan atau kredensial baru, agen mencatat blocker
tersebut dan berhenti. Tidak ada alur yang melemahkan gate validasi untuk mengklaim
penyelesaian.

## 3. Onboard repositori (dengan penalaran dan non-destruktif)

Panggil sub-skill onboard (`/deepworkplan-onboard`). Bernalarlah tentang repo yang sebenarnya dan sesuaikan semuanya
dengannya. Untuk setiap artefak di bawah, **jika sudah ada, rekonsiliasikan** (gabungkan, tingkatkan, selaraskan dengan
metodologi) alih-alih menimpa — dan konfirmasikan dengan pengguna sebelum mengganti apa pun.

1. **`AGENTS.md` + `CLAUDE.md`.** Hasilkan sebuah `AGENTS.md` di akar — sebuah indeks, aturan-aturan wajib
   (hanya bahasa Inggris, conventional commit, pola test nyata repo dan review gate), dan blok Quick
   Commands dengan perintah repo yang **nyata dan dapat dijalankan**. Jika sebuah `AGENTS.md` sudah ada, gabungkan
   ke dalamnya alih-alih menggantinya. Buat symlink `CLAUDE.md → AGENTS.md` (jangan timpa
   `CLAUDE.md` yang ada tanpa bertanya). Demikian pula, buat symlink `.cursor → .agents` jika belum ada.
2. **`docs/`.** Isi kategori-kategori standar dengan konten nyata yang spesifik repo: `PRODUCT_SPEC.md` (dokumen produk/mengapa yang non-teknis — wajib untuk setiap repositori, termasuk pustaka), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md` (tidak pernah dilewati —
   setiap repositori memiliki postur keamanan, bahkan tanpa secret),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, ditambah `PERFORMANCE.md` dan indeks `docs/README.md`.
   Jika docs sudah ada, integrasikan dan perluas — jangan menduplikasi.
3. **Dokumentasi per modul.** Tambahkan sebuah `README.md` (dan subfolder `docs/` untuk modul kompleks) di dalam setiap
   modul sumber utama yang ditemukan dalam pengintaian.
4. **`.agents/` + `.claude → .agents` + `.cursor → .agents`.** Buat rumah kanonis lintas agent: katalog `agents/` yang **dipikirkan matang**,
   `skills/` yang sesuai stack, dan `commands/` `dwp-*` tipis yang mendelegasikan ke
   skill yang terpasang — setiap entri dibenarkan untuk repositori *ini*, bukan disalin dari yang lain. Tambahkan
   katalog `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) yang sesuai dengan apa yang ada di
   disk, ditambah `settings.json`, dan symlink `.claude → .agents` serta `.cursor → .agents`. Lipat setiap skills/agents yang ada
   ke dalam katalog.
5. **Skill DWP, disesuaikan.** Skill yang terpasang adalah mesinnya; kit milik repositori sendiri
   (skills, agents, commands) harus **dipikirkan untuk repo ini** — tidak pernah menyalin-tempel kit
   repositori lain.
6. **`.dwp/` + `tmp/`.** Siapkan `.dwp/` yang di-gitignore dengan `plans/`, ditambah ruang
   scratch `tmp/` — keduanya ditambahkan ke `.gitignore` secara non-destruktif (tambahkan, jangan pernah menulis ulang). Keduanya tidak dapat dipertukarkan: segala sesuatu yang dihasilkan sebuah alur **tentang sebuah rencana** — analisis, catatan skills, tinjauan keamanan, log gerbang, laporan audit — harus berada di `.dwp/plans/PLAN_001_<slug>/analysis_results/` milik rencana itu sendiri, bukan di akar repositori dan bukan di `tmp/`. `tmp/` untuk pekerjaan yang tidak akan pernah dibaca ulang oleh rencana mana pun.

Rencana baru mendapat ID numerik yang meningkat monoton dengan sedikitnya tiga digit (misalnya `PLAN_001_add_payment_webhooks/`). Skema v5 yang dibekukan menghitung ID numerik sebagai satu kata, sehingga slug v5 terdiri dari 2–4 kata dan slug v6 dan v7 dari 2–5 kata. Folder lama tanpa nomor `PLAN_<slug>/` tetap dapat dibaca dan tidak pernah diganti namanya. Jika ada rencana bernomor, `latest` merujuk ke rencana dengan ID numerik tertinggi.

## 4. Pasang — atau tingkatkan — tinjauan lokal dan addon

Setelah onboarding dasar, skill Deep Work Plan dan tinjauan lokal AI Diff Reviewer yang wajib
sudah terpasang di **setiap** repositori. Addon lainnya tidak: masing-masing hanya pantas berada di
repositori yang cocok dengannya. Bagian ini **mendeteksi setiap addon, meningkatkan yang Anda
gunakan, dan menawarkan yang cocok** — bagian ini tidak pernah menambahkan addon hanya untuk
melengkapi set. Jalankan bagian ini dengan cara yang sama pada repositori baru maupun pada
repositori yang di-onboard berbulan-bulan lalu: bagian ini **idempoten**. Untuk setiap komponen,
deteksi apa yang terpasang dan versinya, lalu bercabang:

- **Tidak ada** — tinjauan lokal yang wajib dipasang di bawah persetujuan onboarding. Addon
  opsional **ditawarkan** hanya ketika cocok dengan repositori ini, dan dipasang hanya ketika
  pengembang menerimanya.
- **Terpasang, lebih lama dari patokan** — jika masih cocok, tingkatkan **di tempat** dengan
  perintah terpatok yang sama (setiap installer mengganti berkasnya sendiri dan mempertahankan
  konfigurasi, login, dan data pengguna). Sampaikan apa yang akan berubah sebelum menjalankannya.
  Jika sudah tidak cocok, sampaikan hal itu dan serahkan keputusannya kepada pengembang.
- **Terpasang pada patokan, atau lebih baru** — jangan ubah apa pun.

Catat setiap penerimaan atau penolakan di `.dwp/config.json`; addon yang ditolak tidak ditawarkan
lagi kecuali pengembang memintanya. Menjalankan bagian ini untuk kedua kalinya tidak mengubah apa pun.

Tabel ini adalah rujukan, bukan daftar periksa: jalankan sebuah baris hanya untuk tinjauan lokal wajib, untuk addon yang sudah dipakai repositori ini, atau untuk addon yang baru saja diterima pengembang.

| Komponen | Deteksi versi terpasang | Pasang atau tingkatkan (dipatok) |
| --- | --- | --- |
| AI Diff Reviewer (wajib) | `version:` di `.agents/skills/ai-diff-reviewer/SKILL.md` | `npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.14 --skill ai-diff-reviewer --force -y` |
| Dailybot | `version:` di `.agents/skills/dailybot/SKILL.md` | `npx --yes skills add https://github.com/DailybotHQ/agent-skill/tree/v3.23.17 --skill dailybot --force -y` |
| agentkit | `ak --version` | `(cd "$(mktemp -d)" && git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh)` |
| Herdr | `scripts/herdr-peers --version` di skill herdr-peers yang terpasang | `npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.0.0 --skill herdr-peers -g --force -y` |
| devcontainer | `dck --version` | `(cd "$(mktemp -d)" && git clone --branch v1.0.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh)` |
| DeepWorkPlan Vim | `git -C ~/.config/nvim describe --tags` | installer terverifikasi di https://deepworkplan.com/vim/install.sh (mematok `v1.0.0`; unduh, `shasum -a 256 -c install.sh.sha256`, lalu jalankan) |

Verifikasi setiap unduhan terhadap `SHA256SUMS` rilisnya dan digest di *Rilis yang dipatok* di atas
sebelum menjalankannya.

**Tinjauan lokal yang wajib.** Pasang **tinjauan lokal AI Diff Reviewer** (Fase 7a — wajib sejak
standar 2.3.0): skill yang dipatok pada tag di atas ditambah `.review/extension.md` yang disesuaikan
dengan repo melalui `generate-extension`, di bawah persetujuan onboarding.

**Addon opsional.** Sebutkan ketujuh addon opsional (devcontainer, Dailybot, dependency upgrade,
design system, agentkit, Herdr, DeepWorkPlan Vim) dan tawarkan hanya yang cocok untuk repositori ini, masing-masing sebagai opt-in
eksplisit. Sebuah repositori sepenuhnya konforman dengan **nol** addon opsional — jangan pernah
memasang yang itu secara otomatis.

- **Dukungan devcontainer** — integrator tipis untuk [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, dipatok pada `v1.0.0`, dengan skill `dck-dockerfile`-nya): `dck init` merender container milik repositori itu sendiri — image resmi yang dipatok berdasarkan digest, tanpa base image bersama, `bash dev.sh up` — dan merekonsiliasi devcontainer yang sudah ada hanya setelah diff-nya diterima. Ketika diterima, ikuti *Jalur devcontainer* di bawah hingga stack lengkap.
- **Integrasi Dailybot** — empat peristiwa siklus hidup (kickoff, tugas signifikan, terblokir, penyelesaian) sebagai pelaporan kemajuan secara best-effort untuk tim yang sudah memakai Dailybot, dengan penegakan hook otonom opsional (`dailybot-cli >= 3.9.0`). Memasang skill agent Dailybot yang dipasangkan (3.23.14) juga membuka chat, check-in, penulisan form, tanya AI, board dan tugas Plan, API key per repo, dan lainnya — addon ini hanya menghubungkan pelaporan ke eksekusi DWP. Metodologi inti tidak memiliki ketergantungan apa pun pada Dailybot.
- **Dependency upgrade** — peningkatan yang agnostik terhadap package manager, terkelompok, tervalidasi, dan dapat dikembalikan. Ketika
  diterima, ia memasang command `/lib-upgrade`.
- **Design system** — `docs/DESIGN.md` opsional hanya untuk repositori dengan permukaan antarmuka yang
  terdeteksi (tidak ditawarkan untuk pustaka murni, layanan headless, atau repositori khusus
  infrastruktur). Tiga profil ditumpuk dalam satu berkas: visual-ui (sangat direkomendasikan saat
  terdeteksi; instalasi dijaga oleh penerimaan), cli-output, dan conversational — dua yang terakhir selalu ditanyakan, tidak pernah
  diterapkan secara otomatis.
- **agentkit** — instalasi tingkat mesin dari [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, dipatok pada `v1.0.0`): satu perintah untuk setiap coding agent, satu akun per profil, `ak usage` dan `ak pick` untuk memilih akun dengan ruang terbanyak, dan `ak run` headless untuk rencana yang menyerahkan tugas `parallel_safe` yang terbatas ke coding agent lain (satu delegasi per worktree). Kit meluncurkan agen dalam mode otonom secara default dan opt-out-nya (`--ask` atau `AGENTKIT_PERMISSIONS=ask`) selalu menang.
- **Herdr** — instalasi tingkat mesin dari [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (dipatok pada `v1.0.0`, ditambah skill resmi Herdr) untuk rencana yang meminta satu balasan yang diotorisasi dari agent rekan di panel Herdr, di mesin mana pun, dan untuk lead yang mengawasi lane-nya.
- **DeepWorkPlan Vim** — editor terminal ([deepworkplan-vim](https://github.com/DailybotHQ/deepworkplan-vim), dipatok pada `v1.0.0`), instalasi tingkat mesin yang tidak pernah menimpa konfigurasi Neovim yang sudah ada tanpa persetujuan eksplisit.
- **AI Diff Reviewer** — tinjauan lokal yang wajib (bukan opt-in): pemeriksaan keamanan setiap Final
  Review menjalankan [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) **v3** (skill +
  `.review/extension.md` wajib) atas kumpulan perubahan rencana yang terakumulasi. Skill atau ekstensi
  yang hilang adalah temuan `local reviewer not installed` yang tercatat — tidak pernah dilewati diam-diam,
  dan tidak pernah menjadi bootstrap kejutan: instalasi milik persetujuan
  onboarding atau invokasi addon yang eksplisit; kesalahan pemanggilan bersifat kegagalan lunak;
  **temuan kritis terverifikasi** dari penerusan yang selesai tetap memblokir penyelesaian (v3, BC-07 — klaim kritis yang belum terverifikasi muncul sebagai peringatan beranotasi, dan tinjauan `incomplete`/`timeout` bukan kelulusan yang bersih, BC-04). **Flow B** (gerbang CI
  dengan `pr-review.yml`) ditawarkan sebagai opt-in eksplisit dan tidak pernah dipasang tanpa diminta.
  Tidak ada alur Deep Work Plan yang memerlukan layanan komersial, penyedia CI, atau secret.

### Jalur devcontainer (ketika diterima)

Addon devcontainer berakhir pada stack yang berfungsi, bukan sekadar sekumpulan berkas yang dirender.
Dengan persetujuan pengembang di setiap langkah:

1. **Render.** `dck init` menulis `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`,
   `docker/local/docker-compose.yaml` dan `dev.sh`, menampilkan rencananya terlebih dahulu dan
   bertanya sebelum mengubah berkas yang sudah ada.
2. **Pilih lapisan di `.devcontainer/dck.toml`.** Aktifkan `[layers] agents` hanya jika pengembang
   menginginkan coding agent di dalamnya, dan cantumkan **hanya CLI yang mereka pilih** di
   `[agents] clis` (misalnya `["claude", "codex"]`); tidak ada hal lain yang dipasang. `editor`
   menambahkan DeepWorkPlan Vim.
3. **Hubungkan Herdr.** `[herdr] machine = true` mendaftarkan container sebagai mesin Herdr dan
   `layout = "standard"` membukanya dengan sidebar standar — App · Editor · Development · Agents —
   setiap panel di jalur aplikasi (`/app` secara default). Mesh memungkinkan agent di dalam
   menjangkau agent di host dan di container lain.
4. **Akun host (opt-in, keputusan pengembang).** Di **profil host** pengembang
   (`~/.config/dck/profile.toml`), tidak pernah di `dck.toml` repositori, `[agents] host_profiles = true`
   memungkinkan container memakai akun host dari CLI yang dipasang repositori — Claude melalui
   `CLAUDE_CODE_OAUTH_TOKEN` (`@default`) atau `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` (`@name`), Codex
   melalui berkas auth-nya — hanya-baca, dengan `host_env_keys` sebagai daftar izin nama variabel
   tambahan. Jangan pernah mengaktifkannya atas nama pengembang, dan jangan pernah mencetak token.
5. **Mulai.** `bash dev.sh up` membangun, memulai, dan mendaftarkan container.
6. **Periksa.** Setiap butir adalah satu perintah:
   - [ ] `dck doctor --json` melaporkan tata letak vendored sebagai `current`.
   - [ ] `bash dev.sh ps` menampilkan layanan berjalan; `dck herdr status` menampilkan mesin terpasang.
   - [ ] `bash dev.sh shell -c 'ak doctor'` mencantumkan tepat CLI yang ada di `[agents] clis` (hanya lapisan agents).
   - [ ] `bash dev.sh agents` mencantumkan rekan di host dan di container lain.
   - [ ] `bash dev.sh shell -c 'ssh-add -l'` menampilkan kunci agent host; tidak ada berkas kunci di dalam.
   - [ ] Mesin yang terpasang terbuka dengan App · Editor · Development · Agents di `/app`.

## Orkestrasi: banyak agent, lane, dan eksekusi tanpa pengawasan

Pekerjaan yang lebih luas dari satu sesi berjalan sebagai **lead** dan **lane**-nya — lihat
https://deepworkplan.com/methodology/06-orchestration.md. Ketika pengembang memintanya dan addon
agentkit dan Herdr terpasang:

- **Satu lane per repositori**, pada checkout dasarnya, dengan satu branch, satu pull request, dan
  satu rilis. Gunakan git worktree hanya ketika dua penulis harus berbagi satu repositori. Rilis
  berjalan dalam urutan dependensi, dan lead memberikan GO kepada setiap lane.
- **Akun berdasarkan sisa kuota.** `ak profiles --json` mencantumkan akun; `ak usage` mencantumkan
  setiap akun dari setiap CLI, dengan kuotanya bila dapat dibaca (kuota Antigravity di Linux dan di
  dalam container), sekali per batch; `ak pick <kind> --count N` mengembalikan akun dengan ruang terbanyak.
  Gunakan hanya akun milik pengembang sendiri, sesuai ketentuan setiap vendor.
- **Siapkan sekali.** Pengakuan bypass-permissions Claude Code adalah langkah sekali saja per
  profil yang dilakukan **pengembang** saat profil dibuat (di dalam container devcontainer-kit, kit
  menuliskannya hanya ke direktori home milik container itu sendiri). Jangan pernah mengirim tombol untuknya.
- **Luncurkan.** `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` memulai lane di
  foldernya sendiri; `--trust-cwd` mempercayai folder itu sejak awal, sehingga tidak muncul layar
  kepercayaan folder. Setelah pengembang mengizinkan operasi tanpa pengawasan, setiap peluncuran
  tidak memerlukan persetujuan lagi.
- **Koordinasikan.** `herdr-peers ask` dan `herdr-peers reply`: satu reply yang diotorisasi per ask,
  kedalaman satu, reply adalah data dan tidak memberikan apa pun. Lane Codex menambahkan `--pane <panelnya>` pada setiap perintah herdr-peers.
- **Awasi.** `herdr-peers lanes` menampilkan status setiap lane; untuk lane yang blocked,
  `herdr-peers status <pane>` mengklasifikasikan layarnya dan `herdr pane read <pane>` menampilkannya.
- **Satu penekanan tombol, satu kasus.** Satu-satunya tombol yang boleh Anda kirim dengan
  `herdr pane send-keys` adalah jawaban atas layar kepercayaan folder, pada panel yang Anda luncurkan
  sendiri, ketika `--trust-cwd` tidak tersedia. Baca layar sebelum dan sesudahnya, dan kirim tombol
  sesedikit mungkin.
- **Baca, catat, dan eskalasikan semua hal lain** kepada pengembang: pengakuan bypass-permissions
  Claude, prompt login dan kredensial, permintaan izin per tindakan, konfirmasi destruktif, prompt
  pembayaran atau paket, layar yang tidak dikenal, dan panel yang tidak Anda buat. Dengan
  `AGENTKIT_PERMISSIONS=ask`, lane bertanya sebelum bertindak; jangan pernah mengakali prompt
  tersebut. Catat setiap intervensi di rencana induk.
- **Jaga swarm tetap berjalan.** Dengan coding-agents-kit `v1.0.1` dan herdr-peers `v1.0.0`, setiap agent
  memeriksa `ak capacity --self --json` di setiap batas tugas; pada `critical` ia menulis paket handoff
  (https://deepworkplan.com/schema/dwp-handoff/v1.json) dan lead meluncurkan penerus di checkout yang
  sama. Lead mengklaim rencananya dengan `herdr-peers lead claim`, lane menyapanya sebagai `lead`,
  dan seorang deputi mengambil alih (`herdr-peers lead takeover`) jika lead menghilang. Putuskan dan
  catat setiap pilihan rutin; eskalasikan hanya kelas kritis C1–C7 — lihat
  https://deepworkplan.com/methodology/07-swarm-autonomy.md.

## 5. Kembangkan kit (sub-skill author)

Setelah onboarding, gunakan sub-skill `author` untuk menumbuhkan kit milik repositori sendiri.
Delegator tipis `/skill-create` dan `/agent-create` mengarah ke sana. Buat sebuah **skill** untuk
prosedur dalam sesi yang dapat diulang, sebuah **agent** untuk peran berulang dengan model tier dan
alatnya sendiri, dan sebuah **command** hanya sebagai delegator tipis. Jaga katalog `.agents/docs/`
tetap selaras dengan apa yang ada di disk.

## 6. Rencanakan dan eksekusi

Hasilkan Deep Work Plan untuk tugas apa pun dan jalankan tugas demi tugas:

- `/dwp-create <tujuan>` — mengubah sebuah tujuan menjadi rencana yang dapat dieksekusi. Sejak standar 2.4.0 sebuah rencana punya dua format: **Lite**, yang catatan tugasnya berada inline di README rencana, untuk pekerjaan kecil dan terbatas; dan **Full**, satu berkas per tugas, untuk pekerjaan berjangka panjang. Keduanya membawa kontrak yang sama — id tugas yang stabil, permukaan tersentuh, kriteria penerimaan, gerbang validasi, bukti penyelesaian, dan satu Final Review — sehingga Lite hanya lebih murah direpresentasikan, bukan lebih lemah. Tambahkan `lite` atau `full` untuk memaksa format dan `trust` untuk memateraikan tanpa ronde tinjauan; tanpa preferensi, DWP merekomendasikan satu dan menjelaskan alasannya. Rencana Lite dipromosikan dengan `/dwp-refine promote`.
- `/dwp-execute` — eksekusi rencana tugas demi tugas, perbarui kemajuan dan validasi setiap gate.
- `/dwp-status` — laporkan kemajuan tanpa membuat perubahan.
- `/dwp-refine` — tambah, hapus, atau susun ulang tugas sambil mempertahankan pekerjaan yang selesai.
- `/dwp-resume` — rekonstruksi status dan lanjutkan rencana yang terhenti.
- `/dwp-verify` — laporan konformansi lulus/gagal yang objektif untuk repositori (atau rencana tertentu).

Setiap rencana ditutup dengan Final Review — sebuah pemeriksaan keamanan atas perubahan rencana itu
sendiri (menjaga `docs/SECURITY.md` tetap mutakhir; sebuah temuan kritis memblokir penyelesaian),
validasi status akhir, dan rekonsiliasi skills. Executive Report tersedia atas permintaan.

## 7. Verifikasi

Jalankan `/dwp-verify` untuk laporan konformansi lulus/gagal yang objektif (atau
`bash {skill_dir}/verify/conformance.sh` untuk lapisan mekanis yang ramah CI dan keluar dengan
`0`/`1`, dan `2` dengan vonis `UNVERIFIED` eksplisit ketika tidak dapat menjalankan pemeriksaannya — tidak pernah melaporkan kelulusan yang tidak ia verifikasi). Ia memeriksa kriteria dalam [dokumen Konformansi spesifikasi](https://deepworkplan.com/spec),
lalu konfirmasikan:

- [ ] Skill terpasang dan dapat di-resolve, dengan kesembilan sub-skill tersedia.
- [ ] `AGENTS.md` ada di akar dengan blok Quick Commands yang nyata dan prinsip kerja inline yang mencakup kesepuluh perilaku; `CLAUDE.md` mengarah kepadanya.
- [ ] `docs/` memuat kategori-kategori standar dengan konten nyata yang spesifik repo;
      `docs/TESTING_GUIDE.md` mendeskripsikan pengaturan test/lint yang nyata (bukan kosong atau stub);
      modul-modul utama memiliki `README.md`.
- [ ] `.agents/` ada dengan `agents/`, `commands/` (delegator `dwp-*` tipis yang mereferensikan skill,
      bukan alur yang disalin), `skills/`, dan sebuah katalog yang sesuai dengan apa yang ada di disk;
      `.claude → .agents` dan `.cursor → .agents` me-resolve.
- [ ] `.dwp/` ada, di-gitignore, dan memiliki `plans/`; `tmp/` ada dan di-gitignore.
- [ ] Konten pengguna yang ada dipertahankan atau direkonsiliasi dengan persetujuan — tidak ada yang dihancurkan secara diam-diam.
- [ ] Anda dapat menghasilkan sebuah Deep Work Plan dan mengeksekusinya tugas demi tugas, memvalidasi setiap gate.

## Hasil

Ketika onboarding selesai, repositori berubah dalam dua cara yang tahan lama — pilar-pilar
metodologi:

1. **Repositori menjadi spec-driven.** Pekerjaan dimulai dari rencana dan spesifikasi tertulis, bukan dari
   prompt dadakan.
2. **Repositori itu sendiri menjadi agent harness.** `AGENTS.md`, `docs/`, dokumentasi per modul, dan
   rumah skill `.agents/` memberi setiap agent konteks dan command yang dibutuhkannya untuk melakukan pekerjaan yang terstruktur
   dan dapat diverifikasi.

Siapa pun dapat menjalankan prompt ini di repositori mana pun — dan berakhir dengan basis kode yang dapat dikemudikan AI agent mana pun.

## Langkah berikutnya

- [Baca metodologinya](/methodology)
- [Spesifikasi](/spec)
- [Telusuri kit](/kit)
- [Lihat contoh](/examples)
- [Opsional: editor terminal DeepWorkPlan Vim](/kit/vim)
- [Menjalankan banyak agent](/methodology/06-orchestration)
