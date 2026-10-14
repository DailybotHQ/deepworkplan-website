---
title: Hermes
description: "O adaptador DWP para o Hermes: carregamento de skill pelo padrão AgentSkills, sinergia de memória episódica via registros de resultado no state.json e."

Em planos v6 e v7, o estado é projetado a partir do diário somente de adição (`journal.ndjson`) via `ledger.py project` em vez de reescrever manualmente os arquivos de estado.
kind: adapter
lang: pt
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adaptador Hermes

O Hermes é uma plataforma de agentes autônomos que carrega skills via o padrão AgentSkills e mantém memória episódica entre sessões. O DWP integra-se com ambas as superfícies: o pacote de skill carrega a partir de `.agents/skills/` da mesma forma que qualquer outro pacote compatível com AgentSkills, e os registros de resultado do `state.json` alimentam diretamente o índice de memória do Hermes.

Em planos v6 e v7, o estado é projetado a partir do diário somente de adição (`journal.ndjson`) via `ledger.py project` em vez de reescrever manualmente os arquivos de estado.

## Nível de suporte

**Completo** (Documentado) — O Hermes lê o `AGENTS.md` e carrega a skill via carregamento padrão AgentSkills. Todas as sub-skills do DWP estão disponíveis.

## Instalação

Instale o pacote de skill no diretório `.agents/skills/` do workspace, ou use o gerenciador de skills da plataforma, se disponível.

## Invocação

Texto simples:

```
create a plan for <goal>
resume the open plan
```

## Sinergia de memória episódica

En planos v6 e v7, os recibos de verificação determinísticos do DWP (`outcomes.py receipt`) e os registros de resultados alimentam diretamente o índice de memória do Hermes: cada tarefa concluída carrega o que foi tentado, o que falhou e o que funcionou em um esquema JSON estruturado. Planos concluídos tornam-se memória episódica recuperável — um agente pode lembrar como um problema foi resolvido.

Sessões efêmeras anexam eventos a `journal.ndjson` e projetam `state.json` via `ledger.py project` em vez de reescrever manualmente arquivos de estado. Veja [Estado do plano](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuação via cron

Em plataformas com agendamento por cron, a continuação segue o mesmo padrão que outras plataformas autônomas: cada turno agendado acorda, executa o Protocolo de Retomada do DWP, executa no máximo uma tarefa, atualiza o `state.json` e cede. O plano, não a sessão, é a unidade de continuidade.

A camada de estado legível por máquina (`manifest.json` + `state.json`) é OBRIGATÓRIA (REQUIRED) para execução não supervisionada. Veja [Protocolo do agente](/spec/agent-protocol#execution-profiles) para o protocolo completo de condições de parada e escalação.

## Notas

O Hermes e o OpenClaw são ambas plataformas de agentes autônomos na tabela de agentes suportados em [Protocolo do agente](/spec/agent-protocol). Ambos executam sob o perfil de execução não supervisionada e ambos se beneficiam da equivalência `state.json`-como-git-log do arquétipo de espaço de trabalho de agente.
