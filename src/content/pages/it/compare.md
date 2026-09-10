---
title: "Deep Work Plan rispetto alle alternative — Deep Work Plan"
description: "Deep Work Plan rispetto a strumenti spec-driven, framework per agenti e modalità plan dei vendor: ciascuno nei suoi termini, con fonti e data di revisione."
lastUpdated: 2026-09-10
---

## Deep Work Plan e le alternative

Scelga il livello giusto per la sua situazione. Ogni alternativa è descritta nei suoi termini, ogni fatto risale alla documentazione ufficiale corrispondente e la pagina indica quando è stata revisionata l’ultima volta. Questa è una mappa, non una classifica.

## Come leggere questa pagina

Tre valori descrivono ogni capacità. Dicono dove vive una capacità in uno strumento, non quanto è valido lo strumento.

- **Integrato**
- **Opzionale o tramite estensione**
- **Fuori ambito**

Ultima revisione: 2026-09-10

## Le alternative, nei loro termini

### Strumenti di sviluppo spec-driven

**GitHub Spec Kit** — Trasforma una funzionalità in una specifica eseguibile attraverso una constitution, una spec, un piano e un elenco di task, guidato da slash command che si integrano con più di cinquanta agenti di coding. Team che vogliono un flusso ripetibile di specify, plan, tasks e implement dentro l’agente che già usano. [Sito ufficiale](https://github.com/github/spec-kit)

**OpenSpec** — Cattura ogni modifica come una proposta con spec delta (aggiunte, modificate, rimosse) e requisiti RFC 2119 con scenari, poi le archivia in specifiche vive. Team che lavorano su sistemi esistenti e vogliono che le specifiche crescano una modifica alla volta. [Sito ufficiale](https://openspec.dev)

**Amazon Kiro** — Un IDE e una CLI agentici le cui spec passano da requisiti in stile EARS al design ai task, con file di steering e hook che scattano sugli eventi dell’editor. Sviluppatori che vogliono lo sviluppo spec-driven integrato nel proprio editor con strumenti supportati da AWS. [Sito ufficiale](https://kiro.dev)

### Framework di workflow per agenti

**BMAD Method** — Un framework agile di ruoli di agenti specializzati (analisi, prodotto, architettura, sviluppo, qualità) che produce brief, requisiti, documenti di architettura e file di story. Team che prediligono le cerimonie basate sui ruoli e vogliono un ciclo di vita agile completo per il lavoro degli agenti. [Sito ufficiale](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Una libreria di skill e un workflow per brainstorming, pianificazione in piccoli passi test-first, esecuzione con subagent e revisione prima del completamento. Sviluppatori che vogliono un’esecuzione test-driven disciplinata dentro il proprio agente di coding. [Sito ufficiale](https://github.com/obra/superpowers)

**Get Shit Done** — Un sistema di pianificazione con una directory .planning, id dei requisiti, piani per fasi, esecuzione a contesto fresco e un passaggio di verifica rispetto ai must-have dichiarati. Sviluppatori singoli e piccoli team che vogliono context engineering e verifica con poca cerimonia. [Sito ufficiale](https://github.com/open-gsd/gsd-core)

### Modalità plan native dei vendor

**Modalità plan native dei vendor** — Claude Code, Codex, Cursor e Gemini CLI offrono modalità plan, file di istruzioni e skill che seguono gli standard AGENTS.md e Agent Skills. Chiunque voglia la pianificazione dentro un singolo agente senza adottare una metodologia. [Sito ufficiale](https://agents.md)

## Matrice delle capacità

Dove vive ogni capacità, per strumento. Integrato, opzionale o tramite estensione, oppure fuori ambito. Verificato sulla documentazione ufficiale.

| Capacità | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Modalità plan native dei vendor |
|---|---|---|---|---|---|---|---|---|
| Funziona con qualsiasi agente di coding | Integrato | Integrato | Integrato | Fuori ambito | Integrato | Integrato | Integrato | Fuori ambito |
| Scrive la harness dell’agente nel repository | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito | Opzionale o tramite estensione | Opzionale o tramite estensione |
| Criteri di accettazione per task | Integrato | Opzionale o tramite estensione | Integrato | Integrato | Integrato | Integrato | Integrato | Opzionale o tramite estensione |
| Validation gate per task | Integrato | Opzionale o tramite estensione | Fuori ambito | Opzionale o tramite estensione | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione |
| Stato ripristinabile su disco | Integrato | Integrato | Integrato | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione |
| Revisione di chiusura obbligatoria con passaggio di sicurezza | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione |
| Verificatore di conformità eseguibile | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito | Fuori ambito | Fuori ambito | Opzionale o tramite estensione |
| Misurazione pubblicata del carico di istruzioni | Integrato | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito |
| Onboarding che predispone la documentazione | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito | Integrato | Opzionale o tramite estensione |
| Specifiche vive per sistemi esistenti | Fuori ambito | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito | Opzionale o tramite estensione | Fuori ambito |

## Cosa porta Deep Work Plan

- **Indipendente dallo strumento e nativo del repository.** La harness e il piano sono file nel Suo repository, leggibili da qualsiasi agente che segue gli standard AGENTS.md e Agent Skills. Cambiare agente non fa perdere il piano.
- **Validazione selezionata da ciò che ogni task ha toccato.** Ogni task dichiara la propria superficie toccata ed esegue i test del comportamento modificato e dei suoi consumer, ampliando alla suite completa quando l’impatto non può essere delimitato. Zero test selezionati non è mai un esito positivo.
- **Un solo Final Review con passaggio di sicurezza.** Un piano si chiude con una revisione di sicurezza dell’insieme di modifiche accumulato, inclusa una revisione locale obbligatoria del diff, e con una validazione dello stato finale. I rilievi critical bloccano il completamento.
- **Uno stato che sopravvive a sessioni e agenti.** Checkbox del README, log dei task, un indice di lavoro delimitato e un file di stato leggibile dalle macchine vengono scritti a ogni confine, così un’altra sessione o un altro agente prosegue da disco. Anche una creazione del piano interrotta è recuperabile.
- **Un verificatore di conformità per il repository stesso.** Uno script in sola lettura verifica la harness e ogni piano rispetto alla specifica, riconosce entrambi i cicli di vita dei piani ed esce con un codice adatto alla CI.
- **Carico di istruzioni misurato e pubblicato.** Uno script sottoposto a commit misura quanti byte carica ogni flusso; i risultati, aumenti inclusi, sono pubblicati in byte, mai come percentuali di token o di costo.

## Limiti onesti

Deep Work Plan non ha un meccanismo di specifica viva o delta; OpenSpec e strumenti simili sono più solidi su quel fronte. Non esiste ancora un benchmark indipendente della metodologia; è prevista una valutazione pubblica pre-registrata. Il registro del carico di istruzioni misura i byte caricati, non token, costi o esiti.

## Ci aiuti a mantenere questa pagina accurata

Questa pagina viene revisionata nella data indicata e corretta su richiesta. Se la descrizione di un Suo strumento è obsoleta o incompleta, apra una issue e la corregeremo.

[Apri una issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Fonti

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
