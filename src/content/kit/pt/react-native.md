---
title: React Native
description: "Um preset de onboarding para projetos React Native e Expo, com pistas de raciocínio para navegação, a configuração nativa, o test runner e bare vs managed."
kind: preset
lang: pt
order: 16
stack: React Native (Expo)
---

# Preset React Native

Um guia de raciocínio que o fluxo de onboarding usa para projetos React Native e Expo. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `react-native` nas dependências; `app.json`/`app.config.ts` e `expo` para projetos managed, ou pastas `ios/`+`android/` para RN bare.
- `metro.config.*`, React Navigation ou `expo-router` (um diretório `app/`) e uma configuração Jest.
- Gerenciador de pacotes inferido a partir do lockfile presente.

## Sobre o que raciocinar

- Se é Expo managed ou React Native bare — determina os comandos de build e execução.
- Os comandos reais de teste (`jest` + `@testing-library/react-native`), lint (`eslint`) e execução/build (`expo start`, `eas build` ou `npx react-native run-*`) — capturados literalmente.
- Estilo de navegação (React Navigation vs `expo-router`) e convenções de tela/component.

## Notas

Detectar RN bare vs Expo managed logo no início; a divisão nativo-vs-managed muda praticamente todos os comandos.
