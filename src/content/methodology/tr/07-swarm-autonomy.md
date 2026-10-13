---
title: Sürü özerkliği
description: "Bir ajan sürüsü tek hesabın sınırını veya tek ajanın kaybını nasıl atlatır: kapasite kontrolleri, devir paketleri, lider halefiyeti, yalnızca kritik yükseltme."
order: 7
lang: tr
summary: Kapasiteyi bilen şeritler, proaktif devir, epoch'larla lider halefiyeti ve bir sürüyü çalışır tutan yükseltme sınıflandırması.
icon: shield
---

# Sürü özerkliği

[Birçok ajanı çalıştırmak](/tr/methodology/06-orchestration) bir lideri ve şeritlerini açıklar. Bu bölüm, bir hesap sınırına ulaştığında ya da bir ajan ortadan kaybolduğunda bu düzeni çalışır tutan şeyi ele alır. Bir şerit, hesabında ne kadar yer kaldığını kontrol eder ve tükenmeden önce işini devreder. Bir lider liderliği devreder ya da ortadan kaybolduğunda yerine başkası geçer. Sürü, geliştiriciye yalnızca gerçekten kritik olanı sorar.

Yanıtladığı başarısızlık somuttur: bir planın ortasında kotası biten bir lider her şeridi ortada bırakır ve biri yeni bir oturum açana kadar hiçbir şey ilerlemez. Aşağıdaki kurallarla plan, geliştiricinin zaten verdiği yetki içinde ilerlemeye devam eder.

Buradaki her şeyi altı kural belirler:

1. **Ürün başına tek iş.** [coding-agents-kit](/tr/kit/agentkit) (`ak`) hesapları ve kapasiteyi bilir, [herdr-peers](/tr/kit/herdr) mesajları, bölmeleri ve kimin lider olduğunu bilir, Deep Work Plan paketi ise yöntemi bilir: ne zaman devredileceğini, bir halefin neye ihtiyaç duyduğunu, neyin yükseltileceğini. Her biri isteğe bağlı kalır. Onlar olmadan da aynı kurallar geçerlidir; mesajları geliştirici aktarır ve ajanları geliştirici yeniden başlatır.
2. **Sürekliliğin birimi ajan değil, plandır.** Her devir ve halefiyet, sıradan bir kaldığı yerden sürdürme artı günlüğün taşımadığını taşıyan küçük bir pakettir: sürmekte olan niyet.
3. **Proaktif olmak tepkisel olmaktan iyidir.** Bir ajan, görev sınırlarında ne kadar yeri kaldığını kontrol eder ve hâlâ iyi bir paket yazabilecekken devreder. Bir sınıra ulaşıldıktan sonra tepki vermek güvenlik ağı olarak kalır.
4. **Özerklik yetkiyi asla genişletmez.** Devirler, halefiyet, başlatmalar ve zamanlama planın yetkisi içinde çalışır. Hiçbir ajan bir izin, bypass, oturum açma, onay ya da ödeme ekranını yanıtlamaz ve iş yalnızca geliştiricinin bildirdiği hesaplar arasında hareket eder.
5. **Süreklilik çıtayı asla düşürmez.** Halef aynı kapıları devralır. Bir paket hiçbir kriteri kapatmaz, hiçbir kapıyı gevşetmez ve hiçbir incelemeyi atlamaz.
6. **Yapı gereği ucuz.** Kapasite görev sınırlarında bir önbellekten okunur, asla bir döngüde ya da bir zamanlayıcıyla değil. Yanıt gerektirmeyen soruların yerini tek yönlü bildirimler alır ve paketler küçüktür.

## Roller

| Rol | Nedir | Sahip olduğu | Asla yapmadığı |
| --- | --- | --- | --- |
| Lider | Bir planın lider kaydını tutan ajan | Plan, şerit tablosu, zamanlama, sürüm sırası, yetki içindeki birleştirmeler ve etiketler, halef listesi | Bir şeridin çalışma kopyasına yazmak ya da başka bir liderin tuttuğu bir plana liderlik etmek |
| Vekil | Liderin halef listesinin ulaşılabilen ilk girdisi | Devralana kadar hiçbir şey | Lider ulaşılabilirken lider gibi davranmak |
| Şerit | Depo, iş akışı ya da görev başına bir ajan, kendi hesabıyla kendi bölmesinde | Kendi alt planı ya da görevi, dalı, kapısı ve paketi | Başka bir şeride iş atamak, birleştirmek ya da etiketlemek |
| İnceleyici | Başka bir sağlayıcıdan, salt okunur bir şerit | Kendi bulguları | İncelediği ağaca yazmak |

