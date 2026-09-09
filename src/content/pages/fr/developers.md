---
title: "Développeurs — l’API pour agents de Deep Work Plan"
description: "La surface de deepworkplan.com pour les développeurs et les agents IA : une API en lecture seule et sans authentification décrite par OpenAPI, un serveur MCP sans état sur /api/mcp, du Markdown par page en 17 langues et la CLI d’installation npx skills."
---

## Sans authentification, par conception

Il n’y a aucune clé d’API à générer, aucun flux OAuth et aucun bac à sable séparé de la production — c’est la surface de production elle-même qui sert de bac à sable. C’est une propriété délibérée de la méthodologie : les agents ne peuvent pas remplir les formulaires « contact commercial », donc le site n’en demande jamais.

- **Lecture seule** — chaque opération est un GET sûr et mettable en cache, sauf l’endpoint MCP (POST). Il n’existe aucune opération d’écriture.
- **Aucune clé d’API** — aucune inscription, aucun jeton, aucun palier de limite de débit. L’accès anonyme est le contrat documenté, déclaré dans [/auth.md](https://deepworkplan.com/auth.md).
- **Gratuit et open source** — le contenu du site et la skill DWP sont sous licence MIT.
- **Pensé d’abord pour les machines** — erreurs JSON structurées sur `/api/*`, corps de récupération 404 en Markdown, un catalogue d’API RFC 9727 et un manifeste de capacités ARD.

## Endpoints

| Méthode | Chemin | Rôle |
|---------|--------|------|
| GET | `/openapi.json` | Spécification OpenAPI 3.1 de toute l’API pour agents. |
| GET | `/llms.txt` | Sélection d’indications pour les LLM — le point d’entrée recommandé. |
| GET | `/init.md` | Le prompt canonique d’adoption de DWP. |
| GET | `/{page}.md` | N’importe quelle page en Markdown source, dans les 17 langues. |
| GET | `/api/health.json` | Marqueur d’état statique. |
| POST | `/api/mcp` | Serveur MCP (Streamable HTTP, sans état). |
| GET | `/.well-known/ai-catalog.json` | Manifeste de capacités ARD (agentmap). |

Les chemins `/api/*` inconnus renvoient une erreur JSON structurée avec une piste de résolution, jamais une page d’erreur HTML.

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

La skill s’installe par vendoring dans `.agents/skills/deepworkplan/` à l’intérieur de votre dépôt, pour que chaque agent qui touche le dépôt partage la même méthodologie.

## Ressources lisibles par machine

- [Spécification OpenAPI](https://deepworkplan.com/openapi.json)
- [Déclaration d’accès et d’authentification des agents](https://deepworkplan.com/auth.md)
- [Catalogue d’API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifeste MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contact sécurité](https://deepworkplan.com/.well-known/security.txt)
- [Descripteur du dépôt du site](https://deepworkplan.com/.well-known/dwp.json)
