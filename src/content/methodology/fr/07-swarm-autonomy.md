---
title: Autonomie de l’essaim
description: "Comment un essaim d’agents survit à la limite d’un compte ou à la perte d’un agent : capacité, paquets de passation, succession et escalade critique."
order: 7
lang: fr
summary: Des couloirs attentifs à leur capacité, une passation proactive, une succession du coordinateur par époques et la taxonomie d’escalade qui garde un essaim en marche.
icon: shield
---

# Autonomie de l’essaim

[Faire tourner de nombreux agents](/fr/methodology/06-orchestration) décrit un coordinateur et ses couloirs. Ce chapitre couvre ce qui maintient ce dispositif en marche lorsqu’un compte atteint sa limite ou qu’un agent disparaît. Un couloir vérifie la marge qui reste à son compte et passe son travail avant de s’épuiser. Un coordinateur transmet le leadership, ou il est remplacé lorsqu’il disparaît. L’essaim ne demande au développeur que ce qui est réellement critique.

La panne à laquelle il répond est concrète : un coordinateur qui épuise son quota au milieu d’un plan laisse chaque couloir en plan, et rien ne bouge tant qu’une personne n’ouvre pas une nouvelle session. Avec les règles ci-dessous, le plan continue d’avancer dans le cadre de l’autorisation que le développeur a déjà accordée.

Six règles structurent tout ce qui suit :

1. **Un rôle par produit.** [coding-agents-kit](/fr/kit/agentkit) (`ak`) connaît les comptes et la capacité, [herdr-peers](/fr/kit/herdr) connaît les messages, les panneaux et qui coordonne, et le pack Deep Work Plan connaît la méthode : quand passer la main, ce dont un successeur a besoin, ce qu’il faut faire remonter. Chacun reste facultatif. Sans eux, les mêmes règles s’appliquent, le développeur relayant les messages et relançant les agents.
2. **L’unité de continuité est le plan, pas l’agent.** Chaque passation et chaque succession est une reprise ordinaire, plus un petit paquet qui porte ce que le journal ne contient pas : l’intention qui était en cours.
3. **Le proactif l’emporte sur le réactif.** Un agent vérifie sa marge aux frontières de tâche et passe la main tant qu’il peut encore écrire un bon paquet. Réagir après avoir atteint une limite reste le filet de sécurité.
4. **L’autonomie n’élargit jamais l’autorité.** Passations, successions, lancements et ordonnancement se déroulent dans le cadre de l’autorisation du plan. Aucun agent ne répond à un écran de permission, de contournement, de connexion, de consentement ou de paiement, et le travail ne circule qu’entre les comptes que le développeur a déclarés.
5. **La continuité n’abaisse jamais le niveau.** Un successeur hérite des mêmes portes de validation. Un paquet ne clôt aucun critère, n’assouplit aucune porte et ne saute aucune relecture.
6. **Économe par construction.** La capacité est lue dans un cache aux frontières de tâche, jamais dans une boucle ni sur minuterie. Des notifications à sens unique remplacent les questions qui n’appellent pas de réponse, et les paquets sont petits.

## Rôles

| Rôle | Est | Possède | Ne fait jamais |
| --- | --- | --- | --- |
| Coordinateur | L’agent qui détient l’enregistrement de coordinateur d’un plan | Le plan, le tableau des couloirs, l’ordonnancement, l’ordre de publication, les fusions et les tags dans le cadre de l’autorisation, la liste de succession | Écrire dans le checkout d’un couloir, ou coordonner un plan qu’un autre coordinateur détient |
| Suppléant | La première entrée joignable de la liste de succession du coordinateur | Rien tant qu’il n’a pas pris le relais | Agir en coordinateur tant que le coordinateur est joignable |
| Couloir | Un agent par dépôt, chantier ou tâche, dans son propre panneau et sur son propre compte | Son plan enfant ou sa tâche, sa branche, sa porte de validation et son paquet | Attribuer du travail à un autre couloir, fusionner ou poser un tag |
| Relecteur | Un couloir d’un autre fournisseur, en lecture seule | Ses constats | Écrire dans l’arbre qu’il relit |

