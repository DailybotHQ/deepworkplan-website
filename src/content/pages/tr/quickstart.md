---
title: "Hızlı başlangıç — Deep Work Plan"
description: "Skill’i kurun, deponuzu onboarding edin, ardından herhangi bir ajanla planlayıp yürütün — deponuzu spec odaklı ve ajan-pilotlanabilir kılan adımlar."
lastUpdated: 2026-05-31
---

## Hızlı başlangıç

Skill’i kurun, deponuzu onboarding edin, ardından herhangi bir ajanla planlayıp yürütün — deponuzu spec odaklı ve ajan-pilotlanabilir kılan adımlar.

## Benimseme yolu

### 1. Deep Work Plan skill’ini kurun

Skill’i deponuza ekleyin. Bir yönlendirici ile sekiz alt skill içerir — create, execute, refine, resume, status, verify, onboard ve author. En hızlı yol için Skills CLI’yı kullanın:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Ya da depoyu klonlayıp git ile bir kabuğun bulunduğu yerde kurulumu çalıştırın:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Depoyu onboarding edin

onboard alt skill’ini çalıştırın ve ajanın gerçek deponuz hakkında akıl yürütmesine izin verin — yığını, paket yöneticisi ve gerçek doğrulama komutları:

```bash
/deepworkplan-onboard
```

Bir `AGENTS.md`, bir `docs/` bilgi tabanı, modül başına dokümanlar ve ajanlar arası bir `.agents/` yuvası (`.claude → .agents` sembolik bağıyla) üretir, ince `dwp-*` komutlarını bağlar ve planlar ile taslaklar için gitignore’lanmış bir `.dwp/` iskeletler. Hiçbir şey şablonlanmaz; her şey deponuza uyarlanır.

### 3. Kiti geliştirin ve eklentileri kabul edin

Yığına uygun skill’ler, ajanlar ve komutlar büyütmek için `/skill-create` ve `/agent-create` (author alt skill’i) kullanın. Onboarding ayrıca beş tercihe dayalı eklenti sunar — devcontainer, Dailybot, dependency-upgrade, design-system ve AI Diff Reviewer — bunları yalnızca uygun olduklarında kabul edersiniz. Bir depo, sıfır eklentiyle tümüyle uyumludur.

### 4. Planlayın ve yürütün

Bir Deep Work Plan üretin ve onu görev görev çalıştırın:

```bash
/dwp-create <goal>
/dwp-execute
```

İş ilerledikçe `/dwp-status`, `/dwp-refine` ve `/dwp-resume` kullanın. Her plan, işin oturumlar arasında yapılandırılmış ve kaldığı yerden sürdürülebilir kalması için numaralandırılmış görevler, doğrulama kapıları ve bir tamamlama protokolü taşır.

## Sonuç

Deponuz spec odaklı ve ajan-pilotlanabilir hâle gelir: plan kalıcı doğruluk kaynağıdır ve depo, herhangi bir ajanın karşısında çalıştığı harness’ın kendisi olur.

- [Metodolojiyi okuyun](/methodology)
- [Spesifikasyona göz atın](/spec)
- [Kiti keşfedin](/kit)
