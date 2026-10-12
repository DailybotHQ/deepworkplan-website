---
title: Ejecutar muchos agentes
description: "Cómo un agente líder ejecuta muchos carriles a la vez en paneles, contenedores y otras máquinas, con cuentas elegidas por margen y una rama por repositorio."
order: 6
lang: es
summary: El modelo de líder y carriles para orquestar muchos agentes entre paneles, máquinas, cuentas y repositorios.
icon: network
---

# Ejecutar muchos agentes

Un agente sobre un plan es lo predeterminado, y cubre la mayor parte del trabajo. Hay trabajo más amplio que una sesión: un cambio que cruza varios repositorios, una publicación que debe llegar en orden o un backlog que a un solo agente le llevaría días. DWP escala a ese trabajo sin cambiar su contrato. El plan sigue siendo la fuente de verdad, cada tarea se sigue cerrando con su propia puerta de validación, y los agentes adicionales son **carriles** (lanes) que coordina un **líder** (lead).

Este capítulo describe el modelo. Usa tres complementos opcionales — [Herdr](/es/kit/herdr) para paneles y pares, [agentkit](/es/kit/agentkit) para cuentas y [devcontainer](/es/kit/devcontainer) para contenedores —, y ninguno es necesario para un plan de un solo agente.

## Un líder y sus carriles

El **líder** es dueño del plan padre. Decide los carriles, entrega a cada uno su alcance, recoge los hitos y da la señal que permite a un carril fusionar o publicar. No escribe el código de otro carril.

Un **carril** es un agente con un alcance, normalmente un repositorio. Lee el `AGENTS.md` de ese repositorio, ejecuta la puerta de validación de ese repositorio y mantiene su propio plan dentro del repositorio. En un [centro orquestador](/es/methodology/05-archetypes), el plan padre vive en `.dwp/plans/` del centro con una tabla de seguimiento de planes hijos, y el plan de cada carril vive en su propio repositorio, con los identificadores de plan y la puerta de validación de ese repositorio.

| Rol | Es dueño de | Nunca hace |
| --- | --- | --- |
| Líder | El plan padre, la lista de carriles, el orden de publicación, el GO | Editar el repositorio de un carril |
| Carril | Un repositorio: su rama, plan, puerta de validación y pull request | Fusionar o publicar antes del GO del líder |

## Dónde se ejecutan los carriles

