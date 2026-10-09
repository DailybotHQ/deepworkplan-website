---
title: Devcontainer
description: "Un addon facultatif fondé sur devcontainer-kit : un modèle Dev Containers généré par dck init, des images de base sans agents, des machines Herdr par conteneur."
kind: addon
lang: fr
order: 1
---

# Addon devcontainer

Doter le dépôt d’un conteneur de développement reproductible et isolé — utilisable aussi bien par les personnes que par les éditeurs et les agents de code. Dans la **bêta de DWP v7** (`v7.0.0-beta.1`, une préversion), cet addon intègre **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un produit MIT qui fonctionne sans Deep Work Plan, et remplace le modèle que le pack embarquait auparavant. Il est facultatif : un dépôt est pleinement conforme sans lui.

## Ce que fournit devcontainer-kit

- **Un modèle**, fondé sur la spécification [Dev Containers](https://containers.dev), que `dck init` génère dans le dépôt : `devcontainer.json`, un fichier compose et `docker/local/`. Relancé plus tard, il réconcilie et n’écrase jamais vos modifications ; toute modification d’un fichier existant est d’abord affichée et requiert votre consentement.
- **`dck`**, un lanceur qui exécute le conteneur depuis un simple terminal — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — avec ou sans VS Code ou Cursor.
- **Des images de base** en trois variantes, `python-3.13`, `node-24` et `debian`, livrées **sans** agents de code.
- **Une bibliothèque d’entrypoint** pour les volumes persistants, SSH et l’environnement des sessions SSH, au lieu d’un entrypoint recopié à la main dans chaque dépôt.
- **Des machines Herdr.** Chaque conteneur peut rejoindre [Herdr](https://herdr.dev) via un serveur SSH limité au loopback, de sorte que ses agents deviennent des pairs joignables.

## Installation

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Prérequis : `bash` 3.2 ou ultérieur et `python3` 3.11 ou ultérieur sur un hôte Linux ou macOS, ainsi que Docker avec Compose v2 pour les commandes du conteneur. Vérifiez une version à l’aide de son asset `SHA256SUMS`.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/devcontainer-kit`, tag `v0.1.4`, interface 1 |
| Clé de registre | `devcontainer` dans `.dwp/config.json` |
| Configuration par dépôt | `.devcontainer/dck.toml` |
| Détection | `dck doctor --json` |

## Les couches sont à activer explicitement

Les images de base embarquent les outils de développement — git, gh, ripgrep, un serveur SSH, Herdr, et Neovim avec DeepWorkPlan Vim épinglé par tag — et aucun agent de code, aucune CLI de reporting ni aucun secret. Tout le reste est une couche que vous activez dans `dck.toml` :

| Couche | Par défaut | Ce qu’elle ajoute |
|---|---|---|
| `agents` | désactivée | Installe [coding-agents-kit](/kit/agentkit) et les CLI que vous listez, chacune avec son propre volume persistant. Aucune option de contournement des autorisations n’est définie. |
| `editor` | activée | Neovim avec DeepWorkPlan Vim ; désactivée, elle donne un éditeur simple. |

## Sécurité par défaut

- Chaque port publié est lié à `127.0.0.1`, sauf si `dck.toml` définit `bind`.
- Transfert de l’agent SSH depuis l’hôte ; les clés privées de l’hôte ne sont jamais copiées dans un conteneur.
- Les clés d’hôte SSH sont générées à l’exécution dans un volume propre au projet, jamais intégrées à une image ; le serveur n’accepte que les clés publiques, sans connexion root ni mot de passe.
- Le modèle n’ajoute ni `cap_add`, ni mode `privileged`, ni socket Docker.
- Les images de base et les outils sont épinglés par version et vérifiés par somme de contrôle ; compose référence l’image de base par digest chaque fois que le digest peut être résolu.

## Notes

Facultatif et jamais requis. Un dépôt est pleinement conforme avec zéro addon optionnel. La v0.1 prend en charge les hôtes Linux et macOS.
