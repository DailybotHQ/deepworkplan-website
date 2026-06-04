---
title: GitHub Copilot
description: "L’adapter DWP per GitHub Copilot, con supporto parziale tramite procedure di comando in Markdown e il prefisso cancelletto; parte dell’automazione si svolge manualmente."
kind: adapter
lang: it
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# Adapter GitHub Copilot

GitHub Copilot supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Parziale** — i comandi principali funzionano tramite file di procedura; parte dell’automazione è manuale.

## Installazione

I comandi DWP vivono come procedure Markdown nel repository.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Copilot legge i file di procedura ma ha un’esecuzione meno autonoma rispetto a Claude Code.
