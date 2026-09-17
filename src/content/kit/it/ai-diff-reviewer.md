---
title: AI Diff Reviewer
description: "Revisione locale richiesta in ogni Final Review DWP dallo standard 2.3.0, installata dall'onboarding; il gate CI Flow B e apply-review restano opzionali."
kind: addon
lang: it
order: 5
---

# Addon AI Diff Reviewer

Ogni Deep Work Plan si chiude allo stesso modo: con un **Final Review** obbligatorio che rilegge l'intero insieme di modifiche accumulate dal piano prima che il lavoro possa dirsi concluso. Il suo passaggio di sicurezza è l'ultimo punto in cui qualcosa può ancora essere intercettato. Senza aiuto, l'unico lettore in quel momento è lo stesso agente che ha scritto il codice.

Questo addon mette un secondo lettore davanti a quel diff. Collega l'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — presente nel marketplace come "AI Diff Reviewer", attualmente **v2.3.0** — al passaggio di sicurezza, dove restituisce qualcosa di strutturato anziché prosa: un verdetto, una tabella dei rilievi e una gravità per ciascuno. Un rilievo `critical` blocca la chiusura finché non viene risolto o esplicitamente accettato. La revisione è un cancello, non un commento.

Dallo standard 2.3.0 quella revisione locale **fa parte della baseline, non è un extra**. L'onboarding la installa; ogni Final Review la esegue. A restare opzionale è la superficie CI — il Flow B, dove la stessa revisione presidia le pull request tramite la GitHub Action.

Il confine che rende tutto questo adottabile in sicurezza è volutamente stretto. Il revisore è una skill con licenza MIT e fissata a un tag, eseguita dall'agente di codice che già utilizzi: nessun flusso di Deep Work Plan dipende quindi da un servizio commerciale, da un fornitore CI o da un segreto. Il **Flow A** (solo locale) è ciò che riceve ogni repository onboarded; il **Flow B** viene proposto esplicitamente e mai installato senza richiesta. Chi sviluppa può anche rifiutare del tutto il revisore — quel rifiuto viene registrato come eccezione dichiarata, e `verify` segnala il repository come non conforme su quel punto finché non viene installato.

## Quando usarlo

| Segnale | Azione |
|--------|--------|
| Ogni repository sottoposto a onboarding | **Flow A viene installato** nella Fase 7a dell'onboarding (skill vendorizzata + `.review/extension.md`); un aggiornamento mirato della harness lo aggiunge ai repository sottoposti a onboarding in precedenza |
| Il team vuole un gate di merge CI con rilievi strutturati | **Offrire Flow B** — opt-in esplicito, mai il valore predefinito |
| Repository personale o sperimentale; la revisione locale è sufficiente | **Restare su Flow A** — la baseline è completa |

## Due flussi di adozione

| Flusso | Cosa ottieni |
|------|----------------|
| **A — solo locale (baseline)** | Skill vendorizzata + `.review/extension.md` richiesto (tramite `generate-extension`). Esegue la revisione locale dentro il passaggio di sicurezza di ogni Final Review. Nessun workflow GitHub Actions. |
| **B — doppia superficie** | Flow A più `setup` scrive `.github/workflows/pr-review.yml` (Action `@v2`), stesso file di estensione per locale e CI. Compagno opzionale `apply-review` dopo che CI pubblica i rilievi. |

Il rilevamento per la revisione locale richiede **skill + un file di estensione** in uno di: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` o `.github/ai-pr-reviewer/extension.md`. La skill da sola non è sufficiente.

## Cosa collega questo addon (limitato per design)

L'addon DWP **non** reinventa il reviewer. Delega installazione, metodologia, l'assistente CI, la creazione di estensioni, la bozza delle PR e il walkthrough post-CI alle cinque sub-skill della skill upstream (flusso padre predefinito, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### La revisione locale richiesta

`create` aggiunge il passaggio di revisione locale al passaggio di sicurezza di ogni Final Review e `execute` lo esegue. L'output viene aggiunto sotto `## AI Diff Reviewer local review` nel `analysis_results/SECURITY_REVIEW.md` locale del piano (dentro la cartella propria del piano, mai nella root del repository).

- **Reviewer mancante — registrato, mai saltato in silenzio:** una skill o un'estensione mancante diventa un rilievo `local reviewer not installed`; il Final Review esegue la passata locale quando la skill è presente e altrimenti riporta il rilievo nel report di completamento — l'installazione appartiene al consenso dell'onboarding o a un'invocazione esplicita dell'addon, mai un bootstrap a sorpresa.
- **Soft-fail (solo invocazione):** una revisione che può avviarsi ma va in errore → avvisare una volta, registrare, continuare; non far mai fallire il task per questo.
- **Gate dopo un passaggio completato:** i rilievi `critical` bloccano ancora il completamento del Final Review fino alla correzione o accettazione esplicita. `warning` / `info` sono documentati ma non bloccanti.
- **Flow A non necessita di secret CI.** Un `CURSOR_API_KEY` non impostato non deve sopprimere il passaggio locale.

