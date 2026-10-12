---
title: Menjalankan banyak agent
description: "Bagaimana agent lead menjalankan banyak lane sekaligus di panel, container, dan mesin lain, pada akun terpilih berdasarkan sisa kuota, satu branch per repo."
order: 6
lang: id
summary: Model lead dan lane untuk mengorkestrasi banyak agent lintas panel, mesin, akun, dan repositori.
icon: network
---

# Menjalankan banyak agent

Satu agent pada satu rencana adalah default, dan itu mencakup sebagian besar pekerjaan. Sebagian pekerjaan lebih luas dari satu sesi: perubahan yang melintasi beberapa repositori, rilis yang harus mendarat secara berurutan, atau backlog yang akan memakan waktu berhari-hari bagi satu agent. DWP berskala untuk pekerjaan itu tanpa mengubah kontraknya. Rencana tetap menjadi sumber kebenaran, setiap tugas tetap ditutup oleh gate-nya sendiri, dan agent tambahan adalah **lane** yang dikoordinasikan oleh sebuah **lead**.

Bab ini menjelaskan modelnya. Bab ini menggunakan tiga addon opsional — [Herdr](/id/kit/herdr) untuk panel dan rekan, [agentkit](/id/kit/agentkit) untuk akun, dan [devcontainer](/id/kit/devcontainer) untuk container — dan tidak satu pun diperlukan untuk rencana dengan satu agent.

## Lead dan lane-nya

**Lead** memiliki rencana induk. Ia menentukan lane, memberikan lingkup kepada setiap lane, mengumpulkan milestone, dan memberi aba-aba yang mengizinkan sebuah lane melakukan merge atau rilis. Ia tidak menulis kode lane lain.

Sebuah **lane** adalah satu agent dengan satu lingkup — biasanya satu repositori. Ia membaca `AGENTS.md` repositori itu, menjalankan gate repositori itu, dan menyimpan rencananya sendiri di dalam repositori. Dalam sebuah [orchestrator hub](/id/methodology/05-archetypes), rencana induk berada di `.dwp/plans/` milik hub dengan tabel pelacakan turunan, dan rencana setiap lane berada di repositorinya sendiri, menggunakan ID rencana dan gate repositori itu.

| Peran | Memiliki | Tidak pernah |
| --- | --- | --- |
| Lead | Rencana induk, daftar lane, urutan rilis, GO | Mengedit repositori milik sebuah lane |
| Lane | Satu repositori: branch, rencana, gate, dan pull request-nya | Melakukan merge atau rilis sebelum GO dari lead |

## Tempat lane berjalan

