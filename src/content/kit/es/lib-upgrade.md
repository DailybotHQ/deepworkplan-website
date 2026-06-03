---
title: lib-upgrade
description: "Actualiza con seguridad las dependencias de un repositorio en lotes validados y reversibles, vía el addon dependency-upgrade. Solo se instala si se acepta."
kind: command
lang: es
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Actualiza con seguridad las dependencias del repositorio. Un delegador ligero al addon **dependency-upgrade**.

## Qué hace

`lib-upgrade` enruta al addon dependency-upgrade. El addon razona sobre el gestor de paquetes real del repo — sin asumir npm — clasifica las actualizaciones por semver, actualiza en lotes seguros, ejecuta la compuerta de validación real del repo tras cada lote, revierte un lote que falla y resume.

## Uso

```
/lib-upgrade
```

## Comportamiento

1. Requiere un árbol de trabajo limpio (o respaldado).
2. Detecta el gestor de paquetes real a partir del manifiesto y el lockfile que existen.
3. Clasifica las actualizaciones (patch / minor / major); las major requieren aprobación.
4. Actualiza en lotes pequeños; valida la compuerta real del repo tras cada uno.
5. Revierte cualquier lote que falle la compuerta; resume y deja que el desarrollador haga commit.

## Notas

Este comando se instala solo cuando se acepta el addon dependency-upgrade. Es agnóstico del gestor de paquetes y nunca hace commit automático.
