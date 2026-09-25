---
title: "DWP v5: le promesse, ora garantite"
description: "Deep Work Plan v5 trasforma otto promesse di lunga data in contratti testati e versionati — un verificatore onesto, un'orchestrazione sicura e un percorso di aggiornamento collaudato."
date: 2026-09-12
version: "v5 · Garantito dai test"
kind: release
lang: it
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Commit di rilascio della skill ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Rilascio della skill v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Rilascio della skill v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
  - label: "Rilascio della skill v5.5.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1"
  - label: "Release della skill v5.5.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.2"
  - label: "Release della skill v5.5.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3"
  - label: "Release del revisore v3.1.1"
    url: "https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1"
---

Oggi rilasciamo Deep Work Plan v5. Non è una riscrittura: sono mesi di uso reale — incluso un audit diretto di 108 piani reali — che hanno fatto emergere, lacuna dopo lacuna, dove le promesse della metodologia e il comportamento reale di un agente potevano divergere. Il riassunto onesto di questo rilascio: la metodologia prometteva già tutto questo — ora lo garantisce. Prima di v5, un agente che seguiva la documentazione alla lettera poteva comunque finire in scenari di guasto reali; ciascuno di questi scenari, individuato grazie a quell'uso e a quel feedback, è oggi chiuso e fissato da un test eseguibile, non rattoppato con altra prosa. La suite di contratti dello skill è cresciuta da 132 a 258 test in questo ciclo, e ogni garanzia qui sotto è stata validata dal vivo contro il tag rilasciato — installata in un repository pulito e condotta attraverso i propri flussi prima di scrivere questa voce.

**Un verificatore che non rivendica mai un successo non verificato.** I controlli di conformità un tempo degradavano in silenzio: senza un interprete capace saltavano ogni verifica e stampavano comunque un verdetto conforme, e il testo in grassetto dentro un campo poteva essere scambiato per un campo assente. Ora il verificatore termina con un verdetto `UNVERIFIED` esplicito ogni volta che non può verificare davvero. Un verificatore non riporta mai un successo che non ha controllato — la fiducia nei gate è l'intera proposta, e un gate che può saltare il proprio controllo spezza la catena.

**Un solo contratto di approvazione per i piani Lite.** Tre superfici rispondevano in tre modi diversi alla domanda «avviare questo piano approva il suo ambito attuale?», e un agente poteva bloccarsi o eseguire senza autorizzazione proprio al confine più pericoloso. v5 stabilisce un unico contratto ovunque: un execute o un resume esplicito approva l'ambito ready attuale e registra quell'approvazione prima di qualsiasi lavoro; una proposta in sospeso, da sola, non autorizza nulla; una promozione interrotta viene recuperata prima che qualsiasi lavoro di prodotto venga eseguito.

**Orchestrazione multi-repository che non corrompe.** L'override di ambiente di un hub orchestratore un tempo filtrava nei repository figli — un figlio poteva scrivere lo stato dei piani nelle cartelle dell'hub stesso. I template dell'orchestratore stampavano `FAIL` uscendo con successo, e un controllo di completezza che faceva grep di una stringa di stato poteva leggere un'attività completata come un piano completato. Ora la radice dell'hub viene salvata prima di navigare nei sotto-repository, ogni figlio risolve il proprio `.dwp/` in isolamento, ogni ramo di errore termina con un errore, la completezza viene letta dallo stato di livello superiore del piano e l'entrypoint del devcontainer propaga gli errori di copia prima di cancellare alcunché.

**Un'unica matrice di consenso per gli addon.** Quale addon si installa di default, quale viene solo offerto e quale revisione è obbligatoria — le superfici di prima rispondevano in modo diverso. v5 dichiara una matrice: l'AI Diff Reviewer è obbligatorio per la revisione locale, fissato a un rilascio verificato, con la revisione in CI come opt-in esplicito che non si installa mai da sé; l'addon design-system è un'offerta obbligatoria quando viene rilevato lavoro di UI, ma si installa solo con accettazione esplicita; l'addon dependency-upgrade arriva come delegatore inerte quasi predefinito con rollback per snapshot esatto; dailybot riferisce solo dove autorizzato. Un diff vuoto non conta più come revisione completata.

**Una vera macchina per i piani lunghi.** Un audit di 108 piani reali ha mostrato che il lavoro parallelizzabile era comune ma la decisione sequenziale quasi mai dichiarata, e gli stage gate esistevano solo come pratica estemporanea. v5 rende la decisione di esecuzione sempre dichiarata — sequenziale con un motivo registrato quando il parallelismo non è appropriato — aggiunge Stage Gates opzionali per i piani di venti o più attività ed arricchisce le Plan Variables con livello di rigore, soglia di evidenza e azioni vietate. Tutto questo si carica progressivamente e non pesa mai su un piano Lite.

