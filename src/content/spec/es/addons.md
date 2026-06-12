---
title: Complementos
description: "Extensiones opcionales de la metodología DWP central: habilidades, agentes, presets, adaptadores y ejemplos, y cómo amplían el flujo sin ser obligatorias."
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

## Complemento de sistema de diseño

El complemento **design-system** (sistema de diseño) es una extensión opcional con alcance de superficie de interfaz que da a un repositorio un `DESIGN.md` — un archivo Markdown de sistema de diseño que cualquier agente de codificación lee para generar salida de interfaz coherente con las convenciones propias del repositorio. Cubre tres **perfiles**, detectados de forma independiente a partir de archivos reales y apilados en el mismo y único archivo: **visual-ui** (UI web/móvil/escritorio renderizada), **cli-output** (salida de terminal con estilo: colores semánticos, componentes de salida como paneles y spinners, convenciones de maquetación, degradación TTY/`NO_COLOR`) y **conversational** (el producto habla por chat o correo: voz y registro, anatomía del mensaje, renderizado por plataforma con alternativas en texto plano). Razona sobre la fuente de diseño real del repositorio (propiedades personalizadas de CSS, una configuración de Tailwind, archivos de tokens, estilos de componentes — o un módulo de presentación de CLI, o helpers de composición de mensajes) en lugar de copiar el archivo de una marca, y valida la integridad de cada perfil: contraste WCAG AA para los pares de texto visuales, el color nunca como único portador de significado en la salida de terminal, alternativas en texto plano para los mensajes ricos y referencias de tokens que se resuelven. Reconcilia un `DESIGN.md` existente en lugar de arrasarlo.

El archivo vive en `docs/DESIGN.md`, junto a las demás especificaciones del repositorio, y se referencia desde `AGENTS.md` para que los agentes lo descubran de la misma forma que descubren el resto de la documentación (la raíz del repositorio se usa solo cuando no existe un árbol `docs/`). El descubrimiento es por referencia, no por ubicación física. La fuerza varía por perfil: **visual-ui está activado por defecto cuando se detecta** — cuando hay una superficie de UI visual presente, la incorporación lo aplica en modo de confianza y lo recomienda con fuerza en modo guiado — mientras que **cli-output y conversational se recomiendan cuando se detectan y siempre se preguntan, nunca se aplican automáticamente**. El complemento nunca se ofrece para un repositorio sin ninguna superficie de interfaz (una biblioteca pura, un servicio headless, un repositorio solo de infraestructura), y un repositorio con cero complementos sigue siendo plenamente conforme. Un `DESIGN.md` creado antes de que existieran los perfiles es un archivo visual de perfil único válido — sin migración.

Este archivo de sistema de diseño a nivel de repositorio es distinto de un documento de diseño técnico por funcionalidad (el `design.md` de "requisitos → diseño → tareas" de los flujos de spec-driven atados a una herramienta). DWP no incluye un arquetipo separado de documento de diseño por funcionalidad: el README de un plan, los criterios de aceptación de cada tarea y las puertas de validación ya cubren ese rol. El complemento llena el único hueco que ese rol no cubre: contexto de diseño de interfaz duradero y nativo del repositorio.

## Presets

Los presets adaptan DWP a una pila tecnológica específica (Django, React, Go).

## Adaptadores

Los adaptadores asignan los comandos de DWP al sistema de comandos de un agente concreto (Claude Code, Cursor, Codex).

## Ejemplos

Los ejemplos muestran DWP en la práctica (comparaciones de antes y después, planes de muestra, casos de estudio).
