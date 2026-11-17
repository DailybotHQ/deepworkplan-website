---
title: Loop engineering
description: "İnsanın başlattığı daemon’un onaylı Deep Work Plan’ları sonuna taşıması: lider kayıtları, dürtmeler, yapılandırılmış engeller, halefiyet, revive, kuyruk."
order: 8
lang: tr
summary: Onaylı bir planı kayıtlı yetkisi içinde ilerlemede tutan uçtan uca yaşam döngüsü.
icon: repeat
---

# Loop engineering

**Önce spesifikasyon, kapalı döngü: depo harness’tir ve plan kendi kendine bitene kadar çalışır.** Bu bölüm, ilk yürütme turundan sonra planı ilerlemede tutan isteğe bağlı mekanizmayı açıklar. Plan kalıcı spesifikasyon olarak kalır; döngü yeni yetki değil, süreklilik sağlar.

Normatif metin [loop engineering spesifikasyonunda](/tr/spec/loop-engineering) yer alır. Bu bölüm onun anlatısal eşlikçisidir: yaşam döngüsünü sırasıyla izler ve parçaların nasıl birleştiğini gösterir, ancak her MUST ifadesini yeniden aktarmaz.

## Neden bir döngü

DWP’nin ilk iki sütunu bir boşluk bırakır. Önce spesifikasyon yaklaşımıyla planlama, bir bölümün *neyi* teslim etmesi gerektiğini ve nasıl doğrulanacağını söyler. Harness olarak depo, bağlamın, araçların ve kapıların *nerede* bulunduğunu söyler. Hiçbiri, işi yürüten ajan turunu bitirdiğinde, bir kullanım sınırına ulaştığında veya bölmesini kapattığında *işin nasıl bittiğini* söylemez. Bir döngü olmadan, onaylanmış ve iyi tanımlanmış bir plan yine de birinin “devam” yazmasını bekler.

v8 kuralı bu boşluğu kapatır. Onaylı bir plan, o planda kayıtlı yetki içinde, rutin insan müdahalesi olmadan tamamlanana kadar çalışır. İnsan beklenmez, bilgilendirilir; bunun istisnaları bir oturum açma veya kimlik bilgisi gerektiğinde ya da planın kendi C1–C7 kapılarından biri önceden yetkilendirilmemiş bir insan girdisi gerektirdiğindedir. Bu istisnalarda yürütme, girdi gelene kadar kapıda durur.

Dolayısıyla döngü bir onay mekanizması değil, bir devam mekanizmasıdır ve isteğe bağlıdır: Herdr entegrasyonu (herdr-peers `autopilot --loop`), zaten tek bir oturumda çalışan bir yöntemi güçlendirir.

## Bir bakışta yaşam döngüsü

Onaylı bir plan bu aşamalardan geçer. Her biri aşağıda ayrıntılı olarak açıklanır.

| Aşama | Ne olur | Kim eyler |
|---|---|---|
| Onay | Plan onaylanır; sözleşmesi yetkisini ve v8 altında isteğe bağlı bir `autonomy` bloğunu kaydeder | İnsan |
| Kayıt | `execute` planın lider kaydını üstlenir (`resume` onu yeniden üstlenir), plan halefleri adlandırıyorsa bir halefiyetle birlikte | Lider ajan, paket aracılığıyla |
| Yürütme | Lider, kabul kriterlerine ve kapılara göre görev görev çalışır | Lider ve şeritleri |
| Boşta | Plan hâlâ açıkken liderin bölmesi boşta kalır | — |
| Dürtme | Daemon tek bir sabit devam istemi gönderir | Daemon |
| Engel | Lider yapılandırılmış bir engel kaydeder ve durur; daemon hiçbir şey göndermez | Lider |
| Takılma | İlerleme olmadan 3 istemden sonra plan `plan_stalled` olarak kaydedilir | Daemon kaydeder |
| Devralma | Listelenen bir halef devralır; bir izinle bir şerit atanır; `--revive` ile yeni bir ajan başlatılır | Halef, şerit veya yeniden canlandırılan ajan, yardımcı aracılığıyla |
| Tamamlanma | Planın kapanışı kuyruk öğesini tamamlandı olarak işaretler; kuyruktaki sonraki plan başlayabilir | Lider; daemon sonraki lidere istem gönderir |
| Bildirim | Takılmalar, engeller, kaybedilen liderler, tamamlanmalar ve kuyruk olayları `--notify` komutuna gider | Daemon komutu çalıştırır |

