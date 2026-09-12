---
title: Plan durumu
description: "Makine tarafından okunabilir plan durum katmanı: manifest.json ve state.json, kapı kayıtları, bölümsel bellek olarak sonuç kayıtları, uzlaştırma ve ne zaman gerekli olduğu."
order: 8
lang: tr
section: State
---

# Plan durumu

**Sürüm 1.1. Durum: Kararlı.** Bu belge, Deep Work Plan metodolojisinin makine tarafından okunabilir plan durum katmanını belirtir. MUST, MUST NOT, SHOULD, SHOULD NOT ve MAY anahtar kelimeleri, RFC 2119'da açıklandığı şekilde yorumlanacaktır.

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

`state.json`, ajan tarafından şu protokol noktalarının her birinde YENİDEN YAZILMALIDIR: plan somutlaştırma (tüm görevler `pending`), görev başlangıcı (`in_progress`), her doğrulama kapısı çalıştırması (kapı kaydı eklendi veya güncellendi) ve görev tamamlama ([DWP spesifikasyonu](/spec/dwp-specification#task-completion-protocol)'ndaki görev tamamlama protokolünün parçası olarak `completed`).

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

## Şema sürümleme

Her iki şema da URL ile sürümlüdür. Bir sürüm içinde ekleyici alanlara izin verilir; bir alanı yeniden adlandırmak veya yeniden yazmak, yeni bir şema sürümü ve spec değişiklik günlüğünde bir geçiş notu gerektirir. Bu revizyon her iki şema için de `/v2.json`'u tanıtır: görev girdisinin `file` alanı tipli bir `locator`'a dönüşür (`{"kind": "file" | "inline", "value": ...}`), manifesto `plan_format` kazanır ve durum dosyası `format`, `materialization`, `approval` ve `promotion` kazanır — birlikte Lite planların ihtiyaç duyduğu alanlar (bkz. [Lite planlar](/spec/lite-plans)). `/v1.json` manifestoları ve durum dosyaları geçerli kalır ve asla sessizce v2'ye yeniden yazılmaz; bir `refine` oturumu birini kasıtlı olarak göç ETTİREBİLİR. Manifestodaki `spec_version` alanı, planın altında oluşturulduğu DWP spec sürümünü sabitler; kurulu spec'inden daha yeni bir planla karşılaşan bir ajan, tahmin etmek yerine bunu belirtMELİDİR.
