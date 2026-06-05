---
title: Google Gemini
description: "O adaptador DWP para o Google Gemini, com suporte completo por meio de procedimentos de comando em markdown e o prefixo hash que executam o loop completo do Deep Work Plan."
kind: adapter
lang: pt
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Adaptador Google Gemini

O Google Gemini oferece suporte ao DWP por meio de procedimentos de comando em markdown.

## Nível de suporte

**Completo** — todos os comandos dwp-* são executados a partir do respectivo arquivo de procedimento. Requer Gemini 2.5 Pro ou mais recente para WebFetch nativo.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê ao serem invocados.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Gemini lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
