---
title: Cursor
description: "L’adapter DWP per Cursor AI, con supporto completo tramite il sistema di project rules e il prefisso di comando cancelletto, poiché Cursor riserva la slash a sé."
kind: adapter
lang: it
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adapter Cursor

Cursor supporta DWP tramite project rules e file di comando.

## Livello di supporto

**Completo** — i comandi DWP funzionano tramite il sistema di rules di Cursor.

## Installazione

I comandi DWP vivono come Markdown nel progetto. Cursor li legge tramite il suo sistema di rules.

Facoltativo: [coding-agents-kit](/kit/agentkit) può installare questa CLI e avviarla con `ak cursor`. Anche l’installer ufficiale del fornitore funziona altrettanto bene.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Invocazione

Usi il prefisso `#` (Cursor intercetta `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Note

Usi `#` perché Cursor riserva `/` per i propri comandi.
