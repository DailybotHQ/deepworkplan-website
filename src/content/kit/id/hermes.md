---
title: Hermes
description: "Adapter DWP untuk Hermes: pemuatan skill standar AgentSkills, sinergi memori episodik melalui catatan outcome di state.json, dan kelanjutan rencana berbasis cron."
kind: adapter
lang: id
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adapter Hermes

Hermes adalah platform agent otonom yang memuat skill melalui standar AgentSkills dan memelihara memori episodik lintas sesi. DWP terintegrasi dengan kedua permukaan: pack skill dimuat dari `.agents/skills/` dengan cara yang sama seperti pack kompatibel AgentSkills lainnya, dan catatan outcome `state.json` langsung masuk ke indeks memori Hermes.

## Tingkat dukungan

**Penuh** — Hermes membaca `AGENTS.md` dan memuat skill melalui pemuatan standar AgentSkills. Semua sub-skill DWP tersedia.

## Instalasi

Instal pack skill ke direktori `.agents/skills/` ruang kerja, atau gunakan pengelola skill platform jika tersedia.

## Pemanggilan

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Sinergi memori episodik

Hermes mengindeks memori agent agar pekerjaan masa lalu dapat diambil kembali lintas sesi mendatang. Catatan outcome `state.json` DWP dirancang untuk penggunaan ini: setiap tugas yang selesai membawa apa yang `tried`, apa yang `failed`, apa yang `worked`, dan catatan bentuk bebas dalam kolom JSON terstruktur. Ketika Hermes mengindeks berkas status `.dwp/plans/` ruang kerja, rencana yang selesai menjadi memori episodik yang dapat diambil kembali — sebuah agent dapat kemudian mengingat kembali bagaimana masalah tertentu diselesaikan, bukan sekadar bahwa suatu rencana pernah berjalan.

Ini berarti rencana DWP di Hermes bersifat tahan lama dalam dua cara: berkas markdown adalah catatan yang dapat dibaca manusia, dan catatan outcome `state.json` adalah memori yang dapat diindeks mesin. Lihat [Status rencana](/spec/plan-state#outcome-records-as-episodic-memory).

## Kelanjutan berbasis cron

Pada platform dengan penjadwalan cron, kelanjutan mengikuti pola yang sama dengan platform otonom lainnya: setiap giliran terjadwal bangun, menjalankan Protokol Resume DWP, mengeksekusi paling banyak satu tugas, memperbarui `state.json`, dan yield. Rencana, bukan sesi, adalah unit kontinuitas.

Lapisan status yang dapat dibaca mesin (`manifest.json` + `state.json`) REQUIRED untuk eksekusi tanpa pengawasan. Lihat [Protokol agent](/spec/agent-protocol#execution-profiles) untuk protokol kondisi berhenti dan eskalasi selengkapnya.

## Catatan

Hermes dan OpenClaw keduanya merupakan platform agent otonom dalam tabel supported agents di [Protokol agent](/spec/agent-protocol). Keduanya berjalan di bawah profil eksekusi tanpa pengawasan dan keduanya mendapat manfaat dari ekuivalensi `state.json`-sebagai-git-log pada arketipe ruang kerja agent.
