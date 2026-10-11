---
title: "DWP v7 : des plans qui délèguent, avec trace de tout"
description: "Deep Work Plan v7 conserve le contrat et le journal de v6, permet à un plan de confier des tâches bornées à d'autres agents et ajoute quatre addons optionnels."
date: 2026-10-10
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
---

Deep Work Plan v7 conserve la méthode de v6 : le contrat fait autorité, le journal en ajout seul est la mémoire, l'ordonnanceur décide de ce qui s'exécute ensuite, et une tâche ne se clôt que lorsque des preuves enregistrées satisfont ses critères. v7 ajoute la possibilité de déléguer et maintient la même discipline autour du résultat.

Un plan qui accorde `agent_delegation` peut marquer une tâche `parallel_safe` et la confier à un autre agent. La réponse du délégué est enregistrée comme donnée, jamais comme instruction, et reste `asserted` tant que l'exécuteur de gates du plan n'a pas observé le résultat. Seul l'exécuteur produit des preuves `observed` : la délégation étend donc la portée sans abaisser le seuil d'achèvement.

Quatre addons optionnels font de la délégation une autonomie pratique. Herdr confie une tâche à un agent dans un volet, sur n'importe quelle machine. Agentkit place une seule commande `ak` au-dessus de tous les agents de codage en terminal, avec autonomie par défaut et possibilité de la désactiver, et exécute des tâches bornées sans interface dans un worktree git. Devcontainer donne à chaque dépôt un conteneur reproductible sans aucune clé SSH à l'intérieur. DeepWorkPlan Vim est un éditeur de terminal doté d'un navigateur de plans et d'un visionneur Markdown. Chacun est épinglé par tag à un produit disposant de son propre dépôt et fonctionne sans Deep Work Plan. Un dépôt est pleinement conforme sans aucun d'eux, et le registre dans `.dwp/config.json` indique lesquels sont activés.

Le mode benchmark et enseignements consigne ce que chaque plan apprend, afin que les constats puissent être analysés ensuite. Un audit de tout l'écosystème, exécuté comme un plan orchestrateur v7 avec un agent par dépôt, n'a relevé aucune régression de comportement par rapport à v6 : la suite du pack passe 807 tests sur 807 dans un environnement propre, et la charge d'instructions a augmenté de 0.1% à 3.9% par flux (4.6% pour l'ensemble du pack), mesurée en octets sur les deux tags plutôt qu'estimée en tokens.

v7 marque une avancée en orchestration et en auditabilité, mais pas encore une autonomie entièrement sans intervention. La boucle de benchmark et d'enseignements ne mesure pas encore automatiquement les plans v7, et la non-infériorité des résultats des agents n'a pas été mesurée. Les plans existants conservent leur génération enregistrée et ne sont jamais migrés implicitement ; les nouveaux plans utilisent le contrat v7 par défaut.

Version installée du skill : **7.1.4**, stable depuis 7.0.0.
