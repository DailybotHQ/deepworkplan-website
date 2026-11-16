---
title: Rekayasa loop (loop engineering)
description: "Semantik normatif loop v8: wewenang tercatat, kelanjutan oleh manusia, suksesi, pemblokir, antrean, notifikasi, visibilitas armada, dan batasnya."
order: 12
lang: id
section: Rekayasa loop
---

# Rekayasa loop (loop engineering)

Halaman ini menjelaskan kontrak loop engineering. **Rencana** adalah sumber wewenang; loop memberi kesinambungan tanpa memperluas wewenang tercatat.

## 1. Aturan v8
Rencana disetujui berjalan sampai selesai tanpa menunggu manusia. Otonomi berlaku **dalam wewenang rencana yang tercatat**. Manusia diberi tahu; login, kredensial, dan gate C1–C7 menghentikan kerja kecuali otorisasi awal tercatat. Aturan v7 tetap: metode inti berjalan sendiri.

## Semantik loop
### Registrasi dan pengamatan
Dengan Herdr, `execute` pack v8 mencatat lead dan penerus. Hanya rencana dengan catatan lead dan state yang dapat dibaca diamati. Manusia memulai `herdr-peers autopilot --loop`; daemon bukan item login atau layanan sistem.

### Kelanjutan dan pengambilalihan
Daemon hanya mem-prompt lead jika lima menit idle/selesai, tak ada lane bekerja atau balasan tertunda, pane di cakupan dan tidak dikecualikan, serta tak ada dialog/login/batas penggunaan/draf manusia. Prompt tetap meminta penyelesaian sesuai gate dan wewenang; prompt tidak memberi wewenang. Tiga prompt tanpa kemajuan mencatat `plan_stalled`; blocker dilaporkan, bukan diprompt. Jika lead hilang, daemon meminta penerus pertama yang terjangkau menjalankan `herdr-peers lead takeover --plan <id>`; daemon tidak menulis catatan atau memilih pane yang tak terdaftar. Batas penggunaan bukan bukti kehilangan. Protocol 2 hanya mengizinkan penunjukan setelah manusia menjalankan `lead claim --allow-appointment` dan daemon dimulai dengan `--appoint`. Sebelum merge/tag/release, lead menjalankan `herdr-peers lead verify --plan <id>`.

### Brain, peristiwa, armada
`--brain` opsional memilih dari daftar aksi tertutup; daemon satu-satunya aktor dan tidak menjalankan teks bebas. `autonomy` harus mengizinkannya. Loop merekam peristiwa; `--notify` mengirim `plan-event-v1` ke notifier, dan Dailybot pack menyampaikan peristiwa yang didukung. Peta armada dan `herdr-peers fleet ui` hanya baca. Lihat [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md) dan [protokol](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md).

## 2. Blok `autonomy`
Objek tertutup; bidang kanonis ada di [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Tanpa blok, gunakan default.

| Bidang | Nilai | Default |
|---|---|---|
| `stall_budget` | integer 1–10 | `3` prompt tanpa kemajuan |
| `promptable` | daftar alamat pane Herdr | lead saja |
| `notify` | daftar; kini `dailybot` | tanpa target, peristiwa tetap dicatat |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Alamat pane: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; ID mesin tidak diawali `-`. Bidang membatasi penerima, brain, dan antrean, bukan kriteria/gate.

## 3. Pemblokir dan kemajuan
`blocked`/`blocker` di `state.json` mencatat kelas C dan `resolver` opsional (`lead`/`human`, default `human`). `lead` berarti penyelesaian dalam wewenang tercatat tanpa kredensial, login, persetujuan, pembayaran, push ke main, release, atau penghapusan. Loop hanya meminta lead menangani blocker `lead`. Peta Herdr dapat menampilkan hingga 14 baris `PROGRESS.md` yang dibersihkan sebagai ringkasan, bukan skema header mesin; header rencana harus diverifikasi pada tag 8.0.0.

## 4. Antrean rencana
`.dwp/queue.json` memakai `dwp-queue-v1` dan hanya pack menulis. `create` menambah saat disetujui; manusia/lead mengurutkan; `execute` menandai `started` dengan alamat lead; finalisasi `done`; `create`/`refine` dapat menandai `skipped` dengan catatan. Item memuat `after` opsional. Satu rencana berjalan kecuali `parallel: true`. Daemon terbatas hanya-baca; antrean tidak valid dianggap kosong. `prompt-lead` mengirim: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon tidak menulis atau menjalankan `launch` tanpa kontrak rilis.

## 5. Yang dipertahankan v8
v8 mempertahankan `tasks[].parallel_safe`, delegation, journal, serta peristiwa journal v7. Lapisan record mempertahankan URL manifest/journal-event v7 dan hanya menambah `plan-contract/v8`. Rencana lama tidak dimigrasi diam-diam; Herdr opsional.
