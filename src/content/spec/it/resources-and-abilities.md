---
title: Risorse e capacità
description: "Manifest di contesto per attività, envelope delle risorse, capacità dell'host, registro degli addon .dwp/config.json e capacità aggiunte dagli addon abilitati."
order: 10
lang: it
section: Record layer
---

# Risorse e capacità

> **Ambito della versione:** questa pagina riformula quattro documenti normativi dello standard attuale, DWP 7.0.0, alla release `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/CONFIG.md) e [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_ABILITIES.md). Dove questa pagina e quei file divergono, prevalgono i file.

**Stato: Stabile (contesto e risorse dalla 6.0.0; configurazione e capacità dalla 7.0.0).** Queste regole vincolano i piani della linea v6 ([Livello di registrazione](/spec/record-layer)); lo standard v5 resta invariato. Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

## Il manifest di contesto per attività

Prima di ogni attività, l'agente deriva un **manifest di contesto** dal contratto e dall'intero journal (`context_manifest.py`). È una vista derivata, mai memorizzata come stato: derivarlo due volte dagli stessi record DEVE produrre byte identici, e il manifest NON DEVE leggere al di fuori del piano e del suo repository. La sua forma è pubblicata come [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Sezione | Derivata da |
| --- | --- |
| `identity` | nome del piano, id e revisione del contratto attivo |
| `authorization` | gli eventi di approvazione, alla lettera, inclusi i checkpoint di consenso |
| `repository_rules` | l'ambito del contratto e le invarianti con il loro stato di valutazione attuale |
| `acceptance` | i criteri dell'attività con il loro stato di chiusura |
| `touched_surface` | i file dichiarati con i loro hash di contenuto attuali; un file mancante emerge come mancante |
| `evidence` | i puntatori di evidenza entro la finestra che si risolvono su disco |
| `dead_ends` | gate falliti, rifiuti, adattamenti rifiutati e controlli non discriminanti |
| `freshness` | l'impronta degli input che il manifest riassume |
| `next_action` | esattamente un passo successivo con un comando concreto |

`authorization`, `repository_rules` e `acceptance` sono **obbligatorie**: la potatura del contesto non può mai nascondere il confine di accettazione o di autorizzazione. La scala delle azioni successive è ordinata (approvazione, avvio, autorità, controllo, evidenza, completamento) e non presenta mai un normale gate superato come chiusura di un criterio controllato.

**I vicoli ciechi vengono conservati.** Una voce esce dal digest solo in base a fatti comprovati dai record (la stessa impronta è poi passata, un rifiuto duplicato più recente l'ha sostituita o una revisione del contratto l'ha resa obsoleta); un semplice cambiamento della superficie NON DEVE eliminarla. **L'attualità viene verificata:** un riepilogo la cui impronta di input registrata non corrisponde più è obsoleto, e un riepilogo senza impronta è obsoleto per costruzione. **La cronologia si carica solo per trigger** — un passaggio di consegne registrato o un emendamento che riguarda l'attività; altrimenti il manifest da solo è il contesto dell'attività.

## Contabilità a quattro grandezze

Il carico di istruzioni e il costo vengono riportati come quattro grandezze distinte: **byte di istruzioni** statici, **token del provider** (solo dove un contatore dell'host li ha registrati), **costo monetario** (solo da campioni registrati a tariffa reale) e **tempo reale** (dai timestamp degli eventi). Una grandezza mancante viene riportata come mancante con la sua ragione, mai stimata, e i byte non vengono mai convertiti in token o denaro.

## Capacità dell'host

L'host di runtime dichiara le proprie **capacità** (abilities) da un insieme chiuso: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Una capacità sconosciuta DEVE essere rifiutata, e una capacità non dichiarata è `false`. L'**host minimo** — nessun cambio di modello, nessun subagente, nessuna telemetria, nessuno stop — è una postura supportata, mai un errore; ogni limite che richiede una capacità mancante degrada a consultivo, con la capacità mancante indicata.

Le capacità non sono concessioni. Una concessione (grant) nel contratto è autorità; una capacità è ciò che l'ambiente può effettivamente fare. Ogni postura che richiede una capacità richiede comunque la sua concessione.

## L'envelope delle risorse

Un contratto PUÒ dichiarare dei limiti nel proprio envelope delle risorse. Un limite è **applicato** solo quando indica una fonte di misurazione reale; altrimenti è **consultivo**, e la parità di applicazione tra host non viene mai dichiarata.

- **Fonti dei contatori.** I contatori osservabili dal journal (intervallo di tempo reale, ripetizioni di gate, chiamate di dispatch) vengono calcolati dai record del piano stesso. I contatori solo dell'host (spesa, token del provider) richiedono la capacità di misurazione corrispondente e un campione observed proveniente da un host adapter; un contatore mancante non è un utilizzo gratuito.
- **Riserve.** Un limite PUÒ dichiarare una `reserve` affinché verifica, ripetizione e ripresa non vengano soffocate dal lavoro ordinario: il dispatch viene rifiutato quando speso più in sospeso supererebbe il limite meno la riserva.
- **Esaurimento.** Il raggiungimento di un limite salva un checkpoint incompleto, registra `LIMIT: exhausted <id>: <detail>` e sospende il dispatch fino a un record esplicito `LIMIT: recovered <id>`. Un esaurimento non può mai soddisfare un criterio di accettazione.
- **Liquidazione della cancellazione.** Una prenotazione in corso si liquida esattamente una volta, come rilasciata o impegnata; una seconda liquidazione in conflitto viene rifiutata, mai arbitrata.
- **Postura di routing.** Il default è un modello fisso. Il cambio di livello del modello richiede sia la concessione `model_routing` sia la capacità omonima; il dispatch parallelo richiede sia la concessione `agent_delegation` sia la capacità `subagents`. Una postura di routing è una dichiarazione di permesso, mai un'affermazione di efficacia.

## Il file di configurazione e il registro degli addon

`.dwp/config.json` (repository) e `~/.dwp/config.json` (utente) condividono un'unica forma, pubblicata come [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), e un unico parser (`config.py`). **La metodologia funziona senza file di configurazione e senza addon**; nulla nel file può rendere un piano, un flusso o la conformità dipendenti da un addon.

- **Tracciato per impostazione predefinita.** Il file del repository contiene decisioni, mai segreti, ed è tracciato affinché i membri del team e la CI leggano lo stesso registro: l'onboarding scrive la regola `.gitignore` `.dwp/*` più `!.dwp/config.json`. I piani e i record di benchmark restano ignorati.
- **Precedenza.** Il file del repository prevale su quello dell'utente, e un file assente significa tutto disabilitato. La chiave `addons` si risolve per singola chiave di addon; la chiave `benchmark` si risolve in blocco.
- **Chiavi del registro** sono i nomi delle directory degli addon nel pack: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Ogni voce ha `enabled` (solo `true` abilita), una `version` facoltativa e una `note` facoltativa di una riga. Una chiave sconosciuta viene ignorata con un solo avviso.
- **Assente significa non abilitato.** Solo l'onboarding con il consenso dello sviluppatore, il passo di installazione di un addon o la persona abilitano qualcosa. Un addon abilitato che non viene rilevato e porta una nota viene segnalato come rinviato.
- **Lettura fail-closed.** Un file illeggibile o un valore malformato non contribuisce nulla e produce esattamente un avviso; un lettore non interrompe mai un flusso e non tace mai su ciò che ha scartato. Lo scrittore riconcilia in modo atomico e rifiuta di sovrascrivere un file che non riesce ad analizzare.
- **Record dell'host.** Una chiave facoltativa `host` registra le capacità dichiarate della macchina (booleani dell'insieme chiuso). `telemetry: true` richiede comunque il consenso dello sviluppatore.
- **La baseline non cambia.** La revisione locale AI Diff Reviewer resta parte di ogni Final Review, che il registro la nomini o meno.

## Capacità fornite dagli addon

Dalla 7.0.0, gli addon abilitati possono aggiungere capacità a runtime:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

Ossia: le capacità effettive sono l'unione di quelle dichiarate dall'host e di quelle fornite da ogni addon abilitato, descritto da un `addon.json` valido, rilevato e su una versione d'interfaccia compatibile.

- **Descrittori.** Ogni addon del pack fornisce un `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) che dichiara la sua chiave, ciò che fornisce e come viene rilevato.
- **Il rilevamento è di sola lettura.** Un comando di rilevamento viene eseguito senza shell, con stdin chiuso e un timeout di 10 secondi, e nulla di ciò che stampa viene eseguito. Un prodotto la cui versione major d'interfaccia riportata differisce da quella fissata non è disponibile, con un solo avviso.
- **Non abilitato significa non consultato.** Il descrittore di un addon disabilitato non viene aperto e il suo comando di rilevamento non viene eseguito. L'unione è monotona: abilitare un addon può solo aggiungere capacità.
- **Mai persistite.** Le capacità effettive vengono ricalcolate a ogni chiamata e NON DEVONO essere scritte in un piano. Un piano registra ciò che ha usato — l'evento di delega indica il suo trasporto e il suo addon — non ciò che era disponibile.
- **Le capacità non sono autorità.** L'addon agentkit può fornire `subagents`, `cancel_children` e `model_routing`; l'addon Herdr può fornire `subagents` e `cancel_children`. Delegare richiede comunque la concessione `agent_delegation` del contratto ([Delega](/spec/delegation)).

`resources.py abilities` stampa l'insieme effettivo e la provenienza di ciascuna capacità; è di sola lettura.

## Correlati

- [Livello di registrazione](/spec/record-layer) — contratto, journal ed evidenza.
- [Delega](/spec/delegation) — come un piano usa la capacità `subagents`.
- [Add-on](/spec/addons) — gli addon opzionali stessi.
