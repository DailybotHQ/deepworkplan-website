---
title: Loop engineering
description: "Cómo un daemon iniciado por una persona mantiene en marcha los planes Deep Work aprobados con registro, sucesión, avisos y eventos dentro de su autoridad."
order: 8
lang: es
summary: El ciclo de vida completo que mantiene un plan aprobado en marcha dentro de su autoridad registrada.
icon: repeat
---

# Loop engineering

**Primero la especificación, con el bucle cerrado: el repositorio es el harness y el plan se ejecuta solo hasta terminar.** Este capítulo describe el mecanismo opcional que mantiene un plan en marcha después de su primer turno de ejecución. El plan sigue siendo la especificación duradera; el bucle aporta continuidad, no autoridad nueva.

## Registrar el plan

Cuando el complemento Herdr está habilitado, el flujo `execute` del paquete reclama el registro de lead del plan (y `resume` lo reclama de nuevo), y añade una sucesión cuando el plan nombra sucesores; el relevo automático solo funciona con una sucesión registrada. Ese registro le da al bucle un plan preciso, el lead actual, la época y el orden de sucesores que debe observar. Los planes sin registro de lead no se vigilan. El complemento sigue siendo opcional: sin él, la metodología central funciona igual en una sesión o mediante un relevo coordinado por una persona.

Registrar el plan no aprueba el trabajo ni amplía la autorización del plan. En v8, un plan aprobado se ejecuta hasta su final dentro de la autoridad registrada en ese plan. Sus criterios de aceptación y sus puertas siguen siendo vinculantes durante toda la ejecución.

## Iniciar el daemon a mano

Una persona inicia `herdr-peers autopilot --loop` en un entorno Herdr. Es un daemon local en segundo plano, no un elemento de inicio de sesión ni un servicio del sistema. Vigila los planes registrados en las máquinas habilitadas y avisa a un lead inactivo para que continúe cuando su plan sigue abierto, ningún carril está trabajando y no hay ninguna respuesta pendiente. El mensaje es fijo: continuar el plan aprobado hasta su final respetando sus puertas y la autoridad registrada.

El daemon no toca inicios de sesión, solicitudes de credenciales ni la confirmación del modo de omisión de permisos de Claude. Nunca elige un rechazo, una opción de texto libre ni una fila que amplíe los permisos de un agente. Un aviso solo pide a un agente que continúe; no añade autoridad. El lead sigue registrando los bloqueos y respetando las puertas del plan. Tras tres avisos sin avance, el daemon deja de avisar e informa `plan_stalled`.

## Mantener el liderazgo protegido

Si el lead desaparece, el daemon pide al primer sucesor de la lista que esté disponible que ejecute el procedimiento de relevo. El registro de lead avanza de época, y los receptores hacen cumplir el orden de sucesión. El protocolo 2 también admite el nombramiento de un lead, pero solo cuando la persona ha registrado la concesión en el plan (`lead claim --allow-appointment`) y ha iniciado el daemon con `--appoint`; el daemon no puede concederse ese permiso. Antes de cualquier merge, tag o release, el lead actual ejecuta `herdr-peers lead verify --plan <id>` para comprobar el registro en todas las máquinas del plan.

Un sucesor hereda el plan y sus puertas. Ni la sucesión ni el nombramiento cambian los criterios de aceptación ni permiten trabajo fuera de la autoridad registrada. Si el plan llega a una puerta que requiere una acción humana según sus reglas C1–C7, el bucle informa de la necesidad y se detiene en esa puerta. Las credenciales y los inicios de sesión también siguen siendo acciones humanas. Para el resto del avance, se notifica a la persona en lugar de pedirle que vigile cada paso.

## Cerebro y cola opcionales

La opción `--brain` inicia un agente de decisión dedicado para los casos que las reglas del daemon no pueden resolver. Necesita coding-agents-kit 1.3.0 o posterior; sin él, un daemon iniciado con `--brain` se niega a arrancar. El cerebro solo puede elegir de una lista cerrada de acciones que el daemon fija para cada caso: un aviso más, una única petición fija al lead para que resuelva un bloqueo que el plan marca como resoluble por el lead, avisar a la persona o dejarlo como está. El daemon sigue siendo el único actor: valida la elección y realiza una acción admisible; nunca ejecuta texto libre del cerebro. En v8, un plan registra además en su bloque de autonomía si un cerebro puede actuar sobre él.

La cola de planes usa el documento `dwp-queue-v1` en `.dwp/queue.json`. La herramienta de planes lo escribe; el daemon es un consumidor acotado y de solo lectura. Un plan en cola pasa a ser elegible cuando su dependencia `after` está completa (o no existe) y su aprobación sigue vigente. El daemon solo lo inicia enviando un único mensaje fijo al lead que indica la cola: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Este bucle no lanza las entradas `launch`. El paquete mantiene el estado de la cola a medida que avanzan la ejecución y el cierre.

## Informar y observar

Los eventos del plan cubren un plan que se estanca, se bloquea, pierde su lead o termina, y un plan en cola que arranca o no puede arrancar. El comando opcional `--notify` recibe un objeto `plan-event-v1` para los eventos admitidos; el notificador de Dailybot del paquete los convierte en actualizaciones para el equipo. Las notificaciones informan del avance o de un bloqueo; no autorizan ninguna acción ni sustituyen el registro del plan.

El informe de la flota y `herdr-peers fleet ui` muestran agentes y planes en varias máquinas, incluido el trabajo que requiere atención. La interfaz es de solo lectura: no escribe estado del plan ni envía mensajes a ningún agente. Ayuda a una persona a ver el estado del bucle sin convertirse en otro plano de control.

## El límite

El loop engineering cierra el bucle de ejecución alrededor de una especificación aprobada. Convierte en rutina la continuación, la sucesión y los informes, mientras el plan sigue siendo la autoridad y el daemon permanece acotado. La persona inicia el daemon, gestiona credenciales e inicios de sesión y resuelve solo las puertas C1–C7 del propio plan u otras necesidades que la autoridad registrada no puede cubrir. El objetivo del bucle es que un plan aprobado alcance su final definido sin que una persona tenga que vigilarlo.
