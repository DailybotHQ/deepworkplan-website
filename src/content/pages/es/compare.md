---
title: "Deep Work Plan comparado con las alternativas"
description: "Cómo se relaciona Deep Work Plan con herramientas guiadas por especificación, frameworks de agentes y modos de plan nativos, con fuentes y fecha de revisión."
lastUpdated: 2026-09-10
---

## Deep Work Plan y las alternativas

Elige Deep Work Plan cuando el trabajo de largo alcance con agentes deba seguir siendo duradero, portable y verificable. Esta guía responde las dudas que aparecen al comparar DWP con otras alternativas y aclara sus diferencias: DWP pone el harness, el plan, el estado y la evidencia en tu repositorio para que cualquier agente pueda continuar el trabajo.

## Cómo leer esta página

Tres valores describen cada capacidad. Indican dónde vive una capacidad en una herramienta, no qué tan buena es la herramienta.

- **Integrado**
- **Opcional o mediante extensión**
- **Fuera del alcance**

Última revisión: 2026-09-10

## Las alternativas, en sus propios términos

### Herramientas de desarrollo guiado por especificación

**GitHub Spec Kit** — Convierte una funcionalidad en una especificación ejecutable mediante una constitución, una especificación, un plan y una lista de tareas, impulsado por comandos de barra que se integran con más de cincuenta agentes de código. Equipos que quieren un flujo repetible de especificar, planificar, tareas e implementar dentro del agente que ya usan. [Sitio oficial](https://github.com/github/spec-kit)

**OpenSpec** — Captura cada cambio como una propuesta con especificaciones delta (añadidas, modificadas, eliminadas) y requisitos RFC 2119 con escenarios, y luego los archiva en especificaciones vivas. Equipos que trabajan sobre sistemas existentes y quieren que las especificaciones crezcan un cambio a la vez. [Sitio oficial](https://openspec.dev)

**Amazon Kiro** — Un IDE agéntico y una CLI cuyas especificaciones avanzan de requisitos de estilo EARS al diseño y a las tareas, con archivos steering y hooks que se ejecutan en eventos del editor. Desarrolladores que quieren el desarrollo guiado por especificación integrado en su editor con herramientas respaldadas por AWS. [Sitio oficial](https://kiro.dev)

### Frameworks de flujo de trabajo para agentes

**BMAD Method** — Un framework ágil de roles de agente especializados (análisis, producto, arquitectura, desarrollo, calidad) que produce briefs, requisitos, documentos de arquitectura y archivos de historias de usuario. Equipos a los que les gustan las ceremonias basadas en roles y quieren un ciclo ágil completo para el trabajo de agentes. [Sitio oficial](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Una biblioteca de skills y un flujo de trabajo para hacer lluvia de ideas, planificar en pasos pequeños de prueba primero, ejecutar con subagentes y revisar antes de completar. Desarrolladores que quieren una ejecución disciplinada guiada por pruebas dentro de su agente de código. [Sitio oficial](https://github.com/obra/superpowers)

**Get Shit Done** — Un sistema de planificación con un directorio .planning, ids de requisitos, planes por fases, ejecución con contexto fresco y un pase de verificación contra los requisitos imprescindibles declarados. Desarrolladores en solitario y equipos pequeños que quieren ingeniería de contexto y verificación con poca ceremonia. [Sitio oficial](https://github.com/open-gsd/gsd-core)

### Modos de plan nativos del proveedor

**Modos de plan nativos del proveedor** — Claude Code, Codex, Cursor y Gemini CLI incluyen modos de plan, archivos de instrucciones y skills que siguen los estándares AGENTS.md y Agent Skills. Cualquiera que quiera planificación dentro de un solo agente sin adoptar una metodología. [Sitio oficial](https://agents.md)

## Matriz de capacidades

Dónde vive cada capacidad, por herramienta. Integrado, opcional o mediante extensión, o fuera del alcance. Revisado contra la documentación oficial.

| Capacidad | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Modos de plan nativos del proveedor |
|---|---|---|---|---|---|---|---|---|
| Funciona con cualquier agente de código | Integrado | Integrado | Integrado | Fuera del alcance | Integrado | Integrado | Integrado | Fuera del alcance |
| Escribe el harness del agente en el repositorio | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance | Opcional o mediante extensión | Opcional o mediante extensión |
| Criterios de aceptación por tarea | Integrado | Opcional o mediante extensión | Integrado | Integrado | Integrado | Integrado | Integrado | Opcional o mediante extensión |
| Puerta de validación por tarea | Integrado | Opcional o mediante extensión | Fuera del alcance | Opcional o mediante extensión | Opcional o mediante extensión | Integrado | Opcional o mediante extensión | Opcional o mediante extensión |
| Estado reanudable en disco | Integrado | Integrado | Integrado | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Integrado | Opcional o mediante extensión |
| Revisión de cierre obligatoria con pase de seguridad | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión |
| Comprobador de conformidad ejecutable | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance | Fuera del alcance | Fuera del alcance | Opcional o mediante extensión |
| Medición publicada de la carga de instrucciones | Integrado | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance |
| Incorporación que genera la documentación | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance | Integrado | Opcional o mediante extensión |
| Especificaciones vivas para sistemas existentes | Fuera del alcance | Opcional o mediante extensión | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance | Opcional o mediante extensión | Fuera del alcance |

## Qué aporta Deep Work Plan

- **Agnóstico de la herramienta y nativo del repositorio.** El harness y el plan son archivos en tu repositorio, legibles por cualquier agente que siga los estándares AGENTS.md y Agent Skills. Cambiar de agente no pierde el plan.
- **Validación seleccionada de lo que cada tarea tocó.** Cada tarea declara su superficie tocada y ejecuta las pruebas del comportamiento cambiado y de sus consumidores, ampliando a la suite completa cuando el impacto no puede acotarse. Cero pruebas seleccionadas nunca cuenta como un pase.
- **Un Final Review con pase de seguridad.** Un plan se cierra con una revisión de seguridad del conjunto acumulado de cambios, incluida una revisión local obligatoria del diff, y una validación del estado final. Los hallazgos críticos bloquean la finalización.
- **Estado que sobrevive a sesiones y agentes.** Las casillas del README, los registros de tareas, un índice de trabajo acotado y un archivo de estado legible por máquina se escriben en cada límite, de modo que otra sesión u otro agente continúa desde el disco. Incluso una creación de plan interrumpida es recuperable.
- **Un comprobador de conformidad para el propio repositorio.** Un script de solo lectura verifica el harness y cada plan contra la especificación, entiende ambos ciclos de vida del plan y termina con un código apto para CI.
- **Carga de instrucciones medida y publicada.** Un script versionado mide cuántos bytes carga cada flujo; los resultados, incluidos los aumentos, se publican como bytes, nunca como porcentajes de tokens o de costo.

## Límites honestos

Deep Work Plan sigue un enfoque guiado por especificación: cada plan define el cambio mediante alcance, criterios de aceptación, puertas de validación y evidencias. Actualmente no mantiene una especificación canónica, viva o basada en deltas, sobre el comportamiento de cada sistema adoptado; OpenSpec es más fuerte cuando esa evolución a nivel de sistema es la necesidad principal. Las capas se pueden combinar alimentando un plan de DWP con una especificación o una propuesta delta. Todavía no existe un benchmark independiente de la metodología; está planificada una evaluación pública preregistrada. El registro de carga de instrucciones mide bytes cargados, no tokens, costo ni resultados.

## Ayúdanos a mantener esto preciso

Esta página se revisa en la fecha indicada y se corrige a petición. Si la descripción de tu herramienta está desactualizada o incompleta, abre un issue y lo corregiremos.

[Abrir un issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Fuentes

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Modos de plan nativos del proveedor — https://agentskills.io
