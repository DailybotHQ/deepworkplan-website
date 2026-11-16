---
title: Rekayasa loop
description: "Cara daemon yang dimulai manusia menjaga Deep Work Plan yang disetujui tetap berjalan melalui pendaftaran, suksesi, pengingat, dan notifikasi sesuai kewenangan."
order: 8
lang: id
summary: Siklus penuh yang menjaga rencana disetujui tetap berjalan dalam kewenangan tercatatnya.
icon: repeat
---

# Rekayasa loop

**Spesifikasi lebih dahulu, loop tertutup: repositori adalah harness dan rencana berjalan sendiri hingga selesai.** Bab ini menjelaskan mekanisme opsional untuk melanjutkan rencana setelah giliran eksekusi pertama. Rencana tetap menjadi spesifikasi tahan lama; loop memberi kesinambungan, bukan kewenangan baru.

## Daftarkan rencana

Saat addon Herdr aktif, alur `execute` pack mengklaim catatan lead rencana dan mencatat suksesi. Catatan itu menetapkan rencana, lead saat ini, epoch, dan urutan penerus yang diamati loop. Rencana tanpa catatan lead tidak dipantau. Addon ini opsional; metodologi inti tetap berjalan dalam satu sesi atau lewat serah-terima yang dikoordinasikan manusia. Pendaftaran tidak menyetujui pekerjaan atau memperluas otorisasi. Dalam v8, rencana yang disetujui berjalan sampai akhir dalam kewenangan yang tercatat di rencana; kriteria penerimaan dan gates tetap berlaku.

## Manusia memulai daemon

Manusia memulai `herdr-peers autopilot --loop` di lingkungan Herdr. Ini daemon lokal di latar belakang, bukan item login atau layanan sistem. Daemon mengamati rencana terdaftar di mesin aktif dan mengingatkan lead yang idle untuk melanjutkan ketika rencana masih terbuka, tidak ada lane bekerja, dan tidak ada balasan tertunda. Prompt tetap meminta lead menyelesaikan rencana yang disetujui sambil mematuhi gates serta kewenangan tercatat.

Daemon tidak menyentuh login, kredensial, atau pengakuan bypass-permissions Claude. Daemon tidak memilih penolakan, menjalankan teks bebas dari layar, atau menciptakan izin. Pengingat hanya meminta agent melanjutkan; tidak menambah kewenangan. Lead tetap mencatat blocker dan mengikuti gates. Setelah tiga pengingat tanpa kemajuan, daemon berhenti mengingatkan dan melaporkan `plan_stalled`.

## Jaga kepemimpinan

Jika lead hilang, daemon meminta penerus pertama yang dapat dijangkau untuk menjalankan prosedur takeover. Epoch catatan bertambah dan penerima menegakkan urutan suksesi. Protocol 2 juga mendukung penunjukan lead, tetapi hanya setelah manusia mengizinkannya secara eksplisit pada rencana; daemon tidak dapat memberi izin itu sendiri. Sebelum merge, tag, atau release, lead saat ini menjalankan `herdr-peers lead verify --plan <id>` untuk memeriksa catatan di semua mesin rencana. Penerus mewarisi rencana dan gates tanpa kewenangan tambahan. Jika rencana mencapai gate yang memerlukan tindakan manusia menurut aturan C1–C7, loop melaporkan kebutuhan dan berhenti di sana. Kredensial dan login tetap ditangani manusia. Untuk kemajuan lain, manusia menerima notifikasi tanpa harus mengawasi tiap langkah.

## Brain dan antrean opsional

`--brain` opsional memulai agent keputusan khusus untuk kasus yang tak dapat diputuskan oleh aturan daemon. Brain hanya boleh memilih dari daftar tindakan tertutup yang diizinkan rencana. Daemon tetap satu-satunya pelaku: daemon memvalidasi pilihan dan menjalankan tindakan yang memenuhi syarat; teks bebas brain tidak pernah dijalankan. Tanpa otorisasi eksplisit dalam rencana, brain tidak bertindak atas rencana.

Antrean memakai dokumen `dwp-queue-v1` di `.dwp/queue.json`. Hanya pack yang menulis; daemon adalah konsumen berbatas yang hanya membaca. Rencana siap saat dependensi `after` selesai atau tidak ada dan persetujuan masih berlaku. Daemon memulainya hanya dengan mengirim prompt tetap kepada lead terdaftar: “Rencana P adalah berikutnya dalam antrean repositori ini dan telah disetujui; jalankan sampai selesai dengan mematuhi gates.” Loop ini tidak memulai entri `launch`. Pack mengelola status antrean selama eksekusi dan finalisasi.

## Laporkan dan amati

Peristiwa rencana mencatat antrean, mulai, terblokir, macet, kehilangan lead, dan selesai. Perintah opsional `--notify` menerima objek `plan-event-v1` untuk peristiwa yang didukung; notifier Dailybot dari pack mengubahnya menjadi pembaruan tim. Notifikasi melaporkan kemajuan atau blocker, bukan mengotorisasi tindakan atau menggantikan catatan rencana. Laporan armada dan `herdr-peers fleet ui` menampilkan agent serta rencana di berbagai mesin. UI hanya-baca: tidak menulis status rencana atau mengingatkan agent.

## Batasnya

Rekayasa loop menutup eksekusi di sekitar spesifikasi yang disetujui. Kelanjutan, suksesi, dan pelaporan menjadi rutin, sementara rencana tetap menjadi sumber kewenangan dan daemon tetap terbatas. Manusia memulai daemon, menangani kredensial dan login, serta menyelesaikan hanya gates C1–C7 rencana atau kebutuhan yang tak tercakup kewenangan tercatat. Tujuannya agar rencana yang disetujui mencapai akhir yang ditetapkan tanpa pengawasan manusia terus-menerus.
