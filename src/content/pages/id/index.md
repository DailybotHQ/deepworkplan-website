---
title: "Deep Work Plan — eksekusi terstruktur untuk AI coding agent"
description: "Spec-first, loop tertutup: Deep Work Plan menjadikan repositori Anda harness bagi AI coding agent; tiap rencana berjalan tuntas di loop yang dimulai manusia."
lastUpdated: 2026-11-16
---

## Spec-first, loop tertutup: repositori adalah harness dan rencana berjalan sendiri hingga selesai.

Deep Work Plan mengubah repositori apa pun menjadi harness — konteks, pagar pengaman, dan rencana yang tahan lama dengan gerbang validasi — tempat agen coding mana pun mengeksekusi pekerjaan jangka panjang. Tambahkan loop opsional, dan rencana yang terbuka terus berjalan hingga akhir tanpa ada yang perlu memantaunya.

Deep Work Plan (DWP) adalah metodologi dan kit terbuka berlisensi MIT untuk merencanakan dan mengeksekusi pekerjaan perangkat lunak yang kompleks bersama AI agent. Anda tidak memilih metode pemasangan atau menyalin template — Anda menyalin prompt init.md dan menempelkannya ke agent Anda:

> Salin prompt init.md dan tempelkan ke agent coding Anda — Claude Code, Cursor, Codex, atau lainnya — untuk menjadikan repositori apa pun AI-first.



**Loop:** Registrasi (`lead claim`, lead dan suksesi) → Daemon (`autopilot --loop`, dimulai oleh manusia) → Dorongan (`idle ≥ 5 min`, tidak menambah wewenang) → Failover (`lead takeover`, penerus pertama yang terjangkau) → Notifikasi (`plan-event-v1`, ke perintah manusia) → Selesai (`plan_completed`, gerbang terlewati). Setiap rencana terbuka dengan catatan lead, hingga statusnya sendiri menyatakan selesai.

- [Buka prompt /init](/id/quickstart)
- [Baca metodologinya](/methodology)

---

## Landasan metodologi ini.

1. **Spec-first** — rencana adalah sumber kebenaran yang tahan lama: tugas atomik, kriteria penerimaan, dan gerbang validasi yang harus dilalui agen.
2. **Repositori adalah harness** — konteks, alat, pagar pengaman, dan status berada di repositori sebagai file biasa yang dapat dibaca agen mana pun.

4. **Efisiensi terukur** — byte instruksi per alur, diukur dan dipublikasikan beserta metodenya — tidak pernah persentase token yang dikarang.

---

## Masalah dan jawabannya

Dalam ledakan singkat, agen coding mengesankan. Serahkan misi jangka panjang — sebuah migrasi, subsistem baru, refaktor puluhan file — dan mereka menyimpang: konteks penuh, keputusan sebelumnya memudar, dan kerja berjam-jam mandek di tengah jalan.



Konteks adalah sumber daya agen Anda yang paling langka. Karena itu, harness menjaga instruksinya sendiri tetap ringkas dan dapat diaudit. Instruksi dimuat secara bertahap, validasi berfokus pada perubahan, dan setiap tugas menerima konteks yang relevan. Kami menerbitkan ukuran instruksi tiap alur dalam byte agar bebannya terlihat. Rencana juga menyesuaikan bentuk dengan pekerjaan: Lite untuk perbaikan terbatas dan Full untuk pekerjaan yang berlangsung berjam-jam. Format mengikuti cakupan pekerjaan sehingga proses tetap fokus dan mudah ditelusuri.

---

## Rencana berjalan hingga akhir. Wewenang tetap di tangan manusia.

Loop engineering membuat rencana selesai tanpa perlu terus dipantau manusia. Baris di bawah menjelaskan kontrak siklus yang telah dirilis: sebagian besar berasal dari herdr-peers, sedangkan antrean rencana adalah kontrak paket. Herdr bersifat opsional; metodologi tetap berfungsi tanpanya.



