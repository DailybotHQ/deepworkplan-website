---
title: Devcontainer
description: "Un conteneur de développement reproductible par dépôt, depuis un modèle : agents prêts via ak, Herdr relié dans les deux sens et aucune clé SSH à l'intérieur."
kind: addon
lang: fr
order: 1
---

# Addon devcontainer

Donnez au dépôt un conteneur de développement reproductible et isolé, utilisable aussi bien par les personnes que par les éditeurs et les agents de code. Dans **DWP v7** (pack `v7.4.0`), cet addon intègre **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un produit MIT qui fonctionne sans Deep Work Plan. Il est facultatif : un dépôt est pleinement conforme sans lui.

## Ce que fournit devcontainer-kit

- **Un modèle**, fondé sur la spécification [Dev Containers](https://containers.dev), que `dck init` génère dans le dépôt selon une structure fixe : `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` et `dev.sh`. Relancé plus tard, il réconcilie et n’écrase jamais vos modifications ; toute modification d’un fichier existant est d’abord affichée et nécessite votre consentement.
- **Le conteneur propre au dépôt.** Le Dockerfile part de l’image officielle du runtime épinglée par digest (`node-24`, `python-3.13` ou `debian`) et copie les étapes de build du kit dans `docker/local/<service>/dck/`. Aucune image de base partagée n’intervient.
- **`dev.sh` et `dck`.** `bash dev.sh up` construit, démarre et rattache le conteneur depuis un simple terminal ; `shell`, `rebuild`, `doctor` et les autres fonctionnent avec ou sans VS Code ou Cursor.
- **Herdr dans les deux sens.** Le [Herdr](https://herdr.dev) de l’hôte rattache chaque conteneur comme une machine via un serveur SSH limité au loopback, et le conteneur s’ouvre avec la barre latérale standard : App, Editor, Development et Agents. Chaque espace de travail et chaque panneau, y compris ceux ouverts plus tard, démarrent dans le chemin de l’application (`/app` par défaut). À l’intérieur, [herdr-peers](/kit/herdr) permet aux agents d’interroger des agents sur l’hôte et dans d’autres conteneurs.
- **La skill `dck-dockerfile`.** Un agent crée ou régénère le conteneur d’un dépôt à la demande et le valide par un build réel.

## Installation

```bash
git clone --branch v0.2.9 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Prérequis : `bash` 3.2 ou ultérieur et `python3` 3.11 ou ultérieur sur un hôte Linux ou macOS, et Docker avec Compose v2 pour les commandes du conteneur. Vérifiez une version à l’aide de son asset `SHA256SUMS`. Épinglez `v0.2.9` : `v0.2.0` n’est pas prise en charge.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/devcontainer-kit`, tag `v0.2.9`, interface 2 |
| Clé de registre | `devcontainer` dans `.dwp/config.json` |
| Configuration par dépôt | `.devcontainer/dck.toml` |
| Détection | `dck doctor --json` |

## Couches

Chaque conteneur embarque les outils de développement (git, gh, ripgrep, un serveur SSH, Herdr et herdr-peers) et aucun secret. Le reste est une couche que vous choisissez dans `dck.toml` :

| Couche | Par défaut | Ce qu’elle ajoute |
|---|---|---|
| `agents` | désactivée | [coding-agents-kit](/kit/agentkit) depuis sa version vérifiée et les CLI que vous indiquez, chacune avec son propre volume persistant, ainsi que les presets `classic` (`claudex`, `codexx`, …) et `providers` (`claude-glm`, `codex-azure`, …). Les agents s’exécutent en autonomie par défaut : le conteneur est le sandbox. Pour la désactiver : `AGENTKIT_PERMISSIONS=ask` dans le `.env` du service. |
| `editor` | activée | Neovim avec [DeepWorkPlan Vim](/kit/vim) épinglé par tag ; désactivée, elle laisse un éditeur simple. |
| `dailybot` | désactivée | La CLI Dailybot, pour l’addon dailybot. |

Les connexions, `gh`, la configuration de Herdr et l’identité git survivent à `bash dev.sh rebuild`.

## Des agents sur plusieurs machines

Depuis `v0.2.3`, `dck up` établit un maillage bidirectionnel sans aucune étape manuelle, sous Docker Desktop :

- **Les conteneurs et l’hôte.** Les agents du conteneur atteignent les agents Herdr de l’hôte, de chacun des autres conteneurs dck et des autres conteneurs loopback que le Herdr de votre hôte gère déjà — et ceux-ci les atteignent en retour. Chaque pair porte une clé d’hôte épinglée ; rien n’est approuvé à la première utilisation.
- **Un listener d’hôte facultatif.** `dck setup` propose, une seule fois, un serveur SSH au niveau utilisateur sur `127.0.0.1` qui n’accepte que la clé dck et que launchd maintient en fonctionnement (macOS). Si vous exécutez déjà un listener loopback, faites plutôt pointer le profil d’hôte vers celui-ci. `dck host listener disable` le supprime.
- **Résiste aux reconstructions.** Le catalogue de machines Herdr du conteneur réside sur un volume, si bien que `bash dev.sh rebuild` conserve chaque machine qui y est enregistrée.
- **Des réponses depuis l’hôte aussi.** `dck setup` installe sur l’hôte un [herdr-peers](/kit/herdr) vérifié, si bien que `dck agents` et `dck ask` y fonctionnent, et les agents de l’hôte répondent avec `herdr-peers reply`.
- **Les conteneurs que le kit n’a pas créés.** Listez les clés publiques avec lesquelles ils se connectent sous `[ssh] authorized_extra` dans votre profil d’hôte, et ils pourront eux aussi atteindre les conteneurs dck.

Associez-le à [coding-agents-kit](/kit/agentkit) sur l’hôte et dans le conteneur, et le même `ak` lance des agents des deux côtés.

## Sécurité par défaut

- Chaque port publié est lié à `127.0.0.1`, sauf si `dck.toml` définit `bind`.
- Git sur SSH passe par l’agent SSH de l’hôte : son socket, jamais un fichier de clé et jamais un `~/.ssh` ou un `~/.gitconfig` monté. L’identité git provient des valeurs `DCK_GIT_*` que renseigne `dck setup`.
- Les clés d’hôte SSH sont générées à l’exécution dans un volume propre au projet, jamais intégrées à une image ; le serveur n’accepte que les clés publiques, sans connexion root ni mot de passe.
- Le modèle n’ajoute ni `cap_add`, ni mode `privileged`, ni socket Docker.
- Chaque téléchargement est épinglé par version et vérifié par somme de contrôle ; l’image de base est épinglée par digest.
- Le maillage Herdr qui permet aux agents d’un conteneur d’atteindre les autres est activé par défaut et documenté, avec ses moyens de désactivation, dans le modèle de menaces du kit. Le listener d’hôte permet au code d’un conteneur en cours d’exécution d’ouvrir un shell sur l’hôte en votre nom : il ne s’active que sur demande, se limite au loopback, n’accepte que la clé dck et se retire avec `dck host listener disable`.

## Notes

Facultatif et jamais requis. Un dépôt est pleinement conforme avec zéro addon facultatif. La v0.2 prend en charge les hôtes Linux et macOS ; le maillage entre conteneurs nécessite Docker Desktop.
