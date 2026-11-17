---
title: Loop engineering
description: "Cara daemon yang dimulai manusia membawa Deep Work Plan yang disetujui hingga akhir: catatan lead, dorongan, hambatan terstruktur, suksesi, revive, antrean."
order: 8
lang: id
summary: Siklus hidup menyeluruh yang menjaga rencana yang disetujui tetap berjalan dalam wewenang tercatatnya.
icon: repeat
---

# Loop engineering

**Spec-first, loop tertutup: repositori adalah harness dan rencana berjalan sendiri hingga selesai.** Bab ini menjelaskan mekanisme opsional yang menjaga rencana tetap berjalan setelah giliran eksekusi pertamanya. Rencana tetap menjadi spesifikasi yang tahan lama; loop memberi kesinambungan, bukan wewenang baru.

Teks normatifnya ada di [spesifikasi loop engineering](/id/spec/loop-engineering). Bab ini adalah pendamping naratifnya: bab ini menelusuri siklus hidup secara berurutan dan menunjukkan bagaimana bagian-bagiannya saling terkait, tanpa mengulang setiap MUST.

## Mengapa loop

Dua pilar pertama DWP menyisakan satu celah. Perencanaan spec-first menyatakan *apa* yang harus dihasilkan sebuah episode dan bagaimana hal itu divalidasi. Repositori-sebagai-harness menyatakan *di mana* konteks, alat, dan gate berada. Tidak satu pun menyatakan *bagaimana pekerjaan selesai* ketika agent yang mengeksekusinya mengakhiri gilirannya, mencapai batas penggunaan, atau menutup pane-nya. Tanpa loop, rencana yang disetujui dan dispesifikasikan dengan baik tetap menunggu seseorang mengetik "lanjutkan".

Aturan v8 menutup celah itu. Rencana yang disetujui berjalan hingga selesai tanpa intervensi manusia rutin, dalam wewenang yang tercatat di rencana tersebut. Manusia diberi notifikasi, bukan ditunggu, kecuali ketika login atau kredensial diperlukan atau ketika salah satu gate C1–C7 milik rencana itu sendiri memerlukan masukan manusia yang tidak diotorisasi sebelumnya. Pada pengecualian tersebut, eksekusi berhenti di gate sampai masukan itu tiba.

Karena itu loop adalah mekanisme kelanjutan, bukan mekanisme persetujuan, dan sifatnya opsional: integrasi Herdr (herdr-peers `autopilot --loop`) memperkuat metode yang sudah berjalan dalam satu sesi.

## Siklus hidup sekilas

Satu rencana yang disetujui melewati tahap-tahap berikut. Masing-masing dijelaskan secara rinci di bawah.

| Tahap | Apa yang terjadi | Siapa yang bertindak |
|---|---|---|
| Setujui | Rencana disetujui; kontraknya mencatat wewenangnya dan, dalam v8, blok `autonomy` opsional | Manusia |
| Daftarkan | `execute` mengklaim catatan lead rencana (`resume` mengklaimnya lagi), dengan suksesi bila rencana menyebutkan penerus | Agent lead, melalui pack |
| Eksekusi | Lead bekerja tugas demi tugas terhadap kriteria penerimaan dan gate | Lead dan lane-nya |
| Menganggur | Pane lead tetap menganggur sementara rencana masih terbuka | — |
| Dorong | Daemon mengirim satu prompt lanjutkan yang tetap | Daemon |
| Blokir | Lead mencatat hambatan terstruktur dan berhenti; daemon tidak mengirim apa pun | Lead |
| Macet | Setelah 3 prompt tanpa kemajuan, rencana dicatat `plan_stalled` | Daemon mencatatnya |
| Failover | Penerus yang terdaftar mengambil alih; dengan izin, sebuah lane ditunjuk; dengan `--revive`, agent baru diluncurkan | Penerus, lane, atau agent yang dihidupkan kembali, melalui helper |
| Selesai | Penutupan rencana menandai item antreannya selesai; rencana berikutnya dalam antrean dapat dimulai | Lead; daemon memberi prompt kepada lead berikutnya |
| Beri notifikasi | Kemacetan, hambatan, lead yang hilang, penyelesaian, dan event antrean dikirim ke perintah `--notify` | Daemon menjalankan perintah itu |

## Setujui dan catat wewenang

