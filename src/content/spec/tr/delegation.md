---
title: Devretme
description: "Bir v7 planının parallel_safe görevleri agent_delegation yetkisiyle başka kodlama ajanlarına nasıl devrettiği, devretme kayıtları ve gözlemlenmiş kanıt."
order: 11
lang: tr
section: Record layer
---

# Devretme

> **Sürüm kapsamı:** Bu sayfa, `v7.9.0` sürümündeki v7 sözleşme neslini yeniden ifade eder. Kanonik kaynaklar: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) ve yürütme akışının [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) dosyası. Bu sayfa ile bu dosyalar ayrıştığında dosyalar geçerlidir.

**Sürüm 7.0.0. Durum: Kararlı.** v7, yeni bir yaşam döngüsü değil, [kayıt katmanının](/spec/record-layer) yeni bir sözleşme neslidir: bu sayfa aksini söylemedikçe v6 sözleşmesi, yaşam döngüsü, bağlam ve kaynak belgelerindeki her şey geçerlidir. Devretmemek her zaman doğrudur. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

## v7'nin ekledikleri

v7, kayıt katmanına tam olarak iki şey ekler:

1. **Sözleşmede isteğe bağlı bir görev alanı**: [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) içinde yayımlanan `parallel_safe`.
2. **Bir günlük olay türü**: [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) içinde yayımlanan `delegation`.

v1, v2, v5 ve v6 şema baytları değişmemiştir. Hiç devretme yapmayan bir plan, şema URL'leri dışında bir v6 planından ayırt edilemez.

## `parallel_safe`

`parallel_safe` (boolean, varsayılan `false`), bir görevin kardeş işlerle iç içe geçmeden bir delegede çalışabileceğini beyan eder. `create` tarafından konur, yürütme sırasında asla çıkarsanmaz ve yalnızca aşağıdakilerin tümü sağlandığında konur:

- depo, [eklenti kaydında](/tr/spec/resources-and-abilities#yapılandırma-dosyası-ve-eklenti-kaydı) bir devretme eklentisini (agentkit veya Herdr) etkinleştirir;
- görevin dokunulan yüzeyi, aynı anda sürüyor olabilecek bir kardeş görevle çakışmaz;
- görev sınırlı bir çıktı beyan eder;
- görevin kapıları bu planda çalışır.

Bir görevi işaretlemek hiçbir otoriteyi değiştirmez: `agent_delegation` yetkisi olmayan bir sözleşme işaretçiler taşıyabilir ve bunlar hiçbir şeye izin vermez.

## `delegation` olayı

Bir delegenin her durum geçişi için bir olay kaydedilir:

| Alan | Anlamı |
| --- | --- |
| `task` | delegenin çalıştığı `T-*` görevi |
| `delegation_id` | bir başlatmayı uç geçişiyle ilişkilendirir |
| `transport` | `headless` (agentkit) veya `interactive` (Herdr) |
| `via` | onu taşıyan eklenti anahtarı |
| `state` | `launched`, ardından tam olarak `completed`, `failed`, `cancelled` değerlerinden biri |
| `kind`, `profile` | isteğe bağlı: kodlama ajanının türü ve profili |
| `target` | isteğe bağlı: çalışma dizini (headless) veya `machine:pane` (interactive) |
| `worktree` | delegenin kendi git worktree'si ya da salt okunur bir delege için `null` |
| `prompt_digest` | başlatmada: delegeye güvenilmeden önce kaydedilen istemin SHA-256 özeti |
| `result_path`, `result_digest` | tamamlandığında veya başarısız olduğunda: toplanan sonuç ve özeti |

Geçişler kapalıdır: her devretme için bir `launched`, ardından tam olarak bir uç durum. Bir devretme olayının ham olarak günlüğe eklenmesi reddedilMELİDİR; devretme olayları yalnızca kapılı yazıcı aracılığıyla var olur.

## Bir devretme kanıt değildir

Bir devretme hiçbir güven etiketi ve kanıt yolu taşımaz ve hiçbir kapanış onu okumaz. Bir delegenin sonucu, bu planın kendi kapı çalıştırıcısı onu gözlemleyene kadar **asserted** kalır: üst plan işi bütünleştirir, ardından görevin kapısını (`ledger.py gate`) çalıştırır; `observed` kanıtı üreten tek şey ve görevin tamamlanabilmesinin tek yolu budur. Tamamlanmış bir devretme asla bir kriteri kapatmaz; başarısız bir devretme kaydedilmiş bir sonuçtur ve görev bu durumda üst plan tarafından uygulanır.

## Kapılı yazıcı

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| İşlem | Yazar mı | Etkisi |
| --- | --- | --- |
| `launch` | evet | aşağıdaki denetimlerden sonra `launched` kaydeder |
| `observe` | hayır | her devretmenin en son durumunu yazdırır |
| `collect` | evet | sonuç yolu ve özetiyle `completed` veya `failed` kaydeder |
| `cancel` | evet | `cancelled` kaydeder |

Aşağıdakilerin **tümü** sağlanmadıkça `launch` reddedilMELİ ve ret kaydedilMELİDİR:

1. sözleşme v7'dir;
2. sözleşme `agent_delegation` yetkisini verir;
3. görev vardır, başlamıştır ve tamamlanmamıştır;
4. görev `parallel_safe` olarak işaretlidir **veya** delege salt okunurdur (worktree yoktur);
5. adı verilen eklentinin tanımlayıcısı istenen taşıyıcıyı beyan eder;
6. etkin yetenekler o eklentiyi bir `subagents` kaynağı olarak listeler ([Kaynaklar ve yetenekler](/tr/spec/resources-and-abilities#eklentilerin-sağladığı-yetenekler)).

`collect` ve `cancel`; bilinmeyen bir devretme, başka bir göreve ait bir devretme veya zaten uç durumda olan bir devretme için reddedilMELİDİR. Reddedilen bir başlatma bir engelleyici değildir: görev ardışık olarak çalışır.

## Taşıyıcılar

Defterdeki hiçbir şey bir delegeyi çalıştırmaz; bunu taşıyıcı eklenti yapar.

- **Headless** (`via: agentkit`) — beyan edilmiş bir çıktısı olan sınırlı bir `parallel_safe` görev için: ayrılmış bir git worktree'sinde tek bir `ak run`, ardından çıkış. Salt okunur delegeler `--ask` ile başlatılır.
- **Interactive** (`via: herdr`) — etkileşim gerektiren, uzun süren veya başka bir makinede çalışan işler için: bir Herdr panelinde, tam olarak bir yetkili yanıt döndüren bir herdr-peers eşi.

## Korkuluklar

- **Her yol için tek yazıcı.** Yazan bir delege yalnızca kendi worktree'sinde çalışır; günlüğe yazan tek taraf üst oturumdur.
- **Derinlik 1.** Bir delege asla devretme yapmaz. Yayılım taşıyıcı tarafından sınırlanır.
- **Sonuçlar veridir.** Bir delegenin döndürdüğü şey hiçbir otorite vermez, kapsamı genişletmez ve kabulü asla değiştirmez.
- **Kendi kendine yeten görev tanımları.** Bir başlatma istemi görevin hedefini, kabul kriterlerini kelimesi kelimesine ve yazabileceği worktree'yi adlandırır ve asla bir sır değeri taşımaz.

## Orkestratörler

Bir orkestratör bir **alt planın** görevlerini asla devretmez: alt planlar, depo başına bir ajanla kendi oturumlarında çalışır. Bir planın **kendi** görevlerini yukarıdaki kurallar altında devretmek hem orkestratör hem de bireysel planlarda serbesttir. Birçok uzun ömürlü kulvarı çalıştırmak, onları hesap sınırlarının ötesinde canlı tutmak ve liderliği devretmek, [orkestrasyon](/methodology/06-orchestration) ve [sürü özerkliği](/methodology/07-swarm-autonomy) metodoloji bölümlerinde ele alınır.

## İlgili

- [Kayıt katmanı](/spec/record-layer) — bu sayfanın genişlettiği sözleşme ve günlük.
- [Kaynaklar ve yetenekler](/spec/resources-and-abilities) — yetenekler, yetkiler ve eklenti kaydı.
- [Herdr eklentisi](/kit/herdr) ve [Agentkit eklentisi](/kit/agentkit) — iki taşıyıcı.
