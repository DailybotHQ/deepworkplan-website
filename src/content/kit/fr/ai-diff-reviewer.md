---
title: AI Diff Reviewer
description: "Revue locale requise dans chaque Final Review du DWP depuis le standard 2.3.0, installée par l'intégration ; la porte CI du Flow B (v2), l'extension partagée et apply-review restent optionnels."
kind: addon
lang: fr
order: 5
---

# Addon AI Diff Reviewer

Connecte l'exécution de Deep Work Plan à l'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (référencé sur le marketplace sous **"AI Diff Reviewer"**, version actuelle **v2.0.1**) afin que la passe de sécurité du **Final Review** obligatoire exécute une revue locale structurée — verdict, tableau de résultats et sévérité — et, en choisissant Flow B, chaque pull request puisse être bloquée par la même revue en CI. Depuis le standard 2.3.0, la **revue locale fait partie de la ligne de base** : l'intégration l'installe et chaque Final Review l'exécute. Seule la surface CI est optionnelle.

Ce qui reste neutre vis-à-vis du fournisseur, c'est la frontière qui compte : le reviewer est une skill MIT épinglée par tag exécutée par votre **propre** agent de codage — aucun flux de Deep Work Plan n'exige de service commercial, de fournisseur de CI ni de secret. Flow A (local uniquement) est la ligne de base que reçoit tout dépôt intégré ; Flow B (l'Action CI) est proposé explicitement et jamais installé sans demande. Un développeur peut refuser le reviewer local ; le refus est enregistré comme exception déclarée et `verify` signale le dépôt comme non conforme sur ce point jusqu'à son installation.

## Quand l'utiliser

| Signal | Action |
|--------|--------|
| Tout dépôt intégré | **Flow A est installé** en Phase 7a de l'intégration (skill vendorisée + `.review/extension.md`) ; une mise à niveau ciblée du harness l'ajoute aux dépôts intégrés auparavant |
| L'équipe souhaite une porte de fusion CI avec des résultats structurés | **Proposer Flow B** — adhésion explicite, jamais la valeur par défaut |
| Dépôt personnel ou expérimental ; la revue locale est suffisante | **Rester sur Flow A** — la ligne de base est complète |

## Deux flux d'adoption

| Flux | Ce que vous obtenez |
|------|----------------|
| **A — local uniquement (ligne de base)** | Skill vendorisée + `.review/extension.md` requis (via `generate-extension`). Exécute la revue locale dans la passe de sécurité de chaque Final Review. Sans workflow GitHub Actions. |
| **B — double surface** | Flow A plus `setup` écrit `.github/workflows/pr-review.yml` (Action `@v2`), même fichier d'extension pour local et CI. Compagnon optionnel `apply-review` après que CI publie les résultats. |

La détection de la revue locale requiert **skill + un fichier d'extension** dans l'un de : `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` ou `.github/ai-pr-reviewer/extension.md`. La skill seule ne suffit pas.

## Ce que cet addon connecte (limité par conception)

L'addon DWP ne **réinvente pas** le reviewer. Il délègue l'installation, la méthodologie, l'assistant CI, la création d'extensions, la rédaction des PR et le parcours post-CI aux cinq sous-skills de la skill upstream (flux parent par défaut, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### La revue locale requise

`create` ajoute l'étape de revue locale à la passe de sécurité de chaque Final Review et `execute` l'exécute. La sortie s'ajoute sous `## AI Diff Reviewer local review` dans le `analysis_results/SECURITY_REVIEW.md` local au plan (dans le dossier propre du plan, jamais à la racine du dépôt).

- **Reviewer manquant — enregistré, jamais ignoré en silence :** une skill ou une extension manquante devient un résultat `local reviewer not installed` ; le Final Review exécute la passe locale lorsque la skill est présente et reporte sinon le résultat dans le rapport de finalisation — l'installation appartient au consentement de l'onboarding ou à une invocation explicite de l'addon, jamais un amorçage surprise.
- **Échec doux (invocation uniquement) :** une revue qui a pu démarrer mais se termine en erreur → avertir une fois, enregistrer, continuer ; ne jamais échouer la tâche pour cela.
- **Porte après un passage complet :** les résultats `critical` bloquent toujours la finalisation du Final Review jusqu'à correction ou acceptation explicite. `warning` / `info` sont documentés mais non bloquants.
- **Flow A ne nécessite pas de secret CI.** Un `CURSOR_API_KEY` non défini ne doit pas supprimer le passage local.

### Porte CI Flow B (optionnelle)

Action `DailybotHQ/ai-diff-reviewer@v2`, typiquement bloquée par étiquette (`ready`), avec un job nommé stablement **AI review gate** pour la protection des branches et étiquette de contournement optionnelle `skip-review-label: skip-ai-review`. `prompt.md` partagé + extension alignent méthodologie et sévérité ; sous la Revue consciente des itérations, les rondes CI 2+ peuvent être plus courtes tandis que le passage local reste complet.

### Compagnon `apply-review` optionnel

Après que CI publie une revue, le développeur peut invoquer `apply-review` pendant `execute` pour parcourir les résultats un par un (appliquer / différer / ignorer) avec consentement. Lecture seule par défaut ; jamais un fichier de tâche du plan (briserait l'ordre des tâches finales obligatoires).

## Comportement

- **Flow A est la ligne de base ; Flow B se demande, jamais ne se suppose.** Installer un workflow sans demande a une empreinte plus grande que rester sur Flow A.
- **Réconcilier, ne pas écraser.** Skill, extension ou `pr-review.yml` existants sont préservés ; combler uniquement les lacunes.
- **Auth différée.** Les secrets du fournisseur pour CI sont configurés par le mainteneur ; cet addon ne stocke jamais de credentials.
- **Neutre vis-à-vis du fournisseur.** Aucun service commercial, fournisseur de CI ni secret n'est jamais requis ; la surface CI est la seule pièce qui touche un fournisseur.

## Notes

Revue locale requise depuis le standard 2.3.0 ; surface CI optionnelle. Skill upstream : [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Page spec : [Add-ons](/spec/addons).
