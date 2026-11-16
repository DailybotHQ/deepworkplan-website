---
title: Ingeniería del ciclo (loop engineering)
description: "Semántica normativa del ciclo v8: autoridad registrada, continuidad iniciada por una persona, sucesión, bloqueos, cola, notificaciones y visibilidad de flota."
order: 12
lang: es
section: Ingeniería del ciclo
---

# Ingeniería del ciclo (loop engineering)

Esta página define el contrato del plan para la ingeniería del ciclo. El **plan** sigue siendo la autoridad; el ciclo aporta continuidad y visibilidad. Los complementos pueden ampliar el método, pero no la autoridad registrada de un plan.

## 1. La regla de v8

Un plan aprobado se ejecuta hasta el final sin una persona. La autonomía es la regla **dentro de la autoridad registrada en el plan**; se notifica a la persona, sin hacerla esperar, excepto por inicios de sesión y credenciales. Los controles C1–C7 del propio plan (como publicación, push o mensajes externos) siguen deteniendo el trabajo salvo que el plan registre una autorización previa. Se mantiene la regla de v7: la metodología funciona por sí sola; los complementos solo la amplían.

### 1.1. Semántica del ciclo

### Registro y observación
Con el complemento Herdr habilitado, el flujo `execute` del paquete v8 reclama un registro de liderazgo y anota la sucesión del plan. Solo se supervisa un plan con registro de liderazgo y estado legible. Una persona inicia `herdr-peers autopilot --loop`; es un daemon, no un elemento de inicio de sesión ni un servicio del sistema. Un daemon puede observar planes informados por todas las máquinas Herdr habilitadas. Un plan sin registro de liderazgo no se supervisa.

### Continuación, estancamiento y relevo

Para un plan abierto, el daemon avisa únicamente al liderazgo y solo cuando pasan los controles de inactividad: lleva cinco minutos inactivo o terminado, ninguna lane trabaja, no hay respuestas pendientes, el panel está dentro del alcance y no está excluido, y no muestra diálogos, inicio de sesión, límite de uso ni un borrador humano en la línea de entrada. El mensaje es fijo y pide continuar hasta el final respetando los controles y la autoridad registrada. El aviso no concede autoridad. Tras tres avisos sin avance en el estado del plan, registra `plan_stalled` y lo deja quieto hasta que cambie el estado. Un plan bloqueado se informa, no recibe avisos.

Si el liderazgo desaparece, el daemon pide al primer sucesor disponible de la lista que ejecute `herdr-peers lead takeover --plan <id>`. El helper verifica la sucesión y aumenta la época; el daemon no escribe el registro ni elige un panel no listado. Un límite de uso por sí solo no demuestra que el liderazgo desapareció. El protocolo 2 también permite nombrar un liderazgo entre las lanes del plan, pero solo si una persona registra explícitamente el permiso con `lead claim --allow-appointment` e inicia el daemon con `--appoint`. Antes de cualquier merge, tag o release, el liderazgo activo ejecuta `herdr-peers lead verify --plan <id>`.

### Brain, eventos y flota

El `--brain` opcional inicia un agente de decisión dedicado para los casos que las reglas del daemon no resuelven. Solo puede elegir de una lista cerrada de acciones. El daemon sigue siendo el único actor: valida una opción permitida y realiza la acción; nunca ejecuta texto libre del brain. El bloque `autonomy` del plan también debe permitir el brain.

El ciclo registra eventos del plan, como estancamientos, bloqueos, pérdida del liderazgo, finalización y resultados de la cola. Con la integración opcional `--notify`, el daemon envía un objeto `plan-event-v1` al notificador configurado; el notificador Dailybot del paquete convierte los eventos admitidos en actualizaciones para el equipo. Una notificación no aprueba trabajo ni cambia el registro del plan. El mapa de flota y `herdr-peers fleet ui` muestran agentes y planes en varias máquinas. La interfaz es de solo lectura: no cambia el estado ni avisa a agentes. El comportamiento etiquetado está documentado en [autopilot de herdr-peers v2.1.0](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md) y su [protocolo](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md).

## 2. El bloque `autonomy` (plan-contract/v8)

