---
title: "Domande frequenti — Deep Work Plan"
description: "Risposte alle domande più frequenti su Deep Work Plan: cosa fa, come funzionano i gate e la ripresa, il confronto con gli altri strumenti e come adottarlo."
lastUpdated: 2026-09-11
---

## Domande frequenti

Risposte brevi alle domande più comuni su Deep Work Plan, ciascuna con un link alla pagina che approfondisce.

## Che cos’è Deep Work Plan

### Cosa fa esattamente Deep Work Plan?

Deep Work Plan trasforma un repository in un ambiente strutturato in cui un agente di coding può eseguire con affidabilità lavoro di lunga durata. Si installa come skill per agenti, fa l’onboarding del repository una sola volta (un indice `AGENTS.md`, un albero `docs/`, un kit `.agents/` di skill e comandi, un’area di output `.dwp/` esclusa da git) e da quel momento qualsiasi obiettivo diventa un piano: task atomici, ciascuno con criteri di accettazione e un validation gate, eseguiti uno alla volta, sottoposti a commit man mano che passano e ripristinabili da disco da qualsiasi agente. Il piano si chiude con un Final Review che verifica la sicurezza e valida lo stato finale. La metodologia è con licenza MIT e funziona con qualsiasi agente di coding che legge un repository.

[Leggi la metodologia](https://deepworkplan.com/it/methodology)

### A chi è destinato?

Sviluppatori e team che affidano lavoro reale e multi-step ad agenti di coding e vogliono che venga portato a termine. È adatto quando un’attività copre più di una sessione, più di una famiglia di file o più di un agente; quando un collega deve poter riprendere da dove un agente si è fermato; o quando “fatto” deve significare “validato”, non “lo dice l’agente”. Una correzione di una riga non ha bisogno di un piano, e la metodologia lo dice chiaramente: la sua regola di rigore proporzionale raccomanda al suo posto un obiettivo inline, con criteri e gate.

[Avvio rapido](https://deepworkplan.com/it/quickstart)

### Qual è la differenza tra un piano Lite e uno Full?

Una scelta di rappresentazione, non un compromesso sul rigore. Ogni piano inizia come una cartella Lite: un README compatto con record di task ancorati che è già eseguibile, non una bozza parziale. `create` si espande in file di task Full solo quando il dettaglio delle istruzioni, le dipendenze o i contratti di un task non rientrano in un record compatto e revisionabile; una richiesta esplicita per l’uno o l’altro formato viene rispettata, e un piano Lite può essere promosso a Full in un secondo momento senza perdere il lavoro già completato. Entrambi i formati portano gli stessi criteri di accettazione, validation gate, evidenze e il Final Review obbligatorio.

[Leggi la metodologia](https://deepworkplan.com/it/methodology)

### È uno strumento, un framework o una metodologia?

Una metodologia distribuita come skill installabile. Non c’è server, né account, né formato proprietario, né runtime al di fuori dell’agente di coding che già utilizza. Ciò che viene installato sono istruzioni che l’agente legge, un piccolo insieme di script shell per il rilevamento del contesto e la verifica di conformità, e le convenzioni che il Suo repository adotta. Tutto ciò che il piano produce è Markdown e JSON nel Suo repository, leggibile senza alcuno strumento.

[Leggi la specifica](https://deepworkplan.com/it/spec)

### Con quali agenti di coding funziona?

Qualsiasi agente che legge i file del repository. La skill segue lo standard aperto Agent Skills e la convenzione `AGENTS.md`, quindi Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot e altri la acquisiscono attraverso il normale caricamento di skill e istruzioni. La valutazione interna della metodologia mostra un piano avviato dall’agente di un fornitore e ripreso da quello di un altro in entrambe le direzioni. La copertura di installazione e le evidenze comportamentali sono elencate per agente nella matrice di compatibilità, e le due non vengono mai confuse.

[Esplora il kit](https://deepworkplan.com/it/kit)

### Come si usa?

Tre passaggi. Per prima cosa, installa la skill Deep Work Plan nel tuo agente di coding — la via più rapida è `npx skills add DailybotHQ/deepworkplan-skill` (oppure clona il repository della skill ed esegui `./setup.sh`). In secondo luogo, fai l’onboarding del repository una volta, così l’agente adatta `AGENTS.md`, `docs/`, il kit `.agents/` e un’area `.dwp/` ignorata da git al tuo stack: punta a https://deepworkplan.com/init.md, oppure esegui `/deepworkplan-onboard`. In terzo luogo, pianifica ed esegui il lavoro con i comandi leggeri: `/dwp-create <goal>` costruisce un piano; `/dwp-execute` lo esegue task per task contro ogni gate; `/dwp-refine` modifica un piano in corso (ambito, task, o la promozione di un piano Lite a Full); `/dwp-resume` continua dopo un’interruzione; `/dwp-status` riporta l’avanzamento senza eseguire; `/dwp-verify` produce un rapporto oggettivo di conformità. Gli agenti che intercettano `/` usano spesso `#` invece (per esempio `#dwp-execute`). Il punto di adozione e l’avvio rapido percorrono lo stesso cammino con più dettaglio.

[Avvio rapido](https://deepworkplan.com/it/quickstart)

### Cosa viene installato esattamente, e dove?

La skill dell’agente viene installata ovunque il Suo agente carichi le skill di progetto o utente. L’onboarding adatta poi il repository stesso: crea o riconcilia `AGENTS.md`, `docs/`, `.agents/` e l’area di lavoro `.dwp/` esclusa da git. La skill insegna il metodo all’agente; il repository conserva il contesto, il kit e le evidenze del piano di cui gli altri agenti hanno bisogno per proseguire.

[Vedi il flusso di adozione](https://deepworkplan.com/it/init)

### Deep Work Plan richiede Git?

Git è consigliato per i repository perché la sua cronologia fa parte della superficie di recupero e revisione, ma la metodologia può funzionare anche in uno spazio di lavoro dell’agente senza un repository Git. In tal caso è richiesto lo strato di stato leggibile dalle macchine, inclusi i checkpoint di `state.json` e i record dei gate, così il recupero non dipende da una trascrizione della chat.

[Legga gli archetipi di repository](https://deepworkplan.com/it/spec/archetypes)

### Qual è la differenza tra una skill, un piano e una specifica di prodotto?

Una skill descrive come un agente esegue una procedura ripetibile. Un piano DWP descrive una modifica concreta attraverso ambito, criteri di accettazione, validation gate ed evidenze. Una specifica di prodotto descrive il comportamento attuale del prodotto ed evolve tramite delta dopo l’implementazione; anche le skill e i piani sono specifiche, ma descrivono procedure e modifiche anziché mantenere quel contratto di prodotto canonico.

[Leggi la specifica](https://deepworkplan.com/it/spec/dwp-specification)

## Come viene eseguito un piano

### Come sono implementati i validation gate? Richiedono un’approvazione umana?

Sono asserzioni eseguibili che l’agente esegue da sé. L’approvazione umana delimita l’esecuzione all’inizio e alla fine: una persona approva il piano prima dell’esecuzione e rivede il diff finale in fase di pull request; l’esecuzione nel mezzo è autonoma. Ogni task indica comandi concreti, in genere il quality gate del repository stesso, selezionati dalla superficie toccata dal task: i test del comportamento modificato e dei suoi consumer, ampliati alla suite completa quando la modifica è condivisa o non delimitabile. Un task viene marcato come fatto solo quando quei comandi terminano con successo, e i task che modificano il comportamento devono estendere i test. In caso di fallimento il task viene marcato come bloccato e l’agente si ferma.

[Il core loop](https://deepworkplan.com/it/methodology/02-core-loop)

### Come evita il piano di diventare obsoleto quando il codice viene modificato tra un’esecuzione e l’altra?

Su tre fronti. I task sono scritti come comportamento, non come modifiche: un criterio di accettazione dice cosa il sistema deve fare, quindi un file rinominato o un’implementazione sostituita non lo invalida. Ogni gate viene rieseguito sul repository così com’è in quel momento, quindi un’assunzione non più valida fallisce rumorosamente all’esecuzione successiva invece di derivare in silenzio, e quel fallimento è l’indicazione per rifinire. E mantenere la documentazione sincronizzata è parte del lavoro: un task che modifica il comportamento aggiorna anche i documenti e il kit agent-facing che lo descrivono, dentro il proprio gate. Ogni esecuzione dovrebbe lasciare il repository più pronto per gli agenti di come lo ha trovato.

[Leggi la metodologia](https://deepworkplan.com/it/methodology)

### Posso modificare il piano durante l’esecuzione senza perdere il lavoro completato?

Sì; rifinire un piano eseguito parzialmente è un’operazione di prima classe. Le definizioni dei task e lo stato di esecuzione sono tenute separate: il piano è una checklist su disco più un piccolo file di stato, quindi ciò che è fatto resta registrato in modo indipendente dal testo dei task. Quando un task si rivela sbagliato, l’agente lo marca come bloccato e si ferma invece di insistere. Lei può allora modificare, riordinare, dividere o eliminare i task non ancora eseguiti, mentre i task completati restano completati. La ripresa ricostruisce lo stato dal disco e dal repository reale e riesegue i gate che contano, così nulla di ciò che è cambiato sotto passa inosservato.

[Il core loop](https://deepworkplan.com/it/methodology/02-core-loop)

### Il lavoro viene controllato continuamente rispetto al piano, oppure il piano è solo qualcosa di definito all’inizio?

Il piano è un controllo continuo. L’agente lavora un piccolo task alla volta e deve validare prima di proseguire, quindi può deviare di un passo, non di tre. Ogni task porta criteri di accettazione più i comandi esatti che li provano, e i progressi vengono scritti nel repository man mano, con uno stato per task, così la deriva diventa visibile a Lei, alla prossima sessione e al prossimo agente. Un piano non è finito finché tutto non valida, Final Review compreso. L’avvertenza onesta: la metodologia non può impedire a un agente di scrivere in partenza un criterio di accettazione debole; rende la deriva rumorosa invece che silenziosa.

[Il core loop](https://deepworkplan.com/it/methodology/02-core-loop)

### Il piano viene generato una volta e mantenuto a mano, o evolve con il codice?

Né l’uno né l’altro. Viene generato una volta a partire da un obiettivo e poi mantenuto come parte del lavoro. Il piano non viene deliberatamente riscritto a partire dai diff del codice, perché una specifica che insegue il codice diventa uno specchio in ritardo, che è proprio la deriva che la metodologia esiste per eliminare. Evolve di proposito: i gate vengono rieseguiti sul repository attuale, un gate che fallisce innesca una rifinitura e l’agente esegue quella rifinitura durante l’esecuzione, mentre Lei approva in anticipo e rivede alla fine. Documentazione e test evolvono insieme al codice per costruzione, perché aggiornarli è dentro il gate di ogni task.

[Leggi la metodologia](https://deepworkplan.com/it/methodology)

### Cosa succede se la sessione si interrompe a metà?

I progressi vivono su disco, non nella chat. Le checkbox del README, il log di ogni task, un indice di lavoro delimitato e un file di stato leggibile dalle macchine vengono aggiornati a ogni confine di task, e il file di stato registra un checkpoint prima di ogni pausa pianificata. Una sessione nuova, o un agente diverso, legge quell’indice compatto, lo riconcilia con il repository e la cronologia di git e prosegue dal primo task incompleto senza rifare il lavoro concluso. Anche una creazione del piano interrotta è recuperabile: l’identità del piano e l’elenco dei task previsti vengono scritti prima di qualsiasi file di task, quindi un piano creato a metà può essere completato o scartato anziché dover essere intuito.

[Il core loop](https://deepworkplan.com/it/methodology/02-core-loop)

### Che cos’è il Final Review?

L’unico task di chiusura obbligatorio di ogni piano. In ordine: un passaggio di sicurezza sull’intero insieme di modifiche accumulato dal piano, inclusa una revisione locale obbligatoria del diff da parte della skill AI Diff Reviewer, con i rilievi critical che bloccano il completamento finché non vengono corretti o accettati esplicitamente; la validazione dello stato finale, ossia le suite complete applicabili di test, lint, type-check e format del repository sul codice finale; e la riconciliazione delle decisioni sulle skill registrate da ogni task. L’agente riporta poi deliverable, evidenze e limitazioni, e offre un Executive Report una sola volta, generandolo solo su richiesta.

[La specifica](https://deepworkplan.com/it/spec/dwp-specification)

### Cosa succede quando un validation gate fallisce?

Il task viene registrato come bloccato e l’agente si ferma prima di dichiarare il completamento. Lei può ispezionare le evidenze, riparare il codice o rifinire il task, quindi riprendere; un comando fallito è un segnale per risolvere la discrepanza, non un permesso per indebolire il gate.

[Legga il protocollo dell’agente](https://deepworkplan.com/it/spec/agent-protocol)

### Un piano può essere eseguito senza supervisione, di notte o in CI?

Sì, quando il piano è stato approvato in anticipo, porta lo strato di stato richiesto e conferisce all’agente un’autorità delimitata. Un’esecuzione senza supervisione deve fermarsi e registrare un blocco quando la realtà diverge, un gate fallisce al di fuori del suo ambito di riparazione pianificato, oppure serve una nuova approvazione o una credenziale.

[Legga il protocollo per le esecuzioni senza supervisione](https://deepworkplan.com/it/spec/agent-protocol)

## Come si confronta

### In cosa differisce dagli strumenti spec-driven come Spec Kit, OpenSpec o Kiro?

Risolvono problemi adiacenti. Gli strumenti spec-driven sono eccellenti nel catturare cosa dovrebbe cambiare: specifiche, requisiti e proposte di modifica in una forma ripetibile. Deep Work Plan riguarda come un agente esegue per ore senza derivare: la harness installata dall’onboarding, i validation gate per task selezionati dalla superficie toccata, lo stato ripristinabile su disco, un Final Review obbligatorio con passaggio di sicurezza e un verificatore di conformità per il repository stesso. I due si possono combinare, con una specifica o una proposta di modifica che alimenta un piano. La pagina di confronto mette le capacità fianco a fianco, nei termini di ciascuno strumento.

[Vedi il confronto](https://deepworkplan.com/it/compare)

### In cosa differisce da strumenti di workflow per agenti come BMAD, Superpowers, Get Shit Done o Gentle-AI?

Quei framework portano stili di lavoro solidi: ruoli, principi, passi test-first, abitudini di verifica. Deep Work Plan differisce da entrambi e si concentra su ciò che resta nel repository e su ciò che si può controllare: una harness che qualsiasi agente può leggere da zero, file di task con criteri di accettazione e gate, stato che sopravvive a una sessione, un verificatore di conformità con un codice di uscita adatto alla CI e una misurazione pubblicata di quanti byte di istruzioni carica ogni flusso. È indipendente dallo strumento per costruzione e non aggiunge servizi, provider o segreti al core loop. La pagina di confronto mostra dove ogni approccio è integrato, opzionale o fuori ambito. Gentle-AI configura gli agenti di codifica che già usa: memoria persistente tra le sessioni (Engram), skill curate, personas, server MCP, Spec-Driven Development opzionale e revisione basata su evidenze opzionale (Receipt-Driven Development). Scrive nelle directory di configurazione di ciascun agente e può conservare gli artefatti di pianificazione in Engram, in file OpenSpec o in entrambi. Deep Work Plan si installa nel repository stesso — una harness che qualsiasi agente legge da zero, file di task con criteri di accettazione e gate, stato ripristinabile su disco, un verificatore di conformità con un codice di uscita adatto alla CI e un registro pubblicato di byte di istruzioni — senza aggiungere servizi, provider o segreti al core loop. I livelli possono convivere: Gentle-AI equipaggia l’agente; Deep Work Plan rende il lavoro di lunga durata durevole e verificabile nel repository.

[Vedi il confronto](https://deepworkplan.com/it/compare)

### Perché non usare semplicemente la modalità plan integrata nel mio agente?

Le modalità plan integrate sono utili e Deep Work Plan si basa sullo stesso substrato, la convenzione `AGENTS.md` e lo standard aperto Agent Skills. La differenza è dove vive il piano e cosa lo fa rispettare. I piani nativi in genere vivono fuori dal repository e scadono con la sessione; Deep Work Plan scrive il piano, il suo stato e le sue evidenze nel repository, quindi un altro agente o un collega può proseguirlo, e ogni task porta un gate eseguibile e un log registrato. Lei continua a usare la modalità plan del Suo agente per riflettere; la metodologia aggiunge il ciclo di esecuzione duraturo e verificabile.

[Vedi il confronto](https://deepworkplan.com/it/compare)

## Adottarlo

### Cosa scrive l’onboarding nel mio repository e tocca i file esistenti?

L’onboarding è non distruttivo: rileva un `AGENTS.md`, un `docs/`, un `.agents/` o un `CLAUDE.md` esistente, riconcilia anziché sovrascrivere e chiede prima di sostituire qualsiasi cosa. Scrive l’indice `AGENTS.md` con i comandi reali, un albero `docs/` ragionato, documentazione per modulo, il kit `.agents/` con i sottili comandi `dwp-*`, un’area di output `.dwp/` esclusa da git, una mappa dei test verificata e la revisione locale del codice obbligatoria (la skill AI Diff Reviewer più un’estensione di revisione adattata al repository). Esegue poi un self-check e il verificatore di conformità, così può vedere cosa è stato prodotto. Un repository sottoposto a onboarding con una versione precedente riceve un aggiornamento mirato che cambia solo ciò che manca.

[L’endpoint di adozione](https://deepworkplan.com/it/init)

### Posso usare la metodologia core senza installare gli add-on?

Sì. Gli add-on sono livelli opzionali e un repository senza nessuno di essi è pienamente conforme a DWP. I devcontainer, la rendicontazione Dailybot, gli aggiornamenti delle dipendenze, il supporto al design system e la revisione CI opzionale vengono offerti solo quando si adattano al Suo repository e Lei li accetta esplicitamente.

[Esplora gli add-on](https://deepworkplan.com/it/spec/addons)

### Cosa succede se il mio repository non ha ancora test o linting?

DWP non tratta l’assenza di una toolchain come un lasciapassare. Durante l’onboarding l’agente propone una configurazione di validazione adeguata allo stack, registra i comandi nella documentazione del repository e usa quei comandi come obiettivo per i gate futuri; la proposta resta visibile perché Lei la riveda.

[Legga il protocollo dell’agente](https://deepworkplan.com/it/spec/agent-protocol)

### Quanto costa e come si misura l’efficienza?

La metodologia e la skill sono con licenza MIT e gratuite; nei flussi principali non c’è servizio, né chiave API, né telemetria. L’efficienza è riportata come numero di byte di istruzioni caricati da ogni flusso, misurata da uno script sottoposto a commit insieme alla skill e pubblicata in un registro di valutazione, con gli aumenti riportati con la stessa evidenza delle diminuzioni. Non è riportata come percentuali di token o risparmi, perché un inventario di byte non li stabilisce; è prevista una valutazione pubblica pre-registrata per misurare gli esiti in modo corretto.

[Fiducia e trasparenza](https://deepworkplan.com/it/trust)

## Ha ancora una domanda?

Apra una discussione o una issue su GitHub. Le domande che ricorrono vengono aggiunte a questa pagina.

[Chiedi su GitHub](https://github.com/DailybotHQ/deepworkplan-website/issues)
