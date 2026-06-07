---
title: Sistema de diseño
description: "Addon opcional de frontend que da al repo un DESIGN.md (en docs/, indexado desde AGENTS.md) para que los agentes generen UI fiel al sistema de diseño propio."
kind: addon
lang: es
order: 4
---

# Addon de sistema de diseño

Da a un repositorio de frontend/UI un `DESIGN.md` — un archivo Markdown de sistema de diseño que cualquier agente de codificación lee para generar una UI coherente con el sistema de diseño **propio** del repositorio, en lugar de los valores predeterminados sin estilo y estadísticamente comunes a los que recurre un agente cuando no tiene ninguna guía. El cuarto addon opcional de Deep Work Plan.

## Qué añade

- Un `DESIGN.md` en `docs/DESIGN.md` (junto a las demás especificaciones del repositorio; la raíz del repositorio solo cuando no existe un árbol `docs/`), **referenciado desde `AGENTS.md`** para que los agentes lo descubran igual que el resto de la documentación.
- Las secciones canónicas: visión general/atmósfera, paleta de colores y roles (claro + oscuro), tipografía, maquetación y espaciado, elevación y profundidad, formas, componentes, comportamiento responsive, recomendaciones y prohibiciones (incluidas las reglas de accesibilidad del repositorio) y una guía de prompts para agentes.
- Un paso de validación que comprueba que el archivo esté completo, que el contraste del texto documentado cumpla WCAG AA y que las referencias de tokens se resuelvan.

## Comportamiento

- **Razona, no copies.** Cada valor se deriva de la fuente de diseño real del repositorio — su hoja de estilos, las propiedades personalizadas de CSS, la configuración de Tailwind, los archivos de tokens o los estilos de componentes. Nunca pega el `DESIGN.md` de una marca de terceros; los catálogos de referencia son inspiración para la estructura, nunca para el contenido.
- **Reconcilia, no arrases.** Un `DESIGN.md` o una fuente de tokens existente se reconcilia de forma aditiva, nunca se sobrescribe; los cambios destructivos requieren aprobación.
- **Descubrimiento por referencia.** Esté donde esté `DESIGN.md`, `AGENTS.md` (y `CLAUDE.md`) lo referencia — el puntero, no la ubicación física, es lo que garantiza que los agentes lo carguen.
- **Pragmático, no rígido.** Referencia la convención emergente `DESIGN.md` como una forma a seguir, pero se mantiene Markdown-first y no se ata a ningún esquema de tokens concreto.

## Con alcance de frontend, activado por defecto cuando se detecta

Este addon es para repos con una superficie de UI real — una hoja de estilos con propiedades personalizadas de CSS, una configuración de Tailwind o un bloque `@theme`, componentes de UI o una guía de marca/estilo. **Nunca** se ofrece para un repo de backend, CLI o solo de biblioteca. Cuando **sí** se detecta una superficie de UI, la incorporación lo trata como **activado por defecto**: aplica el addon en modo de confianza y lo recomienda con fuerza en modo guiado. Nunca es obligatorio — un repositorio con cero addons es plenamente conforme, y siempre puedes declinarlo.

## Comando opcional

Cuando se acepta, el addon puede instalar un delegador `/design-system` en el `.agents/commands/` del repositorio para regenerar o refrescar `DESIGN.md` más adelante. Instalar el comando es opcional; un addon declinado no instala ninguno.

## Relación con los documentos de diseño por funcionalidad

Este es un archivo de sistema de diseño **a nivel de repositorio y persistente** — distinto de un documento de diseño técnico por funcionalidad (el `design.md` de "requisitos → diseño → tareas" de los flujos de spec-driven atados a una herramienta). Deep Work Plan deliberadamente no incluye un arquetipo separado de documento de diseño por funcionalidad: el README de un plan, los criterios de aceptación de cada tarea y las puertas de validación ya cubren ese rol. Este addon llena el único hueco que ese rol no cubre: contexto de diseño de UI duradero y nativo del repositorio.
