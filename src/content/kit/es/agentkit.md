---
title: Agentkit
description: "Un addon opcional de v7 basado en coding-agents-kit: un comando ak para cada agente de código de terminal y delegación sin interfaz de tareas acotadas del plan."
kind: addon
lang: es
order: 8
---

# Addon de Agentkit

Cada agente de código de terminal tiene sus propias opciones para continuar una sesión, su propia forma de mantener separada una segunda cuenta, su propio modo sin interfaz y su propio interruptor para omitir las solicitudes de permiso. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** pone una sola superficie de comandos sobre todos ellos: `ak <kind> [@profile]`.

Este addon integra el kit en la **beta de DWP v7** (`v7.0.0-beta.1`, una versión preliminar) como transporte de delegación **sin interfaz** (headless). Es opcional: sin él, cada tarea se ejecuta en la sesión actual, exactamente como antes. El kit en sí es un producto MIT que funciona sin Deep Work Plan.

## Qué te da el kit

- **Una gramática para cada CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` y `ak grok`, más variantes de proveedor (GLM, Azure, xAI), con las mismas opciones de sesión: `-c` continúa, `-r <id>` reanuda.
- **Perfiles.** `ak claude @work` ejecuta una segunda cuenta en su propio directorio home, separada de la primera.
- **Ejecuciones sin interfaz.** `ak run <kind> -- "<prompt>"` ejecuta un prompt de forma no interactiva y devuelve un código de salida documentado, opcionalmente como un único objeto JSON.
- **Un diagnóstico.** `ak doctor --json` informa qué CLI están instaladas, los perfiles y los nombres de las claves configuradas, nunca sus valores.
- **Instalaciones.** `ak install <cli>` instala una CLI ausente desde el canal oficial de su proveedor.

## Instalación

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisitos: `bash` en macOS o Linux, y `python3` 3.9 o posterior; nada más. Windows usa `install.ps1`. Fija `v0.1.1`: reemplaza a `v0.1.0`, ya que incluye una corrección de seguridad.

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, interfaz 1 |
| Clave de registro | `agentkit` en `.dwp/config.json` |
| Transporte | sin interfaz: un `ak run` por delegado en un worktree de git dedicado |
| Proporciona | `subagents`, `cancel_children`, `model_routing` |
| Requiere | la concesión `agent_delegation` del contrato del plan |

## Los permisos se transmiten tal cual

`ak <kind>` **no** agrega ninguna opción para saltarse permisos. La autonomía es una aceptación explícita: `--auto` en un comando, o `AGENTKIT_PERMISSIONS=auto` en el entorno, agrega la opción de autonomía propia de la CLI para ese lanzamiento. El preset de alias `classic`, que recrea atajos como `claudex`, viene desactivado.

El addon nunca agrega una opción de autonomía por su cuenta. Un plan usa `--auto` solo con la aceptación explícita y registrada de quien desarrolla, y solo dentro de un worktree o contenedor aislado.

## Qué agrega a un plan

En un plan v7 cuyo contrato concede `agent_delegation`, `execute` puede pasar una tarea `parallel_safe` a otra CLI: crea un worktree de git dedicado, ejecuta allí `ak run` con un tiempo límite y recoge el resultado en `analysis_results/delegations/` del plan. El resultado es evidencia `asserted` hasta que el propio ejecutor de compuertas del plan lo observa. Cancelar un delegado detiene todo su árbol de procesos.

## Agentkit o Herdr

| Situación | Usar |
|---|---|
| Una tarea `parallel_safe` acotada con una salida declarada | Agentkit (sin interfaz) |
| La tarea necesita interacción, dura mucho o vive en otra máquina | [Herdr](/kit/herdr) (un par en un panel) |

Ambos se combinan: herdr-peers puede lanzar un par en un panel con el entorno que imprime `ak env <kind> @profile`.

## Notas

Opcional y nunca obligatorio. Los valores de las claves de API nunca se imprimen, registran ni escriben en un archivo de configuración; la excepción documentada es Cline, que recibe su clave en la línea de comandos. La extracción de resultados para OpenCode, Pi, Cline y Grok se construyó a partir de la documentación de los proveedores y todavía no se ha probado con cuentas reales; una salida desconocida recurre al texto sin procesar.
