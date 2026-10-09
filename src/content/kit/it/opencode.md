---
title: OpenCode
description: "L'adapter DWP per OpenCode, l'agente open source, con supporto completo tramite AGENTS.md nativo e procedure di comando in Markdown invocate con il prefisso cancelletto."
kind: adapter
lang: it
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adapter OpenCode

OpenCode, l'agente di coding open source, supporta DWP tramite AGENTS.md nativo e procedure di comando in Markdown.

## Livello di supporto

**Completo** — OpenCode legge AGENTS.md in modo nativo ed esegue ogni comando dwp-* dal suo file di procedura.

## Installazione

DWP include AGENTS.md e le procedure dei comandi nel repository; OpenCode li rileva come contesto di progetto.

Facoltativo: [coding-agents-kit](/kit/agentkit) può installare questa CLI e avviarla con `ak opencode`. Anche l’installer ufficiale del fornitore funziona altrettanto bene.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Invocazione

Usi il prefisso `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Note

OpenCode legge i file di procedura ed esegue l'intero ciclo sequenziale di Deep Work Plan.
