---
title: Design system
description: "Un addon opt-in con ambito frontend che dota un repo di un DESIGN.md (sotto docs/, indicizzato da AGENTS.md) così che ogni agente generi UI coerente con il design system del repo."
kind: addon
lang: it
order: 4
---

# Addon design-system

Dota un repository frontend/UI di un `DESIGN.md` — un file di design system in Markdown che qualsiasi agente di codice legge per generare UI coerente con il design system **proprio** del repo, invece dei default privi di stile e statisticamente comuni a cui un agente ripiega in assenza di indicazioni. Il quarto addon opt-in di Deep Work Plan.

## Cosa aggiunge

- Un `DESIGN.md` in `docs/DESIGN.md` (accanto alle altre specifiche del repo; la radice del repo solo quando non esiste un albero `docs/`), **referenziato da `AGENTS.md`** così che gli agenti lo scoprano come il resto della documentazione.
- Le sezioni canoniche: panoramica/atmosfera, palette di colori e ruoli (chiaro + scuro), tipografia, layout e spaziatura, elevazione e profondità, forme, componenti, comportamento responsive, cosa fare e cosa evitare (incluse le regole di accessibilità del repo) e una guida di prompt per gli agenti.
- Un passo di validazione che verifica che il file sia completo, che il contrasto del testo documentato soddisfi WCAG AA e che i riferimenti ai token si risolvano.

## Comportamento

- **Ragiona, non copiare.** Ogni valore è derivato dalla fonte di design reale del repo — il suo foglio di stile, le proprietà personalizzate CSS, la configurazione Tailwind, i file di token o gli stili dei componenti. Non incolla mai il `DESIGN.md` del brand di un terzo; i cataloghi di riferimento sono ispirazione per la struttura, mai per il contenuto.
- **Riconcilia, non sovrascrivere.** Un `DESIGN.md` o una fonte di token esistente viene riconciliato in modo additivo, mai sovrascritto; le modifiche distruttive richiedono approvazione.
- **Scoperta per riferimento.** Ovunque risieda `DESIGN.md`, `AGENTS.md` (e `CLAUDE.md`) lo referenziano — è il puntatore, non la posizione fisica, a garantire che gli agenti lo carichino.
- **Pragmatico, non rigidamente vincolato.** Fa riferimento alla convenzione emergente `DESIGN.md` come forma da seguire, ma resta Markdown-first e non si lega ad alcuno schema di token specifico.

## Con ambito frontend, attivo di default quando rilevato

Questo addon è per repo con una vera superficie UI — un foglio di stile con proprietà personalizzate CSS, una configurazione Tailwind o un blocco `@theme`, componenti UI o una guida di brand/stile. Non viene **mai** offerto per un repo backend, CLI o solo libreria. Quando una superficie UI **è** rilevata, l’onboarding lo tratta come **attivo di default**: applica l’addon in modalità trust e lo raccomanda con forza in modalità guidata. Non è mai obbligatorio — un repository con zero addon è pienamente conforme, e puoi sempre rifiutare.

## Comando opzionale

Quando accettato, l’addon può installare un delegatore `/design-system` nella cartella `.agents/commands/` del repo per rigenerare o aggiornare `DESIGN.md` in seguito. Installare il comando è opzionale; un addon rifiutato non ne installa alcuno.

## Relazione con i documenti di design per funzionalità

Questo è un file di design system **a livello di repository, persistente** — distinto da un documento di design tecnico per funzionalità (il `design.md` del flusso «requisiti → design → attività» dei workflow spec-driven legati a uno strumento). Deep Work Plan deliberatamente non include un archetipo separato di documento di design per funzionalità: il README di un piano, i criteri di accettazione di ogni attività e i validation gate coprono già quel ruolo. Questo addon colma l’unica lacuna che quel ruolo non copre: un contesto di design dell’UI durevole e nativo del repo.
