---
title: OpenCode
description: "El adaptador de DWP para OpenCode, el agente de código abierto, con soporte a través de AGENTS.md nativo y procedimientos Markdown invocados con el prefijo."
kind: adapter
lang: es
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# Adaptador de OpenCode

OpenCode, el agente de programación de código abierto, admite DWP a través de AGENTS.md nativo y procedimientos de comando en Markdown.

## Nivel de soporte

**Completo** (Comprobado por instalación) — OpenCode lee AGENTS.md de forma nativa y ejecuta cada comando dwp-* desde su archivo de procedimiento. Ruta verificada mediante suites de pruebas automatizadas.

## Instalación

DWP distribuye AGENTS.md y los procedimientos de comando en el repositorio; OpenCode los descubre como contexto del proyecto.

Opcional: [coding-agents-kit](/kit/agentkit) puede instalar esta CLI y lanzarla con `ak opencode`. El instalador oficial del proveedor funciona igual de bien.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

OpenCode lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
