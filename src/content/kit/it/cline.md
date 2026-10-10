---
title: Cline
description: "L'adapter DWP per Cline, l'agente open source, con supporto completo tramite regole Markdown e procedure di comando invocate con il prefisso cancelletto."
kind: adapter
lang: it
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adapter Cline

Cline, l'agente di coding open source, supporta DWP tramite regole Markdown e procedure di comando.

## Livello di supporto

**Completo** — Cline legge le regole Markdown ed esegue ogni comando dwp-* dal suo file di procedura.

## Installazione

I comandi DWP vivono come procedure Markdown che l'agente legge tramite le regole di Cline.

Facoltativo: [coding-agents-kit](/kit/agentkit) può installare questa CLI e avviarla con `ak cline`. Anche l’installer ufficiale del fornitore funziona altrettanto bene.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

Cline legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
