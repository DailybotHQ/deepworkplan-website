---
title: AI Diff Reviewer
description: "Revisión local de críticos verificados en cada Final Review desde el estándar 2.3.0; la compuerta de CI con grok y address-review siguen siendo opcionales."
kind: addon
lang: es
order: 5
---

# Addon de AI Diff Reviewer

Todo Deep Work Plan termina igual: un **Final Review** obligatorio que lee el conjunto completo de cambios acumulados del plan antes de poder darlo por concluido. Su pase de seguridad es el último punto en el que algo puede detectarse. Sin ayuda, el único lector en ese momento es el mismo agente que escribió el código.

Este addon pone un segundo lector sobre ese diff. Conecta el **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** —publicado en el marketplace como "AI Diff Reviewer", versión actual **v3.1.1**— al pase de seguridad, donde devuelve algo estructurado en lugar de prosa: un veredicto, una tabla de hallazgos y una severidad para cada uno. Desde v3, un hallazgo `critical` significa que el verificador del addon lo confirmó con una segunda llamada al modelo basada en el código; solo los críticos verificados bloquean la finalización hasta que se corrijan o se acepten de forma explícita. La revisión es una compuerta, no un comentario.

Desde el estándar 2.3.0 esa revisión local **forma parte de la línea base, no es un extra**. El onboarding la instala; cada Final Review la ejecuta. Lo que sigue siendo opcional es la superficie de CI: el Flujo B, donde la misma revisión controla los pull requests a través de la GitHub Action.

El límite que hace seguro adoptarlo es deliberadamente estrecho. El revisor es una skill con licencia MIT y fijada por tag, ejecutada por el agente de código que ya usas, así que ningún flujo de Deep Work Plan depende de un servicio comercial, un proveedor de CI ni un secreto. El **Flujo A** (solo local) es lo que recibe todo repositorio onboarded; el **Flujo B** se ofrece de forma explícita y nunca se instala sin pedirlo. Quien desarrolla también puede rechazar el revisor por completo: ese rechazo se registra como excepción declarada, y `verify` reporta el repositorio como no conforme en ese punto hasta que se instale.

## Cuándo usarlo

| Señal | Acción |
|--------|--------|
| Todo repositorio incorporado | **El Flujo A queda instalado** en la Fase 7a del onboarding (skill vendorizada + `.review/extension.md`); una actualización dirigida del harness lo añade a los repositorios incorporados antes |
| El equipo quiere una compuerta de fusión en CI con hallazgos estructurados | **Ofrecer el Flujo B** — aceptación explícita, nunca el valor por defecto |
| Repositorio personal o experimental; la revisión local es suficiente | **Permanecer en el Flujo A** — la línea base está completa |

## Dos flujos de adopción

| Flujo | Qué obtienes |
|------|----------------|
| **A — solo local (línea base)** | Skill vendorizada + `.review/extension.md` requerido (vía `generate-extension`). Ejecuta la revisión local dentro del pase de seguridad de cada Final Review. Sin flujo de GitHub Actions. |
| **B — doble superficie** | Flujo A más `setup` escribe el flujo de revisión (Action `@v3`), mismo archivo de extensión para local y CI. Compañeros opcionales `apply-review` y `address-review` tras los hallazgos de CI. |

La detección de la revisión local requiere **skill + un archivo de extensión** en alguna de: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` o `.github/ai-pr-reviewer/extension.md`. La skill sola no es suficiente.

## Qué conecta este addon (acotado por diseño)

El addon de DWP **no** reinventa el revisor. Delega la instalación, la metodología, el asistente de CI, la autoría de extensiones, la redacción de PRs y los bucles de revisión post-CI a las seis sub-skills de la skill upstream (flujo padre por defecto, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### La revisión local requerida

`create` añade el paso de revisión local al pase de seguridad de cada Final Review y `execute` lo ejecuta. La salida se añade bajo `## AI Diff Reviewer local review` en el `analysis_results/SECURITY_REVIEW.md` local del plan (dentro del folder propio del plan, nunca en la raíz del repositorio).

