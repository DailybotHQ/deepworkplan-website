---
title: Otonomi swarm
description: "Cara swarm agent bertahan dari batas satu akun atau hilangnya satu agent: pemeriksaan kapasitas, paket handoff, suksesi lead, dan eskalasi khusus hal kritis."
order: 7
lang: id
summary: Lane yang sadar kapasitas, handoff proaktif, suksesi lead dengan epoch, dan taksonomi eskalasi yang menjaga swarm tetap berjalan.
icon: shield
---

# Otonomi swarm

[Menjalankan banyak agent](/id/methodology/06-orchestration) menjelaskan lead dan lane-nya. Bab ini membahas apa yang menjaga penyiapan itu tetap berjalan ketika satu akun mencapai batasnya atau satu agent menghilang. Sebuah lane memeriksa berapa banyak ruang yang tersisa di akunnya dan menyerahkan pekerjaannya sebelum habis. Sebuah lead menyerahkan kepemimpinan, atau digantikan ketika ia menghilang. Swarm hanya menanyakan kepada pengembang hal yang benar-benar kritis.

Kegagalan yang dijawabnya konkret: lead yang kehabisan kuota di tengah rencana membuat setiap lane terlantar, dan tidak ada yang bergerak sampai seseorang membuka sesi baru. Dengan aturan di bawah ini, rencana terus bergerak di dalam otorisasi yang sudah diberikan pengembang.

Enam aturan membentuk semua hal di sini:

1. **Satu tugas per produk.** [coding-agents-kit](/id/kit/agentkit) (`ak`) mengetahui akun dan kapasitas, [herdr-peers](/id/kit/herdr) mengetahui pesan, panel, dan siapa yang memimpin, dan pack Deep Work Plan mengetahui metodenya: kapan melakukan handoff, apa yang dibutuhkan penerus, apa yang perlu dieskalasikan. Masing-masing tetap opsional. Tanpa mereka, aturan yang sama tetap berlaku, dengan pengembang yang meneruskan pesan dan meluncurkan ulang agent.
2. **Unit kontinuitas adalah rencana, bukan agent.** Setiap handoff dan suksesi adalah resume biasa ditambah paket kecil yang membawa apa yang tidak dibawa jurnal: niat yang sedang berjalan.
3. **Proaktif mengalahkan reaktif.** Sebuah agent memeriksa ruangnya di batas tugas dan melakukan handoff selagi ia masih dapat menulis paket yang baik. Bereaksi setelah batas tercapai tetap menjadi jaring pengaman.
4. **Otonomi tidak pernah memperluas otoritas.** Handoff, suksesi, peluncuran, dan penjadwalan berjalan di dalam otorisasi rencana. Tidak ada agent yang menjawab layar izin, bypass, login, persetujuan, atau pembayaran, dan pekerjaan hanya berpindah di antara akun yang dideklarasikan pengembang.
5. **Kontinuitas tidak pernah menurunkan standar.** Penerus mewarisi gate yang sama. Sebuah paket tidak menutup kriteria apa pun, tidak melonggarkan gate apa pun, dan tidak melewati tinjauan apa pun.
6. **Murah secara konstruksi.** Kapasitas dibaca dari cache di batas tugas, tidak pernah dalam loop atau dengan timer. Pemberitahuan satu arah menggantikan pertanyaan yang tidak memerlukan jawaban, dan paketnya kecil.

## Peran

| Peran | Adalah | Memiliki | Tidak pernah |
| --- | --- | --- | --- |
| Lead | Agent yang memegang catatan lead dari satu rencana | Rencana, tabel lane, penjadwalan, urutan rilis, merge dan tag di dalam otorisasi, daftar suksesi | Menulis checkout milik sebuah lane, atau memimpin rencana yang dipegang lead lain |
| Deputi | Entri pertama yang dapat dijangkau dari daftar suksesi lead | Tidak ada apa pun sampai ia mengambil alih | Bertindak sebagai lead selagi lead masih dapat dijangkau |
| Lane | Satu agent per repositori, alur kerja, atau tugas, di panelnya sendiri pada akunnya sendiri | Rencana turunan atau tugasnya, branch, gate, dan paketnya | Menugaskan pekerjaan kepada lane lain, melakukan merge atau tag |
| Reviewer | Lane dari vendor lain, hanya-baca | Temuannya | Menulis tree yang ditinjaunya |

