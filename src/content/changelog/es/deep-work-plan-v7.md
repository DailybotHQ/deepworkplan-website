---
title: "DWP v7: planes que delegan, con registro de todo"
description: "Deep Work Plan v7 conserva el contrato y el diario de v6, permite que un plan delegue tareas acotadas a otros agentes y añade cuatro addons opcionales."
date: 2026-10-09
version: "v7 · Delegación con evidencia"
kind: release
lang: es
order: 0
featured: true
sourceLabel: "Conjunto de esquemas v7 publicado"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
  - label: "Skill release v7.10.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.0"
  - label: "Skill release v7.10.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.1"
  - label: "Skill release v7.10.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.2"
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.1"
---

Deep Work Plan v7 conserva el método de v6: el contrato es la autoridad, el diario de solo anexado es la memoria, el planificador decide qué se ejecuta a continuación y una tarea solo se cierra cuando la evidencia registrada cumple sus criterios. v7 añade la capacidad de delegar y mantiene la misma disciplina sobre el resultado.

Un plan que concede `agent_delegation` puede marcar una tarea como `parallel_safe` y entregarla a otro agente. La respuesta del delegado se registra como dato, nunca como instrucciones, y permanece `asserted` hasta que el ejecutor de puertas del propio plan observa el resultado. Solo el ejecutor genera evidencia `observed`, de modo que la delegación amplía el alcance sin rebajar el listón para dar una tarea por completada.

Cuatro addons opcionales convierten la delegación en autonomía práctica. Herdr entrega una tarea a un agente en un panel, en cualquier máquina. Agentkit coloca un único comando `ak` sobre todos los agentes de programación de terminal, con autonomía por defecto y la posibilidad de desactivarla, y ejecuta tareas acotadas sin interfaz en un worktree de git. Devcontainer da a cada repositorio un contenedor reproducible sin ninguna clave SSH en su interior por defecto (git sobre SSH a través del agente del host; archivos de claves solo mediante la opción explícita `[ssh] copy_keys`). DeepWorkPlan Vim es un editor de terminal con explorador de planes y visor de Markdown. Cada uno está fijado por etiqueta a un producto con su propio repositorio y funciona sin Deep Work Plan. Un repositorio es plenamente conforme sin ninguno de ellos, y el registro en `.dwp/config.json` indica cuáles están habilitados.

El modo de benchmark y aprendizajes registra lo que enseña cada plan, de modo que los hallazgos puedan analizarse después. Una auditoría de todo el ecosistema, ejecutada como un plan orquestador v7 con un agente por repositorio, no encontró ninguna regresión de comportamiento frente a v6: la suite del paquete pasa 807 de 807 en un entorno limpio, y la carga de instrucciones creció entre 0.1% y 3.9% por flujo (4.6% para el paquete completo), medida en bytes sobre ambas etiquetas y no estimada como tokens.

v7 supone un salto en orquestación y auditabilidad, pero todavía no es una autonomía totalmente desatendida. La versión 7.2.0 cierra las brechas que halló esa auditoría: el benchmark y los aprendizajes ahora miden los planes v7, se rechaza iniciar una tarea antes de que sus requisitos previos estén completos, y la suite de pruebas se ejecuta de forma hermética (815 de 815 en un entorno limpio). No se ha medido la no inferioridad de los resultados de los agentes. Los planes existentes conservan la generación registrada y nunca se migran de forma implícita; los planes nuevos usan el contrato v7 por defecto.

La versión 7.6.0 (2026-10-11) introdujo la orquestación a escala: un carril por repositorio o línea de trabajo, cuentas elegidas según su margen disponible (`ak usage`, `ak pick`), lanzamiento desatendido e incorporación que detecta cada addon, actualiza los que están en uso y ofrece los que encajan.

La versión 7.7.0 (2026-10-12) entregó la autonomía de enjambre (Guía §17): el bucle de capacidad (`shared/swarm.py`), paquetes de traspaso (`dwp-handoff-v1`), sucesión de líderes con épocas y aislamiento, peticiones entre carriles, la taxonomía de escalado de AGENT_PROTOCOL §7.5 (C1–C7: decidir y registrar todo lo demás), el listón de calidad (las puertas son hipótesis, verificadas no afirmadas) y los aprendizajes metodológicos de 313 planes ejecutados en 23 repositorios. Límite conocido: el diario v7 no tiene un evento dedicado para el traspaso de un carril ni para la sucesión de un líder (se registran como una delegación cancelada más una observación).

