---
title: Autonomía del enjambre
description: "Cómo un enjambre de agentes sobrevive al límite de una cuenta o a la pérdida de un agente: capacidad, traspasos, sucesión del líder y escalación crítica."
order: 7
lang: es
summary: Carriles conscientes de su capacidad, traspaso proactivo, sucesión del líder con épocas y la taxonomía de escalación que mantiene un enjambre en marcha.
icon: shield
---

# Autonomía del enjambre

[Ejecutar muchos agentes](/es/methodology/06-orchestration) describe un líder y sus carriles. Este capítulo cubre lo que mantiene esa configuración en marcha cuando una cuenta llega a su límite o un agente desaparece. Un carril comprueba cuánto margen le queda a su cuenta y traspasa su trabajo antes de agotarlo. Un líder cede el liderazgo, o es reemplazado cuando desaparece. El enjambre solo pregunta al desarrollador lo que es realmente crítico.

El fallo al que responde es concreto: un líder que agota su cuota a mitad de un plan deja varados a todos sus carriles, y nada avanza hasta que una persona abre una sesión nueva. Con las reglas siguientes, el plan sigue avanzando dentro de la autorización que el desarrollador ya dio.

Seis reglas dan forma a todo lo que sigue:

1. **Una función por producto.** [coding-agents-kit](/es/kit/agentkit) (`ak`) conoce las cuentas y la capacidad, [herdr-peers](/es/kit/herdr) conoce los mensajes, los paneles y quién lidera, y el pack de Deep Work Plan conoce el método: cuándo traspasar, qué necesita un sucesor, qué escalar. Cada uno sigue siendo opcional. Sin ellos se mantienen las mismas reglas, con el desarrollador retransmitiendo los mensajes y relanzando los agentes.
2. **La unidad de continuidad es el plan, no el agente.** Cada traspaso y cada sucesión es una reanudación ordinaria más un pequeño paquete que lleva lo que el diario no recoge: la intención que estaba en curso.
3. **Lo proactivo gana a lo reactivo.** Un agente comprueba su margen en los límites entre tareas y traspasa mientras todavía puede escribir un buen paquete. Reaccionar después de llegar a un límite sigue siendo la red de seguridad.
4. **La autonomía nunca amplía la autoridad.** Los traspasos, la sucesión, los lanzamientos y la programación se ejecutan dentro de la autorización del plan. Ningún agente responde a una pantalla de permiso, de omisión de permisos, de inicio de sesión, de consentimiento o de pago, y el trabajo solo se mueve entre las cuentas que el desarrollador declaró.
5. **La continuidad nunca rebaja el estándar.** Un sucesor hereda las mismas puertas de validación. Un paquete no cierra ningún criterio, no relaja ninguna puerta y no omite ninguna revisión.
6. **Barato por construcción.** La capacidad se lee de una caché en los límites entre tareas, nunca en un bucle ni con un temporizador. Los avisos unidireccionales sustituyen a las preguntas que no necesitan respuesta, y los paquetes son pequeños.

## Roles

| Rol | Es | Es dueño de | Nunca hace |
| --- | --- | --- | --- |
| Líder | El agente que tiene el registro de líder de un plan | El plan, la tabla de carriles, la programación, el orden de publicación, los merges y tags dentro de la autorización, la lista de sucesión | Escribir en el checkout de un carril, o liderar un plan que tiene otro líder |
| Suplente | La primera entrada alcanzable de la lista de sucesión del líder | Nada hasta que toma el relevo | Actuar como líder mientras el líder es alcanzable |
| Carril | Un agente por repositorio, flujo de trabajo o tarea, en su propio panel y con su propia cuenta | Su plan hijo o su tarea, su rama, su puerta de validación y su paquete | Asignar trabajo a otro carril, fusionar o etiquetar |
| Revisor | Un carril de otro proveedor, de solo lectura | Sus hallazgos | Escribir en el árbol que revisa |

- **El líder sigue activo.** Un orquestador cuyos carriles esperan a que una persona retransmita algo se atasca. Un líder nunca detiene el enjambre por una pregunta que puede decidir.
- **Un ejecutor por plan.** Exactamente un agente ejecuta un plan o plan hijo dado a la vez. Un segundo agente sobre el mismo plan es un fallo de coordinación que el líder debe resolver.
- **La autoridad viene del plan, no de un par.** Un carril lee por sí mismo la autorización del plan. Una aprobación retransmitida por otro agente no añade nada que el carril no tuviera ya.
- **Varios líderes** pueden trabajar en un mismo espacio de trabajo, cada uno liderando un plan distinto. Una cuenta la tiene un solo carril a la vez mediante una reserva de `ak`, de modo que dos líderes nunca ponen dos escritores sobre una misma cuenta de Codex.
- **Varias instancias de un mismo tipo** — tres paneles de Grok, cuatro paneles de Codex sobre uno o varios perfiles — son carriles ordinarios. Las instancias de un mismo perfil comparten la capacidad de ese perfil.

