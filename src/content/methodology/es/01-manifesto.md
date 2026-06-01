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

## La dirección es el multiplicador

La capacidad de un agente de programación con IA depende menos del modelo que de la calidad de la dirección que recibe. Un modelo capaz apuntado a una petición ambigua amplifica la ambigüedad; el mismo modelo apuntado a una especificación precisa amplifica la precisión. A medida que los modelos mejoran, esa brecha se ensancha en lugar de cerrarse — el cuello de botella se desplaza aguas arriba, de escribir el código a definir el trabajo. La habilidad relevante ya no es la ejecución; es la dirección.

Esto replantea qué significa delegar bien. Delegar bien no es pedirle trabajo a un agente — es definir el trabajo con suficiente claridad para que pueda ejecutarse correctamente: el objetivo, las restricciones, el contexto que al agente le faltaría de otro modo y los criterios que deciden si tuvo éxito. La mayor parte del valor se crea antes de que comience la ejecución.

Deep Work Plan es la disciplina de hacer ese trabajo aguas arriba de forma duradera y repetible. Sus dos pilares son las dos mitades de una buena dirección: una **especificación** declara qué aspecto tiene lo "correcto", y un **harness** le da al agente el contexto y las herramientas para alcanzarlo. Juntos convierten la capacidad bruta de un modelo en ingeniería confiable — sostenida a lo largo de una tarea que dura horas y preservada entre agentes que cambian de una sesión a otra.

## Guiado por especificación desde el diseño

Este es el primer pilar de la metodología y, al igual que "harness", conviene definirlo con claridad.

**Qué es el desarrollo guiado por especificación.** En el trabajo corriente guiado por prompts, la fuente de verdad es una conversación: le pides algo a un agente, este edita archivos y el único registro de la intención es una transcripción de chat que se desplaza y nunca se vuelve a revisar. El desarrollo guiado por especificación (SDD) invierte eso. Primero escribes *qué* debe ser cierto — el objetivo, el alcance, los criterios de aceptación, las comprobaciones que prueban que está hecho — y esa especificación escrita, no la conversación, es la fuente de verdad. El agente entonces ejecuta *contra* la especificación en lugar de improvisar a partir de un prompt de una línea.

**Cómo lo encarna DWP.** En Deep Work Plan, el plan *es* la especificación. Un objetivo se convierte en un plan revisable; el plan se descompone en tareas atómicas; cada tarea lleva criterios de aceptación y puertas de validación explícitos; y un protocolo de finalización confirma el trabajo frente a ellos. Plan → tareas → puertas → finalización es el SDD hecho concreto y ejecutable.

**Por qué importa.** Escribir primero la especificación rinde de tres maneras: **reduce la desviación**, porque el agente se mide frente a criterios declarados y no frente a un recuerdo que se desvanece; hace el trabajo **verificable**, porque cada puerta pasa o falla; y lo hace **reanudable**, porque la especificación sobrevive a cualquier sesión o agente — otro agente puede retomarla mañana y saber exactamente qué significa "hecho".

**En qué se diferencia DWP.** En torno a esta idea se ha formado un movimiento más amplio de desarrollo guiado por especificación, que incluye GitHub Spec Kit, Amazon Kiro y Tessl. Esos enfoques suelen estar atados a una herramienta o plataforma concreta. DWP es deliberadamente distinto: es independiente de herramientas y nativo del repositorio. La especificación vive en el repositorio como Markdown plano, así que viaja con el código y no con el producto de un proveedor — y se compone directamente con el segundo pilar, ya que la propia especificación forma parte del harness que el repositorio transporta.

## El repositorio se convierte en el harness

Este es el segundo pilar de la metodología, y merece una definición sencilla — "harness" se ha vuelto un término cargado, y buena parte de la industria lo usa sin decir qué significa.

**Qué es un harness de agente.** Un modelo de lenguaje, por sí solo, es solo un predictor de texto. Lo que lo convierte en un ingeniero fiable es todo lo que lo envuelve: el contexto que se le da, las herramientas que puede invocar, el bucle de control que decide qué hacer a continuación, las salvaguardas que atrapan errores y el estado persistente que le permite detenerse y reanudar. Ese andamiaje circundante es el *harness*. El modelo es el motor; el harness es el chasis, la dirección y los frenos que hacen seguro conducir el motor.

**Qué es la ingeniería de harness.** La mayoría de los equipos construyen ese andamiaje de forma implícita, dentro de una sola herramienta — un IDE concreto, un producto de agente o un framework a medida — de modo que solo funciona allí y desaparece en cuanto cambias de herramienta. La ingeniería de harness es la disciplina de diseñar ese andamiaje de forma deliberada, como un artefacto de primera clase. Deep Work Plan toma una posición firme sobre dónde debe vivir: **no en una herramienta, sino en el propio repositorio.**

**Por qué el repositorio es el lugar correcto.** Cuando el harness vive en el repo, viaja con el código, cada agente que abre el repo lo hereda, y se versiona, revisa y mejora como cualquier otro código. DWP instala cada parte del harness como un artefacto concreto y duradero:

| Elemento del harness | Qué aporta | Dónde lo pone DWP en tu repo |
|---|---|---|
| **Contexto** | lo que el agente necesita saber | `AGENTS.md`, `docs/` y READMEs por módulo |
| **Herramientas** | lo que el agente puede hacer | las skills, agentes y comandos `dwp-*` de `.agents/` |
| **Bucle de control** | cómo avanza el trabajo | el Deep Work Plan: plan → tareas atómicas → puertas → finalización |
| **Salvaguardas** | qué mantiene la corrección | criterios de aceptación y puertas de validación explícitos |
| **Estado** | cómo sobrevive a la interrupción | los planes, borradores y registro de progreso de `.dwp/` (ignorado por git) |

Como cada elemento es un archivo del repositorio y no una función de una herramienta, el harness es portable por construcción. Esa es la afirmación de una línea sobre la que descansa el resto de la metodología: *el propio repositorio se convierte en el harness*, para que cualquier agente pueda pilotar cualquier repo — sin un framework a medida por herramienta.

## Por qué importa la ejecución autónoma estructurada

Los agentes de programación con IA modernos son capaces, pero carecen de dirección. Dirige uno hacia una tarea no trivial y tenderá a empezar a editar archivos de inmediato, perder la noción de lo que cambió y producir trabajo difícil de revisar e imposible de reanudar.

DWP impone una estructura ligera que aborda cada fallo de forma directa:

- **Tareas revisables**: el trabajo se descompone en unidades secuenciales, cada una con un alcance y criterios de aceptación explícitos.
- **Estado persistido**: el avance se escribe para que el trabajo sobreviva a las interrupciones y pueda reanudarse entre sesiones y agentes.
- **Documentación estandarizada**: personas y agentes comparten un mismo modelo mental mediante un formato común.
- **Portabilidad entre agentes**: la metodología funciona con cualquier agente mediante adaptadores ligeros, no reimplementaciones.

## Markdown de principio a fin

DWP define una estructura, no un software. No hay un entorno de ejecución que instalar, ni un árbol de dependencias, ni dependencia de un proveedor. El plan, las tareas y el registro de avance son Markdown plano que cualquier agente puede leer, cualquier persona puede revisar y cualquier sistema de control de versiones puede rastrear con limpieza. El resultado es una ejecución que se puede leer, auditar y en la que se puede confiar.
