---
title: "Deep Work Plan — yapay zeka kodlama ajanları için yapılandırılmış yürütme"
description: "Önce spesifikasyon, kapalı döngü: Deep Work Plan deponuzu AI kodlama ajanları için harness yapar; her plan, insanın başlattığı döngüde sonuna dek çalışır."
lastUpdated: 2026-11-17
---

*Önce spesifikasyon · kapalı döngü*

## Her yapay zekâ ajanı deponuzdaki işi bitirebilsin.

Plan, bağlam ve kontroller deponuzda durur; böylece iş yeniden başlatmalardan sağ çıkar, ajanlar arasında el değiştirir ve her kapı geçilene kadar döngüde devam eder — verdiğiniz yetkinin sınırları içinde.

Deep Work Plan (DWP), yapay zeka ajanlarıyla karmaşık yazılım işlerini planlamak ve yürütmek için açık, MIT lisanslı bir metodoloji ve kittir. Bir kurulum yöntemi seçmez ya da bir şablon kopyalamazsınız — init.md istemini kopyalayıp ajanınıza yapıştırırsınız:

> init.md istemini kopyalayıp kodlama ajanınıza — Claude Code, Cursor, Codex veya herhangi bir diğeri — yapıştırarak herhangi bir depoyu AI-first hale getirin.


- [/init istemini açın](/tr/quickstart)
- [Metodolojiyi okuyun](/methodology)

---

## Metodolojinin dayandığı temeller.

1. **Önce spesifikasyon** — plan kalıcı doğruluk kaynağıdır: atomik görevler, kabul kriterleri ve ajanın geçmesi gereken doğrulama kapıları.
2. **Depo, harness’tir** — bağlam, araçlar, koruma bariyerleri ve durum, herhangi bir ajanın okuyabileceği düz dosyalar olarak depoda yaşar.

3. **Loop engineering** — Planlar sonuna kadar çalışır: kayıt, insanın başlattığı bir daemon, yetki eklemeyen dürtmeler, devralma ve plan olayları.
4. **Ölçülmüş verimlilik** — akış başına yönerge baytları, yöntemiyle birlikte ölçülür ve yayımlanır — asla uydurulmuş token yüzdeleri değil.

---

## Sorun ve çözüm

Kısa hamlelerde kodlama ajanları etkileyicidir. Ona uzun soluklu bir misyon verin — bir göç, yeni bir alt sistem, onlarca dosyayı kapsayan bir yeniden yapılandırma — ve ajan sapar: bağlam dolar, önceki kararlar solur ve saatler süren iş yarı yolda kalır.



Bağlam, ajanın en kıt kaynağıdır. Bu nedenle harness kendi yönergelerini hafif ve denetlenebilir tutar. Yönergeler aşamalı yüklenir, doğrulama değişikliklere odaklanır ve her görev ilgili bağlamı alır. Her akışın yönerge boyutunu bayt cinsinden yayımlayarak bu yükü görünür kılıyoruz. Planlar da işe göre biçimlenir: kapsamı sınırlı bir düzeltme için Lite, saatler süren işler için Full. Biçim işin kapsamını izler; böylece süreç odaklı ve izlenebilir kalır.

---

## İnsanlar dümen tutar. Ajanlar yürütür.

Neyin bitti sayılacağına ve sınırların nerede olacağına siz karar verirsiniz. Plan niyetinizi taşır; ajanlar saatleri çalışır — sürekli gözetim yok, yirmi dakikada bir düzeltme yok.

- Siz: niyet, kabul kriterleri, inceleme
- Ajanlar: yürütme, görev görev
- Plan: ikisi arasındaki sözleşme

[Metodolojiyi okuyun](/tr/methodology)

---

## Ajanların sapamayacağı bir plan.

Uzun görevler her modelin bağlamını doldurur. Ayrıntılar kayar ve ajan saptar. Yazılı bir plan — atomik görevler, doğrulama kapıları, sürdürülebilir durum — her turda geri döndüğü çıpadır.

1. Plan
2. Atomik görevler
3. Doğrulama kapıları
4. Tamamlanma
5. Devam ettirilebilir durum

[Çekirdek döngüyü görün](/tr/methodology)

---

## Bitti bir sözleşmedir, bir his değil.

Her görev, kabul kriterlerini ve geçmesi gereken kontrolleri adlandırır. Ajan kendini bitmiş hissedemez — geçmek zorundadır, aksi hâlde görev açık kalır.

- Testler geçer
- Tür denetimi geçer
- Kabul kriterleri karşılanır
- Yoksa görev açık kalır

[Şartnamayı okuyun](/tr/spec)

---

## Depo, harness’tir.

Bağlam, araçlar, koruma bariyerleri ve durum; herhangi bir ajanın okuyabileceği düz dosyalar olarak deponuzda yaşar. Kilitlenme yok, dış beyin yok — bağlam sıfırlamalarını atlatır.

