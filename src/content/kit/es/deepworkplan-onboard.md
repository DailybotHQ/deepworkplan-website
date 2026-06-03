---
title: deepworkplan-onboard
description: "Convierte un repositorio en AI-first razonando sobre su stack y arquetipo, y luego genera un AGENTS.md adaptado, docs/, .agents/ y un .dwp/ ignorado por git."
kind: command
lang: es
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Convierte un repositorio en una base de código AI-first y guiada por especificación. Es la sub-skill de onboard de la skill de Deep Work Plan.

## Qué hace

`deepworkplan-onboard` inspecciona el repositorio **real** — lenguajes, frameworks, gestor de paquetes, comandos de compilación/pruebas/lint, módulos, convención de pruebas, forma de despliegue — y genera artefactos adaptados a él. Razona; nunca copia una plantilla ni deja un marcador de posición.

## Uso

```
/deepworkplan-onboard
```

## Comportamiento

1. Reconocimiento — detecta el stack real y los comandos de validación; usa el preset de incorporación más cercano.
2. Arquetipo — clasifica como repositorio individual o hub orquestador.
3. Genera `AGENTS.md` + el enlace simbólico `CLAUDE.md` con un bloque de Comandos rápidos real.
4. Genera `docs/` (arquitectura, estándares, pruebas, seguridad y más) y docs por módulo.
5. Genera `.agents/` (agentes, comandos `dwp-*` ligeros, skills adaptadas, catálogo) + `.claude → .agents`.
6. Instala la skill y crea un `.dwp/` ignorado por git (plans, drafts) y un espacio `tmp/`.
7. Ofrece los addons opcionales y luego hace una autoverificación.

## Notas

Un repositorio es plenamente conforme con cero addons. La realidad detectada siempre gana sobre las suposiciones del preset.
