---
title: "Mulai Cepat — Deep Work Plan"
description: "Pasang skill, onboard repositori Anda, lalu rencanakan dan eksekusi dengan agent mana pun — langkah yang membuat repositori spec-driven dan dapat dikemudikan agent."
lastUpdated: 2026-05-31
---

## Mulai Cepat

Pasang skill, onboard repositori Anda, lalu rencanakan dan eksekusi dengan agent mana pun — langkah yang membuat
repositori Anda spec-driven dan dapat dikemudikan agent.

## Jalur adopsi

### 1. Pasang skill Deep Work Plan

Tambahkan skill ke repositori Anda. Ia membawa sebuah router ditambah delapan sub-skill — create, execute, refine,
resume, status, verify, onboard, dan author. Gunakan Skills CLI untuk jalur tercepat:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Atau klona repo dan jalankan setup di tempat git dan shell tersedia:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Onboard repositori

Jalankan sub-skill onboard dan biarkan agent bernalar tentang repo Anda yang sebenarnya — stack, package
manager, dan perintah validasi nyatanya:

```bash
/deepworkplan-onboard
```

Ia menghasilkan `AGENTS.md`, basis pengetahuan `docs/`, dokumentasi per modul, dan rumah `.agents/` lintas agent
(dengan symlink `.claude → .agents`), menyambungkan command `dwp-*` yang tipis, dan menyiapkan `.dwp/`
yang di-gitignore untuk rencana dan draf. Tidak ada yang ditemplatkan; semuanya disesuaikan dengan repositori Anda.

### 3. Kembangkan kit dan terima addon

Gunakan `/skill-create` dan `/agent-create` (sub-skill author) untuk menumbuhkan skill, agent, dan command
yang sesuai stack. Onboarding juga menawarkan lima addon opt-in — devcontainer, Dailybot,
dependency-upgrade, design-system, dan AI Diff Reviewer — yang Anda terima hanya ketika cocok. Sebuah repo sepenuhnya konforman dengan nol addon.

### 4. Rencanakan dan eksekusi

Hasilkan Deep Work Plan dan jalankan tugas demi tugas:

```bash
/dwp-create <goal>
/dwp-execute
```

Gunakan `/dwp-status`, `/dwp-refine`, dan `/dwp-resume` seiring pekerjaan berjalan. Setiap rencana membawa tugas bernomor,
validation gate, dan completion protocol sehingga pekerjaan tetap terstruktur dan dapat dilanjutkan lintas sesi.

## Hasilnya

Repositori Anda menjadi spec-driven dan dapat dikemudikan agent: rencana adalah sumber kebenaran yang tahan lama, dan
repositori itu sendiri menjadi harness tempat agent mana pun bekerja.

- [Baca metodologinya](/methodology)
- [Telusuri spesifikasinya](/spec)
- [Jelajahi kit](/kit)