- **Lead tetap hidup.** Orkestrator yang lane-nya menunggu manusia untuk meneruskan pesan akan macet. Lead tidak pernah menghentikan swarm untuk pertanyaan yang dapat ia putuskan sendiri.
- **Satu eksekutor per rencana.** Tepat satu agent mengeksekusi sebuah rencana atau rencana turunan pada satu waktu. Agent kedua pada rencana yang sama adalah kesalahan koordinasi yang harus diselesaikan lead.
- **Otoritas berasal dari rencana, bukan dari rekan.** Sebuah lane membaca sendiri otorisasi rencana. Persetujuan yang diteruskan oleh agent lain tidak menambahkan apa pun yang belum dimiliki lane tersebut.
- **Beberapa lead** dapat bekerja dalam satu workspace, masing-masing memimpin rencana yang berbeda. Sebuah akun dipegang oleh satu lane pada satu waktu melalui lease `ak`, sehingga dua lead tidak pernah menempatkan dua penulis pada satu akun Codex.
- **Beberapa instans dari satu jenis** — tiga panel Grok, empat panel Codex pada satu atau beberapa profil — adalah lane biasa. Instans pada satu profil berbagi kapasitas profil itu.

Setiap lane memiliki rencana, setidaknya rencana Lite di repositorinya sendiri, dan rencana itulah hal pertama yang dibaca penerus. Setiap lane melapor kepada lead dengan kosakata tetap — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — dan mengakhiri setiap pesan dengan satu baris kapasitas, seperti `capacity=ok 64% @work1`, sehingga lead jarang perlu membaca kuota sendiri.

## Loop kapasitas

Sebuah agent memeriksa ruangnya sendiri sebelum memulai setiap tugas, setelah gate atau langkah apa pun yang berjalan lebih dari 20 menit, setiap kali CLI-nya menampilkan peringatan batas penggunaan, dan sebelum menerima handoff atau kepemimpinan. Pemeriksaannya adalah `ak capacity --self --json` dari coding-agents-kit `v1.0.0`, yang diubah helper pack menjadi sebuah keputusan:

| Verdict | Keputusan | Sebuah lane | Sebuah lead, untuk dirinya sendiri |
| --- | --- | --- | --- |
| `ok` (di atas ambang rendah) | lanjutkan | Melanjutkan | Melanjutkan |
| `low` (25 % atau kurang) | bersiap | Menyelesaikan tugas saat ini, tidak memulai tugas yang tidak dapat ia selesaikan, melaporkan `capacity=low` | Menunjuk calon penerus dan tidak meluncurkan pekerjaan panjang pada dirinya sendiri |
| `critical` (10 % atau kurang, atau terkena rate limit) | serahkan | Mencapai titik aman berikutnya, menulis paket, memberi tahu lead, berhenti | Menyerahkan kepemimpinan sekarang |
| `unknown` (tanpa sumber kuota) | lanjutkan | Melaporkan `capacity=unknown`, melakukan handoff saat ada peringatan batas dari CLI atau layar `usage_limit` | Mengutamakan lane dengan kapasitas yang diketahui untuk tugas panjang |

- **Ambang batas** adalah milik kit: rendah pada 25 % dan kritis pada 10 % dari porsi bebas jendela pengikat secara default, dapat diatur dengan `AGENTKIT_CAPACITY_LOW` dan `AGENTKIT_CAPACITY_CRITICAL`. Pembacaan berasal dari cache yang disimpan selama 300 detik, sehingga memeriksa di setiap batas tugas hanya memakan beberapa panggilan vendor per jam.
- **Histeresis.** Setelah paket ditulis, handoff diselesaikan. Agent tidak pernah melanjutkan tugas itu setelah akunnya pulih; penerus yang memilikinya, dan akun yang pulih cukup kembali ke pool.
- **Tekanan konteks juga dihitung.** Ketika konteks agent mencapai ambang konteks segar dari kontrak (60 % secara default), paket dan handoff yang sama menyusul.
- **Degradasi yang jujur.** Tanpa kit, dengan kit yang lebih lama, atau di luar peluncuran `ak`, kapasitas dilaporkan sebagai tidak diketahui, tidak pernah sebagai ok.

