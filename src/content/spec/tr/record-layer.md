---
title: Kayıt katmanı
description: "v6 ve v7 kayıt katmanı: değişmez bir sonuç sözleşmesi, yalnızca eklemeli bir günlük, kanıt sınıfları, insan onayı, değişiklikler, değişmezler ve makbuzlar."
order: 9
lang: tr
section: Record layer
---

# Kayıt katmanı

> **Sürüm kapsamı:** Bu sayfa, güncel standart DWP 7.0.0'ın üzerine kurulduğu normatif v6 kayıt katmanını yeniden ifade eder. `v7.8.1` sürümündeki kanonik kaynaklar: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) ve [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). Bu sayfa ile bu dosyalar ayrıştığında dosyalar geçerlidir. v5 planları [plan durumu](/spec/plan-state) katmanını korur ve asla örtük olarak göç ettirilmez.

**Sürüm 6.0.0, 7.0.0'da genişletildi. Durum: Kararlı.** Kayıt katmanı, anlatıya dayalı tamamlanmanın yerine kayıtları koyar: sözleşme otoritedir, günlük bellektir, yazma işini yardımcı araçlar yapar ve üretilen her dosya bir projeksiyondur. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

## Tek satırlık model

Bir plan, yazılmış iki yapıt ve korunan bir diziden oluşur. Plan Markdown'ı (`README.md` ve görev dosyaları) neyin yapılacağını söyler. **Sonuç sözleşmesi** (`contract.json`) neyin bitmiş sayılacağını ve planın neyi yapmaya yetkili olduğunu söyler. **Günlük** (`journal.ndjson`) gerçekte ne olduğunu kaydeder. `state.json` ve `views/` günlükten yeniden üretilir ve elle düzenlenMEMELİDİR; üretilen bir dosya ile günlük çeliştiğinde günlük geçerlidir ve dosya yeniden üretilir.

## Neslin tespiti

Bir plan klasörü, ancak ve ancak `contract` işaretçisi çözümlenen bir `manifest.json`, bir `contract.json` veya bir `contracts/` revizyon zinciri taşıyorsa v6 hattı bir plandır. Tespit, kurulu paket sürümünü asla değil, bu yapıtları KULLANMALIDIR: güncel bir paket v5 planları barındırabilir ve daha eski bir paket bir v6 planıyla karşılaşabilir.

Sözleşmenin `schema` URL'si onun **neslini** adlandırır; manifesto ve her günlük olayı bunu yansıtır:

