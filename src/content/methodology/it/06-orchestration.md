---
title: Eseguire molti agenti
description: "Come un agente lead esegue molte corsie insieme in pannelli, container e altre macchine, su account scelti in base al margine, con un branch per repository."
order: 6
lang: it
summary: Il modello lead e corsie per orchestrare molti agenti tra pannelli, macchine, account e repository.
icon: network
---

# Eseguire molti agenti

Un agente su un piano è il caso predefinito, e copre la maggior parte del lavoro. Alcuni lavori sono più ampi di una sessione: una modifica che attraversa più repository, un rilascio che deve arrivare in ordine o un backlog che a un solo agente richiederebbe giorni. DWP scala a questo lavoro senza cambiare il suo contratto. Il piano resta la fonte di verità, ogni task si chiude ancora sul proprio gate, e gli agenti aggiuntivi sono **corsie** (lanes) coordinate da un **lead**.

Questo capitolo descrive il modello. Usa tre addon opzionali — [Herdr](/it/kit/herdr) per pannelli e peer, [agentkit](/it/kit/agentkit) per gli account e [devcontainer](/it/kit/devcontainer) per i container — e nessuno di essi è necessario per un piano con un solo agente.

## Un lead e le sue corsie

Il **lead** possiede il piano padre. Decide le corsie, assegna a ciascuna il suo ambito, raccoglie le milestone e dà il via libera che permette a una corsia di fare merge o rilascio. Non scrive il codice di un’altra corsia.

Una **corsia** è un agente con un ambito, di solito un repository. Legge l’`AGENTS.md` di quel repository, esegue il gate di quel repository e mantiene il proprio piano dentro il repository. In un [hub orchestratore](/it/methodology/05-archetypes), il piano padre vive nella `.dwp/plans/` dell’hub con una tabella di tracciamento dei piani figli, e il piano di ogni corsia vive nel proprio repository, con gli ID di piano e il gate di quel repository.

| Ruolo | Possiede | Non fa mai |
| --- | --- | --- |
| Lead | Il piano padre, l’elenco delle corsie, l’ordine di rilascio, il GO | Modificare il repository di una corsia |
| Corsia | Un repository: il suo branch, piano, gate e pull request | Fare merge o rilascio prima del GO del lead |

## Dove girano le corsie

