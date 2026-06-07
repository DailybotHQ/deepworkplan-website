---
title: Sistem desain
description: "Sebuah addon opt-in bercakupan frontend yang memberi sebuah repo sebuah DESIGN.md (di bawah docs/, terindeks dari AGENTS.md) sehingga agent coding mana pun menghasilkan UI yang konsisten dengan sistem desain milik repo itu sendiri."
kind: addon
lang: id
order: 4
---

# Addon design-system

Beri sebuah repositori frontend/UI sebuah `DESIGN.md` — sebuah berkas sistem desain berformat Markdown yang dibaca agent coding mana pun untuk menghasilkan UI yang konsisten dengan sistem desain **milik** repo itu sendiri, alih-alih default yang tak bergaya dan lazim secara statistik yang menjadi andalan agent ketika tanpa panduan. Addon opt-in Deep Work Plan yang keempat.

## Apa yang ditambahkannya

- Sebuah `DESIGN.md` di `docs/DESIGN.md` (berdampingan dengan spesifikasi lain repo; akar repo hanya ketika tidak ada pohon `docs/`), **dirujuk dari `AGENTS.md`** sehingga agent menemukannya seperti dokumen lainnya.
- Bagian-bagian kanonis: ikhtisar/atmosfer, palet warna & peran (terang + gelap), tipografi, tata letak & spasi, elevasi & kedalaman, bentuk, komponen, perilaku responsif, anjuran & larangan (termasuk aturan aksesibilitas repo), dan panduan prompt agent.
- Sebuah langkah validasi yang memeriksa bahwa berkas lengkap, bahwa kontras teks yang terdokumentasi memenuhi WCAG AA, dan bahwa referensi token dapat di-resolve.

## Perilaku

- **Bernalar, jangan menyalin.** Setiap nilai diturunkan dari sumber desain nyata repo — stylesheet-nya, CSS custom properties, konfigurasi Tailwind, berkas token, atau gaya komponennya. Ia tidak pernah menempelkan `DESIGN.md` milik brand pihak ketiga; katalog rujukan adalah inspirasi untuk struktur, tidak pernah untuk konten.
- **Rekonsiliasi, jangan menimpa.** Sebuah `DESIGN.md` atau sumber token yang sudah ada direkonsiliasikan secara aditif, tidak pernah ditimpa; perubahan destruktif memerlukan persetujuan.
- **Penemuan lewat referensi.** Di mana pun `DESIGN.md` berada, `AGENTS.md` (dan `CLAUDE.md`) merujuknya — penunjuk itu, bukan lokasi fisiknya, yang menjamin agent memuatnya.
- **Pragmatis, tidak terikat keras.** Ia merujuk konvensi `DESIGN.md` yang sedang berkembang sebagai bentuk yang diikuti, tetapi tetap mengutamakan Markdown dan tidak terikat pada skema token tunggal mana pun.

## Bercakupan frontend, aktif secara default ketika terdeteksi

Addon ini untuk repo dengan permukaan UI nyata — sebuah stylesheet dengan CSS custom properties, sebuah konfigurasi Tailwind atau blok `@theme`, komponen UI, atau sebuah panduan brand/gaya. Ia **tidak pernah** ditawarkan untuk repo backend, CLI, atau hanya-library. Ketika permukaan UI **memang** terdeteksi, onboarding memperlakukannya sebagai **aktif secara default**: ia menerapkan addon dalam mode trust dan sangat merekomendasikannya dalam mode terpandu. Ia tidak pernah wajib — sebuah repositori dengan nol addon sepenuhnya konforman, dan Anda selalu dapat menolaknya.

## Command opsional

Ketika diterima, addon dapat memasang sebuah delegator `/design-system` ke dalam `.agents/commands/` repo untuk menghasilkan ulang atau menyegarkan `DESIGN.md` di kemudian hari. Memasang command bersifat opsional; sebuah addon yang ditolak tidak memasang apa pun.

## Hubungan dengan dokumen desain per-fitur

Ini adalah sebuah berkas sistem desain **tingkat-repo, persisten** — berbeda dari sebuah dokumen desain teknis per-fitur ("requirements → design → tasks" `design.md` dari alur kerja spec-driven yang terikat tooling). Deep Work Plan sengaja tidak membawa archetype dokumen-desain per-fitur terpisah: README sebuah rencana, acceptance criteria setiap tugas, dan validation gate sudah mencakup peran itu. Addon ini mengisi satu celah yang tidak dicakup peran tersebut: konteks desain UI yang tahan lama dan repo-native.
