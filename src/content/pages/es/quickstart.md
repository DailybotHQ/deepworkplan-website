---
title: "Inicio rápido — Deep Work Plan"
description: "Instala la skill, incorpora tu repositorio y planifica y ejecuta con cualquier agente: los pasos que vuelven tu repo spec-driven y pilotable por agentes."
lastUpdated: 2026-05-31
---

## Inicio rápido

Instala la skill, incorpora tu repositorio y luego planifica y ejecuta con cualquier agente: los pasos
que vuelven tu repositorio spec-driven y pilotable por agentes.

## El camino de adopción

### 1. Instala la skill de Deep Work Plan

Añade la skill a tu repositorio. Incluye un enrutador y ocho sub-skills: create, execute, refine,
resume, status, verify, onboard y author. Usa la CLI de Skills para el camino más rápido:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

O clona el repositorio y ejecuta el setup donde tengas git y una shell:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Incorpora el repositorio

Ejecuta la sub-skill de onboard y deja que el agente razone sobre tu repositorio real — su stack, su
gestor de paquetes y sus comandos de validación reales:

```bash
/deepworkplan-onboard
```

Genera `AGENTS.md`, una base de conocimiento `docs/`, docs por módulo y un hogar multiagente
`.agents/` (con el enlace simbólico `.claude → .agents`), conecta los comandos ligeros `dwp-*` y crea
un `.dwp/` ignorado por git para planes y borradores. Nada se copia de una plantilla; todo se adapta a
tu repositorio.

### 3. Evoluciona el kit y acepta addons

Usa `/skill-create` y `/agent-create` (la sub-skill author) para hacer crecer skills, agentes y
comandos adaptados a tu stack. La incorporación también ofrece tres addons opcionales — devcontainer,
Dailybot y dependency-upgrade — que aceptas solo cuando encajan. Un repo es plenamente conforme con
cero addons.

### 4. Planifica y ejecuta

Genera un Deep Work Plan y ejecútalo tarea por tarea:

```bash
/dwp-create <goal>
/dwp-execute
```

Usa `/dwp-status`, `/dwp-refine` y `/dwp-resume` a medida que avanza el trabajo. Cada plan lleva tareas
numeradas, compuertas de validación y un protocolo de finalización para que el trabajo siga siendo
estructurado y reanudable entre sesiones.

## El resultado

Tu repositorio se vuelve spec-driven y pilotable por agentes: el plan es la fuente de verdad duradera,
y el repositorio mismo se convierte en el harness contra el que corre cualquier agente.

- [Leer la metodología](/methodology)
- [Ver la especificación](/spec)
- [Explorar el kit](/kit)
