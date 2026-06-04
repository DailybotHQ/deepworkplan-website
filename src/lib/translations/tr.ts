/**
 * tr translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const tr: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — yapay zeka kodlama ajanları için yapılandırılmış yürütme',
  siteDescription:
    'Deep Work Plan: çok saatlik yapay zeka ajan yürütmesini yapılandırılmış, doğrulanabilir ve sürdürülebilir kılan açık bir metodoloji ve referans kit.',

  // Navigation
  nav: {
    home: 'Ana sayfa',
    about: 'Hakkında',
    contact: 'İletişim',
    // Deep Work Plan IA
    methodology: 'Metodoloji',
    spec: 'Spesifikasyon',
    kit: 'Kit',
    examples: 'Örnekler',
    init: 'Init',
    quickstart: 'Hızlı başlangıç',
    github: 'GitHub',
    repo: {
      label: 'Kaynak kod',
      website: 'Web sitesi deposu',
      websiteDesc: 'Bu site',
      skill: 'Beceri deposu',
      skillDesc: 'Kurulabilir beceri',
    },
    menu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Tüm hakları saklıdır.',
    poweredBy: 'Geliştiren',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Site Gezinmesi',
    sections: {
      methodology: 'Metodoloji',
      getStarted: 'Başlayın',
      project: 'Proje',
      connect: 'Bağlantı kurun',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title:
        'Deep Work Plan — yapay zeka kodlama ajanları için yapılandırılmış yürütme',
      description:
        'Bağlam, modellerden daha önemlidir. Deep Work Plan, herhangi bir depoyu, herhangi bir kodlama ajanının uzun soluklu işi tamamlayabildiği yapılandırılmış bir ortama dönüştürür.',
    },
    hero: {
      badge: 'Açık metodoloji · MIT · Ajandan bağımsız',
      title: 'Modeller önemlidir.',
      titleEmphasis: 'Bağlam daha da önemlidir.',
      subtitle:
        'Deep Work Plan, herhangi bir depoyu yapılandırılmış bir ortama — bağlam, güvenlik bariyerleri ve kalıcı bir plana — dönüştürür; böylece herhangi bir kodlama ajanı işini tam isabetle yürütür ve uzun soluklu işi tamamlar.',
      instructionLabel: 'Ajanınıza bunu verin',
      instruction:
        'Bu depoyu AI-first hale getirmek için https://deepworkplan.com/init.md adresindeki talimatları oku ve uygula.',
      copyLabel: 'Kopyala',
      copiedLabel: 'Kopyalandı',
      viewInitCta: 'Tam /init istemini görüntüle',
      pullQuote:
        'Deep Work Plan, deponun kendisinin harness haline geldiği spec odaklı geliştirmedir.',
      primaryCta: 'Metodolojiyi okuyun',
      secondaryCta: 'Spesifikasyonu okuyun',
      illustrationAlt:
        'Kayalık bir kıyıdaki bir deniz feneri, küçük bir tekneye yol gösteren tek bir ışık huzmesi gönderiyor — deponun, herhangi bir ajana rehberlik eden sağlam bir harness olduğunu çağrıştıran bir gravür.',
    },
    pitch: {
      kicker: 'Sorun ve yanıt',
      problem:
        'Yapay zeka kodlama ajanları kısa süreli atılımlarda olağanüstü etkilidir. Uzun soluklu işlerde — bir geçiş, yeni bir alt sistem, onlarca dosyaya yayılan bir yeniden düzenleme — yönlerini kaybederler: bağlam dolar, kararlar unutulur ve çok saatlik görevler yarıda bırakılır.',
      answer:
        'Deep Work Plan buna spec odaklı geliştirmeyle yanıt verir: plan, kalıcı doğruluk kaynağıdır ve ajanlar açık kabul kriterlerine ve doğrulama kapılarına karşı çalışır. Sapma azalır, iş doğrulanabilir kalır ve herhangi bir ajan işi oturumlar arasında kaldığı yerden sürdürebilir.',
      origin:
        'Bu aynı zamanda taşınabilir hale getirilmiş harness mühendisliğidir. Bir ajan harness’ı, modelin etrafındaki iskeledir — bağlam, araçlar, kontrol döngüsü, güvenlik bariyerleri, sürdürülebilir durum — ve modeli güvenilir kılan budur. Deep Work Plan bu harness’ı deponun kendisine kurar (AGENTS.md, dokümanlar, .agents/ skill yuvası, DWP skill’i), böylece herhangi bir ajan herhangi bir depoyu pilotlayabilir. Dailybot’ta doğdu, aylarca sahada test edildi ve DailybotHQ/deepworkplan-skill olarak yayımlandı.',
      illustrationAlt:
        'Tehlikelerin yanından güvenle geçen tek bir çizili rotaya sahip bir deniz haritası — planın, işi rotada tutan yön olduğunu çağrıştıran bir gravür.',
    },
    onboarding: {
      badge: 'Akıl yürütmeye dayalı kuruluma alma',
      title:
        'Onu herhangi bir depoya yönlendirin. Akıl yürütür — kopyala-yapıştır yapmaz.',
      subtitle:
        'Kuruluma alma akışı, deponuzun gerçek dillerini, çerçevelerini, paket yöneticisini ve doğrulama komutlarını inceler, ardından o depoya uyarlanmış çıktılar üretir. Genel bir taslak başarısızlık sayılır.',
      steps: [
        {
          title: 'Yığınınız ve arketipiniz hakkında akıl yürütür',
          description:
            'Manifest dosyalarını, klasör düzenini ve CI yapılandırmasını okuyarak gerçek test, lint ve derleme komutlarını çıkarsar, ardından depoyu bireysel bir depo veya bir orkestratör merkezi olarak sınıflandırır.',
        },
        {
          title: 'AGENTS.md, docs/ ve modül başına dokümanlar üretir',
          description:
            'Akıl yürütülmüş bir AGENTS.md, kategorize edilmiş bir docs/ hiyerarşisi ve her büyük modülün içinde bir README ile docs/ — yer tutucularla değil, deponuzun gerçek komutlarıyla doldurulmuş olarak.',
        },
        {
          title: '.claude → .agents sembolik bağıyla .agents/ yapısını kurar',
          description:
            'Ajandan bağımsız bir .agents/ dizini (skill’ler, ajanlar, komutlar) ve .claude → .agents sembolik bağı, CLAUDE.md’yi AGENTS.md’ye yansıtır; böylece her araç tek bir doğruluk kaynağını okur.',
        },
        {
          title: 'DWP skill’ini kurar ve .dwp/ yapısını oluşturur',
          description:
            'Deep Work Plan skill’ini bağlar ve planlar ile taslaklar için gitignore’lanmış .dwp/ klasörünü oluşturur, ardından isteğe bağlı olarak devcontainer desteği gibi tercihe dayalı eklentileri katmanlar.',
        },
      ],
    },
    quickstart: {
      badge: 'Çalıştırdığınızda ne olur',
      title: 'Tek bir talimat. Gerisini depo halleder.',
      subtitle:
        'Bir kurulum yöntemi seçmez ya da bir şablon kopyalamazsınız. Ajanınıza tek bir satır verirsiniz; o da skill’i — yeniden kullanılabilir motoru — kurar ve deponuzu ona uyarlar.',
      steps: [
        {
          title: 'Ajanınız /init.md dosyasını açar',
          description:
            'deepworkplan.com/init.md adresindeki kuruluma alma istemini ve bağlantı verdiği metodolojiyi, spesifikasyonu ve kiti — yani benimsemek üzere olduğu standardı — okur.',
        },
        {
          title: 'Deep Work Plan skill’ini kurar',
          description:
            'Skill, motordur — her depoda aynıdır. Tek bir komut, yönlendiriciyi ve alt skill’lerini (create, execute, refine, resume, status, verify, onboard, author) Claude Code, Cursor, Codex, Gemini ve Copilot için getirir.',
        },
        {
          title: 'Deponuzu uyarlar',
          description:
            'Gerçek yığınınız hakkında akıl yürüterek — asla kopyala-yapıştır yapmadan — AGENTS.md, kategorize edilmiş bir docs/ ağacı, modül başına README’ler, akıl yürütülmüş bir .agents/ kiti ve gitignore’lanmış bir .dwp/ yazar. Deponuz harness haline gelir.',
        },
        {
          title: 'Planlar ve yürütürsünüz',
          description:
            'Herhangi bir görev için uzun soluklu Deep Work Plan’ler üretin ve bunları adım adım çalıştırın; açık kabul kriterleri, doğrulama kapıları ve sürdürülebilir durumla — saatlerce otonom biçimde.',
        },
      ],
      note: 'Skill her yerde aynı şekilde kurulur; uyarlanan şey deponuzdur — yığınınız için üretilen AGENTS.md, dokümanlar ve akıl yürütülmüş .agents/ kiti. Bu ayrım, metodolojiyi tek seferlik bir iskele yerine yeniden kullanılabilir bir standart yapan şeydir.',
    },
    outcomes: {
      badge: 'Elde ettikleriniz',
      title: 'Ajanınızın otonom çalışması için ihtiyaç duyduğu her şey.',
      subtitle:
        'Tek bir çalıştırma, atomik olarak işlenir. Her çıktı Markdown’dır ve her değişiklik denetlenebilir.',
      items: [
        {
          label: 'Depo kökünde AGENTS.md',
          detail:
            'Yer tutuculu bir şablon değil, deponuzun gerçek yığını, komutları ve yapısı üzerinden akıl yürütülerek hazırlanır. CLAUDE.md, AGENTS.md’ye sembolik olarak bağlanır.',
        },
        {
          label: 'Kategorize edilmiş docs/ ve modül başına dokümanlar',
          detail:
            'Mimari, kurulum, standartlar ve sorun giderme — ayrıca her büyük modülün içinde, kod tabanınızdan üretilmiş bir README ve docs/.',
        },
        {
          label: '.claude → .agents sembolik bağıyla .agents/',
          detail:
            'Ajandan bağımsız bir .agents/ dizini (skill’ler, ajanlar, komutlar) ve .claude → .agents sembolik bağı; böylece her araç tek bir doğruluk kaynağını okur.',
        },
        {
          label: 'Kurulu Deep Work Plan skill’i',
          detail:
            'create, execute, refine, resume, status, verify, onboard ve author — ajanınıza tek bir skill paketi olarak, depo başına kopya olmadan sunulur.',
        },
        {
          label: 'Doğrulayabileceğiniz uyumluluk',
          detail:
            '/dwp-verify, spesifikasyona karşı nesnel bir geçti/kaldı raporu üretir; böylece “AI-first” iddia edilmez, doğrulanır — ve her plandan sonra yeniden doğrulanabilir.',
        },
        {
          label: 'Ele alınan iki arketip',
          detail:
            'Kuruluma alma, deponuzu bireysel bir depo (yaygın durum) veya depolar arasında alt planları koordine eden bir orkestratör merkezi olarak sınıflandırır.',
        },
        {
          label: 'Deponuzun büyüttüğü yaşayan bir kit',
          detail:
            'author alt skill’i (skill-create, agent-create), deponun kendi skill’lerini, ajanlarını ve komutlarını geliştirmesini sağlar; dependency-upgrade gibi tercihe dayalı bakım eklentileri, kendini güncel tutmasına yardım eder.',
        },
        {
          label: 'Git-native, sürdürülebilir, .dwp/',
          detail:
            'Daemon yok, harici durum yok. Planlar ve taslaklar gitignore’lanmış bir .dwp/ klasörüne iner ve herhangi bir görev — bağlam taştıktan sonra bile — yalnızca git üzerinden kaldığı yerden sürdürülür.',
        },
      ],
    },
    agents: {
      badge: 'Ajanlar',
      title: 'Zaten kullandığınız ajanla çalışır.',
      subtitle:
        'Tek metodoloji, birçok adaptör. Markdown, çerçeveyi hiçbir şeye bağlamaz — Markdown okuyan her ajan bir Deep Work Plan çalıştırabilir.',
      fullLabel: 'Tam',
      partialLabel: 'Kısmi',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Yerel WebFetch ve eğik çizgi komutlarıyla referans uygulama.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Tam adaptör. WebFetch kısıtlıysa çevrimdışı paketi kullanın.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Çevrimdışı paket önerilir; kurallar .codex/ altına kurulur.',
        },
        {
          name: 'GitHub Copilot',
          support: 'partial',
          note: 'Yalnızca dokümanlar ve AGENTS.md. Eğik çizgi komutları uzantılar aracılığıyla.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Yerel WebFetch ile Gemini 2.5 Pro veya daha yenisini gerektirir.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Yerel bir komut yüzeyine sahip tam adaptör.',
        },
      ],
    },
    stacks: {
      badge: 'Yığınlar',
      title: 'Önemli yığınlar için akıl yürütme hazır ayarları.',
      subtitle:
        'Bunlar şablon değil, akıl yürütme yardımcılarıdır. Kuruluma alma, deponuzun gerçek manifest dosyalarını okur ve yığın başına uyarlar — bir hazır ayarı asla körlemesine kopyalamaz. Monorepo’lar modül başına doküman alır.',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Modules · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Generic', sub: 'Herhangi bir yığın' },
      ],
    },
    archetypes: {
      badge: 'İki arketip',
      title: 'Bireysel depo veya orkestratör merkezi.',
      subtitle:
        'Kuruluma alma, arketipe göre ayrışır. Çoğu depo bireysel depodur. Bir merkez, birçok depo arasında alt Deep Work Plan’leri koordine eder. Metodoloji her ikisini de birinci sınıf olarak ele alır.',
      individual: {
        tag: 'Yaygın durum',
        title: 'Bireysel depo',
        description:
          'Tek bir birincil yığına, kendi doğrulama komutlarına ve modül başına dokümanlara sahip tek bir kod tabanı. Varsayılan budur — depo açıkça bir merkez olmadıkça kuruluma alma bunu varsayar.',
        example:
          'Örneğin bir Django API’si, bir Vue uygulaması veya bir TypeScript Lambda servisi.',
      },
      orchestrator: {
        tag: 'Koordinasyon',
        title: 'Orkestratör merkezi',
        description:
          'Bir orkestratör manifesti aracılığıyla alt depolar arasındaki işi orkestre eden, her biri kendi deposunda işlenen alt planlar başlatan, ayrıca sınır kuralları ve bir gezinme dizinine sahip bir koordinasyon deposu.',
        example: 'Örneğin beş ürün deposunu koordine eden bir merkez.',
      },
    },
    comparison: {
      badge: 'Metodoloji ile araç karşılaştırması',
      title: 'Farklı bir katman. Rakip değil, tamamlayıcı.',
      subtitle:
        'Deep Work Plan başka bir iskele aracı değildir. Herhangi bir spec odaklı ya da iskele aracının altındaki metodoloji katmanıdır ve çok saatlik otonom çalıştırmalara odaklanır.',
      colDwp: 'Deep Work Plan',
      colOthers: 'İskele / spec araçları',
      rows: [
        {
          label: 'Birincil odak',
          dwp: 'Çok saatlik otonom yürütme',
          others: 'Spec veya iskele üretimi',
        },
        {
          label: 'İş birimi',
          dwp: 'Bir Deep Work Plan (sürdürülebilir oturum)',
          others: 'Bir spec belgesi veya bir iskele',
        },
        {
          label: 'Durum modeli',
          dwp: 'Git-native .dwp/ klasörü, sürdürülebilir',
          others: 'Çoğunlukla harici veya IDE içinde',
        },
        {
          label: 'Ajan bağlılığı',
          dwp: 'Ajandan bağımsız (Markdown ve Bash)',
          others: 'Çoğunlukla araca veya IDE’ye özgü',
        },
        {
          label: 'Bağlam kurtarma',
          dwp: 'Bağlam taşmasından sonra kaldığı yerden sürdürür',
          others: 'Genellikle görevi yeniden başlatır',
        },
        {
          label: 'Lisans',
          dwp: 'MIT, açık metodoloji ve kit',
          others: 'Değişir',
        },
      ],
    },
    origin: {
      badge: 'Köken',
      quote:
        'Dağıtık ekipler için asenkron standup’ların arkasındaki şirket olan Dailybot tarafından geliştirildi. Şirket içinde, Django, Vue, TypeScript Lambda ve Astro’ya yayılan üretim depolarını ajan-pilotlanabilir hale getirmek için Deep Work Plan’leri kullandık. Aylarca süren üretim kullanımının ardından metodolojiyi MIT lisansıyla açık kaynak yaptık.',
      attribution: 'Dailybot mühendislik ekibi',
      dailybotCta: 'Dailybot hakkında bilgi edinin',
    },
    finalCta: {
      badge: 'Deponuzu AI-first hale getirin',
      title: 'Ajanlarınıza derin iş verin.',
      subtitle:
        'Ajanınıza tek bir satır verin — onu /init.md adresine yönlendirin — ve deponuzu AI-first hale getirsin: skill’i kurar, yığınınız hakkında akıl yürütür ve eksiksiz bir AGENTS.md hiyerarşisini işler. Oradan, saatlerce otonom çalışan Deep Work Plan’ler oluşturur ve yürütürsünüz.',
      primaryCta: '/init istemini açın',
      secondaryCta: 'Metodolojiyi okuyun',
      meta: 'MIT lisanslı · sıfır telemetri · çıktılar gitignore’lanmış bir .dwp/ klasörüne yazılır.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'İletişim',
    nameLabel: 'Ad',
    namePlaceholder: 'Adınız',
    emailLabel: 'E-posta',
    emailPlaceholder: 'siz@eposta.com',
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Mesajınızı yazın...',
    sendButton: 'Mesaj gönder',
  },

  // About page
  aboutPage: {
    title: 'Metodoloji hakkında',
    subtitle: 'Açık metodoloji · MIT lisanslı',
    description:
      'Deep Work Plan, yapay zeka kodlama ajanlarıyla ciddi mühendislik işleri için açık ve çerçeveden bağımsız bir metodolojidir. Nereden geldiği ve kimin sürdürdüğü.',
    heroDescription:
      'Yapay zeka kodlama ajanlarıyla derin işi planlamak, yürütmek ve doğrulamak için tekrarlanabilir bir yapı — açık biçimde geliştirilen ve kullanımı ücretsiz.',
    bioTitle: 'Nedir',
    bioText:
      'Deep Work Plan (DWP) bir üründen çok bir metodolojidir. Bir hedefi üzerinde anlaşılmış bir plana dönüştürmeyi, o planı atomik ve bağımsız olarak doğrulanabilir görevlere ayırmayı ve her görevi bir denetimle biten odaklı bir döngüde çalıştırmayı tanımlar.<br /><br />Hangi yapay zeka ajanını ya da yığını kullandığınız konusunda kasıtlı olarak bağımsızdır — adaptörler aynı çekirdek döngüyü Claude, Cursor, Copilot, Codex, Gemini ve daha fazlasına çevirir. Plan, görevler ve çalışma günlüğünün tümü düz Markdown’dır; böylece iş okunabilir, gözden geçirilebilir ve sürüm denetimli kalır.',
    passionsTitle: 'Temel ilkeler',
    passions: [
      {
        title: 'Yürütmeden önce planla',
        description:
          'Plan üzerinde anlaşılmadan hiçbir kod yazılmaz. Plan, sizinle ajan arasındaki bir sözleşmedir.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Görevler atomiktir',
        description:
          'Her görev, kendi başına yürütülüp doğrulanabilecek ve ardından atomik olarak işlenebilecek şekilde kapsamlandırılır.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Her şeyi doğrula',
        description:
          'Her görev, bir sonrakine başlamadan önce açık bir denetimle biter ve ilerleme git’te kaydedilir.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Bir bakışta',
    quickFacts: [
      'Açık metodoloji, MIT lisanslı',
      'Çerçeveden ve ajandan bağımsız',
      'Dailybot ve topluluk tarafından sürdürülür',
      'Bir spesifikasyon, komutlar, adaptörler, hazır ayarlar ve örnekler içerir',
      'Yalnızca Markdown — çalışma zamanı yok, kilitlenme yok',
      'Herhangi bir depoyu AI-first, ajan-pilotlanabilir bir kod tabanına dönüştürür',
    ],
    ctaTitle: 'Kim sürdürüyor',
    ctaDescription:
      'Deep Work Plan, Dailybot’taki gerçek mühendislik işinden doğdu ve şimdi Dailybot tarafından açık kaynak topluluğuyla birlikte sürdürülüyor. Metodoloji, spesifikasyon ve kit MIT lisansı altında yayımlanmıştır — kullanmakta, uyarlamakta ve üzerine inşa etmekte özgürsünüz.',
    ctaCv: 'Metodolojiyi okuyun',
    ctaContact: 'Hızlı başlangıç',
  },

  // Contact page
  contactPage: {
    title: 'Topluluk ve iletişim',
    subtitle: 'Açık kaynak · Topluluk odaklı',
    description:
      'Deep Work Plan açık biçimde geliştirilir. Kaynağı bulun, bir issue açın veya aşağıdaki kanallar aracılığıyla sohbete katılın — katkılar memnuniyetle karşılanır.',
    heroDescription:
      'Sorularınız, fikirleriniz veya iyileştirmeleriniz mi var? Deep Work Plan herkese açık olarak geliştirilir — projeye ve onu sürdürenlere buradan ulaşabilirsiniz.',
    formTitle: 'Bir Mesaj Gönderin',
    nameLabel: 'Ad',
    namePlaceholder: 'Adınız',
    emailLabel: 'E-posta',
    emailPlaceholder: 'siz@eposta.com',
    reasonLabel: 'Sizinle şu konuda iletişime geçmek istiyorum',
    reasonOptions: [
      { value: '', label: '— Bir konu seçin —' },
      { value: 'general', label: 'Genel / Sadece merhaba demek' },
      { value: 'tech-talk', label: 'Teknik konuşma / Konuşmacı daveti' },
      { value: 'collaboration', label: 'İş birliği / Ortaklık' },
      { value: 'project', label: 'Proje / İş talebi' },
      { value: 'dailybot', label: 'Dailybot hakkında soru' },
      { value: 'trading', label: 'Yatırım faaliyetleriniz hakkında sorular' },
      {
        value: 'the-library-of-tomorrow',
        label: 'The Library of Tomorrow’a katılın',
      },
      { value: 'other', label: 'Diğer' },
    ],
    subjectLabel: 'Konu',
    subjectPlaceholder: 'Konu nedir?',
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Mesajınızı yazın...',
    sendButton: 'Mesaj Gönder',
    sendingButton: 'Gönderiliyor...',
    successTitle: 'Mesaj gönderildi!',
    successMessage:
      'Bize ulaştığınız için teşekkürler. En kısa sürede size geri döneceğim.',
    sendAnotherButton: 'Başka bir mesaj gönder',
    requiredField: 'Bu alan zorunludur',
    invalidEmail: 'Lütfen geçerli bir e-posta adresi girin',
    fallbackMessage:
      'İletişim formu şu anda kullanılamıyor. Bana doğrudan e-postayla ulaşabilirsiniz.',
    fallbackEmailText: 'Bana şu adresten e-posta gönderin',
    formNote: 'En kısa sürede size geri döneceğim.',
    socialTitle: 'Benimle Bağlantı Kurun',
    locationTitle: 'Konum',
    locationText:
      'Kolombiya merkezli. Dünya genelinde uzaktan iş birliğine açık.',
    prefillSubjects: {
      generalInquiry: 'Genel Soru',
      collaboration: 'İş Birliği Fırsatı',
      projectInquiry: 'Proje veya İş Talebi',
      projectCollaboration: 'Proje İş Birliği Talebi',
      startupCollaboration: 'Girişim İş Birliği Fırsatı',
      techTalkInvitation: 'Teknik Konuşma Daveti',
      tradingQuestion: 'Yatırım Sorusu',
      dailybotQuestion: 'Dailybot Hakkında Soru',
    },
  },

  contactSection: {
    title: 'Bağlantı Kuralım',
    description:
      'İlginç sohbetlere, iş birliği fırsatlarına ve yeni fikirlere her zaman açığım. İster teknoloji ister girişimcilik hakkında konuşmak isteyin, ister sadece merhaba demek için.',
    ctaText: 'İletişime geçin',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'tr-TR',

  // 404 page
  notFoundPage: {
    title: 'Sayfa Bulunamadı',
    description:
      'Aradığınız sayfa mevcut değil ya da taşınmış. Metodolojiyi keşfedin veya gezinmeye devam etmek için ana sayfaya dönün.',
    heading: 'Sayfa Bulunamadı',
    message:
      'Üzgünüz, aradığınız sayfa mevcut değil ya da taşınmış olabilir. Ana sayfaya dönmeyi veya metodolojiyi keşfetmeyi deneyin.',
    backHome: 'Ana sayfaya dön',
    exploreMethodology: 'Metodolojiyi okuyun',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Deep Work Plan Metodolojisi',
      description:
        'Manifestodan arketiplere beş bölüm: Deep Work Plan’in arkasındaki ilkeler, çekirdek döngü, şablonlar, skill’ler ve ajanlar ve uyarlamalar.',
    },
    eyebrow: 'Metodoloji',
    title: 'Deep Work Plan Metodolojisi',
    intro:
      'Deep Work Plan’in arkasındaki felsefeden, her gün kullandığınız pratik döngüye, şablonlara ve uyarlamalara götüren beş bölüm.',
    chapterLabel: 'Bölüm',
    readChapter: 'Bölümü oku',
    prev: 'Önceki',
    next: 'Sonraki',
    backToIndex: 'Tüm bölümler',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan Spesifikasyonu',
      description:
        'Deep Work Plan metodolojisinin okunabilir spesifikasyonu: DWP formatı, ajan protokolü, arketipler, dokümantasyon standardı ve eklentiler.',
    },
    eyebrow: 'Spesifikasyon',
    title: 'Spesifikasyon',
    intro:
      'Metodolojinin kesin, okunabilir spesifikasyonu — insanların ve ajanların paylaştığı yapılar ve protokoller.',
    tocTitle: 'Bu sayfada',
    prev: 'Önceki',
    next: 'Sonraki',
    backToIndex: 'Tüm spesifikasyon belgeleri',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Deep Work Plan Kiti',
      description:
        'Deep Work Plan’i ajanlar ve yığınlar arasında çalıştırılabilir kılan skill ve sekiz alt skill’i, komutlar, adaptörler, hazır ayarlar, tercihe dayalı eklentiler ve örnekler.',
    },
    eyebrow: 'Kit',
    title: 'Kit',
    intro:
      'Metodolojiyi çalıştırmak için ihtiyacınız olan her şey: skill ve alt skill’leri, eğik çizgi komutları, ajan adaptörleri, kuruluma alma hazır ayarları, tercihe dayalı eklentiler ve işlenmiş örnekler.',
    groups: {
      command: {
        title: 'Alt skill’ler ve komutlar',
        description:
          'Skill yönlendiricisi ve alt skill’leri (create, execute, refine, resume, status, verify, onboard, author), ayrıca bunlara devreden ince eğik çizgi komutları.',
      },
      adapter: {
        title: 'Adaptörler',
        description:
          'Claude, Cursor, Codex ve daha fazlası için ajan başına ince entegrasyonlar.',
      },
      preset: {
        title: 'Kuruluma alma hazır ayarları',
        description:
          'onboard akışının dokümanları, skill’leri ve doğrulama komutlarını deponuza uyarlamak için kullandığı, yığın başına akıl yürütme rehberleri.',
      },
      example: {
        title: 'Örnekler',
        description: 'İşlenmiş, önce-ve-sonra adım adım anlatımlar.',
      },
      addon: {
        title: 'Eklentiler (tercihe dayalı)',
        description:
          'onboard akışının bir depoya katmanlayabileceği isteğe bağlı yetenekler — asla AI-first temel hattının parçası değildir.',
      },
    },
    viewDetail: 'Ayrıntıları görüntüle',
    prev: 'Önceki',
    next: 'Sonraki',
    backToIndex: 'Kite geri dön',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan Örnekleri',
      description:
        'Aynı mühendislik görevini Deep Work Plan ile ve onsuz gösteren önce-ve-sonra adım adım anlatımlar — ve güvenilirlik ile gözden geçirmedeki fark.',
    },
    eyebrow: 'Örnekler',
    title: 'Örnekler',
    intro:
      'Metodolojiyi iş başında görün — gerçek mühendislik görevlerinin somut, önce-ve-sonra adım adım anlatımları.',
    viewExample: 'Adım adım anlatımı oku',
    prev: 'Önceki',
    next: 'Sonraki',
    backToGallery: 'Tüm örnekler',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Hızlı başlangıç — Deep Work Plan',
      description:
        'Skill’i kurun, deponuzu kuruluma alın, ardından herhangi bir ajanla planlayıp yürütün — deponuzu spec odaklı ve ajan-pilotlanabilir kılan adımlar.',
    },
    eyebrow: 'Hızlı başlangıç',
    title: 'Dakikalar içinde başlayın',
    intro:
      'Skill’i kurun, deponuzu kuruluma alın, ardından herhangi bir ajanla planlayıp yürütün — deponuzu spec odaklı ve ajan-pilotlanabilir kılan adımlar.',
    sequenceTitle: 'Benimseme yolu',
    codeLabel: 'Terminal',
    orLabel: 'veya',
    steps: [
      {
        title: 'Deep Work Plan skill’ini kurun',
        description:
          'Skill’i deponuza ekleyin — bir yönlendirici ve sekiz alt skill (create, execute, refine, resume, status, verify, onboard, author). En hızlı yol için Skills CLI’yı kullanın ya da git ile bir kabuk mevcut olan yerde depoyu klonlayıp kurulumu çalıştırın.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Depoyu kuruluma alın',
        description:
          'onboard alt skill’ini çalıştırın ve ajanın gerçek deponuz hakkında akıl yürütmesine izin verin. AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve ajandan bağımsız bir .agents/ yuvası (.claude → .agents sembolik bağıyla) üretir, ince dwp-* komutlarını bağlar ve gitignore’lanmış bir .dwp/ yapısı oluşturur.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kiti geliştirin ve eklentileri kabul edin',
        description:
          'Yığına uygun skill’ler, ajanlar ve komutlar geliştirmek için /skill-create ve /agent-create (author alt skill’i) kullanın. Kuruluma alma ayrıca üç tercihe dayalı eklenti sunar — devcontainer, Dailybot ve dependency-upgrade — yalnızca uygun olduklarında kabul edersiniz.',
      },
      {
        title: 'Planlayın ve yürütün',
        description:
          'Bir Deep Work Plan üretin ve görev görev çalıştırın; her kapıyı doğrulayıp oturumlar arasında kaldığınız yerden sürdürün — depoyu kendi spesifikasyonuna karşı pilotlayarak.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Sonuç',
    outcome:
      'Deponuz spec odaklı ve ajan-pilotlanabilir hale gelir: plan, kalıcı doğruluk kaynağıdır ve deponun kendisi, herhangi bir ajanın karşısında çalıştığı harness haline gelir.',
    nextStepsTitle: 'Sonraki adımlar',
    nextSteps: [
      { label: 'Metodolojiyi okuyun', href: '/methodology' },
      { label: 'Kite göz atın', href: '/kit' },
      { label: 'Örnekleri görün', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Deponuzu AI-first hale getirin',
      description:
        'Deep Work Plan metodolojisini herhangi bir depoda benimseyin. Skill’i kurun, ajan kuruluma almasını çalıştırın, ardından herhangi bir yapay zeka kodlama ajanıyla planlayıp yürütün.',
    },
    eyebrow: 'Benimseme',
    title: 'Bu depoyu AI-first hale getirin',
    intro:
      'Herhangi bir depoyu spec odaklı, ajana hazır bir kod tabanına dönüştürmek için tek bir uç nokta. Skill’i kurun, bir ajanın depoyu kuruluma almasını sağlayın, ardından herhangi bir kodlama ajanıyla yapılandırılmış işi planlayıp yürütün.',
    handoffTitle: 'Bunu ajanınıza verin',
    handoffBody:
      'Aşağıdaki satırı yapay zeka kodlama ajanınıza yapıştırın. Metodolojiyi ve spesifikasyonu okuyacak, skill’i kuracak ve bu depoyu Deep Work Plan’ler için kuruluma alacaktır.',
    handoffInstruction:
      'Bu depoyu AI-first hale getirmek için https://deepworkplan.com/init.md adresindeki talimatları oku ve uygula.',
    handoffMdLabel: 'Bağımsız ajan istemi',
    codeLabel: 'agent',
    whatTitle: 'Bu ne yapar',
    whatBody: [
      'Benimseme, depoyu kalıcı iki şekilde değiştirir — metodolojinin temel direkleri.',
      'İlk olarak, depo spec odaklı hale gelir: iş, gelişigüzel istemlerden değil, yazılı bir plan ve spesifikasyondan başlar. İkinci olarak, deponun kendisi ajan harness’ı haline gelir — bir AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve bir .agents/ skill yuvası (.claude → .agents sembolik bağıyla), her ajana ihtiyaç duyduğu bağlamı ve komutları verir.',
    ],
    sequenceTitle: 'Benimseme dizisi',
    orLabel: 'veya',
    steps: [
      {
        title: 'Skill’i kurun',
        description:
          'Herhangi bir ajanın yapılandırılmış işi planlayıp yürütebilmesi için Deep Work Plan skill’ini ekleyin. Skill, bir yönlendirici ve sekiz alt skill ile gelir — create, execute, refine, resume, status, verify, onboard ve author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Depo kuruluma almasını çalıştırın',
        description:
          'onboard alt skill’ini çağırın ve ajanın gerçek depo hakkında — yığını, paket yöneticisi ve gerçek doğrulama komutları — akıl yürütmesine izin verin. Ardından AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve ajandan bağımsız bir .agents/ yuvası (.claude → .agents sembolik bağıyla) üretir, ince dwp-* komutlarını bağlar ve planlar ile taslaklar için gitignore’lanmış bir .dwp/ yapısı oluşturur. Hiçbir şey şablonlanmaz; her şey deponuza uyarlanır.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kiti geliştirin ve eklentileri kabul edin',
        description:
          'Yığına uygun skill’ler, ajanlar ve komutlar geliştirmek için /skill-create ve /agent-create (author alt skill’i) kullanın. Kuruluma alma ayrıca üç tercihe dayalı eklenti sunar — devcontainer, Dailybot ve dependency-upgrade — yalnızca uygun olduklarında kabul edersiniz. Bir depo, sıfır eklentiyle tam uyumludur.',
      },
      {
        title: 'Planlayın ve yürütün',
        description:
          '/dwp-create ile Deep Work Plan’ler üretin ve /dwp-execute ile çalıştırın, ardından iş ilerledikçe /dwp-status, /dwp-refine ve /dwp-resume kullanın. Her plan, numaralı görevler, doğrulama kapıları ve bir tamamlama protokolü taşır; böylece iş, oturumlar arasında yapılandırılmış, gözden geçirilebilir ve sürdürülebilir kalır.',
      },
    ],
    outcomeTitle: 'Sonuç',
    outcome:
      'Depo spec odaklı hale gelir ve deponun kendisi ajan harness’ı haline gelir — bağlam ve komutlar kodla birlikte gezer.',
    nextStepsTitle: 'Sonra okuyun',
    nextSteps: [
      { label: 'Hızlı başlangıç', href: '/quickstart' },
      { label: 'Metodoloji', href: '/methodology' },
      { label: 'Spesifikasyon', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },
};
