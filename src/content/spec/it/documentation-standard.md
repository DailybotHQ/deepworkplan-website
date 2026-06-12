---
title: Standard di documentazione
description: "Standard normativo su come i Deep Work Plan documentano struttura, attività e progressi: regole del README, marcatori di stato e le tre attività finali obbligatorie."
order: 1
lang: it
section: Standard
---

# Standard di documentazione

**Versione 1.0.** Questo standard definisce come i Deep Work Plan documentano struttura, attività e progressi. Si applica a ogni piano creato secondo la metodologia DWP. Le parole chiave MUST, SHOULD e MAY sono usate come definito nella RFC 2119.

## README del piano

Ogni piano DEVE avere un `README.md` che contenga:

- **Titolo** — `# Deep Work Plan: <name>`.
- **Obiettivo** — una dichiarazione discorsiva dell’obiettivo del piano.
- **Materiale di origine** — link o percorsi agli input canonici (facoltativo).
- **Attività** — una tabella Markdown con il numero, il nome dell’attività e una casella di stato.
- **Stato** — una riga nella forma `<n>/<total> tasks complete`.

## File di attività

Ogni file di attività DEVE essere denominato `<n>.task_<slug>.md` e contenere l’anatomia in nove sezioni.

## PROGRESS.md

`PROGRESS.md` è un log di esecuzione a sola aggiunta. Ogni voce DEVE registrare:

- Un timestamp ISO 8601.
- Il numero e il nome dell’attività.
- Cosa è stato fatto.
- Qualsiasi deviazione o motivo di salto.

## Marcatori di stato

- `[ ]` — non iniziata.
- `[~]` — in corso.
- `[x]` — completata.
- `[!]` — bloccata.

## Intestazioni

Tutte le intestazioni DEVONO usare lo stile a frase (sentence case). I documenti DOVREBBERO evitare il linguaggio di marketing e i punti esclamativi.

## Tre attività finali obbligatorie

Ogni piano DEVE concludersi con tre attività standard:

1. **Security Review** — verificare l’intero insieme di modifiche del piano alla ricerca di segreti, rischi di injection e nuova superficie di attacco, e accertare che `docs/SECURITY.md` rifletta ancora la realtà. Un rilievo critico blocca il completamento.
2. **Skills & Agents Discovery** — identificare le skill e gli agenti riutilizzabili creati.
3. **Executive Report** — un riassunto degli esiti per gli stakeholder.
