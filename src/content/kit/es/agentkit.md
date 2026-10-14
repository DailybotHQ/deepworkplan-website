---
title: Agentkit
description: "Un comando para cada agente de código de terminal: una cuenta por perfil, ak pick para la de más margen, autonomía con exclusión y ejecuciones sin interfaz."
kind: addon
lang: es
order: 8
---

# Addon de Agentkit

Cada agente de código de terminal tiene sus propias opciones para continuar una sesión, su propia forma de mantener separada una segunda cuenta, su propio modo sin interfaz y su propio interruptor para omitir las solicitudes de permiso. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** pone una sola superficie de comandos sobre todos ellos: `ak <kind> [@profile]`.

Este addon integra el kit en **DWP v7** (pack `v7.8.1`) como transporte de delegación **sin interfaz** (headless). Es opcional: sin él, cada tarea se ejecuta en la sesión actual, exactamente como antes. El kit en sí es un producto MIT que funciona sin Deep Work Plan.

## Qué te da el kit

- **Una gramática para cada CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` y `ak antigravity`, más rutas de proveedor (Z.AI GLM, Azure OpenAI, xAI y la API de Gemini), con las mismas opciones de sesión: `-c` continúa, `-r <id>` reanuda.
- **Perfiles.** `ak claude @work` ejecuta una segunda cuenta en su propio directorio home, separada de la primera.
- **Ejecuciones sin interfaz.** `ak run <kind> -- "<prompt>"` ejecuta un prompt de forma no interactiva y devuelve un código de salida documentado, opcionalmente como un único objeto JSON.
- **Un diagnóstico.** `ak doctor --json` informa qué CLI están instaladas, los perfiles y los nombres de las claves configuradas, nunca sus valores.
- **Instalaciones verificadas.** `ak install <cli>` instala una CLI ausente desde el canal oficial de su proveedor en una versión fijada, comprobada contra un sha256 fijado o la integridad del registro de npm.
- **Nombres conocidos.** Dos presets de alias, desactivados hasta que los activas: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) y `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), cada uno equivale a `ak <kind>`.

## Cuentas, cuota y elección de cuenta

El kit trata cada inicio de sesión o clave que tienes como una **cuenta**: una CLI × un perfil. `@default` (o `@1`) es el home propio de la CLI; `@2`, `@work` o `@client-x` son sesiones independientes, cada una en su propio directorio bajo la raíz de perfiles, que se ejecutan a la vez. `ak profiles` las enumera con su estado de sesión y los nombres de sus claves; `ak profiles --json` da a las herramientas la misma lista (esquema `profiles-v1`). Desde `v0.5.1` indica dónde está realmente el token de Claude Code —`file`, `keychain` (macOS), `none` o `unknown`— solo por su presencia, sin leer nunca el secreto, y reconoce un inicio de sesión de Cursor en Linux, ya sea en un contenedor o en un host Linux. Desde `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` indica la cuenta que usa un `ak <cli>` sin argumentos (un `@profile` posicional sigue teniendo prioridad), y así es como un contenedor de desarrollo elige la cuenta del host que comparte. Desde `v0.5.3`, `ak codex` añade `--no-daemon` cuando un home de Codex compartido con otra máquina registra un daemon en segundo plano que no está en esta.

`ak usage` (también `ak status`) enumera todas las cuentas de cada CLI que el kit conoce, una fila por cuenta y perfil, bajo su CLI: cuota en vivo para las suscripciones de Claude Code (ventanas de 5 horas, semanal y por modelo), los inicios de sesión de Codex con ChatGPT, las claves del plan de programación de Z.AI y, desde `v0.7.0`, los inicios de sesión de Antigravity con Google en Linux y en contenedores (las ventanas de cinco horas y semanal del propio panel `/usage` de agy). Una cuenta cuya cuota no se puede leer conserva su fila: `n/d` con cómo está conectada y por qué —Cursor, Grok, xAI, Azure OpenAI, una clave de API de Gemini o un inicio de sesión de Antigravity guardado en el llavero de macOS (Keychain)— o `no login` con el comando que inicia su sesión, de modo que la tabla también muestra qué cuentas de cada CLI están conectadas. Es de solo lectura: nunca renueva un inicio de sesión, nunca imprime un token y nunca escribe dentro de un perfil. `--json` da a las herramientas la misma lista (esquema `usage-v1`). Los endpoints de uso son internos del proveedor y no oficiales.