Sebuah lane adalah agent di panel terminal, dan panel itu dapat berada di beberapa tempat. [Herdr](https://herdr.dev) menempatkan setiap agent di sebuah panel dan menjangkau mesin lain melalui SSH, sehingga lead melihat setiap lane dalam satu sidebar.

- **Di host.** Satu panel per lane, berdampingan dengan lead. Penyiapan tercepat, untuk repositori yang sudah dikerjakan pengembang.
- **Di dalam container.** Container [devcontainer-kit](/id/kit/devcontainer) bergabung ke mesh Herdr saat `dck up`: agennya menjangkau host dan container lain, dan host menjangkau mereka. Container adalah sandbox-nya, sehingga agennya dapat berjalan secara otonom.
- **Di mesin lain.** Mesin apa pun yang dijangkau Herdr melalui SSH menampung lane dengan cara yang sama, dengan herdr-peers juga terinstal di sana.

Tempat mengubah isolasi, bukan protokol: lane di container dan lane di host berkoordinasi dengan lead dengan cara yang sama.

## Akun dan vendor berdasarkan sisa kuota

Banyak agent menghabiskan kuota dengan cepat. Setiap lane berjalan pada akunnya sendiri — satu CLI dan satu profil di [coding-agents-kit](/id/kit/agentkit) — sehingga lane tidak menguras jendela yang sama, dan satu akun yang mencapai batas hanya menghentikan satu lane, bukan semuanya.

- **`ak usage`** menampilkan sisa kuota pada setiap akun dan profil, sekali per batch.
- **`ak pick <kind> --count N`** mengembalikan N akun dengan ruang terbanyak, yang terbaik lebih dulu; `--exclude` mengecualikan akun yang sedang sibuk, `--model` menghitung jendela satu model, dan `--need` menolak memulai tanpa ruang yang cukup.
- **`ak <kind> @<profile>`** memulai agent lane pada akun itu, di panelnya.

Vendor dapat dicampur dengan cara yang sama. Lane Claude dapat menulis sementara lane Codex meninjau, masing-masing pada akun yang dipilih `ak pick` untuk jenisnya. Lane di container dapat menggunakan akun host: dengan `host_profiles` diaktifkan di profil host devcontainer-kit milik pengembang, sebuah container mendapatkan profil host dari CLI yang diinstal repositori — Claude melalui token berumur panjang per profil, Codex melalui file auth-nya — dan tidak memerlukan login sendiri. Gunakan hanya akun Anda sendiri dan patuhi ketentuan setiap vendor: sebarkan pekerjaan di antara akun-akun itu, jangan pernah merotasi akun untuk melewati batas.

## Meluncurkan dan membuka blokir lane tanpa manusia

Lead dapat memulai lane dan menjaganya tetap berjalan tanpa ada orang di depan keyboard. Setelah pengembang mengizinkan operasi tanpa pengawasan — sebuah instruksi tetap atau pra-otorisasi rencana — setiap peluncuran tidak memerlukan persetujuan lagi. Lead menggunakan perintah Herdr sendiri; tidak ada kode kit yang mengirim penekanan tombol. Prosedurnya memiliki urutan tetap: siapkan sekali, hindari prompt, deteksi saat berhenti, kirim tombol hanya dalam satu kasus, eskalasikan sisanya.

1. **Siapkan sekali, sebagai pengembang.** Claude Code meminta, sekali per profil, pengakuan atas mode bypass-permissions-nya. Pengakuan bypass-permissions itu adalah langkah pengembang sendiri, dilakukan saat profil dibuat; di dalam container devcontainer-kit, kit menuliskannya hanya ke direktori home milik container itu sendiri. Tidak ada agent yang pernah mengirim tombol untuk itu.
2. **Hindari.** `ak pick <kind>` menyebut akun dengan ruang terbanyak, dan `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` meluncurkan lane di foldernya sendiri. `--trust-cwd` (atau `AGENTKIT_TRUST_CWD=1`) mempercayai folder itu sejak awal, sehingga Claude dan Codex melewati layar kepercayaan folder tanpa penekanan tombol.
3. **Deteksi.** `herdr-peers lanes` (atau `herdr agent list`) menampilkan setiap lane sebagai working, idle, blocked, atau done. Untuk lane yang blocked, atau idle tanpa keluaran, `herdr-peers status <pane>` mengklasifikasikan layar tempat ia berada — kepercayaan folder, pengakuan bypass, login, izin, atau tidak dikenal — beserta langkah berikutnya yang terdokumentasi, dan `herdr pane read <pane>` menampilkannya.
4. **Satu penekanan tombol, satu kasus.** Satu-satunya tombol yang boleh dikirim lead adalah jawaban atas layar kepercayaan folder, pada panel yang ia luncurkan sendiri, ketika `--trust-cwd` tidak tersedia. Ia membaca layar sebelum mengirim tombol, mengirim tombol paling sedikit yang menjawabnya, lalu membaca lagi.
5. **Baca, catat, dan eskalasikan semua yang lain.** Pengakuan bypass-permissions Claude, prompt login dan kredensial, permintaan izin per aksi, konfirmasi destruktif, prompt pembayaran atau paket, layar yang tidak dikenal, dan panel yang tidak dibuat oleh lead diteruskan ke pengembang sebagai milestone blocked, tidak pernah sebagai penekanan tombol.
6. **Opt-out selalu menang.** Dengan `AGENTKIT_PERMISSIONS=ask`, lane bertanya sebelum bertindak, dan lead tidak pernah mengakali prompt yang dimunculkan opt-out tersebut.
7. **Luncurkan ulang.** Jika sebuah agent keluar, lead memulainya lagi pada akun yang sama, atau memilih akun lain. Login yang hilang adalah prompt kredensial: ia dieskalasikan.

Setiap intervensi — apa yang ditampilkan layar, tombol mana yang dikirim, apa yang terjadi setelahnya — dicatat di rencana induk.

## Koordinasi melalui herdr-peers

Lane dan lead berkomunikasi melalui [herdr-peers](/id/kit/herdr): sebuah **ask** membawa cap yang mengizinkan tepat satu **reply**, dan setiap pertukaran dicatat. Lead menjaga protokolnya tetap kecil:

- **Milestone ke atas.** Setiap lane melapor pada titik-titik tetap — rencana siap, pull request dibuka, blocked, selesai — dan terus bekerja di antaranya tanpa menunggu jawaban.
- **Pertanyaan sebagai ask.** Lane yang membutuhkan keputusan bertanya kepada lead; lead menjawab dengan satu reply.
- **Kedalaman satu.** Sebuah reply tidak pernah dijawab, dan lane tidak mendelegasikan lebih jauh. Fan-out per pemanggil dibatasi, empat rekan secara default.
- **Data, bukan instruksi.** Sebuah reply tidak memberikan apa pun yang belum dimiliki penerimanya. Klaim sebuah lane bahwa gate-nya lulus diperiksa dengan menjalankan gate tersebut.
- **Catatan tentang siapa melakukan apa.** Setiap catatan delegasi menyebut akun dan vendor lane tersebut, sehingga rencana induk menunjukkan akun mana yang mengerjakan pekerjaan mana.
- **Lane Codex menyebut panelnya sendiri.** Codex menjalankan perintah sebuah lane dari server latar yang dipakai bersama oleh semua sesi pada akun itu, sehingga id panel yang diwarisinya bisa milik lane lain. Lane Codex meneruskan panelnya sendiri, dari arahan lead, dengan `--pane <pane>` pada setiap perintah herdr-peers (`ask`, `reply`, `check`, `wait`, `lanes`, `cancel`).

Lead dapat melihat seluruh orkestra sekaligus: `herdr-peers lanes` mencantumkan setiap lane beserta statusnya, dan [DeepWorkPlan Vim](/id/kit/vim) menampilkan lane dari sebuah rencana orkestrator di samping rencana itu sendiri (`:DwpLanes`).

## Satu branch, satu rilis per repositori

Aturan yang menjaga banyak lane tetap dapat ditinjau itu sederhana: **satu lane per repositori, pada checkout dasarnya, dengan satu branch, satu pull request, dan satu rilis** untuk seluruh perubahan. Lane tidak membagi pekerjaannya ke beberapa branch atau worktree. Worktree hanya untuk kasus ketika dua penulis harus berbagi satu repositori: masing-masing mendapat worktree sendiri, sehingga setiap path memiliki satu penulis.

Pull request tetap terbuka, hijau, dan berlabel untuk ditinjau sampai GO dari lead. Kemudian lane melakukan merge dan membuat tag, lalu melaporkan tag tersebut kembali.

## Urutan rilis

Repositori saling bergantung, sehingga dirilis sesuai urutan dependensi: alat lebih dulu, lalu yang mematoknya, lalu dokumentasi yang menjelaskan hasilnya, lalu konsumen yang mengadopsinya. Lead memegang urutan itu dan mengirim GO satu repositori pada satu waktu. Lane yang mematok rilis repositori lain menunggu tag tersebut sebelum menulis patokannya, sehingga tidak ada patokan yang menunjuk ke rilis yang belum ada.

## Checkpoint

Rencana induk ditutup berdasarkan bukti, bukan laporan:

1. **Per lane.** Gate setiap lane lulus di branch-nya sendiri, dan tinjauan pull request-nya bersih. Tinjauan dapat menjadi lane tersendiri: [AI Diff Reviewer](/id/kit/ai-diff-reviewer) meninjau pull request setiap lane, dan dengan addon [Dailybot](/id/kit/dailybot) setiap lane melaporkan kemajuannya sendiri kepada tim.
2. **Per rilis.** Setiap tag ada dan mematok apa yang dibutuhkan repositori berikutnya.
3. **Integrasi.** Setelah rilis terakhir, sebuah checkpoint menjalankan konsumen pada versi yang dirilis dan mencatat putusannya di `analysis_results/` milik rencana induk.
4. **Tinjauan akhir.** Sebuah pemeriksaan keamanan mencakup apa pun yang melintasi batas — terutama akun, token, dan file yang dibagikan ke dalam container — sebelum rencana induk selesai.

## Keamanan

- Jangan pernah menaruh kunci, token, atau secret di dalam ask, prompt, atau log; sebut variabel berdasarkan namanya.
- Sumber daya bersama mendapat kunci (lock): lane mengambilnya sebelum langkah berat seperti build container dan melepaskannya setelahnya.
- Opt-out izin, jika disetel, berlaku untuk setiap lane dan setiap agent yang dimulai oleh sebuah lane.
- Lane yang tidak dapat melanjutkan menyatakannya sebagai milestone blocked lalu berhenti; lead yang memutuskan.
