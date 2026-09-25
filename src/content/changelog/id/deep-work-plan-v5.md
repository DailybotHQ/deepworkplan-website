---
title: "DWP v5: janji-janji, kini terjamin"
description: "Deep Work Plan v5 mengubah delapan janji lama menjadi kontrak yang teruji dan memiliki versi — verifikator yang jujur, orkestrasi yang aman, dan jalur pembaruan yang terbukti."
date: 2026-09-12
version: "v5 · Dijamin oleh pengujian"
kind: release
lang: id
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Commit rilis skill ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Rilis skill v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Rilis skill v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
  - label: "Rilis skill v5.5.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1"
  - label: "rilis skill v5.5.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.2"
  - label: "rilis skill v5.5.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3"
  - label: "rilis peninjau v3.1.1"
    url: "https://github.com/DailybotHQ/ai-diff-reviewer/ai-diff-reviewer/releases/tag/v3.1.1"
---

Hari ini kami merilis Deep Work Plan v5. Ini bukan penulisan ulang: ini adalah hasil berbulan-bulan penggunaan nyata — termasuk audit langsung terhadap 108 rencana nyata — yang mengungkap, celah demi celah, di mana janji metodologi dan perilaku nyata agen bisa menyimpang. Ringkasan yang jujur dari rilis ini: metodologinya memang sudah menjanjikan semua ini — sekarang ia menjaminnya. Sebelum v5, agen yang mengikuti dokumentasi secara harfiah masih bisa berakhir dalam skenario kegagalan nyata; setiap skenario tersebut, yang teridentifikasi lewat penggunaan dan masukan itu, kini tertutup dan dikunci dengan tes yang dapat dieksekusi, bukan ditambal dengan lebih banyak narasi. Rangkaian kontrak skill tumbuh dari 132 menjadi 258 tes dalam siklus ini, dan setiap jaminan di bawah divalidasi secara langsung terhadap tag yang dirilis — dipasang ke dalam repositori bersih dan dijalankan melalui alurnya sendiri sebelum entri ini ditulis.

**Verifikator yang tidak pernah mengklaim keberhasilan yang tidak diverifikasi.** Pemeriksaan kesesuaian dulu terdegradasi secara diam-diam: tanpa interpreter yang mampu, mereka melewati semua verifikasi namun tetap mencetak vonis sesuai, dan teks tebal di dalam sebuah bidang bisa disalahartikan sebagai bidang yang hilang. Kini verifikator berakhir dengan vonis `UNVERIFIED` yang eksplisit setiap kali ia tidak dapat memverifikasi secara nyata. Verifikator tidak pernah melaporkan keberhasilan yang tidak ia periksa — kepercayaan pada gerbang adalah seluruh proposisinya, dan gerbang yang bisa melewati pemeriksaannya sendiri memutus rantai itu.

**Satu kontrak persetujuan untuk rencana Lite.** Tiga permukaan dulu menjawab pertanyaan "apakah memulai rencana ini menyetujui cakupannya saat ini?" dengan tiga cara berbeda, dan agen bisa macet atau berjalan tanpa otorisasi tepat di perbatasan paling berbahaya. v5 menetapkan satu kontrak di semua tempat: execute atau resume yang eksplisit menyetujui cakupan ready saat ini dan mencatat persetujuan itu sebelum melakukan pekerjaan apa pun; proposal yang masih menunggu dengan sendirinya tidak mengotorisasi apa pun; promosi yang terputus dipulihkan sebelum pekerjaan produk apa pun berjalan.

**Orkestrasi multi-repositori yang tidak merusak.** Override lingkungan dari hub orkestrator dulu bocor ke repositori anaknya — anak bisa menulis status rencana ke folder milik hub itu sendiri. Templat orkestrator juga mencetak `FAIL` sambil keluar dengan sukses, dan pemeriksaan kelengkapan yang men-grep sebuah string status bisa membaca satu tugas selesai sebagai satu rencana selesai. Kini akar hub disimpan sebelum menavigasi ke sub-repositori, setiap anak me-resolve `.dwp/` miliknya secara terisolasi, setiap cabang kegagalan keluar dengan galat, kelengkapan diurai dari status tingkat atas rencana, dan entrypoint devcontainer menyebarkan galat penyalinan sebelum menghapus apa pun.

