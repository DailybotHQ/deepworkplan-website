---
title: Devcontainer
description: "Un addon opt-in che aggiunge o riconcilia un devcontainer basato su compose a partire dallo stack rilevato, con autenticazione AI-CLI persistente che sopravvive ai rebuild."
kind: addon
lang: it
order: 1
---

# Addon devcontainer

Aggiunge al repository un dev container riproducibile e isolato. Il primo addon opt-in di Deep Work Plan.

## Cosa aggiunge

- Un devcontainer basato su compose con l’immagine di base e i servizi di supporto ragionati dallo stack rilevato.
- Volumi di autenticazione AI-CLI persistenti (Claude, Codex, Cursor, gh, Dailybot) che sopravvivono ai rebuild.
- La `dailybot-project-network`, la convenzione `DOCKER_DEV_ENV=vscode` e gli alias di validazione (`codecheck`, `check`, `fix`, `test`).
- Per i repo pubblici, un `.dockerignore` che esclude i segreti e un `.env.example` privo di segreti.

## Comportamento

Circa l’85% del devcontainer è uno scheletro comune stabile; il restante 15% — immagine di base, utente, cartella del workspace, servizi, porte, segreti — è ragionato dallo stack reale del repo. Un devcontainer esistente viene riconciliato, mai sovrascritto.

## Note

Opt-in e mai richiesto. Un repo è pienamente conforme con zero addon.
