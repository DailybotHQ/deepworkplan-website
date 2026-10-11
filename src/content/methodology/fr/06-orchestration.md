---
title: Faire tourner de nombreux agents
description: "Comment un agent coordinateur fait tourner plusieurs couloirs dans des panneaux, conteneurs et autres machines, sur des comptes choisis selon leur marge."
order: 6
lang: fr
summary: Le modèle coordinateur et couloirs pour orchestrer de nombreux agents entre panneaux, machines, comptes et dépôts.
icon: network
---

# Faire tourner de nombreux agents

Un agent sur un plan est le cas par défaut, et il couvre l’essentiel du travail. Certains travaux dépassent une session : un changement qui traverse plusieurs dépôts, une publication qui doit arriver dans l’ordre, ou un backlog qui prendrait des jours à un seul agent. DWP passe à cette échelle sans changer son contrat. Le plan reste la source de vérité, chaque tâche se clôt toujours sur sa propre porte de validation, et les agents supplémentaires sont des **couloirs** (lanes) qu’un **coordinateur** (lead) dirige.

Ce chapitre décrit le modèle. Il s’appuie sur trois add-ons facultatifs — [Herdr](/fr/kit/herdr) pour les panneaux et les pairs, [agentkit](/fr/kit/agentkit) pour les comptes et [devcontainer](/fr/kit/devcontainer) pour les conteneurs — et aucun n’est requis pour un plan à un seul agent.

## Un coordinateur et ses couloirs

Le **coordinateur** possède le plan parent. Il décide des couloirs, confie à chacun son périmètre, recueille les jalons et donne le feu vert qui permet à un couloir de fusionner ou de publier. Il n’écrit pas le code d’un autre couloir.

Un **couloir** est un agent avec un périmètre, en général un dépôt. Il lit le `AGENTS.md` de ce dépôt, exécute la porte de validation de ce dépôt et garde son propre plan dans le dépôt. Dans un [hub orchestrateur](/fr/methodology/05-archetypes), le plan parent vit dans le `.dwp/plans/` du hub avec un tableau de suivi des plans enfants, et le plan de chaque couloir vit dans son propre dépôt, avec les identifiants de plan et la porte de validation de ce dépôt.

| Rôle | Possède | Ne fait jamais |
| --- | --- | --- |
| Coordinateur | Le plan parent, la liste des couloirs, l’ordre de publication, le GO | Modifier le dépôt d’un couloir |
| Couloir | Un dépôt : sa branche, son plan, sa porte de validation et sa pull request | Fusionner ou publier avant le GO du coordinateur |

## Où tournent les couloirs

