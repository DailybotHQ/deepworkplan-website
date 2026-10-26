---
title: Couche d'enregistrement
description: "La couche d'enregistrement v6 et v7 : contrat de résultat immuable, journal en ajout seul, classes de preuve, validation humaine, amendements et reçus."
order: 9
lang: fr
section: Record layer
---

# Couche d'enregistrement

> **Portée de version :** cette page reformule la couche d'enregistrement normative v6 sur laquelle s'appuie la norme actuelle, DWP 7.0.0. Sources canoniques à la version `v7.9.0` : [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) et [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). En cas de divergence entre cette page et ces fichiers, les fichiers prévalent. Les plans v5 conservent la couche d'[état du plan](/spec/plan-state) et ne sont jamais migrés implicitement.

**Version 6.0.0, étendue en 7.0.0. Statut : stable.** La couche d'enregistrement remplace l'achèvement narratif par des enregistrements : le contrat fait autorité, le journal est la mémoire, les helpers écrivent, et chaque fichier généré est une projection. Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

## Le modèle en une ligne

Un plan se compose de deux artefacts rédigés et d'une séquence sous garde. Le plan markdown (`README.md` et fichiers de tâche) dit ce qui sera fait. Le **contrat de résultat** (`contract.json`) dit ce qui compte comme fait et ce que le plan est autorisé à faire. Le **journal** (`journal.ndjson`) consigne ce qui s'est réellement passé. `state.json` et `views/` sont régénérés à partir du journal et MUST NOT être édités à la main ; lorsqu'un fichier généré et le journal divergent, le journal prévaut et le fichier est régénéré.

## Détection de la génération

Un dossier de plan est un plan de la lignée v6 si et seulement s'il porte un `manifest.json` dont le pointeur `contract` se résout, un `contract.json`, ou une chaîne de révisions `contracts/`. La détection MUST s'appuyer sur ces artefacts, jamais sur la version du pack installé : un pack actuel peut contenir des plans v5, et un pack plus ancien peut rencontrer un plan v6.

L'URL `schema` du contrat désigne sa **génération**, et le manifeste ainsi que chaque événement du journal la reflètent :

| Génération | Contrat | Événements du journal | Manifeste | Ajoute |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` et l'événement `delegation` ([Délégation](/spec/delegation)) |

Les nouveaux plans créés par le pack 7.x sont v7 par défaut ; une demande explicite `v6` matérialise toujours un contrat v6. Un plan ne change jamais de génération, et un journal qui mélange les générations MUST être refusé. Les deux générations se projettent dans la même forme [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## Le contrat de résultat

Un contrat par plan, conforme au schéma de sa génération. Il porte l'énoncé du résultat et la définition du succès, les critères d'acceptation, les tâches avec leurs prérequis, leur surface touchée et leur intention de porte, les invariants à l'échelle du plan, le périmètre (chemins autorisés, classes de commandes, opérations interdites), l'enveloppe de ressources, les limites d'ordonnancement, les permissions et l'enregistrement d'autorisation.

- **Identité.** Le `contract_id` est le SHA-256 des octets canoniques du contrat sans le champ d'identifiant. Chaque enregistrement produit sous le contrat le cite.
- **Immuabilité.** Une fois l'exécution commencée, le contrat MUST NOT changer. Un contrat modifié est une nouvelle **révision** sous `contracts/`, qui cite son parent, avec des numéros de révision contigus et une autorité fraîchement consignée.
- **Identifiants stables.** Les critères (`AC-*`), les invariants (`INV-*`) et les tâches (`T-*`) MUST être uniques, et les enregistrements citent des identifiants, jamais des positions dans une liste. Le graphe des tâches MUST être acyclique, et chaque intention de porte MUST référencer un critère déclaré.
- **Permissions.** Les capacités accordées et non accordées MUST être des sous-ensembles disjoints d'un ensemble fermé : `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Autorisation.** Le mécanisme est exactement `plan_authorship` (l'humain a rédigé ou relu le plan avant l'exécution) ou `pre_authorization` (une autorisation permanente avec une enveloppe déclarée, comme en mode confiance). Les deux ouvrent les portes de façon identique ; seule l'autorité consignée diffère.
- **Clôturabilité.** Chaque critère MUST pouvoir être clos : un critère qu'une tâche soumet à une porte est clos par une preuve `observed` issue de sa porte ou par une validation humaine `asserted`, selon les classes de preuve qu'il accepte. Un critère en brouillon qui n'accepte ni l'une ni l'autre est refusé.

