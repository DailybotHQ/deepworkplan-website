---
title: Devcontainer
description: "An opt-in addon that adds or reconciles a compose-based devcontainer reasoned from the detected stack, with persistent AI-CLI auth that survives rebuilds. Never required for a repo to be AI-first."
kind: addon
lang: en
order: 1
---

# Devcontainer addon

Add a reproducible, isolated dev container to the repository. The first opt-in Deep Work Plan addon.

## What it adds

- A compose-based devcontainer with the base image and supporting services reasoned from the detected stack.
- Persistent AI-CLI auth volumes (Claude, Codex, Cursor, gh, Dailybot) that survive rebuilds.
- The `dailybot-project-network`, the `DOCKER_DEV_ENV=vscode` convention, and validation aliases (`codecheck`, `check`, `fix`, `test`).
- For public repos, a secret-excluding `.dockerignore` and a secret-free `.env.example`.

## Behavior

Roughly 85% of the devcontainer is a stable common skeleton; the remaining 15% — base image, user, workspace folder, services, ports, secrets — is reasoned from the repo's real stack. An existing devcontainer is reconciled, never clobbered.

## Notes

Opt-in and never required. A repo is fully conformant with zero addons.
