---
title: Estándar de documentación
description: "Estándar normativo de cómo los Deep Work Plans documentan estructura, tareas y avance: README, marcadores de estado, la anatomía de tarea de diez secciones y el Final Review."
order: 1
lang: es
section: Standard
---

# Estándar de documentación

**Versión 5.0.0.** Este estándar define cómo los Deep Work Plans documentan su estructura, tareas y avance, y cómo un repositorio se documenta a sí mismo para que un agente pueda actuar con seguridad. Se aplica a todo plan creado bajo la metodología DWP. Esta versión alinea la versión propia del documento con el estándar DWP que acompaña — sin cambios en los requisitos existentes — y añade la aplicación del presupuesto de índice esbelto y el nivel de funcionalidad descritos a continuación. Las palabras clave MUST (DEBE), SHOULD (DEBERÍA) y MAY (PUEDE) se usan según las define el RFC 2119.

## AGENTS.md como punto de entrada compacto

El archivo raíz `AGENTS.md` DEBERÍA mantenerse dentro de un presupuesto de 150–500 líneas. Cuando el contenido generado o mantenido por el harness lo superaría, el agente DEBE mover el detalle a la guía de `docs/` (o al documento de módulo/funcionalidad) que lo posee y enlazarlo desde el índice — nada se descarta, solo se reubica, y el índice DEBE enlazar cada documento que recibió contenido desplazado. Un `AGENTS.md` escrito a mano que exceda el presupuesto nunca se reescribe en silencio: el agente propone una migración concreta (qué se mueve adónde, qué enlaces se añaden) y la aplica solo con el consentimiento del desarrollador. Un comprobador de conformidad trata el presupuesto como asesor, ya que un conteo de líneas es objetivo pero la autoría no lo es — el DEBE vincula al harness que genera o actualiza el archivo, no la suposición de un comprobador sobre quién lo escribió. `AGENTS.md` NO DEBE enlazar un archivo de `docs/` que no exista.

Por encima del nivel de documentación por módulo (más abajo) hay un **nivel de funcionalidad**: un área de capacidad importante — más grande que un módulo — obtiene su propia carpeta `docs/` junto a su código, con acceso mediante su propio `README.md`. Un área califica cuando abarca dos o más módulos importantes, posee un directorio de subaplicación o subsistema autocontenido, o lleva sus propios contratos (una superficie de API, contratos de eventos o esquemas) de los que dependen múltiples consumidores. Una vez que un área se registra como importante, su `docs/` de funcionalidad DEBERÍA existir, y sus entradas más significativas DEBERÍAN enlazarse desde los módulos que abarca y desde el índice raíz de `AGENTS.md`, igual que la documentación por módulo. Un área deliberadamente dejada sin documentar lleva un motivo registrado — una decisión, no un descuido.

## README del plan

Todo plan DEBE tener un `README.md` que contenga:

- **Título**: `# Deep Work Plan: <nombre>`.
- **Objetivo**: una declaración en prosa del propósito del plan.
- **Material de origen**: enlaces o rutas a las entradas canónicas (opcional).
- **Tareas**: una tabla Markdown con el número de tarea, el nombre y una casilla de estado.
- **Estado**: una línea con la forma `<n>/<total> tareas completadas`.

## Archivos de tarea

Cada archivo de tarea DEBE llamarse `<n>.task_<slug>.md` y contener la anatomía de diez secciones — las nueve secciones clásicas más la **Superficie tocada**: el contrato entre lo que la tarea cambia y lo que debe validarse (superficie planificada vs. real, consumidores afectados, una clase de riesgo de *aislada*, *costura*, *compartida/núcleo* o *desconocida*, el mapeo de pruebas usado y la puerta seleccionada con su motivo).

## PROGRESS.md

`PROGRESS.md` es un registro de ejecución de solo adición. Cada entrada DEBE registrar:

- Una marca de tiempo en formato ISO 8601.
- El número y el nombre de la tarea.
- Qué se hizo.
- Cualquier desviación o motivo de omisión.

## Marcadores de estado

- `[ ]`: sin empezar.
- `[~]`: en curso.
- `[x]`: hecho.
- `[!]`: bloqueado.

## Encabezados

Todos los encabezados DEBEN usar mayúscula inicial al estilo de oración. Los documentos DEBERÍAN evitar el lenguaje publicitario y los signos de exclamación.

## El Final Review, las decisiones de skills por tarea y el reporte opcional

Todo plan redactado bajo esta versión DEBE terminar con exactamente una tarea obligatoria: el **Final Review** — el pase de seguridad sobre el conjunto completo de cambios del plan, la validación de estado final sobre el último estado relevante y la reconciliación de las decisiones de skills. Un hallazgo de seguridad crítico bloquea la finalización.

- **Decisiones de skills por tarea.** La Finalización y registro de cada tarea lleva una **disposición de skills** — `ninguna`, una actualización a una skill o agente existente, una creación con nombre, o un aplazamiento con motivo y responsable. La autoría justificada ocurre dentro de la tarea que la origina, antes de su puerta de validación, tras una comprobación de duplicados contra el catálogo `.agents/`; las entradas justificadas se registran como candidatas estables (`T{task}-{seq}`) en el registro de candidatas de skills del plan.
- **El Reporte Ejecutivo es opcional, a petición.** Se ofrece una vez al completar; se genera solo bajo petición explícita y a partir de evidencia duradera. Sin respuesta, o en una ejecución desatendida, el plan queda completo sin él.
- **Planes heredados.** Los planes redactados bajo versiones anteriores terminan con las tres tareas finales obligatorias y siguen siendo conformes — un comprobador de conformidad DEBE aceptar esa forma.
