---
title: Loop engineering
description: "Come un daemon avviato da una persona porta a termine i Deep Work Plan approvati: record di lead, solleciti, blocchi, successione, revive, coda ed eventi."
order: 8
lang: it
summary: Il ciclo di vita completo che fa avanzare un piano approvato entro la sua autorità registrata.
icon: repeat
---

# Loop engineering

**Prima la specifica, loop chiuso: il repository è la harness e il piano si esegue da solo fino alla fine.** Questo capitolo descrive il meccanismo facoltativo che fa avanzare un piano dopo il suo primo turno di esecuzione. Il piano resta la specifica durevole; il loop fornisce continuità, non nuova autorità.

Il testo normativo si trova nella [specifica del loop engineering](/it/spec/loop-engineering). Questo capitolo ne è il compagno narrativo: percorre il ciclo di vita in ordine e mostra come si incastrano i pezzi, senza ripetere ogni MUST.

## Perché un loop

I primi due pilastri di DWP lasciano una lacuna. La pianificazione basata prima sulla specifica dice *cosa* deve consegnare un episodio e come viene convalidato. Il repository come harness dice *dove* risiedono contesto, strumenti e gate. Nessuno dei due dice *come si conclude il lavoro* quando l’agente che lo esegue termina il suo turno, raggiunge un limite di utilizzo o chiude il suo pannello. Senza un loop, un piano approvato e ben specificato aspetta comunque che qualcuno scriva “continua”.

La regola v8 colma quella lacuna. Un piano approvato procede fino al completamento senza interventi umani di routine, entro l’autorità registrata in quel piano. La persona viene informata, non attesa, tranne quando servono un login o una credenziale o quando uno dei gate C1–C7 del piano stesso richiede un input umano non autorizzato in anticipo. In queste eccezioni l’esecuzione si ferma al gate finché l’input non arriva.

Il loop è quindi un meccanismo di continuazione, non di approvazione, ed è facoltativo: l’integrazione Herdr (herdr-peers `autopilot --loop`) amplifica un metodo che funziona già in una singola sessione.

## Il ciclo di vita in sintesi

Un piano approvato attraversa queste fasi. Ciascuna è descritta in dettaglio più avanti.

| Fase | Cosa succede | Chi agisce |
|---|---|---|
| Approvazione | Il piano viene approvato; il suo contratto registra la sua autorità e, in v8, un blocco `autonomy` facoltativo | La persona |
| Registrazione | `execute` acquisisce il record di lead del piano (`resume` lo acquisisce di nuovo), con una successione quando il piano nomina dei successori | L’agente lead, tramite il pack |
| Esecuzione | Il lead lavora attività per attività rispetto ai criteri di accettazione e ai gate | Il lead e le sue corsie |
| Inattività | Il pannello del lead resta inattivo con il piano ancora aperto | — |
| Sollecito | Il daemon invia un unico messaggio fisso di continuazione | Il daemon |
| Blocco | Il lead registra un blocco strutturato e si ferma; il daemon non invia nulla | Il lead |
| Stallo | Dopo 3 messaggi senza progressi il piano viene registrato come `plan_stalled` | Il daemon lo registra |
| Subentro | Un successore elencato prende il controllo; con un’autorizzazione, viene nominata una corsia; con `--revive`, viene lanciato un agente nuovo | Il successore, la corsia o l’agente rianimato, tramite l’helper |
| Completamento | La chiusura del piano segna come completata la sua voce in coda; il piano successivo in coda può partire | Il lead; il daemon sollecita il lead successivo |
| Notifica | Stalli, blocchi, lead persi, completamenti ed eventi di coda vanno al comando `--notify` | Il daemon esegue il comando |

## Approvare e registrare l’autorità

L’approvazione avviene prima che il loop entri in gioco, e nulla nel loop può approvare un piano, ampliarlo o sostituire un emendamento.

In v8 un contratto di piano (`plan-contract/v8`) può contenere un blocco `autonomy` facoltativo e chiuso. Chiuso significa che un validatore rifiuta una chiave sconosciuta e rifiuta il blocco in qualsiasi generazione di contratto diversa da v8. Ogni chiave assente ha esattamente un valore predefinito registrato, e un consumatore applica quel valore invece di una propria supposizione.

