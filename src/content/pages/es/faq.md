---
title: "Preguntas frecuentes — Deep Work Plan"
description: "Respuestas a las preguntas sobre Deep Work Plan: qué hace, cómo funcionan las puertas de validación y la reanudación, cómo se compara y cómo adoptarlo."
lastUpdated: 2026-09-10
---

## Preguntas frecuentes

Respuestas breves a lo que más se pregunta sobre Deep Work Plan, cada una con un enlace a la página que entra en más detalle.

## Qué es Deep Work Plan

### ¿Qué hace Deep Work Plan en concreto?

Deep Work Plan convierte un repositorio en un entorno estructurado donde un agente de código puede ejecutar trabajo largo de forma fiable. Se instala como una skill de agente, incorpora el repositorio una vez (un índice `AGENTS.md`, un árbol `docs/`, un kit `.agents/` de skills y comandos, un área de salida `.dwp/` ignorada por git) y, a partir de ahí, cualquier objetivo se convierte en un plan: tareas atómicas, cada una con criterios de aceptación y una puerta de validación, ejecutadas de una en una, con commit a medida que pasan y reanudables desde el disco por cualquier agente. El plan se cierra con un Final Review que audita la seguridad y valida el estado final. La metodología tiene licencia MIT y funciona con cualquier agente de código que lea un repositorio.

