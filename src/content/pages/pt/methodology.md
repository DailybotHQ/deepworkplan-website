---
title: "A Metodologia Deep Work Plan"
description: "Cinco capítulos do manifesto aos arquétipos: os princípios, o loop central, os templates, as skills e as adaptações por trás da metodologia Deep Work Plan."
lastUpdated: 2026-05-30
---

## A Metodologia Deep Work Plan

O Deep Work Plan (DWP) é uma metodologia aberta e independente de framework para executar trabalho de engenharia estruturado e autônomo com agentes de código de IA. Ele transforma um objetivo vago em um plano revisável que um agente pode executar, pausar, retomar e relatar — sem perder o contexto.

O DWP se apoia em dois pilares.

**Desenvolvimento orientado a especificação.** Em vez de tratar uma transcrição de chat como a fonte de verdade, você primeiro escreve *o que* deve ser verdadeiro — objetivo, escopo, critérios de aceitação e as verificações que provam que está concluído — e o agente executa contra essa especificação. No DWP, o plano *é* a especificação: plano → tarefas atômicas → validation gates → conclusão. Escrever a especificação primeiro reduz a deriva (o agente é medido contra critérios declarados), torna o trabalho verificável (cada gate aprova ou reprova) e o torna retomável (a especificação sobrevive a qualquer sessão ou agente). Independente de ferramenta e nativo do repositório, ele difere de sistemas orientados a especificação atrelados a ferramentas, como GitHub Spec Kit, Amazon Kiro e Tessl.

**Engenharia de harness — o repositório se torna o harness.** Um modelo de linguagem sozinho é apenas um preditor de texto; o que o torna um engenheiro confiável é o *harness* ao seu redor — contexto, ferramentas, um loop de controle, salvaguardas e estado persistente. A engenharia de harness é projetar esse andaime deliberadamente. A posição do DWP é que ele deve viver no repositório, não em uma ferramenta: o contexto como `AGENTS.md` + `docs/`, as ferramentas como o kit `.agents/`, o loop de controle como o plano, as salvaguardas como os validation gates e o estado como o `.dwp/` ignorado pelo git. Como cada parte é um arquivo no repositório, o harness é portátil — de modo que qualquer agente pode pilotar qualquer repositório.

A metodologia é explicada em cinco capítulos:

1. **Manifesto** — o que é um Deep Work Plan e por que a execução estruturada importa.
2. **Loop central** — o ciclo de planejar-executar-verificar que conduz cada tarefa.
3. **Templates** — as estruturas de plano e de tarefa que agentes e humanos compartilham.
4. **Skills e agents** — como os commands e os papéis de agent se encaixam, o kit vivo (como um repositório faz crescer suas próprias skills via a sub-skill author) e os addons opcionais como dependency-upgrade e o addon design-system para qualquer superfície de interface voltada ao usuário (UI visual, saída de CLI ou conversacional).
5. **Arquétipos** — adaptar a metodologia a repositórios individuais e a hubs orquestradores.

- [Leia a metodologia](/methodology)
- [Leia a especificação](/spec)
- [Explore o kit](/kit)
