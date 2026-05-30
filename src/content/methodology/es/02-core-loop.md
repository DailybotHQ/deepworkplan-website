---
title: El ciclo central
description: "El flujo de crear, ejecutar, refinar, reanudar y estado; el directorio de salida .dwp ignorado por git; la anatomía de tarea de nueve secciones, y la validación y reanudación."
order: 2
lang: es
summary: Cómo las cinco operaciones de DWP llevan un plan desde el objetivo hasta su finalización.
icon: refresh
---

# El ciclo central

DWP define cinco operaciones que llevan un plan desde un objetivo hasta un trabajo terminado y revisable: **crear → ejecutar → refinar → reanudar → estado**. Juntas forman el ciclo que un agente sigue durante toda la vida de un plan. Los agentes ejecutan una tarea a la vez y validan cada paso antes de avanzar.

## Las cinco operaciones

- **crear**: generar un plan nuevo a partir de un objetivo. El agente analiza el objetivo, lo descompone en tareas secuenciales y escribe los archivos del plan. Debe formular preguntas aclaratorias antes de escribir cuando el objetivo es ambiguo.
- **ejecutar**: recorrer el plan tarea por tarea. El agente actualiza el registro de avance tras cada tarea y marca su estado de finalización. No debe omitir tareas sin registrar el motivo.
- **refinar**: modificar un plan existente. El agente puede agregar, quitar o reordenar tareas, pero debe preservar el trabajo completado y actualizar la tabla de tareas.
- **reanudar**: continuar un plan interrumpido. El agente lee el registro de avance y los archivos de tarea para reconstruir el estado, y luego continúa desde la primera tarea incompleta.
- **estado**: reportar el avance sin ejecutar. El agente resume las tareas completadas, en curso y pendientes, y no cambia nada.

## El directorio de salida `.dwp/`

Todos los artefactos de DWP viven bajo un directorio `.dwp/` ignorado por git en la raíz del repositorio. Mantener el espacio de trabajo fuera del control de versiones implica que el estado de trabajo de un plan nunca contamina el historial del proyecto.

```
.dwp/
├── plans/
│   └── PLAN_<slug>/
│       ├── README.md
│       ├── PROGRESS.md
│       └── <n>.task_<slug>.md
└── config.yaml
```

## La anatomía de tarea de nueve secciones

Cada archivo de tarea contiene estas nueve secciones, en orden. La estructura garantiza que cada unidad de trabajo sea autónoma y revisable:

1. **Objetivo**: un párrafo que indica qué logra la tarea.
2. **Contexto**: antecedentes, enlaces y por qué existe esta tarea.
3. **Pasos**: acciones concretas y ordenadas que ejecutar.
4. **Criterios de aceptación**: una lista de condiciones que definen lo terminado.
5. **Validación**: comandos o pruebas que ejecutar para verificar el trabajo.
6. **Archivos**: rutas que se espera crear o modificar.
7. **Dependencias**: otras tareas o requisitos externos.
8. **Riesgos**: qué podría salir mal y sus mitigaciones.
9. **Finalización y registro**: un marcador de estado más notas cronológicas.

## Validación, finalización y reanudación

La validación forma parte de la tarea, no es algo accesorio: cada tarea nombra los comandos o pruebas que demuestran que está terminada, y el agente los ejecuta antes de marcar la finalización. La finalización se registra con un marcador de estado explícito (`[ ]` sin empezar, `[~]` en curso, `[x]` hecho, `[!]` bloqueado) en la sección de Finalización y registro. La reanudación se apoya en estos marcadores y en el registro de avance: un agente puede reconstruir con exactitud dónde se detuvo el plan y continuar desde la primera tarea incompleta sin rehacer el trabajo terminado.
