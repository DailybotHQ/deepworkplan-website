---
title: Google Gemini
description: "L'adapter DWP per Google Gemini, con supporto completo tramite procedure di comando in Markdown e il prefisso cancelletto che eseguono l'intero ciclo Deep Work Plan."
kind: adapter
lang: it
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Adapter Google Gemini

Gemini supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Completo** — ogni comando dwp-* viene eseguito dal suo file di procedura. Richiede Gemini 2.5 Pro o versione successiva per WebFetch nativo.

## Installazione

I comandi DWP vivono come procedure Markdown che l'agente legge all'invocazione.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Gemini legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
