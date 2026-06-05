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

**Completo** — o Copilot lê o AGENTS.md e os arquivos de procedimento dwp-*, e executa todos os comandos a partir deles.

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
