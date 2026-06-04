---
title: OpenAI Codex
description: "L’adapter DWP per OpenAI Codex, con supporto parziale tramite procedure di comando in Markdown e il prefisso cancelletto; le funzionalità di team agent non sono disponibili."
kind: adapter
lang: it
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# Adapter OpenAI Codex

OpenAI Codex supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Parziale** — i comandi principali funzionano; le funzionalità avanzate (team agent) non sono disponibili.

## Installazione

I comandi DWP vivono come procedure Markdown che l’agente legge all’invocazione.

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Le funzionalità di team agent sono esclusive di Claude; Codex supporta il workflow sequenziale.
