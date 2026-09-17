---
title: "DWP v5: vaatler, artık garanti altında"
description: "Deep Work Plan v5, köklü sekiz vaadi test edilmiş ve sürümlenmiş sözleşmelere dönüştürüyor — dürüst bir doğrulayıcı, güvenli orkestrasyon ve kanıtlanmış bir yükseltme yolu."
date: 2026-09-12
version: "v5 · Testlerle garanti altında"
kind: release
lang: tr
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Beceri yayın commit'i ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Beceri yayını v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Beceri yayını v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
---

Bugün Deep Work Plan v5'i yayınlıyoruz. Bu bir yeniden yazım değil: aylar süren gerçek kullanımın — 108 gerçek planın doğrudan denetimi de dahil — boşluk boşluk ortaya çıkardığı, metodolojinin vaatleri ile bir ajanın gerçek davranışının nerede birbirinden ayrışabildiğinin sonucu. Bu sürümün dürüst özeti şu: metodoloji bunların hepsini zaten vaat ediyordu — artık garanti ediyor. v5 öncesinde, belgeleri harfiyen izleyen bir ajan bile gerçek başarısızlık senaryolarına düşebiliyordu; bu kullanım ve geri bildirimler sayesinde tespit edilen her biri artık kapatıldı ve çalıştırılabilir bir testle sabitlendi, daha fazla düzyazıyla üzeri örtülmedi. Bu döngüde beceri paketinin sözleşme takımı 132'den 258 teste büyüdü ve aşağıdaki her garanti, yayınlanan etikete karşı canlı olarak doğrulandı — temiz bir depoya kurulup kendi akışlarından geçirildi, sonra bu yazı kaleme alındı.

**Doğrulamadığı bir başarını asla iddia etmeyen doğrulayıcı.** Uyum denetimleri eskiden sessizce bozuluyordu: yetenekli bir yorumlayıcı yokken tüm doğrulamaları atlıyor, yine de 'uyumlu' bildirimi basıyordu; bir alanın içindeki kalın metin, eksik alan sanılabiliyordu. Artık doğrulayıcı, gerçekten doğrulayamadığı her durumda açık bir `UNVERIFIED` bildirimiyle çıkıyor. Bir doğrulayıcı, kontrol etmediği bir başarıyı hiçbir zaman raporlamaz — kapılara güven tüm önerinin ta kendisidir ve kendi kontrolünü atlayabilen bir kapı bu zinciri kırar.

**Lite planlar için tek onay sözleşmesi.** "Bu planı başlatmak mevcut kapsamı onaylıyor mu?" sorusuna üç yüzey üç farklı yanıt veriyordu ve bir ajan tam en tehlikeli sınırda kilitlenebilir ya da yetkisiz çalışabilirdi. v5 her yerde tek bir sözleşme oturtuyor: açık bir execute veya resume, geçerli ready kapsamı onaylar ve herhangi bir işten önce o onayı kaydeder; beklemedeki bir öneri tek başına hiçbir şeyi yetkilendirmez; yarıda kesilmiş bir yükseltme, herhangi bir ürün işi çalışmadan önce kurtarılır.

**Bozmayan çoklu depo orkestrasyonu.** Bir orkestratör hub'ının ortam değişkeni eskiden alt depolara sızıyordu — bir alt depo, plan durumunu hub'ın kendi klasörlerine yazabiliyordu. Orkestratör şablonları `FAIL` basarken başarı koduyla çıkıyordu ve bir durum dizgisini grep'leyen tamlık denetimi, tamamlanmış tek bir görevi tamamlanmış bir plan olarak okuyabiliyordu. Artık hub kökü alt depolara geçilmeden önce kaydediliyor, her alt depo kendi `.dwp/` dizinini yalıtılmış olarak çözüyor, her başarısızlık dalı hatayla çıkıyor, tamlık planın en üst düzey durumundan ayrıştırılıyor ve devcontainer giriş noktası herhangi bir şeyi silmeden önce kopya hatalarını yukarı taşıyor.

