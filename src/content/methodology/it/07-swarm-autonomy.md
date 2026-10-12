---
title: Autonomia dello sciame
description: "Come uno sciame di agenti sopravvive al limite di un account o alla perdita di un agente: capacità, pacchetti di consegna, successione, escalation critica."
order: 7
lang: it
summary: Corsie consapevoli della propria capacità, passaggio di consegne proattivo, successione del lead per epoche e la tassonomia di escalation che mantiene attivo uno sciame.
icon: shield
---

# Autonomia dello sciame

[Eseguire molti agenti](/it/methodology/06-orchestration) descrive un lead e le sue corsie. Questo capitolo tratta ciò che mantiene attivo quell’assetto quando un account raggiunge il proprio limite o un agente scompare. Una corsia controlla quanto margine resta al suo account e passa il lavoro prima di esaurirlo. Un lead cede la guida, oppure viene sostituito quando scompare. Lo sciame chiede allo sviluppatore solo ciò che è davvero critico.

Il guasto a cui risponde è concreto: un lead che esaurisce la quota a metà di un piano lascia ferme tutte le corsie, e nulla si muove finché una persona non apre una nuova sessione. Con le regole seguenti, il piano continua ad avanzare entro l’autorizzazione che lo sviluppatore ha già concesso.

Sei regole danno forma a tutto ciò che segue:

1. **Un compito per prodotto.** [coding-agents-kit](/it/kit/agentkit) (`ak`) conosce gli account e la capacità, [herdr-peers](/it/kit/herdr) conosce i messaggi, i pannelli e chi guida, e il pacchetto Deep Work Plan conosce il metodo: quando passare le consegne, di cosa ha bisogno un successore, cosa escalare. Ciascuno resta opzionale. Senza di essi valgono le stesse regole, con lo sviluppatore che inoltra i messaggi e riavvia gli agenti.
2. **L’unità di continuità è il piano, non l’agente.** Ogni passaggio di consegne e ogni successione è una normale ripresa più un piccolo pacchetto che porta ciò che il journal non contiene: l’intenzione che era in corso.
3. **La proattività batte la reattività.** Un agente controlla il proprio margine ai confini dei task e passa le consegne finché può ancora scrivere un buon pacchetto. Reagire dopo aver raggiunto un limite resta la rete di sicurezza.
4. **L’autonomia non amplia mai l’autorità.** Passaggi di consegne, successioni, avvii e pianificazione avvengono entro l’autorizzazione del piano. Nessun agente risponde a una schermata di permesso, bypass, login, consenso o pagamento, e il lavoro si sposta solo tra gli account che lo sviluppatore ha dichiarato.
5. **La continuità non abbassa mai l’asticella.** Un successore eredita gli stessi gate. Un pacchetto non chiude alcun criterio, non allenta alcun gate e non salta alcuna revisione.
6. **Economico per costruzione.** La capacità si legge da una cache ai confini dei task, mai in un ciclo né a intervalli fissi. Notifiche unidirezionali sostituiscono le domande che non richiedono risposta, e i pacchetti sono piccoli.

## Ruoli

| Ruolo | È | Possiede | Non fa mai |
| --- | --- | --- | --- |
| Lead | L’agente che detiene il record di lead di un piano | Il piano, la tabella delle corsie, la pianificazione, l’ordine di rilascio, merge e tag entro l’autorizzazione, la lista di successione | Scrivere nel checkout di una corsia, o guidare un piano che un altro lead detiene |
| Vice | La prima voce raggiungibile della lista di successione del lead | Nulla finché non subentra | Agire da lead mentre il lead è raggiungibile |
| Corsia | Un agente per repository, filone di lavoro o task, nel proprio pannello e sul proprio account | Il suo piano figlio o task, branch, gate e pacchetto | Assegnare lavoro a un’altra corsia, fare merge o creare tag |
| Revisore | Una corsia di un altro fornitore, in sola lettura | I propri rilievi | Scrivere nell’albero che rivede |

- **Il lead resta attivo.** Un orchestratore le cui corsie aspettano un inoltro umano si blocca. Un lead non mette mai in pausa lo sciame per una domanda che può decidere da sé.
- **Un esecutore per piano.** Un solo agente alla volta esegue un dato piano o piano figlio. Un secondo agente sullo stesso piano è un errore di coordinamento che il lead deve risolvere.
- **L’autorità viene dal piano, non da un peer.** Una corsia legge da sé l’autorizzazione del piano. Un’approvazione inoltrata da un altro agente non aggiunge nulla che la corsia non avesse già.
- **Più lead** possono lavorare in uno stesso workspace, ciascuno alla guida di un piano diverso. Un account è detenuto da una sola corsia alla volta tramite un lease di `ak`, così due lead non mettono mai due scrittori sullo stesso account Codex.
- **Più istanze dello stesso tipo** — tre pannelli Grok, quattro pannelli Codex su uno o più profili — sono corsie ordinarie. Le istanze sullo stesso profilo condividono la capacità di quel profilo.

