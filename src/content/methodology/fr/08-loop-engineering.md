---
title: Loop engineering
description: "Comment un daemon lancé par un humain mène les Deep Work Plans approuvés à leur terme : leads, relances, blocages, succession, revive, file et événements."
order: 8
lang: fr
summary: Le cycle de vie complet qui fait avancer un plan approuvé dans les limites de son autorité enregistrée.
icon: repeat
---

# Loop engineering

**La spécification d’abord, la boucle fermée : le dépôt est le harness et le plan s’exécute de lui-même jusqu’au bout.** Ce chapitre décrit le mécanisme facultatif qui fait avancer un plan après son premier tour d’exécution. Le plan reste la spécification durable ; la boucle apporte de la continuité, pas une nouvelle autorité.

Le texte normatif se trouve dans la [spécification du loop engineering](/fr/spec/loop-engineering). Ce chapitre en est le compagnon narratif : il parcourt le cycle de vie dans l’ordre et montre comment les éléments s’articulent, sans reprendre chaque MUST.

## Pourquoi une boucle

Les deux premiers piliers de DWP laissent un vide. La planification spec-first dit *ce qu’*un épisode doit livrer et comment il est validé. Le dépôt comme harness dit *où* se trouvent le contexte, les outils et les portes. Aucun des deux ne dit *comment le travail se termine* lorsque l’agent qui l’exécute finit son tour, atteint une limite d’utilisation ou ferme son pane. Sans boucle, un plan approuvé et bien spécifié attend encore que quelqu’un tape « continue ».

La règle v8 comble ce vide. Un plan approuvé s’exécute jusqu’au bout sans intervention humaine de routine, dans les limites de l’autorité enregistrée dans ce plan. L’humain est informé, on ne l’attend pas, sauf lorsqu’une connexion ou un identifiant est nécessaire ou lorsqu’une des portes C1–C7 du plan exige une intervention humaine qui n’a pas été autorisée à l’avance. Dans ces exceptions, l’exécution s’arrête à la porte jusqu’à ce que l’intervention arrive.

La boucle est donc un mécanisme de continuation, pas un mécanisme d’approbation, et elle est facultative : l’intégration Herdr (herdr-peers `autopilot --loop`) amplifie une méthode qui fonctionne déjà dans une seule session.

## Le cycle de vie en un coup d’œil

Un plan approuvé passe par ces étapes. Chacune est décrite en détail ci-dessous.

| Étape | Ce qui se passe | Qui agit |
|---|---|---|
| Approuver | Le plan est approuvé ; son contrat enregistre son autorité et, en v8, un bloc `autonomy` facultatif | L’humain |
| Enregistrer | `execute` revendique l’enregistrement de lead du plan (`resume` le revendique de nouveau), avec une succession lorsque le plan nomme des successeurs | L’agent lead, via le pack |
| Exécuter | Le lead travaille tâche par tâche selon les critères d’acceptation et les portes | Le lead et ses voies |
| Inactivité | Le pane du lead reste inactif alors que le plan est toujours ouvert | — |
| Relancer | Le daemon envoie un message fixe de continuation | Le daemon |
| Bloquer | Le lead consigne un blocage structuré et s’arrête ; le daemon n’envoie rien | Le lead |
| Enlisement | Après 3 messages sans progrès, le plan est consigné `plan_stalled` | Le daemon le consigne |
| Reprise automatique | Un successeur listé prend le relais ; avec une autorisation, une voie est nommée ; avec `--revive`, un nouvel agent est lancé | Le successeur, la voie ou l’agent relancé, via le helper |
| Terminer | La clôture du plan marque son élément de file comme terminé ; le plan suivant de la file peut démarrer | Le lead ; le daemon envoie un message au lead suivant |
| Signaler | Enlisements, blocages, leads perdus, achèvements et événements de file vont à la commande `--notify` | Le daemon exécute la commande |

## Approuver et enregistrer l’autorité