## Matérialisation

Un plan est matérialisé par le helper fourni (`ledger.py materialize`), jamais à la main, exactement dans cet ordre, chaque étape étant idempotente et reprenable :

1. **`manifest.json`** avec le pointeur de contrat, écrit en premier pour que la génération du plan soit détectable même si la matérialisation est interrompue.
2. **`contract.json`**, validé et adressé par son contenu.
3. L'événement de journal **`approval`**, qui cite l'identifiant du contrat et l'empreinte du plan markdown.

Seul cet événement d'approbation ouvre la porte de démarrage des tâches. Un contrat copié à la main sans lui est refusé au démarrage de la tâche, et un manifeste dont le pointeur ne correspond pas au contrat en cours de matérialisation est refusé plutôt que réécrit.

## Le journal

`journal.ndjson` est en ajout seul : un objet JSON fermé par ligne, jamais modifié ni supprimé. Une correction est un événement ultérieur. Chaque événement porte son schéma, son type, un `seq` strictement croissant, un horodatage, le plan, le `contract_id` et l'acteur (`helper`, `agent`, `host_adapter` ou `human`). Le catalogue d'événements couvre les démarrages de tâche, les approbations, les exécutions de porte, les observations, les adaptations, les amendements, les interventions, les échantillons de ressources, les paires de contrôle, les sélections de l'ordonnanceur, les refus, les rendus de vues, les réconciliations et les réparations de journal ; v7 ajoute les événements de délégation. Chaque refus est lui-même consigné.

## Classes de preuve

Les événements porteurs de preuve consignent une étiquette de **confiance** :

1. **observed** — un helper fourni a lui-même exécuté la vérification, avec un répertoire de travail, un environnement, un délai et une sortie capturée déclarés. Seul l'exécuteur de portes (`ledger.py gate`) produit une preuve de porte observée ; un agent qui se contente de noter un résultat qu'il rapporte ne le peut pas.
2. **imported** — reprise d'une source externe correspondante avec sa provenance, par exemple un enregistrement de porte v5 migré dont le pointeur de preuve se résout.
3. **asserted** — affirmée sans établissement indépendant.

Chaque critère déclare les classes qu'il accepte, de sorte qu'un critère « observed uniquement » ne peut jamais se clore sur une simple affirmation. Les sommes de contrôle établissent l'identité des octets, pas la vérité sémantique ; la couche d'enregistrement vérifie la structure et la provenance et ne prouve pas la sémantique du produit.

## Validation humaine

