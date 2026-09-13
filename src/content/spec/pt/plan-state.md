---
title: Estado do plano
description: "A camada de estado legível por máquina do plano: manifest.json e state.json, registros de gates, registros de resultado como memória episódica, reconciliação e quando ela é obrigatória."
order: 8
lang: pt
section: State
---

# Estado do plano

**Versão 5.0.0. Status: Estável.** Este documento especifica a camada de estado legível por máquina da metodologia Deep Work Plan, agora alinhada com a versão própria do padrão DWP — nenhum requisito existente é enfraquecido pela renumeração. Esta revisão também documenta o atualizador de estado protegido, a publicação verificada de planos e as regras de veracidade de evidência que um plano concluído deve satisfazer (veja abaixo). As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

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

`state.json` DEVE (MUST) ser reescrito pelo agente em cada um destes pontos de protocolo: materialização do plano (todas as tarefas `pending`), início da tarefa (`in_progress`), cada execução de validation gate (registro de gate anexado ou atualizado), conclusão da tarefa (`completed`, como parte do protocolo de conclusão de tarefa na [Especificação do DWP](/spec/dwp-specification#task-completion-protocol)), um checkpoint antes de qualquer interrupção planejada, e uma parada `blocked`.

Ambos os arquivos DEVEM (MUST) ser escritos atomicamente: escrever em um arquivo temporário no mesmo diretório e depois renomear sobre o alvo. Uma escrita interrompida NÃO DEVE (MUST NOT) deixar um arquivo JSON truncado no lugar.

## Quando a camada é obrigatória

- Para execução **interativa** em um repositório git, a camada de estado é RECOMENDADA (RECOMMENDED) para novos planos e OPCIONAL (OPTIONAL) para planos anteriores à v1.2. Um plano sem ela permanece conforme.
- Para execução **não supervisionada**, a camada de estado é OBRIGATÓRIA (REQUIRED).
- Em um **espaço de trabalho de agente** sem git, a camada de estado é OBRIGATÓRIA (REQUIRED): o `state.json` carrega as informações de recuperação que o log do git carrega em um repositório.

## `manifest.json` — identidade do plano

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` e `plan_format` são OBRIGATÓRIOS (REQUIRED).

`archetype` DEVE (MUST) ser um de `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` DEVE (MUST) ser um de `micro`, `standard`, `deep` (veja [Rigor proporcional](/spec/dwp-specification#proportional-rigor)).

`plan_format` DEVE (MUST) ser um de `lite`, `full` — a representação escolhida na criação (veja [Planos Lite](/spec/lite-plans)). É imutável no nível do manifesto: uma promoção posterior de Lite para Full é registrada no `state.json`, nunca reescrevendo o manifesto.

`parent_plan` vincula um plano filho ao seu plano orquestrador (`{repo}:{plan_name}`, ou `null`).

`created_by` DEVERIA (SHOULD) identificar o agente criador e o modelo. NÃO DEVE (MUST NOT) conter segredos, tokens ou identificadores de usuário além de um nome de exibição.

## `state.json` — estado de execução ao vivo

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
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
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
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

As entradas de tarefa de um plano Lite usam um locator `inline` que aponta para a âncora da tarefa em `README.md` em vez de um arquivo separado — o resto da entrada (gates, outcome, status) funciona da mesma forma:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Formato, materialização, aprovação e promoção

`format` DEVE (MUST) ser um de `lite`, `full` e espelha o `plan_format` do manifesto — aqui é mutável, ao contrário do manifesto, porque um plano Lite PODE (MAY) mais tarde ser promovido a Full. `materialization` DEVE (MUST) ser um de `materializing` (a pasta do plano está sendo escrita), `ready` (a materialização está completa) ou `promoting` (uma promoção de Lite para Full está em andamento). `approval` DEVE (MUST) ser um de `pending`, `approved`, `pre_approved`; é OPCIONAL (OPTIONAL) neste schema para que um plano escrito antes de ele ser registrado ainda seja válido — quando está ausente, trata-se a linha `Approval` do README como o valor, e `pending` quando nenhum dos dois está presente. `promotion` é `null` fora de uma promoção, ou um objeto que registra a intenção da promoção e as tarefas de destino enquanto `materialization` é `promoting`. Veja [Planos Lite](/spec/lite-plans) para o ciclo de vida completo que esses campos codificam.

### Entradas de tarefas

Toda tarefa — um arquivo separado em um plano Full, ou um registro `{#task-N}` em linha em um plano Lite — DEVE (MUST) ter exatamente uma entrada em `tasks`, identificada pelo seu número (`id`) e pelo seu `locator`. `locator.kind` DEVE (MUST) ser `file` (Full — `value` é o nome de arquivo da tarefa) ou `inline` (Lite — `value` é a âncora da tarefa, `#task-N`).

`status` DEVE (MUST) ser um de `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` é válido apenas quando o usuário removeu explicitamente a tarefa do escopo via `refine`; o `state.json` NÃO DEVE (MUST NOT) ser usado para pular trabalho silenciosamente.

Uma entrada `completed` DEVE (MUST) carregar `completed_at` e, onde o plano faz commits, o hash curto de `commit` — este é o link de rastreabilidade entre plano e código.

### Registros de gates

Cada execução de um comando de validação DEVERIA (SHOULD) ser registrada como um registro de gate: `command`, `passes` (booleano), `exit_code`, `last_run` e uma string `evidence` curta legível por humanos (uma linha de resumo ou um caminho no `analysis_results/` próprio do plano (dentro da pasta do plano, nunca na raiz do repositório), nunca a saída completa do comando).

Uma tarefa NÃO DEVE (MUST NOT) ser marcada como `completed` no `state.json` enquanto qualquer um de seus registros de gate tiver `passes: false` e não houver execução aprovada posterior. Os registros de gates são o equivalente de máquina de "nunca marcar como concluído sem evidência" — o padrão de um flag `passes` por item que protege contra conclusão prematura.

### Registros de resultado como memória episódica

Uma tarefa `completed` DEVERIA (SHOULD) carregar um registro de `outcome`: o que foi `tried` (tentado), o que `failed` (falhou), o que `worked` (funcionou) e `notes` (notas) em formato livre. Mantenha cada entrada em uma linha.

Os registros de resultado tornam um plano concluído em **memória episódica** recuperável: um agente (ou uma plataforma de indexação de memória) pode posteriormente lembrar como um problema foi resolvido, não apenas que foi. Eles alimentam as disposições de skills por tarefa e a reconciliação de skills do Final Review, que os lê ao extrair padrões. Em plataformas como o Hermes que indexam a memória do agente, os registros de resultado no `state.json` tornam os planos concluídos diretamente recuperáveis em sessões futuras.

### Checkpoint e estado bloqueado

`checkpoint` registra o ponto de retomada mais detalhado dentro da tarefa atual: o `id` da tarefa, um localizador de `step` em formato livre, um timestamp e uma nota de uma linha. Um agente DEVERIA (SHOULD) atualizá-lo sempre que pausar dentro de uma tarefa; DEVE (MUST) atualizá-lo antes de qualquer interrupção planejada no modo não supervisionado.

`blocked` é `null` ou `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Um agente não supervisionado que encontra uma condição de parada DEVE (MUST) preencher `blocked` antes de parar — é assim que o próximo heartbeat de um daemon, ou um humano, sabe por que o plano parou.

## Projeção e reconciliação

O markdown DEVE (MUST) vencer toda divergência. Se `state.json` diz que a tarefa 4 está `completed`, mas o README do plano mostra uma caixa desmarcada, o arquivo de estado está desatualizado.

Um agente que retoma DEVE (MUST) comparar a lista de caixas de seleção do README com o `state.json` antes de continuar. Em caso de dessincronização, DEVE (MUST) regenerar o `state.json` a partir do markdown (e do log do git, onde disponível), registrar a reconciliação no `PROGRESS.md` e só então prosseguir.

A sub-skill `verify` DEVE (MUST) tratar a dessincronização como uma descoberta de conformidade: relatar quais tarefas discordam e em qual direção.

Ferramentas que não sejam o agente em execução DEVEM (MUST) tratar ambos os arquivos JSON como somente leitura.

## Atualizações de estado protegidas

As escritas de progresso comuns passam por um atualizador direcionado e distribuído junto com a skill, em vez de uma reescrita completa do arquivo. Ele rejeita totalmente o estado malformado, e recusa-se a marcar uma tarefa como `completed` sem evidência de gate não vazia anexada — uma forma `--gate-json` está disponível para um comando cuja própria saída contenha caracteres de pipe, e o atualizador aceita o mesmo objeto de gate fechado descrito acima. Repetições substituem apenas o próprio comando; um comando diferente mantém seu próprio registro separado. `--block-reason` registra um bloqueio; `--resolve-blocker` resolve apenas o bloqueio da tarefa atual, nunca o de outra tarefa. Trabalho pulado nunca pode tornar um plano `completed`. `--reopen-reason` registra a intenção de quem chama de emendar o plano via `refine` — a emenda e qualquer evidência que ela invalide DEVEM (MUST) ser registradas primeiro no log da tarefa. `--expected-sha256` rejeita uma escrita contra um snapshot de estado que já avançou. Um diretório `.lock` cooperativo serializa escritores concorrentes; o lock de um escritor que travou DEVE (MUST) ser inspecionado antes da remoção, e nenhuma proteção é reivindicada contra um editor que contorne o lock completamente. Esses registros afirmam resultados — eles não provam por si mesmos que um comando foi executado, ou que sua saída foi aceita semanticamente.

## Publicação verificada do plano

Antes de anunciar a conclusão, os logs de tarefa finalizados (cada um carregando sua **disposição de skills** e, no Final Review, sua **decisão de documentação**), o índice do README e o `PROGRESS.md` DEVEM (MUST) ser redigidos a partir de resultados de origem e aceitação obtidos. A tarefa final do plano então se fecha por meio do finalizador distribuído: sua transição terminal valida o candidato concluído contra cada artefato do plano antes de escrever o estado, verifica os arquivos depois, e registra um recibo `analysis_results/FINALIZATION.json`. Um gate aprovado inventado NÃO DEVE (MUST NOT) sustentar essa transição — o recibo é evidência externa do que foi realmente verificado, nunca seu próprio pré-requisito. `bash ../verify/conformance.sh --plan PLAN_name` é executado em seguida, contra os artefatos reais em disco.

Uma publicação interrompida deixa um marcador `.finalizing.json` no lugar; a verificação normal falha até que a evidência seja inspecionada e o auxiliar de recuperação tenha sucesso contra o mesmo candidato — nada retoma uma publicação por suposição. Um lock cooperativo obsoleto requer confirmar que nenhum escritor permanece ativo antes da remoção. Nada nesta camada faz commit, push, executa um comando de gate armazenado, ou repara silenciosamente o markdown do plano. Um interpretador Python ausente produz `UNVERIFIED`, nunca `completed`.

## Veracidade da evidência e emendas

Toda mudança no escopo, nos critérios de aceitação ou no adiamento de uma tarefa carrega um registro de emenda durável: o critério original textual, o que foi observado, a disposição, o motivo, a autoridade por trás dela (usuário, desenvolvedor ou evidência), as tarefas afetadas e qual evidência foi invalidada ou preservada. As emendas são anexadas, nunca retrodatadas; o `manifest.json` mantém sua procedência de criação e nunca é reescrito para corresponder a um escopo ao vivo alterado.

Cinco estados de evidência descrevem contra o que um registro de tarefa pode se fechar:

- **Investigação concluída** — trabalho real registrado; fecha uma tarefa apenas contra um critério revisado que a nomeia, nunca contra o original tal como escrito.
- **Cenário não executado** — registrado como não realizado; não contribui com evidência aprovada em nenhuma era.
- **Requisito adiado** — o critério se move para uma tarefa de destino nomeada com autoridade registrada; apenas essa emenda fecha a origem.
- **Gate falho** — permanece falhando até que a mesma intenção de aceitação seja reexecutada e passe; uma repetição substitui apenas o próprio comando.
- **Resultado de produto alcançado** — o critério tal como escrito, verificado pelo seu próprio gate; o único estado que conclui uma tarefa sem alterações.

A aplicação é mecânica onde quer que os registros permitam. Evidência de gate marcada "invalidada por refine" é histórico preservado, nunca evidência aprovada, e uma tarefa concluída que ainda depende dela é relatada pelo verificador. Um registro aprovado cujo próprio texto admite que a verificação nunca foi executada (por exemplo, "nunca entrou", "não foi executado" ou "não pode ser medido") é uma contradição, relatada da mesma forma — assim como uma tarefa de estado concluída cujo próprio log ainda diz `Status: pending`. Contradições narrativas além dessas — um relatório cujas conclusões discordam de sua própria checklist — requerem um revisor humano; o verificador relata o que os registros dizem, não o que a prosa significa. Um usuário PODE (MAY) aceitar explicitamente uma exceção delimitada com autoridade registrada; a pré-aprovação não supervisionada nunca é permissão geral para abandonar um objetivo central, e um critério obrigatório que não pode ser cumprido é um bloqueio, nunca trabalho concluído.

## Versionamento do schema

Ambos os schemas são versionados por URL. Campos aditivos são permitidos dentro de uma versão; renomear ou alterar o tipo de um campo requer uma nova versão de schema e uma nota de migração no changelog da especificação. Esta revisão introduz `/v2.json` para ambos os schemas: o campo `file` da entrada de tarefa passa a ser um `locator` tipado (`{"kind": "file" | "inline", "value": ...}`), o manifesto ganha `plan_format`, e o arquivo de estado ganha `format`, `materialization`, `approval` e `promotion` — juntos, os campos de que os planos Lite precisam (veja [Planos Lite](/spec/lite-plans)). Os manifestos e arquivos de estado `/v1.json` permanecem válidos e nunca são reescritos silenciosamente para v2; uma sessão de `refine` PODE (MAY) migrar um deliberadamente. O campo `spec_version` no manifesto fixa a versão da especificação DWP sob a qual o plano foi criado; um agente que encontrar um plano mais novo do que sua especificação instalada DEVERIA (SHOULD) informar isso em vez de adivinhar.
