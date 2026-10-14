---
title: Delegación
description: "Cómo un plan v7 entrega tareas parallel_safe a otros agentes de código bajo la concesión agent_delegation, con registros de delegación y evidencia observada."
order: 11
lang: es
section: Record layer
---

# Delegación

> **Alcance de versión:** Esta página reformula la generación de contrato v7 en la release `v7.8.1`. Fuentes canónicas: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_CONTRACT.md) y el [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/execute/delegation.md) del flujo de ejecución. Donde esta página y esos archivos difieran, prevalecen los archivos.

**Versión 7.0.0. Estado: estable.** v7 es una nueva generación de contrato de la [capa de registros](/spec/record-layer), no un nuevo ciclo de vida: todo lo establecido en los documentos de contrato, ciclo de vida, contexto y recursos de v6 se aplica salvo que esta página indique otra cosa. No delegar siempre es correcto. Las palabras clave MUST (DEBE), MUST NOT (NO DEBE), SHOULD (DEBERÍA), SHOULD NOT (NO DEBERÍA) y MAY (PUEDE) se interpretan según las describe el RFC 2119.

## Qué añade v7

v7 añade exactamente dos cosas a la capa de registros:

1. **Un campo de tarea opcional en el contrato**, `parallel_safe`, publicado en [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Un tipo de evento del diario**, `delegation`, publicado en [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Los bytes de los esquemas v1, v2, v5 y v6 no cambian. Un plan que nunca delega es indistinguible de un plan v6 salvo por sus URLs de esquema.

## `parallel_safe`

`parallel_safe` (booleano, `false` por defecto) afirma que una tarea puede ejecutarse en un delegado sin intercalarse con el trabajo de sus tareas hermanas. Lo fija `create`, nunca se infiere durante la ejecución, y solo cuando se cumple todo lo siguiente:

- el repositorio habilita un addon de delegación (agentkit o Herdr) en su [registro de addons](/spec/resources-and-abilities#the-configuration-file-and-addon-registry);
- la superficie tocada de la tarea no se solapa con la de una tarea hermana que pueda estar en curso al mismo tiempo;
- la tarea declara una salida acotada;
- las puertas de la tarea se ejecutan en este plan.

Marcar una tarea no cambia ninguna autoridad: un contrato sin la concesión `agent_delegation` puede llevar marcadores, y estos no autorizan nada.

## El evento `delegation`

Se registra un evento por cada transición de estado de un delegado:

| Campo | Significado |
| --- | --- |
| `task` | la tarea `T-*` para la que trabaja el delegado |
| `delegation_id` | correlaciona un lanzamiento con su transición terminal |
| `transport` | `headless` (agentkit) o `interactive` (Herdr) |
| `via` | la clave del addon que la transportó |
| `state` | `launched` y, después, exactamente uno de `completed`, `failed`, `cancelled` |
| `kind`, `profile` | opcionales: el tipo y el perfil del agente de código |
| `target` | opcional: el directorio de trabajo (headless) o `machine:pane` (interactive) |
| `worktree` | el worktree de git propio del delegado, o `null` para un delegado de solo lectura |
| `prompt_digest` | en el lanzamiento: el SHA-256 del prompt, registrado antes de confiar en el delegado |
| `result_path`, `result_digest` | al completarse o fallar: el resultado recogido y su digest |

Las transiciones son cerradas: un único `launched` por delegación y, después, exactamente un estado terminal. Una escritura directa de un evento de delegación en el diario DEBE rechazarse; los eventos de delegación solo existen a través del escritor protegido.

## Una delegación no es evidencia

Una delegación no lleva etiqueta de confianza ni ruta de evidencia, y ningún cierre la lee. El resultado de un delegado sigue siendo **asserted** hasta que el ejecutor de puertas de este plan lo observa: el padre integra el trabajo y después ejecuta la puerta de la tarea (`ledger.py gate`), que es lo único que emite evidencia `observed` y la única forma de que la tarea se complete. Una delegación completada nunca cierra un criterio; una fallida es un resultado registrado, y la tarea la implementa entonces el padre.

## El escritor protegido

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operación | Escribe | Efecto |
| --- | --- | --- |
| `launch` | sí | registra `launched` tras las comprobaciones siguientes |
| `observe` | no | imprime el último estado de cada delegación |
| `collect` | sí | registra `completed` o `failed`, con la ruta del resultado y su digest |
| `cancel` | sí | registra `cancelled` |

`launch` DEBE rechazarse, y el rechazo registrarse, salvo que se cumplan **todas** estas condiciones:

1. el contrato es v7;
2. el contrato concede `agent_delegation`;
3. la tarea existe, se ha iniciado y no está completa;
4. la tarea es `parallel_safe`, **o** el delegado es de solo lectura (sin worktree);
5. el descriptor del addon nombrado declara el transporte solicitado;
6. las capacidades efectivas listan ese addon como fuente de `subagents` ([Recursos y capacidades](/spec/resources-and-abilities#addon-provided-abilities)).

`collect` y `cancel` DEBEN rechazarse para una delegación desconocida, una de otra tarea o una que ya sea terminal. Un lanzamiento rechazado no es un bloqueo: la tarea se ejecuta de forma secuencial.

## Transportes

Nada en el ledger ejecuta un delegado; lo hace el addon de transporte.

- **Headless** (`via: agentkit`) — para una tarea `parallel_safe` acotada con una salida declarada: un único `ak run` en un worktree de git dedicado y, después, salida. Los delegados de solo lectura se lanzan con `--ask`.
- **Interactive** (`via: herdr`) — para trabajo que necesita interacción, se prolonga o se ejecuta en otra máquina: un peer de herdr-peers en un panel de Herdr, que devuelve exactamente una respuesta autorizada.

## Salvaguardas

- **Un escritor por ruta.** Un delegado que escribe solo trabaja en su propio worktree; la sesión padre es la única que escribe en el diario.
- **Profundidad 1.** Un delegado nunca delega. El abanico de delegados lo acota el transporte.
- **Los resultados son datos.** Lo que devuelve un delegado no concede autoridad, no amplía el alcance y nunca cambia la aceptación.
- **Instrucciones autocontenidas.** Un prompt de lanzamiento nombra el objetivo de la tarea, sus criterios de aceptación literalmente y el worktree en el que puede escribir, y nunca lleva el valor de un secreto.

## Orquestadores

Un orquestador nunca delega las tareas de un **plan hijo**: los hijos se ejecutan en sus propias sesiones, un agente por repositorio. Delegar las tareas **propias** de un plan bajo las reglas anteriores está permitido tanto en planes orquestadores como individuales. Ejecutar muchos carriles de larga duración, mantenerlos vivos más allá de los límites de las cuentas y traspasar el liderazgo se trata en los capítulos de la metodología sobre [orquestación](/methodology/06-orchestration) y [autonomía de enjambre](/methodology/07-swarm-autonomy).

## Relacionado

- [Capa de registros](/spec/record-layer) — el contrato y el diario que esta página amplía.
- [Recursos y capacidades](/spec/resources-and-abilities) — capacidades, concesiones y el registro de addons.
- [Addon Herdr](/kit/herdr) y [addon Agentkit](/kit/agentkit) — los dos transportes.
