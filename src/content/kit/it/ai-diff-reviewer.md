---
title: AI Diff Reviewer
description: "Revisione locale a critici verificati in ogni Final Review DWP dallo standard 2.3.0; il gate CI grok e il ciclo address-review restano opzionali."
kind: addon
lang: it
order: 5
---

# Addon AI Diff Reviewer

Ogni Deep Work Plan si chiude allo stesso modo: con un **Final Review** obbligatorio che rilegge l'intero insieme di modifiche accumulate dal piano prima che il lavoro possa dirsi concluso. Il suo passaggio di sicurezza è l'ultimo punto in cui qualcosa può ancora essere intercettato. Senza aiuto, l'unico lettore in quel momento è lo stesso agente che ha scritto il codice.

Questo addon mette un secondo lettore davanti a quel diff. Collega l'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — presente nel marketplace come "AI Diff Reviewer", attualmente **v3.1.1** — al passaggio di sicurezza, dove restituisce qualcosa di strutturato anziché prosa: un verdetto, una tabella delle risultanze e una gravità per ciascuna. Dalla v3, una risultanza `critical` significa che il verificatore dell'addon l'ha confermata con una seconda chiamata di modello ancorata al codice; solo i critici verificati bloccano la chiusura finché non vengono risolti o esplicitamente accettati. La revisione è un cancello, non un commento.

Dallo standard 2.3.0 quella revisione locale **fa parte della baseline, non è un extra**. L'onboarding la installa; ogni Final Review la esegue. A restare opzionale è la superficie CI — il Flow B, dove la stessa revisione presidia le pull request tramite la GitHub Action.

Il confine che rende tutto questo adottabile in sicurezza è volutamente stretto. Il revisore è una skill con licenza MIT e fissata a un tag, eseguita dall'agente di codice che già utilizzi: nessun flusso di Deep Work Plan dipende quindi da un servizio commerciale, da un fornitore CI o da un segreto. Il **Flow A** (solo locale) è ciò che riceve ogni repository onboarded; il **Flow B** viene proposto esplicitamente e mai installato senza richiesta. Chi sviluppa può anche rifiutare del tutto il revisore — quel rifiuto viene registrato come eccezione dichiarata, e `verify` segnala il repository come non conforme su quel punto finché non viene installato.

## Quando usarlo

| Segnale | Azione |
|--------|--------|
| Ogni repository sottoposto a onboarding | **Flow A viene installato** nella Fase 7a dell'onboarding (skill vendorizzata + `.review/extension.md`); un aggiornamento mirato della harness lo aggiunge ai repository sottoposti a onboarding in precedenza |
| Il team vuole un gate di merge CI con risultanze strutturate | **Offrire Flow B** — opt-in esplicito, mai il valore predefinito |
| Repository personale o sperimentale; la revisione locale è sufficiente | **Restare su Flow A** — la baseline è completa |

## Due flussi di adozione

| Flusso | Cosa ottieni |
|------|----------------|
| **A — solo locale (baseline)** | Skill vendorizzata + `.review/extension.md` richiesto (tramite `generate-extension`). Esegue la revisione locale dentro il passaggio di sicurezza di ogni Final Review. Nessun workflow GitHub Actions. |
| **B — doppia superficie** | Flow A più `setup` scrive il workflow di review (Action `@v3`), stesso file di estensione per locale e CI. Compagni opzionali `apply-review` e `address-review` dopo che CI pubblica le risultanze. |

Il rilevamento per la revisione locale richiede **skill + un file di estensione** in uno di: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` o `.github/ai-pr-reviewer/extension.md`. La skill da sola non è sufficiente.

## Cosa collega questo addon (limitato per design)

L'addon DWP **non** reinventa il reviewer. Delega installazione, metodologia, l'assistente CI, la creazione di estensioni, la bozza delle PR e i cicli di revisione post-CI alle sei sub-skill della skill upstream (flusso padre predefinito, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### La revisione locale richiesta

`create` aggiunge il passaggio di revisione locale al passaggio di sicurezza di ogni Final Review e `execute` lo esegue. L'output viene aggiunto sotto `## AI Diff Reviewer local review` nel `analysis_results/SECURITY_REVIEW.md` locale del piano (dentro la cartella propria del piano, mai nella root del repository).

