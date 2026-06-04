---
title: "Especificação do Deep Work Plan"
description: "A especificação legível da metodologia Deep Work Plan: o formato DWP, o protocolo de agente, os arquétipos, o padrão de documentação e o mecanismo de addons."
lastUpdated: 2026-05-30
---

## Especificação do Deep Work Plan

A especificação é a definição precisa e legível da metodologia — as estruturas e os protocolos que humanos e agentes compartilham. Ela declara, em termos normativos da RFC 2119, como um plano orientado a especificação é estruturado e como um agente deve executar contra ele: o plano é a fonte de verdade, os validation gates são binários e o próprio repositório carrega o harness de que um agente precisa. Ela está organizada em documentos ordenados:

- **Padrão de documentação** — a estrutura do repositório AI-first.
- **Especificação do DWP** — estrutura do plano, anatomia da tarefa e o loop de execução.
- **Protocolo do agente** — o comportamento obrigatório entre agentes e o mapeamento de comandos.
- **Arquétipos** — repositórios individuais versus hubs orquestradores.
- **Addons** — o mecanismo opcional para adicionar capacidades opcionais, incluindo a sub-skill author (para que um repositório faça crescer seu próprio kit) e addons de manutenção como dependency-upgrade.
- **Conformidade** — a definição normativa de um repositório AI-first: os artefatos que um repositório DEVE e DEVERIA ter, o que torna um plano bem formado e como verificá-lo objetivamente com `/dwp-verify`.

- [Leia a especificação](/spec)
- [Leia a metodologia](/methodology)
