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

Opcional: o [coding-agents-kit](/kit/agentkit) pode instalar esta CLI e iniciá-la com `ak cursor`. O instalador oficial do fornecedor funciona igualmente bem.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Invocação

Use o prefixo `#` (o Cursor intercepta `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Use `#` porque o Cursor reserva `/` para seus próprios comandos.
