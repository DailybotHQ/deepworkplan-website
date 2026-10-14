---
title: Herdr
description: "Pasa trabajo a otro agente de código en un panel de Herdr, en cualquier máquina, y recibe una única respuesta autorizada. Planes que delegan, con registro."
kind: addon
lang: es
order: 7
---

# Addon de Herdr

[Herdr](https://herdr.dev) coloca agentes de programación en paneles, en tu máquina y en las máquinas a las que llega por SSH. Este addon permite que un Deep Work Plan use esos agentes como **pares**: un plan puede pasar una tarea acotada a un agente en otro panel, recibir exactamente una respuesta autorizada y conservar un registro del intercambio.

Es un addon opcional de **DWP v7** (`v7.0.0`). La metodología funciona igual sin él: con el addon ausente o deshabilitado, cada tarea se ejecuta en la sesión actual, exactamente como antes.

## Qué integra

El addon es un integrador delgado. El trabajo lo hace **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, una skill independiente con licencia MIT fijada en **`v1.0.0`** que es útil sin Deep Work Plan. Define lo que Herdr deja abierto: quién puede responder, cómo vuelve la respuesta a través de máquinas, cómo evitan dos agentes responderse indefinidamente y dónde vive el registro de "pregunté, respondió".

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/herdr-peers`, tag `v1.0.0`, protocolo 1 |
| Clave de registro | `herdr` en `.dwp/config.json` |
| Transporte | interactivo: un par en un panel de Herdr |
| Proporciona | `subagents`, `cancel_children` |
| Requiere | la concesión `agent_delegation` del contrato del plan |

**Estable desde `v1.0.0`.** La interfaz pública sigue el versionado semántico: los verbos de la CLI y sus opciones documentadas, los códigos de salida `0`–`7`, las variables documentadas `HERDR_PEERS_*`, `DWP_PLAN` y `DWP_TASK`, el protocolo 1 y los contratos JSON `herdr-peers/lanes-v1`, `herdr-peers/lead-v1` y el registro de delegación. Un cambio incompatible en cualquiera de ellos incrementa la versión mayor, y un cambio en el formato de transmisión también incrementa el número de protocolo. `v1.0.0` no cambia ningún comportamiento respecto de `v0.3.3`, y las versiones 0.x ya no tienen soporte.

## Instalación

Instala herdr-peers y la skill oficial de Herdr, de la que depende. Toda máquina cuyos agentes deban responder también necesita la skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.0.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Requisitos: Herdr 0.9.1 o posterior, `bash` y `python3` 3.9 o posterior (solo biblioteca estándar). El onboarding ofrece el addon y registra tu respuesta en el registro de addons; nunca se habilita sin consentimiento.

## Qué agrega a un plan

- **Delegación a un par.** En un plan v7 cuyo contrato concede `agent_delegation`, `execute` puede pasar una tarea `parallel_safe`, o una pregunta de solo lectura, a un agente en otro panel, en esta máquina o en otra.
- **Una respuesta autorizada.** La solicitud lleva un sello que autoriza exactamente una respuesta. El par responde una vez a través del helper, y la respuesta lleva un sello propio.
- **Un registro antes de confiar.** Cada delegación se escribe en `analysis_results/delegations.ndjson` del plan antes de usar la respuesta, y corresponde al evento de diario `delegation` de v7.
- **Los resultados siguen siendo afirmaciones hasta verificarse.** La respuesta de un par es evidencia `asserted` hasta que el propio ejecutor de compuertas del plan la observa. Nunca cierra una tarea por sí sola.

## Modelo de seguridad

| Regla | Qué significa |
|---|---|
| Concesión primero | La delegación solo se ejecuta cuando el contrato del plan concede `agent_delegation`. |
| Límite de profundidad 1 | Un mensaje sellado con `depth=1` o `reply-to=` nunca se responde, y un delegado nunca delega. |
| Límite de fan-out | Como máximo cuatro pares por solicitante de forma predeterminada. |
| Datos, no instrucciones | Una respuesta nunca otorga una autoridad que el receptor no tuviera ya. |
| Un escritor por ruta | Un par que escribe trabaja en su propio worktree de git. |

herdr-peers no autentica al remitente: el campo `from=` de un sello es una afirmación. La mitigación es la lista de permitidos `HERDR_PEERS_SCOPE`, que limita los espacios de trabajo y las máquinas que acepta un par.

## Contenedores y el host

Con el addon [devcontainer](/kit/devcontainer) sobre devcontainer-kit `v1.0.1`, cada contenedor dck incluye herdr-peers y se une a la malla en `dck up`: sus agentes pueden consultar a agentes del host, de los demás contenedores y de los otros contenedores loopback del host, y recibir la respuesta. `dck setup` instala un herdr-peers verificado en el host, así que los agentes del host también responden. El listener del host y las claves adicionales que dejan entrar a otros contenedores son decisiones tuyas en el perfil del host del kit; este addon nunca los configura. Desde herdr-peers (`v0.2.3`), cada máquina mantiene su propio estado (`$XDG_STATE_HOME/herdr-peers/<server>/`), así que un checkout compartido por el host y un contenedor ya no mezcla sus registros, y desde devcontainer-kit (`v0.3.3`) el propio contenedor exporta `HERDR_PEERS_SELF`, así que los agentes Codex de dentro llegan a otras máquinas sin ningún paso manual.

## Herdr o agentkit

Ambos addons implementan la misma interfaz de delegación —`launch`, `observe`, `collect`, `cancel`— con transportes distintos.

| Situación | Usar |
|---|---|
| Una tarea `parallel_safe` acotada con una salida declarada | [agentkit](/kit/agentkit) (`ak run` sin interfaz en un worktree) |
| La tarea necesita interacción, dura mucho o vive en otra máquina | Herdr (un par en un panel) |

Para un líder que ejecuta muchos carriles a la vez — paneles en el host, en contenedores y en otras máquinas, cada uno con su propia cuenta —, `herdr-peers lanes` enumera cada carril con su estado, `herdr-peers status <pane>` clasifica la pantalla en la que está un carril bloqueado, y cada registro de delegación nombra la cuenta y el proveedor que lo llevaron. Consulta [Ejecutar muchos agentes](/methodology/06-orchestration).

**Los lanes de Codex nombran su panel.** Codex ejecuta los comandos de un lane desde un servidor en segundo plano compartido por todas las sesiones de esa cuenta, así que el id de panel que hereda puede ser de otro lane. Un lane de Codex pasa su propio panel, tomado del encargo del líder, con `--pane <pane>` en cada verbo de herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Avisos y liderazgo

herdr-peers (`v0.3.2`) añade lo que permite a un enjambre sobrevivir a su líder ([Autonomía del enjambre](/es/methodology/07-swarm-autonomy)):

- **Avisos.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` envía un mensaje unidireccional sellado con `reply=no`. El `check` del receptor lo clasifica como aviso, lo registra como datos y nunca responde. Los avisos no consumen ningún hueco de fan-out y pueden enviarse mientras hay una consulta abierta; úsalos para anuncios de traspaso, cambios de líder y difusiones de publicación.
- **Un registro de líder por plan.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` convierte a un agente en el líder de un plan; `lead show` imprime el registro (esquema `herdr-peers/lead-v1`: plan, líder, época, sucesión, carriles, hora de actualización). `lead handover <addr> --plan <P>` cede el liderazgo, `lead takeover --plan <P>` permite que el primer suplente alcanzable lo asuma cuando el líder ya no está, y `lead release --plan <P>` lo termina. Cada cambio incrementa la época y avisa a todos los carriles. Reclama el plan antes de lanzar sus carriles: `lead` solo se resuelve cuando existe un registro. Desde `v0.3.2` el registro guarda localmente el repositorio que reclama y rechaza una reclamación del mismo id de plan desde otro repositorio; nombra ese plan `--plan <repo>/<id>`.
- **Aislamiento (fencing).** Un carril acepta un aviso de líder solo del agente que le dio su encargo (primera reclamación), del líder actual en la época siguiente (cesión) o de la primera entrada alcanzable de la sucesión en la época siguiente (relevo). Todo lo demás se registra y se ignora, y un líder que vuelve y ve una época mayor se retira.
- **La dirección `lead`.** `ask lead …` y `notify lead …` se resuelven al líder actual de `--plan` (o, si no, de `$DWP_PLAN`), de modo que ningún encargo de carril fija en el código el panel del líder.
- **Pantallas `usage_limit`.** `status` y `lanes` reconocen el mensaje de límite de uso de una CLI como la clase de pantalla `usage_limit`, cuyo siguiente paso es un traspaso. Nunca se le envían teclas. `lanes --json` añade el plan, su líder, la época y la última capacidad reportada de cada carril.

Los carriles también pueden consultarse entre sí para obtener información y coordinarse — una interfaz, el nombre de una opción, el estado de una rama —, pero solo el líder asigna trabajo. La profundidad 1 y el límite de fan-out siguen vigentes. Con `v0.2.x` no hay avisos ni registros de líder: los carriles consultan la dirección del líder que figura en su encargo, y el desarrollador retransmite un cambio de líder.

## Notas

Opcional y nunca obligatorio. Un repositorio es plenamente conforme con cero addons opcionales, y ningún flujo depende de este. El recorrido de ida y vuelta entre dos paneles y entre máquinas está cubierto por pruebas contra un Herdr simulado; planifica una primera ejecución supervisada.
