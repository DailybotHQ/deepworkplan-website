---
title: "DWP v8: spec-first, con el ciclo cerrado"
description: "Deep Work Plan v8 reúne planes spec-first, el repositorio como harness, Loop engineering y eficiencia medida; el ciclo completa los planes aprobados."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: es
order: 0
featured: true
sourceLabel: "Versiones etiquetadas y borrador del contrato v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 reúne cuatro ideas: desarrollo spec-first, el repositorio como harness del agente, Loop engineering y eficiencia medida. La frase de trabajo es: «Spec-first, con el ciclo cerrado: el repositorio es el harness y el plan se ejecuta solo hasta terminar».

## Los cuatro pilares

1. **Spec-first:** plan y especificación como fuente duradera de verdad, con aceptación y validación explícitas. 2. **El repositorio es el harness:** contexto, herramientas, control y estado reanudable viven junto al código. 3. **Loop engineering:** un plan aprobado avanza por su ciclo registrado hasta terminar. 4. **Eficiencia medida:** bytes de instrucciones por flujo y una ruta pública de medición; sin porcentajes de tokens inferidos.

## Qué significa Loop engineering

El plan registra un líder y sucesores en orden. Un humano inicia el daemon opcional de Herdr con herdr-peers autopilot --loop; sus avisos piden continuar sin conceder autoridad nueva. Si el líder falta, un sucesor listado puede asumir. Los eventos pueden llegar al notificador Dailybot del paquete, y la vista de flota muestra agentes y planes en las máquinas habilitadas. El humano inicia el daemon; Herdr es opcional.

## Versiones que incluyen la maquinaria

El endurecimiento del paquete v7.11.0 y el registro de planes y notificaciones de v7.12.x aportan la maquinaria del plan. herdr-peers v1.3.x añade ciclo, informes y vista de flota; v2.0.0 añade el brain del protocolo 2 y el consumidor de la cola. coding-agents-kit v1.3.0 aporta el contrato pick-v2 y v1.4.0 el actualizador verificado. Versiones etiquetadas arriba; los addons son opcionales.

## Contrato v8 — RE-VERIFY AT 8.0.0

El borrador origin/feat/v8-line añade autonomy a plan-contract/v8: presupuesto de estancamiento, paneles notificables, destinos de aviso, permiso de acción del brain y comportamiento de cola. También define dwp-queue-v1 para .dwp/queue.json; el paquete escribe la cola y Herdr la consume. Claims provisionales: confirmar con artefactos etiquetados de 8.0.0 antes de publicar.
