---
title: "Sıkça sorulan sorular — Deep Work Plan"
description: "Deep Work Plan hakkında sorulan soruların yanıtları: ne yaptığı, doğrulama kapıları ve sürdürme, araçlarla karşılaştırma ve benimseme."
lastUpdated: 2026-09-10
---

## Sıkça sorulan sorular

Deep Work Plan hakkında en çok sorulanlara kısa yanıtlar; her biri, konuyu derinleştiren sayfaya bir bağlantıyla.

## Deep Work Plan nedir

### Deep Work Plan gerçekte ne yapar?

Deep Work Plan, bir depoyu, bir kodlama ajanının uzun işi güvenilir biçimde yürütebileceği yapılandırılmış bir ortama dönüştürür. Bir ajan skill'i olarak kurulur, depoyu bir kez kuruluma alır (bir `AGENTS.md` dizini, bir `docs/` ağacı, skill ve komutlardan oluşan bir `.agents/` kiti, gitignore'lanmış bir `.dwp/` çıktı alanı) ve o andan itibaren her hedef bir plana dönüşür: her biri kabul kriterleri ve bir doğrulama kapısı taşıyan atomik görevler; tek tek yürütülür, geçtikçe işlenir ve herhangi bir ajan tarafından diskten sürdürülebilir. Plan, güvenliği denetleyen ve son durumu doğrulayan bir Final Review ile kapanır. Metodoloji MIT lisanslıdır ve depo okuyan her kodlama ajanıyla çalışır.