## Onaylayın ve yetkiyi kaydedin

Onay, döngü devreye girmeden önce gerçekleşir ve döngüdeki hiçbir şey bir planı onaylayamaz, genişletemez veya bir değişikliğin yerini alamaz.

v8 altında bir plan sözleşmesi (`plan-contract/v8`) isteğe bağlı, kapalı bir `autonomy` bloğu taşıyabilir. Kapalı, bir doğrulayıcının bilinmeyen bir anahtarı reddetmesi ve bloğu v8 dışındaki herhangi bir sözleşme neslinde reddetmesi anlamına gelir. Eksik her anahtarın kayıtlı tam olarak bir varsayılanı vardır ve bir tüketici kendi tahmini yerine bu varsayılanı uygular.

| Anahtar | Neyi kaydeder | Yoksa anlamı |
|---|---|---|
| `stall_budget` | İlerleme olmadan izin verilen döngü istemleri, 1 ile 10 arasında bir tamsayı | `3`, herdr-peers’in kendi sınırıyla aynı değer |
| `promptable` | Döngünün istem gönderebileceği bölme adresleri | Yalnızca planın lideri |
| `notify` | Bildirim hedefleri | Hedef yok; döngü yine de kaydeder |
| `brain` | Bir beynin bu plan üzerinde hareket edip edemeyeceği | `false` |
| `queue` | Planın kuyruktan nasıl başladığı: `prompt-lead`, `launch` veya `none` | `none`; plan kuyrukta değildir |

Bu nedenle `autonomy` bloğu olmayan bir plan en temkinli okumayı benimser: her engeli insan çözer, yalnızca lidere istem gönderilebilir, kimse bilgilendirilmez, hiçbir beyin hareket etmez ve plan kuyruğa alınmaz. Blok, döngünün bir plan için yapabileceklerini daraltır veya adlandırır; planın kapsamının ve kapılarının zaten taşımadığı bir yetkiyi asla eklemez.

## Planı kaydedin

Herdr eklentisi etkin olduğunda ve ajan Herdr içinde çalıştığında, paketin `execute` akışı plan başlangıcında `herdr-peers lead claim --plan <id>` komutunu çalıştırır ve `resume` onu yeniden üstlenir. Plan halefleri adlandırıyorsa üstlenme onları ekler (`--succession`); devralma yalnızca kaydedilmiş bir halefiyet için çalışır. Kayıt en iyi çaba esaslıdır ve asla bir kapı değildir: başarısız bir üstlenme bir kez uyarır ve yürütme devam eder.

Lider kaydı (`lead-v1` veya bir atama izni taşıdığında `lead-v2`) planı, mevcut lideri, bir epoch’u, sıralı bir `succession` listesini ve planın `lanes` alanını tutar. Yalnızca en yüksek epoch’u tutan eş lider olarak hareket eder.

Daemon bir planı yalnızca bir lider kaydı onu adlandırdığında ve planın durum dosyası (`state.json`) okunabildiğinde izler. Lider kaydı olmayan bir plan izlenmez. Bir lider kaydı kendi başına hiçbir yetki vermez: şeritler yine planın yetkilendirmesi içinde hareket eder.

## Daemon’u elle başlatın

Otomatik pilotu bir insan, kendi sözleriyle, bir Herdr bölmesinin içinden başlatır. Bir ajan onu yalnızca insanı o oturumda doğrudan istediğinde başlatır; bir eşin mesajı, bir plan veya bir brifing öyle dediği için asla başlatmaz.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Arka plandaki daemon onu başlatan bölmeye bağlı değildir ve tek bir daemon etkin her Herdr makinesini kapsar; diğer makinelerdeki planlar, her makinenin kayıtlı SSH hedefi üzerinden sabit bir komutla okunur. Her Herdr sunucusu başına bir otomatik pilot çalışır. herdr-peers bilerek hiçbir oturum açma öğesi veya sistem hizmeti kurmaz: bir yeniden başlatmadan veya Herdr yeniden başlatmasından sonra bir insan onu aynı seçeneklerle yeniden başlatır.

Döngü için önemli olan seçeneklerin her biri açık bir insan tercihidir:

