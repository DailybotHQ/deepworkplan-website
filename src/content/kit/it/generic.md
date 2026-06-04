---
title: Generic
description: "Il preset di onboarding di fallback per qualsiasi progetto, con spunti di ragionamento indipendenti dallo stack che rilevano i comandi di build e test dal repository."
kind: preset
lang: it
order: 6
stack: Generic
---

# Preset Generic

La guida di ragionamento di fallback che il flusso di onboard usa quando nessun preset specifico per stack è applicabile. È una checklist, non un template — vince la realtà rilevata.

## Su cosa ragionare

- Rilevare i comandi reali di build e test dal manifest, dal Makefile o dalla CI — catturati alla lettera.
- Applicare convenzioni generali; non fare assunzioni specifiche per stack.
- Generare solo le skill, gli agenti e i docs che corrispondono ai workflow reali del repo.

## Note

Il fallback quando nessuno tra Django, Vue + Vite, Astro/Svelte, Node/TS service o Python package/CLI corrisponde.
