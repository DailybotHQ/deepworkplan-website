---
title: GitHub Copilot
description: "O adaptador DWP para o GitHub Copilot, com suporte completo por meio do AGENTS.md e procedimentos de comando em markdown invocados com o prefixo hash."
kind: adapter
lang: pt
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Adaptador GitHub Copilot

O GitHub Copilot oferece suporte ao DWP por meio do AGENTS.md e de procedimentos de comando em markdown.

## Nível de suporte

**Completo** (Comprovado por instalação) — O Copilot lê o AGENTS.md e os arquivos de procedimento dwp-*, executando cada comando a partir deles. Rota confirmada por suítes de testes automatizados.

## Instalação

O DWP fornece o AGENTS.md e os procedimentos de comando no repositório; o Copilot os lê como contexto do repositório.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Copilot lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