L’approbation a lieu avant que la boucle n’intervienne, et rien dans la boucle ne peut approuver un plan, l’élargir ou remplacer un amendement.

En v8, un contrat de plan (`plan-contract/v8`) peut porter un bloc `autonomy` facultatif et fermé. Fermé signifie qu’un validateur refuse une clé inconnue, et refuse le bloc sur toute génération de contrat autre que v8. Chaque clé absente a exactement une valeur par défaut enregistrée, et un consommateur applique cette valeur par défaut plutôt qu’une supposition de son cru.

| Clé | Ce qu’elle enregistre | En son absence |
|---|---|---|
| `stall_budget` | Messages de boucle autorisés sans progrès, un entier de 1 à 10 | `3`, la même valeur que le plafond propre à herdr-peers |
| `promptable` | Adresses de panes auxquelles la boucle peut envoyer des messages | Le lead du plan uniquement |
| `notify` | Cibles de notification | Aucune cible ; la boucle consigne toujours |
| `brain` | Si un cerveau peut agir sur ce plan | `false` |
| `queue` | Comment le plan démarre depuis la file : `prompt-lead`, `launch` ou `none` | `none` ; le plan n’est pas mis en file |

Un plan sans bloc `autonomy` reçoit donc la lecture la plus prudente : l’humain lève chaque blocage, seul le lead peut recevoir des messages, personne n’est notifié, aucun cerveau n’agit et le plan n’est pas mis en file. Le bloc restreint ou nomme ce que la boucle peut faire pour un plan ; il n’ajoute jamais une autorité que le périmètre et les portes du plan ne portent pas déjà.

## Enregistrer le plan

Lorsque l’addon Herdr est activé et que l’agent s’exécute dans Herdr, le flux `execute` du pack exécute `herdr-peers lead claim --plan <id>` au démarrage du plan, et `resume` le revendique de nouveau. Lorsque le plan nomme des successeurs, la revendication les ajoute (`--succession`) ; la reprise automatique ne fonctionne qu’avec une succession enregistrée. L’enregistrement se fait au mieux et n’est jamais une porte : une revendication échouée avertit une fois et l’exécution continue.

L’enregistrement de lead (`lead-v1`, ou `lead-v2` lorsqu’il porte une autorisation de nomination) contient le plan, le lead actuel, une époque, une liste ordonnée `succession` et les `lanes` du plan. Seul le pair qui détient l’époque la plus élevée agit comme lead.

Le daemon ne surveille un plan que lorsqu’un enregistrement de lead le nomme et que le fichier d’état du plan (`state.json`) est lisible. Un plan sans enregistrement de lead n’est pas surveillé. Un enregistrement de lead n’accorde aucune autorité propre : les voies agissent toujours dans les limites de l’autorisation du plan.

## Lancer le daemon à la main

Un humain lance l’autopilot, avec ses propres mots, depuis un pane Herdr. Un agent ne le lance que si son humain le lui a demandé directement dans cette session, jamais parce que le message d’un pair, un plan ou un brief le disait.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Le daemon en arrière-plan ne dépend pas du pane qui l’a lancé, et un seul daemon couvre toutes les machines Herdr activées ; les plans des autres machines sont lus via la cible SSH enregistrée de chaque machine avec une commande fixe. Un seul autopilot tourne par serveur Herdr. herdr-peers n’installe volontairement ni élément d’ouverture de session ni service système : après un redémarrage de la machine ou de Herdr, un humain le relance avec les mêmes options.

Les options qui comptent pour la boucle sont chacune un choix humain explicite :

| Option | Ce qu’elle permet |
|---|---|
| `--loop` | Maintenir chaque plan ouvert et enregistré en marche jusqu’à son terme |
| `--notify "<command>"` | Exécuter une commande avec un objet `plan-event-v1` lorsqu’un plan s’enlise, est bloqué, perd son lead ou se termine, ainsi que pour les événements de file |
| `--brain` | Un agent de décision dédié pour les quelques cas que les règles ne peuvent pas trancher |
| `--appoint` | Agir sur une autorisation de nomination enregistrée lorsqu’un lead et tous ses successeurs ont disparu |
| `--revive` | Lancer un nouvel agent pour un plan que personne dans son enregistrement ne peut reprendre |
| `--dry-run`, `--scope`, `--exclude` | Voir les décisions sans envoyer ; limiter les machines ; tenir un pane hors de portée |