- Diskte kalıcı spesifikasyon
- His değil doğrulama kapıları
- Bağlam sıfırlamalarını atlatır

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Onboarding çıktısını görün](/tr/quickstart)

---

## Planlar sonuna kadar çalışır. Yetki insanlarda kalır.

Loop engineering, bir planın insan tarafından sürekli sorgulanmadan tamamlanmasını sağlar. Aşağıdaki satırlar döngünün yayımlanmış sözleşmelerini açıklar: çoğu herdr-peers kaynaklıdır; plan kuyruğu ise paket sözleşmesidir. Herdr isteğe bağlıdır ve metodoloji onsuz da çalışır.

> Önce spesifikasyon neyi söyler; harness nerede olduğunu söyler; Loop engineering işin nasıl bittiğini söyler.

**Döngü:** Kayıt (`lead claim`, lider ve halef sırası) → Daemon (`autopilot --loop`, bir insan başlatır) → Dürtme (`idle ≥ 5 min`, yetki eklemez) → Devir (`lead takeover`, erişilebilen ilk halef) → Bildirim (`plan-event-v1`, insanın komutuna) → Bitti (`plan_completed`, kapılar geçildi). Lider kaydı olan her açık plan, kendi durumu bitti diyene kadar.



| Sözleşme | Neyi garanti eder | Kaynak (herdr-peers v2.2.2) |
| --- | --- | --- |
| Plan kaydı (`herdr-peers lead claim`) | Döngünün izlediği bir planın, epoch ve halef sırası içeren bir lider kaydı vardır. Yalnızca en yüksek epoch’un sahibi planın lideri olarak hareket eder. | `skills/herdr-peers/protocol.md` §12 |
| Yalnızca insan başlatır (`herdr-peers autopilot start --loop`) | Daemon’u yalnızca bir insan, kendi sözleriyle başlatır. Hiçbir soru, yanıt veya bildirim onu başlatamaz, durduramaz ya da yaptığı şeyi değiştiremez. | `skills/herdr-peers/autopilot.md` §1 |
| Dürtmeler yetki eklemez (`plan_stalled`) | Açık bir planın boşta kalan lideri, devam etmesi için sabit bir istem alır. Kapılar, durma koşulları ve eskalasyonlar önceki gibi bağlayıcıdır; ilerleme olmadan geçen üç istem planı takılmış olarak işaretler. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Haleflere devir (`herdr-peers lead takeover`) | Lider ortadan kalktığında, erişilebilen ilk haleften devralması istenir ve yardımcı kanıtı yeniden denetler. Bir kulvar liderliği yalnızca insanın önceden kaydettiği bir yetkiyle alır. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Plan olayları (`plan-event-v1`) | Bir plan takıldığında, engellendiğinde, liderini kaybettiğinde, kuyruktan başladığında veya tamamlandığında, insanın seçtiği bir komut tek bir plan-event-v1 nesnesi alır. Paket bunun için bir Dailybot bildiricisi sunar. | `docs/schema/plan-event-v1.json` |
| Filo haritası (`plans-v1` · `fleet-v1`) | Her makine planlarını plans-v1 olarak bildirir; daemon her makinenin, ajanın, deponun ve planın fleet-v1 haritasını tutar ve fleet ui bunu salt okunur olarak gösterir. | `docs/schema/fleet-v1.json` |
| Plan kuyruğu (`dwp-queue-v1`) | Paket kuyruğu doğrular ve yazar; daemon bekleyen planları sürdürmek için kuyruğu okur. | `skills/deepworkplan/shared/queue.py` |
| Lider doğrulaması (`herdr-peers lead verify`) | Herhangi bir birleştirme, etiket veya sürümden önce lider, planı her makinede hâlâ elinde tuttuğunu doğrular. Daha yeni bir lider bunu reddeder; erişilemeyen bir makine, bu risk kayda geçirilerek kabul edilmedikçe işlemi durdurur. | `skills/herdr-peers/protocol.md` §12 |

Karar beyni (`--brain`) ve lider ataması (`--appoint`), aynı daemon’un tercihe dayalı bayraklarıdır ve her biri bir insan tarafından açılır. Daemon asla birleştirme yapmaz, sürüm yayımlamaz, oturum açmaz veya bir izni değiştirmez.

[Herdr eklentisini okuyun](/tr/kit/herdr)

---

## Akış başına yönerge baytları, ölçülmüş.

Harness, her akışın başlamadan önce okuması gerekenleri yayımlar: yönlendirici, alt skill ve bağlantı verdiği paylaşılan kaynaklar. Bunlar yayımlanmış paketin zorunlu okuma kümeleridir.

