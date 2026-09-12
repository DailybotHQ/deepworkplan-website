---
title: "DWP v5: vaatler, artık garanti altında"
description: "Deep Work Plan v5, köklü sekiz vaadi test edilmiş sözleşmelere dönüştürüyor — dürüst bir doğrulayıcı, tek bir onay kuralı, bozmayan orkestrasyon ve güvenli bir yükseltme yolu."
date: 2026-09-12
version: "v5 · Testlerle garanti altında"
kind: release
lang: tr
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Bugün Deep Work Plan v5'i yayınlıyoruz. Bu sürümün dürüst özeti şu: metodoloji bunların hepsini zaten vaat ediyordu — artık garanti ediyor. v5 öncesinde, belgeleri harfiyen izleyen bir ajan bile gerçek başarısızlık senaryolarına düşebiliyordu; bunların her biri artık kapatıldı ve çalıştırılabilir bir testle sabitlendi. Bu döngüde beceri paketinin sözleşme takımı 132'den 258 teste büyüdü ve aşağıdaki her garanti, yayınlanan etikete karşı canlı olarak doğrulandı — temiz bir depoya kurulup kendi akışlarından geçirildi, sonra bu yazı kaleme alındı.

**Doğrulamadığı bir başarını asla iddia etmeyen doğrulayıcı.** Uyum denetimleri eskiden sessizce bozuluyordu: yetenekli bir yorumlayıcı yokken tüm doğrulamaları atlıyor, yine de 'uyumlu' bildirimi basıyordu; bir alanın içindeki kalın metin, eksik alan sanılabiliyordu. Artık doğrulayıcı, gerçekten doğrulayamadığı her durumda açık bir `UNVERIFIED` bildirimiyle çıkıyor. Bir doğrulayıcı, kontrol etmediği bir başarıyı hiçbir zaman raporlamaz — kapılara güven tüm önerinin ta kendisidir ve kendi kontrolünü atlayabilen bir kapı bu zinciri kırar.

**Lite planlar için tek onay sözleşmesi.** "Bu planı başlatmak mevcut kapsamı onaylıyor mu?" sorusuna üç yüzey üç farklı yanıt veriyordu ve bir ajan tam en tehlikeli sınırda kilitlenebilir ya da yetkisiz çalışabilirdi. v5 her yerde tek bir sözleşme oturtuyor: açık bir execute veya resume, geçerli ready kapsamı onaylar ve herhangi bir işten önce o onayı kaydeder; beklemedeki bir öneri tek başına hiçbir şeyi yetkilendirmez; yarıda kesilmiş bir yükseltme, herhangi bir ürün işi çalışmadan önce kurtarılır.

**Bozmayan çoklu depo orkestrasyonu.** Bir orkestratör hub'ının ortam değişkeni eskiden alt depolara sızıyordu — bir alt depo, plan durumunu hub'ın kendi klasörlerine yazabiliyordu. Orkestratör şablonları `FAIL` basarken başarı koduyla çıkıyordu ve bir durum dizgisini grep'leyen tamlık denetimi, tamamlanmış tek bir görevi tamamlanmış bir plan olarak okuyabiliyordu. Artık hub kökü alt depolara geçilmeden önce kaydediliyor, her alt depo kendi `.dwp/` dizinini yalıtılmış olarak çözüyor, her başarısızlık dalı hatayla çıkıyor, tamlık planın en üst düzey durumundan ayrıştırılıyor ve devcontainer giriş noktası herhangi bir şeyi silmeden önce kopya hatalarını yukarı taşıyor.

**Eklentiler için tek bir onam matrisi.** Hangi eklenti varsayılan olarak kuruluyor, hangisi yalnızca öneriliyor ve hangi inceleme zorunlu — önceki yüzeyler farklı yanıtlar veriyordu. v5 tek bir matris ilan ediyor: AI Diff Reviewer yerel inceleme için zorunludur ve doğrulanmış bir sürüme sabitlenmiştir; CI incelemesi ise asla kendini kurmayan açık bir tercih seçeneğidir. design-system eklentisi, UI çalışması algılandığında zorunlu bir öneridir ama yalnızca açık kabul ile kurulur. dependency-upgrade eklentisi, tam anlık görüntü geri alma özelliğiyle neredeyse varsayılan, etkisiz bir delege olarak gelir; dailybot yalnızca yetkilendirildiği yerde rapor verir. Boş bir diff artık tamamlanmış bir inceleme sayılmaz.

**Uzun planlar için gerçek bir düzenek.** 108 gerçek planın denetimi, paralelleştirilebilir işin yaygın olduğunu ama sıralı yürütme kararının neredeyse hiç bildirilmediğini ve sahne kapılarının yalnızca geçici bir uygulama olarak var olduğunu gösterdi. v5, yürütme kararının her zaman bildirilmesini sağlıyor — paralelleştirme uygun değilse gerekçesi kaydedilmiş sıralı yürütme — yirmi ve daha fazla görevli planlara isteğe bağlı Stage Gates ekliyor ve Plan Variables'ı titizlik düzeyi, kanıt çıtası ve yasak eylemlerle zenginleştiriyor. Bunların hepsi aşamalı olarak yüklenir ve bir Lite plana asla yük bindirmez.

**Zorunlu Context, görev başına tek hedef.** Planlar, bağlamdan yoksun görev listelerine savrulabiliyordu ve tek bir görev, tek bir yeşil kapının ardına üç hedefi paketleyebiliyordu. v5, plan düzeyinde Goal ve Context çiftini, her yeni kayıtta görev düzeyinde bir Context — yeni bir oturumun o görevi tek başına başlatması için gereken her şey — ister (tamamlanmış kayıtlar yazıldığı gibi kalır) ve görev başına tek hedefi, yozlaşmaya karşı bir korumayla kural haline getirir.

**Güvenli bir yükseltme yolu.** `/dwp-upgrade` yeni. Denetim aşaması salt okunurdur ve hiçbir şey kurmaz; bir yükseltme yalnızca açık kabul ile başlar ve herhangi bir şeyin üzerine yazılmadan önce yerel uyarlamalar karşılaştırılıp gösterilir; kurulum tam bir etiketi hedefler ve kendini doğrular; onboarding taze bir init olarak yeniden çalışır. Bir yükseltme `.dwp/` dizinine asla dokunmaz — hiçbir plan, durum dosyası, kapı kaydı veya kanıt taşınmaz, yeniden yazılmaz ya da geçersiz kılınmaz.

**Dürüst ve ölçülebilir kanıt.** Verimlilik iddiaları artık üç taban çizgisinde — v3.0.0, v4.0.3 ve son ağaç — yeniden ölçülüyor; ölçüm betiği depoya işlenmiştir. Sonuçlar dosya sistemi baytlarıyla raporlanır ve arkasında duramayacağımız token ya da maliyet rakamlarına asla dönüştürülmez; doğrulanamayan her iddia, değerlendirme kaydında bu şekilde ayrı tutulur.

Deep Work Plan v5, DWP standardı 4.0.0'ı izler. [Normatif belirtimi](https://deepworkplan.com/spec) okuyun, [beceri deposuna](https://github.com/DailybotHQ/deepworkplan-skill) bakın ya da benimsemeye [`/init`](https://deepworkplan.com/init) adresinden başlayın.
