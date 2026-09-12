---
title: AI Diff Reviewer
description: "Revisione locale richiesta in ogni Final Review DWP dallo standard 2.3.0, installata dall'onboarding; il gate CI Flow B (v2), l'estensione condivisa e il compagno apply-review restano opzionali."
kind: addon
lang: it
order: 5
---

# Addon AI Diff Reviewer

Collega l'esecuzione di Deep Work Plan all'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (voce nel marketplace **"AI Diff Reviewer"**, versione corrente **v2.0.1**) in modo che il passaggio di sicurezza del **Final Review** obbligatorio esegua una revisione locale strutturata — verdetto, tabella dei rilievi e gravità — e, scegliendo Flow B, ogni pull request possa essere bloccata dalla stessa revisione in CI. Dallo standard 2.3.0 la **revisione locale fa parte della baseline**: l'onboarding la installa e ogni Final Review la esegue. Solo la superficie CI è opt-in.

Ciò che resta neutrale rispetto ai provider è il confine che conta: il reviewer è una skill MIT fissata a un tag, eseguita dal **proprio** agente di coding — nessun flusso Deep Work Plan richiede un servizio commerciale, un provider CI o un secret. Flow A (solo locale) è la baseline che ogni repository sottoposto a onboarding riceve; Flow B (la CI Action) è offerto esplicitamente e mai installato senza richiesta. Uno sviluppatore può rifiutare il reviewer locale; il rifiuto è registrato come eccezione dichiarata e `verify` riporta il repository come non conforme su quel punto finché non viene installato.

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

## Comportamento

- **Flow A è la baseline; Flow B è chiesto, mai indovinato.** Installare un workflow non richiesto ha un impatto maggiore rispetto a rimanere su Flow A.
- **Riconciliare, non sovrascrivere.** Skill, estensione o `pr-review.yml` esistenti sono preservati; colmare solo le lacune.
- **Auth differita.** I secret del provider per CI sono configurati dal maintainer; questo addon non archivia mai credenziali.
- **Neutro rispetto al provider.** Nessun servizio commerciale, provider CI o secret è mai richiesto; la superficie CI è l'unico pezzo che tocca un provider.

## Note

Revisione locale richiesta dallo standard 2.3.0; superficie CI opzionale. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Pagina spec: [Add-ons](/spec/addons).
