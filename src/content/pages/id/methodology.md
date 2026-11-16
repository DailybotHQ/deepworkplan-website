---
title: "Metodologi Deep Work Plan"
description: "Delapan bab dari manifesto hingga loop engineering: prinsip, core loop, template, skill, arketipe, banyak agent, swarm, dan loop dalam Deep Work Plan."
lastUpdated: 2026-11-16
---

## Metodologi Deep Work Plan

Paket 7.x saat ini membuat rencana baru menggunakan v7 secara default. Rencana yang ada mempertahankan generasi tercatat; migrasi memerlukan permintaan eksplisit.
Deep Work Plan (DWP) adalah metodologi terbuka dan agnostik terhadap framework untuk menjalankan pekerjaan teknik yang terstruktur dan otonom dengan AI coding agent. Ia mengubah tujuan yang samar menjadi rencana yang dapat ditinjau yang dapat dieksekusi, dijeda, dilanjutkan, dan dilaporkan oleh agent — tanpa kehilangan konteks.

DWP berpijak pada empat pilar — spec-first, repositori adalah harness, loop engineering, dan efisiensi terukur. Dalam satu kalimat: *Spec-first, loop tertutup: repositori adalah harness dan rencana berjalan sendiri hingga selesai.*

**Spec-first.** Alih-alih memperlakukan transkrip obrolan sebagai sumber kebenaran, Anda terlebih dahulu menuliskan *apa* yang harus benar — tujuan, lingkup, acceptance criteria, dan pemeriksaan yang membuktikan bahwa pekerjaan selesai — dan agent mengeksekusi terhadap spesifikasi itu. Dalam DWP, rencana *adalah* spec: rencana → tugas atomik → validation gate → penyelesaian. Menulis spec terlebih dahulu mengurangi penyimpangan (agent diukur terhadap kriteria yang dinyatakan), membuat pekerjaan dapat diverifikasi (setiap gate lulus atau gagal), dan membuatnya dapat dilanjutkan (spec bertahan melampaui sesi atau agent mana pun). Agnostik terhadap alat dan repo-native, ia berbeda dari sistem spec-driven yang terikat alat seperti GitHub Spec Kit, Amazon Kiro, dan Tessl.

**Repositori adalah harness.** Sebuah language model semata hanyalah peramal teks; yang membuatnya menjadi insinyur yang andal adalah *harness* di sekelilingnya — konteks, alat, sebuah control loop, pengaman, dan status yang persisten. Harness engineering adalah merancang perancah itu secara sengaja. Posisi DWP adalah bahwa harness itu seharusnya berada di repositori, bukan di sebuah alat: konteks sebagai `AGENTS.md` + `docs/`, alat sebagai kit `.agents/`, control loop sebagai rencana, pengaman sebagai validation gate, dan status sebagai `.dwp/` yang di-gitignore. Karena setiap bagiannya adalah berkas di dalam repo, harness ini portabel — sehingga agent mana pun dapat mengemudikan repo mana pun.

**Loop engineering.** Spesifikasi dan harness membuat pekerjaan benar dan portabel; loop engineering membuatnya selesai. Dengan addon Herdr opsional, sebuah rencana mendaftarkan lead-nya dan, bila menyebutkannya, para penerus; daemon yang hanya dimulai oleh manusia mendorong lead yang menganggur untuk melanjutkan, meminta penerus pertama yang dapat dijangkau untuk mengambil alih lead yang sudah tidak ada, dan melaporkan ketika rencana macet, terblokir, atau selesai. Dorongan tidak menambah wewenang — gate dan eskalasi rencana tetap mengikat seperti sebelumnya. Metodologi ini bekerja tanpa loop; loop hanya memperkuatnya.

**Efisiensi terukur.** Konteks adalah sumber daya paling langka yang dimiliki sebuah coding agent, dan metodologi yang menyia-nyiakannya gagal tepat ketika pekerjaan menjadi panjang. DWP memuat instruksi secara progresif — setiap panduan dimuat ketika pemicunya terpicu — memilih validasi dari apa yang sebenarnya disentuh setiap tugas, dan memutuskan skills di tingkat tugas. Byte instruksi yang dibutuhkan setiap alur diukur dan diterbitkan; tanpa persentase token yang dikarang.

Metodologi ini dijelaskan dalam delapan bab:

1. **Manifesto** — apa itu Deep Work Plan dan mengapa eksekusi terstruktur penting.
2. **Core loop** — siklus plan-execute-verify yang menggerakkan setiap tugas.
3. **Template** — struktur rencana dan tugas yang dibagikan agent dan manusia.
4. **Skill & agent** — bagaimana command dan peran agent saling melengkapi, kit hidup (bagaimana sebuah repositori menumbuhkan skill-nya sendiri lewat sub-skill author), dan addon opt-in seperti dependency-upgrade dan addon design-system untuk permukaan antarmuka apa pun yang menghadap pengguna (UI visual, output CLI, atau percakapan).
5. **Arketipe** — menyesuaikan metodologi dengan repo individual dan orchestrator hub.
6. **Menjalankan banyak agent** — lead dan lane-nya di berbagai panel, container, mesin, dan akun, dengan satu branch dan satu rilis per repositori.
7. **Otonomi swarm** — pemeriksaan kapasitas di batas tugas, paket handoff, suksesi lead dengan epoch, dan eskalasi khusus hal kritis, sehingga sebuah swarm bertahan dari batas satu akun atau hilangnya satu agent.
8. **Loop engineering** — registrasi rencana, daemon yang dimulai manusia, dorongan yang tidak menambah wewenang, failover ke penerus, event rencana, antrean rencana, dan peta armada.

- [Baca metodologinya](/methodology)
- [Baca spesifikasinya](/spec)
- [Telusuri kit](/kit)
