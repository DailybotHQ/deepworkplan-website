---
title: Capa de registros
description: "La capa de registros v6 y v7: contrato de resultados inmutable, diario de solo anexado, clases de evidencia, aprobación humana, enmiendas, invariantes, recibos."
order: 9
lang: es
section: Record layer
---

# Capa de registros

> **Alcance de versión:** Esta página reformula la capa de registros normativa v6 sobre la que se construye el estándar actual, DWP 7.0.0. Fuentes canónicas en la release `v7.8.1`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) y [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). Donde esta página y esos archivos difieran, prevalecen los archivos. Los planes v5 conservan la capa de [estado del plan](/spec/plan-state) y nunca se migran de forma implícita.

**Versión 6.0.0, ampliada en 7.0.0. Estado: estable.** La capa de registros sustituye la finalización narrativa por registros: el contrato es la autoridad, el diario es la memoria, los helpers hacen la escritura y todo archivo generado es una proyección. Las palabras clave MUST (DEBE), MUST NOT (NO DEBE), SHOULD (DEBERÍA), SHOULD NOT (NO DEBERÍA) y MAY (PUEDE) se interpretan según las describe el RFC 2119.

## El modelo en una línea

Un plan son dos artefactos redactados y una secuencia protegida. El plan en Markdown (`README.md` y los archivos de tarea) dice qué se hará. El **contrato de resultados** (`contract.json`) dice qué cuenta como terminado y qué tiene permitido hacer el plan. El **diario** (`journal.ndjson`) registra lo que realmente ocurrió. `state.json` y `views/` se regeneran a partir del diario y NO DEBEN editarse manualmente; cuando un archivo generado y el diario discrepan, prevalece el diario y el archivo se regenera.

## Detección de la generación

Una carpeta de plan es un plan de la línea v6 si y solo si contiene un `manifest.json` cuyo puntero `contract` se resuelve, un `contract.json` o una cadena de revisiones en `contracts/`. La detección DEBE usar estos artefactos, nunca la versión del paquete instalado: un paquete actual puede contener planes v5, y un paquete más antiguo puede encontrarse con un plan v6.

La URL `schema` del contrato nombra su **generación**, y el manifiesto y cada evento del diario la replican:

