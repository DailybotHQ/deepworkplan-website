---
title: Rencana Lite
description: "Rencana Lite: catatan tugas kompak dan dapat dieksekusi penuh, inline di README.md, pembuatan dan pemilihan format, serta promosi ke rencana Full."
order: 3
lang: id
section: Workflow
---

# Rencana Lite

**Versi 4.0.0. Status: Stabil.** Dokumen ini menetapkan representasi rencana Lite yang diperkenalkan bersama [Spesifikasi DWP](/spec/dwp-specification): sebuah format rencana untuk pekerjaan terbatas berskala kecil hingga menengah yang dimaterialisasikan secara langsung, tanpa tahap draf yang tidak dapat dieksekusi. Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

## Representasi dan siklus hidup

Sebuah rencana MUST berupa salah satu dari dua representasi, dicatat sekali di `manifest.json` sebagai `plan_format`: **Full** menyimpan satu berkas per tugas di bawah `<n>.task_<slug>.md`; **Lite** menyimpan catatan tugas yang kompak dan dapat dieksekusi secara inline di `README.md`, masing-masing di balik jangkar `{#task-N}` yang stabil. Sebuah rencana Lite bukanlah rencana Full yang sebagian atau informal: setiap catatan tugas MUST tetap membawa sebuah tujuan, sebuah Touched Surface, acceptance criteria, sebuah validation gate, dan sebuah log penyelesaian, dalam bentuk normatif yang sama seperti yang didefinisikan [Anatomi tugas](/spec/dwp-specification#task-anatomy) untuk Full.

Empat sumbu menggambarkan status sebuah rencana, dan MUST dilacak secara independen, bukan dicampuradukkan:

| Sumbu | Nilai | Makna |
|------|--------|---------|
| Format | `lite`, `full` | Di mana catatan tugas berada |
| Materialisasi | `materializing`, `ready`, `promoting` | Apakah folder rencana sedang ditulis, selesai, atau sedang dalam promosi |
| Persetujuan | `pending`, `approved`, `pre_approved` | Apakah seorang manusia meninjau rencana, atau mode trust menyetujuinya di muka |
| Eksekusi | `pending`, `in_progress`, `blocked`, `completed` | Kemajuan per-tugas dan keseluruhan |

Create terpandu menulis sebuah **proposal yang menunggu dan dapat ditinjau** — Lite atau Full, sudah menjadi rencana yang sesungguhnya, tidak pernah draf yang sekali pakai. Trust melakukan materialisasi sebuah rencana yang **siap dan telah disetujui di muka** dan segera mengembalikan kendali. `create` dan sebuah promosi tidak pernah mengeksekusi pekerjaan produk; permintaan `execute` atau `resume` yang eksplisit menyetujui cakupan saat ini yang siap dari rencana tersebut dan MUST mencatat persetujuan itu sebelum memulai pekerjaan; tanpa permintaan itu, proposal `pending` tidak dapat dieksekusi; promosi yang belum terselesaikan sedang berlangsung MUST dipulihkan sebelum pekerjaan produk.

## Pembuatan dan pemilihan format

`/dwp-create` melayani niat perencanaan pada setiap skala, tidak hanya pekerjaan besar. Pekerjaan kecil yang terbatas — satu concern tunggal, kira-kira satu sesi, tanpa koordinasi — adalah target rencana Lite; pekerjaan multi-langkah dengan cakupan nyata secara default menjadi Full, sesuai [Rigor proporsional](/spec/dwp-specification#proportional-rigor). Sebuah penyuntingan langsung, sebuah penjelasan, sebuah pemeriksaan status, sebuah resume, atau sebuah permintaan eksplisit tanpa rencana mempertahankan rutenya sendiri dan tidak pernah menjadi sebuah rencana.

`lite` dan `full` adalah **preferensi format**; `trust` dan `auto` adalah **opsi interaksi** yang terpisah, dan kedua jenis opsi tersebut MAY muncul di kedua ujung permintaan, dalam urutan apa pun:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Mengulangi opsi yang sama bersifat idempoten; meminta `lite` dan `full` bersamaan adalah sebuah kesalahan. `--` mengakhiri penguraian opsi.

Ketika tidak ada preferensi format yang diberikan, `create` merekomendasikan satu dan menjelaskan alasannya. Sebuah permintaan **Full** eksplisit selalu menang. Sebuah permintaan **Lite** eksplisit dihormati kecuali kebutuhan atau validation gate pekerjaan tidak akan muat dalam catatan inline yang kompak — dalam kasus itu `create` mencatat mengapa Full diperlukan sebagai gantinya. Pemilihan MUST mencatat cakupan yang diamati, dependensi, detail instruksi yang diperlukan, dan hal-hal yang tidak diketahui di balik pilihan tersebut — sebuah keputusan penilaian yang dapat diaudit, bukan jaminan yang berlaku di semua model atau agent.

## Promosi dan kompatibilitas

Sebuah rencana Lite MAY **dipromosikan** menjadi Full kapan saja, melalui `/dwp-refine promote {plan_name}` (lihat [dwp-refine](/kit/dwp-refine)). Promosi bersifat **hanya-representasi**: ia mencatat niat, menulis berkas tugas tujuan, memvalidasi bahwa setiap kebutuhan dan gate yang dibawa catatan Lite masih tercakup, mengalihkan salinan otoritatif dari catatan README inline ke berkas tugas, lalu menghapus penanda sedang-berlangsung. `execute` dan `resume` MUST menolak untuk melanjutkan selama penanda promosi masih ditetapkan. ID tugas dan bukti penyelesaian yang sudah tercatat MUST NOT ditulis ulang oleh sebuah promosi; cakupan baru yang ditemukan selama promosi melalui `refine` sebagai gantinya dan hanya membatalkan bukti yang terpengaruh olehnya.

Promosi tidak pernah berjalan secara otomatis ke arah sebaliknya: sebuah rencana Full tidak secara diam-diam dilipat kembali menjadi Lite. Sebuah rencana yang ditulis di bawah versi spec sebelumnya — termasuk sebuah rencana Full v1 tanpa bidang `plan_format` sama sekali — mempertahankan bentuk yang tercatat dan tetap konforman; sebuah sesi `refine` MAY memigrasikannya secara sengaja, tetapi tidak ada yang melakukannya secara implisit.

`plan_format` milik `manifest.json` tidak dapat diubah setelah ditulis; sebuah promosi mengubah `format` milik `state.json` dan menghapus penanda `promotion`-nya, dan tidak pernah menulis ulang manifest. Lihat [Status rencana](/spec/plan-state) untuk bidang `plan_format`, `format`, `materialization`, `approval`, `promotion`, dan `locator` yang tepat, beserta URL skema v2-nya.
