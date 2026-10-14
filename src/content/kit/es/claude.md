---
title: Claude Code
description: "El adaptador de DWP para Claude Code, con soporte completo mediante comandos slash nativos y habilidades, incluidos subagentes y agentes de equipo."
kind: adapter
lang: es
order: 1
agent: Claude Code
support: full
prefix: /
---

# Adaptador de Claude Code

Claude Code tiene soporte **completo** de DWP mediante comandos slash nativos y habilidades.

## Nivel de soporte

**Completo** (Comprobado por comportamiento) — la suite completa de subhabilidades y comandos del ciclo de vida de DWP se asigna a comandos slash nativos de Claude Code, demostrado en pruebas de referencia bidireccionales de transferencia.

## Instalación

DWP se distribuye como habilidades bajo `.agents/skills/` (resueltas a través del enlace simbólico `.claude/`). Claude Code las descubre automáticamente.

Opcional: [coding-agents-kit](/kit/agentkit) puede instalar esta CLI y lanzarla con `ak claude`. El instalador oficial del proveedor funciona igual de bien.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Invocación

Usa el prefijo `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Notas

Claude Code admite habilidades, subagentes y agentes de equipo: el conjunto completo de características de DWP.
