---
title: Dailybot
description: "AI-first bir depoyu bir Dailybot ekibine bağlayan isteğe bağlı bir eklenti: plan yürütmesinde en iyi çabayla ilerleme ve dönüm noktası raporları, artı isteğe bağlı otonom kanca katmanı."
kind: addon
lang: tr
order: 2
---

# Dailybot eklentisi

Deep Work Plan ilerlemesini bir Dailybot ekibine taşıyın. Zaten Dailybot kullanan ekipler için isteğe bağlı bir eklenti.

## Neler ekler

- Dailybot ajan skill’inin (şu anda 1.7.x; ayrıca Slack, Microsoft Teams, Discord ve Google Chat genelinde takım sohbeti ekler) ve/veya Dailybot CLI’nın, kendi onay akışları aracılığıyla isteğe bağlı kurulumu.
- Plan yürütmesine bağlanan, en iyi çabayla çalışan bir ilerleme/dönüm noktası raporu; böylece bir planın tamamlanması ekibe yansır.
- İsteğe bağlı deterministik kanca katmanı (Dailybot ajan skill’i 1.6.0+, CLI 1.12.0+): commit edilmiş harness kancaları, yerel bir defterden raporlanmamış işi tespit eder ve tur sonunda ajana hatırlatır; böylece prompt talimatlarının soluklaştığı uzun, gözetimsiz oturumlarda bile raporlama otonom kalır.

## Davranış

Bu eklenti **yetkiyi devreder** — tekerleği yeniden icat etmez. Kurulumu, onayı, kimlik doğrulamayı, kanca şablonlarını ve yazım üslubunu Dailybot ajan skill’i üstlenir; bu eklenti yalnızca onu kurmayı önerir, isteğe bağlı rapor adımını bağlar ve depo düzeyindeki kanca yapılandırmasını önerir. Rapor kesinlikle en iyi çaba ilkesiyle çalışır ve Dailybot mevcut değilse, kimliği doğrulanmamışsa veya erişilemezse işi asla engellemez.

İki katman çift raporlama olmadan birleşir: başarılı bir yaşam döngüsü raporu kanca defterini sıfırlar; böylece kancalar bir rapordan sonra sessiz kalır ve yalnızca bir yaşam döngüsü olayı kaçırıldığında deterministik bir güvence olarak devreye girer. Kanca komutları yalnızca yerel durumu okur ve her zaman sıfır koduyla çıkar; dolayısıyla onlar da işi asla engelleyemez.

## Notlar

Temel Deep Work Plan metodolojisinin Dailybot’a **hiçbir** bağımlılığı yoktur. Bunu yalnızca geliştirici veya ekip zaten Dailybot kullanıyorsa önerin; herkes için asla otomatik kurmayın.
