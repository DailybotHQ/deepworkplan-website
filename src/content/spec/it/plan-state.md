---
title: Stato del piano
description: "Il livello di stato del piano leggibile dalle macchine: manifest.json e state.json, gate record, outcome record come memoria episodica, riconciliazione e quando è richiesto."
order: 7
lang: it
section: State
---

# Stato del piano

**Versione 1.0. Stato: Stabile.** Questo documento specifica il livello di stato del piano leggibile dalle macchine della metodologia Deep Work Plan. Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

Due artefatti JSON — `manifest.json` (l'identità statica del piano) e `state.json` (lo stato di esecuzione live per attività, inclusi i risultati dei validation gate) — che ogni piano PUÒ portare insieme ai suoi file markdown, e che l'esecuzione non presidiata (vedi [Protocollo degli agenti](/spec/agent-protocol#profili-di-esecuzione)) e i workspace senza git (vedi [Archetipi](/spec/archetypes) §3) DEVONO portare.

Il piano in markdown rimane la **fonte di verità leggibile dagli esseri umani**. Il livello JSON è una **proiezione derivata**: viene rigenerato dall'agente nei punti di protocollo definiti, non modificato manualmente e non lasciato mai in silenzioso disaccordo con il markdown. Il suo scopo è l'interoperabilità — linting, verifica della conformità, diff, dashboard, scoperta nel registro e sincronizzazione con un'infrastruttura di sessione esterna — nessuna delle quali può essere costruita in modo affidabile sulla prosa.

## Perché esiste

Fino alla v1.1, i piani erano solo markdown in prosa. Questo li rendeva controllabili e indipendenti dagli agenti, ma non lasciava nulla che uno strumento potesse validare, confrontare o consumare: nessun gate di conformità, nessun rilevamento di desincronizzazione tra `README.md` e `PROGRESS.md`, nessun modo per un daemon o una sessione cloud di conoscere lo stato di un piano senza analizzare la prosa. La v1.2 aggiunge la proiezione JSON senza declassare il markdown — la proiezione è derivata dal markdown, nello stesso modo in cui un lockfile è derivato da un manifest.

## Posizionamento

Un piano che utilizza il livello di stato ha questa struttura:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← fonte di verità umana (invariata)
├── PROGRESS.md          ← log narrativo (invariato)
├── PROMPTS.md           ← invariato
├── manifest.json        ← identità statica (scritta alla materializzazione)
├── state.json           ← stato live (riscritto nei punti di protocollo)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` DEVE essere scritto esattamente una volta, quando il flusso `create` materializza il piano, e NON DEVE cambiare in seguito, tranne per una migrazione della versione della spec registrata in `PROGRESS.md`.

`state.json` DEVE essere riscritto dall'agente in ciascuno di questi punti di protocollo: materializzazione del piano (tutte le attività `pending`), avvio di un'attività (`in_progress`), ogni esecuzione di un validation gate (gate record aggiunto o aggiornato) e completamento di un'attività (`completed`, come parte del protocollo di completamento dell'attività nella [Specifica DWP](/spec/dwp-specification#protocollo-di-completamento-dellattivita)).

Entrambi i file DEVONO essere scritti atomicamente: scrivere in un file temporaneo nella stessa directory, poi rinominare sovrascrivendo il target. Una scrittura interrotta NON DEVE lasciare un file JSON troncato al suo posto.

## Quando il livello è richiesto

- Per l'esecuzione **interattiva** in un repository git, il livello di stato è RACCOMANDATO per i nuovi piani e OPZIONALE per i piani pre-v1.2. Un piano senza di esso rimane conforme.
- Per l'esecuzione **non presidiata**, il livello di stato è OBBLIGATORIO.
- In un **workspace agente** senza git, il livello di stato è OBBLIGATORIO: `state.json` porta le informazioni di recupero che il git log porta in un repository.

## `manifest.json` — identità del piano

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` e `task_count` sono OBBLIGATORI.

`archetype` DEVE essere uno tra `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` DEVE essere uno tra `micro`, `standard`, `deep` (vedi [Rigore proporzionale](/spec/dwp-specification#rigore-proporzionale)).

`parent_plan` collega un piano figlio al suo piano orchestratore (`{repo}:{plan_name}`, oppure `null`).

`created_by` DOVREBBE identificare l'agente e il modello che hanno creato il piano. NON DEVE contenere segreti, token o identificatori utente al di là di un nome visualizzato.

## `state.json` — stato di esecuzione live

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### Voci delle attività

Ogni file di attività nel piano DEVE avere esattamente una voce in `tasks`, identificata dal suo numero (`id`) e dal nome del file (`file`).

`status` DEVE essere uno tra `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` è valido solo quando l'utente ha rimosso esplicitamente l'attività dall'ambito tramite `refine`; `state.json` NON DEVE essere usato per saltare silenziosamente il lavoro.

Una voce `completed` DEVE portare `completed_at` e, dove il piano esegue commit, l'hash abbreviato `commit` — questo è il collegamento di tracciabilità tra piano e codice.

### Gate record

Ogni esecuzione di un comando di validazione DOVREBBE essere registrata come gate record: `command`, `passes` (booleano), `exit_code`, `last_run` e una breve stringa `evidence` leggibile (una riga di riepilogo o un percorso sotto `analysis_results/`, mai l'output completo del comando).

Un'attività NON DEVE essere segnata come `completed` in `state.json` se uno qualsiasi dei suoi gate record ha `passes: false` e non ha un'esecuzione successiva con esito positivo. I gate record sono l'equivalente automatico di "non segnare mai come completata senza prove" — il pattern di un flag `passes` per voce che protegge dal completamento prematuro.

### Outcome record come memoria episodica

Un'attività `completed` DOVREBBE portare un record `outcome`: cosa è stato `tried`, cosa è `failed`, cosa ha `worked` e `notes` in formato libero. Ogni voce DEVE essere di una riga.

Gli outcome record rendono un piano terminato una **memoria episodica** recuperabile: un agente (o una piattaforma di indicizzazione della memoria) può in seguito richiamare come un problema è stato risolto, non solo che lo è stato. Alimentano l'attività obbligatoria Skills & Agents Discovery, che DOVREBBE leggerli durante l'analisi dei pattern. Su piattaforme come Hermes che indicizzano la memoria degli agenti, gli outcome record in `state.json` rendono i piani completati direttamente recuperabili nelle sessioni future.

### Checkpoint e stato bloccato

`checkpoint` registra il punto di ripresa più granulare all'interno dell'attività corrente: l'`id` dell'attività, un localizzatore `step` in formato libero, un timestamp e una nota di una riga. Un agente DOVREBBE aggiornarlo ogni volta che fa una pausa all'interno di un'attività; DEVE aggiornarlo prima di qualsiasi interruzione pianificata in modalità non presidiata.

`blocked` è `null` oppure `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Un agente non presidiato che raggiunge una stop condition DEVE popolare `blocked` prima di fermarsi — è così che il prossimo heartbeat di un daemon, o un essere umano, apprende perché il piano si è fermato.

## Proiezione e riconciliazione

Il markdown DEVE vincere ogni disaccordo. Se `state.json` indica che l'attività 4 è `completed` ma il README del piano mostra una casella non spuntata, il file di stato è obsoleto.

Un agente che riprende l'esecuzione DEVE confrontare la lista delle caselle del README con `state.json` prima di continuare. In caso di desincronizzazione DEVE rigenerare `state.json` dal markdown (e dal git log, dove disponibile), registrare la riconciliazione in `PROGRESS.md` e solo allora procedere.

La sub-skill `verify` DEVE trattare la desincronizzazione come un rilievo di conformità: riportare quali attività divergono e in quale direzione.

Gli strumenti diversi dall'agente in esecuzione DEVONO trattare entrambi i file JSON come di sola lettura.

## Versionamento degli schema

Entrambi gli schema sono versionati tramite URL (`/v1.json`). I campi aggiuntivi sono consentiti all'interno di una versione; rinominare o cambiare il tipo di un campo richiede `/v2.json` e una nota di migrazione nel changelog della spec. Il campo `spec_version` nel manifest fissa la versione della spec DWP con cui il piano è stato creato; un agente che incontra un piano più recente della propria spec installata DOVREBBE segnalarlo anziché tentare di indovinare.