`ak pick <kind>` lee las mismas filas y nombra la cuenta con más margen. `--count N` devuelve hasta N cuentas, la mejor primero; `--exclude @<profile>` deja fuera una ocupada; `--model` cuenta la ventana semanal de un modelo; `--need 5h:40` se niega a elegir sin ese margen. `--json` da el esquema `pick-v1`.

```bash
ak usage                   # cuota de cada cuenta y perfil
ak pick claude --count 3   # las tres cuentas de Claude con más margen
ak claude @work --trust-cwd  # una segunda cuenta, carpeta ya confiada
ak profiles --json         # profiles-v1, para herramientas
ak setup verify            # comprobaciones ordenadas, cada una con su comando de reparación
```

`--trust-cwd` (o `AGENTKIT_TRUST_CWD=1`) confía de antemano en la carpeta en la que arranca el agente, de modo que Claude Code y Codex se abren sin su pantalla de confianza de carpeta. `ak setup probe | verify | docker` es un asistente de solo lectura, guiado por el skill `agentkit-setup`, que inspecciona la máquina, verifica la instalación y genera una receta de contenedor fijada por tag y verificada.

## Varios agentes, varias cuentas

El skill `agentkit-orchestrate` (`ak --skill orchestrate`) enseña a un agente a repartir el trabajo entre varios agentes, cuentas y proveedores: un `ak usage` antes del lote, `ak pick --count N` para elegir las cuentas, un delegado por cuenta, la puerta de validación del propio repositorio sobre cada resultado y conmutación a la siguiente cuenta cuando una llega a un límite. El kit observa, calcula y ejecuta; nunca planifica. El líder — tú, o un agente al que se lo pediste — decide, usando solo tus propias cuentas y dentro de los términos de cada proveedor.

Para carriles largos e interactivos, cada carril se ejecuta en un panel de [Herdr](/kit/herdr) con su propia cuenta. El capítulo de la metodología [Ejecutar muchos agentes](/methodology/06-orchestration) describe el modelo completo: un líder y sus carriles, cuentas elegidas por margen, coordinación con herdr-peers y una rama y una publicación por repositorio; [Autonomía del enjambre](/es/methodology/07-swarm-autonomy) añade las comprobaciones de capacidad, el traspaso y la sucesión del líder.

## Capacidad y reservas

