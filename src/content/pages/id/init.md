---
title: Init — Make your repository AI-first
description: "Prompt onboarding yang dapat dieksekusi untuk AI agent: adopsi Deep Work Plan di repositori mana pun — analisis, dokumentasikan, pasang skill, dan jadikan dapat dikemudikan agent."
---

# Init — Onboarding prompt untuk AI agent

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

## 0. Baca metodologi dan spesifikasi

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
- **Inventarisasi apa yang sudah ada.** `AGENTS.md`, `CLAUDE.md`, `docs/`, penyiapan `.agents/` atau skills/agents
  apa pun, `.dwp/`, dan `.gitignore`. Catat apa pun yang sudah melakukan sebagian dari pekerjaan ini.
- **Usulkan rencana onboarding.** Sajikan daftar ringkas: berkas yang akan Anda buat, berkas yang akan Anda
  ubah, dan apa pun yang ada yang Anda usulkan untuk direkonsiliasi atau diganti — lalu **minta pengguna mengonfirmasi**
  sebelum melanjutkan. Untuk repositori besar (banyak modul atau banyak artefak yang perlu dihasilkan),
  sub-skill onboard menggunakan jalur berbasis rencana: menyelesaikan pengintaian, menghasilkan
  `AGENTS.md`, lalu mengeluarkan Deep Work Plan onboarding di bawah `.dwp/drafts/` dan mendelegasikan
  ke `/dwp-refine` → `/dwp-execute` → `/dwp-resume` sesuai kebutuhan.

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
  # Unduh checksum untuk rilis yang ingin Anda pasang (ganti vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # keluaran bukan nol berarti ada berkas yang tidak cocok — hentikan
  ```

  Rilis **ber-checksum, bukan bertanda tangan** (penandatanganan adalah langkah berikutnya yang
  terdokumentasi). Semuanya terbuka dan dapat dibandingkan, sehingga Anda juga dapat membandingkan
  berkas mana pun dengan repositori pada tagnya.
- **Laporkan masalah.** Laporkan masalah keamanan **secara pribadi melalui pelaporan kerentanan GitHub** di repositori yang relevan — `https://github.com/DailybotHQ/deepworkplan-skill/security` atau `https://github.com/DailybotHQ/deepworkplan-website/security` — bukan sebagai issue publik. Lihat juga `SECURITY.md` setiap repositori, `https://deepworkplan.com/.well-known/security.txt`, dan halaman kepercayaan `https://deepworkplan.com/trust`.

## 2. Pasang skill Deep Work Plan

Pasang skill agar agent repositori ini dapat merencanakan dan mengeksekusi pekerjaan terstruktur. Ia membawa sebuah router
ditambah delapan sub-skill — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard`, dan `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Atau instal melalui OpenClaw:

```bash
openclaw skills install deepworkplan
```

Atau klona dan jalankan skrip setup:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Onboard repositori (dengan penalaran dan non-destruktif)

Panggil sub-skill onboard (`/deepworkplan-onboard`). Bernalarlah tentang repo yang sebenarnya dan sesuaikan semuanya
dengannya. Untuk setiap artefak di bawah, **jika sudah ada, rekonsiliasikan** (gabungkan, tingkatkan, selaraskan dengan
metodologi) alih-alih menimpa — dan konfirmasikan dengan pengguna sebelum mengganti apa pun.

1. **`AGENTS.md` + `CLAUDE.md`.** Hasilkan sebuah `AGENTS.md` di akar — sebuah indeks, aturan-aturan wajib
   (hanya bahasa Inggris, conventional commit, pola test nyata repo dan review gate), dan blok Quick
   Commands dengan perintah repo yang **nyata dan dapat dijalankan**. Jika sebuah `AGENTS.md` sudah ada, gabungkan
   ke dalamnya alih-alih menggantinya. Buat symlink `CLAUDE.md → AGENTS.md` (jangan timpa
   `CLAUDE.md` yang ada tanpa bertanya).
2. **`docs/`.** Isi kategori-kategori standar dengan konten nyata yang spesifik repo: `PRODUCT_SPEC.md` (dokumen produk/mengapa yang non-teknis — wajib untuk setiap repositori, termasuk pustaka), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md` (tidak pernah dilewati —
   setiap repositori memiliki postur keamanan, bahkan tanpa secret),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, ditambah `PERFORMANCE.md` dan indeks `docs/README.md`.
   Jika docs sudah ada, integrasikan dan perluas — jangan menduplikasi.
3. **Dokumentasi per modul.** Tambahkan sebuah `README.md` (dan subfolder `docs/` untuk modul kompleks) di dalam setiap
   modul sumber utama yang ditemukan dalam pengintaian.
4. **`.agents/` + `.claude → .agents`.** Buat rumah kanonis lintas agent: katalog `agents/` yang **dipikirkan matang**,
   `skills/` yang sesuai stack, dan `commands/` `dwp-*` tipis yang mendelegasikan ke
   skill yang terpasang — setiap entri dibenarkan untuk repositori *ini*, bukan disalin dari yang lain. Tambahkan
   katalog `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) yang sesuai dengan apa yang ada di
   disk, ditambah `settings.json`, dan symlink `.claude → .agents`. Lipat setiap skills/agents yang ada
   ke dalam katalog.
