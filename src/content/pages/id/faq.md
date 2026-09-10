---
title: "Pertanyaan yang sering diajukan — Deep Work Plan"
description: "Jawaban atas pertanyaan seputar Deep Work Plan: apa yang dilakukannya, cara kerja gerbang dan pelanjutan, perbandingan dengan alat lain, dan cara adopsinya."
lastUpdated: 2026-09-10
---

## Pertanyaan yang sering diajukan

Jawaban singkat untuk hal yang paling sering ditanyakan tentang Deep Work Plan, masing-masing dengan tautan ke halaman yang membahas lebih dalam.

## Apa itu Deep Work Plan

### Apa yang sebenarnya dilakukan Deep Work Plan?

Deep Work Plan mengubah sebuah repositori menjadi lingkungan terstruktur tempat coding agent dapat mengeksekusi pekerjaan panjang dengan andal. Ia terpasang sebagai skill agent, meng-onboard repositori satu kali (indeks `AGENTS.md`, pohon `docs/`, kit skill dan command `.agents/`, area keluaran `.dwp/` yang di-gitignore), dan setelah itu setiap tujuan menjadi rencana: tugas atomik, masing-masing dengan kriteria penerimaan dan gerbang verifikasi, dieksekusi satu per satu, di-commit saat lulus, dan dapat dilanjutkan dari disk oleh agent mana pun. Rencana ditutup dengan Final Review yang mengaudit keamanan dan memvalidasi status akhir. Metodologinya berlisensi MIT dan bekerja dengan coding agent mana pun yang membaca repositori.

