---
title: Ingénierie de boucle
description: "Comment un daemon lancé par un humain mène les plans Deep Work approuvés à terme par enregistrement, succession et notifications dans leur autorité."
order: 8
lang: fr
summary: Le cycle complet qui fait avancer un plan approuvé dans les limites de son autorité enregistrée.
icon: repeat
---

# Ingénierie de boucle

**La spécification d’abord, la boucle fermée : le dépôt est le harness et le plan s’exécute jusqu’au bout.** Ce chapitre décrit le mécanisme facultatif qui fait avancer un plan après son premier tour d’exécution. Le plan reste la spécification durable ; la boucle assure la continuité, sans ajouter d’autorité.

## Enregistrer le plan

Lorsque l’extension Herdr est activée, le flux `execute` du pack revendique l’enregistrement du lead et inscrit une succession. Cet enregistrement précise le plan, le lead actuel, l’époque et l’ordre des successeurs que la boucle observe. Les plans sans enregistrement de lead ne sont pas surveillés. L’extension reste facultative : sans elle, la méthode fonctionne toujours dans une session ou par coordination humaine.

L’enregistrement n’approuve pas le travail et n’élargit pas son autorisation. En v8, un plan approuvé va jusqu’au bout dans les limites consignées dans ce plan. Ses critères d’acceptation et ses gates restent contraignants pendant toute l’exécution.

## Lancer le daemon manuellement

Un humain lance `herdr-peers autopilot --loop` dans un environnement Herdr. C’est un daemon local en arrière-plan, ni un élément de connexion ni un service système. Il surveille les plans enregistrés sur les machines activées et relance un lead inactif quand le plan reste ouvert, qu’aucune lane ne travaille et qu’aucune réponse n’est attendue. Le message est fixe : terminer le plan approuvé en respectant ses gates et l’autorité consignée.

Le daemon ne touche ni aux connexions, ni aux identifiants, ni à l’accusé de réception du mode bypass de Claude. Il ne choisit pas un refus, n’exécute pas de texte libre affiché à l’écran et ne crée pas d’autorisations. Une relance demande seulement à l’agent de continuer ; elle n’ajoute aucune autorité. Le lead continue d’enregistrer les blocages et de respecter les gates. Après trois relances sans progrès, le daemon s’arrête et signale `plan_stalled`.

## Encadrer le leadership

Si le lead a disparu, le daemon demande au premier successeur joignable de suivre la procédure de prise de relais. L’époque de l’enregistrement augmente et les destinataires font respecter l’ordre de succession. Le protocole 2 permet aussi de nommer un lead, mais uniquement après autorisation explicite d’un humain dans le plan ; le daemon ne peut pas s’accorder cette permission. Avant tout merge, tag ou release, le lead actuel exécute `herdr-peers lead verify --plan <id>` pour vérifier l’enregistrement sur les machines du plan.

Un successeur hérite du plan et de ses gates. La succession et la nomination ne modifient pas les critères d’acceptation et n’autorisent aucun travail hors de l’autorité enregistrée. Si le plan atteint un gate qui exige une action humaine selon ses règles C1–C7, la boucle signale le besoin et s’arrête à ce gate. Les identifiants et connexions restent aussi des actions humaines. Pour le reste, l’humain est informé au lieu d’être sollicité à chaque étape.

## Brain et file facultatifs

L’option facultative `--brain` lance un agent de décision dédié pour les cas que les règles du daemon ne tranchent pas. Le brain ne peut choisir que dans une liste fermée d’actions permises par le plan. Le daemon reste le seul acteur : il valide le choix et exécute une action admissible ; il n’exécute jamais le texte libre du brain. Sans autorisation explicite du plan, le brain n’agit pas sur celui-ci.

La file de plans utilise le document `dwp-queue-v1` dans `.dwp/queue.json`. Seul le pack peut l’écrire ; le daemon est un lecteur borné. Un plan devient admissible lorsque sa dépendance `after` est terminée (ou absente) et que son approbation reste valide. Le daemon le démarre uniquement en envoyant un message fixe à son lead déjà enregistré : « Le plan P est le prochain dans la file de ce dépôt et il est approuvé ; exécute-le jusqu’au bout en respectant ses gates. » La boucle ne lance pas les entrées `launch`. Le pack gère l’état de la file pendant l’exécution et la finalisation.

## Signaler et observer

Les événements du plan consignent les états en file, démarré, bloqué, arrêté, perte du lead et terminé. La commande facultative `--notify` reçoit un objet `plan-event-v1` pour les événements pris en charge ; le notificateur Dailybot du pack les transforme en actualités d’équipe. Les notifications signalent un progrès ou un blocage : elles n’autorisent pas une action et ne remplacent pas l’enregistrement du plan.

Le rapport de flotte et `herdr-peers fleet ui` affichent les agents et plans de plusieurs machines, y compris les tâches qui demandent de l’attention. L’interface est en lecture seule : elle n’écrit aucun état de plan et ne relance aucun agent. Elle rend la boucle visible sans devenir un autre plan de contrôle.

## La limite

L’ingénierie de boucle ferme l’exécution autour d’une spécification approuvée. Elle rend habituels la continuité, la succession et les rapports, tandis que le plan reste l’autorité et que le daemon reste limité. L’humain lance le daemon, gère les identifiants et les connexions et ne résout que les gates C1–C7 du plan ou les besoins que l’autorité enregistrée ne peut satisfaire. L’objectif est qu’un plan approuvé atteigne son terme défini sans surveillance humaine constante.
