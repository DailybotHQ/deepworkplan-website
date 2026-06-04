---
title: agent-create
description: "Crea un nuovo agente nel repository corrente — un lavoratore specializzato con il proprio livello di modello e i propri strumenti — tramite la sub-skill author, mantenendo il catalogo allineato."
kind: command
lang: it
order: 8
usage: /agent-create
---

# agent-create

Crea un nuovo agente nel repository corrente. Un sottile delegatore alla sub-skill **author** di Deep Work Plan.

## Cosa fa

`agent-create` instrada verso il flusso di creazione di agenti della sub-skill author. Un agente è una definizione di lavoratore specializzato (ruolo, livello di modello, strumenti, system prompt) inviata a gestire una classe di attività. Codifica «chi fa X» e vive sotto `.agents/agents/<name>.md`.

## Uso

```
/agent-create
```

## Comportamento

1. Rileva la struttura `.agents/` del repo e le convenzioni locali.
2. Conferma un ruolo ricorrente con esigenze distinte di modello/strumenti; lo denomina in kebab-case.
3. Predispone e popola l’agente (Role, Inputs, Process, Output, escalation).
4. Sceglie un livello di modello motivato — light, standard o heavy — senza fissare gli ID di modello del fornitore nel codice.
5. Aggiorna il catalogo `.agents/docs/` di conseguenza.

## Note

Per le procedure usi `/skill-create`. Mantenga i livelli di modello astratti e li mappi nella configurazione del repo.
