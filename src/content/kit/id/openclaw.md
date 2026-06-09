---
title: OpenClaw
description: "Adapter DWP untuk OpenClaw: pemindaian .agents/skills/ native, pemetaan eksekusi tanpa pengawasan, dan kelanjutan rencana berbasis cron untuk ruang kerja agent otonom."
kind: adapter
lang: id
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Adapter OpenClaw

OpenClaw adalah platform agent otonom yang menjalankan ruang kerja long-lived dengan giliran terjadwal. Ia secara native memindai `<workspace>/.agents/skills/` untuk pack skill yang terinstal, yang berarti skill DWP dimuat tanpa shim adapter apapun — instal di sana dan OpenClaw menemukannya secara otomatis.

## Tingkat dukungan

**Penuh** — OpenClaw membaca `AGENTS.md` dan memuat skill melalui standar AgentSkills. Semua sub-skill DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) tersedia.

## Instalasi

```bash
openclaw skills install deepworkplan
```

Atau secara manual: clone `DailybotHQ/deepworkplan-skill` ke dalam `<workspace>/.agents/skills/deepworkplan/`.

## Pemanggilan

Plain text — OpenClaw tidak menggunakan prefix slash command:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Pemetaan eksekusi tanpa pengawasan

Primitif penjadwalan OpenClaw dipetakan langsung ke model kelanjutan DWP:

| Primitif OpenClaw | Peran DWP |
|--------------------|----------|
| Akar ruang kerja | Arketipe [ruang kerja agent](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` di akar ruang kerja |
| `<workspace>/.agents/skills/` (pemindaian tier-2 native) | Tempat pack ini berada — tidak perlu shim adapter |
| Giliran heartbeat atau cron | Satu giliran [kelanjutan terjadwal](/spec/agent-protocol#scheduled-continuation): bangun → Protokol Resume DWP → tugas atomik berikutnya → perbarui status → yield |
| Pemeriksaan `HEARTBEAT.md` | Tambahkan satu baris: "Jika `.dwp/plans/` memiliki rencana terbuka, lanjutkan untuk satu tugas." |
| Standing orders | Batas persetujuan rencana dan otoritas terbatas dari profil tanpa pengawasan |

Secara operasional:

1. Manusia membuat dan menyetujui rencana secara interaktif. Persetujuan adalah titik kontrol — giliran tanpa pengawasan tidak pernah membuat dan mengeksekusi dalam satu giliran.
2. Rencana harus membawa lapisan status yang dapat dibaca mesin (`manifest.json` + `state.json`). Di ruang kerja tanpa git, `state.json` adalah yang membuat resume aman terhadap crash menjadi mungkin. Lihat [Status rencana](/spec/plan-state).
3. Setiap giliran heartbeat atau cron mengeksekusi paling banyak satu tugas, melewati validation gate-nya, memperbarui `state.json` secara atomik, dan yield.
4. Pada kondisi berhenti apapun, agent menulis kolom `blocked` di `state.json` dan melapor melalui saluran normal ruang kerja. Sekilas pandang manusia berikutnya — atau laporan heartbeat — melihat persis apa yang diperlukan.

Hasilnya: rencana multi-hari yang bertahan dari restart, perubahan model, dan batas sesi, dieksekusi semalaman oleh daemon — dengan gate yang sama yang akan dimiliki oleh jalannya yang diawasi manusia.

## Catatan

Ruang kerja OpenClaw adalah contoh kanonikal dari arketipe [ruang kerja agent](/spec/archetypes). Integrasi `HEARTBEAT.md` pack skill DWP dan persyaratan `state.json` dirancang dengan platform ini dalam pikiran.