**Pool adalah milik pengembang.** Rencana mencatat akun yang dideklarasikan pengembang untuk pekerjaan itu. Agent tidak pernah membuat akun, memperbarui login, memakai reset Codex, atau menggunakan akun di luar pool, dan ia bekerja dalam batas ketentuan setiap vendor. Memindahkan pekerjaan sebelum batas, di dalam pool, adalah penjadwalan; merotasi akun untuk melewati batas tidak pernah diizinkan. Untuk setiap tugas yang siap, lead mengambil akun dengan peringkat terbaik dari `ak pick --owner <lead>`, me-lease-nya ke alamat lane itu sendiri dengan `ak lease`, tidak pernah memberikan akun milik lead sendiri kepada sebuah lane (keduanya akan mencapai `critical` bersamaan), mengutamakan akun dengan kapasitas yang diketahui untuk tugas panjang dan vendor lain untuk reviewer, serta menyiapkan seorang deputi. Ketika tidak ada akun di pool yang memiliki ruang dan tidak ada yang di-reset dalam horizon rencana, swarm diparkir dengan reset terdekat dicatat.

## Handoff lane

1. **Lane**, pada `handoff`, mencapai titik aman — sebuah langkah di-commit, atau tree dibiarkan apa adanya, tidak pernah pekerjaan dibuang — menulis paket, mengirim `handoff <packet path>` kepada lead sebagai pemberitahuan, lalu berhenti. Ia tidak menutup panelnya sendiri.
2. **Lead**, atau deputi ketika lead tidak dapat dijangkau atau sendiri dalam kondisi kritis, memilih sebuah akun (`ak pick <kind> --owner <lead> --exclude @<spent>`, mengutamakan vendor lain bila tugas memungkinkan), me-lease-nya, dan meluncurkan penerus di checkout yang sama dengan arahan untuk melanjutkan rencana dari paket tersebut.
3. **Penerus** menerima paket — helper memverifikasi rencana, kontrak yang aktif, branch, commit head, dan path yang belum di-commit, serta tidak mencatat apa pun jika ada ketidakcocokan — lalu melanjutkan rencana dan menjalankan ulang setiap gate yang dicantumkan paket sebagai belum diverifikasi.
4. **Lead** melepaskan lease yang sudah terpakai dan menutup panel yang sudah terpakai setelah penerus menerima.

