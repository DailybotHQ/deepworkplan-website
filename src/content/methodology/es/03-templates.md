---
title: Plantillas de plan y tarea
description: "La estructura de los archivos de plan y de tarea, las dos tareas finales obligatorias de todo plan y las convenciones de README y PROGRESS que lo mantienen legible."
order: 3
lang: es
summary: Cómo se estructuran los planes y las tareas en disco, y las convenciones que los mantienen legibles.
icon: document
---

# Plantillas de plan y tarea

Un Deep Work Plan es un directorio de archivos Markdown. La forma de ese directorio, y de cada archivo que contiene, es lo que hace que un plan sea revisable tanto por personas como por agentes.

## Estructura del plan

Un plan es un directorio bajo `.dwp/plans/` llamado `PLAN_<slug>/`. Contiene:

- `README.md`: el resumen del plan: objetivo, material de origen, tabla de tareas y estado.
- Un archivo por tarea, con el nombre `<n>.task_<slug>.md`.
- `PROGRESS.md`: un registro continuo de la ejecución.

## Estructura del archivo de tarea

Cada archivo de tarea se llama `<n>.task_<slug>.md` y sigue la anatomía de nueve secciones: Objetivo, Contexto, Pasos, Criterios de aceptación, Validación, Archivos, Dependencias, Riesgos y Finalización y registro. Las secciones aparecen siempre en ese orden para que cualquier lector sepa dónde mirar.

## Las dos tareas finales obligatorias

Todo plan debe terminar con dos tareas estándar. Aseguran que se capture el conocimiento y que se informe a las partes interesadas:

1. **Descubrimiento de habilidades y agentes**: identificar las habilidades y agentes reutilizables creados durante el plan, para que el trabajo se acumule más allá de este esfuerzo puntual.
2. **Informe ejecutivo**: un resumen conciso de los resultados, escrito para las partes interesadas, que distingue lo entregado de lo que queda pendiente.

## Convenciones de README y PROGRESS

El `README.md` del plan debe contener un título (`# Deep Work Plan: <nombre>`), una declaración del objetivo en prosa, una sección opcional de material de origen, una tabla de tareas (número, nombre de la tarea, casilla de estado) y una línea de estado del plan con la forma `<n>/<total> tareas completadas`.

`PROGRESS.md` es un registro de ejecución de solo adición. Cada entrada registra una marca de tiempo en formato ISO 8601, el número y nombre de la tarea, qué se hizo y cualquier desviación o motivo de omisión. Como solo crece, es un historial fiable de cómo se desarrolló realmente el plan.

## Encabezados y referencias cruzadas

Todos los encabezados usan mayúscula inicial al estilo de oración, y los documentos evitan el lenguaje publicitario y los signos de exclamación. Estas convenciones mantienen los planes coherentes entre agentes y a lo largo del tiempo.
