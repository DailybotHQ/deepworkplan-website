---
title: Google Gemini
description: "L'adapter DWP per Google Gemini, con supporto totale via procedure di comando in Markdown e il prefisso cancelletto che eseguono l'intero ciclo Deep Work Plan."
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

**Completo** (Testato per installazione) — ogni comando dwp-* viene eseguito dal rispettivo file di procedura. Percorso verificato da suite di test automatizzate; i flussi comportamentali operano sulla baseline sequenziale. Richiede l'esecuzione di strumenti e l'accesso ai file del workspace.

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
