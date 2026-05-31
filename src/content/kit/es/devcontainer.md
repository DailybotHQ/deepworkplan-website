---
title: Devcontainer
description: "Un addon opcional que agrega o reconcilia un devcontainer basado en compose razonado a partir del stack detectado, con autenticación de CLI de IA persistente que sobrevive a las reconstrucciones. Nunca es obligatorio para que un repo sea AI-first."
kind: addon
lang: es
order: 1
---

# Addon de devcontainer

Agrega un contenedor de desarrollo reproducible y aislado al repositorio. El primer addon opcional de Deep Work Plan.

## Qué agrega

- Un devcontainer basado en compose con la imagen base y los servicios de soporte razonados a partir del stack detectado.
- Volúmenes de autenticación de CLI de IA persistentes (Claude, Codex, Cursor, gh, Dailybot) que sobreviven a las reconstrucciones.
- La `dailybot-project-network`, la convención `DOCKER_DEV_ENV=vscode` y los alias de validación (`codecheck`, `check`, `fix`, `test`).
- Para repos públicos, un `.dockerignore` que excluye secretos y un `.env.example` sin secretos.

## Comportamiento

Cerca del 85% del devcontainer es un esqueleto común estable; el 15% restante — imagen base, usuario, carpeta de trabajo, servicios, puertos, secretos — se razona a partir del stack real del repo. Un devcontainer existente se reconcilia, nunca se sobrescribe.

## Notas

Opcional y nunca obligatorio. Un repo es plenamente conforme con cero addons.
