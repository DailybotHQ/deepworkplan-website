---
title: Google Gemini
description: "O adaptador DWP para o Google Gemini, com suporte total por procedimentos de comando em markdown e o prefixo hash que executam o loop completo do Deep Work."
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

**Completo** (Comprovado por instalação) — cada comando dwp-* é executado a partir de seu arquivo de procedimento. Rota confirmada por suítes de testes automatizados; fluxos de comportamento rodam na linha de base sequencial. Requer execução de ferramentas e acesso a arquivos do workspace.

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
