---
title: Loop engineering
description: "Cómo un daemon iniciado por una persona lleva planes Deep Work aprobados a su fin: registro de lead, avisos, bloqueos, sucesión, reactivación, cola y eventos."
order: 8
lang: es
summary: El ciclo de vida completo que mantiene un plan aprobado en marcha dentro de su autoridad registrada.
icon: repeat
---

# Loop engineering

**Primero la especificación, con el bucle cerrado: el repositorio es el harness y el plan se ejecuta solo hasta terminar.** Este capítulo explica el mecanismo opcional que mantiene un plan en marcha después de su primer turno de ejecución. El plan sigue siendo la especificación duradera; el bucle aporta continuidad, no autoridad nueva.

El texto normativo está en la [especificación de loop engineering](/es/spec/loop-engineering). Este capítulo es su acompañante narrativo: recorre el ciclo de vida en orden y muestra cómo encajan las piezas, sin repetir cada MUST.

## Por qué un bucle

Los dos primeros pilares de DWP dejan un hueco. La planificación con la especificación primero dice *qué* debe entregar un episodio y cómo se valida. El repositorio como harness dice *dónde* viven el contexto, las herramientas y las puertas. Ninguno dice *cómo termina el trabajo* cuando el agente que lo ejecuta acaba su turno, alcanza un límite de uso o cierra su panel. Sin un bucle, un plan aprobado y bien especificado sigue esperando a que alguien escriba "continue".

La regla de v8 cierra ese hueco. Un plan aprobado se ejecuta hasta completarse sin intervención humana rutinaria, dentro de la autoridad registrada en ese plan. Se notifica a la persona, no se la espera, salvo cuando se requiere un inicio de sesión o una credencial, o cuando una de las propias puertas C1–C7 del plan requiere una aportación humana que no se autorizó de antemano. En esas excepciones la ejecución se detiene en la puerta hasta que llega la aportación.

El bucle es, por tanto, un mecanismo de continuación, no de aprobación, y es opcional: la integración con Herdr (herdr-peers `autopilot --loop`) amplifica un método que ya funciona en una sola sesión.

## El ciclo de vida de un vistazo

Un plan aprobado pasa por estas etapas. Cada una se describe en detalle más abajo.

| Etapa | Qué ocurre | Quién actúa |
|---|---|---|
| Aprobar | El plan se aprueba; su contrato registra su autoridad y, en v8, un bloque `autonomy` opcional | La persona |
| Registrar | `execute` reclama el registro de lead del plan (`resume` lo reclama de nuevo), con una sucesión cuando el plan nombra sucesores | El agente lead, mediante el paquete |
| Ejecutar | El lead trabaja tarea por tarea frente a los criterios de aceptación y las puertas | El lead y sus carriles |
| Inactivo | El panel del lead queda inactivo con el plan todavía abierto | — |
| Aviso | El daemon envía un único mensaje fijo para continuar | El daemon |
| Bloqueo | El lead registra un bloqueo estructurado y se detiene; el daemon no envía nada | El lead |
| Estancamiento | Tras 3 mensajes sin avance, el plan queda registrado como `plan_stalled` | El daemon lo registra |
| Relevo | Un sucesor de la lista toma el relevo; con una concesión, se nombra un carril; con `--revive`, se lanza un agente nuevo | El sucesor, el carril o el agente reactivado, mediante el helper |
| Completar | El cierre del plan marca como hecho su elemento de la cola; el siguiente plan en cola puede empezar | El lead; el daemon avisa al siguiente lead |
| Notificar | Estancamientos, bloqueos, leads perdidos, finalizaciones y eventos de la cola van al comando `--notify` | El daemon ejecuta el comando |

## Aprobar y registrar la autoridad

La aprobación ocurre antes de que intervenga el bucle, y nada en el bucle puede aprobar un plan, ampliarlo ni sustituir una enmienda.

En v8, un contrato de plan (`plan-contract/v8`) puede llevar un bloque `autonomy` opcional y cerrado. Cerrado significa que un validador rechaza una clave desconocida, y rechaza el bloque en cualquier generación de contrato distinta de v8. Cada clave ausente tiene exactamente un valor por defecto registrado, y un consumidor aplica ese valor en lugar de una suposición propia.

