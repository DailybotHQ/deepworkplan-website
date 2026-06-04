---
title: Conformité
description: "La définition normative d’un dépôt conforme DWP, AI-first : les artefacts qu’il MUST et SHOULD posséder, ce qui rend un plan bien formé, et comment le vérifier."
order: 6
lang: fr
section: Conformance
---

# Conformité

**Version 1.0. Statut : stable.** Ce document définit ce que signifie pour un dépôt d’être *conforme à Deep Work Plan* — c’est-à-dire AI-first et pilotable par agent. Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

La conformité existe pour que la qualité « AI-first » soit une propriété objective et vérifiable plutôt qu’une impression. Un dépôt satisfait les critères ci-dessous ou non. Le [sous-skill `verify`](/kit) (`/dwp-verify`) les vérifie mécaniquement.

## Un dépôt conforme

Un dépôt conforme DWP MUST satisfaire l’ensemble des points suivants. Chaque artefact MUST être **raisonné pour le dépôt** — adapté à ses langages, frameworks et commandes réels. Une ébauche générique, un espace réservé ou du contenu copié d’un autre dépôt ne satisfait pas un critère.

1. **`AGENTS.md` à la racine.** Le dépôt MUST contenir un `AGENTS.md` racine qui inclut (a) un index de la documentation, (b) les règles obligatoires du dépôt, et (c) un bloc Quick Commands dont les commandes sont **réelles et exécutables** dans ce dépôt. Des commandes d’espace réservé (par exemple, `npm test` dans un dépôt qui n’utilise pas npm) MUST NOT apparaître.
2. **`CLAUDE.md` se résout vers `AGENTS.md`.** Un `CLAUDE.md` MUST exister et se résoudre vers `AGENTS.md` (un lien symbolique, ou un équivalent qui garantit une source de vérité unique). Les deux MUST NOT diverger.
3. **Une hiérarchie `docs/`.** Le dépôt MUST contenir un répertoire `docs/` couvrant les catégories standard (architecture, standards, tests, commandes de développement, sécurité et onboarding des agents) avec un contenu réel, spécifique au dépôt. Les modules complexes SHOULD porter leur propre `README.md`.
4. **Un foyer `.agents/`.** Le dépôt MUST contenir un répertoire `.agents/` avec `agents/`, `commands/` et `skills/`, ainsi qu’un catalogue sous `.agents/docs/` qui **correspond à ce qui est sur disque**. Les commandes `dwp-*` MUST être de légers délégateurs vers le skill installé. Un chemin `.claude` MUST se résoudre vers `.agents`.
5. **Un espace de travail `.dwp/` ignoré par git.** Le dépôt MUST contenir un répertoire `.dwp/` avec `plans/` et `drafts/`, et `.dwp/` MUST être ignoré par git. Un espace de travail temporaire `tmp/` SHOULD exister et SHOULD être ignoré par git.
6. **Le skill de la méthodologie est résolvable.** Le skill Deep Work Plan MUST être installé ou référencé de sorte qu’un agent dans le dépôt puisse invoquer ses sous-skills.

Un dépôt est **pleinement conforme avec zéro addon**. Les addons (devcontainer, Dailybot, dependency-upgrade) sont facultatifs et MUST NOT être requis pour la conformité.

## Un plan bien formé

Un Deep Work Plan dans `.dwp/plans/` est bien formé lorsque :

1. Chaque tâche MUST déclarer un **périmètre** explicite, des **critères d’acceptation** et au moins une **porte de validation** (une commande ou une vérification qui réussit ou échoue objectivement).
2. Le plan MUST persister la progression pour que le travail survive à l’interruption et puisse être repris par un autre agent.
3. Le plan MUST inclure les deux tâches finales obligatoires — Skills & Agents Discovery et l’Executive Report.
4. Les tâches SHOULD se réancrer à l’objectif du plan avant de s’exécuter, afin de prévenir la dérive sur un long horizon.

## Vérifier la conformité

La conformité SHOULD être vérifiée mécaniquement plutôt que par inspection. L’exécution de `/dwp-verify` produit un rapport de réussite/échec face aux critères ci-dessus : la présence et le contenu réel d’`AGENTS.md`, la résolution de `CLAUDE.md`, les catégories de `docs/`, la correspondance catalogue-versus-disque de `.agents/`, le statut gitignore de `.dwp/` et `tmp/`, et — pour un plan — que chaque tâche porte des critères d’acceptation et une porte de validation.

Un dépôt SHOULD être revérifié après l’onboarding et après chaque plan achevé, afin que la conformité soit maintenue plutôt qu’affirmée une seule fois.
