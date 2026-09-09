---
title: "Datenschutzerklärung"
description: "Die Datenschutzerklärung von deepworkplan.com: eine statische Website ohne Konten und Werbung, cookielose aggregierte Analytik und eine klare Erklärung, was das Kontaktformular erhebt."
---

## Was diese Website ist

deepworkplan.com ist eine Sammlung statischer Seiten, die über ein CDN ausgeliefert werden. Es gibt keinen Login, keine Benutzerdatenbank und keine Möglichkeit für die Website, persönliche Profile zu speichern. Inhalte werden in öffentlichen GitHub-Repositories unter der DailybotHQ-Organisation entwickelt, und alles, was Sie hier lesen, wird genau so ausgeliefert, wie es gebaut wurde.

## Analytik

Die Website nutzt Umami, einen cookielosen, datenschutzorientierten Analytik-Dienst, um Seitenaufrufe aggregiert zu zählen. Umami setzt keine Tracking-Cookies und erstellt keine seitenübergreifenden Profile. Da KI-Crawler kein JavaScript ausführen, zeichnet eine serverseitige Edge-Funktion zusätzlich User Agent und Pfad automatisierter Bot-Besuche als anonyme Analytik-Ereignisse auf — das identifiziert Crawler-Software (zum Beispiel „GPTBot besuchte /init“), nie einen menschlichen Besucher.

## Cookies und lokaler Speicher

Die Website setzt keine Tracking-Cookies. Das Einzige, was in Ihrem Browser gespeichert wird, ist eine Design-Voreinstellung (hell oder dunkel) im localStorage, die Ihr Gerät nie verlässt und nirgendwo übertragen wird. Wenn Sie Ihren Browser-Speicher leeren, kehrt die Website einfach zum Design-Standard Ihres Systems zurück.

## Drittanbieter-Dienste

Hosting und Auslieferung laufen auf Cloudflare Pages, das Anfrage-Logs und IP-Adressen an der Edge verarbeitet — als Teil des CDN-Betriebs und der Abwehr von Missbrauch, unter Cloudflares eigener Datenschutzerklärung. Aggregierte Analytik läuft auf Umami (cloud.umami.is). Wenn Sie das Kontaktformular freiwillig absenden, werden Ihre Antworten über Google Forms an unser Team gesendet — das ist der einzige Ort, an dem Informationen erhoben werden, die Sie eingeben, und sie werden ausschließlich verwendet, um Ihnen zu antworten.

## Was wir nicht tun

Wir verkaufen oder geben keine personenbezogenen Daten weiter, schalten keine Werbung oder Remarketing-Pixel, erzeugen keine Browser-Fingerabdrücke und versenden keine Marketing-E-Mails. Die Website hat keine Newsletter-Anmeldung und keine Telemetrie über die oben beschriebenen aggregierten, cookielosen Zählungen hinaus.

## Ihre Möglichkeiten

Da die Analytik hier aggregiert und cookielos ist, gibt es kein persönliches Profil zum Exportieren oder Löschen. Sie können das Analytik-Skript mit einem beliebigen Content-Blocker blockieren, ohne die Funktionsweise der Website zu beeinträchtigen. Wenn Sie das Kontaktformular abgesendet haben und Ihre Nachricht löschen möchten, schreiben Sie an die Kontaktadresse unten — wir entfernen sie.

## Änderungen an dieser Erklärung

Wenn sich diese Erklärung wesentlich ändert, ändert sich das Datum auf der [Datenschutzseite](https://deepworkplan.com/privacy) mit, und inhaltliche Änderungen werden in das öffentliche Website-Repository committet, wo jeder die Historie einsehen kann.

## Kontakt und Sicherheit

Bei Datenschutzfragen schreiben Sie an [security@dailybot.com](mailto:security@dailybot.com). Um eine Sicherheitslücke zu melden, nutzen Sie bevorzugt GitHubs private Schwachstellenmeldungen für die Website- und Skill-Repositories — die genauen Adressen stehen in [security.txt](https://deepworkplan.com/.well-known/security.txt).
