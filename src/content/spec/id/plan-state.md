---
title: Status rencana
description: "Lapisan status rencana yang dapat dibaca mesin: manifest.json dan state.json, catatan gate, catatan outcome sebagai memori episodik, rekonsiliasi, dan kapan lapisan ini diwajibkan."
order: 7
lang: id
section: State
---

# Status rencana

**Versi 1.0. Status: Stabil.** Dokumen ini menetapkan lapisan status rencana yang dapat dibaca mesin dari metodologi Deep Work Plan. Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

Dua artefak JSON — `manifest.json` (identitas statis rencana) dan `state.json` (status eksekusi per-tugas yang berjalan, termasuk hasil validasi gate) — yang setiap rencana MAY bawa bersama berkas markdown-nya, dan yang wajib dibawa oleh eksekusi tanpa pengawasan (lihat [Protokol agent](/spec/agent-protocol#execution-profiles)) serta ruang kerja tanpa git (lihat [Arketipe](/spec/archetypes) §3).

Rencana markdown tetap menjadi **sumber kebenaran yang dapat dibaca manusia**. Lapisan JSON adalah **proyeksi turunan**: ia diperbarui oleh agent pada titik protokol yang telah ditentukan, tidak pernah diedit secara manual, dan tidak pernah dibiarkan berbeda diam-diam dari markdown. Tujuannya adalah interoperabilitas — linting, pemeriksaan konformansi, diffing, dasbor, penemuan registri, dan sinkronisasi dengan infrastruktur sesi eksternal — yang tidak satupun dapat dibangun secara andal di atas prosa.

## Mengapa ini ada

Hingga v1.1, rencana hanya berupa markdown prosa. Itu membuatnya dapat diaudit dan agnostik terhadap agent, tetapi tidak menyisakan apa pun yang dapat divalidasi, di-diff, atau dikonsumsi oleh sebuah alat: tidak ada gate konformansi, tidak ada deteksi desinkronisasi antara `README.md` dan `PROGRESS.md`, tidak ada cara bagi daemon atau sesi cloud untuk mengetahui status rencana tanpa mengurai prosa. v1.2 menambahkan proyeksi JSON tanpa menurunkan status markdown — proyeksi berasal dari markdown, dengan cara yang sama seperti lockfile berasal dari manifes.

## Penempatan

Sebuah rencana yang menggunakan lapisan status memiliki tata letak ini:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← sumber kebenaran manusia (tidak berubah)
├── PROGRESS.md          ← log naratif (tidak berubah)
├── PROMPTS.md           ← tidak berubah
├── manifest.json        ← identitas statis (ditulis saat materialisasi)
├── state.json           ← status berjalan (ditulis ulang pada titik protokol)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` MUST ditulis tepat sekali, ketika alur `create` mematerilasiasikan rencana, dan MUST NOT berubah setelahnya kecuali untuk migrasi versi spec yang dicatat di `PROGRESS.md`.

`state.json` MUST ditulis ulang oleh agent pada setiap titik protokol berikut: materialisasi rencana (semua tugas `pending`), mulai tugas (`in_progress`), setiap jalannya validation gate (catatan gate ditambahkan atau diperbarui), dan penyelesaian tugas (`completed`, sebagai bagian dari protokol penyelesaian tugas di [Spesifikasi DWP](/spec/dwp-specification#task-completion-protocol)).

Kedua berkas MUST ditulis secara atomik: tulis ke berkas sementara di direktori yang sama, kemudian ganti nama ke target. Penulisan yang gagal di tengah jalan MUST NOT meninggalkan berkas JSON yang terpotong.

## Kapan lapisan ini diwajibkan

- Untuk eksekusi **interaktif** di repositori git, lapisan status RECOMMENDED untuk rencana baru dan OPTIONAL untuk rencana sebelum v1.2. Sebuah rencana tanpa lapisan ini tetap konforman.
- Untuk eksekusi **tanpa pengawasan**, lapisan status REQUIRED.
- Di **ruang kerja agent** tanpa git, lapisan status REQUIRED: `state.json` membawa informasi pemulihan yang dibawa log git di sebuah repositori.

## `manifest.json` — identitas rencana

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, dan `task_count` adalah REQUIRED.

`archetype` MUST berupa salah satu dari `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` MUST berupa salah satu dari `micro`, `standard`, `deep` (lihat [Rigor proporsional](/spec/dwp-specification#proportional-rigor)).

`parent_plan` menghubungkan rencana turunan ke rencana orchestrator-nya (`{repo}:{plan_name}`, atau `null`).

`created_by` SHOULD mengidentifikasi agent dan model yang membuatnya. Ia MUST NOT mengandung secret, token, atau pengenal pengguna di luar nama tampilan.

## `state.json` — status eksekusi berjalan

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### Entri tugas

Setiap berkas tugas dalam rencana MUST memiliki tepat satu entri di `tasks`, yang dikunci berdasarkan nomornya (`id`) dan nama berkas (`file`).

`status` MUST berupa salah satu dari `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` hanya valid ketika pengguna secara eksplisit menghapus tugas dari cakupan melalui `refine`; `state.json` MUST NOT digunakan untuk melewati pekerjaan secara diam-diam.

Sebuah entri `completed` MUST membawa `completed_at` dan, di mana rencana melakukan commit, hash `commit` singkat — ini adalah tautan keterlacakan rencana-ke-kode.

### Catatan gate

Setiap jalannya perintah validasi SHOULD dicatat sebagai catatan gate: `command`, `passes` (boolean), `exit_code`, `last_run`, dan string `evidence` singkat yang dapat dibaca manusia (sebuah baris ringkasan atau sebuah path di bawah `analysis_results/`, tidak pernah keluaran perintah lengkap).

Sebuah tugas MUST NOT ditandai `completed` di `state.json` selama salah satu catatan gate-nya memiliki `passes: false` dan tidak ada jalannya yang kemudian lulus. Catatan gate adalah padanan mesin dari "jangan pernah tandai selesai tanpa bukti" — pola flag `passes` per-item yang menjaga penyelesaian prematur.

### Catatan outcome sebagai memori episodik

Sebuah tugas `completed` SHOULD membawa catatan `outcome`: apa yang `tried`, apa yang `failed`, apa yang `worked`, dan `notes` bentuk bebas. Pertahankan setiap entri dalam satu baris.

Catatan outcome menjadikan rencana yang selesai sebagai **memori episodik** yang dapat diambil kembali: sebuah agent (atau platform pengindeksan memori) dapat kemudian mengingat kembali bagaimana sebuah masalah diselesaikan, bukan sekadar bahwa masalah itu sudah selesai. Catatan ini memberi masukan ke tugas wajib Skills & Agents Discovery, yang SHOULD membacanya ketika menggali pola. Pada platform seperti Hermes yang mengindeks memori agent, catatan outcome di `state.json` membuat rencana yang selesai dapat langsung diambil kembali lintas sesi mendatang.

### Checkpoint dan status terblokir

`checkpoint` mencatat titik resume paling detail di dalam tugas saat ini: `id` tugas, `step` locator bentuk bebas, timestamp, dan catatan satu baris. Sebuah agent SHOULD memperbaruinya setiap kali berhenti di dalam sebuah tugas; ia MUST memperbaruinya sebelum interupsi yang direncanakan dalam mode tanpa pengawasan.

`blocked` adalah `null` atau `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Sebuah agent tanpa pengawasan yang menemui kondisi berhenti MUST mengisi `blocked` sebelum berhenti — inilah cara heartbeat daemon berikutnya, atau manusia, mengetahui mengapa rencana berhenti.

## Proyeksi dan rekonsiliasi

Markdown MUST menang dalam setiap ketidaksetujuan. Jika `state.json` menyatakan tugas 4 `completed` tetapi README rencana menampilkan kotak centang yang tidak ditandai, berkas status itu sudah usang.

Sebuah agent yang melanjutkan MUST membandingkan daftar kotak centang README terhadap `state.json` sebelum melanjutkan. Pada desinkronisasi ia MUST meregenerasi `state.json` dari markdown (dan log git, bila tersedia), mencatat rekonsiliasi di `PROGRESS.md`, dan baru kemudian melanjutkan.

Sub-skill `verify` MUST memperlakukan desinkronisasi sebagai temuan konformansi: melaporkan tugas mana yang berbeda dan dalam arah mana.

Alat selain agent yang mengeksekusi MUST memperlakukan kedua berkas JSON sebagai hanya-baca.

## Pemberian versi skema

Kedua skema diberi versi berdasarkan URL (`/v1.json`). Bidang tambahan diperbolehkan dalam satu versi; mengganti nama atau mengubah tipe sebuah bidang memerlukan `/v2.json` dan catatan migrasi di changelog spec. Bidang `spec_version` di manifes menentukan versi spec DWP tempat rencana dibuat; sebuah agent yang menemukan rencana yang lebih baru dari spec yang terinstal SHOULD menyatakannya alih-alih menebak.
