---
title: Cursor
description: "El adaptador de DWP para Cursor AI, con soporte completo mediante el sistema de reglas del proyecto y el prefijo de comando almohadilla, ya que Cursor reserva la barra para sus comandos."
kind: adapter
lang: es
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adaptador de Cursor

Cursor admite DWP mediante reglas de proyecto y archivos de comando.

## Nivel de soporte

**Completo**: los comandos de DWP funcionan mediante el sistema de reglas de Cursor.

## Instalación

Los comandos de DWP viven como Markdown dentro del proyecto. Cursor los lee mediante su sistema de reglas.

## Invocación

Usa el prefijo `#` (Cursor intercepta `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Notas

Usa `#` porque Cursor reserva `/` para sus propios comandos.
