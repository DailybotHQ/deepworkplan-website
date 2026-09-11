---
title: "DWP v1: de um ciclo de planos a um harness portátil"
description: "O Deep Work Plan evolui de um único ciclo de planos escritos para um kit de adoção portátil — confiança e proveniência, cobertura mais ampla de hosts de agentes e um verificador de conformidade que qualquer repositório pode executar."
date: 2026-06-12
version: "v1 · Fundação"
kind: foundation
lang: pt
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Até agora, o Deep Work Plan era um ciclo de criação de planos que um único agente seguia dentro de uma única sessão. Esta série de lançamentos o transforma em algo que um repositório pode adotar por conta própria — a primeira versão dedicada a ir além de um único agente e de uma única sessão.

O skill ganha uma declaração de confiança com proveniência verificada por checksum, para que um desenvolvedor veja exatamente o que ele lê e escreve antes de instalá-lo. Os presets de onboarding e os hosts de agentes suportados aumentam consideravelmente, a disciplina de testes passa a ser parte essencial de cada tarefa em vez de um complemento, e um verificador de conformidade permite comprovar — de forma objetiva, não por suposição — que um repositório atende ao padrão. Um protocolo de estado e retomada permite que um plano interrompido continue de onde parou, em vez de recomeçar do zero. Nos bastidores, a compatibilidade entre `.claude` e `.cursor` converge para um único diretório canônico `.agents`, de modo que todo agente suportado lê o mesmo kit.

Juntos, esses lançamentos estabelecem a base para o próximo estágio: o repositório deixa de ser apenas o lugar onde o plano é guardado e passa a ser o harness de trabalho do agente.

Veja o [histórico de lançamentos do skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) para a sequência completa.
