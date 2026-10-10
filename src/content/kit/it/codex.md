---
title: OpenAI Codex
description: "L'adapter DWP per OpenAI Codex, con supporto completo tramite procedure di comando in Markdown e il prefisso cancelletto che eseguono l'intero ciclo Deep Work Plan."
kind: adapter
lang: it
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# Adapter OpenAI Codex

Codex supporta DWP tramite procedure di comando in Markdown.

## Livello di supporto

**Completo** — ogni comando dwp-* viene eseguito dal suo file di procedura.

## Installazione

I comandi DWP vivono come procedure Markdown che l'agente legge all'invocazione; le regole sono installate sotto `.codex/`.

Facoltativo: [coding-agents-kit](/kit/agentkit) può installare questa CLI e avviarla con `ak codex`. Anche l’installer ufficiale del fornitore funziona altrettanto bene.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Codex legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
