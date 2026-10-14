---
title: Cline
description: "El adaptador de DWP para Cline, el agente de código abierto, con soporte total por reglas en Markdown y procedimientos de comando invocados con el prefijo."
kind: adapter
lang: es
order: 9
agent: Cline
support: full
prefix: '#'
---

# Adaptador de Cline

Cline, el agente de programación de código abierto, admite DWP mediante reglas en Markdown y procedimientos de comando.

## Nivel de soporte

**Completo** (Comprobado por instalación) — Cline lee las reglas markdown y ejecuta cada comando dwp-* desde su archivo de procedimiento. Ruta verificada mediante suites de pruebas automatizadas.

## Instalación

Los comandos de DWP viven como procedimientos en Markdown que el agente lee a través de las reglas de Cline.

Opcional: [coding-agents-kit](/kit/agentkit) puede instalar esta CLI y lanzarla con `ak cline`. El instalador oficial del proveedor funciona igual de bien.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Invocación

Usa el prefijo `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Cline lee los archivos de procedimiento y ejecuta el flujo secuencial completo de Deep Work Plan.
