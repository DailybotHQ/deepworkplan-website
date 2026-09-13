---
title: Stato del piano
description: "Il livello di stato del piano leggibile dalle macchine: manifest.json e state.json, gate record, outcome record come memoria episodica, riconciliazione e quando è richiesto."
order: 8
lang: it
section: State
---

# Stato del piano

**Versione 5.0.0. Stato: Stabile.** Questo documento specifica il livello di stato del piano leggibile dalle macchine della metodologia Deep Work Plan, ora allineato alla versione dello standard DWP stesso — nessun requisito esistente viene indebolito dalla rinumerazione. Questa revisione documenta anche l'aggiornatore di stato protetto, la pubblicazione verificata del piano e le regole di verità dell'evidenza che un piano completato deve soddisfare (vedi sotto). Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

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

`state.json` DEVE essere riscritto dall'agente in ciascuno di questi punti di protocollo: materializzazione del piano (tutte le attività `pending`), avvio di un'attività (`in_progress`), ogni esecuzione di un validation gate (gate record aggiunto o aggiornato) e completamento di un'attività (`completed`, come parte del protocollo di completamento dell'attività nella [Specifica DWP](/spec/dwp-specification#protocollo-di-completamento-dellattivita)), un checkpoint prima di qualsiasi interruzione pianificata, e uno stop `blocked`.

Entrambi i file DEVONO essere scritti atomicamente: scrivere in un file temporaneo nella stessa directory, poi rinominare sovrascrivendo il target. Una scrittura interrotta NON DEVE lasciare un file JSON troncato al suo posto.

## Quando il livello è richiesto

- Per l'esecuzione **interattiva** in un repository git, il livello di stato è RACCOMANDATO per i nuovi piani e OPZIONALE per i piani pre-v1.2. Un piano senza di esso rimane conforme.
- Per l'esecuzione **non presidiata**, il livello di stato è OBBLIGATORIO.
- In un **workspace agente** senza git, il livello di stato è OBBLIGATORIO: `state.json` porta le informazioni di recupero che il git log porta in un repository.

## `manifest.json` — identità del piano

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` e `plan_format` sono OBBLIGATORI.

`archetype` DEVE essere uno tra `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` DEVE essere uno tra `micro`, `standard`, `deep` (vedi [Rigore proporzionale](/spec/dwp-specification#rigore-proporzionale)).

`plan_format` DEVE essere uno tra `lite`, `full` — la rappresentazione scelta alla creazione (vedi [Piani Lite](/spec/lite-plans)). È immutabile a livello di manifest: una successiva promozione da Lite a Full viene registrata in `state.json`, mai riscrivendo il manifest.

`parent_plan` collega un piano figlio al suo piano orchestratore (`{repo}:{plan_name}`, oppure `null`).

`created_by` DOVREBBE identificare l'agente e il modello che hanno creato il piano. NON DEVE contenere segreti, token o identificatori utente al di là di un nome visualizzato.

## `state.json` — stato di esecuzione live

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
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
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
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

Le voci delle attività di un piano Lite usano un locator `inline` che punta all'ancora dell'attività in `README.md` invece di un file separato — il resto della voce (gate, outcome, stato) funziona allo stesso modo:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Format, materialization, approval e promotion

`format` DEVE essere uno tra `lite`, `full` e rispecchia il `plan_format` del manifest — qui è mutabile, a differenza del manifest, perché un piano Lite PUÒ in seguito essere promosso a Full. `materialization` DEVE essere uno tra `materializing` (la cartella del piano è in corso di scrittura), `ready` (la materializzazione è completa) o `promoting` (una promozione da Lite a Full è in corso). `approval` DEVE essere uno tra `pending`, `approved`, `pre_approved`; è OPZIONALE in questo schema affinché un piano scritto prima che venisse registrato resti comunque valido — quando è assente, si considera come valore la riga `Approval` del README, e `pending` quando nessuno dei due è presente. `promotion` è `null` al di fuori di una promozione, oppure un oggetto che registra l'intento della promozione e le attività di destinazione mentre `materialization` è `promoting`. Vedi [Piani Lite](/spec/lite-plans) per il ciclo di vita completo che questi campi codificano.

### Voci delle attività

Ogni attività — un file separato in un piano Full, oppure un record `{#task-N}` inline in un piano Lite — DEVE avere esattamente una voce in `tasks`, identificata dal suo numero (`id`) e dal suo `locator`. `locator.kind` DEVE essere `file` (Full — `value` è il nome del file dell'attività) oppure `inline` (Lite — `value` è l'ancora dell'attività, `#task-N`).

`status` DEVE essere uno tra `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` è valido solo quando l'utente ha rimosso esplicitamente l'attività dall'ambito tramite `refine`; `state.json` NON DEVE essere usato per saltare silenziosamente il lavoro.

Una voce `completed` DEVE portare `completed_at` e, dove il piano esegue commit, l'hash abbreviato `commit` — questo è il collegamento di tracciabilità tra piano e codice.

### Gate record

Ogni esecuzione di un comando di validazione DOVREBBE essere registrata come gate record: `command`, `passes` (booleano), `exit_code`, `last_run` e una breve stringa `evidence` leggibile (una riga di riepilogo o un percorso nel `analysis_results/` locale del piano (dentro la cartella propria del piano, mai nella root del repository), mai l'output completo del comando).

Un'attività NON DEVE essere segnata come `completed` in `state.json` se uno qualsiasi dei suoi gate record ha `passes: false` e non ha un'esecuzione successiva con esito positivo. I gate record sono l'equivalente automatico di "non segnare mai come completata senza prove" — il pattern di un flag `passes` per voce che protegge dal completamento prematuro.

### Outcome record come memoria episodica

Un'attività `completed` DOVREBBE portare un record `outcome`: cosa è stato `tried`, cosa è `failed`, cosa ha `worked` e `notes` in formato libero. Ogni voce DEVE essere di una riga.

Gli outcome record rendono un piano terminato una **memoria episodica** recuperabile: un agente (o una piattaforma di indicizzazione della memoria) può in seguito richiamare come un problema è stato risolto, non solo che lo è stato. Alimentano le disposizioni locali per attività sulle skill e la riconciliazione delle skill del Final Review, che li legge durante l'analisi dei pattern. Su piattaforme come Hermes che indicizzano la memoria degli agenti, gli outcome record in `state.json` rendono i piani completati direttamente recuperabili nelle sessioni future.

### Checkpoint e stato bloccato

`checkpoint` registra il punto di ripresa più granulare all'interno dell'attività corrente: l'`id` dell'attività, un localizzatore `step` in formato libero, un timestamp e una nota di una riga. Un agente DOVREBBE aggiornarlo ogni volta che fa una pausa all'interno di un'attività; DEVE aggiornarlo prima di qualsiasi interruzione pianificata in modalità non presidiata.

`blocked` è `null` oppure `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Un agente non presidiato che raggiunge una stop condition DEVE popolare `blocked` prima di fermarsi — è così che il prossimo heartbeat di un daemon, o un essere umano, apprende perché il piano si è fermato.

## Proiezione e riconciliazione

Il markdown DEVE vincere ogni disaccordo. Se `state.json` indica che l'attività 4 è `completed` ma il README del piano mostra una casella non spuntata, il file di stato è obsoleto.

Un agente che riprende l'esecuzione DEVE confrontare la lista delle caselle del README con `state.json` prima di continuare. In caso di desincronizzazione DEVE rigenerare `state.json` dal markdown (e dal git log, dove disponibile), registrare la riconciliazione in `PROGRESS.md` e solo allora procedere.

La sub-skill `verify` DEVE trattare la desincronizzazione come un rilievo di conformità: riportare quali attività divergono e in quale direzione.

Gli strumenti diversi dall'agente in esecuzione DEVONO trattare entrambi i file JSON come di sola lettura.

## Aggiornamenti protetti dello stato

Le normali scritture di avanzamento passano attraverso un aggiornatore mirato incluso nella skill, anziché una riscrittura completa del file. Rifiuta lo stato malformato apertamente, e rifiuta di segnare un'attività come `completed` senza evidenza di gate non vuota allegata — è disponibile una forma `--gate-json` per un comando il cui output contiene caratteri pipe, e l'aggiornatore accetta lo stesso oggetto gate chiuso descritto sopra. I retry sostituiscono solo il proprio comando; un comando diverso mantiene il proprio record separato. `--block-reason` registra un blocco; `--resolve-blocker` risolve solo il blocco dell'attività corrente, mai di un'altra attività. Il lavoro saltato non può mai rendere un piano `completed`. `--reopen-reason` registra l'intento di chi chiama di modificare il piano tramite `refine` — la modifica e qualsiasi evidenza che invalida DEVONO essere registrate prima nel log dell'attività. `--expected-sha256` rifiuta una scrittura contro uno snapshot di stato ormai superato. Una directory `.lock` cooperativa serializza gli scrittori concorrenti; il lock di uno scrittore in crash DEVE essere ispezionato prima della rimozione, e non viene rivendicata alcuna protezione contro un editor che aggira del tutto il lock. Questi record attestano risultati — non dimostrano di per sé che un comando sia stato eseguito, né che il suo output sia stato accettato semanticamente.

## Pubblicazione verificata del piano

Prima di annunciare il completamento, i log delle attività terminate (ciascuno con la propria **Skills disposition** e, nel Final Review, la propria **Documentation decision**), l'indice del README e `PROGRESS.md` DEVONO essere redatti a partire da risultati di origine e di accettazione guadagnati. L'attività finale del piano si chiude quindi attraverso il finalizzatore incluso nella skill: la sua transizione terminale valida il candidato completato rispetto a ogni artefatto del piano prima di scrivere lo stato, verifica i file in seguito e registra una ricevuta `analysis_results/FINALIZATION.json`. Un gate positivo inventato NON DEVE sostenere questa transizione — la ricevuta è evidenza esterna di ciò che è stato effettivamente verificato, mai un proprio prerequisito. `bash ../verify/conformance.sh --plan PLAN_name` viene eseguito subito dopo, contro gli artefatti reali su disco.

Una pubblicazione interrotta lascia un marcatore `.finalizing.json` in essere; la verifica normale fallisce finché l'evidenza non viene ispezionata e l'helper di recupero non riesce contro lo stesso candidato — nulla riprende una pubblicazione per supposizione. Un lock cooperativo obsoleto richiede di confermare che nessuno scrittore sia ancora attivo prima della rimozione. Nulla in questo livello esegue commit, push, comandi di gate memorizzati, né ripara silenziosamente il markdown del piano. Un interprete Python mancante produce `UNVERIFIED`, mai `completed`.

## Verità dell'evidenza e modifiche

Ogni modifica all'ambito, ai criteri di accettazione o al rinvio di un'attività porta un record di modifica durevole: il criterio originale testuale, ciò che è stato osservato, la disposizione, il motivo, l'autorità dietro di essa (utente, sviluppatore o evidenza), le attività interessate e quale evidenza è stata invalidata o preservata. Le modifiche vengono aggiunte, mai retrodatate; `manifest.json` mantiene la propria provenienza di creazione e non viene mai riscritto per adattarsi a un ambito live cambiato.

Cinque stati di evidenza descrivono contro cosa un record di attività può chiudersi:

- **Indagine completata** — lavoro reale registrato; chiude un'attività solo contro un criterio rivisto che la nomina, mai contro l'originale come scritto.
- **Scenario non eseguito** — registrato come non eseguito; non contribuisce ad alcuna evidenza positiva in nessuna epoca.
- **Requisito rinviato** — il criterio si sposta verso un'attività di destinazione nominata con autorità registrata; solo quella modifica chiude l'origine.
- **Gate fallito** — resta fallito finché lo stesso intento di accettazione non viene rieseguito e superato; un retry sostituisce solo il proprio comando.
- **Esito di prodotto raggiunto** — il criterio come scritto, verificato dal proprio gate; l'unico stato che completa un'attività invariata.

L'applicazione è meccanica ovunque i record lo consentano. L'evidenza di gate marcata "invalidated by refine" è storia conservata, mai evidenza positiva, e un'attività completata che vi si affida ancora viene segnalata dal checker. Un record positivo il cui stesso testo ammette che il controllo non è mai stato eseguito (per esempio "never entered", "did not run" o "cannot be measured") è una contraddizione, segnalata allo stesso modo — così come un'attività di stato completata il cui log riporta ancora `Status: pending`. Contraddizioni narrative oltre queste — un report le cui conclusioni contraddicono la propria checklist — richiedono un revisore umano; il checker riporta ciò che dicono i record, non ciò che significa la prosa. Un utente PUÒ accettare esplicitamente un'eccezione delimitata con autorità registrata; una pre-approvazione non presidiata non è mai un permesso generale ad abbandonare un obiettivo centrale, e un criterio obbligatorio non soddisfacibile è un blocco, mai lavoro completato.

## Versionamento degli schema

Entrambi gli schema sono versionati tramite URL. I campi aggiuntivi sono consentiti all'interno di una versione; rinominare o cambiare il tipo di un campo richiede una nuova versione di schema e una nota di migrazione nel changelog della spec. Questa revisione introduce `/v2.json` per entrambi gli schema: il campo `file` della voce di attività diventa un `locator` tipizzato (`{"kind": "file" | "inline", "value": ...}`), il manifest guadagna `plan_format`, e il file di stato guadagna `format`, `materialization`, `approval` e `promotion` — insieme, i campi di cui i piani Lite hanno bisogno (vedi [Piani Lite](/spec/lite-plans)). I manifest e i file di stato `/v1.json` restano validi e non vengono mai riscritti silenziosamente a v2; una sessione di `refine` PUÒ migrarne uno deliberatamente. Il campo `spec_version` nel manifest fissa la versione della spec DWP con cui il piano è stato creato; un agente che incontra un piano più recente della propria spec installata DOVREBBE segnalarlo anziché tentare di indovinare.
