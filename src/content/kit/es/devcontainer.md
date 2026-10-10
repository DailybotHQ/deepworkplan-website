---
title: Devcontainer
description: "Un contenedor de desarrollo reproducible por repositorio, desde una plantilla: agentes listos con ak, Herdr conectado en ambos sentidos y sin clave SSH dentro."
kind: addon
lang: es
order: 1
---

# Addon de devcontainer

Dale al repositorio un contenedor de desarrollo reproducible y aislado, que puedan usar por igual las personas, los editores y los agentes de programación. En **DWP v7** (pack `v7.1.4`) este addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un producto MIT que funciona sin Deep Work Plan. Es opcional: un repositorio es plenamente conforme sin él.

## Qué proporciona devcontainer-kit

- **Una plantilla**, basada en la especificación de [Dev Containers](https://containers.dev), que `dck init` renderiza en el repositorio con una estructura fija: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` y `dev.sh`. Si se vuelve a ejecutar más adelante, concilia y nunca sobrescribe tus ediciones; cualquier cambio en un archivo existente se muestra primero y requiere consentimiento.
- **El contenedor propio del repositorio.** El Dockerfile parte de la imagen oficial del runtime fijada por digest (`node-24`, `python-3.13` o `debian`) y copia los pasos de compilación del kit en `docker/local/<service>/dck/`. No interviene ninguna imagen base compartida.
- **`dev.sh` y `dck`.** `bash dev.sh up` construye, inicia y se conecta al contenedor desde una terminal normal; `shell`, `rebuild`, `doctor` y los demás funcionan con o sin VS Code o Cursor.
- **Herdr en ambos sentidos.** El [Herdr](https://herdr.dev) del host conecta cada contenedor como una máquina a través de un servidor SSH limitado a loopback, y el contenedor se abre con la barra lateral estándar: Home, Editor, Development y Agents. Dentro, [herdr-peers](/kit/herdr) permite que los agentes consulten a agentes del host y de otros contenedores.
- **La skill `dck-dockerfile`.** Un agente crea o regenera el contenedor de un repositorio cuando se le pide y lo demuestra con una compilación real.

## Instalación

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisitos: `bash` 3.2 o posterior y `python3` 3.11 o posterior en un host Linux o macOS, y Docker con Compose v2 para los comandos del contenedor. Verifica una versión con su asset `SHA256SUMS`. Fija `v0.2.2`: `v0.2.0` no tiene soporte.

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/devcontainer-kit`, tag `v0.2.2`, interfaz 2 |
| Clave de registro | `devcontainer` en `.dwp/config.json` |
| Configuración por repositorio | `.devcontainer/dck.toml` |
| Detección | `dck doctor --json` |

## Capas

Todo contenedor incluye las herramientas de desarrollo (git, gh, ripgrep, un servidor SSH, Herdr y herdr-peers) y ningún secreto. El resto es una capa que eliges en `dck.toml`:

| Capa | Predeterminado | Qué agrega |
|---|---|---|
| `agents` | desactivada | [coding-agents-kit](/kit/agentkit) desde su versión verificada y las CLI que indiques, cada una con su propio volumen persistente, más los presets `classic` (`claudex`, `codexx`, …) y `providers` (`claude-glm`, `codex-azure`, …). Los agentes se ejecutan en autonomía por defecto: el contenedor es el sandbox. Para desactivarla: `AGENTKIT_PERMISSIONS=ask` en el `.env` del servicio. |
| `editor` | activada | Neovim con [DeepWorkPlan Vim](/kit/vim) fijado por tag; desactivada, deja un editor simple. |
| `dailybot` | desactivada | La CLI de Dailybot, para el addon dailybot. |

Los inicios de sesión, `gh`, la configuración de Herdr y la identidad de git sobreviven a `bash dev.sh rebuild`.

## Valores de seguridad predeterminados

- Todo puerto publicado se vincula a `127.0.0.1` salvo que `dck.toml` defina `bind`.
- Git sobre SSH pasa por el agente SSH del host: su socket, nunca un archivo de clave y nunca un `~/.ssh` o `~/.gitconfig` montado. La identidad de git proviene de los valores `DCK_GIT_*` que completa `dck setup`.
- Las claves de host SSH se generan en tiempo de ejecución en un volumen por proyecto, nunca se incorporan a una imagen; el servidor solo acepta claves públicas, sin inicio de sesión como root y sin contraseñas.
- La plantilla no agrega `cap_add`, ni modo `privileged`, ni el socket de Docker.
- Cada descarga está fijada por versión y verificada por checksum; la imagen base está fijada por digest.
- La malla de Herdr que permite a los agentes de un contenedor llegar a los demás está activada por defecto y documentada, junto con sus interruptores de desactivación, en el modelo de amenazas del kit.

## Notas

Opcional y nunca obligatorio. Un repositorio es plenamente conforme con cero addons opcionales. v0.2 admite hosts Linux y macOS; la malla entre contenedores necesita Docker Desktop.
