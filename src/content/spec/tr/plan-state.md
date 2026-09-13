---
title: Plan durumu
description: "Makine tarafından okunabilir plan durum katmanı: manifest.json ve state.json, kapı kayıtları, bölümsel bellek olarak sonuç kayıtları, uzlaştırma ve ne zaman gerekli olduğu."
order: 8
lang: tr
section: State
---

# Plan durumu

**Sürüm 5.0.0. Durum: Kararlı.** Bu belge, Deep Work Plan metodolojisinin makine tarafından okunabilir plan durum katmanını belirtir; artık DWP standardının kendi sürümüyle hizalıdır — yeniden numaralandırma mevcut hiçbir gereksinimi zayıflatmaz. Bu revizyon ayrıca korumalı durum güncelleyicisini, doğrulanmış plan yayınlamasını ve tamamlanmış bir planın karşılaması gereken kanıt-doğruluğu kurallarını belgeler (aşağıya bakın). MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

İki JSON yapısı — `manifest.json` (planın statik kimliği) ve `state.json` (doğrulama kapısı sonuçları dahil canlı, görev bazında yürütme durumu) — her planın Markdown dosyalarının yanında TASIYABİLECEĞİ ve gözetimsiz yürütmenin (bkz. [Ajan protokolü](/spec/agent-protocol#execution-profiles)) ile git içermeyen çalışma alanlarının (bkz. [Arketipler](/spec/archetypes) §3) TAŞIMAK ZORUNDA OLDUĞU yapılardır.

Markdown planı, **insan tarafından okunabilir doğruluk kaynağı** olmaya devam eder. JSON katmanı, **türetilmiş bir projeksiyon**dur: ajan tarafından tanımlı protokol noktalarında yeniden oluşturulur, elle düzenlenmez ve Markdown ile sessizce çelişmesine izin verilmez. Amacı birlikte çalışabilirliktir — linting, uyumluluk denetimi, fark alma, gösterge tabloları, kayıt defteri keşfi ve harici oturum altyapısıyla senkronizasyon — bunların hiçbiri düz yazı üzerine güvenilir biçimde inşa edilemez.

## Neden var

v1.1'e kadar planlar yalnızca düz Markdown'dı. Bu onları denetlenebilir ve ajandan bağımsız tuttu; ancak bir aracın doğrulayabileceği, fark alabileceği veya tüketebileceği hiçbir şey bırakmadı: uyumluluk kapısı yok, `README.md` ile `PROGRESS.md` arasındaki desenkronizasyon tespiti yok, bir daemon ya da bulut oturumunun düz yazıyı ayrıştırmadan planın durumunu bilmesinin yolu yok. v1.2, Markdown'ı ikincil konuma düşürmeden JSON projeksiyonunu ekler — projeksiyon, bir kilit dosyasının bir manifestodan türetildiği gibi Markdown'dan türetilir.

## Yerleşim

Durum katmanını kullanan bir planın bu düzeni vardır:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← insan tarafından doğruluk kaynağı (değişmedi)
├── PROGRESS.md          ← anlatı günlüğü (değişmedi)
├── PROMPTS.md           ← değişmedi
├── manifest.json        ← statik kimlik (somutlaştırma sırasında yazılır)
├── state.json           ← canlı durum (protokol noktalarında yeniden yazılır)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json`, `create` akışı planı somutlaştırdığında tam olarak bir kez YAZILMALIDIR ve `PROGRESS.md`'de kayıt altına alınan bir spec sürümü geçişi dışında sonrasında DEĞİŞTİRİLMEMELİDİR.

`state.json`, ajan tarafından şu protokol noktalarının her birinde YENİDEN YAZILMALIDIR: plan somutlaştırma (tüm görevler `pending`), görev başlangıcı (`in_progress`), her doğrulama kapısı çalıştırması (kapı kaydı eklendi veya güncellendi) ve görev tamamlama ([DWP spesifikasyonu](/spec/dwp-specification#task-completion-protocol)'ndaki görev tamamlama protokolünün parçası olarak `completed`), planlı herhangi bir kesintiden önce bir kontrol noktası ve bir `blocked` durması.

Her iki dosya da atomik olarak YAZILMALIDIR: aynı dizinde geçici bir dosyaya yazın, ardından hedefin üzerine yeniden adlandırın. Çökmüş bir yazma işlemi yerinde kesik bir JSON dosyası BIRAKMAMALDIR.

## Katman ne zaman gereklidir

- Git deposunda **etkileşimli** yürütme için, durum katmanı yeni planlar için ÖNERİLİR ve v1.2 öncesi planlar için İSTEĞE BAĞLIDIR. Onsuz bir plan uyumlu olmaya devam eder.
- **Gözetimsiz** yürütme için durum katmanı ZORUNLUDUR.
- Git içermeyen bir **ajan çalışma alanında** durum katmanı ZORUNLUDUR: `state.json`, bir depoda git günlüğünün taşıdığı kurtarma bilgisini taşır.

## `manifest.json` — plan kimliği

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` ve `plan_format` ZORUNLUDUR.

`archetype`, `individual`, `orchestrator-hub` veya `agent-workspace` değerlerinden biri OLMALIDIR.

`rigor`, `micro`, `standard` veya `deep` değerlerinden biri OLMALIDIR (bkz. [Orantılı titizlik](/spec/dwp-specification#proportional-rigor)).

`plan_format`, oluşturma sırasında seçilen temsil olan `lite` veya `full` değerlerinden biri OLMALIDIR (bkz. [Lite planlar](/spec/lite-plans)). Manifest düzeyinde değiştirilemezdir: Lite'tan Full'a daha sonraki bir yükseltme, manifestoyu yeniden yazarak değil, `state.json`'da kaydedilir.

`parent_plan`, bir alt planı orkestratör planıyla ilişkilendirir (`{repo}:{plan_name}` veya `null`).

`created_by`, oluşturan ajanı ve modeli belirleMELİDİR. Görünen ad ötesinde sır, token veya kullanıcı tanımlayıcısı İÇERMEMELİDİR.

## `state.json` — canlı yürütme durumu

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Bir Lite planın görev girdileri, ayrı bir dosya yerine görevin `README.md` içindeki çapasına işaret eden bir `inline` locator kullanır — girdi hakkındaki her şey (gates, outcome, status) aynı şekilde çalışmaya devam eder:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Biçim, somutlaştırma, onay ve yükseltme

`format`, manifestonun `plan_format` alanını yansıtan `lite` veya `full` değerlerinden biri OLMALIDIR — ancak manifestodan farklı olarak burada değiştirilebilirdir, çünkü bir Lite plan daha sonra Full'a YÜKSELTİLEBİLİR. `materialization`, `materializing` (plan klasörü yazılıyor), `ready` (somutlaştırma tamamlandı) veya `promoting` (bir Lite'tan Full'a yükseltme sürüyor) değerlerinden biri OLMALIDIR. `approval`, `pending`, `approved`, `pre_approved` değerlerinden biri OLMALIDIR; bu şemada İSTEĞE BAĞLIDIR, böylece kaydedilmeden önce yazılmış bir plan hâlâ geçerli sayılır — yoksa, README'nin `Approval` satırı değer olarak kabul edilir ve ikisi de yoksa `pending` kabul edilir. `promotion`, bir yükseltme dışında `null`'dır veya `materialization` `promoting` iken yükseltmenin amacını ve hedef görevlerini kaydeden bir nesnedir. Bu alanların kodladığı tam yaşam döngüsü için bkz. [Lite planlar](/spec/lite-plans).

### Görev girdileri

Her görev — bir Full planda ayrı bir dosya, ya da bir Lite planda inline bir `{#task-N}` kaydı — `tasks` içinde, numarasıyla (`id`) ve `locator`'ıyla anahtarlanmış tam olarak bir girdiye sahip OLMALIDIR. `locator.kind`, `file` (Full — `value` görevin dosya adıdır) veya `inline` (Lite — `value` görevin çapasıdır, `#task-N`) OLMALIDIR.

`status`, `pending`, `in_progress`, `completed`, `blocked` veya `skipped` değerlerinden biri OLMALIDIR. `skipped` yalnızca kullanıcı `refine` aracılığıyla görevi açıkça kapsam dışına bıraktığında geçerlidir; `state.json`, işi sessizce atlamak için KULLANILMAMALDIR.

`completed` bir girdi, `completed_at` ve planın commit attığı durumlarda kısa `commit` karmasını TAŞIMALIDIR — bu, plan-kod izlenebilirlik bağlantısıdır.

### Kapı kayıtları

Bir doğrulama komutunun her çalıştırması bir kapı kaydı olarak kaydedilMELİDİR: `command`, `passes` (boolean), `exit_code`, `last_run` ve kısa, insan tarafından okunabilir bir `evidence` dizesi (plana yerel `analysis_results/` (planın kendi klasörü içinde, asla depo kökünde değil) altında bir özet satırı veya yol; hiçbir zaman tam komut çıktısı değil).

Bir görev, `state.json`'daki kapı kayıtlarından herhangi birinin `passes: false` değeri varken ve sonraki geçen bir çalıştırma yokken `completed` olarak işaretlenMEMELİDİR. Kapı kayıtları, "kanıtsız tamamlandı işaretleme" kalıbının makine eşdeğeridir — erken tamamlamayı engelleyen görev başına `passes` bayrağı kalıbı.

### Bölümsel bellek olarak sonuç kayıtları

`completed` bir görev bir `outcome` kaydı TAŞIMALIDIR: nelerin `tried` (denendiği), nelerin `failed` (başarısız olduğu), nelerin `worked` (işe yaradığı) ve serbest biçimli `notes` (notlar). Her girdiyi tek satırda tutun.

Sonuç kayıtları, tamamlanmış bir planı erişilebilir **bölümsel bellek** hâline getirir: bir ajan (veya bellek-dizinleme platformu) daha sonra bir sorunun yalnızca çözüldüğünü değil, nasıl çözüldüğünü hatırlayabilir. Bunlar, görev-yerel skill kararlarını ve kalıpları ararken bu kayıtları okuyan Final Review'in skill uzlaştırmasını besler. Hermes gibi ajan belleğini dizinleyen platformlarda, `state.json`'daki sonuç kayıtları tamamlanmış planların ilerideki oturumlar genelinde doğrudan erişilebilir hâle gelmesini sağlar.

### Kontrol noktası ve engellenmiş durum

`checkpoint`, mevcut görevin içindeki en ayrıntılı devam noktasını kaydeder: görev `id`'si, serbest biçimli bir `step` konum belirleyici, zaman damgası ve tek satırlık not. Bir ajan, bir görevin içinde durakladığında onu güncelleMELİDİR; gözetimsiz modda planlı herhangi bir kesintiden önce güncelleMEK ZORUNDADIR.

`blocked`, `null` veya `{ "task": N, "reason": "...", "since": "...", "needs": "..." }` değerindedir. Durma koşuluyla karşılaşan gözetimsiz bir ajan, durmadan önce `blocked` alanını doldurmak ZORUNDADIR — bir daemon'ın sonraki kalp atışının veya bir insanın planın neden durduğunu öğrenmesinin yolu budur.

## Projeksiyon ve uzlaştırma

Markdown her anlaşmazlıkta KAZANMALIDIR. `state.json` görev 4'ün `completed` olduğunu söylüyorsa ancak plan README'si işaretsiz bir kutuyu gösteriyorsa, durum dosyası eskidir.

Devam eden bir ajan, devam etmeden önce README onay kutusu listesini `state.json` ile KARŞILAŞTIRMALIDIR. Desenkronizasyonda, `state.json`'u Markdown'dan (ve mevcut olduğunda git günlüğünden) yeniden oluşturMALI, uzlaştırmayı `PROGRESS.md`'ye kaydetMELI ve ancak o zaman devam etMELİDİR.

`verify` alt skill'i, desenkronizasyonu bir uyumluluk bulgusu olarak ele ALMALIDIR: hangi görevlerin hangi yönde ayrıştığını raporlayın.

Yürüten ajan dışındaki araçlar her iki JSON dosyasını da salt okunur olarak ele ALMALIDIR.

## Korumalı durum güncellemeleri

Sıradan ilerleme yazmaları, tam dosya yeniden yazımı yerine skill ile birlikte gelen hedeflenmiş bir güncelleyiciden geçer. Bozuk durumu açıkça reddeder ve boş olmayan kapı kanıtı eklenmeden bir görevi `completed` olarak işaretlemeyi reddeder — çıktısında boru karakteri (`|`) bulunan bir komut için bir `--gate-json` biçimi mevcuttur ve güncelleyici yukarıda tanımlanan aynı kapalı kapı nesnesini kabul eder. Yeniden denemeler yalnızca kendi komutlarının yerini alır; farklı bir komut kendi ayrı kaydını tutar. `--block-reason` bir engelleyiciyi kaydeder; `--resolve-blocker` yalnızca mevcut görevin engelleyicisini çözer, asla başka bir görevinkini değil. Atlanan iş bir planı asla `completed` yapamaz. `--reopen-reason`, çağıranın planı `refine` aracılığıyla değiştirme niyetini kaydeder — değişiklik ve geçersiz kıldığı herhangi bir kanıt önce görev günlüğüne KAYDEDİLMEK ZORUNDADIR. `--expected-sha256`, artık geçerliliğini yitirmiş bir durum anlık görüntüsüne karşı bir yazmayı reddeder. İşbirlikçi bir `.lock` dizini eşzamanlı yazıcıları sıralar; çökmüş bir yazıcının kilidi kaldırılmadan önce İNCELENMEK ZORUNDADIR ve kilidi tamamen atlayan bir düzenleyiciye karşı hiçbir koruma iddia edilmez. Bu kayıtlar sonuçları doğrular — bir komutun gerçekten çalıştırıldığını veya çıktısının anlamsal olarak kabul edildiğini kendi başlarına kanıtlamazlar.

## Doğrulanmış plan yayınlama

Tamamlanma duyurulmadan önce, biten görev günlükleri (her biri kendi **Skills disposition**'ını ve Final Review'da kendi **Documentation decision**'ını taşıyarak), README dizini ve `PROGRESS.md`, kazanılmış kaynak ve kabul sonuçlarından YAZILMAK ZORUNDADIR. Planın son görevi daha sonra skill ile birlikte gelen sonlandırıcı aracılığıyla kapanır: sonlanma geçişi, durumu yazmadan önce tamamlanmış adayı her plan artefaktına karşı doğrular, ardından dosyaları doğrular ve bir `analysis_results/FINALIZATION.json` makbuzu kaydeder. Uydurulmuş, geçen bir kapı bu geçişi DESTEKLEMEMELİDİR — makbuz, gerçekten neyin kontrol edildiğine dair dışsal bir kanıttır, asla kendi ön koşulu değildir. `bash ../verify/conformance.sh --plan PLAN_name`, hemen ardından, diskteki gerçek artefaktlara karşı çalıştırılır.

Kesintiye uğrayan bir yayınlama yerinde bir `.finalizing.json` işaretleyicisi bırakır; normal doğrulama, kanıt incelenip kurtarma yardımcısı aynı adaya karşı başarılı olana kadar başarısız olur — hiçbir şey bir yayınlamayı varsayımla devam ettirmez. Eski bir işbirlikçi kilit, kaldırılmadan önce hiçbir yazıcının hâlâ etkin olmadığının doğrulanmasını gerektirir. Bu katmandaki hiçbir şey commit atmaz, push yapmaz, kaydedilmiş bir kapı komutunu çalıştırmaz veya planın markdown'unu sessizce onarmaz. Eksik bir Python yorumlayıcısı `completed` değil, `UNVERIFIED` üretir.

## Kanıt doğruluğu ve değişiklikler

Bir görevin kapsamına, kabul kriterlerine veya ertelemesine yapılan her değişiklik, tek bir kalıcı değişiklik kaydı taşır: özgün kriterin tam metni, gözlemlenen şey, karar, gerekçe, bunun arkasındaki otorite (kullanıcı, geliştirici veya kanıt), etkilenen görevler ve hangi kanıtın geçersiz kılındığı veya korunduğu. Değişiklikler eklenir, asla geriye tarihlenmez; `manifest.json` kendi oluşturma kökenini korur ve değişen bir canlı kapsama uyacak şekilde asla yeniden yazılmaz.

Beş kanıt durumu, bir görev kaydının neye karşı kapanabileceğini tanımlar:

- **Tamamlanmış araştırma** — gerçek, kaydedilmiş iş; bir görevi yalnızca onu adlandıran, gözden geçirilmiş bir kritere karşı kapatır, asla yazıldığı haliyle özgün kritere karşı değil.
- **Yürütülmemiş senaryo** — gerçekleştirilmedi olarak kaydedilir; hiçbir dönemde geçerli kanıt sağlamaz.
- **Ertelenmiş gereksinim** — kriter, kaydedilmiş yetkiyle adlandırılmış bir hedef göreve taşınır; yalnızca bu değişiklik kaynağı kapatır.
- **Başarısız kapı** — aynı kabul niyeti yeniden çalıştırılıp geçene kadar başarısız kalır; bir yeniden deneme yalnızca kendi komutunun yerini alır.
- **Ulaşılan ürün sonucu** — yazıldığı haliyle kriter, kendi kapısıyla doğrulanmış; bir görevi değişmeden tamamlayan tek durum.

Uygulama, kayıtların izin verdiği her yerde mekaniktir. "invalidated by refine" olarak işaretlenmiş kapı kanıtı korunmuş tarihtir, asla geçerli kanıt değildir ve buna hâlâ dayanan tamamlanmış bir görev denetleyici tarafından raporlanır. Kendi metni kontrolün hiç çalışmadığını kabul eden geçerli bir kayıt (örneğin "never entered", "did not run" veya "cannot be measured") bir çelişkidir, aynı şekilde raporlanır — tıpkı günlüğü hâlâ `Status: pending` yazan tamamlanmış bir durum görevi gibi. Bunların ötesindeki anlatı çelişkileri — kendi kontrol listesiyle çelişen sonuçlara sahip bir rapor — bir insan gözden geçirici GEREKTİRİR; denetleyici, düzyazının ne anlama geldiğini değil, kayıtların ne söylediğini raporlar. Bir kullanıcı, kaydedilmiş yetkiyle sınırlı bir istisnayı açıkça kabul EDEBİLİR; gözetimsiz ön onay asla temel bir hedefi terk etmek için genel bir izin değildir ve karşılanamaz zorunlu bir kriter, asla tamamlanmış iş değil, bir engelleyicidir.

## Şema sürümleme

Her iki şema da URL ile sürümlüdür. Bir sürüm içinde ekleyici alanlara izin verilir; bir alanı yeniden adlandırmak veya yeniden yazmak, yeni bir şema sürümü ve spec değişiklik günlüğünde bir geçiş notu gerektirir. Bu revizyon her iki şema için de `/v2.json`'u tanıtır: görev girdisinin `file` alanı tipli bir `locator`'a dönüşür (`{"kind": "file" | "inline", "value": ...}`), manifesto `plan_format` kazanır ve durum dosyası `format`, `materialization`, `approval` ve `promotion` kazanır — birlikte Lite planların ihtiyaç duyduğu alanlar (bkz. [Lite planlar](/spec/lite-plans)). `/v1.json` manifestoları ve durum dosyaları geçerli kalır ve asla sessizce v2'ye yeniden yazılmaz; bir `refine` oturumu birini kasıtlı olarak göç ETTİREBİLİR. Manifestodaki `spec_version` alanı, planın altında oluşturulduğu DWP spec sürümünü sabitler; kurulu spec'inden daha yeni bir planla karşılaşan bir ajan, tahmin etmek yerine bunu belirtMELİDİR.
