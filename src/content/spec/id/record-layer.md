---
title: Lapisan catatan
description: "Lapisan catatan v6 dan v7: kontrak hasil yang tidak dapat diubah, jurnal append-only, kelas bukti, sign-off, amandemen, invarian, dan receipt."
order: 9
lang: id
section: Record layer
---

# Lapisan catatan

> **Cakupan versi:** Halaman ini menyatakan ulang lapisan catatan v6 yang normatif, yang menjadi dasar standar saat ini, DWP 7.0.0. Sumber kanonis pada rilis `v7.9.0`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) dan [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). Jika halaman ini dan berkas-berkas tersebut berbeda, berkas-berkas itulah yang berlaku. Rencana v5 tetap memakai lapisan [status rencana](/spec/plan-state) dan tidak pernah dimigrasikan secara implisit.

**Versi 6.0.0, diperluas di 7.0.0. Status: Stabil.** Lapisan catatan menggantikan penyelesaian naratif dengan catatan: kontrak adalah otoritasnya, jurnal adalah memorinya, helper yang melakukan penulisan, dan setiap berkas yang dihasilkan adalah sebuah proyeksi. Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

## Model dalam satu kalimat

Sebuah rencana terdiri dari dua artefak yang ditulis dan satu urutan yang dijaga. Markdown rencana (`README.md` dan berkas tugas) menyatakan apa yang akan dikerjakan. **Kontrak hasil** (`contract.json`) menyatakan apa yang dihitung sebagai selesai dan apa yang boleh dilakukan rencana. **Jurnal** (`journal.ndjson`) mencatat apa yang benar-benar terjadi. `state.json` dan `views/` dibuat ulang dari jurnal dan MUST NOT diedit secara manual; ketika sebuah berkas yang dihasilkan dan jurnal tidak sepakat, jurnal yang menang dan berkas itu dibuat ulang.

## Deteksi generasi

Sebuah folder rencana adalah rencana lini v6 jika dan hanya jika ia membawa `manifest.json` yang penunjuk `contract`-nya dapat di-resolve, sebuah `contract.json`, atau rantai revisi `contracts/`. Deteksi MUST menggunakan artefak-artefak ini, tidak pernah versi paket yang terpasang: paket terbaru dapat menyimpan rencana v5, dan paket yang lebih lama dapat menjumpai rencana v6.

URL `schema` milik kontrak menamai **generasinya**, dan manifest serta setiap peristiwa jurnal mencerminkannya:

| Generasi | Kontrak | Peristiwa jurnal | Manifest | Menambahkan |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` dan peristiwa `delegation` ([Delegasi](/spec/delegation)) |

Rencana baru yang dibuat oleh paket 7.x adalah v7 secara default; permintaan `v6` yang eksplisit tetap mematerialisasikan kontrak v6. Sebuah rencana tidak pernah berganti generasi, dan jurnal yang mencampur generasi MUST ditolak. Kedua generasi diproyeksikan ke bentuk [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json) yang sama.

## Kontrak hasil

Satu kontrak per rencana, sesuai dengan skema generasinya. Kontrak memuat pernyataan hasil dan definisi keberhasilan, kriteria penerimaan, tugas beserta prasyaratnya, touched surface dan niat gate, invarian berskala rencana, cakupan (path yang diizinkan, kelas command, operasi terlarang), envelope sumber daya, batas penjadwalan, izin, dan catatan otorisasi.

- **Identitas.** `contract_id` adalah SHA-256 dari byte kanonis kontrak tanpa bidang id. Setiap catatan yang dihasilkan di bawah kontrak tersebut mengutipnya.
- **Ketidakberubahan.** Setelah eksekusi dimulai, kontrak MUST NOT berubah. Kontrak yang berubah adalah sebuah **revisi** baru di bawah `contracts/`, yang mengutip induknya, dengan nomor revisi yang berurutan dan otoritas yang baru dicatat.
- **Id yang stabil.** Kriteria (`AC-*`), invarian (`INV-*`), dan tugas (`T-*`) MUST unik, dan catatan mengutip id, tidak pernah posisi dalam daftar. Graf tugas MUST asiklik, dan setiap niat gate MUST merujuk kriteria yang dideklarasikan.
- **Izin.** Kapabilitas yang diberikan dan yang tidak diberikan MUST merupakan subset yang saling lepas dari satu himpunan tertutup: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Otorisasi.** Mekanismenya adalah tepat `plan_authorship` (manusia menulis atau meninjau rencana sebelum eksekusi) atau `pre_authorization` (grant tetap dengan envelope yang dinyatakan, seperti pada mode trust). Keduanya menjalankan gate secara identik; hanya otoritas yang dicatat yang berbeda.
- **Dapat ditutup.** Setiap kriteria MUST dapat ditutup: kriteria yang di-gate oleh sebuah tugas ditutup oleh bukti `observed` dari gate-nya atau oleh sign-off manusia berstatus `asserted`, sesuai kelas bukti yang diterimanya. Draf kriteria yang tidak menerima keduanya ditolak.

## Materialisasi

Sebuah rencana dimaterialisasikan oleh helper bawaan (`ledger.py materialize`), tidak pernah secara manual, tepat dalam urutan ini, dengan setiap langkah idempoten dan dapat dilanjutkan:

1. **`manifest.json`** dengan penunjuk kontrak, ditulis pertama kali agar generasi rencana dapat ditemukan meskipun materialisasi terputus.
2. **`contract.json`**, divalidasi dan dialamatkan berdasarkan konten.
3. Peristiwa jurnal **`approval`**, yang mengutip id kontrak dan digest dari markdown rencana.

Hanya peristiwa approval tersebut yang membuka gate awal tugas. Kontrak yang disalin manual tanpanya ditolak saat tugas dimulai, dan manifest yang penunjuknya tidak cocok dengan kontrak yang sedang dimaterialisasikan ditolak alih-alih ditulis ulang.

## Jurnal

`journal.ndjson` bersifat append-only: satu objek JSON tertutup per baris, tidak pernah diedit atau dihapus. Sebuah koreksi adalah peristiwa yang lebih kemudian. Setiap peristiwa membawa skemanya, tipe, `seq` yang meningkat secara ketat, timestamp, rencana, `contract_id`, dan aktornya (`helper`, `agent`, `host_adapter`, atau `human`). Katalog peristiwa mencakup dimulainya tugas, approval, eksekusi gate, observasi, adaptasi, amandemen, intervensi, sampel sumber daya, pasangan kontrol, pilihan penjadwal, penolakan, render view, rekonsiliasi, dan perbaikan jurnal; v7 menambahkan peristiwa delegasi. Setiap penolakan juga dicatat.

## Kelas bukti

Peristiwa yang membawa bukti mencatat label **trust**:

1. **observed** — helper bawaan itu sendiri yang menjalankan pemeriksaan, dengan direktori kerja, environment, timeout, dan keluaran tertangkap yang dideklarasikan. Hanya gate runner (`ledger.py gate`) yang menghasilkan bukti gate observed; agent yang sekadar menuliskan hasil yang dilaporkannya tidak dapat melakukannya.
2. **imported** — diambil dari sumber eksternal yang cocok beserta provenansnya, misalnya catatan gate v5 yang dimigrasikan dan penunjuk buktinya dapat di-resolve.
3. **asserted** — dinyatakan tanpa penetapan independen.

Setiap kriteria mendeklarasikan kelas mana yang diterimanya, sehingga kriteria yang hanya menerima observed tidak pernah dapat ditutup oleh klaim. Checksum menetapkan identitas byte, bukan kebenaran semantik; lapisan catatan memeriksa struktur dan provenans dan tidak membuktikan semantik produk.

## Sign-off manusia

Kriteria yang harus dinilai oleh manusia ditutup melalui `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. Sign-off dicatat sebagai `asserted`, mengutip artefak yang menjadi dasarnya, hanya dihitung di dalam jendela bukti milik tugas yang mendeklarasikannya, dan hanya menutup kriteria yang menerima `asserted`. Agent tidak pernah memberi sign-off atas nama manusia. Catatan beraktor manusia yang ditulis di luar materialisasi membawa penanda otoritas yang eksplisit (catatan yang ditulis oleh manusia, dicatat berdasarkan path dan digest, atau konfirmasi interaktif); ledger tidak dapat mengautentikasi seseorang, sehingga penanda itu membuat klaim dapat diaudit, bukan menjadikannya observed.

## Kriteria terkontrol

Kriteria yang dideklarasikan sebagai kontrol regresi atau diskriminasi hanya ditutup oleh **pasangan kontrol yang diskriminatif**: pemeriksaan gagal pada revisi awal dan lulus pada revisi baru. Pasangan yang lulus di kedua sisinya dicatat sebagai non-diskriminatif dan tidak pernah dibulatkan ke atas; titik awal yang kotor atau sisi lama yang tidak tersedia dicatat sebagai kontrol tidak tersedia, tidak pernah disintesis.

## Eksekusi dan penyelesaian

