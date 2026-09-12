---
title: "DWP v5 : les promesses, désormais garanties"
description: "Deep Work Plan v5 transforme huit promesses de longue date en contrats testés — un vérificateur honnête, une seule règle d'approbation, une orchestration qui ne corrompt pas et un chemin de mise à niveau sûr."
date: 2026-09-12
version: "v5 · Garanti par les tests"
kind: release
lang: fr
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Nous publions aujourd'hui Deep Work Plan v5. Le résumé honnête de cette version : la méthodologie promettait déjà tout cela — désormais, elle le garantit. Avant v5, un agent qui suivait la documentation à la lettre pouvait encore aboutir à des scénarios d'échec réels ; chacun d'eux est désormais fermé et verrouillé par un test exécutable. La suite de contrats du skill est passée de 132 à 258 tests durant ce cycle, et chaque garantie ci-dessous a été validée en conditions réelles sur le tag publié — installée dans un dépôt propre et menée à travers ses propres flux avant la rédaction de cette entrée.

**Un vérificateur qui ne revendique jamais un succès non vérifié.** Les contrôles de conformité se dégradaient auparavant en silence : sans interpréteur capable, ils sautaient toutes les vérifications tout en imprimant un verdict conforme, et du texte en gras dans un champ pouvait être pris pour un champ manquant. Désormais, le vérificateur se termine par un verdict `UNVERIFIED` explicite chaque fois qu'il ne peut pas réellement vérifier. Un vérificateur ne rapporte jamais un succès qu'il n'a pas contrôlé — la confiance dans les gates est toute la proposition, et un gate capable de sauter sa propre vérification brise la chaîne.

**Un seul contrat d'approbation pour les plans Lite.** Trois surfaces répondaient de trois manières différentes à la question « démarrer ce plan approuve-t-il son périmètre actuel ? », et un agent pouvait se bloquer ou s'exécuter sans autorisation précisément à la frontière la plus dangereuse. v5 établit un contrat unique partout : un execute ou un resume explicite approuve le périmètre ready actuel et enregistre cette approbation avant tout travail ; une proposition en attente, seule, n'autorise rien ; une promotion interrompue est récupérée avant qu'aucun travail produit ne s'exécute.

**Une orchestration multi-dépôts qui ne corrompt rien.** La variable d'environnement d'un hub orchestrateur fuyait auparavant vers ses dépôts enfants — un enfant pouvait écrire l'état des plans dans les dossiers du hub lui-même. Les modèles de l'orchestrateur imprimaient aussi `FAIL` en se terminant avec un code de succès, et un contrôle de complétude qui cherchait une chaîne de statut pouvait lire une tâche accomplie comme un plan accompli. Désormais, la racine du hub est sauvegardée avant de naviguer vers les sous-dépôts, chaque enfant résout son propre `.dwp/` de façon isolée, chaque branche d'échec se termine en erreur, la complétude est lue depuis le statut de plus haut niveau du plan, et le point d'entrée du devcontainer propage les erreurs de copie avant de supprimer quoi que ce soit.

**Une seule matrice de consentement pour les modules.** Quel module s'installe par défaut, lequel est seulement proposé, et quelle revue est obligatoire — les surfaces répondaient différemment. v5 déclare une matrice : l'AI Diff Reviewer est obligatoire pour la revue locale, épinglé sur une version vérifiée, la revue en CI restant un opt-in explicite qui ne s'installe jamais de lui-même ; le module design-system est une offre obligatoire quand du travail d'interface est détecté, mais ne s'installe que sur acceptation explicite ; le module dependency-upgrade arrive comme un délégateur inerte quasi par défaut avec un rollback par instantané exact ; dailybot ne rend compte que là où il y est autorisé. Un diff vide ne compte plus comme une revue achevée.

**Une vraie machinerie pour les plans longs.** Un audit de 108 plans réels a montré que le travail parallélisable était courant mais que la décision séquentielle n'était presque jamais déclarée, et que les portes de jalons n'existaient qu'en pratique improvisée. v5 impose que la décision d'exécution soit toujours déclarée — séquentielle avec une raison enregistrée quand le parallélisme ne se justifie pas —, ajoute des Stage Gates optionnels pour les plans de vingt tâches ou plus, et enrichit les Plan Variables avec le niveau de rigueur, la barre de preuve et les actions interdites. Tout cela se charge progressivement et ne pèse jamais sur un plan Lite.

**Contexte imposé, un objectif par tâche.** Les plans pouvaient dériver vers des listes de tâches sans contexte, et une tâche pouvait empaqueter trois objectifs derrière un seul gate vert. v5 exige une paire Goal et Context au niveau du plan, un Context par tâche — ce dont une nouvelle session a besoin pour démarrer cette tâche seule — sur chaque nouvel enregistrement (les enregistrements achevés restent exactement tels qu'écrits), et fait de « un objectif par tâche » la règle normative, avec une garde contre l'érosion.

**Un chemin de mise à niveau sûr.** `/dwp-upgrade` est nouveau. Sa phase de vérification est en lecture seule et n'installe rien ; une mise à niveau ne démarre que sur acceptation explicite, les adaptations locales étant différenciées et exposées avant tout écrasement ; l'installation vise un tag exact et se vérifie elle-même ; l'onboarding se rejoue comme un init neuf. Une mise à niveau ne touche jamais `.dwp/` — aucun plan, fichier d'état, enregistrement de gate ou preuve n'est migré, réécrit ou invalidé.

**Des preuves honnêtes et mesurables.** Les affirmations d'efficacité sont désormais remesurées sur trois bases — v3.0.0, v4.0.3 et l'arbre final — avec le script de mesure commité dans le dépôt. Les résultats sont rapportés en octets de système de fichiers et ne sont jamais convertis en chiffres de tokens ou de coûts que nous ne pouvons pas assumer ; toute affirmation invérifiable est mise en quarantaine comme telle dans le registre d'évaluation.

Deep Work Plan v5 suit le standard DWP 4.0.0. Lisez la [spécification normative](https://deepworkplan.com/spec), consultez le [dépôt du skill](https://github.com/DailybotHQ/deepworkplan-skill) ou commencez l'adoption depuis [`/init`](https://deepworkplan.com/init).