### Gate CI Flow B (opzionale)

Action `DailybotHQ/ai-diff-reviewer@v2`, tipicamente bloccata da etichetta (`ready`), con un job dal nome stabile **AI review gate** per la protezione dei branch e etichetta di bypass opzionale `skip-review-label: skip-ai-review`. `prompt.md` condiviso + estensione allineano metodologia e gravità; sotto la Revisione consapevole delle iterazioni, i round CI 2+ possono essere più brevi mentre il passaggio locale rimane completo.

### Compagno `apply-review` opzionale

Dopo che CI pubblica una revisione, lo sviluppatore può invocare `apply-review` durante `execute` per esaminare i risultati uno per uno (applicare / rimandare / saltare) con consenso. Solo lettura per impostazione predefinita; mai un file di task del piano (romperebbe l'ordine obbligatorio dei task finali).

## Cosa è cambiato dalla v2.0.1

Tra la v2.0.1 e la v2.3.0 sono usciti tre rilasci upstream. Nessuno di essi cambia il modo in cui questo addon collega il revisore — il Flow A, i tre percorsi di rilevamento e il contratto di blocco restano invariati — ma cambiano ciò che ottiene chi lo adotta.

| Cambiamento | Cosa significa per un repository DWP |
|-------------|---------------------------------------|
| **Runner e backend sono input distinti** (v2.1.0) | `provider` indica il *runner*: chi esegue il ciclo di revisione. Il nuovo `api-base` indica il *backend*: dove risiede il modello. Un `api-base` vuoto è identico byte per byte alla v2.0.x, quindi un'installazione esistente si comporta esattamente come prima. |
| **Due runner in più** (v2.1.0) | `openai` (in-process, senza installazione) e `grok` (CLI) si aggiungono all'insieme esistente. |
| **Il costo è un livello di una parola e i valori predefiniti sono misurati** (v2.1.0, v2.3.0) | Il costo è governato da una parola chiave di livello e da diff ridotti, e viene riportato per ogni revisione. Su xAI, `balanced` ed `economy` si risolvono entrambi in `grok-4.5`, e `deep` in `grok-4.6`. |
| **I giri successivi rivedono il diff realmente nuovo** (v2.1.0, v2.2.0) | I rilievi aperti vengono riportati avanti. `prior-findings-resolution` vale `advisory` per impostazione predefinita: il verdetto «risolto» di un modello viene riportato, ma il rilievo continua a bloccare finché un manutentore non chiude la discussione. |
| **Una revisione incompleta non è mai una revisione verde** (v2.2.0) | Un'esecuzione che termina senza scrivere rilievi viene pubblicata come revisione esplicitamente incompleta. Qualsiasi rigore bloccante la fa fallire, l'etichetta di revisionato non viene apposta e nessun giro vuoto ritira un rilievo aperto. |
| **Installer verificati tramite checksum** (v2.2.0) | `cursor-installer-sha256` e `grok-installer-sha256` rifiutano di eseguire un artefatto del fornitore il cui hash differisca da quello fissato. |

Due di questi contano più degli altri per la metodologia.

**Il gate sulla revisione incompleta chiude un buco reale nel passaggio di sicurezza.** Un Final Review non deve potersi chiudere su una revisione che non è mai avvenuta. Prima della v2.2.0 un runner che terminava senza produrre rilievi era indistinguibile da un passaggio pulito. Ora è uno stato con un nome proprio e non verde, quindi «nessun rilievo» significa che il revisore ha guardato e non ha trovato nulla, non che non ha mai guardato.

**`economy` deliberatamente non è più economico.** Il benchmark upstream del 16/09/2026 ha misurato `grok-4.3` a 0 difetti noti su 5 — approva senza revisionare — mentre `grok-4.5` ha eguagliato `grok-4.6` con 3 su 5 e nessun falso positivo, a parità di costo e con un quarto del tempo. Poiché non esiste un modello xAI più economico che revisioni ancora davvero, `economy` si risolve nello stesso modello di `balanced` anziché essere un livello che non trova nulla. Il percorso xAI passa quindi da circa \$0,07 a circa \$0,40–0,75 per revisione tramite la CLI; `model: grok-4.3` può ancora essere fissato esplicitamente per mantenere il comportamento precedente. Queste cifre sono misurazioni pubblicate dall'upstream, non di Deep Work Plan.

## Comportamento

- **Flow A è la baseline; Flow B è chiesto, mai indovinato.** Installare un workflow non richiesto ha un impatto maggiore rispetto a rimanere su Flow A.
- **Riconciliare, non sovrascrivere.** Skill, estensione o `pr-review.yml` esistenti sono preservati; colmare solo le lacune.
- **Auth differita.** I secret del provider per CI sono configurati dal maintainer; questo addon non archivia mai credenziali.
- **Neutro rispetto al provider.** Nessun servizio commerciale, provider CI o secret è mai richiesto; la superficie CI è l'unico pezzo che tocca un provider.

## Note

Revisione locale richiesta dallo standard 2.3.0; superficie CI opzionale. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Pagina spec: [Add-ons](/spec/addons).
