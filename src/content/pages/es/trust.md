---
title: "Confianza y seguridad"
description: "Por qué Deep Work Plan es seguro de adoptar: código abierto y MIT, Markdown-first sin llamadas de red ni telemetría, no destructivo por diseño, con instalaciones verificables y una política clara de divulgación de vulnerabilidades."
lastUpdated: 2026-06-05
---

## Por qué puedes confiar en él

Nadie debería instalar una skill en la que no puede confiar. Deep Work Plan está diseñado para ser verificado, no tomado con fe ciega: código abierto, Markdown-first, no destructivo y comprobable antes de ejecutarlo.

- **Código abierto y licencia MIT** — el sitio web y la skill son públicos y se pueden revisar; lee cada línea antes de ejecutarla.
- **Markdown-first — sin red, sin telemetría** — sin CLI, sin API HTTP, sin flujo de autenticación; no realiza llamadas de red ni envía telemetría. Nada de tu repositorio sale de tu máquina.
- **No destructivo por diseño** — la única acción relevante para la seguridad es modificar tu repositorio, y reconcilia en lugar de sobreescribir: detecta lo que existe, propone un plan y pregunta antes de reemplazar cualquier cosa. El resultado de los planes vive en un directorio `.dwp/` ignorado por git.
- **No toca secretos** — nunca confirma secretos, añade al `.gitignore` en lugar de reescribirlo, y mantiene los cambios en diffs pequeños y revisables.
- **Procedencia verificable** — cada versión publica checksums de la skill distribuida.

---

## Verifica antes de ejecutar

Trata la skill como no confiable hasta haberla comprobado. Cada versión adjunta un archivo `SHA256SUMS` que cubre la skill distribuida. Descárgalo para la versión que vayas a instalar y verifica que tu copia coincide — una salida distinta de cero significa que un archivo no coincide y debes detenerte.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Descarga los checksums para la versión que vas a instalar (reemplaza vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # una salida distinta de cero significa que un archivo no coincide — detente
```

Las versiones tienen **checksums, no firmas criptográficas** — las firmas (cosign o GPG del mantenedor) son el próximo paso documentado, no una garantía actual. Dado que todo es abierto, también puedes comparar cualquier archivo con el repositorio en su etiqueta.

---

## Reportar una vulnerabilidad

Reporta los problemas de seguridad de forma privada a **security@dailybot.com** en lugar de abrir un issue público. Confirmamos los reportes en un plazo de 3 días hábiles y buscamos publicar una corrección o mitigación en 30 días para hallazgos válidos, según la gravedad. El sitio web y la skill comparten la misma política.

---

## Limitaciones honestas

- Las versiones tienen checksums, pero aún no están firmadas criptográficamente — las firmas están planificadas, no implementadas.
- Deep Work Plan ejecuta un agente de programación autónomo en tu repositorio. Revisa el plan propuesto y sus diffs; la metodología está diseñada para esa revisión, no para reemplazarla.
- Estas afirmaciones de confianza describen solo las fuentes oficiales. Una copia modificada o de terceros que se haya apartado de los repositorios no tiene ninguna de estas garantías — verifícala primero.

---

## Recursos de confianza

- [Manifiesto de confianza legible por máquina](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Política de seguridad del sitio web](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Política de seguridad y modelo de amenazas de la skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Leer la metodología](/methodology)
- [Adopción (init)](/init)