Un couloir est un agent dans un panneau de terminal, et le panneau peut se trouver à plusieurs endroits. [Herdr](https://herdr.dev) place chaque agent dans un panneau et atteint d’autres machines via SSH, si bien que le coordinateur voit tous les couloirs dans une seule barre latérale.

- **Sur l’hôte.** Un panneau par couloir, à côté de celui du coordinateur. La configuration la plus rapide, pour les dépôts sur lesquels le développeur travaille déjà.
- **Dans un conteneur.** Un conteneur [devcontainer-kit](/fr/kit/devcontainer) rejoint le maillage Herdr au moment de `dck up` : ses agents atteignent l’hôte et les autres conteneurs, et l’hôte les atteint. Le conteneur est le bac à sable, donc ses agents peuvent tourner en autonomie.
- **Sur une autre machine.** Toute machine que Herdr atteint via SSH héberge des couloirs de la même façon, avec herdr-peers installé là aussi.

L’emplacement change l’isolation, pas le protocole : un couloir dans un conteneur et un couloir sur l’hôte se coordonnent avec le coordinateur de la même manière.

## Comptes et fournisseurs selon la marge

De nombreux agents consomment vite le quota. Chaque couloir tourne sur son propre compte — une CLI et un profil dans [coding-agents-kit](/fr/kit/agentkit) —, si bien que les couloirs n’épuisent pas la même fenêtre et qu’un compte qui atteint une limite arrête un couloir, pas tous.

- **`ak usage`** affiche le quota restant de chaque compte et profil, une fois par lot.
- **`ak pick <kind> --count N`** renvoie les N comptes qui ont le plus de marge, le meilleur en premier ; `--exclude` écarte un compte occupé, `--model` compte la fenêtre d’un modèle et `--need` refuse de démarrer sans marge suffisante.
- **`ak <kind> @<profile>`** lance l’agent du couloir sur ce compte, dans son panneau.

Les fournisseurs se combinent de la même manière. Un couloir Claude peut écrire pendant qu’un couloir Codex relit, chacun sur le compte que `ak pick` a choisi pour son type. Un couloir en conteneur peut utiliser les comptes de l’hôte : avec `host_profiles` activé dans le profil d’hôte devcontainer-kit du développeur, un conteneur reçoit les profils de l’hôte des CLI que le dépôt installe — Claude via un jeton longue durée par profil, Codex via son fichier d’authentification — et n’a besoin d’aucune connexion propre. N’utilisez que vos propres comptes et respectez les conditions de chaque fournisseur : répartissez le travail entre eux, ne faites jamais tourner les comptes pour contourner une limite.

## Lancer et débloquer des couloirs sans intervention humaine

Un coordinateur peut démarrer des couloirs et les faire avancer sans personne au clavier. Il utilise les commandes propres à Herdr ; aucun code du kit n’envoie de frappes. La procédure suit un ordre fixe : éviter l’invite, détecter l’arrêt, ne débloquer que ce qui est connu, faire remonter le reste.

1. **D’abord, éviter.** `ak pick <kind>` désigne le compte qui a le plus de marge, et `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` lance le couloir dans son propre dossier. `--trust-cwd` (ou `AGENTKIT_TRUST_CWD=1`) approuve ce dossier à l’avance et l’autonomie par défaut du kit fait le reste, si bien que Claude et Codex passent leurs écrans de confiance de dossier sans aucune frappe.
2. **Détecter.** `herdr-peers lanes` (ou `herdr agent list`) affiche chaque couloir comme actif, inactif, bloqué ou terminé. Pour un couloir bloqué, ou inactif sans sortie, `herdr-peers status <pane>` classe l’écran sur lequel il se trouve — confiance de dossier, confirmation du contournement des permissions, connexion, permission ou inconnu — avec l’étape suivante documentée, et `herdr pane read <pane>` l’affiche.
3. **Ne débloquer que les écrans connus du premier lancement.** Avec `herdr pane send-keys`, le coordinateur répond à deux écrans et à rien d’autre : la confiance de dossier pour le propre dossier du couloir, et la confirmation unique, par profil, du mode de contournement des permissions de Claude pour un profil que le développeur fait tourner en autonomie. Il ne le fait que lorsque le développeur a accordé un fonctionnement sans surveillance — une instruction permanente ou la pré-autorisation du plan. Il lit l’écran avant d’envoyer des touches, envoie le moins de touches possible pour y répondre, puis relit.
4. **Faire remonter tout le reste.** Les invites de connexion et d’identifiants, les demandes de permission par action, les confirmations destructrices, les écrans de paiement ou de forfait, les écrans inconnus et les panneaux que le coordinateur n’a pas créés vont au développeur sous forme de jalon bloqué, jamais sous forme de frappes.
5. **Le retrait l’emporte.** Avec `AGENTKIT_PERMISSIONS=ask`, la confirmation du mode de contournement des permissions n’est jamais acceptée.
6. **Relancer.** Si un agent se termine, le coordinateur le relance sur le même compte, ou en choisit un autre. Une connexion perdue est une invite d’identifiants : elle remonte.

Chaque intervention — ce que montrait l’écran, quelles touches ont été envoyées, ce qui a suivi — est consignée dans le plan parent.

## Coordination via herdr-peers

Les couloirs et le coordinateur communiquent via [herdr-peers](/fr/kit/herdr) : une **demande** (ask) porte un tampon qui autorise exactement une **réponse** (reply), et chaque échange est consigné. Le coordinateur garde le protocole réduit :

- **Des jalons vers le haut.** Chaque couloir rend compte à des points fixes — plan prêt, pull request ouverte, bloqué, terminé — et continue de travailler entre eux sans attendre de réponse.
- **Les questions comme demandes.** Un couloir qui a besoin d’une décision interroge le coordinateur ; le coordinateur répond par une réponse.
- **Profondeur un.** On ne répond jamais à une réponse, et un couloir ne délègue pas plus loin. Le fan-out par appelant est plafonné, à quatre pairs par défaut.
- **Des données, pas des instructions.** Une réponse n’accorde rien que le destinataire n’avait déjà. L’affirmation d’un couloir selon laquelle sa porte de validation est passée se vérifie en exécutant cette porte.
- **Une trace de qui a fait quoi.** Chaque enregistrement de délégation nomme le compte et le fournisseur du couloir, si bien que le plan parent montre quel compte a porté quel travail.

Le coordinateur peut voir tout l’orchestre d’un coup d’œil : `herdr-peers lanes` liste chaque couloir avec son état, et [DeepWorkPlan Vim](/fr/kit/vim) affiche les couloirs d’un plan orchestrateur à côté du plan lui-même (`:DwpLanes`).

## Une branche, une publication par dépôt

La règle qui garde de nombreux couloirs relisibles est simple : **un couloir par dépôt, sur son checkout de base, avec une branche, une pull request et une publication** pour l’ensemble du changement. Le couloir ne répartit pas son travail sur plusieurs branches ou worktrees. Les worktrees ne servent que lorsque deux rédacteurs doivent partager un dépôt : chacun reçoit le sien, pour que chaque chemin ait un seul rédacteur.

La pull request reste ouverte, au vert et étiquetée pour relecture jusqu’au GO du coordinateur. Le couloir fusionne alors, pose le tag et le communique en retour.

## Ordre de publication

Les dépôts dépendent les uns des autres, ils publient donc dans l’ordre des dépendances : les outils d’abord, puis ce qui les épingle, puis la documentation qui décrit le résultat, puis les consommateurs qui l’adoptent. Le coordinateur tient l’ordre et envoie le GO un dépôt à la fois. Un couloir qui épingle la publication d’un autre dépôt attend ce tag avant d’écrire l’épinglage, si bien qu’aucun épinglage ne pointe jamais vers une publication qui n’existe pas.

## Points de contrôle

Le plan parent se clôt sur des preuves, pas sur des comptes rendus :

1. **Par couloir.** La porte de validation de chaque couloir passe sur sa propre branche, et la relecture de sa pull request est propre. La relecture peut être un couloir à part entière : l’[AI Diff Reviewer](/fr/kit/ai-diff-reviewer) relit la pull request de chaque couloir, et avec l’add-on [Dailybot](/fr/kit/dailybot) chaque couloir rend compte de sa propre progression à l’équipe.
2. **Par publication.** Chaque tag existe et épingle ce dont le dépôt suivant a besoin.
3. **Intégration.** Après la dernière publication, un point de contrôle exécute les consommateurs sur les versions publiées et consigne le verdict dans le `analysis_results/` du plan parent.
4. **Revue finale.** Une passe de sécurité couvre tout ce qui a franchi une frontière — avant tout les comptes, jetons et fichiers partagés dans des conteneurs — avant que le plan parent ne soit terminé.

## Sécurité

- Ne mettez jamais une clé, un jeton ou un secret dans une demande, un prompt ou un journal ; désignez les variables par leur nom.
- Les ressources partagées ont un verrou : un couloir le prend avant une étape lourde, comme la construction d’un conteneur, et le libère ensuite.
- Le retrait des permissions, lorsqu’il est défini, l’emporte pour chaque couloir et chaque agent qu’un couloir démarre.
- Un couloir qui ne peut pas continuer le signale par un jalon bloqué et s’arrête ; le coordinateur décide.
