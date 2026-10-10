---
title: Complementos
description: "Addons do DWP: sete opcionais, a revisão local obrigatória do AI Diff Reviewer com superfície de CI opcional, contrato de addon e conceitos do kit."
order: 6
lang: pt
section: Addons
---

# Complementos

> **Escopo da versão:** Este é um documento-base v5.0.0 mantido. O padrão atual, DWP 7.0.0, também exige as extensões `V6_*.md` e `V7_*.md` aplicáveis listadas no [índice da especificação](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/skills/deepworkplan/spec/README.md). Os planos v5 e v6 existentes mantêm as regras registradas.

**Versão 2.1.0.** Os complementos são extensões da metodologia central do Deep Work Plan. Sete dos oito são opcionais e **nunca obrigatórios para conformidade** — um repositório sem addons opcionais é totalmente AI-first e conforme com o DWP. Cada addon opcional é oferecido durante a integração, aceite ou recusado explicitamente e — quando aceite — **reconcilia** com a configuração existente em vez de a sobrescrever. Um componente é a exceção declarada: desde o padrão 2.3.0 a **revisão local do AI Diff Reviewer** faz parte da linha de base obrigatória — o onboarding instala-a e cada Final Review executa-a — enquanto a sua superfície de CI continua opcional.

## O contrato de addon

Cada addon ativo inclui quatro componentes obrigatórios:

| Componente | Propósito |
|-----------|---------|
| **Spec** | Descrição normativa RFC-2119 do que o addon fornece e do que significa «conforme com este addon» |
| **Modelos de raciocínio** | Guias que o agente preenche raciocinando sobre o stack do repositório alvo — não copiar e colar |
| **Hook de integração** | Ponto de entrada `SKILL.md` que o fluxo `onboard` invoca quando o programador aceita |
| **Passo de validação** | Lista de verificação que confirma que o addon foi aplicado corretamente |

Descoberta: o fluxo `onboard` enumera `skills/deepworkplan/addons/` e apresenta cada addon como um passo opcional na **Fase 7b**, após o scaffolding central.

## Addons ativos (oito)

Oito addons são distribuídos hoje — sete opcionais mais a revisão local obrigatória. Cada um tem uma **página do catálogo do kit** com detalhe orientado ao utilizador e uma **spec normativa** dentro da skill Deep Work Plan. Quatro deles — devcontainer, Herdr, DeepWorkPlan Vim e Agentkit — são integradores leves fixados por tag a um produto com o seu próprio repositório e ciclo de lançamentos; cada produto funciona sem o Deep Work Plan. Um addon aceite é registado no registo de addons `.dwp/config.json` (DWP 7.0.0), que só pode oferecer ou amplificar — nunca condiciona a conformidade nem um plano.

### Devcontainer (primeiro addon)

Um integrador leve do [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, fixado em `v0.2.2`, interface `2`): um modelo de Dev Containers que `dck init` gera no repositório como o seu próprio contentor, mais a skill `dck-dockerfile`.

- **Página do kit:** [Devcontainer](/kit/devcontainer)
- **O que adiciona:** `docker/local/<service>/Dockerfile` a partir da imagem oficial do runtime fixada por digest (`python-3.13`, `node-24` ou `debian`, sem imagem base partilhada), `dev.sh` sobre o lançador `dck` (`up`, `shell`, `rebuild`, `doctor`), agentes de programação como camada opcional, portas apenas de loopback, git sobre SSH através do agente do anfitrião sem nenhuma chave lá dentro, e máquinas Herdr por contentor com o layout padrão
- **Comportamento:** detetado através de `dck doctor --json` (interface 2); `dck init` reconcilia um devcontainer existente apenas depois de o seu diff ser aceite, e faz primeiro uma cópia de segurança do ficheiro — nunca sobrescrito
- **Quando oferecido:** a maioria dos repositórios com Docker ou serviços que beneficiam de um contentor de desenvolvimento isolado

### Dailybot (segundo addon)

Uma ligação opcional à **equipa Dailybot** do programador para visibilidade do progresso do agente.

