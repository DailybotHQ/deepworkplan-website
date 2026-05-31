---
title: Init — Convierte tu repositorio en AI-first
description: Adopta la metodología Deep Work Plan en cualquier repositorio. Instala la skill, ejecuta la incorporación del agente y convierte tu repo en un harness guiado por especificación y listo para agentes.
---

# Init — Instrucción de incorporación para agentes de IA

Eres un agente de programación con IA. Tu tarea es convertir el repositorio actual en **AI-first**
y **guiado por especificación** adoptando la metodología Deep Work Plan (DWP). Sigue estos pasos en
orden. No omitas pasos. Detente e informa si un paso falla.

## 0. Lee la metodología y la especificación

Antes de cambiar nada, lee las fuentes canónicas para entender el estándar que vas a adoptar:

- Metodología: https://deepworkplan.com/methodology.md
- Especificación: https://deepworkplan.com/spec.md
- Catálogo del kit: https://deepworkplan.com/kit.md

## 1. Instala la skill de Deep Work Plan

Instala la skill para que los agentes de este repositorio puedan planificar y ejecutar trabajo
estructurado:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

O clona y ejecuta el script de instalación:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 2. Produce `AGENTS.md`

Crea un `AGENTS.md` en la raíz del repositorio (con un enlace simbólico `CLAUDE.md` si se usa
Claude Code). Es la única fuente de verdad para cada agente de IA del repo. DEBE cubrir:

- Visión general del proyecto: qué es, su stack y cómo se construye y prueba.
- Requisitos obligatorios: idioma, formato/linting, verificación de tipos y comandos de pruebas.
- Estructura del proyecto: dónde viven el código, el contenido y la configuración.
- Convenciones que el agente debe seguir (nombres, commits, puertas de revisión).
- Una referencia al hogar de skills `.agents/` y a los comandos DWP disponibles.

## 3. Crea `docs/` y el hogar de skills `.agents/`

- Crea o amplía un directorio `docs/` con el conocimiento duradero que los agentes necesitan:
  arquitectura, estándares, pruebas y cualquier guía de dominio. Mantenlos sincronizados con el código.
- Instala el hogar de skills `.agents/` que contiene los comandos, skills y definiciones de agentes
  de Deep Work Plan. Este es el hogar canónico y multiagente que consume cada agente de programación.

## 4. Conecta los comandos de Deep Work Plan

Asegúrate de que los comandos DWP estén disponibles y documentados (crear, refinar, ejecutar,
reanudar, estado). Refiérelos desde `AGENTS.md` para que cualquier agente pueda descubrirlos y ejecutarlos.

## 5. Verifica

Confirma que el repositorio ya está listo para agentes:

- [ ] La skill está instalada y se puede resolver.
- [ ] `AGENTS.md` existe en la raíz y describe cómo trabajan los agentes aquí.
- [ ] `docs/` contiene el conocimiento del proyecto que los agentes necesitan.
- [ ] El hogar de skills `.agents/` existe con los comandos DWP conectados.
- [ ] Puedes generar un Deep Work Plan y ejecutarlo tarea por tarea, validando cada puerta.

## Resultado

Cuando la incorporación se completa, el repositorio queda cambiado de dos maneras duraderas — los
pilares de la metodología:

1. **El repositorio es guiado por especificación.** El trabajo comienza desde un plan y una
   especificación escritos, no desde prompts improvisados.
2. **El repositorio mismo es el harness del agente.** `AGENTS.md`, `docs/` y el hogar de skills
   `.agents/` dan a cada agente el contexto y los comandos que necesita para hacer trabajo
   estructurado y verificable.