**Satu matriks persetujuan untuk addon.** Addon mana yang terpasang secara bawaan, mana yang hanya ditawarkan, dan tinjauan mana yang wajib — permukaan sebelumnya menjawab berbeda-beda. v5 menyatakan satu matriks: AI Diff Reviewer wajib untuk tinjauan lokal, dipatok ke rilis yang terverifikasi, dengan tinjauan CI sebagai opt-in eksplisit yang tidak pernah memasang dirinya sendiri; addon design-system adalah penawaran wajib saat pekerjaan UI terdeteksi tetapi terpasang hanya dengan penerimaan eksplisit; addon dependency-upgrade hadir sebagai delegator inert yang nyaris bawaan dengan rollback snapshot eksak; dailybot hanya melapor di mana ia diotorisasi. Diff kosong tidak lagi dihitung sebagai tinjauan yang selesai.

**Perangkat nyata untuk rencana panjang.** Audit atas 108 rencana nyata menunjukkan bahwa pekerjaan yang dapat diparalelkan itu umum, tetapi keputusan sekuensial hampir tidak pernah dideklarasikan, dan stage gate hanya ada sebagai praktik improvisasi. v5 membuat keputusan eksekusi selalu dideklarasikan — sekuensial dengan alasan tercatat saat paralelisasi tidak tepat — menambahkan Stage Gates opsional untuk rencana dengan dua puluh tugas atau lebih, dan memperkaya Plan Variables dengan tingkat kekakuan, batas bukti, dan tindakan terlarang. Semuanya dimuat secara progresif dan tidak pernah membebani rencana Lite.

**Konteks diwajibkan, satu tujuan per tugas.** Rencana bisa menyimpang menjadi daftar tugas tanpa konteks, dan satu tugas bisa membungkus tiga tujuan di balik satu gerbang hijau. v5 mewajibkan pasangan Goal dan Context di tingkat rencana, sebuah Context per tugas — apa yang dibutuhkan sesi baru untuk memulai tugas itu sendirian — pada setiap catatan baru (catatan yang selesai tetap persis seperti ditulis), dan menjadikan satu tujuan per tugas aturan normatif dengan penjaga terhadap kemunduran.

**Jalur pembaruan yang aman.** `/dwp-upgrade` adalah baru. Fase pemeriksaannya hanya-baca dan tidak memasang apa pun; pembaruan hanya dimulai dari penerimaan eksplisit, dengan adaptasi lokal dibandingkan dan ditampilkan sebelum menimpa apa pun; instalasi menargetkan tag eksak dan memverifikasi dirinya sendiri; onboarding dijalankan ulang sebagai init yang segar. Pembaruan tidak pernah menyentuh `.dwp/` — tidak ada rencana, berkas status, catatan gerbang, atau bukti yang dimigrasikan, ditulis ulang, atau divalidasi ulang secara paksa.

**Bukti yang jujur dan terukur.** Klaim efisiensi kini diukur ulang pada tiga baseline — v3.0.0, v4.0.3, dan pohon final — dengan skrip pengukuran yang di-commit ke repositori. Hasil dilaporkan dalam bita sistem berkas dan tidak pernah dikonversi menjadi angka token atau biaya yang tidak bisa kami pertanggungjawabkan, dan setiap klaim yang tidak dapat diverifikasi dikarantina demikian dalam catatan evaluasi.

