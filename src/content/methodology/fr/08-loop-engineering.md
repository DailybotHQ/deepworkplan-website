---
title: Loop engineering
description: "Comment un daemon lancé par un humain fait avancer les plans Deep Work approuvés par enregistrement, succession, relances et événements dans leur autorité."
order: 8
lang: fr
summary: Le cycle de vie complet qui fait avancer un plan approuvé dans les limites de son autorité enregistrée.
icon: repeat
---

# Loop engineering

**La spécification d’abord, la boucle fermée : le dépôt est le harness et le plan s’exécute de lui-même jusqu’au bout.** Ce chapitre décrit le mécanisme facultatif qui fait avancer un plan après son premier tour d’exécution. Le plan reste la spécification durable ; la boucle apporte de la continuité, pas une nouvelle autorité.

## Enregistrer le plan

Lorsque l’addon Herdr est activé, le flux `execute` du pack revendique l’enregistrement de lead du plan (et `resume` le revendique de nouveau), en ajoutant une succession lorsque le plan nomme des successeurs ; la reprise automatique ne fonctionne qu’avec une succession enregistrée. Cet enregistrement donne à la boucle un plan précis, le lead actuel, l’époque et l’ordre des successeurs à observer. Les plans sans enregistrement de lead ne sont pas surveillés. L’addon reste facultatif : sans lui, la méthodologie de base fonctionne toujours dans une session ou par une passation coordonnée par un humain.

L’enregistrement du plan n’approuve pas le travail et n’élargit pas l’autorisation du plan. En v8, un plan approuvé va jusqu’au bout dans les limites de l’autorité enregistrée dans ce plan. Ses critères d’acceptation et ses portes restent contraignants pendant toute l’exécution.

## Lancer le daemon à la main

Un humain lance `herdr-peers autopilot --loop` dans un environnement Herdr. C’est un daemon local en arrière-plan, ni un élément d’ouverture de session ni un service système. Il surveille les plans enregistrés sur les machines activées et relance un lead inactif pour qu’il continue lorsque son plan reste ouvert, qu’aucune voie ne travaille et qu’aucune réponse n’est en attente. Le message est fixe : poursuivre le plan approuvé jusqu’au bout en respectant ses portes et l’autorité enregistrée.

Le daemon ne touche ni aux connexions, ni aux demandes d’identifiants, ni à la confirmation du mode de contournement des permissions de Claude. Il ne choisit jamais un refus, une option en texte libre ou une ligne qui élargit les permissions d’un agent. Une relance demande seulement à un agent de continuer ; elle n’ajoute aucune autorité. Le lead continue de consigner les blocages et de suivre les portes du plan. Après trois relances sans progrès, le daemon cesse de relancer et signale `plan_stalled`.

## Encadrer le leadership

Si le lead a disparu, le daemon demande au premier successeur joignable de la liste d’exécuter la procédure de prise de relève. L’enregistrement de lead avance d’une époque, et les destinataires font respecter l’ordre de succession. Le protocole 2 permet aussi la nomination d’un lead, mais uniquement lorsque l’humain a enregistré l’autorisation sur le plan (`lead claim --allow-appointment`) et a lancé le daemon avec `--appoint` ; le daemon ne peut pas s’accorder cette permission lui-même. Avant tout merge, tag ou release, le lead actuel exécute `herdr-peers lead verify --plan <id>` pour vérifier l’enregistrement sur les machines du plan.

Un successeur hérite du plan et de ses portes. Ni la succession ni la nomination ne modifient les critères d’acceptation ou n’autorisent un travail hors de l’autorité enregistrée. Si le plan atteint une porte qui exige une action humaine selon ses règles C1–C7, la boucle signale le besoin et s’arrête à cette porte. Les identifiants et les connexions restent aussi des actions humaines. Pour le reste de l’avancement, l’humain est informé au lieu d’avoir à surveiller chaque étape.

## Cerveau et file facultatifs

L’option facultative `--brain` lance un agent de décision dédié pour les cas que les règles du daemon ne peuvent pas trancher. Elle exige coding-agents-kit 1.3.0 ou ultérieur ; sans lui, un daemon lancé avec `--brain` refuse de démarrer. Le cerveau ne peut choisir que dans une liste fermée d’actions que le daemon fixe pour chaque cas : une relance de plus, une demande fixe unique au lead pour lever un blocage que le plan désigne comme levable par le lead, prévenir l’humain, ou laisser en l’état. Le daemon reste le seul acteur : il valide un choix et exécute une action admissible ; le texte libre du cerveau n’est jamais exécuté. En v8, un plan consigne aussi dans son bloc d’autonomie si un cerveau peut agir sur lui.

La file de plans utilise le document `dwp-queue-v1` dans `.dwp/queue.json`. L’outil de plans l’écrit ; le daemon est un consommateur borné en lecture seule. Un plan en file devient admissible lorsque sa dépendance `after` est terminée (ou absente) et que son approbation reste valide. Le daemon ne le démarre qu’en envoyant un message fixe unique au lead que la file désigne : « Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates. » Une entrée `launch` n’est pas lancée par cette boucle. Le pack tient l’état de la file à mesure que l’exécution et la finalisation avancent.

## Signaler et observer

Les événements de plan couvrent un plan qui s’enlise, se bloque, perd son lead ou se termine, ainsi qu’un plan en file qui démarre ou ne peut pas démarrer. La commande facultative `--notify` reçoit un objet `plan-event-v1` pour les événements pris en charge ; le notificateur Dailybot du pack les transforme en mises à jour pour l’équipe. Les notifications signalent un progrès ou un blocage ; elles n’autorisent aucune action et ne remplacent pas l’enregistrement du plan.

Le rapport de flotte et `herdr-peers fleet ui` affichent les agents et les plans de plusieurs machines, y compris le travail qui demande de l’attention. L’interface est en lecture seule : elle n’écrit aucun état de plan et ne relance aucun agent. Elle aide un humain à voir l’état de la boucle sans devenir un autre plan de contrôle.

## La limite

Le loop engineering ferme la boucle d’exécution autour d’une spécification approuvée. Il rend routiniers la continuation, la succession et les rapports, tandis que le plan reste l’autorité et que le daemon reste borné. L’humain lance le daemon, gère les identifiants et les connexions et ne résout que les portes C1–C7 du plan lui-même ou les autres besoins que l’autorité enregistrée ne peut pas satisfaire. L’objectif de la boucle est qu’un plan approuvé atteigne son terme défini sans qu’un humain ait à le surveiller.
