---
title: Agentkit
description: "Une commande pour chaque agent de code en terminal : un compte par profil, ak pick pour le compte le plus libre, autonomie désactivable, exécutions headless."
kind: addon
lang: fr
order: 8
---

# Addon Agentkit

Chaque agent de code en terminal a ses propres options pour reprendre une session, sa propre manière d’isoler un second compte, son propre mode headless et son propre interrupteur pour ignorer les demandes d’autorisation. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** place une seule surface de commandes au-dessus de tous : `ak <kind> [@profile]`.

Cet addon intègre le kit dans **DWP v7** (pack `v7.9.0`) comme transport de délégation **headless**. Il est facultatif : sans lui, chaque tâche s’exécute dans la session courante, exactement comme avant. Le kit lui-même est un produit MIT qui fonctionne sans Deep Work Plan.

## Ce que vous apporte le kit

- **Une grammaire pour chaque CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` et `ak antigravity`, ainsi que des routes de fournisseur (Z.AI GLM, Azure OpenAI, xAI et l’API Gemini), avec les mêmes options de session : `-c` continue, `-r <id>` reprend.
- **Des profils.** `ak claude @work` exécute un second compte dans son propre répertoire personnel, séparé du premier.
- **Des exécutions headless.** `ak run <kind> -- "<prompt>"` exécute un prompt de manière non interactive et renvoie un code de sortie documenté, éventuellement sous la forme d’un unique objet JSON.
- **Un diagnostic.** `ak doctor --json` indique quelles CLI sont installées, les profils, et les noms des clés définies — jamais leurs valeurs.
- **Des installations vérifiées.** `ak install <cli>` installe une CLI manquante depuis le canal officiel de son éditeur, dans une version épinglée, contrôlée par un sha256 épinglé ou par l’intégrité du registre npm.
- **Des noms familiers.** Deux presets d’alias, désactivés tant que vous ne les activez pas : `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) et `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), chacun équivalant à `ak <kind>`.

## Comptes, quota et choix d’un compte

Depuis `v1.0.1`, chaque profil — y compris `@default` — est un compte indépendant dans son propre répertoire sous la racine des profils, empêchant les fuites d’état et les collisions d’identifiants. `ak profiles` les liste avec leur état de connexion et les noms de leurs clés ; `ak profiles --json` fournit la même liste aux outils (schéma `profiles-v1`). Depuis `v0.5.1`, la commande indique où se trouve réellement le jeton de Claude Code — `file`, `keychain` (macOS), `none` ou `unknown` — par simple présence, sans jamais lire le secret, et reconnaît une connexion Cursor sous Linux, dans un conteneur ou sur un hôte Linux. Depuis `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` désigne le compte qu’utilise un simple `ak <cli>` (un `@profile` positionnel reste prioritaire), et c’est ainsi qu’un conteneur de développement choisit le compte de l’hôte qu’il partage. Depuis `v0.5.3`, `ak codex` ajoute `--no-daemon` lorsqu’un home Codex partagé avec une autre machine consigne un daemon en arrière-plan absent de celle-ci.

`ak usage` (aussi `ak status`) liste chaque compte de chaque CLI que le kit connaît, une ligne par compte et par profil, sous sa CLI : quota en direct pour les abonnements Claude Code (fenêtres de 5 heures, hebdomadaire et par modèle), les connexions Codex via ChatGPT, les clés du forfait de code Z.AI et, depuis `v0.7.0`, les connexions Google à Antigravity sous Linux et dans les conteneurs (les fenêtres de cinq heures et hebdomadaire du panneau `/usage` propre à agy). Un compte dont le quota ne peut pas être lu garde sa ligne : `n/d` avec la façon dont il est connecté et la raison — Cursor, Grok, xAI, Azure OpenAI, une clé d’API Gemini ou une connexion Antigravity conservée dans le trousseau macOS (Keychain) — ou `no login` avec la commande qui le connecte, si bien que le tableau montre aussi quels comptes de chaque CLI sont connectés. La commande est en lecture seule : elle ne renouvelle jamais une connexion, n’affiche jamais un jeton et n’écrit jamais dans un profil. `--json` fournit la même liste aux outils (schéma `usage-v1`). Les points de terminaison d’utilisation sont internes aux fournisseurs et non officiels.

`ak pick <kind>` lit les mêmes lignes et désigne le compte qui a le plus de marge. `--count N` renvoie jusqu’à N comptes, le meilleur en premier ; `--exclude @<profile>` écarte un compte occupé ; `--model` compte la fenêtre hebdomadaire d’un modèle ; `--need 5h:40` refuse de choisir sans cette marge. `--json` fournit le schéma `pick-v1`.

```bash
ak usage                   # quota de chaque compte et profil
ak pick claude --count 3   # les trois comptes Claude qui ont le plus de marge
ak claude @work --trust-cwd  # un second compte, dossier déjà approuvé
ak profiles --json         # profiles-v1, pour les outils
ak setup verify            # des vérifications ordonnées, chacune avec sa commande de réparation
```

`--trust-cwd` (ou `AGENTKIT_TRUST_CWD=1`) approuve à l’avance le dossier dans lequel l’agent démarre, si bien que Claude Code et Codex s’ouvrent sans leur écran de confiance de dossier. `ak setup probe | verify | docker` est un assistant en lecture seule, piloté par le skill `agentkit-setup`, qui inspecte la machine, vérifie l’installation et produit une recette de conteneur épinglée par tag et vérifiée.

## Plusieurs agents, plusieurs comptes

Le skill `agentkit-orchestrate` (`ak --skill orchestrate`) apprend à un agent à répartir le travail entre plusieurs agents, comptes et fournisseurs : un `ak usage` avant le lot, `ak pick --count N` pour choisir les comptes, un délégué par compte, la porte de validation du dépôt lui-même sur chaque résultat, et un basculement vers le compte suivant quand l’un atteint une limite. Le kit observe, calcule et exécute ; il n’ordonnance jamais. Le coordinateur — vous, ou un agent à qui vous l’avez demandé — décide, en n’utilisant que vos propres comptes et dans le respect des conditions de chaque fournisseur.

Pour les couloirs longs et interactifs, chaque couloir tourne dans un panneau [Herdr](/kit/herdr) sur son propre compte. Le chapitre de la méthodologie [Faire tourner de nombreux agents](/methodology/06-orchestration) décrit le modèle complet : un coordinateur et ses couloirs, des comptes choisis selon leur marge, la coordination via herdr-peers, et une branche et une publication par dépôt ; [Autonomie de l’essaim](/fr/methodology/07-swarm-autonomy) ajoute les vérifications de capacité, la passation et la succession du coordinateur.

## Capacité et baux

Depuis `v0.6.0`, un agent peut demander de combien de marge dispose son propre compte, à faible coût, à chaque frontière de tâche — le signal qui permet à un essaim de passer le travail avant qu’un compte ne s’épuise ([Autonomie de l’essaim](/fr/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (schéma `capacity-v1`) donne le `headroom_pct` du compte en cours, sa `binding_window`, `resets_at` et un `verdict` : `ok`, `low` (25 % ou moins), `critical` (10 % ou moins, ou limité en débit) ou `unknown` (aucune source de quota : Cursor, Grok ou Antigravity sous macOS). La commande utilise l’arithmétique de `ak pick`, si bien que les deux ne divergent jamais, et lit un cache d’utilisation conservé 300 secondes (`--max-age`), si bien qu’une vérification à chaque frontière de tâche reste peu coûteuse. `--self` résout le compte que `ak` a lancé ; en dehors d’un lancement par `ak`, elle sort avec le code 3 et ne devine jamais. `ak usage` lit toujours en direct et rafraîchit le cache.
- **Seuils et exercices.** `AGENTKIT_CAPACITY_LOW` et `AGENTKIT_CAPACITY_CRITICAL` (ou `--low` et `--critical`) déplacent les seuils. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` ne peut qu’abaisser une lecture — c’est ainsi qu’un exercice fait paraître un compte à court de marge — et ne peut jamais en faire paraître un plus riche.
- **`ak lease <kind> @<profile> --owner <addr>`** réserve un compte pour un couloir ; `ak lease release …` le libère une fois qu’un successeur a accepté la passation, et `ak lease ls` liste les baux (schéma `leases-v1`). Un profil Codex n’accepte qu’un seul bail — un rédacteur par fichier d’authentification — et seul le titulaire libère un bail. Les baux expirent et sont des enregistrements indicatifs de nombres, de noms de profils et d’adresses de panneaux, jamais un identifiant.
- **`ak pick <kind> --owner <lead>`** compte chaque bail actif, y compris ceux du titulaire : il classe les candidats selon `headroom / (1 + leases)` et ne propose jamais un compte Codex réservé, pas même à son détenteur. `--reuse @<profile>` transmet l’un des baux du titulaire, par exemple au successeur d’un couloir. Sans `--owner`, le classement est inchangé.

