---
title: "Kebijakan privasi"
description: "Kebijakan privasi deepworkplan.com: situs statis tanpa akun, tanpa iklan, analitik agregat tanpa cookie, dan penjelasan lugas tentang apa saja yang sebenarnya dikumpulkan formulir kontak."
---

## Apa situs ini

deepworkplan.com adalah kumpulan halaman statis yang dilayani melalui CDN. Tidak ada login, tidak ada basis data pengguna, dan tidak ada cara bagi situs untuk menyimpan profil pribadi. Konten dikembangkan di repositori GitHub publik di bawah organisasi DailybotHQ, dan semua yang Anda baca di sini disajikan persis seperti yang dibangun.

## Analitik

Situs menggunakan Umami, layanan analitik tanpa cookie yang mengutamakan privasi, untuk menghitung tampilan halaman secara agregat. Umami tidak menetapkan cookie pelacakan dan tidak membangun profil lintas situs. Karena crawler AI tidak menjalankan JavaScript, sebuah edge function sisi server juga mencatat user agent dan path kunjungan bot otomatis sebagai peristiwa analitik anonim — ini mengidentifikasi perangkat lunak crawler (misalnya "GPTBot mengunjungi /init"), bukan pengunjung manusia.

## Cookie dan penyimpanan lokal

Situs tidak menetapkan cookie pelacakan. Satu-satunya hal yang disimpan di browser Anda adalah preferensi tema (mode terang atau gelap) yang disimpan di localStorage, yang tidak pernah meninggalkan perangkat Anda dan tidak dikirim ke mana pun. Jika Anda menghapus penyimpanan browser, situs cukup kembali ke tema bawaan sistem Anda.

## Layanan pihak ketiga

Hosting dan pengiriman berjalan di Cloudflare Pages, yang memproses log permintaan dan alamat IP di edge sebagai bagian dari mengoperasikan CDN dan memblokir penyalahgunaan, di bawah kebijakan privasi Cloudflare sendiri. Analitik agregat berjalan di Umami (cloud.umami.is). Jika Anda mengirimkan formulir kontak secara sukarela, jawaban Anda dikirim melalui Google Forms ke tim kami — itu satu-satunya tempat informasi yang Anda ketik dikumpulkan, dan hanya digunakan untuk membalas Anda.

## Yang tidak kami lakukan

Kami tidak menjual atau membagikan data pribadi, tidak menjalankan iklan atau piksel remarketing, tidak melakukan fingerprinting browser, dan tidak mengirim email pemasaran. Situs ini tidak memiliki pendaftaran buletin dan tidak ada telemetri di luar hitungan agregat tanpa cookie yang dijelaskan di atas.

## Pilihan Anda

Karena analitik di sini agregat dan tanpa cookie, tidak ada profil pribadi untuk diekspor atau dihapus. Anda dapat memblokir skrip analitik dengan pemblokir konten apa pun tanpa memengaruhi cara kerja situs. Jika Anda telah mengirimkan formulir kontak dan ingin pesan Anda dihapus, tulislah ke alamat kontak di bawah dan kami akan menghapusnya.

## Perubahan kebijakan ini

Jika kebijakan ini berubah secara material, tanggal pembaruan di [halaman kebijakan](https://deepworkplan.com/privacy) ikut berubah, dan penyuntingan substantif di-commit ke repositori situs web publik tempat siapa pun dapat meninjau riwayatnya.

## Kontak dan keamanan

Untuk pertanyaan privasi, tulis ke [security@dailybot.com](mailto:security@dailybot.com). Untuk melaporkan kerentanan keamanan, gunakan pelaporan kerentanan privat GitHub untuk repositori situs web dan skill — lihat [security.txt](https://deepworkplan.com/.well-known/security.txt) untuk alamat persisnya.
