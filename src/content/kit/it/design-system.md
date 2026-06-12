---
title: Design system
description: "Un addon opt-in che dota qualsiasi repo con una superficie di interfaccia rivolta all'utente di un DESIGN.md (sotto docs/, indicizzato da AGENTS.md) — con i profili UI visuale, output CLI e conversazionale in un unico file."
kind: addon
lang: it
order: 4
---

# Addon design-system

Dota un repository con una **superficie di interfaccia rivolta all’utente** di un `DESIGN.md` — un file di design system in Markdown che qualsiasi agente di codice legge per generare output di interfaccia coerente con le convenzioni **proprie** del repo, invece dei default privi di stile e statisticamente comuni a cui un agente ripiega in assenza di indicazioni. Il quarto addon opt-in di Deep Work Plan.

Una «superficie di interfaccia» è plurale: una **UI visuale** renderizzata, un **output CLI** stilizzato e una superficie **conversazionale** (il prodotto parla via chat o email) contano ciascuna. L’addon rileva ognuna in modo indipendente come **profilo**, e i profili accettati si impilano nello stesso unico `DESIGN.md`.

## Cosa aggiunge

- Un `DESIGN.md` in `docs/DESIGN.md` (accanto alle altre specifiche del repo; la radice del repo solo quando non esiste un albero `docs/`), **referenziato da `AGENTS.md`** così che gli agenti lo scoprano come il resto della documentazione. Un repo, un file — mai file fratelli per superficie.
- **Profilo `visual-ui`** — le sezioni visuali canoniche: panoramica/atmosfera, palette di colori e ruoli (chiaro + scuro), tipografia, layout e spaziatura, elevazione e profondità, forme, componenti, comportamento responsive, cosa fare e cosa evitare (incluse le regole di accessibilità del repo).
- **Profilo `cli-output`** — interfacce di terminale stilizzate: voce dell’output, colori e stili semantici (successo/errore/avviso/info/attenuato mappati sul tema reale), componenti di output (pannelli, tabelle, spinner, prompt interattivi — denominati secondo gli helper reali del repo), convenzioni di layout e regole di degradazione (TTY vs pipe, `NO_COLOR`, disciplina di stdout/stderr, codici di uscita).
- **Profilo `conversational`** — la superficie di messaggistica del prodotto: voce e registro (tono, brevità, regole sull’uso del nome del brand), anatomia del messaggio (DM, post in canale, risposta in thread, modifica sul posto) e resa per piattaforma (mrkdwn di Slack, markdown di Discord, adaptive card di Teams, email) con fallback in testo semplice.
- Una guida di prompt per agenti condivisa, più un passo di validazione che verifica l’integrità di ogni profilo: il contrasto del testo documentato soddisfa WCAG AA (visuale), il colore non è mai l’unico portatore di significato (CLI), le rese ricche annotano i fallback in testo semplice (conversazionale) e i riferimenti ai token si risolvono.

## Comportamento

- **Ragiona, non copiare.** Ogni valore è derivato dalla fonte di design reale del repo — il suo foglio di stile, le proprietà personalizzate CSS, la configurazione Tailwind, i file di token, gli stili dei componenti, il suo modulo di visualizzazione/tema CLI o i suoi helper di composizione dei messaggi. Non incolla mai il `DESIGN.md` del brand di un terzo né importa in blocco le convenzioni di un altro prodotto; i cataloghi di riferimento sono ispirazione per la struttura, mai per il contenuto.
- **Riconcilia, non sovrascrivere.** Un `DESIGN.md` o una fonte di token esistente viene riconciliato in modo additivo, mai sovrascritto; aggiungere un profilo appena accettato accoda le sue sezioni senza riscrivere il resto; le modifiche distruttive richiedono approvazione.
- **Scoperta per riferimento.** Ovunque risieda `DESIGN.md`, `AGENTS.md` (e `CLAUDE.md`) lo referenziano — è il puntatore, non la posizione fisica, a garantire che gli agenti lo carichino.
- **Pragmatico, non rigidamente vincolato.** Fa riferimento alla convenzione emergente `DESIGN.md` come forma da seguire, la estende alle superfici non visuali e resta Markdown-first senza legarsi ad alcuno schema di token specifico.

## Con ambito di interfaccia, con forza per profilo

Questo addon è per repo con almeno una vera superficie di interfaccia; non viene mai offerto per un repo che non ne ha alcuna (una libreria pura, un servizio headless, un repo di sola infrastruttura). Ogni profilo porta la propria forza di raccomandazione:

- **`visual-ui` è attivo di default quando rilevato** — un foglio di stile con proprietà personalizzate CSS, una configurazione Tailwind o un blocco `@theme`, componenti UI o una guida di brand/stile. L’onboarding lo applica in modalità trust e lo raccomanda con forza in modalità guidata.
- **`cli-output` e `conversational` sono raccomandati quando rilevati — e sempre proposti con una domanda, mai applicati automaticamente**, anche in modalità trust. Una libreria di rendering CLI più un livello di visualizzazione deliberato segnala il primo; un SDK di piattaforma chat o un livello di composizione dei messaggi segnala il secondo. Un semplice parser di argomenti con print grezzi non qualifica.

Non è mai obbligatorio — un repository con zero addon è pienamente conforme, e puoi sempre rifiutare qualsiasi profilo o l’intero addon. Un `DESIGN.md` creato prima che esistessero i profili è un file visuale a profilo singolo valido: nessuna migrazione.

## Comando opzionale

Quando accettato, l’addon può installare un delegatore `/design-system` nella cartella `.agents/commands/` del repo per rigenerare o aggiornare `DESIGN.md` in seguito. Installare il comando è opzionale; un addon rifiutato non ne installa alcuno.

## Relazione con i documenti di design per funzionalità

Questo è un file di design system **a livello di repository, persistente** — distinto da un documento di design tecnico per funzionalità (il `design.md` del flusso «requisiti → design → attività» dei workflow spec-driven legati a uno strumento). Deep Work Plan deliberatamente non include un archetipo separato di documento di design per funzionalità: il README di un piano, i criteri di accettazione di ogni attività e i validation gate coprono già quel ruolo. Questo addon colma l’unica lacuna che quel ruolo non copre: un contesto di design dell’interfaccia durevole e nativo del repo.
