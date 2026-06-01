---
title: Complementos
description: "Las extensiones opcionales de la metodología DWP central: habilidades, agentes, presets, adaptadores y ejemplos, y cómo cada una amplía el flujo de trabajo sin ser obligatoria."
order: 5
lang: es
section: Addons
---

# Complementos

**Versión 1.0.** Los complementos son extensiones opcionales de la metodología DWP central. No son obligatorios para el cumplimiento, pero aportan capacidades adicionales.

## Habilidades

Las habilidades son procedimientos reutilizables que se invocan por nombre. Una habilidad empaqueta un flujo de trabajo repetible (ejecutar pruebas, corregir el linter, crear un componente).

La metodología incluye un pequeño conjunto de subhabilidades centrales. Entre ellas, la subhabilidad **author** (autor) permite que un repositorio **cree su propio kit**: invocada mediante `/skill-create` y `/agent-create`, razona sobre el esquema `.agents/` existente y sus convenciones, y luego crea una nueva habilidad, agente o comando delegador ligero que encaja con ellas, manteniendo el catálogo sincronizado. Esta misma subhabilidad ejecuta la tarea obligatoria de Descubrimiento de Habilidades y Agentes.

## Agentes

Los agentes son trabajadores especializados con un rol definido (revisor, ejecutor, arquitecto).

## Complementos de mantenimiento

Los complementos de mantenimiento son extensiones opcionales, nunca obligatorias para el cumplimiento, que ayudan a un repositorio a mantenerse a sí mismo. El complemento **dependency-upgrade** (actualización de dependencias) razona sobre el gestor de paquetes real del repositorio (en lugar de asumir npm) y actualiza las dependencias en lotes pequeños, validados y reversibles: detecta el gestor a partir del manifiesto y el lockfile reales, clasifica las actualizaciones por semver, actualiza en lotes, ejecuta el control de validación real del repositorio después de cada lote, revierte cualquier lote que falle y resume sin confirmar automáticamente. Un complemento se instala solo cuando se acepta durante la incorporación.

## Presets

Los presets adaptan DWP a una pila tecnológica específica (Django, React, Go).

## Adaptadores

Los adaptadores asignan los comandos de DWP al sistema de comandos de un agente concreto (Claude Code, Cursor, Codex).

## Ejemplos

Los ejemplos muestran DWP en la práctica (comparaciones de antes y después, planes de muestra, casos de estudio).
