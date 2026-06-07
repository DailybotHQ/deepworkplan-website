---
title: "Metodologi Deep Work Plan"
description: "Lima bab dari manifesto hingga arketipe: prinsip, core loop, template, skill, dan adaptasi di balik metodologi Deep Work Plan."
lastUpdated: 2026-05-30
---

## Metodologi Deep Work Plan

Deep Work Plan (DWP) adalah metodologi terbuka dan agnostik terhadap framework untuk menjalankan pekerjaan teknik yang terstruktur dan otonom dengan AI coding agent. Ia mengubah tujuan yang samar menjadi rencana yang dapat ditinjau yang dapat dieksekusi, dijeda, dilanjutkan, dan dilaporkan oleh agent — tanpa kehilangan konteks.

DWP berpijak pada dua pilar.

**Spec-driven development.** Alih-alih memperlakukan transkrip obrolan sebagai sumber kebenaran, Anda terlebih dahulu menuliskan *apa* yang harus benar — tujuan, lingkup, acceptance criteria, dan pemeriksaan yang membuktikan bahwa pekerjaan selesai — dan agent mengeksekusi terhadap spesifikasi itu. Dalam DWP, rencana *adalah* spec: rencana → tugas atomik → validation gate → penyelesaian. Menulis spec terlebih dahulu mengurangi penyimpangan (agent diukur terhadap kriteria yang dinyatakan), membuat pekerjaan dapat diverifikasi (setiap gate lulus atau gagal), dan membuatnya dapat dilanjutkan (spec bertahan melampaui sesi atau agent mana pun). Agnostik terhadap alat dan repo-native, ia berbeda dari sistem spec-driven yang terikat alat seperti GitHub Spec Kit, Amazon Kiro, dan Tessl.

**Harness engineering — repositori menjadi harness.** Sebuah language model semata hanyalah peramal teks; yang membuatnya menjadi insinyur yang andal adalah *harness* di sekelilingnya — konteks, alat, sebuah control loop, pengaman, dan status yang persisten. Harness engineering adalah merancang perancah itu secara sengaja. Posisi DWP adalah bahwa harness itu seharusnya berada di repositori, bukan di sebuah alat: konteks sebagai `AGENTS.md` + `docs/`, alat sebagai kit `.agents/`, control loop sebagai rencana, pengaman sebagai validation gate, dan status sebagai `.dwp/` yang di-gitignore. Karena setiap bagiannya adalah berkas di dalam repo, harness ini portabel — sehingga agent mana pun dapat mengemudikan repo mana pun.

Metodologi ini dijelaskan dalam lima bab:

1. **Manifesto** — apa itu Deep Work Plan dan mengapa eksekusi terstruktur penting.
2. **Core loop** — siklus plan-execute-verify yang menggerakkan setiap tugas.
3. **Template** — struktur rencana dan tugas yang dibagikan agent dan manusia.
4. **Skill & agent** — bagaimana command dan peran agent saling melengkapi, kit hidup (bagaimana sebuah repositori menumbuhkan skill-nya sendiri lewat sub-skill author), dan addon opt-in seperti dependency-upgrade dan addon design-system frontend.
5. **Arketipe** — menyesuaikan metodologi dengan repo individual dan orchestrator hub.

- [Baca metodologinya](/methodology)
- [Baca spesifikasinya](/spec)
- [Telusuri kit](/kit)
