---
title: Loop engineering
description: "Come un daemon avviato da una persona fa avanzare i piani Deep Work approvati con registrazione, successione, solleciti ed eventi entro l’autorità registrata."
order: 8
lang: it
summary: Il ciclo di vita completo che fa avanzare un piano approvato entro la sua autorità registrata.
icon: repeat
---

# Loop engineering

**Prima la specifica, loop chiuso: il repository è la harness e il piano si esegue da solo fino alla fine.** Questo capitolo descrive il meccanismo facoltativo che fa avanzare un piano dopo il suo primo turno di esecuzione. Il piano resta la specifica durevole; il loop fornisce continuità, non nuova autorità.

## Registrare il piano

Con l’addon Herdr attivo, il flusso `execute` del pack acquisisce il record di lead del piano (e `resume` lo acquisisce di nuovo), aggiungendo una successione quando il piano nomina dei successori; il subentro automatico funziona solo con una successione registrata. Quel record dà al loop un piano preciso, il lead corrente, l’epoca e l’ordine dei successori da osservare. I piani senza record di lead non vengono seguiti. L’addon resta facoltativo: senza di esso, la metodologia di base funziona comunque in una sessione o con un passaggio di consegne coordinato da una persona.

La registrazione del piano non approva il lavoro né amplia l’autorizzazione del piano. In v8, un piano approvato procede fino alla fine entro l’autorità registrata in quel piano. I suoi criteri di accettazione e i suoi gate restano vincolanti per tutta l’esecuzione.

## Avviare il daemon a mano

Una persona avvia `herdr-peers autopilot --loop` in un ambiente Herdr. È un daemon locale in background, non un elemento di login né un servizio di sistema. Osserva i piani registrati sulle macchine abilitate e sollecita un lead inattivo a continuare quando il suo piano resta aperto, nessuna corsia sta lavorando e nessuna risposta è in attesa. Il messaggio è fisso: continuare il piano approvato fino alla fine rispettandone i gate e l’autorità registrata.

Il daemon non tocca login, richieste di credenziali né la conferma della modalità bypass-permissions di Claude. Non sceglie mai un rifiuto, un’opzione a testo libero o una riga che amplia i permessi di un agente. Un sollecito chiede soltanto a un agente di continuare; non aggiunge autorità. Il lead continua a registrare i blocchi e a seguire i gate del piano. Dopo tre solleciti senza progressi, il daemon smette di sollecitare e segnala `plan_stalled`.

## Proteggere la leadership

Se il lead non c’è più, il daemon chiede al primo successore raggiungibile della lista di eseguire la procedura di subentro. Il record di lead avanza di epoca e i destinatari fanno rispettare l’ordine di successione. Il protocollo 2 consente anche la nomina di un lead, ma solo quando la persona ha registrato l’autorizzazione sul piano (`lead claim --allow-appointment`) e ha avviato il daemon con `--appoint`; il daemon non può concedersi da solo quel permesso. Prima di ogni merge, tag o release, il lead corrente esegue `herdr-peers lead verify --plan <id>` per verificare il record su tutte le macchine del piano.

Un successore eredita il piano e i suoi gate. Né la successione né la nomina cambiano i criteri di accettazione o consentono lavoro al di fuori dell’autorità registrata. Se il piano raggiunge un gate che richiede un’azione umana secondo le sue regole C1–C7, il loop segnala la necessità e si ferma a quel gate. Anche credenziali e login restano azioni umane. Per il resto dell’avanzamento, la persona viene informata invece di dover seguire ogni passaggio.

## Cervello e coda facoltativi

L’opzione `--brain` avvia un agente decisionale dedicato per i casi che le regole del daemon non riescono a risolvere. Richiede coding-agents-kit 1.3.0 o successivo; senza, un daemon avviato con `--brain` si rifiuta di partire. Il cervello può scegliere solo da un elenco chiuso di azioni che il daemon fissa per ogni caso: un sollecito in più, un’unica richiesta fissa al lead di risolvere un blocco che il piano indica come risolvibile dal lead, avvisare la persona o lasciar perdere. Il daemon resta l’unico attore: convalida la scelta ed esegue un’azione ammessa; il testo libero del cervello non viene mai eseguito. In v8, un piano registra inoltre nel suo blocco di autonomia se un cervello può agire su di esso.

La coda dei piani usa il documento `dwp-queue-v1` in `.dwp/queue.json`. Lo scrive lo strumento dei piani; il daemon è un consumatore limitato e in sola lettura. Un piano in coda diventa idoneo quando la sua dipendenza `after` è completata (o assente) e la sua approvazione resta valida. Il daemon lo avvia solo inviando un unico messaggio fisso al lead indicato dalla coda: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Una voce `launch` non viene avviata da questo loop. Il pack aggiorna lo stato della coda man mano che l’esecuzione e la finalizzazione procedono.

## Segnalare e osservare

Gli eventi del piano coprono un piano che va in stallo, si blocca, perde il suo lead o si completa, e un piano in coda che parte o non riesce a partire. Il comando facoltativo `--notify` riceve un oggetto `plan-event-v1` per gli eventi supportati; il notificatore Dailybot del pack li trasforma in aggiornamenti per il team. Le notifiche riportano un avanzamento o un blocco; non autorizzano azioni né sostituiscono il record del piano.

Il report della flotta e `herdr-peers fleet ui` mostrano agenti e piani su più macchine, compreso il lavoro che richiede attenzione. L’interfaccia è in sola lettura: non scrive alcuno stato del piano e non sollecita alcun agente. Aiuta una persona a vedere lo stato del loop senza diventare un altro piano di controllo.

## Il limite

Il loop engineering chiude il loop di esecuzione attorno a una specifica approvata. Rende abituali la continuazione, la successione e i report, mentre il piano resta l’autorità e il daemon resta limitato. La persona avvia il daemon, gestisce credenziali e login e risolve solo i gate C1–C7 del piano stesso o altre necessità che l’autorità registrata non può soddisfare. L’obiettivo del loop è un piano approvato che raggiunge la fine definita senza che una persona debba controllarlo.
