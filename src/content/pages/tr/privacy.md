---
title: "Gizlilik politikası"
description: "deepworkplan.com gizlilik politikası: hesap, reklam ve siteler arası takip içermeyen statik bir site, çerezsiz toplu analitik ve iletişim formunun tam olarak ne topladığının sade bir açıklaması."
---

## Site nedir

deepworkplan.com, bir CDN üzerinden sunulan statik sayfalar bütünüdür. Giriş, kullanıcı veritabanı ve kişisel profil depolama yolu yoktur. İçerik, DailybotHQ organizasyonu altındaki herkese açık GitHub depolarında geliştirilir; burada okuduğunuz her şey tam olarak derlendiği gibi sunulur.

## Analitik

Site, sayfa görüntülemelerini toplu olarak saymak için çerezsiz ve gizlilik öncelikli bir analitik hizmeti olan Umami'yi kullanır. Umami takip çerezi yerleştirmez ve siteler arası profil oluşturmaz. Yapay zeka tarayıcıları JavaScript çalıştırmadığı için, sunucu tarafındaki bir edge fonksiyonu ayrıca otomatik bot ziyaretlerinin kullanıcı aracısını ve yolunu anonim analitik olayları olarak kaydeder — bu, tarayıcı yazılımını tanımlar (örneğin "GPTBot /init adresini ziyaret etti"), asla insan bir ziyaretçiyi değil.

## Çerezler ve yerel depolama

Site hiçbir takip çerezi yerleştirmez. Tarayıcınızda depolanan tek şey, localStorage içinde tutulan bir tema tercihidir (açık veya koyu mod); bu tercih cihazınızdan asla çıkmaz ve hiçbir yere iletilmez. Tarayıcı depolamanızı temizlerseniz site, yalnızca sistem varsayılan temanıza döner.

## Üçüncü taraf hizmetler

Barındırma ve teslimat Cloudflare Pages üzerinde çalışır; Cloudflare, CDN'yi işletmek ve kötüye kullanımı engellemek kapsamında kenar noktasındaki istek günlüklerini ve IP adreslerini kendi gizlilik politikası uyarınca işler. Toplu analitik Umami üzerinde çalışır (cloud.umami.is). İletişim formunu gönüllü olarak gönderirseniz yanıtlarınız, Google Forms üzerinden ekibimize iletilir — yazdığınız bilgilerin toplandığı tek yer burasıdır ve yalnızca size yanıt vermek için kullanılır.

## Yapmadığımız şeyler

Kişisel veri satmayız veya paylaşmayız; reklam veya yeniden pazarlama pikseli çalıştırmayız, tarayıcı parmak izi almayız, pazarlama e-postası göndermeyiz. Sitede bülten kaydı ve yukarıda açıklanan toplu, çerezsiz sayımların ötesinde telemetri yoktur.

## Seçenekleriniz

Buradaki analitik toplu ve çerezsiz olduğu için dışa aktarılacak veya silinecek kişisel profil yoktur. Analitik betiğini, sitenin çalışmasını etkilemeden herhangi bir içerik engelleyiciyle engelleyebilirsiniz. İletişim formunu gönderdiyseniz ve iletinizin silinmesini istiyorsanız aşağıdaki iletişim adresine yazın; iletiyi kaldırırız.

## Bu politikadaki değişiklikler

Bu politikada önemli bir değişiklik olursa [politika sayfasındaki](https://deepworkplan.com/privacy) güncellenme tarihi de değişir ve öz değişiklikler, herkesin geçmişi inceleyebileceği herkese açık web sitesi deposuna işlenir.

## İletişim ve güvenlik

Gizlilik soruları için [security@dailybot.com](mailto:security@dailybot.com) adresine yazın. Bir güvenlik açığını bildirmek isterseniz, web sitesi ve skill depoları için GitHub'ın özel güvenlik açığı bildirme özelliğini tercih edin — kesin adresler için [security.txt](https://deepworkplan.com/.well-known/security.txt) dosyasına bakın.