| Akış | Giriş paketi (bayt) |
| --- | ---: |
| `create` | 74.974|
| `execute` | 55.136|
| `resume` | 32.023|
| `refine` | 77.014|
| `onboard` | 82.051|
| `status` | 27.311|
| `verify` | 36.701|

Birim: dosya sistemi baytı. Yayımlanmış paket üzerinde aşağıdaki komutla ölçülmüştür: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.6).

Sağlayıcı token’ları, maliyet ve döngü kapanış istatistikleri gösterilmez: henüz hiçbir etiketli kaynak bunları ölçmüyor, bu yüzden satırları yok. Betiğin bayt ÷ 4 token rakamı etiketli bir tahmindir, asla bir ölçüm değildir.

[Değerlendirme kaydını okuyun](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.6/docs/EVALUATION.md)

---

## Ne elde edersiniz

- Gerçek yığınınız ve komutlarınızdan akıl yürütülmüş, depo kökünde bir AGENTS.md.
- Kategorize edilmiş bir `docs/` ve modül başına dokümanlar.
- `.claude → .agents` sembolik bağıyla bir `.agents/` dizini (skill’ler, ajanlar, komutlar).
- Her ajan için bir kez kurulan Deep Work Plan skill’i — author alt skill’i dahil; böylece depo kendi skill’lerini, ajanlarını ve komutlarını büyütebilir, ayrıca dependency-upgrade ve kullanıcıya dönük herhangi bir arayüz yüzeyi için design-system eklentisi gibi tercihe dayalı eklentiler.
- Gitignore’lanmış bir `.dwp/` klasöründe uzun soluklu, kaldığı yerden sürdürülebilir planlar. Metodolojinin kendisi daemon ya da harici durum gerektirmez; isteğe bağlı döngü daemon’u süreklilik ekler, asla bir bağımlılık eklemez.
- Çoklu ajan delegasyonu ve Ekosistem 1.0 — izole git worktree lerinde paralel ajanları güvenle koordine edin; doğrulanmış kanıtlar ve ekosistem eklentileriyle çalışın.

---

## Çalıştırdığınızda ne olur

1. **Ajanınız [/init.md](/init.md) dosyasını açar** — onboarding istemini ve bağlandığı metodolojiyi, spesifikasyonu ve kiti okur.
2. **Deep Work Plan skill’ini kurar** — her depoda aynı olan motor: yönlendirici ve alt skill’leri (create, execute, refine, resume, status, verify, onboard, author, upgrade); Claude Code, Cursor, Codex, Gemini ve Copilot için.
3. **Deponuzu uyarlar** — gerçek yığınınız hakkında akıl yürüterek (asla kopyala-yapıştır yapmadan), AGENTS.md, `docs/`, modül başına README dosyaları, akıl yürütülmüş bir `.agents/` kiti ve gitignore’lanmış bir `.dwp/` yazar. Deponuz harness haline gelir.
4. **Planlar ve yürütürsünüz** — uzun soluklu Deep Work Plan’ler, açık kabul kriterlerine ve doğrulama kapılarına karşı adım adım, saatlerce otonom biçimde çalıştırılır.
5. **Döngüyü bir insan başlatır** — i̇steğe bağlı, Herdr eklentisiyle: `herdr-peers autopilot start --loop` komutunu siz çalıştırırsınız — asla bir ajan değil. Lider kaydı olan her açık plan sonuna kadar çalışmayı sürdürür ve bir plan takıldığında, engellendiğinde veya tamamlandığında bildiriciniz bundan haberdar olur.

Skill, her yerde aynı şekilde kurulan yeniden kullanılabilir motordur; uyarlanan şey deponuzdur. Kurulum mekaniği (Skills CLI, OpenClaw veya git clone) [/init.md](/init.md) isteminde ve [hızlı başlangıçta](/quickstart) yer alır.

---

## Metodoloji, spesifikasyon ve kit

- [Metodolojiyi okuyun](/methodology) — DWP’nin ne olduğu, ilkeleri, iş akışı ve nasıl benimsenir.
- [Spesifikasyonu okuyun](/spec) — görev anatomisi, doğrulama kapıları, tamamlama protokolü, arketipler ve eklentiler.
- [Kiti keşfedin](/kit) — DWP’yi bir depoya kurmak için hazır ayarlar, adaptörler ve komutlar.
- [Örnekleri görün](/examples) — gerçek mühendislik işinin önce-sonra anlatımları.

---

## Onu kim inşa eder

Deep Work Plan, [Dailybot](https://www.dailybot.com) bünyesindeki gerçek mühendislik işinden doğdu ve Dailybot ile açık kaynak topluluğu tarafından birlikte sürdürülüyor.

- [Metodoloji hakkında](/about)
- [Topluluk ve iletişim](/contact)
- [GitHub deposu](https://github.com/DailybotHQ/deepworkplan-website)
