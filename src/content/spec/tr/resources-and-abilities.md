---
title: Kaynaklar ve yetenekler
description: "Görev başına bağlam manifestoları, kaynak zarfı, ana makine yetenekleri, .dwp/config.json eklenti kaydı ve etkin eklentilerin eklediği yetenekler."
order: 10
lang: tr
section: Record layer
---

# Kaynaklar ve yetenekler

> **Sürüm kapsamı:** Bu sayfa, güncel standart DWP 7.0.0'ın `v7.9.0` sürümündeki dört normatif belgeyi yeniden ifade eder: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/CONFIG.md) ve [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_ABILITIES.md). Bu sayfa ile bu dosyalar ayrıştığında dosyalar geçerlidir.

**Durum: Kararlı (bağlam ve kaynaklar 6.0.0'dan beri; yapılandırma ve yetenekler 7.0.0'dan beri).** Bu kurallar v6 hattı planları bağlar ([Kayıt katmanı](/spec/record-layer)); v5 standardına dokunulmaz. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

## Görev başına bağlam manifestosu

Her görevden önce ajan, sözleşmeden ve tüm günlükten bir **bağlam manifestosu** türetir (`context_manifest.py`). Bu türetilmiş bir görünümdür, asla durum olarak saklanmaz: aynı kayıtlardan iki kez türetmek özdeş baytlar ÜRETMELİDİR ve manifesto planın ve deposunun dışını OKUMAMALIDIR. Biçimi [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json) olarak yayımlanmıştır.

| Bölüm | Türetildiği kaynak |
| --- | --- |
| `identity` | plan adı, canlı sözleşme kimliği ve revizyonu |
| `authorization` | onay kontrol noktaları dahil, olduğu gibi onay olayları |
| `repository_rules` | sözleşme kapsamı ve güncel değerlendirme durumlarıyla değişmezler |
| `acceptance` | kapanış durumlarıyla görevin kriterleri |
| `touched_surface` | güncel içerik özetleriyle beyan edilmiş dosyalar; eksik bir dosya eksik olarak görünür |
| `evidence` | diskte çözümlenen, pencere içindeki kanıt işaretçileri |
| `dead_ends` | başarısız kapılar, retler, reddedilen uyarlamalar ve ayırt edici olmayan kontroller |
| `freshness` | manifestonun özetlediği girdilerin parmak izi |
| `next_action` | somut bir komutla tam olarak bir sonraki adım |

`authorization`, `repository_rules` ve `acceptance` **zorunludur**: bağlam budaması kabul veya yetkilendirme sınırını asla gizleyemez. Sonraki eylem merdiveni sıralıdır (onay, başlangıç, otorite, kontrol, kanıt, tamamlanma) ve sıradan bir geçen kapıyı asla kontrollü bir kriteri kapatıyormuş gibi sunmaz.

**Çıkmaz yollar korunur.** Bir girdi özetten yalnızca kanıtlanmış kayıt olgularıyla çıkar (aynı parmak izi daha sonra geçti, daha yeni bir yinelenen ret onun yerini aldı ya da bir sözleşme revizyonu onu eskitti); salt bir yüzey değişikliği onu DÜŞÜRMEMELİDİR. **Tazelik denetlenir:** kaydedilmiş girdi parmak izi artık eşleşmeyen bir özet bayattır ve parmak izi olmayan bir özet yapısı gereği bayattır. **Geçmiş yalnızca tetikleyiciyle yüklenir** — kaydedilmiş bir devir ya da görevi etkileyen bir değişiklik; aksi hâlde görevin bağlamı yalnızca manifestodur.

## Dört nicelikli muhasebe

Talimat yükü ve maliyet dört ayrı nicelik olarak raporlanır: statik **talimat baytları**, **sağlayıcı token'ları** (yalnızca bir ana makine ölçeri bunları kaydettiyse), **parasal maliyet** (yalnızca kaydedilmiş gerçek oran örneklerinden) ve **duvar saati süresi** (olay zaman damgalarından). Eksik bir nicelik gerekçesiyle birlikte eksik olarak raporlanır, asla tahminle doldurulmaz ve baytlar asla token'a veya paraya dönüştürülmez.

