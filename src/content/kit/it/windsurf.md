---
title: Windsurf
description: "L'adapter DWP per Windsurf, con supporto completo tramite il sistema di regole e le procedure di comando in Markdown invocate con il prefisso cancelletto."
kind: adapter
lang: it
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Adapter Windsurf

Windsurf supporta DWP tramite il suo sistema di regole e le procedure di comando in Markdown.

## Livello di supporto

**Completo** — Windsurf legge le regole del progetto ed esegue ogni comando dwp-* dal suo file di procedura.

## Installazione

I comandi DWP vivono come procedure Markdown che l'agente legge tramite il sistema di regole di Windsurf.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Windsurf legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
