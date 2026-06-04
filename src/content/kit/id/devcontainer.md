---
title: Devcontainer
description: "Addon opsional yang menambahkan atau merekonsiliasi devcontainer berbasis compose dari stack terdeteksi, dengan auth AI-CLI persisten yang bertahan saat rebuild."
kind: addon
lang: id
order: 1
---

# Addon Devcontainer

Tambahkan dev container yang terisolasi dan reproducible ke repositori. Addon Deep Work Plan opsional yang pertama.

## Yang ditambahkan

- Devcontainer berbasis compose dengan base image dan service pendukung yang ditalarkan dari stack terdeteksi.
- Volume auth AI-CLI persisten (Claude, Codex, Cursor, gh, Dailybot) yang bertahan saat rebuild.
- `dailybot-project-network`, konvensi `DOCKER_DEV_ENV=vscode`, dan alias validasi (`codecheck`, `check`, `fix`, `test`).
- Untuk repositori publik, `.dockerignore` yang mengecualikan secret dan `.env.example` yang bebas secret.

## Perilaku

Sekitar 85% dari devcontainer adalah kerangka umum yang stabil; 15% sisanya — base image, user, folder workspace, service, port, secret — ditalarkan dari stack nyata repositori. Devcontainer yang sudah ada direkonsiliasi, tidak pernah ditimpa.

## Catatan

Opsional dan tidak pernah wajib. Sebuah repositori sepenuhnya konform tanpa addon sama sekali.
