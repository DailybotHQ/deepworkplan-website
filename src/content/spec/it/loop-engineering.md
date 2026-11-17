---
title: Ingegneria del ciclo (loop engineering)
description: "Semantica normativa del ciclo v8: autorità registrata, continuità avviata da una persona, successione, blocchi, coda, notifiche e visibilità della flotta."
order: 12
lang: it
section: Ingegneria del ciclo
---

# Ingegneria del ciclo (loop engineering)

Questa pagina definisce il contratto del piano per la loop engineering. Il **piano** resta l’autorità; il ciclo offre continuità e visibilità. Gli addon ampliano il metodo, ma non l’autorità registrata.

## 1. Regola v8

Un piano approvato arriva alla fine senza attendere una persona. L’autonomia opera **entro l’autorità registrata del piano**; la persona riceve notifiche, mentre accessi e credenziali richiedono intervento. Anche i gate C1–C7 del piano fermano il lavoro salvo pre-autorizzazione registrata. La regola v7 resta valida: il metodo funziona da solo, gli addon lo ampliano.

## Semantica del ciclo

### Registrazione e osservazione
Con l’addon Herdr attivo, il flusso `execute` del pack v8 rivendica la registrazione del lead e registra la successione. Sono osservati solo piani con registrazione lead e stato leggibile. Una persona avvia `herdr-peers autopilot --loop`: è un daemon, non un elemento di login né un servizio di sistema. Un daemon può osservare i piani segnalati da tutte le macchine Herdr abilitate. Senza registrazione lead il piano non è osservato.

### Continuità, stallo e passaggio

Per un piano aperto, il daemon sollecita solo il lead dopo i controlli di inattività: cinque minuti inattivo o concluso, nessuna lane al lavoro o risposta in attesa, pane nel perimetro e non esclusa, nessun dialogo, accesso, limite d’uso o bozza umana sulla riga di input. Il messaggio fisso chiede di proseguire fino alla fine rispettando gate e autorità registrati. La sollecitazione non concede autorità. Dopo tre sollecitazioni senza progresso nello stato, registra `plan_stalled` e attende un cambiamento. Un piano bloccato viene segnalato, non sollecitato.

Se il lead è assente, il daemon chiede al primo successore raggiungibile di eseguire `herdr-peers lead takeover --plan <id>`. L’helper verifica la successione e avanza l’epoch; il daemon non scrive la registrazione e non sceglie pane non elencate. Un limite d’uso non prova da solo l’assenza. Il protocollo 2 consente anche di nominare un lead dalle lane del piano, solo con autorizzazione umana esplicita via `lead claim --allow-appointment` e daemon avviato con `--appoint`. Prima di merge, tag o release, il lead attivo esegue `herdr-peers lead verify --plan <id>`.

### Brain, eventi e flotta

L’opzione `--brain` avvia un agente decisionale per i casi che le regole del daemon non risolvono. Può scegliere solo da un elenco chiuso di azioni. Il daemon resta l’unico attore: convalida una scelta consentita e agisce; non esegue mai testo libero del brain. Il blocco `autonomy` deve consentire il brain.

Il ciclo registra eventi del piano per stalli, blocchi, perdita del lead, completamento e risultati della coda. Con `--notify` il daemon invia un oggetto `plan-event-v1` al notifier configurato; il notifier Dailybot del pack trasforma gli eventi supportati in aggiornamenti al team. Una notifica non approva lavoro né modifica la registrazione del piano. La mappa flotta e `herdr-peers fleet ui` mostrano agenti e piani su più macchine. L’interfaccia è di sola lettura: non modifica lo stato né sollecita agenti. Vedi [autopilot herdr-peers v2.2.0](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.0/skills/herdr-peers/autopilot.md) e il [protocollo](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.0/skills/herdr-peers/protocol.md).

## 2. Blocco `autonomy` (plan-contract/v8)