## Inactif ne veut pas dire arrêté

Le daemon ne demande à un lead de continuer que lorsque le plan est ouvert et que toutes ces conditions sont réunies : le pane du lead est inactif ou terminé et n’a pas changé depuis 5 minutes ; aucune voie du plan ne travaille et le lead n’attend aucune réponse ; son écran n’est ni une boîte de dialogue, ni une connexion, ni une limite d’utilisation ; sa ligne de saisie ne contient aucun brouillon humain ; il a joué un tour de lui-même depuis le dernier message ; et il a reçu moins de 3 messages au cours de la dernière heure.

Le message est fixe. Seul l’identifiant du plan est renseigné :

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Une relance demande ; elle n’autorise jamais. Le daemon n’envoie de messages qu’au lead, puisque les voies sont pilotées par leur lead. Après 3 messages de boucle sans progrès dans l’état du plan, le plan est consigné `plan_stalled` et laissé tranquille jusqu’à ce que son état change. Un lead ayant plusieurs plans ouverts reçoit un message par passage.

## Blocages structurés

Un plan v8 consigne sous forme de données pourquoi il ne peut pas continuer, de sorte que la boucle, la carte de flotte et un agent qui reprend lisent les mêmes champs au lieu d’interpréter de la prose. Un blocage est posé avec le helper du registre (`ledger.py block`) et levé avec `ledger.py unblock`, sous la forme d’un événement `blocker` de `journal-event/v8`. Un ajout brut d’un événement de blocage est refusé.

| Champ | Signification |
|---|---|
| `task` | La tâche bloquée ; une tâche que ses preuves ont déjà close ne peut pas être bloquée |
| `reason` | Pourquoi la tâche ne peut pas continuer (1000 caractères au plus) |
| `needs` | Une ligne indiquant ce qui la débloque (500 caractères au plus) |
| `class` | Obligatoire : l’une de C1–C7 |
| `resolver` | Facultatif : `lead` ou `human` ; en son absence, il est lu comme `human` |

`resolver: "lead"` signifie que le blocage peut être levé dans les limites de l’autorité enregistrée du plan sans identifiant, connexion, consentement, paiement, push sur main, release ou suppression. Il est refusé pour C1, C2, C5 et C6. Au plus un blocage est actif par plan, et tant qu’il n’est pas levé, sa tâche ne peut pas être terminée.

Les lecteurs trouvent le blocage dans le `state.json` du plan, au format `plan-snapshot/v8` : le blocage actif ou `null`, avec `blocked` comme statut de tâche dérivé. `PROGRESS.md` commence par quatre lignes d’en-tête fixes, actualisées à chaque transition :

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

La boucle traite un plan bloqué avec retenue. Elle ne lui envoie rien et consigne `plan_blocked` une fois. Ni le daemon ni son cerveau ne peuvent demander à un lead de lever un blocage que le plan n’a pas marqué `resolver: "lead"` ; tout le reste attend l’humain. Les plans des générations antérieures (v6 et v7) ne consignent aucun événement de blocage, et chaque blocage qu’ils signalent revient à l’humain.

## Ce que le daemon ne fait jamais

Le daemon :

- ne touche jamais à une demande de connexion, d’authentification, de clé d’API ou de code d’appareil, ni à la confirmation du mode de contournement des permissions de Claude ; c’est un humain qui se connecte ;
- ne choisit jamais une ligne de refus, une ligne de texte libre ou une ligne qui élargit les permissions permanentes d’un agent ;
- ne relance jamais un pane dont la ligne de saisie contient le brouillon d’un humain, ni un pane hors de son périmètre ;
- ne relance jamais un plan bloqué, ni un plan dont il ne peut pas lire l’état ;
- n’écrit ni ne modifie jamais un enregistrement de lead, n’envoie aucun message de protocole et ne nomme aucun pane absent de l’enregistrement ;
- n’écrit jamais la file de plans.

