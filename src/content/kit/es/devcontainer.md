---
title: Devcontainer
description: "Un contenedor de desarrollo reproducible por repositorio, desde una plantilla: agentes con tus cuentas del host vía ak, Herdr en ambos sentidos y sin clave SSH."
kind: addon
lang: es
order: 1
---

# Addon de devcontainer

Dale al repositorio un contenedor de desarrollo reproducible y aislado, que puedan usar por igual las personas, los editores y los agentes de programación. En **DWP v7** (pack `v7.6.0`) este addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un producto MIT que funciona sin Deep Work Plan. Es opcional: un repositorio es plenamente conforme sin él.

## Qué proporciona devcontainer-kit

- **Una plantilla**, basada en la especificación de [Dev Containers](https://containers.dev), que `dck init` renderiza en el repositorio con una estructura fija: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` y `dev.sh`. Si se vuelve a ejecutar más adelante, concilia y nunca sobrescribe tus ediciones; cualquier cambio en un archivo existente se muestra primero y requiere consentimiento.
- **El contenedor propio del repositorio.** El Dockerfile parte de la imagen oficial del runtime fijada por digest (`node-24`, `python-3.13` o `debian`) y copia los pasos de compilación del kit en `docker/local/<service>/dck/`. No interviene ninguna imagen base compartida.
- **`dev.sh` y `dck`.** `bash dev.sh up` construye, inicia y se conecta al contenedor desde una terminal normal; `shell`, `rebuild`, `doctor` y los demás funcionan con o sin VS Code o Cursor.
- **Herdr en ambos sentidos.** El [Herdr](https://herdr.dev) del host conecta cada contenedor como una máquina a través de un servidor SSH limitado a loopback, y el contenedor se abre con la barra lateral estándar: App, Editor, Development y Agents. Cada espacio de trabajo y cada panel, incluidos los que se abran después, comienzan en la ruta de la aplicación (`/app` por defecto). Dentro, [herdr-peers](/kit/herdr) permite que los agentes consulten a agentes del host y de otros contenedores.
- **La skill `dck-dockerfile`.** Un agente crea o regenera el contenedor de un repositorio cuando se le pide y lo demuestra con una compilación real.

## Instalación

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisitos: `bash` 3.2 o posterior y `python3` 3.11 o posterior en un host Linux o macOS, y Docker con Compose v2 para los comandos del contenedor. Verifica una versión con su asset `SHA256SUMS`. Fija `v0.3.0`: `v0.2.0` no tiene soporte.

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/devcontainer-kit`, tag `v0.3.0`, interfaz 2 |
| Clave de registro | `devcontainer` en `.dwp/config.json` |
| Configuración por repositorio | `.devcontainer/dck.toml` |
| Detección | `dck doctor --json` |

## Capas

Todo contenedor incluye las herramientas de desarrollo (git, gh, ripgrep, un servidor SSH, Herdr y herdr-peers) y ningún secreto, salvo que actives las [cuentas del host](#cuentas-del-host-dentro-del-contenedor). El resto es una capa que eliges en `dck.toml`:

| Capa | Predeterminado | Qué agrega |
|---|---|---|
| `agents` | desactivada | [coding-agents-kit](/kit/agentkit) desde su versión verificada y las CLI que indiques, cada una con su propio volumen persistente, más los presets `classic` (`claudex`, `codexx`, …) y `providers` (`claude-glm`, `codex-azure`, …). Los agentes se ejecutan en autonomía por defecto: el contenedor es el sandbox. Para desactivarla: `AGENTKIT_PERMISSIONS=ask` en el `.env` del servicio. |
| `editor` | activada | Neovim con [DeepWorkPlan Vim](/kit/vim) fijado por tag; desactivada, deja un editor simple. |
| `dailybot` | desactivada | La CLI de Dailybot, para el addon dailybot. |

Los inicios de sesión, `gh`, la configuración de Herdr y la identidad de git sobreviven a `bash dev.sh rebuild`.

## Agentes entre máquinas

Desde `v0.2.3`, `dck up` configura una malla bidireccional sin pasos manuales, en Docker Desktop:

- **Contenedores y el host.** Los agentes de dentro llegan a los agentes de Herdr del host, de cada uno de los demás contenedores dck y de los otros contenedores loopback que el Herdr de tu host ya gestiona, y estos también llegan de vuelta. Cada par lleva una clave de host fijada; nada se acepta como confiable en el primer uso.
- **Un listener opcional en el host.** `dck setup` ofrece, una sola vez, un servidor SSH a nivel de usuario en `127.0.0.1` que solo acepta la clave de dck y que launchd mantiene en ejecución (macOS). Si ya ejecutas un listener loopback, apunta el perfil del host a él. `dck host listener disable` lo elimina.
- **Sobrevive a las reconstrucciones.** El catálogo de máquinas de Herdr del contenedor vive en un volumen, así que `bash dev.sh rebuild` conserva todas las máquinas registradas dentro.
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

El home completo de agentkit nunca se monta, y se omiten los perfiles que contienen rutas absolutas del host. Un inicio de sesión de Codex compartido en lectura y escritura puede ser renovado por dos escritores a la vez: mantén un solo agente activo por cuenta de Codex. Dentro del contenedor, el mismo `ak <kind> @<profile>` se ejecuta con la misma cuenta que en el host, lo que permite a un líder entregar a los carriles del contenedor las cuentas que eligió `ak pick`; consulta [Ejecutar muchos agentes](/methodology/06-orchestration).

## Valores de seguridad predeterminados

- Todo puerto publicado se vincula a `127.0.0.1` salvo que `dck.toml` defina `bind`.
- Git sobre SSH pasa por el agente SSH del host: su socket, nunca un archivo de clave y nunca un `~/.ssh` o `~/.gitconfig` montado. La identidad de git proviene de los valores `DCK_GIT_*` que completa `dck setup`.
- Las claves de host SSH se generan en tiempo de ejecución en un volumen por proyecto, nunca se incorporan a una imagen; el servidor solo acepta claves públicas, sin inicio de sesión como root y sin contraseñas.
- La plantilla no agrega `cap_add`, ni modo `privileged`, ni el socket de Docker.
- Cada descarga está fijada por versión y verificada por checksum; la imagen base está fijada por digest.
- La malla de Herdr que permite a los agentes de un contenedor llegar a los demás está activada por defecto y documentada, junto con sus interruptores de desactivación, en el modelo de amenazas del kit. El listener del host permite que el código de un contenedor en ejecución abra una shell en el host con tu usuario: es opcional, solo escucha en loopback, acepta únicamente la clave de dck y se retira con `dck host listener disable`.

## Notas

Opcional y nunca obligatorio. Un repositorio es plenamente conforme con cero addons opcionales. v0.2 admite hosts Linux y macOS; la malla entre contenedores necesita Docker Desktop.
