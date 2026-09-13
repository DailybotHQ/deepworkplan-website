---
title: État du plan
description: "La couche d'état lisible par machine : manifest.json et state.json, enregistrements de portes, enregistrements de résultats comme mémoire épisodique, réconciliation, et quand elle est requise."
order: 8
lang: fr
section: State
---

# État du plan

**Version 5.0.0. Statut : stable.** Ce document spécifie la couche d'état lisible par machine de la méthodologie Deep Work Plan, désormais alignée sur le numéro de version propre du standard DWP — aucune exigence existante n'est affaiblie par cette renumérotation. Cette révision documente également le metteur à jour d'état sous garde, la publication vérifiée de plan, et les règles de vérité de preuve qu'un plan achevé doit satisfaire (voir ci-dessous). Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

Deux artefacts JSON — `manifest.json` (l'identité statique du plan) et `state.json` (l'état d'exécution en direct, par tâche, incluant les résultats des portes de validation) — qu'un plan MAY porter aux côtés de ses fichiers markdown, et que l'exécution sans surveillance (voir [Protocole de l'agent](/spec/agent-protocol#execution-profiles)) et les espaces de travail sans git (voir [Archétypes](/spec/archetypes) §3) MUST porter.

Le plan markdown reste la **source de vérité lisible par un humain**. La couche JSON est une **projection dérivée** : elle est régénérée par l'agent aux points de protocole définis, ne doit jamais être éditée à la main, et ne doit jamais être autorisée à contredire silencieusement le markdown. Son but est l'interopérabilité — lint, vérification de conformité, diff, tableaux de bord, découverte dans un registre et synchronisation avec une infrastructure de session externe — aucune de ces fonctions ne pouvant être construite de manière fiable sur de la prose.

## Pourquoi cette couche existe

Jusqu'à la v1.1, les plans étaient uniquement en Markdown prose. Cela les gardait auditables et indépendants de l'agent, mais ne laissait rien qu'un outil pût valider, différencier ou consommer : aucune porte de conformité, aucune détection de désynchronisation entre `README.md` et `PROGRESS.md`, aucun moyen pour un daemon ou une session cloud de connaître l'état d'un plan sans analyser de la prose. La v1.2 ajoute la projection JSON sans déclasser le markdown — la projection est dérivée du markdown, de la même façon qu'un lockfile est dérivé d'un manifeste.

## Emplacement

Un plan utilisant la couche d'état a cette organisation :

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← source de vérité humaine (inchangé)
├── PROGRESS.md          ← journal narratif (inchangé)
├── PROMPTS.md           ← inchangé
├── manifest.json        ← identité statique (écrit à la matérialisation)
├── state.json           ← état en direct (réécrit aux points de protocole)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` MUST être écrit exactement une fois, lorsque le flux `create` matérialise le plan, et MUST NOT changer par la suite, sauf pour une migration de version de spec consignée dans `PROGRESS.md`.

`state.json` MUST être réécrit par l'agent à chacun de ces points de protocole : matérialisation du plan (toutes les tâches `pending`), démarrage d'une tâche (`in_progress`), chaque exécution d'une porte de validation (enregistrement de porte ajouté ou mis à jour), et achèvement d'une tâche (`completed`, dans le cadre du protocole d'achèvement de tâche de la [Spécification DWP](/spec/dwp-specification#task-completion-protocol)), un point de contrôle avant toute interruption planifiée, et un arrêt `blocked`.

Les deux fichiers MUST être écrits de façon atomique : écrire dans un fichier temporaire dans le même répertoire, puis le renommer par-dessus la cible. Un write interrompu MUST NOT laisser un fichier JSON tronqué en place.

## Quand la couche est requise

- Pour l'exécution **interactive** dans un dépôt git, la couche d'état est RECOMMENDED pour les nouveaux plans et OPTIONAL pour les plans antérieurs à la v1.2. Un plan sans elle reste conforme.
- Pour l'exécution **sans surveillance**, la couche d'état est REQUIRED.
- Dans un **espace de travail d'agent** sans git, la couche d'état est REQUIRED : `state.json` porte les informations de récupération que le journal git porte dans un dépôt.

## `manifest.json` — identité du plan

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` et `plan_format` sont REQUIRED.

`archetype` MUST être l'une des valeurs suivantes : `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` MUST être l'une des valeurs suivantes : `micro`, `standard`, `deep` (voir [Rigueur proportionnelle](/spec/dwp-specification#proportional-rigor)).

`plan_format` MUST être l'une des valeurs suivantes : `lite`, `full` — la représentation choisie à la création (voir [Plans Lite](/spec/lite-plans)). Il est immuable au niveau du manifeste : une promotion ultérieure de Lite vers Full est enregistrée dans `state.json`, jamais en réécrivant le manifeste.

`parent_plan` relie un plan enfant à son plan orchestrateur (`{repo}:{plan_name}`, ou `null`).

`created_by` SHOULD identifier l'agent créateur et le modèle. Il MUST NOT contenir de secrets, de jetons ou d'identifiants d'utilisateur au-delà d'un nom d'affichage.

## `state.json` — état d'exécution en direct

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Les entrées de tâche d'un plan Lite utilisent un locator `inline` pointant vers l'ancre de la tâche dans `README.md` au lieu d'un fichier séparé — le reste de l'entrée (portes, résultat, statut) fonctionne de la même façon :

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Format, matérialisation, approbation et promotion

`format` MUST être l'une des valeurs suivantes : `lite`, `full` et reflète le `plan_format` du manifeste — mutable ici, contrairement au manifeste, car un plan Lite MAY être promu plus tard vers Full. `materialization` MUST être l'une des valeurs suivantes : `materializing` (le dossier du plan est en cours d'écriture), `ready` (la matérialisation est terminée), ou `promoting` (une promotion de Lite vers Full est en cours). `approval` MUST être l'une des valeurs suivantes : `pending`, `approved`, `pre_approved` ; il est OPTIONAL dans ce schéma afin qu'un plan écrit avant qu'il ne soit consigné reste valide — lorsqu'il est absent, on prend la ligne `Approval` du README comme valeur, et `pending` lorsque ni l'un ni l'autre n'est présent. `promotion` vaut `null` en dehors d'une promotion, ou un objet consignant l'intention de la promotion et les tâches de destination pendant que `materialization` vaut `promoting`. Voir [Plans Lite](/spec/lite-plans) pour le cycle de vie complet que ces champs codent.

### Entrées de tâches

Chaque tâche — un fichier séparé dans un plan Full, ou un enregistrement `{#task-N}` en ligne dans un plan Lite — MUST avoir exactement une entrée dans `tasks`, identifiée par son numéro (`id`) et son `locator`. `locator.kind` MUST être `file` (Full — `value` est le nom de fichier de la tâche) ou `inline` (Lite — `value` est l'ancre de la tâche, `#task-N`).

`status` MUST être l'une des valeurs suivantes : `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` n'est valide que lorsque l'utilisateur a explicitement retiré la tâche du périmètre via `refine` ; `state.json` MUST NOT être utilisé pour ignorer du travail silencieusement.

Une entrée `completed` MUST porter `completed_at` et, lorsque le plan fait des commits, le hash court `commit` — c'est le lien de traçabilité entre le plan et le code.

### Enregistrements de portes

Chaque exécution d'une commande de validation SHOULD être consignée comme un enregistrement de porte : `command`, `passes` (booléen), `exit_code`, `last_run`, et une courte chaîne `evidence` lisible par un humain (une ligne de synthèse ou un chemin sous le `analysis_results/` propre au plan (dans le dossier propre du plan, jamais à la racine du dépôt), jamais la sortie complète de la commande).

Une tâche MUST NOT être marquée `completed` dans `state.json` tant que l'un de ses enregistrements de porte a `passes: false` et qu'aucune exécution réussie ultérieure n'existe. Les enregistrements de portes sont l'équivalent machine du principe « ne jamais marquer comme achevé sans preuve » — le motif d'un indicateur `passes` par élément qui garde contre l'achèvement prématuré.

### Enregistrements de résultats comme mémoire épisodique

Une tâche `completed` SHOULD porter un enregistrement `outcome` : ce qui a été `tried`, ce qui a `failed`, ce qui a `worked`, et des `notes` libres. Chaque entrée doit tenir en une ligne.

Les enregistrements de résultats font d'un plan terminé une **mémoire épisodique** récupérable : un agent (ou une plateforme d'indexation de mémoire) peut ensuite se rappeler comment un problème a été résolu, et pas seulement qu'il l'a été. Ils alimentent les dispositions de skills par tâche et la réconciliation des skills du Final Review, qui les lit lors de l'extraction de motifs. Sur des plateformes comme Hermes qui indexent la mémoire des agents, les enregistrements de résultats dans `state.json` rendent les plans terminés directement récupérables dans les sessions futures.

### Point de reprise et état bloqué

`checkpoint` enregistre le point de reprise le plus précis à l'intérieur de la tâche en cours : le `id` de la tâche, un localisateur `step` libre, un horodatage, et une note d'une ligne. Un agent SHOULD le mettre à jour chaque fois qu'il s'interrompt à l'intérieur d'une tâche ; il MUST le mettre à jour avant toute interruption planifiée en mode sans surveillance.

`blocked` vaut `null` ou `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Un agent sans surveillance qui rencontre une condition d'arrêt MUST renseigner le champ `blocked` de `state.json` avant de s'arrêter — c'est ainsi que le prochain heartbeat d'un daemon, ou un humain, comprend pourquoi le plan s'est arrêté.

## Projection et réconciliation

Le markdown MUST l'emporter sur tout désaccord. Si `state.json` indique que la tâche 4 est `completed` mais que le README du plan affiche une case non cochée, le fichier d'état est obsolète.

Un agent reprenant MUST comparer la liste des cases du README contre `state.json` avant de continuer. En cas de désynchronisation, il MUST régénérer `state.json` à partir du markdown (et du journal git, lorsqu'il est disponible), consigner la réconciliation dans `PROGRESS.md`, puis seulement continuer.

Le sous-skill `verify` MUST traiter la désynchronisation comme un constat de non-conformité : signaler les tâches qui divergent et dans quel sens.

Les outils autres que l'agent exécutant MUST traiter les deux fichiers JSON en lecture seule.

## Mises à jour d'état sous garde

Les écritures de progression ordinaires passent par un metteur à jour ciblé livré avec le kit, plutôt que par une réécriture complète du fichier. Il rejette d'emblée tout état malformé, et il refuse de marquer une tâche `completed` sans preuve de porte non vide qui l'accompagne — une forme `--gate-json` est disponible pour une commande dont la propre sortie contient des caractères pipe, et le metteur à jour accepte le même objet de porte clos décrit plus haut. Les nouvelles tentatives ne remplacent que leur propre commande ; une commande différente conserve son propre enregistrement séparé. `--block-reason` consigne un blocage ; `--resolve-blocker` ne résout que le blocage de la tâche courante, jamais celui d'une autre tâche. Un travail sauté ne peut jamais rendre un plan `completed`. `--reopen-reason` consigne l'intention d'un appelant de modifier le plan via `refine` — l'amendement et toute preuve qu'il invalide MUST d'abord être consignés dans le journal de tâche. `--expected-sha256` rejette une écriture par rapport à un instantané d'état qui a depuis évolué. Un répertoire `.lock` coopératif sérialise les écrivains concurrents ; le verrou d'un écrivain planté MUST être inspecté avant suppression, et aucune protection n'est revendiquée contre un éditeur qui contourne entièrement le verrou. Ces enregistrements affirment des résultats — ils ne prouvent pas en eux-mêmes qu'une commande s'est exécutée, ni que sa sortie a été acceptée sémantiquement.

## Publication de plan vérifiée

Avant d'annoncer l'achèvement, les journaux de tâche terminés (chacun portant sa **disposition des skills** et, dans le Final Review, sa **décision de documentation**), l'index du README, et `PROGRESS.md` MUST être rédigés à partir de source acquise et de résultats d'acceptation réels. La tâche finale du plan se clôt alors via le finaliseur livré avec le kit : sa transition terminale valide le candidat achevé par rapport à chaque artefact du plan avant d'écrire l'état, vérifie ensuite les fichiers, et consigne un reçu `analysis_results/FINALIZATION.json`. Une porte de validation inventée comme passante MUST NOT étayer cette transition — le reçu est une preuve externe de ce qui a réellement été vérifié, jamais son propre prérequis. `bash ../verify/conformance.sh --plan PLAN_name` s'exécute ensuite, contre les artefacts réels sur disque.

Une publication interrompue laisse un marqueur `.finalizing.json` en place ; la vérification normale échoue tant que la preuve n'a pas été inspectée et que l'assistant de récupération n'a pas réussi contre le même candidat — rien ne reprend une publication par simple supposition. Un verrou coopératif obsolète exige de confirmer qu'aucun écrivain ne reste actif avant sa suppression. Rien dans cette couche ne commite, ne pousse, n'exécute une commande de porte stockée, ni ne répare silencieusement le markdown du plan. Un interpréteur Python manquant produit `UNVERIFIED`, jamais `completed`.

## Vérité des preuves et amendements

Chaque changement dans le périmètre, les critères d'acceptation ou le report d'une tâche porte un enregistrement d'amendement durable : le critère original textuel, ce qui a été observé, la disposition, la raison, l'autorité à l'origine (utilisateur, développeur, ou preuve), les tâches affectées, et quelle preuve a été invalidée ou préservée. Les amendements sont ajoutés en fin de journal, jamais antidatés ; `manifest.json` conserve sa provenance de création et n'est jamais réécrit pour correspondre à un périmètre vivant modifié.

Cinq états de preuve décrivent ce sur quoi un enregistrement de tâche peut se clore :

- **Investigation achevée** — un travail réel consigné ; elle ne clôt une tâche que par rapport à un critère révisé qui la nomme, jamais par rapport à l'original tel qu'écrit.
- **Scénario non exécuté** — consigné comme non réalisé ; il ne contribue à aucune preuve passante, quelle que soit l'époque.
- **Exigence reportée** — le critère se déplace vers une tâche de destination nommée avec une autorité consignée ; seul cet amendement clôt la source.
- **Porte échouée** — reste en échec jusqu'à ce que la même intention d'acceptation soit rejouée et réussisse ; une nouvelle tentative ne remplace que sa propre commande.
- **Résultat produit atteint** — le critère tel qu'écrit, vérifié par sa propre porte ; le seul état qui achève une tâche sans changement.

L'application est mécanique partout où les enregistrements le permettent. Une preuve de porte marquée « invalidée par refine » reste un historique conservé, jamais une preuve passante, et une tâche achevée qui s'appuie encore dessus est signalée par le vérificateur. Un enregistrement passant dont le texte lui-même admet que la vérification n'a jamais eu lieu (par exemple « jamais entré », « ne s'est pas exécuté », ou « ne peut pas être mesuré ») est une contradiction, signalée de la même façon — tout comme une tâche à l'état achevé dont le propre journal affiche encore `Status: pending`. Les contradictions narratives au-delà de celles-ci — un rapport dont les conclusions divergent de sa propre checklist — exigent un relecteur humain ; le vérificateur rapporte ce que disent les enregistrements, pas ce que la prose signifie. Un utilisateur MAY accepter explicitement une exception bornée avec une autorité consignée ; une pré-approbation sans surveillance n'est jamais une permission générale d'abandonner un objectif central, et un critère obligatoire impossible à satisfaire est un blocage, jamais un travail achevé.

## Versionnage des schémas

Les deux schémas sont versionnés par URL. Les champs additifs sont autorisés au sein d'une version ; renommer ou changer le type d'un champ nécessite une nouvelle version de schéma et une note de migration dans le changelog de la spécification. Cette révision introduit `/v2.json` pour les deux schémas : le champ `file` de l'entrée de tâche devient un `locator` typé (`{"kind": "file" | "inline", "value": ...}`), le manifeste gagne `plan_format`, et le fichier d'état gagne `format`, `materialization`, `approval` et `promotion` — ensemble, les champs dont les plans Lite ont besoin (voir [Plans Lite](/spec/lite-plans)). Les manifestes et fichiers d'état `/v1.json` restent valides et ne sont jamais réécrits silencieusement en v2 ; une session `refine` MAY en migrer un délibérément. Le champ `spec_version` du manifeste fixe la version de la spec DWP sous laquelle le plan a été créé ; un agent rencontrant un plan plus récent que sa spec installée SHOULD le signaler plutôt que de deviner.