Une boîte de dialogue de permission dont chaque ligne refuse ou élargit les permissions est rejetée, jamais laissée bloquée, et il est alors dit une fois à l’agent de continuer autrement dans les limites des portes de son plan ou de consigner un blocage. Une question propre à un agent dont toutes les lignes refusent est laissée à l’humain, car c’est une décision sur le travail.

## Leadership : époques, succession et prise de relève

Le leadership est cloisonné par époque. Tout changement qui déplace le lead (une passation, une prise de relève, une libération, une nomination) incrémente l’époque, et seul le détenteur de l’époque la plus élevée agit comme lead. Un ancien lead qui revient trouve une époque plus élevée, ses commandes de lead sont refusées, et le prochain avis de lead le fait se retirer.

Lorsque le lead a disparu (son pane absent de deux listages consécutifs), le daemon demande à la première adresse joignable de la `succession` de l’enregistrement d’exécuter `herdr-peers lead takeover --plan P`, une fois par époque. Il ne transmet aucun motif, de sorte que la vérification propre au helper décide si le lead a réellement disparu. Un lead qui a atteint sa limite d’utilisation n’a pas disparu : le daemon réessaie toutes les 30 minutes. Si personne dans la succession ne peut être sollicité, le daemon consigne `plan_no_lead`.

Un successeur hérite du plan, de ses critères d’acceptation et de ses portes. La succession change qui exécute, jamais ce qui est autorisé.

## Nomination et revive

Deux autres voies existent pour un plan dont le lead et les successeurs ont tous disparu. Chacune exige un acte humain explicite et laisse la prise de relève à l’agent lui-même, vérifiée par le helper.

**Nomination (protocole 2).** Elle exige deux actes humains : une autorisation enregistrée sur l’enregistrement de lead (`lead claim --allow-appointment`, exécutée par le lead uniquement sur la parole de son humain) et un daemon lancé avec `--appoint`. Le daemon ne peut pas s’accorder cette permission lui-même. Lorsque le lead et tous les successeurs ont disparu lors de deux observations espacées d’au moins 15 minutes sans progrès, le daemon demande à la première voie vivante du plan d’exécuter `lead takeover --plan P --as-lane`. Ce helper vérifie de nouveau l’autorisation, confirme qu’il s’agit d’une voie qui travaille dans le dépôt du plan, et sonde le lead, chaque successeur et chaque voie antérieure deux fois, à une minute d’intervalle ; tout signe de vie entraîne un refus. Au plus deux nominations sont permises par plan.

**Revive (herdr-peers 2.2.0).** Lancer le daemon avec `--loop --revive` constitue en soi l’autorisation. Lorsque le lead d’un plan et chaque membre de sa succession et de ses voies ont disparu et qu’aucun ne peut reprendre, le daemon peut lancer un nouvel agent dans le checkout du plan, écrire un ticket à usage unique et lui demander d’exécuter `lead takeover --plan P --reason revive`. Le helper n’accepte la prise de relève qu’avec ce ticket et seulement après que ses propres vérifications ont constaté la disparition de chaque membre ; l’enregistrement relancé n’est adopté que sur la machine du daemon. Un plan enlisé dont le lead est encore vivant ne lui est jamais retiré : on demande une fois au lead de passer la main. Le revive est plafonné à un par plan toutes les 6 heures, deux par plan au total et deux par heure sur l’ensemble de la flotte.

**Vérifier avant les étapes irréversibles.** Un lead nommé ou relancé, comme tout lead, exécute `herdr-peers lead verify --plan <id>` avant tout merge, tag ou release. La commande refuse lorsqu’une autre machine montre le plan à une époque plus élevée, et se termine avec un code non nul lorsqu’une machine du plan est injoignable.

