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

## Addon design-system

L’addon **design-system** è un’estensione opt-in con ambito frontend che dota un repository di un `DESIGN.md` — un file di design system in Markdown che qualsiasi agente di codice legge per generare UI coerente con il design system proprio del repository. Ragiona sui token di design reali del repository (proprietà personalizzate CSS, una configurazione Tailwind, file di token, stili dei componenti) anziché copiare un file di brand, e documenta le sezioni canoniche: colori e ruoli (chiaro e scuro), tipografia, layout e spaziatura, elevazione, forme, componenti, comportamento responsive, cosa fare e cosa evitare (incluse le regole di accessibilità del repository) e una guida di prompt per gli agenti. Verifica il contrasto WCAG AA e l’integrità dei token e riconcilia un `DESIGN.md` esistente anziché sovrascriverlo.

Il file risiede in `docs/DESIGN.md`, accanto alle altre specifiche del repository, ed è referenziato da `AGENTS.md` così che gli agenti lo scoprano nello stesso modo in cui scoprono il resto della documentazione (la radice del repository si usa solo quando non esiste un albero `docs/`). La scoperta avviene per riferimento, non per posizione fisica. L’addon è **attivo di default quando rilevato**: quando una superficie UI è presente, l’onboarding lo applica in modalità trust e lo raccomanda con forza in modalità guidata; non viene mai offerto per un repository backend, CLI o solo libreria, e un repository con zero addon resta pienamente conforme.

Questo file di design system a livello di repository è distinto da un documento di design tecnico per funzionalità (il `design.md` del flusso «requisiti → design → attività» dei workflow spec-driven legati a uno strumento). DWP non include un archetipo separato di documento di design per funzionalità: il README di un piano, i criteri di accettazione di ogni attività e i validation gate coprono già quel ruolo. L’addon colma l’unica lacuna che quel ruolo non copre: un contesto di design dell’UI durevole e nativo del repo.

## Preset

I preset adattano DWP a uno specifico tech stack (Django, React, Go).

## Adapter

Gli adapter mappano i comandi DWP sul sistema di comandi di uno specifico agente (Claude Code, Cursor, Codex).

## Esempi

Gli esempi dimostrano DWP nella pratica (confronti prima-e-dopo, piani di esempio, casi di studio).
