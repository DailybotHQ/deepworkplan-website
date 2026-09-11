---
title: "Deep Work Plan comparé aux alternatives"
description: "Deep Work Plan comparé aux outils de spécification, aux frameworks d’agents et aux modes de plan : chaque outil selon ses termes, sources et date de revue."
lastUpdated: 2026-09-11
---

## Deep Work Plan et les alternatives

Choisissez la couche adaptée à votre situation. Chaque alternative est décrite selon ses propres termes, chaque fait remonte à sa documentation officielle, et la page indique quand elle a été revue pour la dernière fois. C’est une carte, pas un classement.

## Comment lire cette page

Trois valeurs décrivent chaque capacité. Elles disent où se trouve une capacité dans un outil, et non si l’outil est bon.

- **Intégré**
- **Optionnel ou via extension**
- **Hors périmètre**

Dernière révision: 2026-09-11

## Les alternatives, selon leurs propres termes

### Outils de développement piloté par la spécification

**GitHub Spec Kit** — Transforme une fonctionnalité en spécification exécutable via une constitution, une spec, un plan et une liste de tâches, piloté par des commandes slash qui s’intègrent à plus de cinquante agents de code, et peut vérifier que les artefacts restent cohérents entre eux avant que l’implémentation ne commence. Équipes qui veulent un flux répétable — spécifier, planifier, décomposer en tâches, implémenter — au sein de l’agent qu’elles utilisent déjà. [Site officiel](https://github.com/github/spec-kit)

**OpenSpec** — Capte chaque changement comme une proposition avec des specs delta (ajoutées, modifiées, supprimées) et des exigences RFC 2119 avec scénarios, puis les archive en spécifications vivantes, avec un validateur qui vérifie la complétude de la proposition et la couverture des scénarios avant d’accepter un changement. Équipes qui travaillent sur des systèmes existants et veulent que les spécifications grandissent un changement à la fois. [Site officiel](https://openspec.dev)

**Amazon Kiro** — Un IDE agentique et une CLI dont les specs passent des exigences de style EARS au design puis aux tâches, avec des fichiers de guidage et des hooks déclenchés par les événements de l’éditeur, et qui peut générer des spécifications pour une base de code existante afin de détecter les manques dans les exigences avant que le design ne commence. Développeurs qui veulent le développement piloté par la spécification intégré à leur éditeur, avec des outils adossés à AWS. [Site officiel](https://kiro.dev)

### Frameworks de workflow d’agents

**BMAD Method** — Un framework agile de rôles d’agents spécialisés (analyse, produit, architecture, développement, qualité) qui produit des briefs, des exigences, des documents d’architecture et des fichiers de stories, avec une Definition of Done qui exige que chaque story soit relue par un coéquipier ou un agent réviseur IA avant d’être considérée comme terminée. Équipes qui aiment les cérémonies fondées sur les rôles et veulent un cycle agile complet pour le travail des agents. [Site officiel](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Une bibliothèque de skills et un flux de travail pour le brainstorming, la planification en petites étapes test-first, l’exécution avec des sous-agents et la revue avant achèvement, intégrée à davantage d’hôtes d’agents de code qu’aucune autre alternative de cette page, plus une revue en deux étapes par sous-agents (conformité à la spec, puis qualité du code) à chaque tâche. Développeurs qui veulent une exécution disciplinée pilotée par les tests au sein de leur agent de code. [Site officiel](https://github.com/obra/superpowers)

**GSD Core** — Un système de planification avec un répertoire .planning, des identifiants d’exigences, des plans par phase, une exécution à contexte neuf et une passe de vérification contre les livrables observables par l’utilisateur extraits du résumé de chaque plan, pensé pour lutter contre le context rot en exécutant recherche, planification et exécution dans des sous-agents jetables et en détectant les vérifications obsolètes par empreinte de contenu. Développeurs en solo et petites équipes qui veulent l’ingénierie du contexte et la vérification avec peu de cérémonial. [Site officiel](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Configure les agents de code que vous utilisez déjà avec une mémoire persistante qui route aussi entre sessions et modèles, des skills sélectionnées, des serveurs MCP, des personas et, en option, du Spec-Driven Development ou du Receipt-Driven Development. Sa configuration est écrite par défaut dans les réglages globaux de l’agent ; une installation limitée au workspace est optionnelle. Développeurs qui veulent un écosystème d’agents configuré, capable de se souvenir du travail entre sessions et de produire des preuves à la demande. [Site officiel](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**AI-native SDLC de Claude** — Un cycle en six étapes, de Plan et Design à Build, Test, Deploy et Maintain, avec une approbation humaine obligatoire à chaque étape, des artefacts durables commités dans le dépôt entre les étapes, une passe de revue dédiée et étiquetée sécurité avant le déploiement, et des evals continues qui publient des indicateurs de livraison avancés et retardés. Équipes qui évaluent le playbook de livraison logicielle de bout en bout de Claude Code et sa boucle de feedback en production. [Site officiel](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Modes de planification natifs des éditeurs

**Modes de planification natifs des éditeurs** — Claude Code, Codex, Cursor et Gemini CLI livrent des modes de planification, des fichiers d’instructions et des skills construits sur les standards ouverts et multi-éditeurs AGENTS.md et Agent Skills, même si le comportement exact du mode plan dépend encore de l’éditeur, du client et de la version. Agent Skills, en particulier, ne charge qu’un court résumé au démarrage et les instructions complètes seulement à l’activation, gardant hors du contexte les capacités inutilisées. Toute personne qui veut la planification au sein d’un seul agent sans adopter de méthodologie. [Site officiel](https://agents.md)

## Matrice de capacités

Où se trouve chaque capacité, par outil. Intégré, optionnel ou via extension, ou hors périmètre. Vérifié contre la documentation officielle.

| Capacité | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | AI-native SDLC de Claude | Modes de planification natifs des éditeurs |
|---|---|---|---|---|---|---|---|---|---|---|
| Fonctionne avec tout agent de code | Intégré | Intégré | Intégré | Hors périmètre | Intégré | Intégré | Intégré | Intégré | Hors périmètre | Hors périmètre |
| Écrit le harness de l’agent dans le dépôt | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre | Optionnel ou via extension | Optionnel ou via extension | Intégré | Optionnel ou via extension |
| Critères d’acceptation par tâche | Intégré | Optionnel ou via extension | Intégré | Intégré | Intégré | Intégré | Intégré | Optionnel ou via extension | Intégré | Optionnel ou via extension |
| Porte de validation par tâche | Intégré | Optionnel ou via extension | Hors périmètre | Optionnel ou via extension | Optionnel ou via extension | Intégré | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension |
| État reprenable sur disque | Intégré | Intégré | Intégré | Intégré | Optionnel ou via extension | Optionnel ou via extension | Intégré | Intégré | Intégré | Optionnel ou via extension |
| Revue de clôture obligatoire avec une passe de sécurité | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Intégré | Optionnel ou via extension |
| Vérificateur de conformité exécutable | Intégré | Optionnel ou via extension | Intégré | Optionnel ou via extension | Hors périmètre | Hors périmètre | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension |
| Mesure publiée de la charge d’instructions | Intégré | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre |
| Onboarding qui structure la documentation | Intégré | Intégré | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre | Intégré | Hors périmètre | Intégré | Optionnel ou via extension |
| Spécifications vivantes pour les systèmes existants | Hors périmètre | Optionnel ou via extension | Intégré | Intégré | Optionnel ou via extension | Hors périmètre | Optionnel ou via extension | Optionnel ou via extension | Optionnel ou via extension | Hors périmètre |
| Mémoire d’agent persistante entre les projets | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Intégré | Hors périmètre | Optionnel ou via extension |
| Rôles d’agent spécialisés et distincts | Optionnel ou via extension | Hors périmètre | Hors périmètre | Hors périmètre | Intégré | Hors périmètre | Hors périmètre | Optionnel ou via extension | Hors périmètre | Hors périmètre |
| Est lui-même un IDE ou un éditeur | Hors périmètre | Hors périmètre | Hors périmètre | Intégré | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Hors périmètre | Optionnel ou via extension |

## Ce qu’apporte Deep Work Plan

- **Indépendant de l’outil et natif du dépôt.** Le harness et le plan sont des fichiers dans votre dépôt, lus par tout agent qui suit les standards AGENTS.md et Agent Skills. Changer d’agent ne fait pas perdre le plan.
- **Une validation choisie depuis ce que chaque tâche a touché.** Chaque tâche déclare sa surface touchée et exécute les tests du comportement modifié et de ses consommateurs, s’élargissant à la suite complète quand l’impact ne peut pas être borné. Zéro test sélectionné n’est jamais une réussite.
- **Un seul Final Review, avec une passe de sécurité.** Un plan se clôt par une revue de sécurité de l’ensemble des changements accumulés, y compris une revue locale obligatoire du diff, et par une validation de l’état final. Les constats critiques bloquent l’achèvement.
- **Un état qui survit aux sessions et aux agents.** Cases à cocher du README, journaux de tâches, index de travail borné et fichier d’état lisible par machine sont écrits à chaque frontière, pour qu’une autre session ou un autre agent poursuive depuis le disque. Même une création de plan interrompue est récupérable.
- **Un vérificateur de conformité pour le dépôt lui-même.** Un script en lecture seule vérifie le harness et chaque plan par rapport à la spécification, comprend les deux cycles de vie des plans et sort avec un code adapté à la CI.
- **Charge d’instructions mesurée et publiée.** Un script livré dans le dépôt mesure le nombre d’octets chargés par chaque flux ; les résultats, hausses comprises, sont publiés en octets, jamais en pourcentages de tokens ou de coût.

## Limites assumées

Deep Work Plan n’a pas de mécanisme de spécification vivante ou delta ; OpenSpec et les outils similaires y sont plus forts. Aucun benchmark indépendant de la méthodologie n’existe encore ; une évaluation publique préenregistrée est prévue. Le registre de charge d’instructions mesure des octets chargés, pas des tokens, un coût ou des résultats. DWP se limite volontairement au dépôt : ce n’est ni un système de mémoire inter-projets, ni un framework d’agents basé sur des rôles, ni un IDE, et ne se positionne donc pas non plus sur ces terrains — associez-le à un outil qui couvre ce besoin quand le travail l’exige.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- AI-native SDLC de Claude — https://claude.com/blog/the-ai-native-sdlc-playbook
- Modes de planification natifs des éditeurs — https://agentskills.io
