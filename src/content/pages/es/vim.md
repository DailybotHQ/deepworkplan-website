---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim es el editor de terminal de Deep Work Plan: configuración de Neovim 0.12+ con índice de comandos, navegador de planes y visor de Markdown."
lastUpdated: 2026-10-03
---

## Qué es

Una configuración de Neovim para personas y agentes de programación que viven en la terminal: tus Deep Work Plans, la documentación y el índice de comandos a una tecla de distancia.

## Instalación

Una línea instala DeepWorkPlan Vim como tu configuración de Neovim. El instalador explica qué hará y pregunta antes de tocar una configuración existente.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Primero el consentimiento: una configuración de Neovim existente nunca se sobrescribe sin tu aprobación explícita. El instalador se detiene y muestra la ruta manual.

En Windows la línea única no aplica; el README del repositorio documenta la ruta manual. [Ruta de instalación en Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Qué hace

Cinco características, acotadas a propósito. Cada una corresponde a una combinación de teclas que puedes inspeccionar en el índice de comandos generado.

| Característica | Qué es | Mapeo |
|---|---|---|
| Índice de comandos generado | Un índice de comandos generado desde la configuración activa, para que la lista de atajos siempre esté al día. | `SPC h h` |
| Gestos estilo VS Code | Gestos de edición heredados de los editores gráficos: seleccionar todo y copiar al portapapeles del sistema. | `<C-a>`, `y`, `<leader>y` |
| Navegador de Deep Work Plan | Un panel que recorre los planes del repositorio: lee un plan, sus tareas y sus puertas de validación sin salir del editor. | `SPC P` |
| Visor de Markdown | Vista previa de Markdown en el navegador o renderizado en el búfer, para que la documentación y los planes queden donde ocurre el trabajo. | `SPC m p`, `SPC m r` |
| Instalador de una línea | Un instalador autónomo para macOS y Linux, con una ruta manual documentada para Windows. | — |

## Requisitos

- Neovim 0.12 o más reciente, con Lua (lua, lua5.4 o luajit) disponible
- macOS y Linux; Windows cuenta con una ruta manual documentada
- Licencia GPL-3.0 — libre de usar, estudiar y modificar

## Relacionados

- [Lee el doc del addon en el kit](/kit/vim)
- [Consulta el repositorio fuente](https://github.com/DailybotHQ/deepworkplan-vim)
- Instala DeepWorkPlan Vim, abre Neovim y lee tus Deep Work Plans en la misma terminal que usan tus agentes.
