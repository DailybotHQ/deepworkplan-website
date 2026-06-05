---
title: Cline
description: "O adaptador DWP para o Cline, o agente de código aberto, com suporte completo por meio de regras em markdown e procedimentos de comando invocados com o prefixo hash."
kind: adapter
lang: pt
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adaptador Cline

O Cline, o agente de código aberto, oferece suporte ao DWP por meio de regras em markdown e procedimentos de comando.

## Nível de suporte

**Completo** — o Cline lê as regras em markdown e executa todos os comandos dwp-* a partir do respectivo arquivo de procedimento.

## Instalação

Os comandos do DWP vivem como procedimentos em markdown que o agente lê por meio das regras do Cline.

## Invocação

Use o prefixo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

O Cline lê os arquivos de procedimento e executa o loop sequencial completo do Deep Work Plan.