| Seçenek | Neyi etkinleştirir |
|---|---|
| `--loop` | Açık ve kayıtlı her planı sonuna kadar çalışır durumda tutmak |
| `--notify "<command>"` | Bir plan takıldığında, engellendiğinde, liderini kaybettiğinde veya tamamlandığında ve kuyruk olaylarında bir `plan-event-v1` nesnesiyle bir komut çalıştırmak |
| `--brain` | Kuralların çözemediği az sayıdaki durum için ayrılmış bir karar ajanı |
| `--appoint` | Bir lider ve tüm halefleri ortadan kalktığında kayıtlı bir atama izni üzerine hareket etmek |
| `--revive` | Kaydındaki hiç kimsenin devralamadığı bir plan için yeni bir ajan başlatmak |
| `--dry-run`, `--scope`, `--exclude` | Göndermeden kararları görmek; makineleri sınırlamak; bir bölmeyi erişim dışında tutmak |

## Boşta olmak durmak değildir

Daemon bir liderden devam etmesini yalnızca plan açıkken ve şunların tümü geçerliyken ister: liderin bölmesi boşta veya bitmiş durumdadır ve 5 dakikadır değişmemiştir; planın hiçbir şeridi çalışmıyordur ve lider bir yanıt beklemiyordur; ekranı bir iletişim kutusu, bir oturum açma veya bir kullanım sınırı değildir; giriş satırında bir insan taslağı yoktur; son istemden bu yana kendi başına bir tur atmıştır; ve son bir saatte 3’ten az istem almıştır.

İstem sabittir. Yalnızca plan kimliği doldurulur:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Bir dürtme ister; asla yetki vermez. Şeritler liderleri tarafından yönlendirildiği için daemon yalnızca lidere istem gönderir. Planın durumunda ilerleme olmadan geçen 3 döngü isteminden sonra plan `plan_stalled` olarak kaydedilir ve durumu değişene kadar kendi hâline bırakılır. Birkaç açık planı olan bir lider her geçişte bir istem alır.

## Yapılandırılmış engeller

Bir v8 planı neden devam edemediğini veri olarak kaydeder; böylece döngü, filo haritası ve devam eden bir ajan düzyazıyı yorumlamak yerine aynı alanları okur. Bir engel, defterin yardımcısıyla (`ledger.py block`) oluşturulur ve `ledger.py unblock` ile çözülür; bu, `journal-event/v8` türünde bir `blocker` olayıdır. Bir engel olayının doğrudan eklenmesi reddedilir.

| Alan | Anlamı |
|---|---|
| `task` | Engellenen görev; kanıtı zaten kapatmış bir görev engellenemez |
| `reason` | Görevin neden devam edemediği (en fazla 1000 karakter) |
| `needs` | Engeli neyin kaldıracağını söyleyen tek satır (en fazla 500 karakter) |
| `class` | Zorunlu: C1–C7’den biri |
| `resolver` | İsteğe bağlı: `lead` veya `human`; yoksa `human` olarak okunur |

`resolver: "lead"`, engelin kimlik bilgisi, oturum açma, onay, ödeme, main’e push, sürüm veya silme olmadan planın kayıtlı yetkisi içinde çözülebileceği anlamına gelir. C1, C2, C5 ve C6 için reddedilir. Plan başına en fazla bir engel etkindir ve çözülmediği sürece görevi tamamlanamaz.

Okuyucular engeli planın `plan-snapshot/v8` biçimindeki `state.json` dosyasında bulur: etkin engel veya `null`, türetilmiş bir görev durumu olarak da `blocked`. `PROGRESS.md`, her geçişte yenilenen dört sabit başlık satırıyla açılır:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

Döngü engellenmiş bir plana ölçülü davranır. Ona hiçbir şey göndermez ve `plan_blocked` olayını bir kez kaydeder. Ne daemon ne de beyni, planın `resolver: "lead"` olarak işaretlemediği bir engeli çözmesini liderden isteyebilir; diğer her şey insanı bekler. Önceki nesillerin planları (v6 ve v7) engel olayı kaydetmez ve bildirdikleri her engel insana aittir.

## Daemon’un asla yapmadıkları

Daemon asla:

- bir oturum açma, giriş, API anahtarı veya cihaz kodu istemine ya da Claude’un bypass-permissions onayına dokunmaz; oturumu bir insan açar;
- bir reddetme satırını, serbest metin satırını veya bir ajanın kalıcı izinlerini genişleten bir satırı seçmez;
- giriş satırında bir insanın taslağı bulunan bir bölmeye ya da kapsamı dışındaki bir bölmeye istem göndermez;
- engellenmiş bir plana ya da durumunu okuyamadığı bir plana istem göndermez;
- bir lider kaydını yazmaz veya düzenlemez, bir protokol mesajı göndermez ya da kayıtta olmayan bir bölmeyi atamaz;
- plan kuyruğunu yazmaz.

