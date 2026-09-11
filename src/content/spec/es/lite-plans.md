---
title: Planes Lite
description: "Planes Lite: registros de tarea compactos y ejecutables en línea dentro de README.md, su creación y selección de formato, y la promoción a un plan Full."
order: 3
lang: es
section: Workflow
---

# Planes Lite

**Versión 2.4.0. Estado: estable.** Este documento especifica la representación de plan Lite introducida junto con la [Especificación de DWP](/spec/dwp-specification): un formato de plan para trabajo acotado de tamaño pequeño a mediano que se materializa directamente, sin una etapa de borrador no ejecutable. Las palabras clave MUST (DEBE), MUST NOT (NO DEBE), SHOULD (DEBERÍA), SHOULD NOT (NO DEBERÍA) y MAY (PUEDE) se interpretan según las describe el RFC 2119.

## Representación y ciclo de vida

Un plan DEBE ser una de dos representaciones, registrada una vez en `manifest.json` como `plan_format`: **Full** almacena un archivo por tarea bajo `<n>.task_<slug>.md`; **Lite** almacena registros de tarea compactos y ejecutables en línea dentro de `README.md`, cada uno tras un ancla estable `{#task-N}`. Un plan Lite no es un plan Full parcial o informal: cada registro de tarea DEBE seguir llevando un objetivo, una Superficie tocada, criterios de aceptación, una puerta de validación y un registro de finalización, con la misma forma normativa que la [Anatomía de la tarea](/spec/dwp-specification#task-anatomy) define para Full.

Cuatro ejes describen el estado de un plan, y DEBEN rastrearse de forma independiente en lugar de mezclarse:

| Eje | Valores | Significado |
|------|--------|-------------|
| Formato | `lite`, `full` | Dónde viven los registros de tarea |
| Materialización | `materializing`, `ready`, `promoting` | Si la carpeta del plan se está escribiendo, está completa o está en promoción |
| Aprobación | `pending`, `approved`, `pre_approved` | Si un humano revisó el plan, o el modo trust lo preaprobó |
| Ejecución | `pending`, `in_progress`, `blocked`, `completed` | Progreso por tarea y general |

El create guiado escribe una **propuesta pendiente revisable** — Lite o Full, ya el plan real, nunca un borrador desechable. Trust materializa un plan **listo y preaprobado** y devuelve el control de inmediato. `create` y una promoción nunca ejecutan trabajo de producto; `execute` DEBE rechazar una propuesta `pending` que espera aprobación y DEBE rechazar un plan con una promoción sin resolver en curso.

## Creación y selección de formato

`/dwp-create` atiende la intención de planificación en cualquier escala, no solo en trabajo grande. El trabajo pequeño y acotado — una sola preocupación, aproximadamente una sesión, sin coordinación — es el objetivo del plan Lite; el trabajo de múltiples pasos con alcance real recurre por defecto a Full, según el [Rigor proporcional](/spec/dwp-specification#proportional-rigor). Una edición directa, una explicación, una comprobación de estado, una reanudación o una solicitud explícita de no crear un plan mantienen su propia ruta y nunca se convierten en un plan.

`lite` y `full` son **preferencias de formato**; `trust` y `auto` son **opciones de interacción** separadas, y cualquiera de los dos tipos de opción PUEDE aparecer en cualquier extremo de la solicitud, en cualquier orden:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Repetir la misma opción es idempotente; solicitar `lite` y `full` juntos es un error. `--` termina el análisis de opciones.

Cuando no se da ninguna preferencia de formato, `create` recomienda una y explica por qué. Una solicitud explícita de **Full** siempre prevalece. Una solicitud explícita de **Lite** se honra a menos que los requisitos o las puertas de validación del trabajo no quepan en registros compactos en línea — en ese caso `create` registra por qué se requiere Full en su lugar. La selección DEBE registrar el alcance observado, las dependencias, el detalle de instrucciones requerido y las incertidumbres detrás de la elección — un juicio auditable, no una garantía que se sostenga en todos los modelos o agentes.

## Promoción y compatibilidad

Un plan Lite PUEDE ser **promovido** a Full en cualquier momento, mediante `/dwp-refine promote {plan_name}` (véase [dwp-refine](/kit/dwp-refine)). La promoción es **solo de representación**: registra la intención, escribe los archivos de tarea de destino, valida que cada requisito y puerta que llevaba el registro Lite sigan cubiertos, cambia la copia autoritativa de los registros en línea del README a los archivos de tarea, y luego borra el marcador en curso. `execute` y `resume` DEBEN negarse a continuar mientras un marcador de promoción permanezca establecido. Los IDs de tarea y la evidencia de finalización ya registrados NO DEBEN reescribirse por una promoción; el nuevo alcance descubierto durante la promoción pasa por `refine` en su lugar e invalida solo la evidencia que afecta.

La promoción nunca funciona en sentido inverso automáticamente: un plan Full no se colapsa en silencio de vuelta a Lite. Un plan redactado bajo una versión de spec anterior — incluido un plan Full v1 sin ningún campo `plan_format` — conserva su forma registrada y sigue siendo conforme; una sesión de `refine` PUEDE migrarlo deliberadamente, pero nada lo hace implícitamente.

El `plan_format` de `manifest.json` es inmutable una vez escrito; una promoción cambia el `format` de `state.json` y borra su marcador `promotion`, y nunca reescribe el manifiesto. Véase [Estado del plan](/spec/plan-state) para los campos exactos `plan_format`, `format`, `materialization`, `approval`, `promotion` y `locator`, y sus URLs de esquema v2.