Un critère qu'un humain doit juger se clôt via `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. La validation est consignée comme `asserted`, cite l'artefact sur lequel elle repose, ne compte que dans la fenêtre de preuve de la tâche déclarante, et ne clôt qu'un critère qui accepte `asserted`. Un agent ne valide jamais à la place d'un humain. Les enregistrements d'acteur humain écrits hors de la matérialisation portent un marqueur d'autorité explicite (une note rédigée par l'humain, consignée par chemin et empreinte, ou une confirmation interactive) ; le registre ne peut pas authentifier une personne, le marqueur rend donc l'affirmation auditable plutôt qu'observée.

## Critères contrôlés

Un critère déclaré comme contrôle de régression ou de discrimination ne se clôt que sur une **paire de contrôle discriminante** : la vérification échoue sur la révision de départ et réussit sur la nouvelle. Une paire qui réussit sur les deux branches est consignée comme non discriminante et n'est jamais arrondie à la hausse ; un départ non propre ou une ancienne branche indisponible est consigné comme contrôle indisponible, jamais synthétisé.

## Exécution et achèvement

La répartition provient de l'ordonnanceur déterministe (`scheduler.py ready`), et `ledger.py start` refuse une tâche dont les prérequis sont incomplets. Chaque démarrage de tâche consigne une empreinte de l'arbre de travail, et une preuve n'est réutilisée que pour la même tâche et le même critère sur une empreinte équivalente.

**Les invariants sont à l'échelle du plan.** Chaque invariant déclaré s'applique à tout le plan et est évalué à chaque frontière comme une observation (`INV-<id>: pass` ou `INV-<id>: fail: <reason>`). Une propriété que seules certaines tâches doivent respecter est un critère d'acceptation de ces tâches, jamais un invariant.

**L'achèvement est dérivé, jamais déclaré.** `ledger.py complete` refuse, et consigne le refus, tant qu'un critère n'a pas de preuve acceptée dans sa fenêtre ou qu'un invariant n'a pas d'évaluation réussie récente. L'instantané montre une tâche comme achevée exactement lorsque les enregistrements le justifient.

## Adaptations et amendements

Les changements en cours d'exécution sont des propositions à l'ordonnanceur, limitées à un ensemble fermé : `split`, `reorder`, `insert`, `change_strategy` et `retry`. Une adaptation MUST NOT supprimer une exigence, affaiblir ou substituer l'acceptation, élargir le périmètre ou les permissions, dépenser au-delà de l'enveloppe, ni marquer comme achevé un scénario non exécuté.

Un changement de périmètre, de critères d'acceptation, de permissions ou d'enveloppe est un **amendement du contrat** : `ledger.py amend` prépare le contrat révisé comme révision suivante, consigne l'amendement avec les critères dont il invalide les preuves antérieures, exige une nouvelle approbation avec un marqueur d'autorité humaine, et seulement ensuite bascule le contrat actif. Un amendement interrompu reprend à la première étape manquante ; la rédaction du plan ne se reporte jamais sur une révision.

## Reçus, vues et export

`outcomes.py receipt` recalcule le résultat du plan à partir des enregistrements, de sorte qu'il change quand les enregistrements changent ; il n'est jamais rédigé à la main. `views.py render` régénère les vues lisibles par un humain ; une vue modifiée par un humain est signalée, jamais écrasée silencieusement, et la réconciliation est elle-même consignée. Comme `.dwp/` est ignoré par git, `ledger.py export --dest <dir>` regroupe le journal, l'instantané, la chaîne de contrats et chaque artefact de preuve cité, pour la durabilité ou pour un autre hôte.

## Surfaces en lecture seule et reprise

`status` et `verify` n'écrivent jamais dans un plan de la lignée v6 ; ils rendent compte au moyen de commandes pures et des projections générées. Un hôte qui reprend récupère dans un ordre fixe (inspecter, valider, projeter, rendre avec une autorité consignée) et traite une empreinte périmée comme une preuve invalidée à réexécuter, jamais comme un résultat réutilisable. Le journal n'est jamais rejoué comme contexte de conversation : le travail reprend par la boucle d'exécution avec un [manifeste de contexte](/fr/spec/resources-and-abilities#le-manifeste-de-contexte-par-tâche) par tâche.

## Coexistence et migration

Les plans v5 et de la lignée v6 MAY coexister dans un même `.dwp/plans/`, et chacun s'exécute sous sa propre génération toute sa vie. Le seul chemin de v5 vers v6 est une migration explicite et prévisualisée (`migrate_v6.py`, exécutée via `refine`) avec une sauvegarde vérifiée et un retour arrière ; l'historique v5 migré est `imported` lorsque sa preuve se résout et `asserted` sinon, jamais `observed`. Il n'existe pas de migration inverse.

## Voir aussi

- [Ressources et capacités](/spec/resources-and-abilities) — le manifeste de contexte, l'enveloppe de ressources, les capacités de l'hôte et le registre d'addons.
- [Délégation](/spec/delegation) — ce que v7 ajoute à cette couche.
- [État du plan](/spec/plan-state) — la couche d'état v5 conservée.
