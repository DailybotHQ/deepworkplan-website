---
title: Devcontainer
description: "Un conteneur de développement reproductible par dépôt, depuis un modèle : agents sur vos comptes d’hôte via ak, Herdr dans les deux sens, clés SSH sur option."
kind: addon
lang: fr
order: 1
---

# Addon devcontainer

Donnez au dépôt un conteneur de développement reproductible et isolé, utilisable aussi bien par les personnes que par les éditeurs et les agents de code. Dans **DWP v7** (pack `v7.7.1`), cet addon intègre **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un produit MIT qui fonctionne sans Deep Work Plan. Il est facultatif : un dépôt est pleinement conforme sans lui.

## Ce que fournit devcontainer-kit

- **Un modèle**, fondé sur la spécification [Dev Containers](https://containers.dev), que `dck init` génère dans le dépôt selon une structure fixe : `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` et `dev.sh`. Relancé plus tard, il réconcilie et n’écrase jamais vos modifications ; toute modification d’un fichier existant est d’abord affichée et nécessite votre consentement.
- **Le conteneur propre au dépôt.** Le Dockerfile part de l’image officielle du runtime épinglée par digest (`node-24`, `python-3.13` ou `debian`) et copie les étapes de build du kit dans `docker/local/<service>/dck/`. Aucune image de base partagée n’intervient.
- **`dev.sh` et `dck`.** `bash dev.sh up` construit, démarre et rattache le conteneur depuis un simple terminal ; `shell`, `rebuild`, `doctor` et les autres fonctionnent avec ou sans VS Code ou Cursor.
- **Herdr dans les deux sens.** Le [Herdr](https://herdr.dev) de l’hôte rattache chaque conteneur comme une machine via un serveur SSH limité au loopback, et le conteneur s’ouvre avec la barre latérale standard : App, Editor, Development et Agents. Chaque espace de travail et chaque panneau, y compris ceux ouverts plus tard, démarrent dans le chemin de l’application (`/app` par défaut). À l’intérieur, [herdr-peers](/kit/herdr) permet aux agents d’interroger des agents sur l’hôte et dans d’autres conteneurs.
- **La skill `dck-dockerfile`.** Un agent crée ou régénère le conteneur d’un dépôt à la demande et le valide par un build réel.

## Installation

```bash
git clone --branch v0.3.7 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Prérequis : `bash` 3.2 ou ultérieur et `python3` 3.11 ou ultérieur sur un hôte Linux ou macOS, et Docker avec Compose v2 pour les commandes du conteneur. Vérifiez une version à l’aide de son asset `SHA256SUMS`. Épinglez `v0.3.7` : `v0.2.0` n’est pas prise en charge.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/devcontainer-kit`, tag `v0.3.7`, interface 2 |
| Clé de registre | `devcontainer` dans `.dwp/config.json` |
| Configuration par dépôt | `.devcontainer/dck.toml` |
| Détection | `dck doctor --json` |

## Couches

Chaque conteneur embarque les outils de développement (git, gh, ripgrep, un serveur SSH, Herdr et herdr-peers) et aucun secret, sauf si vous activez les [comptes de l’hôte](#comptes-de-lhôte-dans-le-conteneur). Le reste est une couche que vous choisissez dans `dck.toml` :

| Couche | Par défaut | Ce qu’elle ajoute |
|---|---|---|
| `agents` | désactivée | [coding-agents-kit](/kit/agentkit) depuis sa version vérifiée et les CLI que vous indiquez, chacune avec son propre volume persistant, ainsi que les presets `classic` (`claudex`, `codexx`, …) et `providers` (`claude-glm`, `codex-azure`, …). Les agents s’exécutent en autonomie par défaut : le conteneur est le sandbox. Pour la désactiver : `AGENTKIT_PERMISSIONS=ask` dans le `.env` du service. |
| `editor` | activée | Neovim avec [DeepWorkPlan Vim](/kit/vim) épinglé par tag ; désactivée, elle laisse un éditeur simple. |
| `dailybot` | désactivée | La CLI Dailybot, pour l’addon dailybot. |

Les connexions, `gh`, la configuration de Herdr et l’identité git survivent à `bash dev.sh rebuild`. Avec la couche `agents`, l’image embarque aussi les trois skills de coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), liées dans le répertoire de skills de chaque agent à chaque démarrage, si bien qu’un conteneur recréé les conserve.

Le volume d’état (clé d’hôte SSH, `~/.ssh`, connexion `gh`, état du client Herdr, historique) s’appelle `state`. Lorsque plusieurs services partagent un même projet compose, donnez à chacun son propre nom avec `[compose] state_volume` dans `dck.toml` (ou `dck init --state-volume NAME`) ; sinon, ils montent tous le même volume, et `dck doctor` le signale.

## Des agents sur plusieurs machines

Depuis `v0.2.3`, `dck up` établit un maillage bidirectionnel sans aucune étape manuelle, sous Docker Desktop :

- **Les conteneurs et l’hôte.** Les agents du conteneur atteignent les agents Herdr de l’hôte, de chacun des autres conteneurs dck et des autres conteneurs loopback que le Herdr de votre hôte gère déjà — et ceux-ci les atteignent en retour. Chaque pair porte une clé d’hôte épinglée ; rien n’est approuvé à la première utilisation.
- **Un listener d’hôte facultatif.** `dck setup` propose, une seule fois, un serveur SSH au niveau utilisateur sur `127.0.0.1` qui n’accepte que la clé dck et que launchd maintient en fonctionnement (macOS). Si vous exécutez déjà un listener loopback, faites plutôt pointer le profil d’hôte vers celui-ci. `dck host listener disable` le supprime.
- **Résiste aux reconstructions.** Le catalogue de machines Herdr du conteneur réside sur un volume, si bien que `bash dev.sh rebuild` conserve chaque machine qui y est enregistrée. Depuis `v0.3.2`, `rebuild`, `start` et `restart` exécutent les mêmes étapes que `up` : le conteneur est de nouveau enregistré auprès du Herdr de l’hôte, sa clé d’hôte est de nouveau épinglée et le maillage est propagé, si bien qu’un conteneur reconstruit de zéro atteint aussitôt l’hôte et ses pairs.
- **Panneaux Codex dans un conteneur.** Un agent Codex a besoin de `HERDR_PEERS_SELF`, l’identifiant de machine du conteneur tel qu’il est enregistré sur l’hôte, pour interroger des pairs sur d’autres machines. Depuis `v0.3.3`, le kit consigne cet identifiant à chaque enregistrement et les shells de connexion du conteneur l’exportent, si bien qu’aucun agent ne le définit à la main ; `dck doctor` signale toute divergence. Depuis `v0.3.4`, les configurations Codex propres au conteneur ignorent la vérification de mise à jour de Codex au démarrage et son daemon en arrière-plan (le kit épingle la version de chaque CLI), sans jamais toucher au home Codex de votre hôte ni à un profil partagé.
- **Des réponses depuis l’hôte aussi.** `dck setup` installe sur l’hôte un [herdr-peers](/kit/herdr) vérifié, si bien que `dck agents` et `dck ask` y fonctionnent, et les agents de l’hôte répondent avec `herdr-peers reply`.
- **Les conteneurs que le kit n’a pas créés.** Listez les clés publiques avec lesquelles ils se connectent sous `[ssh] authorized_extra` dans votre profil d’hôte, et ils pourront eux aussi atteindre les conteneurs dck.

Associez-le à [coding-agents-kit](/kit/agentkit) sur l’hôte et dans le conteneur, et le même `ak` lance des agents des deux côtés.

## Comptes de l’hôte dans le conteneur

Un conteneur peut utiliser les comptes que vous avez déjà sur l’hôte, de la même façon que git fonctionne déjà via l’agent SSH de l’hôte, sans aucune connexion à l’intérieur. C’est facultatif et cela se règle dans votre **profil d’hôte**, jamais dans le `dck.toml` d’un dépôt :

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

Avec `host_profiles` activé, `dck up` ne partage que les profils des CLI que le dépôt installe :

- **Claude Code** via un jeton longue durée par profil : `CLAUDE_CODE_OAUTH_TOKEN` pour `@default` et `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` pour `@name` (le suffixe en majuscules, tout caractère hors de `A-Z`, `0-9` et `_` remplacé par `_`).
- **Codex** via son fichier d’authentification, pour `@default` et pour chaque profil.
- **Le fichier d’environnement du kit**, en lecture seule et réduit aux noms de `host_env_keys`.

Le home complet d’agentkit n’est jamais monté, et les profils qui contiennent des chemins absolus de l’hôte sont ignorés. Une connexion Codex partagée en lecture-écriture peut être renouvelée par deux rédacteurs à la fois : gardez un seul agent actif par compte Codex. `[agents] default_profile` dans le profil d’hôte (par exemple `{ claude = "@work3" }`) fait qu’un simple `ak claude` à l’intérieur utilise ce compte partagé (coding-agents-kit ≥ `v0.5.2`) ; une connexion Claude `@default` sous macOS réside dans le trousseau (Keychain) et ne peut pas être partagée. Depuis `v0.3.4`, les shells du conteneur font aussi pointer un simple `claude` ou `codex` vers ce compte, si bien que les panneaux restaurés par Herdr s’ouvrent sur celui-ci au lieu d’un écran de connexion. Dans le conteneur, le même `ak <kind> @<profile>` tourne sur le même compte que sur l’hôte, ce qui permet à un coordinateur de confier aux couloirs du conteneur les comptes choisis par `ak pick` — voir [Faire tourner de nombreux agents](/methodology/06-orchestration).

## Plusieurs dépôts, une seule pile compose

Depuis `v0.3.3`, un dépôt dont le service fait partie d’un projet compose plus vaste (une API, une application web, des workers et une base de données qui partagent un projet) peut le rejoindre sans modifier à la main ce que dck génère. Tout est additif : un dépôt qui ne définit aucune de ces clés est généré exactement comme avant.

- **Un projet, un volume d’état par service.** `[compose] project` nomme le projet partagé dans chaque dépôt ; `state_volume`, `[compose] networks` et `[compose] volumes` séparent l’état de chaque service ainsi que les volumes de données et les réseaux de la pile.
- **Un bloc utilisateur.** Les lignes entre `# >>> user:<service> >>>` et `# <<< user:<service> <<<` dans le service dck sont conservées telles quelles : des clés simples pour ce que dck ne génère pas (`depends_on`, `healthcheck`), et `x-dck-merge:` pour les clés qu’il génère. Un fichier qui ne contient qu’une partie des marqueurs de dck est refusé avec la correction à apporter au lieu d’être réécrit.
- **Chaînes de ports.** `ssh_port` et `ports` acceptent des expressions compose comme `"${API_PORT:-8000}:8000"` ; elles restent sur `127.0.0.1` sauf si la chaîne indique une IP d’hôte.
- **Builds partagés et votre propre lanceur.** `[build] context` et `[build] dockerfile` couvrent un Dockerfile partagé par plusieurs services ; `dev_sh = false` conserve le `dev.sh` propre au dépôt.
- **Satellites d’espace de travail.** Depuis `v0.3.5`, une seconde instance du service dans son propre projet compose démarre et s’arrête via dck (`dck --project P --compose-file F --service S up` ou `down`), si bien qu’elle obtient la même clé d’hôte, les mêmes comptes, la même identité git et la même machine Herdr que l’instance principale ; `up --seed-state-from VOLUME` copie uniquement les connexions dans son volume d’état vide. Dans un fichier de surcharge, `extends` doit nommer le fichier qu’il étend.
- **Node pour les agents.** Le Node propre aux agents réside sous `/opt/dck/node` et ne remplace jamais celui de l’image ; `[agents] node_first = true` le place en tête du PATH lorsque l’outillage du dépôt en a besoin.

## Les clés SSH de l’hôte dans le conteneur

Certains outils ne lisent que des fichiers de clé et ignorent l’agent transféré : `gh auth login`, par exemple, propose de générer une nouvelle clé. Depuis `v0.3.2`, vous pouvez l’activer, uniquement dans votre **profil d’hôte** (le `dck.toml` d’un dépôt ne peut pas le définir ; `dck setup` pose la question une fois, non par défaut) :

```toml
[ssh]
copy_keys = true              # default false
```

Tant que l’option est active, `dck up` monte le `~/.ssh` de l’hôte en lecture seule sur `~/.ssh_host`, et chaque démarrage copie ses clés `id_*` dans le `~/.ssh` du conteneur (clés privées en `0600`), synchronisées avec l’hôte. Le transfert d’agent reste inchangé, et la désactivation supprime les copies au démarrage suivant. Le coût : tout le `~/.ssh` de l’hôte est lisible dans le conteneur, et les clés privées reposent dans le volume d’état.

## Sécurité par défaut

- Chaque port publié est lié à `127.0.0.1`, sauf si `dck.toml` définit `bind`.
- Git sur SSH passe par l’agent SSH de l’hôte : son socket, jamais un fichier de clé et jamais un `~/.ssh` ou un `~/.gitconfig` monté, sauf si vous avez activé [`copy_keys`](#les-clés-ssh-de-lhôte-dans-le-conteneur) dans votre profil d’hôte. L’identité git provient des valeurs `DCK_GIT_*` que renseigne `dck setup`.
- Les clés d’hôte SSH sont générées à l’exécution dans un volume propre au projet, jamais intégrées à une image ; le serveur n’accepte que les clés publiques, sans connexion root ni mot de passe.
- Le modèle n’ajoute ni `cap_add`, ni mode `privileged`, ni socket Docker.
- Chaque téléchargement est épinglé par version et vérifié par somme de contrôle ; l’image de base est épinglée par digest.
- Le maillage Herdr qui permet aux agents d’un conteneur d’atteindre les autres est activé par défaut et documenté, avec ses moyens de désactivation, dans le modèle de menaces du kit. Le listener d’hôte permet au code d’un conteneur en cours d’exécution d’ouvrir un shell sur l’hôte en votre nom : il ne s’active que sur demande, se limite au loopback, n’accepte que la clé dck et se retire avec `dck host listener disable`.

## Notes

Facultatif et jamais requis. Un dépôt est pleinement conforme avec zéro addon facultatif. La v0.2 prend en charge les hôtes Linux et macOS ; le maillage entre conteneurs nécessite Docker Desktop.
