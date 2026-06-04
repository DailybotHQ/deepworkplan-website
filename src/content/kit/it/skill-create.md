---
title: skill-create
description: "Crea una nuova skill riutilizzabile nel repository corrente — una procedura parametrizzata, eseguita in sessione — tramite la sub-skill author, mantenendo il catalogo allineato."
kind: command
lang: it
order: 7
usage: /skill-create
---

# skill-create

Crea una nuova skill nel repository corrente. Un sottile delegatore alla sub-skill **author** di Deep Work Plan.

## Cosa fa

`skill-create` instrada verso il flusso di creazione di skill della sub-skill author. Una skill è una procedura riutilizzabile e parametrizzata eseguita in sessione (per esempio, `/fix-lint`). Codifica «come fare X» e vive sotto `.agents/skills/<name>/SKILL.md`.

## Uso

```
/skill-create
```

## Comportamento

1. Rileva la struttura `.agents/` del repo e le convenzioni locali.
2. Conferma che esista un workflow reale e ripetibile; lo denomina in kebab-case.
3. Predispone e popola `SKILL.md` (Goal, When-to-use, Steps, Validation).
4. Aggiunge un sottile delegatore di comando se necessario.
5. Aggiorna il catalogo `.agents/docs/` di conseguenza.

## Note

Per gli agenti usi `/agent-create`. La logica vive nella skill; il comando resta sottile.