| Generación | Contrato | Eventos del diario | Manifiesto | Añade |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` y el evento `delegation` ([Delegación](/spec/delegation)) |

Los planes nuevos creados por el paquete 7.x son v7 por defecto; una petición explícita de `v6` sigue materializando un contrato v6. Un plan nunca cambia de generación, y un diario que mezcle generaciones DEBE rechazarse. Ambas generaciones se proyectan en la misma forma [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## El contrato de resultados

Un contrato por plan, conforme al esquema de su generación. Contiene la declaración del resultado y la definición de éxito, los criterios de aceptación, las tareas con sus prerrequisitos, superficie tocada e intención de puerta, los invariantes del plan, el alcance (rutas permitidas, clases de comandos, operaciones prohibidas), la envolvente de recursos, los límites de planificación, los permisos y el registro de autorización.

- **Identidad.** El `contract_id` es el SHA-256 de los bytes canónicos del contrato sin el campo de identificador. Todo registro producido bajo el contrato lo cita.
- **Inmutabilidad.** Una vez iniciada la ejecución, el contrato NO DEBE cambiar. Un contrato modificado es una nueva **revisión** en `contracts/`, que cita a su predecesora, con números de revisión contiguos y una autoridad registrada nueva.
- **Identificadores estables.** Los criterios (`AC-*`), los invariantes (`INV-*`) y las tareas (`T-*`) DEBEN ser únicos, y los registros citan identificadores, nunca posiciones en una lista. El grafo de tareas DEBE ser acíclico, y toda intención de puerta DEBE hacer referencia a un criterio declarado.
- **Permisos.** Las capacidades concedidas y no concedidas DEBEN ser subconjuntos disjuntos de un conjunto cerrado: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Autorización.** El mecanismo es exactamente `plan_authorship` (la persona redactó o revisó el plan antes de la ejecución) o `pre_authorization` (una concesión permanente con una envolvente declarada, como en el modo de confianza). Ambos funcionan igual como puerta; solo difiere la autoridad registrada.
- **Cerrabilidad.** Todo criterio DEBE poder cerrarse: un criterio que una tarea controla se cierra con evidencia `observed` de su puerta o con una aprobación humana `asserted`, según las clases de evidencia que acepte. Un borrador de criterio que no acepte ninguna se rechaza.

## Materialización

Un plan lo materializa el helper incluido (`ledger.py materialize`), nunca a mano, exactamente en este orden, con cada paso idempotente y reanudable:

1. **`manifest.json`** con el puntero al contrato, escrito primero para que la generación del plan pueda descubrirse aunque la materialización se interrumpa.
2. **`contract.json`**, validado y direccionado por contenido.
3. El evento de diario **`approval`**, que cita el identificador del contrato y el digest del plan en Markdown.

Solo ese evento de aprobación abre la puerta de inicio de tareas. Un contrato copiado a mano sin él se rechaza al iniciar la tarea, y un manifiesto cuyo puntero no coincida con el contrato que se materializa se rechaza en lugar de reescribirse.

## El diario

`journal.ndjson` es de solo anexado: un objeto JSON cerrado por línea, nunca editado ni eliminado. Una corrección es un evento posterior. Cada evento lleva su esquema, su tipo, un `seq` estrictamente creciente, una marca de tiempo, el plan, el `contract_id` y el actor (`helper`, `agent`, `host_adapter` o `human`). El catálogo de eventos abarca inicios de tarea, aprobaciones, ejecuciones de puertas, observaciones, adaptaciones, enmiendas, intervenciones, muestras de recursos, pares de control, selecciones del planificador, rechazos, renderizados de vistas, reconciliaciones y reparaciones del diario; v7 añade los eventos de delegación. Todo rechazo queda registrado a su vez.

## Clases de evidencia

Los eventos que llevan evidencia registran una etiqueta de **confianza**:

1. **observed** — un helper incluido ejecutó la comprobación por sí mismo, con directorio de trabajo, entorno, tiempo límite y salida capturada declarados. Solo el ejecutor de puertas (`ledger.py gate`) emite evidencia de puerta observada; un agente que se limita a anotar un resultado que reporta no puede hacerlo.
2. **imported** — tomada de una fuente externa coincidente con su procedencia, por ejemplo un registro de puerta v5 migrado cuyo puntero de evidencia se resuelve.
3. **asserted** — declarada sin establecerse de forma independiente.

Cada criterio declara qué clases acepta, de modo que un criterio que solo acepta evidencia observada nunca puede cerrarse con una afirmación. Las sumas de comprobación establecen identidad de bytes, no verdad semántica; la capa de registros comprueba estructura y procedencia, y no demuestra la semántica del producto.

## Aprobación humana

Un criterio que debe juzgar una persona se cierra mediante `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. La aprobación se registra como `asserted`, cita el artefacto en que se apoya, cuenta solo dentro de la ventana de evidencia de la tarea que la declara y solo cierra un criterio que acepte `asserted`. Un agente nunca aprueba en nombre de una persona. Los registros con actor humano escritos fuera de la materialización llevan un marcador de autoridad explícito (una nota que escribió la persona, registrada por ruta y digest, o una confirmación interactiva); el ledger no puede autenticar a una persona, así que el marcador hace que la afirmación sea auditable, no observada.

## Criterios controlados

Un criterio declarado como control de regresión o de discriminación solo se cierra con un **par de control discriminante**: la comprobación falla en la revisión de partida y pasa en la nueva. Un par que pasa en ambas ramas se registra como no discriminante y nunca se redondea al alza; un inicio con cambios sin confirmar o una rama antigua no disponible se registra como control no disponible, nunca se sintetiza.