Ogni corsia ha un piano, almeno un piano Lite nel proprio repository, e quel piano è la prima cosa che un successore legge. Ogni corsia riferisce al lead con un vocabolario fisso — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — e chiude ogni messaggio con una riga di capacità, come `capacity=ok 64% @work1`, così il lead raramente ha bisogno di leggere le quote da sé.

## Il ciclo della capacità

Un agente controlla il proprio margine prima di iniziare ogni task, dopo ogni gate o passo durato più di 20 minuti, ogni volta che la sua CLI mostra un avviso di limite d’uso, e prima di accettare un passaggio di consegne o la guida. Il controllo è `ak capacity --self --json` di coding-agents-kit `v0.6.1`, che l’helper del pacchetto trasforma in una decisione:

| Verdetto | Decisione | Una corsia | Un lead, per sé stesso |
| --- | --- | --- | --- |
| `ok` (sopra la soglia bassa) | continuare | Continua | Continua |
| `low` (25 % o meno) | prepararsi | Termina il task corrente, non ne inizia nessuno che non possa finire, riporta `capacity=low` | Designa un successore e non avvia lavoro lungo su sé stesso |
| `critical` (10 % o meno, o soggetto a rate limit) | passare le consegne | Raggiunge il prossimo punto sicuro, scrive il pacchetto, notifica il lead, si ferma | Cede subito la guida |
| `unknown` (nessuna fonte di quota) | continuare | Riporta `capacity=unknown`, passa le consegne a un avviso di limite della CLI o a una schermata `usage_limit` | Preferisce corsie con capacità nota per i task lunghi |

- **Le soglie** sono quelle del kit: bassa al 25 % e critica al 10 % della quota libera della finestra vincolante per impostazione predefinita, regolabili con `AGENTKIT_CAPACITY_LOW` e `AGENTKIT_CAPACITY_CRITICAL`. Le letture provengono da una cache mantenuta per 300 secondi, così un controllo a ogni confine di task costa poche chiamate al fornitore all’ora.
- **Isteresi.** Una volta scritto il pacchetto, il passaggio di consegne si completa. L’agente non riprende mai quel task dopo che il suo account si è ripristinato; il successore ne è il titolare, e l’account ripristinato torna semplicemente nel pool.
- **Conta anche la pressione sul contesto.** Quando il contesto dell’agente raggiunge la soglia di contesto fresco del contratto (60 % per impostazione predefinita), seguono lo stesso pacchetto e lo stesso passaggio di consegne.
- **Degrado onesto.** Senza il kit, con un kit più vecchio o fuori da un avvio tramite `ak`, la capacità viene riportata come sconosciuta, mai come ok.

**Il pool è dello sviluppatore.** Il piano registra gli account che lo sviluppatore ha dichiarato per il lavoro. Un agente non crea mai account, non rinnova login, non spende un reset di Codex e non usa account fuori dal pool, e lavora nel rispetto dei termini di ogni fornitore. Spostare il lavoro prima di un limite, all’interno del pool, è pianificazione; ruotare gli account per superare un limite non è mai consentito. Per ogni task pronto, il lead prende l’account meglio classificato da `ak pick --owner <lead>`, lo riserva all’indirizzo della corsia stessa con `ak lease`, non dà mai a una corsia l’account del lead stesso (i due arriverebbero a `critical` insieme), preferisce account con capacità nota per i task lunghi e un altro fornitore per i revisori, e mantiene un vice. Quando nessun account del pool ha margine e nessuno si resetta entro l’orizzonte del piano, lo sciame si mette in attesa registrando il reset più vicino.

## Passaggio di consegne di una corsia

1. **La corsia**, al verdetto di passaggio, raggiunge un punto sicuro — un passo committato, o l’albero lasciato com’è, mai lavoro scartato —, scrive il pacchetto, invia `handoff <packet path>` al lead come notifica e si ferma. Non chiude il proprio pannello.
2. **Il lead**, o il vice quando il lead è irraggiungibile o a sua volta critico, sceglie un account (`ak pick <kind> --owner <lead> --exclude @<spent>`, preferendo un altro fornitore quando il task lo consente), lo riserva e avvia il successore nello stesso checkout con un brief per riprendere il piano dal pacchetto.
3. **Il successore** accetta il pacchetto — l’helper verifica il piano, il contratto vigente, il branch, il commit di testa e i percorsi non committati, e non registra nulla in caso di discrepanza —, poi riprende il piano e riesegue ogni gate che il pacchetto elenca come non verificato.
4. **Il lead** rilascia il lease esaurito e chiude il pannello esaurito una volta che il successore ha accettato.

