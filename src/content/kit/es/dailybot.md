---
title: Dailybot
description: "Un addon opcional que conecta un repo AI-first con un equipo de Dailybot: reportes de avance e hitos de mejor esfuerzo en la ejecución del plan, más un refuerzo autónomo opcional mediante hooks."
kind: addon
lang: es
order: 2
---

# Addon de Dailybot

Lleva el avance de Deep Work Plan a un equipo de Dailybot. Un addon opcional para equipos que ya usan Dailybot.

## Qué agrega

- Una instalación opcional de la skill de agente de Dailybot (actualmente 1.7.x, que además añade chat de equipo en Slack, Microsoft Teams, Discord y Google Chat) o de la CLI de Dailybot, a través de sus propios flujos de consentimiento.
- Un reporte de avance/hito de mejor esfuerzo conectado a la ejecución del plan, para que una finalización de plan llegue al equipo.
- Un refuerzo determinístico opcional mediante hooks (skill de agente de Dailybot 1.6.0+, CLI 1.12.0+): hooks del harness commiteados que detectan trabajo sin reportar desde un registro local y se lo recuerdan al agente al final del turno, para que el reporte siga siendo autónomo incluso en sesiones largas sin supervisión, donde las instrucciones del prompt se diluyen.

## Comportamiento

Este addon **delega** — no reinventa. La skill de agente de Dailybot es dueña de la instalación, el consentimiento, la autenticación, las plantillas de hooks y el estilo de redacción; este addon solo ofrece instalarla, conecta el paso de reporte opcional y ofrece la configuración de hooks a nivel de repo. El reporte es estrictamente de mejor esfuerzo y nunca bloquea el trabajo si Dailybot está ausente, sin autenticar o inalcanzable.

Las dos capas se componen sin duplicar reportes: un reporte de ciclo de vida exitoso reinicia el registro de los hooks, de modo que los hooks guardan silencio después de un reporte y actúan solo como respaldo determinístico cuando un evento del ciclo de vida se pasó por alto. Los comandos de hooks solo leen estado local y siempre terminan con código cero, así que tampoco pueden bloquear el trabajo.

## Notas

La metodología central de Deep Work Plan tiene **cero** dependencia de Dailybot. Ofrécelo solo cuando el desarrollador o el equipo ya usan Dailybot; nunca lo instales automáticamente para todos.
