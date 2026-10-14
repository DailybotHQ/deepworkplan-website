---
title: "DWP v7 : des plans qui délèguent, avec trace de tout"
description: "Deep Work Plan v7 conserve le contrat et le journal de v6, permet à un plan de confier des tâches bornées à d'autres agents et ajoute quatre addons optionnels."
date: 2026-10-09
version: "v7 · Délégation avec preuve"
kind: release
lang: fr
order: 0
featured: true
sourceLabel: "Ensemble de schémas v7 publié"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
---

Deep Work Plan v7 conserve la méthode de v6 : le contrat fait autorité, le journal en ajout seul est la mémoire, l'ordonnanceur décide de ce qui s'exécute ensuite, et une tâche ne se clôt que lorsque des preuves enregistrées satisfont ses critères. v7 ajoute la possibilité de déléguer et maintient la même discipline autour du résultat.

Un plan qui accorde `agent_delegation` peut marquer une tâche `parallel_safe` et la confier à un autre agent. La réponse du délégué est enregistrée comme donnée, jamais comme instruction, et reste `asserted` tant que l'exécuteur de gates du plan n'a pas observé le résultat. Seul l'exécuteur produit des preuves `observed` : la délégation étend donc la portée sans abaisser le seuil d'achèvement.

Quatre addons optionnels font de la délégation une autonomie pratique. Herdr confie une tâche à un agent dans un volet, sur n'importe quelle machine. Agentkit place une seule commande `ak` au-dessus de tous les agents de codage en terminal, avec autonomie par défaut et possibilité de la désactiver, et exécute des tâches bornées sans interface dans un worktree git. Devcontainer donne à chaque dépôt un conteneur reproductible sans aucune clé SSH à l'intérieur par défaut (git via SSH à travers l'agent de l'hôte ; fichiers de clés uniquement sur accord explicite avec `[ssh] copy_keys`). DeepWorkPlan Vim est un éditeur de terminal doté d'un navigateur de plans et d'un visionneur Markdown. Chacun est épinglé par tag à un produit disposant de son propre dépôt et fonctionne sans Deep Work Plan. Un dépôt est pleinement conforme sans aucun d'eux, et le registre dans `.dwp/config.json` indique lesquels sont activés.

Le mode benchmark et enseignements consigne ce que chaque plan apprend, afin que les constats puissent être analysés ensuite. Un audit de tout l'écosystème, exécuté comme un plan orchestrateur v7 avec un agent par dépôt, n'a relevé aucune régression de comportement par rapport à v6 : la suite du pack passe 807 tests sur 807 dans un environnement propre, et la charge d'instructions a augmenté de 0.1% à 3.9% par flux (4.6% pour l'ensemble du pack), mesurée en octets sur les deux tags plutôt qu'estimée en tokens.

v7 marque une avancée en orchestration et en auditabilité, mais pas encore une autonomie entièrement sans intervention. La version 7.2.0 comble les lacunes relevées par cet audit : le benchmark et les enseignements mesurent désormais les plans v7, démarrer une tâche avant que ses prérequis ne soient complets est refusé, et la suite de tests s'exécute de façon hermétique (815 sur 815 dans un environnement propre). La non-infériorité des résultats des agents n'a pas été mesurée. Les plans existants conservent leur génération enregistrée et ne sont jamais migrés implicitement ; les nouveaux plans utilisent le contrat v7 par défaut.

La version 7.6.0 (2026-10-11) a introduit l'orchestration à grande échelle : un couloir (lane) par dépôt ou chantier, des comptes choisis selon leur marge disponible (`ak usage`, `ak pick`), un lancement sans surveillance et une intégration qui détecte chaque addon, met à niveau ceux qui sont utilisés et propose ceux qui conviennent.

La version 7.7.0 (2026-10-12) a apporté l'autonomie en essaim (Guide §17) : la boucle de capacité (`shared/swarm.py`), les paquets de transmission (`dwp-handoff-v1`), la succession des leads avec époques et cloisonnement, les requêtes entre couloirs, la taxonomie d'escalade d'AGENT_PROTOCOL §7.5 (C1–C7 : décider et enregistrer tout le reste), le niveau d'exigence qualité (les portes sont des hypothèses, vérifiées et non affirmées) et les enseignements méthodologiques tirés de 313 plans exécutés sur 23 dépôts. Limite connue : le journal v7 ne dispose d'aucun événement dédié à la transmission d'un couloir ou à la succession d'un lead (elles sont enregistrées comme une délégation annulée assortie d'une observation).

La version 7.8.0 (2026-10-13) a établi Ecosystem 1.0 : chaque produit intégré par le pack a atteint sa première version stable et est épinglé en v1.0.0 selon le versionnage sémantique (coding-agents-kit, herdr-peers, devcontainer-kit et deepworkplan-vim, chacun avec un condensé `SHA256SUMS` vérifié), aux côtés des versions épinglées AI Diff Reviewer v3.3.14 et Dailybot agent-skill v3.23.17 ; la 7.8.1 (2026-10-14) a ensuite épinglé les versions correctives v1.0.1 de coding-agents-kit et devcontainer-kit.

Version installée du skill : **7.8.1**, stable depuis 7.0.0.
