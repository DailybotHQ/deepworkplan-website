---
title: OpenClaw
description: "DWP'nin OpenClaw adaptörü: yerel .agents/skills taraması, gözetimsiz yürütme eşlemesi ve otonom ajan çalışma alanları için cron tabanlı plan devamı."
kind: adapter
lang: tr
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw adaptörü

OpenClaw, zamanlanmış dönüşlerle uzun ömürlü çalışma alanları çalıştıran otonom bir ajan platformudur. `<workspace>/.agents/skills/` dizinini yüklü skill paketleri için yerel olarak tarar; bu, DWP skill'inin herhangi bir adaptör katmanı olmadan yüklenmesi anlamına gelir — oraya kurun ve OpenClaw onu otomatik olarak algılar.

## Destek düzeyi

**Tam** — OpenClaw, `AGENTS.md`'yi okur ve skill'i AgentSkills standardı aracılığıyla yükler. Tüm DWP alt skill'leri (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) kullanılabilir.

## Kurulum

```bash
openclaw skills install deepworkplan
```

Ya da elle: `DailybotHQ/deepworkplan-skill`'i `<workspace>/.agents/skills/deepworkplan/` dizinine klonlayın.

## Çağırma

Düz metin — OpenClaw, eğik çizgi komut ön eki kullanmaz:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Gözetimsiz yürütme eşlemesi

OpenClaw'ın zamanlama ilkelkeleri doğrudan DWP'nin devam modeline eşlenir:

| OpenClaw ilkeli | DWP rolü |
|-----------------|----------|
| Çalışma alanı kökü | [Ajan çalışma alanı](/spec/archetypes) arketipi: çalışma alanı kökünde `AGENTS.md`, `.agents/`, `.dwp/` |
| `<workspace>/.agents/skills/` (yerel tier-2 tarama) | Bu paketin yaşadığı yer — adaptör katmanı gerekmez |
| Kalp atışı veya cron dönüşü | Bir [zamanlanmış devam](/spec/agent-protocol#scheduled-continuation) dönüşü: uyan → DWP Resume Protocol → sonraki atomik görev → durumu güncelle → ver |
| `HEARTBEAT.md` denetimleri | Bir satır ekleyin: "`.dwp/plans/` açık bir plan içeriyorsa, bir görev için devam ettirin." |
| Daimi emirler | Plan onay sınırı ve gözetimsiz profilin sınırlı yetkisi |

Operasyonel olarak:

1. Bir insan etkileşimli olarak bir plan oluşturur ve onaylar. Onay kontrol noktasıdır — gözetimsiz dönüşler tek dönüşte oluşturup yürütemez.
2. Plan, makine tarafından okunabilir durum katmanını (`manifest.json` + `state.json`) taşımak ZORUNDADIR. Git olmayan bir çalışma alanında, `state.json` çökmeden güvenli devamı mümkün kılandır. Bkz. [Plan durumu](/spec/plan-state).
3. Her kalp atışı veya cron dönüşü en fazla bir görev yürütür, doğrulama kapısını geçer, `state.json`'u atomik olarak günceller ve verir.
4. Herhangi bir durma koşulunda ajan, `state.json`'un `blocked` alanını yazar ve çalışma alanının normal kanalı aracılığıyla bildirir. Sonraki insan bakışı — veya kalp atışı raporu — tam olarak neye ihtiyaç duyulduğunu görür.

Sonuç: yeniden başlatmalara, model değişikliklerine ve oturum sınırlarına karşı dayanıklı, daemon tarafından gece boyunca yürütülen, insan denetimli bir çalıştırmanın sahip olacağı kapıların aynısına sahip çok günlük bir plan.

## Notlar

OpenClaw'ın çalışma alanı, [ajan çalışma alanı](/spec/archetypes) arketipinin kanonik örneğidir. DWP skill paketinin `HEARTBEAT.md` entegrasyonu ve `state.json` gereksinimi, bu platform göz önünde bulundurularak tasarlanmıştır.
