---
title: Claude Code
description: "O adaptador DWP para o Claude Code, com suporte completo por meio de slash commands e skills nativos, incluindo subagents e team agents para o conjunto completo de recursos."
kind: adapter
lang: pt
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adaptador Claude Code

O Claude Code tem suporte **completo** ao DWP por meio de slash commands e skills nativos.

## Nível de suporte

**Completo** — todos os cinco comandos do DWP mapeiam para slash commands nativos do Claude Code.

## Instalação

O DWP é distribuído como skills em `.agents/skills/` (resolvidas por meio do symlink `.claude/`). O Claude Code as descobre automaticamente.

Opcional: o [coding-agents-kit](/kit/agentkit) pode instalar esta CLI e iniciá-la com `ak claude`. O instalador oficial do fornecedor funciona igualmente bem.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Invocação

Use o prefixo `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Notas

O Claude Code oferece suporte a skills, subagents e team agents — o conjunto completo de recursos do DWP.
