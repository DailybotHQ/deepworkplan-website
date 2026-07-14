---
title: Dailybot
description: "Addon opcional do DWP: conecta o plano a uma equipa Dailybot, hooks opcionais e a skill de agente 3.10.3 (chat, check-ins, formulários, ask AI e mais)."
kind: addon
lang: pt
order: 2
---

# Addon Dailybot

Liga a execução do Deep Work Plan a uma **equipa Dailybot** para que as pessoas vejam o que os agentes estão a construir — arranque, progresso a meio do plano, bloqueios e conclusão — sem adicionar reuniões nem uma segunda cadeia de ferramentas. Um addon **opcional** para equipas que já usam [Dailybot](https://www.dailybot.com).

A metodologia central do Deep Work Plan tem **zero** dependência do Dailybot. Um repositório sem addons é totalmente conforme. Ofereça este addon apenas quando o programador ou a equipa já usa Dailybot; nunca instale automaticamente para todos.

## Quando usar

| Sinal | Ação |
|--------|--------|
| A equipa já usa Dailybot (Slack, Teams, Discord, Google Chat ou o painel) | **Recomendar** durante a integração |
| O programador pede visibilidade do progresso do agente ou atualizações tipo standup | **Oferecer** o addon |
| Repositório greenfield sem conta Dailybot | **Ignorar** — a linha de base neutra em relação ao fornecedor é suficiente |
| Trabalho com cliente sob NDA em que o progresso não pode sair do repositório | **Ignorar**, ou confirmar `.dailybot/disabled` como interruptor local |

## O que este addon liga (deliberadamente restrito)

O addon Dailybot do DWP **não** reinventa o Dailybot. Liga a execução do plano à sub-skill **`report`** do dailybot e, opcionalmente, confirma hooks do harness. Todo o resto — instalação, consentimento, autenticação, estilo de escrita — é **adiado** para a [skill de agente Dailybot](https://github.com/DailybotHQ/agent-skill) oficial (atualmente **3.10.3**).

### Quatro eventos do ciclo de vida

Durante `create` / `execute` do DWP, o addon liga **quatro atualizações de agente de melhor esforço**. Cada evento é condicional (Dailybot presente e autenticado), não bloqueante e respeita `.dailybot/disabled`.

| Evento | Gatilho | Nível | Requisito |
|-------|---------|-------|-------------|
| **Kickoff** | Plano materializado e aprovado, ou primeiro turno de `execute` | regular | SHOULD |
| **Tarefa significativa** | Uma funcionalidade, correção de bug ou refatoração importante concluída — não tarefas de configuração | regular | MAY |
| **Bloqueado** | O plano pára; `state.json.blocked` preenchido (`reason`, `needs`) | regular + blockers | SHOULD |
| **Conclusão** | Todas as tarefas concluídas; o plano termina | **milestone** | SHOULD |

As cargas úteis derivam da camada de estado do plano (`state.json`) quando presente: `completed` como resultados (não números de tarefa), `in_progress` da tarefa atual, `blockers` de `state.json.blocked`. A mensagem descreve **o que foi construído e porquê** — nunca caminhos de ficheiro, estatísticas git, nomes de ramo ou IDs de plano.

### Reforço opcional por hooks

Com `dailybot-cli >= 3.7.0`, o addon **pode** confirmar hooks do harness ao nível do repositório (`dailybot hook session-start | activity | post-commit | stop | dismiss`) apoiados por um registo local por repositório. O harness lembra o agente no fim do turno quando um evento do ciclo de vida foi omitido — crítico para sessões longas sem supervisão em que as instruções do prompt se diluem.

Um relatório de ciclo de vida bem-sucedido **reinicia** o registo de hooks, para que as duas camadas nunca reportem em duplicado. Os comandos de hooks só leem estado local e terminam sempre com `0`.

### Identidade do repositório e política de relatórios

Opcionalmente confirme `.dailybot/profile.json` (ou `.dailybot_example/profile.json` como modelo) para que cada colaborador e agente assine relatórios da mesma forma. **Nunca** coloque credenciais nesse ficheiro — um campo `key` é um erro grave.

O mesmo ficheiro pode incluir a política de relatórios que os hooks respeitam:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` é especialmente útil para repositórios de investigação ou documentação: trabalho sem commits (análise, documentos de design, planos) recebe lembretes mais cedo.

## Instalação (tudo opcional)

O addon **oferece** caminhos de instalação; a skill Dailybot é dona do consentimento e da verificação.

| Componente | Comando / caminho |
|-----------|----------------|
| **Skill de agente Dailybot** (recomendado) | `npx skills add DailybotHQ/agent-skill` |
| **Atualizar skill existente** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (mínimo `>= 3.7.0`) | Instalada pela skill no primeiro uso via `shared/auth.md` verificado; ou `pip install 'dailybot-cli>=3.7.0'`, Homebrew, ou o instalador com checksum verificado em [cli.dailybot.com](https://cli.dailybot.com) |

Verifique versões: `dailybot --version` e `dailybot version --check`. Atualize: `dailybot upgrade`.

## Autenticação — adiada

Este addon **nunca** pede email, OTP ou chaves API, e **nunca** armazena credenciais. A autenticação é gerida por [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) da skill Dailybot:

- `dailybot login` (OTP por email), ou
- `DAILYBOT_API_KEY` / `dailybot config key=...`, ou
- um ficheiro opcional de chaves por repositório `.dailybot/env.json`, ignorado pelo git (`dailybot env add/use`, CLI `>= 3.7.0`), para que um programador possa estar autenticado em orgs diferentes em repositórios diferentes.

A resolução de autenticação é **Bearer-first**: um token de sessão tem prioridade, com uma nova tentativa transparente de Bearer→chave API em `401`/`403`, para que um token expirado nunca bloqueie uma chave válida. Se a autenticação for recusada ou indisponível, o relatório é ignorado silenciosamente — o trabalho continua.

## A skill emparelhada Dailybot — 14 capacidades (3.10.3)

Instalar a skill de agente Dailybot traz muito mais do que o addon DWP liga. O pacote oficial de skills (skill **3.10.3**, base da CLI **>= 3.7.0**, publicação atual **3.7.3**) expõe **14 sub-skills coordenadas**:

| Sub-skill | O que faz |
|-----------|--------------|
| **Relatórios de progresso** | Atualizações de agente tipo standup no painel Dailybot |
| **Ask the AI** | Consultas pontuais sem interface ao assistente de IA Dailybot |
| **Sondagem de mensagens** | Verificar instruções da equipa no início da sessão ou em inatividade |
| **Email** | Enviar emails com verificações de segurança obrigatórias antes do envio |
| **Chat** | Enviar ou editar no Slack, Microsoft Teams, Discord ou Google Chat — canais, MDs, equipas, threads tipo relatório, enviar-como-utilizador (Slack, admin) |
| **Conversas** | Abrir ou reutilizar um MD de grupo Slack com o bot e colegas nomeados; publicar um relatório na mesma chamada |
| **Saúde e estado** | Anunciar agente online/offline para sessões de longa duração |
| **Check-ins** | Completar standups; **autorar** check-ins (agendamento, participantes, perguntas, lembretes, definições de IA) |
| **Kudos** | Reconhecer colegas ou equipas inteiras; explorar feed de reconhecimento, feed da org, mural da fama |
| **Equipas** | Listar equipas, inspecionar membros, resolver nomes para UUIDs; `me`, `org`, perfis de utilizador |
| **Formulários** | Listar (agora **com âmbito de org** por omissão, com `--mine` e `--owner` para restringir), submeter, atualizar, transicionar formulários; **autorar** formulários (estados de workflow, permissões, ChatOps); paginação, pesquisa e filtros por data |
| **Workflows** | Ler workflows da org (`workflow list` / `workflow get`; só leitura) |
| **Canais de relatório** | Descobrir UUIDs de canal para formulários ou check-ins |
| **Chaves API por repositório** | Gerir `.dailybot/env.json` — um ficheiro opcional, ignorado pelo git, de chaves API + URLs por ambiente (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**O addon DWP liga apenas `report` à execução do plano.** Invoque a skill Dailybot diretamente para todo o resto — por exemplo, publicar um resumo de deploy em `#releases`, completar um standup ou pedir à IA Dailybot para resumir tendências de check-ins.

Referência pública: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Código-fonte: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Modelo de confiança: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) no pacote de skills.

## Comportamento — adiar, nunca bloquear

| Regra | Detalhe |
|------|--------|
| **Adiar** | A skill Dailybot é dona de instalação, consentimento, auth, modelos de hooks e estilo de escrita |
| **Nunca bloquear** | CLI ausente, falha de auth, erro de rede → avisar uma vez, continuar o trabalho principal |
| **Sem novas tentativas** | Não entrar em ciclos de diagnóstico; o relatório é de melhor esforço |
| **Reconciliar** | Skill, CLI, perfil, hooks ou ligação de relatório existente são preservados — apenas preencher lacunas |
| **Neutro em relação ao fornecedor** | O DWP não exige Dailybot; este addon é visibilidade aditiva para a equipa |

## Fluxo de integração

Durante a **Fase 7b** do `onboard` DWP, após o scaffolding AI-first central, o fluxo oferece quatro addons opcionais. Se o programador aceitar Dailybot:

1. Detetar configuração existente (skill, CLI, `.dailybot/profile.json`, hooks, passo de relatório).
2. Oferecer instalação de skill/CLI através dos fluxos de consentimento do Dailybot.
3. Adiar autenticação para `shared/auth.md`.
4. Ligar os quatro eventos do ciclo de vida em `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Oferecer opcionalmente reforço por hooks e `.dailybot/profile.json`.
6. Executar validação (SPEC §8 em `addons/dailybot/SPEC.md` da skill).

Contrato normativo na skill Deep Work Plan: `addons/dailybot/SPEC.md` (versão **2.3.0**).

## Entradas relacionadas do kit

- [Devcontainer](/kit/devcontainer) — ambiente de desenvolvimento reproduzível com persistência da CLI Dailybot (primeiro addon)
- [Dependency upgrade](/kit/dependency-upgrade) — atualizações de dependências em lotes e validadas (terceiro addon)
- [Design system](/kit/design-system) — `DESIGN.md` orientado a agentes para superfícies de interface (quarto addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — a sub-skill de integração que oferece addons
