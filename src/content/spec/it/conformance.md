---
title: Conformità
description: "La definizione normativa di un repository conforme a DWP e AI-first: gli artefatti che DEVE e DOVREBBE avere, cosa rende un piano ben formato e come verificarlo."
order: 6
lang: it
section: Conformance
---

# Conformità

**Versione 1.1. Stato: Stabile.** Questo documento definisce cosa significhi per un repository essere *conforme a Deep Work Plan* — ossia AI-first e pilotabile dagli agenti. Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

La conformità esiste affinché «AI-first» sia una proprietà oggettiva e verificabile anziché un’impressione. Un repository soddisfa i criteri qui sotto oppure no. La [sub-skill `verify`](/kit) (`/dwp-verify`) li controlla in modo meccanico.

## Un repository conforme

Un repository conforme a DWP DEVE soddisfare tutto quanto segue. Ogni artefatto DEVE essere **ragionato per il repository** — adattato ai suoi linguaggi, framework e comandi reali. Uno stub generico, un segnaposto o contenuto copiato da un altro repository non soddisfa un criterio.

1. **`AGENTS.md` nella radice.** Il repository DEVE contenere un `AGENTS.md` di radice che includa (a) un indice della documentazione, (b) le regole obbligatorie per il repository e (c) un blocco Quick Commands i cui comandi siano **reali ed eseguibili** in questo repository. Comandi segnaposto (per esempio, `npm test` in un repository che non usa npm) NON DEVONO comparire.
2. **`CLAUDE.md` si risolve in `AGENTS.md`.** Un `CLAUDE.md` DEVE esistere e risolversi in `AGENTS.md` (un symlink, o un equivalente che garantisca un’unica fonte di verità). I due NON DEVONO divergere.
3. **Una gerarchia `docs/`.** Il repository DEVE contenere una directory `docs/` che copra le categorie standard (architettura, standard, testing, comandi di sviluppo, sicurezza e onboarding degli agenti) con contenuto reale e specifico del repository. I moduli complessi DOVREBBERO avere un proprio `README.md`. La guida al testing DEVE definire una toolchain reale di test, lint e type-check — oppure, per un repository che non ne ha alcuna, un setup concreto **proposto** a partire dallo stack durante l’onboarding. Una guida al testing vuota o «nessun test» non soddisfa questo criterio: senza un modo definito per validare il comportamento, un piano non ha alcun validation gate oggettivo.
4. **Una home `.agents/`.** Il repository DEVE contenere una directory `.agents/` con `agents/`, `commands/` e `skills/`, più un catalogo sotto `.agents/docs/` che **corrisponda a ciò che è su disco**. I comandi `dwp-*` DEVONO essere sottili delegatori alla skill installata. Un percorso `.claude` DEVE risolversi in `.agents`.
5. **Un workspace `.dwp/` escluso da git.** Il repository DEVE contenere una directory `.dwp/` con `plans/` e `drafts/`, e `.dwp/` DEVE essere escluso da git. Uno spazio di lavoro temporaneo `tmp/` DOVREBBE esistere e DOVREBBE essere escluso da git.
6. **La skill della metodologia è risolvibile.** La skill Deep Work Plan DEVE essere installata o referenziata in modo tale che un agente nel repository possa invocarne le sub-skill.

Un repository è **pienamente conforme con zero addon**. Gli addon (devcontainer, Dailybot, dependency-upgrade, design-system) sono opt-in e NON DEVONO essere richiesti per la conformità.

## Un piano ben formato

Un Deep Work Plan in `.dwp/plans/` è ben formato quando:

1. Ogni attività DEVE dichiarare uno **scope** esplicito, **criteri di accettazione** e almeno un **validation gate** (un comando o una verifica che ha esito oggettivamente positivo o negativo).
2. Ogni attività che aggiunge nuove funzionalità fondamentali o modifica il comportamento del prodotto DEVE includere una copertura di test automatizzati per quel comportamento nei suoi criteri di accettazione, e DEVE eseguire i test del repository insieme ai suoi controlli di lint e type-check nel suo validation gate — non solo la build. I test esistenti DEVONO restare verdi; un cambiamento di comportamento DEVE aggiornare un test che rompe anziché eliminarlo o saltarlo. Le attività di pura documentazione, configurazione o ricerca sono esentate dal creare test ma eseguono comunque il gate del repository.
3. Il piano DEVE persistere i progressi così che il lavoro sopravviva all’interruzione e possa essere ripreso da un agente diverso.
4. Il piano DEVE includere le due attività finali obbligatorie — Skills & Agents Discovery ed Executive Report.
5. Le attività DOVREBBERO riancorarsi all’obiettivo del piano prima di eseguire, per prevenire la deriva su un orizzonte lungo.

## Verificare la conformità

La conformità DOVREBBE essere verificata in modo meccanico anziché per ispezione. Eseguire `/dwp-verify` produce un report di esito positivo/negativo rispetto ai criteri qui sopra: la presenza e il contenuto reale di `AGENTS.md`, la risoluzione di `CLAUDE.md`, le categorie `docs/`, la corrispondenza tra catalogo `.agents/` e disco, lo stato di esclusione da git di `.dwp/` e `tmp/` e — per un piano — che ogni attività porti con sé criteri di accettazione e un validation gate, con copertura di test per le attività che modificano il comportamento.

Un repository DOVREBBE essere ri-verificato dopo l’onboarding e dopo ogni piano completato, così che la conformità sia mantenuta anziché dichiarata una sola volta.
