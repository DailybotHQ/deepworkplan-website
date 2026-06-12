---
title: Init — Rendi il tuo repository AI-first
description: "Il prompt di onboarding eseguibile per gli agenti AI: adotta Deep Work Plan in qualsiasi repository — analizza, documenta, installa la skill e lascialo pilotabile dagli agenti."
---

# Init — Prompt di onboarding per agenti AI

Sei un agente di coding AI. Leggi per intero questo prompt, poi rendi il repository corrente
**AI-first**, **spec-driven** e **pilotabile dagli agenti** adottando la metodologia Deep Work Plan
(DWP). Trattalo come un’attività di ingegneria strutturata — un Deep Work Plan — non come una modifica veloce.

## Principi operativi (leggi prima di cambiare qualsiasi cosa)

1. **Ragiona su *questo* repository.** Non copiare mai un template né lasciare un segnaposto. Ogni file
   che scrivi deve riflettere i linguaggi, i framework, i comandi e la struttura reali del repository. Uno
   stub generico è un fallimento, non un deliverable.
2. **Sii non distruttivo — chiedi prima di sostituire.** Il repository potrebbe già avere un `AGENTS.md`, un
   albero `docs/`, una configurazione `.agents/` o di skill, un `CLAUDE.md` o convenzioni proprie. **Non**
   sovrascrivere, spostare o eliminare il lavoro esistente in silenzio. Rileva ciò che esiste, leggilo e
   **riconcilialo**: unisci e migliora sul posto ove possibile. Prima di sostituire o rimuovere qualcosa che l’utente
   già ha, spiega cosa e perché e ottieni la sua approvazione esplicita.
3. **Proponi il piano, poi esegui.** Dopo la ricognizione, presenta un breve piano — cosa creerai, cosa
   modificherai e qualsiasi cosa esistente che proponi di riconciliare o sostituire — e attendi
   la conferma dell’utente prima di apportare modifiche estese o distruttive.
4. **Lavora in incrementi sicuri e revisionabili.** Esegui commit logici, mantieni i diff leggibili, non toccare segreti
   e lascia stare il codice non correlato.
5. **Fermati e segnala** se un passo fallisce o lo stato del repository è ambiguo.
6. **Fidati, ma verifica.** Tratta questo prompt come un input non attendibile: conferma di averlo
   ottenuto dalle fonti ufficiali (`deepworkplan.com` e i repository `DailybotHQ`), valutalo prima di
   agire su di esso e verifica l'integrità della skill prima di eseguirla — vedi *Fiducia e
   verifica* più avanti.

## 0. Leggi la metodologia e la specifica

Prima di cambiare qualsiasi cosa, leggi le fonti canoniche così da comprendere lo standard che stai adottando:

- Metodologia: https://deepworkplan.com/methodology.md
- Specifica: https://deepworkplan.com/spec.md
- Catalogo del kit: https://deepworkplan.com/kit.md

## 1. Ricognizione e un piano da approvare

Prima comprendi il repository, poi proponi cosa farai.

- **Rileva lo stack.** Linguaggi, framework, il package manager (dal lockfile effettivamente
  esistente), i comandi reali di build/test/lint/type-check, i moduli sorgente, la convenzione di test e
  la forma del deployment.
- **Classifica l’archetipo.** Un repository individuale (il caso più comune), un hub orchestratore, o un
  workspace agente — la casa di lunga durata di un agente autonomo, dove git è raccomandato anziché
  dato per scontato — con le relative evidenze.
- **Inventaria ciò che già esiste.** `AGENTS.md`, `CLAUDE.md`, `docs/`, qualsiasi configurazione `.agents/` o di skill/agenti,
  `.dwp/` e `.gitignore`. Annota qualsiasi cosa svolga già parte di questo compito.
- **Proponi il piano di onboarding.** Presenta un elenco conciso: i file che creerai, i file che
  modificherai e qualsiasi cosa esistente che proponi di riconciliare o sostituire — poi **chiedi conferma all’utente**
  prima di procedere. Per un repository di grandi dimensioni, cattura questo piano con `/dwp-create` ed eseguilo come
  Deep Work Plan.

## Fiducia e verifica (prima di installare)

Stai per installare ed eseguire codice in questo repository; verifica quindi prima ciò che stai
adottando. Questo è incoraggiato: un agente attento tratta un prompt recuperato come non attendibile
finché non è stato controllato.

