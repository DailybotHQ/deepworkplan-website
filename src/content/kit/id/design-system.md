---
title: Sistem desain
description: "Sebuah addon opt-in yang memberi repo mana pun dengan permukaan antarmuka yang menghadap pengguna sebuah DESIGN.md (di bawah docs/, terindeks dari AGENTS.md) — mencakup profil UI visual, output CLI, dan percakapan dalam satu berkas."
kind: addon
lang: id
order: 4
---

# Addon design-system

Beri sebuah repositori dengan **permukaan antarmuka yang menghadap pengguna** sebuah `DESIGN.md` — sebuah berkas sistem desain berformat Markdown yang dibaca agent coding mana pun untuk menghasilkan keluaran antarmuka yang konsisten dengan konvensi **milik** repo itu sendiri, alih-alih default yang tak bergaya dan lazim secara statistik yang menjadi andalan agent ketika tanpa panduan. Addon opt-in Deep Work Plan yang keempat.

Sebuah "permukaan antarmuka" bersifat jamak: sebuah **UI visual** yang dirender, **output CLI** yang bergaya, dan sebuah permukaan **percakapan** (produk berbicara lewat chat atau email) masing-masing terhitung. Addon mendeteksi masing-masing secara independen sebagai sebuah **profil**, dan profil-profil yang diterima ditumpuk ke dalam satu `DESIGN.md` yang sama.

## Apa yang ditambahkannya

- Sebuah `DESIGN.md` di `docs/DESIGN.md` (berdampingan dengan spesifikasi lain repo; akar repo hanya ketika tidak ada pohon `docs/`), **dirujuk dari `AGENTS.md`** sehingga agent menemukannya seperti dokumen lainnya. Satu repo, satu berkas — tidak pernah berkas saudara per-permukaan.
- **Profil `visual-ui`** — bagian-bagian visual kanonis: ikhtisar/atmosfer, palet warna & peran (terang + gelap), tipografi, tata letak & spasi, elevasi & kedalaman, bentuk, komponen, perilaku responsif, anjuran & larangan (termasuk aturan aksesibilitas repo).
- **Profil `cli-output`** — antarmuka terminal yang bergaya: suara output, warna & gaya semantik (success/error/warning/info/dim dipetakan ke tema yang nyata), komponen output (panel, tabel, spinner, prompt interaktif — dinamai menurut helper nyata repo), konvensi tata letak, dan aturan degradasi (TTY versus pipe, `NO_COLOR`, disiplin stdout/stderr, exit code).
- **Profil `conversational`** — permukaan perpesanan produk: suara & register (nada, keringkasan, aturan penamaan brand), anatomi pesan (DM, posting channel, balasan thread, edit-in-place), dan perenderan per-platform (mrkdwn Slack, markdown Discord, adaptive card Teams, email) dengan fallback teks polos.
- Sebuah panduan prompt agent bersama, ditambah sebuah langkah validasi yang memeriksa integritas setiap profil: kontras teks yang terdokumentasi memenuhi WCAG AA (visual), warna tidak pernah menjadi satu-satunya pembawa makna (CLI), perenderan kaya mencantumkan fallback teks polos (percakapan), dan referensi token dapat di-resolve.

## Perilaku

- **Bernalar, jangan menyalin.** Setiap nilai diturunkan dari sumber desain nyata repo — stylesheet-nya, CSS custom properties, konfigurasi Tailwind, berkas token, gaya komponen, modul display/tema CLI-nya, atau helper penyusunan pesannya. Ia tidak pernah menempelkan `DESIGN.md` milik brand pihak ketiga atau mengimpor konvensi produk lain secara borongan; katalog rujukan adalah inspirasi untuk struktur, tidak pernah untuk konten.
- **Rekonsiliasi, jangan menimpa.** Sebuah `DESIGN.md` atau sumber token yang sudah ada direkonsiliasikan secara aditif, tidak pernah ditimpa; menambahkan profil yang baru diterima menambahkan bagian-bagiannya tanpa menulis ulang sisanya; perubahan destruktif memerlukan persetujuan.
- **Penemuan lewat referensi.** Di mana pun `DESIGN.md` berada, `AGENTS.md` (dan `CLAUDE.md`) merujuknya — penunjuk itu, bukan lokasi fisiknya, yang menjamin agent memuatnya.
- **Pragmatis, tidak terikat keras.** Ia merujuk konvensi `DESIGN.md` yang sedang berkembang sebagai bentuk yang diikuti, memperluasnya ke permukaan non-visual, dan tetap mengutamakan Markdown tanpa terikat pada skema token tunggal mana pun.

## Bercakupan antarmuka, dengan kekuatan per-profil

Addon ini untuk repo dengan setidaknya satu permukaan antarmuka nyata; ia tidak pernah ditawarkan untuk repo yang tidak memilikinya (library murni, layanan headless, repo hanya-infrastruktur). Setiap profil membawa kekuatan rekomendasinya sendiri:

- **`visual-ui` aktif secara default ketika terdeteksi** — sebuah stylesheet dengan CSS custom properties, sebuah konfigurasi Tailwind atau blok `@theme`, komponen UI, atau sebuah panduan brand/gaya. Onboarding menerapkannya dalam mode trust dan sangat merekomendasikannya dalam mode terpandu.
- **`cli-output` dan `conversational` direkomendasikan ketika terdeteksi — dan selalu ditanyakan, tidak pernah diterapkan otomatis**, bahkan dalam mode trust. Sebuah library perenderan CLI ditambah lapisan display yang disengaja menandakan yang pertama; sebuah SDK platform chat atau lapisan penyusunan pesan menandakan yang kedua. Sebuah argument parser polos dengan print mentah tidak memenuhi syarat.

Ia tidak pernah wajib — sebuah repositori dengan nol addon sepenuhnya konforman, dan Anda selalu dapat menolak profil mana pun atau seluruh addon. Sebuah `DESIGN.md` yang dibuat sebelum profil ada adalah berkas visual satu-profil yang valid: tanpa migrasi.

## Command opsional

Ketika diterima, addon dapat memasang sebuah delegator `/design-system` ke dalam `.agents/commands/` repo untuk menghasilkan ulang atau menyegarkan `DESIGN.md` di kemudian hari. Memasang command bersifat opsional; sebuah addon yang ditolak tidak memasang apa pun.

## Hubungan dengan dokumen desain per-fitur

Ini adalah sebuah berkas sistem desain **tingkat-repo, persisten** — berbeda dari sebuah dokumen desain teknis per-fitur ("requirements → design → tasks" `design.md` dari alur kerja spec-driven yang terikat tooling). Deep Work Plan sengaja tidak membawa archetype dokumen-desain per-fitur terpisah: README sebuah rencana, acceptance criteria setiap tugas, dan validation gate sudah mencakup peran itu. Addon ini mengisi satu celah yang tidak dicakup peran tersebut: konteks desain antarmuka yang tahan lama dan repo-native.
