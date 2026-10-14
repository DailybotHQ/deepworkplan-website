---
title: Ressources et capacités
description: "Manifestes de contexte par tâche, enveloppe de ressources, capacités de l'hôte, registre d'addons .dwp/config.json et capacités ajoutées par les addons actifs."
order: 10
lang: fr
section: Record layer
---

# Ressources et capacités

> **Portée de version :** cette page reformule quatre documents normatifs de la norme actuelle, DWP 7.0.0, à la version `v7.8.1` : [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/CONFIG.md) et [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_ABILITIES.md). En cas de divergence entre cette page et ces fichiers, les fichiers prévalent.

**Statut : stable (contexte et ressources depuis 6.0.0 ; configuration et capacités depuis 7.0.0).** Ces règles s'appliquent aux plans de la lignée v6 ([Couche d'enregistrement](/spec/record-layer)) ; la norme v5 n'est pas modifiée. Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

## Le manifeste de contexte par tâche

Avant chaque tâche, l'agent dérive un **manifeste de contexte** à partir du contrat et du journal complet (`context_manifest.py`). C'est une vue dérivée, jamais stockée comme état : deux dérivations à partir des mêmes enregistrements MUST produire des octets identiques, et le manifeste MUST NOT lire en dehors du plan et de son dépôt. Sa forme est publiée sous [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Section | Dérivée de |
| --- | --- |
| `identity` | nom du plan, identifiant et révision du contrat actif |
| `authorization` | les événements d'approbation, mot pour mot, y compris les points de consentement |
| `repository_rules` | le périmètre du contrat et les invariants avec leur état d'évaluation courant |
| `acceptance` | les critères de la tâche avec leur état de clôture |
| `touched_surface` | les fichiers déclarés avec l'empreinte actuelle de leur contenu ; un fichier manquant apparaît comme manquant |
| `evidence` | les pointeurs de preuve dans la fenêtre qui se résolvent sur disque |
| `dead_ends` | portes échouées, refus, adaptations refusées et contrôles non discriminants |
| `freshness` | l'empreinte des entrées que le manifeste résume |
| `next_action` | exactement une étape suivante, avec une commande concrète |

`authorization`, `repository_rules` et `acceptance` sont **obligatoires** : l'élagage du contexte ne peut jamais masquer la frontière d'acceptation ou d'autorisation. L'échelle de l'action suivante est ordonnée (approbation, démarrage, autorité, contrôle, preuve, achèvement) et ne présente jamais une porte ordinaire réussie comme clôturant un critère contrôlé.

**Les impasses sont conservées.** Une entrée ne quitte le résumé que sur des faits consignés et prouvés (la même empreinte a réussi plus tard, un refus dupliqué plus récent l'a remplacée, ou une révision du contrat l'a rendue caduque) ; un simple changement de surface MUST NOT la faire disparaître. **La fraîcheur est vérifiée :** un résumé dont l'empreinte d'entrée consignée ne correspond plus est périmé, et un résumé sans empreinte est périmé par construction. **L'historique ne se charge que sur déclencheur** — une passation consignée ou un amendement affectant la tâche ; sinon, le manifeste seul constitue le contexte de la tâche.

## Comptabilité en quatre grandeurs

La charge d'instructions et le coût sont rapportés comme quatre grandeurs distinctes : les **octets d'instructions** statiques, les **tokens du fournisseur** (uniquement là où un compteur de l'hôte les a consignés), le **coût monétaire** (uniquement à partir d'échantillons consignés au tarif réel) et le **temps réel écoulé** (à partir des horodatages des événements). Une grandeur manquante est signalée comme manquante avec sa raison, jamais imputée, et les octets ne sont jamais convertis en tokens ni en argent.

## Capacités de l'hôte

L'hôte d'exécution déclare ses **capacités** dans un ensemble fermé : `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Une capacité inconnue MUST être refusée, et une capacité non déclarée vaut `false`. L'**hôte minimal** — sans changement de modèle, sans sous-agents, sans télémétrie, sans arrêt — est une posture prise en charge, jamais une erreur ; toute limite qui requiert une capacité absente devient indicative, en nommant la capacité manquante.

Les capacités ne sont pas des autorisations. Une autorisation dans le contrat est une autorité ; une capacité est ce que l'environnement peut réellement faire. Toute posture qui requiert une capacité requiert toujours son autorisation.

## L'enveloppe de ressources

Un contrat MAY déclarer des limites dans son enveloppe de ressources. Une limite n'est **appliquée** que lorsqu'elle nomme une source de mesure réelle ; sinon elle est **indicative**, et la parité d'application entre hôtes n'est jamais revendiquée.

- **Sources des compteurs.** Les compteurs observables dans le journal (durée écoulée, nouvelles tentatives de porte, appels de répartition) sont calculés à partir des propres enregistrements du plan. Les compteurs propres à l'hôte (dépense, tokens du fournisseur) requièrent la capacité de mesure correspondante et un échantillon observé provenant d'un adaptateur d'hôte ; un compteur manquant n'est pas un usage gratuit.
- **Réserves.** Une limite MAY déclarer une `reserve` afin que la vérification, les nouvelles tentatives et la reprise ne puissent pas être privées de ressources par le travail ordinaire : la répartition est refusée lorsque le consommé plus l'engagé dépasserait la limite moins la réserve.
- **Épuisement.** Atteindre une limite persiste un point de contrôle incomplet, consigne `LIMIT: exhausted <id>: <detail>` et suspend la répartition jusqu'à un enregistrement explicite `LIMIT: recovered <id>`. Un épuisement ne peut jamais satisfaire un critère d'acceptation.
- **Règlement des annulations.** Une réservation en cours est réglée exactement une fois, comme libérée ou engagée ; un second règlement contradictoire est refusé, jamais arbitré.
- **Posture de routage.** Par défaut, le modèle est fixe. Changer de niveau de modèle requiert à la fois l'autorisation `model_routing` et la capacité du même nom ; la répartition parallèle requiert à la fois l'autorisation `agent_delegation` et la capacité `subagents`. Une posture de routage est une déclaration de permission, jamais une revendication d'efficacité.

## Le fichier de configuration et le registre d'addons

`.dwp/config.json` (dépôt) et `~/.dwp/config.json` (utilisateur) partagent une même forme, publiée sous [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), et un même analyseur (`config.py`). **La méthodologie fonctionne sans fichier de configuration et sans addon** ; rien dans le fichier ne peut faire dépendre un plan, un flux ou la conformité d'un addon.

- **Suivi par défaut.** Le fichier du dépôt contient des décisions, jamais de secrets, et il est suivi par git pour que les coéquipiers et la CI lisent le même registre : l'onboarding écrit la règle `.gitignore` `.dwp/*` plus `!.dwp/config.json`. Les plans et les enregistrements de benchmark restent ignorés.
- **Priorité.** Le fichier du dépôt l'emporte sur le fichier utilisateur, et un fichier absent signifie que tout est désactivé. La clé `addons` se résout addon par addon ; la clé `benchmark` se résout en bloc.
- **Clés du registre** : ce sont les noms des répertoires d'addons du pack : `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Chaque entrée comporte `enabled` (seul `true` active), une `version` optionnelle et une `note` optionnelle d'une ligne. Une clé inconnue est ignorée avec un seul avertissement.
- **Absent signifie non activé.** Seuls l'onboarding avec le consentement du développeur, l'étape d'installation propre à un addon ou l'humain activent quoi que ce soit. Un addon activé mais non détecté et portant une note est signalé comme différé.
- **Lecture en échec fermé.** Un fichier illisible ou une valeur mal formée n'apporte rien et produit exactement un avertissement ; un lecteur n'interrompt jamais un flux et ne passe jamais sous silence ce qu'il a écarté. L'écrivain réconcilie de façon atomique et refuse d'écraser un fichier qu'il ne peut pas analyser.
- **Enregistrement de l'hôte.** Une clé optionnelle `host` consigne les capacités déclarées de la machine (booléens de l'ensemble fermé). `telemetry: true` requiert toujours le consentement du développeur.
- **Le socle ne change pas.** La revue locale AI Diff Reviewer reste partie intégrante de chaque Final Review, que le registre la nomme ou non.

## Capacités fournies par les addons

Depuis la 7.0.0, les addons activés peuvent ajouter des capacités à l'exécution :

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

Autrement dit, les capacités effectives sont l'union des capacités déclarées par l'hôte et de celles fournies par chaque addon activé, décrit par un `addon.json` valide, détecté et sur une version d'interface compatible.

- **Descripteurs.** Chaque addon du pack fournit un `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) qui déclare sa clé, ce qu'il fournit et comment il est détecté.
- **La détection est en lecture seule.** Une commande de détection s'exécute sans shell, avec stdin fermé et un délai de 10 secondes, et rien de ce qu'elle affiche n'est exécuté. Un produit dont la version majeure d'interface déclarée diffère de celle épinglée n'est pas disponible, avec un seul avertissement.
- **Non activé signifie non consulté.** Le descripteur d'un addon désactivé n'est pas ouvert et sa commande de détection n'est pas exécutée. L'union est monotone : activer un addon ne peut qu'ajouter des capacités.
- **Jamais persistées.** Les capacités effectives sont recalculées à chaque appel et MUST NOT être écrites dans un plan. Un plan consigne ce qu'il a utilisé — l'événement de délégation nomme son transport et son addon — et non ce qui était disponible.
- **Les capacités ne sont pas une autorité.** L'addon agentkit peut fournir `subagents`, `cancel_children` et `model_routing` ; l'addon Herdr peut fournir `subagents` et `cancel_children`. Déléguer requiert toujours l'autorisation `agent_delegation` du contrat ([Délégation](/spec/delegation)).

`resources.py abilities` affiche l'ensemble effectif et l'origine de chaque capacité ; la commande est en lecture seule.

## Voir aussi

- [Couche d'enregistrement](/spec/record-layer) — contrat, journal et preuves.
- [Délégation](/spec/delegation) — comment un plan utilise la capacité `subagents`.
- [Addons](/spec/addons) — les addons optionnels eux-mêmes.