Her satırı reddeden veya izinleri genişleten bir izin iletişim kutusu reddedilir, asla engellenmiş hâlde bırakılmaz; ardından ajana bir kez, planının kapıları içinde başka bir yoldan devam etmesi ya da bir engel kaydetmesi söylenir. Bir ajanın, tüm satırları reddeden kendi sorusu insana bırakılır, çünkü bu iş hakkında bir karardır.

## Liderlik: epoch’lar, halefiyet ve devralma

Liderlik epoch ile çitlenir. Lideri değiştiren her değişiklik (bir devir, bir devralma, bir bırakma, bir atama) epoch’u artırır ve yalnızca en yüksek epoch’un sahibi lider olarak hareket eder. Geri dönen eski bir lider daha yüksek bir epoch bulur, lider komutları reddedilir ve bir sonraki lider bildirimi onu geri çekilmeye zorlar.

Lider ortadan kalktığında (bölmesi art arda iki listelemede görünmediğinde), daemon kaydın `succession` listesindeki erişilebilen ilk adresten `herdr-peers lead takeover --plan P` komutunu çalıştırmasını ister; bunu epoch başına bir kez yapar. Hiçbir gerekçe iletmez; böylece liderin gerçekten ortadan kalkıp kalkmadığına yardımcının kendi denetimi karar verir. Kullanım sınırındaki bir lider ortadan kalkmış sayılmaz: daemon onu her 30 dakikada bir yeniden dener. Halefiyetteki hiç kimseye sorulamıyorsa daemon `plan_no_lead` kaydeder.

Bir halef planı, kabul kriterlerini ve kapılarını devralır. Halefiyet kimin yürüttüğünü değiştirir, neyin yetkilendirildiğini asla değiştirmez.

## Atama ve revive

Lideri ve haleflerinin tümü ortadan kalkmış bir plan için iki yol daha vardır. Her biri açık bir insan eylemi gerektirir ve devralmayı, yardımcı tarafından denetlenmek üzere ajanın kendisine bırakır.

**Atama (protokol 2).** İki insan eylemi gerektirir: lider kaydına kaydedilmiş bir izin (`lead claim --allow-appointment`, lider tarafından yalnızca insanının sözü üzerine çalıştırılır) ve `--appoint` ile başlatılmış bir daemon. Daemon bu izni kendisine veremez. Lider ve tüm halefleri, aralarında en az 15 dakika olan iki gözlemde ilerleme olmadan ortadan kalkmış görünürse daemon, planın canlı ilk şeridinden `lead takeover --plan P --as-lane` komutunu çalıştırmasını ister. Bu yardımcı izni yeniden denetler, bunun planın deposunda çalışan bir şerit olduğunu doğrular ve lideri, her halefi ve önceki her şeridi bir dakika arayla iki kez yoklar; herhangi bir yaşam belirtisi reddedilmeye yol açar. Plan başına en fazla iki atamaya izin verilir.

**Revive (herdr-peers 2.2.0).** Daemon’u `--loop --revive` ile başlatmak iznin kendisidir. Bir planın lideri ve halefiyetinin ve şeritlerinin her üyesi ortadan kalkmışsa ve hiçbiri devralamıyorsa, daemon planın çalışma kopyasında yeni bir ajan başlatabilir, tek kullanımlık bir bilet yazabilir ve ona `lead takeover --plan P --reason revive` komutunu çalıştırma talimatı verebilir. Yardımcı devralmayı yalnızca o biletle ve ancak kendi denetimleri her üyeyi ortadan kalkmış bulduktan sonra kabul eder; yeniden canlandırılan kayıt yalnızca daemon’un makinesinde benimsenir. Lideri hâlâ canlı olan takılmış bir plan ondan asla alınmaz: liderden bir kez devretmesi istenir. Revive, plan başına 6 saatte bir, plan başına toplamda iki ve filo genelinde saatte iki ile sınırlıdır.

**Geri döndürülemez adımlardan önce doğrulayın.** Atanmış veya yeniden canlandırılmış bir lider, her lider gibi, herhangi bir birleştirme, etiket veya sürümden önce `herdr-peers lead verify --plan <id>` komutunu çalıştırır. Başka bir makine planı daha yüksek bir epoch’ta gösterdiğinde reddeder ve planın bir makinesine ulaşılamadığında sıfır olmayan bir kodla çıkar.

