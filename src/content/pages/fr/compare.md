---
title: "Deep Work Plan comparé aux alternatives — Deep Work Plan"
description: "Deep Work Plan comparé aux outils de spécification, aux frameworks d’agents et aux modes de plan : chaque outil selon ses termes, sources et date de revue."
lastUpdated: 2026-09-10
---

## Deep Work Plan et les alternatives

Choisissez la couche adaptée à votre situation. Chaque alternative est décrite selon ses propres termes, chaque fait remonte à sa documentation officielle, et la page indique quand elle a été revue pour la dernière fois. C’est une carte, pas un classement.

## Comment lire cette page

Trois valeurs décrivent chaque capacité. Elles disent où se trouve une capacité dans un outil, et non si l’outil est bon.

- **Intégré**
- **Optionnel ou via extension**
- **Hors périmètre**

Dernière révision : 2026-09-10

## Les alternatives, selon leurs propres termes

### Outils de développement piloté par la spécification

**GitHub Spec Kit** — Transforme une fonctionnalité en spécification exécutable via une constitution, une spec, un plan et une liste de tâches, piloté par des commandes slash qui s’intègrent à plus de cinquante agents de code. Équipes qui veulent un flux répétable — spécifier, planifier, décomposer en tâches, implémenter — au sein de l’agent qu’elles utilisent déjà. [Site officiel](https://github.com/github/spec-kit)

**OpenSpec** — Capte chaque changement comme une proposition avec des specs delta (ajoutées, modifiées, supprimées) et des exigences RFC 2119 avec scénarios, puis les archive en spécifications vivantes. Équipes qui travaillent sur des systèmes existants et veulent que les spécifications grandissent un changement à la fois. [Site officiel](https://openspec.dev)

**Amazon Kiro** — Un IDE agentique et une CLI dont les specs passent des exigences de style EARS au design puis aux tâches, avec des fichiers de guidage et des hooks déclenchés par les événements de l’éditeur. Développeurs qui veulent le développement piloté par la spécification intégré à leur éditeur, avec des outils adossés à AWS. [Site officiel](https://kiro.dev)

### Frameworks de workflow d’agents

**BMAD Method** — Un framework agile de rôles d’agents spécialisés (analyse, produit, architecture, développement, qualité) qui produit des briefs, des exigences, des documents d’architecture et des fichiers de stories. Équipes qui aiment les cérémonies fondées sur les rôles et veulent un cycle agile complet pour le travail des agents. [Site officiel](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Une bibliothèque de skills et un flux de travail pour le brainstorming, la planification en petites étapes test-first, l’exécution avec des sous-agents et la revue avant achèvement. Développeurs qui veulent une exécution disciplinée pilotée par les tests au sein de leur agent de code. [Site officiel](https://github.com/obra/superpowers)

**Get Shit Done** — Un système de planification avec un répertoire .planning, des identifiants d’exigences, des plans par phase, une exécution à contexte neuf et une passe de vérification contre les indispensables énoncés. Développeurs en solo et petites équipes qui veulent l’ingénierie du contexte et la vérification avec peu de cérémonial. [Site officiel](https://github.com/open-gsd/gsd-core)

### Modes de planification natifs des éditeurs

**Modes de planification natifs des éditeurs** — Claude Code, Codex, Cursor et Gemini CLI livrent des modes de planification, des fichiers d’instructions et des skills qui suivent les standards AGENTS.md et Agent Skills. Toute personne qui veut la planification au sein d’un seul agent sans adopter de méthodologie. [Site officiel](https://agents.md)

## Matrice de capacités

Où se trouve chaque capacité, par outil. Intégré, optionnel ou via extension, ou hors périmètre. Vérifié contre la documentation officielle.

| Capacité | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Modes de planification natifs des éditeurs |
|---|---|---|---|---|---|---|---|---|
| Fonctionne avec tout agent de code | Intégré | Intégré | Intégré | Hors périmètre | Intégré | Intégré | Intégré | Hors périmètre |
| Écrit le harness de l’agent dans le dépôt | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre | Optionnel ou via extension | Optionnel ou via extension |
| Critères d’acceptation par tâche | Intégré | Optionnel ou via extension | Intégré | Intégré | Intégré | Intégré | Intégré | Optionnel ou via extension |
| Porte de validation par tâche | Intégré | Optionnel ou via extension | Hors périmètre | Optionnel ou via extension | Optionnel ou via extension | Intégré | Optionnel ou via extension | Optionnel ou via extension |
| État reprenable sur disque | Intégré | Intégré | Intégré | Intégré | Optionnel ou via extension | Optionnel ou via extension | Intégré | Optionnel ou via extension |
| Revue de clôture obligatoire avec une passe de sécurité | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension |
| Vérificateur de conformité exécutable | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre | Hors périmètre | Hors périmètre | Optionnel ou via extension |
| Mesure publiée de la charge d’instructions | Intégré | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre |
| Onboarding qui structure la documentation | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre | Intégré | Optionnel ou via extension |
| Spécifications vivantes pour les systèmes existants | Hors périmètre | Optionnel ou via extension | Intégré | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre | Optionnel ou via extension | Hors périmètre |

## Ce qu’apporte Deep Work Plan

- **Indépendant de l’outil et natif du dépôt.** Le harness et le plan sont des fichiers dans votre dépôt, lus par tout agent qui suit les standards AGENTS.md et Agent Skills. Changer d’agent ne fait pas perdre le plan.
- **Une validation choisie depuis ce que chaque tâche a touché.** Chaque tâche déclare sa surface touchée et exécute les tests du comportement modifié et de ses consommateurs, s’élargissant à la suite complète quand l’impact ne peut pas être borné. Zéro test sélectionné n’est jamais une réussite.
- **Un seul Final Review, avec une passe de sécurité.** Un plan se clôt par une revue de sécurité de l’ensemble des changements accumulés, y compris une revue locale obligatoire du diff, et par une validation de l’état final. Les constats critiques bloquent l’achèvement.
- **Un état qui survit aux sessions et aux agents.** Cases à cocher du README, journaux de tâches, index de travail borné et fichier d’état lisible par machine sont écrits à chaque frontière, pour qu’une autre session ou un autre agent poursuive depuis le disque. Même une création de plan interrompue est récupérable.
- **Un vérificateur de conformité pour le dépôt lui-même.** Un script en lecture seule vérifie le harness et chaque plan par rapport à la spécification, comprend les deux cycles de vie des plans et sort avec un code adapté à la CI.
- **Charge d’instructions mesurée et publiée.** Un script livré dans le dépôt mesure le nombre d’octets chargés par chaque flux ; les résultats, hausses comprises, sont publiés en octets, jamais en pourcentages de tokens ou de coût.

## Limites assumées

Deep Work Plan n’a pas de mécanisme de spécification vivante ou delta ; OpenSpec et les outils similaires y sont plus forts. Aucun benchmark indépendant de la méthodologie n’existe encore ; une évaluation publique préenregistrée est prévue. Le registre de charge d’instructions mesure des octets chargés, pas des tokens, un coût ou des résultats.

## Aidez-nous à garder cette page exacte

Cette page est revue à la date indiquée et corrigée sur demande. Si la description de votre outil est obsolète ou incomplète, ouvrez une issue et nous la corrigerons.

[Ouvrir une issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Sources

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
