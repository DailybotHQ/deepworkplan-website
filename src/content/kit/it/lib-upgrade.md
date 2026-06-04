---
title: lib-upgrade
description: "Aggiorna in sicurezza le dipendenze di un repository a lotti validati e annullabili tramite l’addon dependency-upgrade. Installato solo quando quell’addon è accettato."
kind: command
lang: it
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Aggiorna in sicurezza le dipendenze del repository. Un sottile delegatore all’addon **dependency-upgrade**.

## Cosa fa

`lib-upgrade` instrada verso l’addon dependency-upgrade. L’addon ragiona sul package manager reale del repo — senza mai assumere npm — classifica gli aggiornamenti per semver, aggiorna a lotti sicuri, esegue il validation gate reale del repo dopo ogni lotto, annulla un lotto che fallisce e riassume.

## Uso

```
/lib-upgrade
```

## Comportamento

1. Richiede un working tree pulito (o di cui sia stato fatto un backup).
2. Rileva il package manager reale dal manifest e dal lockfile esistenti.
3. Classifica gli aggiornamenti (patch / minor / major); i major richiedono approvazione.
4. Aggiorna a lotti piccoli; valida il gate reale del repo dopo ciascuno.
5. Annulla qualsiasi lotto che non supera il gate; riassume e lascia che sia lo sviluppatore a eseguire il commit.

## Note

Questo comando viene installato solo quando l’addon dependency-upgrade è accettato. Indipendente dal package manager; non esegue mai il commit automaticamente.
