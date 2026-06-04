---
title: Devcontainer
description: "Um addon opcional que adiciona ou reconcilia um devcontainer baseado em compose a partir da stack detectada, com auth de CLI de IA persistente que sobrevive a rebuilds."
kind: addon
lang: pt
order: 1
---

# Addon devcontainer

Adiciona um dev container reproduzível e isolado ao repositório. O primeiro addon opcional do Deep Work Plan.

## O que ele adiciona

- Um devcontainer baseado em compose, com a imagem base e os serviços de apoio fundamentados na stack detectada.
- Volumes de auth de CLI de IA persistentes (Claude, Codex, Cursor, gh, Dailybot) que sobrevivem a rebuilds.
- A `dailybot-project-network`, a convenção `DOCKER_DEV_ENV=vscode` e os aliases de validação (`codecheck`, `check`, `fix`, `test`).
- Para repositórios públicos, um `.dockerignore` que exclui segredos e um `.env.example` livre de segredos.

## Comportamento

Cerca de 85% do devcontainer é um esqueleto comum e estável; os 15% restantes — imagem base, usuário, pasta de workspace, serviços, portas, segredos — são fundamentados na stack real do repositório. Um devcontainer existente é reconciliado, nunca sobrescrito.

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons.
