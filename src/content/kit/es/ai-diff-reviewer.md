---
title: AI Diff Reviewer
description: "Addon DWP opcional: amplía la Revisión de Seguridad con un pase local de AI Diff Reviewer, compuerta de CI opcional de Flujo B (v2), archivo de extensión compartido y compañero apply-review."
kind: addon
lang: es
order: 5
---

# Addon de AI Diff Reviewer

Conecta la ejecución de Deep Work Plan con el **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (publicado en el marketplace como **"AI Diff Reviewer"**, versión actual **v2.0.0**) para que la tarea final obligatoria de **Revisión de Seguridad** adquiera una revisión local estructurada — veredicto, tabla de hallazgos y severidad — y, al elegir el Flujo B, cualquier pull request puede bloquearse con la misma revisión en CI. Un addon **opcional**; nunca requerido para la conformidad AI-first.

La metodología central de Deep Work Plan tiene **cero** dependencia de AI Diff Reviewer. Un repositorio sin addons es plenamente conforme. Ofrece este addon solo cuando el desarrollador o el equipo desea calidad de revisión estructurada; nunca lo instales automáticamente para todos. Siempre pregunta Flujo A vs Flujo B — nunca elijas por defecto.

## Cuándo usarlo

| Señal | Acción |
|--------|--------|
| El equipo quiere una compuerta de fusión en CI con hallazgos estructurados | **Recomendar Flujo B** durante la incorporación |
| Repositorio personal o experimental; la revisión local previa al push es suficiente | **Ofrecer Flujo A** |
| Sin apetito por una superficie de revisión adicional | **Omitir** — la Revisión de Seguridad de base sigue aplicándose |

## Dos flujos de adopción

| Flujo | Qué obtienes |
|------|----------------|
| **A — solo local** | Skill vendorizada + `.review/extension.md` requerido (vía `generate-extension`). Amplía la Revisión de Seguridad con un pase local. Sin flujo de GitHub Actions. |
| **B — doble superficie** | Flujo A más `setup` escribe `.github/workflows/pr-review.yml` (Action `@v2`), mismo archivo de extensión para local y CI. Compañero opcional `apply-review` tras los hallazgos de CI. |

La detección para la ampliación de la Revisión de Seguridad requiere **skill + un archivo de extensión** en alguna de: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` o `.github/ai-pr-reviewer/extension.md`. La skill sola no es suficiente.

## Qué conecta este addon (acotado por diseño)

El addon de DWP **no** reinventa el revisor. Delega la instalación, la metodología, el asistente de CI, la autoría de extensiones, la redacción de PRs y el recorrido post-CI a las cinco sub-skills de la skill upstream (flujo padre por defecto, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Ampliación de la Revisión de Seguridad

Cuando se detecta, `create` / `execute` añaden un paso de revisión local a la tarea obligatoria de Revisión de Seguridad. La salida se añade bajo `## AI Diff Reviewer local review` en `analysis_results/SECURITY_REVIEW.md`.

- **Fallo suave (solo invocación):** skill ausente, extensión ausente o error de invocación → advertir una vez y continuar; nunca fallar la tarea por eso.
- **Compuerta tras un pase completado:** los hallazgos `critical` siguen bloqueando la finalización de la Revisión de Seguridad hasta que se corrijan o se acepten explícitamente (contrato SR existente). Los hallazgos `warning` / `info` se documentan pero no bloquean.
- **El Flujo A no necesita secreto de CI.** Un `CURSOR_API_KEY` no configurado no debe suprimir el pase local.

### Compuerta de CI del Flujo B (opcional)

Action fijada `DailybotHQ/ai-diff-reviewer@v2`, típicamente bloqueada por etiqueta (`ready`), con un trabajo de nombre estable **AI review gate** para la protección de ramas y etiqueta de omisión opcional `skip-review-label: skip-ai-review`. El `prompt.md` compartido + extensión alinean metodología y severidad; bajo Revisión Consciente de Iteraciones, las rondas de CI 2+ pueden ser más breves mientras el pase local permanece completo.

### Compañero `apply-review` opcional

Tras publicar CI una revisión, el desarrollador puede invocar `apply-review` durante `execute` para recorrer los hallazgos uno a uno (aplicar / diferir / omitir) con consentimiento. Solo lectura por defecto; nunca un archivo de tarea del plan (rompería el orden obligatorio de tareas finales).

## Comportamiento

- **Pregunta el flujo; nunca asumas.** Instalar un flujo no solicitado es una huella mayor que permanecer en el Flujo A.
- **Reconcilia, no sobreescriba.** La skill, extensión o `pr-review.yml` existentes se preservan; solo rellena huecos.
- **Auth diferida.** Los secretos del proveedor para CI los configura el mantenedor; este addon nunca almacena credenciales.
- **Neutral respecto al proveedor.** Rechazarlo deja un repositorio plenamente AI-first.

## Notas

Opcional y nunca requerido. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Página de spec: [Add-ons](/spec/addons).