| Kontrak | Yang dijaminnya | Sumber (herdr-peers v2.1.0) |
| --- | --- | --- |
| Registrasi rencana (`herdr-peers lead claim`) | Rencana yang diawasi loop memiliki catatan lead dengan epoch dan urutan suksesi. Hanya pemegang epoch tertinggi yang bertindak sebagai lead-nya. | `skills/herdr-peers/protocol.md` §12 |
| Hanya manusia yang memulai (`herdr-peers autopilot start --loop`) | Hanya manusia yang memulai daemon, dengan kata-katanya sendiri. Tidak ada permintaan, balasan, atau pemberitahuan yang dapat memulainya, menghentikannya, atau mengubah apa yang dilakukannya. | `skills/herdr-peers/autopilot.md` §1 |
| Dorongan tanpa wewenang tambahan (`plan_stalled`) | Lead yang menganggur dari rencana terbuka menerima satu prompt tetap untuk melanjutkan. Gerbang, kondisi berhenti, dan eskalasi tetap mengikat seperti sebelumnya; tiga prompt tanpa kemajuan menandai rencana sebagai macet. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Failover ke penerus (`herdr-peers lead takeover`) | Saat lead hilang, penerus pertama yang dapat dijangkau diminta mengambil alih, dan helper memeriksa ulang buktinya. Sebuah lane hanya menjadi lead berdasarkan izin yang telah dicatat manusia sebelumnya. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Event rencana (`plan-event-v1`) | Saat rencana macet, terblokir, kehilangan lead, dimulai dari antrean, atau selesai, perintah yang dipilih manusia menerima satu objek plan-event-v1. Pack ini menyertakan notifier Dailybot untuk itu. | `docs/schema/plan-event-v1.json` |
| Peta armada (`plans-v1` · `fleet-v1`) | Setiap mesin melaporkan rencananya sebagai plans-v1; daemon menyimpan peta fleet-v1 dari setiap mesin, agen, repositori, dan rencana, dan fleet ui menampilkannya secara baca-saja. | `docs/schema/fleet-v1.json` |
| Antrean rencana (`dwp-queue-v1`) | Paket memvalidasi dan menulis antrean; daemon membacanya untuk melanjutkan rencana yang mengantre. | `skills/deepworkplan/shared/queue.py` |
| Verifikasi lead (`herdr-peers lead verify`) | Sebelum merge, tag, atau rilis apa pun, lead memastikan bahwa ia masih memegang rencana di setiap mesin. Lead yang lebih baru menolaknya; mesin yang tidak dapat dijangkau menghentikannya kecuali risiko itu diterima secara tercatat. | `skills/herdr-peers/protocol.md` §12 |

Otak keputusan (`--brain`) dan penunjukan lead (`--appoint`) adalah flag opt-in dari daemon yang sama, masing-masing diaktifkan oleh manusia. Daemon tidak pernah melakukan merge, merilis, masuk ke akun, atau mengubah izin.

[Baca addon Herdr](/id/kit/herdr)

---

## Manusia memegang kemudi. Agent mengeksekusi.

Anda yang memutuskan arti selesai dan di mana batasnya. Rencana membawa niat Anda; agen yang menghabiskan waktu — tanpa pengawasan terus-menerus, tanpa koreksi setiap dua puluh menit.

- Anda: maksud, kriteria penerimaan, tinjauan
- Agent: eksekusi, tugas demi tugas
- Rencana: kontrak di antara keduanya

[Baca metodologi](/id/methodology)

---

## Rencana yang tidak bisa disimpangi oleh agen.

Tugas panjang mengisi konteks model mana pun. Detail hilang dan agen menyimpang. Rencana tertulis — tugas atomik, gerbang verifikasi, status yang dapat dilanjutkan — adalah tempat kembali setiap putaran.

1. Rencana
2. Tugas atomik
3. Gerbang validasi
4. Penyelesaian
5. Status yang dapat dilanjutkan

[Lihat loop inti](/id/methodology)

---

## Selesai itu kontrak, bukan perasaan.

Setiap tugas menyebutkan kriteria penerimaan dan pemeriksaan yang harus lulus. Agen tidak bisa merasa selesai — harus lulus, atau tugas tetap terbuka.

- Tes lolos
- Tipe terverifikasi
- Kriteria penerimaan terpenuhi
- Atau tugas tetap terbuka

[Baca spesifikasi](/id/spec)

---

## Repositori adalah harness.

Konteks, alat, pagar pengaman, dan status tinggal di repositori Anda sebagai berkas sederhana yang dapat dibaca agen mana pun. Tanpa lock-in, tanpa otak eksternal — bertahan melewati reset konteks.

- Spesifikasi awet di disk
- Gerbang validasi, bukan perasaan
- Selamat dari reset konteks

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Lihat hasil onboarding](/id/quickstart)

---

## Byte instruksi per alur, terukur.

Harness memublikasikan apa yang harus dibaca setiap alur sebelum dimulai: router, sub-skill, dan sumber daya bersama yang ditautkannya. Inilah set bacaan wajib dari pack yang dirilis.

