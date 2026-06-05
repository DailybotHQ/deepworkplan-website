---
title: Antigravity
description: "L'adapter DWP per Antigravity, con supporto completo tramite procedure di comando in Markdown e il prefisso cancelletto che guidano l'intero ciclo Deep Work Plan."
kind: adapter
lang: it
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Adapter Antigravity

Antigravity supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Completo** — ogni comando dwp-* viene eseguito dal suo file di procedura tramite la superficie di comandi nativa.

## Installazione

I comandi DWP vivono come procedure Markdown che l'agente legge all'invocazione.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Antigravity legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