## Le cerveau facultatif

Les règles du daemon décident presque tout. Pour les quelques cas où elles ne le peuvent pas, `--brain` maintient un agent de décision dédié que le daemon lance lui-même, en mode ask, et auquel il n’obéit que dans une liste fermée d’actions. Il exige coding-agents-kit 1.3.0 ou ultérieur ; sans lui, un daemon lancé avec `--brain` refuse de démarrer plutôt que de tourner sans le cerveau qu’on lui a demandé.

| Cas | Actions permises |
|---|---|
| Un plan est enlisé | Une relance de plus (une fois par plan), prévenir l’humain, ou laisser en l’état |
| Un plan est bloqué avec `resolver: "lead"`, une classe qu’un lead peut traiter (C3, C4, C7) et aucun sujet sensible | Une demande fixe unique au lead pour le lever dans les limites de l’autorité enregistrée, prévenir l’humain, ou laisser en l’état |
| Un agent attend devant un écran que le daemon ne reconnaît pas | Prévenir l’humain, ou laisser en l’état |

Lorsqu’aucune réponse valide n’arrive en 3 minutes, le choix par défaut est de laisser le cas en l’état. Le texte du cerveau n’est jamais tapé, saisi ni exécuté ; il ne peut ni nommer un lead, ni lancer un agent, ni faire un merge, ni publier une release, ni se connecter, ni modifier une permission. Le daemon reste le seul acteur. En v8, le champ `autonomy.brain` d’un plan consigne si un cerveau peut agir sur ce plan.

## La file de plans

Un dépôt peut tenir une file de plans approuvés dans `.dwp/queue.json`, schéma `dwp-queue-v1`. Le pack (`shared/queue.py`) ou un humain l’écrit ; le daemon se contente de la lire, de manière bornée et en la validant entièrement. Create ajoute un plan à l’approbation lorsque le développeur demande de le mettre en file (ou lorsque le contrat v8 enregistre un `autonomy.queue` autre que `none`) ; l’humain ou le lead la réordonne ; execute marque l’élément `started` lorsque le plan démarre sous son lead, et `done` après la clôture du plan. Une file contient au plus 64 éléments. Les dépendances sont internes à la file : `after` nomme un plan déjà en file. Un seul plan s’exécute à la fois par dépôt, sauf si la file porte `parallel: true`.

Avec `--loop`, lorsque le plan en cours d’un dépôt se termine, l’élément prêt suivant démarre par un message fixe unique au lead que la file désigne : "Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates." Un élément n’est prêt que lorsque son plan `after` est terminé, qu’aucun autre plan de ce dépôt ne s’exécute, qu’il nomme un lead, et que son approbation est toujours le dernier événement d’approbation ou d’amendement du plan pour le contrat en vigueur. Une entrée `launch` n’est pas démarrée par la boucle ; comme un élément non approuvé ou un lead manquant, elle est signalée comme `queue_blocked`. Une file endommagée est lue comme vide et ne casse jamais le cycle de vie du plan.

## Événements, notifications et carte de flotte

Le daemon signale les événements de plan sous la forme d’un objet JSON `plan-event-v1` sur l’entrée standard de la commande `--notify` : l’événement, le plan, la machine, le lead, le dépôt et la classe du blocage. Les événements comprennent `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` et `plan_completed`, une fois par plan et par situation, ainsi que `plan_queued_started`, `queue_blocked`, les événements de nomination et de revive, et `needs_human` provenant du cerveau. Un échec est consigné et n’interrompt jamais le passage.

L’addon Herdr du pack fournit un notificateur Dailybot (`scripts/notify-dailybot.py`) qui transforme les événements d’achèvement, d’enlisement, de blocage, d’absence de lead et de lead déplacé en une mise à jour lisible pour l’équipe, via la CLI Dailybot installée. Il se termine silencieusement lorsque la CLI est absente, non connectée, ou que l’envoi échoue. Les notifications signalent un progrès ou un besoin ; elles n’autorisent jamais une action et ne remplacent pas l’enregistrement du plan.

