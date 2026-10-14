---
title: Herdr
description: "İşi herhangi bir makinedeki Herdr panelinde çalışan başka bir kodlama ajanına devredin, yetkilendirilmiş tek bir yanıt alın. Devreden planlar, kayıt altında."
kind: addon
lang: tr
order: 7
---

# Herdr eklentisi

[Herdr](https://herdr.dev), kodlama agent'larını hem kendi makinenizde hem de SSH üzerinden eriştiği makinelerde bölmelere yerleştirir. Bu eklenti, bir Deep Work Plan'ın bu agent'ları **eş** (peer) olarak kullanmasını sağlar: bir plan, sınırları belirli bir görevi başka bir bölmedeki bir agent'a devredebilir, tam olarak bir yetkili yanıt alabilir ve bu alışverişin kaydını tutabilir.

Bu, **DWP v7**'nin (`v7.0.0`) isteğe bağlı bir eklentisidir. Metodoloji onsuz da aynı şekilde çalışır: eklenti yoksa ya da devre dışıysa, her görev tıpkı önceden olduğu gibi mevcut oturumda çalışır.

## Neyi entegre eder

Eklenti ince bir entegratördür. İşi, **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)** yapar: **`v1.0.0`** sürümüne sabitlenmiş, Deep Work Plan olmadan da kullanışlı, bağımsız bir MIT skill'i. Herdr'ın kendisinin açık bıraktığı noktaları tanımlar: kimin yanıt verebileceğini, yanıtın makineler arasında geri dönüş yolunu nasıl bulduğunu, iki agent'ın birbirine sonsuza dek yanıt vermekten nasıl kaçındığını ve "sordum, yanıtladı" kaydının nerede tutulduğunu.

| Öğe | Değer |
|---|---|
| Ürün | `DailybotHQ/herdr-peers`, `v1.0.0` etiketi, protokol 1 |
| Kayıt defteri anahtarı | `.dwp/config.json` içinde `herdr` |
| Taşıma | etkileşimli: bir Herdr bölmesindeki eş |
| Sağladıkları | `subagents`, `cancel_children` |
| Gerektirdiği | plan sözleşmesinin `agent_delegation` yetkisi |

**`v1.0.0` sürümünden beri kararlı.** Genel arayüz anlamsal sürümlemeyi izler: CLI fiilleri ve belgelenmiş bayrakları, `0`–`7` çıkış kodları, belgelenmiş `HERDR_PEERS_*`, `DWP_PLAN` ve `DWP_TASK` değişkenleri, protokol 1 ve `herdr-peers/lanes-v1`, `herdr-peers/lead-v1` JSON sözleşmeleri ile devretme kaydı. Bunlardan herhangi birindeki uyumsuz bir değişiklik ana sürümü yükseltir; kablo biçimindeki bir değişiklik ayrıca protokol numarasını da yükseltir. `v1.0.0`, `v0.3.3` sürümüne göre hiçbir davranışı değiştirmez ve 0.x sürümleri artık desteklenmez.

## Kurulum

herdr-peers'ı ve onun bağımlı olduğu Herdr'ın resmî skill'ini kurun. Agent'larının yanıt vermesi gereken her makinede de bu skill bulunmalıdır.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.0.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Gereksinimler: Herdr 0.9.1 veya daha yenisi, `bash` ve `python3` 3.9 veya daha yenisi (yalnızca standart kütüphane). Onboarding eklentiyi önerir ve yanıtınızı eklenti kayıt defterine kaydeder; eklenti onay olmadan asla etkinleştirilmez.

## Plana neler ekler

