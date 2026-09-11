---
title: "Deep Work Plan comparado con las alternativas"
description: "Cómo se relaciona Deep Work Plan con herramientas guiadas por especificación, frameworks de agentes y modos de plan nativos, con fuentes y fecha de revisión."
lastUpdated: 2026-09-11
---

## Deep Work Plan y las alternativas

Elige Deep Work Plan cuando el trabajo de largo alcance con agentes deba seguir siendo duradero, portable y verificable. Esta guía responde las dudas que aparecen al comparar DWP con otras alternativas y aclara sus diferencias: DWP pone el harness, el plan, el estado y la evidencia en tu repositorio para que cualquier agente pueda continuar el trabajo.

## Cómo leer esta página

Tres valores describen cada capacidad. Indican dónde vive una capacidad en una herramienta, no qué tan buena es la herramienta. Una aclaración importante: las skills y los planes de DWP son especificaciones de procedimientos y cambios; la fila de especificaciones vivas del producto pregunta si una herramienta mantiene una descripción canónica del comportamiento actual del producto y fusiona deltas en ella.

- **Integrado**
- **Opcional o mediante extensión**
- **Fuera del alcance**

Última revisión: 2026-09-11

## Las alternativas, en sus propios términos

### Herramientas de desarrollo guiado por especificación

