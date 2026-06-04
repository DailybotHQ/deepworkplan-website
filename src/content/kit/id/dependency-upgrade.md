---
title: Dependency upgrade
description: "Addon opsional yang agnostik package manager, memutakhirkan dependensi repositori dalam batch tervalidasi yang dapat dibatalkan, mendeteksi manager nyata, bukan mengasumsikan npm."
kind: addon
lang: id
order: 3
---

# Addon Dependency-upgrade

Mutakhirkan dependensi repositori dengan alur kerja yang dibatch, tervalidasi, dan dapat dibatalkan. Addon Deep Work Plan opsional yang ketiga.

## Yang ditambahkan

- Deteksi package manager **nyata** repositori (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, dan lainnya) dari manifest serta lockfile yang ada.
- Sebuah command `/lib-upgrade` yang dipasang ke `.agents/commands/`, **hanya ketika diterima**.

## Perilaku

1. Mensyaratkan working tree yang bersih (atau telah dicadangkan).
2. Klasifikasikan pemutakhiran berdasarkan semver — patch, minor, major; major memerlukan persetujuan eksplisit.
3. Mutakhirkan dalam batch kecil yang koheren; jangan sekaligus.
4. Jalankan validation gate nyata repositori setelah setiap batch; batalkan batch mana pun yang gagal.
5. Rangkum apa yang dimutakhirkan, dilewati, dan dibatalkan; biarkan developer yang melakukan commit.

## Catatan

Agnostik terhadap package manager — tidak pernah menjalankan npm/ncu di repositori non-JS. Opsional, tidak pernah wajib, dan tidak pernah commit otomatis.
