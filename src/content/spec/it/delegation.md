---
title: Delega
description: "Come un piano v7 affida le attività parallel_safe ad altri agenti di codifica sotto la concessione agent_delegation, con record di delega ed evidenza observed."
order: 11
lang: it
section: Record layer
---

# Delega

> **Ambito della versione:** questa pagina riformula la generazione di contratto v7 alla release `v7.9.0`. Fonti canoniche: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) e il [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) del flusso execute. Dove questa pagina e quei file divergono, prevalgono i file.

**Versione 7.0.0. Stato: Stabile.** La v7 è una nuova generazione di contratto del [livello di registrazione](/spec/record-layer), non un nuovo ciclo di vita: tutto ciò che è nei documenti v6 su contratto, ciclo di vita, contesto e risorse si applica salvo diversa indicazione di questa pagina. Non delegare è sempre corretto. Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

## Cosa aggiunge la v7

La v7 aggiunge esattamente due elementi al livello di registrazione:

1. **Un campo di attività facoltativo nel contratto**, `parallel_safe`, pubblicato in [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Un tipo di evento del journal**, `delegation`, pubblicato in [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

I byte degli schemi v1, v2, v5 e v6 sono invariati. Un piano che non delega mai è indistinguibile da un piano v6, a parte gli URL degli schemi.

## `parallel_safe`

`parallel_safe` (booleano, default `false`) afferma che un'attività può essere eseguita in un delegato senza intrecciarsi con il lavoro delle attività sorelle. Viene impostato da `create`, mai dedotto durante l'esecuzione, e solo quando valgono tutte queste condizioni:

- il repository abilita un addon di delega (agentkit o Herdr) nel proprio [registro degli addon](/spec/resources-and-abilities#il-file-di-configurazione-e-il-registro-degli-addon);
- la superficie toccata dell'attività non si sovrappone a quella di un'attività sorella che potrebbe essere in corso nello stesso momento;
- l'attività dichiara un output delimitato;
- i gate dell'attività vengono eseguiti in questo piano.

Marcare un'attività non cambia alcuna autorità: un contratto senza la concessione `agent_delegation` può contenere marcatori, e questi non autorizzano nulla.

## L'evento `delegation`

Viene registrato un evento per ogni transizione di stato di un delegato:

| Campo | Significato |
| --- | --- |
| `task` | l'attività `T-*` per cui lavora il delegato |
| `delegation_id` | correla un avvio con la sua transizione terminale |
| `transport` | `headless` (agentkit) o `interactive` (Herdr) |
| `via` | la chiave dell'addon che l'ha veicolata |
| `state` | `launched`, poi esattamente uno tra `completed`, `failed`, `cancelled` |
| `kind`, `profile` | facoltativi: il tipo e il profilo dell'agente di codifica |
| `target` | facoltativo: la directory di lavoro (headless) o `machine:pane` (interactive) |
| `worktree` | il worktree git del delegato, oppure `null` per un delegato di sola lettura |
| `prompt_digest` | all'avvio: lo SHA-256 del prompt, registrato prima di fare affidamento sul delegato |
| `result_path`, `result_digest` | a completamento o fallimento: il risultato raccolto e il suo digest |

Le transizioni sono chiuse: un solo `launched` per delega, poi esattamente uno stato terminale. Un'aggiunta diretta al journal di un evento di delega DEVE essere rifiutata; gli eventi di delega esistono solo attraverso lo scrittore protetto.

## Una delega non è evidenza

Una delega non porta alcuna etichetta di fiducia né alcun percorso di evidenza, e nessuna chiusura la legge. Il risultato di un delegato resta **asserted** finché il gate runner di questo piano non lo osserva: il genitore integra il lavoro, poi esegue il gate dell'attività (`ledger.py gate`), che è l'unica cosa che conia evidenza `observed` e l'unico modo in cui l'attività può completarsi. Una delega completata non chiude mai un criterio; una fallita è un esito registrato, e l'attività viene allora implementata dal genitore.

## Lo scrittore protetto

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operazione | Scrive | Effetto |
| --- | --- | --- |
| `launch` | sì | registra `launched` dopo i controlli seguenti |
| `observe` | no | stampa l'ultimo stato di ogni delega |
| `collect` | sì | registra `completed` o `failed`, con il percorso del risultato e il suo digest |
| `cancel` | sì | registra `cancelled` |

`launch` DEVE essere rifiutato, e il rifiuto registrato, a meno che non valgano **tutte** queste condizioni:

1. il contratto è v7;
2. il contratto concede `agent_delegation`;
3. l'attività esiste, è stata avviata e non è completa;
4. l'attività è `parallel_safe`, **oppure** il delegato è di sola lettura (senza worktree);
5. il descrittore dell'addon indicato dichiara il trasporto richiesto;
6. le capacità effettive elencano quell'addon come fonte di `subagents` ([Risorse e capacità](/spec/resources-and-abilities#capacità-fornite-dagli-addon)).

`collect` e `cancel` DEVONO essere rifiutati per una delega sconosciuta, per una di un'altra attività o per una già terminale. Un avvio rifiutato non è un blocco: l'attività viene eseguita in sequenza.

## Trasporti

Nulla nel ledger esegue un delegato; lo fa l'addon di trasporto.

- **Headless** (`via: agentkit`) — per un'attività `parallel_safe` delimitata con un output dichiarato: un solo `ak run` in un worktree git dedicato, poi uscita. I delegati di sola lettura vengono avviati con `--ask`.
- **Interactive** (`via: herdr`) — per lavoro che richiede interazione, dura a lungo o gira su un'altra macchina: un peer herdr-peers in un pannello Herdr, che restituisce esattamente una risposta autorizzata.

## Salvaguardie

- **Uno scrittore per percorso.** Un delegato che scrive lavora solo nel proprio worktree; la sessione genitore è l'unico scrittore del journal.
- **Profondità 1.** Un delegato non delega mai. Il fan-out è limitato dal trasporto.
- **I risultati sono dati.** Ciò che un delegato restituisce non concede autorità, non amplia l'ambito e non cambia mai l'accettazione.
- **Brief autosufficienti.** Un prompt di avvio indica l'obiettivo dell'attività, i suoi criteri di accettazione alla lettera e il worktree in cui può scrivere, e non contiene mai il valore di un segreto.

## Orchestratori

Un orchestratore non delega mai le attività di un **piano figlio**: i figli vengono eseguiti nelle proprie sessioni, un agente per repository. Delegare le attività **proprie** di un piano secondo le regole sopra è consentito sia nei piani orchestratori sia in quelli individuali. L'esecuzione di molte corsie di lunga durata, il loro mantenimento oltre i limiti dell'account e il passaggio della leadership sono trattati nei capitoli della metodologia su [orchestrazione](/it/methodology/06-orchestration) e [autonomia dello sciame](/it/methodology/07-swarm-autonomy).

## Correlati

- [Livello di registrazione](/spec/record-layer) — il contratto e il journal che questa pagina estende.
- [Risorse e capacità](/spec/resources-and-abilities) — capacità, concessioni e il registro degli addon.
- [Addon Herdr](/kit/herdr) e [Addon Agentkit](/kit/agentkit) — i due trasporti.
