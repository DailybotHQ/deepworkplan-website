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
7. Instala la revisión local requerida de AI Diff Reviewer, ofrece los addons opcionales y luego hace una autoverificación.

## Notas

Un repositorio es plenamente conforme con cero addons opcionales; la revisión local de AI Diff Reviewer es parte de la línea base desde el estándar 2.3.0. La realidad detectada siempre gana sobre las suposiciones del preset.

## Referencias de esquemas v6

Para los planes v6, el catálogo de esquemas legibles por máquina se publica en estas URL estables. La proyección activa de v6 es un snapshot; no existe `plan-state/v6.json`. Los planes v5 existentes siguen usando el esquema de estado v5, y los planes antiguos nunca se reescriben silenciosamente.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

Los planes nuevos reciben identificadores numéricos monotónicos de al menos tres dígitos (por ejemplo, `PLAN_001_add_payment_webhooks/`). Como los esquemas v5 congelados cuentan el ID numérico como una palabra, los slugs v5 tienen 2–4 palabras; los slugs v6 tienen 2–5. Las carpetas existentes sin numerar `PLAN_<slug>/` siguen siendo legibles y nunca se renombran. Si hay planes numerados, `latest` resuelve al plan con el ID numérico más alto.