| Nesil | Sözleşme | Günlük olayları | Manifesto | Ekledikleri |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` ve `delegation` olayı ([Devretme](/spec/delegation)) |

7.x paketinin oluşturduğu yeni planlar varsayılan olarak v7'dir; açık bir `v6` isteği yine bir v6 sözleşmesi oluşturur. Bir plan neslini asla değiştirmez ve nesilleri karıştıran bir günlük reddedilMELİDİR. Her iki nesil de aynı [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json) biçimine yansıtılır.

## Sonuç sözleşmesi

Her plan için, kendi neslinin şemasına uyan tek bir sözleşme vardır. Sözleşme; sonuç bildirimini ve başarı tanımını, kabul kriterlerini, ön koşulları, dokunulan yüzeyleri ve kapı niyetleriyle birlikte görevleri, plan kapsamlı değişmezleri, kapsamı (izin verilen yollar, komut sınıfları, yasak işlemler), kaynak zarfını, zamanlama sınırlarını, izinleri ve yetkilendirme kaydını taşır.

- **Kimlik.** `contract_id`, sözleşmenin id alanı hariç kanonik baytlarının SHA-256 özetidir. Sözleşme altında üretilen her kayıt ona atıf yapar.
- **Değişmezlik.** Yürütme başladıktan sonra sözleşme DEĞİŞMEMELİDİR. Değişmiş bir sözleşme, `contracts/` altında üst revizyonuna atıf yapan, ardışık revizyon numaralarına ve yeni kaydedilmiş yetkiye sahip yeni bir **revizyondur**.
- **Kararlı kimlikler.** Kriterler (`AC-*`), değişmezler (`INV-*`) ve görevler (`T-*`) benzersiz OLMALIDIR ve kayıtlar liste konumlarına değil, kimliklere atıf yapar. Görev grafiği döngüsüz OLMALIDIR ve her kapı niyeti beyan edilmiş bir kritere başvurMALIDIR.
- **İzinler.** Verilen ve verilmeyen yetenekler, kapalı bir kümenin ayrık alt kümeleri OLMALIDIR: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Yetkilendirme.** Mekanizma tam olarak `plan_authorship` (insan, yürütmeden önce planı yazdı veya gözden geçirdi) ya da `pre_authorization` (güven modunda olduğu gibi, belirtilmiş bir zarfa sahip kalıcı bir yetki) olur. Her ikisi de kapıları aynı biçimde açar; yalnızca kaydedilen otorite farklıdır.
- **Kapatılabilirlik.** Her kriter kapatılabilir OLMALIDIR: bir görevin kapıladığı bir kriter, kabul ettiği kanıt sınıflarına göre kendi kapısından gelen `observed` kanıtla veya `asserted` bir insan onayıyla kapanır. Hiçbirini kabul etmeyen taslak bir kriter reddedilir.

## Somutlaştırma

Bir plan, elle değil, birlikte gelen yardımcı araçla (`ledger.py materialize`) tam olarak bu sırayla somutlaştırılır; her adım idempotent ve sürdürülebilirdir:

1. Sözleşme işaretçisiyle **`manifest.json`**; somutlaştırma kesintiye uğrasa bile planın nesli keşfedilebilsin diye ilk olarak yazılır.
2. Doğrulanmış ve içerik adresli **`contract.json`**.
3. Sözleşme kimliğine ve plan Markdown'ının özetine atıf yapan **`approval`** günlük olayı.

Görev başlatma kapısını yalnızca bu onay olayı açar. Onay olayı olmadan elle kopyalanmış bir sözleşme görev başlangıcında reddedilir ve işaretçisi somutlaştırılan sözleşmeyle eşleşmeyen bir manifesto yeniden yazılmak yerine reddedilir.

## Günlük

`journal.ndjson` yalnızca eklemelidir: her satırda kapalı bir JSON nesnesi bulunur, asla düzenlenmez veya silinmez. Bir düzeltme, sonraki bir olaydır. Her olay şemasını, türünü, kesin artan bir `seq` değerini, bir zaman damgasını, planı, `contract_id` değerini ve aktörü (`helper`, `agent`, `host_adapter` veya `human`) taşır. Olay kataloğu görev başlangıçlarını, onayları, kapı çalıştırmalarını, gözlemleri, uyarlamaları, değişiklikleri, müdahaleleri, kaynak örneklerini, kontrol çiftlerini, zamanlayıcı seçimlerini, retleri, görünüm üretimlerini, uzlaştırmaları ve günlük onarımlarını kapsar; v7 devretme olaylarını ekler. Her ret de kaydedilir.

## Kanıt sınıfları

Kanıt taşıyan olaylar bir **güven** etiketi kaydeder:

1. **observed** — birlikte gelen bir yardımcı aracın kontrolü kendisinin, beyan edilmiş çalışma dizini, ortam, zaman aşımı ve yakalanan çıktıyla çalıştırdığı durum. Gözlemlenmiş kapı kanıtını yalnızca kapı çalıştırıcısı (`ledger.py gate`) üretir; yalnızca bildirdiği bir sonucu yazan bir ajan bunu yapamaz.
2. **imported** — kaynağı belli, eşleşen bir dış kaynaktan alınan; örneğin kanıt işaretçisi çözümlenen, göç ettirilmiş bir v5 kapı kaydı.
3. **asserted** — bağımsız olarak doğrulanmadan ifade edilen.

Her kriter hangi sınıfları kabul ettiğini beyan eder; böylece yalnızca gözlem kabul eden bir kriter asla bir iddiayla kapanamaz. Sağlama toplamları anlamsal doğruluğu değil, bayt özdeşliğini kanıtlar; kayıt katmanı yapıyı ve kaynağı denetler, ürün anlamını kanıtlamaz.

## İnsan onayı

Bir insanın değerlendirmesi gereken bir kriter `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>` ile kapanır. Onay `asserted` olarak kaydedilir, dayandığı yapıta atıf yapar, yalnızca beyan eden görevin kanıt penceresi içinde sayılır ve yalnızca `asserted` kabul eden bir kriteri kapatır. Bir ajan asla bir insan adına onay vermez. Somutlaştırma dışında yazılan insan aktörlü kayıtlar açık bir otorite işaretçisi taşır (insanın yazdığı, yol ve özetle kaydedilen bir not ya da etkileşimli bir onay); defter bir kişinin kimliğini doğrulayamaz, bu yüzden işaretçi iddiayı gözlemlenmiş değil, denetlenebilir kılar.

## Kontrollü kriterler

Regresyon veya ayırt etme kontrolü olarak beyan edilen bir kriter yalnızca **ayırt edici bir kontrol çifti** ile kapanır: kontrol başlangıç revizyonunda başarısız olur ve yenisinde geçer. Her iki ayakta da geçen bir çift ayırt edici olmayan olarak kaydedilir ve asla yukarı yuvarlanmaz; kirli bir başlangıç veya kullanılamayan eski bir ayak, kontrol kullanılamıyor olarak kaydedilir, asla sentezlenmez.

## Yürütme ve tamamlanma

Dağıtım deterministik zamanlayıcıdan (`scheduler.py ready`) gelir ve `ledger.py start`, ön koşulları tamamlanmamış bir görevi reddeder. Her görev başlangıcı çalışma ağacının bir parmak izini kaydeder ve kanıt yalnızca aynı görev ve kriter için, eşdeğer bir parmak izi üzerinde yeniden kullanılır.

**Değişmezler plan kapsamlıdır.** Beyan edilen her değişmez tüm plan boyunca geçerlidir ve her sınırda bir gözlem olarak değerlendirilir (`INV-<id>: pass` veya `INV-<id>: fail: <reason>`). Yalnızca bazı görevlerin sağlaması gereken bir özellik, o görevlerin bir kabul kriteridir, asla bir değişmez değildir.

**Tamamlanma beyan edilmez, türetilir.** Herhangi bir kriter pencere içinde kabul edilmiş kanıttan yoksun olduğu ya da herhangi bir değişmez taze ve geçen bir değerlendirmeden yoksun olduğu sürece `ledger.py complete` reddeder ve reddi kaydeder. Anlık görüntü, bir görevi tam olarak kayıtlar bunu desteklediğinde tamamlanmış gösterir.

## Uyarlamalar ve değişiklikler

Çalışma ortasındaki değişiklikler zamanlayıcıya yapılan önerilerdir ve kapalı bir kümeyle sınırlıdır: `split`, `reorder`, `insert`, `change_strategy` ve `retry`. Bir uyarlama bir gereksinimi SİLMEMELİ, kabulü zayıflatmamalı veya ikame etmemeli, kapsamı ya da izinleri genişletmemeli, zarfın ötesinde harcama yapmamalı ve çalıştırılmamış bir senaryoyu tamamlanmış olarak İŞARETLEMEMELİDİR.

Kapsamda, kabul kriterlerinde, izinlerde veya zarfta yapılan bir değişiklik bir **sözleşme değişikliğidir**: `ledger.py amend` revize edilmiş sözleşmeyi sonraki revizyon olarak hazırlar, değişikliği önceki kanıtını geçersiz kıldığı kriterlerle birlikte kaydeder, insan otorite işaretçisi taşıyan yeni bir onay ister ve ancak ondan sonra canlı sözleşmeyi değiştirir. Kesintiye uğrayan bir değişiklik ilk eksik adımdan sürer; plan yazarlığı asla bir revizyona aktarılmaz.

## Makbuzlar, görünümler ve dışa aktarma

`outcomes.py receipt` planın sonucunu kayıtlardan yeniden hesaplar; bu yüzden kayıtlar değiştiğinde değişir ve asla elle yazılmaz. `views.py render` insan tarafından okunabilir görünümleri yeniden üretir; bir insanın düzenlediği bir görünüm raporlanır, asla sessizce üzerine yazılmaz ve uzlaştırmanın kendisi de kaydedilir. `.dwp/` gitignore'landığından, `ledger.py export --dest <dir>` kalıcılık veya başka bir ana makine için günlüğü, anlık görüntüyü, sözleşme zincirini ve atıf yapılan her kanıt yapıtını paketler.

## Salt okunur yüzeyler ve sürdürme

`status` ve `verify` bir v6 hattı plana asla yazmaz; saf komutlar ve üretilen projeksiyonlar aracılığıyla raporlar. Sürdüren bir ana makine sabit bir sırayla toparlanır (incele, doğrula, yansıt, kaydedilmiş otoriteyle üret) ve eski bir parmak izini yeniden kullanılabilir bir sonuç olarak değil, yeniden çalıştırılacak geçersiz kanıt olarak ele alır. Günlük asla konuşma bağlamı olarak yeniden oynatılmaz: iş, görev başına bir [bağlam manifestosu](/spec/resources-and-abilities#the-per-task-context-manifest) ile yürütme döngüsü üzerinden sürer.

## Bir arada bulunma ve göç

v5 ve v6 hattı planlar tek bir `.dwp/plans/` içinde bir arada BULUNABİLİR ve her biri tüm ömrü boyunca kendi nesli altında çalışır. v5'ten v6'ya tek yol, doğrulanmış bir yedek ve geri alma ile açık, önizlenen bir göçtür (`refine` üzerinden çalıştırılan `migrate_v6.py`); göç ettirilen v5 geçmişi, kanıtı çözümlendiğinde `imported`, aksi hâlde `asserted` olur, asla `observed` olmaz. Ters yönde göç yoktur.

## İlgili

- [Kaynaklar ve yetenekler](/spec/resources-and-abilities) — bağlam manifestosu, kaynak zarfı, ana makine yetenekleri ve eklenti kaydı.
- [Devretme](/spec/delegation) — v7'nin bu katmana ekledikleri.
- [Plan durumu](/spec/plan-state) — korunan v5 durum katmanı.
