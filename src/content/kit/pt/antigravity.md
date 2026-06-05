---
title: Antigravity
description: "O adaptador DWP para o Antigravity, com suporte completo por meio de procedimentos de comando em markdown e o prefixo hash que conduzem o loop completo do Deep Work Plan."
kind: adapter
lang: pt
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Adaptador Antigravity

O Antigravity oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Completo** — todos os comandos dwp-* são executados a partir do respectivo arquivo de procedimento por meio da superfície de comandos nativa.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê ao serem invocados.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Antigravity lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
