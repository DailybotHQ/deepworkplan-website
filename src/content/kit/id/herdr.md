---
title: Herdr
description: "Serahkan pekerjaan ke agen coding lain di panel Herdr, di mesin mana pun, dan terima satu balasan yang diotorisasi. Rencana yang mendelegasikan, tercatat."
kind: addon
lang: id
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) menempatkan coding agent di dalam panel, di mesin Anda dan di mesin yang dijangkaunya melalui SSH. Addon ini memungkinkan sebuah Deep Work Plan menggunakan agen-agen tersebut sebagai **rekan** (peer): sebuah rencana dapat menyerahkan tugas yang terbatas kepada agen di panel lain, menerima tepat satu balasan yang diotorisasi, dan menyimpan catatan pertukaran tersebut.

Ini adalah addon opsional dari **DWP v7** (pack `v7.8.1`). Metodologinya bekerja sama saja tanpanya: jika addon tidak ada atau dinonaktifkan, setiap tugas berjalan di sesi saat ini, persis seperti sebelumnya.

## Apa yang diintegrasikan

Addon ini adalah integrator yang tipis. Pekerjaannya dilakukan oleh **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, sebuah skill MIT mandiri yang dipatok pada **`v1.0.0`** dan berguna tanpa Deep Work Plan. Skill ini mendefinisikan hal-hal yang dibiarkan terbuka oleh Herdr sendiri: siapa yang boleh menjawab, bagaimana jawaban menemukan jalan kembali lintas mesin, bagaimana dua agen menghindari saling menjawab tanpa henti, dan di mana catatan "saya bertanya, ia menjawab" disimpan.

| Item | Nilai |
|---|---|
| Produk | `DailybotHQ/herdr-peers`, tag `v1.1.0`, protokol 1 |
| Kunci registri | `herdr` di `.dwp/config.json` |
| Transport | interaktif: rekan di panel Herdr |
| Menyediakan | `subagents`, `cancel_children` |
| Membutuhkan | izin `agent_delegation` dari kontrak rencana |

**Stabil sejak `v1.0.0`.** Antarmuka publiknya mengikuti semantic versioning: verb CLI beserta flag yang terdokumentasi, kode keluar `0`–`7`, variabel `HERDR_PEERS_*`, `DWP_PLAN`, dan `DWP_TASK` yang terdokumentasi, protokol 1, serta kontrak JSON `herdr-peers/lanes-v1`, `herdr-peers/lead-v1`, dan catatan delegasi. Perubahan yang merusak kompatibilitas pada salah satunya menaikkan versi mayor, dan perubahan format wire juga menaikkan nomor protokol. `v1.0.0` tidak mengubah perilaku apa pun dari `v0.3.3`, dan rilis 0.x tidak lagi didukung.

## Instalasi

Instal herdr-peers dan skill resmi Herdr yang menjadi dependensinya. Setiap mesin yang agennya perlu menjawab juga membutuhkan skill tersebut.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Persyaratan: Herdr 0.9.1 atau lebih baru, `bash`, dan `python3` 3.9 atau lebih baru (hanya pustaka standar). Onboarding menawarkan addon ini dan mencatat jawaban Anda di registri addon; addon ini tidak pernah diaktifkan tanpa persetujuan.

## Yang ditambahkan ke rencana

- **Delegasi ke rekan.** Pada rencana v7 yang kontraknya memberikan izin `agent_delegation`, `execute` dapat menyerahkan tugas `parallel_safe`, atau pertanyaan baca-saja, kepada agen di panel lain, di mesin ini atau mesin lain.
- **Satu balasan yang diotorisasi.** Permintaan membawa cap yang mengotorisasi tepat satu jawaban. Rekan membalas satu kali melalui helper, dan balasan tersebut membawa capnya sendiri.
- **Catatan sebelum diandalkan.** Setiap delegasi ditulis ke `analysis_results/delegations.ndjson` milik rencana sebelum balasannya digunakan, dan dipetakan ke peristiwa jurnal v7 `delegation`.
- **Hasil tetap berupa klaim sampai diperiksa.** Jawaban rekan adalah bukti `asserted` sampai penjalan gerbang (gate runner) milik rencana itu sendiri mengamatinya. Jawaban itu tidak pernah menutup tugas dengan sendirinya.

## Model keamanan

| Aturan | Artinya |
|---|---|
| Izin terlebih dahulu | Delegasi hanya berjalan ketika kontrak rencana memberikan izin `agent_delegation`. |
| Batas kedalaman 1 | Pesan yang dicap `depth=1` atau `reply-to=` tidak pernah dijawab, dan agen delegasi tidak pernah mendelegasikan lagi. |
| Batas fan-out | Paling banyak empat rekan per pemanggil secara default. |
| Data, bukan instruksi | Balasan tidak pernah memberikan otoritas yang belum dimiliki penerima. |
| Satu penulis per path | Rekan yang menulis bekerja di worktree git miliknya sendiri. |

