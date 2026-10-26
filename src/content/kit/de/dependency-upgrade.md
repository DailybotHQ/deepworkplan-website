---
title: Dependency-Upgrade
description: "Ein Opt-in-, paketmanager-agnostisches Addon, das die Abhängigkeiten eines Repositorys in validierten, rücknehmbaren Chargen aktualisiert und den echten."
kind: addon
lang: de
order: 3
---

# Dependency-upgrade-Addon

Die Abhängigkeiten eines Repositorys mit einem chargenweisen, validierten, rücknehmbaren Workflow auf den neuesten Stand bringen. Das dritte Opt-in-Addon von Deep Work Plan.

## Was es hinzufügt

- Erkennung des **echten** Paketmanagers des Repositorys (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer und mehr) aus dem vorhandenen Manifest und der Lockfile.
- Einen `/lib-upgrade`-Befehl, installiert in `.agents/commands/`, **nur wenn angenommen**.

## Verhalten

1. Einen sauberen (oder gesicherten) Arbeitsbaum voraussetzen.
2. Upgrades nach semver klassifizieren — patch, minor, major; Majors erfordern eine explizite Freigabe.
3. In kleinen, kohärenten Chargen aktualisieren; niemals alle auf einmal.
4. Nach jeder Charge das echte Validierungs-Gate des Repositorys ausführen; jede fehlgeschlagene Charge rückgängig machen.
5. Zusammenfassen, was aktualisiert, übersprungen und rückgängig gemacht wurde; den Entwickler committen lassen.


## v7-Spezifikation

| Element | Wert |
|---|---|
| Produkt | DeepWorkPlan dependency-upgrade-Addon |
| Registrierungsschlüssel | `dependency-upgrade` in `.dwp/config.json` |
| Deskriptor | `addons/dependency-upgrade/addon.json` (Schnittstelle 1) |
| Befehl | `/lib-upgrade` installiert in `.agents/commands/` bei Annahme |
| Versionierung | Gepinnt und versioniert mit dem Skill-Paket (`v7.9.0`) |
## Hinweise

Paketmanager-agnostisch — führt niemals npm/ncu in einem Nicht-JS-Repository aus. Opt-in, nie erforderlich, und committet niemals automatisch.