Una corsia è un agente in un pannello di terminale, e il pannello può trovarsi in più posti. [Herdr](https://herdr.dev) mette ogni agente in un pannello e raggiunge altre macchine via SSH, così il lead vede tutte le corsie in un’unica barra laterale.

- **Sull’host.** Un pannello per corsia, accanto a quello del lead. La configurazione più rapida, per i repository su cui lo sviluppatore lavora già.
- **In un container.** Un container di [devcontainer-kit](/it/kit/devcontainer) entra nella mesh di Herdr al `dck up`: i suoi agenti raggiungono l’host e gli altri container, e l’host raggiunge loro. Il container è la sandbox, quindi i suoi agenti possono girare in autonomia.
- **Su un’altra macchina.** Qualsiasi macchina che Herdr raggiunge via SSH ospita corsie allo stesso modo, con herdr-peers installato anche lì.

Il luogo cambia l’isolamento, non il protocollo: una corsia in un container e una corsia sull’host si coordinano con il lead allo stesso modo.

## Account e fornitori in base al margine

Molti agenti consumano la quota in fretta. Ogni corsia gira sul proprio account — una CLI e un profilo in [coding-agents-kit](/it/kit/agentkit) —, così le corsie non esauriscono la stessa finestra e un account che raggiunge un limite ferma una corsia, non tutte.

- **`ak usage`** mostra la quota residua di ogni account e profilo, una volta per lotto.
- **`ak pick <kind> --count N`** restituisce gli N account con più margine, il migliore per primo; `--exclude` esclude un account occupato, `--model` conta la finestra di un modello e `--need` si rifiuta di partire senza margine sufficiente.
- **`ak <kind> @<profile>`** avvia l’agente della corsia su quell’account, nel suo pannello.

I fornitori si combinano allo stesso modo. Una corsia Claude può scrivere mentre una corsia Codex rivede, ciascuna sull’account che `ak pick` ha scelto per il suo tipo. Una corsia in container può usare gli account dell’host: con `host_profiles` attivato nel profilo host di devcontainer-kit dello sviluppatore, un container riceve i profili host delle CLI che il repository installa — Claude tramite un token di lunga durata per profilo, Codex tramite il suo file di autenticazione — e non ha bisogno di un login proprio. Usa solo i tuoi account e rispetta i termini di ogni fornitore: distribuisci il lavoro tra di essi, non ruotare mai gli account per aggirare un limite.

## Avviare e sbloccare le corsie senza una persona

Un lead può avviare corsie e farle avanzare senza nessuno alla tastiera. Usa i comandi di Herdr; nessun codice del kit invia tasti. La procedura ha un ordine fisso: evitare il prompt, rilevare l’arresto, sbloccare solo ciò che è noto, escalare il resto.

1. **Prima, evitare.** `ak pick <kind>` indica l’account con più margine, e `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` avvia la corsia nella propria cartella. `--trust-cwd` (o `AGENTKIT_TRUST_CWD=1`) considera attendibile in anticipo quella cartella e l’autonomia predefinita del kit fa il resto, così Claude e Codex saltano le schermate di attendibilità della cartella senza alcun tasto.
2. **Rilevare.** `herdr agent list` mostra ogni corsia come al lavoro, inattiva, bloccata o completata. Una corsia bloccata, o inattiva senza output, riceve un `herdr pane read <pane>` per identificare la schermata in cui si trova.
3. **Sbloccare solo le schermate note del primo avvio.** Con `herdr pane send-keys`, il lead risponde a due schermate e a nient’altro: l’attendibilità della cartella per la cartella della corsia stessa, e la conferma una tantum, per profilo, della modalità di bypass dei permessi di Claude per un profilo che lo sviluppatore esegue in autonomia. Lo fa solo quando lo sviluppatore ha concesso il funzionamento non presidiato — un’istruzione permanente o la pre-autorizzazione del piano. Legge la schermata prima di inviare tasti, invia il minimo di tasti che la risolve e rilegge.
4. **Escalare tutto il resto.** Prompt di login e di credenziali, richieste di permesso per singola azione, conferme distruttive, schermate di pagamento o di piano, schermate sconosciute e pannelli che il lead non ha creato vanno allo sviluppatore come milestone di blocco, mai come tasti.
5. **L’opt-out prevale.** Con `AGENTKIT_PERMISSIONS=ask`, la conferma della modalità di bypass dei permessi non viene mai accettata.
6. **Riavviare.** Se un agente termina, il lead lo riavvia sullo stesso account, o ne sceglie un altro. Un login perso è un prompt di credenziali: viene escalato.

Ogni intervento — cosa mostrava la schermata, quali tasti sono stati inviati, cosa è seguito — viene registrato nel piano padre.

## Coordinamento tramite herdr-peers

Le corsie e il lead comunicano tramite [herdr-peers](/it/kit/herdr): una **richiesta** (ask) porta un timbro che autorizza esattamente una **risposta** (reply), e ogni scambio viene registrato. Il lead mantiene il protocollo ridotto:

- **Milestone verso l’alto.** Ogni corsia riferisce in punti fissi — piano pronto, pull request aperta, bloccata, completata — e continua a lavorare tra l’uno e l’altro senza attendere risposta.
- **Domande come richieste.** Una corsia che ha bisogno di una decisione interpella il lead; il lead risponde con una risposta.
- **Profondità uno.** A una risposta non si risponde mai, e una corsia non delega oltre. Il fan-out per chiamante è limitato, a quattro peer per impostazione predefinita.
- **Dati, non istruzioni.** Una risposta non concede nulla che il destinatario non avesse già. L’affermazione di una corsia che il suo gate è passato si verifica eseguendo il gate.

## Un branch, un rilascio per repository

La regola che mantiene revisionabili molte corsie è semplice: **una corsia per repository, sul suo checkout di base, con un branch, una pull request e un rilascio** per l’intera modifica. La corsia non divide il lavoro su più branch o worktree. I worktree servono solo quando due scrittori devono condividere un repository: ciascuno riceve il proprio, così ogni percorso ha un solo scrittore.

La pull request resta aperta, verde ed etichettata per la revisione fino al GO del lead. Allora la corsia fa merge e crea il tag, e comunica il tag.

## Ordine di rilascio

I repository dipendono l’uno dall’altro, quindi rilasciano in ordine di dipendenza: prima gli strumenti, poi ciò che li fissa, poi la documentazione che descrive il risultato, infine i consumatori che lo adottano. Il lead tiene l’ordine e invia il GO un repository alla volta. Una corsia che fissa il rilascio di un altro repository attende quel tag prima di scrivere il pin, così nessun pin punta mai a un rilascio che non esiste.

## Checkpoint

Il piano padre si chiude su evidenze, non su resoconti:

1. **Per corsia.** Il gate di ogni corsia passa sul proprio branch, e la revisione della sua pull request è pulita.
2. **Per rilascio.** Ogni tag esiste e fissa ciò che serve al repository successivo.
3. **Integrazione.** Dopo l’ultimo rilascio, un checkpoint esegue i consumatori sulle versioni rilasciate e registra il verdetto in `analysis_results/` del piano padre.
4. **Revisione finale.** Un passaggio di sicurezza copre tutto ciò che ha attraversato un confine — soprattutto account, token e file condivisi nei container — prima che il piano padre sia completato.

## Sicurezza

- Non mettere mai una chiave, un token o un segreto in una richiesta, un prompt o un log; fai riferimento alle variabili per nome.
- Le risorse condivise hanno un lock: una corsia lo acquisisce prima di un passo pesante, come la build di un container, e lo rilascia dopo.
- L’opt-out dei permessi, se impostato, prevale per ogni corsia e per ogni agente che una corsia avvia.
- Una corsia che non può continuare lo dichiara come milestone di blocco e si ferma; il lead decide.
