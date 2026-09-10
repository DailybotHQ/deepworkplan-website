---
title: "Questions fréquentes — Deep Work Plan"
description: "Réponses aux questions fréquentes sur Deep Work Plan : son rôle, les portes de validation et la reprise, la comparaison avec d’autres outils, l’adoption."
lastUpdated: 2026-09-10
---

## Questions fréquentes

Des réponses courtes aux questions les plus posées sur Deep Work Plan, chacune avec un lien vers la page qui va plus loin.

## Ce qu’est Deep Work Plan

### Que fait concrètement Deep Work Plan ?

Deep Work Plan transforme un dépôt en un environnement structuré où un agent de code peut exécuter un travail long avec fiabilité. Il s’installe comme un skill d’agent, intègre le dépôt une seule fois (un index `AGENTS.md`, une arborescence `docs/`, un kit `.agents/` de skills et de commandes, une zone de sortie `.dwp/` ignorée par git), et dès lors tout objectif devient un plan : des tâches atomiques, chacune dotée de critères d’acceptation et d’une porte de validation, exécutées une à une, commitées à mesure qu’elles passent, et que n’importe quel agent peut reprendre depuis le disque. Le plan se clôt par un Final Review qui audite la sécurité et valide l’état final. La méthodologie est sous licence MIT et fonctionne avec tout agent de code qui lit un dépôt.

