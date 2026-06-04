---
title: Cursor
description: "O adaptador DWP para o Cursor AI, com suporte completo por meio do sistema de project rules e o prefixo de comando hash, já que o Cursor reserva a barra para si."
kind: adapter
lang: pt
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adaptador Cursor

O Cursor oferece suporte ao DWP por meio de project rules e arquivos de comando.

## Nível de suporte

**Completo** — os comandos do DWP funcionam por meio do sistema de rules do Cursor.

## Instalação

Os comandos do DWP vivem como markdown dentro do projeto. O Cursor os lê por meio de seu sistema de rules.

## Invocação

Use o prefixo `#` (o Cursor intercepta `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Use `#` porque o Cursor reserva `/` para seus próprios comandos.
