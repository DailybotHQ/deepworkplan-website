---
title: AI Diff Reviewer
description: "Revisión local obligatoria en cada Final Review de DWP desde el estándar 2.3.0, instalada en el onboarding; el CI del Flujo B y apply-review son opcionales."
kind: addon
lang: es
order: 5
---

# Addon de AI Diff Reviewer

Todo Deep Work Plan termina igual: un **Final Review** obligatorio que lee el conjunto completo de cambios acumulados del plan antes de poder darlo por concluido. Su pase de seguridad es el último punto en el que algo puede detectarse. Sin ayuda, el único lector en ese momento es el mismo agente que escribió el código.

Este addon pone un segundo lector sobre ese diff. Conecta el **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** —publicado en el marketplace como "AI Diff Reviewer", actualmente **v2.3.0**— al pase de seguridad, donde devuelve algo estructurado en lugar de prosa: un veredicto, una tabla de hallazgos y una severidad para cada uno. Un hallazgo `critical` bloquea la finalización hasta que se corrija o se acepte de forma explícita. La revisión es una compuerta, no un comentario.

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
| **B — doble superficie** | Flujo A más `setup` escribe `.github/workflows/pr-review.yml` (Action `@v2`), mismo archivo de extensión para local y CI. Compañero opcional `apply-review` tras los hallazgos de CI. |

La detección de la revisión local requiere **skill + un archivo de extensión** en alguna de: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` o `.github/ai-pr-reviewer/extension.md`. La skill sola no es suficiente.

## Qué conecta este addon (acotado por diseño)

El addon de DWP **no** reinventa el revisor. Delega la instalación, la metodología, el asistente de CI, la autoría de extensiones, la redacción de PRs y el recorrido post-CI a las cinco sub-skills de la skill upstream (flujo padre por defecto, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### La revisión local requerida

`create` añade el paso de revisión local al pase de seguridad de cada Final Review y `execute` lo ejecuta. La salida se añade bajo `## AI Diff Reviewer local review` en el `analysis_results/SECURITY_REVIEW.md` local del plan (dentro del folder propio del plan, nunca en la raíz del repositorio).

- **Revisor ausente — registrado, nunca omitido en silencio:** una skill o extensión ausente se convierte en un hallazgo `local reviewer not installed`; el Final Review ejecuta el pase local cuando la skill está presente y, de lo contrario, lleva el hallazgo al informe de finalización — la instalación pertenece al consentimiento del onboarding o a una invocación explícita del addon, nunca es un arranque sorpresa.
- **Fallo suave (solo invocación):** una revisión que pudo iniciar pero termina con error → advertir una vez, registrar, continuar; nunca fallar la tarea por eso.
- **Compuerta tras un pase completado:** los hallazgos `critical` siguen bloqueando la finalización del Final Review hasta que se corrijan o se acepten explícitamente. Los hallazgos `warning` / `info` se documentan pero no bloquean.
- **El Flujo A no necesita secreto de CI.** Un `CURSOR_API_KEY` no configurado no debe suprimir el pase local.

### Compuerta de CI del Flujo B (opcional)

Action `DailybotHQ/ai-diff-reviewer@v2`, típicamente bloqueada por etiqueta (`ready`), con un trabajo de nombre estable **AI review gate** para la protección de ramas y etiqueta de omisión opcional `skip-review-label: skip-ai-review`. El `prompt.md` compartido + extensión alinean metodología y severidad; bajo Revisión Consciente de Iteraciones, las rondas de CI 2+ pueden ser más breves mientras el pase local permanece completo.

### Compañero `apply-review` opcional

Tras publicar CI una revisión, el desarrollador puede invocar `apply-review` durante `execute` para recorrer los hallazgos uno a uno (aplicar / diferir / omitir) con consentimiento. Solo lectura por defecto; nunca un archivo de tarea del plan (rompería el orden obligatorio de tareas finales).

## Qué cambió desde v2.0.1