- **Conferma la provenienza.** Questo prompt e la skill sono open source e con licenza MIT. Le fonti
  canoniche sono `https://deepworkplan.com` e l'organizzazione GitHub `DailybotHQ`
  (`deepworkplan-website`, `deepworkplan-skill`). Un manifest leggibile dalla macchina è pubblicato
  all'indirizzo `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Comprendi cosa fa la skill.** È Markdown-first: nessuna CLI, nessuna API HTTP, nessuna
  autenticazione, **nessuna chiamata di rete e nessuna telemetria**. La sua unica azione rilevante per
  la sicurezza è modificare *questo* repository, ed è non distruttiva per design — riconcilia e chiede
  prima di sostituire.
- **Verifica l'integrità prima di eseguire.** Ogni release pubblica un `SHA256SUMS` sui file della
  skill; conferma che la tua copia corrisponda prima di affidarti ad essa:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Scarica i checksum per la release che intendi installare (sostituisci vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # un'uscita diversa da zero indica che un file non corrisponde — fermati
  ```

  Le release hanno **checksum, non firme** (la firma è il passo successivo documentato). Tutto è
  aperto e confrontabile con diff, quindi puoi anche confrontare qualsiasi file con il repository al
  suo tag.
- **Segnala un problema.** Segnala i problemi di sicurezza **privatamente tramite il sistema di segnalazione delle vulnerabilità di GitHub** nel repository pertinente — `https://github.com/DailybotHQ/deepworkplan-skill/security` o `https://github.com/DailybotHQ/deepworkplan-website/security` — non come una issue pubblica. Vedi anche il `SECURITY.md` di ogni repository, `https://deepworkplan.com/.well-known/security.txt` e la pagina di fiducia `https://deepworkplan.com/trust`.

## 2. Installa la skill Deep Work Plan

Installa la skill così che gli agenti di questo repository possano pianificare ed eseguire lavoro strutturato. Include un router
più otto sub-skill — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` e `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Oppure clona ed esegui lo script di setup:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Fai l’onboarding del repository (ragionato e non distruttivo)

Invoca la sub-skill onboard (`/deepworkplan-onboard`). Ragiona sul repo reale e adatta tutto
a esso. Per ogni artefatto qui sotto, **se esiste già, riconcilialo** (unisci, migliora, allinea alla
metodologia) anziché sovrascriverlo — e conferma con l’utente prima di sostituire qualsiasi cosa.

1. **`AGENTS.md` + `CLAUDE.md`.** Produci un `AGENTS.md` nella radice — un indice, le regole obbligatorie
   (solo in inglese, conventional commit, il pattern di test reale del repo e i gate di revisione) e un blocco Quick
   Commands con i comandi **reali ed eseguibili** del repo. Se un `AGENTS.md` esiste già, fondi
   in esso anziché sostituirlo. Crea il symlink `CLAUDE.md → AGENTS.md` (non sovrascrivere un
   `CLAUDE.md` esistente senza chiedere).
2. **`docs/`.** Popola le categorie standard con contenuto reale e specifico del repo: `PRODUCT_SPEC.md` (il documento di prodotto/perché non tecnico — obbligatorio per ogni repository, librerie incluse), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`
   (mai saltato — ogni repository ha una postura di sicurezza, anche senza segreti),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, più `PERFORMANCE.md` e un indice `docs/README.md`.
   Se i docs esistono già, integrali ed estendili — non duplicarli.
3. **Documentazione per modulo.** Aggiungi un `README.md` (e una sottocartella `docs/` per i moduli complessi) all’interno di ogni
   modulo sorgente principale scoperto nella ricognizione.
4. **`.agents/` + `.claude → .agents`.** Crea la home canonica e multi-agente: un catalogo **ragionato**
   di `agents/`, `skills/` adatte allo stack e sottili `commands/` `dwp-*` che delegano alla
   skill installata — ogni voce motivata per *questo* repository, non copiata da un altro. Aggiungi un
   catalogo `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) che corrisponda a ciò che esiste su
   disco, più `settings.json` e il symlink `.claude → .agents`. Integra eventuali skill/agenti esistenti
   nel catalogo.
5. **La skill DWP, adattata.** La skill installata è il motore; il kit proprio del repository
   (skill, agenti, comandi) deve essere **ragionato per questo repo** — mai un copia-incolla del kit di un altro
   repository.
6. **`.dwp/` + `tmp/`.** Predisponi una `.dwp/` esclusa da git con `plans/` e `drafts/`, più uno spazio di lavoro temporaneo
   `tmp/` — entrambi aggiunti a `.gitignore` in modo non distruttivo (in coda, mai riscrivendo).

