---
title: GitHub Copilot
description: "L'adapter DWP per GitHub Copilot, con supporto completo tramite AGENTS.md e procedure di comando in Markdown invocate con il prefisso cancelletto."
kind: adapter
lang: it
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# Adapter GitHub Copilot

Copilot supporta DWP tramite AGENTS.md e procedure di comando in Markdown.

## Livello di supporto

**Completo** — Copilot legge AGENTS.md e i file di procedura dwp-* ed esegue ogni comando da essi.

## Installazione

DWP include AGENTS.md e le procedure dei comandi nel repository; Copilot li legge come contesto del repository.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Copilot legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
