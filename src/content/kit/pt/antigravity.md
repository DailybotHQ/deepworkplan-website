---
title: Antigravity
description: "O adaptador DWP para o Antigravity, com suporte parcial por meio de procedimentos de comando em markdown e o prefixo hash que conduzem o fluxo de trabalho sequencial."
kind: adapter
lang: pt
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Adaptador Antigravity

O Antigravity oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Parcial** — os comandos centrais funcionam por meio de arquivos de procedimento.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê ao serem invocados.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Antigravity lê os arquivos de procedimento e executa o fluxo de trabalho sequencial do DWP.
