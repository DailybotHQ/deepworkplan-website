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

### 1.1. Semantik loop
#### Registrasi dan pengamatan
Dengan Herdr, `execute` pack v8 mencatat lead dan penerus. Hanya rencana dengan catatan lead dan state yang dapat dibaca diamati. Manusia memulai `herdr-peers autopilot --loop`; daemon bukan item login atau layanan sistem.

#### Kelanjutan dan pengambilalihan
Daemon hanya mem-prompt lead jika lima menit idle/selesai, tak ada lane bekerja atau balasan tertunda, pane di cakupan dan tidak dikecualikan, serta tak ada dialog/login/batas penggunaan/draf manusia. Prompt tetap meminta penyelesaian sesuai gate dan wewenang; prompt tidak memberi wewenang. Tiga prompt tanpa kemajuan mencatat `plan_stalled`; blocker dilaporkan, bukan diprompt. Jika lead hilang, daemon meminta penerus pertama yang terjangkau menjalankan `herdr-peers lead takeover --plan <id>`; daemon tidak menulis catatan atau memilih pane yang tak terdaftar. Batas penggunaan bukan bukti kehilangan. Protocol 2 hanya mengizinkan penunjukan setelah manusia menjalankan `lead claim --allow-appointment` dan daemon dimulai dengan `--appoint`. Sebelum merge/tag/release, lead menjalankan `herdr-peers lead verify --plan <id>`.

#### Brain, peristiwa, armada
`--brain` opsional memilih dari daftar aksi tertutup; daemon satu-satunya aktor dan tidak menjalankan teks bebas. `autonomy` harus mengizinkannya. Loop merekam peristiwa; `--notify` mengirim `plan-event-v1` ke notifier, dan Dailybot pack menyampaikan peristiwa yang didukung. Peta armada dan `herdr-peers fleet ui` hanya baca. Lihat [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md) dan [protokol](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md).

## 2. Blok `autonomy`
Objek tertutup; bidang kanonis ada di [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Tanpa blok, gunakan default.

| Bidang | Nilai | Default |
|---|---|---|
| `stall_budget` | integer 1–10 | `3` prompt tanpa kemajuan |
| `promptable` | daftar alamat pane Herdr | lead saja |
| `notify` | daftar target yang tidak kosong | tanpa target, peristiwa tetap dicatat |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Alamat pane: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; ID mesin tidak diawali `-`. Bidang membatasi penerima, brain, dan antrean, bukan kriteria/gate.

## 3. Pemblokir terstruktur

Rencana v8 mencatat alasan berhenti sebagai data agar loop, armada, dan agen yang melanjutkan membaca field sama.

### 3.1. Catatan pemblokir

Ledger memakai `ledger.py block` untuk membuka dan `ledger.py unblock` untuk menyelesaikan, sebagai peristiwa `blocker` di `journal-event/v8`. Penambahan langsung ditolak dan setiap penolakan dicatat.

| Field | Aturan |
|---|---|
| `task` | Tugas terblokir dalam contract; tugas yang sudah ditutup bukti tidak dapat diblokir. |
| `reason` | Wajib, tidak kosong, maksimal 1000 karakter: alasan. |
| `needs` | Wajib, tepat satu baris tidak kosong, maksimal 500 karakter: kebutuhan. |
| `class` | Wajib: `C1`–`C7` dari [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Opsional `lead` atau `human`; jika kosong berarti `human`. |

`lead` menyelesaikan dalam wewenang tercatat tanpa kredensial, login, persetujuan, pembayaran, push ke main, publikasi, atau penghapusan. `resolver: "lead"` ditolak pada `C1`, `C2`, `C5`, `C6`. Satu rencana hanya boleh memiliki satu pemblokir aktif. Pemblokir lain ditolak sampai selesai. Pembukaan ulang tugas yang sama dapat memperbarui field, tetapi mempertahankan `since` awal. Penyelesaian hanya berisi tugas dan catatan opsional. Tugas terblokir tidak dapat diselesaikan, dan bukti baru tidak menutupnya.

### 3.2. Lokasi informasi

`state.json` memakai `plan-snapshot/v8`: bentuk `plan-snapshot/v6`, `blocker` bernilai `{task, reason, since, needs, class, resolver?}` atau `null`, dan `blocked` sebagai status turunan prioritas. Ledger memproyeksikannya, jangan menulis manual.

`PROGRESS.md` SEBAIKNYA dimulai di bawah judul dengan empat baris tetap, ditulis create dan diperbarui tiap transisi (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` dan `Needs` berasal dari snapshot (tugas terblokir lebih dulu, jika tidak tugas belum selesai pertama). Agen menulis `Goal` dan `Next action`.

### 3.3. Tindakan loop yang diizinkan

Loop, termasuk brain, hanya meminta lead menyelesaikan pemblokir `resolver: "lead"`. Selain itu manusia yang menangani. v6/v7 tidak mencatat `blocker` dan mempertahankan `plan-snapshot/v6` (`blocker` selalu `null`); pemblokirnya untuk manusia.
## 4. Antrean rencana
`.dwp/queue.json` memakai `dwp-queue-v1` dan hanya pack menulis. `create` menambah saat disetujui; manusia/lead mengurutkan; `execute` menandai `started` dengan alamat lead; finalisasi `done`; `create`/`refine` dapat menandai `skipped` dengan catatan. Item memuat `after` opsional. Satu rencana berjalan kecuali `parallel: true`. Daemon terbatas hanya-baca; antrean tidak valid dianggap kosong. `prompt-lead` mengirim: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon tidak menulis atau menjalankan `launch` tanpa kontrak rilis.

## 5. Yang dipertahankan v8

v8 mempertahankan isi v7: `tasks[].parallel_safe`, delegasi, dan seluruh peristiwa; fitur v7 tetap tersedia. v8 mencatat kumpulan peristiwa v7 ditambah `blocker` di `journal-event/v8` dan memproyeksikannya ke `plan-snapshot/v8`; journal campuran ditolak. `plan-manifest/v7` tetap dengan bentuk dan penunjuk yang sama; pemeriksa memasangkan manifest v7 dengan contract v8. Catatan v6/v7 dipertahankan byte demi byte.