| Chiave | Cosa registra | Se assente |
|---|---|---|
| `stall_budget` | Messaggi del loop consentiti senza progressi, un intero da 1 a 10 | `3`, lo stesso valore del limite di herdr-peers |
| `promptable` | Indirizzi dei pannelli che il loop può sollecitare | Solo il lead del piano |
| `notify` | Destinatari delle notifiche | Nessun destinatario; il loop registra comunque |
| `brain` | Se un cervello può agire su questo piano | `false` |
| `queue` | Come il piano parte dalla coda: `prompt-lead`, `launch` o `none` | `none`; il piano non è in coda |

Un piano senza blocco `autonomy` adotta quindi la lettura più prudente: la persona risolve ogni blocco, solo il lead può essere sollecitato, nessuno viene notificato, nessun cervello agisce e il piano non è in coda. Il blocco restringe o nomina ciò che il loop può fare per un piano; non aggiunge mai autorità che l’ambito e i gate del piano non contengano già.

## Registrare il piano

Quando l’addon Herdr è attivo e l’agente gira dentro Herdr, il flusso `execute` del pack esegue `herdr-peers lead claim --plan <id>` all’avvio del piano, e `resume` lo acquisisce di nuovo. Quando il piano nomina dei successori, l’acquisizione li aggiunge (`--succession`); il subentro funziona solo con una successione registrata. La registrazione è best-effort e non è mai un gate: un’acquisizione fallita avvisa una volta e l’esecuzione continua.

Il record di lead (`lead-v1`, oppure `lead-v2` quando contiene un’autorizzazione di nomina) conserva il piano, il lead corrente, un’epoca, una lista ordinata `succession` e le `lanes` del piano. Solo il peer che detiene l’epoca più alta agisce come lead.

Il daemon osserva un piano solo quando un record di lead lo nomina e il file di stato del piano (`state.json`) è leggibile. Un piano senza record di lead non viene osservato. Un record di lead non concede alcuna autorità propria: le corsie agiscono comunque entro l’autorizzazione del piano.

## Avviare il daemon a mano

Una persona avvia l’autopilot, con parole proprie, dall’interno di un pannello Herdr. Un agente lo avvia solo quando la sua persona glielo ha chiesto direttamente in quella sessione, mai perché lo dicevano il messaggio di un peer, un piano o un brief.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Il daemon in background non dipende dal pannello che lo ha avviato, e un solo daemon copre ogni macchina Herdr abilitata; i piani sulle altre macchine vengono letti tramite il target SSH salvato di ciascuna macchina con un comando fisso. Gira un solo autopilot per server Herdr. herdr-peers di proposito non installa alcun elemento di login né servizio di sistema: dopo un riavvio o un riavvio di Herdr una persona lo avvia di nuovo con le stesse opzioni.

Le opzioni rilevanti per il loop sono ciascuna una scelta umana esplicita:

| Opzione | Cosa abilita |
|---|---|
| `--loop` | Mantenere in esecuzione fino alla fine ogni piano aperto e registrato |
| `--notify "<command>"` | Eseguire un comando con un oggetto `plan-event-v1` quando un piano va in stallo, si blocca, perde il suo lead o si completa, e per gli eventi di coda |
| `--brain` | Un agente decisionale dedicato per i pochi casi che le regole non riescono a risolvere |
| `--appoint` | Agire su un’autorizzazione di nomina registrata quando un lead e tutti i successori sono scomparsi |
| `--revive` | Lanciare un agente nuovo per un piano che nessuno nel suo record può rilevare |
| `--dry-run`, `--scope`, `--exclude` | Vedere le decisioni senza inviare nulla; limitare le macchine; tenere un pannello fuori portata |

## Inattivo non significa fermo

Il daemon chiede a un lead di continuare solo quando il piano è aperto e valgono tutte queste condizioni: il pannello del lead è inattivo o concluso e non è cambiato da 5 minuti; nessuna corsia del piano sta lavorando e il lead non attende risposte; il suo schermo non è una finestra di dialogo, un login o un limite di utilizzo; la sua riga di input non contiene una bozza umana; ha svolto un turno proprio dall’ultimo messaggio; e ha ricevuto meno di 3 messaggi nell’ultima ora.

Il messaggio è fisso. Viene inserito solo l’id del piano:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Un sollecito chiede; non autorizza mai. Il daemon sollecita solo il lead, poiché le corsie sono guidate dal loro lead. Dopo 3 messaggi del loop senza progressi nello stato del piano, il piano viene registrato come `plan_stalled` e lasciato stare finché il suo stato non cambia. Un lead con più piani aperti riceve un messaggio per passata.

## Blocchi strutturati

