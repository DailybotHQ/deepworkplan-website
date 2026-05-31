---
title: Actualización de dependencias
description: "Un addon opcional y agnóstico del gestor de paquetes que actualiza las dependencias de un repo en lotes validados y reversibles — detectando el gestor real en lugar de asumir npm. Instala el comando /lib-upgrade cuando se acepta."
kind: addon
lang: es
order: 3
---

# Addon de actualización de dependencias

Pon al día las dependencias de un repositorio con un flujo por lotes, validado y reversible. El tercer addon opcional de Deep Work Plan.

## Qué agrega

- Detección del gestor de paquetes **real** del repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer y más) a partir del manifiesto y el lockfile que existen.
- Un comando `/lib-upgrade` instalado en `.agents/commands/`, **solo cuando se acepta**.

## Comportamiento

1. Requiere un árbol de trabajo limpio (o respaldado).
2. Clasifica las actualizaciones por semver — patch, minor, major; las major requieren aprobación explícita.
3. Actualiza en lotes pequeños y coherentes; nunca todo a la vez.
4. Ejecuta la compuerta de validación real del repo tras cada lote; revierte cualquier lote que falle.
5. Resume lo actualizado, lo omitido y lo revertido; deja que el desarrollador haga commit.

## Notas

Agnóstico del gestor de paquetes — nunca ejecuta npm/ncu en un repo no-JS. Opcional, nunca obligatorio y nunca hace commit automático.
