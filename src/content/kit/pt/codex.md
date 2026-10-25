---
title: OpenAI Codex
description: "O adaptador DWP para o OpenAI Codex, com suporte total por procedimentos de comando em markdown e o prefixo hash que executam o loop completo do Deep Work Plan."
kind: adapter
lang: pt
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Adaptador OpenAI Codex

O OpenAI Codex oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Completo** (Comprovado por comportamento) — cada comando dwp-* é executado a partir de seu arquivo de procedimento, comprovado em benchmarks bidirecionais de criação e retomada entre modelos.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê ao serem invocados; as regras são instaladas em `.codex/`.

Opcional: o [coding-agents-kit](/kit/agentkit) pode instalar esta CLI e iniciá-la com `ak codex`. O instalador oficial do fornecedor funciona igualmente bem.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Codex lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
