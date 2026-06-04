---
title: Addon
description: "Estensioni opzionali della metodologia DWP di base: skill, agenti, preset, adapter ed esempi, e come ciascuna estende il workflow senza essere obbligatoria."
order: 5
lang: it
section: Addons
---

# Addon

**Versione 1.0.** Gli addon sono estensioni opzionali della metodologia DWP di base. Non sono richiesti per la conformità, ma forniscono capacità aggiuntive.

## Skill

Le skill sono procedure riutilizzabili invocate per nome. Una skill impacchetta un workflow ripetibile (eseguire i test, correggere il lint, creare un componente).

La metodologia include un piccolo insieme di sub-skill di base. Tra queste, la sub-skill **author** consente a un repository di **far crescere il proprio kit**: invocata tramite `/skill-create` e `/agent-create`, ragiona sulla struttura `.agents/` esistente e sulle convenzioni del repository, poi crea una nuova skill, agente o sottile delegatore di comando che vi si conforma e mantiene il catalogo allineato. La stessa sub-skill esegue l’attività obbligatoria Skills & Agents Discovery.

## Agenti

Gli agenti sono lavoratori specializzati con un ruolo definito (reviewer, executor, architect).

## Addon di manutenzione

Gli addon di manutenzione sono estensioni opt-in, mai richieste per la conformità, che aiutano un repository a mantenersi da sé. L’addon **dependency-upgrade** ragiona sul package manager reale del repository (anziché assumere npm) e aggiorna le dipendenze a lotti piccoli, validati e annullabili: rileva il manager dal manifest e dal lockfile reali, classifica gli aggiornamenti per semver, aggiorna a lotti, esegue il validation gate reale del repository dopo ogni lotto, annulla qualsiasi lotto che fallisce e riassume senza eseguire il commit automaticamente. Un addon viene installato solo quando è accettato durante l’onboarding.

## Preset

I preset adattano DWP a uno specifico tech stack (Django, React, Go).

## Adapter

Gli adapter mappano i comandi DWP sul sistema di comandi di uno specifico agente (Claude Code, Cursor, Codex).

## Esempi

Gli esempi dimostrano DWP nella pratica (confronti prima-e-dopo, piani di esempio, casi di studio).
