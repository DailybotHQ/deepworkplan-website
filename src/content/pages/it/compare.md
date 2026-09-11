---
title: "Deep Work Plan rispetto alle alternative"
description: "Deep Work Plan rispetto a strumenti spec-driven, framework per agenti e modalità plan dei vendor: ciascuno nei suoi termini, con fonti e data di revisione."
lastUpdated: 2026-09-11
---

## Deep Work Plan e le alternative

Scelga il livello giusto per la sua situazione. Ogni alternativa è descritta nei suoi termini, ogni fatto risale alla documentazione ufficiale corrispondente e la pagina indica quando è stata revisionata l’ultima volta. Questa è una mappa, non una classifica.

## Come leggere questa pagina

Tre valori descrivono ogni capacità. Dicono dove vive una capacità in uno strumento, non quanto è valido lo strumento.

- **Integrato**
- **Opzionale o tramite estensione**
- **Fuori ambito**

Ultima revisione: 2026-09-11

## Le alternative, nei loro termini

### Strumenti di sviluppo spec-driven

**GitHub Spec Kit** — Trasforma una funzionalità in una specifica eseguibile attraverso una constitution, una spec, un piano e un elenco di task, guidato da slash command che si integrano con più di cinquanta agenti di coding, e può verificare che gli artefatti restino coerenti tra loro prima dell’implementazione. Team che vogliono un flusso ripetibile di specify, plan, tasks e implement dentro l’agente che già usano. [Sito ufficiale](https://github.com/github/spec-kit)

**OpenSpec** — Cattura ogni modifica come una proposta con spec delta (aggiunte, modificate, rimosse) e requisiti RFC 2119 con scenari, poi le archivia in specifiche vive, con un validatore che verifica la completezza della proposta e la copertura degli scenari prima che una modifica sia accettata. Team che lavorano su sistemi esistenti e vogliono che le specifiche crescano una modifica alla volta. [Sito ufficiale](https://openspec.dev)

**Amazon Kiro** — Un IDE e una CLI agentici le cui spec passano da requisiti in stile EARS al design ai task, con file di steering e hook che scattano sugli eventi dell’editor, e che può generare spec per una codebase esistente per individuare le lacune nei requisiti prima che inizi il design. Sviluppatori che vogliono lo sviluppo spec-driven integrato nel proprio editor con strumenti supportati da AWS. [Sito ufficiale](https://kiro.dev)

### Framework di workflow per agenti

**BMAD Method** — Un framework agile di ruoli di agenti specializzati (analisi, prodotto, architettura, sviluppo, qualità) che produce brief, requisiti, documenti di architettura e file di story, con una Definition of Done che richiede la revisione di ogni story da parte di un collega o di un agente AI dedicato prima che sia considerata conclusa. Team che prediligono le cerimonie basate sui ruoli e vogliono un ciclo di vita agile completo per il lavoro degli agenti. [Sito ufficiale](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Una libreria di skill e un workflow per brainstorming, pianificazione in piccoli passi test-first, esecuzione con subagent e revisione prima del completamento, integrato con più host di agenti di coding di qualsiasi altra alternativa qui presente, oltre a una revisione in due fasi tramite subagent (conformità alla spec, poi qualità del codice) su ogni task. Sviluppatori che vogliono un’esecuzione test-driven disciplinata dentro il proprio agente di coding. [Sito ufficiale](https://github.com/obra/superpowers)

**GSD Core** — Un sistema di pianificazione con una directory .planning, id dei requisiti, piani per fasi, esecuzione a contesto fresco e un passaggio di verifica rispetto ai deliverable osservabili dall’utente estratti da ogni piano, pensato per contrastare il degrado del contesto eseguendo ricerca, pianificazione ed esecuzione in subagent usa e getta e individuando verifiche obsolete tramite controlli di fingerprint dei contenuti. Sviluppatori singoli e piccoli team che vogliono context engineering e verifica con poca cerimonia. [Sito ufficiale](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Configura gli agenti di coding che già usi con una memoria persistente che instrada anche tra sessioni e modelli diversi, skill curate, server MCP, personas e, in modo opzionale, Spec-Driven Development o Receipt-Driven Development. La configurazione viene scritta di default nelle impostazioni globali dell’agente; un’installazione con ambito workspace è opzionale. Sviluppatori che vogliono un ecosistema di agenti configurato che ricordi il lavoro tra le sessioni e possa produrre evidenze su richiesta. [Sito ufficiale](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**Claude's AI-native SDLC** — Un ciclo in sei fasi da Plan e Design a Build, Test, Deploy e Maintain, con approvazione umana obbligatoria a ogni fase, artefatti durevoli sottoposti a commit nel repository tra una fase e l’altra, un passaggio di revisione dedicato alla sicurezza prima del deploy e valutazioni continue che pubblicano indicatori di delivery anticipatori e consuntivi. Team che valutano il playbook di consegna software end-to-end di Claude Code e il suo ciclo di feedback in produzione. [Sito ufficiale](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Modalità plan native dei vendor

**Modalità plan native dei vendor** — I prodotti agentici possono offrire modalità plan, file di istruzioni e skill basati sugli standard aperti e multi-vendor AGENTS.md e Agent Skills, anche se il comportamento esatto della modalità plan dipende ancora dal vendor, dal client e dalla versione. Agent Skills in particolare carica solo un breve riepilogo all’avvio e le istruzioni complete solo all’attivazione, tenendo fuori dal contesto le capacità non utilizzate. Chiunque voglia la pianificazione dentro un singolo agente senza adottare una metodologia. [Sito ufficiale](https://agents.md)

## Matrice delle capacità

Dove vive ogni capacità, per strumento. Integrato, opzionale o tramite estensione, oppure fuori ambito. Verificato sulla documentazione ufficiale.

| Capacità | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | Claude's AI-native SDLC | Modalità plan native dei vendor |
|---|---|---|---|---|---|---|---|---|---|---|
| Funziona con qualsiasi agente di coding | Integrato | Integrato | Integrato | Fuori ambito | Integrato | Integrato | Integrato | Integrato | Fuori ambito | Fuori ambito |
| Scrive la harness dell’agente nel repository | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito | Opzionale o tramite estensione | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione |
| Criteri di accettazione per task | Integrato | Opzionale o tramite estensione | Integrato | Integrato | Integrato | Integrato | Integrato | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione |
| Validation gate per task | Integrato | Opzionale o tramite estensione | Fuori ambito | Opzionale o tramite estensione | Opzionale o tramite estensione | Integrato | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione |
| Stato ripristinabile su disco | Integrato | Integrato | Integrato | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Integrato | Integrato | Integrato | Opzionale o tramite estensione |
| Revisione di chiusura obbligatoria con passaggio di sicurezza | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione |
| Verificatore di conformità eseguibile | Integrato | Opzionale o tramite estensione | Integrato | Opzionale o tramite estensione | Fuori ambito | Fuori ambito | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione |
| Misurazione pubblicata del carico di istruzioni | Integrato | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito |
| Onboarding che predispone la documentazione | Integrato | Integrato | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito | Integrato | Fuori ambito | Integrato | Opzionale o tramite estensione |
| Specifiche vive per sistemi esistenti | Fuori ambito | Opzionale o tramite estensione | Integrato | Integrato | Opzionale o tramite estensione | Fuori ambito | Opzionale o tramite estensione | Opzionale o tramite estensione | Opzionale o tramite estensione | Fuori ambito |
| Memoria persistente dell'agente tra progetti | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Integrato | Fuori ambito | Opzionale o tramite estensione |
| Ruoli agente specializzati e distinti | Opzionale o tramite estensione | Fuori ambito | Fuori ambito | Fuori ambito | Integrato | Fuori ambito | Fuori ambito | Opzionale o tramite estensione | Fuori ambito | Fuori ambito |
| Si presenta come un IDE o editor a sé stante | Fuori ambito | Fuori ambito | Fuori ambito | Integrato | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Fuori ambito | Opzionale o tramite estensione |

## Cosa porta Deep Work Plan

- **Indipendente dallo strumento e nativo del repository.** La harness e il piano sono file nel Suo repository, leggibili da qualsiasi agente che segue gli standard AGENTS.md e Agent Skills. Cambiare agente non fa perdere il piano.
- **Validazione selezionata da ciò che ogni task ha toccato.** Ogni task dichiara la propria superficie toccata ed esegue i test del comportamento modificato e dei suoi consumer, ampliando alla suite completa quando l’impatto non può essere delimitato. Zero test selezionati non è mai un esito positivo.
- **Un solo Final Review con passaggio di sicurezza.** Un piano si chiude con una revisione di sicurezza dell’insieme di modifiche accumulato, inclusa una revisione locale obbligatoria del diff, e con una validazione dello stato finale. I rilievi critical bloccano il completamento.
- **Uno stato che sopravvive a sessioni e agenti.** Checkbox del README, log dei task, un indice di lavoro delimitato e un file di stato leggibile dalle macchine vengono scritti a ogni confine, così un’altra sessione o un altro agente prosegue da disco. Anche una creazione del piano interrotta è recuperabile.
- **Un verificatore di conformità per il repository stesso.** Uno script in sola lettura verifica la harness e ogni piano rispetto alla specifica, riconosce entrambi i cicli di vita dei piani ed esce con un codice adatto alla CI.
- **Carico di istruzioni misurato e pubblicato.** Uno script sottoposto a commit misura quanti byte carica ogni flusso; i risultati, aumenti inclusi, sono pubblicati in byte, mai come percentuali di token o di costo.

## Limiti onesti

Deep Work Plan non ha un meccanismo di specifica viva o delta; OpenSpec e strumenti simili sono più solidi su quel fronte. Non esiste ancora un benchmark indipendente della metodologia; è prevista una valutazione pubblica pre-registrata. Il registro del carico di istruzioni misura i byte caricati, non token, costi o esiti. DWP è deliberatamente limitato al repository: non è un sistema di memoria multi-progetto, non è un framework di agenti basato su ruoli e non è un IDE, quindi non compete nemmeno su questi fronti — abbinalo a uno strumento che copra uno di essi quando è ciò di cui il lavoro ha bisogno.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- Claude's AI-native SDLC — https://claude.com/blog/the-ai-native-sdlc-playbook
- Modalità plan native dei vendor — https://agentskills.io
