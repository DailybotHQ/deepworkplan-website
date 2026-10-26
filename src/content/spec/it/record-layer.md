---
title: Livello di registrazione
description: "Il livello di registrazione v6 e v7: contratto di risultato immutabile, journal append-only, classi di evidenza, sign-off, emendamenti, invarianti e ricevute."
order: 9
lang: it
section: Record layer
---

# Livello di registrazione

> **Ambito della versione:** questa pagina riformula il livello di registrazione normativo v6 su cui si basa lo standard attuale, DWP 7.0.0. Fonti canoniche alla release `v7.9.0`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) e [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). Dove questa pagina e quei file divergono, prevalgono i file. I piani v5 mantengono il livello di [stato del piano](/spec/plan-state) e non vengono mai migrati implicitamente.

**Versione 6.0.0, estesa nella 7.0.0. Stato: Stabile.** Il livello di registrazione sostituisce il completamento narrativo con dei record: il contratto è l'autorità, il journal è la memoria, gli helper si occupano della scrittura e ogni file generato è una proiezione. Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

## Il modello in una riga

Un piano è composto da due artefatti redatti e da una sequenza protetta. Il markdown del piano (`README.md` e i file delle attività) dice cosa verrà fatto. Il **contratto di risultato** (`contract.json`) dice cosa conta come completato e cosa il piano è autorizzato a fare. Il **journal** (`journal.ndjson`) registra cosa è effettivamente accaduto. `state.json` e `views/` vengono rigenerati dal journal e NON DEVONO essere modificati a mano; quando un file generato e il journal sono in disaccordo, prevale il journal e il file viene rigenerato.

## Rilevamento della generazione

Una cartella di piano è un piano della linea v6 se e solo se contiene un `manifest.json` il cui puntatore `contract` si risolve, un `contract.json` o una catena di revisioni `contracts/`. Il rilevamento DEVE usare questi artefatti, mai la versione del pack installato: un pack attuale può contenere piani v5 e un pack più vecchio può trovarsi davanti a un piano v6.

L'URL `schema` del contratto ne indica la **generazione**, e il manifest e ogni evento del journal la rispecchiano:

