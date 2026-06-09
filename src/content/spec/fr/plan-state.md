---
title: État du plan
description: "La couche d'état lisible par machine : manifest.json et state.json, enregistrements de portes, enregistrements de résultats comme mémoire épisodique, réconciliation, et quand elle est requise."
order: 7
lang: fr
section: State
---

# État du plan

**Version 1.0. Statut : stable.** Ce document spécifie la couche d'état lisible par machine de la méthodologie Deep Work Plan. Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

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

`state.json` MUST être réécrit par l'agent à chacun de ces points de protocole : matérialisation du plan (toutes les tâches `pending`), démarrage d'une tâche (`in_progress`), chaque exécution d'une porte de validation (enregistrement de porte ajouté ou mis à jour), et achèvement d'une tâche (`completed`, dans le cadre du protocole d'achèvement de tâche de la [Spécification DWP](/spec/dwp-specification#task-completion-protocol)).

Les deux fichiers MUST être écrits de façon atomique : écrire dans un fichier temporaire dans le même répertoire, puis le renommer par-dessus la cible. Un write interrompu MUST NOT laisser un fichier JSON tronqué en place.

## Quand la couche est requise

- Pour l'exécution **interactive** dans un dépôt git, la couche d'état est RECOMMENDED pour les nouveaux plans et OPTIONAL pour les plans antérieurs à la v1.2. Un plan sans elle reste conforme.
- Pour l'exécution **sans surveillance**, la couche d'état est REQUIRED.
- Dans un **espace de travail d'agent** sans git, la couche d'état est REQUIRED : `state.json` porte les informations de récupération que le journal git porte dans un dépôt.

## `manifest.json` — identité du plan

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` et `task_count` sont REQUIRED.

`archetype` MUST être l'une des valeurs suivantes : `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` MUST être l'une des valeurs suivantes : `micro`, `standard`, `deep` (voir [Rigueur proportionnelle](/spec/dwp-specification#proportional-rigor)).

`parent_plan` relie un plan enfant à son plan orchestrateur (`{repo}:{plan_name}`, ou `null`).

`created_by` SHOULD identifier l'agent créateur et le modèle. Il MUST NOT contenir de secrets, de jetons ou d'identifiants d'utilisateur au-delà d'un nom d'affichage.

## `state.json` — état d'exécution en direct

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
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
      "file": "3.task_retry_queue.md",
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

### Entrées de tâches

Chaque fichier de tâche du plan MUST avoir exactement une entrée dans `tasks`, identifiée par son numéro (`id`) et son nom de fichier (`file`).

`status` MUST être l'une des valeurs suivantes : `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` n'est valide que lorsque l'utilisateur a explicitement retiré la tâche du périmètre via `refine` ; `state.json` MUST NOT être utilisé pour ignorer du travail silencieusement.

Une entrée `completed` MUST porter `completed_at` et, lorsque le plan fait des commits, le hash court `commit` — c'est le lien de traçabilité entre le plan et le code.

### Enregistrements de portes

Chaque exécution d'une commande de validation SHOULD être consignée comme un enregistrement de porte : `command`, `passes` (booléen), `exit_code`, `last_run`, et une courte chaîne `evidence` lisible par un humain (une ligne de synthèse ou un chemin sous `analysis_results/`, jamais la sortie complète de la commande).

Une tâche MUST NOT être marquée `completed` dans `state.json` tant que l'un de ses enregistrements de porte a `passes: false` et qu'aucune exécution réussie ultérieure n'existe. Les enregistrements de portes sont l'équivalent machine du principe « ne jamais marquer comme achevé sans preuve » — le motif d'un indicateur `passes` par élément qui garde contre l'achèvement prématuré.

### Enregistrements de résultats comme mémoire épisodique

Une tâche `completed` SHOULD porter un enregistrement `outcome` : ce qui a été `tried`, ce qui a `failed`, ce qui a `worked`, et des `notes` libres. Chaque entrée doit tenir en une ligne.

Les enregistrements de résultats font d'un plan terminé une **mémoire épisodique** récupérable : un agent (ou une plateforme d'indexation de mémoire) peut ensuite se rappeler comment un problème a été résolu, et pas seulement qu'il l'a été. Ils alimentent la tâche finale obligatoire de découverte des Skills et Agents, qui SHOULD les lire lors de l'extraction de motifs. Sur des plateformes comme Hermes qui indexent la mémoire des agents, les enregistrements de résultats dans `state.json` rendent les plans terminés directement récupérables dans les sessions futures.

### Point de reprise et état bloqué

`checkpoint` enregistre le point de reprise le plus précis à l'intérieur de la tâche en cours : le `id` de la tâche, un localisateur `step` libre, un horodatage, et une note d'une ligne. Un agent SHOULD le mettre à jour chaque fois qu'il s'interrompt à l'intérieur d'une tâche ; il MUST le mettre à jour avant toute interruption planifiée en mode sans surveillance.

`blocked` vaut `null` ou `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Un agent sans surveillance qui rencontre une condition d'arrêt MUST renseigner le champ `blocked` de `state.json` avant de s'arrêter — c'est ainsi que le prochain heartbeat d'un daemon, ou un humain, comprend pourquoi le plan s'est arrêté.

## Projection et réconciliation

Le markdown MUST l'emporter sur tout désaccord. Si `state.json` indique que la tâche 4 est `completed` mais que le README du plan affiche une case non cochée, le fichier d'état est obsolète.

Un agent reprenant MUST comparer la liste des cases du README contre `state.json` avant de continuer. En cas de désynchronisation, il MUST régénérer `state.json` à partir du markdown (et du journal git, lorsqu'il est disponible), consigner la réconciliation dans `PROGRESS.md`, puis seulement continuer.

Le sous-skill `verify` MUST traiter la désynchronisation comme un constat de non-conformité : signaler les tâches qui divergent et dans quel sens.

Les outils autres que l'agent exécutant MUST traiter les deux fichiers JSON en lecture seule.

## Versionnage des schémas

Les deux schémas sont versionnés par URL (`/v1.json`). Les champs additifs sont autorisés dans une version ; renommer ou changer le type d'un champ nécessite `/v2.json` et une note de migration dans le changelog de la spec. Le champ `spec_version` dans le manifeste fixe la version de la spec DWP sous laquelle le plan a été créé ; un agent rencontrant un plan plus récent que sa spec installée SHOULD le signaler plutôt que de deviner.