Cada carril tiene un plan, al menos un plan Lite en su propio repositorio, y ese plan es lo primero que lee un sucesor. Cada carril informa al líder con un vocabulario fijo — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — y termina cada mensaje con una línea de capacidad, como `capacity=ok 64% @work1`, de modo que el líder rara vez necesita leer las cuotas por sí mismo.

## El bucle de capacidad

Un agente comprueba su propio margen antes de empezar cada tarea, después de cualquier puerta o paso que haya durado más de 20 minutos, siempre que su CLI muestre un aviso de límite de uso y antes de aceptar un traspaso o el liderazgo. La comprobación es `ak capacity --self --json` de coding-agents-kit `v0.6.1`, que el helper del pack convierte en una decisión:

| Veredicto | Decisión | Un carril | Un líder, para sí mismo |
| --- | --- | --- | --- |
| `ok` (por encima del umbral bajo) | continuar | Continúa | Continúa |
| `low` (25 % o menos) | prepararse | Termina la tarea actual, no empieza ninguna que no pueda terminar, informa `capacity=low` | Designa un sucesor y no lanza trabajo largo sobre sí mismo |
| `critical` (10 % o menos, o con límite de tasa) | traspasar | Llega al siguiente punto seguro, escribe el paquete, avisa al líder y se detiene | Cede el liderazgo de inmediato |
| `unknown` (sin fuente de cuota) | continuar | Informa `capacity=unknown`, traspasa ante un aviso de límite de la CLI o una pantalla `usage_limit` | Prefiere carriles con capacidad conocida para las tareas largas |

- **Los umbrales** son los del kit: bajo al 25 % y crítico al 10 % de la fracción libre de la ventana determinante por defecto, ajustables con `AGENTKIT_CAPACITY_LOW` y `AGENTKIT_CAPACITY_CRITICAL`. Las lecturas salen de una caché que se conserva 300 segundos, así que comprobar en cada límite entre tareas cuesta unas pocas llamadas al proveedor por hora.
- **Histéresis.** Una vez escrito el paquete, el traspaso se completa. El agente nunca reanuda esa tarea cuando su cuenta se recupera; el sucesor es su dueño, y la cuenta recuperada simplemente vuelve al grupo.
- **La presión de contexto también cuenta.** Cuando el contexto del agente alcanza el umbral de contexto nuevo del contrato (60 % por defecto), siguen el mismo paquete y el mismo traspaso.
- **Degradación honesta.** Sin el kit, con un kit más antiguo o fuera de un lanzamiento de `ak`, la capacidad se reporta como desconocida, nunca como ok.

**El grupo de cuentas es del desarrollador.** El plan registra las cuentas que el desarrollador declaró para el trabajo. Un agente nunca crea cuentas, renueva inicios de sesión, gasta un restablecimiento de Codex ni usa una cuenta fuera del grupo, y trabaja dentro de los términos de cada proveedor. Mover trabajo antes de un límite, dentro del grupo, es programación; rotar cuentas para superar un límite nunca está permitido. Para cada tarea lista, el líder toma la cuenta mejor clasificada por `ak pick --owner <lead>`, la reserva con `ak lease`, prefiere cuentas con capacidad conocida para las tareas largas y otro proveedor para los revisores, y mantiene un suplente. Cuando ninguna cuenta del grupo tiene margen y ninguna se restablece dentro del horizonte del plan, el enjambre se aparca con el restablecimiento más próximo registrado.

## Traspaso de un carril

