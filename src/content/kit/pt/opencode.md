---
title: OpenCode
description: "O adaptador DWP para o OpenCode, o agente de código aberto, com suporte completo por meio do AGENTS.md nativo e procedimentos de comando em markdown invocados com o prefixo hash."
kind: adapter
lang: pt
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adaptador OpenCode

O OpenCode, o agente de código aberto, oferece suporte ao DWP por meio do AGENTS.md nativo e de procedimentos de comando em markdown.

## Nível de suporte

**Completo** — o OpenCode lê o AGENTS.md nativamente e executa todos os comandos dwp-* a partir do respectivo arquivo de procedimento.

## Instalação

O DWP fornece o AGENTS.md e os procedimentos de comando no repositório; o OpenCode os descobre como contexto do projeto.

Opcional: o [coding-agents-kit](/kit/agentkit) pode instalar esta CLI e iniciá-la com `ak opencode`. O instalador oficial do fornecedor funciona igualmente bem.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O OpenCode lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
