---
title: "DWP v5: las promesas, ahora garantizadas"
description: "Deep Work Plan v5 convierte ocho promesas de siempre en contratos probados y versionados — un verificador honesto, una orquestación segura y una ruta de actualización probada."
date: 2026-09-12
version: "v5 · Garantizado por pruebas"
kind: release
lang: es
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Commit de release de la skill ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Release de la skill v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Release de la skill v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
  - label: "Release de la skill v5.5.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1"
  - label: "Release de la skill v5.5.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.2"
  - label: "Release de la skill v5.5.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3"
  - label: "Release del revisor v3.1.1"
    url: "https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1"
---

Hoy publicamos Deep Work Plan v5. Esto no es una reescritura: son meses de uso real — incluida una auditoría directa de 108 planes reales — que fueron sacando a la luz, brecha por brecha, dónde las promesas de la metodología y el comportamiento real de un agente podían divergir. El resumen honesto de este lanzamiento: la metodología ya prometía todo esto — ahora lo garantiza. Antes de v5, un agente que siguiera la documentación al pie de la letra podía terminar en escenarios de fallo reales; cada uno de ellos, identificado gracias a ese uso y a esa retroalimentación, está ahora cerrado y asegurado con una prueba ejecutable, no parchado con más prosa. La suite de contratos de la skill pasó de 132 a 258 pruebas en este ciclo, y cada garantía de abajo se validó en vivo contra el tag publicado: se instaló en un repositorio limpio y se llevó por sus propios flujos antes de escribir esta entrada.

**Un verificador que jamás reclama un éxito no verificado.** Los chequeos de conformidad antes se degradaban en silencio: sin un intérprete capaz se saltaban todas las verificaciones y aun así imprimían un veredicto conforme, y el texto en negritas dentro de un campo podía confundirse con un campo ausente. Ahora el verificador termina con un veredicto `UNVERIFIED` explícito siempre que no pueda verificar de verdad. Un verificador nunca reporta un éxito que no comprobó — la confianza en las puertas de validación es toda la propuesta, y una puerta que puede saltarse su propio chequeo rompe la cadena.

**Un solo contrato de aprobación para los planes Lite.** Tres superficies respondían de tres maneras distintas a la pregunta «¿empezar este plan aprueba su alcance actual?», y un agente podía quedarse en un punto muerto o ejecutar sin autorización justo en la frontera más peligrosa. v5 asienta un solo contrato en todas partes: un execute o resume explícito aprueba el alcance ready actual y registra esa aprobación antes de hacer cualquier trabajo; una propuesta pendiente por sí sola no autoriza nada; una promoción interrumpida se recupera antes de que corra cualquier trabajo de producto.

**Orquestación multi-repo que no puede corromper.** El override de entorno de un hub orquestador antes se filtraba a sus repositorios hijos — un hijo podía escribir estado de planes en las carpetas del propio hub. Las plantillas del orquestador también imprimían `FAIL` terminando con éxito, y un chequeo de completitud que hacía grep de una cadena de estado podía leer una tarea completada como un plan completado. Ahora la raíz del hub se guarda antes de navegar a los sub-repositorios, cada hijo resuelve su propio `.dwp/` de forma aislada, cada rama de fallo termina con error, la completitud se lee del estado de nivel superior del plan y el entrypoint del devcontainer propaga los errores de copia antes de borrar nada.

**Una sola matriz de consentimiento de addons.** Qué addon se instala por defecto, cuál solo se ofrece y qué revisión es obligatoria — las superficies anteriores respondían distinto. v5 declara una matriz: el AI Diff Reviewer es obligatorio para la revisión local, fijado a un release verificado, con la revisión en CI como opt-in explícito que nunca se autoinstala; el addon design-system es una oferta obligatoria cuando se detecta trabajo de UI, pero se instala solo con aceptación explícita; el addon dependency-upgrade llega como un delegador inerte casi por defecto con reversión por instantánea exacta; dailybot reporta únicamente donde esté autorizado. Un diff vacío ya no cuenta como revisión completada.

**Maquinaria real para planes largos.** Una auditoría de 108 planes reales mostró que el trabajo paralelizable era común pero la decisión secuencial casi nunca se declaraba, y las puertas de etapa existían solo como práctica improvisada. v5 hace que la decisión de ejecución siempre se declare — secuencial con una razón registrada cuando la paralelización no procede —, añade Stage Gates opcionales para planes de veinte o más tareas y enriquece las Plan Variables con nivel de rigor, barra de evidencia y acciones prohibidas. Todo esto carga progresivamente y nunca gravita sobre un plan Lite.

