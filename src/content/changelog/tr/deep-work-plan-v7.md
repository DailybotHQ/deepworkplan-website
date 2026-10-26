---
title: "DWP v7: görev devreden ve her şeyi kaydeden planlar"
description: "Deep Work Plan v7, v6 sözleşmesini ve günlüğünü korur, bir planın sınırlı görevleri diğer ajanlara devretmesine izin verir ve dört isteğe bağlı eklenti ekler."
date: 2026-10-09
version: "v7 · Kanıtlı devir"
kind: release
lang: tr
order: 0
featured: true
sourceLabel: "Yayımlanan v7 şema kümesi"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
---

Deep Work Plan v7, v6 yöntemini korur: sözleşme otoritedir, yalnızca eklemeli günlük bellektir, zamanlayıcı sıradaki işin ne olacağına karar verir ve bir görev ancak kaydedilmiş kanıt ölçütlerini karşıladığında kapanır. v7 görev devretme yeteneğini ekler ve sonuç etrafında aynı disiplini sürdürür.

`agent_delegation` izni veren bir plan, bir görevi `parallel_safe` olarak işaretleyip başka bir ajana devredebilir. Devralanın yanıtı talimat olarak değil, veri olarak kaydedilir ve planın kendi kapı çalıştırıcısı sonucu gözlemleyene kadar `asserted` durumunda kalır. `observed` kanıtını yalnızca çalıştırıcı üretir; böylece devretme, tamamlanma çıtasını düşürmeden erişimi genişletir.

Dört isteğe bağlı eklenti, devretmeyi pratik özerkliğe dönüştürür. Herdr, görevi herhangi bir makinedeki bir bölmede çalışan ajana iletir. Agentkit, tüm terminal kodlama ajanlarının üzerine tek bir `ak` komutu koyar; özerklik varsayılandır ve kapatılabilir, sınırlı görevleri ise bir git worktree içinde arayüzsüz çalıştırır. Devcontainer, her depoya varsayılan olarak içinde hiçbir SSH anahtarı bulunmayan, yeniden üretilebilir bir kapsayıcı sağlar (ana bilgisayar aracısı üzerinden SSH ile git; anahtar dosyaları yalnızca açık bir `[ssh] copy_keys` katılımıyla eklenir). DeepWorkPlan Vim, plan tarayıcısı ve Markdown görüntüleyicisi olan bir terminal düzenleyicisidir. Her biri, kendi deposu olan bir ürüne etiketle sabitlenmiştir ve Deep Work Plan olmadan da çalışır. Bir depo bunların hiçbiri olmadan da tamamen uyumludur; `.dwp/config.json` içindeki kayıt defteri hangilerinin etkin olduğunu tutar.

Kıyaslama ve öğrenimler modu, her planın neyi öğrettiğini kaydeder; böylece bulgular sonradan çözümlenebilir. Depo başına bir ajanla v7 orkestratör planı olarak yürütülen tüm ekosistem denetimi, v6'ya göre davranışsal bir gerileme bulmadı: paket test takımı temiz bir ortamda 807 testin 807'sini geçer ve talimat yükü akış başına %0.1 ile %3.9 arasında arttı (tüm paket için %4.6); bu değer token olarak tahmin edilmedi, iki etiket üzerinde bayt cinsinden ölçüldü.

v7, orkestrasyon ve denetlenebilirlikte bir adımdır; ancak henüz tamamen müdahalesiz özerklik değildir. 7.2.0 sürümü, bu denetimin bulduğu boşlukları kapatır: kıyaslama ve öğrenimler artık v7 planlarını ölçer, ön koşulları tamamlanmadan bir göreve başlamak reddedilir ve test paketi hermetik biçimde çalışır (temiz bir ortamda 815 içinde 815). Ajan çıktılarının aşağı olmama durumu ölçülmemiştir. Mevcut planlar kayıtlı nesillerini korur ve örtük olarak asla taşınmaz; yeni planlar varsayılan olarak v7 sözleşmesini kullanır.

7.6.0 sürümü (2026-10-11) büyük ölçekte orkestrasyonu getirdi: her depo veya iş akışı için bir kulvar (lane), kalan kapasiteye göre seçilen hesaplar (`ak usage`, `ak pick`), gözetimsiz başlatma ve her eklentiyi tespit eden, kullanılanları yükselten ve uygun olanları öneren bir ilk katılım süreci.

7.7.0 sürümü (2026-10-12) sürü özerkliğini sundu (Kılavuz §17): kapasite döngüsü (`shared/swarm.py`), devir paketleri (`dwp-handoff-v1`), dönemler ve yalıtımla lider ardıllığı, kulvarlar arası talepler, AGENT_PROTOCOL §7.5 yükseltme sınıflandırması (C1–C7: diğer her şeye karar verin ve kaydedin), kalite çıtası (geçitler hipotezdir, iddia edilmez, doğrulanır) ve 23 depoda yürütülen 313 plandan çıkarılan metodolojik öğrenimler. Bilinen sınır: v7 günlüğünde kulvar devri veya lider ardıllığı için özel bir olay yoktur (bunlar iptal edilen bir delegasyon artı bir gözlem olarak kaydedilir).

7.8.0 sürümü (2026-10-13) Ecosystem 1.0'ı tesis etti: paketin entegre ettiği her ürün ilk kararlı sürümüne ulaştı ve anlamsal sürümleme kapsamında v1.0.0'a sabitlendi (coding-agents-kit, herdr-peers, devcontainer-kit ve deepworkplan-vim; her biri doğrulanmış bir `SHA256SUMS` özetiyle), AI Diff Reviewer v3.3.14 ve Dailybot agent-skill v3.23.17 sabitlemeleriyle birlikte; ardından 7.8.1 (2026-10-14) coding-agents-kit ve devcontainer-kit'in v1.0.1 yama sürümlerini sabitledi.

7.9.0 sürümü (2026-10-25), Herdr eklentisini herdr-peers v1.1.0'a sabitler; bu sürümün yerel tartışma alt becerisi, bir liderin eşlerden oluşan bir paneli turlar boyunca yönetmesini ve bir karar kaydıyla kapatmasını sağlar. AI Diff Reviewer ise v3.3.16'ya sabitlenir; paketin CI'ı artık Python 3.9 alt sınır işini ubuntu-24.04 üzerinde çalıştırır.

Yüklü skill sürümü: **7.9.0**, 7.0.0'dan beri kararlı.
