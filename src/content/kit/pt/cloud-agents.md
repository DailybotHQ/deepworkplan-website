---
title: Agentes em nuvem
description: "O adaptador DWP para agentes em nuvem e em segundo plano: tarefas remotas do Claude Code, Codex cloud, agentes classe Jules — sessões efêmeras executando contra um plano .dwp/ durável."
kind: adapter
lang: pt
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Adaptador para agentes em nuvem

Agentes em nuvem e em segundo plano — tarefas remotas do Claude Code, Codex cloud da OpenAI, agentes classe Jules e ambientes de execução assíncrona similares — são efêmeros por design: uma sessão começa, executa por um tempo limitado e termina. O DWP transforma essa restrição em uma vantagem ao tornar o plano o artefato durável, não a sessão.

## O insight central

O diretório `.dwp/` do repositório é a **camada de spec e estado durável**. As sessões em nuvem são **executores efêmeros**. O plano diz ao executor o que fazer; o `state.json` diz onde retomar. A sessão pode ser qualquer coisa — um modelo diferente, um provedor diferente, um novo contêiner — e o plano continua exatamente de onde parou.

## Nível de suporte

**Completo** — qualquer agente em nuvem que leia o repositório, siga o `AGENTS.md` e possa executar comandos shell suporta o DWP sem um adaptador específico de plataforma.

## O loop de acordar-retomar-ceder

Cada turno de agente em nuvem segue o padrão:

1. **Acordar** — a sessão começa (acionada por um agendamento cron, um evento de CI ou uma ação do usuário).
2. **Executar o Protocolo de Retomada do DWP** — ler o README do plano, localizar o checkpoint, reconciliar o `state.json` com o markdown, inspecionar a juntura, executar um smoke test. Veja [Especificação do DWP](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Verificar o estado bloqueado** — se `state.json.blocked` estiver definido, reportar o motivo e ceder sem executar.
4. **Executar a próxima tarefa atômica** — uma tarefa, passando pelo seu validation gate completo.
5. **Atualizar a camada de estado** — reescrever o `state.json` atomicamente com o novo status da tarefa, registros de gate, registro de resultado e hash de commit.
6. **Ceder** — a sessão termina de forma limpa; o próximo turno retoma a partir do estado atualizado.

## Requisitos

- O plano DEVE (MUST) carregar a camada de estado legível por máquina (`manifest.json` + `state.json`). Sem ela, uma sessão efêmera não tem forma confiável de determinar a posição de retomada. Veja [Estado do plano](/spec/plan-state).
- O plano DEVE (MUST) ter sido aprovado por um humano antes de qualquer turno em nuvem não supervisionado. A aprovação do plano é o ponto de controle.
- O agente opera sob autoridade limitada: NÃO DEVE (MUST NOT) expandir o escopo, executar ações destrutivas que o plano não autoriza explicitamente, nem improvisar além das instruções da tarefa atual. Veja [Protocolo do agente](/spec/agent-protocol#execution-profiles).

## Notas

As sessões de agentes em nuvem são o caso extremo do perfil de execução não supervisionada: zero continuidade de sessão, máxima durabilidade do plano. O diretório `.dwp/` do DWP é especificamente projetado para que isso funcione — todo o estado que um agente precisa para iniciar, continuar e concluir um conjunto de trabalho vive em arquivos markdown e JSON simples que qualquer sessão pode ler a partir de um checkout recente.
