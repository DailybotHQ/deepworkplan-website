---
title: "DWP v5: le promesse, ora garantite"
description: "Deep Work Plan v5 trasforma otto promesse di lunga data in contratti testati — un verificatore onesto, un'unica regola di approvazione, un'orchestrazione che non corrompe e un percorso di aggiornamento sicuro."
date: 2026-09-12
version: "v5 · Garantito dai test"
kind: release
lang: it
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Oggi rilasciamo Deep Work Plan v5. Il riassunto onesto di questo rilascio: la metodologia prometteva già tutto questo — ora lo garantisce. Prima di v5, un agente che seguiva la documentazione alla lettera poteva comunque finire in scenari di guasto reali; oggi ciascuno di questi scenari è chiuso e fissato da un test eseguibile. La suite di contratti dello skill è cresciuta da 132 a 258 test in questo ciclo, e ogni garanzia qui sotto è stata validata dal vivo contro il tag rilasciato — installata in un repository pulito e condotta attraverso i propri flussi prima di scrivere questa voce.

**Un verificatore che non rivendica mai un successo non verificato.** I controlli di conformità un tempo degradavano in silenzio: senza un interprete capace saltavano ogni verifica e stampavano comunque un verdetto conforme, e il testo in grassetto dentro un campo poteva essere scambiato per un campo assente. Ora il verificatore termina con un verdetto `UNVERIFIED` esplicito ogni volta che non può verificare davvero. Un verificatore non riporta mai un successo che non ha controllato — la fiducia nei gate è l'intera proposta, e un gate che può saltare il proprio controllo spezza la catena.

**Un solo contratto di approvazione per i piani Lite.** Tre superfici rispondevano in tre modi diversi alla domanda «avviare questo piano approva il suo ambito attuale?», e un agente poteva bloccarsi o eseguire senza autorizzazione proprio al confine più pericoloso. v5 stabilisce un unico contratto ovunque: un execute o un resume esplicito approva l'ambito ready attuale e registra quell'approvazione prima di qualsiasi lavoro; una proposta in sospeso, da sola, non autorizza nulla; una promozione interrotta viene recuperata prima che qualsiasi lavoro di prodotto venga eseguito.

**Orchestrazione multi-repository che non corrompe.** L'override di ambiente di un hub orchestratore un tempo filtrava nei repository figli — un figlio poteva scrivere lo stato dei piani nelle cartelle dell'hub stesso. I template dell'orchestratore stampavano `FAIL` uscendo con successo, e un controllo di completezza che faceva grep di una stringa di stato poteva leggere un'attività completata come un piano completato. Ora la radice dell'hub viene salvata prima di navigare nei sotto-repository, ogni figlio risolve il proprio `.dwp/` in isolamento, ogni ramo di errore termina con un errore, la completezza viene letta dallo stato di livello superiore del piano e l'entrypoint del devcontainer propaga gli errori di copia prima di cancellare alcunché.

**Un'unica matrice di consenso per gli addon.** Quale addon si installa di default, quale viene solo offerto e quale revisione è obbligatoria — le superfici di prima rispondevano in modo diverso. v5 dichiara una matrice: l'AI Diff Reviewer è obbligatorio per la revisione locale, fissato a un rilascio verificato, con la revisione in CI come opt-in esplicito che non si installa mai da sé; l'addon design-system è un'offerta obbligatoria quando viene rilevato lavoro di UI, ma si installa solo con accettazione esplicita; l'addon dependency-upgrade arriva come delegatore inerte quasi predefinito con rollback per snapshot esatto; dailybot riferisce solo dove autorizzato. Un diff vuoto non conta più come revisione completata.

**Una vera macchina per i piani lunghi.** Un audit di 108 piani reali ha mostrato che il lavoro parallelizzabile era comune ma la decisione sequenziale quasi mai dichiarata, e gli stage gate esistevano solo come pratica estemporanea. v5 rende la decisione di esecuzione sempre dichiarata — sequenziale con un motivo registrato quando il parallelismo non è appropriato — aggiunge Stage Gates opzionali per i piani di venti o più attività ed arricchisce le Plan Variables con livello di rigore, soglia di evidenza e azioni vietate. Tutto questo si carica progressivamente e non pesa mai su un piano Lite.

**Contesto applicato, un obiettivo per attività.** I piani potevano degenerare in liste di attività senza contesto, e un'attività poteva impacchettare tre obiettivi dietro un unico gate verde. v5 richiede la coppia Goal e Context a livello di piano, un Context per attività — ciò che una nuova sessione serve per avviare quell'attività da sola — in ogni nuovo record (i record completati restano esattamente come scritti), e rende un obiettivo per attività la regola normativa con una guardia contro il decadimento.

**Un percorso di aggiornamento sicuro.** `/dwp-upgrade` è nuovo. La sua fase di controllo è di sola lettura e non installa nulla; un aggiornamento parte solo da un'accettazione esplicita, con le adattazioni locali differenziate ed esposte prima di sovrascrivere alcunché; l'installazione punta a un tag esatto e verifica se stessa; l'onboarding riesegue come init pulito. Un aggiornamento non tocca mai `.dwp/` — nessun piano, file di stato, record di gate o evidenza viene migrato, riscritto o invalidato.

**Evidenza onesta e misurabile.** Le affermazioni di efficienza oggi vengono rimisurate su tre baseline — v3.0.0, v4.0.3 e l'albero finale — con lo script di misura committato nel repository. I risultati sono riportati in byte del filesystem e mai convertiti in numeri di token o costi che non possiamo sostenere, e ogni affermazione non verificabile è messa in quarantena come tale nel registro di valutazione.

Deep Work Plan v5 segue lo standard DWP 4.0.0. Leggi la [specifica normativa](https://deepworkplan.com/spec), consulta il [repository dello skill](https://github.com/DailybotHQ/deepworkplan-skill) o inizia l'adozione da [`/init`](https://deepworkplan.com/init).
