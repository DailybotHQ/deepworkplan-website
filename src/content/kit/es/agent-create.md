---
title: agent-create
description: "Crea un agente en el repositorio actual — trabajador especializado con su gama de modelo y herramientas — vía la sub-skill author, con el catálogo sincronizado."
kind: command
lang: es
order: 8
usage: /agent-create
---

# agent-create

Crea un nuevo agente en el repositorio actual. Un delegador ligero a la sub-skill **author** de Deep Work Plan.

## Qué hace

`agent-create` enruta al flujo de creación de agentes de la sub-skill author. Un agente es una definición de trabajador especializado (rol, gama de modelo, herramientas, system prompt) que se despacha para una clase de tareas. Codifica "quién hace X" y vive en `.agents/agents/<name>.md`.

## Uso

```
/agent-create
```

## Comportamiento

1. Detecta la disposición `.agents/` del repo y sus convenciones locales.
2. Confirma un rol recurrente con necesidades distintas de modelo/herramientas; nómbralo en kebab-case.
3. Crea y rellena el agente (Rol, Entradas, Proceso, Salida, escalado).
4. Elige una gama de modelo justificada — light, standard o heavy — sin fijar IDs de modelo de proveedor.
5. Actualiza el catálogo `.agents/docs/` para que coincida.

## Notas

Para procedimientos usa `/skill-create`. Mantén las gamas de modelo abstractas y mapéalas en la configuración del repo.
