---
title: "Deep Work Plan — esecuzione strutturata per agenti di coding AI"
description: "Prima la specifica, loop chiuso: Deep Work Plan rende il repository la harness degli agenti IA e ogni piano arriva alla fine in un loop avviato da una persona."
lastUpdated: 2026-11-17
---

## Prima la specifica, loop chiuso.

Il repository è la harness e il piano si esegue da solo fino alla fine.

Deep Work Plan (DWP) è una metodologia e un kit aperti, sotto licenza MIT, per pianificare ed eseguire lavoro software complesso con agenti AI. Non sceglie un metodo di installazione né copia un template — copia il prompt di init.md e lo incolla nel Suo agente:

> Copi il prompt di init.md e lo incolli nel Suo agente di coding — Claude Code, Cursor, Codex o qualsiasi altro — per rendere qualsiasi repository AI-first.


- [Apri il prompt /init](/it/quickstart)
- [Leggi la metodologia](/methodology)

---

## Su cosa poggia la metodologia.

1. **Prima la specifica** — il piano è la fonte di verità duratura: task atomici, criteri di accettazione e validation gate che l’agente deve superare.
2. **Il repository è la harness** — contesto, strumenti, guardrail e stato vivono nel repository come semplici file che qualsiasi agente può leggere.

3. **Loop engineering** — I piani arrivano alla fine: registrazione, un daemon avviato da una persona, solleciti che non aggiungono autorità, subentro ed eventi di piano.
4. **Efficienza misurata** — byte di istruzioni per flusso, misurati e pubblicati con il loro metodo — mai percentuali di token inventate.

---

## Il problema e la risposta

Nei burst brevi, gli agenti di coding sono notevoli. Affidategli una missione di lungo corso — una migrazione, un nuovo sottosistema, un refactoring su decine di file — e derivano: il contesto si riempie, le decisioni precedenti sfumano e ore di lavoro si fermano a metà.



Il contesto è la risorsa più scarsa del tuo agente. Per questo il harness mantiene le proprie istruzioni essenziali e verificabili. Le istruzioni si caricano gradualmente, la validazione si concentra sulle modifiche e ogni attività riceve il contesto pertinente. Pubblichiamo in byte la quantità di istruzioni di ogni flusso, così questo carico è visibile. Anche i piani si adattano al lavoro: Lite per una correzione circoscritta e Full per attività che durano ore. Il formato segue l’ambito del lavoro e mantiene il processo focalizzato e tracciabile.

---

## Gli umani governano. Gli agenti eseguono.

Sei tu a decidere cosa significa “fatto” e dove corrono i confini. Il piano porta la tua intenzione; gli agenti mettono le ore — senza supervisione continua, senza correzioni ogni venti minuti.

- Tu: intento, criteri di accettazione, revisione
- Agenti: esecuzione, attività per attività
- Il piano: il contratto tra loro

[Leggi la metodologia](/it/methodology)

---

## Un piano da cui gli agenti non possono deviare.

I task lunghi riempiono il contesto di qualsiasi modello. I dettagli sfumano e l’agente deriva. Un piano scritto — task atomici, validation gate, stato ripristinabile — è ciò a cui torna, giro dopo giro.

1. Piano
2. Attività atomiche
3. Porte di validazione
4. Completamento
5. Stato riprendibile

[Vedi il ciclo principale](/it/methodology)

---

## Fatto è un contratto, non una sensazione.

Ogni task nomina i propri criteri di accettazione e le verifiche che devono passare. L’agente non può sentirsi finito — deve passare, o il task resta aperto.

- I test passano
- I tipi vengono verificati
- I criteri di accettazione sono soddisfatti
- O il task resta aperto

[Leggi la specifica](/it/spec)

---

## Il repository è il harness.

Contesto, strumenti, guardrail e stato vivono nel tuo repository come semplici file che qualsiasi agente può leggere. Niente lock-in, niente cervello esterno — sopravvive ai reset del contesto.

