---
title: skill-create
description: "Crea una skill reutilizable en el repositorio actual — un procedimiento parametrizado en sesión — vía la sub-skill author, manteniendo el catálogo sincronizado."
kind: command
lang: es
order: 7
usage: /skill-create
---

# skill-create

Crea una nueva skill en el repositorio actual. Un delegador ligero a la sub-skill **author** de Deep Work Plan.

## Qué hace

`skill-create` enruta al flujo de creación de skills de la sub-skill author. Una skill es un procedimiento reutilizable y parametrizado que se ejecuta en sesión (por ejemplo, `/fix-lint`). Codifica "cómo hacer X" y vive en `.agents/skills/<name>/SKILL.md`.

## Uso

```
/skill-create
```

## Comportamiento

1. Detecta la disposición `.agents/` del repo y sus convenciones locales.
2. Confirma que existe un flujo de trabajo real y repetible; nómbralo en kebab-case.
3. Crea y rellena `SKILL.md` (Objetivo, Cuándo usar, Pasos, Validación).
4. Añade un delegador de comando ligero si hace falta.
5. Actualiza el catálogo `.agents/docs/` para que coincida.

## Notas

Para agentes usa `/agent-create`. La lógica vive en la skill; el comando se mantiene ligero.
