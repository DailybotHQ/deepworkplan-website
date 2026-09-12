---
title: "DWP v4: planos sob medida para o trabalho"
description: "O Deep Work Plan v4 faz o formato do plano seguir o trabalho, e não o contrário — um plano Lite agora é uma proposta completa e executável para tarefas delimitadas, e a etapa separada de rascunho desaparece."
date: 2026-09-11
version: "v4 · Planos Lite-first"
kind: release
lang: pt
order: 2
featured: false
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Hoje lançamos o Deep Work Plan v4. Este lançamento é sobre agilidade e versatilidade: a mesma metodologia deve parecer leve para uma correção pontual e, ainda assim, sustentar um trabalho que se estende por horas ou dias, sem exigir que o desenvolvedor escolha o formato "sério" apenas para obter portas de validação de verdade.

Criar um plano para trabalho delimitado não significa mais escrever um rascunho descartável para revisão e depois um plano final separado. O `create` agora materializa diretamente um **plano Lite**: uma proposta compacta e totalmente executável, com registros de tarefas em linha, cada um com seus próprios critérios de aceitação, porta de validação e registro de conclusão. Não existe mais a etapa intermediária `.dwp/drafts/` — o rascunho e o plano são o mesmo artefato, revisável e executável desde o momento em que é escrito.

Os planos completos com arquivos de tarefa continuam exatamente onde pertencem: trabalhos mais longos e de maior risco continuam recebendo um arquivo por tarefa, um registro de análise dedicado e a mesma camada de estado retomável. Um plano Lite pode ser promovido a Full a qualquer momento em que um requisito ou uma porta de validação já não caiba em um registro compacto, e a representação escolhida como ponto de partida segue sinais explícitos e registrados — número de tarefas, superfície afetada, risco, reversibilidade — nunca um palpite.

Este lançamento segue o padrão DWP `2.4.0`. Leia a [especificação normativa](https://deepworkplan.com/spec), explore o [kit](https://deepworkplan.com/kit/), ou comece a adoção a partir de [`/init`](https://deepworkplan.com/init).