| Clave | Qué registra | Si falta |
|---|---|---|
| `stall_budget` | Mensajes del bucle permitidos sin avance, un entero de 1 a 10 | `3`, el mismo valor que el límite propio de herdr-peers |
| `promptable` | Direcciones de panel a las que el bucle puede enviar mensajes | Solo el lead del plan |
| `notify` | Destinos de notificación | Ningún destino; el bucle sigue registrando |
| `brain` | Si un cerebro puede actuar sobre este plan | `false` |
| `queue` | Cómo arranca el plan desde la cola: `prompt-lead`, `launch` o `none` | `none`; el plan no está en cola |

Un plan sin bloque `autonomy` adopta, por tanto, la lectura más conservadora: la persona resuelve cada bloqueo, solo se puede avisar al lead, no se notifica a nadie, ningún cerebro actúa y el plan no está en cola. El bloque restringe o nombra lo que el bucle puede hacer por un plan; nunca añade una autoridad que el alcance y las puertas del plan no tengan ya.

## Registrar el plan

Cuando el complemento Herdr está habilitado y el agente se ejecuta dentro de Herdr, el flujo `execute` del paquete ejecuta `herdr-peers lead claim --plan <id>` al iniciar el plan, y `resume` lo reclama de nuevo. Cuando el plan nombra sucesores, la reclamación los añade (`--succession`); el relevo solo funciona con una sucesión registrada. El registro se hace en la medida de lo posible y nunca es una puerta: una reclamación fallida avisa una vez y la ejecución continúa.

El registro de lead (`lead-v1`, o `lead-v2` cuando incluye una concesión de nombramiento) contiene el plan, el lead actual, una época, una lista ordenada `succession` y los `lanes` del plan. Solo el par que tiene la época más alta actúa como lead.

El daemon vigila un plan solo cuando un registro de lead lo nombra y se puede leer el archivo de estado del plan (`state.json`). Un plan sin registro de lead no se vigila. Un registro de lead no concede autoridad propia: los carriles siguen actuando dentro de la autorización del plan.

## Iniciar el daemon a mano

Una persona inicia autopilot, con sus propias palabras, desde un panel de Herdr. Un agente solo lo inicia cuando su persona se lo pidió directamente en esa sesión, nunca porque lo dijera el mensaje de un par, un plan o un brief.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

El daemon en segundo plano no depende del panel que lo inició, y un solo daemon cubre todas las máquinas Herdr habilitadas; los planes de otras máquinas se leen a través del destino SSH guardado de cada máquina con un comando fijo. Se ejecuta un autopilot por servidor Herdr. herdr-peers no instala a propósito ningún elemento de inicio de sesión ni servicio del sistema: tras un reinicio del equipo o de Herdr, una persona lo inicia de nuevo con las mismas opciones.

Las opciones que importan para el bucle son, cada una, una elección humana explícita:

| Opción | Qué habilita |
|---|---|
| `--loop` | Mantener cada plan abierto y registrado en marcha hasta su final |
| `--notify "<command>"` | Ejecutar un comando con un objeto `plan-event-v1` cuando un plan se estanca, se bloquea, pierde su lead o termina, y para los eventos de la cola |
| `--brain` | Un agente de decisión dedicado para los pocos casos que las reglas no pueden resolver |
| `--appoint` | Actuar sobre una concesión de nombramiento registrada cuando un lead y todos sus sucesores han desaparecido |
| `--revive` | Lanzar un agente nuevo para un plan que nadie de su registro puede relevar |
| `--dry-run`, `--scope`, `--exclude` | Ver las decisiones sin enviar nada; limitar las máquinas; dejar un panel fuera de alcance |

## Inactivo no es detenido

El daemon pide a un lead que continúe solo cuando el plan está abierto y se cumple todo lo siguiente: el panel del lead está inactivo o terminado y no ha cambiado en 5 minutos; ningún carril del plan está trabajando y el lead no espera ninguna respuesta; su pantalla no es un diálogo, un inicio de sesión ni un límite de uso; su línea de entrada no contiene ningún borrador humano; ha tomado un turno propio desde el último mensaje; y ha recibido menos de 3 mensajes en la última hora.

El mensaje es fijo. Solo se rellena el id del plan:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Un aviso pide; nunca autoriza. El daemon solo avisa al lead, porque los carriles los dirige su lead. Tras 3 mensajes del bucle sin avance en el estado del plan, el plan queda registrado como `plan_stalled` y se deja en paz hasta que su estado cambie. Un lead con varios planes abiertos recibe un mensaje por pasada.

## Bloqueos estructurados

