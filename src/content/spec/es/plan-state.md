---
title: Estado del plan
description: "La capa de estado del plan legible por máquina: manifest.json y state.json, registros de puertas, registros de resultados como memoria episódica, reconciliación y cuándo se requiere."
order: 8
lang: es
section: State
---

# Estado del plan

**Versión 5.0.0. Estado: estable.** Este documento especifica la capa de estado del plan legible por máquina de la metodología Deep Work Plan, ahora alineada con la versión propia del estándar DWP — ningún requisito existente se debilita con la renumeración. Esta revisión también documenta el actualizador de estado protegido, la publicación verificada de planes y las reglas de veracidad de la evidencia que un plan completado debe cumplir (véase más abajo). Las palabras clave MUST (DEBE), MUST NOT (NO DEBE), SHOULD (DEBERÍA), SHOULD NOT (NO DEBERÍA) y MAY (PUEDE) se interpretan según las describe el RFC 2119.

Dos artefactos JSON — `manifest.json` (la identidad estática del plan) y `state.json` (el estado de ejecución activo por tarea, incluidos los resultados de las puertas de validación) — que todo plan PUEDE llevar junto con sus archivos Markdown, y que la ejecución desatendida (véase [Protocolo del agente](/spec/agent-protocol#execution-profiles)) y los espacios de trabajo de agente sin git (véase [Arquetipos](/spec/archetypes) §3) DEBEN llevar.

El plan en Markdown sigue siendo la **fuente de verdad legible para personas**. La capa JSON es una **proyección derivada**: la regenera el agente en puntos de protocolo definidos, nunca se edita manualmente y nunca puede discrepar en silencio con el Markdown. Su propósito es la interoperabilidad — linting, comprobación de conformidad, diffs, paneles de control, descubrimiento de registros y sincronización con infraestructura de sesiones externa — ninguna de las cuales se puede construir de forma fiable sobre prosa.

## Por qué existe esto

Hasta la v1.1, los planes eran solo Markdown en prosa. Eso los mantenía auditables e independientes del agente, pero no dejaba nada que una herramienta pudiera validar, comparar ni consumir: ninguna puerta de conformidad, ninguna detección de desincronización entre `README.md` y `PROGRESS.md`, ninguna forma para que un demonio o una sesión en la nube conociera el estado de un plan sin analizar prosa. La v1.2 añade la proyección JSON sin degradar el Markdown — la proyección se deriva del Markdown, igual que un archivo de bloqueo se deriva de un manifiesto.

## Ubicación

Un plan que usa la capa de estado tiene esta estructura:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← fuente de verdad para personas (sin cambios)
├── PROGRESS.md          ← registro narrativo (sin cambios)
├── PROMPTS.md           ← sin cambios
├── manifest.json        ← identidad estática (escrito en la materialización)
├── state.json           ← estado activo (reescrito en los puntos de protocolo)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` DEBE escribirse exactamente una vez, cuando el flujo `create` materializa el plan, y NO DEBE cambiar después, salvo en una migración de versión de spec registrada en `PROGRESS.md`.

`state.json` DEBE ser reescrito por el agente en cada uno de estos puntos de protocolo: materialización del plan (todas las tareas en `pending`), inicio de tarea (`in_progress`), cada ejecución de puerta de validación (registro de puerta añadido o actualizado), finalización de tarea (`completed`, como parte del protocolo de finalización de tarea en [Especificación de DWP](/spec/dwp-specification#task-completion-protocol)), un punto de control antes de cualquier interrupción planificada, y una parada `blocked`.

Ambos archivos DEBEN escribirse de forma atómica: escribir en un archivo temporal en el mismo directorio y luego renombrarlo sobre el destino. Una escritura interrumpida NO DEBE dejar un archivo JSON truncado en su lugar.

## Cuándo se requiere la capa

- Para la ejecución **interactiva** en un repositorio git, la capa de estado es RECOMENDADA para planes nuevos y OPCIONAL para planes anteriores a la v1.2. Un plan sin ella sigue siendo conforme.
- Para la ejecución **desatendida**, la capa de estado es REQUERIDA.
- En un **espacio de trabajo de agente** sin git, la capa de estado es REQUERIDA: `state.json` lleva la información de recuperación que el registro de git lleva en un repositorio.

## `manifest.json` — identidad del plan

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` y `plan_format` son REQUERIDOS.

`archetype` DEBE ser uno de `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` DEBE ser uno de `micro`, `standard`, `deep` (véase [Rigor proporcional](/spec/dwp-specification#proportional-rigor)).

`plan_format` DEBE ser uno de `lite`, `full` — la representación elegida en la creación (véase [Planes Lite](/spec/lite-plans)). Es inmutable a nivel de manifiesto: una promoción posterior de Lite a Full se registra en `state.json`, nunca reescribiendo el manifiesto.

`parent_plan` vincula un plan hijo con su plan orquestador (`{repo}:{plan_name}`, o `null`).

`created_by` DEBERÍA identificar el agente y el modelo que crearon el plan. NO DEBE contener secretos, tokens ni identificadores de usuario más allá de un nombre de visualización.

## `state.json` — estado de ejecución activo

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Las entradas de tarea de un plan Lite usan un localizador `inline` que apunta al ancla de la tarea en `README.md` en lugar de un archivo separado — el resto de la entrada (puertas, resultado, estado) funciona igual:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Formato, materialización, aprobación y promoción

`format` DEBE ser uno de `lite`, `full` y refleja el `plan_format` del manifiesto — aquí es mutable, a diferencia del manifiesto, porque un plan Lite PUEDE promoverse más adelante a Full. `materialization` DEBE ser uno de `materializing` (la carpeta del plan se está escribiendo), `ready` (la materialización está completa) o `promoting` (una promoción de Lite a Full está en curso). `approval` DEBE ser uno de `pending`, `approved`, `pre_approved`; es OPCIONAL en este esquema para que un plan escrito antes de que se registrara siga siendo válido — cuando está ausente, se toma la fila `Approval` del README como el valor, y `pending` cuando ninguno de los dos está presente. `promotion` es `null` fuera de una promoción, o un objeto que registra la intención de la promoción y las tareas de destino mientras `materialization` es `promoting`. Véase [Planes Lite](/spec/lite-plans) para el ciclo de vida completo que codifican estos campos.

### Entradas de tarea

Cada tarea — un archivo separado en un plan Full, o un registro `{#task-N}` en línea en un plan Lite — DEBE tener exactamente una entrada en `tasks`, identificada por su número (`id`) y su `locator`. `locator.kind` DEBE ser `file` (Full — `value` es el nombre de archivo de la tarea) o `inline` (Lite — `value` es el ancla de la tarea, `#task-N`).

`status` DEBE ser uno de `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` solo es válido cuando el usuario eliminó explícitamente la tarea del alcance mediante `refine`; `state.json` NO DEBE usarse para omitir trabajo en silencio.

Una entrada `completed` DEBE llevar `completed_at` y, cuando el plan hace commits, el hash corto `commit` — este es el enlace de trazabilidad entre el plan y el código.

### Registros de puertas

Cada ejecución de un comando de validación DEBERÍA registrarse como un registro de puerta: `command`, `passes` (booleano), `exit_code`, `last_run` y una cadena `evidence` breve y legible para personas (una línea de resumen o una ruta bajo el `analysis_results/` propio del plan (dentro del folder del plan, nunca en la raíz del repositorio), nunca la salida completa del comando).

Una tarea NO DEBE marcarse como `completed` en `state.json` mientras alguno de sus registros de puerta tenga `passes: false` sin una ejecución posterior que pase. Los registros de puertas son el equivalente en máquina de "nunca marcar como completado sin evidencia" — el patrón de un indicador `passes` por elemento que evita la finalización prematura.

### Registros de resultados como memoria episódica

Una tarea `completed` DEBERÍA llevar un registro de `outcome`: qué se `tried` (intentó), qué `failed` (falló), qué `worked` (funcionó) y notas libres en `notes`. Mantener cada entrada en una línea.

Los registros de resultados convierten un plan terminado en **memoria episódica** recuperable: un agente (o una plataforma de indexación de memoria) puede recordar más adelante cómo se resolvió un problema, no solo que se resolvió. Alimentan las disposiciones de skills por tarea y la reconciliación de skills del Final Review, que los lee al buscar patrones. En plataformas como Hermes que indexan la memoria del agente, los registros de resultados en `state.json` hacen que los planes completados sean directamente recuperables en sesiones futuras.

### Estado de punto de control y de bloqueo

`checkpoint` registra el punto de reanudación más detallado dentro de la tarea actual: el `id` de la tarea, un localizador de `step` en texto libre, una marca de tiempo y una nota de una línea. Un agente DEBERÍA actualizarlo cada vez que haga una pausa dentro de una tarea; DEBE actualizarlo antes de cualquier interrupción planificada en modo desatendido.

`blocked` es `null` o `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Un agente desatendido que llega a una condición de parada DEBE rellenar `blocked` antes de detenerse — así es como el siguiente latido de un demonio, o un ser humano, sabe por qué se detuvo el plan.

## Proyección y reconciliación

El Markdown DEBE ganar cada desacuerdo. Si `state.json` dice que la tarea 4 está `completed` pero el README del plan muestra una casilla sin marcar, el archivo de estado está obsoleto.

Un agente que reanuda DEBE comparar la lista de casillas del README con `state.json` antes de continuar. En caso de desincronización DEBE regenerar `state.json` a partir del Markdown (y del registro git, cuando esté disponible), registrar la reconciliación en `PROGRESS.md` y solo entonces continuar.

La sub-skill `verify` DEBE tratar la desincronización como un hallazgo de conformidad: reportar qué tareas discrepan y en qué dirección.

Las herramientas distintas del agente ejecutor DEBEN tratar ambos archivos JSON como de solo lectura.

## Actualizaciones de estado protegidas

Las escrituras de avance ordinarias pasan por un actualizador dirigido y distribuido con la skill, en lugar de reescribir el archivo completo. Rechaza de plano el estado malformado, y se niega a marcar una tarea como `completed` sin evidencia de puerta no vacía adjunta — existe una forma `--gate-json` para un comando cuya propia salida contenga caracteres de barra vertical, y el actualizador acepta el mismo objeto de puerta cerrado descrito arriba. Los reintentos solo sustituyen a su propio comando; un comando distinto conserva su propio registro separado. `--block-reason` registra un bloqueo; `--resolve-blocker` resuelve solo el bloqueo de la tarea actual, nunca el de otra tarea. El trabajo omitido nunca puede dejar un plan `completed`. `--reopen-reason` registra la intención de quien llama de enmendar el plan mediante `refine` — la enmienda y cualquier evidencia que invalide DEBEN registrarse primero en el registro de la tarea. `--expected-sha256` rechaza una escritura contra una instantánea de estado que ya haya avanzado. Un directorio `.lock` cooperativo serializa a los escritores concurrentes; el bloqueo de un escritor caído DEBE inspeccionarse antes de eliminarlo, y no se reclama ninguna protección contra un editor que se salte el bloqueo por completo. Estos registros afirman resultados — no demuestran por sí mismos que un comando se ejecutó, ni que su salida fue aceptada semánticamente.

## Publicación verificada del plan

Antes de anunciar la finalización, los registros de tarea terminados (cada uno con su **disposición de skills** y, en el Final Review, su **decisión de documentación**), el índice del README y `PROGRESS.md` DEBEN redactarse a partir de resultados de origen y aceptación ganados. La tarea final del plan entonces se cierra mediante el finalizador distribuido: su transición terminal valida el candidato completado contra cada artefacto del plan antes de escribir el estado, verifica los archivos después y registra un recibo `analysis_results/FINALIZATION.json`. Una puerta aprobada inventada NO DEBE respaldar esta transición — el recibo es evidencia externa de lo que realmente se comprobó, nunca su propio prerrequisito. `bash ../verify/conformance.sh --plan PLAN_name` se ejecuta a continuación, contra los artefactos reales en disco.

Una publicación interrumpida deja un marcador `.finalizing.json` en su lugar; la verificación normal falla hasta que se inspecciona la evidencia y el ayudante de recuperación tiene éxito contra el mismo candidato — nada reanuda una publicación por suposición. Un bloqueo cooperativo obsoleto requiere confirmar que ningún escritor sigue activo antes de eliminarlo. Nada en esta capa hace commit, push, ejecuta un comando de puerta almacenado, ni repara en silencio el Markdown del plan. Un intérprete de Python ausente produce `UNVERIFIED`, nunca `completed`.

## Veracidad de la evidencia y enmiendas

Todo cambio en el alcance, los criterios de aceptación o el aplazamiento de una tarea lleva un registro de enmienda duradero: el criterio original textual, lo observado, la disposición, el motivo, la autoridad detrás de ella (usuario, desarrollador o evidencia), las tareas afectadas y qué evidencia se invalidó o preservó. Las enmiendas se anexan, nunca se retrofechan; `manifest.json` conserva su procedencia de creación y nunca se reescribe para igualar un alcance en vivo modificado.

Cinco estados de evidencia describen contra qué puede cerrarse un registro de tarea:

- **Investigación completada** — trabajo real registrado; cierra una tarea solo contra un criterio revisado que la nombre, nunca contra el original tal como se escribió.
- **Escenario no ejecutado** — registrado como no realizado; no aporta evidencia de aprobación en ninguna era.
- **Requisito aplazado** — el criterio se traslada a una tarea de destino nombrada con autoridad registrada; solo esa enmienda cierra el origen.
- **Puerta fallida** — permanece en fallo hasta que la misma intención de aceptación se reejecute y pase; un reintento solo sustituye a su propio comando.
- **Resultado de producto logrado** — el criterio tal como se escribió, verificado por su propia puerta; el único estado que completa una tarea sin cambios.

La aplicación es mecánica dondequiera que los registros lo permitan. La evidencia de puerta marcada «invalidada por refine» es historial conservado, nunca evidencia de aprobación, y una tarea completada que aún dependa de ella es reportada por el comprobador. Un registro de aprobación cuyo propio texto admite que la comprobación nunca se ejecutó (por ejemplo «nunca se entró», «no se ejecutó» o «no se puede medir») es una contradicción, reportada de la misma forma — igual que una tarea de estado completada cuyo propio registro todavía dice `Status: pending`. Las contradicciones narrativas más allá de estas — un reporte cuyas conclusiones discrepan de su propia lista de verificación — requieren un revisor humano; el comprobador reporta lo que dicen los registros, no lo que significa la prosa. Un usuario PUEDE aceptar explícitamente una excepción acotada con autoridad registrada; la preaprobación desatendida nunca es un permiso general para abandonar un objetivo central, y un criterio obligatorio que no se puede cumplir es un bloqueo, nunca trabajo completado.

## Versionado de esquemas

Ambos esquemas están versionados por URL. Los campos aditivos están permitidos dentro de una versión; renombrar o cambiar el tipo de un campo requiere una nueva versión de esquema y una nota de migración en el registro de cambios de la especificación. Esta revisión introduce `/v2.json` para ambos esquemas: el campo `file` de la entrada de tarea pasa a ser un `locator` tipado (`{"kind": "file" | "inline", "value": ...}`), el manifiesto gana `plan_format`, y el archivo de estado gana `format`, `materialization`, `approval` y `promotion` — en conjunto, los campos que necesitan los planes Lite (véase [Planes Lite](/spec/lite-plans)). Los manifiestos y archivos de estado `/v1.json` siguen siendo válidos y nunca se reescriben en silencio a v2; una sesión de `refine` PUEDE migrar uno deliberadamente. El campo `spec_version` del manifiesto fija la versión de la especificación DWP con la que se creó el plan; un agente que encuentre un plan más nuevo que su especificación instalada DEBERÍA informar de ello en lugar de suponer.
