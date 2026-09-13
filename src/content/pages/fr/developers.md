---
title: "Développeurs — l’API pour agents de Deep Work Plan"
description: "La surface pour agents de Deep Work Plan : API versionnée, en lecture seule et sans authentification — OpenAPI, MCP, Markdown en 17 langues et CLI officielle."
---

## Sans authentification, par conception

Il n’y a aucune clé d’API à générer, aucun flux OAuth et aucun bac à sable séparé de la production — c’est la surface de production elle-même qui sert de bac à sable. C’est une propriété délibérée de la méthodologie : les agents ne peuvent pas remplir les formulaires « contact commercial », donc le site n’en demande jamais.

- **Lecture seule** — chaque opération est un GET sûr et mettable en cache, sauf l’endpoint MCP (POST). Il n’existe aucune opération d’écriture.
- **Aucune clé d’API** — aucune inscription, aucun jeton, aucun palier de limite de débit. L’accès anonyme est le contrat documenté, déclaré dans [/auth.md](https://deepworkplan.com/auth.md).
- **Gratuit et open source** — le contenu du site et la skill DWP sont sous licence MIT.
- **Pensé d’abord pour les machines** — erreurs JSON structurées sur `/api/*`, corps de récupération 404 en Markdown, un catalogue d’API RFC 9727 et un manifeste de capacités ARD.

## Planifier et exécuter avec la skill

L’API décrite ci-dessus permet à un agent de lire ce site. La skill DWP est ce qui permet à un agent d’exécuter la méthodologie — installez-la une fois dans un dépôt, et elle fournit un routeur plus neuf sub-skills, invoquées comme des commandes slash (ou par leur nom, pour les agents qui interceptent le `/` — la plupart utilisent `#` à la place, par exemple `#dwp-execute`).

Chaque plan choisit une valeur sur chacun des deux axes indépendants :

- **Lite** — les enregistrements de tâches vivent en ligne dans le README du plan, derrière des ancres stables `#task-N`. Conçu pour un travail petit et borné : une seule préoccupation, environ une session.
- **Full** — un fichier par tâche sous `N.task_<slug>.md`, pour un travail à long horizon s’étendant sur des heures ou des jours, ou lorsque les tâches ont de vraies dépendances. Un plan Lite est promu en Full plus tard avec `/dwp-refine promote`.
- **Guided (par défaut)** — `dwp-create` analyse l’objectif, le décompose et matérialise un plan relisible, puis demande : le conserver, promouvoir Lite en Full, le modifier, ou arrêter. Un humain reste dans la boucle avant que tout travail produit ne commence.
- **Trust (ou auto)** — ajoutez `trust` (ou `auto`) comme dernier mot, par exemple `/dwp-create <goal> trust`, et l’agent saute le tour de relecture et renvoie directement la commande d’exécution.

Les neuf sub-skills :

| Commande | Objectif |
|----------|----------|
| `/dwp-create <goal>` | Transforme un objectif en plan — Lite par défaut, Full pour un travail plus important. |
| `/dwp-execute` | Exécute un plan existant tâche par tâche : le lit intégralement, exécute chaque tâche dans l’ordre, valide sa porte, met à jour la progression. |
| `/dwp-refine` | Ajoute, supprime ou réordonne des tâches dans un plan existant tout en préservant le travail terminé et ses preuves enregistrées. |
| `/dwp-resume` | Reconstruit l’état à partir des propres fichiers du plan et poursuit un plan interrompu depuis sa première tâche incomplète. |
| `/dwp-status` | Rapporte la progression d’un plan — tâches terminées, en cours, en attente — sans effectuer aucun changement. |
| `/dwp-verify` | Vérifie, mécaniquement, si le dépôt est AI-first et si ses plans sont bien formés. Ne change rien ; rapporte réussite ou échec. |
| `/deepworkplan-onboard` | Rend un dépôt AI-first : raisonne sur sa stack, puis génère un `AGENTS.md` adapté, `docs/`, `.agents/`, et un `.dwp/` ignoré par git. |
| `/skill-create`, `/agent-create` | La sub-skill auteure : fait grandir le kit propre du dépôt — une skill réutilisable pour une procédure répétable, ou un agent pour un rôle récurrent avec son propre modèle et ses propres outils. |
| `/dwp-upgrade` | Vérifie s’il existe une version plus récente de la skill publiée et, seulement après approbation explicite, l’installe et relance l’intégration. |

Une correction petite et bornée — Lite, trust :

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Travail à long horizon — Full, guided :

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

La sortie de chaque plan — manifeste, journal de progression, enregistrements de tâches, preuves de porte — vit dans un répertoire `.dwp/` ignoré par git, dans le dépôt lui-même. Rien n’est envoyé à ni stocké par deepworkplan.com ; la skill n’effectue aucun appel réseau.

## Endpoints

| Méthode | Chemin | Rôle |
|---------|--------|------|
| GET | `/openapi.json` | Spécification OpenAPI 3.1 de toute l’API pour agents. |
| GET | `/llms.txt` | Sélection d’indications pour les LLM — le point d’entrée recommandé. |
| GET | `/init.md` | Le prompt canonique d’adoption de DWP. |
| GET | `/{page}.md` | N’importe quelle page en Markdown source, dans les 17 langues. |
| GET | `/api/health.json` | Marqueur d’état statique. |
| GET | `/api/v1/index.json` | Catalogue versionné de la famille v1 : chemins des endpoints, version du site et liens vers la spécification. |
| GET | `/api/v1/sections.json` | Le plan du site en JSON typé — nom, chemin et description par section. |
| GET | `/api/v1/pages.json` | Tous les endpoints Markdown dans chaque langue, groupés par code de langue. |
| GET | `/api/v1/health.json` | Marqueur d’état versionné — le miroir v1 de `/api/health.json`. |
| POST | `/api/mcp` | Serveur MCP (Streamable HTTP, sans état). |
| GET | `/.well-known/ai-catalog.json` | Manifeste de capacités ARD (agentmap). |

Les chemins `/api/*` inconnus renvoient une erreur JSON structurée avec une piste de résolution, jamais une page d’erreur HTML.

## Versionnement et dépréciation

La famille JSON versionnée vit sous `/api/v1/` — index, sections, pages et health — et les chemins canoniques non versionnés (`/llms.txt`, `/{page}.md`, `/api/mcp`) appartiennent au même contrat v1. Les changements cassants paraissent uniquement dans une nouvelle famille `/api/v{N+1}/`, jamais au sein de v1. Quand un endpoint est déprécié, ses réponses portent `Deprecation: true` et une date `Sunset` au moins 180 jours avant le retrait, et un en-tête `Link` pointe vers le successeur.

## Limites de débit

Les réponses sur `/api/*` portent des en-têtes de limite RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` et `RateLimit-Policy` — pour que les agents puissent s’auto-réguler en temps réel ; une réponse `429` ajoute `Retry-After`. L’application est best-effort en périphérie (120 requêtes par 60 secondes par visiteur) et l’accès reste anonyme : pas de clés, pas d’inscription, pas de paliers.

## Serveur MCP

Un serveur Model Context Protocol sans état sur Streamable HTTP à l’adresse `https://deepworkplan.com/api/mcp`. Trois outils en lecture seule :

- `get_init_prompt` — le prompt canonique d’adoption de /init.md.
- `list_site_sections` — le plan du site avec des descriptions en une ligne.
- `read_page` — n’importe quelle page en Markdown source natif, p. ex. `/init` ou `/es/methodology/01-manifesto`.

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

Les versions de protocole 2025-03-26 et 2025-06-18 sont prises en charge ; aucune session n’est requise. Manifeste : [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Fiche du serveur : [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown pour les agents

Chaque page rendue est publiée en Markdown source natif — pas une conversion HTML :

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Installez le kit

Le chemin d’installation officiel de la skill Deep Work Plan — la même commande que l’endpoint /init donne aux agents. Elle fonctionne avec tout agent de code compatible skills (Claude Code, Cursor, Codex, Gemini et d’autres) :

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

La skill s’installe par vendoring dans `.agents/skills/deepworkplan/` à l’intérieur de votre dépôt, pour que chaque agent qui touche le dépôt partage la même méthodologie. La CLI officielle `deepworkplan` — un client sans dépendances sur la même API (`init`, `sections`, `read`, `open`, `mcp`) — est prête pour npm et vit dans le répertoire [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) du dépôt du site jusqu’à sa publication.

## Ressources lisibles par machine

- [Spécification OpenAPI](https://deepworkplan.com/openapi.json)
- [Déclaration d’accès et d’authentification des agents](https://deepworkplan.com/auth.md)
- [Catalogue d’API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifeste MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contact sécurité](https://deepworkplan.com/.well-known/security.txt)
- [Descripteur du dépôt du site](https://deepworkplan.com/.well-known/dwp.json)
