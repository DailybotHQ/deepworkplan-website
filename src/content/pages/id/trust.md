---
title: "Kepercayaan dan keamanan"
description: "Mengapa Deep Work Plan aman untuk diadopsi: sumber terbuka dan berlisensi MIT, Markdown-first tanpa panggilan jaringan atau telemetri, non-destruktif berdasarkan desain, dengan instalasi yang dapat diverifikasi dan kebijakan pengungkapan kerentanan yang jelas."
lastUpdated: 2026-06-05
---

## Mengapa Anda bisa mempercayainya

Tidak ada yang harus memasang skill yang tidak bisa dipercaya. Deep Work Plan dibangun untuk diverifikasi, bukan diterima begitu saja: sumber terbuka, Markdown-first, non-destruktif, dan dapat diperiksa sebelum Anda menjalankannya.

- **Sumber terbuka dan berlisensi MIT** — situs web dan skill keduanya publik dan dapat dibandingkan; baca setiap baris sebelum menjalankannya.
- **Markdown-first — tanpa jaringan, tanpa telemetri** — tidak ada CLI, tidak ada HTTP API, tidak ada alur autentikasi; tidak melakukan panggilan jaringan dan tidak mengirim telemetri. Tidak ada yang berkaitan dengan repositori Anda yang meninggalkan mesin Anda.
- **Non-destruktif berdasarkan desain** — satu-satunya tindakan yang relevan dari segi keamanan adalah mengubah repositori Anda, dan ia merekonsiliasi alih-alih menimpa: mendeteksi apa yang ada, mengusulkan rencana, dan bertanya sebelum mengganti apa pun. Keluaran rencana berada di direktori `.dwp/` yang di-gitignore.
- **Tidak menyentuh rahasia** — tidak pernah melakukan commit rahasia, menambahkan ke `.gitignore` alih-alih menulisnya ulang, dan menjaga perubahan dalam diff kecil yang mudah ditinjau.
- **Asal-usul yang dapat diverifikasi** — setiap rilis menerbitkan checksum atas skill yang dikirimkan.

---

## Verifikasi sebelum menjalankan

Perlakukan skill sebagai tidak tepercaya sampai Anda telah memeriksanya. Setiap rilis melampirkan file `SHA256SUMS` yang mencakup skill yang dikirimkan. Unduh untuk versi yang ingin Anda pasang, lalu verifikasi bahwa salinan Anda cocok — keluaran non-zero berarti sebuah file tidak cocok dan Anda harus berhenti.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Unduh checksum untuk rilis yang ingin Anda pasang (ganti vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # keluaran non-zero berarti file tidak cocok — berhenti
```

Rilis **ber-checksum, bukan ditandatangani** — penandatanganan (cosign atau GPG pengelola) adalah langkah berikutnya yang terdokumentasi, bukan klaim saat ini. Karena semuanya terbuka, Anda juga dapat membandingkan file mana pun terhadap repositori pada tag-nya.

---

## Laporkan kerentanan

Laporkan masalah keamanan secara pribadi ke **security@dailybot.com** daripada membuka issue publik. Kami mengakui laporan dalam 3 hari kerja dan bertujuan mengirimkan perbaikan atau mitigasi dalam 30 hari untuk temuan yang valid, tergantung pada tingkat keparahannya. Situs web dan skill berbagi kebijakan yang sama.

---

## Keterbatasan yang jujur

- Rilis ber-checksum, belum ditandatangani secara kriptografis — penandatanganan direncanakan, belum dilakukan.
- Deep Work Plan menjalankan coding agent otonom terhadap repositori Anda. Tinjau rencana yang diusulkannya dan diff-nya; metodologi dirancang untuk tinjauan itu, bukan untuk menggantikannya.
- Klaim kepercayaan di sini hanya mendeskripsikan sumber resmi. Salinan yang dimodifikasi atau pihak ketiga yang telah menyimpang dari repositori tidak membawa satu pun dari jaminan ini — verifikasi dulu.

---

## Sumber daya kepercayaan

- [Manifes kepercayaan yang dapat dibaca mesin](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Kebijakan keamanan situs web](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Kebijakan keamanan skill & model ancaman](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Baca metodologinya](/methodology)
- [Adopsi (init)](/init)
