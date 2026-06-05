---
title: React Native
description: "Preset de incorporación para proyectos React Native y Expo, con pistas de razonamiento para navegación, la config nativa, el test runner y bare vs managed."
kind: preset
lang: es
order: 16
stack: React Native (Expo)
---

# Preset React Native

Guía de razonamiento que el flujo de onboard usa para proyectos React Native y Expo. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `react-native` en las dependencias; `app.json`/`app.config.ts` y `expo` para proyectos managed, o carpetas `ios/`+`android/` para bare RN.
- `metro.config.*`, React Navigation o `expo-router` (un directorio `app/`) y una configuración de Jest.
- El gestor de paquetes se infiere del lockfile que exista.

## Qué razonar

- Si se trata de Expo managed o bare React Native — determina los comandos de compilación y ejecución.
- Los comandos reales de prueba (`jest` + `@testing-library/react-native`), lint (`eslint`) y ejecución/compilación (`expo start`, `eas build` o `npx react-native run-*`) — capturados al pie de la letra.
- Estilo de navegación (React Navigation vs `expo-router`) y convenciones de pantallas y componentes.

## Notas

Detecta bare RN vs Expo managed desde el principio; la separación entre nativo y managed cambia prácticamente cada comando.
