---
title: "Especificação do Deep Work Plan"
description: "A especificação legível da metodologia Deep Work Plan: o formato DWP, o protocolo de agente, os arquétipos, o padrão de documentação e o mecanismo de addons."
lastUpdated: 2026-05-30
---

## Especificação do Deep Work Plan

A especificação é a definição precisa e legível da metodologia — as estruturas e os protocolos que humanos e agentes compartilham. Ela declara, em termos normativos da RFC 2119, como um plano orientado a especificação é estruturado e como um agente deve executar contra ele: o plano é a fonte de verdade, os validation gates são binários e o próprio repositório carrega o harness de que um agente precisa. Ela está organizada em documentos ordenados:

- **Padrão de documentação** — a estrutura do repositório AI-first.
- **Especificação do DWP** (v1.2) — estrutura do plano, anatomia da tarefa, o loop de execução, a seção Delta para alterações em brownfield, o Protocolo de Retomada do DWP, tiers de rigor proporcional (micro/standard/deep) e a camada de estado do plano legível por máquina.
- **Protocolo do agente** (v1.2) — comportamento obrigatório entre agentes, mapeamento de comandos, agentes suportados (incluindo OpenClaw e Hermes) e perfis de execução (interativo vs. não supervisionado) com condições de parada e continuação agendada.
- **Arquétipos** (v1.1) — repositórios individuais, hubs orquestradores e o espaço de trabalho de agente (o lar de longa duração de um agente autônomo: workspace do OpenClaw, diretório de serviço do Hermes, volume de agente em nuvem); a heurística de classificação e como o onboarding difere.
- **Addons** — o mecanismo opcional para adicionar capacidades opcionais, incluindo a sub-skill author (para que um repositório faça crescer seu próprio kit), addons de manutenção como dependency-upgrade e o addon design-system (um `docs/DESIGN.md` derivado da fonte real de design do repositório, com perfis para UI visual, saída de CLI e superfícies conversacionais).
- **Conformidade** — a definição normativa de um repositório AI-first: os artefatos que um repositório DEVE e DEVERIA ter, o que torna um plano bem formado e como verificá-lo objetivamente com `/dwp-verify`.
- **Estado do plano** — a camada de estado legível por máquina: `manifest.json` e `state.json`, registros de gates, registros de resultado como memória episódica, reconciliação (o markdown prevalece) e quando a camada é obrigatória.

- [Leia a especificação](/spec)
- [Leia a metodologia](/methodology)
