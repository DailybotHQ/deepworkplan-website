---
title: React Native
description: "An onboarding preset for React Native and Expo projects, with reasoning cues for navigation, the native config, the test runner, and bare vs managed."
kind: preset
lang: en
order: 16
stack: React Native (Expo)
---

# React Native preset

A reasoning guide the onboard flow uses for React Native and Expo projects. It is a checklist, not a template — detected reality wins.

## Signals

- `react-native` in dependencies; `app.json`/`app.config.ts` and `expo` for managed projects, or `ios/`+`android/` folders for bare RN.
- `metro.config.*`, React Navigation or `expo-router` (an `app/` directory), and a Jest setup.
- Package manager inferred from the lockfile that exists.

## What to reason about

- Whether it is Expo managed or bare React Native — drives the build and run commands.
- The real test (`jest` + `@testing-library/react-native`), lint (`eslint`), and run/build (`expo start`, `eas build`, or `npx react-native run-*`) commands — captured verbatim.
- Navigation style (React Navigation vs `expo-router`) and screen/component conventions.

## Notes

Detect bare RN vs Expo managed early; the native-vs-managed split changes nearly every command.
