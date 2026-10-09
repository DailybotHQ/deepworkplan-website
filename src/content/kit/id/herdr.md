---
title: Herdr
description: "Addon v7 opsional agar rencana dapat menyerahkan tugas ke coding agent lain di panel Herdr, di mesin mana pun, dan mencatat satu balasan yang diotorisasi."
kind: addon
lang: id
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) menempatkan coding agent di dalam panel, di mesin Anda dan di mesin yang dijangkaunya melalui SSH. Addon ini memungkinkan sebuah Deep Work Plan menggunakan agen-agen tersebut sebagai **rekan** (peer): sebuah rencana dapat menyerahkan tugas yang terbatas kepada agen di panel lain, menerima tepat satu balasan yang diotorisasi, dan menyimpan catatan pertukaran tersebut.

Ini adalah addon opsional dari **DWP v7 beta** (`v7.0.0-beta.1`, sebuah pra-rilis). Metodologinya bekerja sama saja tanpanya: jika addon tidak ada atau dinonaktifkan, setiap tugas berjalan di sesi saat ini, persis seperti sebelumnya.

## Apa yang diintegrasikan

Addon ini adalah integrator yang tipis. Pekerjaannya dilakukan oleh **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, sebuah skill MIT mandiri yang dipatok pada **`v0.1.0`** dan berguna tanpa Deep Work Plan. Skill ini mendefinisikan hal-hal yang dibiarkan terbuka oleh Herdr sendiri: siapa yang boleh menjawab, bagaimana jawaban menemukan jalan kembali lintas mesin, bagaimana dua agen menghindari saling menjawab tanpa henti, dan di mana catatan "saya bertanya, ia menjawab" disimpan.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protokol 1 |
| Kunci registri | `herdr` di `.dwp/config.json` |
| Transport | interaktif: rekan di panel Herdr |
| Menyediakan | `subagents`, `cancel_children` |
| Membutuhkan | izin `agent_delegation` dari kontrak rencana |

## Instalasi

Instal herdr-peers dan skill resmi Herdr yang menjadi dependensinya. Setiap mesin yang agennya perlu menjawab juga membutuhkan skill tersebut.

```bash
npx --yes skills add DailybotHQ/herdr-peers@v0.1.0 --skill herdr-peers -g -y
npx --yes skills add herdrdev/herdr@v0.9.3 --skill herdr -g -y
```

Persyaratan: Herdr 0.9.1 atau lebih baru, `bash`, dan `python3` 3.9 atau lebih baru (hanya pustaka standar). Onboarding menawarkan addon ini dan mencatat jawaban Anda di registri addon; addon ini tidak pernah diaktifkan tanpa persetujuan.

## Yang ditambahkan ke rencana

- **Delegasi ke rekan.** Pada rencana v7 yang kontraknya memberikan izin `agent_delegation`, `execute` dapat menyerahkan tugas `parallel_safe`, atau pertanyaan baca-saja, kepada agen di panel lain, di mesin ini atau mesin lain.
- **Satu balasan yang diotorisasi.** Permintaan membawa cap yang mengotorisasi tepat satu jawaban. Rekan membalas satu kali melalui helper, dan balasan tersebut membawa capnya sendiri.
- **Catatan sebelum diandalkan.** Setiap delegasi ditulis ke `analysis_results/delegations.ndjson` milik rencana sebelum balasannya digunakan, dan dipetakan ke peristiwa jurnal v7 `delegation`.
- **Hasil tetap berupa klaim sampai diperiksa.** Jawaban rekan adalah bukti `asserted` sampai penjalan gerbang (gate runner) milik rencana itu sendiri mengamatinya. Jawaban itu tidak pernah menutup tugas dengan sendirinya.

## Model keamanan

| Aturan | Artinya |
|---|---|
| Izin terlebih dahulu | Delegasi hanya berjalan ketika kontrak rencana memberikan izin `agent_delegation`. |
| Batas kedalaman 1 | Pesan yang dicap `depth=1` atau `reply-to=` tidak pernah dijawab, dan agen delegasi tidak pernah mendelegasikan lagi. |
| Batas fan-out | Paling banyak empat rekan per pemanggil secara default. |
| Data, bukan instruksi | Balasan tidak pernah memberikan otoritas yang belum dimiliki penerima. |
| Satu penulis per path | Rekan yang menulis bekerja di worktree git miliknya sendiri. |

herdr-peers tidak mengautentikasi pengirim: kolom `from=` dalam cap adalah sebuah klaim. Mitigasinya adalah daftar izin `HERDR_PEERS_SCOPE`, yang membatasi workspace dan mesin yang diterima oleh rekan.

## Herdr atau agentkit

Kedua addon mengimplementasikan antarmuka delegasi yang sama — `launch`, `observe`, `collect`, `cancel` — dengan transport yang berbeda.

| Situasi | Gunakan |
|---|---|
| Tugas `parallel_safe` yang terbatas dengan keluaran yang dideklarasikan | [agentkit](/kit/agentkit) (`ak run` headless di dalam worktree) |
| Tugas memerlukan interaksi, berjalan lama, atau berada di mesin lain | Herdr (rekan di panel) |

## Catatan

Opsional dan tidak pernah wajib. Sebuah repositori sepenuhnya konform tanpa addon opsional sama sekali, dan tidak ada alur yang bergantung pada addon ini. Perjalanan pulang-pergi dua panel lintas mesin dicakup oleh pengujian terhadap Herdr yang disimulasikan; rencanakan eksekusi pertama dengan pengawasan.
