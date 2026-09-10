---
title: Standard di documentazione
description: "Standard normativo su come i Deep Work Plan documentano struttura, attività e progressi: regole del README, marcatori di stato, l’anatomia in dieci sezioni e il Final Review."
order: 1
lang: it
section: Standard
---

# Standard di documentazione

**Versione 1.1.** Questo standard definisce come i Deep Work Plan documentano struttura, attività e progressi. Si applica a ogni piano creato secondo la metodologia DWP. Le parole chiave MUST, SHOULD e MAY sono usate come definito nella RFC 2119.

## README del piano

Ogni piano DEVE avere un `README.md` che contenga:

- **Titolo** — `# Deep Work Plan: <name>`.
- **Obiettivo** — una dichiarazione discorsiva dell’obiettivo del piano.
- **Materiale di origine** — link o percorsi agli input canonici (facoltativo).
- **Attività** — una tabella Markdown con il numero, il nome dell’attività e una casella di stato.
- **Stato** — una riga nella forma `<n>/<total> tasks complete`.

## File di attività

Ogni file di attività DEVE essere denominato `<n>.task_<slug>.md` e contenere l’anatomia in dieci sezioni — le nove sezioni classiche più la **Superficie toccata**: il contratto tra ciò che l’attività modifica e ciò che deve essere validato (superficie pianificata vs. effettiva, consumatori interessati, una classe di rischio tra *isolata*, *giuntura*, *condivisa/core* o *sconosciuta*, la mappatura dei test usata e il gate selezionato con la sua motivazione).

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

## Il Final Review, le decisioni locali per attività e il report facoltativo

Ogni piano redatto con questa versione DEVE concludersi con esattamente un’attività obbligatoria: il **Final Review** — il passaggio di sicurezza sull’intero insieme di modifiche del piano, la validazione dello stato finale sull’ultimo stato rilevante e la riconciliazione delle decisioni sulle skill. Un rilievo di sicurezza critico blocca il completamento.

- **Decisioni locali per attività sulle skill.** Il Completion & Log di ogni attività porta una **disposizione delle skill** — `none`, un aggiornamento a una skill o un agente esistente, una creazione con nome o un rinvio con motivazione e proprietario. L’authoring giustificato avviene dentro l’attività proprietaria, prima del suo validation gate, dopo un controllo di duplicati contro il catalogo `.agents/`; le voci giustificate sono registrate come candidati stabili (`T{task}-{seq}`) nel registro dei candidati skill del piano.
- **L’Executive Report è facoltativo, su richiesta.** Offerto una volta al completamento; generato solo su richiesta esplicita a partire da evidenze durevoli. Nessuna risposta o un’esecuzione non presidiata lascia il piano completato senza di esso.
- **Piani legacy.** I piani redatti con versioni precedenti terminano con le tre attività finali obbligatorie e restano conformi — un checker di conformità DEVE accettare quella forma.