[Metodolojiyi okuyun](https://deepworkplan.com/tr/methodology)

### Kimler içindir?

Kodlama ajanlarına gerçek, çok adımlı işler veren ve bu işin bitmesini isteyen geliştiriciler ve ekipler. Bir görev birden fazla oturuma, birden fazla dosya ailesine veya birden fazla ajana yayıldığında; bir ekip arkadaşının ajanın kaldığı yerden devam edebilmesi gerektiğinde; ya da "bitti"nin "ajanan öyle dedi" değil "doğrulandı" anlamına gelmesi gerektiğinde uyar. Tek satırlık bir düzeltmeye plan gerekmez ve metodoloji bunu açıkça söyler: orantılı titizlik kuralı, bunun yerine satır içi bir hedef, kriter ve kapı önerir.

[Hızlı başlangıç](https://deepworkplan.com/tr/quickstart)

### Bir araç mı, çerçeve mi yoksa metodoloji mi?

Kurulabilir bir skill olarak paketlenmiş bir metodoloji. Sunucu yok, hesap yok, tescilli biçim yok ve zaten kullandığınız kodlama ajanının ötesinde bir çalışma zamanı yok. Kurulan şey, ajanın okuduğu talimatlar; bağlam tespiti ve uyumluluk denetimi için küçük bir shell betiği kümesi; ve deponuzun benimsediği kurallardır. Planın ürettiği her şey deponuzdaki Markdown ve JSON'dur; hiçbir araç olmadan okunabilir.

[Spesifikasyonu okuyun](https://deepworkplan.com/tr/spec)

### Hangi kodlama ajanlarıyla çalışır?

Depo dosyalarını okuyan herhangi bir ajan. Skill, açık Agent Skills standardını ve `AGENTS.md` kuralını izler; bu yüzden Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot ve diğerleri onu normal skill ve talimat yükleme süreçleri üzerinden edinir. Metodolojinin kendi değerlendirmesi, bir satıcının ajanının başlattığı bir planın diğer satıcının ajanı tarafından her iki yönde sürdürüldüğünü gösterir. Kurulum kapsamı ve davranışsal kanıt uyumluluk matrisinde ajan başına listelenir ve ikisi asla birbirine karıştırılmaz.

[Kite göz atın](https://deepworkplan.com/tr/kit)

## Bir plan nasıl çalışır

### Nasıl kullanılır?

Üç adım. Önce Deep Work Plan skill'ini kodlama ajanınıza kurun — en hızlı yol `npx skills add DailybotHQ/deepworkplan-skill` (veya skill repo'sunu klonlayıp `./setup.sh` çalıştırmak). İkinci olarak, depoyu bir kez onboard edin; ajan `AGENTS.md`, `docs/`, `.agents/` kitini ve gitignore edilmiş `.dwp/` alanını yığınınıza uyarlasın: https://deepworkplan.com/init.md adresine yönlendirin veya `/deepworkplan-onboard` çalıştırın. Üçüncü olarak, ince komutlarla planlayın ve çalıştırın: `/dwp-create <goal>` bir plan oluşturur; `/dwp-execute` her kapıya karşı görev görev çalıştırır; `/dwp-refine` bir taslağı veya devam eden bir planı düzenler; `/dwp-resume` bir kesintiden sonra devam eder; `/dwp-status` çalıştırmadan ilerlemeyi raporlar; `/dwp-verify` nesnel bir uygunluk raporu üretir. `/` komutunu yakalayan ajanlar genellikle `#` kullanır (örneğin `#dwp-execute`). Adoption endpoint ve hızlı başlangıç aynı yolu daha ayrıntılı anlatır.

[Hızlı başlangıç](https://deepworkplan.com/tr/quickstart)

### Doğrulama kapıları nasıl uygulanır? İnsan onayı gerekir mi?

Yürütülebilir onaylamalardır ve ajan bunları kendisi çalıştırır. İnsan onayı çalışmayı iki uçtan çerçeveler: bir kişi yürütmeden önce planı onaylar ve pull request sırasında son diff'i inceler; aradaki yürütme otonomdur. Her görev, genellikle deponun kendi kalite kapısı olan somut komutları adlandırır; bunlar görevin dokunduğu yüzeyden seçilir: değişen davranışın testleri ve tüketicileri, değişiklik paylaşıldığında veya sınırlandırılamadığında tam suite'e genişletilir. Bir görev, yalnızca bu komutlar başarıyla çıktığında tamamlanmış sayılır ve davranışı değiştiren görevler testleri genişletmelidir. Başarısızlıkta görev engellenmiş olarak işaretlenir ve ajan durur.

[Çekirdek döngü](https://deepworkplan.com/tr/methodology/02-core-loop)

### İnsanlar çalışmalar arasında kodu değiştirdiğinde plan nasıl bayatlamaktan kaçınır?

Üç cephede. Görevler düzenleme olarak değil davranış olarak yazılır: bir kabul kriteri sistemin ne yapması gerektiğini söyler, bu yüzden yeniden adlandırılmış bir dosya veya değiştirilmiş bir uygulama onu geçersiz kılmaz. Her kapı, reponun şu anki haliyle yeniden çalıştırılır; böylece kırık bir varsayım bir sonraki çalıştırmada sessizce kaymak yerine gürültülü biçimde başarısız olur ve bu başarısızlık iyileştirme için işarettir. Dokümantasyonu senkron tutmak da işin parçasıdır: davranışı değiştiren bir görev, onu tanımlayan docs ve ajan kitini de kendi kapısının içinde günceller. Her çalıştırma, reponu bulduğundan daha ajan-hazır bırakmalıdır.

[Metodolojiyi okuyun](https://deepworkplan.com/tr/methodology)

### Tamamlanan işi kaybetmeden planı yürütme ortasında değiştirebilir miyim?

Evet; kısmen yürütülmüş bir planı iyileştirmek birinci sınıf bir harekettir. Görev tanımları ve yürütme durumu ayrı tutulur: plan diskte bir kontrol listesi artı küçük bir durum dosyasıdır, bu yüzden tamamlananlar görev metninden bağımsız kayıtlı kalır. Bir görev yanlış çıktığında ajan onu engellenmiş işaretler ve zorlamak yerine durur. Sonra henüz çalışmamış görevleri düzenler, yeniden sıralar, böler veya düşürürken tamamlanan görevler tamamlanmış kalır. Sürdürme, durumu diskten ve gerçek repodan yeniden oluşturur ve önemli kapıları yeniden çalıştırır; altta kaymış hiçbir şey gözden kaçmaz.

[Çekirdek döngü](https://deepworkplan.com/tr/methodology/02-core-loop)

### İşi plana karşı sürekli kontrol eder mi, yoksa plan yalnızca başta belirlenen bir şey mi?

Plan sürekli bir kontroldür. Ajan bir seferde bir küçük görevle çalışır ve devam etmeden önce doğrulamalıdır; böylece üç adım değil bir adım sapabilir. Her görev kabul kriterleri ve bunları kanıtlayan tam komutları taşır; ilerleme giderken repoya yazılır, görev başına bir durumla; sapma size, sonraki oturuma ve sonraki ajana görünür olur. Bir plan, Final Review dahil her şey doğrulanana kadar bitmiş değildir. Dürüst uyarı: metodoloji bir ajanın baştan zayıf bir kabul kriteri yazmasını engelleyemez; sapmayı sessiz yerine gürültülü yapar.

[Çekirdek döngü](https://deepworkplan.com/tr/methodology/02-core-loop)

### Plan bir kez üretilip elle sürdürülür mü, yoksa kodla birlikte evrilir mi?

Hiçbiri. Bir hedeften bir kez üretilir ve sonra işin parçası olarak sürdürülür. Plan kasıtlı olarak kod diff'lerinden yeniden yazılmaz; çünkü kodu kovalayan bir spec gecikmeli bir ayna olur — metodolojinin ortadan kaldırmak için var olduğu sapma budur. Kasıtlı olarak evrilir: kapılar güncel repoya karşı yeniden çalışır, başarısız bir kapı iyileştirmeyi tetikler ve ajan bu iyileştirmeyi çalışma sırasında yapar; siz önden onaylar, sonda incelersiniz. Dokümantasyon ve testler, güncellemek her görevin kapısının içinde olduğu için yapı gereği kodla birlikte evrilir.

[Metodolojiyi okuyun](https://deepworkplan.com/tr/methodology)

### Oturum yarıda kesilirse ne olur?

İlerleme sohbette değil diskte yaşar. README onay kutuları, her görevin günlüğü, sınırlı bir çalışma indeksi ve makine tarafından okunabilir bir durum dosyası her görev sınırında güncellenir; durum dosyası planlı her duraklamadan önce bir kontrol noktası kaydeder. Yeni bir oturum veya farklı bir ajan bu kompakt indeksi okur, repoyla ve git geçmişiyle uzlaştırır ve bitmiş işi yeniden yapmadan ilk tamamlanmamış görevde devam eder. Yarıda kesilen plan oluşturma bile kurtarılabilir: planın kimliği ve amaçlanan görev listesi herhangi bir görev dosyasından önce yazılır; böylece yarım oluşturulmuş bir plan tahmin edilmek yerine tamamlanabilir veya atılabilir.

[Çekirdek döngü](https://deepworkplan.com/tr/methodology/02-core-loop)

### Final Review nedir?

Her planın zorunlu tek kapanış görevi. Sırayla: planın birikmiş tam değişiklik kümesi üzerinde bir güvenlik geçişi, AI Diff Reviewer skill'iyle diff'in zorunlu yerel incelemesi dahil; kritik bulgular düzeltilene veya açıkça kabul edilene kadar tamamlamayı engeller; son durum doğrulaması, yani nihai kodda deponun geçerli test, lint, type-check ve format suite'lerinin tamamı; ve her görevin kaydettiği skills kararlarının uzlaştırması. Ajan sonra teslim edilenleri, kanıtları ve sınırlamaları raporlar ve yalnızca siz istediğinizde oluşturarak bir kez Executive Report sunar.

[Spesifikasyon](https://deepworkplan.com/tr/spec/dwp-specification)

## Diğerleriyle karşılaştırma

### Spec Kit, OpenSpec veya Kiro gibi spec odaklı araçlardan nasıl farklıdır?

Bitişik sorunları çözerler. Spec odaklı araçlar neyin değişmesi gerektiğini yakalamada mükemmeldir: tekrarlanabilir biçimde spesifikasyonlar, gereksinimler ve değişiklik önerileri. Deep Work Plan, bir ajanın saatlerce sapmadan nasıl yürüteceğiyle ilgilidir: kuruluma alınmış harness, dokunulan yüzeyden seçilen görev başına doğrulama kapıları, diskte sürdürülebilir durum, güvenlik geçişiyle zorunlu Final Review ve reponun kendisi için bir uyumluluk denetleyicisi. İkisi birleştirilebilir; bir spec veya değişiklik önerisi bir plana beslenir. Karşılaştırma sayfası yetenekleri yan yana, her aracın kendi terimleriyle düzenler.

[Karşılaştırmayı görün](https://deepworkplan.com/tr/compare)

### BMAD, Superpowers, Get Shit Done veya Gentle-AI gibi ajan iş akışı araçlarından nasıl farklıdır?

Bu çerçeveler güçlü çalışma stilleri getirir: roller, ilkeler, test-first adımlar, doğrulama alışkanlıkları. Deep Work Plan ikisinden de farklıdır; repoda ne kalır ve ne kontrol edilebilir odaklanır: soğuk okunabilen herhangi bir harness, kabul kriterleri ve kapılarla görev dosyaları, oturumu atlatan durum, CI-dostu çıkış kodlu uyumluluk denetleyicisi ve her akışın kaç talimat byte’ı yüklediğinin yayımlanmış ölçümü. Yapı gereği araçtan bağımsızdır ve core loop’a hizmet, sağlayıcı veya secret eklememez. Karşılaştırma sayfası her yaklaşımın yerleşik, isteğe bağlı veya kapsam dışı olduğu yerleri gösterir. Gentle-AI, halihazırda kullandığınız kodlama ajanlarını yapılandırır: oturumlar arasında kalıcı bellek (Engram), seçilmiş beceriler, persona'lar, MCP sunucuları, isteğe bağlı Spec-Driven Development ve isteğe bağlı kanıta dayalı inceleme (Receipt-Driven Development). Her ajanın yapılandırma dizinlerine yazır ve planlama çıktılarını Engram'da, OpenSpec dosyalarında veya her ikisinde tutabilir. Katmanlar bir arada durabilir: Gentle-AI ajana donanım sağlar; Deep Work Plan uzun işi repoda kalıcı ve doğrulanabilir kılar.

[Karşılaştırmayı görün](https://deepworkplan.com/tr/compare)

### Neden yalnızca ajanımın yerleşik plan modunu kullanmıyorum?

Yerleşik plan modları kullanışlıdır ve Deep Work Plan aynı alt yapı üzerine kurulur: `AGENTS.md` kuralı ve açık Agent Skills standardı. Fark, planın nerede yaşadığı ve neyin onu zorladığıdır. Yerel planlar genellikle reponun dışında yaşar ve oturumla sona erer; Deep Work Plan planı, durumunu ve kanıtını repoya yazır; böylece başka bir ajan veya ekip arkadaşı devam edebilir ve her görev yürütülebilir bir kapı ve kayıtlı bir günlük taşır. Düşünmek için ajanınızın plan modunu kullanmaya devam edersiniz; metodoloji dayanıklı, doğrulanabilir yürütme döngüsünü ekler.

[Karşılaştırmayı görün](https://deepworkplan.com/tr/compare)

## Benimseme

### Kuruluma alma repoma ne yazır ve mevcut dosyalara dokunur mu?

Kuruluma alma yıkıcı değildir: mevcut `AGENTS.md`, `docs/`, `.agents/` veya `CLAUDE.md` dosyasını algılar, üzerine yazmak yerine uzlaştırır ve bir şeyi değiştirmeden önce sorar. Gerçek komutlarla `AGENTS.md` dizini, akıl yürütülmüş bir `docs/` ağacı, modül başına docs, ince `dwp-*` komutlarıyla `.agents/` kiti, gitignore'lanmış bir `.dwp/` çıktı alanı, doğrulanmış bir test haritası ve zorunlu yerel kod incelemesi (AI Diff Reviewer skill'i artı repoya uyarlanmış inceleme eklentisi) yazır. Sonra ne üretildiğini görebilmeniz için self-check ve uyumluluk denetleyicisini çalıştırır. Daha önceki bir sürümle kuruluma alınmış bir repo, yalnızca eksik olanları değiştiren hedefli bir yükseltme alır.

[Benimseme uç noktası](https://deepworkplan.com/tr/init)

### Maliyeti nedir ve verimlilik nasıl ölçülür?

Metodoloji ve skill MIT lisanslı ve ücretsizdir; core akışlarda hizmet, API anahtarı ve telemetri yoktur. Verimlilik, her akışın yüklediği talimat byte sayısı olarak raporlanır; skill ile commit edilen bir betikle ölçülür ve bir değerlendirme defterinde yayımlanır; artışlar azalışlar kadar açıkça raporlanır. Token yüzdeleri veya maliyet tasarrufu olarak raporlanmaz; çünkü byte envanteri bunları kanıtlamaz; sonuçları düzgün ölçmek için önceden kayıtlı bir kamu değerlendirmesi planlanmaktadır.

[Güven ve açıklama](https://deepworkplan.com/tr/trust)

## Hâlâ bir sorunuz var mı?

GitHub'da bir tartışma veya issue açın. Tekrar tekrar gelen sorular bu sayfaya eklenir.

[GitHub'da sorun](https://github.com/DailybotHQ/deepworkplan-website/issues)
