---
title: Piani Lite
description: "Piani Lite: record di attività compatti ed eseguibili inline in README.md, la loro creazione e selezione del formato, e la promozione a un piano Full."
order: 3
lang: it
section: Workflow
---

# Piani Lite

**Versione 2.4.0. Stato: Stabile.** Questo documento specifica la rappresentazione di piano Lite introdotta insieme alla [Specifica DWP](/spec/dwp-specification): un formato di piano per lavoro delimitato di dimensione piccola-media che viene materializzato direttamente, senza una fase di bozza non eseguibile. Le parole chiave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devono essere interpretate come descritto nella RFC 2119.

## Rappresentazione e ciclo di vita

Un piano DEVE essere una di due rappresentazioni, registrata una volta in `manifest.json` come `plan_format`: **Full** memorizza un file per attività sotto `<n>.task_<slug>.md`; **Lite** memorizza record di attività compatti ed eseguibili inline in `README.md`, ciascuno dietro un'ancora stabile `{#task-N}`. Un piano Lite non è un piano Full parziale o informale: ogni record di attività DEVE comunque portare un obiettivo, una Superficie toccata, criteri di accettazione, un validation gate e un Completion & Log, nella stessa forma normativa che l'[Anatomia dell'attività](/spec/dwp-specification#task-anatomy) definisce per Full.

Quattro assi descrivono lo stato di un piano, e DEVONO essere tracciati indipendentemente anziché confusi tra loro:

| Asse | Valori | Significato |
|------|--------|-------------|
| Formato | `lite`, `full` | Dove vivono i record di attività |
| Materializzazione | `materializing`, `ready`, `promoting` | Se la cartella del piano è in corso di scrittura, completa, o in promozione |
| Approvazione | `pending`, `approved`, `pre_approved` | Se un essere umano ha revisionato il piano, o se la modalità trust lo ha pre-approvato |
| Esecuzione | `pending`, `in_progress`, `blocked`, `completed` | Progresso per attività e complessivo |

Il create guidato scrive una **proposta in sospeso revisionabile** — Lite o Full, già il piano reale, mai una bozza usa e getta. Trust materializza un piano **pronto e pre-approvato** e restituisce immediatamente il controllo. `create` e una promozione non eseguono mai lavoro di prodotto; una richiesta esplicita di `execute` o `resume` approva l'ambito attuale pronto del piano e DEVE registrare quell'approvazione prima di iniziare il lavoro; senza quella richiesta, una proposta `pending` non è eseguibile; una promozione non risolta in corso DEVE essere recuperata prima del lavoro di prodotto.

## Creazione e selezione del formato

`/dwp-create` serve l'intento di pianificazione a ogni scala, non solo per lavoro di grandi dimensioni. Il lavoro piccolo e delimitato — un'unica preoccupazione, all'incirca una sessione, senza coordinamento — è l'obiettivo del piano Lite; il lavoro multi-fase con portata reale ricade per default su Full, secondo il [Rigore proporzionale](/spec/dwp-specification#proportional-rigor). Una modifica diretta, una spiegazione, un controllo di stato, una ripresa, o una richiesta esplicita di non creare un piano mantengono il proprio percorso e non diventano mai un piano.

`lite` e `full` sono **preferenze di formato**; `trust` e `auto` sono **opzioni di interazione** separate, ed entrambi i tipi di opzione POSSONO comparire a entrambe le estremità della richiesta, in qualsiasi ordine:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Ripetere la stessa opzione è idempotente; richiedere `lite` e `full` insieme è un errore. `--` termina l'analisi delle opzioni.

Quando non viene fornita alcuna preferenza di formato, `create` ne raccomanda una e spiega perché. Una richiesta esplicita di **Full** prevale sempre. Una richiesta esplicita di **Lite** viene onorata a meno che i requisiti o i validation gate del lavoro non entrino in record compatti inline — in tal caso `create` registra perché Full è richiesto invece. La selezione DEVE registrare l'ambito osservato, le dipendenze, il livello di dettaglio delle istruzioni richiesto e le incognite dietro la scelta — un giudizio verificabile, non una garanzia che valga per ogni modello o agente.

## Promozione e compatibilità

Un piano Lite PUÒ essere **promosso** a Full in qualsiasi momento, tramite `/dwp-refine promote {plan_name}` (vedi [dwp-refine](/kit/dwp-refine)). La promozione è **solo di rappresentazione**: registra l'intento, scrive i file di attività di destinazione, verifica che ogni requisito e gate che il record Lite portava sia ancora coperto, sposta la copia autorevole dai record inline del README ai file di attività, quindi cancella il marcatore in corso. `execute` e `resume` DEVONO rifiutarsi di procedere finché un marcatore di promozione resta impostato. Gli ID delle attività e le evidenze di completamento già registrate NON DEVONO essere riscritte da una promozione; il nuovo ambito scoperto durante la promozione passa invece attraverso `refine` e invalida solo l'evidenza che riguarda.

La promozione non funziona mai automaticamente nel verso opposto: un piano Full non viene silenziosamente ridotto a Lite. Un piano redatto sotto una versione di spec precedente — incluso un piano Full v1 senza alcun campo `plan_format` — mantiene la propria forma registrata e resta conforme; una sessione di `refine` PUÒ migrarlo deliberatamente, ma nulla lo fa implicitamente.

Il `plan_format` di `manifest.json` è immutabile una volta scritto; una promozione modifica il `format` di `state.json` e cancella il suo marcatore `promotion`, e non riscrive mai il manifest. Vedi [Stato del piano](/spec/plan-state) per i campi esatti `plan_format`, `format`, `materialization`, `approval`, `promotion` e `locator`, e le loro URL di schema v2.
