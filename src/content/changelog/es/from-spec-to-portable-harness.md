---
title: "DWP v1: de un bucle de planes a un arnés portátil"
description: "Deep Work Plan pasa de ser un único bucle de planes escritos a un kit de adopción portátil: confianza y procedencia verificable, mayor cobertura de hosts de agentes y un verificador de conformidad que cualquier repositorio puede ejecutar."
date: 2026-06-12
version: "v1 · Fundamentos"
kind: foundation
lang: es
order: 5
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Hasta ahora, Deep Work Plan ha sido un bucle de creación de planes que un único agente sigue dentro de una sola sesión. Esta serie de lanzamientos lo convierte en algo que un repositorio puede adoptar por sí mismo: la primera versión pensada deliberadamente para ir más allá de un solo agente y una sola sesión.

El skill incorpora una declaración de confianza con procedencia verificada por checksum, de modo que un desarrollador puede ver exactamente qué lee y qué escribe antes de instalarlo. Los presets de incorporación y los hosts de agentes admitidos se amplían considerablemente, la disciplina de pruebas pasa a ser parte esencial de cada tarea en lugar de un añadido, y un verificador de conformidad permite comprobar —de forma objetiva, no por suposición— que un repositorio cumple el estándar. Un protocolo de estado y reanudación permite que un plan interrumpido continúe donde se quedó en lugar de empezar de nuevo. Por debajo, la compatibilidad de `.claude` y `.cursor` converge en un único directorio canónico `.agents`, de modo que todos los agentes admitidos leen el mismo kit.

En conjunto, estos lanzamientos sientan las bases de lo que viene después: el repositorio deja de ser solo el lugar donde se guarda el plan y empieza a convertirse en el arnés de trabajo del agente.

Consulta el [historial de lanzamientos del skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) para ver la secuencia completa.
