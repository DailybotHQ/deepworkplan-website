---
title: Antigravity
description: "L’adapter DWP per Antigravity, con supporto parziale tramite procedure di comando in Markdown e il prefisso cancelletto che guidano il workflow sequenziale."
kind: adapter
lang: it
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Adapter Antigravity

Antigravity supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Parziale** — i comandi principali funzionano tramite file di procedura.

## Installazione

I comandi DWP vivono come procedure Markdown che l’agente legge all’invocazione.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Antigravity legge i file di procedura ed esegue il workflow sequenziale di DWP.
