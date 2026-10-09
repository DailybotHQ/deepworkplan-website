---
title: Devcontainer
description: "Un addon opcional basado en devcontainer-kit: una plantilla de Dev Containers generada por dck init, imágenes base sin agentes y máquinas Herdr por contenedor."
kind: addon
lang: es
order: 1
---

# Addon de devcontainer

Dale al repositorio un contenedor de desarrollo reproducible y aislado, que puedan usar por igual las personas, los editores y los agentes de código. En la **beta de DWP v7** (`v7.0.0-beta.1`, una versión preliminar) este addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un producto MIT que funciona sin Deep Work Plan, y reemplaza la plantilla que el pack incluía antes. Es opcional: un repositorio es plenamente conforme sin él.

## Qué proporciona devcontainer-kit

- **Una plantilla**, basada en la especificación de [Dev Containers](https://containers.dev), que `dck init` genera en el repositorio: `devcontainer.json`, un archivo de compose y `docker/local/`. Si se vuelve a ejecutar más adelante, reconcilia y nunca sobrescribe tus ediciones; cualquier cambio en un archivo existente se muestra primero y requiere consentimiento.
- **`dck`**, un lanzador que ejecuta el contenedor desde una terminal normal —`setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor`— con o sin VS Code o Cursor.
- **Imágenes base** en tres variantes, `python-3.13`, `node-24` y `debian`, que se distribuyen **sin** agentes de código.
- **Una biblioteca de entrypoint** para volúmenes persistentes, SSH y el entorno de las sesiones SSH, en lugar de un entrypoint copiado a mano en cada repositorio.
- **Máquinas Herdr.** Cada contenedor puede unirse a [Herdr](https://herdr.dev) mediante un servidor SSH limitado a loopback, de modo que sus agentes se convierten en pares alcanzables.

## Instalación

```bash
git clone --branch v0.1.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Requisitos: `bash` 3.2 o posterior y `python3` 3.11 o posterior en un host Linux o macOS, y Docker con Compose v2 para los comandos del contenedor. Verifica una versión con su asset `SHA256SUMS`.

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/devcontainer-kit`, tag `v0.1.2`, interfaz 1 |
| Clave de registro | `devcontainer` en `.dwp/config.json` |
| Configuración por repositorio | `.devcontainer/dck.toml` |
| Detección | `dck doctor --json` |

## Las capas son opcionales

Las imágenes base incluyen las herramientas de desarrollo —git, gh, ripgrep, un servidor SSH, Herdr y Neovim con DeepWorkPlan Vim fijado por tag— y ningún agente de código, ninguna CLI de reportes y ningún secreto. Todo lo demás es una capa que activas en `dck.toml`:

| Capa | Predeterminado | Qué agrega |
|---|---|---|
| `agents` | desactivada | Instala [coding-agents-kit](/kit/agentkit) y las CLI que indiques, cada una con su propio volumen persistente. No se configura ninguna opción para saltarse permisos. |
| `editor` | activada | Neovim con DeepWorkPlan Vim; desactivada, ofrece un editor simple. |

## Valores de seguridad predeterminados

- Todo puerto publicado se vincula a `127.0.0.1` salvo que `dck.toml` defina `bind`.
- Reenvío del agente SSH desde el host; las claves privadas del host nunca se copian a un contenedor.
- Las claves de host SSH se generan en tiempo de ejecución en un volumen por proyecto, nunca se incorporan a una imagen; el servidor solo acepta claves públicas, sin inicio de sesión como root y sin contraseñas.
- La plantilla no agrega `cap_add`, ni modo `privileged`, ni el socket de Docker.
- Las imágenes base y las herramientas se fijan por versión y se verifican por checksum; compose referencia la imagen base por digest siempre que el digest se pueda resolver.

## Notas

Opcional y nunca obligatorio. Un repositorio es plenamente conforme con cero addons opcionales. v0.1 admite hosts Linux y macOS.