- **Página do kit:** [Dailybot](/kit/dailybot) — referência completa de capacidades
- **O que o addon DWP liga:** quatro relatórios do ciclo de vida do plano (kickoff, tarefa significativa, bloqueado, conclusão) via sub-skill `report` do dailybot; reforço determinístico opcional por hooks (`dailybot hook`, CLI `>= 3.9.0`)
- **Skill emparelhada:** instalar [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (atualmente **3.23.3**) expõe **17 capacidades** — chat no Slack/Teams/Discord/Google Chat, check-ins, criação de formulários, ask AI, kudos, quadros e tarefas do Plan, etiquetas da organização, chaves API por repositório (`.dailybot/env.json`), email e mais. O addon DWP liga apenas **report**; outras capacidades são invocadas diretamente pela skill Dailybot
- **Auth:** totalmente adiada para a skill Dailybot (`dailybot login` ou `DAILYBOT_API_KEY`); este addon nunca armazena credenciais
- **Salvaguarda neutra em relação ao fornecedor:** o DWP central tem **zero** dependência do Dailybot; nunca instalar automaticamente para todos
- **Quando oferecido:** programador ou equipa já usa Dailybot, ou pede explicitamente relatórios à equipa

### Dependency upgrade (terceiro addon)

Atualizações de dependências em lotes, validadas e reversíveis, agnósticas ao gestor de pacotes.

- **Página do kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **O que adiciona:** deteta o gestor **real** do repositório (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), atualiza em lotes classificados por semver, executa a porta de validação do repositório após cada lote, reverte falhas, resume sem confirmar automaticamente
- **Comando:** instala `/lib-upgrade` em `.agents/commands/` apenas quando aceite
- **Quando oferecido:** oferecido para todo repositório com dependências declaradas; o delegador inerte `/lib-upgrade` instala sob o consentimento do onboarding salvo recusa explícita — uma instalação não executa nenhuma atualização

### Design system (quarto addon)

Um `DESIGN.md` com âmbito de superfície de interface que qualquer agente de codificação lê para saída coerente de UI, CLI ou conversacional.

- **Página do kit:** [Design system](/kit/design-system)
- **O que adiciona:** `docs/DESIGN.md` (referenciado a partir de `AGENTS.md`) com até três **perfis** empilhados num único ficheiro: **visual-ui** (tokens e componentes de UI renderizada), **cli-output** (estilos semânticos de terminal, degradação TTY/`NO_COLOR`), **conversational** (voz, anatomia da mensagem, renderização por plataforma com alternativas em texto simples)
- **Força do perfil:** a deteção torna a oferta obrigatória; a instalação fica protegida por aceitação tanto em modo guiado como em modo de confiança — visual-ui é **recomendado com força quando detectado**; cli-output e conversational são **recomendados quando detetados, sempre perguntados, nunca aplicados automaticamente**
- **Quando oferecido:** apenas quando uma superfície de interface orientada ao utilizador é detetada — não para bibliotecas puras, serviços sem interface ou repositórios só de infraestrutura

### AI Diff Reviewer (quinto addon — revisão local obrigatória, superfície de CI opcional)

O **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**) dá ao passe de segurança do Final Review obrigatório uma revisão local estruturada e, opcionalmente, controla os pull requests em CI. Desde o padrão 2.3.0 a **revisão local faz parte da linha de base**; apenas a superfície de CI é opcional. Este addon é atualizado automaticamente a cada lançamento, pelo que a tag mostrada abaixo é a vigente no momento da escrita e pode ficar atrás da cópia distribuída — o `SKILL.md` próprio do addon e os seus lançamentos no GitHub são a fonte autorizada da tag realmente instalada. A instalação é sempre fixada numa tag publicada, nunca num ramo móvel.

- **Página do kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — referência completa de capacidades
- **Obrigatório no onboarding (Fase 7a):** instalação fixada por tag da skill vendorizada (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) mais um `.review/extension.md` à medida do repositório (via `generate-extension`), sob o consentimento do onboarding; uma atualização dirigida do harness reconcilia ambos quando faltam; uma recusa é registada como exceção declarada e o `verify` reporta-a até que seja instalado
- **Obrigatório em cada Final Review:** o passe de segurança executa o fluxo pai predefinido da skill upstream sobre o conjunto acumulado de mudanças e acrescenta a sua saída ao `analysis_results/SECURITY_REVIEW.md` local do plano (dentro da pasta própria do plano, nunca na raiz do repositório); uma skill ou extensão ausente é um achado registado `local reviewer not installed` — nunca uma omissão silenciosa, e nunca um arranque surpresa: a instalação pertence ao consentimento do onboarding ou a uma invocação explícita do addon; os **críticos verificados** de uma passagem concluída bloqueiam a conclusão até que sejam corrigidos ou explicitamente aceites (v3, BC-07 — afirmativas críticas não verificadas chegam como avisos anotados, e uma revisão `incomplete` ou `timeout` não é uma passagem limpa, BC-04)
- **Superfície de CI opcional (Fluxo B):** `DailybotHQ/ai-diff-reviewer@v3` via a sub-skill `setup` da skill upstream, mais os companheiros `apply-review` (apenas leitura) e `address-review` (faz commits, push e rearma; novo na v3.1.1) como comodidades invocáveis pelo programador — oferecido explicitamente, nunca instalado sem pedido, nunca o predefinido, nunca uma tarefa do plano
- **Nunca bloqueia (apenas invocação):** uma revisão local que pôde começar mas termina com erro é avisar-uma-vez-registrar-e-continuar; nunca falha a tarefa por isso
- **Paridade (Fluxo B):** `prompt.md` partilhado + extensão alinham metodologia/severidade; a Revisão com Consciência de Iteração de CI pode encurtar a ronda 2+ enquanto a passagem local permanece completa
- **Salvaguarda neutra em relação ao fornecedor:** nenhum fluxo do Deep Work Plan exige um serviço comercial, fornecedor de CI ou segredo — o revisor é uma skill MIT fixada por tag executada pelo próprio agente de codificação do programador
- **Conformidade:** o `verify` reporta um revisor local ausente como falha para repositórios que declaram o padrão 2.3.0 ou posterior, e como achado de versão do harness para repositórios legados