L’oggetto top-level facoltativo `autonomy` è chiuso: chiavi sconosciute non valide. Nomi e tipi canonici sono nello [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Se manca il blocco, valgono tutti i default; se è presente, ogni campo omesso conserva il proprio default. Il consumer NON DEVE indovinare.

| Campo | Tipo e valori ammessi | Default se omesso |
|---|---|---|
| `stall_budget` | Intero da 1 a 10 | `3` sollecitazioni senza progresso |
| `promptable` | Elenco non vuoto di indirizzi pane Herdr | Solo il lead del piano |
| `notify` | Elenco non vuoto di destinatari | Nessun destinatario; gli eventi restano registrati |
| `brain` | Booleano | `false` |
| `queue` | `prompt-lead`, `launch` o `none` | `none` |

Un indirizzo pane usa la forma esatta Herdr: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. L’ID macchina non può iniziare con `-`. I campi limitano chi riceve prompt ed eventi, l’azione del brain e la partecipazione alla coda; non cambiano criteri di accettazione né gate.

## 3. Blocchi strutturati

Il piano v8 registra come dati perché non può proseguire, così ciclo, flotta e agente che riprende leggono gli stessi campi.

### 3.1. Record del blocco

Il ledger apre con `ledger.py block` e risolve con `ledger.py unblock`, registrando `blocker` in `journal-event/v8`. Rifiuta aggiunte dirette e registra ogni rifiuto.

| Campo | Regola |
|---|---|
| `task` | Attività bloccata del contract; non può essere già chiusa dalle prove. |
| `reason` | Obbligatorio, non vuoto, massimo 1000 caratteri: motivo. |
| `needs` | Obbligatorio, una sola riga non vuota, massimo 500 caratteri: requisito per continuare. |
| `class` | Obbligatorio: `C1`–`C7` di [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Facoltativo `lead` o `human`; se assente vale `human`. |

`lead` risolve entro l’autorità registrata, senza credenziali, accesso, consenso, pagamento, push su main, pubblicazione o eliminazione. `resolver: "lead"` è rifiutato per `C1`, `C2`, `C5`, `C6`. È attivo al massimo un blocco; un altro è rifiutato fino alla risoluzione. Riaprire la stessa attività può aggiornare `reason`, `needs`, `class` e `resolver`, mantenendo il primo `since`. La risoluzione contiene attività e nota facoltativa. Il blocco aperto impedisce il completamento e nuove prove non chiudono l’attività.

### 3.2. Dove trovarlo

`state.json` usa `plan-snapshot/v8`, struttura di `plan-snapshot/v6`, `blocker` come `{task, reason, since, needs, class, resolver?}` o `null` e `blocked` come stato derivato prioritario. Il ledger proietta i campi; non si scrivono a mano.

`PROGRESS.md` DOVREBBE iniziare sotto il titolo con quattro righe fisse, scritte da create e aggiornate a ogni transizione (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` e `Needs` derivano dallo snapshot: prima l’attività bloccata, altrimenti la prima incompleta. L’agente scrive `Goal` e `Next action`.

### 3.3. Cosa può fare il ciclo

Il ciclo, brain incluso, chiede al lead di risolvere solo se è indicato `resolver: "lead"`. Gli altri attendono la persona. v6/v7 non registrano `blocker`, mantengono `plan-snapshot/v6` con `blocker` nullo; i loro blocchi spettano alla persona.
## 4. Coda dei piani

La coda è `.dwp/queue.json`, schema `dwp-queue-v1`. Scrive solo il pack: `create` aggiunge all’approvazione; persona o lead riordinano tramite il flusso del piano; `execute` segna `started` quando rivendica il lead con il suo indirizzo; la finalizzazione segna `done`; `create` o `refine` possono segnare `skipped` con una nota breve. Ogni voce contiene piano, dipendenza `after` facoltativa, stato, lead e modalità d’avvio. Senza `parallel: true`, un repository esegue un piano alla volta.

Il daemon è un consumer limitato in sola lettura. Una coda non valida è trattata come vuota senza interrompere i piani. Un piano parte se la dipendenza è assente o completata, è approvato, nomina un lead e non esiste un altro piano in corso, salvo parallelismo. `prompt-lead` invia al lead questo messaggio fisso: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Il daemon non scrive la coda né esegue `launch` salvo esplicita aggiunta al contratto pubblicato.

## 5. Cosa conserva v8

v8 conserva tutto v7: `tasks[].parallel_safe`, delega e insieme completo di eventi; le funzioni v7 restano disponibili. v8 registra gli eventi v7 più `blocker` in `journal-event/v8` e li proietta in `plan-snapshot/v8`; i journal misti sono rifiutati. `plan-manifest/v7` mantiene forma e puntatore; la verifica associa manifest v7 e contract v8. I registri v6/v7 restano identici byte per byte.