[Leer la metodología](https://deepworkplan.com/es/methodology)

### ¿Para quién es?

Desarrolladores y equipos que entregan trabajo real de varios pasos a agentes de código y quieren que se termine. Encaja cuando una tarea abarca más de una sesión, más de una familia de archivos o más de un agente; cuando un compañero debe poder continuar donde un agente se detuvo; o cuando «hecho» debe significar «validado», no «el agente lo dice». Una corrección de una línea no necesita un plan, y la metodología lo dice: su regla de rigor proporcional recomienda en su lugar un objetivo inline, criterios y una puerta.

[Inicio rápido](https://deepworkplan.com/es/quickstart)

### ¿Es una herramienta, un framework o una metodología?

Una metodología empaquetada como una skill instalable. No hay servidor, ni cuenta, ni formato propietario, ni runtime más allá del agente de código que ya usas. Lo que se instala son instrucciones que el agente lee, un pequeño conjunto de scripts de shell para la detección de contexto y la comprobación de conformidad, y las convenciones que tu repositorio adopta. Todo lo que el plan produce es Markdown y JSON en tu repositorio, legible sin ninguna herramienta.

[Leer la especificación](https://deepworkplan.com/es/spec)

### ¿Con qué agentes de código funciona?

Con cualquier agente que lea archivos del repositorio. La skill sigue el estándar abierto Agent Skills y la convención `AGENTS.md`, de modo que Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot y otros la reconocen a través de su carga normal de skills e instrucciones. La propia evaluación de la metodología muestra un plan iniciado por el agente de un proveedor y reanudado por el de otro, en ambas direcciones. La cobertura de instalación y la evidencia de comportamiento se listan por agente en la matriz de compatibilidad, y ambas nunca se confunden.

[Explorar el kit](https://deepworkplan.com/es/kit)

### ¿Qué se instala exactamente y dónde?

La skill del agente se instala donde tu agente carga las skills de usuario o de proyecto. Después, la incorporación adapta el propio repositorio: crea o concilia `AGENTS.md`, `docs/`, `.agents/` y el área `.dwp/` ignorada por git. La skill enseña el método al agente; el repositorio conserva el contexto, el kit y la evidencia del plan que necesitan los demás agentes para continuar.

[Ver el flujo de adopción](https://deepworkplan.com/es/init)

### ¿Deep Work Plan necesita Git?

Git se recomienda en los repositorios porque su historial forma parte de la superficie de recuperación y revisión, pero la metodología también puede ejecutarse en un workspace de agente sin un repositorio Git. En ese caso, la capa de estado legible por máquina, incluidos los puntos de control y registros de puertas en `state.json`, es obligatoria para que la recuperación no dependa del historial del chat.

[Leer sobre los arquetipos de repositorio](https://deepworkplan.com/es/spec/archetypes)

### ¿Cuál es la diferencia entre una skill, un plan y una especificación de producto?

Una skill describe cómo ejecuta un agente un procedimiento repetible. Un plan de DWP describe un cambio concreto mediante alcance, criterios de aceptación, puertas de validación y evidencias. Una especificación de producto describe el comportamiento actual del producto y evoluciona mediante deltas después de cada implementación; las skills y los planes también son especificaciones, pero describen procedimientos y cambios en lugar de mantener ese contrato canónico del producto.

[Leer la especificación](https://deepworkplan.com/es/spec/dwp-specification)

## Cómo se ejecuta un plan

### ¿Cómo lo uso?

Tres pasos. Primero, instala la skill Deep Work Plan en tu agente de código — la vía más rápida es `npx skills add DailybotHQ/deepworkplan-skill` (o clona el repositorio de la skill y ejecuta `./setup.sh`). Segundo, incorpora el repositorio una vez para que el agente adapte `AGENTS.md`, `docs/`, el kit `.agents/` y un área `.dwp/` ignorada por git a tu stack: apúntalo a https://deepworkplan.com/init.md, o ejecuta `/deepworkplan-onboard`. Tercero, planifica y ejecuta el trabajo con los comandos ligeros: `/dwp-create <goal>` construye un plan; `/dwp-execute` lo ejecuta tarea por tarea frente a cada puerta; `/dwp-refine` edita un borrador o un plan en curso; `/dwp-resume` continúa tras una interrupción; `/dwp-status` informa del progreso sin ejecutar; `/dwp-verify` produce un informe objetivo de conformidad. Los agentes que interceptan `/` suelen usar `#` en su lugar (por ejemplo `#dwp-execute`). El endpoint de adopción y el inicio rápido recorren el mismo camino con más detalle.

[Inicio rápido](https://deepworkplan.com/es/quickstart)

### ¿Cómo se implementan las puertas de validación? ¿Necesitan aprobación humana?

Son aserciones ejecutables que el propio agente ejecuta. La aprobación humana enmarca la ejecución: una persona aprueba el plan antes de la ejecución y revisa el diff final a la hora del pull request; la ejecución intermedia es autónoma. Cada tarea nombra comandos concretos, normalmente el propio control de calidad del repositorio, seleccionados de la superficie tocada de la tarea: las pruebas del comportamiento cambiado y de sus consumidores, ampliando a la suite completa cuando el cambio es compartido o no puede acotarse. Una tarea se marca como hecha solo cuando esos comandos terminan con éxito, y las tareas que cambian comportamiento deben ampliar las pruebas. Ante un fallo, la tarea se marca como bloqueada y el agente se detiene.

[El bucle principal](https://deepworkplan.com/es/methodology/02-core-loop)

### ¿Cómo evita el plan quedar obsoleto cuando la gente cambia el código entre ejecuciones?

En tres frentes. Las tareas se escriben como comportamiento, no como ediciones: un criterio de aceptación dice qué debe hacer el sistema, así que un archivo renombrado o una implementación sustituida no lo invalida. Cada puerta se vuelve a ejecutar contra el repositorio tal como está ahora, de modo que una suposición rota falla de forma ruidosa en la siguiente ejecución en lugar de derivar en silencio, y ese fallo es la señal para refinar. Y mantener la documentación sincronizada es parte del trabajo: una tarea que cambia comportamiento también actualiza la documentación y el kit orientado a agentes que la describen, dentro de su propia puerta. Cada ejecución debería dejar el repositorio más preparado para agentes de lo que lo encontró.

[El bucle principal](https://deepworkplan.com/es/methodology/02-core-loop)

### ¿Puedo cambiar el plan a mitad de ejecución sin perder el trabajo completado?

Sí; refinar un plan parcialmente ejecutado es un movimiento de primera clase. Las definiciones de tareas y el estado de ejecución se mantienen separados: el plan es una lista de verificación en disco más un pequeño archivo de estado, así que lo hecho queda registrado con independencia del texto de la tarea. Cuando una tarea resulta estar equivocada, el agente la marca como bloqueada y se detiene en lugar de forzar el paso. Entonces tú editas, reordenas, divides o descartas las tareas que no se han ejecutado, mientras las tareas completadas siguen completadas. La reanudación reconstruye el estado desde el disco y el repositorio real y vuelve a ejecutar las puertas que importan, así que nada de lo que cambió por debajo pasa desapercibido.

[El bucle principal](https://deepworkplan.com/es/methodology/02-core-loop)

### ¿Sigue comprobando el trabajo contra el plan, o el plan es solo algo del principio?

El plan es una comprobación continua. El agente trabaja una tarea pequeña cada vez y debe validar antes de continuar, así que puede desviarse un paso, no tres. Cada tarea lleva criterios de aceptación más los comandos exactos que los demuestran, y el progreso se escribe en el repositorio a medida que avanza, con un estado por tarea, de modo que la deriva se vuelve visible para ti, para la siguiente sesión y para el siguiente agente. Un plan no está terminado hasta que todo valida, incluido el Final Review. La advertencia honesta: la metodología no puede impedir que un agente escriba de entrada un criterio de aceptación débil; hace que la deriva sea ruidosa en lugar de silenciosa.

[El bucle principal](https://deepworkplan.com/es/methodology/02-core-loop)

### ¿El plan se genera una vez y se mantiene a mano, o evoluciona con el código?

Ninguna de las dos. Se genera una vez a partir de un objetivo y luego se mantiene como parte del trabajo. El plan deliberadamente no se reescribe a partir de los diffs de código, porque una especificación que persigue al código se convierte en un espejo rezagado, que es la deriva que la metodología existe para eliminar. Evoluciona a propósito: las puertas se vuelven a ejecutar contra el repositorio actual, una puerta que falla desencadena un refinamiento, y el agente realiza ese refinamiento durante la ejecución mientras tú apruebas por adelantado y revisas al final. La documentación y las pruebas evolucionan junto con el código por construcción, porque actualizarlas está dentro de la puerta de cada tarea.

[Leer la metodología](https://deepworkplan.com/es/methodology)

### ¿Qué pasa si la sesión muere a mitad de camino?

El progreso vive en el disco, no en el chat. Las casillas del README, el registro de cada tarea, un índice de trabajo acotado y un archivo de estado legible por máquina se actualizan en cada límite de tarea, y el archivo de estado registra un punto de control antes de cualquier pausa planificada. Una sesión nueva, o un agente distinto, lee ese índice compacto, lo concilia con el repositorio y el historial de git, y continúa en la primera tarea incompleta sin rehacer el trabajo terminado. Incluso una creación de plan interrumpida es recuperable: la identidad del plan y su lista de tareas prevista se escriben antes que cualquier archivo de tarea, así que un plan creado a medias puede completarse o descartarse en lugar de adivinarse.

[El bucle principal](https://deepworkplan.com/es/methodology/02-core-loop)

### ¿Qué es el Final Review?

La única tarea de cierre obligatoria de todo plan. En orden: un pase de seguridad sobre el conjunto completo de cambios acumulados del plan, incluida una revisión local obligatoria del diff por la skill AI Diff Reviewer, con hallazgos críticos que bloquean la finalización hasta que se corrigen o se aceptan explícitamente; la validación del estado final, es decir, las suites completas aplicables de pruebas, lint, comprobación de tipos y formato del repositorio sobre el código final; y una reconciliación de las decisiones de skills que registró cada tarea. El agente luego informa de entregables, evidencia y limitaciones, y ofrece un Reporte Ejecutivo una sola vez, generándolo solo si lo pides.

[La especificación](https://deepworkplan.com/es/spec/dwp-specification)

### ¿Qué ocurre cuando falla una puerta de validación?

La tarea queda registrada como bloqueada y el agente se detiene antes de declarar que está terminada. Puedes revisar la evidencia, corregir el código o refinar la tarea y después reanudarla; un comando fallido es una señal para resolver la discrepancia, no un permiso para debilitar la puerta.

[Leer el protocolo del agente](https://deepworkplan.com/es/spec/agent-protocol)

### ¿Puede un plan ejecutarse sin supervisión durante la noche o en CI?

Sí, siempre que el plan se haya aprobado de antemano, incluya la capa de estado necesaria y otorgue al agente una autoridad acotada. Una ejecución sin supervisión debe detenerse y registrar un bloqueo cuando la realidad diverge, falla una puerta fuera del alcance de reparación previsto o se necesita una aprobación o credencial nueva.

[Leer el protocolo sin supervisión](https://deepworkplan.com/es/spec/agent-protocol)

## Cómo se compara

### ¿En qué se diferencia de las herramientas guiadas por especificación como Spec Kit, OpenSpec o Kiro?

Resuelven problemas adyacentes. Las herramientas guiadas por especificación son excelentes para capturar qué debe cambiar: especificaciones, requisitos y propuestas de cambio con una forma repetible. Deep Work Plan trata de cómo un agente ejecuta durante horas sin derivar: el harness incorporado en el repositorio, puertas de validación por tarea seleccionadas de la superficie tocada, estado reanudable en disco, un Final Review obligatorio con pase de seguridad y un comprobador de conformidad para el propio repositorio. Ambas cosas pueden combinarse, con una especificación o propuesta de cambio alimentando un plan. El playbook de Claude sobre el SDLC nativo de IA plantea una idea relacionada con artefactos duraderos entre Planificar, Diseñar, Construir, Probar, Desplegar y Mantener; DWP cubre el harness del repositorio y el bucle de ejecución, mientras que la evaluación continua en producción sigue siendo una práctica complementaria. La página de comparación pone las capacidades una al lado de la otra, en los términos de cada herramienta.

[Ver la comparativa](https://deepworkplan.com/es/compare)

### ¿En qué se diferencia de herramientas de flujo de trabajo para agentes como BMAD, Superpowers, Get Shit Done o Gentle-AI?

Los frameworks de flujo de trabajo para agentes como BMAD, Superpowers y Get Shit Done aportan estilos de trabajo sólidos: roles, principios, pasos de prueba primero, hábitos de verificación. Gentle-AI pertenece a una categoría vecina como configurador del ecosistema de agentes: equipa los agentes de codificación que ya usas con memoria persistente entre sesiones (Engram), skills curadas, personas, servidores MCP, Spec-Driven Development opcional y revisión basada en evidencias opcional (Receipt-Driven Development), escribiendo en los directorios de configuración de cada agente. Deep Work Plan se diferencia de ambos: se centra en lo que permanece en el repositorio y en lo que puede comprobarse — un harness que cualquier agente lee sin contexto previo, archivos de tarea con criterios de aceptación y puertas, estado que sobrevive a una sesión, un comprobador de conformidad con un código de salida apto para CI y una medición publicada de cuántos bytes de instrucción carga cada flujo. Es agnóstico de la herramienta por construcción y no añade ningún servicio, proveedor ni secreto al bucle principal. Las capas pueden convivir: los frameworks y Gentle-AI dan forma a cómo trabaja el agente; Deep Work Plan hace que el trabajo largo sea duradero y comprobable dentro del repositorio. La página de comparación muestra dónde cada enfoque las tiene integradas, opcionales o fuera del alcance.

[Ver la comparativa](https://deepworkplan.com/es/compare)

### ¿Por qué no usar simplemente el modo de planificación integrado de mi agente?

Los modos de planificación integrados son útiles y Deep Work Plan se construye sobre el mismo sustrato, la convención `AGENTS.md` y el estándar abierto Agent Skills. La diferencia está en dónde vive el plan y qué lo hace cumplir. Los planes nativos suelen vivir fuera del repositorio y caducan con la sesión; Deep Work Plan escribe el plan, su estado y su evidencia en el repositorio, de modo que otro agente o un compañero puede continuar el plan, y cada tarea lleva una puerta ejecutable y un registro escrito. Tú sigues usando el modo de planificación de tu agente para pensar; la metodología añade el bucle de ejecución duradero y verificable.

[Ver la comparativa](https://deepworkplan.com/es/compare)

## Adoptarlo

### ¿Qué escribe la incorporación en mi repositorio y toca algún archivo existente?

La incorporación no es destructiva: detecta un `AGENTS.md`, `docs/`, `.agents/` o `CLAUDE.md` existente, reconcilia en lugar de sobrescribir y pregunta antes de reemplazar cualquier cosa. Escribe el índice `AGENTS.md` con comandos reales, un árbol `docs/` razonado, documentación por módulo, el kit `.agents/` con comandos ligeros `dwp-*`, un área de salida `.dwp/` ignorada por git, un mapa de pruebas verificado y la revisión local de código obligatoria (la skill AI Diff Reviewer más una extensión de revisión adaptada al repositorio). Luego ejecuta una autocomprobación y el comprobador de conformidad para que veas lo que se produjo. Un repositorio incorporado con una versión anterior recibe una actualización dirigida que cambia solo lo que falta.

[El endpoint de adopción](https://deepworkplan.com/es/init)

### ¿Puedo usar la metodología principal sin instalar add-ons?

Sí. Los add-ons son capas opcionales y un repositorio sin ninguno cumple por completo con DWP. Los devcontainers, los informes de Dailybot, las actualizaciones de dependencias, el soporte de sistemas de diseño y la revisión opcional en CI solo se ofrecen cuando encajan con tu repositorio y los aceptas explícitamente.

[Explorar los add-ons](https://deepworkplan.com/es/spec/addons)

### ¿Qué pasa si mi repositorio todavía no tiene tests ni linting?

DWP no considera que la ausencia de herramientas sea un pase libre. Durante la incorporación, el agente propone una configuración de validación adecuada para el stack, registra los comandos en la documentación del repositorio y los usa como objetivo para las futuras puertas; la propuesta queda visible para que la revises.

[Leer el protocolo del agente](https://deepworkplan.com/es/spec/agent-protocol)

### ¿Cuánto cuesta y cómo se mide la eficiencia?

La metodología y la skill tienen licencia MIT y son gratuitas; no hay servicio, clave de API ni telemetría en los flujos centrales. La eficiencia se reporta como el número de bytes de instrucción que carga cada flujo, medido por un script versionado junto con la skill y publicado en un registro de evaluación, con los aumentos reportados con la misma claridad que las disminuciones. No se reporta como porcentajes de tokens ni ahorros de costo, porque un inventario de bytes no establece eso; está planificada una evaluación pública preregistrada para medir los resultados como corresponde.

[Confianza y divulgación](https://deepworkplan.com/es/trust)

## ¿Te queda alguna pregunta?

Abre un issue en GitHub. Las preguntas que surgen repetidamente se añaden a esta página.

[Pregunta en GitHub](https://github.com/DailybotHQ/deepworkplan-website/issues)
