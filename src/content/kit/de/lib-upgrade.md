---
title: lib-upgrade
description: "Die Abhängigkeiten eines Repositorys sicher in validierten, rücknehmbaren Chargen über das dependency-upgrade-Addon aktualisieren. Nur installiert, wenn dieses Addon angenommen wird."
kind: command
lang: de
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Die Abhängigkeiten des Repositorys sicher aktualisieren. Ein schlanker Delegator an das **dependency-upgrade**-Addon.

## Was es tut

`lib-upgrade` leitet an das dependency-upgrade-Addon weiter. Das Addon schlussfolgert über den tatsächlichen Paketmanager des Repositorys — ohne npm anzunehmen —, klassifiziert Upgrades nach semver, aktualisiert in sicheren Chargen, führt nach jeder Charge das echte Validierungs-Gate des Repositorys aus, macht eine fehlgeschlagene Charge rückgängig und fasst zusammen.

## Verwendung

```
/lib-upgrade
```

## Verhalten

1. Einen sauberen (oder gesicherten) Arbeitsbaum voraussetzen.
2. Den echten Paketmanager aus dem vorhandenen Manifest und der Lockfile erkennen.
3. Upgrades klassifizieren (patch / minor / major); Majors erfordern eine Freigabe.
4. In kleinen Chargen aktualisieren; nach jeder das echte Gate des Repositorys validieren.
5. Jede Charge rückgängig machen, die das Gate nicht besteht; zusammenfassen und den Entwickler committen lassen.

## Hinweise

Dieser Befehl wird nur installiert, wenn das dependency-upgrade-Addon angenommen wird. Paketmanager-agnostisch; committet niemals automatisch.
