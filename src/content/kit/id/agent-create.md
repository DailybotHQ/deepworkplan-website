---
title: agent-create
description: "Buat agent baru di repositori saat ini — worker khusus dengan tier model dan tool tersendiri — melalui sub-skill author, menjaga katalog tetap sinkron."
kind: command
lang: id
order: 8
usage: /agent-create
---

# agent-create

Buat agent baru di repositori saat ini. Delegator ramping ke sub-skill **author** dari Deep Work Plan.

## Fungsinya

`agent-create` mengarahkan ke alur pembuatan agent milik sub-skill author. Agent adalah definisi worker khusus (peran, tier model, tool, system prompt) yang dikerahkan untuk menangani sekelas tugas. Ia mengkodekan "siapa yang melakukan X" dan tersimpan di bawah `.agents/agents/<name>.md`.

## Penggunaan

```
/agent-create
```

## Perilaku

1. Deteksi tata letak `.agents/` repositori dan konvensi lokalnya.
2. Pastikan ada peran berulang dengan kebutuhan model/tool yang khas; beri nama dalam kebab-case.
3. Siapkan dan isi agent (Role, Inputs, Process, Output, eskalasi).
4. Pilih tier model yang beralasan — light, standard, atau heavy — tanpa hardcoding ID model vendor.
5. Perbarui katalog `.agents/docs/` agar sesuai.

## Catatan

Untuk prosedur gunakan `/skill-create`. Jaga tier model tetap abstrak dan petakan di konfigurasi repositori.
