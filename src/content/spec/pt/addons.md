---
title: Complementos
description: "Extensões opcionais do DWP: os cinco addons ativos (devcontainer, Dailybot, dependency-upgrade, design-system, AI Diff Reviewer), o contrato de addon e conceitos do kit."
order: 5
lang: pt
section: Addons
---

# Complementos

**Versão 2.0.** Os complementos são extensões opcionais da metodologia central do Deep Work Plan. **Nunca são obrigatórios para conformidade** — um repositório sem addons é totalmente AI-first e conforme com o DWP. Cada addon é oferecido durante a integração, aceite ou recusado explicitamente e — quando aceite — **reconcilia** com a configuração existente em vez de a sobrescrever.

## O contrato de addon

Cada addon ativo inclui quatro componentes obrigatórios:

| Componente | Propósito |
|-----------|---------|
| **Spec** | Descrição normativa RFC-2119 do que o addon fornece e do que significa «conforme com este addon» |
| **Modelos de raciocínio** | Guias que o agente preenche raciocinando sobre o stack do repositório alvo — não copiar e colar |
| **Hook de integração** | Ponto de entrada `SKILL.md` que o fluxo `onboard` invoca quando o programador aceita |
| **Passo de validação** | Lista de verificação que confirma que o addon foi aplicado corretamente |

Descoberta: o fluxo `onboard` enumera `skills/deepworkplan/addons/` e apresenta cada addon como um passo opcional na **Fase 7b**, após o scaffolding central.

## Addons ativos (cinco)

Cinco addons estão ativos hoje. Cada um tem uma **página do catálogo do kit** com detalhe orientado ao utilizador e uma **spec normativa** dentro da skill Deep Work Plan.

### Devcontainer (primeiro addon)

Uma configuração `.devcontainer/` + `docker/` baseada em compose, raciocinada a partir do stack detetado.

