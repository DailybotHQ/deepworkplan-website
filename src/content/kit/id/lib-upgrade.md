---
title: lib-upgrade
description: "Mutakhirkan dependensi repositori secara aman dalam batch tervalidasi yang dapat dibatalkan melalui addon dependency-upgrade. Dipasang hanya ketika addon itu diterima."
kind: command
lang: id
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Mutakhirkan dependensi repositori secara aman. Delegator ramping ke addon **dependency-upgrade**.

## Fungsinya

`lib-upgrade` mengarahkan ke addon dependency-upgrade. Addon ini menalar package manager nyata repositori — tidak pernah mengasumsikan npm — mengklasifikasikan pemutakhiran berdasarkan semver, memutakhirkan dalam batch yang aman, menjalankan validation gate nyata repositori setelah setiap batch, membatalkan batch yang gagal, dan merangkum.

## Penggunaan

```
/lib-upgrade
```

## Perilaku

1. Mensyaratkan working tree yang bersih (atau telah dicadangkan).
2. Deteksi package manager nyata dari manifest dan lockfile yang ada.
3. Klasifikasikan pemutakhiran (patch / minor / major); major memerlukan persetujuan.
4. Mutakhirkan dalam batch kecil; validasi gate nyata repositori setelah masing-masing.
5. Batalkan batch mana pun yang gagal gate; rangkum dan biarkan developer melakukan commit.

## Catatan

Command ini dipasang hanya ketika addon dependency-upgrade diterima. Agnostik terhadap package manager; ia tidak pernah commit otomatis.