Persetujuan terjadi sebelum loop terlibat, dan tidak ada apa pun dalam loop yang dapat menyetujui rencana, memperluasnya, atau menggantikan amandemen.

Dalam v8, kontrak rencana (`plan-contract/v8`) dapat memuat blok `autonomy` yang opsional dan tertutup. Tertutup berarti validator menolak kunci yang tidak dikenal, dan menolak blok itu pada generasi kontrak apa pun selain v8. Setiap kunci yang tidak ada memiliki tepat satu default yang tercatat, dan konsumen menerapkan default itu, bukan tebakannya sendiri.

| Kunci | Apa yang dicatatnya | Bila tidak ada |
|---|---|---|
| `stall_budget` | Prompt loop yang diizinkan tanpa kemajuan, bilangan bulat dari 1 sampai 10 | `3`, nilai yang sama dengan batas milik herdr-peers sendiri |
| `promptable` | Alamat pane yang boleh diberi prompt oleh loop | Hanya lead rencana |
| `notify` | Target notifikasi | Tanpa target; loop tetap mencatat |
| `brain` | Apakah otak boleh bertindak atas rencana ini | `false` |
| `queue` | Bagaimana rencana dimulai dari antrean: `prompt-lead`, `launch`, atau `none` | `none`; rencana tidak masuk antrean |

Dengan demikian, rencana tanpa blok `autonomy` mengambil pembacaan yang paling konservatif: manusia menyelesaikan setiap hambatan, hanya lead yang boleh diberi prompt, tidak ada yang diberi notifikasi, tidak ada otak yang bertindak, dan rencana tidak masuk antrean. Blok itu mempersempit atau menyebutkan apa yang boleh dilakukan loop untuk satu rencana; blok itu tidak pernah menambah wewenang yang belum dibawa oleh cakupan dan gate rencana.

## Daftarkan rencana

Saat addon Herdr aktif dan agent berjalan di dalam Herdr, alur `execute` milik pack menjalankan `herdr-peers lead claim --plan <id>` saat rencana dimulai, dan `resume` mengklaimnya lagi. Bila rencana menyebutkan penerus, klaim itu menambahkannya (`--succession`); failover hanya berfungsi untuk suksesi yang tercatat. Registrasi bersifat best-effort dan tidak pernah menjadi gate: klaim yang gagal memberi peringatan sekali dan eksekusi berlanjut.

Catatan lead (`lead-v1`, atau `lead-v2` bila memuat izin penunjukan) menyimpan rencana, lead saat ini, epoch, daftar `succession` yang berurutan, dan `lanes` rencana. Hanya peer yang memegang epoch tertinggi yang bertindak sebagai lead.

Daemon mengamati rencana hanya bila sebuah catatan lead menyebutkannya dan file status rencana (`state.json`) dapat dibaca. Rencana tanpa catatan lead tidak dipantau. Catatan lead tidak memberi wewenang apa pun dengan sendirinya: lane tetap bertindak dalam otorisasi rencana.

## Mulai daemon secara manual

Manusia memulai autopilot, dengan kata-katanya sendiri, dari dalam pane Herdr. Agent memulainya hanya bila manusianya memintanya secara langsung dalam sesi itu, tidak pernah karena pesan dari peer, rencana, atau brief mengatakannya.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Daemon latar belakang tidak bergantung pada pane yang memulainya, dan satu daemon mencakup setiap mesin Herdr yang diaktifkan; rencana di mesin lain dibaca melalui target SSH tersimpan milik setiap mesin dengan perintah tetap. Satu autopilot berjalan per server Herdr. herdr-peers sengaja tidak memasang item login atau layanan sistem: setelah reboot atau restart Herdr, manusia memulainya lagi dengan opsi yang sama.

Opsi yang penting bagi loop masing-masing merupakan pilihan eksplisit manusia:

| Opsi | Apa yang diaktifkannya |
|---|---|
| `--loop` | Menjaga setiap rencana terbuka yang terdaftar tetap berjalan hingga akhir |
| `--notify "<command>"` | Menjalankan perintah dengan objek `plan-event-v1` saat rencana macet, terblokir, kehilangan lead-nya, atau selesai, serta untuk event antrean |
| `--brain` | Agent keputusan khusus untuk sedikit kasus yang tidak dapat diselesaikan aturan |
| `--appoint` | Bertindak atas izin penunjukan yang tercatat saat lead dan setiap penerus hilang |
| `--revive` | Meluncurkan satu agent baru untuk rencana yang tidak dapat diambil alih oleh siapa pun dalam catatannya |
| `--dry-run`, `--scope`, `--exclude` | Melihat keputusan tanpa mengirim; membatasi mesin; menjauhkan sebuah pane dari jangkauan |