- **Revisor ausente — registrado, nunca omitido en silencio:** una skill o extensión ausente se convierte en un hallazgo `local reviewer not installed`; el Final Review ejecuta el pase local cuando la skill está presente y, de lo contrario, lleva el hallazgo al informe de finalización — la instalación pertenece al consentimiento del onboarding o a una invocación explícita del addon, nunca es un arranque sorpresa.
- **Fallo suave (solo invocación):** una revisión que pudo iniciar pero termina con error → advertir una vez, registrar, continuar; nunca fallar la tarea por eso.
- **Compuerta tras un pase completado:** los **críticos verificados** bloquean la finalización del Final Review hasta que se corrijan o se acepten explícitamente (BC-07). Las afirmaciones críticas no verificadas llegan como advertencias anotadas —visibles, no bloqueantes, salvo que `strict-unverified-criticals: true` restablezca el filtrado por afirmación. Una revisión que agotó su tope de turnos (`incomplete`) o su reloj (`timeout`) no es un pase limpio bajo rigor bloqueante (BC-04). Los hallazgos `warning` / `info` se documentan pero no bloquean.
- **El Flujo A no necesita secreto de CI.** Una clave de proveedor sin configurar no debe suprimir el pase local.

### Compuerta de CI del Flujo B (opcional)

Action `DailybotHQ/ai-diff-reviewer@v3`, típicamente bloqueada por etiqueta (`ready`), con un trabajo de nombre estable **AI review gate** para la protección de ramas y etiqueta de omisión opcional `skip-review-label: skip-ai-review`. Desde v3 el presupuesto de revisión sigue el nivel de riesgo determinista del cambio —8/20/30/40 turnos de `low` a `critical` bajo `budget-profile: auto` (`fixed` restablece las constantes previas a v3 durante la transición)— y un push que no cambia código ejecuta una ronda solo del verificador. El `prompt.md` compartido + extensión alinean metodología y severidad; local y CI permanecen idénticos en metodología, mientras las rondas de CI 2+ pueden ser más breves bajo Revisión Consciente de Iteraciones y el pase local permanece completo.

### Compañeros de revisión opcionales

Dos sub-skills invocables por el desarrollador cierran el bucle tras publicar CI una revisión; ninguna es nunca un archivo de tarea del plan (rompería el orden obligatorio de tareas finales).

- `apply-review` recorre los hallazgos uno a uno (aplicar / diferir / omitir) con consentimiento. Solo lectura por defecto; nunca hace commit ni push.
- `address-review` (nuevo en v3.1.1) es el bucle de una sola invocación: encuentra los PR abiertos de la rama, comprueba que la revisión cubre el head actual, presenta los hallazgos con un plan de aplicar/diferir/omitir y —con un solo sí— aplica, hace commits en lotes pequeños de Conventional Commits, hace push y rearma el revisor según como el repo lo dispara (bloqueo por etiqueta → alterna la etiqueta; disparo por push → confirma la nueva ejecución). A diferencia de `apply-review`, hace commit y push; ese es el punto del bucle. En revisiones agregadas de un ensemble lee el documento agregado y el marcador `ai-pr-reviewer-aggregate`.
- La vía para máquinas es la salida estructurada, no el cuerpo de la revisión: el documento `review-output/3.0` (`.aiprr/review-output.json`, localizable vía las salidas `structured-output-path` y `structured-output-sha256`) lleva el registro de ejecución, los hallazgos con evidencia y verificación, los hallazgos refutados y la compuerta. Un cuerpo de revisión que dice `Recommendation: approve` no es prueba de que la comprobación haya pasado — lee primero el bloque Highest severity / Strictness gate / Check status del marcador de seguimiento.

## Qué cambió en v3

Tres versiones llegaron el 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) y v3.1.1 siguió con la sub-skill `address-review`. Ninguna cambia cómo este addon conecta el revisor — el Flujo A, las tres rutas de detección y la escalera de nunca bloquear siguen iguales —, pero sí cambian lo que recibe quien lo adopta.