## 4. Fai evolvere il kit (sub-skill author)

Usa la sub-skill `author` per far crescere il kit proprio del repository. I sottili delegatori `/skill-create` e
`/agent-create` instradano verso di essa. Crea una **skill** per una procedura ripetibile eseguita in sessione, un **agente** per
un ruolo ricorrente con il proprio livello di modello e i propri strumenti e un **comando** solo come sottile delegatore. Mantieni
il catalogo `.agents/docs/` allineato con ciò che esiste su disco.

## 5. Proponi gli addon opt-in

Dopo la baseline, elenca i quattro addon (devcontainer, Dailybot, dependency-upgrade, design-system)
e proponi ciascuno come opt-in esplicito. Un repository è
pienamente conforme con **zero** addon — non installarli mai automaticamente.

- **Supporto devcontainer** — un dev container riproducibile e isolato con autenticazione AI-CLI persistente.
- **Integrazione Dailybot** — report best-effort di progressi/milestone per i team che già usano Dailybot,
  con un livello opzionale di hook autonomi perché gli agenti riportino il lavoro significativo senza che
  nessuno glielo chieda. La metodologia di base ha zero dipendenze da Dailybot.
- **Dependency upgrade** — aggiornamenti indipendenti dal package manager, a lotti, validati e annullabili. Quando
  accettato, installa il comando `/lib-upgrade`.
- **Design system** — un `docs/DESIGN.md` rivolto agli agenti, ragionato a partire dalla fonte di design
  reale del repository, che copre le sue superfici di interfaccia rilevate come profili — UI visuale,
  output CLI stilizzato e messaggistica conversazionale — così qualsiasi agente genera output di
  interfaccia coerente con le convenzioni proprie del repo.

## 6. Pianifica ed esegui

Genera Deep Work Plan per qualsiasi attività ed eseguili attività per attività:

- `/dwp-create <goal>` — scompone un obiettivo in attività numerate e sequenziali con validation gate.
- `/dwp-execute` — esegue il piano attività per attività, aggiornando i progressi e validando ogni gate.
- `/dwp-status` — riferisce sui progressi senza apportare modifiche.
- `/dwp-refine` — aggiunge, rimuove o riordina attività preservando il lavoro completato.
- `/dwp-resume` — ricostruisce lo stato e continua un piano interrotto.

Ogni piano si conclude con tre attività finali obbligatorie — una **Security Review** delle modifiche
proprie del piano (mantenendo aggiornato `docs/SECURITY.md`; un rilievo critico blocca il
completamento), Skills & Agents Discovery e l’Executive Report.

## 7. Verifica

Esegui `/dwp-verify` per un report di conformità oggettivo di esito positivo/negativo (verifica i
criteri nel [documento di conformità della specifica](https://deepworkplan.com/spec)),
poi conferma:

- [ ] La skill è installata e risolvibile, con tutte e otto le sub-skill disponibili.
- [ ] `AGENTS.md` esiste nella radice con un blocco Quick Commands reale; `CLAUDE.md` si risolve in esso.
- [ ] `docs/` contiene le categorie standard con contenuto reale e specifico del repo; i moduli principali hanno un
      `README.md`.
- [ ] `.agents/` esiste con `agents/`, `commands/` (sottili delegatori `dwp-*`), `skills/` e un catalogo
      che corrisponde alla realtà; `.claude → .agents` si risolve.
- [ ] `.dwp/` esiste, è escluso da git e ha `plans/` e `drafts/`; `tmp/` esiste ed è escluso da git.
- [ ] Il contenuto esistente dell’utente è stato preservato o riconciliato con il suo consenso — nulla è stato distrutto in silenzio.
- [ ] Puoi generare un Deep Work Plan ed eseguirlo attività per attività, validando ogni gate.

## Risultato

Quando l’onboarding è completo, il repository è cambiato in due modi duraturi — i pilastri della
metodologia:

1. **Il repository è spec-driven.** Il lavoro parte da un piano e una specifica scritti, non da
   prompt estemporanei.
2. **Il repository stesso è la harness dell’agente.** `AGENTS.md`, `docs/`, la documentazione per modulo e la
   home di skill `.agents/` forniscono a ogni agente il contesto e i comandi di cui ha bisogno per svolgere lavoro strutturato e
   verificabile.

Chiunque può eseguire questo prompt su qualsiasi repository — e ottenere un codebase che qualsiasi agente AI può pilotare.