## Menganggur bukan berarti berhenti

Daemon meminta lead melanjutkan hanya bila rencana terbuka dan semua hal berikut terpenuhi: pane lead menganggur atau selesai dan tidak berubah selama 5 menit; tidak ada lane rencana yang bekerja dan lead tidak menunggu balasan; layarnya bukan dialog, login, atau batas penggunaan; baris inputnya tidak memuat draf manusia; lead mengambil giliran sendiri sejak prompt terakhir; dan lead menerima kurang dari 3 prompt dalam satu jam terakhir.

Prompt-nya tetap. Hanya id rencana yang diisi:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Dorongan hanya meminta; dorongan tidak pernah mengotorisasi. Daemon hanya memberi prompt kepada lead, karena lane digerakkan oleh lead-nya. Setelah 3 prompt loop tanpa kemajuan dalam status rencana, rencana dicatat `plan_stalled` dan dibiarkan sampai statusnya berubah. Lead dengan beberapa rencana terbuka menerima satu prompt per putaran.

## Hambatan terstruktur

Rencana v8 mencatat alasan rencana tidak dapat berlanjut sebagai data, sehingga loop, peta armada, dan agent yang melanjutkan membaca kolom yang sama alih-alih menafsirkan prosa. Hambatan diajukan dengan helper ledger (`ledger.py block`) dan diselesaikan dengan `ledger.py unblock`, sebagai event `blocker` dari `journal-event/v8`. Penambahan mentah event hambatan ditolak.

| Kolom | Arti |
|---|---|
| `task` | Tugas yang terblokir; tugas yang sudah ditutup oleh buktinya tidak dapat diblokir |
| `reason` | Mengapa tugas tidak dapat berlanjut (paling banyak 1000 karakter) |
| `needs` | Satu baris yang menyatakan apa yang membuka blokirnya (paling banyak 500 karakter) |
| `class` | Wajib: salah satu dari C1–C7 |
| `resolver` | Opsional: `lead` atau `human`; bila tidak ada dibaca sebagai `human` |

`resolver: "lead"` berarti hambatan dapat diselesaikan dalam wewenang tercatat rencana tanpa kredensial, login, persetujuan, pembayaran, push ke main, rilis, atau penghapusan. Nilai ini ditolak untuk C1, C2, C5, dan C6. Paling banyak satu hambatan aktif per rencana, dan selama hambatan itu belum diselesaikan, tugasnya tidak dapat diselesaikan.

Pembaca menemukan hambatan di `state.json` rencana, yang berformat `plan-snapshot/v8`: hambatan aktif atau `null`, dengan `blocked` sebagai status tugas turunan. `PROGRESS.md` dibuka dengan empat baris header tetap, yang diperbarui pada setiap transisi:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

Loop memperlakukan rencana yang terblokir dengan menahan diri. Loop tidak mengirim apa pun kepadanya dan mencatat `plan_blocked` sekali. Baik daemon maupun otaknya tidak boleh meminta lead menyelesaikan hambatan yang tidak ditandai rencana dengan `resolver: "lead"`; semua yang lain menunggu manusia. Rencana generasi sebelumnya (v6 dan v7) tidak mencatat event hambatan, dan setiap hambatan yang dilaporkannya adalah milik manusia.

## Apa yang tidak pernah dilakukan daemon

Daemon tidak pernah:

- menyentuh prompt login, sign-in, kunci API, atau kode perangkat, atau konfirmasi bypass-permissions Claude; manusia yang melakukan sign-in;
- memilih baris penolakan, baris teks bebas, atau baris yang memperluas izin tetap agent;
- memberi prompt ke pane yang baris inputnya memuat draf manusia, atau pane di luar cakupannya;
- memberi prompt ke rencana yang terblokir, atau rencana yang statusnya tidak dapat dibacanya;
- menulis atau menyunting catatan lead, mengirim pesan protokol, atau menunjuk pane yang tidak ada dalam catatan;
- menulis antrean rencana.

