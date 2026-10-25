---
title: Recursos y capacidades
description: "Manifiestos de contexto por tarea, envolvente de recursos, capacidades del host, registro de addons .dwp/config.json y capacidades que aportan los addons."
order: 10
lang: es
section: Record layer
---

# Recursos y capacidades

> **Alcance de versión:** Esta página reformula cuatro documentos normativos del estándar actual, DWP 7.0.0, en la release `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/CONFIG.md) y [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_ABILITIES.md). Donde esta página y esos archivos difieran, prevalecen los archivos.

**Estado: estable (contexto y recursos desde 6.0.0; configuración y capacidades desde 7.0.0).** Estas reglas vinculan a los planes de la línea v6 ([Capa de registros](/spec/record-layer)); el estándar v5 no se modifica. Las palabras clave MUST (DEBE), MUST NOT (NO DEBE), SHOULD (DEBERÍA), SHOULD NOT (NO DEBERÍA) y MAY (PUEDE) se interpretan según las describe el RFC 2119.

## El manifiesto de contexto por tarea

Antes de cada tarea, el agente deriva un **manifiesto de contexto** a partir del contrato y del diario completo (`context_manifest.py`). Es una vista derivada, nunca almacenada como estado: derivarlo dos veces de los mismos registros DEBE producir bytes idénticos, y el manifiesto NO DEBE leer fuera del plan y de su repositorio. Su forma se publica como [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Sección | Derivada de |
| --- | --- |
| `identity` | nombre del plan, identificador y revisión del contrato vigente |
| `authorization` | los eventos de aprobación, literalmente, incluidos los puntos de control de consentimiento |
| `repository_rules` | el alcance del contrato y los invariantes con su estado de evaluación actual |
| `acceptance` | los criterios de la tarea con su estado de cierre |
| `touched_surface` | los archivos declarados con sus hashes de contenido actuales; un archivo ausente aparece como ausente |
| `evidence` | punteros de evidencia dentro de la ventana que se resuelven en disco |
| `dead_ends` | puertas fallidas, rechazos, adaptaciones rechazadas y controles no discriminantes |
| `freshness` | la huella de las entradas que resume el manifiesto |
| `next_action` | exactamente un siguiente paso con un comando concreto |

`authorization`, `repository_rules` y `acceptance` son **obligatorias**: la poda de contexto nunca puede ocultar la frontera de aceptación o de autorización. La escalera de siguiente acción está ordenada (aprobación, inicio, autoridad, control, evidencia, finalización) y nunca presenta una puerta ordinaria que pasa como cierre de un criterio controlado.

**Los callejones sin salida se conservan.** Una entrada sale del resumen solo por hechos probados en los registros (la misma huella pasó más tarde, un rechazo duplicado más reciente la sustituyó o una revisión del contrato la dejó obsoleta); un simple cambio de superficie NO DEBE eliminarla. **La vigencia se comprueba:** un resumen cuya huella de entradas registrada ya no coincide está obsoleto, y un resumen sin huella está obsoleto por construcción. **El historial se carga solo por disparador**: un traspaso registrado o una enmienda que afecte a la tarea; en otro caso, el manifiesto por sí solo es el contexto de la tarea.

## Contabilidad de cuatro magnitudes

La carga de instrucciones y el coste se reportan como cuatro magnitudes distintas: **bytes de instrucciones** estáticos, **tokens del proveedor** (solo donde un medidor del host los registró), **coste monetario** (solo a partir de muestras registradas con tarifas reales) y **tiempo de reloj** (a partir de las marcas de tiempo de los eventos). Una magnitud ausente se reporta como ausente con su motivo, nunca se imputa, y los bytes nunca se convierten en tokens ni en dinero.

## Capacidades del host

El host de ejecución declara sus **capacidades** a partir de un conjunto cerrado: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Una capacidad desconocida DEBE rechazarse, y una capacidad no declarada es `false`. El **host mínimo** —sin cambio de modelo, sin subagentes, sin telemetría, sin detención— es una postura admitida, nunca un error; todo límite que necesite una capacidad ausente se degrada a orientativo, con la capacidad ausente nombrada.

Las capacidades no son concesiones. Una concesión en el contrato es autoridad; una capacidad es lo que el entorno puede hacer realmente. Toda postura que necesite una capacidad sigue necesitando su concesión.

## La envolvente de recursos

Un contrato PUEDE declarar límites en su envolvente de recursos. Un límite solo es **aplicado** cuando nombra una fuente de medición real; en otro caso es **orientativo**, y nunca se afirma paridad de aplicación entre hosts.

- **Fuentes de contadores.** Los contadores observables en el diario (duración en tiempo de reloj, reintentos de puertas, llamadas de despacho) se calculan a partir de los propios registros del plan. Los contadores exclusivos del host (gasto, tokens del proveedor) necesitan la capacidad de medición correspondiente y una muestra observada de un adaptador del host; un contador ausente no es uso gratuito.
- **Reservas.** Un límite PUEDE declarar una `reserve` para que el trabajo ordinario no deje sin recursos a la verificación, los reintentos y la reanudación: el despacho se rechaza cuando lo gastado más lo pendiente superaría el límite menos la reserva.
- **Agotamiento.** Alcanzar un límite persiste un punto de control incompleto, registra `LIMIT: exhausted <id>: <detail>` y retiene el despacho hasta un registro explícito `LIMIT: recovered <id>`. Un agotamiento nunca puede satisfacer un criterio de aceptación.
- **Liquidación de cancelaciones.** Una reserva en curso se liquida exactamente una vez, como liberada o comprometida; una segunda liquidación en conflicto se rechaza, nunca se arbitra.
- **Postura de enrutamiento.** Lo predeterminado es un modelo fijo. Cambiar de nivel de modelo necesita tanto la concesión `model_routing` como la capacidad del mismo nombre; el despacho en paralelo necesita tanto la concesión `agent_delegation` como la capacidad `subagents`. Una postura de enrutamiento es una declaración de permisos, nunca una afirmación de eficacia.

## El archivo de configuración y el registro de addons

`.dwp/config.json` (repositorio) y `~/.dwp/config.json` (usuario) comparten una forma, publicada como [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), y un único parser (`config.py`). **La metodología funciona sin archivo de configuración y sin ningún addon**; nada en el archivo puede hacer que un plan, un flujo o la conformidad dependan de un addon.

- **Versionado por defecto.** El archivo del repositorio contiene decisiones, nunca secretos, y se versiona para que los compañeros de equipo y la CI lean el mismo registro: la incorporación escribe la regla de `.gitignore` `.dwp/*` más `!.dwp/config.json`. Los planes y los registros de benchmark siguen ignorados.
- **Precedencia.** El archivo del repositorio prevalece sobre el del usuario, y un archivo ausente significa todo deshabilitado. La clave `addons` se resuelve por clave de addon; la clave `benchmark` se resuelve en bloque.
- **Las claves del registro** son los nombres de directorio de los addons del paquete: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Cada entrada tiene `enabled` (solo `true` habilita), una `version` opcional y una `note` opcional de una línea. Una clave desconocida se ignora con una advertencia.
- **Ausente significa no habilitado.** Solo la incorporación con el consentimiento del desarrollador, el paso de instalación propio de un addon o la persona habilitan algo. Un addon habilitado que no se detecta y lleva una nota se reporta como diferido.
- **Lectura con cierre seguro.** Un archivo ilegible o un valor mal formado no aporta nada y produce exactamente una advertencia; un lector nunca aborta un flujo y nunca calla lo que descartó. El escritor reconcilia de forma atómica y se niega a sobrescribir un archivo que no puede parsear.
- **Registro del host.** Una clave opcional `host` registra las capacidades declaradas de la máquina (booleanos del conjunto cerrado). `telemetry: true` sigue necesitando el consentimiento del desarrollador.
- **La línea base no cambia.** La revisión local de AI Diff Reviewer sigue formando parte de todo Final Review, lo nombre o no el registro.

## Capacidades aportadas por addons

Desde 7.0.0, los addons habilitados pueden añadir capacidades en tiempo de ejecución:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

Es decir, las capacidades efectivas son las declaradas por el host más las que aporta cada addon que está habilitado, descrito por un `addon.json` válido, detectado y en una versión de interfaz compatible.

- **Descriptores.** Cada addon del paquete incluye un `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) que declara su clave, lo que aporta y cómo se detecta.
- **La detección es de solo lectura.** Un comando de detección se ejecuta sin shell, con stdin cerrado y un tiempo límite de 10 segundos, y nada de lo que imprime se ejecuta. Un producto cuya versión mayor de interfaz reportada difiere de la fijada no está disponible, con una advertencia.
- **No habilitado significa no consultado.** El descriptor de un addon deshabilitado no se abre y su comando de detección no se ejecuta. La unión es monótona: habilitar un addon solo puede añadir capacidades.
- **Nunca se persiste.** Las capacidades efectivas se recalculan en cada llamada y NO DEBEN escribirse en un plan. Un plan registra lo que usó —el evento de delegación nombra su transporte y su addon—, no lo que estaba disponible.
- **Las capacidades no son autoridad.** El addon agentkit puede aportar `subagents`, `cancel_children` y `model_routing`; el addon Herdr puede aportar `subagents` y `cancel_children`. Delegar sigue necesitando la concesión `agent_delegation` del contrato ([Delegación](/spec/delegation)).

`resources.py abilities` imprime el conjunto efectivo y el origen de cada capacidad; es de solo lectura.

## Relacionado

- [Capa de registros](/spec/record-layer) — contrato, diario y evidencia.
- [Delegación](/spec/delegation) — cómo usa un plan la capacidad `subagents`.
- [Add-ons](/spec/addons) — los addons opcionales en sí.