## İsteğe bağlı beyin

Daemon’un kuralları neredeyse her şeye karar verir. Karar veremedikleri az sayıdaki durum için `--brain`, daemon’un ask modunda kendisinin başlattığı ve yalnızca kapalı bir eylem listesi içinde itaat ettiği ayrılmış bir karar ajanını tutar. coding-agents-kit 1.3.0 veya sonrasını gerektirir; o olmadan `--brain` ile başlatılan bir daemon, kendisinden istenen beyin olmadan çalışmak yerine başlamayı reddeder.

| Durum | İzin verilen eylemler |
|---|---|
| Bir plan takılmıştır | Bir dürtme daha (plan başına bir kez), insanı bilgilendirmek veya bırakmak |
| Bir plan `resolver: "lead"`, bir liderin ele alabileceği bir sınıf (C3, C4, C7) ve hassas bir konu olmadan engellenmiştir | Kayıtlı yetki içinde çözmesi için lidere tek bir sabit istek, insanı bilgilendirmek veya bırakmak |
| Bir ajan, daemon’un tanımadığı bir ekranda bekler | İnsanı bilgilendirmek veya bırakmak |

3 dakika içinde geçerli bir yanıt gelmezse varsayılan, durumu bırakmaktır. Beynin metni asla yazılmaz, tuşlanmaz veya çalıştırılmaz; bir lider atayamaz, bir ajan başlatamaz, birleştirme yapamaz, sürüm çıkaramaz, oturum açamaz veya bir izni değiştiremez. Tek eyleyen daemon olarak kalır. v8 altında bir planın `autonomy.brain` alanı, bir beynin o plan üzerinde hareket edip edemeyeceğini kaydeder.

## Plan kuyruğu

Bir depo, onaylı planların kuyruğunu `.dwp/queue.json` içinde, `dwp-queue-v1` şemasıyla tutabilir. Onu paket (`shared/queue.py`) veya bir insan yazar; daemon onu yalnızca sınırlı biçimde ve bütünüyle doğrulayarak okur. Create, geliştirici kuyruğa almayı istediğinde (veya v8 sözleşmesi `none` dışında bir `autonomy.queue` kaydettiğinde) onay anında bir planı kuyruğa ekler; insan veya lider onu yeniden sıralar; execute, plan lideri altında başladığında öğeyi `started`, planın kapanışından sonra da `done` olarak işaretler. Bir kuyruk en fazla 64 öğe tutar. Bağımlılıklar kuyruk içidir: `after`, zaten kuyrukta olan bir planı adlandırır. Kuyruk `parallel: true` taşımadıkça depo başına aynı anda bir plan çalışır.

`--loop` ile, bir deponun mevcut planı bittiğinde sıradaki hazır öğe, kuyruğun adlandırdığı lidere gönderilen tek bir sabit istemle başlar: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Bir öğe yalnızca `after` planı tamamlandığında, o deponun başka hiçbir planı çalışmadığında, bir lider adlandırdığında ve onayı geçerli sözleşme için planın hâlâ en son onay veya değişiklik olayı olduğunda hazırdır. Bir `launch` girdisi döngü tarafından başlatılmaz; onaylanmamış bir öğe veya eksik bir lider gibi, `queue_blocked` olarak bildirilir. Bozuk bir kuyruk boş olarak okunur ve plan yaşam döngüsünü asla bozmaz.

## Olaylar, bildirimler ve filo haritası

Daemon plan olaylarını, `--notify` komutunun standart girdisinde tek bir `plan-event-v1` JSON nesnesi olarak bildirir: olay, plan, makine, lider, depo ve engelin sınıfı. Olaylar, plan ve durum başına bir kez olmak üzere `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` ve `plan_completed` ile birlikte `plan_queued_started`, `queue_blocked`, atama ve revive olayları ve beyinden gelen `needs_human` olaylarını içerir. Bir hata kaydedilir ve geçişi asla durdurmaz.

Paketin Herdr eklentisi, tamamlanan, takılan, engellenen, lidersiz kalan ve lideri taşınan plan olaylarını kurulu Dailybot CLI aracılığıyla insanın okuyabileceği tek bir ekip güncellemesine dönüştüren bir Dailybot bildiricisi (`scripts/notify-dailybot.py`) içerir. CLI yoksa, oturum açılmamışsa veya gönderim başarısız olursa sessizce çıkar. Bildirimler ilerlemeyi veya bir ihtiyacı raporlar; asla bir eylemi yetkilendirmez veya plan kaydının yerini almaz.

