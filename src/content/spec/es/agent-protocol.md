---
title: Protocolo del agente
description: "El contrato normativo de comportamiento para agentes de IA con Deep Work Plans: incorporación, planificación, ejecución, refinamiento, reanudación, comunicación y seguridad."
order: 3
lang: es
section: Protocol
---

# Protocolo del agente

**Versión 1.0.** Este protocolo define cómo DEBE comportarse un agente de programación con IA cuando trabaja con Deep Work Plans. Las palabras clave MUST (DEBE), SHOULD (DEBERÍA) y MAY (PUEDE) siguen el RFC 2119.

## Incorporación

Antes de crear o ejecutar un plan, un agente DEBE incorporarse al repositorio. La incorporación es basada en razonamiento, no en scripts: el agente lee la estructura, la documentación y la configuración del repositorio para construir un modelo mental.

El agente DEBERÍA identificar:

- El arquetipo del repositorio (individual u orquestador).
- Los comandos de compilación, prueba y linter.
- Las convenciones existentes de estilo, estructura y nombrado.
- Las habilidades y agentes disponibles.

## Planificación

Al crear un plan, el agente DEBE:

- Descomponer el objetivo en tareas secuenciales y revisables.
- Escribir cada tarea con la anatomía de nueve secciones.
- Terminar con las dos tareas finales obligatorias.
- Formular preguntas aclaratorias cuando el objetivo es ambiguo.

## Ejecución

Durante la ejecución, el agente DEBE:

- Leer el plan completo antes de empezar.
- Ejecutar las tareas en orden salvo que las dependencias permitan otra cosa.
- Actualizar `PROGRESS.md` tras cada tarea.
- Marcar el estado de la tarea con exactitud.
- Detenerse y preguntar cuando esté bloqueado en lugar de adivinar.

## Refinamiento

Al refinar, el agente DEBE preservar el trabajo completado, actualizar la tabla de tareas y registrar qué cambió.

## Reanudación

Al reanudar, el agente DEBE reconstruir el estado a partir de `PROGRESS.md` y los archivos de tarea antes de continuar.

## Comunicación

Los agentes DEBERÍAN reportar de forma concisa. Los informes de estado DEBEN distinguir el trabajo completado, en curso y pendiente.

## Seguridad

Los agentes NO DEBEN registrar secretos, DEBEN mantener `.dwp/` ignorado por git y DEBERÍAN preguntar antes de operaciones destructivas.