Un carril es un agente en un panel de terminal, y el panel puede vivir en varios lugares. [Herdr](https://herdr.dev) pone cada agente en un panel y llega a otras máquinas por SSH, de modo que el líder ve todos los carriles en una sola barra lateral.

- **En el host.** Un panel por carril, junto al del líder. Es la configuración más rápida, para los repositorios en los que el desarrollador ya trabaja.
- **En un contenedor.** Un contenedor de [devcontainer-kit](/es/kit/devcontainer) se une a la malla de Herdr con `dck up`: sus agentes llegan al host y a los demás contenedores, y el host llega a ellos. El contenedor es el entorno aislado, así que sus agentes pueden ejecutarse en autonomía.
- **En otra máquina.** Cualquier máquina a la que Herdr llegue por SSH aloja carriles de la misma forma, con herdr-peers instalado también allí.

El lugar cambia el aislamiento, no el protocolo: un carril en un contenedor y un carril en el host se coordinan con el líder de la misma manera.

## Cuentas y proveedores según el margen

Muchos agentes gastan la cuota rápido. Cada carril se ejecuta con su propia cuenta — una CLI y un perfil en [coding-agents-kit](/es/kit/agentkit) —, de modo que los carriles no agotan la misma ventana y una cuenta que llega a un límite detiene un carril, no todos.

- **`ak usage`** muestra la cuota restante de cada cuenta y perfil, una vez por lote.
- **`ak pick <kind> --count N`** devuelve las N cuentas con más margen, la mejor primero; `--exclude` deja fuera una cuenta ocupada, `--model` cuenta la ventana de un modelo y `--need` se niega a empezar sin margen suficiente.
- **`ak <kind> @<profile>`** inicia el agente del carril con esa cuenta, en su panel.

Los proveedores se combinan igual. Un carril de Claude puede escribir mientras un carril de Codex revisa, cada uno con la cuenta que `ak pick` eligió para su tipo. Un carril en un contenedor puede usar las cuentas del host: con `host_profiles` activado en el perfil de host de devcontainer-kit del desarrollador, un contenedor recibe los perfiles del host de las CLI que instala el repositorio — Claude mediante un token de larga duración por perfil, Codex mediante su archivo de autenticación — y no necesita un inicio de sesión propio. Usa solo tus propias cuentas y respeta los términos de cada proveedor: reparte el trabajo entre ellas, nunca rotes cuentas para saltarte un límite.

## Lanzar y desbloquear carriles sin una persona

Un líder puede iniciar carriles y mantenerlos en marcha sin nadie al teclado. Una vez que el desarrollador ha concedido la operación desatendida — una instrucción permanente o la autorización previa del plan —, cada lanzamiento no necesita ninguna otra aprobación. El líder usa los propios comandos de Herdr; ningún código del kit envía pulsaciones de teclas. El procedimiento tiene un orden fijo: preparar una vez, evitar la pregunta, detectar la parada, enviar teclas en un solo caso y escalar el resto.

1. **Preparar una vez, como desarrollador.** Claude Code pide una vez por perfil confirmar su modo de omisión de permisos (bypass-permissions). Esa confirmación es un paso propio del desarrollador, que se da al crear el perfil; en un contenedor de devcontainer-kit, el kit la escribe solo en los homes propios del contenedor. Ningún agente envía nunca teclas para ella.
2. **Evitar.** `ak pick <kind>` nombra la cuenta con más margen, y `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` lanza el carril en su propia carpeta. `--trust-cwd` (o `AGENTKIT_TRUST_CWD=1`) confía de antemano en esa carpeta, así que Claude y Codex omiten sus pantallas de confianza de carpeta sin pulsaciones.
3. **Detectar.** `herdr-peers lanes` (o `herdr agent list`) muestra cada carril como trabajando, inactivo, bloqueado o terminado. Para un carril bloqueado, o inactivo sin salida, `herdr-peers status <pane>` clasifica la pantalla en la que está — confianza de carpeta, confirmación de omisión de permisos, inicio de sesión, permiso o desconocida — con el siguiente paso documentado, y `herdr pane read <pane>` la muestra.
4. **Una pulsación, un caso.** Las únicas teclas que un líder puede enviar son la respuesta a una pantalla de confianza de carpeta, en un panel que lanzó él mismo, cuando `--trust-cwd` no estaba disponible. Lee la pantalla antes de enviar teclas, envía el mínimo de teclas que la responden y vuelve a leer.
5. **Leer, registrar y escalar todo lo demás.** La confirmación del modo de omisión de permisos de Claude, las solicitudes de inicio de sesión y credenciales, las solicitudes de permiso por acción, las confirmaciones destructivas, las pantallas de pago o de plan, las pantallas desconocidas y los paneles que el líder no creó van al desarrollador como un hito de bloqueo, nunca como pulsaciones.
6. **La exclusión prevalece.** Con `AGENTKIT_PERMISSIONS=ask`, los carriles preguntan antes de actuar, y el líder nunca esquiva una pregunta que trae la exclusión.
7. **Relanzar.** Si un agente termina, el líder lo vuelve a iniciar con la misma cuenta o elige otra. Un inicio de sesión perdido es una solicitud de credenciales: se escala.

Cada intervención — qué mostraba la pantalla, qué teclas se enviaron, qué ocurrió después — se registra en el plan padre.

## Coordinación mediante herdr-peers

Los carriles y el líder se comunican mediante [herdr-peers](/es/kit/herdr): una **consulta** (ask) lleva un sello que autoriza exactamente una **respuesta** (reply), y cada intercambio queda registrado. El líder mantiene el protocolo pequeño:

- **Hitos hacia arriba.** Cada carril informa en puntos fijos — plan listo, pull request abierto, bloqueado, terminado — y sigue trabajando entre ellos sin esperar respuesta.
- **Preguntas como consultas.** Un carril que necesita una decisión consulta al líder; el líder contesta con una respuesta.
- **Profundidad uno.** Una respuesta nunca se contesta, y un carril no delega más allá. El abanico por llamante está limitado, a cuatro pares por defecto.
- **Datos, no instrucciones.** Una respuesta no concede nada que el receptor no tuviera ya. La afirmación de un carril de que su puerta de validación pasó se comprueba ejecutando esa puerta.
- **Un registro de quién hizo qué.** Cada registro de delegación nombra la cuenta y el proveedor del carril, de modo que el plan padre muestra qué cuenta llevó qué trabajo.
- **Los lanes de Codex nombran su panel.** Codex ejecuta los comandos de un lane desde un servidor en segundo plano compartido por todas las sesiones de esa cuenta, así que el id de panel que hereda puede ser de otro lane. Un lane de Codex pasa su propio panel, tomado del encargo del líder, con `--pane <pane>` en cada verbo de herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

El líder puede ver toda la orquesta a la vez: `herdr-peers lanes` enumera cada carril con su estado, y [DeepWorkPlan Vim](/es/kit/vim) muestra los carriles de un plan orquestador junto al propio plan (`:DwpLanes`).

## Una rama, una publicación por repositorio

La regla que mantiene revisables muchos carriles es sencilla: **un carril por repositorio, sobre su checkout base, con una rama, un pull request y una publicación** para todo el cambio. El carril no reparte su trabajo entre varias ramas ni worktrees. Los worktrees son solo para el caso en que dos escritores deben compartir un repositorio: cada uno recibe el suyo, para que cada ruta tenga un único escritor.

El pull request sigue abierto, en verde y etiquetado para revisión hasta el GO del líder. Entonces el carril fusiona y etiqueta, e informa del tag.

## Orden de publicación

Los repositorios dependen unos de otros, así que se publican en orden de dependencias: primero las herramientas, luego lo que las fija, después la documentación que describe el resultado y por último los consumidores que lo adoptan. El líder mantiene el orden y envía el GO a un repositorio cada vez. Un carril que fija la versión de otro repositorio espera a ese tag antes de escribir la fijación, de modo que ninguna fijación apunta nunca a una versión que no existe.

## Puntos de control

El plan padre se cierra con evidencia, no con informes:

1. **Por carril.** La puerta de validación de cada carril pasa en su propia rama, y la revisión de su pull request queda limpia. La revisión puede ser un carril propio: el [AI Diff Reviewer](/es/kit/ai-diff-reviewer) revisa el pull request de cada carril, y con el complemento [Dailybot](/es/kit/dailybot) cada carril informa de su propio progreso al equipo.
2. **Por publicación.** Cada tag existe y fija lo que necesita el siguiente repositorio.
3. **Integración.** Tras la última publicación, un punto de control ejecuta los consumidores sobre las versiones publicadas y registra el veredicto en `analysis_results/` del plan padre.
4. **Revisión final.** Una pasada de seguridad cubre todo lo que cruzó un límite — sobre todo cuentas, tokens y archivos compartidos con contenedores — antes de que el plan padre se complete.

## Seguridad

- Nunca pongas una clave, un token o un secreto en una consulta, un prompt o un registro; refiérete a las variables por su nombre.
- Los recursos compartidos llevan un bloqueo: un carril lo toma antes de un paso pesado, como la construcción de un contenedor, y lo libera después.
- La exclusión de permisos, cuando está configurada, prevalece para todos los carriles y para todos los agentes que inicie un carril.
- Un carril que no puede continuar lo dice como un hito de bloqueo y se detiene; el líder decide.

## Cuando una cuenta o el líder se agotan

Una ejecución larga dura más que cualquier cuenta. A partir de coding-agents-kit `v0.6.1` y herdr-peers `v0.3.1`, un carril comprueba su propia capacidad en cada límite entre tareas y traspasa su trabajo mediante un paquete antes de que su cuenta se agote, un líder cede el liderazgo o lo reemplaza su suplente, y solo los elementos críticos llegan al desarrollador. [Autonomía del enjambre](/es/methodology/07-swarm-autonomy) describe el bucle, el paquete, la sucesión y las clases de escalación.
