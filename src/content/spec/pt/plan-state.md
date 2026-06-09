---
title: Estado do plano
description: "A camada de estado legível por máquina do plano: manifest.json e state.json, registros de gates, registros de resultado como memória episódica, reconciliação e quando ela é obrigatória."
order: 7
lang: pt
section: State
---

# Estado do plano

**Versão 1.0. Status: Estável.** Este documento especifica a camada de estado legível por máquina da metodologia Deep Work Plan. As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

Dois artefatos JSON — `manifest.json` (a identidade estática do plano) e `state.json` (o estado de execução ao vivo, por tarefa, incluindo os resultados dos validation gates) — que todo plano PODE (MAY) carregar junto com seus arquivos markdown, e que a execução não supervisionada (veja [Protocolo do agente](/spec/agent-protocol#execution-profiles)) e os espaços de trabalho sem git (veja [Arquétipos](/spec/archetypes) §3) DEVEM (MUST) carregar.

O plano markdown permanece a **fonte de verdade legível por humanos**. A camada JSON é uma **projeção derivada**: é regenerada pelo agente em pontos de protocolo definidos, nunca editada manualmente e nunca permitida de discordar silenciosamente do markdown. Seu propósito é a interoperabilidade — linting, verificação de conformidade, diff, dashboards, descoberta em registros e sincronização com infraestrutura de sessão externa — nada do que pode ser construído de forma confiável sobre prosa.

## Por que isso existe

Até a v1.1, os planos eram apenas markdown de prosa. Isso os mantinha auditáveis e agnósticos em relação ao agente, mas não deixava nada que uma ferramenta pudesse validar, comparar com diff ou consumir: sem gate de conformidade, sem detecção de dessincronização entre `README.md` e `PROGRESS.md`, sem maneira de um daemon ou sessão em nuvem saber o estado de um plano sem analisar prosa. A v1.2 adiciona a projeção JSON sem rebaixar o markdown — a projeção é derivada do markdown, da mesma forma que um lockfile é derivado de um manifesto.

## Posicionamento

Um plano que usa a camada de estado tem este layout:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← fonte de verdade humana (sem alterações)
├── PROGRESS.md          ← log narrativo (sem alterações)
├── PROMPTS.md           ← sem alterações
├── manifest.json        ← identidade estática (escrito na materialização)
├── state.json           ← estado ao vivo (reescrito em pontos de protocolo)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` DEVE (MUST) ser escrito exatamente uma vez, quando o fluxo `create` materializa o plano, e NÃO DEVE (MUST NOT) ser alterado depois, exceto para uma migração de versão de spec registrada no `PROGRESS.md`.

`state.json` DEVE (MUST) ser reescrito pelo agente em cada um destes pontos de protocolo: materialização do plano (todas as tarefas `pending`), início da tarefa (`in_progress`), cada execução de validation gate (registro de gate anexado ou atualizado) e conclusão da tarefa (`completed`, como parte do protocolo de conclusão de tarefa na [Especificação do DWP](/spec/dwp-specification#task-completion-protocol)).

Ambos os arquivos DEVEM (MUST) ser escritos atomicamente: escrever em um arquivo temporário no mesmo diretório e depois renomear sobre o alvo. Uma escrita interrompida NÃO DEVE (MUST NOT) deixar um arquivo JSON truncado no lugar.

## Quando a camada é obrigatória

- Para execução **interativa** em um repositório git, a camada de estado é RECOMENDADA (RECOMMENDED) para novos planos e OPCIONAL (OPTIONAL) para planos anteriores à v1.2. Um plano sem ela permanece conforme.
- Para execução **não supervisionada**, a camada de estado é OBRIGATÓRIA (REQUIRED).
- Em um **espaço de trabalho de agente** sem git, a camada de estado é OBRIGATÓRIA (REQUIRED): o `state.json` carrega as informações de recuperação que o log do git carrega em um repositório.

## `manifest.json` — identidade do plano

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` e `task_count` são OBRIGATÓRIOS (REQUIRED).

`archetype` DEVE (MUST) ser um de `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` DEVE (MUST) ser um de `micro`, `standard`, `deep` (veja [Rigor proporcional](/spec/dwp-specification#proportional-rigor)).

`parent_plan` vincula um plano filho ao seu plano orquestrador (`{repo}:{plan_name}`, ou `null`).

`created_by` DEVERIA (SHOULD) identificar o agente criador e o modelo. NÃO DEVE (MUST NOT) conter segredos, tokens ou identificadores de usuário além de um nome de exibição.

## `state.json` — estado de execução ao vivo

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### Entradas de tarefas

Todo arquivo de tarefa no plano DEVE (MUST) ter exatamente uma entrada em `tasks`, identificada pelo seu número (`id`) e nome de arquivo (`file`).

`status` DEVE (MUST) ser um de `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` é válido apenas quando o usuário removeu explicitamente a tarefa do escopo via `refine`; o `state.json` NÃO DEVE (MUST NOT) ser usado para pular trabalho silenciosamente.

Uma entrada `completed` DEVE (MUST) carregar `completed_at` e, onde o plano faz commits, o hash curto de `commit` — este é o link de rastreabilidade entre plano e código.

### Registros de gates

Cada execução de um comando de validação DEVERIA (SHOULD) ser registrada como um registro de gate: `command`, `passes` (booleano), `exit_code`, `last_run` e uma string `evidence` curta legível por humanos (uma linha de resumo ou um caminho em `analysis_results/`, nunca a saída completa do comando).

Uma tarefa NÃO DEVE (MUST NOT) ser marcada como `completed` no `state.json` enquanto qualquer um de seus registros de gate tiver `passes: false` e não houver execução aprovada posterior. Os registros de gates são o equivalente de máquina de "nunca marcar como concluído sem evidência" — o padrão de um flag `passes` por item que protege contra conclusão prematura.

### Registros de resultado como memória episódica

Uma tarefa `completed` DEVERIA (SHOULD) carregar um registro de `outcome`: o que foi `tried` (tentado), o que `failed` (falhou), o que `worked` (funcionou) e `notes` (notas) em formato livre. Mantenha cada entrada em uma linha.

Os registros de resultado tornam um plano concluído em **memória episódica** recuperável: um agente (ou uma plataforma de indexação de memória) pode posteriormente lembrar como um problema foi resolvido, não apenas que foi. Eles alimentam a tarefa obrigatória de Descoberta de Skills e Agentes, que DEVERIA (SHOULD) lê-los ao extrair padrões. Em plataformas como o Hermes que indexam a memória do agente, os registros de resultado no `state.json` tornam os planos concluídos diretamente recuperáveis em sessões futuras.

### Checkpoint e estado bloqueado

`checkpoint` registra o ponto de retomada mais detalhado dentro da tarefa atual: o `id` da tarefa, um localizador de `step` em formato livre, um timestamp e uma nota de uma linha. Um agente DEVERIA (SHOULD) atualizá-lo sempre que pausar dentro de uma tarefa; DEVE (MUST) atualizá-lo antes de qualquer interrupção planejada no modo não supervisionado.

`blocked` é `null` ou `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Um agente não supervisionado que encontra uma condição de parada DEVE (MUST) preencher `blocked` antes de parar — é assim que o próximo heartbeat de um daemon, ou um humano, sabe por que o plano parou.

## Projeção e reconciliação

O markdown DEVE (MUST) vencer toda divergência. Se `state.json` diz que a tarefa 4 está `completed`, mas o README do plano mostra uma caixa desmarcada, o arquivo de estado está desatualizado.

Um agente que retoma DEVE (MUST) comparar a lista de caixas de seleção do README com o `state.json` antes de continuar. Em caso de dessincronização, DEVE (MUST) regenerar o `state.json` a partir do markdown (e do log do git, onde disponível), registrar a reconciliação no `PROGRESS.md` e só então prosseguir.

A sub-skill `verify` DEVE (MUST) tratar a dessincronização como uma descoberta de conformidade: relatar quais tarefas discordam e em qual direção.

Ferramentas que não sejam o agente em execução DEVEM (MUST) tratar ambos os arquivos JSON como somente leitura.

## Versionamento do schema

Ambos os schemas são versionados por URL (`/v1.json`). Campos aditivos são permitidos dentro de uma versão; renomear ou alterar o tipo de um campo requer `/v2.json` e uma nota de migração no changelog da especificação. O campo `spec_version` no manifesto fixa a versão da especificação DWP sob a qual o plano foi criado; um agente que encontrar um plano mais novo do que sua especificação instalada DEVERIA (SHOULD) informar isso em vez de adivinhar.
