---
title: Devcontainer
description: "Ein Opt-in-Addon, das einen compose-basierten Devcontainer aus dem erkannten Stack hinzufügt oder abgleicht, mit persistenter AI-CLI-Authentifizierung, die Rebuilds übersteht."
kind: addon
lang: de
order: 1
---

# Devcontainer-Addon

Einen reproduzierbaren, isolierten Dev-Container zum Repository hinzufügen. Das erste Opt-in-Addon von Deep Work Plan.

## Was es hinzufügt

- Einen compose-basierten Devcontainer mit dem Basis-Image und den unterstützenden Diensten, abgeleitet aus dem erkannten Stack.
- Persistente AI-CLI-Auth-Volumes (Claude, Codex, Cursor, gh, Dailybot), die Rebuilds überstehen.
- Das `dailybot-project-network`, die `DOCKER_DEV_ENV=vscode`-Konvention und Validierungs-Aliase (`codecheck`, `check`, `fix`, `test`).
- Für öffentliche Repositorys eine geheimnisausschließende `.dockerignore` und eine geheimnisfreie `.env.example`.

## Verhalten

Rund 85 % des Devcontainers sind ein stabiles, gemeinsames Grundgerüst; die übrigen 15 % — Basis-Image, Benutzer, Workspace-Ordner, Dienste, Ports, Geheimnisse — werden aus dem echten Stack des Repositorys abgeleitet. Ein bestehender Devcontainer wird abgeglichen, niemals überschrieben.

## Hinweise

Opt-in und nie erforderlich. Ein Repository ist mit null Addons vollständig konform.
