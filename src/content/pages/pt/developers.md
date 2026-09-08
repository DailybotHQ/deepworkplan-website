---
title: "Desenvolvedores — a API para agentes do Deep Work Plan"
description: "A superfície do deepworkplan.com para desenvolvedores e agentes de IA: uma API somente leitura e sem autenticação descrita com OpenAPI, um servidor MCP sem estado em /api/mcp, Markdown por página em 17 idiomas e a CLI de instalação npx skills."
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
| POST | `/api/mcp` | Servidor MCP (Streamable HTTP, sem estado). |
| GET | `/.well-known/ai-catalog.json` | Manifesto de capacidades ARD (agentmap). |

Rotas `/api/*` desconhecidas retornam um erro JSON estruturado com uma dica de resolução, nunca uma página de erro HTML.

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

A skill é vendorizada em `.agents/skills/deepworkplan/` dentro do seu repositório, de modo que todo agente que toca o repositório compartilha a mesma metodologia.

## Recursos legíveis por máquina

- [Especificação OpenAPI](https://deepworkplan.com/openapi.json)
- [Declaração de acesso e autenticação de agentes](https://deepworkplan.com/auth.md)
- [Catálogo de API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Manifesto MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Contato de segurança](https://deepworkplan.com/.well-known/security.txt)
- [Descritor do repositório do site](https://deepworkplan.com/.well-known/dwp.json)