Pour observer la boucle, `herdr-peers plans` affiche les plans d’une machine (`plans-v1`), et `herdr-peers fleet` affiche la carte fusionnée (`fleet-v1`) : machines, agents, plans, et le rôle de chaque agent comme lead, successeur ou voie. `herdr-peers fleet ui` affiche la carte en direct, regroupée par plan, dépôt, machine ou file, avec des vues pour ce qui demande de l’attention, ce qui est actif, en attente ou terminé. L’interface ne fait que lire : elle n’écrit aucun état de plan et ne relance aucun agent.

## Un exemple concret : un plan pendant la nuit

Le déroulé suivant est illustratif ; chaque étape suit les règles documentées ci-dessus.

1. Le soir, le développeur approuve un plan avec un bloc `autonomy` qui conserve les valeurs par défaut sauf `notify`. L’agent exécute `execute`, qui revendique l’enregistrement de lead avec un successeur.
2. Le développeur lance `herdr-peers autopilot start --loop --notify "<notifier>"` et se déconnecte.
3. Le lead termine trois tâches et finit son tour. Cinq minutes plus tard, sans voie au travail ni réponse en attente, le daemon envoie le message fixe de continuation, et le lead reprend à la tâche suivante.
4. Une tâche a besoin d’un secret que le plan ne détient pas. Le lead pose un blocage C1 sans resolver (lu comme `human`) et s’arrête. Le daemon n’envoie rien au plan, consigne `plan_blocked`, et le notificateur publie une mise à jour pour l’équipe qui nomme la classe du blocage.
5. Le matin, le développeur fournit l’élément attendu, le lead lève le blocage avec `ledger.py unblock`, et l’exécution reprend. Plus tard, le pane du lead se ferme ; après deux listages sans lui, le daemon demande au successeur d’exécuter `lead takeover`, l’époque avance, et le successeur continue sous les mêmes portes.
6. Avant le merge final du plan, le nouveau lead exécute `lead verify`. Le plan se termine, `plan_completed` parvient au notificateur, et si le dépôt a une file, le lead du plan approuvé suivant reçoit le message fixe de file.

À aucun moment le daemon n’a approuvé quoi que ce soit, saisi un identifiant ou décidé de ce que devait être le travail.

## La limite d’autorité

La boucle s’arrête exactement là où s’arrête l’autorité du plan. Les classes d’escalade du protocole d’agent tracent cette ligne : C1 autorité (une action hors de l’autorisation du plan, à un point de consentement, ou impliquant des secrets), C2 écrans de consentement (écrans de permission, de connexion, d’identifiants ou de paiement, jamais actionnés par un agent), C3 ambiguïté irréductible, C4 une porte qui ne peut être franchie sans être affaiblie, C5 dommage, C6 conditions, et C7 capacité épuisée. Lorsque l’une d’elles survient sans autorisation préalable, l’exécution s’arrête à la porte et le besoin est consigné et signalé.

Les connexions et les identifiants restent toujours des actions humaines. L’humain lance le daemon, accorde explicitement la nomination ou le revive, et satisfait les besoins que l’autorité enregistrée ne peut pas couvrir. Pour tout le reste, l’humain est informé au lieu d’avoir à surveiller chaque étape.

## Travailler sans l’addon

Rien de tout cela n’est obligatoire. Sans Herdr, ou avec l’addon désactivé, le pack se comporte comme si la boucle n’existait pas : un plan est exécuté dans une session, repris avec `resume` depuis sa première tâche ouverte, ou confié à un autre agent par une passation coordonnée par un humain. Le contrat de plan, les blocages structurés et l’en-tête de `PROGRESS.md` fonctionnent de la même manière, de sorte qu’un humain ou un autre agent lit le même état que la boucle aurait lu.
