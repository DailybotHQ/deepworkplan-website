---
title: "DWP v8: spec-first, con ciclo chiuso"
description: "Deep Work Plan v8 unisce piani spec-first, repository come harness, Loop engineering ed efficienza misurata; il ciclo completa i piani approvati."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: it
order: 0
featured: true
sourceLabel: "Release dello skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Release dello skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Release dello skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Release dello skill v8.0.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.2"
  - label: "LOOP_ENGINEERING.md (normativo, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering nel lettore della specifica"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Schema plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Schema journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Schema plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Scrittura della coda dei piani (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Release dello skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Release dello skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Release dello skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 riunisce quattro idee: sviluppo spec-first, repository come harness dell’agente, Loop engineering ed efficienza misurata. La frase guida è: «Spec-first, loop-closed: il repository è l’harness e il piano procede da sé fino al completamento».

## I quattro pilastri

1. **Spec-first.** Piano e specifica sono la fonte durevole di verità, con criteri di accettazione e controlli di convalida espliciti.
2. **Il repository è l’harness.** Contesto, strumenti, regole di controllo e stato riprendibile vivono insieme al codice, così agenti diversi lavorano dallo stesso repository.
3. **Loop engineering.** Un piano approvato può avanzare lungo il ciclo di vita registrato fino al completamento.
4. **Efficienza misurata.** L’efficienza è espressa in byte di istruzioni per flusso, con un percorso di misurazione pubblicato; non si deducono percentuali di token.

## Cosa significa Loop engineering

Il piano registra un responsabile e una successione ordinata. Una persona avvia il daemon Herdr facoltativo con `herdr-peers autopilot --loop`; i suoi promemoria chiedono al responsabile di continuare senza concedere nuova autorità. Se il responsabile non è disponibile, il ciclo può chiedere a un successore elencato di subentrare. Gli eventi del piano possono raggiungere il notificatore Dailybot del pacchetto e la vista fleet mostra agenti e piani sulle macchine abilitate. L’avvio del daemon resta responsabilità della persona e l’addon Herdr è facoltativo.

## Release che forniscono i meccanismi

Il rafforzamento del pacchetto v7.11.0 e le release v7.12.x per registrazione dei piani e notifiche forniscono i meccanismi lato piano. herdr-peers v1.3.x aggiunge ciclo, report e vista fleet; v2.0.0 aggiunge brain del protocollo 2 e consumer della coda. coding-agents-kit v1.3.0 fornisce il contratto di avvio pick-v2 e v1.4.0 aggiunge l’aggiornamento verificato. herdr-peers v2.1.0 legge i blocker strutturati di v8 e coding-agents-kit v1.5.0 misura solo i token riportati. I descrittori addon del pacchetto 8.0.0 fissano herdr-peers v2.1.0, coding-agents-kit v1.5.0 e devcontainer-kit v1.3.0. Le release con tag sono collegate sopra. Il pacchetto funziona anche senza questi addon facoltativi.

## Il contratto v8

La release 8.0.0 implementa lo standard DWP 8.0.0. I nuovi piani sono creati con `plan-contract/v8`; quelli v7, v6 e v5 mantengono la generazione registrata e migrano solo con un `refine migrate` esplicito. I piani v8 mantengono la linea `plan-manifest/v7`, e `journal-event/v7` resta supportato per i piani esistenti. La fonte normativa è `LOOP_ENGINEERING.md`, insieme a tre schemi pubblicati.

- **Il blocco `autonomy`.** Blocco facoltativo e chiuso di `plan-contract/v8` che registra l’autorità del ciclo: `stall_budget` (1–10, predefinito 3), pane `promptable` (predefinito: solo il responsabile), destinazioni `notify` (predefinito: nessuna), `brain` (predefinito: `false`) e `queue` (`prompt-lead`, `launch` o `none`, predefinito `none`). Se il blocco è assente, valgono tutti i valori predefiniti e la risoluzione resta affidata alla persona.
- **Bloccanti strutturati.** Un blocco è un evento `blocker` di `journal-event/v8`, creato e risolto solo tramite l’helper del ledger, con attività, motivo, una riga `needs`, classe obbligatoria da C1 a C7 e resolver facoltativo. `resolver: lead` è rifiutato per C1, C2, C5 e C6; il ciclo chiede al responsabile di risolvere solo un blocco che il piano stesso ha contrassegnato con `resolver: lead`. `state.json` diventa `plan-snapshot/v8`, con blocco attivo e stato `blocked` derivato; `PROGRESS.md` inizia con un’intestazione di quattro righe: obiettivo, attività corrente, prossima azione e necessità.
- **La coda dei piani.** `.dwp/queue.json` (`dwp-queue-v1`) viene scritta solo da `shared/queue.py` del pacchetto o da una persona; all’approvazione `create` aggiunge un piano e il daemon Herdr legge soltanto la coda. Contiene al massimo 64 piani ed esegue un piano per repository alla volta, salvo `parallel: true`. Una coda danneggiata non interrompe il ciclo di vita.

L’ultima versione v7 è stata la **7.12.2**.

Release dello skill installato: **8.0.2**.