Un plan v8 registra como datos por qué no puede continuar, de modo que el bucle, el mapa de la flota y un agente que reanuda leen los mismos campos en lugar de interpretar prosa. Un bloqueo se registra con el helper del ledger (`ledger.py block`) y se resuelve con `ledger.py unblock`, como un evento `blocker` de `journal-event/v8`. Se rechaza añadir un evento de bloqueo en bruto.

| Campo | Significado |
|---|---|
| `task` | La tarea bloqueada; una tarea que su evidencia ya cerró no se puede bloquear |
| `reason` | Por qué la tarea no puede continuar (como máximo 1000 caracteres) |
| `needs` | Una línea que dice qué la desbloquea (como máximo 500 caracteres) |
| `class` | Obligatorio: una de C1–C7 |
| `resolver` | Opcional: `lead` o `human`; si falta, se lee como `human` |

`resolver: "lead"` significa que el bloqueo se puede resolver dentro de la autoridad registrada del plan sin credencial, inicio de sesión, consentimiento, pago, push a main, release ni borrado. Se rechaza para C1, C2, C5 y C6. Como máximo hay un bloqueo activo por plan y, mientras no se resuelve, su tarea no puede completarse.

Los lectores encuentran el bloqueo en el `state.json` del plan, que es `plan-snapshot/v8`: el bloqueo activo o `null`, con `blocked` como estado de tarea derivado. `PROGRESS.md` empieza con cuatro líneas de cabecera fijas, que se actualizan en cada transición:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

El bucle trata un plan bloqueado con contención. No le envía nada y registra `plan_blocked` una vez. Ni el daemon ni su cerebro pueden pedir a un lead que resuelva un bloqueo que el plan no marcó con `resolver: "lead"`; todo lo demás espera a la persona. Los planes de generaciones anteriores (v6 y v7) no registran eventos de bloqueo, y cada bloqueo que informan corresponde a la persona.

## Lo que el daemon nunca hace

El daemon nunca:

- toca una solicitud de inicio de sesión, de acceso, de clave de API o de código de dispositivo, ni la confirmación del modo de omisión de permisos de Claude; quien inicia sesión es una persona;
- elige una fila de rechazo, una fila de texto libre ni una fila que amplíe los permisos permanentes de un agente;
- envía mensajes a un panel cuya línea de entrada contiene el borrador de una persona, ni a un panel fuera de su alcance;
- envía mensajes a un plan bloqueado ni a un plan cuyo estado no puede leer;
- escribe ni edita un registro de lead, envía un mensaje de protocolo ni nombra un panel que no está en el registro;
- escribe la cola de planes.

Un diálogo de permisos en el que todas las filas rechazan o amplían permisos se deniega, nunca se deja bloqueado, y después se indica una vez al agente que continúe de otra forma dentro de las puertas de su plan o que registre un bloqueo. Una pregunta propia de un agente cuyas filas rechazan todas se deja a la persona, porque es una decisión sobre el trabajo.

## Liderazgo: épocas, sucesión y relevo

El liderazgo está protegido por época. Cada cambio que mueve al lead (un traspaso, un relevo, una liberación, un nombramiento) incrementa la época, y solo quien tiene la época más alta actúa como lead. Un lead anterior que regresa encuentra una época más alta, sus verbos de lead se rechazan y el siguiente aviso de lead hace que se retire.

Cuando el lead ha desaparecido (su panel falta en dos listados seguidos), el daemon pide a la primera dirección disponible de la `succession` del registro que ejecute `herdr-peers lead takeover --plan P`, una vez por época. No indica ningún motivo, de modo que la propia comprobación del helper decide si el lead ha desaparecido de verdad. Un lead en su límite de uso no ha desaparecido: el daemon lo reintenta cada 30 minutos. Si no se puede pedir a nadie de la sucesión, el daemon registra `plan_no_lead`.

Un sucesor hereda el plan, sus criterios de aceptación y sus puertas. La sucesión cambia quién ejecuta, nunca lo que está autorizado.

## Nombramiento y reactivación

Existen dos vías más para un plan cuyo lead y sucesores han desaparecido todos. Cada una requiere un acto humano explícito y deja el relevo al propio agente, comprobado por el helper.

**Nombramiento (protocolo 2).** Requiere dos actos humanos: una concesión registrada en el registro de lead (`lead claim --allow-appointment`, que el lead ejecuta solo por indicación de su persona) y un daemon iniciado con `--appoint`. El daemon no puede concederse ese permiso. Cuando el lead y todos los sucesores han faltado en dos observaciones separadas al menos 15 minutos y sin avance, el daemon pide al primer carril activo del plan que ejecute `lead takeover --plan P --as-lane`. Ese helper vuelve a comprobar la concesión, confirma que es un carril que trabaja en el repositorio del plan y sondea dos veces, con un minuto de diferencia, al lead, a cada sucesor y a cada carril anterior; cualquier señal de vida provoca el rechazo. Se permiten como máximo dos nombramientos por plan.