Un piano v8 registra come dati il motivo per cui non può continuare, così il loop, la mappa della flotta e un agente che riprende leggono gli stessi campi invece di interpretare prosa. Un blocco viene sollevato con l’helper del ledger (`ledger.py block`) e risolto con `ledger.py unblock`, come evento `blocker` di `journal-event/v8`. Un’aggiunta diretta di un evento di blocco viene rifiutata.

| Campo | Significato |
|---|---|
| `task` | L’attività bloccata; un’attività già chiusa dalle sue evidenze non può essere bloccata |
| `reason` | Perché l’attività non può continuare (al massimo 1000 caratteri) |
| `needs` | Una riga che dice cosa la sblocca (al massimo 500 caratteri) |
| `class` | Obbligatorio: uno tra C1–C7 |
| `resolver` | Facoltativo: `lead` o `human`; se assente si legge come `human` |

`resolver: "lead"` significa che il blocco può essere risolto entro l’autorità registrata del piano senza credenziale, login, consenso, pagamento, push su main, release o cancellazione. Viene rifiutato per C1, C2, C5 e C6. È attivo al massimo un blocco per piano, e finché non è risolto la sua attività non può completarsi.

I lettori trovano il blocco nel `state.json` del piano, che è `plan-snapshot/v8`: il blocco attivo oppure `null`, con `blocked` come stato derivato dell’attività. `PROGRESS.md` si apre con quattro righe di intestazione fisse, aggiornate a ogni transizione:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

Il loop tratta un piano bloccato con moderazione. Non gli invia nulla e registra `plan_blocked` una sola volta. Né il daemon né il suo cervello possono chiedere a un lead di risolvere un blocco che il piano non ha marcato `resolver: "lead"`; tutto il resto aspetta la persona. I piani delle generazioni precedenti (v6 e v7) non registrano eventi di blocco, e ogni blocco che segnalano spetta alla persona.

## Cosa il daemon non fa mai

Il daemon non fa mai queste cose:

- toccare una richiesta di login, di accesso, di chiave API o di codice dispositivo, né la conferma della modalità bypass-permissions di Claude; è una persona ad accedere;
- scegliere una riga di rifiuto, una riga a testo libero o una riga che amplia i permessi permanenti di un agente;
- sollecitare un pannello la cui riga di input contiene la bozza di una persona, né un pannello fuori dal suo ambito;
- sollecitare un piano bloccato, né un piano di cui non riesce a leggere lo stato;
- scrivere o modificare un record di lead, inviare un messaggio di protocollo o nominare un pannello che non è nel record;
- scrivere la coda dei piani.

Una finestra di permessi in cui ogni riga rifiuta o amplia i permessi viene negata, mai lasciata bloccata, e all’agente viene detto una volta di continuare in un altro modo entro i gate del suo piano o di registrare un blocco. Una domanda dell’agente stesso le cui righe rifiutano tutte viene lasciata alla persona, perché è una decisione sul lavoro.

## Leadership: epoche, successione e subentro

La leadership è recintata dall’epoca. Ogni cambiamento che sposta il lead (un passaggio di consegne, un subentro, un rilascio, una nomina) incrementa l’epoca, e solo chi detiene l’epoca più alta agisce come lead. Un ex lead che ritorna trova un’epoca più alta, i suoi comandi di lead vengono rifiutati e il successivo avviso di lead lo fa farsi da parte.

Quando il lead è scomparso (il suo pannello manca da due elenchi consecutivi), il daemon chiede al primo indirizzo raggiungibile della `succession` del record di eseguire `herdr-peers lead takeover --plan P`, una volta per epoca. Non passa alcun motivo, così è il controllo dell’helper stesso a decidere se il lead è davvero scomparso. Un lead al suo limite di utilizzo non è scomparso: il daemon lo riprova ogni 30 minuti. Se nessuno nella successione può essere interpellato, il daemon registra `plan_no_lead`.

Un successore eredita il piano, i suoi criteri di accettazione e i suoi gate. La successione cambia chi esegue, mai ciò che è autorizzato.

## Nomina e revive

Esistono altri due percorsi per un piano il cui lead e i cui successori sono tutti scomparsi. Ciascuno richiede un atto umano esplicito e lascia il subentro all’agente stesso, verificato dall’helper.

**Nomina (protocollo 2).** Richiede due atti umani: un’autorizzazione registrata sul record di lead (`lead claim --allow-appointment`, eseguito dal lead solo su parola della sua persona) e un daemon avviato con `--appoint`. Il daemon non può concedersi da solo quel permesso. Quando il lead e tutti i successori risultano scomparsi in due osservazioni distanti almeno 15 minuti senza progressi, il daemon chiede alla prima corsia attiva del piano di eseguire `lead takeover --plan P --as-lane`. Quell’helper verifica di nuovo l’autorizzazione, conferma che si tratta di una corsia che lavora nel repository del piano e sonda il lead, ogni successore e ogni corsia precedente due volte, a un minuto di distanza; qualsiasi segno di vita comporta il rifiuto. Sono consentite al massimo due nomine per piano.