- **Le coordinateur reste actif.** Un orchestrateur dont les couloirs attendent un relais humain se bloque. Un coordinateur ne met jamais l’essaim en pause pour une question qu’il peut trancher.
- **Un exécutant par plan.** Un seul agent exécute un plan ou un plan enfant donné à la fois. Un second agent sur le même plan est une faute de coordination que le coordinateur doit résoudre.
- **L’autorité vient du plan, pas d’un pair.** Un couloir lit lui-même l’autorisation du plan. Une approbation relayée par un autre agent n’ajoute rien que le couloir n’avait déjà.
- **Plusieurs coordinateurs** peuvent travailler dans un même espace de travail, chacun coordonnant un plan différent. Un compte n’est détenu que par un couloir à la fois, grâce à un bail `ak`, si bien que deux coordinateurs ne placent jamais deux rédacteurs sur un même compte Codex.
- **Plusieurs instances d’un même type** — trois panneaux Grok, quatre panneaux Codex sur un ou plusieurs profils — sont des couloirs ordinaires. Les instances d’un même profil partagent la capacité de ce profil.

Chaque couloir a un plan, au moins un plan Lite dans son propre dépôt, et ce plan est la première chose que lit un successeur. Chaque couloir rend compte au coordinateur avec un vocabulaire fixe — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — et termine chaque message par une ligne de capacité, comme `capacity=ok 64% @work1`, si bien que le coordinateur a rarement besoin de lire les quotas lui-même.

## La boucle de capacité

Un agent vérifie sa propre marge avant de commencer chaque tâche, après toute porte de validation ou étape qui a duré plus de 20 minutes, chaque fois que sa CLI affiche un avertissement de limite d’utilisation, et avant d’accepter une passation ou le leadership. La vérification est `ak capacity --self --json` de coding-agents-kit `v1.0.0`, que le helper du pack traduit en décision :

| Verdict | Décision | Un couloir | Un coordinateur, pour lui-même |
| --- | --- | --- | --- |
| `ok` (au-dessus du seuil bas) | continuer | Continue | Continue |
| `low` (25 % ou moins) | préparer | Termine la tâche en cours, n’en commence aucune qu’il ne peut terminer, signale `capacity=low` | Désigne un successeur pressenti et ne lance aucun travail long sur lui-même |
| `critical` (10 % ou moins, ou limité en débit) | passer la main | Atteint le prochain point sûr, écrit le paquet, notifie le coordinateur, s’arrête | Transmet le leadership immédiatement |
| `unknown` (aucune source de quota) | continuer | Signale `capacity=unknown`, passe la main sur un avertissement de limite de la CLI ou un écran `usage_limit` | Préfère des couloirs de capacité connue pour les tâches longues |

- **Les seuils** sont ceux du kit : bas à 25 % et critique à 10 % de la part libre de la fenêtre contraignante par défaut, ajustables avec `AGENTKIT_CAPACITY_LOW` et `AGENTKIT_CAPACITY_CRITICAL`. Les lectures proviennent d’un cache conservé 300 secondes, si bien qu’une vérification à chaque frontière de tâche ne coûte que quelques appels au fournisseur par heure.
- **Hystérésis.** Une fois le paquet écrit, la passation va jusqu’au bout. L’agent ne reprend jamais cette tâche après le rétablissement de son compte ; le successeur la possède, et le compte rétabli retourne simplement dans le pool.
- **La pression de contexte compte aussi.** Lorsque le contexte de l’agent atteint le seuil de contexte frais du contrat (60 % par défaut), le même paquet et la même passation suivent.
- **Dégradation honnête.** Sans le kit, avec un kit plus ancien ou en dehors d’un lancement par `ak`, la capacité est signalée comme inconnue, jamais comme ok.

