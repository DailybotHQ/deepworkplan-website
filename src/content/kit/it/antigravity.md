---
title: Antigravity
description: "L'adapter DWP per Antigravity, con supporto totale via procedure di comando in Markdown e il prefisso cancelletto che guidano l'intero ciclo Deep Work Plan."
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

**Completo** (Testato per installazione) — ogni comando dwp-* viene eseguito dal rispettivo file di procedura. Percorso verificato da suite di test automatizzate; i flussi comportamentali operano sulla baseline sequenziale.

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