Dialog izin yang setiap barisnya menolak atau memperluas izin akan ditolak, tidak pernah dibiarkan terblokir, lalu agent diberi tahu sekali untuk melanjutkan dengan cara lain dalam gate rencananya atau mencatat hambatan. Pertanyaan agent sendiri yang semua barisnya menolak dibiarkan untuk manusia, karena itu adalah keputusan tentang pekerjaan.

## Kepemimpinan: epoch, suksesi, dan pengambilalihan

Kepemimpinan dipagari oleh epoch. Setiap perubahan yang memindahkan lead (serah terima, pengambilalihan, pelepasan, penunjukan) menaikkan epoch, dan hanya pemegang epoch tertinggi yang bertindak sebagai lead. Mantan lead yang kembali menemukan epoch yang lebih tinggi, verb lead-nya ditolak, dan notifikasi lead berikutnya membuatnya mundur.

Bila lead hilang (pane-nya tidak ada dalam dua daftar berturut-turut), daemon meminta alamat pertama yang dapat dijangkau dalam `succession` catatan untuk menjalankan `herdr-peers lead takeover --plan P`, sekali per epoch. Daemon tidak memberikan alasan, sehingga pemeriksaan milik helper sendiri yang memutuskan apakah lead benar-benar hilang. Lead yang mencapai batas penggunaannya tidak dianggap hilang: daemon mencobanya lagi setiap 30 menit. Bila tidak ada seorang pun dalam suksesi yang dapat dimintai, daemon mencatat `plan_no_lead`.

Penerus mewarisi rencana, kriteria penerimaannya, dan gate-nya. Suksesi mengubah siapa yang mengeksekusi, tidak pernah apa yang diotorisasi.

## Penunjukan dan revive

Ada dua jalur lagi untuk rencana yang lead dan penerusnya semuanya hilang. Masing-masing memerlukan tindakan eksplisit manusia dan menyerahkan pengambilalihan kepada agent itu sendiri, diperiksa oleh helper.

**Penunjukan (protokol 2).** Jalur ini memerlukan dua tindakan manusia: izin yang dicatat pada catatan lead (`lead claim --allow-appointment`, dijalankan oleh lead hanya atas perkataan manusianya) dan daemon yang dimulai dengan `--appoint`. Daemon tidak dapat memberikan izin itu kepada dirinya sendiri. Bila lead dan setiap penerus telah hilang pada dua pengamatan yang berjarak setidaknya 15 menit tanpa kemajuan, daemon meminta lane hidup pertama milik rencana untuk menjalankan `lead takeover --plan P --as-lane`. Helper itu memeriksa izin lagi, memastikan bahwa itu adalah lane yang bekerja di repositori rencana, dan memeriksa lead, setiap penerus, dan setiap lane sebelumnya dua kali, berselang satu menit; tanda kehidupan apa pun menyebabkan penolakan. Paling banyak dua penunjukan diizinkan per rencana.

**Revive (herdr-peers 2.2.0).** Memulai daemon dengan `--loop --revive` itu sendiri merupakan izinnya. Bila lead rencana dan setiap anggota suksesi serta lane-nya hilang dan tidak ada yang dapat mengambil alih, daemon dapat meluncurkan satu agent baru di checkout rencana, menulis tiket sekali pakai, dan memberinya brief untuk menjalankan `lead takeover --plan P --reason revive`. Helper menerima pengambilalihan itu hanya dengan tiket tersebut dan hanya setelah pemeriksaannya sendiri mendapati setiap anggota hilang; catatan yang dihidupkan kembali hanya diadopsi di mesin daemon. Rencana macet yang lead-nya masih hidup tidak pernah diambil darinya: lead diminta sekali untuk menyerahkannya. Revive dibatasi satu per rencana per 6 jam, dua per rencana secara keseluruhan, dan dua per jam di seluruh armada.

**Verifikasi sebelum langkah yang tidak dapat dibatalkan.** Lead yang ditunjuk atau dihidupkan kembali, seperti lead mana pun, menjalankan `herdr-peers lead verify --plan <id>` sebelum merge, tag, atau rilis apa pun. Perintah ini menolak bila mesin lain menunjukkan rencana pada epoch yang lebih tinggi, dan keluar dengan kode bukan nol bila salah satu mesin rencana tidak dapat dijangkau.

