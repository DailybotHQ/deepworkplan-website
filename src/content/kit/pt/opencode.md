---
title: OpenCode
description: "O adaptador DWP para o OpenCode, o agente de código aberto, com suporte completo por meio do AGENTS.md nativo e procedimentos de comando em markdown invocados."
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

**Completo** (Comprovado por instalação) — O OpenCode lê o AGENTS.md nativamente e executa cada comando dwp-* a partir de seu arquivo de procedimento. Rota confirmada por suítes de testes automatizados.

## Instalação

O DWP fornece o AGENTS.md e os procedimentos de comando no repositório; o OpenCode os descobre como contexto do projeto.

Opcional: o [coding-agents-kit](/kit/agentkit) pode instalar esta CLI e iniciá-la com `ak opencode`. O instalador oficial do fornecedor funciona igualmente bem.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
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