- **Reviewer mancante — registrato, mai saltato in silenzio:** una skill o un'estensione mancante diventa una risultanza `local reviewer not installed`; il Final Review esegue la passata locale quando la skill è presente e altrimenti riporta la risultanza nel report di completamento — l'installazione appartiene al consenso dell'onboarding o a un'invocazione esplicita dell'addon, mai un bootstrap a sorpresa.
- **Soft-fail (solo invocazione):** una revisione che può avviarsi ma va in errore → avvisare una volta, registrare, continuare; non far mai fallire il task per questo.
- **Gate dopo un passaggio completato:** le risultanze `critical` **verificate** bloccano il completamento del Final Review finché non vengono risolte o esplicitamente accettate (BC-07). Le asserzioni critiche non verificate arrivano come avvisi annotati — visibili, non bloccanti, a meno che `strict-unverified-criticals: true` reintroduca il blocco basato sulle asserzioni. Una revisione che ha raggiunto il limite di round (`incomplete`) o il tempo massimo (`timeout`) non è una passata pulita sotto rigidità bloccante (BC-04). `warning` / `info` sono documentati ma non bloccanti.
- **Flow A non necessita di secret CI.** Una chiave del provider non impostata non deve sopprimere la passata locale.

### Gate CI Flow B (opzionale)

Action `DailybotHQ/ai-diff-reviewer@v3`, tipicamente gated da etichetta (`ready`), con un job dal nome stabile **AI review gate** per la protezione dei branch ed etichetta di bypass opzionale `skip-review-label: skip-ai-review`. Dalla v3 il budget di review segue il livello di rischio deterministico della modifica — 8/20/30/40 round da `low` a `critical` sotto `budget-profile: auto` (`fixed` ripristina le costanti pre-v3 durante la transizione) — e un push che non modifica codice esegue un round di sola verifica. `prompt.md` condiviso + estensione allineano metodologia e gravità; locale e CI restano metodologicamente identici, mentre i round CI 2+ possono essere più brevi sotto la Revisione consapevole delle iterazioni e la passata locale rimane completa.

### Compagni di review opzionali

Due sub-skill invocate dallo sviluppatore chiudono il ciclo dopo che CI pubblica una revisione; nessuna delle due è mai un file di task del piano (romperebbe l'ordine obbligatorio dei task finali).

- `apply-review` esamina le risultanze una per una (applicare / rimandare / saltare) con consenso. Solo lettura per impostazione predefinita; non fa mai commit né push.
- `address-review` (nuovo nella v3.1.1) è il ciclo a invocazione singola: trovare le PR aperte del branch, verificare che la revisione sia aggiornata rispetto all'head corrente, presentare le risultanze con un piano applicare/rimandare/saltare, poi — a un unico sì — applicare, fare commit in piccoli batch di Conventional Commits, pushare e riarmare il revisore nel modo in cui il repository lo attiva (per etichetta → attiva e disattiva l'etichetta; attivato da push → conferma la nuova esecuzione). A differenza di `apply-review`, fa commit e push; è questo il punto del ciclo. Sulle revisioni d'insieme aggregate legge il documento aggregato e il marcatore `ai-pr-reviewer-aggregate`.
- Il percorso macchina è l'output strutturato, non il corpo della revisione: il documento `review-output/3.0` (`.aiprr/review-output.json`, individuato attraverso gli output `structured-output-path` e `structured-output-sha256`) porta il record dell'esecuzione, le risultanze con evidenza e verifica, le risultanze confutate e il gate. Un corpo di revisione che dice `Recommendation: approve` non è prova che il controllo sia passato — leggi prima il blocco Highest severity / Strictness gate / Check status del marcatore di tracciamento.

## Cosa è cambiato nella v3

Tre rilasci sono usciti il 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) e la v3.1.1 è seguita con la sub-skill `address-review`. Nessuno di essi cambia il modo in cui questo addon collega il revisore — il Flow A, i tre percorsi di rilevamento e la scala di non-blocco restano invariati — ma cambiano ciò che ottiene chi lo adotta.