### Herdr (sexto addon)

Um integrador leve do [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (fixado em `v0.1.0`, protocolo `1`), o transporte de delegação **interativa** dos planos v7.

- **Página do kit:** [Herdr](/kit/herdr)
- **O que adiciona:** um plano pode entregar uma tarefa delimitada a um agente de codificação noutro painel do [Herdr](https://herdr.dev), na mesma máquina ou numa que o Herdr alcance por SSH, e registar no diário a sua única resposta autorizada
- **Comportamento:** o protocolo entre pares (carimbo, concessão, resposta, proteção contra ciclos, limites de profundidade e de fan-out) vive no herdr-peers, nunca no pacote; qualquer uso exige a concessão de contrato `agent_delegation`, e o resultado de um delegado continua a ser uma afirmação até que o próprio executor do plano o observe
- **Quando oferecido:** opt-in explícito durante a Fase 7b; deteção apenas de leitura de `herdr` e `herdr-peers`; o transporte só pode ser usado dentro de uma sessão do Herdr

### DeepWorkPlan Vim (sétimo addon)

Um integrador leve do [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (fixado em `v0.5.1`, interface `1`), o editor de terminal para o Deep Work Plan (Neovim 0.12+).

- **Página do kit:** [DeepWorkPlan Vim](/kit/vim)
- **O que adiciona:** uma superfície de editor opcional, ao nível da máquina, para agentes e humanos — um índice de comandos gerado, um navegador de planos apenas de leitura e um visualizador de Markdown; cada afirmação é lida da superfície legível por máquina fixada do produto
- **Comportamento:** uma configuração existente do Neovim nunca é sobrescrita sem consentimento explícito; a deteção é apenas de leitura
- **Quando oferecido:** opt-in explícito durante a Fase 7b; apenas informativo quando falta o Neovim 0.12+

### Agentkit (oitavo addon)

Um integrador leve do [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, fixado em `v0.3.0`, interface `1`), o transporte de delegação **sem interface** (headless) dos planos v7.

- **Página do kit:** [Agentkit](/kit/agentkit)
- **O que adiciona:** uma única superfície de comandos `ak` sobre os agentes de codificação de terminal, usada para executar sem interface uma tarefa delimitada do plano; contribui com as capacidades `subagents`, `cancel_children` e `model_routing` apenas em tempo de execução, quando ativado, detetado e numa interface compatível
- **Comportamento:** qualquer uso exige a concessão de contrato `agent_delegation`; o kit lança os agentes em autonomia por omissão e a sua exclusão (`--ask` ou `AGENTKIT_PERMISSIONS=ask`) prevalece sempre — o addon não escreve nenhuma flag de autonomia, passa `--ask` quando o plano regista a exclusão e sempre para delegados só de leitura; nunca instala por conta própria CLIs de agentes de codificação e nunca lê os valores das chaves dos fornecedores
- **Quando oferecido:** opt-in explícito durante a Fase 7b; deteção apenas de leitura através de `ak doctor --json`

## Skills

As skills são procedimentos reutilizáveis invocados por nome. Uma skill empacota um fluxo de trabalho repetível (executar testes, corrigir lint, criar um componente).

A metodologia inclui um pequeno conjunto de sub-skills centrais. Entre elas, a sub-skill **author** permite que um repositório **cresça o seu próprio kit**: invocada através de `/skill-create` e `/agent-create`, raciocina sobre o layout `.agents/` existente e convenções, depois cria uma nova skill, agente ou comando delegador fino que corresponde a eles, mantendo o catálogo sincronizado. A mesma sub-skill respalda o passe de reconciliação de skills do Final Review.

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