## Ana makine yetenekleri

Çalışma zamanı ana makinesi **yeteneklerini** kapalı bir kümeden belirtir: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Bilinmeyen bir yetenek reddedilMELİDİR ve belirtilmemiş bir yetenek `false` kabul edilir. **Asgari ana makine** — model değiştirme yok, alt ajan yok, telemetri yok, durdurma yok — desteklenen bir duruştur, asla bir hata değildir; eksik bir yetenek gerektiren her sınır, eksik yetenek adlandırılarak tavsiye niteliğine düşer.

Yetenekler yetki değildir. Sözleşmedeki bir yetki otoritedir; bir yetenek ise ortamın gerçekte yapabildiği şeydir. Bir yetenek gerektiren her duruş yine de ilgili yetkiyi gerektirir.

## Kaynak zarfı

Bir sözleşme, kaynak zarfında sınırlar BEYAN EDEBİLİR. Bir sınır yalnızca gerçek bir ölçüm kaynağını adlandırdığında **uygulanır**; aksi hâlde **tavsiye niteliğindedir** ve ana makineler arasında uygulama eşitliği asla iddia edilmez.

- **Sayaç kaynakları.** Günlükten gözlemlenebilen sayaçlar (duvar saati aralığı, kapı yeniden denemeleri, dağıtım çağrıları) planın kendi kayıtlarından hesaplanır. Yalnızca ana makineye özgü sayaçlar (harcama, sağlayıcı token'ları) eşleşen ölçer yeteneğini ve bir ana makine bağdaştırıcısından gözlemlenmiş bir örneği gerektirir; eksik bir sayaç ücretsiz kullanım demek değildir.
- **Rezervler.** Bir sınır, doğrulama, yeniden deneme ve sürdürmenin sıradan iş tarafından aç bırakılmaması için bir `reserve` BEYAN EDEBİLİR: harcanan artı bekleyen, sınır eksi rezervi aşacaksa dağıtım reddedilir.
- **Tükenme.** Bir sınıra ulaşmak tamamlanmamış bir kontrol noktasını kalıcı kılar, `LIMIT: exhausted <id>: <detail>` kaydeder ve açık bir `LIMIT: recovered <id>` kaydına kadar dağıtımı bekletir. Bir tükenme asla bir kabul kriterini karşılayamaz.
- **İptal mutabakatı.** Süren bir rezervasyon tam olarak bir kez, serbest bırakılmış veya taahhüt edilmiş olarak kapanır; çelişen ikinci bir kapanış reddedilir, asla hakemlik yapılmaz.
- **Yönlendirme duruşu.** Varsayılan, sabit bir modeldir. Model katmanı değiştirme hem `model_routing` yetkisini hem de aynı adlı yeteneği gerektirir; paralel dağıtım hem `agent_delegation` yetkisini hem de `subagents` yeteneğini gerektirir. Bir yönlendirme duruşu bir izin beyanıdır, asla bir etkinlik iddiası değildir.

## Yapılandırma dosyası ve eklenti kaydı

`.dwp/config.json` (depo) ve `~/.dwp/config.json` (kullanıcı), [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json) olarak yayımlanan tek bir biçimi ve tek bir ayrıştırıcıyı (`config.py`) paylaşır. **Metodoloji, yapılandırma dosyası ve eklenti olmadan çalışır**; dosyadaki hiçbir şey bir planı, bir akışı veya uyumluluğu bir eklentiye bağımlı kılamaz.

- **Varsayılan olarak izlenir.** Depo dosyası sırları değil, kararları tutar ve ekip arkadaşları ile CI aynı kaydı okusun diye git tarafından izlenir: kuruluma alma `.gitignore` kuralı olarak `.dwp/*` artı `!.dwp/config.json` yazar. Planlar ve kıyaslama kayıtları yok sayılmaya devam eder.
- **Öncelik.** Depo dosyası kullanıcı dosyasına üstün gelir ve olmayan bir dosya her şeyin devre dışı olduğu anlamına gelir. `addons` anahtarı eklenti anahtarı bazında, `benchmark` anahtarı ise bütün olarak çözümlenir.
- **Kayıt anahtarları** paket içi eklenti dizini adlarıdır: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Her girdinin `enabled` (yalnızca `true` etkinleştirir), isteğe bağlı bir `version` ve isteğe bağlı tek satırlık bir `note` alanı vardır. Bilinmeyen bir anahtar tek bir uyarıyla yok sayılır.
- **Olmayan, etkin değil demektir.** Herhangi bir şeyi yalnızca geliştiricinin onayıyla yapılan kuruluma alma, bir eklentinin kendi kurulum adımı veya insan etkinleştirir. Tespit edilmeyen ve bir not taşıyan etkin bir eklenti ertelenmiş olarak raporlanır.
- **Kapalı başarısızlıkla okuma.** Okunamayan bir dosya veya hatalı bir değer hiçbir katkı yapmaz ve tam olarak bir uyarı üretir; bir okuyucu bir akışı asla durdurmaz ve neyi attığı konusunda asla sessiz kalmaz. Yazıcı atomik olarak uzlaştırır ve ayrıştıramadığı bir dosyanın üzerine yazmayı reddeder.
- **Ana makine kaydı.** İsteğe bağlı bir `host` anahtarı makinenin beyan edilen yeteneklerini (kapalı kümeden boolean değerler) kaydeder. `telemetry: true` yine de geliştiricinin onayını gerektirir.
- **Temel değişmez.** AI Diff Reviewer yerel incelemesi, kayıt onu adlandırsın ya da adlandırmasın her Final Review'in parçası olarak kalır.

## Eklentilerin sağladığı yetenekler

7.0.0'dan itibaren etkin eklentiler çalışma zamanında yetenek ekleyebilir:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

Yani etkin yetenekler; ana makinenin beyan ettiği yetenekler ile etkin olan, geçerli bir `addon.json` ile tanımlanan, tespit edilen ve uyumlu bir arayüz sürümünde bulunan her eklentinin sağladığı yeteneklerin birleşimidir.

- **Tanımlayıcılar.** Paket içi her eklenti, anahtarını, ne sağladığını ve nasıl tespit edildiğini beyan eden bir `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) ile gelir.
- **Tespit salt okunurdur.** Bir tespit komutu kabuk olmadan, stdin kapalı ve 10 saniyelik bir zaman aşımıyla çalışır ve yazdırdığı hiçbir şey çalıştırılmaz. Bildirdiği arayüz ana sürümü sabitlenmiş olandan farklı olan bir ürün tek bir uyarıyla kullanılamaz sayılır.
- **Etkin değilse danışılmaz.** Devre dışı bir eklentinin tanımlayıcısı açılmaz ve tespit komutu çalıştırılmaz. Birleşim monotondur: bir eklentiyi etkinleştirmek yalnızca yetenek ekleyebilir.
- **Asla kalıcı kılınmaz.** Etkin yetenekler her çağrıda yeniden hesaplanır ve bir plana YAZILMAMALIDIR. Bir plan neyin mevcut olduğunu değil, ne kullandığını kaydeder — devretme olayı taşıyıcısını ve eklentisini adlandırır.
- **Yetenekler otorite değildir.** agentkit eklentisi `subagents`, `cancel_children` ve `model_routing` sağlayabilir; Herdr eklentisi `subagents` ve `cancel_children` sağlayabilir. Devretme yine de sözleşmenin `agent_delegation` yetkisini gerektirir ([Devretme](/spec/delegation)).

`resources.py abilities` etkin kümeyi ve her yeteneğin nereden geldiğini yazdırır; salt okunurdur.

## İlgili

- [Kayıt katmanı](/spec/record-layer) — sözleşme, günlük ve kanıt.
- [Devretme](/spec/delegation) — bir planın `subagents` yeteneğini nasıl kullandığı.
- [Eklentiler](/spec/addons) — isteğe bağlı eklentilerin kendileri.