**Eklentiler için tek bir onam matrisi.** Hangi eklenti varsayılan olarak kuruluyor, hangisi yalnızca öneriliyor ve hangi inceleme zorunlu — önceki yüzeyler farklı yanıtlar veriyordu. v5 tek bir matris ilan ediyor: AI Diff Reviewer yerel inceleme için zorunludur ve doğrulanmış bir sürüme sabitlenmiştir; CI incelemesi ise asla kendini kurmayan açık bir tercih seçeneğidir. design-system eklentisi, UI çalışması algılandığında zorunlu bir öneridir ama yalnızca açık kabul ile kurulur. dependency-upgrade eklentisi, tam anlık görüntü geri alma özelliğiyle neredeyse varsayılan, etkisiz bir delege olarak gelir; dailybot yalnızca yetkilendirildiği yerde rapor verir. Boş bir diff artık tamamlanmış bir inceleme sayılmaz.

**Uzun planlar için gerçek bir düzenek.** 108 gerçek planın denetimi, paralelleştirilebilir işin yaygın olduğunu ama sıralı yürütme kararının neredeyse hiç bildirilmediğini ve sahne kapılarının yalnızca geçici bir uygulama olarak var olduğunu gösterdi. v5, yürütme kararının her zaman bildirilmesini sağlıyor — paralelleştirme uygun değilse gerekçesi kaydedilmiş sıralı yürütme — yirmi ve daha fazla görevli planlara isteğe bağlı Stage Gates ekliyor ve Plan Variables'ı titizlik düzeyi, kanıt çıtası ve yasak eylemlerle zenginleştiriyor. Bunların hepsi aşamalı olarak yüklenir ve bir Lite plana asla yük bindirmez.

**Zorunlu Context, görev başına tek hedef.** Planlar, bağlamdan yoksun görev listelerine savrulabiliyordu ve tek bir görev, tek bir yeşil kapının ardına üç hedefi paketleyebiliyordu. v5, plan düzeyinde Goal ve Context çiftini, her yeni kayıtta görev düzeyinde bir Context — yeni bir oturumun o görevi tek başına başlatması için gereken her şey — ister (tamamlanmış kayıtlar yazıldığı gibi kalır) ve görev başına tek hedefi, yozlaşmaya karşı bir korumayla kural haline getirir.

**Güvenli bir yükseltme yolu.** `/dwp-upgrade` yeni. Denetim aşaması salt okunurdur ve hiçbir şey kurmaz; bir yükseltme yalnızca açık kabul ile başlar ve herhangi bir şeyin üzerine yazılmadan önce yerel uyarlamalar karşılaştırılıp gösterilir; kurulum tam bir etiketi hedefler ve kendini doğrular; onboarding taze bir init olarak yeniden çalışır. Bir yükseltme `.dwp/` dizinine asla dokunmaz — hiçbir plan, durum dosyası, kapı kaydı veya kanıt taşınmaz, yeniden yazılmaz ya da geçersiz kılınmaz.

**Dürüst ve ölçülebilir kanıt.** Verimlilik iddiaları artık üç taban çizgisinde — v3.0.0, v4.0.3 ve son ağaç — yeniden ölçülüyor; ölçüm betiği depoya işlenmiştir. Sonuçlar dosya sistemi baytlarıyla raporlanır ve arkasında duramayacağımız token ya da maliyet rakamlarına asla dönüştürülmez; doğrulanamayan her iddia, değerlendirme kaydında bu şekilde ayrı tutulur.

