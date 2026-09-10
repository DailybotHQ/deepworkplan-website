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
    trust: 'Güven',
    developers: 'Geliştiriciler',
    privacy: 'Gizlilik',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
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

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Yeni · Token verimli',
    text: 'Deep Work Plan bugün Product Hunt’ta',
    tagline: 'ajanına bir plan ver',
    linkText: 'Oy ver',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Site Gezinmesi',
    sections: {
      methodology: 'Metodoloji',
      getStarted: 'Başlayın',
      project: 'Proje',
      connect: 'Bağlantı kurun',
      learn: 'Learn',
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
        'Deep Work Plan, herhangi bir depoyu yapılandırılmış bir ortama dönüştürür — bağlam, koruma bariyerleri ve kalıcı bir plan — herhangi bir kodlama ajanı burada hassas ve verimli çalışır ve uzun soluklu işi tamamlar.',
      instructionLabel: 'Ajanınıza kopyalayın',
      instruction:
        'init.md istemini kopyalayıp kodlama ajanınıza — Claude Code, Cursor, Codex veya herhangi bir diğeri — yapıştırarak herhangi bir depoyu AI-first hale getirin.',
      copyLabel: 'init.md kopyala',
      copiedLabel: 'Kopyalandı',
      viewInitCta: 'Tam /init istemini görüntüle',
      pullQuote:
        'Deep Work Plan, deponun kendisinin harness haline geldiği spec odaklı geliştirmedir.',
      primaryCta: 'Metodolojiyi okuyun',
      secondaryCta: 'Spesifikasyonu okuyun',
      illustrationAlt:
        'Kayalık bir kıyıdaki bir deniz feneri, küçük bir tekneye yol gösteren tek bir ışık huzmesi gönderiyor — deponun, herhangi bir ajana rehberlik eden sağlam bir harness olduğunu çağrıştıran bir gravür.',
      scrollCta: 'Nasıl çalıştığını görün',
    },
    pitch: {
      kicker: 'Sorun ve çözüm',
      problem:
        'Kısa hamlelerde kodlama ajanları etkileyicidir. Ona uzun soluklu bir misyon verin — bir göç, yeni bir alt sistem, onlarca dosyayı kapsayan bir yeniden yapılandırma — ve ajan sapar: bağlam dolar, önceki kararlar solur ve saatler süren iş yarı yolda kalır.',
      answer:
        'Deep Work Plan, spesifikasyon odaklı geliştirme ile yanıt verir: dayanıklı bir plan, atomik görevler ve ajanın geçmesi gereken doğrulama kapıları. "Bitti" bir his olmaktan çıkar — geçerlenebilir, gözden geçirilebilir kanıta dönüşür.',
      efficiency:
        'Ve bağlam, ajanınızın en kıt kaynağıdır. Bu yüzden harness token verimliliği için tasarlandı: talimatlar aşamalı yüklenir, doğrulama yalnızca değişene dokunur ve her görev kendi yerinde öğrenir — uzun soluklu iş ulaşılabilir kalır.',
      illustrationAlt:
        'Bir yandan sisli kayalıklar arasında sürüklenen bir gemi, diğer yandan aynı geminin çizili rotayla liman fenerine ilerleyişi — bir gravür diptiği.',
    },
    story: {
      act1: {
        kicker: 'Yöntem · Perde I',
        lead: 'Neyin bitti sayılacağına ve sınırların nerede olacağına siz karar verirsiniz. Plan niyetinizi taşır; ajanlar saatleri çalışır — sürekli gözetim yok, yirmi dakikada bir düzeltme yok.',
        deepLinkLabel: 'Metodolojiyi okuyun',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Yöntem · Perde II',
        lead: 'Uzun görevler her modelin bağlamını doldurur. Ayrıntılar kayar ve ajan saptar. Yazılı bir plan — atomik görevler, doğrulama kapıları, sürdürülebilir durum — her turda geri döndüğü çıpadır.',
        deepLinkLabel: 'Çekirdek döngüyü görün',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Yöntem · Perde III',
        lead: 'Her görev, kabul kriterlerini ve geçmesi gereken kontrolleri adlandırır. Ajan kendini bitmiş hissedemez — geçmek zorundadır, aksi hâlde görev açık kalır.',
        deepLinkLabel: 'Şartnamayı okuyun',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Yöntem · Perde IV',
        lead: 'Bağlam, araçlar, koruma bariyerleri ve durum; herhangi bir ajanın okuyabileceği düz dosyalar olarak deponuzda yaşar. Kilitlenme yok, dış beyin yok — bağlam sıfırlamalarını atlatır.',
        deepLinkLabel: 'Onboarding çıktısını görün',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Yöntem · Perde V',
        lead: 'Bağlam, ajanınızın en kıt kaynağıdır. Harness aşamalı yüklenir, yalnızca değişeni doğrular ve görev başına öğrenir — plan kendini öder.',
        deepLinkLabel: 'Metodolojiyi okuyun',
        deepLinkHref: '/methodology',
      },
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
          title:
            '.claude ve .cursor → .agents sembolik bağlarıyla .agents/ yapısını kurar',
          description:
            'Ajandan bağımsız bir .agents/ dizini (skill’ler, ajanlar, komutlar) ve .claude ile .cursor → .agents sembolik bağları, CLAUDE.md’yi AGENTS.md’ye yansıtır; böylece her araç tek bir doğruluk kaynağını okur.',
        },
        {
          title: 'DWP skill’ini kurar ve .dwp/ yapısını oluşturur',
          description:
            'Deep Work Plan skill’ini bağlar ve planlar ile taslaklar için gitignore’lanmış .dwp/ klasörünü oluşturur, zorunlu AI Diff Reviewer yerel incelemesini kurar, ardından isteğe bağlı olarak devcontainer desteği gibi tercihe dayalı eklentileri katmanlar.',
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
          label: '.claude ve .cursor → .agents sembolik bağlarıyla .agents/',
          detail:
            'Ajandan bağımsız bir .agents/ dizini (skill’ler, ajanlar, komutlar) ve .claude ile .cursor → .agents sembolik bağları; böylece her araç tek bir doğruluk kaynağını okur.',
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
      viewAllCta: 'Tüm ajanları gör',
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
          support: 'full',
          note: 'Tam adaptör — dwp-* komutları AGENTS.md ve # prosedürleri aracılığıyla çalışır.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Yerel WebFetch ile Gemini 2.5 Pro veya daha yenisini gerektirir.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: "Açık kaynak. AGENTS.md'yi yerel olarak okur ve dwp-* komutlarını # ile çalıştırır.",
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Kurallar ve # komut prosedürleri eksiksiz Deep Work Plan döngüsünü yürütür.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Açık kaynak. Markdown kuralları ve # komutları her dwp-* adımını çalıştırır.',
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
      viewAllCta: 'Tüm önayarları gör',
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
      tertiaryCta: 'Ajanlar ve geliştiriciler için',
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
    agentTitle: 'Yapay zeka ajanları için',
    agentIntro:
      'Bu yol mevcut değil. Aşağıdaki kurtarma bağlantıları (ve makine tarafından okunabilir karşılıkları) bu sitedeki tüm sayfaları listeler.',
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
      'Metodolojiyi çalıştırmak için ihtiyacınız olan her şey: skill ve alt skill’leri, eğik çizgi komutları, ajan adaptörleri, kuruluma alma hazır ayarları, zorunlu yerel inceleme ve tercihe dayalı eklentiler ile işlenmiş örnekler.',
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
          'onboard akışının bir depoya katmanladığı yetenekler: zorunlu AI Diff Reviewer yerel incelemesi ve asla AI-first temel hattının parçası olmayan dört isteğe bağlı eklenti.',
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
          'onboard alt skill’ini çalıştırın ve ajanın gerçek deponuz hakkında akıl yürütmesine izin verin. AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve ajandan bağımsız bir .agents/ yuvası (.claude → .agents ve .cursor → .agents sembolik bağlarıyla) üretir, ince dwp-* komutlarını bağlar ve gitignore’lanmış bir .dwp/ yapısı oluşturur.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kiti geliştirin ve eklentileri kabul edin',
        description:
          'Yığına uygun skill’ler, ajanlar ve komutlar geliştirmek için /skill-create ve /agent-create (author alt skill’i) kullanın. Kuruluma alma, zorunlu AI Diff Reviewer yerel incelemesini kurar (CI kapısı isteğe bağlı kalır) ve dört tercihe dayalı eklenti sunar — devcontainer, Dailybot, dependency-upgrade ve design-system — yalnızca uygun olduklarında kabul edersiniz.',
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
    handoffTitle: 'Ajanınıza kopyalayın',
    handoffBody:
      "init.md isteminin tamamını kopyalayıp yapay zeka kodlama ajanınıza — Claude Code, Cursor, Codex veya herhangi bir diğeri — yapıştırın. Metodolojiyi ve spesifikasyonu okur, skill'i kurar ve bu depoyu Deep Work Plan'ler için kuruluma alır.",
    handoffInstruction:
      'Bu depoyu AI-first hale getirmek için https://deepworkplan.com/init.md adresindeki talimatları oku ve uygula.',
    handoffMdLabel: 'Bağımsız ajan istemi',
    codeLabel: 'agent',
    whatTitle: 'Bu ne yapar',
    whatBody: [
      'Benimseme, depoyu kalıcı iki şekilde değiştirir — metodolojinin temel direkleri.',
      'İlk olarak, depo spec odaklı hale gelir: iş, gelişigüzel istemlerden değil, yazılı bir plan ve spesifikasyondan başlar. İkinci olarak, deponun kendisi ajan harness’ı haline gelir — bir AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve bir .agents/ skill yuvası (.claude → .agents ve .cursor → .agents sembolik bağlarıyla), her ajana ihtiyaç duyduğu bağlamı ve komutları verir.',
    ],
    sequenceTitle: 'Benimseme dizisi',
    orLabel: 'veya',
    steps: [
      {
        title: 'Kurmadan önce doğrulayın',
        description:
          'İstemi ve skill’i denetleyene kadar güvenilmez olarak ele alın. Her ikisi de açık kaynaklıdır ve MIT lisanslıdır; skill, ağ çağrısı ve telemetri içermeyen Markdown odaklı bir yapıdadır. Her sürüm, gönderilen skill üzerinde bir SHA256SUMS yayımlar; çalıştırmadan önce kopyanızın eşleştiğini doğrulayabilirsiniz. Sürümler sağlama toplamlıdır, imzalı değildir (imzalama, belgelenmiş bir sonraki adımdır).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Skill’i kurun',
        description:
          'Herhangi bir ajanın yapılandırılmış işi planlayıp yürütebilmesi için Deep Work Plan skill’ini ekleyin. Skill, bir yönlendirici ve sekiz alt skill ile gelir — create, execute, refine, resume, status, verify, onboard ve author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Depo kuruluma almasını çalıştırın',
        description:
          'onboard alt skill’ini çağırın ve ajanın gerçek depo hakkında — yığını, paket yöneticisi ve gerçek doğrulama komutları — akıl yürütmesine izin verin. Ardından AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve ajandan bağımsız bir .agents/ yuvası (.claude → .agents ve .cursor → .agents sembolik bağlarıyla) üretir, ince dwp-* komutlarını bağlar ve planlar ile taslaklar için gitignore’lanmış bir .dwp/ yapısı oluşturur. Büyük depolarda onboard alt skill’i plan odaklı bir yol kullanır: keşfi tamamlar, ardından bir kuruluma alma Deep Work Plan’ı üretir. Hiçbir şey şablonlanmaz; her şey deponuza uyarlanır.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Yerel inceleme ve tercihe dayalı eklentiler',
        description:
          'Kuruluma alma, zorunlu AI Diff Reviewer yerel incelemesini kurar (CI kapısı isteğe bağlı kalır) ve dört tercihe dayalı eklenti sunar — devcontainer, Dailybot, dependency-upgrade ve design-system — yalnızca uygun olduklarında kabul edersiniz. Bir depo, sıfır isteğe bağlı eklentiyle tam uyumludur. Temel yapının ötesinde yığına uygun skill’ler, ajanlar ve komutlar geliştirmek için /skill-create ve /agent-create (author alt skill’i) kullanın.',
      },
      {
        title: 'Planlayın ve yürütün',
        description:
          '/dwp-create ile Deep Work Plan’ler üretin ve /dwp-execute ile çalıştırın, ardından iş ilerledikçe /dwp-status, /dwp-refine, /dwp-resume ve /dwp-verify kullanın. Her plan, numaralı görevler, doğrulama kapıları ve bir tamamlama protokolü taşır — üç zorunlu son görevle sona erer: bir Güvenlik İncelemesi, Skill’ler ve Ajanlar Keşfi ve bir Yönetici Raporu.',
      },
      {
        title: 'Uyumluluk doğrulaması',
        description:
          'Spesifikasyona karşı nesnel bir geçti/kaldı raporu için /dwp-verify çalıştırın. AGENTS.md, docs/ (taslak değil gerçek içerikle), .agents/ (ince dwp-* yönlendiricileri ve diskle eşleşen bir katalogla), .dwp/ ve tmp/ dizinlerinin yerinde olduğunu doğrulayın — şablonlanmış hiçbir şey yok, her şey bu depo için akıl yürütülmüş.',
        commands: ['/dwp-verify'],
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

  faqPage: {
    meta: {
      title: 'Frequently asked questions — Deep Work Plan',
      description:
        'Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it.',
    },
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    intro:
      'Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.',
    groups: [
      {
        id: 'what',
        title: 'What Deep Work Plan is',
        items: [
          {
            id: 'what-is-it',
            question: 'What does Deep Work Plan actually do?',
            answer:
              'Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Who is it for?',
            answer:
              'Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Is it a tool, a framework or a methodology?',
            answer:
              'A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.',
            linkLabel: 'Read the specification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Which coding agents does it work with?',
            answer:
              "Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.",
            linkLabel: 'Browse the kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'How a plan runs',
        items: [
          {
            id: 'gates',
            question:
              'How are the validation gates implemented? Do they need human sign-off?',
            answer:
              "They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'How does the plan avoid going stale when people change the code between runs?',
            answer:
              'On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Can I change the plan mid-run without losing completed work?',
            answer:
              'Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Does it keep checking the work against the plan, or is the plan an upfront thing?',
            answer:
              'The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Is the plan generated once and maintained by hand, or does it evolve with the code?',
            answer:
              "Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'What happens if the session dies halfway?',
            answer:
              "Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'What is the Final Review?',
            answer:
              "The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.",
            linkLabel: 'The specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'How it compares',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?',
            answer:
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow frameworks such as BMAD, Superpowers or Get Shit Done?',
            answer:
              'Those frameworks bring strong working styles: roles, principles, test-first steps, verification habits. Deep Work Plan focuses on what stays in the repository and what can be checked: a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The comparison page shows where each approach is built in, optional or out of scope.',
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: "Why not just use my agent's built-in plan mode?",
            answer:
              "Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopting it',
        items: [
          {
            id: 'install',
            question:
              'What does onboarding write into my repository, and does it touch existing files?',
            answer:
              'Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.',
            linkLabel: 'The adoption endpoint',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'What does it cost, and how is efficiency measured?',
            answer:
              'The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.',
            linkLabel: 'Trust and disclosure',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Still have a question?',
      body: 'Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.',
      ctaLabel: 'Ask on GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan compared with the alternatives — Deep Work Plan',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.',
      values: {
        builtIn: 'Built in',
        optional: 'Optional or via extension',
        notInScope: 'Not in scope',
      },
    },
    reviewedOnLabel: 'Last reviewed',
    alternativesTitle: 'The alternatives, on their own terms',
    officialSiteLabel: 'Official site',
    categories: {
      methodology: 'Methodology',
      sdd: 'Spec-driven development tools',
      agentFramework: 'Agent workflow frameworks',
      vendorNative: 'Vendor-native plan modes',
    },
    matrix: {
      title: 'Capability matrix',
      caption:
        'Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.',
      capabilityColumn: 'Capability',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Works with any coding agent',
        help: 'The same repository files drive Claude Code, Codex, Cursor, Gemini CLI and others.',
      },
      repoNativeHarness: {
        label: 'Writes the agent harness into the repository',
        help: "Instructions, docs, skills and commands live in the repository, not in one tool's settings.",
      },
      taskAcceptanceCriteria: {
        label: 'Acceptance criteria per task',
        help: 'Each task states observable conditions for being done.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Each task names the commands that must pass, selected from what it touched.',
      },
      resumableState: {
        label: 'Resumable state on disk',
        help: 'Progress survives a session reset and can be picked up by another agent or a teammate.',
      },
      finalReview: {
        label: 'Mandatory closing review with a security pass',
        help: 'The plan cannot complete without a security review of the full change set and validation of the final state.',
      },
      conformanceChecker: {
        label: 'Executable conformance checker',
        help: 'A script verifies the repository and its plans against the standard, with a CI-friendly exit code.',
      },
      instructionBudgetLedger: {
        label: 'Published instruction-load measurement',
        help: 'The bytes each flow loads are measured by a committed script and published with their limits.',
      },
      onboardingScaffold: {
        label: 'Onboarding that scaffolds documentation',
        help: "A first run writes the repository's agent-facing documentation and kit.",
      },
      brownfieldSpecs: {
        label: 'Living specs for existing systems',
        help: 'Changes are specified as deltas that merge into a growing specification of the system.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installs as a skill, onboards the repository into an agent harness and runs long-horizon plans with per-task validation gates, on-disk state and a mandatory Final Review.',
        audience:
          'Developers and teams who hand multi-session work to any coding agent and need it to finish verified.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves.',
        audience:
          'Solo developers and small teams who want context engineering and verification without heavy ceremony.',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards.',
        audience:
          'Anyone who wants planning inside a single agent without adopting a methodology.',
      },
    },
    dwpStrengths: {
      title: 'What Deep Work Plan brings',
      items: [
        {
          title: 'Tool-agnostic and repository-native',
          body: 'The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.',
        },
        {
          title: 'Validation selected from what each task touched',
          body: 'Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.',
        },
        {
          title: 'One Final Review with a security pass',
          body: 'A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.',
        },
        {
          title: 'State that survives sessions and agents',
          body: 'README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.',
        },
        {
          title: 'A conformance checker for the repository itself',
          body: 'A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.',
        },
        {
          title: 'Instruction load measured and published',
          body: 'A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.',
        },
      ],
    },
    honestLimits: {
      title: 'Honest limits',
      body: 'Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.',
    },
    correction: {
      title: 'Help us keep this accurate',
      body: 'This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.',
      ctaLabel: 'Open an issue',
    },
    sourcesTitle: 'Sources',
  },

  trustPage: {
    meta: {
      title: 'Güven ve güvenlik',
      description:
        "Deep Work Plan'in neden güvenle benimsenebileceği: açık kaynak ve MIT lisanslı, ağ çağrısı veya telemetri içermeyen Markdown-first yapı, tasarım gereği yıkıcı olmayan, doğrulanabilir kurulumlar ve açık bir güvenlik açığı bildirme politikası.",
    },
    eyebrow: 'Güven & güvenlik',
    title: 'Güven ve güvenlik',
    intro:
      "Kimse güvenemediği bir skill'i kurmamalıdır. Deep Work Plan, kör bir inanca değil doğrulamaya dayalı olarak tasarlanmıştır: açık kaynak, Markdown-first, yıkıcı olmayan ve çalıştırmadan önce kontrol edilebilir. Bu sayfa, ne yaptığını, ne yapmadığını ve her ikisini nasıl doğrulayacağınızı açıkça ortaya koyar.",
    pillarsTitle: 'Neye güveniyorsunuz',
    pillars: [
      {
        title: 'Açık kaynak ve MIT lisanslı',
        body: "Web sitesi ve skill'in ikisi de herkese açık ve karşılaştırılabilirdir. Çalıştırmadan önce her satırı okuyabilir ve herhangi bir kopyayı etiketli bir sürümdeki kaynakla karşılaştırabilirsiniz.",
      },
      {
        title: 'Markdown-first — ağ yok, telemetri yok',
        body: "Skill'in CLI'si, HTTP API'si veya kimlik doğrulama akışı yoktur. Ağ çağrısı yapmaz ve telemetri göndermez; tek yerel yardımcısı git ve ortam meta verilerini okur. Deponuzla ilgili hiçbir şey makinenizden çıkmaz.",
      },
      {
        title: 'Tasarım gereği yıkıcı olmayan',
        body: "Skill'in güvenlikle ilgili tek eylemi deponuzu değiştirmektir ve bunu üzerine yazmak yerine uzlaştırarak yapar. Mevcut olanı tespit eder, bir plan önerir ve herhangi bir şeyin yerini almadan önce sorar. Plan çıktıları, gitignore'lanmış bir .dwp/ dizininde tutulur.",
      },
      {
        title: 'Sırları dokunmaz',
        body: "Metodoloji hiçbir zaman sır kaydetmez ve çalışma durumunu sürüm denetiminin dışında tutar. Onboarding, .gitignore'u yeniden yazmak yerine ona ekler ve her değişiklik küçük, okunabilir farklar halinde gözden geçirilmek üzere tasarlanmıştır.",
      },
      {
        title: 'Doğrulanabilir kaynak',
        body: 'Her sürüm, gönderilen skill üzerinde sağlama toplamları yayımlar; böylece güvenmeden önce indirilen bir kopyanın yayımlananla eşleştiğini doğrulayabilirsiniz.',
      },
    ],
    verifyTitle: 'Çalıştırmadan önce doğrulayın',
    verifyIntro:
      "Skill'i kontrol edene kadar güvenilmez olarak değerlendirin. Her sürüm, gönderilen skill'i kapsayan bir SHA256SUMS dosyası ekler. Kurmayı planladığınız sürüm için indirin, ardından kopyanızın eşleştiğini doğrulayın — sıfırdan farklı bir çıkış, bir dosyanın eşleşmediği anlamına gelir ve durmanız gerekir.",
    codeLabel: 'shell',
    verifyNote:
      "Sürümler sağlama toplamlarına sahiptir, imzalı değildir — imzalama (cosign veya yetkili kişi GPG'si) belgelenmiş bir sonraki adımdır, mevcut bir iddia değildir. Her şey açık olduğundan, herhangi bir dosyayı etiketindeki depoya göre de karşılaştırabilirsiniz.",
    disclosureTitle: 'Güvenlik açığı bildirin',
    disclosureBody:
      "Bir güvenlik sorunu mu buldunuz? İlgili depoda — skill'de veya web sitesinde (aşağıda bağlantısı verilen güvenlik politikalarına bakın) — GitHub'ın özel güvenlik açığı bildirme özelliği aracılığıyla özel olarak bildirin; kamuya açık bir issue açmak yerine, zira bu durum düzeltme gelmeden önce sorunu ifşa eder.",
    resourcesTitle: 'Güven kaynakları',
    linkManifest: 'Makine tarafından okunabilir güven manifestosu',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Web sitesi güvenlik politikası',
    linkSkillPolicy: 'Skill güvenlik politikası ve tehdit modeli',
    limitationsTitle: 'Dürüst sınırlamalar',
    limitations: [
      'Sürümler sağlama toplamlarına sahiptir, henüz kriptografik olarak imzalanmamıştır — imzalama planlandı, tamamlanmadı.',
      'Deep Work Plan, deponuza karşı otonom bir kodlama ajanı çalıştırır. Önerilen planı ve farklarını gözden geçirin; metodoloji bu inceleme için tasarlanmıştır, onun yerini almak için değil.',
      'Buradaki güven iddiaları yalnızca resmi kaynakları tanımlar. Depolardan sapan değiştirilmiş veya üçüncü taraf bir kopya, bu garantilerin hiçbirini taşımaz — önce doğrulayın.',
    ],
    ctaTitle: 'Güvenle benimseyin',
    ctaBody:
      'Metodolojiyi ve spesifikasyonu okuyun, bir ajanı init uç noktasına yönlendirin ve çalıştırmadan önce kurulumu doğrulayın.',
    ctaPrimary: 'Metodolojiyi okuyun',
    ctaSecondary: 'Benimseme (init)',
  },

  // Developers — agent & developer surface
  developersPage: {
    meta: {
      title:
        "Geliştiriciler — Deep Work Plan ajan API'si, MCP sunucusu ve dokümanları",
      description:
        "Deep Work Plan ajan yüzeyi: salt okunur, kimlik doğrulamasız API, OpenAPI spesifikasyonu, /api/mcp MCP sunucusu, 17 dilde Markdown ve npx skills CLI'si.",
    },
    eyebrow: 'Ajan ve geliştirici yüzeyi',
    title: 'Geliştiriciler ve yapay zeka ajanları için Deep Work Plan',
    intro:
      "deepworkplan.com, sayfalarının yanı sıra makine tarafından okunabilir bir yüzey sunar: OpenAPI ile tanımlanmış bir ajan API'si, durumsuz bir MCP sunucusu, her sayfa için 17 dilde yerel Markdown aynaları ve kurulabilir DWP skill'i. Bu sayfadaki her şey canlı, herkese açık ve ücretsizdir — kayıt olacak bir şey yoktur.",
    accessTitle: 'Tasarım gereği kimlik doğrulamasız',
    accessIntro:
      'Üretecek API anahtarı, OAuth akışı ve üretimden ayrı bir sandbox yoktur — üretim yüzeyinin kendisi sandbox\'tur. Bu, metodolojinin bilinçli bir özelliğidir: ajanlar "bize ulaşın" formlarını dolduramaz; dolayısıyla site hiçbir zaman bunu istemez.',
    accessPoints: [
      {
        title: 'Salt okunur',
        body: "MCP uç noktası (POST) dışındaki her işlem güvenli ve önbelleğe alınabilir bir GET'tir. Hiçbir yerde yazma işlemi, yükleme veya durum değişikliği yoktur.",
      },
      {
        title: 'API anahtarı yok',
        body: 'Kayıt yok, jeton yok, hız sınırı kademesi yok. Anonim erişim; /auth.md ve OAuth keşif taslaklarında bildirilen belgelenmiş sözleşmedir.',
      },
      {
        title: 'Ücretsiz ve açık kaynak',
        body: "Site içeriği ve DWP skill'i MIT lisanslıdır. Bunları, izin istemeden ticari ve ticari olmayan işlerde kullanabilirsiniz.",
      },
      {
        title: 'Makine öncelikli',
        body: '/api yollarında yapılandırılmış JSON hataları, Markdown 404 kurtarma gövdeleri, RFC 9727 API kataloğu ve bir ARD yetenek manifestosu — ajan tüketimi için tasarlanmıştır.',
      },
    ],
    endpointsTitle: 'Uç noktalar',
    endpointsIntro:
      "Ajan API'sinin temel uç noktaları. Eksiksiz ve türlendirilmiş spesifikasyon — her işlem, parametre ve yanıt şeması — OpenAPI belgesinde yer alır.",
    endpointsNote:
      'Bilinmeyen /api/* yolları, çözüm ipucu içeren yapılandırılmış bir JSON hatası döndürür; asla bir HTML hata sayfası döndürmez.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: "Ajan API'sinin tamamının OpenAPI 3.1 spesifikasyonu.",
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Seçilmiş LLM rehber dizini — ajanlar için önerilen giriş noktası.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Kanonik DWP benimseme istemi (herhangi bir depoyu AI-first yapar).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Herhangi bir sayfa, yerel kaynak Markdown olarak — 17 dilin tümünde (örn. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Spesifikasyona ve bu portala bağlantılar içeren statik sağlık işareti.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP sunucusu (Streamable HTTP, durumsuz): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'ARD yetenek manifestosu — robots.txt içinde bildirilen agentmap.',
      },
    ],
    mcpTitle: 'MCP sunucusu',
    mcpIntro:
      'Streamable HTTP üzerinden durumsuz bir Model Context Protocol sunucusu. Üç salt okunur araç: get_init_prompt, list_site_sections ve read_page. 2025-03-26 ve 2025-06-18 protokol sürümleri desteklenir; oturum gerekmez.',
    mcpCodeLabel: 'Terminal — HTTP üzerinden JSON-RPC',
    mcpNote:
      'MCP manifestosu /.well-known/mcp.json adresinde, sunucu kartı ise /.well-known/mcp/server-card.json adresindedir. Claude, ChatGPT ve herhangi bir MCP istemcisi bu araçları doğal olarak çağırabilir.',
    markdownTitle: 'Ajanlar için Markdown',
    markdownIntro:
      "İşlenen her sayfa, yerel kaynak Markdown olarak yayımlanır — bir HTML dönüşümü değildir. Markdown'ı herhangi bir sayfada URL son ekiyle açıkça ya da HTTP içerik müzakeresi yoluyla isteyin.",
    markdownCodeLabel: 'Terminal — içerik müzakeresi',
    markdownNote:
      "İçerik müzakeresi, sitenin işlediği kaynağın aynısı olan kaynak Markdown'ı, istekte bulunduğunuz URL'nin dilinde döndürür.",
    cliTitle: "Kit'i kurun",
    cliIntro:
      "Deep Work Plan skill'i için resmî kurulum yolu — /init uç noktasının ajanlara verdiği komutla aynıdır. Skills uyumlu herhangi bir kodlama ajanıyla çalışır (Claude Code, Cursor, Codex, Gemini ve diğerleri).",
    cliCodeLabel: 'Terminal — skills CLI',
    cliNote:
      'Skill, deponuzun içindeki .agents/skills/deepworkplan/ klasörüne yerleştirilir; böylece depoya dokunan her ajan aynı metodolojiyi paylaşır.',
    resourcesTitle: 'Makine tarafından okunabilir kaynaklar',
    resources: [
      {
        label: 'OpenAPI spesifikasyonu (/openapi.json)',
        href: '/openapi.json',
      },
      {
        label: 'Ajan erişimi ve kimlik doğrulama bildirimi (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'API kataloğu, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP manifestosu (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Güvenlik iletişim adresi (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Site depo tanımlayıcısı (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Bir ajanı yönlendirin',
    ctaBody:
      "En hızlı yol hâlâ tek satırdır: herhangi bir kodlama ajanına /init istemini verin; skill'i kurar, deponuzu ajanlar için hazırlar ve derin işi bitirmeye koyulur.",
    ctaPrimary: '/init istemini açın',
    ctaSecondary: 'Metodolojiyi okuyun',
  },

  // Privacy policy
  privacyPage: {
    meta: {
      title: 'Gizlilik — Deep Work Plan',
      description:
        'deepworkplan.com gizlilik politikası: hesap, reklam ve siteler arası takip içermeyen statik bir site; iletişim formunun ne topladığı sade biçimde açıklanır.',
    },
    eyebrow: 'Gizlilik politikası',
    title: "deepworkplan.com'da gizlilik",
    intro:
      'Deep Work Plan statik bir dokümantasyon ve metodoloji sitesidir. Bu sayfa, ziyaret ettiğinizde sitenin hangi verilere dokunduğunu sade ve eksiksiz biçimde açıklar: sitede hesap sistemi, reklam ve siteler arası takip yoktur.',
    lastUpdated: '8 Eylül 2026',
    sections: [
      {
        heading: 'Site nedir',
        body: 'deepworkplan.com, bir CDN üzerinden sunulan statik sayfalar bütünüdür. Giriş, kullanıcı veritabanı ve kişisel profil depolama yolu yoktur. İçerik, DailybotHQ organizasyonu altındaki herkese açık GitHub depolarında geliştirilir; burada okuduğunuz her şey tam olarak derlendiği gibi sunulur.',
      },
      {
        heading: 'Analitik',
        body: 'Site, sayfa görüntülemelerini toplu olarak saymak için çerezsiz ve gizlilik öncelikli bir analitik hizmeti olan Umami\'yi kullanır. Umami takip çerezi yerleştirmez ve siteler arası profil oluşturmaz. Yapay zeka tarayıcıları JavaScript çalıştırmadığı için, sunucu tarafındaki bir edge fonksiyonu ayrıca otomatik bot ziyaretlerinin kullanıcı aracısını ve yolunu anonim analitik olayları olarak kaydeder — bu, tarayıcı yazılımını tanımlar (örneğin "GPTBot /init adresini ziyaret etti"), asla insan bir ziyaretçiyi değil.',
      },
      {
        heading: 'Çerezler ve yerel depolama',
        body: 'Site hiçbir takip çerezi yerleştirmez. Tarayıcınızda depolanan tek şey, localStorage içinde tutulan bir tema tercihidir (açık veya koyu mod); bu tercih cihazınızdan asla çıkmaz ve hiçbir yere iletilmez. Tarayıcı depolamanızı temizlerseniz site, yalnızca sistem varsayılan temanıza döner.',
      },
      {
        heading: 'Üçüncü taraf hizmetler',
        body: "Barındırma ve teslimat Cloudflare Pages üzerinde çalışır; Cloudflare, CDN'yi işletmek ve kötüye kullanımı engellemek kapsamında kenar noktasındaki istek günlüklerini ve IP adreslerini kendi gizlilik politikası uyarınca işler. Toplu analitik Umami üzerinde çalışır (cloud.umami.is). İletişim formunu gönüllü olarak gönderirseniz yanıtlarınız, Google Forms üzerinden ekibimize iletilir — yazdığınız bilgilerin toplandığı tek yer burasıdır ve yalnızca size yanıt vermek için kullanılır.",
      },
      {
        heading: 'Yapmadığımız şeyler',
        body: 'Kişisel veri satmayız veya paylaşmayız; reklam veya yeniden pazarlama pikseli çalıştırmayız, tarayıcı parmak izi almayız, pazarlama e-postası göndermeyiz. Sitede bülten kaydı ve yukarıda açıklanan toplu, çerezsiz sayımların ötesinde telemetri yoktur.',
      },
      {
        heading: 'Seçenekleriniz',
        body: 'Buradaki analitik toplu ve çerezsiz olduğu için dışa aktarılacak veya silinecek kişisel profil yoktur. Analitik betiğini, sitenin çalışmasını etkilemeden herhangi bir içerik engelleyiciyle engelleyebilirsiniz. İletişim formunu gönderdiyseniz ve iletinizin silinmesini istiyorsanız aşağıdaki iletişim adresine yazın; iletiyi kaldırırız.',
      },
      {
        heading: 'Bu politikadaki değişiklikler',
        body: 'Bu politikada önemli bir değişiklik olursa sayfanın en üstündeki güncellenme tarihi de değişir ve öz değişiklikler, herkesin geçmişi inceleyebileceği herkese açık web sitesi deposuna işlenir.',
      },
    ],
    contactTitle: 'İletişim ve güvenlik',
    contactBody:
      "Gizlilik soruları için security@dailybot.com adresine yazın. Bir güvenlik açığını bildirmek isterseniz, web sitesi ve skill depoları için GitHub'ın özel güvenlik açığı bildirme özelliğini tercih edin — kesin adresler için /.well-known/security.txt dosyasına bakın.",
  },
};
