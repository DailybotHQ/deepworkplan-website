---
title: Windsurf
description: "O adaptador DWP para o Windsurf, com suporte completo por meio do seu sistema de regras e procedimentos de comando em markdown invocados com o prefixo hash."
kind: adapter
lang: pt
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Adaptador Windsurf

O Windsurf oferece suporte ao DWP por meio do seu sistema de regras e de procedimentos de comando em markdown.

## Nível de suporte

**Completo** (Comprovado por instalação) — O Windsurf lê as regras do projeto e executa cada comando dwp-* a partir de seu arquivo de procedimento. Rota confirmada por suítes de testes automatizados.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê por meio do sistema de regras do Windsurf.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Windsurf lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
