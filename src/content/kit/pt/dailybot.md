---
title: Dailybot
description: "Um addon opcional que conecta um repositório AI-first a uma equipe Dailybot: relatórios best-effort de progresso e marcos na execução do plano, mais um reforço autônomo opcional via hooks."
kind: addon
lang: pt
order: 2
---

# Addon Dailybot

Exibe o progresso do Deep Work Plan para uma equipe Dailybot. Um addon opcional para equipes que já usam a Dailybot.

## O que ele adiciona

- Uma instalação opcional da skill de agente da Dailybot (atualmente 1.7.x, que também adiciona chat de equipe no Slack, Microsoft Teams, Discord e Google Chat) e/ou da CLI da Dailybot, por meio de seus próprios fluxos de consentimento.
- Um relatório de progresso/marcos em modo best-effort integrado à execução do plano, de modo que a conclusão de um plano seja exibida para a equipe.
- Um reforço determinístico opcional via hooks (skill de agente da Dailybot 1.6.0+, CLI 1.12.0+): hooks do harness commitados que detectam trabalho não reportado a partir de um registro local e lembram o agente ao fim do turno, para que o relatório continue autônomo mesmo em sessões longas sem supervisão, em que as instruções do prompt se diluem.

## Comportamento

Este addon **delega** — ele não reinventa. A skill de agente da Dailybot é responsável pela instalação, pelo consentimento, pela autenticação, pelos templates de hooks e pelo estilo de escrita; este addon apenas se oferece para instalá-la, integra o passo de relatório opcional e oferece a configuração de hooks no nível do repositório. O relatório é estritamente best-effort e nunca bloqueia o trabalho se a Dailybot estiver ausente, não autenticada ou inacessível.

As duas camadas se compõem sem duplicar relatórios: um relatório de ciclo de vida bem-sucedido redefine o registro dos hooks, de modo que os hooks ficam em silêncio após um relatório e atuam apenas como retaguarda determinística quando um evento do ciclo de vida foi perdido. Os comandos de hook leem apenas estado local e sempre saem com código zero, então também nunca podem bloquear o trabalho.

## Notas

A metodologia Deep Work Plan central tem **zero** dependência da Dailybot. Ofereça-o apenas quando o desenvolvedor ou a equipe já usar a Dailybot; nunca instale automaticamente para todos.
