---
title: Dailybot
description: "Addon DWP optionnel : connecte le plan à une équipe Dailybot, hooks optionnels et la skill agent 3.4.0 (chat, check-ins, formulaires, ask AI et plus)."
kind: addon
lang: fr
order: 2
---

# Addon Dailybot

Connecte l'exécution de Deep Work Plan à une **équipe Dailybot** pour que les humains voient ce que les agents construisent — lancement, progression en cours de plan, blocages et achèvement — sans ajouter de réunions ni une seconde chaîne d'outils. Un addon **optionnel** pour les équipes qui utilisent déjà [Dailybot](https://www.dailybot.com).

La méthodologie centrale de Deep Work Plan a **zéro** dépendance à Dailybot. Un dépôt sans addons est pleinement conforme. Proposez cet addon uniquement lorsque le développeur ou l'équipe utilise déjà Dailybot ; ne l'installez jamais automatiquement pour tout le monde.

## Quand l'utiliser

| Signal | Action |
|--------|--------|
| L'équipe utilise déjà Dailybot (Slack, Teams, Discord, Google Chat ou le tableau de bord) | **Recommander** lors de l'onboarding |
| Le développeur demande la visibilité de la progression des agents ou des mises à jour type standup | **Proposer** l'addon |
| Dépôt greenfield sans compte Dailybot | **Ignorer** — la baseline neutre vis-à-vis du fournisseur suffit |
| Travail client sous NDA où la progression ne doit pas quitter le dépôt | **Ignorer**, ou committer `.dailybot/disabled` comme interrupteur local |

## Ce que cet addon connecte (volontairement restreint)

L'addon Dailybot de DWP **ne** réinvente pas Dailybot. Il connecte l'exécution du plan à la sous-skill **`report`** de dailybot et committe éventuellement des hooks du harness. Tout le reste — installation, consentement, authentification, style d'écriture — est **reporté** à la [skill agent Dailybot](https://github.com/DailybotHQ/agent-skill) officielle (actuellement **3.4.0**).

### Quatre événements du cycle de vie

Pendant `create` / `execute` de DWP, l'addon connecte **quatre mises à jour d'agent en meilleur effort**. Chaque événement est conditionnel (Dailybot présent et authentifié), non bloquant et respecte `.dailybot/disabled`.

| Événement | Déclencheur | Niveau | Exigence |
|-------|---------|-------|-------------|
| **Kickoff** | Plan matérialisé et approuvé, ou premier tour de `execute` | regular | SHOULD |
| **Tâche significative** | Une fonctionnalité, correction de bug ou refactorisation majeure terminée — pas les tâches de configuration | regular | MAY |
| **Bloqué** | Le plan s'arrête ; `state.json.blocked` renseigné (`reason`, `needs`) | regular + blockers | SHOULD |
| **Achèvement** | Toutes les tâches terminées ; le plan se termine | **milestone** | SHOULD |

Les charges utiles dérivent de la couche d'état du plan (`state.json`) lorsqu'elle est présente : `completed` comme résultats (pas de numéros de tâche), `in_progress` depuis la tâche courante, `blockers` depuis `state.json.blocked`. Le message décrit **ce qui a été construit et pourquoi** — jamais de chemins de fichiers, statistiques git, noms de branche ou IDs de plan.

### Application optionnelle par hooks

Avec `dailybot-cli >= 3.1.2`, l'addon **peut** committer des hooks de harness au niveau du dépôt (`dailybot hook session-start | activity | post-commit | stop | dismiss`) soutenus par un registre local par dépôt. Le harness rappelle à l'agent en fin de tour lorsqu'un événement du cycle de vie a été manqué — critique pour les longues sessions sans surveillance où les instructions du prompt s'affaiblissent.

Un rapport de cycle de vie réussi **réinitialise** le registre des hooks, de sorte que les deux couches ne rapportent jamais en double. Les commandes de hooks ne lisent que l'état local et se terminent toujours avec `0`.

### Identité du dépôt et politique de rapports

Committez éventuellement `.dailybot/profile.json` (ou `.dailybot_example/profile.json` comme modèle) pour que chaque contributeur et agent signe les rapports de la même façon. **Ne mettez jamais** de credentials dans ce fichier — un champ `key` est une erreur grave.

Le même fichier peut porter la politique de rapports que les hooks respectent :

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` est particulièrement utile pour les dépôts orientés recherche ou documentation : le travail sans commits (analyse, documents de design, plans) reçoit des rappels plus tôt.

## Installation (tout optionnel)

L'addon **propose** des chemins d'installation ; la skill Dailybot possède le consentement et la vérification.

| Composant | Commande / chemin |
|-----------|----------------|
| **Skill agent Dailybot** (recommandé) | `npx skills add DailybotHQ/agent-skill` |
| **Mettre à jour la skill existante** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (minimum `>= 3.1.2`) | Installée par la skill à la première utilisation via `shared/auth.md` vérifié ; ou `pip install 'dailybot-cli>=3.1.2'`, Homebrew, ou l'installateur avec somme de contrôle sur [cli.dailybot.com](https://cli.dailybot.com) |

Vérifiez les versions : `dailybot --version` et `dailybot version --check`. Mise à niveau : `dailybot upgrade`.

## Authentification — reportée

Cet addon **ne demande jamais** d'e-mail, d'OTP ni de clés API, et **ne stocke jamais** de credentials. L'authentification appartient à [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) de la skill Dailybot :

- `dailybot login` (OTP par e-mail), ou
- `DAILYBOT_API_KEY` / `dailybot config key=...`

Si l'auth est refusée ou indisponible, le reporting est ignoré silencieusement — le travail continue.

## La skill jumelée Dailybot — 13 capacités (3.4.0)

Installer la skill agent Dailybot apporte bien plus que ce que l'addon DWP connecte. Le pack officiel de skills (skill **3.4.0**, CLI **>= 3.1.2**, publication actuelle **3.2.1**) expose **13 sous-skills coordonnées** :

| Sous-skill | Ce qu'elle fait |
|-----------|--------------|
| **Rapports de progression** | Mises à jour d'agent type standup vers le tableau de bord Dailybot |
| **Ask the AI** | Requêtes ponctuelles sans interface à l'assistant IA Dailybot |
| **Sondage de messages** | Vérifier les instructions de l'équipe au démarrage de session ou en inactivité |
| **E-mail** | Envoyer des e-mails avec contrôles de sécurité obligatoires avant envoi |
| **Chat** | Envoyer ou modifier sur Slack, Microsoft Teams, Discord ou Google Chat — canaux, MD, équipes, fils type rapport, envoyer-en-tant-qu'utilisateur (Slack, admin) |
| **Conversations** | Ouvrir ou réutiliser un MD de groupe Slack avec le bot et des coéquipiers nommés ; publier un rapport dans le même appel |
| **Santé et statut** | Annoncer agent en ligne/hors ligne pour les sessions longues |
| **Check-ins** | Compléter les standups ; **autoriser** les check-ins (planification, participants, questions, rappels, paramètres IA) |
| **Kudos** | Reconnaître des coéquipiers ou des équipes entières ; parcourir le fil de reconnaissance, fil org, mur de la renommée |
| **Équipes** | Lister les équipes, inspecter les membres, résoudre les noms en UUIDs ; `me`, `org`, profils utilisateur |
| **Formulaires** | Lister, soumettre, mettre à jour, faire transitionner les formulaires ; **autoriser** les formulaires (états de workflow, permissions, ChatOps) |
| **Workflows** | Lire les workflows org (`workflow list` / `workflow get` ; lecture seule) |
| **Canaux de rapport** | Découvrir les UUIDs de canal pour formulaires ou check-ins |

**L'addon DWP ne connecte que `report` à l'exécution du plan.** Invoquez la skill Dailybot directement pour tout le reste — par exemple publier un résumé de déploiement dans `#releases`, compléter un standup ou demander à l'IA Dailybot de résumer les tendances de check-ins.

Référence publique : [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Source : [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Modèle de confiance : [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) dans le pack de skills.

## Comportement — reporter, ne jamais bloquer

| Règle | Détail |
|------|--------|
| **Reporter** | La skill Dailybot possède installation, consentement, auth, modèles de hooks et style d'écriture |
| **Ne jamais bloquer** | CLI absente, échec d'auth, erreur réseau → avertir une fois, poursuivre le travail principal |
| **Pas de nouvelles tentatives** | Ne pas entrer dans des boucles de diagnostic ; le reporting est en meilleur effort |
| **Réconcilier** | Skill, CLI, profil, hooks ou câblage de rapport existant sont préservés — combler uniquement les lacunes |
| **Neutre vis-à-vis du fournisseur** | DWP n'exige pas Dailybot ; cet addon est une visibilité additive pour l'équipe |

## Flux d'onboarding

Pendant la **Phase 7b** de `onboard` DWP, après le scaffolding AI-first central, le flux propose quatre addons optionnels. Si le développeur accepte Dailybot :

1. Détecter la configuration existante (skill, CLI, `.dailybot/profile.json`, hooks, étape de rapport).
2. Proposer l'installation skill/CLI via les flux de consentement de Dailybot.
3. Reporter l'authentification à `shared/auth.md`.
4. Connecter les quatre événements du cycle de vie dans `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Proposer éventuellement l'application par hooks et `.dailybot/profile.json`.
6. Exécuter la validation (SPEC §8 dans `addons/dailybot/SPEC.md` de la skill).

Contrat normatif dans la skill Deep Work Plan : `addons/dailybot/SPEC.md` (version **2.3.0**).

## Entrées de kit associées

- [Devcontainer](/kit/devcontainer) — environnement de dev reproductible avec persistance de la CLI Dailybot (premier addon)
- [Dependency upgrade](/kit/dependency-upgrade) — mises à niveau de dépendances par lots et validées (troisième addon)
- [Design system](/kit/design-system) — `DESIGN.md` orienté agents pour les surfaces d'interface (quatrième addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — la sous-skill d'onboarding qui propose les addons
