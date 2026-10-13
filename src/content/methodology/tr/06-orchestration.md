---
title: Birçok ajanı çalıştırmak
description: "Bir lider ajan bölmelerde, konteynerlerde ve başka makinelerde, boş kapasiteye göre seçilen hesaplarla ve depo başına tek dal ve sürümle birçok şeridi yönetir."
order: 6
lang: tr
summary: Bölmeler, makineler, hesaplar ve depolar genelinde birçok ajanı koordine etmek için lider ve şeritler modeli.
icon: network
---

# Birçok ajanı çalıştırmak

Tek bir plan üzerinde tek bir ajan varsayılandır ve işlerin çoğunu karşılar. Bazı işler tek bir oturumdan daha geniştir: birkaç depoyu kesen bir değişiklik, belirli bir sırayla yayımlanması gereken bir sürüm ya da tek bir ajanın günlerce uğraşacağı bir iş birikimi. DWP, sözleşmesini değiştirmeden bu işe ölçeklenir. Plan doğruluk kaynağı olarak kalır, her görev yine kendi kapısıyla kapanır ve ek ajanlar, bir **liderin** koordine ettiği **şeritlerdir**.

Bu bölüm modeli açıklar. Üç isteğe bağlı eklenti kullanır — bölmeler ve eşler için [Herdr](/tr/kit/herdr), hesaplar için [agentkit](/tr/kit/agentkit) ve konteynerler için [devcontainer](/tr/kit/devcontainer) — ve bunların hiçbiri tek ajanlı bir plan için zorunlu değildir.

## Bir lider ve şeritleri

**Lider**, üst planın sahibidir. Şeritlere karar verir, her birine kapsamını verir, kilometre taşlarını toplar ve bir şeridin birleştirmesine ya da sürüm yayımlamasına izin veren onayı verir. Başka bir şeridin kodunu yazmaz.

Bir **şerit**, tek bir kapsamı olan tek bir ajandır — genellikle tek bir depo. O deponun `AGENTS.md` dosyasını okur, o deponun kapısını çalıştırır ve kendi planını deponun içinde tutar. Bir [orkestratör merkezinde](/tr/methodology/05-archetypes) üst plan, alt izleme tablosuyla birlikte merkezin `.dwp/plans/` dizininde yaşar ve her şeridin planı, o deponun plan kimliklerini ve kapısını kullanarak kendi deposunda yaşar.

| Rol | Sahip olduğu | Asla yapmadığı |
| --- | --- | --- |
| Lider | Üst plan, şerit listesi, sürüm sırası, GO onayı | Bir şeridin deposunu düzenlemek |
| Şerit | Tek bir depo: dalı, planı, kapısı ve pull request'i | Liderin GO onayından önce birleştirmek ya da sürüm yayımlamak |

## Şeritlerin çalıştığı yerler

