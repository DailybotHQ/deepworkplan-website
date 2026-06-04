---
title: Add-ons
description: "Ekstensi opsional untuk metodologi inti DWP: skill, agent, preset, adapter, dan contoh, serta bagaimana masing-masing memperluas alur kerja tanpa menjadi wajib."
order: 5
lang: id
section: Addons
---

# Add-ons

**Versi 1.0.** Add-on adalah ekstensi opsional untuk metodologi inti DWP. Ia tidak diwajibkan untuk konformansi tetapi menyediakan kemampuan tambahan.

## Skills

Skill adalah prosedur yang dapat dipakai ulang yang dipanggil berdasarkan nama. Sebuah skill mengemas alur kerja yang dapat diulang (menjalankan test, memperbaiki lint, membuat sebuah komponen).

Metodologi membawa sekumpulan kecil sub-skill inti. Di antaranya, sub-skill **author** memungkinkan sebuah repositori **menumbuhkan kit-nya sendiri**: dipanggil melalui `/skill-create` dan `/agent-create`, ia bernalar tentang tata letak `.agents/` dan konvensi repositori yang ada, lalu menulis skill, agent, atau delegator command tipis yang baru yang sesuai dengannya, dan menjaga katalog tetap selaras. Sub-skill yang sama mengeksekusi tugas wajib Skills & Agents Discovery.

## Agents

Agent adalah pekerja terspesialisasi dengan peran yang terdefinisi (reviewer, executor, architect).

## Add-on perawatan

Add-on perawatan adalah ekstensi opt-in, tidak pernah diwajibkan untuk konformansi, yang membantu sebuah repositori memelihara dirinya sendiri. Add-on **dependency-upgrade** bernalar tentang package manager yang sebenarnya ada di repositori (alih-alih mengasumsikan npm) dan memperbarui dependensi dalam batch-batch kecil yang tervalidasi dan dapat dikembalikan: ia mendeteksi manager dari manifes dan lockfile yang nyata, mengklasifikasikan peningkatan menurut semver, memperbarui dalam batch, menjalankan validation gate nyata repositori setelah setiap batch, mengembalikan batch apa pun yang gagal, dan merangkum tanpa meng-commit secara otomatis. Sebuah add-on dipasang hanya ketika ia diterima selama onboarding.

## Presets

Preset menyesuaikan DWP dengan tech stack tertentu (Django, React, Go).

## Adapters

Adapter memetakan command DWP ke sistem command sebuah agent tertentu (Claude Code, Cursor, Codex).

## Examples

Contoh mendemonstrasikan DWP dalam praktik (perbandingan sebelum/sesudah, rencana contoh, studi kasus).