herdr-peers tidak mengautentikasi pengirim: kolom `from=` dalam cap adalah sebuah klaim. Mitigasinya adalah daftar izin `HERDR_PEERS_SCOPE`, yang membatasi workspace dan mesin yang diterima oleh rekan.

## Container dan host

Dengan addon [devcontainer](/kit/devcontainer) pada devcontainer-kit `v1.0.1`, setiap container dck menyertakan herdr-peers dan bergabung ke mesh saat `dck up`: agennya dapat bertanya kepada agen di host, di container lain, dan di container loopback lain milik host, lalu menerima balasannya. `dck setup` memasang herdr-peers yang terverifikasi di host, sehingga agen host juga dapat membalas. Listener host dan kunci tambahan yang mengizinkan container lain masuk adalah keputusan Anda di profil host kit; addon ini tidak pernah menyetelnya. Sejak herdr-peers (`v0.2.3`), setiap mesin menyimpan state-nya sendiri (`$XDG_STATE_HOME/herdr-peers/<server>/`), sehingga checkout yang dipakai bersama oleh host dan container tidak lagi mencampur catatan keduanya, dan sejak devcontainer-kit (`v0.3.3`) container mengekspor `HERDR_PEERS_SELF` sendiri, sehingga agen Codex di dalamnya menjangkau mesin lain tanpa langkah manual.

## Herdr atau agentkit

Kedua addon mengimplementasikan antarmuka delegasi yang sama — `launch`, `observe`, `collect`, `cancel` — dengan transport yang berbeda.

| Situasi | Gunakan |
|---|---|
| Tugas `parallel_safe` yang terbatas dengan keluaran yang dideklarasikan | [agentkit](/kit/agentkit) (`ak run` headless di dalam worktree) |
| Tugas memerlukan interaksi, berjalan lama, atau berada di mesin lain | Herdr (rekan di panel) |

Untuk lead yang menjalankan banyak lane sekaligus — panel di host, di container, dan di mesin lain, masing-masing pada akunnya sendiri — `herdr-peers lanes` mencantumkan setiap lane beserta statusnya, `herdr-peers status <pane>` mengklasifikasikan layar tempat lane yang blocked berada, dan setiap catatan delegasi menyebut akun dan vendor yang mengerjakannya. Lihat [Menjalankan banyak agent](/methodology/06-orchestration).

**Setiap lane menyebut panelnya sendiri.** Di bawah aturan otonomi swarm (Guide §17.2), setiap lane meneruskan panelnya sendiri dengan  pada setiap kata kerja herdr-peers (, , , , , , ) untuk mencegah salah atribusi pesan dan saturasi slot distribusi. Lane Codex mewajibkannya secara khusus karena berbagi server latar belakang antar sesi.

## Pemberitahuan dan kepemimpinan

herdr-peers (`v0.3.2`) menambahkan hal yang memungkinkan sebuah swarm bertahan lebih lama dari lead-nya ([Otonomi swarm](/id/methodology/07-swarm-autonomy)):

- **Pemberitahuan.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` mengirim pesan satu arah yang diberi cap `reply=no`. `check` milik penerima mengklasifikasikannya sebagai pemberitahuan, mencatatnya sebagai data, dan tidak pernah membalasnya. Pemberitahuan tidak memakai slot fan-out dan boleh dikirim saat sebuah ask masih terbuka; gunakan untuk pengumuman handoff, pergantian lead, dan siaran rilis.
- **Satu catatan lead per rencana.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` menjadikan sebuah agen lead dari satu rencana; `lead show` mencetak catatannya (skema `herdr-peers/lead-v1`: rencana, lead, epoch, suksesi, lane, waktu pembaruan). `lead handover <addr> --plan <P>` menyerahkan kepemimpinan, `lead takeover --plan <P>` membiarkan deputi pertama yang dapat dijangkau mengambil alih ketika lead hilang, dan `lead release --plan <P>` mengakhirinya. Setiap perubahan menaikkan epoch dan memberi tahu setiap lane. Klaim rencana sebelum meluncurkan lane-nya: `lead` baru dapat di-resolve setelah sebuah catatan ada. Sejak `v0.3.2`, catatan itu menyimpan repositori yang mengklaimnya secara lokal dan menolak klaim atas id rencana yang sama dari repositori lain; namai rencana itu `--plan <repo>/<id>`.
- **Fencing.** Sebuah lane menerima pemberitahuan lead hanya dari agen yang memberinya arahan (klaim pertama), dari lead saat ini pada epoch berikutnya (handover), atau dari entri suksesi pertama yang dapat dijangkau pada epoch berikutnya (takeover). Selebihnya dicatat dan diabaikan, dan lead yang kembali lalu melihat epoch yang lebih tinggi akan mundur.
- **Alamat `lead`.** `ask lead …` dan `notify lead …` diarahkan ke lead saat ini dari `--plan` (jika tidak, `$DWP_PLAN`), sehingga tidak ada arahan lane yang menuliskan panel lead secara permanen.
- **Layar `usage_limit`.** `status` dan `lanes` mengenali pesan batas penggunaan sebuah CLI sebagai kelas layar `usage_limit`, yang langkah berikutnya adalah handoff. Layar ini tidak pernah dijawab dengan tombol. `lanes --json` menambahkan rencana, lead-nya, epoch, dan kapasitas terakhir yang dilaporkan setiap lane.