Entre v2.0.1 y v2.3.0 llegaron tres versiones upstream. Ninguna cambia cómo este addon conecta el revisor — el Flujo A, las tres rutas de detección y el contrato de bloqueo siguen iguales —, pero sí cambian lo que recibe quien lo adopta.

| Cambio | Qué significa para un repositorio DWP |
|--------|----------------------------------------|
| **El runner y el backend son entradas separadas** (v2.1.0) | `provider` nombra el *runner*: quién ejecuta el bucle de revisión. El nuevo `api-base` nombra el *backend*: dónde vive el modelo. Un `api-base` vacío es idéntico byte a byte a v2.0.x, así que una instalación existente se comporta exactamente igual que antes. |
| **Dos runners más** (v2.1.0) | `openai` (en proceso, sin instalación) y `grok` (CLI) se suman al conjunto existente. |
| **El costo es un nivel de una palabra, y los valores por defecto están medidos** (v2.1.0, v2.3.0) | El costo se controla con una palabra clave de nivel y diffs acotados, y se reporta por revisión. En xAI, `balanced` y `economy` resuelven ambos a `grok-4.5`, y `deep` a `grok-4.6`. |
| **Las rondas de seguimiento revisan el diff nuevo real** (v2.1.0, v2.2.0) | Los hallazgos pendientes se arrastran. `prior-findings-resolution` usa `advisory` por defecto: el veredicto «resuelto» de un modelo se reporta, pero el hallazgo sigue bloqueando hasta que una persona mantenedora cierre el hilo. |
| **Una revisión incompleta nunca es una revisión en verde** (v2.2.0) | Una ejecución que termina sin escribir hallazgos se publica como revisión incompleta explícita. Falla con cualquier rigor bloqueante, no se estampa la etiqueta de revisado y ninguna ronda vacía retira un hallazgo abierto. |
| **Instaladores verificados por checksum** (v2.2.0) | `cursor-installer-sha256` y `grok-installer-sha256` se niegan a ejecutar un artefacto del proveedor cuyo hash difiera del fijado. |

Dos de estos importan más que el resto para la metodología.

**La compuerta de revisión incompleta cierra un agujero real en el pase de seguridad.** Un Final Review no debe poder cerrarse sobre una revisión que nunca ocurrió. Antes de v2.2.0, un runner que terminaba sin producir hallazgos era indistinguible de un pase limpio. Ahora es un estado con nombre propio y no verde, así que «sin hallazgos» significa que el revisor miró y no encontró nada, y no que nunca miró.

**`economy` deliberadamente no es más barato.** El benchmark upstream del 2026-09-16 midió `grok-4.3` en 0 de 5 defectos conocidos —aprueba sin revisar—, mientras que `grok-4.5` igualó a `grok-4.6` con 3 de 5 y sin falsos positivos, al mismo costo y con una cuarta parte del tiempo de ejecución. Como no hay ningún modelo de xAI más barato que siga revisando, `economy` resuelve al mismo modelo que `balanced` en lugar de ser un nivel que no encuentra nada. Por eso la ruta de xAI pasa de unos $0.07 a unos $0.40–0.75 por revisión a través de la CLI; `model: grok-4.3` todavía puede fijarse de forma explícita para conservar el comportamiento anterior. Estas cifras son mediciones publicadas por upstream, no propias de Deep Work Plan.

## Comportamiento

- **El Flujo A es la línea base; el Flujo B se pregunta, nunca se supone.** Instalar un flujo no solicitado es una huella mayor que permanecer en el Flujo A.
- **Reconcilia, no sobrescribas.** La skill, extensión o `pr-review.yml` existentes se preservan; solo rellena huecos.
- **Auth diferida.** Los secretos del proveedor para CI los configura el mantenedor; este addon nunca almacena credenciales.
- **Neutral respecto al proveedor.** Nunca se exige un servicio comercial, un proveedor de CI ni un secreto; la superficie de CI es la única pieza que toca un proveedor.

## Notas

Revisión local requerida desde el estándar 2.3.0; superficie de CI opcional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Página de spec: [Add-ons](/spec/addons).