**Paket handoff** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) ditulis di bawah `analysis_results/handoff/` milik rencana dengan izin khusus pemilik. Paket ini menyebut rencana, kontrak, tugas, dan langkah; alasannya (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit`, atau `lead_handover`); di mana pekerjaan berada (repositori, checkout, branch, head, apakah sudah di-push, path yang belum di-commit); apa yang sudah selesai, terverifikasi, dan belum terverifikasi, beserta path buktinya; langkah berikutnya secara berurutan; ask yang masih terbuka; keputusan yang diambil; lead dan epoch; serta siapa yang menulisnya. Paket adalah data: ia tidak pernah membawa nilai secret, konten privat dari repositori lain, atau instruksi yang memperluas otoritas. Penerus menurunkan ulang tindakan berikutnya dari rencana.

## Suksesi lead

herdr-peers `v1.0.0` menyimpan satu catatan lead per rencana — lead, epoch, daftar suksesi, dan lane — dan mengarahkan alamat `lead` ke lead saat ini, sehingga tidak ada arahan lane yang menuliskan panel lead secara permanen.

- **Klaim dulu, lalu luncurkan.** Lead menjalankan `herdr-peers lead claim --plan <P> --succession <A,B>` sebelum meluncurkan lane mana pun — alamat `lead` baru dapat di-resolve setelah sebuah catatan ada — memperbarui catatan itu dengan `--lanes <A,B>` saat lane dimulai, dan menjalankan `lead release` ketika rencana selesai. Sejak herdr-peers (`v0.3.2`), catatan itu menyimpan repositori yang mengklaimnya secara lokal, dan rencana dengan id yang sama di repositori lain dinamai `--plan <repo>/<id>`. Suksesi default adalah penerus yang direncanakan, lalu lane di checkout rencana itu sendiri menurut urutan peluncuran, lalu lane mana pun di host yang sama; lane di container atau di mesin lain berada di urutan terakhir.
- **Handover, terencana.** Pada `low`, lead menunjuk calon penerus. Pada `critical`, ia menulis paket lead — tabel lane, ask yang terbuka, urutan rilis, merge yang tertunda, keputusan — menjalankan `herdr-peers lead handover <addr> --plan <P>`, yang menaikkan epoch dan memberi tahu setiap lane, lalu berhenti. Penerus menerima paket, melanjutkan rencana orkestrator, dan memeriksa ulang setiap lane.
- **Takeover, tidak terencana.** Ketika lead tidak dapat dijangkau, tidak memiliki agent, menampilkan layar `usage_limit`, atau sebuah ask kepadanya habis waktu dua kali, entri pertama yang dapat dijangkau dari daftar suksesi menjalankan `herdr-peers lead takeover --plan <P>` — sendiri, atau dengan meluncurkan panel lead baru di checkout rencana. Lead baru membangun ulang status dari rencana. Niat yang sedang berjalan yang hilang dicatat sebagai hilang, tidak pernah dikarang.
- **Fencing.** Hanya pemegang epoch tertinggi yang bertindak sebagai lead. Sebuah lane menerima pemberitahuan lead hanya dari agent yang memberinya arahan (klaim pertama), dari lead saat ini pada epoch berikutnya (handover), atau dari entri suksesi pertama yang dapat dijangkau pada epoch berikutnya (takeover); hasil seri dimenangkan posisi suksesi yang lebih awal, dan lead yang kembali lalu melihat epoch yang lebih tinggi akan mundur. Merge, tag, dan rilis hanya dilakukan oleh lead epoch saat ini, diperiksa terhadap remote terlebih dahulu, dan mengikuti aturan merge milik repositori itu sendiri.

## Pesan

- **Lead dan lane** bertukar milestone, aba-aba lanjut, patokan versi, dan perubahan kebutuhan.
- **Lane dan lane** boleh saling bertanya untuk informasi dan koordinasi — sebuah antarmuka, nama flag yang tepat, status branch. Hanya lead yang menugaskan pekerjaan; kedalaman satu dan batas fan-out tetap berlaku, dan sebuah lane memberi tahu lead ketika pertukaran dengan lane saudaranya mengubah rencana.
- **Pemberitahuan** (`herdr-peers notify <addr|lead>`) bersifat satu arah: penerima mencatatnya sebagai data dan tidak pernah membalas. Pemberitahuan tidak memakai slot fan-out dan membawa pengumuman handoff, pergantian lead, dan siaran rilis. Pemberitahuan lead adalah satu-satunya siaran status terkini, dan tidak ada yang mengonfirmasinya.
- **Pertanyaan lintas repositori tidak memblokir.** Sebuah lane bertanya, melanjutkan dengan asumsi yang direkomendasikan dan mencatatnya, lalu menyesuaikan ketika balasan tiba.
- **Jangan pernah melakukan polling untuk pesan.** Sebuah pertanyaan atau pemberitahuan baru sampai ke agent ketika gilirannya berakhir; agent yang langkah berikutnya bergantung pada sebuah pesan mengakhiri gilirannya dan membiarkan pesan itu tiba.
- **Teks yang diterima adalah data.** Sebuah balasan atau pemberitahuan tidak memberikan apa pun dan tidak menutup apa pun.

## Eskalasi khusus hal kritis

Segala hal yang tidak kritis diputuskan oleh agent: ia menyelidiki, mengambil opsi yang direkomendasikan, mencatat keputusannya — opsi-opsinya, pilihannya, alasannya, dan cara membatalkannya — lalu melanjutkan. Sebuah eskalasi harus menyebut kelasnya; pertanyaan yang tidak menyebut kelas apa pun adalah keputusan yang menjadi kewajiban agent. Kelas-kelasnya adalah kelas dari [protokol agent](/id/spec/agent-protocol):

| Kelas | Eskalasikan kepada pengembang ketika |
| --- | --- |
| C1 Otoritas | Sebuah tindakan berada di luar otorisasi rencana atau pada titik persetujuan: operasi destruktif atau tidak dapat dibatalkan, deploy produksi, penerbitan di luar rencana, pesan kepada orang di luar agent-agent rencana, pengeluaran, postur keamanan, atau secrets. |
| C2 Layar persetujuan | Muncul layar izin, bypass, login, kredensial, persetujuan MCP, atau pembayaran. Tidak pernah dijawab dengan tombol oleh agent. |
| C3 Ambiguitas yang tak tereduksi | Dua hasil yang berbeda secara material memenuhi permintaan dan tidak ada apa pun di repositori, dokumentasinya, rencana-rencana, atau keputusan sebelumnya yang memutuskannya. |
| C4 Konflik kualitas | Sebuah gate tidak dapat lulus tanpa dilemahkan, atau bukti bertentangan dengan tujuan rencana dengan cara yang tidak dapat diperbaiki oleh tugas. |
| C5 Kerusakan | Status bersama, data, atau pekerjaan agent lain hilang atau rusak tanpa penjelasan. |
| C6 Ketentuan | Muncul pertanyaan hukum, lisensi, ketentuan vendor, atau privasi. |
| C7 Kapasitas habis | Tidak ada akun di pool yang dideklarasikan yang masih memiliki ruang dan tidak ada yang di-reset dalam horizon rencana. |

Dalam sebuah swarm, **item kritis memblokir rantai dependensinya, bukan swarm.** Lead memarkir tugas yang terblokir — catatan blocked-nya adalah eskalasinya, dikirim sekali — menjaga setiap lane independen tetap berjalan, dan melanjutkan rantai itu ketika pengembang menjawab. Otonomi tidak pernah menutup persetujuan manusia, kata-kata harfiah pengembang mengalahkan sebuah rekomendasi, dan persetujuan yang diteruskan oleh agent dicatat sebagai diteruskan, tidak pernah seolah-olah ditulis sendiri oleh pengembang.

## Standar kualitas

Sebuah swarm hanya layak dijalankan jika hasilnya dapat dipercaya. [Standar kualitas](/id/spec/dwp-specification) berlaku untuk setiap agent yang melanjutkan sebuah rencana:

- **Gate adalah hipotesis.** Gate yang baru atau diubah ditunjukkan gagal pada cacat yang sengaja ditanam sebelum dipercaya, dan kelulusan hampa — binary yang hilang, nol berkas yang cocok, log kosong — adalah kegagalan. Tugas yang memiliki kontrak input menyebutkan kasus tepinya — kosong, multi-baris, spasi di sekelilingnya — agar lulus pada setiap contoh tidak disangka membuktikan aturannya.
- **Bandingkan dengan basis.** Performa, cakupan, dan ukuran dibandingkan dengan branch dasar, tidak hanya dengan ambang batas.
- **Ukur lebih dulu, desain sebelum membangun.** Sebuah perbaikan atau audit memverifikasi premis dan alat ukurnya lebih dulu; perubahan yang tidak sepele menuliskan antarmuka, mode kegagalan, keamanan, dan test sebelum kode.
- **Tinjauan sebelum langkah yang tidak dapat dibatalkan.** AI Diff Review lokal berjalan sebelum merge, tag, atau publikasi apa pun, dan perubahan metodologi atau protokol mendapat reviewer dari vendor lain.
- **Kontinuitas tidak pernah menurunkan standar.** Penerus menjalankan ulang apa yang dicantumkan paket sebagai belum diverifikasi; handoff tidak pernah menjadi jalan pintas melewati gate.

## Catatan

Jurnal rencana orkestrator mencatat swarm: peluncuran dan hasil lane sebagai event delegasi; verdict kapasitas, handoff, dan suksesi sebagai observasi; eskalasi dan jawaban pengembang sebagai intervensi. Paket dan catatan penerimaannya tetap berada di rencana yang mengeksekusi pekerjaan, dan laporan penyelesaian menyebut setiap handoff dan suksesi beserta paketnya.

## Melatihnya

Buktikan loop ini sebelum mengandalkannya. Pada repositori percobaan dengan rencana orkestrator kecil, jalankan satu lead dan setidaknya tiga lane pada akun atau vendor yang berbeda. Batasi kapasitas yang dilaporkan satu lane — `AGENTKIT_CAPACITY_CAP=@<profile>=8` menurunkan pembacaan dan tidak pernah dapat menaikkannya — dan amati lane itu menulis paket, lead meluncurkan penerus yang menerimanya, dan penerus itu lulus gate. Batasi lead dengan cara yang sama dan amati handover serta lead baru menyelesaikan rencana. Lalu catat buktinya di `analysis_results/` milik rencana: tanpa penekanan tombol manusia, setiap paket, setiap epoch, satu ask antar-lane, dan gate-nya.