## Otak opsional

Aturan daemon memutuskan hampir segalanya. Untuk sedikit kasus yang tidak dapat diputuskannya, `--brain` mempertahankan satu agent keputusan khusus yang diluncurkan daemon sendiri, dalam mode ask, dan dipatuhi hanya dalam daftar tindakan tertutup. Fitur ini memerlukan coding-agents-kit 1.3.0 atau lebih baru; tanpanya, daemon yang dimulai dengan `--brain` menolak untuk mulai alih-alih berjalan tanpa otak yang diminta.

| Kasus | Tindakan yang diizinkan |
|---|---|
| Rencana macet | Satu dorongan lagi (sekali per rencana), memberi tahu manusia, atau membiarkannya |
| Rencana terblokir dengan `resolver: "lead"`, kelas yang boleh ditangani lead (C3, C4, C7), dan tanpa subjek sensitif | Satu permintaan tetap kepada lead untuk menyelesaikannya dalam wewenang tercatat, memberi tahu manusia, atau membiarkannya |
| Agent menunggu di layar yang tidak dikenali daemon | Memberi tahu manusia, atau membiarkannya |

Bila tidak ada jawaban valid yang tiba dalam 3 menit, defaultnya adalah membiarkan kasus itu. Teks otak tidak pernah diketik, ditekan sebagai tombol, atau dijalankan; otak tidak dapat menunjuk lead, meluncurkan agent, melakukan merge, merilis, sign-in, atau mengubah izin. Daemon tetap satu-satunya pelaku. Dalam v8, `autonomy.brain` milik rencana mencatat apakah otak boleh bertindak atas rencana itu sama sekali.

## Antrean rencana

Repositori dapat menyimpan antrean rencana yang disetujui di `.dwp/queue.json`, dengan skema `dwp-queue-v1`. Pack (`shared/queue.py`) atau manusia yang menulisnya; daemon hanya membacanya, secara berbatas dan divalidasi utuh. Create menambahkan rencana saat disetujui bila developer meminta untuk memasukkannya ke antrean (atau bila kontrak v8 mencatat `autonomy.queue` selain `none`); manusia atau lead mengurutkannya ulang; execute menandai item `started` saat rencana dimulai di bawah lead-nya, dan `done` setelah penutupan rencana. Antrean memuat paling banyak 64 item. Dependensi bersifat internal antrean: `after` menyebutkan rencana yang sudah ada dalam antrean. Satu rencana berjalan pada satu waktu per repositori kecuali antrean memuat `parallel: true`.

Dengan `--loop`, ketika rencana saat ini di sebuah repositori selesai, item siap berikutnya dimulai dengan satu prompt tetap kepada lead yang disebut antrean: "Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates." Sebuah item siap hanya bila rencana `after`-nya selesai, tidak ada rencana lain di repositori itu yang sedang berjalan, item itu menyebutkan lead, dan persetujuannya masih merupakan event persetujuan-atau-amandemen terbaru rencana untuk kontrak yang berlaku. Entri `launch` tidak dimulai oleh loop; seperti item yang belum disetujui atau lead yang tidak ada, entri itu dilaporkan sebagai `queue_blocked`. Antrean yang rusak dibaca sebagai kosong dan tidak pernah merusak siklus hidup rencana.

## Event, notifikasi, dan peta armada

Daemon melaporkan event rencana sebagai satu objek JSON `plan-event-v1` pada input standar perintah `--notify`: event, rencana, mesin, lead, repositori, dan kelas hambatan. Event mencakup `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved`, dan `plan_completed`, sekali per rencana dan situasi, serta `plan_queued_started`, `queue_blocked`, event penunjukan dan revive, dan `needs_human` dari otak. Kegagalan dicatat dan tidak pernah menghentikan putaran.

Addon Herdr milik pack menyertakan notifier Dailybot (`scripts/notify-dailybot.py`) yang mengubah event selesai, macet, terblokir, tanpa lead, dan lead berpindah menjadi satu pembaruan tim yang mudah dibaca manusia melalui CLI Dailybot yang terpasang. Notifier keluar tanpa pesan bila CLI tidak ada, belum login, atau pengiriman gagal. Notifikasi melaporkan kemajuan atau kebutuhan; notifikasi tidak pernah mengotorisasi tindakan atau menggantikan catatan rencana.

