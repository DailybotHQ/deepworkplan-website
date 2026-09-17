---
title: AI Diff Reviewer
description: "Revue locale requise dans chaque Final Review du DWP depuis le standard 2.3.0, installée par l'intégration ; la porte CI Flow B et apply-review sont optionnels."
kind: addon
lang: fr
order: 5
---

# Addon AI Diff Reviewer

Connecte l'exécution de Deep Work Plan à l'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (référencé sur le marketplace sous **"AI Diff Reviewer"**, version actuelle **v2.3.0**) afin que la passe de sécurité du **Final Review** obligatoire exécute une revue locale structurée — verdict, tableau de résultats et sévérité — et, en choisissant Flow B, chaque pull request puisse être bloquée par la même revue en CI. Depuis le standard 2.3.0, la **revue locale fait partie de la ligne de base** : l'intégration l'installe et chaque Final Review l'exécute. Seule la surface CI est optionnelle.

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

## Ce qui a changé depuis la v2.0.1

Trois versions upstream sont parues entre la v2.0.1 et la v2.3.0. Aucune ne modifie la façon dont cet addon branche le relecteur — le Flow A, les trois chemins de détection et le contrat de blocage restent inchangés —, mais elles changent ce que reçoit celui qui l'adopte.

| Changement | Ce que cela signifie pour un dépôt DWP |
|------------|-----------------------------------------|
| **Le runner et le backend sont des entrées distinctes** (v2.1.0) | `provider` nomme le *runner* : qui exécute la boucle de revue. Le nouveau `api-base` nomme le *backend* : où se trouve le modèle. Un `api-base` vide est identique octet pour octet à la v2.0.x, donc une installation existante se comporte exactement comme avant. |
| **Deux runners de plus** (v2.1.0) | `openai` (en processus, sans installation) et `grok` (CLI) rejoignent l'ensemble existant. |
| **Le coût est un palier d'un seul mot, et les valeurs par défaut sont mesurées** (v2.1.0, v2.3.0) | Le coût est piloté par un mot-clé de palier et des diffs calibrés, et il est rapporté à chaque revue. Sur xAI, `balanced` et `economy` se résolvent tous deux en `grok-4.5`, et `deep` en `grok-4.6`. |
| **Les tours suivants relisent le vrai diff nouveau** (v2.1.0, v2.2.0) | Les constats en suspens sont reportés. `prior-findings-resolution` vaut `advisory` par défaut : le verdict « résolu » d'un modèle est rapporté, mais le constat continue de bloquer jusqu'à ce qu'un mainteneur clôture le fil. |
| **Une revue incomplète n'est jamais une revue au vert** (v2.2.0) | Une exécution qui se termine sans écrire de constats est publiée comme revue explicitement incomplète. Toute rigueur bloquante la fait échouer, le label « relu » n'est pas apposé, et aucun tour vide ne retire un constat ouvert. |
| **Installateurs vérifiés par somme de contrôle** (v2.2.0) | `cursor-installer-sha256` et `grok-installer-sha256` refusent d'exécuter un artefact fournisseur dont l'empreinte diffère de celle qui est épinglée. |

Deux de ces points pèsent plus que les autres pour la méthodologie.

**La barrière de revue incomplète comble un vrai trou dans la passe de sécurité.** Un Final Review ne doit pas pouvoir se clore sur une revue qui n'a jamais eu lieu. Avant la v2.2.0, un runner qui se terminait sans produire de constats était indiscernable d'une passe propre. C'est désormais un état nommé et non vert : « aucun constat » signifie que le relecteur a regardé et n'a rien trouvé, et non qu'il n'a jamais regardé.

**`economy` n'est délibérément pas moins cher.** Le benchmark upstream du 16/09/2026 a mesuré `grok-4.3` à 0 défaut connu sur 5 — il approuve sans relire — tandis que `grok-4.5` égalait `grok-4.6` à 3 sur 5 sans faux positifs, à coût identique et pour un quart du temps. Comme il n'existe pas de modèle xAI moins cher qui relise encore réellement, `economy` se résout au même modèle que `balanced` plutôt que d'être un palier qui ne trouve rien. Le chemin xAI passe donc d'environ \$0,07 à environ \$0,40–0,75 par revue via la CLI ; `model: grok-4.3` peut toujours être épinglé explicitement pour conserver le comportement antérieur. Ces chiffres sont des mesures publiées par l'upstream, et non celles de Deep Work Plan.

## Comportement

- **Flow A est la ligne de base ; Flow B se demande, jamais ne se suppose.** Installer un workflow sans demande a une empreinte plus grande que rester sur Flow A.
- **Réconcilier, ne pas écraser.** Skill, extension ou `pr-review.yml` existants sont préservés ; combler uniquement les lacunes.
- **Auth différée.** Les secrets du fournisseur pour CI sont configurés par le mainteneur ; cet addon ne stocke jamais de credentials.
- **Neutre vis-à-vis du fournisseur.** Aucun service commercial, fournisseur de CI ni secret n'est jamais requis ; la surface CI est la seule pièce qui touche un fournisseur.

## Notes

Revue locale requise depuis le standard 2.3.0 ; surface CI optionnelle. Skill upstream : [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Page spec : [Add-ons](/spec/addons).
