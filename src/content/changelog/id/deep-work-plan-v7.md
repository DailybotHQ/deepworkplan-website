---
title: "DWP v7: rencana yang mendelegasikan, dengan catatan atas semuanya"
description: "Deep Work Plan v7 mempertahankan kontrak dan jurnal v6, memungkinkan rencana menyerahkan tugas terbatas ke agen lain, dan menambah empat addon opsional."
date: 2026-10-09
version: "v7 · Delegasi dengan bukti"
kind: release
lang: id
order: 0
featured: true
sourceLabel: "Kumpulan skema v7 yang diterbitkan"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
  - label: "Skill release v7.10.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.0"
  - label: "Skill release v7.10.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.1"
  - label: "Skill release v7.10.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.2"
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.1"
---

Deep Work Plan v7 mempertahankan metode v6: kontrak adalah otoritas, jurnal append-only adalah memori, penjadwal menentukan apa yang berjalan berikutnya, dan sebuah tugas baru ditutup ketika bukti yang tercatat memenuhi kriterianya. v7 menambahkan kemampuan mendelegasikan dan menjaga disiplin yang sama terhadap hasilnya.

Rencana yang memberikan `agent_delegation` dapat menandai sebuah tugas sebagai `parallel_safe` dan menyerahkannya ke agen lain. Balasan penerima delegasi dicatat sebagai data, bukan instruksi, dan tetap berstatus `asserted` sampai penjalankan gate milik rencana itu sendiri mengamati hasilnya. Hanya penjalankan gate yang menghasilkan bukti `observed`, sehingga delegasi memperluas jangkauan tanpa menurunkan standar penyelesaian.

Empat addon opsional mengubah delegasi menjadi otonomi yang praktis. Herdr menyerahkan tugas ke agen di sebuah panel, di mesin mana pun. Agentkit menempatkan satu perintah `ak` di atas semua agen pemrograman terminal, dengan otonomi secara default dan opsi untuk menonaktifkannya, serta menjalankan tugas terbatas tanpa antarmuka di dalam git worktree. Devcontainer memberi setiap repositori sebuah kontainer yang dapat direproduksi tanpa kunci SSH di dalamnya secara default (git melalui SSH lewat host agent; file kunci hanya jika memilih ikut serta secara eksplisit melalui `[ssh] copy_keys`). DeepWorkPlan Vim adalah editor terminal dengan penelusur rencana dan penampil Markdown. Masing-masing disematkan dengan tag ke produk yang memiliki repositori sendiri dan berfungsi tanpa Deep Work Plan. Sebuah repositori tetap sepenuhnya sesuai tanpa satu pun dari addon tersebut, dan registri di `.dwp/config.json` mencatat mana yang diaktifkan.

Mode benchmark dan pembelajaran mencatat apa yang diajarkan setiap rencana, sehingga temuan dapat dianalisis kemudian. Audit seluruh ekosistem, yang dijalankan sebagai rencana orkestrator v7 dengan satu agen per repositori, tidak menemukan regresi perilaku dibandingkan v6: rangkaian uji paket lulus 807 dari 807 pada lingkungan bersih, dan beban instruksi bertambah 0.1% hingga 3.9% per alur (4.6% untuk seluruh paket), diukur dalam byte pada kedua tag, bukan diperkirakan sebagai token.

v7 adalah lompatan dalam orkestrasi dan kemampuan audit, tetapi belum merupakan otonomi tanpa pengawasan sepenuhnya. Rilis 7.2.0 menutup celah yang ditemukan audit tersebut: benchmark dan pembelajaran kini mengukur rencana v7, memulai tugas sebelum prasyaratnya selesai ditolak, dan rangkaian pengujian berjalan secara hermetis (815 dari 815 pada lingkungan bersih). Non-inferioritas hasil agen belum diukur. Rencana yang ada mempertahankan generasi yang tercatat dan tidak pernah dimigrasikan secara implisit; rencana baru menggunakan kontrak v7 secara default.

Rilis 7.6.0 (2026-10-11) memperkenalkan orkestrasi berskala besar: satu jalur (lane) per repositori atau alur kerja, akun yang dipilih berdasarkan sisa kapasitas (`ak usage`, `ak pick`), peluncuran tanpa pengawasan, serta onboarding yang mendeteksi setiap addon, memperbarui yang sedang dipakai, dan menawarkan yang sesuai.

Rilis 7.7.0 (2026-10-12) menghadirkan otonomi swarm (Panduan §17): loop kapasitas (`shared/swarm.py`), paket serah terima (`dwp-handoff-v1`), suksesi lead dengan epoch dan fencing, permintaan antar-jalur, taksonomi eskalasi AGENT_PROTOCOL §7.5 (C1–C7: putuskan dan catat hal lainnya), standar kualitas (gerbang adalah hipotesis, diverifikasi bukan sekadar diklaim), dan pembelajaran metodologi dari 313 rencana yang dijalankan di 23 repositori. Batasan yang diketahui: jurnal v7 tidak memiliki event khusus untuk serah terima jalur atau suksesi lead (keduanya dicatat sebagai delegasi yang dibatalkan ditambah sebuah pengamatan).

