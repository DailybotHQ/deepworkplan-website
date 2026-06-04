---
title: Google Gemini
description: "O adaptador DWP para o Google Gemini, com suporte parcial por meio de procedimentos de comando em markdown e o prefixo hash que conduzem o fluxo de trabalho sequencial."
kind: adapter
lang: pt
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Adaptador Google Gemini

O Google Gemini oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Parcial** — os comandos centrais funcionam por meio de arquivos de procedimento.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Gemini lê os arquivos de procedimento e executa o fluxo de trabalho sequencial do DWP.