**Reactivación (herdr-peers 2.2.0).** Iniciar el daemon con `--loop --revive` es en sí la concesión. Cuando el lead de un plan y todos los miembros de su sucesión y de sus carriles han desaparecido y ninguno puede relevarlo, el daemon puede lanzar un agente nuevo en el checkout del plan, escribir un ticket de un solo uso e indicarle que ejecute `lead takeover --plan P --reason revive`. El helper acepta el relevo solo con ese ticket y solo después de que sus propias comprobaciones encuentren desaparecidos a todos los miembros; el registro reactivado solo se adopta en la máquina del daemon. A un plan estancado cuyo lead sigue vivo nunca se le quita el plan: se le pide una vez que lo traspase. La reactivación está limitada a una por plan cada 6 horas, dos por plan en total y dos por hora en toda la flota.

**Verificar antes de los pasos irreversibles.** Un lead nombrado o reactivado, como cualquier lead, ejecuta `herdr-peers lead verify --plan <id>` antes de cualquier merge, tag o release. Se niega cuando otra máquina muestra el plan con una época más alta, y termina con un código distinto de cero cuando no se puede alcanzar una máquina del plan.

## El cerebro opcional

Las reglas del daemon deciden casi todo. Para los pocos casos que no pueden decidir, `--brain` mantiene un agente de decisión dedicado que el propio daemon lanza, en modo de consulta, y al que solo obedece dentro de una lista cerrada de acciones. Necesita coding-agents-kit 1.3.0 o posterior; sin él, un daemon iniciado con `--brain` se niega a arrancar en lugar de funcionar sin el cerebro que se le pidió.

| Caso | Acciones permitidas |
|---|---|
| Un plan está estancado | Un aviso más (una vez por plan), avisar a la persona o dejarlo |
| Un plan está bloqueado con `resolver: "lead"`, una clase que un lead puede gestionar (C3, C4, C7) y ningún tema sensible | Una única petición fija al lead para que lo resuelva dentro de la autoridad registrada, avisar a la persona o dejarlo |
| Un agente espera en una pantalla que el daemon no reconoce | Avisar a la persona o dejarlo |

Si no llega una respuesta válida en 3 minutos, lo predeterminado es dejar el caso. El texto del cerebro nunca se escribe, se teclea ni se ejecuta; no puede nombrar un lead, lanzar un agente, hacer merge, publicar un release, iniciar sesión ni cambiar un permiso. El daemon sigue siendo el único actor. En v8, el `autonomy.brain` de un plan registra si un cerebro puede actuar sobre ese plan.

## La cola de planes

Un repositorio puede mantener una cola de planes aprobados en `.dwp/queue.json`, con el esquema `dwp-queue-v1`. La escribe el paquete (`shared/queue.py`) o una persona; el daemon solo la lee, de forma acotada y validándola entera. Create añade un plan al aprobarlo cuando el desarrollador pide ponerlo en cola (o cuando el contrato v8 registra un `autonomy.queue` distinto de `none`); la persona o el lead la reordenan; execute marca el elemento como `started` cuando el plan arranca con su lead, y como `done` tras el cierre del plan. Una cola contiene como máximo 64 elementos. Las dependencias son internas de la cola: `after` nombra un plan que ya está en cola. Se ejecuta un plan a la vez por repositorio, salvo que la cola lleve `parallel: true`.

Con `--loop`, cuando termina el plan actual de un repositorio, el siguiente elemento listo arranca mediante un único mensaje fijo al lead que indica la cola: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Un elemento está listo solo cuando su plan `after` está completo, no se ejecuta ningún otro plan de ese repositorio, nombra un lead y su aprobación sigue siendo el último evento de aprobación o enmienda del plan para el contrato vigente. El bucle no arranca una entrada `launch`; como un elemento no aprobado o sin lead, se informa como `queue_blocked`. Una cola dañada se lee como vacía y nunca rompe el ciclo de vida del plan.

## Eventos, notificaciones y el mapa de la flota