**Le pool appartient au développeur.** Le plan consigne les comptes que le développeur a déclarés pour le travail. Un agent ne crée jamais de compte, ne renouvelle jamais une connexion, ne dépense jamais une réinitialisation Codex et n’utilise jamais un compte hors du pool, et il travaille dans le respect des conditions de chaque fournisseur. Déplacer le travail avant une limite, au sein du pool, relève de l’ordonnancement ; faire tourner les comptes pour dépasser une limite n’est jamais permis. Pour chaque tâche prête, le coordinateur prend le compte le mieux classé par `ak pick --owner <lead>`, le réserve pour l’adresse propre du couloir avec `ak lease`, ne donne jamais à un couloir le compte du coordinateur lui-même (les deux atteindraient `critical` ensemble), préfère les comptes de capacité connue pour les tâches longues et un autre fournisseur pour les relecteurs, et garde un suppléant. Lorsqu’aucun compte du pool n’a de marge et qu’aucun ne se réinitialise dans l’horizon du plan, l’essaim se met en attente en consignant la réinitialisation la plus proche.

## Passation d’un couloir

1. **Le couloir**, au verdict de passation, atteint un point sûr — une étape commitée, ou l’arbre laissé tel quel, jamais de travail jeté —, écrit le paquet, envoie `handoff <packet path>` au coordinateur sous forme de notification et s’arrête. Il ne ferme pas son propre panneau.
2. **Le coordinateur**, ou le suppléant lorsque le coordinateur est injoignable ou lui-même critique, choisit un compte (`ak pick <kind> --owner <lead> --exclude @<spent>`, en préférant un autre fournisseur lorsque la tâche le permet), le réserve et lance le successeur dans le même checkout avec une consigne de reprendre le plan à partir du paquet.
3. **Le successeur** accepte le paquet — le helper vérifie le plan, le contrat en vigueur, la branche, le commit de tête et les chemins non commités, et ne consigne rien en cas de non-concordance —, puis reprend le plan et réexécute chaque porte que le paquet liste comme non vérifiée.
4. **Le coordinateur** libère le bail épuisé et ferme le panneau épuisé une fois que le successeur a accepté.