| Cambiamento | Cosa significa per un repository DWP |
|-------------|---------------------------------------|
| **Un `critical` viene pubblicato solo se verificato** (v3.0.0) | Ogni critico asserito — più un campione del 30 % degli avvisi — riceve un secondo controllo breve, ancorato al codice, tramite una chiamata di modello separata (≈ 3 k token, 10 s e $0.009 per risultanza verificata). I critici verificati fanno da gate al passaggio di sicurezza; le asserzioni confutate restano visibili come avvisi annotati e sono elencate nell'output strutturato, mai pubblicate inline. |
| **I budget seguono il livello di rischio** (v3.0.0) | 8/20/30/40 round da `low` a `critical`, derivati dall'inventario delle modifiche (`budget-profile: auto`). Un push che non modifica codice esegue un round di sola verifica a −93 % di costo. `budget-profile: fixed` ripristina le costanti di 30 round pre-v3. |
| **Una revisione incompleta è rossa** (v3.0.0) | `incomplete` (limite di round) e `timeout` (tempo massimo) pubblicano risultanze parziali e falliscono sotto ogni rigidità bloccante — «nessuna risultanza» ora significa sempre che il revisore ha guardato e non ha trovato nulla. |
| **L'output strutturato è il percorso macchina** (v3.0.0) | Il documento `review-output/3.0` porta il record dell'esecuzione, l'inventario delle modifiche, le risultanze con evidenza tipizzata e verifica, le risultanze confutate e il gate. Leggere il documento invece di fare scraping dei corpi di revisione. |
| **Sei sub-skill** (v3.1.1) | `address-review` si aggiunge al router: una sola invocazione applica, fa commit, pusha e riarma il revisore. |
| **Ensemble opzionale** (v3.0.0) | Le gambe read-only `mode: emit` più un job `aggregate` verificano una volta le risultanze consolidate e pubblicano una sola revisione. |
| **`@v2` continua a funzionare** | La linea v2 è congelata su `release/v2` con sei mesi di manutenzione di sicurezza e catalogo. v3 è la raccomandazione, mai una migrazione forzata. |

Due di questi contano più degli altri per la metodologia.

**Il gate sui critici verificati irrobustisce il passaggio di sicurezza.** Prima della v3, un modello poteva asserire liberamente un `critical` e il gate seguiva l'asserzione. Ora una risultanza critica in un Final Review significa che una seconda chiamata di modello l'ha confermata sul codice, e la campagna di rilascio ha misurato la differenza: 771 esecuzioni di valutazione a pagamento su dieci campagne per circa $83 totali, con la fascia critica a 63/63 di richiamo con precisione valutata 1.0, e i round incrementali che tagliano i token di input del 62–76 %. Queste cifre sono misurazioni pubblicate dall'upstream, non di Deep Work Plan.

**`economy` deliberatamente non è più economico.** Il benchmark upstream del 2026-09-16 ha misurato `grok-4.3` a 0 difetti noti su 5 — approva senza revisionare — mentre `grok-4.5` ha eguagliato `grok-4.6` con 3 su 5 e nessun falso positivo, a parità di costo e con un quarto del tempo. Poiché non esiste un modello xAI più economico che revisioni ancora davvero, `economy` si risolve nello stesso modello di `balanced` anziché essere un livello che non trova nulla; sul runner grok, è il budget di round del livello di rischio, non la scelta del modello, a far salire il costo. Il percorso xAI passa quindi da circa $0.07 a circa $0.40–0.75 per revisione tramite la CLI; `model: grok-4.3` può ancora essere fissato esplicitamente per mantenere il comportamento precedente. Queste cifre sono misurazioni pubblicate dall'upstream, non di Deep Work Plan.

## Comportamento

- **Flow A è la baseline; Flow B è chiesto, mai indovinato.** Installare un workflow non richiesto ha un impatto maggiore rispetto a rimanere su Flow A.
- **Riconciliare, non sovrascrivere.** Skill, estensione o workflow di review esistenti sono preservati; colmare solo le lacune.
- **Auth differita.** I secret del provider per CI sono configurati dal maintainer; questo addon non archivia mai credenziali.
- **Neutro rispetto al provider.** Nessun servizio commerciale, provider CI o secret è mai richiesto; la superficie CI è l'unico pezzo che tocca un provider.

## Note

Revisione locale richiesta dallo standard 2.3.0; superficie CI opzionale. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Guida alla migrazione upstream: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Pagina spec: [Add-ons](/spec/addons).