Dispatch berasal dari penjadwal deterministik (`scheduler.py ready`), dan `ledger.py start` menolak tugas yang prasyaratnya belum lengkap. Setiap dimulainya tugas mencatat fingerprint dari working tree, dan bukti hanya digunakan ulang untuk tugas dan kriteria yang sama pada fingerprint yang setara.

**Invarian berskala rencana.** Setiap invarian yang dideklarasikan berlaku di seluruh rencana dan dievaluasi di setiap batas sebagai observasi (`INV-<id>: pass` atau `INV-<id>: fail: <reason>`). Properti yang hanya harus dipenuhi oleh sebagian tugas adalah kriteria penerimaan tugas-tugas tersebut, tidak pernah invarian.

**Penyelesaian diturunkan, tidak pernah dinyatakan.** `ledger.py complete` menolak, dan mencatat penolakannya, selama ada kriteria yang belum memiliki bukti dalam jendela yang diterima atau ada invarian yang belum memiliki evaluasi lulus yang baru. Snapshot menampilkan sebuah tugas sebagai selesai tepat ketika catatan mendukungnya.

## Adaptasi dan amandemen

Perubahan di tengah eksekusi adalah usulan kepada penjadwal, terbatas pada himpunan tertutup: `split`, `reorder`, `insert`, `change_strategy`, dan `retry`. Sebuah adaptasi MUST NOT menghapus persyaratan, melemahkan atau mengganti penerimaan, memperluas cakupan atau izin, membelanjakan melebihi envelope, atau menandai skenario yang belum dieksekusi sebagai selesai.

Perubahan pada cakupan, kriteria penerimaan, izin, atau envelope adalah sebuah **amandemen kontrak**: `ledger.py amend` menyiapkan kontrak yang direvisi sebagai revisi berikutnya, mencatat amandemen beserta kriteria yang bukti sebelumnya dibatalkan olehnya, mewajibkan approval baru dengan penanda otoritas manusia, dan baru setelah itu mengganti kontrak yang aktif. Amandemen yang terputus dilanjutkan dari langkah pertama yang belum ada; plan authorship tidak pernah terbawa ke sebuah revisi.

## Receipt, view, dan ekspor

`outcomes.py receipt` menghitung ulang hasil rencana dari catatan, sehingga receipt berubah ketika catatan berubah; receipt tidak pernah ditulis tangan. `views.py render` membuat ulang view yang dapat dibaca manusia; view yang telah diedit manusia dilaporkan, tidak pernah ditimpa diam-diam, dan rekonsiliasinya juga dicatat. Karena `.dwp/` diabaikan oleh git, `ledger.py export --dest <dir>` membundel jurnal, snapshot, rantai kontrak, dan setiap artefak bukti yang dikutip demi ketahanan atau untuk host lain.

## Permukaan hanya-baca dan melanjutkan

`status` dan `verify` tidak pernah menulis ke rencana lini v6; keduanya melapor melalui command murni dan proyeksi yang dihasilkan. Host yang melanjutkan pekerjaan memulihkan diri dalam urutan tetap (inspeksi, validasi, proyeksi, render dengan otoritas yang dicatat) dan memperlakukan fingerprint yang usang sebagai bukti yang tidak berlaku untuk dijalankan ulang, tidak pernah sebagai hasil yang dapat digunakan ulang. Jurnal tidak pernah diputar ulang sebagai konteks percakapan: pekerjaan dilanjutkan melalui loop execute dengan [manifest konteks](/id/spec/resources-and-abilities#manifest-konteks-per-tugas) per tugas.

## Koeksistensi dan migrasi

Rencana v5 dan lini v6 MAY hidup berdampingan di satu `.dwp/plans/`, dan masing-masing berjalan di bawah generasinya sendiri sepanjang hidupnya. Satu-satunya jalur dari v5 ke v6 adalah migrasi eksplisit yang dipratinjau terlebih dahulu (`migrate_v6.py`, dijalankan melalui `refine`) dengan cadangan terverifikasi dan rollback; riwayat v5 yang dimigrasikan berstatus `imported` ketika buktinya dapat di-resolve dan `asserted` jika tidak, tidak pernah `observed`. Tidak ada migrasi balik.

## Terkait

- [Sumber daya dan kemampuan](/spec/resources-and-abilities) — manifest konteks, envelope sumber daya, kemampuan host, dan registri addon.
- [Delegasi](/spec/delegation) — apa yang ditambahkan v7 pada lapisan ini.
- [Status rencana](/spec/plan-state) — lapisan status v5 yang dipertahankan.
