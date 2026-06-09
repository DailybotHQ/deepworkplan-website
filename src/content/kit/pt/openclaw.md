---
title: OpenClaw
description: "O adaptador DWP para o OpenClaw: varredura nativa de .agents/skills, mapeamento de execução não supervisionada e continuação do plano via cron para espaços de trabalho de agentes autônomos."
kind: adapter
lang: pt
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Adaptador OpenClaw

O OpenClaw é uma plataforma de agentes autônomos que executa espaços de trabalho de longa duração com turnos agendados. Ele varre nativamente `<workspace>/.agents/skills/` em busca de pacotes de skills instalados, o que significa que a skill DWP carrega sem nenhum shim de adaptador — instale-a lá e o OpenClaw a detecta automaticamente.

## Nível de suporte

**Completo** — o OpenClaw lê o `AGENTS.md` e carrega a skill via o padrão AgentSkills. Todas as sub-skills do DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) estão disponíveis.

## Instalação

```bash
openclaw skills install deepworkplan
```

Ou manualmente: clone `DailybotHQ/deepworkplan-skill` em `<workspace>/.agents/skills/deepworkplan/`.

## Invocação

Texto simples — o OpenClaw não usa um prefixo de slash command:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Mapeamento de execução não supervisionada

Os primitivos de agendamento do OpenClaw mapeiam diretamente para o modelo de continuação do DWP:

| Primitivo OpenClaw | Função no DWP |
|--------------------|---------------|
| Raiz do workspace | Arquétipo [espaço de trabalho de agente](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` na raiz do workspace |
| `<workspace>/.agents/skills/` (varredura nativa tier-2) | Onde este pacote reside — sem shim de adaptador necessário |
| Turno de heartbeat ou cron | Um turno de [continuação agendada](/spec/agent-protocol#scheduled-continuation): acordar → Protocolo de Retomada do DWP → próxima tarefa atômica → atualizar estado → ceder |
| Verificações do `HEARTBEAT.md` | Adicione uma linha: "If `.dwp/plans/` has an open plan, resume it for one task." |
| Ordens permanentes | O ponto de controle de aprovação do plano e a autoridade limitada do perfil não supervisionado |

Operacionalmente:

1. Um humano cria e aprova um plano de forma interativa. A aprovação é o ponto de controle — turnos não supervisionados nunca criam e executam em um único turno.
2. O plano deve carregar a camada de estado legível por máquina (`manifest.json` + `state.json`). Em um workspace sem git, o `state.json` é o que torna possível a retomada segura contra falhas. Veja [Estado do plano](/spec/plan-state).
3. Cada turno de heartbeat ou cron executa no máximo uma tarefa, passa pelo seu validation gate, atualiza o `state.json` atomicamente e cede.
4. Em qualquer condição de parada, o agente escreve no campo `blocked` do `state.json` e reporta pelo canal normal do workspace. O próximo olhar humano — ou relatório de heartbeat — vê exatamente o que é necessário.

O resultado: um plano de vários dias que sobrevive a reinicializações, trocas de modelo e limites de sessão, executado overnight pelo daemon — com os mesmos gates que uma execução supervisionada por humanos teria.

## Notas

O workspace do OpenClaw é o exemplo canônico do arquétipo [espaço de trabalho de agente](/spec/archetypes). A integração com `HEARTBEAT.md` e o requisito de `state.json` do pacote de skill DWP foram projetados com esta plataforma em mente.
