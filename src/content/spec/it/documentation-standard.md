---
title: Standard di documentazione
description: "Standard normativo su come i Deep Work Plan documentano struttura, attività e progressi: regole del README, marcatori di stato, l’anatomia in dieci sezioni e il Final Review."
order: 1
lang: it
section: Standard
---

# Standard di documentazione

**Versione 5.0.0.** Questo standard definisce come i Deep Work Plan documentano struttura, attività e progressi, e come un repository documenta se stesso affinché un agente possa agire in modo sicuro. Si applica a ogni piano creato secondo la metodologia DWP. Questa versione allinea il numero di versione del documento allo standard DWP che accompagna — nessun requisito esistente cambia — e aggiunge l'applicazione del budget dell'indice snello e il livello feature descritti di seguito. Le parole chiave MUST, SHOULD e MAY sono usate come definito nella RFC 2119.

## AGENTS.md come punto di ingresso compatto

Il file `AGENTS.md` alla radice DOVREBBE restare entro un budget di 150–500 righe. Quando il contenuto generato o mantenuto dalla harness lo supererebbe, l'agente DEVE spostare il dettaglio nella guida `docs/` (o nel documento di modulo/feature) che lo possiede e collegarlo dall'indice — nulla viene eliminato, solo riallocato, e l'indice DEVE collegare ogni documento che ha ricevuto contenuto spostato. Un `AGENTS.md` scritto a mano che supera il budget non viene mai riscritto silenziosamente: l'agente propone una migrazione concreta (cosa si sposta dove, quali link si aggiungono) e la applica solo con il consenso dello sviluppatore. Un checker di conformità tratta il budget come consultivo, poiché un conteggio di righe è oggettivo ma la paternità del contenuto non lo è — il MUST vincola la harness che genera o aggiorna il file, non la supposizione di un checker su chi lo ha scritto. `AGENTS.md` NON DEVE collegare un file `docs/` che non esiste.

Sopra il livello di documentazione per modulo (di seguito) si colloca un **livello feature**: un'area di capacità importante — più ampia di un singolo modulo — riceve una propria cartella `docs/` accanto al proprio codice, con accesso tramite un proprio `README.md`. Un'area si qualifica quando copre due o più moduli principali, possiede una sub-app o una directory di sottosistema autonoma, oppure porta propri contratti (una superficie API, contratti di eventi o schema) da cui dipendono più consumatori. Una volta che un'area è registrata come importante, la sua `docs/` di feature DOVREBBE esistere, e le sue voci più significative DOVREBBERO essere collegate dai moduli che l'area attraversa e dall'indice `AGENTS.md` radice, esattamente come per i documenti per modulo. Un'area deliberatamente lasciata non documentata porta un motivo registrato — una decisione, non una svista.

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