- **Bir eşe devretme.** Sözleşmesi `agent_delegation` yetkisi veren bir v7 planında `execute`, `parallel_safe` bir görevi ya da salt okunur bir soruyu, bu makinede veya başka bir makinede, başka bir bölmedeki bir agent'a devredebilir.
- **Tek yetkili yanıt.** İstek, tam olarak bir yanıtı yetkilendiren bir damga taşır. Eş, yardımcı araç üzerinden bir kez yanıt verir ve yanıt da kendi damgasını taşır.
- **Güvenmeden önce kayıt.** Her devretme, yanıt kullanılmadan önce planın `analysis_results/delegations.ndjson` dosyasına yazılır ve v7 `delegation` günlük olayına karşılık gelir.
- **Sonuçlar doğrulanana kadar iddia olarak kalır.** Bir eşin yanıtı, planın kendi kapı çalıştırıcısı onu gözlemleyene kadar `asserted` kanıttır. Bir görevi asla kendi başına kapatmaz.

## Güvenlik modeli

| Kural | Anlamı |
|---|---|
| Önce yetki | Devretme yalnızca plan sözleşmesi `agent_delegation` yetkisi verdiğinde çalışır. |
| Derinlik sınırı 1 | `depth=1` veya `reply-to=` damgalı bir mesaja asla yanıt verilmez ve bir delege asla devretmez. |
| Yayılma sınırı | Varsayılan olarak çağıran başına en fazla dört eş. |
| Talimat değil, veri | Bir yanıt, alıcıya zaten sahip olmadığı bir yetkiyi asla vermez. |
| Yol başına tek yazıcı | Yazma yapan bir eş kendi git worktree'sinde çalışır. |

herdr-peers göndereni doğrulamaz: bir damgadaki `from=` alanı bir iddiadır. Önlem, bir eşin kabul ettiği çalışma alanlarını ve makineleri sınırlayan `HERDR_PEERS_SCOPE` izin listesidir.

## Konteynerler ve ana makine

devcontainer-kit `v1.0.1` üzerindeki [devcontainer](/kit/devcontainer) eklentisiyle her dck konteyneri herdr-peers ile birlikte gelir ve `dck up` sırasında ağa katılır: agent'ları ana makinedeki, diğer konteynerlerdeki ve ana makinenin diğer loopback konteynerlerindeki agent'lara soru sorabilir ve yanıtı geri alabilir. `dck setup`, ana makineye doğrulanmış bir herdr-peers kurar; böylece ana makinedeki agent'lar da yanıt verir. Ana makine dinleyicisi ve diğer konteynerlerin içeri girmesine izin veren ek anahtarlar, kitin ana makine profilinde sizin vereceğiniz kararlardır; bu eklenti bunları asla ayarlamaz. herdr-peers (`v0.2.3`) sürümünden itibaren her makine kendi durumunu tutar (`$XDG_STATE_HOME/herdr-peers/<server>/`), böylece ana makine ile bir konteynerin paylaştığı bir çalışma kopyası artık kayıtlarını karıştırmaz; devcontainer-kit (`v0.3.3`) sürümünden itibaren de konteyner `HERDR_PEERS_SELF` değişkenini kendisi dışa aktarır, böylece içerideki Codex agent'ları elle bir adım gerekmeden diğer makinelere ulaşır.

## Herdr mı agentkit mi

Her iki eklenti de aynı devretme arayüzünü — `launch`, `observe`, `collect`, `cancel` — farklı taşıma yöntemleriyle uygular.