Döngüyü gözlemlemek için `herdr-peers plans` bir makinenin planlarını (`plans-v1`), `herdr-peers fleet` ise birleştirilmiş haritayı (`fleet-v1`) yazdırır: makineler, ajanlar, planlar ve her ajanın lider, halef veya şerit olarak rolü. `herdr-peers fleet ui` haritayı canlı olarak; plana, depoya, makineye veya kuyruğa göre gruplanmış biçimde, dikkat gerektirenler, etkin olanlar, bekleyenler veya bitenler için görünümlerle gösterir. Arayüz yalnızca okur: plan durumu yazmaz ve hiçbir ajana istem göndermez.

## Çalışılmış bir örnek: gece boyunca bir plan

Aşağıdaki anlatım açıklayıcıdır; her adım yukarıda belgelenen kurallara uyar.

1. Akşam geliştirici, `notify` dışındaki varsayılanları olduğu gibi bırakan bir `autonomy` bloğuna sahip bir planı onaylar. Ajan `execute` komutunu çalıştırır; bu, lider kaydını tek bir halefle üstlenir.
2. Geliştirici `herdr-peers autopilot start --loop --notify "<notifier>"` komutunu başlatır ve çevrimdışı olur.
3. Lider üç görevi tamamlar ve turunu bitirir. Beş dakika sonra, çalışan bir şerit ve bekleyen bir yanıt yokken, daemon sabit devam istemini gönderir ve lider sonraki görevden devam eder.
4. Bir görev, planın sahip olmadığı bir sırrı gerektirir. Lider, resolver belirtilmemiş (`human` olarak okunur) bir C1 engeli oluşturur ve durur. Daemon plana hiçbir şey göndermez, `plan_blocked` kaydeder ve bildirici, engelin sınıfını belirten tek bir ekip güncellemesi gönderir.
5. Sabah geliştirici girdiyi sağlar, lider engeli `ledger.py unblock` ile çözer ve yürütme devam eder. Daha sonra liderin bölmesi kapanır; onun görünmediği iki listelemeden sonra daemon haleften `lead takeover` çalıştırmasını ister, epoch ilerler ve halef aynı kapılar altında devam eder.
6. Planın son birleştirmesinden önce yeni lider `lead verify` çalıştırır. Plan tamamlanır, `plan_completed` bildiriciye ulaşır ve deponun bir kuyruğu varsa sonraki onaylı planın lideri sabit kuyruk istemini alır.

Daemon hiçbir noktada bir şeyi onaylamadı, bir kimlik bilgisi yazmadı veya işin ne olması gerektiğine karar vermedi.

## Yetki sınırı

Döngü tam olarak planın yetkisinin bittiği yerde durur. Ajan protokolünün yükseltme sınıfları bu çizgiyi belirler: C1 yetki (planın yetkilendirmesi dışında, bir onay denetim noktasında veya sırlar içeren bir eylem), C2 onay ekranları (izin, oturum açma, kimlik bilgisi veya ödeme ekranları; asla bir ajan tarafından tuşlanmaz), C3 indirgenemez belirsizlik, C4 zayıflatılmadan geçilemeyen bir kapı, C5 hasar, C6 koşullar ve C7 tükenmiş kapasite. Bunlardan biri önceden yetkilendirme olmadan ortaya çıktığında yürütme kapıda durur ve ihtiyaç kaydedilip bildirilir.

Oturum açmalar ve kimlik bilgileri her zaman insan eylemi olarak kalır. Daemon’u insan başlatır, atamaya veya revive’a açıkça izin verir ve kayıtlı yetkinin karşılayamadığı ihtiyaçları çözer. Diğer her şeyde insandan her adımı gözetmesi istenmez; insan bilgilendirilir.

## Eklenti olmadan çalışmak

Bunların hiçbiri zorunlu değildir. Herdr olmadan veya eklenti devre dışıyken paket, döngü yokmuş gibi davranır: bir plan bir oturumda yürütülür, ilk açık görevinden `resume` ile sürdürülür veya insanın koordine ettiği bir devirle başka bir ajana verilir. Plan sözleşmesi, yapılandırılmış engeller ve `PROGRESS.md` başlığı aynı şekilde çalışır; böylece bir insan veya başka bir ajan, döngünün okuyacağı durumun aynısını okur.