5. **Skill DWP, disesuaikan.** Skill yang terpasang adalah mesinnya; kit milik repositori sendiri
   (skills, agents, commands) harus **dipikirkan untuk repo ini** — tidak pernah menyalin-tempel kit
   repositori lain.
6. **`.dwp/` + `tmp/`.** Siapkan `.dwp/` yang di-gitignore dengan `plans/` dan `drafts/`, ditambah ruang
   scratch `tmp/` — keduanya ditambahkan ke `.gitignore` secara non-destruktif (tambahkan, jangan pernah menulis ulang).

## 4. Tawarkan addon opt-in

Setelah onboarding dasar, sebutkan keempat addon (devcontainer, Dailybot, dependency-upgrade,
design-system) dan tawarkan masing-masing sebagai opt-in eksplisit. Sebuah repositori sepenuhnya
konforman dengan **nol** addon — jangan pernah memasangnya secara otomatis.

- **Dukungan devcontainer** — kontainer pengembangan yang terisolasi dan dapat direproduksi dengan autentikasi AI-CLI yang persisten.
- **Integrasi Dailybot** — empat peristiwa siklus hidup (kickoff, tugas signifikan, terblokir, penyelesaian) sebagai pelaporan kemajuan secara best-effort untuk tim yang sudah memakai Dailybot, dengan penegakan hook otonom opsional (`dailybot-cli >= 3.1.2`). Memasang skill agent Dailybot yang dipasangkan (3.4.0) juga membuka chat, check-in, penulisan form, tanya AI, dan lainnya — addon ini hanya menghubungkan pelaporan ke eksekusi DWP. Metodologi inti tidak memiliki ketergantungan apa pun pada Dailybot.
- **Dependency upgrade** — peningkatan yang agnostik terhadap package manager, terkelompok, tervalidasi, dan dapat dikembalikan. Ketika
  diterima, ia memasang command `/lib-upgrade`.
- **Design system** — `docs/DESIGN.md` opsional hanya untuk repositori dengan permukaan antarmuka yang
  terdeteksi (tidak ditawarkan untuk pustaka murni, layanan headless, atau repositori khusus
  infrastruktur). Tiga profil ditumpuk dalam satu berkas: visual-ui (aktif secara default saat
  terdeteksi), cli-output, dan conversational — dua yang terakhir selalu ditanyakan, tidak pernah
  diterapkan secara otomatis.

## 5. Kembangkan kit (sub-skill author)

Setelah onboarding, gunakan sub-skill `author` untuk menumbuhkan kit milik repositori sendiri.
Delegator tipis `/skill-create` dan `/agent-create` mengarah ke sana. Buat sebuah **skill** untuk
prosedur dalam sesi yang dapat diulang, sebuah **agent** untuk peran berulang dengan model tier dan
alatnya sendiri, dan sebuah **command** hanya sebagai delegator tipis. Jaga katalog `.agents/docs/`
tetap selaras dengan apa yang ada di disk.

## 6. Rencanakan dan eksekusi

Hasilkan Deep Work Plan untuk tugas apa pun dan jalankan tugas demi tugas:

- `/dwp-create <goal>` — uraikan sebuah tujuan menjadi tugas berurutan dan bernomor dengan validation gate.
- `/dwp-execute` — eksekusi rencana tugas demi tugas, perbarui kemajuan dan validasi setiap gate.
- `/dwp-status` — laporkan kemajuan tanpa membuat perubahan.
- `/dwp-refine` — tambah, hapus, atau susun ulang tugas sambil mempertahankan pekerjaan yang selesai.
- `/dwp-resume` — rekonstruksi status dan lanjutkan rencana yang terhenti.
- `/dwp-verify` — laporan konformansi lulus/gagal yang objektif untuk repositori (atau rencana tertentu).

Setiap rencana diakhiri dengan tiga tugas akhir wajib — sebuah **Security Review** atas perubahan
rencana itu sendiri (menjaga `docs/SECURITY.md` tetap mutakhir; sebuah temuan kritis memblokir
penyelesaian), Skills & Agents Discovery, dan Executive Report.

## 7. Verifikasi

Jalankan `/dwp-verify` untuk laporan konformansi lulus/gagal yang objektif (atau
`bash {skill_dir}/verify/conformance.sh` untuk lapisan mekanis yang ramah CI dan keluar dengan
`0`/`1`). Ia memeriksa kriteria dalam [dokumen Konformansi spesifikasi](https://deepworkplan.com/spec),
lalu konfirmasikan:

- [ ] Skill terpasang dan dapat di-resolve, dengan kedelapan sub-skill tersedia.
- [ ] `AGENTS.md` ada di akar dengan blok Quick Commands yang nyata; `CLAUDE.md` me-resolve ke sana.
- [ ] `docs/` memuat kategori-kategori standar dengan konten nyata yang spesifik repo;
      `docs/TESTING_GUIDE.md` mendeskripsikan pengaturan test/lint yang nyata (bukan kosong atau stub);
      modul-modul utama memiliki `README.md`.
- [ ] `.agents/` ada dengan `agents/`, `commands/` (delegator `dwp-*` tipis yang mereferensikan skill,
      bukan alur yang disalin), `skills/`, dan sebuah katalog yang sesuai dengan apa yang ada di disk;
      `.claude → .agents` me-resolve.
- [ ] `.dwp/` ada, di-gitignore, dan memiliki `plans/` dan `drafts/`; `tmp/` ada dan di-gitignore.
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