La versión 7.8.0 (2026-10-13) estableció Ecosystem 1.0: cada producto que integra el paquete alcanzó su primera versión estable y queda fijado en v1.0.0 bajo versionado semántico (coding-agents-kit, herdr-peers, devcontainer-kit y deepworkplan-vim, cada uno con un resumen `SHA256SUMS` verificado), junto con las versiones fijadas de AI Diff Reviewer v3.3.14 y Dailybot agent-skill v3.23.17; después, 7.8.1 (2026-10-14) fijó las versiones de parche v1.0.1 de coding-agents-kit y devcontainer-kit.

La versión 7.9.0 (2026-10-25) fija el addon de Herdr en herdr-peers v1.1.0, cuya sub-skill nativa de debate permite que un líder conduzca un panel de pares a lo largo de rondas y cierre con un registro de decisión, y fija el AI Diff Reviewer en v3.3.16; la CI del paquete ejecuta ahora su trabajo con el mínimo de Python 3.9 en ubuntu-24.04.

La versión 7.10.0 (2026-10-26) convierte las decisiones trascendentes en decisiones de equipo: con el addon de Herdr habilitado y herdr-peers 1.1.0 o posterior en uso, `create` planifica cada decisión trascendente —dos opciones viables con resultados materialmente distintos, difíciles de revertir o transversales, y que nada en el repositorio resuelve— como una tarea de decisión listada, y `execute` conduce para ella un debate `decide` de herdr-peers sin votar, registrando cada asiento como una delegación de solo lectura y anotando la elección con su registro de decisión. Nada cambia sin Herdr: una precondición ausente o un debate fallido regresa al registro de decisión del propio agente, y `config.py decisions debate off` restablece el criterio de un solo agente. El pin del addon de Dailybot pasa a agent-skill v3.23.20, la versión volcada en este repositorio.

La versión 7.10.1 (2026-11-15) fija el addon de Herdr en herdr-peers v1.2.1, cuya línea 1.2.x añade autopilot: un demonio opcional que solo inicia un humano, que acepta la opción recomendada de cada agente en espera, sigue los diálogos de varios pasos hasta su fin y nunca toca un inicio de sesión ni la confirmación de omisión de permisos. El protocolo 1 no cambia.

La versión 7.10.2 (2026-11-15) mueve los pins del ecosistema con los lanzamientos del día: el addon de Herdr a herdr-peers v1.2.2, un parche solo de correcciones cuyo autopilot ahora responde una pregunta que se muestra con una vista previa junto a sus opciones y reconoce la marca de recomendado en español, francés, alemán e italiano; agentkit a coding-agents-kit v1.2.0, cuyo `ak last` reanuda la sesión más reciente de un directorio de trabajo en cualquier terminal y cuyos lanzamientos dentro de un panel de Herdr restauran ese panel tras un reinicio de Herdr o del equipo; devcontainer-kit a v1.1.2 y deepworkplan-vim sigue en v1.0.1; el flujo de release ahora reintenta el push del tag de release para absorber rechazos transitorios.

La versión 7.11.0 (2026-11-16) aterriza la serie de endurecimiento v7 del developer: el glosario de durabilidad y las reglas de control visibles entran en la guía, `verify` gana una auditoría de cumplimiento de solo lectura de los planes terminados, los documentos del pack expresan con precisión las afirmaciones de durabilidad y de tokens, el tagline del README se sustituye por el ganador de la prueba de comprensión, y la ruta de create en vivo mantiene el bundle Lite dentro de su presupuesto de instrucciones.

La versión 7.12.0 (2026-11-16) registra los planes en el bucle de herdr-peers: un plan reclama su liderazgo con una lista de sucesión, de modo que `autopilot --loop` y la fleet UI pueden ver cada plan abierto y mantenerlo ejecutándose hasta su fin, y un notificador de Dailybot informa de los hitos; los descriptores de los addons pasan a herdr-peers v1.3.1 y coding-agents-kit v1.3.0.

La versión 7.12.1 (2026-11-16) corrige el notificador de Dailybot del addon de Herdr: ahora acepta el nombre de evento `herdr-peers/plan-event-v1` que emite herdr-peers, limita el stdin del notificador a 64 KiB y mapea `plan_lead_moved`; los descriptores de los addons pasan a coding-agents-kit v1.4.0, cuyo `ak update` está documentado como de invocación solo humana.

Versión del skill instalada: **7.12.1**, estable desde 7.0.0.
