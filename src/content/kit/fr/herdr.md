---
title: Herdr
description: "Confiez une tâche à un autre agent de code dans un panneau Herdr, sur toute machine, et récupérez une seule réponse autorisée. Des plans qui délèguent, tracés."
kind: addon
lang: fr
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) place des agents de code dans des panneaux, sur votre machine et sur les machines qu’il atteint via SSH. Cet addon permet à un Deep Work Plan d’utiliser ces agents comme **pairs** : un plan peut confier une tâche délimitée à un agent situé dans un autre panneau, recevoir exactement une réponse autorisée et conserver une trace de l’échange.

C’est un addon facultatif de **DWP v7** (`v7.0.0`). La méthodologie fonctionne de la même manière sans lui : si l’addon est absent ou désactivé, chaque tâche s’exécute dans la session courante, exactement comme avant.

## Ce qu’il intègre

L’addon est un intégrateur léger. Le travail est effectué par **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, une skill autonome sous licence MIT, épinglée à **`v0.3.2`**, utile même sans Deep Work Plan. Elle définit ce que Herdr laisse lui-même ouvert : qui peut répondre, comment la réponse retrouve son chemin d’une machine à l’autre, comment deux agents évitent de se répondre indéfiniment, et où se trouve la trace de « j’ai demandé, il a répondu ».

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/herdr-peers`, tag `v0.3.2`, protocole 1 |
| Clé de registre | `herdr` dans `.dwp/config.json` |
| Transport | interactif : un pair dans un panneau Herdr |
| Fournit | `subagents`, `cancel_children` |
| Requiert | l’octroi `agent_delegation` du contrat du plan |

## Installation

Installez herdr-peers ainsi que la skill officielle de Herdr, dont il dépend. Chaque machine dont les agents doivent répondre a également besoin de la skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.3.2 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Prérequis : Herdr 0.9.1 ou ultérieur, `bash`, et `python3` 3.9 ou ultérieur (bibliothèque standard uniquement). L’onboarding propose l’addon et consigne votre réponse dans le registre des addons ; il n’est jamais activé sans consentement.

## Ce qu’il ajoute à un plan

- **Délégation à un pair.** Sur un plan v7 dont le contrat octroie `agent_delegation`, `execute` peut confier une tâche `parallel_safe`, ou une question en lecture seule, à un agent situé dans un autre panneau, sur cette machine ou sur une autre.
- **Une réponse autorisée.** La requête porte une estampille qui autorise exactement une réponse. Le pair répond une fois via le helper, et la réponse porte sa propre estampille.
- **Une trace avant de s’y fier.** Chaque délégation est écrite dans le fichier `analysis_results/delegations.ndjson` du plan avant que la réponse soit utilisée, et correspond à l’événement de journal `delegation` de v7.
- **Les résultats restent des affirmations jusqu’à vérification.** La réponse d’un pair est une preuve `asserted` tant que l’exécuteur de portes du plan lui-même ne l’a pas observée. Elle ne clôt jamais une tâche à elle seule.

## Modèle de sécurité

| Règle | Ce que cela signifie |
|---|---|
| L’octroi d’abord | La délégation ne s’exécute que si le contrat du plan octroie `agent_delegation`. |
| Profondeur limitée à 1 | Un message estampillé `depth=1` ou `reply-to=` ne reçoit jamais de réponse, et un délégué ne délègue jamais. |
| Plafond de fan-out | Au plus quatre pairs par appelant par défaut. |
| Des données, pas des instructions | Une réponse n’accorde jamais une autorité que le destinataire n’avait pas déjà. |
| Un seul rédacteur par chemin | Un pair qui écrit travaille dans son propre worktree git. |

herdr-peers n’authentifie pas l’expéditeur : le champ `from=` d’une estampille est une affirmation. La mesure d’atténuation est la liste d’autorisation `HERDR_PEERS_SCOPE`, qui limite les espaces de travail et les machines qu’un pair accepte.

## Les conteneurs et l’hôte

Avec l’addon [devcontainer](/kit/devcontainer) sur devcontainer-kit `v0.3.7`, chaque conteneur dck embarque herdr-peers et rejoint le maillage lors de `dck up` : ses agents peuvent interroger les agents de l’hôte, des autres conteneurs et des autres conteneurs loopback de l’hôte, et recevoir la réponse en retour. `dck setup` installe un herdr-peers vérifié sur l’hôte, si bien que les agents de l’hôte répondent aussi. Le listener d’hôte et les clés supplémentaires qui laissent entrer d’autres conteneurs relèvent de vos décisions dans le profil d’hôte du kit ; cet addon ne les définit jamais. Depuis herdr-peers (`v0.2.3`), chaque machine conserve son propre état (`$XDG_STATE_HOME/herdr-peers/<server>/`), si bien qu’un checkout partagé par l’hôte et un conteneur ne mélange plus leurs enregistrements, et depuis devcontainer-kit (`v0.3.3`), le conteneur exporte lui-même `HERDR_PEERS_SELF`, si bien que les agents Codex à l’intérieur atteignent d’autres machines sans aucune étape manuelle.

## Herdr ou agentkit

Les deux addons implémentent la même interface de délégation — `launch`, `observe`, `collect`, `cancel` — avec des transports différents.

| Situation | Utiliser |
|---|---|
| Une tâche `parallel_safe` délimitée avec une sortie déclarée | [agentkit](/kit/agentkit) (`ak run` headless dans un worktree) |
| La tâche nécessite une interaction, dure longtemps ou se trouve sur une autre machine | Herdr (un pair dans un panneau) |

Pour un coordinateur qui fait tourner de nombreux couloirs à la fois — des panneaux sur l’hôte, dans des conteneurs et sur d’autres machines, chacun sur son propre compte —, `herdr-peers lanes` liste chaque couloir avec son état, `herdr-peers status <pane>` classe l’écran sur lequel se trouve un couloir bloqué, et chaque enregistrement de délégation nomme le compte et le fournisseur qui l’ont porté. Voir [Faire tourner de nombreux agents](/methodology/06-orchestration).

**Les lanes Codex nomment leur panneau.** Codex exécute les commandes d’une lane depuis un serveur d’arrière-plan partagé par toutes les sessions de ce compte : l’identifiant de panneau hérité peut donc appartenir à une autre lane. Une lane Codex passe son propre panneau, indiqué dans la consigne du lead, avec `--pane <pane>` sur chaque verbe de herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Notifications et leadership

herdr-peers `v0.3.2` ajoute ce qui permet à un essaim de survivre à son coordinateur ([Autonomie de l’essaim](/fr/methodology/07-swarm-autonomy)) :

- **Notifications.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` envoie un message à sens unique estampillé `reply=no`. Le `check` du destinataire le classe comme notification, le consigne comme donnée et n’y répond jamais. Les notifications ne consomment aucun emplacement de fan-out et peuvent être envoyées pendant qu’une demande est ouverte ; utilisez-les pour les annonces de passation, les changements de coordinateur et les diffusions de publication.
- **Un enregistrement de coordinateur par plan.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` fait d’un agent le coordinateur d’un plan ; `lead show` affiche l’enregistrement (schéma `herdr-peers/lead-v1` : plan, coordinateur, époque, succession, couloirs, heure de mise à jour). `lead handover <addr> --plan <P>` transmet le leadership, `lead takeover --plan <P>` permet au premier suppléant joignable de le prendre lorsque le coordinateur a disparu, et `lead release --plan <P>` y met fin. Chaque changement incrémente l’époque et notifie chaque couloir. Revendiquez le plan avant de lancer ses couloirs : `lead` ne se résout qu’une fois un enregistrement créé. Depuis `v0.3.2`, l’enregistrement conserve localement le dépôt qui revendique et refuse une revendication du même identifiant de plan venant d’un autre dépôt ; nommez ce plan `--plan <repo>/<id>`.
- **Isolation par époque (fencing).** Un couloir n’accepte une notification de coordinateur que de l’agent qui lui a donné sa consigne (première revendication), du coordinateur actuel à l’époque suivante (transmission) ou de la première entrée joignable de la succession à l’époque suivante (reprise). Tout le reste est consigné et ignoré, et un coordinateur qui revient et voit une époque supérieure se retire.
- **L’adresse `lead`.** `ask lead …` et `notify lead …` se résolvent vers le coordinateur actuel de `--plan` (sinon `$DWP_PLAN`), si bien qu’aucune consigne de couloir ne code en dur le panneau du coordinateur.
- **Écrans `usage_limit`.** `status` et `lanes` reconnaissent le message de limite d’utilisation d’une CLI comme la classe d’écran `usage_limit`, dont l’étape suivante est une passation. Aucune touche n’y est jamais envoyée. `lanes --json` ajoute le plan, son coordinateur, l’époque et la dernière capacité signalée de chaque couloir.

Les couloirs peuvent aussi s’interroger entre eux pour obtenir des informations et se coordonner — une interface, un nom d’option, l’état d’une branche —, mais seul le coordinateur attribue le travail. La profondeur 1 et le plafond de fan-out s’appliquent toujours. Avec `v0.2.x`, il n’y a ni notifications ni enregistrements de coordinateur : les couloirs interrogent l’adresse du coordinateur indiquée dans leur consigne, et un changement de coordinateur est relayé par le développeur.

## Notes

Facultatif et jamais requis. Un dépôt est pleinement conforme avec zéro addon optionnel, et aucun flux ne dépend de celui-ci. L’aller-retour entre deux panneaux et entre machines est couvert par des tests contre un Herdr simulé ; prévoyez une première exécution supervisée.