Lane juga boleh saling bertanya untuk informasi dan koordinasi — sebuah antarmuka, nama flag, status branch — tetapi hanya lead yang menugaskan pekerjaan. Kedalaman 1 dan batas fan-out tetap berlaku. Dengan `v0.2.x` tidak ada pemberitahuan maupun catatan lead: lane menanyakan alamat lead dari arahannya, dan pergantian lead diteruskan oleh pengembang.

## Debat

herdr-peers 1.1.0 menambahkan sub-skill **debate** bawaan (`debate.md`): agen lead menjalankan panel peer di pane Herdr melalui beberapa putaran dan menutupnya dengan satu hasil yang dapat dipercaya manusia, lengkap dengan bukti dan pendapat yang berbeda. Gunakan hanya saat manusia meminta debat, panel, red team, riset dari beberapa agen atau sudut pandang, atau panel kedua atas suatu hasil; pendapat satu agen cukup dengan satu ask.

- **Tujuan lebih dulu.** Lead memilih tujuannya — **memutuskan**, **meriset** kondisi terkini, **menguji ketahanan**, **memverifikasi**, atau **menghasilkan** — dan tiap tujuan punya format, cara hitung, dan hasil akhirnya sendiri. Tujuan dapat dirangkai (riset → putuskan, putuskan → verifikasi), dan ukuran debat bisa cepat, standar, atau mendalam.
- **Kontrak lead.** Lead tidak pernah memilih; kata-kata manusia disalin apa adanya; brief sampai ke panel lewat satu saluran; setiap pane menulis berkasnya ke disk dan membalas dengan satu baris; tidak ada pane yang melakukan tindakan eksternal.
- **Format.** Riset per sudut pandang, putaran klasik, paket draf, pemeriksaan silang klaim demi klaim, red team lalu pembela, steelman lalu menilai, tantangan buta dengan konteks baru, panel replikasi, dan usulan divergen. Sebuah keputusan selalu berakhir pada ruang putusan yang ditetapkan.
- **Perintah `herdr-peers debate`.** `tally` menghitung surat suara berperingkat dan putusan per butir (Borda, Copeland, duel berpasangan, pemenang dan pecundang Condorcet); `claims` menggabungkan buku klaim dari tiap lane menjadi status seperti mapan, diperdebatkan, atau terbantah, yang merupakan kuorum, bukan verifikasi; `anon` menyalin berkas dengan nama anonim, dengan pemetaannya di kunci privat; `filings` mendaftar berkas yang ada, hilang, dan terlalu pendek sehingga hanya pane yang hilang yang ditanya ulang.
- **Menyusun panel.** `panel` mengusulkan panel dan tidak menjalankan apa pun. Kursi dibagi bergiliran antar penyedia model, dan di dalam satu penyedia kursi dengan kuota terbanyak didahulukan, diambil dari pane yang menganggur dan, bila agentkit (`ak`) terpasang, dari akun yang diusulkan `ak pick`. Tanpa `ak`, ia merekomendasikan coding-agents-kit (opsional, `v1.0.1` atau lebih baru).
- **Templat.** Enam belas templat di `templates/debate/`, dari catatan manusia serta brief riset, uji ketahanan, dan putaran hingga berkas surat suara dan klaim, paket serah terima lead, serta catatan keputusan, kondisi terkini, uji ketahanan, dan replikasi.
- **Pengiriman ke peer yang terhambat.** `reply` dan `notify` mencoba ulang pengiriman ke peer yang tertahan di sebuah pertanyaan hingga `--wait-blocked` detik; tetap tepat satu balasan.

Rilis ini hanya menambah: protokol 1 serta semua perintah, flag, kode keluar, dan kontrak JSON tetap tidak berubah.

## Catatan

Opsional dan tidak pernah wajib. Sebuah repositori sepenuhnya konform tanpa addon opsional sama sekali, dan tidak ada alur yang bergantung pada addon ini. Perjalanan pulang-pergi dua panel lintas mesin dicakup oleh pengujian terhadap Herdr yang disimulasikan; rencanakan eksekusi pertama dengan pengawasan.