**Contesto applicato, un obiettivo per attività.** I piani potevano degenerare in liste di attività senza contesto, e un'attività poteva impacchettare tre obiettivi dietro un unico gate verde. v5 richiede la coppia Goal e Context a livello di piano, un Context per attività — ciò che una nuova sessione serve per avviare quell'attività da sola — in ogni nuovo record (i record completati restano esattamente come scritti), e rende un obiettivo per attività la regola normativa con una guardia contro il decadimento.

**Un percorso di aggiornamento sicuro.** `/dwp-upgrade` è nuovo. La sua fase di controllo è di sola lettura e non installa nulla; un aggiornamento parte solo da un'accettazione esplicita, con le adattazioni locali differenziate ed esposte prima di sovrascrivere alcunché; l'installazione punta a un tag esatto e verifica se stessa; l'onboarding riesegue come init pulito. Un aggiornamento non tocca mai `.dwp/` — nessun piano, file di stato, record di gate o evidenza viene migrato, riscritto o invalidato.

**Evidenza onesta e misurabile.** Le affermazioni di efficienza oggi vengono rimisurate su tre baseline — v3.0.0, v4.0.3 e l'albero finale — con lo script di misura committato nel repository. I risultati sono riportati in byte del filesystem e mai convertiti in numeri di token o costi che non possiamo sostenere, e ogni affermazione non verificabile è messa in quarantena come tale nel registro di valutazione.