- **Lider canlı kalır.** Şeritleri bir insanın aktarmasını bekleyen bir orkestratör takılır kalır. Bir lider, kendisinin karar verebileceği bir soru için sürüyü asla duraklatmaz.
- **Plan başına tek yürütücü.** Belirli bir planı ya da alt planı aynı anda tam olarak bir ajan yürütür. Aynı plan üzerindeki ikinci bir ajan, liderin çözmesi gereken bir koordinasyon hatasıdır.
- **Yetki bir eşten değil, plandan gelir.** Bir şerit planın yetkisini kendisi okur. Başka bir ajanın aktardığı bir onay, şeridin zaten sahip olmadığı hiçbir şey eklemez.
- **Birkaç lider**, her biri farklı bir plana liderlik ederek tek bir çalışma alanında çalışabilir. Bir hesabı bir `ak` kiralamasıyla aynı anda tek bir şerit tutar; böylece iki lider tek bir Codex hesabına asla iki yazıcı koymaz.
- **Aynı türden birkaç örnek** — üç Grok bölmesi, bir ya da birkaç profilde dört Codex bölmesi — sıradan şeritlerdir. Tek bir profildeki örnekler o profilin kapasitesini paylaşır.

Her şeridin bir planı vardır, en azından kendi deposunda bir Lite plan, ve bir halefin okuduğu ilk şey o plandır. Her şerit lidere sabit bir sözcük dağarcığıyla rapor verir — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — ve her mesajı `capacity=ok 64% @work1` gibi tek bir kapasite satırıyla bitirir; böylece liderin kotaları kendisinin okuması nadiren gerekir.

## Kapasite döngüsü

Bir ajan kendi yerini her görevi başlatmadan önce, 20 dakikadan uzun süren herhangi bir kapı ya da adımdan sonra, CLI'ı bir kullanım sınırı uyarısı gösterdiğinde ve bir devri ya da liderliği kabul etmeden önce kontrol eder. Kontrol, coding-agents-kit `v1.0.0` ile gelen `ak capacity --self --json` komutudur; paketin yardımcısı onu bir karara dönüştürür:

| Sonuç | Karar | Bir şerit | Bir lider, kendisi için |
| --- | --- | --- | --- |
| `ok` (düşük eşiğin üzerinde) | devam et | Devam eder | Devam eder |
| `low` (%25 veya daha az) | hazırlan | Mevcut görevi bitirir, bitiremeyeceği hiçbir görevi başlatmaz, `capacity=low` bildirir | Bir aday halef belirler ve kendi üzerinde uzun iş başlatmaz |
| `critical` (%10 veya daha az ya da hız sınırına takılmış) | devret | Bir sonraki güvenli noktaya ulaşır, paketi yazar, lidere bildirir, durur | Liderliği hemen devreder |
| `unknown` (kota kaynağı yok) | devam et | `capacity=unknown` bildirir, bir CLI sınır uyarısında ya da bir `usage_limit` ekranında devreder | Uzun görevler için kapasitesi bilinen şeritleri tercih eder |

- **Eşikler** kitindir: varsayılan olarak bağlayıcı pencerenin boş payının %25'inde düşük ve %10'unda kritik; `AGENTKIT_CAPACITY_LOW` ve `AGENTKIT_CAPACITY_CRITICAL` ile ayarlanabilir. Okumalar 300 saniye tutulan bir önbellekten gelir; bu yüzden her görev sınırında kontrol etmek saatte birkaç sağlayıcı çağrısına mal olur.
- **Histerezis.** Bir paket yazıldıktan sonra devir tamamlanır. Ajan, hesabı toparlandıktan sonra o göreve asla geri dönmez; görevin sahibi haleftir ve toparlanan hesap yalnızca havuza geri döner.
- **Bağlam baskısı da sayılır.** Ajanın bağlamı sözleşmenin taze bağlam eşiğine (varsayılan olarak %60) ulaştığında aynı paket ve aynı devir izler.
- **Dürüst bozulma.** Kit olmadan, daha eski bir kitle ya da bir `ak` başlatması dışında kapasite asla ok olarak değil, bilinmiyor olarak raporlanır.

