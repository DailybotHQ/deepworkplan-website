---
title: Habilidades y agentes
description: "La diferencia entre habilidades y agentes, la incorporación al repositorio basada en razonamiento y el directorio .agents con su convención de enlace simbólico .claude a .agents."
order: 4
lang: es
summary: Cómo encajan las habilidades reutilizables, los agentes especializados y la incorporación al repositorio.
icon: users
---

# Habilidades y agentes

DWP es agnóstico respecto al agente, pero espera dos bloques de construcción recurrentes (habilidades y agentes) y una forma deliberada de orientarse en un repositorio antes de empezar cualquier trabajo.

## Habilidades frente a agentes

Es fácil confundirlos, pero cumplen propósitos distintos:

- Las **habilidades** son procedimientos reutilizables que se invocan por nombre. Una habilidad empaqueta un flujo de trabajo repetible (ejecutar pruebas, corregir el linter, crear un componente) para que agentes y personas lo invoquen siempre de la misma manera.
- Los **agentes** son trabajadores especializados con un rol definido: revisor, ejecutor, arquitecto. Cada agente tiene una responsabilidad acotada y opera dentro de su ámbito.

Una regla útil: una habilidad es *cómo* hacer una tarea recurrente; un agente es *quién* se responsabiliza de una clase de trabajo.

## Incorporación al repositorio basada en razonamiento

Antes de crear o ejecutar un plan, un agente se incorpora al repositorio. La incorporación es **basada en razonamiento, no en scripts**: el agente lee la estructura, la documentación y la configuración del repositorio para construir un modelo mental, en lugar de ejecutar un script de configuración fijo.

Durante la incorporación, el agente identifica el arquetipo del repositorio (individual u orquestador), los comandos de compilación, prueba y linter, las convenciones existentes de estilo, estructura y nombrado, y las habilidades y agentes ya disponibles. Esta comprensión es lo que le permite planificar y ejecutar de una forma que encaja con el repositorio en lugar de luchar contra él.

## El directorio `.agents/` y el enlace simbólico `.claude → .agents`

DWP reúne todo lo que define el comportamiento de los agentes (habilidades, comandos, definiciones de agentes, documentación interna y ajustes) bajo un único directorio canónico, `.agents/`. El nombre indica que el contenido se comparte entre agentes en lugar de estar atado a una sola herramienta.

Por compatibilidad con herramientas que históricamente leían desde `.claude/`, esa ruta es un enlace simbólico a `.agents/`:

```bash
ls -la .claude
# .claude -> .agents
```

Cada ruta `.claude/...` se resuelve de forma transparente a su equivalente `.agents/...`, de modo que las herramientas antiguas siguen funcionando mientras el contenido nuevo referencia la ubicación canónica `.agents/`. Las habilidades y los agentes se editan a través de los archivos reales bajo `.agents/`, nunca a través del enlace simbólico.
