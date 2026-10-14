---
title: Hermes
description: "Adapter DWP untuk Hermes: pemuatan skill standar AgentSkills, sinergi memori episodik melalui catatan outcome di state.json, dan kelanjutan rencana berbasis."

Dalam rencana v6 dan v7, status diproyeksikan dari jurnal append-only (`journal.ndjson`) melalui `ledger.py project` alih-alih menulis ulang file status secara manual.
kind: adapter
lang: id
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adapter Hermes

Hermes adalah platform agent otonom yang memuat skill melalui standar AgentSkills dan memelihara memori episodik lintas sesi. DWP terintegrasi dengan kedua permukaan: pack skill dimuat dari `.agents/skills/` dengan cara yang sama seperti pack kompatibel AgentSkills lainnya, dan catatan outcome `state.json` langsung masuk ke indeks memori Hermes.

Dalam rencana v6 dan v7, status diproyeksikan dari jurnal append-only (`journal.ndjson`) melalui `ledger.py project` alih-alih menulis ulang file status secara manual.

## Tingkat dukungan

**Penuh** (Terdokumentasi) — Hermes membaca `AGENTS.md` dan memuat skill melalui pemuatan standar AgentSkills. Semua sub-skill DWP tersedia.

## Instalasi

Instal pack skill ke direktori `.agents/skills/` ruang kerja, atau gunakan pengelola skill platform jika tersedia.

## Pemanggilan

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Sinergi memori episodik

Dalam rencana v6 dan v7, tanda terima verifikasi deterministik DWP (`outcomes.py receipt`) dan catatan hasil langsung masuk ke indeks memori Hermes: setiap tugas yang diselesaikan membawa apa yang dicoba, gagal, dan berhasil dalam skema JSON terstruktur. Rencana yang diselesaikan menjadi memori episodik yang dapat diambil — agen dapat mengingat bagaimana masalah diselesaikan.

Sesi ephemeral menambahkan peristiwa ke `journal.ndjson` dan memproyeksikan `state.json` melalui `ledger.py project` alih-alih menulis ulang file status secara manual. Lihat [Status rencana](/spec/plan-state#outcome-records-as-episodic-memory).

## Kelanjutan berbasis cron

Pada platform dengan penjadwalan cron, kelanjutan mengikuti pola yang sama dengan platform otonom lainnya: setiap giliran terjadwal bangun, menjalankan Protokol Resume DWP, mengeksekusi paling banyak satu tugas, memperbarui `state.json`, dan yield. Rencana, bukan sesi, adalah unit kontinuitas.

Lapisan status yang dapat dibaca mesin (`manifest.json` + `state.json`) REQUIRED untuk eksekusi tanpa pengawasan. Lihat [Protokol agent](/spec/agent-protocol#execution-profiles) untuk protokol kondisi berhenti dan eskalasi selengkapnya.

## Catatan

Hermes dan OpenClaw keduanya merupakan platform agent otonom dalam tabel supported agents di [Protokol agent](/spec/agent-protocol). Keduanya berjalan di bawah profil eksekusi tanpa pengawasan dan keduanya mendapat manfaat dari ekuivalensi `state.json`-sebagai-git-log pada arketipe ruang kerja agent.
