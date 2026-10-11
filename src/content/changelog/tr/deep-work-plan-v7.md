---
title: "DWP v7: görev devreden ve her şeyi kaydeden planlar"
description: "Deep Work Plan v7, v6 sözleşmesini ve günlüğünü korur, bir planın sınırlı görevleri diğer ajanlara devretmesine izin verir ve dört isteğe bağlı eklenti ekler."
date: 2026-10-10
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
---

Deep Work Plan v7, v6 yöntemini korur: sözleşme otoritedir, yalnızca eklemeli günlük bellektir, zamanlayıcı sıradaki işin ne olacağına karar verir ve bir görev ancak kaydedilmiş kanıt ölçütlerini karşıladığında kapanır. v7 görev devretme yeteneğini ekler ve sonuç etrafında aynı disiplini sürdürür.

`agent_delegation` izni veren bir plan, bir görevi `parallel_safe` olarak işaretleyip başka bir ajana devredebilir. Devralanın yanıtı talimat olarak değil, veri olarak kaydedilir ve planın kendi kapı çalıştırıcısı sonucu gözlemleyene kadar `asserted` durumunda kalır. `observed` kanıtını yalnızca çalıştırıcı üretir; böylece devretme, tamamlanma çıtasını düşürmeden erişimi genişletir.

Dört isteğe bağlı eklenti, devretmeyi pratik özerkliğe dönüştürür. Herdr, görevi herhangi bir makinedeki bir bölmede çalışan ajana iletir. Agentkit, tüm terminal kodlama ajanlarının üzerine tek bir `ak` komutu koyar; özerklik varsayılandır ve kapatılabilir, sınırlı görevleri ise bir git worktree içinde arayüzsüz çalıştırır. Devcontainer, her depoya içinde hiçbir SSH anahtarı bulunmayan, yeniden üretilebilir bir kapsayıcı sağlar. DeepWorkPlan Vim, plan tarayıcısı ve Markdown görüntüleyicisi olan bir terminal düzenleyicisidir. Her biri, kendi deposu olan bir ürüne etiketle sabitlenmiştir ve Deep Work Plan olmadan da çalışır. Bir depo bunların hiçbiri olmadan da tamamen uyumludur; `.dwp/config.json` içindeki kayıt defteri hangilerinin etkin olduğunu tutar.

Kıyaslama ve öğrenimler modu, her planın neyi öğrettiğini kaydeder; böylece bulgular sonradan çözümlenebilir. Depo başına bir ajanla v7 orkestratör planı olarak yürütülen tüm ekosistem denetimi, v6'ya göre davranışsal bir gerileme bulmadı: paket test takımı temiz bir ortamda 807 testin 807'sini geçer ve talimat yükü akış başına %0.1 ile %3.9 arasında arttı (tüm paket için %4.6); bu değer token olarak tahmin edilmedi, iki etiket üzerinde bayt cinsinden ölçüldü.

v7, orkestrasyon ve denetlenebilirlikte bir adımdır; ancak henüz tamamen müdahalesiz özerklik değildir. Kıyaslama ve öğrenimler döngüsü v7 planlarını henüz otomatik olarak ölçmez ve ajan çıktılarının aşağı olmama durumu ölçülmemiştir. Mevcut planlar kayıtlı nesillerini korur ve örtük olarak asla taşınmaz; yeni planlar varsayılan olarak v7 sözleşmesini kullanır.

Yüklü skill sürümü: **7.1.4**, 7.0.0'dan beri kararlı.