Untuk mengamati loop, `herdr-peers plans` mencetak rencana satu mesin (`plans-v1`), dan `herdr-peers fleet` mencetak peta gabungan (`fleet-v1`): mesin, agent, rencana, dan peran setiap agent sebagai lead, penerus, atau lane. `herdr-peers fleet ui` menampilkan peta secara langsung, dikelompokkan menurut rencana, repositori, mesin, atau antrean, dengan tampilan untuk apa yang perlu perhatian, apa yang aktif, menunggu, atau selesai. UI ini hanya membaca: tidak menulis status rencana dan tidak memberi prompt ke agent mana pun.

## Contoh kerja: satu rencana semalaman

Panduan berikut bersifat ilustratif; setiap langkah mengikuti aturan terdokumentasi di atas.

1. Pada malam hari developer menyetujui rencana dengan blok `autonomy` yang mempertahankan default kecuali `notify`. Agent menjalankan `execute`, yang mengklaim catatan lead dengan satu penerus.
2. Developer memulai `herdr-peers autopilot start --loop --notify "<notifier>"` lalu offline.
3. Lead menyelesaikan tiga tugas dan mengakhiri gilirannya. Lima menit kemudian, tanpa lane yang bekerja dan tanpa balasan yang tertunda, daemon mengirim prompt lanjutkan yang tetap, dan lead melanjutkan pada tugas berikutnya.
4. Sebuah tugas memerlukan secret yang tidak dimiliki rencana. Lead mengajukan hambatan C1 tanpa resolver (dibaca sebagai `human`) dan berhenti. Daemon tidak mengirim apa pun ke rencana, mencatat `plan_blocked`, dan notifier mengirim satu pembaruan tim yang menyebutkan kelas hambatan.
5. Pada pagi hari developer memberikan masukan, lead menyelesaikan hambatan dengan `ledger.py unblock`, dan eksekusi berlanjut. Kemudian pane lead tertutup; setelah dua daftar tanpa pane itu, daemon meminta penerus menjalankan `lead takeover`, epoch maju, dan penerus melanjutkan di bawah gate yang sama.
6. Sebelum merge akhir rencana, lead baru menjalankan `lead verify`. Rencana selesai, `plan_completed` mencapai notifier, dan jika repositori memiliki antrean, lead rencana disetujui berikutnya menerima prompt antrean yang tetap.

Tidak sekali pun daemon menyetujui apa pun, mengetik kredensial, atau memutuskan pekerjaan apa yang seharusnya dilakukan.

## Batas wewenang

Loop berhenti tepat di tempat wewenang rencana berhenti. Kelas eskalasi protokol agent menandai garis itu: C1 wewenang (tindakan di luar otorisasi rencana, di titik persetujuan, atau yang melibatkan secret), C2 layar persetujuan (layar izin, login, kredensial, atau pembayaran, tidak pernah ditekan oleh agent), C3 ambiguitas yang tidak dapat direduksi, C4 gate yang tidak dapat lolos tanpa melemahkannya, C5 kerusakan, C6 ketentuan, dan C7 kapasitas yang habis. Bila salah satunya muncul tanpa otorisasi sebelumnya, eksekusi berhenti di gate dan kebutuhannya dicatat serta dilaporkan.

Login dan kredensial selalu tetap menjadi tindakan manusia. Manusia memulai daemon, memberikan penunjukan atau revive secara eksplisit, dan menyelesaikan kebutuhan yang tidak dapat dipenuhi wewenang tercatat. Untuk hal lainnya, manusia diberi notifikasi alih-alih diminta mengawasi setiap langkah.

## Bekerja tanpa addon

Semua ini tidak wajib. Tanpa Herdr, atau dengan addon dinonaktifkan, pack berperilaku seolah loop tidak ada: rencana dieksekusi dalam satu sesi, dilanjutkan dengan `resume` dari tugas terbuka pertamanya, atau diserahkan ke agent lain melalui serah terima yang dikoordinasikan manusia. Kontrak rencana, hambatan terstruktur, dan header `PROGRESS.md` bekerja dengan cara yang sama, sehingga manusia atau agent lain membaca status yang sama yang akan dibaca loop.
