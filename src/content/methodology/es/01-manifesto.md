---
title: Manifiesto
description: "Qué es un Deep Work Plan, por qué importa la ejecución autónoma estructurada y cómo convierte cualquier repositorio en un código AI-first, pilotable por agentes."
order: 1
lang: es
summary: El argumento a favor de la ejecución guiada por un plan con agentes de IA.
icon: compass
---

# Manifiesto

Un Deep Work Plan (DWP) es una metodología basada solo en Markdown para la ejecución estructurada y autónoma por parte de agentes de programación con IA. Convierte un objetivo difuso en un plan revisable — una especificación — que un agente puede ejecutar, pausar, reanudar y reportar sin perder contexto ni improvisar hasta llegar a resultados inconsistentes.

## Trabajo profundo, para agentes

El nombre describe la práctica que produce: esfuerzo concentrado y sostenido en trabajo cognitivamente exigente, sostenido por la estructura y no por la fuerza de voluntad. La misma propiedad que hace valioso el trabajo profundo para las personas — concentración sin distracción, sostenida durante un horizonte largo — es lo que un agente de programación con IA necesita para terminar trabajo que abarca horas o días. Un Deep Work Plan aporta esa estructura y, al hacerlo, convierte el repositorio en un código AI-first, pilotable por agentes.

Un agente sin un plan se comporta como un trabajador del conocimiento que nunca reserva tiempo, nunca anota nada y cambia de contexto ante cada interrupción. Un Deep Work Plan le da al agente el equivalente a una agenda bloqueada y un encargo escrito: un alcance acotado, una secuencia clara y un lugar duradero donde registrar el avance.

## Guiado por especificación desde el diseño

DWP es una metodología guiada por especificación. El plan es una especificación, y la especificación — no una transcripción de chat — es la fuente de verdad duradera de un cuerpo de trabajo. Un agente ejecuta contra criterios de aceptación y puertas de validación explícitos en lugar de improvisar a partir de un prompt corto. Esto reduce la desviación entre lo que se pretendía y lo construido, hace verificable el trabajo porque cada puerta pasa o falla, y lo hace reanudable porque la especificación sobrevive a cualquier sesión o agente.

En torno a esta idea se ha formado un movimiento más amplio de desarrollo guiado por especificación, que incluye GitHub Spec Kit, Amazon Kiro y Tessl. Esos enfoques suelen estar atados a una herramienta o plataforma concreta. DWP es deliberadamente distinto: es independiente de herramientas y nativo del repositorio. La especificación vive en el repositorio como Markdown plano, así que viaja con el código y no con el producto de un proveedor.

## El repositorio se convierte en el harness

Un modelo de lenguaje por sí solo no es un ingeniero fiable. Lo que lo hace fiable es el harness que lo rodea: contexto curado, las herramientas adecuadas, un bucle de control, salvaguardas y estado persistente para la reanudación. DWP entrega ese harness como una metodología portable instalada en el propio repositorio: un `AGENTS.md`, documentación estructurada, un hogar de skills en `.agents/` y la skill de DWP. Como el harness vive con el código, cualquier agente puede pilotar cualquier repositorio, sin un framework a medida por herramienta.

## Por qué importa la ejecución autónoma estructurada

Los agentes de programación con IA modernos son capaces, pero carecen de dirección. Dirige uno hacia una tarea no trivial y tenderá a empezar a editar archivos de inmediato, perder la noción de lo que cambió y producir trabajo difícil de revisar e imposible de reanudar.

DWP impone una estructura ligera que aborda cada fallo de forma directa:

- **Tareas revisables**: el trabajo se descompone en unidades secuenciales, cada una con un alcance y criterios de aceptación explícitos.
- **Estado persistido**: el avance se escribe para que el trabajo sobreviva a las interrupciones y pueda reanudarse entre sesiones y agentes.
- **Documentación estandarizada**: personas y agentes comparten un mismo modelo mental mediante un formato común.
- **Portabilidad entre agentes**: la metodología funciona con cualquier agente mediante adaptadores ligeros, no reimplementaciones.

## Markdown de principio a fin

DWP define una estructura, no un software. No hay un entorno de ejecución que instalar, ni un árbol de dependencias, ni dependencia de un proveedor. El plan, las tareas y el registro de avance son Markdown plano que cualquier agente puede leer, cualquier persona puede revisar y cualquier sistema de control de versiones puede rastrear con limpieza. El resultado es una ejecución que se puede leer, auditar y en la que se puede confiar.
