---
title: "Especificação do Deep Work Plan"
description: "A especificação legível da metodologia Deep Work Plan: o formato DWP, o protocolo de agente, os arquétipos, o padrão de documentação e o mecanismo de addons."
lastUpdated: 2026-09-28
---

## Especificação do Deep Work Plan

**Padrão atual: DWP 8.0.0 (release `v8.0.0`).** A base preservada inclui a camada de registros v6 e as extensões v7; novos planos usam `plan-contract/v8` por padrão. Planos v5, v6 e v7 existentes mantêm sua geração registrada e só migram por meio de um `refine migrate` explícito. O v8 mantém `plan-manifest/v7` e acrescenta `plan-contract/v8`, `journal-event/v8` e `plan-snapshot/v8`; os esquemas de manifesto e eventos de diário v7 continuam compatíveis com planos existentes. [Manifesto v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [contrato v8](https://deepworkplan.com/schema/plan-contract/v8.json), [evento de diário v8](https://deepworkplan.com/schema/journal-event/v8.json) e [snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

A especificação é a definição precisa e legível da metodologia — as estruturas e os protocolos que humanos e agentes compartilham. Ela declara, em termos normativos da RFC 2119, como um plano orientado a especificação é estruturado e como um agente deve executar contra ele: o plano é a fonte de verdade, os validation gates são binários e o próprio repositório carrega o harness de que um agente precisa. Ela está organizada em documentos ordenados:

- **Padrão de documentação** — a estrutura do repositório AI-first.
- **Camada de registro** — a camada de registro respaldada por evidências: contrato, diário, classes de evidência (afirmada vs observada), aprovação e recibos.
- **Recursos e habilidades** — execução delimitada: manifesto de contexto, envelope de recursos, capacidades do host e registro de addons.
- **Delegação** — execução multiagente e em enxame: worktrees paralelos seguros, eventos de delegação, transportes e sucessão de líderes.
- **Estado do plano** — camada de estado legível por máquina: snapshot derivado do diário na v6/v7 (`ledger.py project`), camada de estado legada da v5 e reconciliação.
- **Protocolo do agente** — comportamento obrigatório entre agentes, mapeamento de comandos, agentes suportados (incluindo OpenClaw e Hermes) e perfis de execução (interativo vs. não supervisionado) com condições de parada e continuação agendada.
- **Arquétipos** — repositórios individuais, hubs orquestradores e o espaço de trabalho de agente (o lar de longa duração de um agente autônomo: workspace do OpenClaw, diretório de serviço do Hermes, volume de agente em nuvem); a heurística de classificação e como o onboarding difere.
- **Addons** — o mecanismo opcional para adicionar capacidades opcionais, incluindo a sub-skill author (para que um repositório faça crescer seu próprio kit), addons de manutenção como dependency-upgrade e o addon design-system (um `docs/DESIGN.md` derivado da fonte real de design do repositório, com perfis para UI visual, saída de CLI e superfícies conversacionais).
- **Conformidade** — a definição normativa de um repositório AI-first: os artefatos que um repositório DEVE e DEVERIA ter, o que torna um plano bem formado e como verificá-lo objetivamente com `/dwp-verify`.
- **Estado do plano** — a camada de estado legível por máquina: `manifest.json` e `state.json`, registros de gates, registros de resultado como memória episódica, reconciliação (o markdown prevalece) e quando a camada é obrigatória.

- [Leia a especificação](/spec)
- [Leia a metodologia](/methodology)