[Baca metodologinya](https://deepworkplan.com/id/methodology)

### Untuk siapa ini?

Pengembang dan tim yang menyerahkan pekerjaan nyata dan multilangkah kepada coding agent dan ingin pekerjaan itu selesai. Cocok ketika sebuah tugas melintasi lebih dari satu sesi, lebih dari satu kelompok file, atau lebih dari satu agent; ketika rekan tim harus bisa melanjutkan dari tempat agent berhenti; atau ketika "selesai" harus berarti "tervalidasi", bukan "kata agent begitu". Perbaikan satu baris tidak memerlukan rencana, dan metodologinya mengatakannya sendiri: aturan rigor proporsionalnya menyarankan tujuan, kriteria, dan gerbang inline sebagai gantinya.

[Mulai Cepat](https://deepworkplan.com/id/quickstart)

### Apakah ini tool, framework, atau metodologi?

Sebuah metodologi yang dikemas sebagai skill yang dapat dipasang. Tidak ada server, tidak ada akun, tidak ada format proprietary, dan tidak ada runtime selain coding agent yang sudah Anda pakai. Yang terpasang adalah instruksi yang dibaca agent, sejumlah kecil shell script untuk deteksi konteks dan pemeriksaan konformansi, serta konvensi yang diadopsi repositori Anda. Semua yang dihasilkan rencana berupa Markdown dan JSON di repositori Anda, dapat dibaca tanpa tool apa pun.

[Baca spesifikasinya](https://deepworkplan.com/id/spec)

### Dengan coding agent apa saja ia bekerja?

Agent mana pun yang membaca file repositori. Skill ini mengikuti standar Agent Skills terbuka dan konvensi `AGENTS.md`, sehingga Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, dan lainnya memuatnya melalui pemuatan skill dan instruksi normal mereka. Evaluasi milik metodologi ini sendiri menunjukkan sebuah rencana yang dimulai oleh agent dari satu vendor dan dilanjutkan oleh agent vendor lain, di kedua arah. Cakupan instalasi dan bukti perilaku didaftar per agent dalam matriks kompatibilitas, dan keduanya tidak pernah dicampuradukkan.

[Telusuri kit](https://deepworkplan.com/id/kit)

## Bagaimana sebuah rencana berjalan

### Bagaimana cara menggunakannya?

Tiga langkah. Pertama, pasang skill Deep Work Plan ke coding agent Anda — jalur tercepat adalah `npx skills add DailybotHQ/deepworkplan-skill` (atau clone repo skill dan jalankan `./setup.sh`). Kedua, onboard repositori sekali agar agent menyesuaikan `AGENTS.md`, `docs/`, kit `.agents/` dan area `.dwp/` yang di-gitignore dengan stack Anda: arahkan ke https://deepworkplan.com/init.md, atau jalankan `/deepworkplan-onboard`. Ketiga, rencanakan dan jalankan pekerjaan dengan command ringan: `/dwp-create <goal>` membangun rencana; `/dwp-execute` menjalankannya per tugas melawan setiap gerbang; `/dwp-refine` mengedit draf atau rencana yang sedang berjalan; `/dwp-resume` melanjutkan setelah gangguan; `/dwp-status` melaporkan progres tanpa mengeksekusi; `/dwp-verify` menghasilkan laporan kesesuaian objektif. Agent yang mengintercept `/` sering memakai `#` sebagai gantinya (misalnya `#dwp-execute`). Adoption endpoint dan Mulai Cepat menjelaskan jalur yang sama secara lebih rinci.

[Mulai Cepat](https://deepworkplan.com/id/quickstart)

### Bagaimana gerbang verifikasi diimplementasikan? Apakah memerlukan persetujuan manusia?

Gerbang itu adalah asersi yang dapat dieksekusi dan dijalankan sendiri oleh agent. Persetujuan manusia mengapit jalannya rencana: seorang manusia menyetujui rencana sebelum eksekusi dan meninjau diff akhir saat pull request; eksekusi di antaranya berjalan otonom. Setiap tugas menyebutkan command konkret, biasanya gerbang kualitas milik repositori itu sendiri, yang dipilih dari permukaan yang disentuh tugas: test dari perilaku yang berubah beserta konsumennya, diperluas ke seluruh suite ketika perubahan bersifat shared atau tidak bisa dibatasi. Sebuah tugas ditandai selesai hanya ketika command itu keluar dengan sukses, dan tugas yang mengubah perilaku wajib memperluas test. Saat gagal, tugas ditandai terblokir dan agent berhenti.

[Loop inti](https://deepworkplan.com/id/methodology/02-core-loop)

### Bagaimana rencana menghindari keusangan ketika orang mengubah kode di antara eksekusi?

Di tiga front. Tugas ditulis sebagai perilaku, bukan editan: sebuah kriteria penerimaan menyatakan apa yang harus dilakukan sistem, sehingga file yang diganti nama atau implementasi yang ditukar tidak membatalkannya. Setiap gerbang dijalankan ulang terhadap repositori apa adanya saat ini, sehingga asumsi yang rusak gagal keras pada eksekusi berikutnya alih-alih menyimpang diam-diam, dan kegagalan itulah isyarat untuk menyempurnakan. Menjaga dokumentasi tetap sinkron juga bagian dari pekerjaan: tugas yang mengubah perilaku turut memperbarui docs dan kit yang menghadap agent yang mendeskripsikannya, di dalam gerbangnya sendiri. Setiap eksekusi semestinya meninggalkan repositori lebih siap dihadapi agent daripada saat ia menemukannya.

[Baca metodologinya](https://deepworkplan.com/id/methodology)

### Bisakah saya mengubah rencana di tengah eksekusi tanpa kehilangan pekerjaan yang sudah selesai?

Bisa; menyempurnakan rencana yang telah dieksekusi sebagian adalah langkah kelas satu. Definisi tugas dan status eksekusi disimpan terpisah: rencana berupa checklist di disk plus berkas status kecil, sehingga apa yang sudah selesai tetap tercatat terlepas dari teks tugasnya. Ketika sebuah tugas ternyata salah, agent menandainya terblokir dan berhenti alih-alih memaksakan jalan. Anda kemudian mengedit, mengurutkan ulang, memecah, atau menggugurkan tugas yang belum berjalan, sementara tugas yang selesai tetap selesai. Melanjutkan membangun ulang status dari disk dan repositori yang sebenarnya serta menjalankan ulang gerbang yang relevan, sehingga tidak ada pergeseran di bawah permukaan yang lolos begitu saja.

[Loop inti](https://deepworkplan.com/id/methodology/02-core-loop)

### Apakah ia terus memeriksa pekerjaan terhadap rencana, atau apakah rencana hanya urusan di awal?

Rencana adalah pemeriksaan berkelanjutan. Agent mengerjakan satu tugas kecil dalam satu waktu dan harus memvalidasi sebelum melanjutkan, sehingga ia bisa melenceng satu langkah, bukan tiga. Setiap tugas membawa kriteria penerimaan plus command persis yang membuktikannya, dan kemajuan ditulis ke repositori seiring berjalannya waktu, dengan status per tugas, sehingga penyimpangan menjadi terlihat oleh Anda, oleh sesi berikutnya, dan oleh agent berikutnya. Sebuah rencana belum selesai sampai semuanya tervalidasi, termasuk Final Review. Catatan yang jujur: metodologi tidak bisa menghentikan agent menulis kriteria penerimaan yang lemah sejak awal; ia menjadikan penyimpangan nyaring alih-alih senyap.

[Loop inti](https://deepworkplan.com/id/methodology/02-core-loop)

### Apakah rencana dibuat sekali lalu dirawat secara manual, atau apakah ia berevolusi bersama kode?

Bukan keduanya. Ia dibuat sekali dari sebuah tujuan, lalu dirawat sebagai bagian dari pekerjaan. Rencana sengaja tidak ditulis ulang dari diff kode, karena spesifikasi yang mengejar kode menjadi cermin yang tertinggal, dan penyimpangan itulah yang ingin dibasmi oleh metodologi ini. Ia berevolusi dengan sengaja: gerbang dijalankan ulang terhadap repositori saat ini, gerbang yang gagal memicu penyempurnaan, dan agent melakukan penyempurnaan itu selama eksekusi sementara Anda menyetujui di awal dan meninjau di akhir. Dokumentasi dan test berevolusi beriringan dengan kode sebagai akibat konstruksinya, karena memperbaruinya berada di dalam gerbang setiap tugas.

[Baca metodologinya](https://deepworkplan.com/id/methodology)

### Apa yang terjadi jika sesi mati di tengah jalan?

Kemajuan hidup di disk, bukan di chat. Centang README, log setiap tugas, indeks kerja yang terbatas, dan berkas status terbaca mesin diperbarui di setiap batas tugas, dan berkas status mencatat checkpoint sebelum setiap jeda yang direncanakan. Sesi baru, atau agent yang berbeda, membaca indeks ringkas itu, merekonsiliasikannya dengan repositori dan riwayat git, lalu melanjutkan dari tugas pertama yang belum selesai tanpa mengulang pekerjaan yang sudah beres. Bahkan pembuatan rencana yang terputus bisa dipulihkan: identitas rencana dan daftar tugas yang dimaksud ditulis sebelum file tugas mana pun, sehingga rencana yang setengah jadi bisa diselesaikan atau dibuang alih-alih ditebak-nebak.

[Loop inti](https://deepworkplan.com/id/methodology/02-core-loop)

### Apa itu Final Review?

Satu-satunya tugas penutup wajib dari setiap rencana. Secara berurutan: pemeriksaan keamanan atas seluruh kumpulan perubahan yang terkumpul dalam rencana, termasuk tinjauan lokal atas diff yang diwajibkan oleh skill AI Diff Reviewer, dengan temuan kritis memblokir penyelesaian sampai diperbaiki atau diterima secara eksplisit; validasi status akhir, artinya seluruh suite test, lint, type-check, dan format yang berlaku milik repositori pada kode akhir; dan rekonsiliasi keputusan skills yang dicatat setiap tugas. Agent kemudian melaporkan deliverable, bukti, dan keterbatasan, lalu menawarkan Executive Report satu kali, menghasilkannya hanya jika Anda meminta.

[Spesifikasinya](https://deepworkplan.com/id/spec/dwp-specification)

## Perbandingannya dengan alat lain

### Apa bedanya dengan tool spec-driven seperti Spec Kit, OpenSpec, atau Kiro?

Keduanya memecahkan masalah yang berdampingan. Tool spec-driven unggul dalam menangkap apa yang harus berubah: spesifikasi, kebutuhan, dan proposal perubahan dalam bentuk yang dapat diulang. Deep Work Plan soal bagaimana sebuah agent mengeksekusi berjam-jam tanpa menyimpang: harness hasil onboarding, gerbang verifikasi per tugas yang dipilih dari permukaan yang disentuh, status yang dapat dilanjutkan di disk, Final Review wajib dengan pemeriksaan keamanan, dan pemeriksa konformansi untuk repositorinya sendiri. Keduanya bisa digabungkan, dengan spesifikasi atau proposal perubahan yang menjadi masukan sebuah rencana. Halaman perbandingan menyandingkan kapabilitasnya berdampingan, menurut istilah masing-masing tool.

[Lihat perbandingannya](https://deepworkplan.com/id/compare)

### Apa bedanya dengan perangkat alur kerja agent seperti BMAD, Superpowers, Get Shit Done, atau Gentle-AI?

Framework-framework itu membawa gaya kerja yang kuat: peran, prinsip, langkah test-first, dan kebiasaan verifikasi. Deep Work Plan berbeda dari keduanya dan berfokus pada apa yang tinggal di repositori dan apa yang bisa diperiksa: harness yang bisa dibaca agent mana pun dari nol, file tugas dengan kriteria penerimaan dan gerbang, status yang bertahan dari sesi, pemeriksa konformansi dengan exit code yang ramah CI, dan pengukuran terpublikasi atas berapa byte instruksi yang dimuat setiap alur. Ia agnostik terhadap tool menurut konstruksinya dan tidak menambahkan service, provider, atau secret ke core loop. Halaman perbandingan menunjukkan di mana setiap pendekatan bersifat bawaan, opsional, atau di luar cakupan. Gentle-AI mengonfigurasi coding agent yang sudah Anda pakai: memori persisten antar sesi (Engram), skill terkurasi, persona, server MCP, Spec-Driven Development opsional, dan tinjauan berbasis bukti opsional (Receipt-Driven Development). Ia menulis ke direktori konfigurasi setiap agent dan bisa menyimpan artefak perencanaan di Engram, di file OpenSpec, atau keduanya. Deep Work Plan terpasang ke repositori itu sendiri — harness yang bisa dibaca agent mana pun dari nol, file tugas dengan kriteria penerimaan dan gerbang, status on-disk yang bisa dilanjutkan, pemeriksa konformansi dengan exit code yang ramah CI, dan buku besar byte instruksi terpublikasi — tanpa menambahkan service, provider, atau secret ke core loop. Kedua lapisan bisa berdampingan: Gentle-AI melengkapi agent; Deep Work Plan membuat pekerjaan panjang tangguh dan dapat diperiksa di dalam repo.

[Lihat perbandingannya](https://deepworkplan.com/id/compare)

### Mengapa tidak sekadar memakai mode rencana bawaan agent saya?

Mode rencana bawaan berguna, dan Deep Work Plan membangun di atas substrat yang sama, konvensi `AGENTS.md` dan standar Agent Skills terbuka. Bedanya ada pada tempat rencana hidup dan apa yang menegakkannya. Rencana native biasanya hidup di luar repositori dan kedaluwarsa bersama sesi; Deep Work Plan menulis rencana, statusnya, dan buktinya ke dalam repositori, sehingga agent lain atau rekan tim bisa melanjutkannya, dan setiap tugas membawa gerbang yang dapat dieksekusi serta log yang tercatat. Anda tetap memakai mode rencana agent Anda untuk berpikir; metodologinya menambahkan loop eksekusi yang tahan lama dan dapat diverifikasi.

[Lihat perbandingannya](https://deepworkplan.com/id/compare)

## Mengadopsinya

### Apa yang ditulis onboarding ke repositori saya, dan apakah ia menyentuh file yang sudah ada?

Onboarding bersifat non-destruktif: ia mendeteksi `AGENTS.md`, `docs/`, `.agents/`, atau `CLAUDE.md` yang sudah ada, merekonsiliasi alih-alih menimpa, dan bertanya sebelum mengganti apa pun. Ia menulis indeks `AGENTS.md` dengan command nyata, pohon `docs/` yang beralasan, dokumentasi per modul, kit `.agents/` dengan command `dwp-*` yang tipis, area keluaran `.dwp/` yang di-gitignore, peta pengujian yang terverifikasi, dan tinjauan kode lokal yang diwajibkan (skill AI Diff Reviewer plus ekstensi review yang disesuaikan repo). Ia kemudian menjalankan self-check dan pemeriksa konformansi agar Anda bisa melihat apa yang dihasilkan. Repositori yang di-onboard di bawah versi sebelumnya mendapat upgrade tertarget yang hanya mengubah apa yang kurang.

[Endpoint adopsi](https://deepworkplan.com/id/init)

### Berapa biayanya, dan bagaimana efisiensi diukur?

Metodologi dan skill-nya berlisensi MIT dan gratis; tidak ada service, tidak ada kunci API, dan tidak ada telemetri di alur inti. Efisiensi dilaporkan sebagai jumlah byte instruksi yang dimuat setiap alur, diukur oleh script yang di-commit bersama skill dan dipublikasikan dalam ledger evaluasi, dengan kenaikan dilaporkan sejujur penurunannya. Efisiensi tidak dilaporkan sebagai persentase token atau penghematan biaya, karena inventarisasi byte tidak menetapkan hal itu; evaluasi publik yang praregistrasi direncanakan untuk mengukur hasilnya secara semestinya.

[Kepercayaan dan pengungkapan](https://deepworkplan.com/id/trust)

## Masih punya pertanyaan?

Buka diskusi atau issue di GitHub. Pertanyaan yang muncul berulang kali ditambahkan ke halaman ini.

[Tanya di GitHub](https://github.com/DailybotHQ/deepworkplan-website/issues)