- **Página do kit:** [Devcontainer](/kit/devcontainer)
- **O que adiciona:** volumes persistentes de auth de CLI de IA (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, aliases de validação (`codecheck`, `check`, `fix`, `test`), higiene de segredos em OSS público
- **Comportamento:** ~85 % esqueleto estável; ~15 % raciocinado por stack. Devcontainers existentes são reconciliados, nunca sobrescritos
- **Quando oferecido:** a maioria dos repositórios com Docker ou serviços que beneficiam de um contentor de desenvolvimento isolado

### Dailybot (segundo addon)

Uma ligação opcional à **equipa Dailybot** do programador para visibilidade do progresso do agente.

- **Página do kit:** [Dailybot](/kit/dailybot) — referência completa de capacidades
- **O que o addon DWP liga:** quatro relatórios do ciclo de vida do plano (kickoff, tarefa significativa, bloqueado, conclusão) via sub-skill `report` do dailybot; reforço determinístico opcional por hooks (`dailybot hook`, CLI `>= 3.7.0`)
- **Skill emparelhada:** instalar [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (atualmente **3.10.3**) expõe **14 capacidades** — chat no Slack/Teams/Discord/Google Chat, check-ins, autoría de formulários, ask AI, kudos, chaves API por repositório (`.dailybot/env.json`), email e mais. O addon DWP liga apenas **report**; outras capacidades são invocadas diretamente pela skill Dailybot
- **Auth:** totalmente adiada para a skill Dailybot (`dailybot login` ou `DAILYBOT_API_KEY`); este addon nunca armazena credenciais
- **Salvaguarda neutra em relação ao fornecedor:** o DWP central tem **zero** dependência do Dailybot; nunca instalar automaticamente para todos
- **Quando oferecido:** programador ou equipa já usa Dailybot, ou pede explicitamente relatórios à equipa

### Dependency upgrade (terceiro addon)

Atualizações de dependências em lotes, validadas e reversíveis, agnósticas ao gestor de pacotes.

- **Página do kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **O que adiciona:** deteta o gestor **real** do repositório (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), atualiza em lotes classificados por semver, executa a porta de validação do repositório após cada lote, reverte falhas, resume sem confirmar automaticamente
- **Comando:** instala `/lib-upgrade` em `.agents/commands/` apenas quando aceite
- **Quando oferecido:** lockfile presente e stack com muitas dependências; recomendar apenas quando relevante

### Design system (quarto addon)

Um `DESIGN.md` com âmbito de superfície de interface que qualquer agente de codificação lê para saída coerente de UI, CLI ou conversacional.

- **Página do kit:** [Design system](/kit/design-system)
- **O que adiciona:** `docs/DESIGN.md` (referenciado a partir de `AGENTS.md`) com até três **perfis** empilhados num único ficheiro: **visual-ui** (tokens e componentes de UI renderizada), **cli-output** (estilos semânticos de terminal, degradação TTY/`NO_COLOR`), **conversational** (voz, anatomia da mensagem, renderização por plataforma com alternativas em texto simples)
- **Força do perfil:** visual-ui está **ativado por defeito quando detetado**; cli-output e conversational são **recomendados quando detetados, sempre perguntados, nunca aplicados automaticamente**
- **Quando oferecido:** apenas quando uma superfície de interface orientada ao utilizador é detetada — não para bibliotecas puras, serviços sem interface ou repositórios só de infraestrutura

### AI Diff Reviewer (quinto addon)

Uma ligação opcional ao **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, versão atual **v2.0.0**) que aumenta a Revisão de Segurança obrigatória com uma revisão local estruturada e, opcionalmente, controla os pull requests em CI.

- **Página do kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — referência completa de capacidades
- **O que o addon DWP liga:** ampliação local da Revisão de Segurança via o fluxo pai predefinido da skill upstream; `.review/extension.md` obrigatório (a skill sozinha está incompleta); o Fluxo B instala opcionalmente `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) e expõe `apply-review` como companheiro invocável pelo programador — nunca como tarefa do plano
- **Fluxos:** **A — apenas local** (skill + extensão) ou **B — dupla superfície** (skill + extensão + CI Action). O addon **DEVE perguntar** qual fluxo; nunca assumir
- **Falha suave vs portão:** erros de skill/extensão/invocação ausentes nunca bloqueiam; resultados `critical` de uma passagem local **concluída** seguem o contrato de Revisão de Segurança
- **Paridade (Fluxo B):** `prompt.md` partilhado + extensão alinham metodologia/severidade; a Revisão com Consciência de Iteração de CI pode encurtar a ronda 2+ enquanto a passagem local permanece completa
- **Salvaguarda neutra em relação ao fornecedor:** o DWP central tem **zero** dependência do AI Diff Reviewer; nunca instalar automaticamente para todos
- **Quando oferecido:** programador ou equipa quer revisão local estruturada e/ou um portão de PR em CI

## Skills

As skills são procedimentos reutilizáveis invocados por nome. Uma skill empacota um fluxo de trabalho repetível (executar testes, corrigir lint, criar um componente).

A metodologia inclui um pequeno conjunto de sub-skills centrais. Entre elas, a sub-skill **author** permite que um repositório **cresça o seu próprio kit**: invocada através de `/skill-create` e `/agent-create`, raciocina sobre o layout `.agents/` existente e convenções, depois cria uma nova skill, agente ou comando delegador fino que corresponde a eles, mantendo o catálogo sincronizado. A mesma sub-skill executa a tarefa obrigatória de Descoberta de Skills e Agentes.

Entrada do kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agentes

Os agentes são trabalhadores especializados com um papel definido (revisor, executor, arquiteto). Vivem em `.agents/agents/` e são catalogados em `.agents/docs/`.

## Complementos de manutenção

O complemento **dependency-upgrade** (acima) é o complemento de manutenção principal. Raciocina sobre o gestor de pacotes real do repositório em vez de assumir npm, classifica atualizações por semver, atualiza em lotes seguros, executa validação após cada lote e reverte qualquer lote que falhe.

## Complemento de sistema de design

Ver [Design system](/kit/design-system) em addons ativos. O `DESIGN.md` ao nível do repositório é distinto de um documento de design técnico por funcionalidade: o README do plano DWP, critérios de aceitação de tarefas e portas de validação já cobrem design por funcionalidade. O addon design-system preenche contexto de design de **interface** durável e nativo do repositório.

## Presets

Os presets adaptam o DWP a um stack tecnológico específico (Django, React, Go, Astro + Svelte e mais). Explore o [catálogo do kit](/kit).

## Adaptadores

Os adaptadores mapeiam comandos DWP para o sistema de comandos de um agente específico (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw e outros). As entradas de adaptador vivem no kit sob o nome de cada agente.

## Exemplos

Os exemplos demonstram o DWP na prática: comparações antes/depois, planos de exemplo, estudos de caso. Ver [Examples](/examples) e [Dogfood this site](/kit/dogfood-this-site).

## Lembrete de conformidade

Um repositório **DEVE** ser totalmente conforme com **zero** addons. Os addons são capacidades opcionais em camadas — nunca pré-condições. Ver [Conformance](/spec/conformance).
