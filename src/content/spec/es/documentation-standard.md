---
title: Estándar de documentación
description: "Estándar normativo de cómo los Deep Work Plans documentan estructura, tareas y avance: README, marcadores de estado y las dos tareas finales obligatorias."
order: 1
lang: es
section: Standard
---

# Estándar de documentación

**Versión 1.0.** Este estándar define cómo los Deep Work Plans documentan su estructura, tareas y avance. Se aplica a todo plan creado bajo la metodología DWP. Las palabras clave MUST (DEBE), SHOULD (DEBERÍA) y MAY (PUEDE) se usan según las define el RFC 2119.

## README del plan

Todo plan DEBE tener un `README.md` que contenga:

- **Título**: `# Deep Work Plan: <nombre>`.
- **Objetivo**: una declaración en prosa del propósito del plan.
- **Material de origen**: enlaces o rutas a las entradas canónicas (opcional).
- **Tareas**: una tabla Markdown con el número de tarea, el nombre y una casilla de estado.
- **Estado**: una línea con la forma `<n>/<total> tareas completadas`.

## Archivos de tarea

Cada archivo de tarea DEBE llamarse `<n>.task_<slug>.md` y contener la anatomía de nueve secciones.

## PROGRESS.md

`PROGRESS.md` es un registro de ejecución de solo adición. Cada entrada DEBE registrar:

- Una marca de tiempo en formato ISO 8601.
- El número y el nombre de la tarea.
- Qué se hizo.
- Cualquier desviación o motivo de omisión.

## Marcadores de estado

- `[ ]`: sin empezar.
- `[~]`: en curso.
- `[x]`: hecho.
- `[!]`: bloqueado.

## Encabezados

Todos los encabezados DEBEN usar mayúscula inicial al estilo de oración. Los documentos DEBERÍAN evitar el lenguaje publicitario y los signos de exclamación.

## Dos tareas finales obligatorias

Todo plan DEBE terminar con dos tareas estándar:

1. **Descubrimiento de habilidades y agentes**: identificar las habilidades y agentes reutilizables creados.
2. **Informe ejecutivo**: un resumen de los resultados para las partes interesadas.
