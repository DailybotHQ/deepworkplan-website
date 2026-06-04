---
title: deepworkplan-onboard
description: "Bir deponun yığını ve arketipi üzerine akıl yürüterek onu AI-first hâle getirir; uyarlanmış bir AGENTS.md, docs/, .agents/ ve gitignore’lu bir .dwp/ üretir."
kind: command
lang: tr
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Bir depoyu AI-first, spec-driven bir kod tabanına dönüştürün. Bu, Deep Work Plan skill’inin onboard alt skill’idir.

## Ne yapar

`deepworkplan-onboard`, **gerçek** depoyu inceler — diller, çerçeveler, paket yöneticisi, build/test/lint komutları, modüller, test kuralı, dağıtım biçimi — ve ona uyarlanmış artefaktlar üretir. Akıl yürütür; asla bir şablonu kopyalamaz veya bir yer tutucu bırakmaz.

## Kullanım

```
/deepworkplan-onboard
```

## Davranış

1. Keşif — gerçek yığını ve doğrulama komutlarını saptayın; en yakın onboarding ön ayarıyla eşleştirin.
2. Arketip — bireysel depo ya da orkestratör merkezi olarak sınıflandırın.
3. Gerçek bir Hızlı Komutlar bloğuyla `AGENTS.md` ve `CLAUDE.md` sembolik bağını üretin.
4. `docs/` (mimari, standartlar, test, güvenlik ve daha fazlası) ile modül başına dokümanları üretin.
5. `.agents/` (ajanlar, ince `dwp-*` komutları, yığına uygun skill’ler, katalog) ile `.claude → .agents` üretin.
6. Skill’i kurun ve gitignore’lu bir `.dwp/` (planlar, taslaklar) ile bir `tmp/` karalama alanı iskeletleyin.
7. İsteğe bağlı eklentileri önerin, ardından kendi kendini denetleyin.

## Notlar

Bir depo, sıfır eklentiyle tümüyle uyumludur. Saptanan gerçeklik her zaman ön ayar varsayımlarına üstün gelir.
