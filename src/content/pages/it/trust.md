---
title: "Fiducia e sicurezza"
description: "Perché Deep Work Plan è sicuro da adottare: open source e MIT, Markdown-first senza chiamate di rete né telemetria, non distruttivo per design, con installazioni verificabili e una chiara politica di divulgazione delle vulnerabilità."
lastUpdated: 2026-06-05
---

## Perché puoi fidarti di esso

Nessuno dovrebbe installare una skill di cui non può fidarsi. Deep Work Plan è progettato per essere verificato, non accettato per fede: open source, Markdown-first, non distruttivo e controllabile prima di eseguirlo.

- **Open source e licenza MIT** — il sito web e la skill sono entrambi pubblici e ispezionabili; leggi ogni riga prima di eseguirla.
- **Markdown-first — nessuna rete, nessuna telemetria** — nessuna CLI, nessuna API HTTP, nessun flusso di autenticazione; non effettua chiamate di rete e non invia telemetria. Nulla del tuo repository lascia la tua macchina.
- **Non distruttivo per design** — l'unica azione rilevante per la sicurezza è modificare il tuo repository, e riconcilia anziché sovrascrivere: rileva ciò che esiste, propone un piano e chiede conferma prima di sostituire qualsiasi cosa. L'output dei piani risiede in una cartella `.dwp/` esclusa da git.
- **Non tocca i segreti** — non esegue mai il commit di segreti, aggiunge al `.gitignore` anziché riscriverlo, e mantiene le modifiche in diff piccoli e revisionabili.
- **Provenienza verificabile** — ogni release pubblica i checksum sulla skill distribuita.

---

## Verifica prima di eseguire

Tratta la skill come non attendibile finché non l'hai verificata. Ogni release allega un file `SHA256SUMS` che copre la skill distribuita. Scaricalo per la versione che intendi installare e verifica che la tua copia corrisponda — un'uscita diversa da zero significa che un file non corrisponde e devi fermarti.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (current release v7.8.1):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/v7.8.1/SHA256SUMS
# Expected SHA256SUMS digest: 5b288fad7cd0cee810092d30f8a502e73e0b04b69510510faa649e1270671779
./setup.sh --verify        # un'uscita diversa da zero significa che un file non corrisponde — fermati
```

Le release sono **checksummate, non firmate** — la firma (cosign o GPG del maintainer) è il passo successivo documentato, non una garanzia attuale. Poiché tutto è aperto, puoi anche confrontare qualsiasi file con il repository alla sua tag.

La stessa regola vale per l’installer di DeepWorkPlan Vim: la sua pagina mostra lo SHA-256 dello script servito, con una procedura per scaricare, controllare, verificare ed eseguire. [Controllare l’installer di DeepWorkPlan Vim](/kit/vim#inspect-before-you-run)

---

## Segnalare una vulnerabilità

Segnala i problemi di sicurezza **privatamente tramite il sistema di segnalazione privata delle vulnerabilità di GitHub** nel repository pertinente — non come una issue pubblica, il che divulgherebbe il problema prima che esista una correzione:

- Skill: <https://github.com/DailybotHQ/deepworkplan-skill/security>
- Sito web: <https://github.com/DailybotHQ/deepworkplan-website/security>

---

## Limitazioni oneste

- Le release sono checksummate, ma non ancora firmate — la firma è pianificata, non ancora implementata.
- Deep Work Plan esegue un agente di coding autonomo sul tuo repository. Rivedi il piano proposto e i suoi diff; la metodologia è progettata per quella revisione, non per sostituirla.
- Queste affermazioni di fiducia descrivono solo le fonti ufficiali. Una copia modificata o di terze parti che si è allontanata dai repository non gode di nessuna di queste garanzie — verificala prima.

---

## Risorse sulla fiducia

- [Manifesto di fiducia leggibile dalla macchina](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Politica di sicurezza del sito web](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Politica di sicurezza e modello di minacce della skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Leggi la metodologia](/methodology)
- [Adozione (init)](/it/quickstart)
