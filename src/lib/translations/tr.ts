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
    faq: 'SSS',
    compare: 'Karşılaştırma',
    changelog: 'Changelog',
    resources: 'Kaynaklar',
    resourcesDesc: 'Örnekler, güven, SSS ve karşılaştırma',
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
  changelogPage: {
    meta: {
      title: 'Deep Work Plan Değişiklik Günlüğü',
      description:
        'Deep Work Plan becerisi, metodolojisi ve taşınabilir aracı altyapısındaki önemli güncellemeler.',
    },
    eyebrow: 'Değişiklik günlüğü',
    title: 'Metodun arkasındaki çalışma',
    intro:
      'Deep Work Plan’ı uzun vadeli ajan çalışmaları için güvenilir kılan sürümleri ve tasarım kararlarını kaynaklarıyla izleyen zaman çizelgesi.',
    viewDetail: 'Güncellemeyi oku',
    backToIndex: 'Tüm güncellemeler',
    sourceLabel: 'Kaynaklar',
    featuredLabel: 'Öne çıkan sürüm',
    relatedTitle: 'İlgili güncellemeler',
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
      learn: 'Öğrenin',
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
        'Ve bağlam, ajanınızın en kıt kaynağıdır. Bu yüzden harness token verimliliği için tasarlandı: talimatlar aşamalı yüklenir, doğrulama yalnızca değişene dokunur ve her görev kendi yerinde öğrenir — uzun soluklu iş ulaşılabilir kalır. Planın kendisi de aynı şekilde ölçeklenir: sınırlı bir düzeltme için Lite plan, saatler süren bir iş için Full plan — biçim her zaman işin kapsamını izler, tam tersi değil.',
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
            'Deep Work Plan skill’ini bağlar ve planlar için gitignore’lanmış .dwp/ klasörünü oluşturur, zorunlu AI Diff Reviewer yerel incelemesini kurar, ardından isteğe bağlı olarak devcontainer desteği gibi tercihe dayalı eklentileri katmanlar.',
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
            'Skill, motordur — her depoda aynıdır. Tek bir komut, yönlendiriciyi ve alt skill’lerini (create, execute, refine, resume, status, verify, onboard, author, upgrade) Claude Code, Cursor, Codex, Gemini ve Copilot için getirir.',
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
            'create, execute, refine, resume, status, verify, onboard, author ve upgrade — ajanınıza tek bir skill paketi olarak, depo başına kopya olmadan sunulur.',
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
            'Daemon yok, harici durum yok. Planlar gitignore’lanmış bir .dwp/ klasörüne iner ve herhangi bir görev — bağlam taştıktan sonra bile — yalnızca git üzerinden kaldığı yerden sürdürülür.',
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
        'Deep Work Plan’i ajanlar ve yığınlar arasında çalıştırılabilir kılan skill ve dokuz alt skill’i, komutlar, adaptörler, hazır ayarlar, tercihe dayalı eklentiler ve örnekler.',
    },
    eyebrow: 'Kit',
    title: 'Kit',
    intro:
      'Metodolojiyi çalıştırmak için ihtiyacınız olan her şey: skill ve alt skill’leri, eğik çizgi komutları, ajan adaptörleri, kuruluma alma hazır ayarları, zorunlu yerel inceleme ve tercihe dayalı eklentiler ile işlenmiş örnekler.',
    groups: {
      command: {
        title: 'Alt skill’ler ve komutlar',
        description:
          'Skill yönlendiricisi ve alt skill’leri (create, execute, refine, resume, status, verify, onboard, author, upgrade), ayrıca bunlara devreden ince eğik çizgi komutları.',
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
          'Skill’i deponuza ekleyin — bir yönlendirici ve dokuz alt skill (create, execute, refine, resume, status, verify, onboard, author, upgrade). En hızlı yol için Skills CLI’yı kullanın ya da git ile bir kabuk mevcut olan yerde depoyu klonlayıp kurulumu çalıştırın.',
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
          'Herhangi bir ajanın yapılandırılmış işi planlayıp yürütebilmesi için Deep Work Plan skill’ini ekleyin. Skill, bir yönlendirici ve dokuz alt skill ile gelir — create, execute, refine, resume, status, verify, onboard, author ve upgrade.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Depo kuruluma almasını çalıştırın',
        description:
          'onboard alt skill’ini çağırın ve ajanın gerçek depo hakkında — yığını, paket yöneticisi ve gerçek doğrulama komutları — akıl yürütmesine izin verin. Ardından AGENTS.md, bir docs/ bilgi tabanı, modül başına dokümanlar ve ajandan bağımsız bir .agents/ yuvası (.claude → .agents ve .cursor → .agents sembolik bağlarıyla) üretir, ince dwp-* komutlarını bağlar ve planlar için gitignore’lanmış bir .dwp/ yapısı oluşturur. Büyük depolarda onboard alt skill’i plan odaklı bir yol kullanır: keşfi tamamlar, ardından bir kuruluma alma Deep Work Plan’ı üretir. Hiçbir şey şablonlanmaz; her şey deponuza uyarlanır.',
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
          '/dwp-create ile Deep Work Plan’ler üretin ve /dwp-execute ile çalıştırın, ardından iş ilerledikçe /dwp-status, /dwp-refine, /dwp-resume ve /dwp-verify kullanın. Her plan, numaralı görevler, doğrulama kapıları ve bir tamamlama protokolü taşır — ve tam olarak tek bir zorunlu Final Review ile kapanır (güvenlik geçişi, son-durum doğrulaması ve skills uzlaştırması). Executive Report istek üzerine hâlâ kullanılabilir.',
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
      title: 'Sıkça sorulan sorular — Deep Work Plan',
      description:
        'Deep Work Plan hakkında sorulan soruların yanıtları: ne yaptığı, doğrulama kapıları ve sürdürme, araçlarla karşılaştırma ve benimseme.',
    },
    eyebrow: 'SSS',
    title: 'Sıkça sorulan sorular',
    intro:
      'Deep Work Plan hakkında en çok sorulanlara kısa yanıtlar; her biri, konuyu derinleştiren sayfaya bir bağlantıyla.',
    tocTitle: 'Bu sayfada',
    groups: [
      {
        id: 'what',
        title: 'Deep Work Plan nedir',
        items: [
          {
            id: 'what-is-it',
            question: 'Deep Work Plan gerçekte ne yapar?',
            answer:
              'Deep Work Plan, bir depoyu, bir kodlama ajanının uzun işi güvenilir biçimde yürütebileceği yapılandırılmış bir ortama dönüştürür. Bir ajan skill’i olarak kurulur, depoyu bir kez kuruluma alır (bir `AGENTS.md` dizini, bir `docs/` ağacı, skill ve komutlardan oluşan bir `.agents/` kiti, gitignore’lanmış bir `.dwp/` çıktı alanı) ve o andan itibaren her hedef bir plana dönüşür: her biri kabul kriterleri ve bir doğrulama kapısı taşıyan atomik görevler; tek tek yürütülür, geçtikçe işlenir ve herhangi bir ajan tarafından diskten sürdürülebilir. Plan, güvenliği denetleyen ve son durumu doğrulayan bir Final Review ile kapanır. Metodoloji MIT lisanslıdır ve depo okuyan her kodlama ajanıyla çalışır.',
            linkLabel: 'Metodolojiyi okuyun',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Kimler içindir?',
            answer:
              'Kodlama ajanlarına gerçek, çok adımlı işler veren ve bu işin bitmesini isteyen geliştiriciler ve ekipler. Bir görev birden fazla oturuma, birden fazla dosya ailesine veya birden fazla ajana yayıldığında; bir ekip arkadaşının ajanın kaldığı yerden devam edebilmesi gerektiğinde; ya da "bitti"nin "ajanan öyle dedi" değil "doğrulandı" anlamına gelmesi gerektiğinde uyar. Tek satırlık bir düzeltmeye plan gerekmez ve metodoloji bunu açıkça söyler: orantılı titizlik kuralı, bunun yerine satır içi bir hedef, kriter ve kapı önerir.',
            linkLabel: 'Hızlı başlangıç',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: 'Lite plan ile Full plan arasındaki fark nedir?',
            answer:
              'Bir gösterim tercihidir, titizlik ödünleşmesi değil. Planlar varsayılan olarak Lite’tır: sabitlenmiş görev kayıtları içeren, zaten yürütülebilir kompakt bir README — kısmi bir taslak değil. Baştan bir Full plan isterseniz `create` Full görev dosyalarını doğrudan yazar; bir görevin talimat ayrıntısı, bağımlılıkları veya sözleşmeleri incelenebilir kompakt bir kayda sığmadığında da planı Full’e genişletir. Sonraki yükseltme tamamlanmış her görevi korur. Her iki biçim de aynı kabul kriterlerini, doğrulama kapılarını, kanıtı ve zorunlu Final Review’yi taşır.',
            linkLabel: 'Metodolojiyi okuyun',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: 'Bir araç mı, çerçeve mi yoksa metodoloji mi?',
            answer:
              'Kurulabilir bir skill olarak paketlenmiş bir metodoloji. Sunucu yok, hesap yok, tescilli biçim yok ve zaten kullandığınız kodlama ajanının ötesinde bir çalışma zamanı yok. Kurulan şey, ajanın okuduğu talimatlar; bağlam tespiti ve uyumluluk denetimi için küçük bir shell betiği kümesi; ve deponuzun benimsediği kurallardır. Planın ürettiği her şey deponuzdaki Markdown ve JSON’dur; hiçbir araç olmadan okunabilir.',
            linkLabel: 'Spesifikasyonu okuyun',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Hangi kodlama ajanlarıyla çalışır?',
            answer:
              'Depo dosyalarını okuyan herhangi bir ajan. Skill, açık Agent Skills standardını ve `AGENTS.md` kuralını izler; bu yüzden Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot ve diğerleri onu normal skill ve talimat yükleme süreçleri üzerinden edinir. Metodolojinin kendi değerlendirmesi, bir satıcının ajanının başlattığı bir planın diğer satıcının ajanı tarafından her iki yönde sürdürüldüğünü gösterir. Kurulum kapsamı ve davranışsal kanıt uyumluluk matrisinde ajan başına listelenir ve ikisi asla birbirine karıştırılmaz.',
            linkLabel: 'Kite göz atın',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: 'Nasıl kullanılır?',
            answer:
              "Üç adım. Önce Deep Work Plan skill'ini kodlama ajanınıza kurun — en hızlı yol `npx skills add DailybotHQ/deepworkplan-skill` (veya skill repo'sunu klonlayıp `./setup.sh` çalıştırmak). İkinci olarak, depoyu bir kez onboard edin; ajan `AGENTS.md`, `docs/`, `.agents/` kitini ve gitignore edilmiş `.dwp/` alanını yığınınıza uyarlasın: https://deepworkplan.com/init.md adresine yönlendirin veya `/deepworkplan-onboard` çalıştırın. Üçüncü olarak, ince komutlarla planlayın ve çalıştırın: `/dwp-create <goal>` bir plan oluşturur; `/dwp-execute` her kapıya karşı görev görev çalıştırır; `/dwp-refine` devam eden bir planı düzenler (kapsam, görevler veya bir Lite planın Full'e yükseltilmesi); `/dwp-resume` bir kesintiden sonra devam eder; `/dwp-status` çalıştırmadan ilerlemeyi raporlar; `/dwp-verify` nesnel bir uygunluk raporu üretir; `/dwp-upgrade` yüklü bir skill’i var olan planlara dokunmadan daha yeni bir sürüme taşır. `/` komutunu yakalayan ajanlar genellikle `#` kullanır (örneğin `#dwp-execute`). Adoption endpoint ve hızlı başlangıç aynı yolu daha ayrıntılı anlatır.",
            linkLabel: 'Hızlı başlangıç',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: 'Tam olarak ne kurulur ve nereye?',
            answer:
              'Ajan skill’i, ajanınızın proje veya kullanıcı skill’lerini yüklediği her yere kurulur. Kuruluma alma daha sonra deponun kendisini uyarlar: `AGENTS.md`, `docs/`, `.agents/` ve gitignore’lanmış `.dwp/` çalışma alanını oluşturur veya uzlaştırır. Skill ajana metodu öğretir; depo ise diğer ajanların devam edebilmesi için gereken bağlamı, kiti ve plan kanıtını tutar.',
            linkLabel: 'Benimseme akışına bakın',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Deep Work Plan Git gerektirir mi?',
            answer:
              'Depolar için Git önerilir, çünkü geçmişi kurtarma ve inceleme yüzeyinin bir parçasıdır; ancak metodoloji bir Git deposu olmadan da bir ajan çalışma alanında çalışabilir. Bu durumda, kurtarmanın bir sohbet dökümüne bağlı olmaması için `state.json` kontrol noktaları ve kapı kayıtları dahil makine tarafından okunabilir durum katmanı zorunludur.',
            linkLabel: 'Depo arketiplerini okuyun',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question:
              'Bir skill, bir plan ve bir ürün spesifikasyonu arasındaki fark nedir?',
            answer:
              'Bir skill, ajanın tekrarlanabilir bir prosedürü nasıl gerçekleştirdiğini tanımlar. Bir DWP planı, kapsam, kabul kriterleri, doğrulama kapıları ve kanıt yoluyla somut bir değişikliği tanımlar. Bir ürün spesifikasyonu ürünün mevcut davranışını tanımlar ve uygulamadan sonra delta’lar yoluyla evrilir; skill’ler ve planlar da birer spesifikasyondur, ancak bu kanonik ürün sözleşmesini sürdürmek yerine prosedürleri ve değişiklikleri tanımlarlar.',
            linkLabel: 'Spesifikasyonu okuyun',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'Bir plan nasıl çalışır',
        items: [
          {
            id: 'gates',
            question:
              'Doğrulama kapıları nasıl uygulanır? İnsan onayı gerekir mi?',
            answer:
              'Yürütülebilir onaylamalardır ve ajan bunları kendisi çalıştırır. İnsan onayı çalışmayı iki uçtan çerçeveler: bir kişi yürütmeden önce planı onaylar ve pull request sırasında son diff’i inceler; aradaki yürütme otonomdur. Her görev, genellikle deponun kendi kalite kapısı olan somut komutları adlandırır; bunlar görevin dokunduğu yüzeyden seçilir: değişen davranışın testleri ve tüketicileri, değişiklik paylaşıldığında veya sınırlandırılamadığında tam suite’e genişletilir. Bir görev, yalnızca bu komutlar başarıyla çıktığında tamamlanmış sayılır ve davranışı değiştiren görevler testleri genişletmelidir. Bir başarısızlıkta ajan önce görevin kendi kapsamına düşen şeyi onarır ve kapıyı yeniden çalıştırır; bu kapsamda onarılamayan bir başarısızlık görevi engellenmiş olarak işaretler ve çalışmayı durdurur.',
            linkLabel: 'Çekirdek döngü',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'İnsanlar çalışmalar arasında kodu değiştirdiğinde plan nasıl bayatlamaktan kaçınır?',
            answer:
              'Üç cephede. Görevler düzenleme olarak değil davranış olarak yazılır: bir kabul kriteri sistemin ne yapması gerektiğini söyler, bu yüzden yeniden adlandırılmış bir dosya veya değiştirilmiş bir uygulama onu geçersiz kılmaz. Her kapı, reponun şu anki haliyle yeniden çalıştırılır; böylece kırık bir varsayım bir sonraki çalıştırmada sessizce kaymak yerine gürültülü biçimde başarısız olur ve bu başarısızlık iyileştirme için işarettir. Dokümantasyonu senkron tutmak da işin parçasıdır: davranışı değiştiren bir görev, onu tanımlayan docs ve ajan kitini de kendi kapısının içinde günceller. Her çalıştırma, reponu bulduğundan daha ajan-hazır bırakmalıdır.',
            linkLabel: 'Metodolojiyi okuyun',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Tamamlanan işi kaybetmeden planı yürütme ortasında değiştirebilir miyim?',
            answer:
              'Evet; kısmen yürütülmüş bir planı iyileştirmek birinci sınıf bir harekettir. Görev tanımları ve yürütme durumu ayrı tutulur: plan diskte bir kontrol listesi artı küçük bir durum dosyasıdır, bu yüzden tamamlananlar görev metninden bağımsız kayıtlı kalır. Bir görev yanlış çıktığında ajan onu engellenmiş işaretler ve zorlamak yerine durur. Sonra henüz çalışmamış görevleri düzenler, yeniden sıralar, böler veya düşürürken tamamlanan görevler tamamlanmış kalır. Sürdürme, durumu diskten ve gerçek repodan yeniden oluşturur ve önemli kapıları yeniden çalıştırır; altta kaymış hiçbir şey gözden kaçmaz.',
            linkLabel: 'Çekirdek döngü',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'İşi plana karşı sürekli kontrol eder mi, yoksa plan yalnızca başta belirlenen bir şey mi?',
            answer:
              'Plan sürekli bir kontroldür. Ajan bir seferde bir küçük görevle çalışır ve devam etmeden önce doğrulamalıdır; böylece üç adım değil bir adım sapabilir. Her görev kabul kriterleri ve bunları kanıtlayan tam komutları taşır; ilerleme giderken repoya yazılır, görev başına bir durumla; sapma size, sonraki oturuma ve sonraki ajana görünür olur. Bir plan, Final Review dahil her şey doğrulanana kadar bitmiş değildir. Dürüst uyarı: metodoloji bir ajanın baştan zayıf bir kabul kriteri yazmasını engelleyemez; sapmayı sessiz yerine gürültülü yapar.',
            linkLabel: 'Çekirdek döngü',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Plan bir kez üretilip elle sürdürülür mü, yoksa kodla birlikte evrilir mi?',
            answer:
              'Hiçbiri. Bir hedeften bir kez üretilir ve sonra işin parçası olarak sürdürülür. Plan kasıtlı olarak kod diff’lerinden yeniden yazılmaz; çünkü kodu kovalayan bir spec gecikmeli bir ayna olur — metodolojinin ortadan kaldırmak için var olduğu sapma budur. Kasıtlı olarak evrilir: kapılar güncel repoya karşı yeniden çalışır, başarısız bir kapı iyileştirmeyi tetikler ve ajan bu iyileştirmeyi çalışma sırasında yapar; siz önden onaylar, sonda incelersiniz. Dokümantasyon ve testler, güncellemek her görevin kapısının içinde olduğu için yapı gereği kodla birlikte evrilir.',
            linkLabel: 'Metodolojiyi okuyun',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'Oturum yarıda kesilirse ne olur?',
            answer:
              'İlerleme sohbette değil diskte yaşar. README onay kutuları, her görevin günlüğü, sınırlı bir çalışma indeksi ve makine tarafından okunabilir bir durum dosyası her görev sınırında güncellenir; durum dosyası planlı her duraklamadan önce bir kontrol noktası kaydeder. Yeni bir oturum veya farklı bir ajan bu kompakt indeksi okur, repoyla ve git geçmişiyle uzlaştırır ve bitmiş işi yeniden yapmadan ilk tamamlanmamış görevde devam eder. Yarıda kesilen plan oluşturma bile kurtarılabilir: planın kimliği ve amaçlanan görev listesi herhangi bir görev dosyasından önce yazılır; böylece yarım oluşturulmuş bir plan tahmin edilmek yerine tamamlanabilir veya atılabilir.',
            linkLabel: 'Çekirdek döngü',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Final Review nedir?',
            answer:
              'Her planın zorunlu tek kapanış görevi. Sırayla: planın birikmiş tam değişiklik kümesi üzerinde bir güvenlik geçişi, AI Diff Reviewer skill’iyle diff’in zorunlu yerel incelemesi dahil; kritik bulgular düzeltilene veya açıkça kabul edilene kadar tamamlamayı engeller; son durum doğrulaması, yani nihai kodda deponun geçerli test, lint, type-check ve format suite’lerinin tamamı; ve her görevin kaydettiği skills kararlarının uzlaştırması. Ajan sonra teslim edilenleri, kanıtları ve sınırlamaları raporlar ve yalnızca siz istediğinizde oluşturarak bir kez Executive Report sunar.',
            linkLabel: 'Spesifikasyon',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: 'Bir doğrulama kapısı başarısız olduğunda ne olur?',
            answer:
              'Başarısız bir kapı öncelikle bir onarım sinyalidir: ajan, görevin kendi kapsamına düşen şeyi düzeltir ve kapıyı yeniden çalıştırır. Bu kapsamı aşan bir başarısızlık görevi engellenmiş olarak kaydeder ve ajan tamamlandığını iddia etmeden önce durur. Kanıtı inceleyebilir, kodu onarabilir veya görevi iyileştirebilir, ardından sürdürebilirsiniz; başarısız bir komut, kapıyı zayıflatma izni değil, uyuşmazlığı çözme sinyalidir.',
            linkLabel: 'Ajan protokolünü okuyun',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unverified',
            question:
              'Uyumluluk denetleyicisi kontrollerini çalıştıramadığında ne olur?',
            answer:
              'Bunu açıkça söyler. Denetleyici, 2 çıkış kodu ve açık bir `UNVERIFIED` kararıyla sonlanır — gerçekte doğrulamadığı bir geçiş raporu asla yazdırmaz. Ortamda yetenekli bir yorumlayıcı yoksa veya bir kontrol çalışamıyorsa, dürüst sonuç “uyumlu” değil “doğrulanmamış”tır; yeşil bir sonuç her zaman her kontrolün çalıştığı ve geçtiği anlamına gelir. Aynı disiplin metodolojinin tamamına yayılır: hiçbir akış, işi tamamlanmış ilan etmek için bir kapıyı zayıflatmaz veya sahteleştirmez.',
            linkLabel: 'Uyumluluk sözleşmesi',
            linkPath: '/spec/conformance',
          },
          {
            id: 'unattended-runs',
            question:
              'Bir plan gece boyunca veya CI içinde gözetimsiz çalışabilir mi?',
            answer:
              'Evet, plan önceden onaylanmışsa, gerekli durum katmanını taşıyorsa ve ajana sınırlı bir yetki veriyorsa. Gözetimsiz bir çalıştırma; gerçeklik saptığında, bir kapı planlanan onarım kapsamının dışında başarısız olduğunda veya yeni bir onay ya da kimlik bilgisi gerektiğinde durmalı ve bir engel kaydetmelidir.',
            linkLabel: 'Gözetimsiz protokolü okuyun',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Diğerleriyle karşılaştırma',
        items: [
          {
            id: 'multi-repo',
            question: 'Tek bir plan birden fazla repoya yayılabilir mi?',
            answer:
              'Evet — orkestratör hub arketipi tam olarak bunun için vardır. Bir hub repo koordine eden planı tutar ve her alt repo kendi planını kendi izole `.dwp/` çalışma alanında yürütür; böylece bir alt repo asla hub’ın plan durumuna yazmaz. Alt repoların tamamlanmışlığı her planın kendi en üst düzey durumundan okunur, içeride dizgi araması yapılmaz ve hub herhangi bir yere geçmeden önce nerede olduğunu kaydeder. Her alt repo, tek başına da pilotlanabilen sıradan bir DWP repo olarak kalır.',
            linkLabel: 'Repo arketipleri',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'vs-sdd-tools',
            question:
              'Spec Kit, OpenSpec veya Kiro gibi spec odaklı araçlardan nasıl farklıdır?',
            answer:
              'Bitişik sorunları çözerler. Spec odaklı araçlar neyin değişmesi gerektiğini yakalamada mükemmeldir: tekrarlanabilir biçimde spesifikasyonlar, gereksinimler ve değişiklik önerileri. Deep Work Plan, bir ajanın saatlerce sapmadan nasıl yürüteceğiyle ilgilidir: kuruluma alınmış harness, dokunulan yüzeyden seçilen görev başına doğrulama kapıları, diskte sürdürülebilir durum, güvenlik geçişiyle zorunlu Final Review ve reponun kendisi için bir uyumluluk denetleyicisi. İkisi birleştirilebilir; bir spec veya değişiklik önerisi bir plana beslenir. Karşılaştırma sayfası yetenekleri yan yana, her aracın kendi terimleriyle düzenler.',
            linkLabel: 'Karşılaştırmayı görün',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'BMAD, Superpowers, Get Shit Done veya Gentle-AI gibi ajan iş akışı araçlarından nasıl farklıdır?',
            answer:
              "BMAD, Superpowers ve Get Shit Done gibi ajan iş akışı çerçeveleri güçlü çalışma stilleri getirir: roller, ilkeler, test-first adımlar, doğrulama alışkanlıkları. Gentle-AI, bir ajan ekosistemi yapılandırıcısı olarak komşu bir kategoride yer alır: zaten kullandığınız kodlama ajanlarını oturumlar arasında kalıcı bellek (Engram), seçilmiş skill'ler, personalar, MCP sunucuları, isteğe bağlı Spec-Driven Development ve isteğe bağlı kanıta dayalı inceleme (Receipt-Driven Development) ile donatır ve her ajanın yapılandırma dizinlerine yazar. Deep Work Plan ikisinden de farklıdır: repoda ne kalır ve ne kontrol edilebilir olduğuna odaklanır — herhangi bir ajanın soğuk okuyabildiği bir harness, kabul kriterleri ve gate'lerle görev dosyaları, bir oturumu atlatan durum, CI dostu çıkış koduna sahip bir uyumluluk denetleyici ve her akışın kaç talimat baytı yüklediğinin yayımlanmış ölçümü. Yapı gereği araçtan bağımsızdır ve ana döngüye hizmet, sağlayıcı veya sır eklemez. Katmanlar bir arada durabilir: çerçeveler ve Gentle-AI ajanın nasıl çalıştığını şekillendirir; Deep Work Plan uzun işi repo içinde kalıcı ve doğrulanabilir kılar. Karşılaştırma sayfası her yaklaşımın nerede yerleşik, isteğe bağlı veya kapsam dışı olduğunu gösterir.",
            linkLabel: 'Karşılaştırmayı görün',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Neden yalnızca ajanımın yerleşik plan modunu kullanmıyorum?',
            answer:
              'Yerleşik plan modları kullanışlıdır ve Deep Work Plan aynı alt yapı üzerine kurulur: `AGENTS.md` kuralı ve açık Agent Skills standardı. Fark, planın nerede yaşadığı ve neyin onu zorladığıdır. Yerel planlar genellikle reponun dışında yaşar ve oturumla sona erer; Deep Work Plan planı, durumunu ve kanıtını repoya yazar; böylece başka bir ajan veya ekip arkadaşı devam edebilir ve her görev yürütülebilir bir kapı ve kayıtlı bir günlük taşır. Düşünmek için ajanınızın plan modunu kullanmaya devam edersiniz; metodoloji dayanıklı, doğrulanabilir yürütme döngüsünü ekler.',
            linkLabel: 'Karşılaştırmayı görün',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Benimseme',
        items: [
          {
            id: 'install',
            question:
              'Kuruluma alma repoma ne yazar ve mevcut dosyalara dokunur mu?',
            answer:
              'Kuruluma alma yıkıcı değildir: mevcut `AGENTS.md`, `docs/`, `.agents/` veya `CLAUDE.md` dosyasını algılar, üzerine yazmak yerine uzlaştırır ve bir şeyi değiştirmeden önce sorar. Gerçek komutlarla `AGENTS.md` dizini, akıl yürütülmüş bir `docs/` ağacı, modül başına docs, ince `dwp-*` komutlarıyla `.agents/` kiti, gitignore’lanmış bir `.dwp/` çıktı alanı, doğrulanmış bir test haritası ve zorunlu yerel kod incelemesi (AI Diff Reviewer skill’i artı repoya uyarlanmış inceleme eklentisi) yazar. Sonra ne üretildiğini görebilmeniz için self-check ve uyumluluk denetleyicisini çalıştırır. Daha önceki bir standartla kuruluma alınmış bir repo, yalnızca eksik veya güncel olmayan şeyleri uzlaştıran hedefli bir harness yükseltmesi alır.',
            linkLabel: 'Benimseme uç noktası',
            linkPath: '/init',
          },
          {
            id: 'upgrade',
            question:
              'Zaten kuruluma alınmış bir repoda skill’i nasıl yükseltirim?',
            answer:
              'Burada iki farklı yükseltme vardır ve akış onları ayrı tutar. Repo’nun harness’i — `AGENTS.md`, `docs/`, `.agents/` kiti — onboarding’i yeniden çalıştırarak uzlaştırılır; yalnızca eksik veya güncel olmayan kısımları doldurur. Skill’in kendisi `/dwp-upgrade` ile ilerler: son yayımlanmış sürümün salt okunur denetimi, kabul ettiğiniz etiketin doğrulanarak kurulması ve ardından onboarding’in taze bir geçiş olarak yeniden çalıştırılması. Akış boyunca her adım açık onaya bağlıdır, yerel uyarlamalar üzerine yazılmak yerine karşılaştırılır ve korunur, `.dwp/` asla göçürülmez — mevcut planlar kayıtlı biçimlerini korur ve çalışmaya devam eder.',
            linkLabel: 'Benimseme uç noktası',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              'Eklentileri kurmadan çekirdek metodolojiyi kullanabilir miyim?',
            answer:
              'Evet. Eklentiler isteğe bağlı katmanlardır ve hiçbirini içermeyen bir depo tamamen DWP uyumludur. Devcontainer’lar, Dailybot raporlaması, bağımlılık yükseltmeleri, tasarım sistemi desteği ve isteğe bağlı CI incelemesi yalnızca deponuza uyduğunda ve bunları açıkça kabul ettiğinizde sunulur.',
            linkLabel: 'Eklentilere göz atın',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question: 'Depomda henüz test veya lint yoksa ne olur?',
            answer:
              'DWP, bir araç zincirinin yokluğunu bir muafiyet olarak görmez. Kuruluma alma sırasında ajan, yığına uygun bir doğrulama kurulumu önerir, komutları depo dokümantasyonuna kaydeder ve bu komutları gelecekteki kapılar için hedef olarak kullanır; öneri incelemeniz için görünür kalır.',
            linkLabel: 'Ajan protokolünü okuyun',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: 'Maliyeti nedir ve verimlilik nasıl ölçülür?',
            answer:
              'Metodoloji ve skill MIT lisanslı ve ücretsizdir; core akışlarda hizmet, API anahtarı ve telemetri yoktur. Verimlilik, her akışın yüklediği talimat byte sayısı olarak raporlanır; skill ile commit edilen bir betikle ölçülür, her yayın temel çizgisinde yeniden ölçülür ve bir değerlendirme defterinde yayımlanır; artışlar azalışlar kadar açıkça raporlanır. Token yüzdeleri veya maliyet tasarrufu olarak raporlanmaz; çünkü byte envanteri bunları kanıtlamaz; sonuçları düzgün ölçmek için önceden kayıtlı bir kamu değerlendirmesi planlanmaktadır.',
            linkLabel: 'Güven ve açıklama',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Hâlâ bir sorunuz var mı?',
      body: 'GitHub’da bir tartışma veya issue açın. Tekrar tekrar gelen sorular bu sayfaya eklenir.',
      ctaLabel: 'GitHub’da sorun',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan alternatiflerle karşılaştırıldığında',
      description:
        'Deep Work Plan’in spec araçları, ajan çerçeveleri ve satıcı plan modlarıyla ilişkisi: kendi terimleriyle, kaynaklar ve inceleme tarihiyle.',
    },
    eyebrow: 'Karşılaştırma',
    title: 'Deep Work Plan ve alternatifler',
    intro:
      'Durumunuz için doğru katmanı seçin. Her alternatif kendi terimleriyle tanımlanır, her gerçek resmi belgelere izlenebilir ve sayfa en son ne zaman incelendiğini belirtir. Bu bir harita, sıralama değil.',
    howToRead: {
      title: 'Bu sayfa nasıl okunur',
      body: 'Her yetenek üç değerle tanımlanır. Bir yeteneğin bir araçta nerede olduğunu söylerler; aracın ne kadar iyi olduğunu değil.',
      values: {
        builtIn: 'Yerleşik',
        optional: 'İsteğe bağlı veya eklentiyle',
        notInScope: 'Kapsam dışı',
      },
    },
    reviewedOnLabel: 'Son incelenme',
    alternativesTitle: 'Alternatifler, kendi terimleriyle',
    officialSiteLabel: 'Resmi site',
    categories: {
      methodology: 'Metodoloji',
      sdd: 'Spec odaklı geliştirme araçları',
      agentFramework: 'Ajan iş akışı çerçeveleri',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: 'Satıcı yerel plan modları',
    },
    matrix: {
      title: 'Yetenek matrisi',
      caption:
        'Her yetenek araç başına nerede. Yerleşik, isteğe bağlı veya eklentiyle, veya kapsam dışı. Resmi belgelere karşı incelenmiştir.',
      capabilityColumn: 'Yetenek',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Herhangi bir kodlama ajanıyla çalışır',
        help: 'Aynı repo dosyaları Claude Code, Codex, Cursor, Gemini CLI ve diğerlerini yönlendirir.',
      },
      repoNativeHarness: {
        label: 'Ajan harness’ını repoya yazır',
        help: 'Talimatlar, docs, skill’ler ve komutlar repoda yaşar; tek bir aracın ayarlarında değil.',
      },
      taskAcceptanceCriteria: {
        label: 'Görev başına kabul kriterleri',
        help: 'Her görev, tamamlanmak için gözlemlenebilir koşulları belirtir.',
      },
      perTaskGates: {
        label: 'Görev başına doğrulama kapısı',
        help: 'Her görev, dokunduğu yüzeyden seçilen geçmesi gereken komutları adlandırır.',
      },
      resumableState: {
        label: 'Diskte sürdürülebilir durum',
        help: 'İlerleme oturum sıfırlamasını atlatır ve başka bir ajan veya ekip arkadaşı tarafından devralınabilir.',
      },
      finalReview: {
        label: 'Güvenlik geçişiyle zorunlu kapanış incelemesi',
        help: 'Plan, tam değişiklik kümesinin güvenlik incelemesi ve son durum doğrulaması olmadan tamamlanamaz.',
      },
      conformanceChecker: {
        label: 'Yürütülebilir uyumluluk denetleyicisi',
        help: 'Bir betik repoyu ve planlarını standarda karşı doğrular; CI-dostu çıkış koduyla.',
      },
      instructionBudgetLedger: {
        label: 'Yayımlanmış talimat yükü ölçümü',
        help: 'Her akışın yüklediği byte’lar commit edilmiş bir betikle ölçülür ve limitleriyle yayımlanır.',
      },
      onboardingScaffold: {
        label: 'Dokümantasyon iskelesi kuran kuruluma alma',
        help: 'İlk çalıştırma, reponun ajan yüzeyli dokümantasyonunu ve kitini yazır.',
      },
      brownfieldSpecs: {
        label: 'Mevcut sistemler için yaşayan spec’ler',
        help: 'Değişiklikler, sistemin büyüyen spesifikasyonuna birleşen delta’lar olarak belirtilir.',
      },
      crossProjectMemory: {
        label: 'Projeler arasında kalıcı ajan belleği',
        help: 'Bellek, yalnızca bir planın diskteki durumuyla sınırlı kalmadan, ajanı farklı depolar ve oturumlar arasında takip eder.',
      },
      roleBasedAgents: {
        label: 'Ayrı, uzmanlaşmış ajan rolleri',
        help: 'İsimlendirilmiş roller (analist, mimar veya inceleyen gibi) işi paylaştırır; tek bir ajan her adımı yürütmez.',
      },
      nativeIdeProduct: {
        label: 'Kendi IDE’si veya editörü olarak sunulur',
        help: 'Araç, mevcut bir kodlama ajanına eklenti olmak yerine, kendi başına eksiksiz bir geliştirme ortamıdır.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Skill olarak kurulur, repoyu bir ajan harness’ına kuruluma alır ve görev başına doğrulama kapıları, diskte durum ve zorunlu Final Review ile uzun soluklu planlar yürütür.',
        audience:
          'Herhangi bir kodlama ajanına çok oturumlu iş veren ve doğrulanmış biçimde bitmesini isteyen geliştiriciler ve ekipler.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Bir özelliği bir anayasa, bir spec, bir plan ve bir görev listesiyle yürütülebilir bir spesifikasyona dönüştürür; elliden fazla kodlama ajanıyla entegre slash komutlarıyla yönlendirilir ve uygulamaya başlamadan önce yapıtların birbiriyle tutarlı kalıp kalmadığını denetleyebilir.',
        audience:
          'Zaten kullandıkları ajanın içinde tekrarlanabilir specify, plan, tasks ve implement iş akışı isteyen ekipler.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Her değişikliği delta spec’lerle (eklenen, değiştirilen, kaldırılan) ve senaryolarla RFC 2119 gereksinimleri içeren bir öneri olarak yakalar, ardından bunları yaşayan spesifikasyonlara arşivler; bir değişiklik kabul edilmeden önce öneri eksiksizliğini ve senaryo kapsamını denetleyen bir doğrulayıcıyla.',
        audience:
          'Mevcut sistemlerde çalışan ve spesifikasyonların değişiklik değişiklik büyümesini isteyen ekipler.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Spec’leri EARS tarzı gereksinimlerden tasarıma ve görevlere taşıyan, düzenleyici olaylarında çalışan steering dosyaları ve hook’larla bir agentic IDE ve CLI; ayrıca mevcut bir kod tabanı için spec üreterek tasarım başlamadan önce gereksinim boşluklarını yakalayabilir.',
        audience:
          'Düzenleyicisine AWS destekli araçlarla spec odaklı geliştirme yerleşik isteyen geliştiriciler.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Brief, gereksinim, mimari belgeler ve story dosyaları üreten uzmanlaşmış ajan rollerinden (analiz, ürün, mimari, geliştirme, kalite) oluşan bir agile çerçeve; bir story’nin tamamlanmış sayılabilmesi için bir takım arkadaşı ya da bir yapay zekâ meslektaş inceleyicisi tarafından incelenmesini zorunlu kılan bir Definition of Done ile.',
        audience:
          'Rol tabanlı törenleri seven ve ajan işi için tam bir agile yaşam döngüsü isteyen ekipler.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Beyin fırtınası, küçük test-first adımlarla planlama, alt ajanlarla yürütme ve tamamlamadan önce inceleme için bir skill kütüphanesi ve iş akışı; buradaki diğer tüm alternatiflerden daha fazla kodlama ajanı barındırıcısıyla entegre, ayrıca her görevde iki aşamalı bir alt ajan incelemesiyle (önce spec uyumu, sonra kod kalitesi).',
        audience:
          'Kodlama ajanlarında disiplinli test odaklı yürütme isteyen geliştiriciler.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'Bir .planning dizini, gereksinim kimlikleri, faz planları, taze bağlam yürütmesi ve her planın özetinden çıkarılan, kullanıcının gözlemleyebileceği çıktılara karşı bir doğrulama geçişiyle bir planlama sistemi; araştırma, planlama ve yürütmeyi tek kullanımlık alt ajanlarda çalıştırarak “bağlam çürümesiyle” mücadele etmek ve içerik parmak izi denetimleriyle güncelliğini yitirmiş doğrulamaları yakalamak üzere özel olarak tasarlanmıştır.',
        audience:
          'Az törenle bağlam mühendisliği ve doğrulama isteyen solo geliştiriciler ve küçük ekipler.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'Zaten kullandığınız kodlama ajanlarını, oturumlar ve modeller arasında da yönlendirme yapan kalıcı bellek, derlenmiş skill’ler, MCP sunucuları, personalar ve isteğe bağlı Spec-Driven Development ya da Receipt-Driven Development ile yapılandırır. Yapılandırması varsayılan olarak global ajan ayarlarınıza yazılır; çalışma alanına özel bir kurulum isteğe bağlıdır (opt-in).',
        audience:
          'Oturumlar arasında işi hatırlayan ve talep üzerine kanıt üretebilen, yapılandırılmış bir ajan ekosistemi isteyen geliştiriciler.',
      },
      'claude-ai-native-sdlc': {
        name: 'Claude’un AI-native SDLC’si',
        whatItDoesWell:
          'Plan ve Design’dan Build, Test, Deploy ve Maintain’e uzanan altı aşamalı bir döngü; her aşamada zorunlu bir onay, aşamalar arasında depoya commit edilen kalıcı yapıtlar, deploy öncesi güvenlik etiketli özel bir inceleme geçişi ve teslimatın öncü ve gecikmeli göstergelerini yayımlayan sürekli değerlendirmelerle (evals).',
        audience:
          'Claude Code’un uçtan uca yazılım teslim playbook’unu ve üretim geri bildirim döngüsünü değerlendiren ekipler.',
      },
      'vendor-native': {
        name: 'Satıcı yerel plan modları',
        whatItDoesWell:
          'Claude Code, Codex, Cursor ve Gemini CLI, açık ve satıcılar arası AGENTS.md ve Agent Skills standartları üzerine kurulu plan modları, talimat dosyaları ve skill’ler sunabilir; ancak tam plan modu davranışı yine de satıcıya, istemciye ve sürüme bağlıdır. Özellikle Agent Skills, başlangıçta yalnızca kısa bir özeti yükler, tam talimatları ise yalnızca etkinleştirildiğinde yükleyerek kullanılmayan kapasiteyi bağlam dışında tutar.',
        audience:
          'Metodoloji benimsemek istemeyen, tek bir ajanın içinde planlama isteyen herkes.',
      },
    },
    aiNative: {
      title: 'Bunun AI-native SDLC içindeki yeri',
      body: 'Claude’un AI-native SDLC playbook’u tam bir döngü tanımlar: Plan, Design, Build, Test, Deploy ve Maintain. Her aşama bir sonraki aşamanın okuyacağı bir yapıtı commit eder; her aşamada bir insan onay kapısı ve deploy öncesi özel bir güvenlik incelemesi vardır; bu arada üretim geri bildirimi yeni bir intent’e dönüşür.',
      shared:
        'DWP, kalıcı yapıt ve kapılı onay fikirlerini paylaşır: intent bir plana dönüşür, görevler kanıt bırakır, tamamlanmadan önce bir güvenlik incelemesi çalışır ve depo bir sonraki ajan için okunabilir kalır.',
      boundary:
        'Gerçek fark, titizlikte değil kapsamdadır: playbook özel olarak Claude Code etrafında kuruludur; DWP’nin harness’ı ve plan biçimi ise AGENTS.md ve Agent Skills standartlarını izleyen herhangi bir ajan tarafından okunabilir. Playbook ayrıca DWP’nin iddia etmediği sürekli değerlendirme ve üretim operasyonlarını da kapsar; bu operasyonel pratikler DWP ile çalışan bir depoyla rekabet etmek yerine onu tamamlayabilir.',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'Karşılaştırmayı gör',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Deep Work Plan’in getirdikleri',
      items: [
        {
          title: 'Araçtan bağımsız ve repo-yerel',
          body: 'Harness ve plan repodaki dosyalardır; AGENTS.md ve Agent Skills standartlarını izleyen herhangi bir ajan okur. Ajan değiştirmek planı kaybettirmez.',
        },
        {
          title: 'Her görevin dokunduğu yüzeyden seçilen doğrulama',
          body: 'Her görev dokunduğu yüzeyi bildirir ve değişen davranışın testlerini ve tüketicilerini çalıştırır; etki sınırlandırılamadığında tam suite’e genişler. Sıfır seçili test asla geçiş değildir.',
        },
        {
          title: 'Güvenlik geçişiyle tek Final Review',
          body: 'Bir plan, birikmiş değişiklik kümesinin güvenlik incelemesiyle — zorunlu yerel diff incelemesi dahil — ve son durum doğrulamasıyla kapanır. Kritik bulgular tamamlamayı engeller.',
        },
        {
          title: 'Oturumları ve ajanları atlatan durum',
          body: 'README onay kutuları, görev günlükleri, sınırlı çalışma indeksi ve makine tarafından okunabilir durum dosyası her sınırda yazılır; böylece başka bir oturum veya ajan diskten devam eder. Yarıda kesilen plan oluşturma bile kurtarılabilir.',
        },
        {
          title: 'Reponun kendisi için uyumluluk denetleyicisi',
          body: 'Salt okunur bir betik harness’ı ve her planı spesifikasyona karşı doğrular, her iki plan yaşam döngüsünü anlar ve CI-dostu kodla çıkar.',
        },
        {
          title: 'Ölçülen ve yayımlanan talimat yükü',
          body: 'Commit edilmiş bir betik her akışın kaç byte yüklediğini ölçer; sonuçlar, artışlar dahil, byte olarak yayımlanır — asla token veya maliyet yüzdesi olarak değil.',
        },
      ],
    },
    honestLimits: {
      title: 'Dürüst sınırlar',
      body: 'Deep Work Plan’in yaşayan veya delta spec mekanizması yoktur; OpenSpec ve benzeri araçlar orada daha güçlüdür. Metodolojinin bağımsız bir kıyaslaması henüz yoktur; önceden kayıtlı bir kamu değerlendirmesi planlanmaktadır. Talimat yükü defteri yüklenen byte’ları ölçer; token, maliyet veya sonuçları değil. DWP kasıtlı olarak depoyla sınırlıdır: ne projeler arası bir bellek sistemi, ne rol tabanlı bir ajan çerçevesi, ne de bir IDE’dir; dolayısıyla bu eksenlerde de rekabet etmez — iş bunu gerektirdiğinde, o eksenlerden birini kapsayan bir araçla birlikte kullanın.',
    },
    correction: {
      title: 'Bu sayfanın doğruluğunu korumamıza yardım edin',
      body: 'Bu sayfa gösterilen tarihte incelenir ve talep üzerine düzeltilir. Aracınızın tanımı güncel değilse veya eksikse bir issue açın, düzeltiriz.',
      ctaLabel: 'Issue açın',
    },
    sourcesTitle: 'Kaynaklar',
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
