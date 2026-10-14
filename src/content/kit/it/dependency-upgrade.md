---
title: Dependency upgrade
description: "Un addon opt-in e indipendente dal package manager che aggiorna le dipendenze di un repo a lotti validati e annullabili, rilevando il manager reale, senza."
kind: addon
lang: it
order: 3
---

# Addon dependency-upgrade

Porta le dipendenze di un repository allo stato aggiornato con un workflow a lotti, validato e annullabile. Il terzo addon opt-in di Deep Work Plan.

## Cosa aggiunge

- Il rilevamento del package manager **reale** del repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer e altri) dal manifest e dal lockfile esistenti.
- Un comando `/lib-upgrade` installato in `.agents/commands/`, **solo quando accettato**.

## Comportamento

1. Richiede un working tree pulito (o di cui sia stato fatto un backup).
2. Classifica gli aggiornamenti per semver — patch, minor, major; i major richiedono approvazione esplicita.
3. Aggiorna a lotti piccoli e coerenti; mai tutti in una volta.
4. Esegue il validation gate reale del repo dopo ogni lotto; annulla qualsiasi lotto che fallisce.
5. Riassume cosa è stato aggiornato, saltato e annullato; lascia che sia lo sviluppatore a eseguire il commit.


## Specifica v7

| Elemento | Valore |
|---|---|
| Prodotto | Addon dependency-upgrade di DeepWorkPlan |
| Chiave di registro | `dependency-upgrade` in `.dwp/config.json` |
| Descrittore | `addons/dependency-upgrade/addon.json` (interfaccia 1) |
| Comando | `/lib-upgrade` installato in `.agents/commands/` se accettato |
| Controllo versione | Fissato e versionato con il pacchetto di skill (`v7.8.1`) |
## Note

Indipendente dal package manager — non esegue mai npm/ncu in un repo non-JS. Opt-in, mai richiesto e non esegue mai il commit automaticamente.