| Generazione | Contratto | Eventi del journal | Manifest | Aggiunge |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` e l'evento `delegation` ([Delega](/spec/delegation)) |

I nuovi piani creati dal pack 7.x sono v7 per impostazione predefinita; una richiesta esplicita di `v6` materializza comunque un contratto v6. Un piano non cambia mai generazione, e un journal che mescola generazioni DEVE essere rifiutato. Entrambe le generazioni si proiettano nella stessa forma [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## Il contratto di risultato

Un contratto per piano, conforme allo schema della sua generazione. Contiene la dichiarazione del risultato e la definizione di successo, i criteri di accettazione, le attività con i loro prerequisiti, la superficie toccata e l'intento di gate, le invarianti con ambito di piano, l'ambito (percorsi consentiti, classi di comandi, operazioni vietate), l'envelope delle risorse, i limiti di scheduling, i permessi e il record di autorizzazione.

- **Identità.** Il `contract_id` è lo SHA-256 dei byte canonici del contratto senza il campo id. Ogni record prodotto sotto il contratto lo cita.
- **Immutabilità.** Una volta avviata l'esecuzione, il contratto NON DEVE cambiare. Un contratto modificato è una nuova **revisione** sotto `contracts/`, che cita la revisione madre, con numeri di revisione contigui e un'autorità registrata nuova.
- **Id stabili.** Criteri (`AC-*`), invarianti (`INV-*`) e attività (`T-*`) DEVONO essere univoci, e i record citano gli id, mai le posizioni in un elenco. Il grafo delle attività DEVE essere aciclico e ogni intento di gate DEVE fare riferimento a un criterio dichiarato.
- **Permessi.** Le capacità concesse e non concesse DEVONO essere sottoinsiemi disgiunti di un insieme chiuso: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Autorizzazione.** Il meccanismo è esattamente `plan_authorship` (la persona ha redatto o revisionato il piano prima dell'esecuzione) oppure `pre_authorization` (una concessione permanente con un envelope dichiarato, come nella modalità trust). Entrambi funzionano in modo identico come gate; cambia solo l'autorità registrata.
- **Chiudibilità.** Ogni criterio DEVE essere chiudibile: un criterio presidiato da un'attività viene chiuso da un'evidenza `observed` del suo gate o da un sign-off umano `asserted`, secondo le classi di evidenza che accetta. Una bozza di criterio che non ne accetta nessuna viene rifiutata.

## Materializzazione

Un piano viene materializzato dall'helper fornito (`ledger.py materialize`), mai a mano, esattamente in quest'ordine, con ogni passaggio idempotente e riprendibile:

1. **`manifest.json`** con il puntatore al contratto, scritto per primo affinché la generazione del piano sia individuabile anche se la materializzazione viene interrotta.
2. **`contract.json`**, validato e indirizzato per contenuto.
3. L'evento del journal **`approval`**, che cita l'id del contratto e il digest del markdown del piano.

Solo quell'evento di approvazione apre il gate di avvio delle attività. Un contratto copiato a mano senza di esso viene rifiutato all'avvio dell'attività, e un manifest il cui puntatore non corrisponde al contratto in materializzazione viene rifiutato anziché riscritto.

## Il journal

`journal.ndjson` è append-only: un oggetto JSON chiuso per riga, mai modificato o cancellato. Una correzione è un evento successivo. Ogni evento riporta il proprio schema, il tipo, un `seq` strettamente crescente, un timestamp, il piano, il `contract_id` e l'attore (`helper`, `agent`, `host_adapter` o `human`). Il catalogo degli eventi copre avvii di attività, approvazioni, esecuzioni di gate, osservazioni, adattamenti, emendamenti, interventi, campioni di risorse, coppie di controllo, selezioni dello scheduler, rifiuti, rendering delle viste, riconciliazioni e riparazioni del journal; la v7 aggiunge gli eventi di delega. Ogni rifiuto è a sua volta registrato.

## Classi di evidenza

Gli eventi che portano evidenza registrano un'etichetta di **fiducia**:

1. **observed** — un helper fornito ha eseguito personalmente il controllo, con directory di lavoro, ambiente, timeout e output catturato dichiarati. Solo il gate runner (`ledger.py gate`) conia evidenza di gate observed; un agente che si limita a trascrivere un risultato che riferisce non può farlo.
2. **imported** — ricavata da una fonte esterna corrispondente con provenienza, per esempio un gate record v5 migrato il cui puntatore di evidenza si risolve.
3. **asserted** — dichiarata senza una verifica indipendente.

Ogni criterio dichiara quali classi accetta, così un criterio solo observed non può mai chiudersi su una semplice affermazione. I checksum stabiliscono l'identità dei byte, non la verità semantica; il livello di registrazione verifica struttura e provenienza e non dimostra la semantica del prodotto.

## Sign-off umano

Un criterio che deve essere giudicato da una persona si chiude tramite `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. Il sign-off viene registrato come `asserted`, cita l'artefatto su cui si fonda, conta solo all'interno della finestra di evidenza dell'attività che lo dichiara e chiude solo un criterio che accetta `asserted`. Un agente non firma mai al posto di una persona. I record con attore umano scritti fuori dalla materializzazione portano un marcatore di autorità esplicito (una nota scritta dalla persona, registrata per percorso e digest, oppure una conferma interattiva); il ledger non può autenticare una persona, quindi il marcatore rende l'affermazione verificabile anziché observed.

## Criteri controllati

Un criterio dichiarato come controllo di regressione o di discriminazione si chiude solo su una **coppia di controllo discriminante**: il controllo fallisce sulla revisione di partenza e passa su quella nuova. Una coppia che passa su entrambi i rami viene registrata come non discriminante e mai arrotondata per eccesso; un punto di partenza sporco o un ramo vecchio non disponibile viene registrato come controllo non disponibile, mai sintetizzato.