| Alur | Bundel awal (byte) |
| --- | ---: |
| `create` | 74.974|
| `execute` | 55.136|
| `resume` | 32.023|
| `refine` | 76.797|
| `onboard` | 82.051|
| `status` | 27.311|
| `verify` | 36.701|

Satuan: byte sistem berkas. Diukur pada pack yang dirilis dengan perintah di bawah: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.1).

Token penyedia, biaya, dan statistik penutupan loop tidak ditampilkan: belum ada sumber bertag yang mengukurnya, jadi semuanya tidak memiliki baris. Angka token byte ÷ 4 dari skrip adalah estimasi berlabel, bukan pengukuran.

[Baca catatan evaluasi](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.1/docs/EVALUATION.md)

---

## Apa yang Anda dapatkan

- AGENTS.md di akar repositori, dipikirkan matang dari stack dan perintah nyata Anda.
- `docs/` terkategori dan dokumentasi per modul.
- Sebuah direktori `.agents/` (skills, agents, commands) dengan symlink `.claude` ke `.agents`.
- Skill Deep Work Plan, dipasang sekali untuk setiap agent — termasuk sub-skill author, sehingga repositori dapat menumbuhkan skill, agent, dan command-nya sendiri, ditambah addon opt-in seperti dependency-upgrade dan addon design-system untuk permukaan antarmuka apa pun yang menghadap pengguna.
- Rencana jangka panjang yang dapat dilanjutkan di folder `.dwp/` yang di-gitignore. Metodologi itu sendiri tidak memerlukan daemon maupun status eksternal; daemon loop yang opsional menambah kesinambungan, tidak pernah menjadi dependensi.
- Delegasi multi-agen dan Ekosistem 1.0 — koordinasikan agen paralel secara aman dengan worktree terisolasi, bukti terobservasi, dan addon ekosistem tersemat opsional.

---

## Apa yang terjadi saat Anda menjalankannya

1. **Agent Anda membuka [/init.md](/init.md)** — ia membaca prompt onboarding beserta metodologi, spec, dan kit yang ditautkannya.
2. **Ia memasang skill Deep Work Plan** — mesinnya, identik di setiap repositori: router ditambah sub-skill-nya (create, execute, refine, resume, status, verify, onboard, author, upgrade), untuk Claude Code, Cursor, Codex, Gemini, dan Copilot.
3. **Ia menyesuaikan repositori Anda** — dengan bernalar tentang stack nyata Anda (tidak pernah menyalin-tempel), ia menulis AGENTS.md, `docs/`, README per modul, kit `.agents/` yang dipikirkan matang, dan `.dwp/` yang di-gitignore. Repositori Anda menjadi harness.
4. **Anda merencanakan dan mengeksekusi** — Deep Work Plan jangka panjang, dijalankan langkah demi langkah terhadap acceptance criteria dan validation gate yang eksplisit, secara otonom selama berjam-jam.
5. **Manusia memulai loop** — opsional, dengan addon Herdr: Anda — bukan agen — menjalankan `herdr-peers autopilot start --loop`. Setiap rencana terbuka yang memiliki catatan lead terus berjalan hingga akhir, dan notifier Anda diberi tahu saat ada rencana yang macet, terblokir, atau selesai.

Skill adalah mesin yang dapat dipakai ulang, dipasang dengan cara yang sama di mana saja; yang disesuaikan adalah repositori Anda. Mekanisme pemasangan (Skills CLI, OpenClaw, atau git clone) ada di prompt [/init.md](/init.md) dan di [quickstart](/quickstart).

---

## Metodologi, spesifikasi, dan kit

- [Baca metodologinya](/methodology) — apa itu DWP, prinsipnya, alur kerjanya, dan cara mengadopsinya.
- [Baca spesifikasinya](/spec) — anatomi tugas, validation gate, completion protocol, arketipe, dan addon.
- [Jelajahi kit](/kit) — preset, adapter, dan command untuk memasang DWP ke dalam sebuah repositori.
- [Lihat contoh](/examples) — panduan sebelum-dan-sesudah dari pekerjaan teknik nyata.

---

## Siapa yang membangunnya

Deep Work Plan tumbuh dari pekerjaan teknik nyata di [Dailybot](https://www.dailybot.com) dan dirawat oleh Dailybot bersama komunitas sumber terbuka.

- [Tentang metodologi](/about)
- [Komunitas & kontak](/contact)
- [Repositori GitHub](https://github.com/DailybotHQ/deepworkplan-website)
