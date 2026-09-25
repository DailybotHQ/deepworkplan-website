---
title: AI Diff Reviewer
description: "Revue locale à critiques vérifiés dans chaque Final Review DWP depuis le standard 2.3.0 ; la porte CI grok et la boucle address-review restent optionnels."
kind: addon
lang: fr
order: 5
---

# Addon AI Diff Reviewer

Chaque Deep Work Plan se referme de la même manière : par un **Final Review** obligatoire qui relit l'ensemble des modifications accumulées par le plan avant que le travail puisse être déclaré terminé. Sa passe de sécurité est le dernier endroit où quelque chose peut encore être repéré. Sans aide, le seul lecteur à ce moment-là est l'agent qui a écrit le code.

Cet addon place un second lecteur devant ce diff. Il branche l'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — référencé sur le marketplace sous le nom "AI Diff Reviewer", actuellement en **v3.1.1** — sur la passe de sécurité, où il renvoie non pas de la prose mais quelque chose de structuré : un verdict, un tableau de constatations et une sévérité pour chacune. Depuis la v3, une constatation `critical` signifie que le vérificateur de l'addon l'a confirmée par un second appel de modèle ancré dans le code ; seuls les critiques vérifiés bloquent la clôture jusqu'à correction ou acceptation explicite. La revue est une barrière, pas un commentaire.

Depuis le standard 2.3.0, cette revue locale **fait partie du socle, ce n'est pas un supplément**. L'intégration l'installe ; chaque Final Review l'exécute. Ce qui demeure optionnel, c'est la surface CI — le Flow B, où la même revue contrôle les pull requests via la GitHub Action.

La frontière qui rend l'adoption sûre est délibérément étroite. Le relecteur est une skill sous licence MIT, épinglée à un tag, exécutée par l'agent de code que vous faites déjà tourner : aucun flux de Deep Work Plan ne dépend donc d'un service commercial, d'un fournisseur de CI ou d'un secret. Le **Flow A** (local uniquement) est ce que reçoit tout dépôt intégré ; le **Flow B** est proposé explicitement et jamais installé sans demande. Un développeur peut aussi refuser le relecteur purement et simplement — ce refus est consigné comme exception déclarée, et `verify` signale le dépôt comme non conforme sur ce point tant qu'il n'est pas installé.

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
| **B — double surface** | Flow A plus `setup` écrit le workflow de revue (Action `@v3`), même fichier d'extension pour local et CI. Compagnons optionnels `apply-review` et `address-review` après que CI publie des constatations. |

La détection de la revue locale requiert **skill + un fichier d'extension** dans l'un de : `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` ou `.github/ai-pr-reviewer/extension.md`. La skill seule ne suffit pas.

## Ce que cet addon connecte (limité par conception)

