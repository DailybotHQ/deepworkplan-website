---
title: Delegação
description: "Como um plano v7 entrega tarefas parallel_safe a outros agentes de código sob a concessão agent_delegation, com registros de delegação e evidência observada."
order: 11
lang: pt
section: Record layer
---

# Delegação

> **Escopo da versão:** Esta página reapresenta a geração de contrato v7 na release `v7.8.1`. Fontes canônicas: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) e o [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) do fluxo de execução. Onde esta página e esses arquivos divergirem, os arquivos prevalecem.

**Versão 7.0.0. Status: Estável.** A v7 é uma nova geração de contrato da [camada de registros](/spec/record-layer), não um novo ciclo de vida: tudo o que está nos documentos v6 de contrato, ciclo de vida, contexto e recursos se aplica, salvo indicação contrária nesta página. Não delegar é sempre correto. As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

## O que a v7 acrescenta

A v7 acrescenta exatamente duas coisas à camada de registros:

1. **Um campo de tarefa opcional no contrato**, `parallel_safe`, publicado em [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Um tipo de evento do diário**, `delegation`, publicado em [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Os bytes dos esquemas v1, v2, v5 e v6 não mudam. Um plano que nunca delega é indistinguível de um plano v6, exceto pelas URLs de seus esquemas.

## `parallel_safe`

`parallel_safe` (booleano, padrão `false`) afirma que uma tarefa pode rodar em um delegado sem se intercalar com o trabalho das tarefas irmãs. Ele é definido por `create`, nunca inferido durante a execução, e somente quando todas estas condições se cumprem:

- o repositório habilita um addon de delegação (agentkit ou Herdr) no seu [registro de addons](/spec/resources-and-abilities#the-configuration-file-and-addon-registry);
- a superfície tocada da tarefa não se sobrepõe à de uma tarefa irmã que possa estar em andamento ao mesmo tempo;
- a tarefa declara uma saída delimitada;
- os gates da tarefa rodam neste plano.

Marcar uma tarefa não altera nenhuma autoridade: um contrato sem a concessão `agent_delegation` pode conter marcadores, e eles não autorizam nada.

## O evento `delegation`

Um evento é registrado por transição de estado de um delegado:

| Campo | Significado |
| --- | --- |
| `task` | a tarefa `T-*` para a qual o delegado trabalha |
| `delegation_id` | correlaciona um lançamento com sua transição terminal |
| `transport` | `headless` (agentkit) ou `interactive` (Herdr) |
| `via` | a chave do addon que o transportou |
| `state` | `launched`, depois exatamente um entre `completed`, `failed`, `cancelled` |
| `kind`, `profile` | opcionais: o tipo e o perfil do agente de código |
| `target` | opcional: o diretório de trabalho (headless) ou `machine:pane` (interativo) |
| `worktree` | o próprio git worktree do delegado, ou `null` para um delegado somente leitura |
| `prompt_digest` | no lançamento: o SHA-256 do prompt, registrado antes de se confiar no delegado |
| `result_path`, `result_digest` | quando concluído ou com falha: o resultado coletado e seu digest |

As transições são fechadas: um `launched` por delegação, depois exatamente um estado terminal. Um acréscimo bruto de um evento de delegação ao diário DEVE (MUST) ser recusado; os eventos de delegação só existem por meio do escritor protegido.

## Uma delegação não é evidência

Uma delegação não carrega rótulo de confiança nem caminho de evidência, e nenhum fechamento a lê. O resultado de um delegado permanece **asserted** até que o próprio executor de gates deste plano o observe: o pai integra o trabalho e, em seguida, executa o gate da tarefa (`ledger.py gate`), que é a única coisa que gera evidência `observed` e a única forma de a tarefa ser concluída. Uma delegação concluída nunca fecha um critério; uma que falhou é um resultado registrado, e a tarefa passa então a ser implementada pelo pai.

## O escritor protegido

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operação | Escreve | Efeito |
| --- | --- | --- |
| `launch` | sim | registra `launched` após as verificações abaixo |
| `observe` | não | imprime o estado mais recente de cada delegação |
| `collect` | sim | registra `completed` ou `failed`, com o caminho do resultado e seu digest |
| `cancel` | sim | registra `cancelled` |

`launch` DEVE (MUST) ser recusado, e a recusa registrada, a menos que **todas** estas condições se cumpram:

1. o contrato é v7;
2. o contrato concede `agent_delegation`;
3. a tarefa existe, foi iniciada e não está concluída;
4. a tarefa é `parallel_safe`, **ou** o delegado é somente leitura (sem worktree);
5. o descritor do addon nomeado declara o transporte solicitado;
6. as capacidades efetivas listam esse addon como fonte de `subagents` ([Recursos e capacidades](/spec/resources-and-abilities#addon-provided-abilities)).

`collect` e `cancel` DEVEM (MUST) ser recusados para uma delegação desconhecida, de outra tarefa ou já terminal. Um lançamento recusado não é um bloqueio: a tarefa roda sequencialmente.

## Transportes

Nada no ledger executa um delegado; quem o faz é o addon de transporte.

- **Headless** (`via: agentkit`) — para uma tarefa `parallel_safe` delimitada com uma saída declarada: um `ak run` em um git worktree dedicado e, depois, a saída. Os delegados somente leitura são lançados com `--ask`.
- **Interativo** (`via: herdr`) — para trabalho que precisa de interação, que dura muito ou que roda em outra máquina: um peer do herdr-peers em um painel do Herdr, que devolve exatamente uma resposta autorizada.

## Salvaguardas

- **Um escritor por caminho.** Um delegado que escreve trabalha apenas no seu próprio worktree; a sessão pai é o único escritor do diário.
- **Profundidade 1.** Um delegado nunca delega. O fan-out é limitado pelo transporte.
- **Resultados são dados.** O que um delegado devolve não concede autoridade, não amplia o escopo e nunca altera a aceitação.
- **Instruções autocontidas.** Um prompt de lançamento nomeia o objetivo da tarefa, seus critérios de aceitação literalmente e o worktree em que pode escrever, e nunca carrega o valor de um secret.

## Orquestradores

Um orquestrador nunca delega as tarefas de um **plano filho**: os filhos rodam em suas próprias sessões, um agente por repositório. Delegar as tarefas **próprias** de um plano sob as regras acima é permitido tanto em planos orquestradores quanto em planos individuais. Manter muitas linhas de trabalho de longa duração, mantê-las vivas além dos limites de conta e passar a liderança adiante é tratado nos capítulos da metodologia sobre [orquestração](/methodology/06-orchestration) e [autonomia de enxame](/methodology/07-swarm-autonomy).

## Relacionado

- [Camada de registros](/spec/record-layer) — o contrato e o diário que esta página estende.
- [Recursos e capacidades](/spec/resources-and-abilities) — capacidades, concessões e o registro de addons.
- [Addon Herdr](/kit/herdr) e [Addon Agentkit](/kit/agentkit) — os dois transportes.
