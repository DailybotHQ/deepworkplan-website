---
title: OpenAI Codex
description: "O adaptador DWP para o OpenAI Codex, com suporte parcial por meio de procedimentos de comando em markdown e o prefixo hash; os recursos de team agents não estão disponíveis."
kind: adapter
lang: pt
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# Adaptador OpenAI Codex

O OpenAI Codex oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Parcial** — os comandos centrais funcionam; os recursos avançados (team agents) não estão disponíveis.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê ao serem invocados.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Os recursos de team agents são exclusivos do Claude; o Codex oferece suporte ao fluxo de trabalho sequencial.