Bir şerit, bir terminal bölmesindeki bir ajandır ve bölme birkaç farklı yerde bulunabilir. [Herdr](https://herdr.dev) her ajanı bir bölmeye yerleştirir ve diğer makinelere SSH üzerinden ulaşır; böylece lider her şeridi tek bir kenar çubuğunda görür.

- **Ana makinede.** Her şerit için bir bölme, liderle yan yana. Geliştiricinin zaten çalıştığı depolar için en hızlı kurulum.
- **Bir konteynerde.** Bir [devcontainer-kit](/tr/kit/devcontainer) konteyneri `dck up` sırasında Herdr ağına katılır: ajanları ana makineye ve diğer konteynerlere ulaşır, ana makine de onlara ulaşır. Korumalı alan konteynerin kendisidir; bu nedenle ajanları özerk çalışabilir.
- **Başka bir makinede.** Herdr'ın SSH üzerinden ulaştığı herhangi bir makine, orada da herdr-peers kurulu olduğu sürece şeritleri aynı şekilde barındırır.

Yer, yalıtımı değiştirir, protokolü değil: bir konteynerdeki şerit ile ana makinedeki şerit, liderle aynı şekilde koordine olur.

## Boş kapasiteye göre hesaplar ve sağlayıcılar

Birçok ajan kotayı hızla tüketir. Her şerit kendi hesabında çalışır — [coding-agents-kit](/tr/kit/agentkit) içinde bir CLI ve bir profil — böylece şeritler aynı pencereyi tüketmez ve sınıra ulaşan bir hesap tüm şeritleri değil, yalnızca bir şeridi durdurur.

- **`ak usage`**, her hesapta ve profilde kalan kotayı gösterir; her toplu iş için bir kez.
- **`ak pick <kind> --count N`**, en çok boş kapasiteye sahip N hesabı en iyisinden başlayarak döndürür; `--exclude` meşgul bir hesabı dışarıda tutar, `--model` tek bir modelin penceresini sayar ve `--need` yeterli kapasite olmadan başlamayı reddeder.
- **`ak <kind> @<profile>`**, şeridin ajanını o hesapta, kendi bölmesinde başlatır.

Sağlayıcılar da aynı şekilde karıştırılabilir. Bir Claude şeridi yazarken bir Codex şeridi gözden geçirebilir; her biri `ak pick`'in kendi türü için seçtiği hesapta çalışır. Bir konteyner şeridi ana makinenin hesaplarını kullanabilir: geliştiricinin devcontainer-kit ana makine profilinde `host_profiles` açıldığında, bir konteyner deponun kurduğu CLI'ların ana makine profillerini alır — Claude için profil başına uzun ömürlü bir token, Codex için kendi kimlik doğrulama dosyası — ve kendi oturum açmasına gerek kalmaz. Yalnızca kendi hesaplarınızı kullanın ve her sağlayıcının koşulları içinde kalın: işi hesaplara dağıtın, bir sınırı aşmak için hesapları asla döndürmeyin.

## Şeritleri insan olmadan başlatmak ve engelini kaldırmak

Bir lider, klavyede kimse olmadan şeritleri başlatabilir ve ilerlemelerini sürdürebilir. Geliştirici gözetimsiz çalışmaya izin verdikten sonra — kalıcı bir talimat ya da planın ön yetkilendirmesi — her başlatma için ayrıca onay gerekmez. Lider Herdr'ın kendi komutlarını kullanır; hiçbir kit kodu tuş vuruşu göndermez. Prosedürün sabit bir sırası vardır: bir kez hazırla, istemden kaçın, durmayı algıla, yalnızca tek bir durumda tuş gönder, gerisini yukarı aktar.

1. **Bir kez, geliştirici olarak hazırlayın.** Claude Code, her profil için bir kez bypass-permissions modunun onaylanmasını ister. Bu bypass-permissions onayı geliştiricinin kendi adımıdır ve profil oluşturulurken atılır; bir devcontainer-kit konteynerinde kit bu onayı yalnızca konteynerin kendi home dizinlerine yazar. Hiçbir ajan bunun için asla tuş göndermez.
2. **Kaçının.** `ak pick <kind>` en çok kapasiteye sahip hesabı belirtir ve `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` şeridi kendi klasöründe başlatır. `--trust-cwd` (veya `AGENTKIT_TRUST_CWD=1`) o klasöre önceden güvenir; böylece Claude ve Codex klasör güveni ekranlarını hiç tuş vuruşu olmadan atlar.
3. **Algılayın.** `herdr-peers lanes` (veya `herdr agent list`), her şeridi çalışıyor, boşta, engellenmiş ya da tamamlanmış olarak gösterir. Engellenmiş ya da çıktısız boşta duran bir şerit için `herdr-peers status <pane>` bulunduğu ekranı — klasör güveni, bypass onayı, oturum açma, izin ya da bilinmeyen — belgelenmiş bir sonraki adımla birlikte sınıflandırır, `herdr pane read <pane>` ise ekranı gösterir.
4. **Tek tuş vuruşu, tek durum.** Liderin gönderebileceği tek tuşlar, kendi başlattığı bir bölmede, `--trust-cwd` kullanılamadığında bir klasör güveni ekranına verilen yanıttır. Tuş göndermeden önce ekranı okur, onu yanıtlayan en az tuşu gönderir ve yeniden okur.
5. **Geri kalan her şeyi okuyun, kaydedin ve yukarı aktarın.** Claude'un bypass-permissions onayı, oturum açma ve kimlik bilgisi istemleri, eylem başına izin istekleri, yıkıcı onaylar, ödeme ya da plan istemleri, bilinmeyen ekranlar ve liderin oluşturmadığı bölmeler, tuş vuruşu olarak değil, engellenmiş bir kilometre taşı olarak geliştiriciye gider.
6. **Devre dışı bırakma üstün gelir.** `AGENTKIT_PERMISSIONS=ask` ayarlıyken şeritler harekete geçmeden önce sorar ve lider, devre dışı bırakmanın getirdiği bir istemi asla dolanmaz.
7. **Yeniden başlatın.** Bir ajan çıkarsa lider onu aynı hesapta yeniden başlatır ya da başka bir hesap seçer. Kaybedilmiş bir oturum bir kimlik bilgisi istemidir: yukarı aktarılır.

Her müdahale — ekranın ne gösterdiği, hangi tuşların gönderildiği, ardından ne olduğu — üst planda kayda geçirilir.

## herdr-peers ile koordinasyon

Şeritler ve lider [herdr-peers](/tr/kit/herdr) aracılığıyla konuşur: bir **soru (ask)**, tam olarak bir **yanıtı (reply)** yetkilendiren bir damga taşır ve her alışveriş kaydedilir. Lider protokolü küçük tutar:

- **Kilometre taşları yukarı.** Her şerit sabit noktalarda rapor verir — plan hazır, pull request açık, engellendi, tamamlandı — ve aralarda yanıt beklemeden çalışmaya devam eder.
- **Sorular ask olarak.** Bir karara ihtiyaç duyan şerit lidere sorar; lider tek bir yanıtla cevap verir.
- **Bir derinlik.** Bir yanıta asla yanıt verilmez ve bir şerit işi daha ileriye devretmez. Çağıran başına yayılım sınırlıdır; varsayılan olarak dört eş.
- **Talimat değil, veri.** Bir yanıt, alıcıya zaten sahip olmadığı hiçbir şeyi vermez. Bir şeridin kapısının geçtiği iddiası, kapı çalıştırılarak doğrulanır.
- **Kimin neyi yaptığının kaydı.** Her devretme kaydı şeridin hesabını ve sağlayıcısını belirtir; böylece üst plan hangi hesabın hangi işi taşıdığını gösterir.
- **Codex lane’leri kendi panellerini belirtir.** Codex bir lane’in komutlarını o hesaptaki tüm oturumların paylaştığı bir arka plan sunucusundan çalıştırır; bu yüzden devraldığı panel kimliği başka bir lane’e ait olabilir. Bir Codex lane’i, liderin görev tanımında yazan kendi panelini her herdr-peers komutunda `--pane <pane>` ile verir (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

Lider tüm orkestrayı tek bakışta görebilir: `herdr-peers lanes` her şeridi durumuyla birlikte listeler ve [DeepWorkPlan Vim](/tr/kit/vim), bir orkestratör planının şeritlerini planın hemen yanında gösterir (`:DwpLanes`).

## Depo başına tek dal, tek sürüm

Birçok şeridi gözden geçirilebilir tutan kural basittir: **depo başına tek şerit, temel çalışma kopyasında, tüm değişiklik için tek dal, tek pull request ve tek sürüm.** Şerit, işini birkaç dala ya da worktree'ye bölmez. Worktree'ler yalnızca iki yazarın tek bir depoyu paylaşması gerektiği durum içindir: her biri kendi worktree'sini alır, böylece her yolun tek bir yazarı olur.

Pull request, liderin GO onayına kadar açık, yeşil ve inceleme etiketiyle kalır. Ardından şerit birleştirir, etiketler ve etiketi geri bildirir.

## Sürüm sırası

Depolar birbirine bağımlıdır; bu nedenle bağımlılık sırasıyla yayımlanırlar: önce araçlar, sonra onları sabitleyenler, sonra sonucu açıklayan belgeler, sonra onu benimseyen tüketiciler. Lider sırayı tutar ve GO onayını her seferinde bir depoya gönderir. Başka bir deponun sürümünü sabitleyen şerit, sabitlemeyi yazmadan önce o etiketi bekler; böylece hiçbir sabitleme var olmayan bir sürümü göstermez.

## Kontrol noktaları

Üst plan raporlarla değil, kanıtlarla kapanır:

1. **Şerit başına.** Her şeridin kapısı kendi dalında geçer ve pull request incelemesi temizdir. İnceleme kendi başına bir şerit olabilir: [AI Diff Reviewer](/tr/kit/ai-diff-reviewer) her şeridin pull request'ini inceler ve [Dailybot](/tr/kit/dailybot) eklentisiyle her şerit kendi ilerlemesini ekibe bildirir.
2. **Sürüm başına.** Her etiket mevcuttur ve bir sonraki deponun ihtiyaç duyduğunu sabitler.
3. **Entegrasyon.** Son sürümden sonra bir kontrol noktası, tüketicileri yayımlanmış sürümler üzerinde çalıştırır ve kararı üst planın `analysis_results/` dizinine kaydeder.
4. **Son inceleme.** Üst plan tamamlanmadan önce bir güvenlik geçişi, bir sınırı aşan her şeyi kapsar — özellikle hesapları, token'ları ve konteynerlerle paylaşılan dosyaları.

## Güvenlik

- Bir ask'e, bir isteme ya da bir kayda asla anahtar, token ya da gizli bilgi koymayın; değişkenlere adlarıyla başvurun.
- Paylaşılan kaynaklar bir kilit alır: bir şerit, konteyner derlemesi gibi ağır bir adımdan önce kilidi alır ve sonra bırakır.
- İzin devre dışı bırakması ayarlandığında, her şerit ve bir şeridin başlattığı her ajan için üstün gelir.
- Devam edemeyen bir şerit bunu engellenmiş bir kilometre taşı olarak bildirir ve durur; karar liderindir.

## Bir hesap ya da lider tükendiğinde

Uzun bir çalıştırma herhangi bir hesaptan daha uzun sürer. coding-agents-kit (`v0.7.1`) ve herdr-peers (`v0.3.2`) ile bir şerit her görev sınırında kendi kapasitesini kontrol eder ve hesabı tükenmeden önce işini bir paketle devreder, bir lider liderliği devreder ya da yerini vekili alır ve geliştiriciye yalnızca kritik öğeler ulaşır. [Sürü özerkliği](/tr/methodology/07-swarm-autonomy) döngüyü, paketi, halefiyeti ve yükseltme sınıflarını açıklar.
