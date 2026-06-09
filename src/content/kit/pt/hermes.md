---
title: Hermes
description: "O adaptador DWP para o Hermes: carregamento de skill pelo padrão AgentSkills, sinergia de memória episódica via registros de resultado no state.json e continuação do plano via cron."
kind: adapter
lang: pt
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adaptador Hermes

O Hermes é uma plataforma de agentes autônomos que carrega skills via o padrão AgentSkills e mantém memória episódica entre sessões. O DWP integra-se com ambas as superfícies: o pacote de skill carrega a partir de `.agents/skills/` da mesma forma que qualquer outro pacote compatível com AgentSkills, e os registros de resultado do `state.json` alimentam diretamente o índice de memória do Hermes.

## Nível de suporte

**Completo** — o Hermes lê o `AGENTS.md` e carrega a skill via o carregamento padrão AgentSkills. Todas as sub-skills do DWP estão disponíveis.

## Instalação

Instale o pacote de skill no diretório `.agents/skills/` do workspace, ou use o gerenciador de skills da plataforma, se disponível.

## Invocação

Texto simples:

```
create a plan for <goal>
resume the open plan
```

## Sinergia de memória episódica

O Hermes indexa a memória do agente para tornar o trabalho passado recuperável em sessões futuras. Os registros de resultado do `state.json` do DWP são projetados exatamente para esse uso: cada tarefa concluída carrega o que foi `tried` (tentado), o que `failed` (falhou), o que `worked` (funcionou) e notas em formato livre em um campo JSON estruturado. Quando o Hermes indexa os arquivos de estado em `.dwp/plans/` do workspace, os planos concluídos tornam-se memória episódica recuperável — um agente pode posteriormente lembrar como um problema específico foi resolvido, não apenas que um plano foi executado.

Isso significa que os planos DWP no Hermes são duráveis de duas formas: os arquivos markdown são o registro legível por humanos, e os registros de resultado do `state.json` são a memória indexável por máquina. Veja [Estado do plano](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuação via cron

Em plataformas com agendamento por cron, a continuação segue o mesmo padrão que outras plataformas autônomas: cada turno agendado acorda, executa o Protocolo de Retomada do DWP, executa no máximo uma tarefa, atualiza o `state.json` e cede. O plano, não a sessão, é a unidade de continuidade.

A camada de estado legível por máquina (`manifest.json` + `state.json`) é OBRIGATÓRIA (REQUIRED) para execução não supervisionada. Veja [Protocolo do agente](/spec/agent-protocol#execution-profiles) para o protocolo completo de condições de parada e escalação.

## Notas

O Hermes e o OpenClaw são ambas plataformas de agentes autônomos na tabela de agentes suportados em [Protocolo do agente](/spec/agent-protocol). Ambos executam sob o perfil de execução não supervisionada e ambos se beneficiam da equivalência `state.json`-como-git-log do arquétipo de espaço de trabalho de agente.
