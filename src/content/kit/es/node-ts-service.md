---
title: Servicio Node / TS
description: "Un preset de incorporación para servicios y APIs serverless de Node y TypeScript, con pistas para el ciclo de vida de la solicitud, integraciones y pruebas."
kind: preset
lang: es
order: 4
stack: Node / TS service
---

# Preset de servicio Node / TS

Una guía de razonamiento que el flujo de onboard usa para servicios y APIs serverless de Node/TypeScript. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `tsconfig.json` más un framework de servidor (`express`, `fastify`, `@nestjs/*`) o handlers serverless (`serverless.yml`, `template.yaml`, un directorio `functions/`).
- Gestor de paquetes inferido del lockfile que existe.

## Qué razonar

- Los scripts reales de lint, verificación de tipos (`tsc --noEmit`), prueba (Jest/Vitest) y compilación — capturados al pie de la letra.
- Si es un servicio de larga ejecución o serverless — esto da forma a los docs de arquitectura y rendimiento.
- Skills adaptadas: `endpoint`/`handler`, `service`, `middleware`, `integration` o `lambda-fn`.

## Notas

Captura el ciclo de vida de la solicitud o el evento, los puntos de integración y dónde viven los secretos y la configuración.