**Revive (herdr-peers 2.2.0).** Avviare il daemon con `--loop --revive` è di per sé l’autorizzazione. Quando il lead di un piano e ogni membro della sua successione e delle sue corsie sono scomparsi e nessuno può subentrare, il daemon può lanciare un agente nuovo nel checkout del piano, scrivere un ticket monouso e istruirlo a eseguire `lead takeover --plan P --reason revive`. L’helper accetta il subentro solo con quel ticket e solo dopo che i suoi controlli trovano scomparso ogni membro; il record rianimato viene adottato solo sulla macchina del daemon. Un piano in stallo il cui lead è ancora vivo non gli viene mai tolto: al lead viene chiesto una volta di passare le consegne. Il revive è limitato a uno per piano ogni 6 ore, due per piano in totale e due all’ora sull’intera flotta.

**Verificare prima dei passaggi irreversibili.** Un lead nominato o rianimato, come qualsiasi lead, esegue `herdr-peers lead verify --plan <id>` prima di ogni merge, tag o release. Il comando rifiuta quando un’altra macchina mostra il piano a un’epoca più alta, ed esce con codice diverso da zero quando una macchina del piano non è raggiungibile.

## Il cervello facoltativo

Le regole del daemon decidono quasi tutto. Per i pochi casi che non riescono a decidere, `--brain` mantiene un agente decisionale dedicato che il daemon lancia da sé, in modalità ask, e a cui obbedisce solo entro un elenco chiuso di azioni. Richiede coding-agents-kit 1.3.0 o successivo; senza, un daemon avviato con `--brain` si rifiuta di partire invece di girare senza il cervello che gli era stato chiesto.

| Caso | Azioni consentite |
|---|---|
| Un piano è in stallo | Un sollecito in più (una volta per piano), avvisare la persona o lasciar perdere |
| Un piano è bloccato con `resolver: "lead"`, una classe che un lead può gestire (C3, C4, C7) e nessun argomento sensibile | Un’unica richiesta fissa al lead di risolverlo entro l’autorità registrata, avvisare la persona o lasciar perdere |
| Un agente attende davanti a uno schermo che il daemon non riconosce | Avvisare la persona o lasciar perdere |

Quando non arriva una risposta valida entro 3 minuti, l’impostazione predefinita è lasciar perdere il caso. Il testo del cervello non viene mai digitato, inviato come tasti né eseguito; non può nominare un lead, lanciare un agente, fare merge, rilasciare, accedere né cambiare un permesso. Il daemon resta l’unico attore. In v8, `autonomy.brain` di un piano registra se un cervello può agire su quel piano.

## La coda dei piani

Un repository può mantenere una coda di piani approvati in `.dwp/queue.json`, schema `dwp-queue-v1`. La scrivono il pack (`shared/queue.py`) o una persona; il daemon si limita a leggerla, con limiti e convalidandola per intero. Create aggiunge un piano all’approvazione quando lo sviluppatore chiede di metterlo in coda (o quando il contratto v8 registra `autonomy.queue` diverso da `none`); la persona o il lead la riordinano; execute segna la voce come `started` quando il piano parte con il suo lead, e `done` dopo la chiusura del piano. Una coda contiene al massimo 64 voci. Le dipendenze sono interne alla coda: `after` nomina un piano già in coda. Gira un piano alla volta per repository, a meno che la coda non contenga `parallel: true`.

Con `--loop`, quando il piano corrente di un repository termina, la voce pronta successiva parte con un unico messaggio fisso al lead indicato dalla coda: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Una voce è pronta solo quando il suo piano `after` è completato, nessun altro piano di quel repository è in esecuzione, nomina un lead e la sua approvazione è ancora l’ultimo evento di approvazione o di emendamento del piano per il contratto vigente. Una voce `launch` non viene avviata dal loop; come una voce non approvata o un lead mancante, viene segnalata come `queue_blocked`. Una coda danneggiata si legge come vuota e non interrompe mai il ciclo di vita del piano.

## Eventi, notifiche e mappa della flotta

