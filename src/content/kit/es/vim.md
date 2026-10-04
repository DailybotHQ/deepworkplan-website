---
title: DeepWorkPlan Vim
description: "Addon DWP opcional: DeepWorkPlan Vim, editor de terminal de Deep Work Plan — índice de comandos generado, navegador de planes y lectura de Markdown en Neovim."
kind: addon
lang: es
order: 6
---

# Addon DeepWorkPlan Vim

**DeepWorkPlan Vim** es el editor de terminal para Deep Work Plan: una configuración de Neovim (es el propio editor, no un archivo de repositorio) que pone las superficies de trabajo de la metodología a una pulsación de distancia. Mientras que las demás entradas del kit instalan harness en un repositorio, este addon equipa a la persona — y a cualquier agente que maneje Neovim en modo headless — con un editor que habla DWP de forma nativa.

Requiere **Neovim 0.12 o superior**, funciona en **macOS y Linux** (Windows cuenta con una ruta manual documentada) y se distribuye bajo licencia **GPL-3.0** — libre para usar, estudiar y modificar.

## Qué añade

| # | Función | Qué hace | Mapeo |
|---|---------|--------------|---------|
| F1 | **Índice de comandos generado** | Todo el editor, en una lista: cada comando con su mapeo y una descripción de una línea, generado desde la configuración viva para que el índice no diverja del editor. | `SPC h h` |
| F2 | **Gestos estilo VS Code** | Seleccionar todo, copiar y yank al portapapeles bajo los acordes que la memoria muscular ya conoce. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Navegador de Deep Work Plan** | Abre el plan que dirige el repositorio — tareas, puertas de validación y estado de finalización — sin salir del editor. | `SPC P` |
| F4 | **Visor de Markdown** | Lee Markdown como lo leen los agentes: vista previa renderizada, o la fuente cruda para fidelidad de copia y pega. | `SPC m p`, `SPC m r` |
| F5 | **Instalador de una línea** | Un `install.sh` consent-first para macOS y Linux; la ruta manual documentada cubre Windows. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Instalación

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

El instalador es **consent-first**: una configuración de Neovim existente y ajena nunca se sobrescribe. Sin terminal, aborta con instrucciones en lugar de tocar nada; de forma interactiva, pregunta antes de apartar una configuración existente. Los plugins se instalan en modo headless en el primer arranque — sin baile de cerrar y reabrir.

Windows no es un destino de `curl | bash`. La ruta manual documentada (winget más Git Bash, o WSL) vive en el README del repositorio.

## Cuándo recurrir a él

| Señal | Acción |
|--------|--------|
| La persona desarrolladora vive en la terminal y maneja el repositorio por plan | **Ofrecer** el addon |
| Ejecución DWP de horizonte largo donde el navegador de planes (`SPC P`) mantiene el estado visible | **Recomendar** |
| El editor de la persona desarrolladora ya está configurado y no se negocia | **Omitir** — el addon es opcional por diseño |
| Equipo solo Windows sin WSL | **Omitir**, o apuntar a la ruta manual documentada |

## Entradas relacionadas del kit

- [Devcontainer](/kit/devcontainer) — entorno de desarrollo reproducible (primer addon)
- [Dailybot](/kit/dailybot) — reportes del ciclo de vida del plan visibles para el equipo (segundo addon)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — revisión local durante las revisiones finales del plan (quinto addon)