**GitHub Spec Kit** — Convierte una funcionalidad en una especificación ejecutable mediante una constitución, una especificación, un plan y una lista de tareas, impulsado por comandos de barra que se integran con más de cincuenta agentes de código, y puede comprobar que los artefactos siguen siendo consistentes entre sí antes de empezar la implementación. Equipos que quieren un flujo repetible de especificar, planificar, tareas e implementar dentro del agente que ya usan. [Sitio oficial](https://github.com/github/spec-kit)

**OpenSpec** — Captura cada cambio como una propuesta con especificaciones delta (añadidas, modificadas, eliminadas) y requisitos RFC 2119 con escenarios, y luego los archiva en especificaciones vivas, con un validador que comprueba la completitud de la propuesta y la cobertura de los escenarios antes de aceptar un cambio. Equipos que trabajan sobre sistemas existentes y quieren que las especificaciones crezcan un cambio a la vez. [Sitio oficial](https://openspec.dev)

**Amazon Kiro** — Un IDE agéntico y una CLI cuyas especificaciones avanzan de requisitos de estilo EARS al diseño y a las tareas, con archivos steering y hooks que se ejecutan en eventos del editor, y que puede generar especificaciones de una base de código existente para detectar vacíos en los requisitos antes de empezar el diseño. Desarrolladores que quieren el desarrollo guiado por especificación integrado en su editor con herramientas respaldadas por AWS. [Sitio oficial](https://kiro.dev)

### Frameworks de flujo de trabajo para agentes

**BMAD Method** — Un framework ágil de roles de agente especializados (análisis, producto, arquitectura, desarrollo, calidad) que produce briefs, requisitos, documentos de arquitectura y archivos de historias de usuario, con una Definición de Terminado que exige que cada historia sea revisada por un compañero de equipo o un agente revisor de IA antes de darla por concluida. Equipos a los que les gustan las ceremonias basadas en roles y quieren un ciclo ágil completo para el trabajo de agentes. [Sitio oficial](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Una biblioteca de skills y un flujo de trabajo para hacer lluvia de ideas, planificar en pasos pequeños de prueba primero, ejecutar con subagentes y revisar antes de completar, integrada con más agentes de código anfitriones que cualquier otra alternativa de esta página, además de una revisión en dos etapas con subagentes (cumplimiento de la especificación y luego calidad del código) en cada tarea. Desarrolladores que quieren una ejecución disciplinada guiada por pruebas dentro de su agente de código. [Sitio oficial](https://github.com/obra/superpowers)

**GSD Core** — Un sistema de planificación con un directorio .planning, ids de requisitos, planes por fases, ejecución con contexto fresco y un pase de verificación contra los entregables observables por el usuario extraídos del resumen de cada plan, diseñado para combatir el deterioro del contexto ejecutando la investigación, la planificación y la ejecución en subagentes desechables, y detectando verificaciones obsoletas mediante huellas de contenido. Desarrolladores en solitario y equipos pequeños que quieren ingeniería de contexto y verificación con poca ceremonia. [Sitio oficial](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Configura los agentes de código que ya usas con memoria persistente que además enruta entre sesiones y modelos, skills curadas, servidores MCP, personas y Spec-Driven Development o Receipt-Driven Development opcionales. Su configuración se escribe por defecto en los ajustes globales del agente; la instalación limitada al workspace es opcional. Para desarrolladores que quieren un ecosistema de agentes configurado, capaz de recordar el trabajo entre sesiones y producir evidencias cuando se necesitan. [Sitio oficial](https://github.com/Gentleman-Programming/gentle-ai)

### SDLC nativo de IA

**SDLC nativo de IA de Claude** — Un ciclo de seis etapas, desde Planificar y Diseñar hasta Construir, Probar, Desplegar y Mantener, con aprobación humana obligatoria en cada etapa, artefactos duraderos confirmados en el repositorio entre etapas, un pase de revisión dedicado y etiquetado como seguridad antes de desplegar, y evaluaciones continuas que publican indicadores de entrega adelantados y rezagados. Equipos que evalúan el playbook de entrega de software de extremo a extremo de Claude Code y su ciclo de feedback en producción. [Sitio oficial](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Modos de plan nativos del proveedor

**Funciones nativas del agente (varían según el proveedor)** — Los productos de agentes pueden ofrecer modos de plan, archivos de instrucciones y skills construidos sobre los estándares abiertos y multiproveedor AGENTS.md y Agent Skills, aunque el comportamiento exacto del modo de plan sigue dependiendo del proveedor, el cliente y la versión. Agent Skills, en particular, carga solo un resumen breve al iniciar y las instrucciones completas al activarse, manteniendo fuera del contexto la capacidad que no se usa. Para quienes quieren planificar dentro de un solo agente y aceptan un comportamiento específico del proveedor. [Sitio oficial](https://agents.md)

## Matriz de capacidades

Dónde vive cada capacidad, por herramienta. Integrado, opcional o mediante extensión, o fuera del alcance. Revisado contra la documentación oficial.

| Capacidad | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | SDLC nativo de IA de Claude | Funciones nativas del agente (varían según el proveedor) |
|---|---|---|---|---|---|---|---|---|---|---|
| Funciona con cualquier agente de código | Integrado | Integrado | Integrado | Fuera del alcance | Integrado | Integrado | Integrado | Integrado | Fuera del alcance | Fuera del alcance |
| Escribe el harness del agente en el repositorio | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance | Opcional o mediante extensión | Opcional o mediante extensión | Integrado | Opcional o mediante extensión |
| Criterios de aceptación por tarea | Integrado | Opcional o mediante extensión | Integrado | Integrado | Integrado | Integrado | Integrado | Opcional o mediante extensión | Integrado | Opcional o mediante extensión |
| Puerta de validación por tarea | Integrado | Opcional o mediante extensión | Fuera del alcance | Opcional o mediante extensión | Opcional o mediante extensión | Integrado | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión |
| Estado reanudable en disco | Integrado | Integrado | Integrado | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Integrado | Integrado | Integrado | Opcional o mediante extensión |
| Revisión de cierre obligatoria con pase de seguridad | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Integrado | Opcional o mediante extensión |
| Comprobador de conformidad ejecutable | Integrado | Opcional o mediante extensión | Integrado | Opcional o mediante extensión | Fuera del alcance | Fuera del alcance | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión |
| Medición publicada de la carga de instrucciones | Integrado | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance |
| Incorporación que genera la documentación | Integrado | Integrado | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance | Integrado | Fuera del alcance | Integrado | Opcional o mediante extensión |
| Especificaciones vivas del producto | Fuera del alcance | Opcional o mediante extensión | Integrado | Integrado | Opcional o mediante extensión | Fuera del alcance | Opcional o mediante extensión | Opcional o mediante extensión | Opcional o mediante extensión | Fuera del alcance |
| Memoria persistente del agente entre proyectos | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Integrado | Fuera del alcance | Opcional o mediante extensión |
| Roles de agente especializados y diferenciados | Opcional o mediante extensión | Fuera del alcance | Fuera del alcance | Fuera del alcance | Integrado | Fuera del alcance | Fuera del alcance | Opcional o mediante extensión | Fuera del alcance | Fuera del alcance |
| Es en sí mismo un IDE o editor | Fuera del alcance | Fuera del alcance | Fuera del alcance | Integrado | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Fuera del alcance | Opcional o mediante extensión |

## Qué aporta Deep Work Plan

- **Agnóstico de la herramienta y nativo del repositorio.** El harness y el plan son archivos en tu repositorio, legibles por cualquier agente que siga los estándares AGENTS.md y Agent Skills. Cambiar de agente no pierde el plan.
- **Validación seleccionada de lo que cada tarea tocó.** Cada tarea declara su superficie tocada y ejecuta las pruebas del comportamiento cambiado y de sus consumidores, ampliando a la suite completa cuando el impacto no puede acotarse. Cero pruebas seleccionadas nunca cuenta como un pase.
- **Un Final Review con pase de seguridad.** Un plan se cierra con una revisión de seguridad del conjunto acumulado de cambios, incluida una revisión local obligatoria del diff, y una validación del estado final. Los hallazgos críticos bloquean la finalización.
- **Estado que sobrevive a sesiones y agentes.** Las casillas del README, los registros de tareas, un índice de trabajo acotado y un archivo de estado legible por máquina se escriben en cada límite, de modo que otra sesión u otro agente continúa desde el disco. Incluso una creación de plan interrumpida es recuperable.
- **Un comprobador de conformidad para el propio repositorio.** Un script de solo lectura verifica el harness y cada plan contra la especificación, entiende ambos ciclos de vida del plan y termina con un código apto para CI.
- **Carga de instrucciones medida y publicada.** Un script versionado mide cuántos bytes carga cada flujo; los resultados, incluidos los aumentos, se publican como bytes, nunca como porcentajes de tokens o de costo.

## Límites honestos

Una skill de DWP también es una especificación: describe cómo debe ejecutar un agente un procedimiento, como crear un componente. Los planes de DWP también son especificaciones de cambio: definen el alcance, los criterios de aceptación, las puertas de validación y las evidencias. Esta fila se refiere a algo más concreto: una especificación canónica que describe el comportamiento actual del producto y se actualiza con deltas después de cada cambio. Actualmente DWP no mantiene esa especificación viva a nivel de producto para cada sistema adoptado; OpenSpec es más fuerte cuando ese ciclo de vida es la necesidad principal. Las capas se pueden combinar alimentando un plan de DWP con una especificación del producto o una propuesta delta. Todavía no existe un benchmark independiente de la metodología; está planificada una evaluación pública preregistrada. El registro de carga de instrucciones mide bytes cargados, no tokens, costo ni resultados. DWP se limita deliberadamente al repositorio: no es un sistema de memoria entre proyectos, ni un framework de agentes basado en roles, ni un IDE, así que tampoco compite en esos frentes; combínalo con una herramienta que cubra ese frente cuando el trabajo lo requiera.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- SDLC nativo de IA de Claude — https://claude.com/blog/the-ai-native-sdlc-playbook
- Funciones nativas del agente (varían según el proveedor) — https://agentskills.io
