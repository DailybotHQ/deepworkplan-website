---
title: "Deep Work Plan metodolojisi"
description: "Manifestodan loop engineering’e sekiz bölüm: Deep Work Plan’in ilkeleri, çekirdek döngüsü, şablonları, skill’leri, arketipleri, ajanları, sürüleri ve döngüsü."
lastUpdated: 2026-11-16
---

## Deep Work Plan metodolojisi

v8 paketi yeni planları varsayılan olarak `plan-contract/v8` ile oluşturur. Mevcut planlar kayıtlı nesillerini korur; geçiş için açık bir `refine migrate` gerekir.
Deep Work Plan (DWP), yapay zeka kodlama ajanlarıyla yapılandırılmış, otonom mühendislik işi yürütmek için açık, çerçeveden bağımsız bir metodolojidir. Belirsiz bir hedefi, bir ajanın bağlamını kaybetmeden yürütebileceği, duraklatabileceği, sürdürebileceği ve hakkında rapor verebileceği gözden geçirilebilir bir plana dönüştürür.

DWP dört temel direğe dayanır — önce spesifikasyon, depo harness’tir, loop engineering ve ölçülmüş verimlilik. Tek cümleyle: *Önce spesifikasyon, kapalı döngü: depo harness’tir ve plan kendi kendine bitene kadar çalışır.*

**Önce spesifikasyon.** Bir sohbet dökümünü doğruluk kaynağı olarak ele almak yerine, önce *neyin* doğru olması gerektiğini yazarsınız — hedef, kapsam, kabul kriterleri ve bittiğini kanıtlayan denetimler — ve ajan bu spesifikasyona karşı çalışır. DWP’de plan, spesifikasyonun *kendisidir*: plan → atomik görevler → doğrulama kapıları → tamamlama. Spesifikasyonu önce yazmak sapmayı azaltır (ajan, belirtilmiş ölçütlere göre değerlendirilir), işi doğrulanabilir kılar (her kapı ya geçer ya kalır) ve kaldığı yerden sürdürülebilir yapar (spesifikasyon herhangi bir oturumdan ya da ajandan daha uzun ömürlüdür). Araçtan bağımsız ve repo-native olarak, GitHub Spec Kit, Amazon Kiro ve Tessl gibi araca bağlı spec odaklı sistemlerden ayrışır.

**Depo, harness’tir.** Bir dil modeli tek başına yalnızca bir metin tahmin edicidir; onu güvenilir bir mühendise dönüştüren, etrafını saran *harness*’tır — bağlam, araçlar, bir kontrol döngüsü, güvenlik bariyerleri ve kalıcı durum. Harness mühendisliği, o iskeleyi kasıtlı olarak tasarlamaktır. DWP’nin duruşu, onun bir araçta değil, depoda yaşaması gerektiğidir: bağlam olarak `AGENTS.md` + `docs/`, araçlar olarak `.agents/` kiti, kontrol döngüsü olarak plan, güvenlik bariyerleri olarak doğrulama kapıları ve durum olarak gitignore’lanmış `.dwp/`. Her parça depoda bir dosya olduğu için harness taşınabilirdir — böylece herhangi bir ajan herhangi bir depoyu pilotlayabilir.

**Loop engineering.** Bir spesifikasyon ve bir harness işi doğru ve taşınabilir kılar; loop engineering ise onu bitirir. İsteğe bağlı Herdr eklentisiyle bir plan liderini ve, adlandırıyorsa, haleflerini kaydeder; yalnızca bir insanın başlattığı bir daemon boşta duran bir lideri devam etmesi için dürter, gitmiş bir liderin yerini alması için ulaşılabilen ilk halefe başvurur ve bir plan durduğunda, engellendiğinde ya da tamamlandığında bunu bildirir. Bir dürtme yetki eklemez — planın kapıları ve yükseltmeleri önceki gibi bağlayıcıdır. Metodoloji döngü olmadan da çalışır; döngü yalnızca onu güçlendirir.

**Ölçülmüş verimlilik.** Bağlam, bir kodlama ajanının sahip olduğu en kıt kaynaktır ve onu israf eden bir metodoloji, tam da iş uzadığında başarısız olur. DWP yönergeleri kademeli olarak yükler — her rehber, kendi tetikleyicisi devreye girdiğinde yüklenir — doğrulamayı her görevin gerçekte dokunduğundan seçer ve skill kararlarını görev-yerel verir. Her akışın gerektirdiği yönerge baytları ölçülür ve yayımlanır; uydurma token yüzdeleri yoktur.

Metodoloji sekiz bölümde açıklanır:

1. **Manifesto** — bir Deep Work Plan’in ne olduğu ve yapılandırılmış yürütmenin neden önemli olduğu.
2. **Çekirdek döngü** — her görevi yürüten plan-yürüt-doğrula döngüsü.
3. **Şablonlar** — ajanların ve insanların paylaştığı plan ve görev yapıları.
4. **Skill’ler ve ajanlar** — komutların ve ajan rollerinin nasıl bir araya geldiği, yaşayan kit (bir deponun author alt skill’i aracılığıyla kendi skill’lerini nasıl büyüttüğü) ve dependency-upgrade ile kullanıcıya dönük herhangi bir arayüz yüzeyi (görsel UI, CLI çıktısı veya konuşma tabanlı) için design-system eklentisi gibi tercihe dayalı eklentiler.
5. **Arketipler** — metodolojiyi bireysel depolara ve orkestratör merkezlerine uyarlamak.
6. **Birçok ajanı çalıştırmak** — bölmeler, konteynerler, makineler ve hesaplar genelinde bir lider ve şeritleri; depo başına tek dal ve tek sürüm.
7. **Sürü özerkliği** — görev sınırlarında kapasite kontrolleri, devir paketleri, epoch’larla lider halefiyeti ve yalnızca kritik yükseltme; böylece bir sürü tek bir hesabın sınırını ya da tek bir ajanın kaybını atlatır.
8. **Loop engineering** — plan kaydı, insanın başlattığı daemon, yetki eklemeyen dürtmeler, haleflere devir, plan olayları, plan kuyruğu ve filo haritası.

- [Metodolojiyi okuyun](/methodology)
- [Spesifikasyonu okuyun](/spec)
- [Kite göz atın](/kit)