**Sürümlenmiş, yayımlanmış bir sözleşme.** Yukarıdaki her vaat, yalnızca düzyazıyla değil, başka araçların okuyabileceği verilerle destekleniyor: plan-manifest ve plan-state biçimleri artık v5 şema serisi olarak sürümleniyor — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) ve [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — böylece bir plan, bir doğrulayıcı veya üçüncü taraf bir araç, bir belge paragrafı yerine yayımlanmış, makine tarafından okunabilir bir sözleşmeye karşı uygunluğu denetleyebilir. v5 serisinde v2'ye göre şekil değişmiyor: v1 veya v2 şemalarına referans veren mevcut planlar geçerliliğini koruyor ve asla yeniden yazılmıyor.

Deep Work Plan v5, DWP standardı 5.0.0'ı izler. [Normatif belirtimi](https://deepworkplan.com/spec) okuyun, [beceri deposuna](https://github.com/DailybotHQ/deepworkplan-skill) bakın ya da benimsemeye [`/init`](https://deepworkplan.com/init) adresinden başlayın.

## Güncelleme — 2026-09-17 · beceri v5.4.0

v5 hattının ilk ara sürümü, bir planın hiç gerçekten denetlenmemiş bir iş üzerinden kapanabileceği son yolu kapatıyor ve planın kendi kanıtının nerede duracağını belirliyor. DWP standardı 5.0.0 değişmiyor: bu bir eklenti sözleşmesi ve belgelendirme yayınıdır, şema değişikliği değil.

**Hiç çalışmamış bir inceleme, artık temiz bir incelemeden ayırt edilemez değil.** Final Review'in güvenlik incelemesi, eksik bir inceleyiciyi — bulgu olarak kaydedilen — hata veren bir çağrıdan, yani bir kez uyarıp devam eden durumdan zaten ayırıyordu. Yukarı akıştaki inceleyici üçüncü bir sonuç ekledi: başlayıp ardından tek bir bulgu yazmadan sonlanan bir çalışma. Adı olmadığında bu, "inceleme tamamlandı ve bir şey bulunmadı" ile aynı kefeye giriyor ve hiç gerçekleşmemiş bir incelemeye dayanarak bir planın kapanmasına izin veriyordu. Artık kendi başına bir durum: tamamlanmamış inceleme olarak kaydedilir, değişiklik kümesinin temiz olduğunun kanıtı sayılmaz ve Final Review'i kapatmak için gerekçe olmaz. Üç ayrı sonuç — ve hiçbiri diff'in okunup temiz bulunduğu anlamına gelmez.

**Bir planın kanıtı o plana aittir.** Standart, analiz kaydını, skills defterini, güvenlik incelemesini ve kapı günlüklerini zaten planın kendi `analysis_results/` dizinine koyuyordu; ama bu münhasırlığı bir kural olarak hiç söylememişti. Bu yüzden, rapor yolu varsayılan olarak çalışma dizinini gösteren depoya ait bir denetim aracı, hiçbir akışın fark etmediği biçimde bir planın kanıtını deponun köküne yazabiliyordu. Belirtim artık bunu şart koşuyor: bir akışın bir plan hakkında ürettiği her şey o planın klasörüne gider ve varsayılan çıktısı çalışma dizini olan bir araca açık çıktı seçeneği verilmelidir. Planın söylediği yerde olmayan kanıt, kaybolmuş kanıttır — kuralın pratik gerekçesi budur, bir dosyalama tercihi değil.

**AI Diff Reviewer sabitlemesi v2.3.0'a çıkıyor.** Zorunlu yerel inceleme artık runner ile backend'i birbirinden ayıran bir inceleyici kuruyor: aynı inceleme, DWP'nin bağlı olduğu şeyi değiştirmeden uyumlu herhangi bir uç noktaya karşı çalışabiliyor — tarafsızlık güvencesi gevşemiyor, güçleniyor. Buna sağlama toplamıyla doğrulanan kurulumcular, tahmin yerine ölçüme dayanan varsayılan maliyetler ve açık bulguları taşıyarak gerçek yeni diff'i inceleyen takip turları ekleniyor. Sonuncusunun açıkça söylenmeye değer bir sözleşme sonucu var: bir modelin bir bulguyu çözülmüş ilan etmesi onu geri çekmez — geri çeken bir bakımcıdır.

**Çalışma ilkeleri artık harness ile birlikte geliyor.** Aynı gün çıkan `v5.5.0`, kuruluma alma aşamasının bir deponun agent'larına yalnızca deponun içinde ne olduğunu değil, *nasıl* çalışılacağını da öğretmesini sağlıyor: on derli toplu davranış — sonucu sahiplenmek, sormadan önce araştırmak, rutin kararları bağımsız vermek, muhakeme ya da yetki gerçekten eksikken yukarı taşımak ve tamamlandığını iddia etmeden önce doğrulamak, diğerlerinin yanı sıra — `AGENTS.md` içine satır içi yazılır; böylece yalnızca giriş noktasını okuyan bir agent da onları bulur. Bunlar bir istek kapsamındaki varsayılanlardır, yeni bir yetki değil: ana makine izinlerini, daha dar bir kapsamı, bir planın kapılarını ya da deponun kendi onay kurallarını geçersiz kılamazlar. Bir yükseltme bunları anahtar kelimeye göre değil anlama göre uzlaştırır; dolayısıyla dosyada zaten bulunan eşdeğer kurallar yeniden yazılmak yerine korunur.

Normatif metin için [belirtime](https://deepworkplan.com/spec), inceleyicinin şimdi neler yaptığı için [eklenti referansına](https://deepworkplan.com/kit/ai-diff-reviewer), kaynak için [v5.4.0 yayınına](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0) bakın.