**Contexto obligatorio, un objetivo por tarea.** Los planes podían derivar en listas de tareas sin contexto, y una tarea podía empaquetar tres objetivos detrás de una sola puerta verde. v5 exige el par Goal y Context a nivel de plan, un Context por tarea — lo que una sesión nueva necesita para empezar esa tarea sola — en cada registro nuevo (los registros completados quedan exactamente como se escribieron), y convierte un objetivo por tarea en la regla normativa con una guarda contra el decaimiento.

**Una ruta de actualización segura.** `/dwp-upgrade` es nuevo. Su fase de chequeo es de solo lectura y no instala nada; una actualización empieza solo con aceptación explícita, con las adaptaciones locales diferenciadas y expuestas antes de sobrescribir nada; la instalación apunta a un tag exacto y se verifica a sí misma; el onboarding se re-ejecuta como un init fresco. Una actualización jamás toca `.dwp/`: ningún plan, archivo de estado, registro de puerta o evidencia se migra, reescribe o invalida.

**Evidencia honesta y medible.** Los claims de eficiencia ahora se re-miden en tres baselines — v3.0.0, v4.0.3 y el árbol final — con el script de medición commiteado en el repositorio. Los resultados se reportan en bytes de filesystem y nunca se convierten en cifras de tokens o costos que no podamos sostener, y todo claim no verificable queda cuarentenizado como tal en el registro de evaluación.

