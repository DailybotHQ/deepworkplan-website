---
title: "DWP v3: eficiência de tokens desde a concepção"
description: "O Deep Work Plan v3 reconstrói o harness em torno do custo de contexto — divulgação progressiva, validação limitada ao que foi afetado e uma única revisão final obrigatória — ao mesmo tempo em que eleva o piso de confiança e conformidade."
date: 2026-09-10
version: "v3 · Eficiência de tokens"
kind: release
lang: pt
order: 2
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Hoje lançamos o Deep Work Plan v3. O contexto é o recurso mais escasso de um agente, e este lançamento trata isso como um problema de engenharia, não como uma promessa informal: o andaime é comprimido, nunca as instruções.

O `GUIDE.md` passa a ser um índice de roteamento em vez de um documento que cada agente lê por completo, de modo que um agente carrega apenas a orientação que uma determinada etapa realmente precisa. As portas de validação agora são selecionadas a partir da superfície afetada de cada tarefa, em vez de executar novamente toda a suíte a cada mudança, e criar um plano pode ir direto para o modo de confiança quando um desenvolvedor já sabe o que quer, pulando a revisão intermediária. Nada disso enfraquece as portas de validação: isso elimina leituras repetidas, carregamento redundante de contexto e trabalho de validação que não corresponde ao que realmente mudou.

Junto com o trabalho de eficiência, este lançamento eleva o piso de confiança. Uma única revisão final obrigatória substitui as três tarefas de encerramento que antes finalizavam um plano, a revisão local com AI Diff Reviewer passa a ser um componente obrigatório da base, e a conformidade agora parte de zero complementos opcionais — segurança e proveniência são requisitos, não um acabamento opcional. O `AGENTS.md` registra a proveniência do padrão DWP do repositório, e os planos legados mantêm sua forma registrada, com um caminho de migração explícito em vez de serem reescritos silenciosamente.

Este lançamento segue o padrão DWP `2.3.0`. A carga de instruções e o comportamento de repetição são medidos em um registro público de avaliação, nunca informados como uma porcentagem de economia inventada.

Leia a [arquitetura de eficiência de tokens](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) e seu [registro de avaliação](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), ou explore a [especificação normativa](https://deepworkplan.com/spec) e o [kit](https://deepworkplan.com/kit/).
