---
title: Loop engineering
description: "Cara daemon yang dimulai manusia menjaga Deep Work Plan yang disetujui berjalan lewat registrasi, suksesi, dorongan, event, dan notifikasi sesuai wewenang."
order: 8
lang: id
summary: Siklus hidup menyeluruh yang menjaga rencana yang disetujui tetap berjalan dalam wewenang tercatatnya.
icon: repeat
---

# Loop engineering

**Spec-first, loop tertutup: repositori adalah harness dan rencana berjalan sendiri hingga selesai.** Bab ini menjelaskan mekanisme opsional yang menjaga rencana tetap berjalan setelah giliran eksekusi pertamanya. Rencana tetap menjadi spesifikasi yang tahan lama; loop memberi kesinambungan, bukan wewenang baru.

## Daftarkan rencana

Saat addon Herdr aktif, alur `execute` milik pack mengklaim catatan lead rencana (dan `resume` mengklaimnya lagi), serta menambahkan suksesi bila rencana menyebutkan penerus; failover hanya berfungsi untuk suksesi yang tercatat. Catatan itu memberi loop rencana yang pasti, lead saat ini, epoch, dan urutan penerus untuk diamati. Rencana tanpa catatan lead tidak dipantau. Addon tetap opsional: tanpanya, metodologi inti tetap berjalan dalam satu sesi atau melalui serah terima yang dikoordinasikan manusia.

Registrasi rencana tidak menyetujui pekerjaan atau memperluas otorisasi rencana. Dalam v8, rencana yang disetujui berjalan hingga akhir dalam wewenang yang tercatat di rencana itu. Kriteria penerimaan dan gate-nya tetap mengikat sepanjang eksekusi.

## Mulai daemon secara manual

Manusia memulai `herdr-peers autopilot --loop` di lingkungan Herdr. Ini adalah daemon latar belakang lokal, bukan item login atau layanan sistem. Daemon mengamati rencana terdaftar di seluruh mesin yang diaktifkan dan mendorong lead yang menganggur untuk melanjutkan selama rencananya masih terbuka, tidak ada lane yang bekerja, dan tidak ada balasan yang tertunda. Prompt-nya tetap: lanjutkan rencana yang disetujui hingga akhir sambil mematuhi gate dan wewenang tercatatnya.

Daemon tidak menyentuh login, prompt kredensial, atau konfirmasi bypass-permissions Claude. Daemon tidak pernah memilih penolakan, opsi teks bebas, atau baris yang memperluas izin agent. Dorongan hanya meminta agent melanjutkan; dorongan tidak menambah wewenang. Lead tetap mencatat hambatan dan mengikuti gate rencana. Setelah tiga prompt tanpa kemajuan, daemon berhenti mendorong dan melaporkan `plan_stalled`.

## Jaga kepemimpinan tetap berpagar

Jika lead hilang, daemon meminta penerus pertama dalam daftar yang dapat dijangkau untuk menjalankan prosedur pengambilalihan. Catatan lead maju per epoch, dan penerima menegakkan urutan suksesi. Protokol 2 juga mendukung penunjukan lead, tetapi hanya bila manusia telah mencatat izinnya pada rencana (`lead claim --allow-appointment`) dan memulai daemon dengan `--appoint`; daemon tidak dapat memberikan izin itu sendiri. Sebelum merge, tag, atau rilis apa pun, lead saat ini menjalankan `herdr-peers lead verify --plan <id>` untuk memeriksa catatan di seluruh mesin rencana.

Penerus mewarisi rencana dan gate-nya. Baik suksesi maupun penunjukan tidak mengubah kriteria penerimaan atau mengizinkan pekerjaan di luar wewenang tercatat. Jika rencana mencapai gate yang menuntut tindakan manusia menurut aturan C1–C7-nya, loop melaporkan kebutuhan itu dan berhenti di gate tersebut. Kredensial dan login juga tetap menjadi tindakan manusia. Untuk kemajuan lainnya, manusia diberi notifikasi alih-alih diminta mengawasi setiap langkah.

## Otak dan antrean opsional

`--brain` yang opsional memulai agent keputusan khusus untuk kasus yang tidak dapat diselesaikan aturan daemon. Fitur ini memerlukan coding-agents-kit 1.3.0 atau lebih baru; tanpanya, daemon yang dimulai dengan `--brain` menolak untuk berjalan. Otak hanya boleh memilih dari daftar tindakan tertutup yang ditetapkan daemon untuk setiap kasus: satu dorongan lagi, satu permintaan tetap kepada lead untuk menyelesaikan hambatan yang ditandai rencana sebagai dapat diselesaikan lead, memberi tahu manusia, atau membiarkannya. Daemon tetap satu-satunya pelaku: daemon memvalidasi pilihan dan menjalankan tindakan yang memenuhi syarat; teks bebas dari otak tidak pernah dieksekusi. Dalam v8, rencana juga mencatat di blok otonominya apakah otak boleh bertindak atasnya.

Antrean rencana memakai dokumen `dwp-queue-v1` di `.dwp/queue.json`. Alat rencana yang menulisnya; daemon adalah konsumen berbatas yang hanya membaca. Rencana dalam antrean memenuhi syarat saat dependensi `after`-nya selesai (atau tidak ada) dan persetujuannya masih berlaku. Daemon memulainya hanya dengan mengirim satu prompt tetap kepada lead yang disebut antrean: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Entri `launch` tidak diluncurkan oleh loop ini. Status antrean dikelola oleh pack seiring eksekusi dan finalisasi berjalan.

## Laporkan dan amati

Event rencana mencakup rencana yang macet, terblokir, kehilangan lead, atau selesai, serta rencana dalam antrean yang dimulai atau tidak dapat dimulai. Perintah opsional `--notify` menerima objek `plan-event-v1` untuk event yang didukung; notifier Dailybot milik pack mengubahnya menjadi pembaruan tim. Notifikasi melaporkan kemajuan atau hambatan; notifikasi tidak mengotorisasi tindakan atau menggantikan catatan rencana.

Laporan armada dan `herdr-peers fleet ui` menampilkan agent dan rencana di berbagai mesin, termasuk pekerjaan yang perlu perhatian. UI ini hanya-baca: tidak menulis status rencana dan tidak mengirim prompt ke agent mana pun. UI membantu manusia melihat keadaan loop tanpa menjadi bidang kendali tambahan.

## Batasnya

Loop engineering menutup loop eksekusi di sekitar spesifikasi yang disetujui. Ia menjadikan kelanjutan, suksesi, dan pelaporan sebagai rutinitas, sementara rencana tetap menjadi sumber wewenang dan daemon tetap terbatas. Manusia memulai daemon, menangani kredensial dan login, dan hanya menyelesaikan gate C1–C7 milik rencana itu sendiri atau kebutuhan lain yang tidak dapat dipenuhi wewenang tercatat. Tujuan loop adalah rencana yang disetujui mencapai akhir yang ditetapkan tanpa perlu diawasi manusia terus-menerus.
