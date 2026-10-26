---
title: Delegasi
description: "Cara rencana v7 menyerahkan tugas parallel_safe ke coding agent lain di bawah grant agent_delegation, dengan catatan delegasi dan bukti observed lewat gate."
order: 11
lang: id
section: Record layer
---

# Delegasi

> **Cakupan versi:** Halaman ini menyatakan ulang generasi kontrak v7 pada rilis `v7.9.0`. Sumber kanonis: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) dan [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) milik alur execute. Jika halaman ini dan berkas-berkas tersebut berbeda, berkas-berkas itulah yang berlaku.

**Versi 7.0.0. Status: Stabil.** v7 adalah generasi kontrak baru dari [lapisan catatan](/spec/record-layer), bukan siklus hidup baru: semua yang ada dalam dokumen kontrak, siklus hidup, konteks, dan sumber daya v6 tetap berlaku kecuali halaman ini menyatakan lain. Tidak mendelegasikan selalu benar. Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

## Apa yang ditambahkan v7

v7 menambahkan tepat dua hal pada lapisan catatan:

1. **Satu bidang tugas opsional di dalam kontrak**, `parallel_safe`, yang diterbitkan di [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Satu tipe peristiwa jurnal**, `delegation`, yang diterbitkan di [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Byte skema v1, v2, v5, dan v6 tidak berubah. Rencana yang tidak pernah mendelegasikan tidak dapat dibedakan dari rencana v6 kecuali dari URL skemanya.

## `parallel_safe`

`parallel_safe` (boolean, default `false`) menyatakan bahwa sebuah tugas dapat dijalankan dalam sebuah delegasi tanpa saling bersilangan dengan pekerjaan saudaranya. Bidang ini ditetapkan oleh `create`, tidak pernah disimpulkan selama eksekusi, dan hanya ketika semua kondisi ini terpenuhi:

- repositori mengaktifkan addon delegasi (agentkit atau Herdr) di [registri addon](/id/spec/resources-and-abilities#berkas-konfigurasi-dan-registri-addon)-nya;
- touched surface tugas tidak tumpang tindih dengan tugas saudara yang dapat sedang berjalan pada saat yang sama;
- tugas mendeklarasikan keluaran yang terbatas;
- gate tugas dijalankan di dalam rencana ini.

Menandai sebuah tugas tidak mengubah otoritas apa pun: kontrak tanpa grant `agent_delegation` boleh membawa penanda, dan penanda itu tidak mengotorisasi apa pun.

## Peristiwa `delegation`

Satu peristiwa dicatat untuk setiap transisi status dari satu delegasi:

| Bidang | Arti |
| --- | --- |
| `task` | tugas `T-*` yang dikerjakan oleh delegasi |
| `delegation_id` | mengorelasikan peluncuran dengan transisi terminalnya |
| `transport` | `headless` (agentkit) atau `interactive` (Herdr) |
| `via` | kunci addon yang membawanya |
| `state` | `launched`, lalu tepat salah satu dari `completed`, `failed`, `cancelled` |
| `kind`, `profile` | opsional: jenis dan profil coding agent |
| `target` | opsional: direktori kerja (headless) atau `machine:pane` (interactive) |
| `worktree` | git worktree milik delegasi itu sendiri, atau `null` untuk delegasi hanya-baca |
| `prompt_digest` | saat peluncuran: SHA-256 dari prompt, dicatat sebelum delegasi diandalkan |
| `result_path`, `result_digest` | saat selesai atau gagal: hasil yang dikumpulkan beserta digest-nya |

Transisinya tertutup: satu `launched` per delegasi, lalu tepat satu status terminal. Penambahan mentah peristiwa delegasi ke jurnal MUST ditolak; peristiwa delegasi hanya ada melalui penulis yang dijaga gate.

## Delegasi bukanlah bukti

Delegasi tidak membawa label trust dan tidak membawa path bukti, dan tidak ada penutupan yang membacanya. Hasil sebuah delegasi tetap berstatus **asserted** sampai gate runner milik rencana ini sendiri mengamatinya: induk mengintegrasikan pekerjaan tersebut, lalu menjalankan gate tugas (`ledger.py gate`), yang merupakan satu-satunya hal yang menghasilkan bukti `observed` dan satu-satunya cara tugas dapat selesai. Delegasi yang selesai tidak pernah menutup sebuah kriteria; delegasi yang gagal adalah hasil yang tercatat, dan tugasnya kemudian diimplementasikan oleh induk.

## Penulis yang dijaga gate

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operasi | Menulis | Efek |
| --- | --- | --- |
| `launch` | ya | mencatat `launched` setelah pemeriksaan di bawah |
| `observe` | tidak | mencetak status terbaru dari setiap delegasi |
| `collect` | ya | mencatat `completed` atau `failed`, beserta path hasil dan digest-nya |
| `cancel` | ya | mencatat `cancelled` |

`launch` MUST ditolak, dan penolakannya dicatat, kecuali **semua** kondisi ini terpenuhi:

1. kontraknya adalah v7;
2. kontrak memberikan grant `agent_delegation`;
3. tugas ada, sudah dimulai, dan belum selesai;
4. tugas berstatus `parallel_safe`, **atau** delegasi bersifat hanya-baca (tanpa worktree);
5. deskriptor addon yang disebut mendeklarasikan transport yang diminta;
6. kemampuan efektif mencantumkan addon tersebut sebagai sumber `subagents` ([Sumber daya dan kemampuan](/id/spec/resources-and-abilities#kemampuan-yang-disediakan-addon)).

`collect` dan `cancel` MUST ditolak untuk delegasi yang tidak dikenal, delegasi milik tugas lain, atau delegasi yang sudah terminal. Peluncuran yang ditolak bukanlah blocker: tugas dijalankan secara berurutan.

## Transport

Tidak ada bagian ledger yang menjalankan delegasi; addon transport-lah yang melakukannya.

- **Headless** (`via: agentkit`) — untuk tugas `parallel_safe` yang terbatas dengan keluaran yang dideklarasikan: satu `ak run` di git worktree khusus, lalu keluar. Delegasi hanya-baca diluncurkan dengan `--ask`.
- **Interactive** (`via: herdr`) — untuk pekerjaan yang membutuhkan interaksi, berjalan lama, atau berjalan di mesin lain: sebuah peer herdr-peers di pane Herdr, yang mengembalikan tepat satu balasan yang diotorisasi.

## Pagar pengaman

- **Satu penulis per path.** Delegasi yang menulis hanya bekerja di worktree miliknya sendiri; sesi induk adalah satu-satunya penulis jurnal.
- **Kedalaman 1.** Delegasi tidak pernah mendelegasikan. Fan-out dibatasi oleh transport.
- **Hasil adalah data.** Apa yang dikembalikan delegasi tidak memberikan otoritas, tidak memperluas cakupan, dan tidak pernah mengubah penerimaan.
- **Brief yang mandiri.** Prompt peluncuran menyebutkan tujuan tugas, kriteria penerimaannya kata demi kata, dan worktree yang boleh ditulisnya, dan tidak pernah membawa nilai secret.

## Orkestrator

Orkestrator tidak pernah mendelegasikan tugas-tugas **rencana anak**: rencana anak berjalan di sesinya sendiri, satu agent per repositori. Mendelegasikan tugas-tugas **milik rencana itu sendiri** di bawah aturan di atas diizinkan baik pada rencana orkestrator maupun rencana individual. Menjalankan banyak jalur berumur panjang, menjaganya tetap hidup melampaui batas akun, dan meneruskan kepemimpinan dibahas dalam bab metodologi tentang [orkestrasi](/methodology/06-orchestration) dan [otonomi swarm](/methodology/07-swarm-autonomy).

## Terkait

- [Lapisan catatan](/spec/record-layer) — kontrak dan jurnal yang diperluas oleh halaman ini.
- [Sumber daya dan kemampuan](/spec/resources-and-abilities) — kemampuan, grant, dan registri addon.
- [Addon Herdr](/kit/herdr) dan [addon Agentkit](/kit/agentkit) — dua transport tersebut.