**Un contratto versionato, pubblicato.** Ogni promessa sopra è sostenuta da dati che altri strumenti possono leggere, non solo da prosa: i formati plan-manifest e plan-state sono ora versionati come la linea di schema v5 — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) e [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — così un piano, un verificatore o uno strumento di terze parti può controllare la conformità rispetto a un contratto pubblicato e leggibile da una macchina, invece che rispetto a un paragrafo di documentazione. Nulla nella linea v5 cambia forma rispetto a v2: i piani esistenti che fanno riferimento agli schemi v1 o v2 restano validi e non vengono mai riscritti.

Deep Work Plan v5 segue lo standard DWP 5.0.0. Leggi la [specifica normativa](https://deepworkplan.com/spec), consulta il [repository dello skill](https://github.com/DailybotHQ/deepworkplan-skill) o inizia l'adozione da [`/init`](https://deepworkplan.com/init).

## Aggiornamento — 2026-09-17 · skill v5.4.0

Il primo rilascio puntuale della linea v5 chiude l'ultima strada per cui un piano poteva concludersi su lavoro mai davvero verificato, e stabilisce dove risiedono le prove del piano stesso. Lo standard DWP 5.0.0 non cambia: questo è un rilascio di contratto dell'addon e di documentazione, non di schema.

**Una revisione che non è mai stata eseguita non è più indistinguibile da una pulita.** Il passaggio di sicurezza del Final Review distingueva già un revisore assente — registrato come rilievo — da un'invocazione fallita, che avvisa una volta e prosegue. Il revisore a monte ha aggiunto un terzo esito: un'esecuzione che parte e termina senza scrivere alcun rilievo. Senza un nome proprio si confondeva con «il passaggio è stato completato e non ha trovato nulla», il che permetterebbe di chiudere un piano su una revisione mai avvenuta. Ora è uno stato a sé: registrato come revisione incompleta, mai conteggiato come prova che l'insieme di modifiche sia pulito, e mai un motivo per chiudere il Final Review. Tre esiti distinti — e nessuno significa che il diff sia stato letto e trovato pulito.

**Le prove di un piano appartengono al piano.** Lo standard collocava già il verbale di analisi, il registro delle skills, la revisione di sicurezza e i log dei gate nel `analysis_results/` del piano, ma non aveva mai enunciato quell'esclusività come regola. Uno strumento di audit proprio del repository, con il percorso del report impostato per default sulla directory di lavoro, poteva così scrivere le prove di un piano nella radice del repository senza che alcun flusso se ne accorgesse. La specifica ora lo impone: tutto ciò che un flusso produce a proposito di un piano finisce nella cartella di quel piano, e a uno strumento il cui output predefinito è la directory di lavoro va passata la sua opzione di output esplicita. Una prova che non sta dove il piano dice è una prova persa — questa è la ragione pratica della regola, non una preferenza di archiviazione.

**Il pin di AI Diff Reviewer sale a v2.3.0.** La revisione locale richiesta installa ora un revisore che separa il runner dal backend: la stessa revisione può quindi girare contro qualunque endpoint compatibile senza cambiare ciò da cui DWP dipende — la garanzia di neutralità ne esce rafforzata, non allentata. Si aggiungono installer verificati tramite checksum, costi predefiniti misurati anziché supposti, e giri di follow-up che rivedono il diff realmente nuovo portandosi dietro i rilievi aperti. Quest'ultimo punto ha una conseguenza contrattuale che conviene dire chiaramente: che un modello dichiari risolto un rilievo non lo ritira — lo ritira chi mantiene il repository.

**I principi di lavoro viaggiano ora con l'harness.** La `v5.5.0`, lo stesso giorno, fa sì che l'onboarding insegni agli agenti di un repository *come* lavorare, non solo che cosa il repository contiene: dieci comportamenti compatti — farsi carico del risultato, informarsi prima di chiedere, decidere in autonomia le questioni ordinarie, scalare quando mancano davvero elementi di giudizio o autorizzazione, e verificare prima di dichiarare concluso, tra gli altri — scritti inline nel `AGENTS.md`, dove li troverà un agente che legge solo il punto d'ingresso. Sono impostazioni predefinite all'interno di una richiesta, mai una nuova autorità: non possono prevalere sui permessi dell'host, su un perimetro più stretto, sui gate di un piano o sulle regole di approvazione del repository. Un aggiornamento li riconcilia per significato anziché per parola chiave, così le regole equivalenti già presenti vengono conservate invece che riscritte.

**Il pin di AI Diff Reviewer sale a v2.3.1.** Lo skill `v5.5.1` installa il revisore il cui check, corpo della revisione e commento di tracciamento coincidono. Un corpo che dice `Recommendation: approve` non è prova che il check sia passato — leggi il blocco Check status del marcatore di tracciamento. In modalità advisory, una correzione corroborata può ritirare un rilievo il cui thread è già collassato, così una PR bloccata può diventare verde dopo una correzione reale.


Leggi la [specifica](https://deepworkplan.com/spec) per il testo normativo, il [riferimento dell'addon](https://deepworkplan.com/kit/ai-diff-reviewer) per ciò che il revisore fa ora, o il [rilascio v5.5.1](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1) per la fonte.

## Aggiornamento — 2026-09-25 · skill v5.5.3 + revisore v3.1.1

L'addon AI Diff Reviewer ora documenta e installa la linea **v3** del revisore, pubblicata il 2026-09-24 (v3.0.0 → v3.1.1, pin mobile `@v3`). La skill `v5.5.2` ha riscritto i documenti normativi dell'addon, l'hook di onboarding e il template di integrazione attorno a ciò che il revisore v3 fa davvero, e la `v5.5.3` ha consegnato il lato CI. I cambiamenti più strutturali, verificati contro il revisore pubblicato al tag `v3.1.1`:

**Un `critical` filtra solo quando verificato.** Dalla v3, ogni riscontro critico che un modello afferma — più un campione del 30 % degli avvisi — riceve una seconda verifica breve ancorata al codice da una chiamata di modello separata (≈ 3 k token, 10 s e $0.009 per riscontro verificato). Un `critical` viene pubblicato — e blocca il Final Review — solo quando quel verificatore lo conferma; le affermazioni confutate restano visibili come avvisi annotati e sono elencate nell'output strutturato, mai inline. Una revisione che esaurisce il tetto di turni (`incomplete`) o il proprio orologio (`timeout`) è rossa sotto severità bloccante: «nessun riscontro» ora significa sempre che il revisore ha guardato e non ha trovato nulla.

**Il budget segue il livello di rischio.** Il budget della revisione deriva dal livello di rischio deterministico della modifica — 8/20/30/40 turni da `low` a `critical` — e un push che non cambia codice esegue un giro di solo verificatore con −93 % di costo. `budget-profile: fixed` ripristina le costanti pre-v3 durante la transizione; i turni incrementali tagliano i token di input del 62–76 %.

**Sei sub-skill, una delle quali è un ciclo.** Il router guadagna `address-review` (nuova nella v3.1.1): una sola invocazione trova i PR aperti del branch, verifica che la revisione copra l'head corrente, presenta i riscontri e — a un solo sì — applica, esegue commit in piccoli batch Conventional Commits, fa push e riarma il revisore nel modo in cui il repository lo attiva. `apply-review` resta in sola lettura; l'output strutturato (`review-output/3.0`) è la via per macchine di qualsiasi automazione. La linea `@v2` resta congelata su `release/v2` con sei mesi di manutenzione di sicurezza e catalogo — la v3 è la raccomandazione, mai una migrazione forzata.

**Il revisore ora revisiona le proprie case.** Sia il repository della skill che questo sito eseguono una revisione CI attivata da etichetta — un singolo ramo grok via `DailybotHQ/ai-diff-reviewer@v3`, attivato una volta per applicazione dell'etichetta `ready` (rimuovi e riaggiungi l'etichetta per ripetere), con skip onesto quando il secret del fornitore è assente. Questo sito vendorizza anche il revisore v3.1.1, così il Final Review locale e la documentazione insegnano ora lo stesso contratto.

Leggi la [specifica](https://deepworkplan.com/spec), il [riferimento dell'addon](https://deepworkplan.com/kit/ai-diff-reviewer) per l'elenco completo delle capacità v3, la [release v5.5.3](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3) per la fonte, o la [release v3.1.1 del revisore](https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1) per ciò che è cambiato upstream.