Rilis 7.8.0 (2026-10-13) menetapkan Ecosystem 1.0: setiap produk yang diintegrasikan paket mencapai rilis stabil pertamanya dan disematkan pada v1.0.0 sesuai penomoran versi semantik (coding-agents-kit, herdr-peers, devcontainer-kit, dan deepworkplan-vim, masing-masing dengan digest `SHA256SUMS` terverifikasi), bersama sematan AI Diff Reviewer v3.3.14 dan Dailybot agent-skill v3.23.17; kemudian 7.8.1 (2026-10-14) menyematkan rilis patch v1.0.1 dari coding-agents-kit dan devcontainer-kit.

Rilis 7.9.0 (2026-10-25) mematok addon Herdr ke herdr-peers v1.1.0, yang sub-skill debat bawaannya memungkinkan lead menjalankan panel peer melalui beberapa putaran dan menutupnya dengan catatan keputusan, serta mematok AI Diff Reviewer di v3.3.16; CI paket kini menjalankan job batas minimum Python 3.9 di ubuntu-24.04.

Rilis 7.10.0 (2026-10-26) mengubah keputusan penting menjadi keputusan tim: dengan addon Herdr aktif dan herdr-peers 1.1.0 atau yang lebih baru digunakan, `create` merencanakan setiap keputusan penting — dua opsi layak dengan hasil yang berbeda secara material, sulit dibalik atau melintasi bagian, dan tidak diputuskan oleh apa pun di repositori — sebagai tugas keputusan yang didaftarkan, dan `execute` memimpin debat `decide` herdr-peers untuknya tanpa memberikan suara, mencatat setiap kursi dalam jurnal sebagai delegasi baca-saja, dan merekam pilihan bersama catatan keputusannya. Tanpa Herdr tidak ada yang berubah: prasyarat yang hilang atau debat yang gagal kembali ke catatan keputusan agen itu sendiri, dan `config.py decisions debate off` mengembalikan pertimbangan satu agen. Pin addon Dailybot berpindah ke agent-skill v3.23.20, rilis yang di-vendored.

Rilis 7.10.1 (2026-11-15) mematok addon Herdr ke herdr-peers v1.2.1, yang lini 1.2.x-nya menambahkan autopilot: daemon opsional yang hanya dijalankan oleh manusia, yang menerima opsi yang disarankan untuk setiap agen yang menunggu, mengikuti dialog multi-langkah sampai tuntas, dan tidak pernah menyentuh login atau konfirmasi pengabaian izin. Protokol 1 tidak berubah.

Rilis 7.10.2 (2026-11-15) memindahkan pin ekosistem mengikuti rilis hari itu: addon Herdr ke herdr-peers v1.2.2, patch yang hanya berisi perbaikan yang autopilot-nya kini menjawab pertanyaan yang ditampilkan dengan pratinjau di samping opsinya dan mengenali tanda rekomendasi dalam bahasa Spanyol, Prancis, Jerman, dan Italia; agentkit ke coding-agents-kit v1.2.0, yang `ak last`-nya melanjutkan sesi terbaru sebuah direktori kerja di terminal mana pun dan peluncurannya di dalam pane Herdr memulihkan pane itu setelah Herdr atau mesin dijalankan ulang; devcontainer-kit ke v1.1.2 dan deepworkplan-vim tetap v1.0.1; workflow release kini mencoba ulang push tag release untuk menyerap penolakan sementara.

Rilis 7.11.0 (2026-11-16) mendaratkan seri pengerasan v7 dari developer: glosarium daya tahan dan aturan kontrol yang terlihat masuk ke panduan, `verify` mendapat audit kepatuhan baca-saja untuk plan yang selesai, dokumen pack menyatakan klaim daya tahan dan token secara presisi, tagline README diganti dengan pemenang uji pemahaman, dan jalur create langsung menjaga bundle Lite dalam anggaran instruksinya.

Rilis 7.12.0 (2026-11-16) mendaftarkan plan ke loop herdr-peers: sebuah plan mengklaim kepemimpinannya dengan daftar penerus, sehingga `autopilot --loop` dan fleet UI dapat melihat setiap plan terbuka dan menjaganya berjalan sampai selesai, dan notifikasi Dailybot melaporkan capaian; deskriptor addon pindah ke herdr-peers v1.3.1 dan coding-agents-kit v1.3.0

Rilis 7.12.1 (2026-11-16) memperbaiki notifikasi Dailybot addon Herdr: ia kini menerima nama peristiwa `herdr-peers/plan-event-v1` yang dipancarkan herdr-peers, membatasi stdin notifikator pada 64 KiB, dan memetakan `plan_lead_moved`; deskriptor addon pindah ke coding-agents-kit v1.4.0, yang `ak update`-nya didokumentasikan hanya dipanggil oleh manusia.

Rilis skill yang dipasang: **7.12.1**, stabil sejak 7.0.0.
