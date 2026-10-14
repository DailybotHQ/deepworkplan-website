---
title: Devcontainer
description: "Un contenedor de desarrollo reproducible por repositorio: agentes con tus cuentas del host vía ak, Herdr en ambos sentidos y claves SSH solo si las activas."
kind: addon
lang: es
order: 1
---

# Addon de devcontainer

Dale al repositorio un contenedor de desarrollo reproducible y aislado, que puedan usar por igual las personas, los editores y los agentes de programación. En **DWP v7** (pack `v7.8.1`) este addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un producto MIT que funciona sin Deep Work Plan. Es opcional: un repositorio es plenamente conforme sin él.

## Qué proporciona devcontainer-kit

- **Una plantilla**, basada en la especificación de [Dev Containers](https://containers.dev), que `dck init` renderiza en el repositorio con una estructura fija: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` y `dev.sh`. Si se vuelve a ejecutar más adelante, concilia y nunca sobrescribe tus ediciones; cualquier cambio en un archivo existente se muestra primero y requiere consentimiento.
- **El contenedor propio del repositorio.** El Dockerfile parte de la imagen oficial del runtime fijada por digest (`node-24`, `python-3.13` o `debian`) y copia los pasos de compilación del kit en `docker/local/<service>/dck/`. No interviene ninguna imagen base compartida.
- **`dev.sh` y `dck`.** `bash dev.sh up` construye, inicia y se conecta al contenedor desde una terminal normal; `shell`, `rebuild`, `doctor` y los demás funcionan con o sin VS Code o Cursor.
- **Herdr en ambos sentidos.** El [Herdr](https://herdr.dev) del host conecta cada contenedor como una máquina a través de un servidor SSH limitado a loopback, y el contenedor se abre con la barra lateral estándar: App, Editor, Development y Agents. Cada espacio de trabajo y cada panel, incluidos los que se abran después, comienzan en la ruta de la aplicación (`/app` por defecto). Dentro, [herdr-peers](/kit/herdr) permite que los agentes consulten a agentes del host y de otros contenedores.
- **La skill `dck-dockerfile`.** Un agente crea o regenera el contenedor de un repositorio cuando se le pide y lo demuestra con una compilación real.

## Instalación

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisitos: `bash` 3.2 o posterior y `python3` 3.11 o posterior en un host Linux o macOS, y Docker con Compose v2 para los comandos del contenedor. Verifica una versión con su asset `SHA256SUMS`. Fija `v1.0.0`: `v0.2.0` no tiene soporte.

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/devcontainer-kit`, tag `v1.0.1`, interfaz 2 |
| Clave de registro | `devcontainer` en `.dwp/config.json` |
| Configuración por repositorio | `.devcontainer/dck.toml` |
| Detección | `dck doctor --json` |

**Estable desde `v1.0.0`.** La interfaz pública sigue el versionado semántico y solo cambia de forma incompatible en una nueva versión mayor (y, para los archivos, con un nuevo número de interfaz): los verbos de `dck` con sus opciones documentadas y sus códigos de salida (`0` correcto, `1` fallo, `2` uso, `3` configuración, `4` entorno, `5` rechazado), los esquemas de `dck.toml`, del perfil del host y de `dck doctor --json` (interfaz 2), y el contrato de renderizado: los archivos que `dck init` escribe y gestiona, los marcadores `dck:managed` y los bloques de usuario que conserva, y el entorno que lee el entrypoint. Nada se rompe al actualizar desde `v0.3.7`: ejecuta `dck init` y `dck rebuild` para que la imagen incluya las nuevas versiones fijadas (herdr-peers, coding-agents-kit y DeepWorkPlan Vim, cada uno en `v1.0.0`).

## Capas

Todo contenedor incluye las herramientas de desarrollo (git, gh, ripgrep, un servidor SSH, Herdr y herdr-peers) y ningún secreto, salvo que actives las [cuentas del host](#cuentas-del-host-dentro-del-contenedor). El resto es una capa que eliges en `dck.toml`:

| Capa | Predeterminado | Qué agrega |
|---|---|---|
| `agents` | desactivada | [coding-agents-kit](/kit/agentkit) desde su versión verificada y las CLI que indiques, cada una con su propio volumen persistente, más los presets `classic` (`claudex`, `codexx`, …) y `providers` (`claude-glm`, `codex-azure`, …). Los agentes se ejecutan en autonomía por defecto: el contenedor es el sandbox. Para desactivarla: `AGENTKIT_PERMISSIONS=ask` en el `.env` del servicio. |
| `editor` | activada | Neovim con [DeepWorkPlan Vim](/kit/vim) fijado por tag; desactivada, deja un editor simple. |
| `dailybot` | desactivada | La CLI de Dailybot, para el addon dailybot. |

Los inicios de sesión, `gh`, la configuración de Herdr y la identidad de git sobreviven a `bash dev.sh rebuild`. Con la capa `agents`, la imagen también incluye las tres skills de coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), enlazadas en el directorio de skills de cada agente en cada inicio, de modo que un contenedor recreado las conserva.

El volumen de estado (clave de host SSH, `~/.ssh`, inicio de sesión de `gh`, estado del cliente de Herdr, historial) se llama `state`. Cuando varios servicios comparten un mismo proyecto de compose, dale a cada uno su propio nombre con `[compose] state_volume` en `dck.toml` (o `dck init --state-volume NAME`); de lo contrario, todos montan el mismo volumen, y `dck doctor` lo advierte.

## Agentes entre máquinas

Desde `v0.2.3`, `dck up` configura una malla bidireccional sin pasos manuales, en Docker Desktop:

- **Contenedores y el host.** Los agentes de dentro llegan a los agentes de Herdr del host, de cada uno de los demás contenedores dck y de los otros contenedores loopback que el Herdr de tu host ya gestiona, y estos también llegan de vuelta. Cada par lleva una clave de host fijada; nada se acepta como confiable en el primer uso.
- **Un listener opcional en el host.** `dck setup` ofrece, una sola vez, un servidor SSH a nivel de usuario en `127.0.0.1` que solo acepta la clave de dck y que launchd mantiene en ejecución (macOS). Si ya ejecutas un listener loopback, apunta el perfil del host a él. `dck host listener disable` lo elimina.
- **Sobrevive a las reconstrucciones.** El catálogo de máquinas de Herdr del contenedor vive en un volumen, así que `bash dev.sh rebuild` conserva todas las máquinas registradas dentro. Desde `v0.3.2`, `rebuild`, `start` y `restart` ejecutan los mismos pasos que `up`: el contenedor se vuelve a registrar en el Herdr del host, su clave de host se vuelve a fijar y se propaga la malla, de modo que un contenedor construido desde cero llega de inmediato al host y a sus pares.
- **Paneles de Codex dentro de un contenedor.** Un agente Codex necesita `HERDR_PEERS_SELF`, el id de máquina del contenedor tal como está guardado en el host, para consultar a pares de otras máquinas. Desde `v0.3.3` el kit registra ese id en cada registro y los shells de inicio de sesión del contenedor lo exportan, así que ningún agente lo define a mano; `dck doctor` señala cualquier discrepancia. Desde `v0.3.4` las configuraciones de Codex propias del contenedor omiten la comprobación de actualizaciones de Codex al iniciar y su daemon en segundo plano (el kit fija la versión de cada CLI), sin tocar nunca el home de Codex de tu host ni un perfil compartido.
- **Respuestas también desde el host.** `dck setup` instala un [herdr-peers](/kit/herdr) verificado en el host, de modo que `dck agents` y `dck ask` funcionan allí, y los agentes del host responden con `herdr-peers reply`.
- **Contenedores que el kit no creó.** Enumera las claves públicas con las que inician sesión en `[ssh] authorized_extra` del perfil del host, y también podrán llegar a los contenedores dck.

Combínalo con [coding-agents-kit](/kit/agentkit) en el host y en el contenedor, y el mismo `ak` lanza agentes en ambos lados.

## Cuentas del host dentro del contenedor

Un contenedor puede usar las cuentas que ya tienes en el host, igual que git ya funciona a través del agente SSH del host, sin iniciar sesión dentro. Es opcional y vive en tu **perfil del host**, nunca en el `dck.toml` de un repositorio:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

Con `host_profiles` activado, `dck up` comparte solo los perfiles de las CLI que instala el repositorio:

- **Claude Code** mediante un token de larga duración por perfil: `CLAUDE_CODE_OAUTH_TOKEN` para `@default` y `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` para `@name` (el sufijo en mayúsculas, y cualquier carácter fuera de `A-Z`, `0-9` y `_` convertido en `_`).
- **Codex** mediante su archivo de autenticación, para `@default` y para cada perfil.
- **El archivo de entorno del kit**, de solo lectura y reducido a los nombres de `host_env_keys`.

El home completo de agentkit nunca se monta, y se omiten los perfiles que contienen rutas absolutas del host. Un inicio de sesión de Codex compartido en lectura y escritura puede ser renovado por dos escritores a la vez: mantén un solo agente activo por cuenta de Codex. `[agents] default_profile` en el perfil del host (por ejemplo `{ claude = "@work3" }`) hace que un `ak claude` sin argumentos dentro del contenedor use esa cuenta compartida (coding-agents-kit ≥ `v0.5.2`); un inicio de sesión `@default` de Claude en macOS vive en el Llavero (Keychain) y no se puede compartir. Desde `v0.3.4` los shells del contenedor también apuntan un `claude` o `codex` sin argumentos a esa cuenta, de modo que los paneles que Herdr restaura se abren en ella en lugar de en una pantalla de inicio de sesión. Dentro del contenedor, el mismo `ak <kind> @<profile>` se ejecuta con la misma cuenta que en el host, lo que permite a un líder entregar a los carriles del contenedor las cuentas que eligió `ak pick`; consulta [Ejecutar muchos agentes](/methodology/06-orchestration).

## Varios repositorios, un stack de compose

Desde `v0.3.3`, un repositorio cuyo servicio es una parte de un proyecto de compose más grande (una API, una aplicación web, workers y una base de datos que comparten un proyecto) puede unirse a él sin editar a mano lo que dck renderiza. Todo es aditivo: un repositorio que no define ninguna de estas claves se renderiza exactamente igual que antes.

- **Un proyecto, un volumen de estado por servicio.** `[compose] project` nombra el proyecto compartido en cada repositorio; `state_volume`, `[compose] networks` y `[compose] volumes` mantienen separados el estado de cada servicio y los volúmenes de datos y las redes del stack.
- **Un bloque de usuario.** Las líneas entre `# >>> user:<service> >>>` y `# <<< user:<service> <<<` dentro del servicio de dck se conservan tal cual: claves simples para lo que dck no renderiza (`depends_on`, `healthcheck`) y `x-dck-merge:` para las claves que sí renderiza. Un archivo con solo algunos de los marcadores de dck se rechaza indicando la corrección en lugar de reescribirse.
- **Cadenas de puertos.** `ssh_port` y `ports` aceptan expresiones de compose como `"${API_PORT:-8000}:8000"`; se quedan en `127.0.0.1` salvo que la cadena indique una IP del host.
- **Builds compartidos y tu propio lanzador.** `[build] context` y `[build] dockerfile` cubren un Dockerfile compartido por varios servicios; `dev_sh = false` conserva el `dev.sh` propio del repositorio.
- **Satélites del espacio de trabajo.** Desde `v0.3.5`, una segunda instancia del servicio en su propio proyecto de compose se inicia y se detiene a través de dck (`dck --project P --compose-file F --service S up` o `down`), así que obtiene la misma clave de host, las mismas cuentas, la misma identidad de git y la misma máquina de Herdr que la principal; `up --seed-state-from VOLUME` copia solo los inicios de sesión en su volumen de estado vacío. En un archivo de superposición, `extends` debe nombrar el archivo que extiende.
- **Node para los agentes.** El Node propio de los agentes vive en `/opt/dck/node` y nunca reemplaza al de la imagen; `[agents] node_first = true` lo pone primero en el PATH cuando las herramientas del repositorio lo necesitan.

## Las claves SSH del host dentro del contenedor

Algunas herramientas solo leen archivos de clave e ignoran el agente reenviado: `gh auth login`, por ejemplo, ofrece generar una clave nueva. Desde `v0.3.2` puedes activarlo, solo en tu **perfil del host** (el `dck.toml` de un repositorio no puede definirlo; `dck setup` lo pregunta una vez, con «no» como respuesta predeterminada):

```toml
[ssh]
copy_keys = true              # default false
```

Mientras está activado, `dck up` monta el `~/.ssh` del host en solo lectura en `~/.ssh_host`, y cada inicio copia sus claves `id_*` en el `~/.ssh` del contenedor (claves privadas `0600`), sincronizadas con el host. El reenvío del agente no cambia, y al desactivarlo las copias se eliminan en el siguiente inicio. El costo: todo el `~/.ssh` del host es legible dentro del contenedor, y las claves privadas quedan guardadas en el volumen de estado.

## Valores de seguridad predeterminados

- Todo puerto publicado se vincula a `127.0.0.1` salvo que `dck.toml` defina `bind`.
- Git sobre SSH pasa por el agente SSH del host: su socket, nunca un archivo de clave y nunca un `~/.ssh` o `~/.gitconfig` montado, salvo que hayas activado [`copy_keys`](#las-claves-ssh-del-host-dentro-del-contenedor) en tu perfil del host. La identidad de git proviene de los valores `DCK_GIT_*` que completa `dck setup`.
- Las claves de host SSH se generan en tiempo de ejecución en un volumen por proyecto, nunca se incorporan a una imagen; el servidor solo acepta claves públicas, sin inicio de sesión como root y sin contraseñas.
- La plantilla no agrega `cap_add`, ni modo `privileged`, ni el socket de Docker.
- Cada descarga está fijada por versión y verificada por checksum; la imagen base está fijada por digest.
- La malla de Herdr que permite a los agentes de un contenedor llegar a los demás está activada por defecto y documentada, junto con sus interruptores de desactivación, en el modelo de amenazas del kit. El listener del host permite que el código de un contenedor en ejecución abra una shell en el host con tu usuario: es opcional, solo escucha en loopback, acepta únicamente la clave de dck y se retira con `dck host listener disable`.

## Notas

Opcional y nunca obligatorio. Un repositorio es plenamente conforme con cero addons opcionales. Se admiten hosts Linux y macOS; la malla entre contenedores necesita Docker Desktop.
