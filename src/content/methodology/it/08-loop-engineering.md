---
title: Ingegneria del ciclo
description: "Come un daemon avviato da una persona porta i piani Deep Work approvati al termine con registrazione, successione e notifiche entro l’autorità data."
order: 8
lang: it
summary: Il ciclo completo che fa avanzare un piano approvato entro l’autorità registrata.
icon: repeat
---

# Ingegneria del ciclo

**Prima la specifica, ciclo chiuso: il repository è l’harness e il piano procede da sé fino al completamento.** Questo capitolo descrive il meccanismo opzionale che mantiene attivo un piano dopo il primo turno di esecuzione. Il piano resta la specifica durevole; il ciclo assicura continuità, non nuova autorità.

## Registrare il piano

Con l’addon Herdr attivo, il flusso `execute` del pack acquisisce il record di lead del piano e registra una successione. Il record definisce piano, lead corrente, epoch e ordine dei successori osservati dal ciclo. I piani senza record di lead non vengono monitorati. L’addon è facoltativo: senza, la metodologia funziona in una sessione o con passaggi coordinati da una persona. La registrazione non approva il lavoro né amplia l’autorizzazione. In v8, il piano approvato procede fino alla fine entro i limiti registrati; criteri di accettazione e gates restano vincolanti.

## Avvio manuale del daemon

Una persona avvia `herdr-peers autopilot --loop` in un ambiente Herdr. È un daemon locale in background, non un elemento di login né un servizio di sistema. Osserva i piani registrati sulle macchine abilitate e sollecita un lead inattivo quando il piano è aperto, nessuna lane lavora e non ci sono risposte in attesa. Il messaggio fisso chiede di completare il piano approvato rispettando gates e autorità registrata.

Il daemon non tocca login, credenziali o conferme di bypass-permissions di Claude. Non sceglie un rifiuto, non esegue testo libero mostrato a schermo e non crea permessi. Il sollecito chiede solo di continuare, senza aggiungere autorità. Il lead registra comunque i blocchi e rispetta i gates. Dopo tre solleciti senza avanzamento, si ferma e segnala `plan_stalled`.

## Proteggere la leadership

Se il lead scompare, il daemon chiede al primo successore raggiungibile di eseguire la procedura di takeover. L’epoch del record aumenta e i destinatari verificano l’ordine. Protocol 2 consente anche la nomina di un lead, ma solo dopo autorizzazione esplicita della persona nel piano; il daemon non può concederla. Prima di ogni merge, tag o release, il lead corrente esegue `herdr-peers lead verify --plan <id>` per verificare il record sulle macchine del piano. Il successore eredita piano e gates senza ampliamenti. Se il piano raggiunge un gate che richiede intervento umano secondo le regole C1–C7, il ciclo segnala la necessità e si ferma. Anche credenziali e login restano azioni umane. Per il resto, la persona viene informata senza dover seguire ogni passaggio.

## Brain e coda facoltativi

L’opzione `--brain` avvia un agente decisionale dedicato ai casi non risolvibili con le regole del daemon. Il brain può scegliere solo da un elenco chiuso di azioni consentite dal piano. Il daemon resta l’unico esecutore: verifica la scelta ed esegue un’azione ammessa, senza mai eseguire testo libero del brain. Senza autorizzazione esplicita, il brain non agisce sul piano.

La coda usa `dwp-queue-v1` in `.dwp/queue.json`. Scrive solo il pack; il daemon è un lettore limitato. Un piano è pronto quando la dipendenza `after` è completata o assente e l’approvazione è valida. Il daemon lo avvia solo con un messaggio fisso al lead registrato: «Il piano P è il prossimo in coda per questo repository ed è approvato; eseguilo fino al termine rispettando i gates». Il ciclo non avvia voci `launch`. Il pack aggiorna lo stato della coda durante esecuzione e finalizzazione.

## Segnalare e osservare

Gli eventi del piano registrano accodamento, avvio, blocco, stallo, perdita del lead e completamento. Il comando facoltativo `--notify` riceve un oggetto `plan-event-v1` per gli eventi supportati; il notifier Dailybot del pack li trasforma in aggiornamenti per il team. Le notifiche informano, non autorizzano azioni e non sostituiscono il record. Il rapporto fleet e `herdr-peers fleet ui` mostrano agent e piani su più macchine. L’interfaccia è in sola lettura: non scrive lo stato né sollecita agent.

## Il limite

L’ingegneria del ciclo chiude l’esecuzione attorno a una specifica approvata. Continuità, successione e report diventano normali, mentre il piano resta la fonte dell’autorità e il daemon resta limitato. La persona avvia il daemon, gestisce credenziali e login e risolve solo gates C1–C7 o necessità non coperte dall’autorità registrata. L’obiettivo è che un piano approvato raggiunga il termine definito senza supervisione umana continua.
