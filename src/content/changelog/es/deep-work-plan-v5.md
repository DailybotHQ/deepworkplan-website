---
title: "DWP v5: las promesas, ahora garantizadas"
description: "Deep Work Plan v5 convierte ocho promesas de siempre en contratos probados: un verificador honesto, una sola regla de aprobación, orquestación que no corrompe y una ruta de actualización segura."
date: 2026-09-12
version: "v5 · Garantizado por pruebas"
kind: release
lang: es
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Hoy publicamos Deep Work Plan v5. El resumen honesto de este lanzamiento: la metodología ya prometía todo esto — ahora lo garantiza. Antes de v5, un agente que siguiera la documentación al pie de la letra podía terminar en escenarios de fallo reales; cada uno está ahora cerrado y asegurado con una prueba ejecutable. La suite de contratos de la skill pasó de 132 a 258 pruebas en este ciclo, y cada garantía de abajo se validó en vivo contra el tag publicado: se instaló en un repositorio limpio y se llevó por sus propios flujos antes de escribir esta entrada.

**Un verificador que jamás reclama un éxito no verificado.** Los chequeos de conformidad antes se degradaban en silencio: sin un intérprete capaz se saltaban todas las verificaciones y aun así imprimían un veredicto conforme, y el texto en negritas dentro de un campo podía confundirse con un campo ausente. Ahora el verificador termina con un veredicto `UNVERIFIED` explícito siempre que no pueda verificar de verdad. Un verificador nunca reporta un éxito que no comprobó — la confianza en las puertas de validación es toda la propuesta, y una puerta que puede saltarse su propio chequeo rompe la cadena.

**Un solo contrato de aprobación para los planes Lite.** Tres superficies respondían de tres maneras distintas a la pregunta «¿empezar este plan aprueba su alcance actual?», y un agente podía quedarse en un punto muerto o ejecutar sin autorización justo en la frontera más peligrosa. v5 asienta un solo contrato en todas partes: un execute o resume explícito aprueba el alcance ready actual y registra esa aprobación antes de hacer cualquier trabajo; una propuesta pendiente por sí sola no autoriza nada; una promoción interrumpida se recupera antes de que corra cualquier trabajo de producto.

**Orquestación multi-repo que no puede corromper.** El override de entorno de un hub orquestador antes se filtraba a sus repositorios hijos — un hijo podía escribir estado de planes en las carpetas del propio hub. Las plantillas del orquestador también imprimían `FAIL` terminando con éxito, y un chequeo de completitud que hacía grep de una cadena de estado podía leer una tarea completada como un plan completado. Ahora la raíz del hub se guarda antes de navegar a los sub-repositorios, cada hijo resuelve su propio `.dwp/` de forma aislada, cada rama de fallo termina con error, la completitud se lee del estado de nivel superior del plan y el entrypoint del devcontainer propaga los errores de copia antes de borrar nada.

**Una sola matriz de consentimiento de addons.** Qué addon se instala por defecto, cuál solo se ofrece y qué revisión es obligatoria — las superficies anteriores respondían distinto. v5 declara una matriz: el AI Diff Reviewer es obligatorio para la revisión local, fijado a un release verificado, con la revisión en CI como opt-in explícito que nunca se autoinstala; el addon design-system es una oferta obligatoria cuando se detecta trabajo de UI, pero se instala solo con aceptación explícita; el addon dependency-upgrade llega como un delegador inerte casi por defecto con reversión por instantánea exacta; dailybot reporta únicamente donde esté autorizado. Un diff vacío ya no cuenta como revisión completada.

**Maquinaria real para planes largos.** Una auditoría de 108 planes reales mostró que el trabajo paralelizable era común pero la decisión secuencial casi nunca se declaraba, y las puertas de etapa existían solo como práctica improvisada. v5 hace que la decisión de ejecución siempre se declare — secuencial con una razón registrada cuando la paralelización no procede —, añade Stage Gates opcionales para planes de veinte o más tareas y enriquece las Plan Variables con nivel de rigor, barra de evidencia y acciones prohibidas. Todo esto carga progresivamente y nunca gravita sobre un plan Lite.

**Contexto obligatorio, un objetivo por tarea.** Los planes podían derivar en listas de tareas sin contexto, y una tarea podía empaquetar tres objetivos detrás de una sola puerta verde. v5 exige el par Goal y Context a nivel de plan, un Context por tarea — lo que una sesión nueva necesita para empezar esa tarea sola — en cada registro nuevo (los registros completados quedan exactamente como se escribieron), y convierte un objetivo por tarea en la regla normativa con una guarda contra el decaimiento.

**Una ruta de actualización segura.** `/dwp-upgrade` es nuevo. Su fase de chequeo es de solo lectura y no instala nada; una actualización empieza solo con aceptación explícita, con las adaptaciones locales diferenciadas y expuestas antes de sobrescribir nada; la instalación apunta a un tag exacto y se verifica a sí misma; el onboarding se re-ejecuta como un init fresco. Una actualización jamás toca `.dwp/`: ningún plan, archivo de estado, registro de puerta o evidencia se migra, reescribe o invalida.

**Evidencia honesta y medible.** Los claims de eficiencia ahora se re-miden en tres baselines — v3.0.0, v4.0.3 y el árbol final — con el script de medición commiteado en el repositorio. Los resultados se reportan en bytes de filesystem y nunca se convierten en cifras de tokens o costos que no podamos sostener, y todo claim no verificable queda cuarentenizado como tal en el registro de evaluación.

Deep Work Plan v5 sigue el estándar DWP 4.0.0. Lee la [especificación normativa](https://deepworkplan.com/spec), consulta el [repositorio de la skill](https://github.com/DailybotHQ/deepworkplan-skill) o comienza la adopción desde [`/init`](https://deepworkplan.com/init).