**Un contrato versionado y publicado.** Cada promesa anterior está respaldada por datos que otras herramientas pueden leer, no solo por prosa: los formatos plan-manifest y plan-state ahora están versionados como la línea de esquema v5 — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) y [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — de modo que un plan, un verificador o una herramienta de terceros puede comprobar la conformidad contra un contrato publicado y legible por máquina, en lugar de un párrafo de documentación. Nada en la línea v5 cambia de forma respecto a v2: los planes existentes que referencian los esquemas v1 o v2 siguen siendo válidos y nunca se reescriben.

Deep Work Plan v5 sigue el estándar DWP 5.0.0. Lee la [especificación normativa](https://deepworkplan.com/spec), consulta el [repositorio de la skill](https://github.com/DailybotHQ/deepworkplan-skill) o comienza la adopción desde [`/init`](https://deepworkplan.com/init).

## Actualización — 2026-09-17 · skill v5.4.0

La primera versión puntual de la línea v5 cierra la última forma en que un plan podía darse por terminado sobre trabajo que nunca se comprobó de verdad, y fija dónde vive la evidencia del propio plan. El estándar DWP 5.0.0 no cambia: esta es una release de contrato de addon y documentación, no de esquema.

**Una revisión que nunca se ejecutó ya no es indistinguible de una limpia.** El pase de seguridad del Final Review ya separaba un revisor ausente —registrado como hallazgo— de una invocación que falló, que avisa una vez y continúa. El revisor upstream añadió un tercer desenlace: una ejecución que arranca y termina sin escribir ningún hallazgo. Sin nombre propio, se confundía con "el pase se completó y no encontró nada", lo que permitiría cerrar un plan sobre una revisión que no ocurrió. Ahora es un estado en sí mismo: se registra como revisión incompleta, nunca cuenta como prueba de que el conjunto de cambios está limpio, y nunca es motivo para cerrar el Final Review. Tres desenlaces distintos, y ninguno significa que el diff se leyó y salió limpio.

**La evidencia de un plan pertenece al plan.** El estándar ya colocaba el registro de análisis, el libro de skills, la revisión de seguridad y los logs de compuertas dentro del `analysis_results/` del propio plan, pero nunca declaró esa exclusividad como regla. Por eso, las herramientas de auditoría de un repositorio, que escriben por defecto en el directorio de trabajo, podían dejar la evidencia de un plan en la raíz del repositorio sin que ningún flujo lo notara. La especificación ahora lo exige: todo lo que un flujo produce sobre un plan va en la carpeta de ese plan, y a una herramienta cuya salida por defecto es el directorio de trabajo hay que pasarle su opción de salida explícita. La evidencia que no está donde el plan dice que está se ha perdido — esa es la razón práctica de la regla, no una preferencia de archivo.

**El pin de AI Diff Reviewer pasa a v2.3.0.** La revisión local requerida instala ahora un revisor que separa el runner del backend, de modo que la misma revisión puede correr contra cualquier endpoint compatible sin cambiar de qué depende DWP — la garantía de neutralidad se refuerza en lugar de aflojarse. También trae instaladores verificados por checksum, costos por defecto medidos en vez de supuestos, y rondas de seguimiento que revisan el diff nuevo real arrastrando los hallazgos pendientes. Esto último tiene una consecuencia contractual que conviene decir sin rodeos: que un modelo afirme que un hallazgo está resuelto no lo retira — lo retira una persona mantenedora.

**Los principios de trabajo ahora viajan con el harness.** `v5.5.0`, ese mismo día, hace que el onboarding enseñe a los agentes de un repositorio *cómo* trabajar, no solo qué contiene el repositorio: diez conductas compactas —hacerse cargo del resultado, investigar antes de preguntar, decidir lo rutinario de forma independiente, escalar cuando de verdad falta criterio o autorización, y verificar antes de declarar algo completo, entre otras— escritas inline en `AGENTS.md`, donde las encontrará un agente que solo lee el punto de entrada. Son valores por defecto dentro de una petición, nunca autoridad nueva: no pueden anular permisos del host, un alcance más estrecho, las compuertas de un plan ni las reglas de aprobación del propio repositorio. Un upgrade las reconcilia por significado y no por palabra clave, así que las reglas equivalentes que ya existan se conservan en lugar de reescribirse.

**El pin de AI Diff Reviewer pasa a v2.3.1.** La skill `v5.5.1` instala el revisor cuyo check, cuerpo de la revisión y comentario de seguimiento coinciden. Un cuerpo que dice `Recommendation: approve` no es prueba de que el check haya pasado — lee el bloque Check status del marcador de seguimiento. En modo advisory, una corrección corroborada puede retirar un hallazgo cuyo hilo ya está colapsado, de modo que un PR atascado puede pasar a verde tras una corrección real.

Lee la [especificación](https://deepworkplan.com/spec) para el texto normativo, la [referencia del addon](https://deepworkplan.com/kit/ai-diff-reviewer) para saber qué hace ahora el revisor, o la [release v5.5.1](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1) para la fuente.

## Actualización — 2026-09-25 · skill v5.5.3 + revisor v3.1.1

El addon de AI Diff Reviewer ahora documenta e instala la línea **v3** del revisor, publicada el 2026-09-24 (v3.0.0 → v3.1.1, pin móvil `@v3`). La skill `v5.5.2` reescribió los documentos normativos del addon, el hook de onboarding y la plantilla de integración alrededor de lo que el revisor v3 realmente hace, y la `v5.5.3` entregó el lado de CI. Los cambios de mayor peso, verificados contra el revisor publicado en el tag `v3.1.1`:

**Un `critical` solo filtra cuando está verificado.** Desde v3, cada hallazgo crítico que afirma un modelo —más una muestra del 30 % de las advertencias— recibe una segunda comprobación breve basada en código por una llamada de modelo separada (≈ 3 k tokens, 10 s y $0.009 por hallazgo verificado). Un `critical` se publica —y bloquea el Final Review— solo cuando ese verificador lo confirma; las afirmaciones refutadas siguen visibles como advertencias anotadas y se listan en la salida estructurada, nunca inline. Una revisión que agota su tope de turnos (`incomplete`) o su reloj (`timeout`) es roja bajo rigor bloqueante: «sin hallazgos» significa ahora siempre que el revisor miró y no encontró nada.

**El presupuesto sigue el nivel de riesgo.** El presupuesto de revisión se deriva del nivel de riesgo determinista del cambio —8/20/30/40 turnos de `low` a `critical`— y un push que no cambia código ejecuta una ronda solo del verificador con −93 % de costo. `budget-profile: fixed` restablece las constantes previas a v3 durante la transición; las rondas incrementales recortan los tokens de entrada entre un 62 y un 76 %.

**Seis sub-skills, una de ellas un bucle.** El router suma `address-review` (nueva en v3.1.1): una sola invocación encuentra los PR abiertos de la rama, comprueba que la revisión cubre el head actual, presenta los hallazgos y —con un solo sí— aplica, hace commits en lotes pequeños de Conventional Commits, hace push y rearma el revisor según como el repositorio lo dispara. `apply-review` sigue siendo de solo lectura; la salida estructurada (`review-output/3.0`) es la vía para máquinas de cualquier automatización. La línea `@v2` sigue congelada en `release/v2` con seis meses de mantenimiento de seguridad y catálogo — v3 es la recomendación, nunca una migración forzada.

**El revisor ahora revisa sus propias casas.** El repositorio de la skill y este sitio web ejecutan ambos una revisión de CI activada por etiqueta —una pata única de grok vía `DailybotHQ/ai-diff-reviewer@v3`, disparada una vez por aplicación de la etiqueta `ready` (quítala y vuelve a ponerla para relanzarla), con un salto honesto cuando el secret del proveedor no existe. Este sitio también vendoriza el revisor v3.1.1, de modo que el Final Review local y la documentación enseñan ahora el mismo contrato.

Lee la [especificación](https://deepworkplan.com/spec), la [referencia del addon](https://deepworkplan.com/kit/ai-diff-reviewer) para la lista completa de capacidades v3, la [release v5.5.3](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3) para la fuente, o la [release v3.1.1 del revisor](https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1) para lo que cambió upstream.