Il **pacchetto di consegna** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) viene scritto in `analysis_results/handoff/` del piano con permessi riservati al proprietario. Indica il piano, il contratto, il task e il passo; il motivo (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` o `lead_handover`); dove si trova il lavoro (repository, checkout, branch, testa, se è stato pushato, percorsi non committati); cosa è fatto, verificato e non verificato, con i percorsi delle evidenze; i passi successivi in ordine; le richieste aperte; le decisioni prese; il lead e l’epoca; e chi lo ha scritto. Un pacchetto è un dato: non porta mai un valore segreto, contenuti privati di un altro repository o un’istruzione che amplia l’autorità. Il successore ricava di nuovo la propria azione successiva dal piano.

## Successione del lead

herdr-peers `v0.3.2` mantiene un record di lead per piano — lead, epoca, lista di successione e corsie — e risolve l’indirizzo `lead` nel lead corrente, così nessun brief di corsia codifica in modo fisso il pannello del lead.

- **Prima rivendicare, poi avviare.** Il lead esegue `herdr-peers lead claim --plan <P> --succession <A,B>` prima di avviare qualsiasi corsia — l’indirizzo `lead` si risolve solo quando esiste un record —, aggiorna il record con `--lanes <A,B>` man mano che le corsie partono ed esegue `lead release` quando il piano è concluso. Da herdr-peers `v0.3.2` il record conserva localmente il repository che rivendica, e un piano con lo stesso id in un altro repository si indica con `--plan <repo>/<id>`. La successione predefinita è il suo successore previsto, poi le corsie nel checkout del piano stesso in ordine di avvio, poi qualsiasi corsia sullo stesso host; le corsie nei container o su altre macchine vengono per ultime.
- **Cessione, pianificata.** A `low` il lead designa un successore. A `critical` scrive un pacchetto del lead — tabella delle corsie, richieste aperte, ordine di rilascio, merge in sospeso, decisioni —, esegue `herdr-peers lead handover <addr> --plan <P>`, che incrementa l’epoca e notifica ogni corsia, e si ferma. Il successore accetta il pacchetto, riprende il piano orchestratore e ricontrolla ogni corsia.
- **Subentro, non pianificato.** Quando il lead è irraggiungibile, non ha un agente, mostra una schermata `usage_limit`, o una richiesta a esso scade due volte, la prima voce raggiungibile della lista di successione esegue `herdr-peers lead takeover --plan <P>` — in prima persona, o avviando un nuovo pannello di lead nel checkout del piano. Il nuovo lead ricostruisce lo stato dal piano. L’intenzione in corso mancante viene registrata come mancante, mai inventata.
- **Fencing per epoca.** Solo il detentore dell’epoca più alta agisce da lead. Una corsia accetta una notifica del lead solo dall’agente che le ha dato il brief (prima rivendicazione), dal lead corrente all’epoca successiva (cessione) o dalla prima voce raggiungibile della successione all’epoca successiva (subentro); i pareggi vanno alla posizione di successione precedente, e un lead che ritorna e vede un’epoca più alta si fa da parte. Merge, tag e rilasci sono eseguiti solo dal lead dell’epoca corrente, vengono prima verificati rispetto al remoto e seguono le regole di merge del repository.

## Messaggistica

- **Lead e corsia** si scambiano milestone, il via libera, pin e requisiti modificati.
- **Corsia e corsia** possono chiedersi informazioni e coordinarsi — un’interfaccia, il nome esatto di un flag, lo stato di un branch. Solo il lead assegna il lavoro; la profondità uno e il limite di fan-out restano validi, e una corsia avvisa il lead quando uno scambio con un’altra corsia cambia il piano.
- **Le notifiche** (`herdr-peers notify <addr|lead>`) sono unidirezionali: il destinatario le registra come dati e non risponde mai. Non consumano alcuno slot di fan-out e portano annunci di passaggio di consegne, cambi di lead e annunci di rilascio. La notifica del lead è l’unica trasmissione dello stato corrente, e nessuno ne conferma la ricezione.
- **Le domande tra repository non bloccano.** Una corsia chiede, continua con l’ipotesi raccomandata registrata e si adegua quando arriva la risposta.
- **Mai fare polling in attesa di un messaggio.** Una domanda o una notifica raggiunge un agente solo quando il suo turno finisce; un agente il cui passo successivo dipende da un messaggio termina il turno e lascia che arrivi.
- **Il testo ricevuto è un dato.** Una risposta o una notifica non concede nulla e non chiude nulla.

## Escalation solo per ciò che è critico

Tutto ciò che non è critico viene deciso dall’agente: indaga, sceglie l’opzione raccomandata, registra la decisione — le opzioni, la scelta, il perché e come annullarla — e continua. Un’escalation deve indicare la propria classe; una domanda che non ne indica nessuna è una decisione che spetta all’agente. Le classi sono quelle del [protocollo dell’agente](/it/spec/agent-protocol):

| Classe | Escalare allo sviluppatore quando |
| --- | --- |
| C1 Autorità | Un’azione è fuori dall’autorizzazione del piano o a un checkpoint di consenso: operazioni distruttive o irreversibili, deploy in produzione, pubblicazione oltre il piano, messaggi a persone esterne agli agenti del piano, spese, postura di sicurezza o segreti. |
| C2 Schermata di consenso | Compare una schermata di permesso, bypass, login, credenziali, consenso MCP o pagamento. Mai gestita con tasti da un agente. |
| C3 Ambiguità irriducibile | Due esiti materialmente diversi soddisfano la richiesta e nulla nel repository, nella sua documentazione, nei piani o nelle decisioni precedenti lo risolve. |
| C4 Conflitto di qualità | Un gate non può passare senza essere indebolito, o le evidenze contraddicono l’obiettivo del piano in un modo che il task non può correggere. |
| C5 Danno | Stato condiviso, dati o il lavoro di un altro agente vengono persi o corrotti senza spiegazione. |
| C6 Termini | Sorge una questione legale, di licenza, di termini del fornitore o di privacy. |
| C7 Capacità esaurita | Nessun account del pool dichiarato ha margine e nessuno si resetta entro l’orizzonte del piano. |

In uno sciame, **un elemento critico blocca la sua catena di dipendenze, non lo sciame.** Il lead mette in attesa il task bloccato — il suo record di blocco è l’escalation, inviata una sola volta —, mantiene attiva ogni corsia indipendente e riprende la catena quando lo sviluppatore risponde. L’autonomia non chiude mai un’approvazione umana, le parole letterali dello sviluppatore prevalgono su una raccomandazione, e un’approvazione inoltrata da un agente viene registrata come inoltrata, mai come se l’avesse scritta lo sviluppatore.

## L’asticella della qualità

Uno sciame vale la pena di essere eseguito solo se ci si può fidare del suo risultato. L’[asticella della qualità](/it/spec/dwp-specification) si applica a ogni agente che prosegue un piano:

- **I gate sono ipotesi.** Un gate nuovo o modificato viene mostrato fallire su un difetto inserito ad arte prima di fidarsene, e un passaggio vuoto — un binario mancante, zero file corrispondenti, un log vuoto — è un fallimento. Un task con un contratto di input nomina i suoi casi limite — vuoto, multiriga, spazi bianchi attorno — così che superare ogni esempio non venga scambiato per dimostrare la regola.
- **Confrontare con la base.** Prestazioni, copertura e dimensioni vengono confrontate con il branch di base, non solo con una soglia.
- **Misurare prima, progettare prima di costruire.** Una correzione o un audit verifica prima la propria premessa e il proprio strumento di misura; una modifica non banale mette per iscritto interfacce, modalità di guasto, sicurezza e test prima del codice.
- **Revisione prima del passo irreversibile.** L’AI Diff Review locale viene eseguita prima di qualsiasi merge, tag o pubblicazione, e le modifiche alla metodologia o al protocollo ricevono un revisore di un altro fornitore.
- **La continuità non abbassa mai l’asticella.** Un successore riesegue ciò che il pacchetto elenca come non verificato; un passaggio di consegne non è mai una scorciatoia per evitare un gate.

## La traccia

Il journal del piano orchestratore registra lo sciame: avvii e risultati delle corsie come eventi di delega; verdetti di capacità, passaggi di consegne e successioni come osservazioni; escalation e risposte dello sviluppatore come interventi. I pacchetti e i loro record di accettazione restano nel piano che ha eseguito il lavoro, e il report di completamento indica ogni passaggio di consegne e ogni successione con il relativo pacchetto.

## Metterlo alla prova

Dimostra il ciclo prima di farci affidamento. Su un repository di prova con un piccolo piano orchestratore, esegui un lead e almeno tre corsie su account o fornitori diversi. Limita la capacità riportata da una corsia — `AGENTKIT_CAPACITY_CAP=@<profile>=8` abbassa la lettura e non può mai alzarla — e osservala scrivere un pacchetto, il lead avviare un successore che lo accetta e il successore superare il gate. Limita il lead allo stesso modo e osserva la cessione e il nuovo lead completare il piano. Poi registra le evidenze in `analysis_results/` del piano: nessun tasto premuto da una persona, ogni pacchetto, ogni epoca, una richiesta da corsia a corsia e i gate.