L'addon DWP ne **réinvente pas** le reviewer. Il délègue l'installation, la méthodologie, l'assistant CI, la création d'extensions, la rédaction des PR et les boucles de revue post-CI aux six sous-skills de la skill upstream (flux parent par défaut, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### La revue locale requise

`create` ajoute l'étape de revue locale à la passe de sécurité de chaque Final Review et `execute` l'exécute. La sortie s'ajoute sous `## AI Diff Reviewer local review` dans le `analysis_results/SECURITY_REVIEW.md` local au plan (dans le dossier propre du plan, jamais à la racine du dépôt).

- **Reviewer manquant — enregistré, jamais ignoré en silence :** une skill ou une extension manquante devient une constatation `local reviewer not installed` ; le Final Review exécute la passe locale lorsque la skill est présente et reporte sinon la constatation dans le rapport de finalisation — l'installation appartient au consentement de l'onboarding ou à une invocation explicite de l'addon, jamais un amorçage surprise.
- **Échec doux (invocation uniquement) :** une revue qui a pu démarrer mais se termine en erreur → avertir une fois, enregistrer, continuer ; ne jamais échouer la tâche pour cela.
- **Porte après un passage complet :** les constatations `critical` **vérifiées** bloquent la finalisation du Final Review jusqu'à correction ou acceptation explicite (BC-07). Les affirmations critiques non vérifiées arrivent comme avertissements annotés — visibles, non bloquants, sauf si `strict-unverified-criticals: true` rétablit le blocage sur affirmation. Une revue qui a atteint son plafond de tours (`incomplete`) ou sa limite de temps (`timeout`) n'est pas un passage propre sous une rigueur bloquante (BC-04). `warning` / `info` sont documentés mais non bloquants.
- **Flow A ne nécessite pas de secret CI.** Une clé de fournisseur non définie ne doit pas supprimer le passage local.

### Porte CI Flow B (optionnelle)

Action `DailybotHQ/ai-diff-reviewer@v3`, typiquement bloquée par étiquette (`ready`), avec un job nommé stablement **AI review gate** pour la protection des branches et étiquette de contournement optionnelle `skip-review-label: skip-ai-review`. Depuis la v3, le budget de revue suit le niveau de risque déterministe du changement — 8/20/30/40 tours de `low` à `critical` sous `budget-profile: auto` (`fixed` rétablit les constantes d'avant v3 pendant la transition) — et un push qui ne modifie aucun code exécute une ronde vérificateur seul. `prompt.md` partagé + extension alignent méthodologie et sévérité ; local et CI restent identiques en méthodologie, tandis que les rondes CI 2+ peuvent être plus courtes sous la Revue consciente des itérations et que le passage local reste complet.

### Compagnons de revue optionnels

Deux sous-skills invoquées par le développeur bouclent la boucle après que CI publie une revue ; aucune des deux n'est jamais un fichier de tâche du plan (cela briserait l'ordre des tâches finales obligatoires).

- `apply-review` parcourt les constatations une par une (appliquer / différer / ignorer) avec consentement. Lecture seule par défaut ; ne fait jamais de commit ni de push.
- `address-review` (nouveau en v3.1.1) est la boucle en une seule invocation : trouver les PR ouvertes de la branche, vérifier que la revue est à jour pour le head courant, présenter les constatations avec un plan appliquer/différer/ignorer, puis — sur un seul oui — appliquer, committer par petits lots de Conventional Commits, pousser, et réarmer le relecteur à la façon dont le dépôt le déclenche (par étiquette → basculer l'étiquette ; déclenché par push → confirmer la nouvelle exécution). Contrairement à `apply-review`, il fait des commits et pousse ; c'est tout l'intérêt de la boucle. Sur les revues d'ensemble agrégées, il lit le document agrégé et le marqueur `ai-pr-reviewer-aggregate`.
- Le chemin machine est la sortie structurée, pas le corps de la revue : le document `review-output/3.0` (`.aiprr/review-output.json`, localisé via les sorties `structured-output-path` et `structured-output-sha256`) porte le relevé d'exécution, les constatations avec preuves et vérification, les constatations réfutées et la barrière. Un corps de revue qui dit `Recommendation: approve` n'est pas une preuve que le contrôle a réussi — lisez d'abord le bloc Highest severity / Strictness gate / Check status du marqueur de suivi.

## Ce qui a changé en v3

Trois versions sont parues le 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) et la v3.1.1 a suivi avec la sous-skill `address-review`. Aucune ne modifie la façon dont cet addon branche le relecteur — le Flow A, les trois chemins de détection et l'échelle de non-blocage restent inchangés —, mais elles changent ce que reçoit celui qui l'adopte.

| Changement | Ce que cela signifie pour un dépôt DWP |
|------------|-----------------------------------------|
| **Un `critical` n'est publié que vérifié** (v3.0.0) | Chaque critique affirmé — plus un échantillon de 30 % des avertissements — reçoit une seconde vérification courte, ancrée dans le code, par un appel de modèle distinct (≈ 3 k tokens, 10 s et $0.009 par constatation vérifiée). Les critiques vérifiés barrent la passe de sécurité ; les affirmations réfutées restent visibles comme avertissements annotés et sont listées dans la sortie structurée, jamais publiées en inline. |
| **Les budgets suivent le niveau de risque** (v3.0.0) | 8/20/30/40 tours de `low` à `critical`, dérivés de l'inventaire des changements (`budget-profile: auto`). Un push qui ne modifie aucun code exécute une ronde vérificateur seul à −93 % de coût. `budget-profile: fixed` rétablit les constantes de 30 tours d'avant v3. |
| **Une revue inachevée est rouge** (v3.0.0) | `incomplete` (plafond de tours) et `timeout` (limite de temps) publient des constatations partielles et échouent toute rigueur bloquante — « aucune constatation » signifie désormais toujours que le relecteur a regardé et n'a rien trouvé. |
| **La sortie structurée est le chemin machine** (v3.0.0) | Le document `review-output/3.0` porte le relevé d'exécution, l'inventaire des changements, les constatations avec preuves typées et vérification, les constatations réfutées et la barrière. Lire le document au lieu de scraper les corps de revue. |
| **Six sous-skills** (v3.1.1) | `address-review` rejoint le routeur : une seule invocation applique, fait le commit, pousse et réarme le relecteur. |
| **Ensemble optionnel** (v3.0.0) | Des jambes en lecture seule `mode: emit` plus un job `aggregate` vérifient une fois les constatations consolidées et publient une seule revue. |
| **`@v2` continue de fonctionner** | La ligne v2 est gelée sur `release/v2` avec six mois de maintenance de sécurité et de catalogue. v3 est la recommandation, jamais une migration forcée. |

Deux de ces points pèsent plus que les autres pour la méthodologie.

**La barrière des critiques vérifiés durcit la passe de sécurité.** Avant la v3, un modèle pouvait affirmer un `critical` librement et la barrière suivait l'affirmation. Désormais, une constatation critique dans un Final Review signifie qu'un second appel de modèle l'a confirmée face au code, et la campagne de publication a mesuré la différence : 771 exécutions d'évaluation payées sur dix campagnes pour environ $83 au total, la strate critique atteignant un rappel de 63/63 à une précision adjugée de 1.0, et les rondes incrémentales réduisant les tokens d'entrée de 62–76 %. Ces chiffres sont des mesures publiées par l'upstream, et non celles de Deep Work Plan.

**`economy` n'est délibérément pas moins cher.** Le benchmark upstream du 2026-09-16 a mesuré `grok-4.3` à 0 défaut connu sur 5 — il approuve sans relire — tandis que `grok-4.5` égalait `grok-4.6` à 3 sur 5 sans faux positifs, à coût identique et pour un quart du temps. Comme il n'existe pas de modèle xAI moins cher qui relise encore réellement, `economy` se résout au même modèle que `balanced` plutôt que d'être un palier qui ne trouve rien ; sur le runner grok, c'est le budget de tours du niveau de risque, et non le choix du modèle, qui fait grimper le coût. Le chemin xAI passe donc d'environ $0.07 à environ $0.40–0.75 par revue via la CLI ; Depuis le prompt v3.0, une re-mesure sur 63 exécutions a fait passer `grok-4.3` de 0 sur 5 à 83 % de rappel sans faux positifs et avec ~31 % de coût en moins — mais il échoue encore à écrire son fichier de constats environ trois fois plus souvent que `grok-4.5` ; `grok-4.5` reste donc le défaut et `model: grok-4.3` demeure un choix explicite au compromis accepté. Ces chiffres sont des mesures publiées par l'upstream, et non celles de Deep Work Plan.

## Comportement

- **Flow A est la ligne de base ; Flow B se demande, jamais ne se suppose.** Installer un workflow sans demande a une empreinte plus grande que rester sur Flow A.
- **Réconcilier, ne pas écraser.** Skill, extension ou workflow de revue existants sont préservés ; combler uniquement les lacunes.
- **Auth différée.** Les secrets du fournisseur pour CI sont configurés par le mainteneur ; cet addon ne stocke jamais de credentials.
- **Neutre vis-à-vis du fournisseur.** Aucun service commercial, fournisseur de CI ni secret n'est jamais requis ; la surface CI est la seule pièce qui touche un fournisseur.

## Notes

Revue locale requise depuis le standard 2.3.0 ; surface CI optionnelle. Skill upstream : [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Guide de migration upstream : [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Page spec : [Add-ons](/spec/addons).