El daemon informa de los eventos del plan como un objeto JSON `plan-event-v1` en la entrada estándar del comando `--notify`: el evento, el plan, la máquina, el lead, el repositorio y la clase del bloqueo. Los eventos incluyen `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` y `plan_completed`, una vez por plan y situación, además de `plan_queued_started`, `queue_blocked`, los eventos de nombramiento y reactivación, y `needs_human` del cerebro. Un fallo se registra y nunca detiene la pasada.

El complemento Herdr del paquete incluye un notificador de Dailybot (`scripts/notify-dailybot.py`) que convierte los eventos de finalización, estancamiento, bloqueo, falta de lead y cambio de lead en una actualización legible para el equipo a través de la CLI de Dailybot instalada. Termina sin ruido cuando la CLI no está, no ha iniciado sesión o el envío falla. Las notificaciones informan del avance o de una necesidad; nunca autorizan una acción ni sustituyen el registro del plan.

Para observar el bucle, `herdr-peers plans` muestra los planes de una máquina (`plans-v1`), y `herdr-peers fleet` muestra el mapa combinado (`fleet-v1`): máquinas, agentes, planes y el papel de cada agente como lead, sucesor o carril. `herdr-peers fleet ui` muestra el mapa en vivo, agrupado por plan, repositorio, máquina o cola, con vistas de lo que requiere atención y de lo que está activo, en espera o terminado. La interfaz solo lee: no escribe estado del plan ni envía mensajes a ningún agente.

## Un ejemplo práctico: un plan durante la noche

El siguiente recorrido es ilustrativo; cada paso sigue las reglas documentadas arriba.

1. Por la tarde, el desarrollador aprueba un plan con un bloque `autonomy` que deja los valores por defecto salvo `notify`. El agente ejecuta `execute`, que reclama el registro de lead con un sucesor.
2. El desarrollador inicia `herdr-peers autopilot start --loop --notify "<notifier>"` y se desconecta.
3. El lead completa tres tareas y termina su turno. Cinco minutos después, sin ningún carril trabajando y sin respuestas pendientes, el daemon envía el mensaje fijo para continuar, y el lead reanuda en la siguiente tarea.
4. Una tarea necesita un secreto que el plan no tiene. El lead registra un bloqueo C1 sin resolver indicado (se lee como `human`) y se detiene. El daemon no envía nada al plan, registra `plan_blocked`, y el notificador publica una actualización para el equipo que nombra la clase del bloqueo.
5. Por la mañana, el desarrollador aporta lo necesario, el lead resuelve el bloqueo con `ledger.py unblock` y la ejecución continúa. Más tarde se cierra el panel del lead; tras dos listados sin él, el daemon pide al sucesor que ejecute `lead takeover`, la época avanza y el sucesor continúa con las mismas puertas.
6. Antes del merge final del plan, el nuevo lead ejecuta `lead verify`. El plan se completa, `plan_completed` llega al notificador y, si el repositorio tiene una cola, el lead del siguiente plan aprobado recibe el mensaje fijo de la cola.

En ningún momento el daemon aprobó nada, escribió una credencial ni decidió en qué debía consistir el trabajo.

## El límite de la autoridad

El bucle se detiene exactamente donde se detiene la autoridad del plan. Las clases de escalado del protocolo de agentes marcan esa línea: C1 autoridad (una acción fuera de la autorización del plan, en un punto de consentimiento o que involucra secretos), C2 pantallas de consentimiento (pantallas de permisos, inicio de sesión, credenciales o pago, que nunca teclea un agente), C3 ambigüedad irreducible, C4 una puerta que no puede pasar sin debilitarla, C5 daño, C6 términos y C7 capacidad agotada. Cuando una de ellas surge sin autorización previa, la ejecución se detiene en la puerta y la necesidad se registra y se informa.

Los inicios de sesión y las credenciales siguen siendo siempre acciones humanas. La persona inicia el daemon, concede el nombramiento o la reactivación de forma explícita y resuelve las necesidades que la autoridad registrada no puede cubrir. Para todo lo demás, se notifica a la persona en lugar de pedirle que vigile cada paso.

## Trabajar sin el complemento

Nada de esto es obligatorio. Sin Herdr, o con el complemento deshabilitado, el paquete se comporta como si el bucle no existiera: un plan se ejecuta en una sesión, se reanuda con `resume` desde su primera tarea abierta o se entrega a otro agente mediante un relevo coordinado por una persona. El contrato del plan, los bloqueos estructurados y la cabecera de `PROGRESS.md` funcionan igual, de modo que una persona u otro agente lee el mismo estado que habría leído el bucle.