Desde `v0.6.0` un agente puede preguntar cuánto margen le queda a su propia cuenta, con poco coste, en cada límite entre tareas — la señal que permite a un enjambre traspasar el trabajo antes de que una cuenta se agote ([Autonomía del enjambre](/es/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (esquema `capacity-v1`) da el `headroom_pct` de la cuenta en ejecución, su `binding_window`, `resets_at` y un `verdict`: `ok`, `low` (25 % o menos), `critical` (10 % o menos, o con límite de tasa) o `unknown` (sin fuente de cuota: Cursor, Grok o Antigravity en macOS). Usa la aritmética de `ak pick`, así que ambos nunca discrepan, y lee una caché de uso que se conserva 300 segundos (`--max-age`), de modo que una comprobación en cada límite entre tareas sigue siendo barata. `--self` resuelve la cuenta que lanzó `ak`; fuera de un lanzamiento de `ak` sale con código 3 y nunca adivina. `ak usage` sigue leyendo en vivo y refresca la caché.
- **Umbrales y simulacros.** `AGENTKIT_CAPACITY_LOW` y `AGENTKIT_CAPACITY_CRITICAL` (o `--low` y `--critical`) mueven los umbrales. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` solo puede rebajar una lectura — así es como un simulacro hace que una cuenta parezca escasa — y nunca puede hacer que una parezca más holgada.
- **`ak lease <kind> @<profile> --owner <addr>`** reserva una cuenta para un carril; `ak lease release …` la libera cuando un sucesor ha aceptado el traspaso, y `ak lease ls` enumera las reservas (esquema `leases-v1`). Un perfil de Codex admite una sola reserva — un escritor por archivo de autenticación — y solo el titular libera una reserva. Las reservas caducan y son registros orientativos de números, nombres de perfil y direcciones de panel, nunca una credencial.
- **`ak pick <kind> --owner <lead>`** cuenta todas las reservas activas, incluidas las del propio titular: clasifica las candidatas por `headroom / (1 + leases)` y nunca ofrece una cuenta de Codex reservada, ni siquiera a quien la tiene. `--reuse @<profile>` traspasa una de las reservas del propio titular, por ejemplo al sucesor de un carril. Sin `--owner` la clasificación no cambia.

```bash
ak capacity --self --json                        # margen y veredicto de este agente
ak lease claude @work --owner local:w2:p1        # reservar una cuenta para un carril
ak pick codex --owner local:w1:p1 --count 2      # omitir cuentas reservadas por otros
```

El trabajo se mueve solo entre las cuentas que declaraste para el plan, dentro de los términos de cada proveedor: ningún agente crea una cuenta, renueva un inicio de sesión ni gasta un restablecimiento de Codex. El pack de Deep Work Plan lee el veredicto con su propio helper y lo convierte en continuar, prepararse o traspasar; sin el kit, o con uno más antiguo, la capacidad se reporta como desconocida, nunca como ok.

## Instalación

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisitos: `bash` en macOS o Linux, y `python3` 3.9 o posterior; nada más. Windows usa `install.ps1`. Fija `v1.0.1`: `v0.2.0` y `v0.2.1` no tienen soporte. Verifica una versión con su asset `SHA256SUMS`.

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/coding-agents-kit`, tag `v1.0.1`, interfaz 1 |
| Clave de registro | `agentkit` en `.dwp/config.json` |
| Transporte | sin interfaz: un `ak run` por delegado en un worktree de git dedicado |
| Proporciona | `subagents`, `cancel_children`, `model_routing` |
| Requiere | la concesión `agent_delegation` del contrato del plan |

**Estable desde `v1.0.0`.** La interfaz pública del kit sigue el versionado semántico y solo cambia de forma incompatible en una nueva versión mayor: la superficie de comandos (`ak <kind> [@profile]` para cada tipo definido en `providers.toml`, y cada verbo con sus opciones documentadas), la postura de permisos, la interfaz 1 (`ak doctor --json`, `ak env`, la gramática y el sobre de `ak run`), los esquemas JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, `setup-verify-v1`), y la estructura de instalación y los nombres de las variables del archivo de entorno. `v1.0.0` no cambia ningún comando, opción, clave ni esquema respecto de `v0.7.1`.

## Autonomía por defecto, con una exclusión que siempre prevalece

Desde `v0.2.0`, `ak <kind>` lanza cada agente en **autonomía**: agrega la opción de autonomía propia de la CLI, que solo se guarda en el `providers.toml` del kit. La autonomía está pensada para entornos desechables o aislados, como un contenedor de desarrollo.

La **exclusión siempre prevalece**: `--ask` en un comando, o `AGENTKIT_PERMISSIONS=ask` en el entorno o en el archivo env del kit, suprime la opción incluso cuando el mismo comando indica `--auto`. Una sesión excluida transmite la exclusión a los agentes que inicia. En un host, configura la exclusión.

El addon no escribe ninguna opción de autonomía y nunca pasa `--auto`. Pasa `--ask` cuando un plan registra la exclusión. Un plan que concede `agent_delegation` en un host acepta delegados autónomos confinados a su propio worktree, que no es un sandbox.

## Qué agrega a un plan

En un plan v7 cuyo contrato concede `agent_delegation`, `execute` puede pasar una tarea `parallel_safe` a otra CLI: crea un worktree de git dedicado, ejecuta allí `ak run` con un tiempo límite y recoge el resultado en `analysis_results/delegations/` del plan. El resultado es evidencia `asserted` hasta que el propio ejecutor de compuertas del plan lo observa. Cancelar un delegado detiene todo su árbol de procesos.

## Agentkit o Herdr

| Situación | Usar |
|---|---|
| Una tarea `parallel_safe` acotada con una salida declarada | Agentkit (sin interfaz) |
| La tarea necesita interacción, dura mucho o vive en otra máquina | [Herdr](/kit/herdr) (un par en un panel) |

Ambos se combinan: herdr-peers puede lanzar un par en un panel con el entorno que imprime `ak env <kind> @profile`. Para muchos carriles a la vez, consulta [Ejecutar muchos agentes](/methodology/06-orchestration).

## Notas

Opcional y nunca obligatorio. Los valores de las claves de API nunca se imprimen, registran ni escriben en un archivo de configuración; la excepción documentada es Cline, que recibe su clave en la línea de comandos. La extracción de resultados para OpenCode, Pi, Cline y Grok se construyó a partir de la documentación de los proveedores y todavía no se ha probado con cuentas reales; una salida desconocida recurre al texto sin procesar.
