---
title: Döngü mühendisliği
description: "İnsan tarafından başlatılan daemon, onaylı Deep Work Plan’ları kayıt, halefiyet, hatırlatma ve bildirimlerle kayıtlı yetki sınırlarında tamamlatır."
order: 8
lang: tr
summary: Onaylı planı kayıtlı yetkisi içinde ilerleten uçtan uca döngü.
icon: repeat
---

# Döngü mühendisliği

**Önce belirtim, kapalı döngü: depo harness'tir ve plan kendi kendine sonuna kadar yürür.** Bu bölüm, ilk yürütme turundan sonra planı ilerleten isteğe bağlı mekanizmayı açıklar. Plan kalıcı belirtimdir; döngü süreklilik sağlar, yeni yetki vermez.

## Planı kaydetme

Herdr eklentisi etkin olduğunda pack'in `execute` akışı planın lead kaydını üstlenir ve halefiyet sırasını kaydeder. Kayıt planı, mevcut lead'i, epoch'u ve döngünün izleyeceği sıralı halefleri belirtir. Lead kaydı olmayan planlar izlenmez. Eklenti isteğe bağlıdır; temel yöntem tek oturumda veya insan koordinasyonlu devirle çalışır. Kayıt işi onaylamaz ve yetkiyi genişletmez. v8'de onaylı plan, kendi kaydındaki yetki kapsamında sona kadar yürür; kabul ölçütleri ve gates geçerliliğini korur.

## Daemon'ı insan başlatır

İnsan, Herdr ortamında `herdr-peers autopilot --loop` komutunu başlatır. Bu yerel bir arka plan daemon'ıdır; oturum açma öğesi veya sistem hizmeti değildir. Etkin makinelerdeki kayıtlı planları izler; plan açıksa, hiçbir lane çalışmıyorsa ve yanıt beklenmiyorsa boşta kalan lead'e devam etmesini hatırlatır. Sabit mesaj, kayıtlı yetki ve gates'e uyarak onaylı planı tamamlamasını ister.

Daemon oturum açmaya, kimlik bilgisi istemlerine veya Claude'un bypass-permissions onayına dokunmaz. Reddetme seçmez, ekrandaki serbest metni çalıştırmaz ve izin oluşturmaz. Hatırlatma yalnızca devam etmeyi ister, yetki eklemez. Lead engelleri kaydetmeye ve gates'e uymaya devam eder. İlerleme olmadan üç hatırlatmanın ardından daemon durur ve `plan_stalled` bildirir.

## Liderliği koruma

Lead kaybolursa daemon listedeki ilk erişilebilir halefinden takeover yordamını çalıştırmasını ister. Kaydın epoch'u artar ve alıcılar halefiyet sırasını uygular. Protocol 2 lead atamasını da destekler, ancak yalnızca insan plan üzerinde açıkça izin verirse; daemon bu izni kendisi veremez. Her merge, tag veya release öncesi mevcut lead `herdr-peers lead verify --plan <id>` çalıştırıp plan makinelerindeki kaydı doğrular. Halef planı ve gates'i devralır; ek yetki kazanmaz. C1–C7 kurallarına göre insan eylemi gerektiren gate'e gelinirse döngü ihtiyacı bildirir ve orada durur. Kimlik bilgileri ile oturum açma da insana aittir. Diğer ilerlemeler için her adımın gözetimi istenmeden insan bilgilendirilir.

## İsteğe bağlı brain ve kuyruk

İsteğe bağlı `--brain`, daemon kurallarının çözemediği durumlar için ayrı bir karar agent'ı başlatır. Brain yalnızca planın izin verdiği kapalı eylem listesinden seçim yapabilir. Tek eyleyen daemon'dır: seçimi doğrular ve uygun eylemi gerçekleştirir; brain'in serbest metnini asla çalıştırmaz. Planda açık yetki yoksa brain plan üzerinde işlem yapmaz.

Kuyruk, `.dwp/queue.json` içindeki `dwp-queue-v1` belgesini kullanır. Yalnızca pack yazar; daemon sınırlı, salt okunur tüketicidir. `after` bağımlılığı tamamlanmış veya yoksa ve onay geçerliyse plan hazırdır. Daemon yalnızca kayıtlı lead'e sabit mesaj göndererek başlatır: “P planı bu deponun kuyruğunda sıradaki ve onaylı; gates'e uyarak sonuna kadar yürüt.” Döngü `launch` girdilerini başlatmaz. Yürütme ve tamamlama sırasında kuyruk durumunu pack yönetir.

## Bildirme ve gözlemleme

Plan olayları sıraya alınma, başlama, engellenme, duraklama, lead kaybı ve tamamlanmayı kaydeder. İsteğe bağlı `--notify`, desteklenen olaylar için `plan-event-v1` nesnesi alır; pack'in Dailybot bildiricisi bunları ekip güncellemelerine dönüştürür. Bildirimler ilerlemeyi veya engeli aktarır; işlem yetkilendirmez ve plan kaydının yerini almaz. Filo raporu ve `herdr-peers fleet ui` makineler arasındaki agent'ları ve planları gösterir. Arayüz salt okunurdur; plan durumunu yazmaz ve agent'ları dürtmez.

## Sınır

Döngü mühendisliği yürütmeyi onaylı belirtimin çevresinde tamamlar. Plan yetkinin kaynağı, daemon sınırlı kalırken devam, halefiyet ve raporlama olağanlaşır. İnsan daemon'ı başlatır, kimlik bilgileri ve oturum açmayla ilgilenir, yalnızca planın C1–C7 gates'ini veya kayıtlı yetkinin karşılamadığı ihtiyaçları çözer. Amaç, onaylı planın sürekli insan gözetimi olmadan tanımlı sonuna ulaşmasıdır.