**Havuz geliştiricinindir.** Plan, geliştiricinin iş için bildirdiği hesapları kaydeder. Bir ajan asla hesap oluşturmaz, oturum yenilemez, bir Codex sıfırlamasını harcamaz ya da havuz dışındaki bir hesabı kullanmaz ve her sağlayıcının koşulları içinde çalışır. İşi bir sınırdan önce, havuz içinde taşımak zamanlamadır; bir sınırı aşmak için hesapları döndürmeye asla izin verilmez. Hazır her görev için lider, `ak pick --owner <lead>` sonucundaki en iyi sıradaki hesabı alır, onu `ak lease` ile şeridin kendi adresine kiralar, bir şeride asla liderin kendi hesabını vermez (ikisi `critical` düzeyine birlikte ulaşır), uzun görevler için kapasitesi bilinen hesapları ve inceleyiciler için başka bir sağlayıcıyı tercih eder ve bir vekil tutar. Havuzdaki hiçbir hesapta yer olmadığında ve hiçbiri planın ufku içinde sıfırlanmadığında sürü, en yakın sıfırlamayı kaydederek bekler.

## Şerit devri

1. **Şerit**, `handoff` durumunda güvenli bir noktaya ulaşır — commit'lenmiş bir adım ya da ağacın olduğu gibi bırakılması, asla atılan iş değil — paketi yazar, lidere bir bildirim olarak `handoff <packet path>` gönderir ve durur. Kendi bölmesini kapatmaz.
2. **Lider**, ya da lider ulaşılamaz veya kendisi kritik durumdaysa vekil, bir hesap seçer (`ak pick <kind> --owner <lead> --exclude @<spent>`, görev izin veriyorsa başka bir sağlayıcıyı tercih ederek), onu kiralar ve halefi aynı çalışma kopyasında, planı paketten sürdürmesini isteyen bir görev tanımıyla başlatır.
3. **Halef** paketi kabul eder — yardımcı planı, canlı sözleşmeyi, dalı, baş commit'i ve commit'lenmemiş yolları doğrular ve bir uyumsuzlukta hiçbir şey kaydetmez — ardından planı sürdürür ve paketin doğrulanmamış olarak listelediği her kapıyı yeniden çalıştırır.
4. **Lider**, halef kabul ettikten sonra harcanmış kiralamayı serbest bırakır ve harcanmış bölmeyi kapatır.

