---
title: Devcontainer
description: "Saptanan yığından compose tabanlı bir devcontainer ekleyen ya da uzlaştıran, yeniden derlemelere dayanan kalıcı AI-CLI kimlik doğrulaması sunan isteğe bağlı bir eklenti."
kind: addon
lang: tr
order: 1
---

# Devcontainer eklentisi

Depoya yeniden üretilebilir, yalıtılmış bir geliştirme konteyneri ekleyin. İlk isteğe bağlı Deep Work Plan eklentisi.

## Neler ekler

- Saptanan yığından akıl yürütülen temel imaj ve destekleyici servislerle compose tabanlı bir devcontainer.
- Yeniden derlemelere dayanan kalıcı AI-CLI kimlik doğrulama birimleri (Claude, Codex, Cursor, gh, Dailybot).
- `dailybot-project-network`, `DOCKER_DEV_ENV=vscode` kuralı ve doğrulama takma adları (`codecheck`, `check`, `fix`, `test`).
- Genel depolar için, gizli bilgileri dışlayan bir `.dockerignore` ve gizli bilgi içermeyen bir `.env.example`.

## Davranış

Devcontainer’ın kabaca %85’i kararlı, ortak bir iskelettir; kalan %15’i — temel imaj, kullanıcı, çalışma alanı klasörü, servisler, portlar, gizli bilgiler — deponun gerçek yığınından akıl yürütülür. Var olan bir devcontainer üzerine yazılmaz, uzlaştırılır.

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. Bir depo, sıfır eklentiyle tümüyle uyumludur.