```bash
ak capacity --self --json                        # la marge et le verdict de cet agent
ak lease claude @work --owner local:w2:p1        # réserver un compte pour un couloir
ak pick codex --owner local:w1:p1 --count 2      # écarter les comptes réservés par d’autres
```

Le travail ne circule qu’entre les comptes que vous avez déclarés pour le plan, dans le respect des conditions de chaque fournisseur : aucun agent ne crée de compte, ne renouvelle une connexion ni ne dépense une réinitialisation Codex. Le pack Deep Work Plan lit le verdict via son propre helper et le traduit en continuer, préparer ou passer la main ; sans le kit, ou avec une version plus ancienne, la capacité est signalée comme inconnue, jamais comme ok.

## Installation

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Prérequis : `bash` sous macOS ou Linux, et `python3` 3.9 ou ultérieur ; rien d’autre. Windows utilise `install.ps1`. Épinglez `v1.1.0` : `v0.2.0` et `v0.2.1` ne sont pas prises en charge. Vérifiez une version à l’aide de son asset `SHA256SUMS`.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/coding-agents-kit`, tag `v1.1.0`, interface 1 |
| Clé de registre | `agentkit` dans `.dwp/config.json` |
| Transport | headless : un `ak run` par délégué dans un worktree git dédié |
| Fournit | `subagents`, `cancel_children`, `model_routing` |
| Requiert | l’octroi `agent_delegation` du contrat du plan |

**Stable depuis `v1.0.0`.** L’interface publique du kit suit le versionnage sémantique et ne change de façon incompatible que dans une nouvelle version majeure : la surface de commandes (`ak <kind> [@profile]` pour chaque type défini dans `providers.toml`, et chaque verbe avec ses options documentées), la posture de permissions, l’interface 1 (`ak doctor --json`, `ak env`, la grammaire et l’enveloppe de `ak run`), les schémas JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, `setup-verify-v1`), ainsi que l’arborescence installée et les noms des variables du fichier d’environnement. `v1.0.0` ne modifie aucune commande, option, clé ni aucun schéma par rapport à `v0.7.1`.

## L’autonomie par défaut, avec un retrait qui l’emporte toujours

Depuis `v0.2.0`, `ak <kind>` lance chaque agent en **autonomie** : il ajoute l’option d’autonomie propre à la CLI, conservée uniquement dans le `providers.toml` du kit. L’autonomie est destinée aux environnements jetables ou isolés, comme un conteneur de développement.

Le **retrait l’emporte toujours** : `--ask` sur une commande, ou `AGENTKIT_PERMISSIONS=ask` dans l’environnement ou dans le fichier env du kit, supprime l’option même lorsque la même commande indique `--auto`. Une session en retrait transmet le retrait aux agents qu’elle lance. Sur un hôte, activez le retrait.

L’addon n’écrit aucune option d’autonomie et ne passe jamais `--auto`. Il passe `--ask` lorsqu’un plan consigne le retrait. Un plan qui octroie `agent_delegation` sur un hôte accepte des délégués autonomes confinés à leur propre worktree, qui n’est pas un sandbox.

## Ce qu’il ajoute à un plan

Sur un plan v7 dont le contrat octroie `agent_delegation`, `execute` peut confier une tâche `parallel_safe` à une autre CLI : il crée un worktree git dédié, y exécute `ak run` avec un délai d’expiration, et recueille le résultat dans le dossier `analysis_results/delegations/` du plan. Le résultat est une preuve `asserted` tant que l’exécuteur de portes du plan lui-même ne l’a pas observé. Annuler un délégué arrête toute son arborescence de processus.

## Agentkit ou Herdr

| Situation | Utiliser |
|---|---|
| Une tâche `parallel_safe` délimitée avec une sortie déclarée | Agentkit (headless) |
| La tâche nécessite une interaction, dure longtemps ou se trouve sur une autre machine | [Herdr](/kit/herdr) (un pair dans un panneau) |

Les deux se combinent : herdr-peers peut lancer un pair dans un panneau avec l’environnement qu’affiche `ak env <kind> @profile`. Pour de nombreux couloirs à la fois, voir [Faire tourner de nombreux agents](/methodology/06-orchestration).

## Notes

Facultatif et jamais requis. Les valeurs des clés d’API ne sont jamais affichées, journalisées ni écrites dans un fichier de configuration ; l’exception documentée est Cline, qui reçoit sa clé sur la ligne de commande. L’extraction des résultats pour OpenCode, Pi, Cline et Grok est construite à partir de la documentation des éditeurs et n’a pas encore été éprouvée sur des comptes réels ; une sortie inconnue se rabat sur le texte brut.