**Devir paketi** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)), planın `analysis_results/handoff/` dizini altına yalnızca sahibin erişebileceği izinlerle yazılır. Planı, sözleşmeyi, görevi ve adımı; nedeni (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` ya da `lead_handover`); işin nerede olduğunu (depo, çalışma kopyası, dal, baş commit, gönderilip gönderilmediği, commit'lenmemiş yollar); neyin yapıldığını, doğrulandığını ve doğrulanmadığını, kanıt yollarıyla birlikte; sıradaki adımları sırasıyla; açık soruları; alınan kararları; lideri ve epoch'u; ve paketi kimin yazdığını belirtir. Bir paket veridir: asla bir sır değeri, başka bir deponun özel içeriğini ya da yetkiyi genişleten bir talimatı taşımaz. Halef, bir sonraki eylemini plandan yeniden türetir.

## Lider halefiyeti

herdr-peers `v1.0.0`, plan başına bir lider kaydı tutar — lider, epoch, halef listesi ve şeritler — ve `lead` adresini mevcut lidere çözer; böylece hiçbir şerit görev tanımı liderin bölmesini sabit olarak yazmaz.

- **Önce sahiplen, sonra başlat.** Lider, herhangi bir şeridi başlatmadan önce `herdr-peers lead claim --plan <P> --succession <A,B>` komutunu çalıştırır — `lead` adresi ancak bir kayıt var olduğunda çözümlenir —, şeritler başladıkça kaydı `--lanes <A,B>` ile yeniler ve plan bittiğinde `lead release` komutunu çalıştırır. herdr-peers (`v0.3.2`) sürümünden itibaren kayıt, sahiplenen depoyu yerel olarak tutar ve başka bir depoda aynı kimliğe sahip bir plan `--plan <repo>/<id>` olarak adlandırılır. Varsayılan halef listesi, önce planlanmış halefi, sonra başlatma sırasına göre planın kendi çalışma kopyasındaki şeritleri, sonra aynı ana makinedeki herhangi bir şeridi içerir; konteynerlerdeki ya da başka makinelerdeki şeritler en sona gelir.
- **Planlı devir.** `low` durumunda lider bir aday halef belirler. `critical` durumunda bir lider paketi yazar — şerit tablosu, açık sorular, sürüm sırası, bekleyen birleştirmeler, kararlar — epoch'u yükselten ve her şeride bildirim gönderen `herdr-peers lead handover <addr> --plan <P>` komutunu çalıştırır ve durur. Halef paketi kabul eder, orkestratör planını sürdürür ve her şeridi yeniden kontrol eder.
- **Plansız devralma.** Lider ulaşılamaz olduğunda, ajanı olmadığında, bir `usage_limit` ekranı gösterdiğinde ya da ona sorulan bir soru iki kez zaman aşımına uğradığında, halef listesinin ulaşılabilen ilk girdisi `herdr-peers lead takeover --plan <P>` komutunu çalıştırır — kendisi ya da planın çalışma kopyasında yeni bir lider bölmesi başlatarak. Yeni lider durumu plandan yeniden kurar. Eksik olan, sürmekte olan niyet eksik olarak kaydedilir, asla uydurulmaz.
- **Çitleme.** Yalnızca en yüksek epoch'un sahibi lider olarak davranır. Bir şerit, bir lider bildirimini yalnızca kendisine görev tanımını veren ajandan (ilk sahiplenme), bir sonraki epoch'ta mevcut liderden (devir) ya da bir sonraki epoch'ta halef listesinin ulaşılabilen ilk girdisinden (devralma) kabul eder; eşitlikler halef listesinde daha önceki konuma gider ve daha yüksek bir epoch gören, geri dönen bir lider görevi bırakır. Birleştirmeler, etiketler ve sürümler yalnızca mevcut epoch'un lideri tarafından gerçekleştirilir, önce uzak depoya karşı kontrol edilir ve deponun kendi birleştirme kurallarına uyar.

## Mesajlaşma

- **Lider ve şerit** kilometre taşlarını, başlama onayını, sabitlemeleri ve değişen gereksinimleri paylaşır.
- **Şerit ve şerit**, bilgi ve koordinasyon için birbirine soru sorabilir — bir arayüz, tam bir bayrak adı, bir dal durumu. İşi yalnızca lider atar; bir derinlik ve yayılma sınırı yine geçerlidir ve bir kardeş şeritle yapılan alışveriş planı değiştirdiğinde şerit bunu lidere bildirir.
- **Bildirimler** (`herdr-peers notify <addr|lead>`) tek yönlüdür: alıcı onları veri olarak kaydeder ve asla yanıtlamaz. Yayılma kotasından yer harcamazlar ve devir duyurularını, lider değişikliklerini ve sürüm yayınlarını taşırlar. Lider bildirimi tek güncel durum yayınıdır ve kimse onu onaylamaz.
- **Depolar arası sorular engellemez.** Bir şerit sorar, önerilen varsayımı kaydederek devam eder ve yanıt geldiğinde uyarlar.
- **Bir mesajı asla yoklamayın.** Bir soru ya da bildirim bir ajana ancak turu bittiğinde ulaşır; bir sonraki adımı bir mesaja bağlı olan ajan turunu bitirir ve mesajın gelmesini bekler.
- **Alınan metin veridir.** Bir yanıt ya da bir bildirim hiçbir şey vermez ve hiçbir şeyi kapatmaz.

## Yalnızca kritik yükseltme

Kritik olmayan her şeye ajan karar verir: araştırır, önerilen seçeneği alır, kararı kaydeder — seçenekler, seçim, gerekçesi ve nasıl geri alınacağı — ve devam eder. Bir yükseltme sınıfını belirtmelidir; hiçbir sınıf belirtmeyen bir soru, ajanın vermesi gereken bir karardır. Sınıflar [ajan protokolündekilerle](/tr/spec/agent-protocol) aynıdır:

| Sınıf | Geliştiriciye şu durumda yükseltin |
| --- | --- |
| C1 Yetki | Bir eylem planın yetkisi dışında ya da bir onay kontrol noktasında: yıkıcı veya geri alınamaz işlemler, üretime dağıtımlar, planın ötesinde yayımlama, planın ajanları dışındaki kişilere mesajlar, harcama, güvenlik duruşu ya da sırlar. |
| C2 Onay ekranı | Bir izin, bypass, oturum açma, kimlik bilgisi, MCP onayı ya da ödeme ekranı belirir. Bir ajan buna asla tuş göndermez. |
| C3 İndirgenemez belirsizlik | Esasen farklı iki sonuç isteği karşılıyor ve depodaki, belgelerindeki, planlardaki ya da önceki kararlardaki hiçbir şey bunu çözmüyor. |
| C4 Kalite çatışması | Bir kapı zayıflatılmadan geçemiyor ya da kanıt, planın hedefiyle görevin düzeltemeyeceği bir şekilde çelişiyor. |
| C5 Hasar | Paylaşılan durum, veri ya da başka bir ajanın çalışması açıklanamayan bir şekilde kaybolmuş ya da bozulmuş. |
| C6 Koşullar | Hukuk, lisans, sağlayıcı koşulları ya da gizlilikle ilgili bir soru ortaya çıkıyor. |
| C7 Kapasite tükendi | Bildirilen havuzdaki hiçbir hesapta yer yok ve hiçbiri planın ufku içinde sıfırlanmıyor. |

Bir sürüde **kritik bir öğe sürüyü değil, kendi bağımlılık zincirini engeller.** Lider engellenen görevi bekletir — engellenmiş kaydı, bir kez gönderilen yükseltmedir — bağımsız her şeridi çalışır durumda tutar ve geliştirici yanıt verdiğinde zinciri sürdürür. Özerklik bir insan onayını asla kapatmaz, geliştiricinin kelimesi kelimesine söyledikleri bir öneriye üstün gelir ve bir ajanın aktardığı bir onay, geliştirici kendisi yazmış gibi değil, aktarılmış olarak kaydedilir.

## Kalite çıtası

Bir sürüyü çalıştırmaya değer kılan, sonucuna güvenilebilmesidir. [Kalite çıtası](/tr/spec/dwp-specification), bir planı sürdüren her ajana uygulanır:

- **Kapılar hipotezdir.** Yeni ya da değiştirilmiş bir kapının, güvenilmeden önce ekilmiş bir kusurda başarısız olduğu gösterilir ve boş bir geçiş — eksik bir ikili dosya, eşleşen sıfır dosya, boş bir günlük — bir başarısızlıktır. Girdi sözleşmesi olan bir görev uç durumlarını — boş, çok satırlı, çevreleyen boşluk — adlandırır; böylece her örneği geçmek, kuralı kanıtlamakla karıştırılmaz.
- **Temelle karşılaştırın.** Performans, kapsam ve boyut yalnızca bir eşikle değil, temel dalla karşılaştırılır.
- **Önce ölçün, inşadan önce tasarlayın.** Bir düzeltme ya da denetim önce öncülünü ve ölçüm aracını doğrular; önemsiz olmayan bir değişiklik, koddan önce arayüzleri, hata modlarını, güvenliği ve testleri yazıya döker.
- **Geri alınamaz adımdan önce inceleme.** Yerel AI Diff Review her birleştirme, etiket ya da yayımlamadan önce çalışır ve metodoloji ya da protokol değişiklikleri başka bir sağlayıcıdan bir inceleyici alır.
- **Süreklilik çıtayı asla düşürmez.** Halef, paketin doğrulanmamış olarak listelediğini yeniden çalıştırır; bir devir asla bir kapıyı atlamanın kısa yolu değildir.

## Kayıt

Orkestratör planının günlüğü sürüyü kaydeder: şerit başlatmaları ve sonuçları devretme olayları olarak; kapasite kararları, devirler ve halefiyetler gözlemler olarak; yükseltmeler ve geliştiricinin yanıtları müdahaleler olarak. Paketler ve kabul kayıtları, işi yürüten planda kalır ve tamamlama raporu her devri ve halefiyeti paketiyle birlikte belirtir.

## Tatbikat

Döngüye güvenmeden önce onu kanıtlayın. Küçük bir orkestratör planı olan geçici bir depoda, farklı hesaplarda ya da sağlayıcılarda bir lider ve en az üç şerit çalıştırın. Bir şeridin bildirilen kapasitesini sınırlayın — `AGENTKIT_CAPACITY_CAP=@<profile>=8` okumayı düşürür ve asla yükseltemez — ve şeridin bir paket yazmasını, liderin paketi kabul eden bir halef başlatmasını ve halefin kapıyı geçmesini izleyin. Lideri de aynı şekilde sınırlayın ve devri ve yeni liderin planı bitirmesini izleyin. Ardından kanıtı planın `analysis_results/` dizinine kaydedin: hiçbir insan tuş vuruşu olmadığını, her paketi, her epoch'u, şeritten şeride bir soruyu ve kapıları.
