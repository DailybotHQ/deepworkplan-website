---
title: "A Metodologia Deep Work Plan"
description: "Oito capítulos, do manifesto ao loop engineering: princípios, loop central, modelos, skills, arquétipos, muitos agentes, enxames e o loop do Deep Work Plan."
lastUpdated: 2026-11-16
---

## A Metodologia Deep Work Plan

O pacote v8 cria novos planos com `plan-contract/v8` por padrão. Os planos existentes mantêm sua geração; a migração exige um `refine migrate` explícito.
O Deep Work Plan (DWP) é uma metodologia aberta e independente de framework para executar trabalho de engenharia estruturado e autônomo com agentes de código de IA. Ele transforma um objetivo vago em um plano revisável que um agente pode executar, pausar, retomar e relatar — sem perder o contexto.

O DWP se apoia em quatro pilares — especificação primeiro, o repositório é o harness, loop engineering e eficiência medida. Em uma frase: *Especificação primeiro, loop fechado: o repositório é o harness e o plano se executa sozinho até a conclusão.*

**Especificação primeiro.** Em vez de tratar uma transcrição de chat como a fonte de verdade, você primeiro escreve *o que* deve ser verdadeiro — objetivo, escopo, critérios de aceitação e as verificações que provam que está concluído — e o agente executa contra essa especificação. No DWP, o plano *é* a especificação: plano → tarefas atômicas → validation gates → conclusão. Escrever a especificação primeiro reduz a deriva (o agente é medido contra critérios declarados), torna o trabalho verificável (cada gate aprova ou reprova) e o torna retomável (a especificação sobrevive a qualquer sessão ou agente). Independente de ferramenta e nativo do repositório, ele difere de sistemas orientados a especificação atrelados a ferramentas, como GitHub Spec Kit, Amazon Kiro e Tessl.

**O repositório é o harness.** Um modelo de linguagem sozinho é apenas um preditor de texto; o que o torna um engenheiro confiável é o *harness* ao seu redor — contexto, ferramentas, um loop de controle, salvaguardas e estado persistente. A engenharia de harness é projetar esse andaime deliberadamente. A posição do DWP é que ele deve viver no repositório, não em uma ferramenta: o contexto como `AGENTS.md` + `docs/`, as ferramentas como o kit `.agents/`, o loop de controle como o plano, as salvaguardas como os validation gates e o estado como o `.dwp/` ignorado pelo git. Como cada parte é um arquivo no repositório, o harness é portátil — de modo que qualquer agente pode pilotar qualquer repositório.

**Loop engineering.** Uma especificação e um harness tornam o trabalho correto e portátil; o loop engineering faz com que ele termine. Com o addon opcional Herdr, um plano registra seu lead e, quando os nomeia, seus sucessores; um daemon que só uma pessoa inicia avisa um lead ocioso para continuar, pede ao primeiro sucessor disponível que assuma um lead que se foi e informa quando um plano trava, bloqueia ou é concluído. Um aviso não acrescenta autoridade — os gates e as escalações do plano continuam obrigatórios como antes. A metodologia funciona sem o loop; o loop apenas a amplifica.

**Eficiência medida.** O contexto é o recurso mais escasso que um agente de código tem, e uma metodologia que o desperdiça falha exatamente quando o trabalho se alonga. O DWP carrega as instruções de forma progressiva — cada guia é carregado quando seu gatilho dispara —, seleciona a validação a partir do que cada tarefa realmente toca e decide as skills de forma local por tarefa. Os bytes de instrução que cada fluxo exige são medidos e publicados; sem porcentagens de tokens inventadas.

A metodologia é explicada em oito capítulos:

1. **Manifesto** — o que é um Deep Work Plan e por que a execução estruturada importa.
2. **Loop central** — o ciclo de planejar-executar-verificar que conduz cada tarefa.
3. **Templates** — as estruturas de plano e de tarefa que agentes e humanos compartilham.
4. **Skills e agents** — como os commands e os papéis de agent se encaixam, o kit vivo (como um repositório faz crescer suas próprias skills via a sub-skill author) e os addons opcionais como dependency-upgrade e o addon design-system para qualquer superfície de interface voltada ao usuário (UI visual, saída de CLI ou conversacional).
5. **Arquétipos** — adaptar a metodologia a repositórios individuais e a hubs orquestradores.
6. **Executar muitos agentes** — um líder e suas frentes entre painéis, contêineres, máquinas e contas, com um branch e um release por repositório.
7. **Autonomia do enxame** — verificações de capacidade nos limites entre tarefas, pacotes de repasse, sucessão do líder com épocas e escalação só do crítico, para que um enxame sobreviva ao limite de uma conta ou à perda de um agente.
8. **Loop engineering** — registro do plano, o daemon iniciado por uma pessoa, avisos que não acrescentam autoridade, substituição pelos sucessores, eventos do plano, a fila de planos e o mapa da frota.

- [Leia a metodologia](/methodology)
- [Leia a especificação](/spec)
- [Explore o kit](/kit)
