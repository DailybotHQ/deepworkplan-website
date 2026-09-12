---
title: "Desenvolvedores — a API para agentes do Deep Work Plan"
description: "A superfície para agentes do Deep Work Plan: API versionada, somente leitura e sem autenticação, com OpenAPI, servidor MCP e Markdown por página em 17 idiomas."
---

## Sem autenticação por design

Não há chaves de API para gerar, nenhum fluxo de OAuth e nenhum sandbox separado de produção — a própria superfície de produção é o sandbox. Isso é uma propriedade deliberada da metodologia: agentes não conseguem preencher formulários de "falar com vendas", então o site nunca pede um.

- **Somente leitura** — cada operação é um GET seguro e armazenável em cache, exceto o endpoint MCP (POST). Não há operações de escrita em lugar nenhum.
- **Sem chaves de API** — sem registro, tokens ou níveis de limite de requisições. O acesso anônimo é o contrato documentado, declarado em [/auth.md](https://deepworkplan.com/auth.md).
- **Grátis e de código aberto** — o conteúdo do site e a skill DWP são licenciados sob MIT.
- **Pensado para as máquinas** — erros JSON estruturados em `/api/*`, corpos de recuperação 404 em Markdown, um catálogo de API RFC 9727 e um manifesto de capacidades ARD.

## Endpoints

| Método | Rota | Propósito |
|--------|------|-----------|
| GET | `/openapi.json` | Especificação OpenAPI 3.1 de toda a API para agentes. |
| GET | `/llms.txt` | Índice curado de orientação para LLMs — o ponto de entrada recomendado. |
| GET | `/init.md` | O prompt canônico de adoção do DWP. |
| GET | `/{page}.md` | Qualquer página como Markdown fonte, em todos os 17 idiomas. |
| GET | `/api/health.json` | Marcador de saúde estático. |
| GET | `/api/v1/index.json` | Catálogo versionado da família v1: caminhos dos endpoints, versão do site e links para a especificação. |
| GET | `/api/v1/sections.json` | O mapa do site como JSON tipado — nome, caminho e descrição por seção. |
| GET | `/api/v1/pages.json` | Cada endpoint de Markdown em cada idioma, agrupados por código de idioma. |
| GET | `/api/v1/health.json` | Marcador de estado versionado — o espelho v1 de `/api/health.json`. |
| POST | `/api/mcp` | Servidor MCP (Streamable HTTP, sem estado). |
| GET | `/.well-known/ai-catalog.json` | Manifesto de capacidades ARD (agentmap). |

Rotas `/api/*` desconhecidas retornam um erro JSON estruturado com uma dica de resolução, nunca uma página de erro HTML.

## Versionamento e descontinuação

A família JSON versionada vive em `/api/v1/` — index, sections, pages e health — e os caminhos canônicos sem versão (`/llms.txt`, `/{page}.md`, `/api/mcp`) pertencem ao mesmo contrato v1. Mudanças com quebra de compatibilidade são publicadas apenas em uma nova família `/api/v{N+1}/`, nunca dentro da v1. Quando um endpoint é descontinuado, suas respostas carregam `Deprecation: true` e uma data `Sunset` pelo menos 180 dias antes da remoção, e um cabeçalho `Link` aponta o sucessor.

## Limites de requisições

As respostas em `/api/*` carregam cabeçalhos de limite RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` e `RateLimit-Policy` — para que os agentes possam ajustar seu próprio ritmo em tempo real; uma resposta `429` adiciona `Retry-After`. A aplicação é best-effort na borda (120 requisições por 60 segundos por visitante) e o acesso continua anônimo: sem chaves, sem registro, sem níveis.

## Servidor MCP

Um servidor de Model Context Protocol sem estado sobre Streamable HTTP em `https://deepworkplan.com/api/mcp`. Três ferramentas somente leitura:

- `get_init_prompt` — o prompt canônico de adoção do /init.md.
- `list_site_sections` — o mapa do site com descrições de uma linha.
- `read_page` — qualquer página como Markdown fonte nativo, ex.: `/init` ou `/es/methodology/01-manifesto`.

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

As versões de protocolo 2025-03-26 e 2025-06-18 são suportadas; nenhuma sessão é necessária. Manifesto: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Card do servidor: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown para agentes

Cada página renderizada é publicada como Markdown fonte nativo — não uma conversão de HTML:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Instale o kit

O caminho oficial de instalação da skill Deep Work Plan — o mesmo comando que o endpoint /init dá aos agentes. Funciona com qualquer agente de código compatível com skills (Claude Code, Cursor, Codex, Gemini e outros):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

A skill é vendorizada em `.agents/skills/deepworkplan/` dentro do seu repositório, de modo que todo agente que toca o repositório compartilha a mesma metodologia. A CLI oficial `deepworkplan` — um cliente sem dependências sobre esta mesma API (`init`, `sections`, `read`, `open`, `mcp`) — está preparada para npm e vive no diretório [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) do repositório do site até a publicação.

## Recursos legíveis por máquina

- [Especificação OpenAPI](https://deepworkplan.com/openapi.json)
- [Declaração de acesso e autenticação de agentes](https://deepworkplan.com/auth.md)
- [Catálogo de API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifesto MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contato de segurança](https://deepworkplan.com/.well-known/security.txt)
- [Descritor do repositório do site](https://deepworkplan.com/.well-known/dwp.json)