Il daemon segnala gli eventi del piano come un oggetto JSON `plan-event-v1` sullo standard input del comando `--notify`: l’evento, il piano, la macchina, il lead, il repository e la classe del blocco. Gli eventi comprendono `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` e `plan_completed`, una volta per piano e situazione, oltre a `plan_queued_started`, `queue_blocked`, gli eventi di nomina e di revive, e `needs_human` dal cervello. Un errore viene registrato e non interrompe mai la passata.

L’addon Herdr del pack include un notificatore Dailybot (`scripts/notify-dailybot.py`) che trasforma gli eventi di completamento, stallo, blocco, assenza di lead e lead spostato in un unico aggiornamento leggibile per il team tramite la CLI Dailybot installata. Esce in silenzio quando la CLI è assente, non ha effettuato l’accesso o l’invio fallisce. Le notifiche riportano un avanzamento o una necessità; non autorizzano mai un’azione né sostituiscono il record del piano.

Per osservare il loop, `herdr-peers plans` stampa i piani di una macchina (`plans-v1`) e `herdr-peers fleet` stampa la mappa unificata (`fleet-v1`): macchine, agenti, piani e il ruolo di ciascun agente come lead, successore o corsia. `herdr-peers fleet ui` mostra la mappa in tempo reale, raggruppata per piano, repository, macchina o coda, con viste per ciò che richiede attenzione, ciò che è attivo, in attesa o concluso. L’interfaccia legge soltanto: non scrive alcuno stato del piano e non sollecita alcun agente.

## Un esempio concreto: un piano durante la notte

La seguente descrizione è illustrativa; ogni passaggio segue le regole documentate sopra.

1. La sera lo sviluppatore approva un piano con un blocco `autonomy` che lascia i valori predefiniti tranne `notify`. L’agente esegue `execute`, che acquisisce il record di lead con un successore.
2. Lo sviluppatore avvia `herdr-peers autopilot start --loop --notify "<notifier>"` e si disconnette.
3. Il lead completa tre attività e termina il suo turno. Cinque minuti dopo, senza corsie al lavoro né risposte in attesa, il daemon invia il messaggio fisso di continuazione e il lead riprende dall’attività successiva.
4. Un’attività richiede un segreto che il piano non possiede. Il lead solleva un blocco C1 senza resolver (letto come `human`) e si ferma. Il daemon non invia nulla al piano, registra `plan_blocked` e il notificatore pubblica un unico aggiornamento per il team che indica la classe del blocco.
5. Al mattino lo sviluppatore fornisce l’input, il lead risolve il blocco con `ledger.py unblock` e l’esecuzione continua. Più tardi il pannello del lead si chiude; dopo due elenchi senza di esso, il daemon chiede al successore di eseguire `lead takeover`, l’epoca avanza e il successore continua sotto gli stessi gate.
6. Prima del merge finale del piano, il nuovo lead esegue `lead verify`. Il piano si completa, `plan_completed` raggiunge il notificatore e, se il repository ha una coda, il lead del piano approvato successivo riceve il messaggio fisso della coda.

In nessun momento il daemon ha approvato qualcosa, digitato una credenziale o deciso quale dovesse essere il lavoro.

## Il limite dell’autorità

Il loop si ferma esattamente dove si ferma l’autorità del piano. Le classi di escalation del protocollo degli agenti segnano quella linea: C1 autorità (un’azione fuori dall’autorizzazione del piano, a un checkpoint di consenso o che coinvolge segreti), C2 schermate di consenso (schermate di permessi, login, credenziali o pagamento, mai compilate da un agente), C3 ambiguità irriducibile, C4 un gate che non può passare senza essere indebolito, C5 danni, C6 termini e C7 capacità esaurita. Quando una di esse si presenta senza autorizzazione preventiva, l’esecuzione si ferma al gate e la necessità viene registrata e segnalata.

Login e credenziali restano sempre azioni umane. La persona avvia il daemon, concede esplicitamente la nomina o il revive e risolve le necessità che l’autorità registrata non può soddisfare. Per tutto il resto, la persona viene informata invece di dover sorvegliare ogni passaggio.

## Lavorare senza l’addon

Niente di tutto questo è obbligatorio. Senza Herdr, o con l’addon disattivato, il pack si comporta come se il loop non esistesse: un piano viene eseguito in una sessione, ripreso con `resume` dalla sua prima attività aperta o passato a un altro agente tramite un passaggio di consegne coordinato da una persona. Il contratto del piano, i blocchi strutturati e l’intestazione di `PROGRESS.md` funzionano allo stesso modo, così una persona o un altro agente legge lo stesso stato che avrebbe letto il loop.