## Ejecución y finalización

El despacho lo determina el planificador determinista (`scheduler.py ready`), y `ledger.py start` rechaza una tarea cuyos prerrequisitos estén incompletos. Cada inicio de tarea registra una huella del árbol de trabajo, y la evidencia solo se reutiliza para la misma tarea y el mismo criterio con una huella equivalente.

**Los invariantes son de alcance de plan.** Cada invariante declarado se mantiene durante todo el plan y se evalúa en cada frontera como una observación (`INV-<id>: pass` o `INV-<id>: fail: <reason>`). Una propiedad que solo algunas tareas deben cumplir es un criterio de aceptación de esas tareas, nunca un invariante.

**La finalización se deriva, nunca se declara.** `ledger.py complete` se niega, y registra la negativa, mientras algún criterio carezca de evidencia aceptada dentro de su ventana o algún invariante carezca de una evaluación reciente que pase. El snapshot muestra una tarea como completada exactamente cuando los registros lo respaldan.

## Adaptaciones y enmiendas

Los cambios a mitad de la ejecución son propuestas al planificador, limitadas a un conjunto cerrado: `split`, `reorder`, `insert`, `change_strategy` y `retry`. Una adaptación NO DEBE eliminar un requisito, debilitar o sustituir la aceptación, ampliar el alcance o los permisos, gastar más allá de la envolvente ni marcar como completo un escenario no ejecutado.

Un cambio de alcance, criterios de aceptación, permisos o envolvente es una **enmienda del contrato**: `ledger.py amend` prepara el contrato revisado como la siguiente revisión, registra la enmienda junto con los criterios cuya evidencia anterior invalida, exige una nueva aprobación con un marcador de autoridad humana y solo entonces cambia el contrato vigente. Una enmienda interrumpida se reanuda en el primer paso que falte; la autoría del plan nunca se traslada a una revisión.

## Recibos, vistas y exportación

`outcomes.py receipt` recalcula el resultado del plan a partir de los registros, de modo que cambia cuando cambian los registros; nunca se escribe a mano. `views.py render` regenera las vistas legibles para personas; una vista que una persona editó se reporta, nunca se sobrescribe en silencio, y la reconciliación queda registrada a su vez. Como `.dwp/` está ignorado por git, `ledger.py export --dest <dir>` empaqueta el diario, el snapshot, la cadena de contratos y cada artefacto de evidencia citado, para su durabilidad o para otro host.

## Superficies de solo lectura y reanudación

`status` y `verify` nunca escriben en un plan de la línea v6; reportan mediante comandos puros y las proyecciones generadas. Un host que reanuda se recupera en un orden fijo (inspeccionar, validar, proyectar, renderizar con autoridad registrada) y trata una huella obsoleta como evidencia invalidada que debe volver a ejecutarse, nunca como un resultado reutilizable. El diario nunca se reproduce como contexto de conversación: el trabajo se reanuda mediante el ciclo de ejecución con un [manifiesto de contexto](/spec/resources-and-abilities#the-per-task-context-manifest) por tarea.

## Coexistencia y migración

Los planes v5 y los de la línea v6 PUEDEN coexistir en un mismo `.dwp/plans/`, y cada uno se ejecuta bajo su propia generación durante toda su vida. El único camino de v5 a v6 es una migración explícita y con vista previa (`migrate_v6.py`, ejecutada mediante `refine`) con una copia de seguridad verificada y reversión; el historial v5 migrado es `imported` cuando su evidencia se resuelve y `asserted` en caso contrario, nunca `observed`. No existe migración inversa.

## Relacionado

- [Recursos y capacidades](/spec/resources-and-abilities) — el manifiesto de contexto, la envolvente de recursos, las capacidades del host y el registro de addons.
- [Delegación](/spec/delegation) — lo que v7 añade a esta capa.
- [Estado del plan](/spec/plan-state) — la capa de estado v5 conservada.
