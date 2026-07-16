---
title: AI Diff Reviewer
description: "Addon DWP opzionale: potenzia la Revisione di Sicurezza con un passaggio locale di AI Diff Reviewer, gate CI opzionale Flow B (v2), file di estensione condiviso e compagno apply-review."
kind: addon
lang: it
order: 5
---

# Addon AI Diff Reviewer

Collega l'esecuzione di Deep Work Plan all'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (voce nel marketplace **"AI Diff Reviewer"**, versione corrente **v2.0.0**) in modo che il task finale obbligatorio di **Revisione di Sicurezza** acquisisca una revisione locale strutturata — verdetto, tabella dei risultati e gravità — e, scegliendo Flow B, ogni pull request può essere bloccata dalla stessa revisione in CI. Un addon **opzionale**; mai richiesto per la conformità AI-first.

La metodologia centrale di Deep Work Plan ha **zero** dipendenza da AI Diff Reviewer. Un repository senza addon è pienamente conforme. Offri questo addon solo quando lo sviluppatore o il team desidera qualità di revisione strutturata; non installare mai automaticamente per tutti. Chiedi sempre Flow A vs Flow B — non assumere mai un valore predefinito.

## Quando usarlo

| Segnale | Azione |
|--------|--------|
| Il team vuole un gate di merge CI con risultati strutturati | **Raccomandare Flow B** durante l'onboarding |
| Repository personale o sperimentale; la revisione locale pre-push è sufficiente | **Offrire Flow A** |
| Nessun interesse per una superficie di revisione aggiuntiva | **Saltare** — la Revisione di Sicurezza di base si applica comunque |

## Due flussi di adozione

| Flusso | Cosa ottieni |
|------|----------------|
| **A — solo locale** | Skill vendorizzata + `.review/extension.md` richiesto (tramite `generate-extension`). Potenzia la Revisione di Sicurezza con un passaggio locale. Nessun workflow GitHub Actions. |
| **B — doppia superficie** | Flow A più `setup` scrive `.github/workflows/pr-review.yml` (Action `@v2`), stesso file di estensione per locale e CI. Compagno opzionale `apply-review` dopo che CI pubblica i risultati. |

Il rilevamento per il potenziamento della Revisione di Sicurezza richiede **skill + un file di estensione** in uno di: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` o `.github/ai-pr-reviewer/extension.md`. La skill da sola non è sufficiente.

## Cosa collega questo addon (limitato per design)

L'addon DWP **non** reinventa il reviewer. Delega installazione, metodologia, l'assistente CI, la creazione di estensioni, la bozza delle PR e il walkthrough post-CI alle cinque sub-skill della skill upstream (flusso padre predefinito, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Potenziamento della Revisione di Sicurezza

Quando rilevato, `create` / `execute` aggiungono un passaggio di revisione locale al task obbligatorio di Revisione di Sicurezza. L'output viene aggiunto sotto `## AI Diff Reviewer local review` in `analysis_results/SECURITY_REVIEW.md`.

- **Soft-fail (solo invocazione):** skill mancante, estensione mancante o errore di invocazione → avvisare una volta e continuare; non far mai fallire il task per questo.
- **Gate dopo un passaggio completato:** i risultati `critical` bloccano ancora il completamento della Revisione di Sicurezza fino alla correzione o accettazione esplicita (contratto SR esistente). `warning` / `info` sono documentati ma non bloccanti.
- **Flow A non necessita di secret CI.** Un `CURSOR_API_KEY` non impostato non deve sopprimere il passaggio locale.

### Gate CI Flow B (opzionale)

Action fissata `DailybotHQ/ai-diff-reviewer@v2`, tipicamente bloccata da etichetta (`ready`), con un job dal nome stabile **AI review gate** per la protezione dei branch e etichetta di bypass opzionale `skip-review-label: skip-ai-review`. `prompt.md` condiviso + estensione allineano metodologia e gravità; sotto la Revisione consapevole delle iterazioni, i round CI 2+ possono essere più brevi mentre il passaggio locale rimane completo.

### Compagno `apply-review` opzionale

Dopo che CI pubblica una revisione, lo sviluppatore può invocare `apply-review` durante `execute` per esaminare i risultati uno per uno (applicare / rimandare / saltare) con consenso. Solo lettura per impostazione predefinita; mai un file di task del piano (romperebbe l'ordine obbligatorio dei task finali).

## Comportamento

- **Chiedere il flusso; non indovinare mai.** Installare un workflow non richiesto ha un impatto maggiore rispetto a rimanere su Flow A.
- **Riconciliare, non sovrascrivere.** Skill, estensione o `pr-review.yml` esistenti sono preservati; colmare solo le lacune.
- **Auth differita.** I secret del provider per CI sono configurati dal maintainer; questo addon non archivia mai credenziali.
- **Neutro rispetto al provider.** Rifiutare lascia un repository completamente AI-first.

## Note

Opzionale e mai richiesto. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Pagina spec: [Add-ons](/spec/addons).
