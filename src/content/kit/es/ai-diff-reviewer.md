---
title: AI Diff Reviewer
description: "Revisión local requerida en cada Final Review de DWP desde el estándar 2.3.0, instalada por el onboarding; la puerta CI del Flujo B (v2), la extensión compartida y el compañero apply-review siguen siendo opcionales."
kind: addon
lang: es
order: 5
---

# Addon de AI Diff Reviewer

Conecta la ejecución de Deep Work Plan con el **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (publicado en el marketplace como **"AI Diff Reviewer"**, versión actual **v2.0.1**) para que el pase de seguridad del **Final Review** obligatorio ejecute una revisión local estructurada — veredicto, tabla de hallazgos y severidad — y, al elegir el Flujo B, cualquier pull request pueda bloquearse con la misma revisión en CI. Desde el estándar 2.3.0 la **revisión local es parte de la línea base**: el onboarding la instala y cada Final Review la ejecuta. Solo la superficie de CI es opcional.

Lo que permanece neutral respecto al proveedor es el límite que importa: el revisor es una skill MIT fijada por tag que ejecuta tu **propio** agente de codificación — ningún flujo de Deep Work Plan exige un servicio comercial, un proveedor de CI o un secreto. El Flujo A (solo local) es la línea base que recibe todo repositorio incorporado; el Flujo B (el Action de CI) se ofrece explícitamente y nunca se instala sin pedirlo. Un desarrollador puede rechazar el revisor local; el rechazo se registra como excepción declarada y `verify` reporta el repositorio como no conforme en ese punto hasta que se instale.

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

## Comportamiento

- **El Flujo A es la línea base; el Flujo B se pregunta, nunca se supone.** Instalar un flujo no solicitado es una huella mayor que permanecer en el Flujo A.
- **Reconcilia, no sobrescribas.** La skill, extensión o `pr-review.yml` existentes se preservan; solo rellena huecos.
- **Auth diferida.** Los secretos del proveedor para CI los configura el mantenedor; este addon nunca almacena credenciales.
- **Neutral respecto al proveedor.** Nunca se exige un servicio comercial, un proveedor de CI ni un secreto; la superficie de CI es la única pieza que toca un proveedor.

## Notas

Revisión local requerida desde el estándar 2.3.0; superficie de CI opcional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Página de spec: [Add-ons](/spec/addons).