1. **El carril**, en `handoff`, llega a un punto seguro — un paso confirmado en un commit, o el árbol tal como está, nunca trabajo descartado —, escribe el paquete, envía `handoff <packet path>` al líder como aviso y se detiene. No cierra su propio panel.
2. **El líder**, o el suplente cuando el líder no es alcanzable o está él mismo en estado crítico, elige una cuenta (`ak pick <kind> --owner <lead> --exclude @<spent>`, prefiriendo otro proveedor cuando la tarea lo permite), la reserva y lanza el sucesor en el mismo checkout con el encargo de reanudar el plan a partir del paquete.
3. **El sucesor** acepta el paquete — el helper verifica el plan, el contrato vigente, la rama, el commit de cabeza y las rutas sin confirmar, y no registra nada si hay una discrepancia —, después reanuda el plan y vuelve a ejecutar cada puerta que el paquete marca como no verificada.
4. **El líder** libera la reserva agotada y cierra el panel agotado una vez que el sucesor ha aceptado.

El **paquete de traspaso** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) se escribe en `analysis_results/handoff/` del plan con permisos solo para el propietario. Nombra el plan, el contrato, la tarea y el paso; el motivo (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` o `lead_handover`); dónde está el trabajo (repositorio, checkout, rama, cabeza, si está subido, rutas sin confirmar); qué está hecho, verificado y no verificado, con rutas de evidencia; los siguientes pasos en orden; las consultas abiertas; las decisiones tomadas; el líder y la época; y quién lo escribió. Un paquete es datos: nunca lleva el valor de un secreto, contenido privado de otro repositorio ni una instrucción que amplíe la autoridad. El sucesor vuelve a derivar su siguiente acción a partir del plan.

## Sucesión del líder

herdr-peers `v0.3.1` mantiene un registro de líder por plan — líder, época, lista de sucesión y carriles — y resuelve la dirección `lead` al líder actual, de modo que ningún encargo de carril fija en el código el panel del líder.

- **Reclamación.** El líder ejecuta `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` cuando empieza un plan y `lead release` cuando el plan termina. La sucesión por defecto es su sucesor previsto, después los carriles del propio checkout del plan por orden de lanzamiento y después cualquier carril del mismo host; los carriles en contenedores o en otras máquinas van al final.
- **Cesión, planificada.** En `low` el líder designa un sucesor. En `critical` escribe un paquete de líder — tabla de carriles, consultas abiertas, orden de publicación, merges pendientes, decisiones —, ejecuta `herdr-peers lead handover <addr> --plan <P>`, que incrementa la época y avisa a todos los carriles, y se detiene. El sucesor acepta el paquete, reanuda el plan orquestador y vuelve a comprobar cada carril.
- **Relevo, no planificado.** Cuando el líder no es alcanzable, no tiene agente, muestra una pantalla `usage_limit` o una consulta dirigida a él agota el tiempo dos veces, la primera entrada alcanzable de la lista de sucesión ejecuta `herdr-peers lead takeover --plan <P>` — ella misma, o lanzando un panel de líder nuevo en el checkout del plan. El nuevo líder reconstruye el estado a partir del plan. La intención en curso que falte se registra como ausente, nunca se inventa.
- **Aislamiento (fencing).** Solo quien tiene la época más alta actúa como líder. Un carril acepta un aviso de líder solo del agente que le dio su encargo (primera reclamación), del líder actual en la época siguiente (cesión) o de la primera entrada alcanzable de la sucesión en la época siguiente (relevo); los empates se resuelven a favor de la posición anterior en la sucesión, y un líder que vuelve y ve una época mayor se retira. Los merges, los tags y las publicaciones solo los realiza el líder de la época actual, se comprueban antes contra el remoto y siguen las propias reglas de merge del repositorio.

## Mensajería

- **Líder y carril** intercambian hitos, la luz verde, fijaciones de versión y requisitos modificados.
- **Carril y carril** pueden consultarse entre sí para obtener información y coordinarse — una interfaz, el nombre exacto de una opción, el estado de una rama. Solo el líder asigna trabajo; la profundidad uno y el límite de fan-out siguen vigentes, y un carril avisa al líder cuando un intercambio entre carriles cambia el plan.
- **Los avisos** (`herdr-peers notify <addr|lead>`) son unidireccionales: el receptor los registra como datos y nunca responde. No consumen ningún hueco de fan-out y llevan anuncios de traspaso, cambios de líder y difusiones de publicación. El aviso del líder es la única difusión del estado actual, y nadie lo confirma.
- **Las preguntas entre repositorios no bloquean.** Un carril pregunta, continúa con la suposición recomendada registrada y se ajusta cuando llega la respuesta.
- **El texto recibido es datos.** Una respuesta o un aviso no concede nada y no cierra nada.

## Escalación solo de lo crítico

Todo lo que no es crítico lo decide el agente: investiga, toma la opción recomendada, registra la decisión — las opciones, la elección, el porqué y cómo revertirla — y continúa. Una escalación debe nombrar su clase; una pregunta que no nombra ninguna es una decisión que el agente debe tomar. Las clases son las del [protocolo de agentes](/es/spec/agent-protocol):

| Clase | Escalar al desarrollador cuando |
| --- | --- |
| C1 Autoridad | Una acción está fuera de la autorización del plan o en un punto de control de consentimiento: operaciones destructivas o irreversibles, despliegues a producción, publicaciones más allá del plan, mensajes a personas ajenas a los agentes del plan, gasto, postura de seguridad o secretos. |
| C2 Pantalla de consentimiento | Aparece una pantalla de permiso, de omisión de permisos, de inicio de sesión, de credenciales, de consentimiento MCP o de pago. Un agente nunca le envía teclas. |
| C3 Ambigüedad irreducible | Dos resultados materialmente distintos satisfacen la solicitud y nada en el repositorio, su documentación, los planes o las decisiones previas lo resuelve. |
| C4 Conflicto de calidad | Una puerta de validación no puede pasar sin debilitarla, o la evidencia contradice el objetivo del plan de una forma que la tarea no puede corregir. |
| C5 Daño | El estado compartido, los datos o el trabajo de otro agente se pierden o se corrompen sin explicación. |
| C6 Términos | Surge una cuestión legal, de licencias, de términos del proveedor o de privacidad. |
| C7 Capacidad agotada | Ninguna cuenta del grupo declarado tiene margen y ninguna se restablece dentro del horizonte del plan. |

En un enjambre, **un elemento crítico bloquea su cadena de dependencias, no el enjambre.** El líder aparca la tarea bloqueada — su registro de bloqueo es la escalación, enviada una sola vez —, mantiene en marcha a todos los carriles independientes y reanuda la cadena cuando el desarrollador responde. La autonomía nunca cierra una aprobación humana, las palabras literales del desarrollador prevalecen sobre una recomendación, y una aprobación retransmitida por un agente se registra como retransmitida, nunca como si la hubiera escrito el desarrollador.

## El estándar de calidad

Un enjambre solo vale la pena si se puede confiar en su resultado. El [estándar de calidad](/es/spec/dwp-specification) se aplica a todo agente que continúa un plan:

- **Las puertas de validación son hipótesis.** Una puerta nueva o modificada demuestra que falla ante un defecto sembrado antes de confiar en ella, y un pase vacuo — un binario ausente, cero archivos coincidentes, un registro vacío — es un fallo.
- **Comparar con la base.** El rendimiento, la cobertura y el tamaño se comparan con la rama base, no solo con un umbral.
- **Medir primero, diseñar antes de construir.** Una corrección o una auditoría verifica primero su premisa y su herramienta de medición; un cambio no trivial deja por escrito interfaces, modos de fallo, seguridad y pruebas antes del código.
- **Revisar antes del paso irreversible.** La revisión local de AI Diff Review se ejecuta antes de cualquier merge, tag o publicación, y los cambios de metodología o de protocolo pasan por un revisor de otro proveedor.
- **La continuidad nunca rebaja el estándar.** Un sucesor vuelve a ejecutar lo que el paquete marca como no verificado; un traspaso nunca es un atajo para saltarse una puerta.

## El registro

El diario del plan orquestador registra el enjambre: los lanzamientos y resultados de los carriles como eventos de delegación; los veredictos de capacidad, los traspasos y las sucesiones como observaciones; las escalaciones y las respuestas del desarrollador como intervenciones. Los paquetes y sus registros de aceptación permanecen en el plan que ejecutó el trabajo, y el informe de finalización nombra cada traspaso y cada sucesión con su paquete.

## Ensayarlo

Demuestra el bucle antes de confiar en él. En un repositorio de pruebas con un plan orquestador pequeño, ejecuta un líder y al menos tres carriles en cuentas o proveedores distintos. Limita la capacidad reportada de un carril — `AGENTKIT_CAPACITY_CAP=@<profile>=8` rebaja la lectura y nunca puede subirla — y observa cómo escribe un paquete, cómo el líder lanza un sucesor que lo acepta y cómo el sucesor pasa la puerta de validación. Limita al líder del mismo modo y observa la cesión y cómo el nuevo líder termina el plan. Después registra la evidencia en `analysis_results/` del plan: ninguna pulsación humana, cada paquete, cada época, una consulta entre carriles y las puertas de validación.