| Durum | Kullanın |
|---|---|
| Bildirilmiş bir çıktısı olan, sınırları belirli `parallel_safe` bir görev | [agentkit](/kit/agentkit) (bir worktree'de başsız `ak run`) |
| Görev etkileşim gerektiriyor, uzun sürüyor ya da başka bir makinede bulunuyor | Herdr (bir bölmedeki eş) |

Aynı anda birçok şerit çalıştıran bir lider için — ana makinede, konteynerlerde ve diğer makinelerde, her biri kendi hesabıyla çalışan bölmeler — `herdr-peers lanes` her şeridi durumuyla birlikte listeler, `herdr-peers status <pane>` engellenmiş bir şeridin bulunduğu ekranı sınıflandırır ve her devretme kaydı işi taşıyan hesabı ve sağlayıcıyı belirtir. Bkz. [Birçok ajanı çalıştırmak](/methodology/06-orchestration).

**Codex lane’leri kendi panellerini belirtir.** Codex bir lane’in komutlarını o hesaptaki tüm oturumların paylaştığı bir arka plan sunucusundan çalıştırır; bu yüzden devraldığı panel kimliği başka bir lane’e ait olabilir. Bir Codex lane’i, liderin görev tanımında yazan kendi panelini her herdr-peers komutunda `--pane <pane>` ile verir (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Bildirimler ve liderlik

herdr-peers (`v0.3.2`), bir sürünün liderinden daha uzun yaşamasını sağlayan şeyleri ekler ([Sürü özerkliği](/tr/methodology/07-swarm-autonomy)):

- **Bildirimler.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>`, `reply=no` damgalı tek yönlü bir mesaj gönderir. Alıcının `check` komutu onu bir bildirim olarak sınıflandırır, veri olarak kaydeder ve asla yanıtlamaz. Bildirimler yayılma kotasından yer harcamaz ve açık bir ask varken de gönderilebilir; devir duyuruları, lider değişiklikleri ve sürüm yayınları için kullanın.
- **Plan başına bir lider kaydı.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>`, bir agent'ı tek bir planın lideri yapar; `lead show` kaydı yazdırır (şema `herdr-peers/lead-v1`: plan, lider, epoch, halef listesi, şeritler, güncelleme zamanı). `lead handover <addr> --plan <P>` liderliği devreder, `lead takeover --plan <P>` lider gittiğinde ulaşılabilen ilk vekilin liderliği almasını sağlar ve `lead release --plan <P>` onu sona erdirir. Her değişiklik epoch'u yükseltir ve her şeride bildirim gönderir. Planı, şeritlerini başlatmadan önce sahiplenin: `lead` ancak bir kayıt var olduğunda çözümlenir. `v0.3.2` sürümünden itibaren kayıt, sahiplenen depoyu yerel olarak tutar ve aynı plan kimliğinin başka bir depodan sahiplenilmesini reddeder; o planı `--plan <repo>/<id>` olarak adlandırın.
- **Çitleme.** Bir şerit, bir lider bildirimini yalnızca kendisine görev tanımını veren agent'tan (ilk sahiplenme), bir sonraki epoch'ta mevcut liderden (devir) ya da bir sonraki epoch'ta halef listesinin ulaşılabilen ilk girdisinden (devralma) kabul eder. Diğer her şey kaydedilir ve yok sayılır; daha yüksek bir epoch gören, geri dönen bir lider görevi bırakır.
- **`lead` adresi.** `ask lead …` ve `notify lead …`, `--plan` (yoksa `$DWP_PLAN`) planının mevcut liderine çözülür; böylece hiçbir şerit görev tanımı liderin bölmesini sabit olarak yazmaz.
- **`usage_limit` ekranları.** `status` ve `lanes`, bir CLI'ın kullanım sınırı mesajını, bir sonraki adımı devir olan `usage_limit` ekran sınıfı olarak tanır. Ona asla tuş gönderilmez. `lanes --json`, planı, liderini, epoch'u ve her şeridin en son bildirdiği kapasiteyi ekler.

Şeritler bilgi ve koordinasyon için birbirlerine de soru sorabilir — bir arayüz, bir bayrak adı, bir dal durumu — ama işi yalnızca lider atar. Derinlik 1 ve yayılma sınırı yine geçerlidir. `v0.2.x` ile bildirimler ve lider kayıtları yoktur: şeritler liderin adresini görev tanımlarından sorar ve bir lider değişikliğini geliştirici aktarır.

## Notlar

İsteğe bağlıdır ve hiçbir zaman zorunlu değildir. Bir depo, sıfır isteğe bağlı eklentiyle tümüyle uyumludur ve hiçbir akış bu eklentiye bağlı değildir. İki bölmeli, makineler arası gidiş-dönüş, simüle edilmiş bir Herdr'a karşı testlerle kapsanmaktadır; ilk çalıştırmayı gözetim altında planlayın.
