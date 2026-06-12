---
title: Sistema de diseño
description: "Addon opcional que da a cualquier repo con una superficie de interfaz orientada al usuario un DESIGN.md (en docs/, indexado desde AGENTS.md) — con perfiles de UI visual, salida de CLI y conversacional en un solo archivo."
kind: addon
lang: es
order: 4
---

# Addon de sistema de diseño

Da a un repositorio con una **superficie de interfaz orientada al usuario** un `DESIGN.md` — un archivo Markdown de sistema de diseño que cualquier agente de codificación lee para generar salida de interfaz coherente con las convenciones **propias** del repositorio, en lugar de los valores predeterminados sin estilo y estadísticamente comunes a los que recurre un agente cuando no tiene ninguna guía. El cuarto addon opcional de Deep Work Plan.

Una "superficie de interfaz" es plural: una **UI visual** renderizada, una **salida de CLI** con estilo y una superficie **conversacional** (el producto habla por chat o correo) cuentan cada una. El addon detecta cada una de forma independiente como un **perfil**, y los perfiles aceptados se apilan en el mismo y único `DESIGN.md`.

## Qué añade

- Un `DESIGN.md` en `docs/DESIGN.md` (junto a las demás especificaciones del repositorio; la raíz del repositorio solo cuando no existe un árbol `docs/`), **referenciado desde `AGENTS.md`** para que los agentes lo descubran igual que el resto de la documentación. Un repo, un archivo — nunca archivos hermanos por superficie.
- **Perfil `visual-ui`** — las secciones visuales canónicas: visión general/atmósfera, paleta de colores y roles (claro + oscuro), tipografía, maquetación y espaciado, elevación y profundidad, formas, componentes, comportamiento responsive, recomendaciones y prohibiciones (incluidas las reglas de accesibilidad del repositorio).
- **Perfil `cli-output`** — interfaces de terminal con estilo: voz de la salida, colores y estilos semánticos (éxito/error/advertencia/información/atenuado mapeados al tema real), componentes de salida (paneles, tablas, spinners, prompts interactivos — nombrados según los helpers reales del repositorio), convenciones de maquetación y reglas de degradación (TTY frente a pipe, `NO_COLOR`, disciplina de stdout/stderr, códigos de salida).
- **Perfil `conversational`** — la superficie de mensajería del producto: voz y registro (tono, brevedad, reglas de uso del nombre de marca), anatomía del mensaje (DM, publicación en canal, respuesta en hilo, edición en el lugar) y renderizado por plataforma (mrkdwn de Slack, markdown de Discord, tarjetas adaptativas de Teams, correo) con alternativas en texto plano.
- Una guía compartida de prompts para agentes, más un paso de validación que comprueba la integridad de cada perfil: el contraste del texto documentado cumple WCAG AA (visual), el color nunca es el único portador de significado (CLI), los renderizados ricos anotan alternativas en texto plano (conversacional) y las referencias de tokens se resuelven.

## Comportamiento

- **Razona, no copies.** Cada valor se deriva de la fuente de diseño real del repositorio — su hoja de estilos, las propiedades personalizadas de CSS, la configuración de Tailwind, los archivos de tokens, los estilos de componentes, su módulo de presentación/tema de CLI o sus helpers de composición de mensajes. Nunca pega el `DESIGN.md` de una marca de terceros ni importa en bloque las convenciones de otro producto; los catálogos de referencia son inspiración para la estructura, nunca para el contenido.
- **Reconcilia, no arrases.** Un `DESIGN.md` o una fuente de tokens existente se reconcilia de forma aditiva, nunca se sobrescribe; añadir un perfil recién aceptado anexa sus secciones sin reescribir el resto; los cambios destructivos requieren aprobación.
- **Descubrimiento por referencia.** Esté donde esté `DESIGN.md`, `AGENTS.md` (y `CLAUDE.md`) lo referencia — el puntero, no la ubicación física, es lo que garantiza que los agentes lo carguen.
- **Pragmático, no rígido.** Referencia la convención emergente `DESIGN.md` como una forma a seguir, la extiende a superficies no visuales y se mantiene Markdown-first sin atarse a ningún esquema de tokens concreto.

## Con alcance de interfaz, con fuerza por perfil

Este addon es para repos con al menos una superficie de interfaz real; nunca se ofrece para un repo sin ninguna (una biblioteca pura, un servicio headless, un repo solo de infraestructura). Cada perfil tiene su propia fuerza de recomendación:

- **`visual-ui` está activado por defecto cuando se detecta** — una hoja de estilos con propiedades personalizadas de CSS, una configuración de Tailwind o un bloque `@theme`, componentes de UI o una guía de marca/estilo. La incorporación lo aplica en modo de confianza y lo recomienda con fuerza en modo guiado.
- **`cli-output` y `conversational` se recomiendan cuando se detectan — y siempre se preguntan, nunca se aplican automáticamente**, incluso en modo de confianza. Una biblioteca de renderizado de CLI más una capa de presentación deliberada señala el primero; un SDK de plataforma de chat o una capa de composición de mensajes señala el segundo. Un simple parser de argumentos con prints sin formato no califica.

Nunca es obligatorio — un repositorio con cero addons es plenamente conforme, y siempre puedes declinar cualquier perfil o el addon completo. Un `DESIGN.md` creado antes de que existieran los perfiles es un archivo visual de perfil único válido: sin migración.

## Comando opcional

Cuando se acepta, el addon puede instalar un delegador `/design-system` en el `.agents/commands/` del repositorio para regenerar o refrescar `DESIGN.md` más adelante. Instalar el comando es opcional; un addon declinado no instala ninguno.

## Relación con los documentos de diseño por funcionalidad

Este es un archivo de sistema de diseño **a nivel de repositorio y persistente** — distinto de un documento de diseño técnico por funcionalidad (el `design.md` de "requisitos → diseño → tareas" de los flujos de spec-driven atados a una herramienta). Deep Work Plan deliberadamente no incluye un arquetipo separado de documento de diseño por funcionalidad: el README de un plan, los criterios de aceptación de cada tarea y las puertas de validación ya cubren ese rol. Este addon llena el único hueco que ese rol no cubre: contexto de diseño de interfaz duradero y nativo del repositorio.
