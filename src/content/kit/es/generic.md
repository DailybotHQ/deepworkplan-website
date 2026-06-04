---
title: Genérico
description: "El preset de incorporación de reserva para cualquier proyecto, con pistas agnósticas de la pila que detectan los comandos de compilación y prueba del repo."
kind: preset
lang: es
order: 6
stack: Generic
---

# Preset genérico

La guía de razonamiento de reserva que el flujo de onboard usa cuando no aplica ningún preset específico de pila. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Qué razonar

- Detecta los comandos reales de compilación y prueba a partir del manifiesto, el Makefile o la CI — capturados al pie de la letra.
- Aplica convenciones generales; no hagas suposiciones específicas de la pila.
- Genera solo las skills, los agentes y los docs que coinciden con los flujos de trabajo reales del repo.

## Notas

La reserva cuando ninguno de Django, Vue + Vite, Astro/Svelte, servicio Node/TS o paquete/CLI de Python coincide.
