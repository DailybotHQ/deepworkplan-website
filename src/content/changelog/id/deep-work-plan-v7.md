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
---

Deep Work Plan v7 mempertahankan metode v6: kontrak adalah otoritas, jurnal append-only adalah memori, penjadwal menentukan apa yang berjalan berikutnya, dan sebuah tugas baru ditutup ketika bukti yang tercatat memenuhi kriterianya. v7 menambahkan kemampuan mendelegasikan dan menjaga disiplin yang sama terhadap hasilnya.

Rencana yang memberikan `agent_delegation` dapat menandai sebuah tugas sebagai `parallel_safe` dan menyerahkannya ke agen lain. Balasan penerima delegasi dicatat sebagai data, bukan instruksi, dan tetap berstatus `asserted` sampai penjalankan gate milik rencana itu sendiri mengamati hasilnya. Hanya penjalankan gate yang menghasilkan bukti `observed`, sehingga delegasi memperluas jangkauan tanpa menurunkan standar penyelesaian.

Empat addon opsional mengubah delegasi menjadi otonomi yang praktis. Herdr menyerahkan tugas ke agen di sebuah panel, di mesin mana pun. Agentkit menempatkan satu perintah `ak` di atas semua agen pemrograman terminal, dengan otonomi secara default dan opsi untuk menonaktifkannya, serta menjalankan tugas terbatas tanpa antarmuka di dalam git worktree. Devcontainer memberi setiap repositori sebuah kontainer yang dapat direproduksi tanpa kunci SSH di dalamnya secara default (git melalui SSH lewat host agent; file kunci hanya jika memilih ikut serta secara eksplisit melalui `[ssh] copy_keys`). DeepWorkPlan Vim adalah editor terminal dengan penelusur rencana dan penampil Markdown. Masing-masing disematkan dengan tag ke produk yang memiliki repositori sendiri dan berfungsi tanpa Deep Work Plan. Sebuah repositori tetap sepenuhnya sesuai tanpa satu pun dari addon tersebut, dan registri di `.dwp/config.json` mencatat mana yang diaktifkan.

Mode benchmark dan pembelajaran mencatat apa yang diajarkan setiap rencana, sehingga temuan dapat dianalisis kemudian. Audit seluruh ekosistem, yang dijalankan sebagai rencana orkestrator v7 dengan satu agen per repositori, tidak menemukan regresi perilaku dibandingkan v6: rangkaian uji paket lulus 807 dari 807 pada lingkungan bersih, dan beban instruksi bertambah 0.1% hingga 3.9% per alur (4.6% untuk seluruh paket), diukur dalam byte pada kedua tag, bukan diperkirakan sebagai token.

v7 adalah lompatan dalam orkestrasi dan kemampuan audit, tetapi belum merupakan otonomi tanpa pengawasan sepenuhnya. Rilis 7.2.0 menutup celah yang ditemukan audit tersebut: benchmark dan pembelajaran kini mengukur rencana v7, memulai tugas sebelum prasyaratnya selesai ditolak, dan rangkaian pengujian berjalan secara hermetis (815 dari 815 pada lingkungan bersih). Non-inferioritas hasil agen belum diukur. Rencana yang ada mempertahankan generasi yang tercatat dan tidak pernah dimigrasikan secara implisit; rencana baru menggunakan kontrak v7 secara default.

Rilis 7.6.0 (2026-10-11) memperkenalkan orkestrasi berskala besar: satu jalur (lane) per repositori atau alur kerja, akun yang dipilih berdasarkan sisa kapasitas (`ak usage`, `ak pick`), peluncuran tanpa pengawasan, serta onboarding yang mendeteksi setiap addon, memperbarui yang sedang dipakai, dan menawarkan yang sesuai.

Rilis 7.7.0 (2026-10-12) menghadirkan otonomi swarm (Panduan §17): loop kapasitas (`shared/swarm.py`), paket serah terima (`dwp-handoff-v1`), suksesi lead dengan epoch dan fencing, permintaan antar-jalur, taksonomi eskalasi AGENT_PROTOCOL §7.5 (C1–C7: putuskan dan catat hal lainnya), standar kualitas (gerbang adalah hipotesis, diverifikasi bukan sekadar diklaim), dan pembelajaran metodologi dari 313 rencana yang dijalankan di 23 repositori. Batasan yang diketahui: jurnal v7 tidak memiliki event khusus untuk serah terima jalur atau suksesi lead (keduanya dicatat sebagai delegasi yang dibatalkan ditambah sebuah pengamatan).

Rilis 7.8.0 (2026-10-13) menetapkan Ecosystem 1.0: setiap produk yang diintegrasikan paket mencapai rilis stabil pertamanya dan disematkan pada v1.0.0 sesuai penomoran versi semantik (coding-agents-kit, herdr-peers, devcontainer-kit, dan deepworkplan-vim, masing-masing dengan digest `SHA256SUMS` terverifikasi), bersama sematan AI Diff Reviewer v3.3.14 dan Dailybot agent-skill v3.23.17; kemudian 7.8.1 (2026-10-14) menyematkan rilis patch v1.0.1 dari coding-agents-kit dan devcontainer-kit.

Rilis skill yang dipasang: **7.9.0**, stabil sejak 7.0.0.
