---
title: Loop engineering
description: "İnsanın başlattığı bir daemon’un onaylı Deep Work Plan’ları kayıt, halefiyet, dürtmeler, olaylar ve bildirimlerle kayıtlı yetki içinde nasıl ilerlettiği."
order: 8
lang: tr
summary: Onaylı bir planı kayıtlı yetkisi içinde ilerlemede tutan uçtan uca yaşam döngüsü.
icon: repeat
---

# Loop engineering

**Önce spesifikasyon, kapalı döngü: depo harness’tir ve plan kendi kendine bitene kadar çalışır.** Bu bölüm, ilk yürütme turundan sonra planı ilerlemede tutan isteğe bağlı mekanizmayı açıklar. Plan kalıcı spesifikasyon olarak kalır; döngü yeni yetki değil, süreklilik sağlar.

## Planı kaydedin

Herdr eklentisi etkin olduğunda paketin `execute` akışı planın lider kaydını üstlenir (`resume` de onu yeniden üstlenir) ve plan halefleri adlandırıyorsa bir halefiyet ekler; haleflere devir yalnızca kaydedilmiş bir halefiyet için çalışır. Bu kayıt döngüye izleyeceği kesin planı, mevcut lideri, epoch’u ve sıralı halefleri verir. Lider kaydı olmayan planlar izlenmez. Eklenti isteğe bağlı kalır: o olmadan da temel metodoloji tek bir oturumda veya insanın koordine ettiği bir devirle çalışır.

Plan kaydı işi onaylamaz ve planın yetkisini genişletmez. v8’de onaylı bir plan, o planda kayıtlı yetki içinde sonuna kadar çalışır. Kabul kriterleri ve kapıları yürütme boyunca bağlayıcı kalır.

## Daemon’u elle başlatın

Herdr ortamında `herdr-peers autopilot --loop` komutunu bir insan başlatır. Bu, yerel bir arka plan daemon’udur; oturum açma öğesi veya sistem hizmeti değildir. Etkin makinelerdeki kayıtlı planları izler ve planı açık kaldığında, hiçbir şerit çalışmadığında ve bekleyen bir yanıt olmadığında boşta duran lideri devam etmesi için dürter. İstem sabittir: kapılarına ve kayıtlı yetkisine uyarak onaylı planı sonuna kadar sürdürmek.

Daemon bir oturum açmaya, kimlik bilgisi istemine veya Claude’un bypass-permissions onayına dokunmaz. Bir reddetme seçeneğini, serbest metin seçeneğini veya bir ajanın izinlerini genişleten bir satırı asla seçmez. Bir dürtme yalnızca bir ajandan devam etmesini ister; yetki eklemez. Lider engelleri kaydetmeyi ve planın kapılarına uymayı sürdürür. İlerleme olmadan geçen üç istemden sonra daemon dürtmeyi bırakır ve `plan_stalled` bildirir.

## Liderliği çitli tutun

Lider ortadan kalkarsa daemon, listedeki erişilebilen ilk haleften devralma prosedürünü çalıştırmasını ister. Lider kaydı epoch ile ilerler ve alıcılar halefiyet sırasını uygular. Protokol 2 lider atamasını da destekler, ancak yalnızca insan izni planda kaydetmişse (`lead claim --allow-appointment`) ve daemon’u `--appoint` ile başlatmışsa; daemon bu izni kendisi veremez. Herhangi bir birleştirme, etiket veya sürümden önce mevcut lider, kaydı planın makinelerinde denetlemek için `herdr-peers lead verify --plan <id>` komutunu çalıştırır.

Bir halef planı ve kapılarını devralır. Ne halefiyet ne de atama kabul kriterlerini değiştirir ya da kayıtlı yetkinin dışındaki işe izin verir. Plan, C1–C7 kurallarına göre insan eylemi gerektiren bir kapıya ulaşırsa döngü bu ihtiyacı bildirir ve o kapıda durur. Kimlik bilgileri ve oturum açmalar da insan eylemi olarak kalır. Diğer ilerlemelerde insandan her adımı gözetmesi istenmez; insan bilgilendirilir.

## İsteğe bağlı beyin ve kuyruk

İsteğe bağlı `--brain`, daemon kurallarının çözemediği durumlar için ayrılmış bir karar ajanı başlatır. coding-agents-kit 1.3.0 veya sonrasını gerektirir; o olmadan `--brain` ile başlatılan bir daemon başlamayı reddeder. Beyin yalnızca daemon’un her durum için belirlediği kapalı bir eylem listesinden seçim yapabilir: bir dürtme daha, planın liderce çözülebilir olarak işaretlediği bir engeli çözmesi için lidere tek bir sabit istek, insanı bilgilendirmek ya da durumu olduğu gibi bırakmak. Tek eyleyen daemon olarak kalır: bir seçimi doğrular ve uygun bir eylemi gerçekleştirir; beynin serbest metni asla yürütülmez. v8’de bir plan, bir beynin onun üzerinde hareket edip edemeyeceğini de otonomi bloğuna kaydeder.

Plan kuyruğu `.dwp/queue.json` konumundaki `dwp-queue-v1` belgesini kullanır. Onu plan aracı yazar; daemon sınırlı, salt okunur bir tüketicidir. Kuyruktaki bir plan, `after` bağımlılığı tamamlandığında (veya yoksa) ve onayı geçerli kaldığında uygun hâle gelir. Daemon onu yalnızca kuyruğun adlandırdığı lidere tek bir sabit istem göndererek başlatır: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Bir `launch` girdisi bu döngü tarafından başlatılmaz. Kuyruk durumu, yürütme ve sonlandırma ilerledikçe paket tarafından tutulur.

## Bildirin ve gözlemleyin

Plan olayları; takılan, engellenen, liderini kaybeden veya tamamlanan bir planı ve başlayan ya da başlayamayan kuyruktaki bir planı kapsar. İsteğe bağlı `--notify` komutu, desteklenen olaylar için bir `plan-event-v1` nesnesi alır; paketin Dailybot bildiricisi bunları ekip güncellemelerine dönüştürür. Bildirimler ilerlemeyi veya bir engeli raporlar; bir eylemi yetkilendirmez ve plan kaydının yerini almaz.

Filo raporu ve `herdr-peers fleet ui`, dikkat gerektiren işler dâhil, makineler arasındaki ajanları ve planları gösterir. Arayüz salt okunurdur: plan durumu yazmaz ve hiçbir ajana istem göndermez. Bir insanın döngünün durumunu, başka bir kontrol düzlemine dönüşmeden görmesine yardım eder.

## Sınır

Loop engineering, yürütme döngüsünü onaylı bir spesifikasyonun etrafında kapatır. Devam etmeyi, halefiyeti ve raporlamayı olağan hâle getirirken plan yetkinin kaynağı, daemon da sınırlı kalır. İnsan daemon’u başlatır, kimlik bilgileri ve oturum açmalarla ilgilenir ve yalnızca planın kendi C1–C7 kapılarını veya kayıtlı yetkinin karşılayamadığı diğer ihtiyaçları çözer. Döngünün amacı, onaylı bir planın insan gözetimi gerektirmeden tanımlı sonuna ulaşmasıdır.