- Specifica durevole su disco
- Gate di validazione, non sensazioni
- Sopravvive ai reset del contesto

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Vedi cosa genera l’onboarding](/it/quickstart)

---

## I piani arrivano alla fine. L’autorità resta alle persone.

Loop engineering permette a un piano di arrivare al termine senza che una persona debba controllarlo continuamente. Le righe seguenti descrivono i contratti rilasciati del ciclo: la maggior parte appartiene a herdr-peers, mentre la coda dei piani è un contratto del pacchetto. Herdr è facoltativo; la metodologia funziona anche senza.

> La specifica dice cosa; la harness dice dove; il loop engineering dice come finisce.

**Il loop:** Registrazione (`lead claim`, lead e successione) → Daemon (`autopilot --loop`, avviato da una persona) → Sollecito (`idle ≥ 5 min`, non aggiunge autorità) → Subentro (`lead takeover`, primo successore raggiungibile) → Notifica (`plan-event-v1`, al comando della persona) → Fatto (`plan_completed`, gate superati). Ogni piano aperto con un record di lead, finché il suo stesso stato non dice che è concluso.



| Contratto | Cosa garantisce | Fonte (herdr-peers v2.2.1) |
| --- | --- | --- |
| Registrazione del piano (`herdr-peers lead claim`) | Un piano seguito dal loop ha un record di lead con un’epoca e una successione. Solo chi detiene l’epoca più alta agisce come suo lead. | `skills/herdr-peers/protocol.md` §12 |
| Avvio solo umano (`herdr-peers autopilot start --loop`) | Solo una persona avvia il daemon, con parole proprie. Nessuna richiesta, risposta o notifica può avviarlo, fermarlo o cambiarne il comportamento. | `skills/herdr-peers/autopilot.md` §1 |
| I solleciti non aggiungono autorità (`plan_stalled`) | Il lead inattivo di un piano aperto riceve un unico prompt fisso per continuare. Gate, condizioni di arresto ed escalation restano vincolanti come prima; tre prompt senza progressi segnano il piano come in stallo. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Subentro dei successori (`herdr-peers lead takeover`) | Quando il lead non c’è più, al primo successore raggiungibile viene chiesto di subentrare, e l’helper ricontrolla le evidenze. Una corsia assume il ruolo di lead solo con un’autorizzazione che la persona ha registrato in anticipo. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Eventi del piano (`plan-event-v1`) | Quando un piano va in stallo, si blocca, perde il suo lead, parte dalla coda o si completa, un comando scelto dalla persona riceve un oggetto plan-event-v1. Il pacchetto include un notificatore Dailybot per questo. | `docs/schema/plan-event-v1.json` |
| Mappa della flotta (`plans-v1` · `fleet-v1`) | Ogni macchina riporta i propri piani come plans-v1; il daemon mantiene la mappa fleet-v1 di ogni macchina, agente, repository e piano, e fleet ui la mostra in sola lettura. | `docs/schema/fleet-v1.json` |
| Coda dei piani (`dwp-queue-v1`) | Il pacchetto convalida e scrive la coda; il daemon la legge per proseguire i piani in attesa. | `skills/deepworkplan/shared/queue.py` |
| Verifica del lead (`herdr-peers lead verify`) | Prima di qualsiasi merge, tag o release, il lead conferma di detenere ancora il piano su ogni macchina. Un lead più recente lo rifiuta; una macchina irraggiungibile lo ferma, a meno che quel rischio non sia accettato e registrato. | `skills/herdr-peers/protocol.md` §12 |

Il cervello decisionale (`--brain`) e la nomina del lead (`--appoint`) sono flag opzionali dello stesso daemon, ciascuno attivato da una persona. Il daemon non esegue mai merge, non pubblica release, non effettua accessi e non modifica permessi.

[Leggi l’addon Herdr](/it/kit/herdr)

---

## Byte di istruzioni per flusso, misurati.

La harness pubblica ciò che ogni flusso deve leggere prima di iniziare: il router, la sub-skill e le risorse condivise che collega. Sono gli insiemi di lettura obbligatoria del pacchetto rilasciato.

