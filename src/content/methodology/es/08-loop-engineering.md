---
title: Ingeniería del ciclo
description: "Cómo un daemon iniciado por una persona mantiene planes Deep Work aprobados con registro, sucesión, avisos y notificaciones dentro de la autoridad registrada."
order: 8
lang: es
summary: El ciclo completo que mantiene un plan aprobado en marcha dentro de su autoridad registrada.
icon: repeat
---

# Ingeniería del ciclo

**Con especificación primero y el ciclo cerrado: el repositorio es el harness y el plan se ejecuta hasta terminar.** Este capítulo describe el mecanismo opcional que mantiene un plan en marcha después de su primer turno de ejecución. El plan sigue siendo la especificación duradera; el ciclo aporta continuidad, no autoridad nueva.

## Registrar el plan

Cuando está habilitado el complemento Herdr, el flujo `execute` del paquete reclama el registro de liderazgo del plan y anota una sucesión. Ese registro define el plan, el liderazgo actual, la época y el orden de sucesores que observa el ciclo. Los planes sin registro de liderazgo no se supervisan. El complemento es opcional: sin él, la metodología central sigue funcionando en una sesión o mediante coordinación humana.

Registrar el plan no aprueba el trabajo ni amplía su autorización. En v8, un plan aprobado se ejecuta hasta el final dentro de la autoridad que registra el propio plan. Sus criterios de aceptación y controles siguen vigentes durante toda la ejecución.

## Iniciar el daemon manualmente

Una persona inicia `herdr-peers autopilot --loop` en un entorno Herdr. Es un daemon local en segundo plano, no un elemento de inicio de sesión ni un servicio del sistema. Supervisa los planes registrados en las máquinas habilitadas y avisa al liderazgo inactivo para que continúe cuando el plan sigue abierto, ninguna lane trabaja y no hay respuestas pendientes. El mensaje es fijo: continuar el plan aprobado hasta terminar, respetando sus controles y la autoridad registrada.

El daemon no toca inicios de sesión, solicitudes de credenciales ni el reconocimiento de permisos de omisión de Claude. No elige rechazos, ejecuta texto libre de una pantalla ni crea permisos. Un aviso solo pide a un agente que continúe; no añade autoridad. El liderazgo sigue registrando bloqueos y respetando los controles del plan. Tras tres avisos sin progreso, el daemon deja de insistir e informa `plan_stalled`.

## Mantener el liderazgo protegido

Si el liderazgo desaparece, el daemon pide al primer sucesor disponible de la lista que ejecute el procedimiento de toma de liderazgo. El registro avanza de época y quienes lo reciben hacen cumplir el orden de sucesión. El protocolo 2 también permite nombrar un nuevo liderazgo, pero solo si una persona lo autoriza explícitamente en el plan; el daemon no puede concederse ese permiso. Antes de cualquier merge, tag o release, el liderazgo vigente ejecuta `herdr-peers lead verify --plan <id>` para comprobar el registro en las máquinas del plan.

Un sucesor hereda el plan y sus controles. La sucesión y el nombramiento no cambian los criterios de aceptación ni permiten salir de la autoridad registrada. Si el plan llega a un control que requiere intervención humana según sus reglas C1–C7, el ciclo informa la necesidad y se detiene en ese control. Las credenciales y los inicios de sesión también corresponden a una persona. Para el resto del progreso, se notifica a la persona en vez de pedirle que supervise cada paso.

## Cerebro y cola opcionales

`--brain`, si se activa, inicia un agente de decisión dedicado para los casos que las reglas del daemon no resuelven. El cerebro solo puede elegir de una lista cerrada de acciones permitidas por el plan. El daemon sigue siendo el único actor: valida la elección y realiza una acción permitida; nunca ejecuta texto libre del cerebro. Sin autorización explícita en el plan, el cerebro no actúa sobre él.

La cola usa el documento `dwp-queue-v1` en `.dwp/queue.json`. Solo el paquete puede escribirlo; el daemon es un consumidor acotado y de solo lectura. Un plan queda disponible cuando se completa la dependencia `after` (o no existe) y la aprobación sigue vigente. El daemon solo lo inicia enviando un mensaje fijo a su liderazgo ya registrado: “El plan P es el siguiente en la cola de este repositorio y está aprobado; ejecútalo hasta terminar, respetando sus controles”. Este ciclo no inicia entradas `launch`. El paquete mantiene el estado de la cola durante la ejecución y el cierre.

## Informar y observar

Los eventos del plan registran estados como en cola, iniciado, bloqueado, detenido, pérdida de liderazgo y finalización. El comando opcional `--notify` recibe un objeto `plan-event-v1` para los eventos compatibles; el notificador Dailybot del paquete los convierte en actualizaciones para el equipo. Las notificaciones informan del progreso o de un bloqueo: no autorizan acciones ni sustituyen el registro del plan.

El informe de flota y `herdr-peers fleet ui` muestran agentes y planes en distintas máquinas, incluido el trabajo que requiere atención. La interfaz es de solo lectura: no escribe estado del plan ni avisa a agentes. Ayuda a ver el estado del ciclo sin convertirse en otro plano de control.

## El límite

La ingeniería del ciclo cierra la ejecución alrededor de una especificación aprobada. Automatiza la continuación, la sucesión y los informes, mientras el plan conserva la autoridad y el daemon permanece limitado. La persona inicia el daemon, gestiona credenciales e inicios de sesión y resuelve únicamente los controles C1–C7 del plan u otras necesidades que la autoridad registrada no pueda cubrir. El objetivo es que un plan aprobado alcance su final definido sin supervisión humana constante.
