---
title: Cloud agents
description: "Adapter DWP untuk cloud dan background agent: tugas remote Claude Code, Codex cloud, kelas Jules — sesi sementara yang mengeksekusi terhadap rencana .dwp/ yang."
kind: adapter
lang: id
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Adapter cloud agents

Cloud dan background agent — tugas remote Claude Code, OpenAI Codex cloud, agent kelas Jules, dan lingkungan eksekusi asinkron serupa — bersifat sementara secara desain: sebuah sesi dimulai, berjalan untuk waktu yang terbatas, dan berakhir. DWP mengubah batasan itu menjadi fitur dengan menjadikan rencana sebagai artefak yang tahan lama, bukan sesinya.

## Wawasan utama

Direktori `.dwp/` repositori adalah **lapisan spec dan status yang tahan lama**. Sesi cloud adalah **eksekutor sementara**. Rencana memberi tahu eksekutor apa yang harus dilakukan; `state.json` memberi tahu di mana harus melanjutkan. Sesinya bisa apa saja — model yang berbeda, penyedia yang berbeda, kontainer baru — dan rencana dilanjutkan dari tepat di mana ia tinggalkan.

## Tingkat dukungan

**Penuh** (Terdokumentasi) — platform agen cloud membaca `AGENTS.md` atau instruksi bawaan dan mengeksekusi perintah melalui lingkungan terminal atau kontainernya.

## Loop wake-resume-yield

Setiap giliran cloud agent mengikuti pola:

1. **Wake** — sesi dimulai (dipicu oleh jadwal cron, event CI, atau tindakan pengguna).
2. **Jalankan Protokol Pemulihan DWP** — baca README rencana, cari titik pemeriksaan, rekonstruksi status dari `journal.ndjson` melalui `ledger.py project`, periksa sambungan, jalankan uji asap. Lihat [Spesifikasi DWP](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Periksa status terblokir** — jika `state.json.blocked` diisi, laporkan alasannya dan yield tanpa mengeksekusi.
4. **Eksekusi tugas atomik berikutnya** — satu tugas, melewati validation gate penuhnya.
5. **Catat dalam jurnal** — tambahkan peristiwa ke `journal.ndjson` melalui kata kerja `ledger.py` (`start`, `gate`, `complete`); `ledger.py project` memperbarui proyeksi snapshot `state.json` secara atomik. Dalam rencana v5 lawas, pembaruan file status langsung dipertahankan.
6. **Yield** — sesi berakhir dengan bersih; giliran berikutnya melanjutkan dari status yang diperbarui.

## Persyaratan

- Rencana MUST membawa lapisan status yang dapat dibaca mesin (`manifest.json` + `state.json`). Tanpanya, sesi sementara tidak memiliki cara yang andal untuk menentukan posisi resume. Lihat [Status rencana](/spec/plan-state).
- Rencana MUST telah disetujui oleh manusia sebelum giliran cloud tanpa pengawasan apapun. Persetujuan rencana adalah titik kontrol.
- Agent beroperasi di bawah otoritas terbatas: ia MUST NOT memperluas cakupan, melakukan tindakan destruktif yang tidak secara eksplisit diotorisasi rencana, atau berimprovisasi di luar instruksi tugas saat ini. Lihat [Protokol agent](/spec/agent-protocol#execution-profiles).

## Catatan

Sesi cloud agent adalah kasus ekstrem dari profil eksekusi tanpa pengawasan: kontinuitas sesi nol, ketahanan rencana maksimum. Direktori `.dwp/` DWP secara khusus dirancang agar ini berhasil — semua status yang dibutuhkan agent untuk memulai, melanjutkan, dan menyelesaikan sebuah pekerjaan berada dalam berkas markdown dan JSON biasa yang dapat dibaca oleh sesi mana pun dari checkout baru.
