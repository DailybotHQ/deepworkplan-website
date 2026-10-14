---
title: Sumber daya dan kemampuan
description: "Manifest konteks per tugas, envelope sumber daya, kemampuan host, registri addon .dwp/config.json, dan kemampuan yang ditambahkan oleh addon yang aktif."
order: 10
lang: id
section: Record layer
---

# Sumber daya dan kemampuan

> **Cakupan versi:** Halaman ini menyatakan ulang empat dokumen normatif dari standar saat ini, DWP 7.0.0, pada rilis `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/CONFIG.md), dan [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_ABILITIES.md). Jika halaman ini dan berkas-berkas tersebut berbeda, berkas-berkas itulah yang berlaku.

**Status: Stabil (konteks dan sumber daya sejak 6.0.0; konfigurasi dan kemampuan sejak 7.0.0).** Aturan ini mengikat rencana lini v6 ([Lapisan catatan](/spec/record-layer)); standar v5 tidak tersentuh. Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

## Manifest konteks per tugas

Sebelum setiap tugas, agent menurunkan sebuah **manifest konteks** dari kontrak dan seluruh jurnal (`context_manifest.py`). Manifest ini adalah view turunan, tidak pernah disimpan sebagai status: menurunkannya dua kali dari catatan yang sama MUST menghasilkan byte yang identik, dan manifest MUST NOT membaca di luar rencana dan repositorinya. Bentuknya diterbitkan sebagai [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Bagian | Diturunkan dari |
| --- | --- |
| `identity` | nama rencana, id kontrak aktif, dan revisinya |
| `authorization` | peristiwa approval, apa adanya, termasuk checkpoint persetujuan |
| `repository_rules` | cakupan kontrak dan invarian beserta status evaluasinya saat ini |
| `acceptance` | kriteria tugas beserta status penutupannya |
| `touched_surface` | berkas yang dideklarasikan beserta hash kontennya saat ini; berkas yang hilang ditampilkan sebagai hilang |
| `evidence` | penunjuk bukti dalam jendela yang dapat di-resolve di disk |
| `dead_ends` | gate yang gagal, penolakan, adaptasi yang ditolak, dan kontrol non-diskriminatif |
| `freshness` | fingerprint dari masukan yang diringkas oleh manifest |
| `next_action` | tepat satu langkah berikutnya dengan command yang konkret |

`authorization`, `repository_rules`, dan `acceptance` bersifat **wajib**: pemangkasan konteks tidak pernah dapat menyembunyikan batas penerimaan atau otorisasi. Tangga next-action berurutan (approval, start, authority, control, evidence, complete) dan tidak pernah menyajikan gate lulus biasa sebagai penutup kriteria terkontrol.

**Jalan buntu dipertahankan.** Sebuah entri hanya keluar dari digest berdasarkan fakta catatan yang terbukti (fingerprint yang sama kemudian lulus, penolakan duplikat yang lebih baru menggantikannya, atau revisi kontrak membuatnya kedaluwarsa); perubahan permukaan semata MUST NOT menghapusnya. **Kesegaran diperiksa:** ringkasan yang fingerprint masukan tercatatnya tidak lagi cocok dianggap usang, dan ringkasan tanpa fingerprint usang berdasarkan konstruksinya. **Riwayat dimuat hanya berdasarkan pemicu** — handoff yang tercatat atau amandemen yang memengaruhi tugas; selain itu, manifest saja sudah menjadi konteks tugas.

## Akuntansi empat kuantitas

Beban instruksi dan biaya dilaporkan sebagai empat kuantitas yang berbeda: **byte instruksi** statis, **token penyedia** (hanya jika meter host mencatatnya), **biaya moneter** (hanya dari sampel tarif riil yang tercatat), dan **waktu nyata** (dari timestamp peristiwa). Kuantitas yang tidak ada dilaporkan sebagai tidak ada beserta alasannya, tidak pernah diperkirakan, dan byte tidak pernah dikonversi menjadi token atau uang.

## Kemampuan host

Host runtime menyatakan **kemampuannya** dari himpunan tertutup: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Kemampuan yang tidak dikenal MUST ditolak, dan kemampuan yang tidak dinyatakan bernilai `false`. **Host minimal** — tanpa pergantian model, tanpa subagent, tanpa telemetri, tanpa stop — adalah postur yang didukung, tidak pernah sebuah kesalahan; setiap batas yang membutuhkan kemampuan yang tidak ada turun menjadi advisory dengan menyebutkan kemampuan yang tidak ada itu.

Kemampuan bukanlah grant. Grant dalam kontrak adalah otoritas; kemampuan adalah apa yang benar-benar dapat dilakukan lingkungan. Setiap postur yang membutuhkan sebuah kemampuan tetap membutuhkan grant-nya.

## Envelope sumber daya

Kontrak MAY mendeklarasikan batas dalam envelope sumber dayanya. Sebuah batas hanya **ditegakkan** ketika ia menyebut sumber meteran yang nyata; jika tidak, batas itu bersifat **advisory**, dan kesetaraan penegakan antar host tidak pernah diklaim.

- **Sumber penghitung.** Penghitung yang dapat diamati dari jurnal (rentang waktu nyata, percobaan ulang gate, panggilan dispatch) dihitung dari catatan rencana itu sendiri. Penghitung khusus host (pengeluaran, token penyedia) membutuhkan kemampuan meter yang sesuai dan sampel observed dari adaptor host; penghitung yang tidak ada bukan berarti penggunaan gratis.
- **Cadangan.** Sebuah batas MAY mendeklarasikan `reserve` agar verifikasi, percobaan ulang, dan pelanjutan tidak kehabisan oleh pekerjaan biasa: dispatch ditolak ketika yang terpakai ditambah yang tertunda akan melebihi batas dikurangi cadangan.
- **Kehabisan.** Mencapai sebuah batas menyimpan checkpoint yang belum selesai, mencatat `LIMIT: exhausted <id>: <detail>`, dan menahan dispatch sampai ada catatan `LIMIT: recovered <id>` yang eksplisit. Kehabisan tidak pernah dapat memenuhi kriteria penerimaan.
- **Penyelesaian pembatalan.** Reservasi yang sedang berjalan diselesaikan tepat satu kali, sebagai dilepas atau dikomit; penyelesaian kedua yang bertentangan ditolak, tidak pernah dimediasi.
- **Postur routing.** Defaultnya adalah model tetap. Pergantian tingkat model membutuhkan grant `model_routing` sekaligus kemampuan dengan nama yang sama; dispatch paralel membutuhkan grant `agent_delegation` sekaligus kemampuan `subagents`. Postur routing adalah pernyataan izin, tidak pernah klaim efektivitas.

## Berkas konfigurasi dan registri addon

`.dwp/config.json` (repositori) dan `~/.dwp/config.json` (pengguna) berbagi satu bentuk, yang diterbitkan sebagai [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), dan satu parser (`config.py`). **Metodologi bekerja tanpa berkas konfigurasi dan tanpa addon**; tidak ada isi berkas ini yang dapat membuat sebuah rencana, alur, atau konformansi bergantung pada sebuah addon.

- **Dilacak secara default.** Berkas repositori menyimpan keputusan, tidak pernah secret, dan dilacak oleh git agar rekan tim dan CI membaca registri yang sama: onboarding menulis aturan `.gitignore` `.dwp/*` ditambah `!.dwp/config.json`. Rencana dan catatan benchmark tetap diabaikan.
- **Prioritas.** Berkas repositori mengalahkan berkas pengguna, dan berkas yang tidak ada berarti semuanya nonaktif. Kunci `addons` di-resolve per kunci addon; kunci `benchmark` di-resolve secara keseluruhan.
- **Kunci registri** adalah nama direktori addon di dalam paket: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Setiap entri memiliki `enabled` (hanya `true` yang mengaktifkan), `version` opsional, dan `note` satu baris yang opsional. Kunci yang tidak dikenal diabaikan dengan satu peringatan.
- **Tidak ada berarti tidak aktif.** Hanya onboarding dengan persetujuan developer, langkah instalasi milik addon itu sendiri, atau manusia yang dapat mengaktifkan sesuatu. Addon aktif yang tidak terdeteksi dan membawa catatan dilaporkan sebagai ditangguhkan.
- **Pembacaan fail-closed.** Berkas yang tidak dapat dibaca atau nilai yang salah bentuk tidak menyumbangkan apa pun dan menghasilkan tepat satu peringatan; pembaca tidak pernah menghentikan sebuah alur dan tidak pernah diam tentang apa yang dibuangnya. Penulis melakukan rekonsiliasi secara atomik dan menolak menimpa berkas yang tidak dapat di-parse.
- **Catatan host.** Kunci `host` opsional mencatat kemampuan yang dinyatakan mesin (boolean dari himpunan tertutup). `telemetry: true` tetap membutuhkan persetujuan developer.
- **Baseline tidak berubah.** Tinjauan lokal AI Diff Reviewer tetap menjadi bagian dari setiap Final Review, baik registri menyebutkannya maupun tidak.

## Kemampuan yang disediakan addon

Sejak 7.0.0, addon yang aktif dapat menambahkan kemampuan saat runtime:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

- **Deskriptor.** Setiap addon di dalam paket menyertakan `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) yang mendeklarasikan kuncinya, apa yang disediakannya, dan bagaimana ia dideteksi.
- **Deteksi bersifat hanya-baca.** Command deteksi berjalan tanpa shell, dengan stdin tertutup dan timeout 10 detik, dan tidak ada yang dicetaknya yang dieksekusi. Produk yang versi mayor antarmuka yang dilaporkannya berbeda dari yang di-pin dianggap tidak tersedia, dengan satu peringatan.
- **Tidak aktif berarti tidak dikonsultasikan.** Deskriptor addon yang nonaktif tidak dibuka dan command deteksinya tidak dijalankan. Gabungannya monoton: mengaktifkan sebuah addon hanya dapat menambah kemampuan.
- **Tidak pernah disimpan.** Kemampuan efektif dihitung ulang pada setiap panggilan dan MUST NOT ditulis ke dalam rencana. Rencana mencatat apa yang digunakannya — peristiwa delegasi menyebutkan transport dan addon-nya — bukan apa yang tersedia.
- **Kemampuan bukanlah otoritas.** Addon agentkit dapat menyediakan `subagents`, `cancel_children`, dan `model_routing`; addon Herdr dapat menyediakan `subagents` dan `cancel_children`. Mendelegasikan tetap membutuhkan grant `agent_delegation` dari kontrak ([Delegasi](/spec/delegation)).

`resources.py abilities` mencetak himpunan efektif beserta asal setiap kemampuan; command ini bersifat hanya-baca.

## Terkait

- [Lapisan catatan](/spec/record-layer) — kontrak, jurnal, dan bukti.
- [Delegasi](/spec/delegation) — bagaimana sebuah rencana menggunakan kemampuan `subagents`.
- [Add-on](/spec/addons) — addon opsional itu sendiri.
