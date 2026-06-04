---
title: GitHub Copilot
description: "O adaptador DWP para o GitHub Copilot, com suporte parcial por meio de procedimentos de comando em markdown e o prefixo hash; parte da automação é feita manualmente."
kind: adapter
lang: pt
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Adaptador GitHub Copilot

O GitHub Copilot oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Parcial** — os comandos centrais funcionam por meio de arquivos de procedimento; parte da automação é manual.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown no repositório.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Copilot lê os arquivos de procedimento, mas tem execução menos autônoma do que o Claude Code.