El objeto superior opcional `autonomy` es cerrado: las claves desconocidas no son válidas. Los nombres y tipos canónicos están en el [esquema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Si falta el bloque, se aplican todos los valores predeterminados. Si está presente, cada campo omitido conserva su propio valor predeterminado; un consumidor NO DEBE adivinar.

| Campo | Tipo y valores permitidos | Valor predeterminado si se omite |
|---|---|---|
| `stall_budget` | Entero de 1 a 10 | `3` avisos sin progreso |
| `promptable` | Lista no vacía de direcciones de panel Herdr | Solo el liderazgo del plan |
| `notify` | Lista no vacía; actualmente `dailybot` | Ningún destino; el ciclo registra eventos |
| `brain` | Booleano | `false`; ningún brain puede actuar sobre el plan |
| `queue` | `prompt-lead`, `launch` o `none` | `none`; el plan no está en cola |

Una dirección de panel usa la forma exacta de Herdr: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. El ID de máquina no puede empezar con `-`. Estos valores limitan quién puede recibir avisos y eventos, si un brain puede actuar y cómo participa el plan en una cola. No cambian los criterios de aceptación ni los controles.

## 3. Bloqueos estructurados
### 3.1. Registro del bloqueo

### 3.2. Dónde se encuentra
Un plan bloqueado registra una clase C y un campo `resolver` opcional en el registro `blocked` o `blocker` de `state.json`. `resolver` puede ser `lead` o `human`; si se omite, significa `human`. `lead` significa que el bloqueo se resuelve dentro de la autoridad registrada, sin credenciales, inicio de sesión, consentimiento, pago, push a main, release ni eliminación. El ciclo, incluido el brain, solo puede pedir al liderazgo resolver bloqueos marcados `lead`. Los demás se notifican a la persona y no se sortean con avisos.
### 3.3. Qué puede hacer el ciclo

El mapa de flota etiquetado de herdr-peers puede mostrar hasta 14 líneas del `PROGRESS.md` del plan como resumen depurado. Es un dato de observación, no una concesión de autoridad ni un esquema publicado de encabezado legible por máquinas. La forma de encabezado planeada en la línea v8 del paquete debe verificarse contra la etiqueta 8.0.0 antes de considerarla normativa.

## 4. La cola de planes

La cola es `.dwp/queue.json` con esquema `dwp-queue-v1`. Solo el paquete la escribe: `create` agrega un plan al aprobarlo; la persona o el liderazgo reordenan mediante el flujo del plan; `execute` marca `started` al reclamar el liderazgo (con su dirección); la finalización marca `done`; `create` o `refine` pueden marcar `skipped` con una nota de una línea. Cada elemento contiene plan, dependencia `after` opcional que nombra un plan ya en cola, estado, liderazgo y modo de inicio. Un repositorio ejecuta un plan a la vez salvo que la cola indique expresamente `parallel: true`.

El daemon es un consumidor acotado y de solo lectura. Una cola inválida se trata como vacía sin interrumpir la ejecución. Un plan en cola puede iniciarse solo cuando terminó su dependencia (o no existe), está aprobado, tiene liderazgo asignado y no hay otro plan activo en el repositorio salvo que se habilite paralelismo. El modo `prompt-lead` envía al liderazgo nombrado un único mensaje fijo: «El plan P es el siguiente en la cola de este repositorio y está aprobado; ejecútalo hasta terminar, respetando sus controles». El daemon no escribe el estado de la cola. Este ciclo no ejecuta el modo `launch` salvo que el contrato publicado añada explícitamente esa conducta.

## 5. Lo que v8 conserva

V8 conserva el contrato v7 para `tasks[].parallel_safe`, la delegación y el journal. El conjunto de eventos del journal v8 sigue siendo el de v7; la escala de generaciones es ordenada, por lo que las funciones marcadas como v7 siguen disponibles en v8 y posteriores. En la capa de registros, v8 conserva las URL de esquema del manifiesto y de eventos del journal v7 y añade únicamente la URL `plan-contract/v8` para la nueva generación. Los planes v5, v6 y v7 mantienen su generación registrada y no se migran en silencio.

V8 no hace obligatorios los complementos. Sin Herdr, los planes siguen ejecutándose dentro de su autoridad registrada mediante la metodología central. Con Herdr, el registro, la continuación acotada, la sucesión, las notificaciones, la cola y la vista de flota de solo lectura amplían el mismo ciclo de vida del plan.
