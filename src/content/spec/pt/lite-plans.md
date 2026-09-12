---
title: Planos Lite
description: "Planos Lite: registros de tarefa compactos e executáveis em linha dentro do README.md, sua criação e seleção de formato, e a promoção a um plano Full."
order: 3
lang: pt
section: Workflow
---

# Planos Lite

**Versão 4.0.0. Status: Estável.** Este documento especifica a representação de plano Lite introduzida junto com a [Especificação do DWP](/spec/dwp-specification): um formato de plano para trabalho pequeno a médio e delimitado que é materializado diretamente, sem uma etapa de rascunho não executável. As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

## Representação e ciclo de vida

Um plano DEVE (MUST) ser uma de duas representações, registrada uma vez em `manifest.json` como `plan_format`: **Full** armazena um arquivo por tarefa em `<n>.task_<slug>.md`; **Lite** armazena registros de tarefa compactos e executáveis em linha em `README.md`, cada um atrás de uma âncora estável `{#task-N}`. Um plano Lite não é um plano Full parcial ou informal: todo registro de tarefa DEVE (MUST) continuar carregando um objetivo, uma Superfície tocada, critérios de aceitação, um validation gate e um Completion & Log, na mesma forma normativa que a [Anatomia da tarefa](/spec/dwp-specification#task-anatomy) define para Full.

Quatro eixos descrevem o estado de um plano, e DEVEM (MUST) ser rastreados independentemente, em vez de misturados:

| Eixo | Valores | Significado |
|------|--------|-------------|
| Formato | `lite`, `full` | Onde vivem os registros de tarefa |
| Materialização | `materializing`, `ready`, `promoting` | Se a pasta do plano está sendo escrita, completa, ou em promoção |
| Aprovação | `pending`, `approved`, `pre_approved` | Se um humano revisou o plano, ou o modo trust o pré-aprovou |
| Execução | `pending`, `in_progress`, `blocked`, `completed` | Progresso por tarefa e geral |

O create guiado escreve uma **proposta pendente revisável** — Lite ou Full, já o plano real, nunca um rascunho descartável. Trust materializa um plano **pronto e pré-aprovado** e devolve o controle imediatamente. `create` e uma promoção nunca executam trabalho de produto; um pedido explícito de `execute` ou `resume` aprova o escopo atual pronto do plano e DEVE (MUST) registrar essa aprovação antes de iniciar o trabalho; sem esse pedido, uma proposta `pending` não é executável; uma promoção não resolvida em andamento DEVE (MUST) ser recuperada antes do trabalho de produto.

## Criação e seleção de formato

`/dwp-create` atende à intenção de planejamento em qualquer escala, não apenas em trabalho grande. Trabalho pequeno e delimitado — uma única preocupação, aproximadamente uma sessão, sem coordenação — é o alvo do plano Lite; trabalho de várias etapas com escopo real recorre por padrão a Full, conforme o [Rigor proporcional](/spec/dwp-specification#proportional-rigor). Uma edição direta, uma explicação, uma verificação de status, uma retomada, ou um pedido explícito de não criar um plano mantêm sua própria rota e nunca se tornam um plano.

`lite` e `full` são **preferências de formato**; `trust` e `auto` são **opções de interação** separadas, e qualquer um dos dois tipos de opção PODE (MAY) aparecer em qualquer extremidade do pedido, em qualquer ordem:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Repetir a mesma opção é idempotente; solicitar `lite` e `full` juntos é um erro. `--` encerra a análise de opções.

Quando nenhuma preferência de formato é dada, `create` recomenda uma e explica por quê. Um pedido explícito de **Full** sempre prevalece. Um pedido explícito de **Lite** é atendido a menos que os requisitos ou os validation gates do trabalho não caibam em registros compactos em linha — nesse caso `create` registra por que Full é exigido em vez disso. A seleção DEVE (MUST) registrar o escopo observado, as dependências, o nível de detalhe de instrução exigido, e as incertezas por trás da escolha — um julgamento auditável, não uma garantia que se sustente em todo modelo ou agente.

## Promoção e compatibilidade

Um plano Lite PODE (MAY) ser **promovido** a Full a qualquer momento, via `/dwp-refine promote {plan_name}` (veja [dwp-refine](/kit/dwp-refine)). A promoção é **apenas de representação**: registra a intenção, escreve os arquivos de tarefa de destino, valida que todo requisito e gate que o registro Lite carregava ainda esteja coberto, muda a cópia autoritativa dos registros em linha do README para os arquivos de tarefa, e então limpa o marcador em andamento. `execute` e `resume` DEVEM (MUST) recusar-se a prosseguir enquanto um marcador de promoção permanecer definido. IDs de tarefa e evidência de conclusão já registrados NÃO DEVEM (MUST NOT) ser reescritos por uma promoção; novo escopo descoberto durante a promoção passa por `refine` em vez disso, e invalida apenas a evidência que afeta.

A promoção nunca funciona no sentido inverso automaticamente: um plano Full não é silenciosamente reduzido de volta a Lite. Um plano redigido sob uma versão de spec anterior — incluindo um plano Full v1 sem nenhum campo `plan_format` — mantém sua forma registrada e permanece conforme; uma sessão de `refine` PODE (MAY) migrá-lo deliberadamente, mas nada o faz implicitamente.

O `plan_format` do `manifest.json` é imutável uma vez escrito; uma promoção altera o `format` do `state.json` e limpa seu marcador `promotion`, e nunca reescreve o manifesto. Veja [Estado do plano](/spec/plan-state) para os campos exatos `plan_format`, `format`, `materialization`, `approval`, `promotion` e `locator`, e suas URLs de schema v2.