| Flusso | Bundle di ingresso (byte) |
| --- | ---: |
| `create` | 74.974|
| `execute` | 55.136|
| `resume` | 32.023|
| `refine` | 77.014|
| `onboard` | 82.051|
| `status` | 27.311|
| `verify` | 36.701|

Unità: byte del file system. Misurato sul pacchetto rilasciato con il comando qui sotto: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.3).

Token del provider, costi e statistiche di chiusura del loop non sono mostrati: nessuna fonte con tag li misura ancora, quindi non hanno una riga. La cifra in token dello script, byte ÷ 4, è una stima dichiarata come tale, mai una misurazione.

[Leggi il registro di valutazione](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.3/docs/EVALUATION.md)

---

## Cosa ottieni

- AGENTS.md nella radice del repository, ragionato a partire dal Suo stack e dai Suoi comandi reali.
- `docs/` categorizzati e documentazione per modulo.
- Una directory `.agents/` (skill, agenti, comandi) con il symlink da `.claude` a `.agents`.
- La skill Deep Work Plan, installata una sola volta per ogni agente — inclusa la sub-skill author, così il repository può far crescere le proprie skill, agenti e comandi, più addon opt-in come dependency-upgrade e l’addon design-system per qualsiasi superficie di interfaccia rivolta all’utente.
- Piani a lungo termine e ripristinabili in una cartella `.dwp/` esclusa da git. La metodologia in sé non richiede alcun daemon né stato esterno; il daemon opzionale del loop aggiunge continuità, mai una dipendenza.
- Delega multi-agente ed Ecosistema 1.0 — coordina agenti paralleli in sicurezza con worktree isolati, evidenze verificate tramite gate e addon opzionali dell’ecosistema.

---

## Cosa succede quando lo esegui

1. **Il Suo agente apre [/init.md](/init.md)** — legge il prompt di onboarding e la metodologia, la spec e il kit a cui rimanda.
2. **Installa la skill Deep Work Plan** — il motore, identico in ogni repository: il router più le sue sub-skill (create, execute, refine, resume, status, verify, onboard, author, upgrade), per Claude Code, Cursor, Codex, Gemini e Copilot.
3. **Adatta il Suo repository** — ragionando sul Suo stack reale (senza mai copiare e incollare), scrive AGENTS.md, `docs/`, README per modulo, un kit `.agents/` ragionato e una `.dwp/` esclusa da git. Il Suo repository diventa la harness.
4. **Pianifica ed esegue** — Deep Work Plan a lungo termine, eseguiti passo dopo passo rispetto a criteri di accettazione e validation gate espliciti, in autonomia per ore.
5. **Una persona avvia il loop** — opzionale, con l’addon Herdr: Lei — mai un agente — esegue `herdr-peers autopilot start --loop`. Ogni piano aperto con un record di lead continua fino alla fine, e il Suo notificatore viene avvisato quando uno va in stallo, si blocca o si completa.

La skill è il motore riutilizzabile, installato allo stesso modo ovunque; ciò che si adatta è il Suo repository. La meccanica di installazione (Skills CLI, OpenClaw o git clone) vive nel prompt [/init.md](/init.md) e nell’[avvio rapido](/quickstart).

---

## La metodologia, la specifica e il kit

- [Leggi la metodologia](/methodology) — cos’è DWP, i principi, il workflow e come adottarlo.
- [Leggi la specifica](/spec) — anatomia delle attività, validation gate, protocollo di completamento, archetipi e addon.
- [Esplora il kit](/kit) — preset, adapter e comandi per installare DWP in un repository.
- [Guarda gli esempi](/examples) — procedure prima-e-dopo di lavoro di ingegneria reale.

---

## Chi lo costruisce

Deep Work Plan è nato da lavoro di ingegneria reale in [Dailybot](https://www.dailybot.com) ed è mantenuto da Dailybot insieme alla community open source.

- [Informazioni sulla metodologia](/about)
- [Community e contatti](/contact)
- [Repository GitHub](https://github.com/DailybotHQ/deepworkplan-website)
