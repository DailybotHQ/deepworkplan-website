---
title: "DWP v5: janji-janji, kini terjamin"
description: "Deep Work Plan v5 mengubah delapan janji lama menjadi kontrak yang teruji — verifikator yang jujur, satu aturan persetujuan, orkestrasi yang tidak merusak, dan jalur pembaruan yang aman."
date: 2026-09-12
version: "v5 · Dijamin oleh pengujian"
kind: release
lang: id
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Hari ini kami merilis Deep Work Plan v5. Ringkasan yang jujur dari rilis ini: metodologinya memang sudah menjanjikan semua ini — sekarang ia menjaminnya. Sebelum v5, agen yang mengikuti dokumentasi secara harfiah masih bisa berakhir dalam skenario kegagalan nyata; setiap skenario tersebut kini tertutup dan dikunci dengan tes yang dapat dieksekusi. Rangkaian kontrak skill tumbuh dari 132 menjadi 258 tes dalam siklus ini, dan setiap jaminan di bawah divalidasi secara langsung terhadap tag yang dirilis — dipasang ke dalam repositori bersih dan dijalankan melalui alurnya sendiri sebelum entri ini ditulis.

**Verifikator yang tidak pernah mengklaim keberhasilan yang tidak diverifikasi.** Pemeriksaan kesesuaian dulu terdegradasi secara diam-diam: tanpa interpreter yang mampu, mereka melewati semua verifikasi namun tetap mencetak vonis sesuai, dan teks tebal di dalam sebuah bidang bisa disalahartikan sebagai bidang yang hilang. Kini verifikator berakhir dengan vonis `UNVERIFIED` yang eksplisit setiap kali ia tidak dapat memverifikasi secara nyata. Verifikator tidak pernah melaporkan keberhasilan yang tidak ia periksa — kepercayaan pada gerbang adalah seluruh proposisinya, dan gerbang yang bisa melewati pemeriksaannya sendiri memutus rantai itu.

**Satu kontrak persetujuan untuk rencana Lite.** Tiga permukaan dulu menjawab pertanyaan "apakah memulai rencana ini menyetujui cakupannya saat ini?" dengan tiga cara berbeda, dan agen bisa macet atau berjalan tanpa otorisasi tepat di perbatasan paling berbahaya. v5 menetapkan satu kontrak di semua tempat: execute atau resume yang eksplisit menyetujui cakupan ready saat ini dan mencatat persetujuan itu sebelum melakukan pekerjaan apa pun; proposal yang masih menunggu dengan sendirinya tidak mengotorisasi apa pun; promosi yang terputus dipulihkan sebelum pekerjaan produk apa pun berjalan.

**Orkestrasi multi-repositori yang tidak merusak.** Override lingkungan dari hub orkestrator dulu bocor ke repositori anaknya — anak bisa menulis status rencana ke folder milik hub itu sendiri. Templat orkestrator juga mencetak `FAIL` sambil keluar dengan sukses, dan pemeriksaan kelengkapan yang men-grep sebuah string status bisa membaca satu tugas selesai sebagai satu rencana selesai. Kini akar hub disimpan sebelum menavigasi ke sub-repositori, setiap anak me-resolve `.dwp/` miliknya secara terisolasi, setiap cabang kegagalan keluar dengan galat, kelengkapan diurai dari status tingkat atas rencana, dan entrypoint devcontainer menyebarkan galat penyalinan sebelum menghapus apa pun.

**Satu matriks persetujuan untuk addon.** Addon mana yang terpasang secara bawaan, mana yang hanya ditawarkan, dan tinjauan mana yang wajib — permukaan sebelumnya menjawab berbeda-beda. v5 menyatakan satu matriks: AI Diff Reviewer wajib untuk tinjauan lokal, dipatok ke rilis yang terverifikasi, dengan tinjauan CI sebagai opt-in eksplisit yang tidak pernah memasang dirinya sendiri; addon design-system adalah penawaran wajib saat pekerjaan UI terdeteksi tetapi terpasang hanya dengan penerimaan eksplisit; addon dependency-upgrade hadir sebagai delegator inert yang nyaris bawaan dengan rollback snapshot eksak; dailybot hanya melapor di mana ia diotorisasi. Diff kosong tidak lagi dihitung sebagai tinjauan yang selesai.

**Perangkat nyata untuk rencana panjang.** Audit atas 108 rencana nyata menunjukkan bahwa pekerjaan yang dapat diparalelkan itu umum, tetapi keputusan sekuensial hampir tidak pernah dideklarasikan, dan stage gate hanya ada sebagai praktik improvisasi. v5 membuat keputusan eksekusi selalu dideklarasikan — sekuensial dengan alasan tercatat saat paralelisasi tidak tepat — menambahkan Stage Gates opsional untuk rencana dengan dua puluh tugas atau lebih, dan memperkaya Plan Variables dengan tingkat kekakuan, batas bukti, dan tindakan terlarang. Semuanya dimuat secara progresif dan tidak pernah membebani rencana Lite.

**Konteks diwajibkan, satu tujuan per tugas.** Rencana bisa menyimpang menjadi daftar tugas tanpa konteks, dan satu tugas bisa membungkus tiga tujuan di balik satu gerbang hijau. v5 mewajibkan pasangan Goal dan Context di tingkat rencana, sebuah Context per tugas — apa yang dibutuhkan sesi baru untuk memulai tugas itu sendirian — pada setiap catatan baru (catatan yang selesai tetap persis seperti ditulis), dan menjadikan satu tujuan per tugas aturan normatif dengan penjaga terhadap kemunduran.

**Jalur pembaruan yang aman.** `/dwp-upgrade` adalah baru. Fase pemeriksaannya hanya-baca dan tidak memasang apa pun; pembaruan hanya dimulai dari penerimaan eksplisit, dengan adaptasi lokal dibandingkan dan ditampilkan sebelum menimpa apa pun; instalasi menargetkan tag eksak dan memverifikasi dirinya sendiri; onboarding dijalankan ulang sebagai init yang segar. Pembaruan tidak pernah menyentuh `.dwp/` — tidak ada rencana, berkas status, catatan gerbang, atau bukti yang dimigrasikan, ditulis ulang, atau divalidasi ulang secara paksa.

**Bukti yang jujur dan terukur.** Klaim efisiensi kini diukur ulang pada tiga baseline — v3.0.0, v4.0.3, dan pohon final — dengan skrip pengukuran yang di-commit ke repositori. Hasil dilaporkan dalam bita sistem berkas dan tidak pernah dikonversi menjadi angka token atau biaya yang tidak bisa kami pertanggungjawabkan, dan setiap klaim yang tidak dapat diverifikasi dikarantina demikian dalam catatan evaluasi.

Deep Work Plan v5 mengikuti standar DWP 4.0.0. Baca [spesifikasi normatif](https://deepworkplan.com/spec), lihat [repositori skill](https://github.com/DailybotHQ/deepworkplan-skill), atau mulai adopsi dari [`/init`](https://deepworkplan.com/init).