[Lire la méthodologie](https://deepworkplan.com/fr/methodology)

### À qui s’adresse-t-il ?

Aux développeurs et aux équipes qui confient un vrai travail en plusieurs étapes à des agents de code et veulent qu’il aboutisse. La méthodologie convient quand une tâche dépasse une session, une famille de fichiers ou un agent ; quand un coéquipier doit pouvoir reprendre là où un agent s’est arrêté ; ou quand « terminé » doit signifier « validé », et non « l’agent le dit ». Une correction d’une ligne n’a pas besoin d’un plan, et la méthodologie le dit : sa règle de rigueur proportionnelle recommande plutôt un objectif, des critères et une porte énoncés directement.

[Démarrage rapide](https://deepworkplan.com/fr/quickstart)

### Est-ce un outil, un framework ou une méthodologie ?

Une méthodologie empaquetée sous la forme d’un skill installable. Il n’y a ni serveur, ni compte, ni format propriétaire, ni runtime au-delà de l’agent de code que vous utilisez déjà. Ce qui s’installe, ce sont des instructions que l’agent lit, un petit ensemble de scripts shell pour la détection du contexte et la vérification de conformité, et les conventions que votre dépôt adopte. Tout ce que le plan produit est du Markdown et du JSON dans votre dépôt, lisibles sans aucun outil.

[Lire la spécification](https://deepworkplan.com/fr/spec)

### Avec quels agents de code fonctionne-t-il ?

Tout agent qui lit les fichiers d’un dépôt. Le skill suit le standard ouvert Agent Skills et la convention `AGENTS.md`, donc Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot et d’autres le prennent en charge via leur chargement habituel des skills et des instructions. L’évaluation propre à la méthodologie montre un plan démarré par l’agent d’un éditeur et repris par celui d’un autre, dans les deux sens. La couverture d’installation et les preuves comportementales sont listées par agent dans la matrice de compatibilité, et les deux ne sont jamais confondues.

[Parcourir le kit](https://deepworkplan.com/fr/kit)

## Comment se déroule un plan

### Comment les portes de validation sont-elles mises en œuvre ? Exigent-elles une validation humaine ?

Ce sont des assertions exécutables que l’agent lance lui-même. La validation humaine encadre l’exécution : une personne approuve le plan avant l’exécution et relit le diff final au moment de la pull request ; l’exécution entre les deux est autonome. Chaque tâche nomme des commandes concrètes, en général la porte qualité du dépôt lui-même, choisies depuis la surface touchée par la tâche : les tests du comportement modifié et de ses consommateurs, s’élargissant à la suite complète quand le changement est partagé ou ne peut pas être borné. Une tâche n’est marquée terminée que lorsque ces commandes sortent avec succès, et les tâches qui changent un comportement doivent étendre les tests. En cas d’échec, la tâche est marquée bloquée et l’agent s’arrête.

[La boucle centrale](https://deepworkplan.com/fr/methodology/02-core-loop)

### Comment le plan évite-t-il de devenir obsolète quand le code change entre deux exécutions ?

Sur trois fronts. Les tâches sont écrites comme des comportements, non comme des éditions : un critère d’acceptation dit ce que le système doit faire, donc un fichier renommé ou une implémentation remplacée ne l’invalide pas. Chaque porte se rejoue contre le dépôt tel qu’il est maintenant, donc une hypothèse cassée échoue bruyamment à l’exécution suivante au lieu de dériver en silence, et cet échec est le signal pour raffiner. Et maintenir la documentation synchronisée fait partie du travail : une tâche qui change un comportement met aussi à jour les documentations et le kit orientés agents qui le décrivent, à l’intérieur de sa propre porte. Chaque exécution devrait laisser le dépôt plus prêt pour les agents qu’elle ne l’a trouvé.

[Lire la méthodologie](https://deepworkplan.com/fr/methodology)

### Puis-je modifier le plan en cours d’exécution sans perdre le travail accompli ?

Oui ; raffiner un plan partiellement exécuté est un geste de premier ordre. Les définitions des tâches et l’état d’exécution sont gardés séparés : le plan est une liste de contrôle sur disque plus un petit fichier d’état, donc ce qui est fait reste consigné indépendamment du texte des tâches. Quand une tâche s’avère fausse, l’agent la marque bloquée et s’arrête au lieu de forcer le passage. Vous éditez alors, réordonnez, découpez ou abandonnez les tâches non exécutées, tandis que les tâches accomplies restent accomplies. La reprise reconstruit l’état depuis le disque et le dépôt réel, puis rejoue les portes qui comptent, pour que rien de ce qui a bougé en dessous ne passe inaperçu.

[La boucle centrale](https://deepworkplan.com/fr/methodology/02-core-loop)

### Vérifie-t-il continuellement le travail par rapport au plan, ou le plan est-il seulement posé au départ ?

Le plan est un contrôle continu. L’agent travaille une petite tâche à la fois et doit valider avant de passer à la suivante, donc il peut s’égarer d’un pas, pas de trois. Chaque tâche porte des critères d’acceptation plus les commandes exactes qui les prouvent, et la progression s’écrit dans le dépôt au fur et à mesure, avec un statut par tâche, pour que la dérive devienne visible pour vous, pour la session suivante et pour l’agent suivant. Un plan n’est pas terminé tant que tout ne valide pas, Final Review compris. La réserve honnête : la méthodologie ne peut pas empêcher un agent d’écrire d’emblée un critère d’acceptation faible ; elle rend la dérive bruyante au lieu de silencieuse.

[La boucle centrale](https://deepworkplan.com/fr/methodology/02-core-loop)

### Le plan est-il généré une fois puis maintenu à la main, ou évolue-t-il avec le code ?

Ni l’un ni l’autre. Il est généré une fois à partir d’un objectif, puis maintenu comme partie du travail. Le plan n’est délibérément pas réécrit depuis les diffs de code, parce qu’une spécification qui court après le code devient un miroir en retard — précisément la dérive que la méthodologie existe pour tuer. Il évolue à dessein : les portes se rejouent contre le dépôt actuel, une porte qui échoue déclenche un raffinement, et l’agent effectue ce raffinement pendant l’exécution tandis que vous approuvez au départ et relisez à la fin. Documentation et tests évoluent avec le code par construction, parce que leur mise à jour est à l’intérieur de la porte de chaque tâche.

[Lire la méthodologie](https://deepworkplan.com/fr/methodology)

### Que se passe-t-il si la session s’interrompt en cours de route ?

La progression vit sur le disque, pas dans la conversation. Les cases à cocher du README, le journal de chaque tâche, un index de travail borné et un fichier d’état lisible par machine sont mis à jour à chaque frontière de tâche, et le fichier d’état enregistre un point de contrôle avant toute pause prévue. Une session neuve, ou un agent différent, lit cet index compact, le réconcilie avec le dépôt et l’historique git, puis poursuit à la première tâche incomplète sans refaire le travail terminé. Même une création de plan interrompue est récupérable : l’identité du plan et sa liste de tâches prévues sont écrites avant tout fichier de tâche, pour qu’un plan à moitié créé puisse être achevé ou écarté plutôt qu’imaginé.

[La boucle centrale](https://deepworkplan.com/fr/methodology/02-core-loop)

### Qu’est-ce que le Final Review ?

L’unique tâche de clôture obligatoire de chaque plan. Dans l’ordre : une passe de sécurité sur l’ensemble complet des changements accumulés du plan, y compris une revue locale obligatoire du diff par le skill AI Diff Reviewer, les constats critiques bloquant l’achèvement jusqu’à correction ou acceptation explicite ; la validation de l’état final, c’est-à-dire les suites complètes applicables de tests, de lint, de vérification de types et de formatage du dépôt sur le code final ; et une réconciliation des décisions de skills que chaque tâche a consignées. L’agent rend ensuite compte des livrables, des preuves et des limites, et propose une fois un Rapport Exécutif, en le générant seulement si vous le demandez.

[La spécification](https://deepworkplan.com/fr/spec/dwp-specification)

## Comment il se compare

### En quoi diffère-t-il des outils pilotés par la spécification comme Spec Kit, OpenSpec ou Kiro ?

Ils résolvent des problèmes adjacents. Les outils pilotés par la spécification excellent à capturer ce qui doit changer : spécifications, exigences et propositions de changement sous une forme répétable. Deep Work Plan concerne la façon dont un agent exécute pendant des heures sans dériver : le harness intégré au dépôt, des portes de validation par tâche choisies depuis la surface touchée, un état reprenable sur disque, un Final Review obligatoire avec une passe de sécurité, et un vérificateur de conformité pour le dépôt lui-même. Les deux se combinent, une spécification ou une proposition de changement pouvant alimenter un plan. La page de comparaison pose les capacités côte à côte, selon les termes propres à chaque outil.

[Voir la comparaison](https://deepworkplan.com/fr/compare)

### En quoi diffère-t-il des frameworks de workflow d’agents comme BMAD, Superpowers ou Get Shit Done ?

Ces frameworks apportent des styles de travail solides : des rôles, des principes, des étapes test-first, des habitudes de vérification. Deep Work Plan se concentre sur ce qui reste dans le dépôt et sur ce qui peut être vérifié : un harness que tout agent lit à froid, des fichiers de tâche avec critères d’acceptation et portes, un état qui survit à une session, un vérificateur de conformité avec un code de sortie adapté à la CI, et une mesure publiée du nombre d’octets d’instructions chargés par chaque flux. La méthodologie est indépendante de l’outil par construction et n’ajoute aucun service, fournisseur ni secret à la boucle centrale. La page de comparaison montre où chaque approche est intégrée, optionnelle ou hors périmètre.

[Voir la comparaison](https://deepworkplan.com/fr/compare)

### Pourquoi ne pas simplement utiliser le mode de planification intégré de mon agent ?

Les modes de planification intégrés sont utiles, et Deep Work Plan s’appuie sur le même substrat : la convention `AGENTS.md` et le standard ouvert Agent Skills. La différence est l’endroit où vit le plan et ce qui le fait respecter. Les plans natifs vivent en général hors du dépôt et expirent avec la session ; Deep Work Plan écrit le plan, son état et ses preuves dans le dépôt, pour qu’un autre agent ou un coéquipier puisse le poursuivre, et chaque tâche porte une porte exécutable et un journal consigné. Vous continuez d’utiliser le mode de planification de votre agent pour réfléchir ; la méthodologie ajoute la boucle d’exécution durable et vérifiable.

[Voir la comparaison](https://deepworkplan.com/fr/compare)

## L’adopter

### Qu’est-ce que l’onboarding écrit dans mon dépôt, et touche-t-il aux fichiers existants ?

L’onboarding est non destructif : il détecte un `AGENTS.md`, `docs/`, `.agents/` ou `CLAUDE.md` existant, réconcilie au lieu d’écraser, et demande avant de remplacer quoi que ce soit. Il écrit l’index `AGENTS.md` avec de vraies commandes, une arborescence `docs/` raisonnée, des documentations par module, le kit `.agents/` avec ses commandes `dwp-*` légères, une zone de sortie `.dwp/` ignorée par git, une carte des tests vérifiée, et la revue locale de code requise (le skill AI Diff Reviewer plus une extension de revue adaptée au dépôt). Il lance ensuite un autocontrôle et le vérificateur de conformité, pour que vous voyiez ce qui a été produit. Un dépôt intégré sous une version antérieure reçoit une mise à niveau ciblée qui ne change que ce qui manque.

[L’endpoint d’adoption](https://deepworkplan.com/fr/init)

### Combien cela coûte-t-il, et comment l’efficacité est-elle mesurée ?

La méthodologie et le skill sont sous licence MIT et gratuits ; il n’y a ni service, ni clé d’API, ni télémétrie dans les flux centraux. L’efficacité est rapportée comme le nombre d’octets d’instructions chargés par chaque flux, mesuré par un script livré avec le skill et publié dans un registre d’évaluation, les hausses étant rapportées aussi platement que les baisses. Elle n’est pas rapportée en pourcentages de tokens ni en économies de coût, parce qu’un inventaire d’octets n’établit pas ces choses ; une évaluation publique préenregistrée est prévue pour mesurer correctement les résultats.

[Confiance et divulgation](https://deepworkplan.com/fr/trust)

## Encore une question ?

Ouvrez une discussion ou une issue sur GitHub. Les questions qui reviennent souvent sont ajoutées à cette page.

[Poser une question sur GitHub](https://github.com/DailybotHQ/deepworkplan-website/discussions)
