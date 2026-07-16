---
title: AI Diff Reviewer
description: "Addon DWP optionnel : passage local AI Diff Reviewer pour la Revue de sécurité, porte CI Flow B optionnelle (v2), extension partagée et apply-review."
kind: addon
lang: fr
order: 5
---

# Addon AI Diff Reviewer

Connecte l'exécution de Deep Work Plan à l'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (référencé sur le marketplace sous **"AI Diff Reviewer"**, version actuelle **v2.0.0**) afin que la tâche finale obligatoire de **Revue de sécurité** bénéficie d'une revue locale structurée — verdict, tableau de résultats et sévérité — et, en choisissant Flow B, chaque pull request peut être bloquée par la même revue en CI. Un addon **optionnel** ; jamais requis pour la conformité AI-first.

La méthodologie centrale de Deep Work Plan a **zéro** dépendance envers AI Diff Reviewer. Un dépôt sans addons est entièrement conforme. Proposez cet addon uniquement lorsque le développeur ou l'équipe souhaite une qualité de revue structurée ; ne jamais l'installer automatiquement pour tous. Demandez toujours Flow A ou Flow B — ne jamais supposer.

## Quand l'utiliser

| Signal | Action |
|--------|--------|
| L'équipe souhaite une porte de fusion CI avec des résultats structurés | **Recommander Flow B** lors de l'intégration |
| Dépôt personnel ou expérimental ; la revue locale avant push est suffisante | **Proposer Flow A** |
| Pas d'appétit pour une surface de revue supplémentaire | **Ignorer** — la Revue de sécurité de base s'applique toujours |

## Deux flux d'adoption

| Flux | Ce que vous obtenez |
|------|----------------|
| **A — local uniquement** | Skill vendorisée + `.review/extension.md` requis (via `generate-extension`). Renforce la Revue de sécurité avec un passage local. Sans workflow GitHub Actions. |
| **B — double surface** | Flow A plus `setup` écrit `.github/workflows/pr-review.yml` (Action `@v2`), même fichier d'extension pour local et CI. Compagnon optionnel `apply-review` après que CI publie les résultats. |

La détection pour le renforcement de la Revue de sécurité requiert **skill + un fichier d'extension** dans l'un de : `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` ou `.github/ai-pr-reviewer/extension.md`. La skill seule ne suffit pas.

## Ce que cet addon connecte (limité par conception)

L'addon DWP ne **réinvente pas** le reviewer. Il délègue l'installation, la méthodologie, l'assistant CI, la création d'extensions, la rédaction des PR et le parcours post-CI aux cinq sous-skills de la skill upstream (flux parent par défaut, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Renforcement de la Revue de sécurité

Lorsque détecté, `create` / `execute` ajoutent une étape de revue locale à la tâche obligatoire de Revue de sécurité. La sortie s'ajoute sous `## AI Diff Reviewer local review` dans `analysis_results/SECURITY_REVIEW.md`.

- **Échec doux (invocation uniquement) :** skill manquante, extension manquante ou erreur d'invocation → avertir une fois et continuer ; ne jamais échouer la tâche pour cela.
- **Porte après un passage complet :** les résultats `critical` bloquent toujours la finalisation de la Revue de sécurité jusqu'à correction ou acceptation explicite (contrat SR existant). `warning` / `info` sont documentés mais non bloquants.
- **Flow A ne nécessite pas de secret CI.** Un `CURSOR_API_KEY` non défini ne doit pas supprimer le passage local.

### Porte CI Flow B (optionnelle)

Action épinglée `DailybotHQ/ai-diff-reviewer@v2`, typiquement bloquée par étiquette (`ready`), avec un job nommé stablement **AI review gate** pour la protection des branches et étiquette de contournement optionnelle `skip-review-label: skip-ai-review`. `prompt.md` partagé + extension alignent méthodologie et sévérité ; sous la Revue consciente des itérations, les rondes CI 2+ peuvent être plus courtes tandis que le passage local reste complet.

### Compagnon `apply-review` optionnel

Après que CI publie une revue, le développeur peut invoquer `apply-review` pendant `execute` pour parcourir les résultats un par un (appliquer / différer / ignorer) avec consentement. Lecture seule par défaut ; jamais un fichier de tâche du plan (briserait l'ordre des tâches finales obligatoires).

## Comportement

- **Demander le flux ; ne jamais supposer.** Installer un workflow sans demande a une empreinte plus grande que rester sur Flow A.
- **Réconcilier, ne pas écraser.** Skill, extension ou `pr-review.yml` existants sont préservés ; combler uniquement les lacunes.
- **Auth différée.** Les secrets du fournisseur pour CI sont configurés par le mainteneur ; cet addon ne stocke jamais de credentials.
- **Neutre vis-à-vis du fournisseur.** Refuser laisse un dépôt entièrement AI-first.

## Notes

Optionnel et jamais requis. Skill upstream : [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Page spec : [Add-ons](/spec/addons).