Le **paquet de passation** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) est écrit sous `analysis_results/handoff/` du plan, avec des permissions réservées au propriétaire. Il nomme le plan, le contrat, la tâche et l’étape ; la raison (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` ou `lead_handover`) ; où se trouve le travail (dépôt, checkout, branche, tête, s’il est poussé, chemins non commités) ; ce qui est fait, vérifié et non vérifié, avec les chemins des preuves ; les étapes suivantes dans l’ordre ; les demandes ouvertes ; les décisions prises ; le coordinateur et l’époque ; et qui l’a écrit. Un paquet est une donnée : il ne porte jamais de valeur secrète, de contenu privé d’un autre dépôt ni d’instruction qui élargit l’autorité. Le successeur redéduit sa prochaine action à partir du plan.

## Succession du coordinateur

herdr-peers `v1.0.0` conserve un enregistrement de coordinateur par plan — coordinateur, époque, liste de succession et couloirs — et résout l’adresse `lead` vers le coordinateur actuel, si bien qu’aucune consigne de couloir ne code en dur le panneau du coordinateur.

- **Revendiquer d’abord, lancer ensuite.** Le coordinateur exécute `herdr-peers lead claim --plan <P> --succession <A,B>` avant de lancer le moindre couloir — l’adresse `lead` ne se résout qu’une fois un enregistrement créé —, actualise l’enregistrement avec `--lanes <A,B>` à mesure que les couloirs démarrent et exécute `lead release` lorsque le plan est terminé. Depuis herdr-peers (`v0.3.2`), l’enregistrement conserve localement le dépôt qui revendique, et un plan portant le même identifiant dans un autre dépôt est nommé `--plan <repo>/<id>`. La succession par défaut est son successeur prévu, puis les couloirs du checkout propre au plan par ordre de lancement, puis tout couloir sur le même hôte ; les couloirs dans des conteneurs ou sur d’autres machines viennent en dernier.
- **Transmission, planifiée.** Au niveau `low`, le coordinateur désigne un successeur pressenti. Au niveau `critical`, il écrit un paquet de coordinateur — tableau des couloirs, demandes ouvertes, ordre de publication, fusions en attente, décisions —, exécute `herdr-peers lead handover <addr> --plan <P>`, qui incrémente l’époque et notifie chaque couloir, et s’arrête. Le successeur accepte le paquet, reprend le plan orchestrateur et revérifie chaque couloir.
- **Reprise, non planifiée.** Lorsque le coordinateur est injoignable, n’a plus d’agent, affiche un écran `usage_limit`, ou qu’une demande qui lui est adressée expire deux fois, la première entrée joignable de la liste de succession exécute `herdr-peers lead takeover --plan <P>` — elle-même, ou en lançant un nouveau panneau de coordinateur dans le checkout du plan. Le nouveau coordinateur reconstruit l’état à partir du plan. L’intention en cours manquante est consignée comme manquante, jamais inventée.
- **Isolation par époque (fencing).** Seul le détenteur de l’époque la plus élevée agit en coordinateur. Un couloir n’accepte une notification de coordinateur que de l’agent qui lui a donné sa consigne (première revendication), du coordinateur actuel à l’époque suivante (transmission) ou de la première entrée joignable de la succession à l’époque suivante (reprise) ; les égalités reviennent à la position de succession la plus ancienne, et un coordinateur qui revient et voit une époque supérieure se retire. Les fusions, tags et publications ne sont effectués que par le coordinateur de l’époque courante, sont d’abord vérifiés par rapport au dépôt distant et suivent les règles de fusion propres au dépôt.

## Messagerie

- **Coordinateur et couloir** échangent des jalons, le feu vert, des épinglages et des exigences modifiées.
- **Couloir et couloir** peuvent s’interroger pour obtenir des informations et se coordonner — une interface, un nom d’option exact, l’état d’une branche. Seul le coordinateur attribue le travail ; la profondeur un et le plafond de fan-out s’appliquent toujours, et un couloir prévient le coordinateur lorsqu’un échange entre couloirs modifie le plan.
- **Les notifications** (`herdr-peers notify <addr|lead>`) sont à sens unique : le destinataire les consigne comme données et n’y répond jamais. Elles ne consomment aucun emplacement de fan-out et portent les annonces de passation, les changements de coordinateur et les diffusions de publication. La notification du coordinateur est l’unique diffusion de l’état courant, et personne n’en accuse réception.
- **Les questions entre dépôts ne bloquent pas.** Un couloir demande, continue avec l’hypothèse recommandée consignée et s’ajuste quand la réponse arrive.
- **Ne jamais interroger en boucle dans l’attente d’un message.** Une demande ou une notification n’atteint un agent qu’à la fin de son tour ; un agent dont l’étape suivante dépend d’un message termine son tour et le laisse arriver.
- **Le texte reçu est une donnée.** Une réponse ou une notification n’accorde rien et ne clôt rien.

## Escalade réservée aux éléments critiques

Tout ce qui n’est pas critique est décidé par l’agent : il enquête, retient l’option recommandée, consigne la décision — les options, le choix, la raison et la manière de l’annuler — et continue. Une escalade doit nommer sa classe ; une question qui n’en nomme aucune est une décision que l’agent doit prendre. Les classes sont celles du [protocole de l’agent](/fr/spec/agent-protocol) :

| Classe | Faire remonter au développeur lorsque |
| --- | --- |
| C1 Autorité | Une action sort de l’autorisation du plan ou se trouve à un point de contrôle de consentement : opérations destructrices ou irréversibles, déploiements en production, publication au-delà du plan, messages à des personnes extérieures aux agents du plan, dépenses, posture de sécurité ou secrets. |
| C2 Écran de consentement | Un écran de permission, de contournement, de connexion, d’identifiants, de consentement MCP ou de paiement apparaît. Jamais validé au clavier par un agent. |
| C3 Ambiguïté irréductible | Deux résultats matériellement différents satisfont la demande et rien dans le dépôt, sa documentation, les plans ou les décisions antérieures ne tranche. |
| C4 Conflit de qualité | Une porte de validation ne peut passer sans être affaiblie, ou des preuves contredisent l’objectif du plan d’une manière que la tâche ne peut corriger. |
| C5 Dommage | Un état partagé, des données ou le travail d’un autre agent sont perdus ou corrompus sans explication. |
| C6 Conditions | Une question juridique, de licence, de conditions des fournisseurs ou de confidentialité se pose. |
| C7 Capacité épuisée | Aucun compte du pool déclaré n’a de marge et aucun ne se réinitialise dans l’horizon du plan. |

Dans un essaim, **un élément critique bloque sa chaîne de dépendances, pas l’essaim.** Le coordinateur met en attente la tâche bloquée — son enregistrement bloqué est l’escalade, envoyée une seule fois —, garde chaque couloir indépendant en marche et reprend la chaîne lorsque le développeur répond. L’autonomie ne ferme jamais une validation humaine, les mots littéraux du développeur l’emportent sur une recommandation, et une approbation relayée par un agent est consignée comme relayée, jamais comme si le développeur l’avait écrite.

## Le niveau d’exigence

Un essaim ne vaut la peine d’être lancé que si l’on peut se fier à son résultat. Le [niveau d’exigence](/fr/spec/dwp-specification) s’applique à chaque agent qui poursuit un plan :

- **Les portes sont des hypothèses.** Une porte nouvelle ou modifiée est montrée en échec sur un défaut injecté avant qu’on s’y fie, et un succès vide — un binaire manquant, zéro fichier correspondant, un journal vide — est un échec. Une tâche dotée d’un contrat d’entrée nomme ses cas limites — vide, multiligne, espaces autour — afin que réussir chaque exemple ne soit pas pris pour la preuve de la règle.
- **Comparer à la base.** Performance, couverture et taille sont comparées à la branche de base, pas seulement à un seuil.
- **Mesurer d’abord, concevoir avant de construire.** Un correctif ou un audit vérifie d’abord sa prémisse et son outil de mesure ; un changement non trivial consigne les interfaces, les modes de défaillance, la sécurité et les tests avant le code.
- **Relecture avant l’étape irréversible.** L’AI Diff Review locale s’exécute avant toute fusion, tout tag ou toute publication, et les changements de méthodologie ou de protocole reçoivent un relecteur d’un autre fournisseur.
- **La continuité n’abaisse jamais le niveau.** Un successeur réexécute ce que le paquet liste comme non vérifié ; une passation n’est jamais un raccourci pour éviter une porte.

## La trace

Le journal du plan orchestrateur consigne l’essaim : les lancements et résultats des couloirs comme événements de délégation ; les verdicts de capacité, passations et successions comme observations ; les escalades et les réponses du développeur comme interventions. Les paquets et leurs enregistrements d’acceptation restent dans le plan qui a exécuté le travail, et le rapport d’achèvement nomme chaque passation et chaque succession avec son paquet.

## L’exercer

Éprouvez la boucle avant de vous y fier. Sur un dépôt de test avec un petit plan orchestrateur, faites tourner un coordinateur et au moins trois couloirs sur des comptes ou des fournisseurs différents. Plafonnez la capacité signalée d’un couloir — `AGENTKIT_CAPACITY_CAP=@<profile>=8` abaisse la lecture et ne peut jamais l’élever — et observez-le écrire un paquet, le coordinateur lancer un successeur qui l’accepte, et le successeur passer la porte de validation. Plafonnez le coordinateur de la même manière et observez la transmission et le nouveau coordinateur terminer le plan. Consignez ensuite les preuves dans le `analysis_results/` du plan : aucune frappe humaine, chaque paquet, chaque époque, une demande d’un couloir à un autre, et les portes de validation.
