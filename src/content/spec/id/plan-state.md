---
title: Status rencana
description: "Lapisan status rencana yang dapat dibaca mesin: manifest.json dan state.json, catatan gate, catatan outcome sebagai memori episodik, rekonsiliasi, dan kapan lapisan ini diwajibkan."
order: 8
lang: id
section: State
---

# Status rencana

**Versi 5.0.0. Status: Stabil.** Dokumen ini menetapkan lapisan status rencana yang dapat dibaca mesin dari metodologi Deep Work Plan, kini diselaraskan dengan versi standar DWP itu sendiri — tidak ada persyaratan yang ada dilemahkan oleh penomoran ulang ini. Revisi ini juga mendokumentasikan updater status yang dijaga, publikasi rencana yang terverifikasi, dan aturan kebenaran-bukti yang harus dipenuhi sebuah rencana yang selesai (lihat di bawah). Kata kunci MUST, MUST NOT, SHOULD, SHOULD NOT, dan MAY harus ditafsirkan sebagaimana dijelaskan dalam RFC 2119.

Dua artefak JSON — `manifest.json` (identitas statis rencana) dan `state.json` (status eksekusi per-tugas yang berjalan, termasuk hasil validasi gate) — yang setiap rencana MAY bawa bersama berkas markdown-nya, dan yang wajib dibawa oleh eksekusi tanpa pengawasan (lihat [Protokol agent](/spec/agent-protocol#execution-profiles)) serta ruang kerja tanpa git (lihat [Arketipe](/spec/archetypes) §3).

Rencana markdown tetap menjadi **sumber kebenaran yang dapat dibaca manusia**. Lapisan JSON adalah **proyeksi turunan**: ia diperbarui oleh agent pada titik protokol yang telah ditentukan, tidak pernah diedit secara manual, dan tidak pernah dibiarkan berbeda diam-diam dari markdown. Tujuannya adalah interoperabilitas — linting, pemeriksaan konformansi, diffing, dasbor, penemuan registri, dan sinkronisasi dengan infrastruktur sesi eksternal — yang tidak satupun dapat dibangun secara andal di atas prosa.

## Mengapa ini ada

Hingga v1.1, rencana hanya berupa markdown prosa. Itu membuatnya dapat diaudit dan agnostik terhadap agent, tetapi tidak menyisakan apa pun yang dapat divalidasi, di-diff, atau dikonsumsi oleh sebuah alat: tidak ada gate konformansi, tidak ada deteksi desinkronisasi antara `README.md` dan `PROGRESS.md`, tidak ada cara bagi daemon atau sesi cloud untuk mengetahui status rencana tanpa mengurai prosa. v1.2 menambahkan proyeksi JSON tanpa menurunkan status markdown — proyeksi berasal dari markdown, dengan cara yang sama seperti lockfile berasal dari manifest.

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

`state.json` MUST ditulis ulang oleh agent pada setiap titik protokol berikut: materialisasi rencana (semua tugas `pending`), mulai tugas (`in_progress`), setiap jalannya validation gate (catatan gate ditambahkan atau diperbarui), dan penyelesaian tugas (`completed`, sebagai bagian dari protokol penyelesaian tugas di [Spesifikasi DWP](/spec/dwp-specification#task-completion-protocol)), sebuah checkpoint sebelum interupsi yang direncanakan, dan sebuah penghentian `blocked`.

Kedua berkas MUST ditulis secara atomik: tulis ke berkas sementara di direktori yang sama, kemudian ganti nama ke target. Penulisan yang gagal di tengah jalan MUST NOT meninggalkan berkas JSON yang terpotong.

## Kapan lapisan ini diwajibkan

- Untuk eksekusi **interaktif** di repositori git, lapisan status RECOMMENDED untuk rencana baru dan OPTIONAL untuk rencana sebelum v1.2. Sebuah rencana tanpa lapisan ini tetap konforman.
- Untuk eksekusi **tanpa pengawasan**, lapisan status REQUIRED.
- Di **ruang kerja agent** tanpa git, lapisan status REQUIRED: `state.json` membawa informasi pemulihan yang dibawa log git di sebuah repositori.

## `manifest.json` — identitas rencana

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count`, dan `plan_format` adalah REQUIRED.

`archetype` MUST berupa salah satu dari `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` MUST berupa salah satu dari `micro`, `standard`, `deep` (lihat [Rigor proporsional](/spec/dwp-specification#proportional-rigor)).

`plan_format` MUST berupa salah satu dari `lite`, `full` — representasi yang dipilih saat pembuatan (lihat [Rencana Lite](/spec/lite-plans)). Ia tidak dapat diubah di tingkat manifest: promosi berikutnya dari Lite ke Full dicatat di `state.json`, bukan dengan menulis ulang manifest.

`parent_plan` menghubungkan rencana turunan ke rencana orchestrator-nya (`{repo}:{plan_name}`, atau `null`).

`created_by` SHOULD mengidentifikasi agent dan model yang membuatnya. Ia MUST NOT mengandung secret, token, atau pengenal pengguna di luar nama tampilan.

## `state.json` — status eksekusi berjalan

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
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
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
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

Entri tugas pada rencana Lite menggunakan locator `inline` yang menunjuk ke jangkar tugas di `README.md`, bukan ke berkas terpisah — semua hal lain tentang entri itu (gates, outcome, status) bekerja dengan cara yang sama:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Format, materialisasi, persetujuan, dan promosi

`format` MUST berupa salah satu dari `lite`, `full` dan mencerminkan `plan_format` milik manifest — dapat diubah di sini, tidak seperti pada manifest, karena sebuah rencana Lite MAY kemudian dipromosikan menjadi Full. `materialization` MUST berupa salah satu dari `materializing` (folder rencana sedang ditulis), `ready` (materialisasi telah selesai), atau `promoting` (sebuah promosi Lite-ke-Full sedang berlangsung). `approval` MUST berupa salah satu dari `pending`, `approved`, `pre_approved`; ia bersifat OPTIONAL dalam skema ini agar sebuah rencana yang ditulis sebelum bidang ini dicatat tetap valid — ketika tidak ada, perlakukan baris `Approval` pada README sebagai nilainya, dan `pending` ketika keduanya tidak ada. `promotion` bernilai `null` di luar sebuah promosi, atau sebuah objek yang mencatat niat dan tugas tujuan promosi selama `materialization` bernilai `promoting`. Lihat [Rencana Lite](/spec/lite-plans) untuk siklus hidup lengkap yang dikodekan oleh bidang-bidang ini.

### Entri tugas

Setiap tugas — sebuah berkas terpisah dalam rencana Full, atau sebuah catatan inline `{#task-N}` dalam rencana Lite — MUST memiliki tepat satu entri di `tasks`, dikunci berdasarkan nomornya (`id`) dan `locator`-nya. `locator.kind` MUST berupa `file` (Full — `value` adalah nama berkas tugas) atau `inline` (Lite — `value` adalah jangkar tugas, `#task-N`).

`status` MUST berupa salah satu dari `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` hanya valid ketika pengguna secara eksplisit menghapus tugas dari cakupan melalui `refine`; `state.json` MUST NOT digunakan untuk melewati pekerjaan secara diam-diam.

Sebuah entri `completed` MUST membawa `completed_at` dan, di mana rencana melakukan commit, hash `commit` singkat — ini adalah tautan keterlacakan rencana-ke-kode.

### Catatan gate

Setiap jalannya perintah validasi SHOULD dicatat sebagai catatan gate: `command`, `passes` (boolean), `exit_code`, `last_run`, dan string `evidence` singkat yang dapat dibaca manusia (sebuah baris ringkasan atau sebuah path di bawah `analysis_results/` milik plan tersebut (di dalam folder plan itu sendiri, bukan di root repo), tidak pernah keluaran perintah lengkap).

Sebuah tugas MUST NOT ditandai `completed` di `state.json` selama salah satu catatan gate-nya memiliki `passes: false` dan tidak ada jalannya yang kemudian lulus. Catatan gate adalah padanan mesin dari "jangan pernah tandai selesai tanpa bukti" — pola flag `passes` per-item yang menjaga penyelesaian prematur.

### Catatan outcome sebagai memori episodik

Sebuah tugas `completed` SHOULD membawa catatan `outcome`: apa yang `tried`, apa yang `failed`, apa yang `worked`, dan `notes` bentuk bebas. Pertahankan setiap entri dalam satu baris.

Catatan outcome menjadikan rencana yang selesai sebagai **memori episodik** yang dapat diambil kembali: sebuah agent (atau platform pengindeksan memori) dapat kemudian mengingat kembali bagaimana sebuah masalah diselesaikan, bukan sekadar bahwa masalah itu sudah selesai. Catatan ini memberi masukan ke disposisi skills per-tugas dan ke rekonsiliasi skills pada Final Review, yang membacanya ketika menggali pola. Pada platform seperti Hermes yang mengindeks memori agent, catatan outcome di `state.json` membuat rencana yang selesai dapat langsung diambil kembali lintas sesi mendatang.

### Checkpoint dan status terblokir

`checkpoint` mencatat titik resume paling detail di dalam tugas saat ini: `id` tugas, `step` locator bentuk bebas, timestamp, dan catatan satu baris. Sebuah agent SHOULD memperbaruinya setiap kali berhenti di dalam sebuah tugas; ia MUST memperbaruinya sebelum interupsi yang direncanakan dalam mode tanpa pengawasan.

`blocked` adalah `null` atau `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Sebuah agent tanpa pengawasan yang menemui kondisi berhenti MUST mengisi `blocked` sebelum berhenti — inilah cara heartbeat daemon berikutnya, atau manusia, mengetahui mengapa rencana berhenti.

## Proyeksi dan rekonsiliasi

Markdown MUST menang dalam setiap ketidaksetujuan. Jika `state.json` menyatakan tugas 4 `completed` tetapi README rencana menampilkan kotak centang yang tidak ditandai, berkas status itu sudah usang.

Sebuah agent yang melanjutkan MUST membandingkan daftar kotak centang README terhadap `state.json` sebelum melanjutkan. Pada desinkronisasi ia MUST meregenerasi `state.json` dari markdown (dan log git, bila tersedia), mencatat rekonsiliasi di `PROGRESS.md`, dan baru kemudian melanjutkan.

Sub-skill `verify` MUST memperlakukan desinkronisasi sebagai temuan konformansi: melaporkan tugas mana yang berbeda dan dalam arah mana.

Alat selain agent yang mengeksekusi MUST memperlakukan kedua berkas JSON sebagai hanya-baca.

## Pembaruan status yang dijaga

Penulisan kemajuan biasa melewati sebuah updater bertarget bawaan skill, bukan penulisan ulang seluruh berkas. Ia menolak status yang cacat secara langsung, dan menolak menandai sebuah tugas sebagai `completed` tanpa bukti gate yang tidak kosong terlampir — sebuah bentuk `--gate-json` tersedia untuk sebuah perintah yang keluarannya mengandung karakter pipe, dan updater menerima objek gate tertutup yang sama seperti dijelaskan di atas. Percobaan ulang hanya menggantikan perintahnya sendiri; sebuah perintah yang berbeda menyimpan catatannya sendiri secara terpisah. `--block-reason` mencatat sebuah blocker; `--resolve-blocker` hanya menyelesaikan blocker tugas saat ini, tidak pernah tugas lain. Pekerjaan yang dilewati tidak pernah bisa membuat sebuah rencana `completed`. `--reopen-reason` mencatat niat pemanggil untuk mengubah rencana melalui `refine` — amandemen dan bukti apa pun yang dibatalkannya MUST dicatat lebih dulu di log tugas. `--expected-sha256` menolak sebuah penulisan terhadap snapshot status yang sudah berubah. Sebuah direktori `.lock` kooperatif menyerialkan penulis yang bersamaan; kunci milik sebuah penulis yang crash MUST diperiksa sebelum dihapus, dan tidak ada perlindungan yang diklaim terhadap sebuah editor yang melewati kunci itu sepenuhnya. Catatan ini menegaskan hasil — mereka sendiri tidak membuktikan bahwa sebuah perintah benar-benar dijalankan, atau bahwa keluarannya diterima secara semantik.

## Publikasi rencana yang terverifikasi

Sebelum mengumumkan penyelesaian, log tugas yang telah selesai (masing-masing membawa **Skills disposition**-nya dan, pada Final Review, **Documentation decision**-nya), indeks README, dan `PROGRESS.md` MUST ditulis dari hasil sumber dan penerimaan yang benar-benar diperoleh. Tugas terakhir rencana kemudian ditutup melalui finalizer bawaan skill: transisi terminalnya memvalidasi kandidat yang selesai terhadap setiap artefak rencana sebelum menulis status, memverifikasi berkas-berkasnya sesudahnya, dan mencatat sebuah tanda terima `analysis_results/FINALIZATION.json`. Sebuah gate lulus yang direkayasa MUST NOT mendasari transisi ini — tanda terima itu adalah bukti eksternal tentang apa yang benar-benar diperiksa, tidak pernah menjadi prasyaratnya sendiri. `bash ../verify/conformance.sh --plan PLAN_name` dijalankan berikutnya, terhadap artefak nyata di disk.

Sebuah publikasi yang terinterupsi meninggalkan sebuah penanda `.finalizing.json`; verifikasi normal gagal hingga bukti diperiksa dan helper pemulihan berhasil terhadap kandidat yang sama — tidak ada yang melanjutkan sebuah publikasi berdasarkan asumsi. Sebuah kunci kooperatif yang basi memerlukan konfirmasi bahwa tidak ada penulis yang masih aktif sebelum dihapus. Tidak ada apa pun di lapisan ini yang melakukan commit, push, menjalankan perintah gate yang tersimpan, atau memperbaiki markdown rencana secara diam-diam. Sebuah interpreter Python yang hilang menghasilkan `UNVERIFIED`, tidak pernah `completed`.

## Kebenaran bukti dan amandemen

Setiap perubahan pada cakupan, acceptance criteria, atau penundaan sebuah tugas membawa satu catatan amandemen yang tahan lama: kriteria asli secara verbatim, apa yang diamati, disposisinya, alasannya, otoritas di baliknya (pengguna, pengembang, atau bukti), tugas-tugas yang terdampak, dan bukti mana yang dibatalkan atau dipertahankan. Amandemen ditambahkan, tidak pernah diberi tanggal mundur; `manifest.json` mempertahankan provenance pembuatannya dan tidak pernah ditulis ulang untuk mencocokkan cakupan langsung yang berubah.

Lima status bukti menggambarkan terhadap apa sebuah catatan tugas boleh ditutup:

- **Investigasi selesai** — pekerjaan nyata yang tercatat; ia menutup sebuah tugas hanya terhadap kriteria revisian yang menamainya, tidak pernah terhadap yang asli seperti yang ditulis.
- **Skenario tidak dieksekusi** — dicatat sebagai tidak dilakukan; ia tidak menyumbang bukti lulus apa pun di era mana pun.
- **Kebutuhan yang ditunda** — kriteria berpindah ke sebuah tugas tujuan yang dinamai dengan otoritas yang tercatat; hanya amandemen itu yang menutup sumbernya.
- **Gate gagal** — tetap gagal hingga niat penerimaan yang sama dijalankan ulang dan lulus; sebuah percobaan ulang hanya menggantikan perintahnya sendiri.
- **Hasil produk tercapai** — kriteria seperti yang ditulis, diverifikasi oleh gate-nya sendiri; satu-satunya status yang menyelesaikan sebuah tugas tanpa perubahan.

Penegakan bersifat mekanis di mana pun catatan mengizinkannya. Bukti gate yang ditandai "invalidated by refine" adalah sejarah yang dipertahankan, tidak pernah bukti lulus, dan sebuah tugas selesai yang masih bergantung padanya dilaporkan oleh pemeriksa. Sebuah catatan lulus yang teksnya sendiri mengakui bahwa pemeriksaan tidak pernah berjalan (misalnya "never entered," "did not run," atau "cannot be measured") adalah sebuah kontradiksi, dilaporkan dengan cara yang sama — begitu juga sebuah tugas status selesai yang log-nya sendiri masih membaca `Status: pending`. Kontradiksi naratif di luar ini — sebuah laporan yang kesimpulannya bertentangan dengan checklist-nya sendiri — memerlukan seorang peninjau manusia; pemeriksa melaporkan apa yang dikatakan catatan, bukan apa yang dimaksud prosa. Seorang pengguna MAY secara eksplisit menerima sebuah pengecualian terbatas dengan otoritas yang tercatat; persetujuan di muka tanpa pengawasan tidak pernah menjadi izin umum untuk meninggalkan sebuah tujuan inti, dan sebuah kriteria wajib yang tidak dapat dipenuhi adalah sebuah blocker, tidak pernah pekerjaan yang selesai.

## Pemberian versi skema

Kedua skema diberi versi berdasarkan URL. Bidang tambahan diperbolehkan dalam satu versi; mengganti nama atau mengubah tipe sebuah bidang memerlukan versi skema baru dan catatan migrasi di changelog spec. Revisi ini memperkenalkan `/v2.json` untuk kedua skema: bidang `file` pada entri tugas menjadi `locator` yang bertipe (`{"kind": "file" | "inline", "value": ...}`), manifest mendapatkan `plan_format`, dan berkas status mendapatkan `format`, `materialization`, `approval`, dan `promotion` — bersama-sama bidang yang dibutuhkan rencana Lite (lihat [Rencana Lite](/spec/lite-plans)). Manifest dan berkas status `/v1.json` tetap valid dan tidak pernah ditulis ulang secara diam-diam menjadi v2; sebuah sesi `refine` MAY memigrasikan satu secara sengaja. Bidang `spec_version` pada manifest menentukan versi spec DWP tempat rencana dibuat; sebuah agent yang menemukan rencana yang lebih baru dari spec yang terinstal SHOULD menyatakannya alih-alih menebak.
