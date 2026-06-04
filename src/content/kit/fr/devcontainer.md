---
title: Devcontainer
description: "Un addon facultatif qui ajoute ou réconcilie un devcontainer basé sur compose à partir de la stack détectée, avec une auth de CLI IA persistante qui survit aux reconstructions."
kind: addon
lang: fr
order: 1
---

# Addon devcontainer

Ajouter un conteneur de développement reproductible et isolé au dépôt. Le premier addon facultatif de Deep Work Plan.

## Ce qu’il ajoute

- Un devcontainer basé sur compose, avec l’image de base et les services de support raisonnés à partir de la stack détectée.
- Des volumes d’auth de CLI IA persistants (Claude, Codex, Cursor, gh, Dailybot) qui survivent aux reconstructions.
- Le `dailybot-project-network`, la convention `DOCKER_DEV_ENV=vscode` et les alias de validation (`codecheck`, `check`, `fix`, `test`).
- Pour les dépôts publics, un `.dockerignore` excluant les secrets et un `.env.example` sans secrets.

## Comportement

Environ 85 % du devcontainer est un squelette commun stable ; les 15 % restants — image de base, utilisateur, dossier de travail, services, ports, secrets — sont raisonnés à partir de la stack réelle du dépôt. Un devcontainer existant est réconcilié, jamais écrasé.

## Notes

Facultatif et jamais requis. Un dépôt est pleinement conforme avec zéro addon.