**Kontrak yang diberi versi dan dipublikasikan.** Setiap janji di atas didukung oleh data yang bisa dibaca alat lain, bukan hanya narasi: format plan-manifest dan plan-state kini diberi versi sebagai lini skema v5 — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) dan [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — sehingga sebuah rencana, verifikator, atau alat pihak ketiga dapat memeriksa kesesuaian terhadap kontrak yang dipublikasikan dan dapat dibaca mesin, bukan terhadap paragraf dokumentasi. Tidak ada yang berubah bentuk pada lini v5 dibanding v2: rencana yang sudah ada dan merujuk ke skema v1 atau v2 tetap valid dan tidak pernah ditulis ulang.

Deep Work Plan v5 mengikuti standar DWP 5.0.0. Baca [spesifikasi normatif](https://deepworkplan.com/spec), lihat [repositori skill](https://github.com/DailybotHQ/deepworkplan-skill), atau mulai adopsi dari [`/init`](https://deepworkplan.com/init).

## Pembaruan — 2026-09-17 · skill v5.4.0

Rilis titik pertama pada jalur v5 menutup satu-satunya jalan tersisa bagi sebuah rencana untuk selesai di atas pekerjaan yang tidak pernah benar-benar diperiksa, sekaligus menetapkan di mana bukti milik rencana itu berada. Standar DWP 5.0.0 tidak berubah: ini rilis kontrak add-on dan dokumentasi, bukan perubahan skema.

**Tinjauan yang tidak pernah berjalan tidak lagi sulit dibedakan dari tinjauan yang bersih.** Pemeriksaan keamanan Final Review sudah memisahkan peninjau yang hilang — dicatat sebagai temuan — dari pemanggilan yang gagal, yang memberi peringatan sekali lalu melanjutkan. Peninjau di hulu menambahkan hasil ketiga: eksekusi yang mulai lalu berakhir tanpa menuliskan satu pun temuan. Tanpa nama sendiri, ia melebur ke dalam "pemeriksaan selesai dan tidak menemukan apa pun", yang akan membiarkan sebuah rencana ditutup atas tinjauan yang tidak pernah terjadi. Kini ia menjadi keadaan tersendiri: dicatat sebagai tinjauan yang tidak lengkap, tidak pernah dihitung sebagai bukti bahwa himpunan perubahan bersih, dan tidak pernah menjadi alasan menutup Final Review. Tiga hasil yang berbeda — dan tidak satu pun berarti diff telah dibaca dan ternyata bersih.

**Bukti sebuah rencana adalah milik rencana itu.** Standar sudah menempatkan catatan analisis, buku skills, tinjauan keamanan, dan log gerbang di dalam `analysis_results/` milik rencana itu sendiri, tetapi tidak pernah menyatakan keeksklusifan itu sebagai aturan. Karena itu, alat audit milik repositori sendiri, yang jalur laporannya secara bawaan menunjuk direktori kerja, bisa menuliskan bukti sebuah rencana ke akar repositori tanpa ada alur yang menyadarinya. Spesifikasi kini mensyaratkannya: segala sesuatu yang dihasilkan sebuah alur tentang sebuah rencana masuk ke folder rencana itu, dan alat yang keluaran bawaannya adalah direktori kerja harus diberi opsi keluaran eksplisitnya. Bukti yang tidak berada di tempat yang disebut rencana adalah bukti yang hilang — itulah alasan praktis aturan ini, bukan selera penataan berkas.

**Patokan AI Diff Reviewer naik ke v2.3.0.** Tinjauan lokal wajib kini memasang peninjau yang memisahkan runner dari backend: tinjauan yang sama dapat berjalan terhadap endpoint mana pun yang kompatibel tanpa mengubah apa yang menjadi ketergantungan DWP — jaminan netralitas justru menguat, bukan melonggar. Ditambah pemasang terverifikasi checksum, biaya bawaan yang terukur alih-alih diduga, serta putaran lanjutan yang meninjau diff baru yang sebenarnya sambil membawa temuan yang belum selesai. Yang terakhir punya konsekuensi kontraktual yang layak dikatakan terus terang: klaim model sendiri bahwa sebuah temuan sudah selesai tidak menariknya — yang menariknya adalah seorang pemelihara.

**Prinsip kerja kini ikut terkirim bersama harness.** `v5.5.0`, di hari yang sama, membuat onboarding mengajari agent sebuah repositori *bagaimana* bekerja, bukan sekadar apa isi repositori itu: sepuluh perilaku ringkas — memiliki hasilnya, menyelidiki sebelum bertanya, memutuskan hal rutin secara mandiri, mengeskalasi ketika pertimbangan atau otorisasi memang tidak ada, dan memverifikasi sebelum mengklaim selesai, di antara yang lain — ditulis inline di `AGENTS.md`, tempat agent yang hanya membaca titik masuk akan menemukannya. Ini nilai bawaan dalam sebuah permintaan, bukan otoritas baru: keduanya tidak dapat menimpa izin host, cakupan yang lebih sempit, gerbang sebuah rencana, atau aturan persetujuan repositori itu sendiri. Pemutakhiran merekonsiliasinya berdasarkan makna, bukan kata kunci, sehingga aturan setara yang sudah ada dipertahankan alih-alih ditulis ulang.

**Patokan AI Diff Reviewer naik ke v2.3.1.** Skill `v5.5.1` memasang peninjau yang check, badan tinjauan, dan komentar pelacakannya selaras. Badan yang bertuliskan `Recommendation: approve` bukan bukti bahwa check lulus — baca blok Check status pada penanda pelacakan. Di bawah advisory, perbaikan yang dikuatkan dapat menarik temuan yang utasnya sudah dilipat, sehingga PR yang macet dapat menjadi hijau setelah perbaikan nyata.


Baca [spesifikasi](https://deepworkplan.com/spec) untuk teks normatifnya, [referensi add-on](https://deepworkplan.com/kit/ai-diff-reviewer) untuk apa yang kini dilakukan peninjau, atau [rilis v5.5.1](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1) untuk sumbernya.

## Pembaruan — 2026-09-25 · skill v5.5.3 + peninjau v3.1.1

Add-on AI Diff Reviewer sekarang mendokumentasikan dan memasang garis **v3** peninjau, dirilis pada 2026-09-24 (v3.0.0 → v3.1.1, pin bergerak `@v3`). Skill `v5.5.2` menulis ulang dokumen normatif add-on, hook onboarding, dan template integrasi di sekitar apa yang benar-benar dilakukan peninjau v3, dan `v5.5.3` mengirimkan sisi CI. Perubahan yang paling menahan beban, diverifikasi terhadap peninjau yang dirilis pada tag `v3.1.1`:

**Sebuah `critical` hanya menyaring ketika terverifikasi.** Sejak v3, setiap klaim kritis dari model — ditambah sampel 30 % dari peringatan — mendapat pemeriksaan kedua yang singkat berbasis kode oleh panggilan model terpisah (≈ 3 k token, 10 detik, dan $0.009 per temuan terverifikasi). Sebuah `critical` diterbitkan — dan memblokir Final Review — hanya ketika verifikator itu mengonfirmasinya; klaim yang dibantah tetap terlihat sebagai peringatan beranotasi dan didaftarkan dalam output terstruktur, tidak pernah inline. Tinjauan yang menghabiskan batas putarannya (`incomplete`) atau jam dindingnya (`timeout`) berwarna merah di bawah ketatan yang memblokir: "tanpa temuan" sekarang selalu berarti peninjau telah melihat dan tidak menemukan apa pun.

**Anggaran mengikuti tingkat risiko.** Anggaran tinjauan diturunkan dari tingkat risiko deterministik perubahan — 8/20/30/40 putaran dari `low` hingga `critical` — dan push yang tidak mengubah kode menjalankan satu putaran khusus verifikator dengan biaya −93 %. `budget-profile: fixed` memulihkan konstanta pra-v3 selama transisi; putaran inkremental memangkas token input 62–76 %.

**Enam sub-skill, salah satunya sebuah loop.** Router mendapatkan `address-review` (baru di v3.1.1): satu pemanggilan menemukan PR terbuka pada cabang, memeriksa bahwa tinjauan mencakup head saat ini, menyajikan temuan dengan rencana terapkan/tunda/lewati, lalu — dengan satu ya — menerapkan, melakukan commit dalam batch kecil Conventional Commits, push, dan melengkapi kembali peninjau sesuai cara repo memicunya. `apply-review` tetap hanya-baca; output terstruktur (`review-output/3.0`) adalah jalur mesin untuk otomasi apa pun. Garis `@v2` tetap dibekukan di `release/v2` dengan enam bulan pemeliharaan keamanan dan katalog — v3 adalah rekomendasi, bukan migrasi paksa.

**Peninjau kini meninjau rumahnya sendiri.** Repositori skill dan situs web ini sama-sama menjalankan tinjauan CI berbasis label — satu kaki grok via `DailybotHQ/ai-diff-reviewer@v3`, dipicu sekali per penerapan label `ready` (lepas dan pasang kembali label untuk menjalankan ulang), dengan skip yang jujur ketika secret penyedia tidak ada. Situs ini juga mem-vendorize peninjau v3.1.1, sehingga Final Review lokal dan dokumentasi kini mengajarkan kontrak yang sama.

Baca [spesifikasi](https://deepworkplan.com/spec), [referensi add-on](https://deepworkplan.com/kit/ai-diff-reviewer) untuk daftar lengkap kemampuan v3, [rilis v5.5.3](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3) untuk sumbernya, atau [rilis v3.1.1 peninjau](https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1) untuk apa yang berubah di upstream.
