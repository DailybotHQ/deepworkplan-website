---
title: Google Gemini
description: "L’adapter DWP per Google Gemini, con supporto parziale tramite procedure di comando in Markdown e il prefisso cancelletto che guidano il workflow sequenziale."
kind: adapter
lang: it
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Adapter Google Gemini

Google Gemini supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Parziale** — i comandi principali funzionano tramite file di procedura.

## Installazione

I comandi DWP vivono come procedure Markdown che l’agente legge.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Gemini legge i file di procedura ed esegue il workflow sequenziale di DWP.