| Cambio | Qué significa para un repositorio DWP |
|--------|----------------------------------------|
| **Un `critical` solo se publica cuando está verificado** (v3.0.0) | Cada crítico afirmado —más una muestra del 30 % de las advertencias— recibe una segunda comprobación breve basada en código por una llamada de modelo separada (≈ 3 k tokens, 10 s y $0.009 por hallazgo verificado). Los críticos verificados filtran el pase de seguridad; los refutados siguen visibles como advertencias anotadas y se listan en la salida estructurada, nunca inline. |
| **El presupuesto sigue el nivel de riesgo** (v3.0.0) | 8/20/30/40 turnos de `low` a `critical`, derivados del inventario de cambios (`budget-profile: auto`). Un push sin cambios de código ejecuta una ronda solo del verificador con −93 % de costo. `budget-profile: fixed` restablece las constantes previas a v3 de 30 turnos. |
| **Una revisión sin terminar es roja** (v3.0.0) | `incomplete` (tope de turnos) y `timeout` (reloj) publican hallazgos parciales y fallan bajo rigor bloqueante — «sin hallazgos» ahora significa siempre que el revisor miró y no encontró nada. |
| **La salida estructurada es la vía para máquinas** (v3.0.0) | El documento `review-output/3.0` lleva el registro de ejecución, el inventario de cambios, los hallazgos con evidencia tipada y verificación, los refutados y la compuerta. Lee el documento en lugar de raspar cuerpos de revisión. |
| **Seis sub-skills** (v3.1.1) | `address-review` se suma al router: una invocación aplica, hace commit, hace push y rearma el revisor. |
| **Ensemble opcional** (v3.0.0) | Patas `mode: emit` de solo lectura más un trabajo `aggregate` verifican una vez los hallazgos consolidados y publican una única revisión. |
| **`@v2` sigue funcionando** | La línea v2 está congelada en `release/v2` con seis meses de mantenimiento de seguridad y catálogo. v3 es la recomendación, nunca una migración forzada. |

Dos de estos importan más que el resto para la metodología.

**La compuerta de críticos verificados endurece el pase de seguridad.** Antes de v3, un modelo podía afirmar un `critical` libremente y la compuerta seguía la afirmación. Ahora un hallazgo crítico en un Final Review significa que una segunda llamada al modelo lo confirmó contra el código, y la campaña de la versión midió la diferencia: 771 corridas de evaluación pagadas en diez campañas por unos $83 en total, con el nivel crítico alcanzando 63/63 de recall con precisión adjudicada de 1.0, y las rondas incrementales recortando los tokens de entrada entre un 62 y un 76 %. Estas cifras son mediciones publicadas por upstream, no propias de Deep Work Plan.

**`economy` deliberadamente no es más barato.** El benchmark upstream del 2026-09-16 midió `grok-4.3` en 0 de 5 defectos conocidos —aprueba sin revisar—, mientras que `grok-4.5` igualó a `grok-4.6` con 3 de 5 y sin falsos positivos, al mismo costo y con una cuarta parte del tiempo de ejecución. Como no hay ningún modelo de xAI más barato que siga revisando, `economy` resuelve al mismo modelo que `balanced` en lugar de ser un nivel que no encuentra nada; en el runner grok, el presupuesto de turnos del nivel de riesgo —no la elección del modelo— es lo que escala el costo. Por eso la ruta de xAI pasa de unos $0.07 a unos $0.40–0.75 por revisión a través de la CLI; `model: grok-4.3` todavía puede fijarse de forma explícita para conservar el comportamiento anterior. Estas cifras son mediciones publicadas por upstream, no propias de Deep Work Plan.

## Comportamiento

- **El Flujo A es la línea base; el Flujo B se pregunta, nunca se supone.** Instalar un flujo no solicitado es una huella mayor que permanecer en el Flujo A.
- **Reconcilia, no sobrescribas.** La skill, extensión o flujo de revisión existentes se preservan; solo rellena huecos.
- **Auth diferida.** Los secretos del proveedor para CI los configura el mantenedor; este addon nunca almacena credenciales.
- **Neutral respecto al proveedor.** Nunca se exige un servicio comercial, un proveedor de CI ni un secreto; la superficie de CI es la única pieza que toca un proveedor.

## Notas

Revisión local requerida desde el estándar 2.3.0; superficie de CI opcional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Guía de migración upstream: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Página de spec: [Add-ons](/spec/addons).
