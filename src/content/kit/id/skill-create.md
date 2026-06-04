---
title: skill-create
description: "Buat skill baru yang dapat dipakai ulang di repositori saat ini — prosedur terparameter dalam sesi — melalui sub-skill author, menjaga katalog tetap sinkron."
kind: command
lang: id
order: 7
usage: /skill-create
---

# skill-create

Buat skill baru di repositori saat ini. Delegator ramping ke sub-skill **author** dari Deep Work Plan.

## Fungsinya

`skill-create` mengarahkan ke alur pembuatan skill milik sub-skill author. Skill adalah prosedur terparameter yang dapat dipakai ulang dan dijalankan dalam sesi (misalnya, `/fix-lint`). Ia mengkodekan "cara melakukan X" dan tersimpan di bawah `.agents/skills/<name>/SKILL.md`.

## Penggunaan

```
/skill-create
```

## Perilaku

1. Deteksi tata letak `.agents/` repositori dan konvensi lokalnya.
2. Pastikan ada alur kerja yang nyata dan dapat diulang; beri nama dalam kebab-case.
3. Siapkan dan isi `SKILL.md` (Goal, When-to-use, Steps, Validation).
4. Tambahkan delegator command yang ramping bila perlu.
5. Perbarui katalog `.agents/docs/` agar sesuai.

## Catatan

Untuk agent gunakan `/agent-create`. Logika tinggal di skill; command tetap ramping.
