---
title: "DWP v7: rencana yang mendelegasikan, dengan catatan atas semuanya"
description: "Deep Work Plan v7 mempertahankan kontrak dan jurnal v6, memungkinkan rencana menyerahkan tugas terbatas ke agen lain, dan menambah empat addon opsional."
date: 2026-10-10
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
---

Deep Work Plan v7 mempertahankan metode v6: kontrak adalah otoritas, jurnal append-only adalah memori, penjadwal menentukan apa yang berjalan berikutnya, dan sebuah tugas baru ditutup ketika bukti yang tercatat memenuhi kriterianya. v7 menambahkan kemampuan mendelegasikan dan menjaga disiplin yang sama terhadap hasilnya.

Rencana yang memberikan `agent_delegation` dapat menandai sebuah tugas sebagai `parallel_safe` dan menyerahkannya ke agen lain. Balasan penerima delegasi dicatat sebagai data, bukan instruksi, dan tetap berstatus `asserted` sampai penjalankan gate milik rencana itu sendiri mengamati hasilnya. Hanya penjalankan gate yang menghasilkan bukti `observed`, sehingga delegasi memperluas jangkauan tanpa menurunkan standar penyelesaian.

Empat addon opsional mengubah delegasi menjadi otonomi yang praktis. Herdr menyerahkan tugas ke agen di sebuah panel, di mesin mana pun. Agentkit menempatkan satu perintah `ak` di atas semua agen pemrograman terminal, dengan otonomi secara default dan opsi untuk menonaktifkannya, serta menjalankan tugas terbatas tanpa antarmuka di dalam git worktree. Devcontainer memberi setiap repositori sebuah kontainer yang dapat direproduksi tanpa kunci SSH di dalamnya. DeepWorkPlan Vim adalah editor terminal dengan penelusur rencana dan penampil Markdown. Masing-masing disematkan dengan tag ke produk yang memiliki repositori sendiri dan berfungsi tanpa Deep Work Plan. Sebuah repositori tetap sepenuhnya sesuai tanpa satu pun dari addon tersebut, dan registri di `.dwp/config.json` mencatat mana yang diaktifkan.

Mode benchmark dan pembelajaran mencatat apa yang diajarkan setiap rencana, sehingga temuan dapat dianalisis kemudian. Audit seluruh ekosistem, yang dijalankan sebagai rencana orkestrator v7 dengan satu agen per repositori, tidak menemukan regresi perilaku dibandingkan v6: rangkaian uji paket lulus 807 dari 807 pada lingkungan bersih, dan beban instruksi bertambah 0.1% hingga 3.9% per alur (4.6% untuk seluruh paket), diukur dalam byte pada kedua tag, bukan diperkirakan sebagai token.

v7 adalah lompatan dalam orkestrasi dan kemampuan audit, tetapi belum merupakan otonomi tanpa pengawasan sepenuhnya. Siklus benchmark dan pembelajaran belum mengukur rencana v7 secara otomatis, dan non-inferioritas hasil agen belum diukur. Rencana yang ada mempertahankan generasi yang tercatat dan tidak pernah dimigrasikan secara implisit; rencana baru menggunakan kontrak v7 secara default.

Rilis skill yang dipasang: **7.1.4**, stabil sejak 7.0.0.
