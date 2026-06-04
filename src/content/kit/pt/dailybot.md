---
title: Dailybot
description: "Um addon opcional que conecta um repositório AI-first a uma equipe Dailybot, integrando um relatório de progresso e marcos, em modo best-effort, à execução do plano."
kind: addon
lang: pt
order: 2
---

# Addon Dailybot

Exibe o progresso do Deep Work Plan para uma equipe Dailybot. Um addon opcional para equipes que já usam a Dailybot.

## O que ele adiciona

- Uma instalação opcional da skill de agente da Dailybot e/ou da CLI da Dailybot, por meio de seus próprios fluxos de consentimento.
- Um relatório de progresso/marcos em modo best-effort integrado à execução do plano, de modo que a conclusão de um plano seja exibida para a equipe.

## Comportamento

Este addon **delega** — ele não reinventa. A skill de agente da Dailybot é responsável pela instalação, pelo consentimento, pela autenticação e pelo estilo de escrita; este addon apenas se oferece para instalá-la e integra o passo de relatório opcional. O relatório é estritamente best-effort e nunca bloqueia o trabalho se a Dailybot estiver ausente, não autenticada ou inacessível.

## Notas

A metodologia Deep Work Plan central tem **zero** dependência da Dailybot. Ofereça-o apenas quando o desenvolvedor ou a equipe já usar a Dailybot; nunca instale automaticamente para todos.