## Esecuzione e completamento

Il dispatch proviene dallo scheduler deterministico (`scheduler.py ready`), e `ledger.py start` rifiuta un'attività i cui prerequisiti sono incompleti. Ogni avvio di attività registra un'impronta dell'albero di lavoro, e l'evidenza viene riutilizzata solo per la stessa attività e lo stesso criterio su un'impronta equivalente.

**Le invarianti hanno ambito di piano.** Ogni invariante dichiarata vale per l'intero piano e viene valutata a ogni confine come osservazione (`INV-<id>: pass` oppure `INV-<id>: fail: <reason>`). Una proprietà che solo alcune attività devono rispettare è un criterio di accettazione di quelle attività, mai un'invariante.

**Il completamento è derivato, mai dichiarato.** `ledger.py complete` rifiuta, e registra il rifiuto, finché un criterio manca di evidenza accettata entro la finestra o un'invariante manca di una valutazione recente superata. Lo snapshot mostra un'attività come completata esattamente quando i record lo supportano.

## Adattamenti ed emendamenti

Le modifiche a esecuzione in corso sono proposte allo scheduler, limitate a un insieme chiuso: `split`, `reorder`, `insert`, `change_strategy` e `retry`. Un adattamento NON DEVE eliminare un requisito, indebolire o sostituire l'accettazione, ampliare ambito o permessi, spendere oltre l'envelope o segnare come completo uno scenario non eseguito.

Una modifica ad ambito, criteri di accettazione, permessi o envelope è un **emendamento del contratto**: `ledger.py amend` prepara il contratto rivisto come revisione successiva, registra l'emendamento con i criteri di cui invalida l'evidenza precedente, richiede una nuova approvazione con un marcatore di autorità umana e solo allora sostituisce il contratto attivo. Un emendamento interrotto riprende dal primo passaggio mancante; la paternità del piano non si trasferisce mai a una revisione.

## Ricevute, viste ed esportazione

`outcomes.py receipt` ricalcola il risultato del piano a partire dai record, quindi cambia quando cambiano i record; non viene mai scritto a mano. `views.py render` rigenera le viste leggibili dalle persone; una vista modificata da una persona viene segnalata, mai sovrascritta in silenzio, e la riconciliazione è a sua volta registrata. Poiché `.dwp/` è in gitignore, `ledger.py export --dest <dir>` raccoglie journal, snapshot, catena dei contratti e ogni artefatto di evidenza citato, per durabilità o per un altro host.

## Superfici di sola lettura e ripresa

`status` e `verify` non scrivono mai su un piano della linea v6; riferiscono tramite comandi puri e le proiezioni generate. Un host che riprende recupera in un ordine fisso (ispezionare, validare, proiettare, eseguire il rendering con l'autorità registrata) e tratta un'impronta obsoleta come evidenza invalidata da rieseguire, mai come risultato riutilizzabile. Il journal non viene mai riprodotto come contesto di conversazione: il lavoro riprende attraverso il ciclo di execute con un [manifest di contesto](/it/spec/resources-and-abilities#il-manifest-di-contesto-per-attività) per attività.

## Coesistenza e migrazione

I piani v5 e della linea v6 POSSONO coesistere in una stessa `.dwp/plans/`, e ciascuno opera sotto la propria generazione per tutta la sua vita. L'unico percorso da v5 a v6 è una migrazione esplicita e con anteprima (`migrate_v6.py`, eseguita tramite `refine`) con un backup verificato e un rollback; la cronologia v5 migrata è `imported` quando la sua evidenza si risolve e `asserted` altrimenti, mai `observed`. Non esiste una migrazione inversa.

## Correlati

- [Risorse e capacità](/spec/resources-and-abilities) — il manifest di contesto, l'envelope delle risorse, le capacità dell'host e il registro degli addon.
- [Delega](/spec/delegation) — cosa aggiunge la v7 a questo livello.
- [Stato del piano](/spec/plan-state) — il livello di stato v5 mantenuto.
