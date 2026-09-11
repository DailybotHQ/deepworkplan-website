/**
 * id translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const id: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — eksekusi terstruktur untuk AI coding agent',
  siteDescription:
    'Deep Work Plan: metodologi terbuka dan kit referensi untuk eksekusi AI agent multijam yang terstruktur, tervalidasi, dan dapat dilanjutkan.',

  // Navigation
  nav: {
    home: 'Beranda',
    about: 'Tentang',
    contact: 'Kontak',
    // Deep Work Plan IA
    methodology: 'Metodologi',
    spec: 'Spesifikasi',
    kit: 'Kit',
    examples: 'Contoh',
    init: 'Init',
    quickstart: 'Mulai Cepat',
    trust: 'Kepercayaan',
    developers: 'Pengembang',
    privacy: 'Privasi',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Perbandingan',
    changelog: 'Changelog',
    resources: 'Sumber daya',
    resourcesDesc: 'Contoh, kepercayaan, FAQ, dan perbandingan',
    repo: {
      label: 'Kode sumber',
      website: 'Repositori situs web',
      websiteDesc: 'Situs ini',
      skill: 'Repositori skill',
      skillDesc: 'Skill yang dapat dipasang',
    },
    menu: 'Buka menu',
    closeMenu: 'Tutup menu',
  },

  // Footer
  changelogPage: {
    meta: {
      title: 'Log Perubahan Deep Work Plan',
      description:
        'Pembaruan penting pada skill, metodologi, dan harness agen portabel Deep Work Plan.',
    },
    eyebrow: 'Log perubahan',
    title: 'Pekerjaan di balik metode',
    intro:
      'Linimasa berbasis sumber tentang rilis dan keputusan desain yang membuat Deep Work Plan andal untuk pekerjaan agen jangka panjang.',
    viewDetail: 'Baca pembaruan',
    backToIndex: 'Semua pembaruan',
    sourceLabel: 'Sumber',
    featuredLabel: 'Rilis unggulan',
    relatedTitle: 'Pembaruan terkait',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Hak cipta dilindungi.',
    poweredBy: 'Didukung oleh',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Baru · Efisien token',
    text: 'Deep Work Plan hadir di Product Hunt hari ini',
    tagline: 'beri agenmu sebuah rencana',
    linkText: 'Dukung kami',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navigasi Situs',
    sections: {
      methodology: 'Metodologi',
      getStarted: 'Mulai',
      project: 'Proyek',
      connect: 'Terhubung',
      learn: 'Pelajari',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — eksekusi terstruktur untuk AI coding agent',
      description:
        'Konteks lebih penting daripada model. Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur tempat coding agent menyelesaikan pekerjaan jangka panjang.',
    },
    hero: {
      badge: 'Metodologi terbuka · MIT · Agnostik terhadap agent',
      title: 'Model itu penting.',
      titleEmphasis: 'Konteks lebih penting.',
      subtitle:
        'Deep Work Plan mengubah repositori apa pun menjadi lingkungan terstruktur — konteks, pagar pengaman, dan rencana yang tahan lama — tempat agen coding mana pun mengeksekusi dengan presisi dan efisien serta menyelesaikan kerja jangka panjang.',
      instructionLabel: 'Salin ke agent Anda',
      instruction:
        'Salin prompt init.md dan tempelkan ke agent coding Anda — Claude Code, Cursor, Codex, atau lainnya — untuk menjadikan repositori apa pun AI-first.',
      copyLabel: 'Salin init.md',
      copiedLabel: 'Tersalin',
      viewInitCta: 'Lihat prompt /init lengkap',
      pullQuote:
        'Deep Work Plan adalah spec-driven development tempat repositori itu sendiri menjadi harness.',
      primaryCta: 'Baca metodologinya',
      secondaryCta: 'Baca spesifikasinya',
      illustrationAlt:
        'Sebuah mercusuar di pesisir berbatu memancarkan satu berkas cahaya yang memandu kapal kecil — ukiran yang menggambarkan repositori sebagai harness mantap yang memandu agent mana pun.',
      scrollCta: 'Lihat cara kerjanya',
    },
    pitch: {
      kicker: 'Masalah dan jawabannya',
      problem:
        'Dalam ledakan singkat, agen coding mengesankan. Serahkan misi jangka panjang — sebuah migrasi, subsistem baru, refaktor puluhan file — dan mereka menyimpang: konteks penuh, keputusan sebelumnya memudar, dan kerja berjam-jam mandek di tengah jalan.',
      answer:
        'Deep Work Plan menjawabnya dengan pengembangan berbasis spesifikasi: rencana yang tahan lama, tugas atomik, dan gerbang verifikasi yang harus dilalui agen. "Selesai" berhenti menjadi perasaan — menjadi bukti yang dapat diverifikasi dan ditinjau.',
      efficiency:
        'Dan karena konteks adalah sumber daya paling langka bagi agen Anda, harness dirancang untuk efisiensi token: instruksi dimuat progresif, verifikasi hanya menyentuh yang berubah, dan setiap tugas belajar secara lokal — kerja panjang tetap terjangkau.',
      illustrationAlt:
        'Diptych ukiran: satu sisi kapal yang hanyut di kabut dekat karang, sisi lain kapal yang sama menuju mercusuar pelabuhan di jalur yang tergambar.',
    },
    story: {
      act1: {
        kicker: 'Metode · Babak I',
        lead: 'Anda yang memutuskan arti selesai dan di mana batasnya. Rencana membawa niat Anda; agen yang menghabiskan waktu — tanpa pengawasan terus-menerus, tanpa koreksi setiap dua puluh menit.',
        deepLinkLabel: 'Baca metodologi',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Metode · Babak II',
        lead: 'Tugas panjang mengisi konteks model mana pun. Detail hilang dan agen menyimpang. Rencana tertulis — tugas atomik, gerbang verifikasi, status yang dapat dilanjutkan — adalah tempat kembali setiap putaran.',
        deepLinkLabel: 'Lihat loop inti',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Metode · Babak III',
        lead: 'Setiap tugas menyebutkan kriteria penerimaan dan pemeriksaan yang harus lulus. Agen tidak bisa merasa selesai — harus lulus, atau tugas tetap terbuka.',
        deepLinkLabel: 'Baca spesifikasi',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Metode · Babak IV',
        lead: 'Konteks, alat, pagar pengaman, dan status tinggal di repositori Anda sebagai berkas sederhana yang dapat dibaca agen mana pun. Tanpa lock-in, tanpa otak eksternal — bertahan melewati reset konteks.',
        deepLinkLabel: 'Lihat hasil onboarding',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Metode · Babak V',
        lead: 'Konteks adalah sumber daya paling langka bagi agen Anda. Harness memuat progresif, memvalidasi yang berubah, dan belajar per tugas — rencana membayar dirinya sendiri.',
        deepLinkLabel: 'Baca metodologi',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Onboarding berbasis penalaran',
      title:
        'Arahkan ke repositori mana pun. Ia bernalar — bukan menyalin-tempel.',
      subtitle:
        'Alur onboarding memeriksa bahasa, framework, package manager, dan perintah validasi yang sebenarnya ada di repositori Anda, lalu menghasilkan artefak yang disesuaikan dengan repositori tersebut. Hasil generik dianggap sebagai kegagalan.',
      steps: [
        {
          title: 'Bernalar tentang stack dan arketipe Anda',
          description:
            'Membaca manifes, tata letak folder, dan CI untuk menyimpulkan perintah test, lint, dan build yang sebenarnya, lalu mengklasifikasikan repositori sebagai repo individual atau orchestrator hub.',
        },
        {
          title: 'Menghasilkan AGENTS.md, docs/, dan dokumentasi per modul',
          description:
            'AGENTS.md yang dipikirkan matang, hierarki docs/ yang terkategori, serta README dan docs/ di dalam setiap modul utama — diisi dengan perintah nyata repositori Anda, bukan placeholder.',
        },
        {
          title:
            'Menyiapkan .agents/ dengan symlink .claude dan .cursor ke .agents',
          description:
            'Direktori .agents/ lintas agent (skills, agents, commands) dan symlink .claude dan .cursor ke .agents, sehingga setiap alat membaca satu sumber kebenaran.',
        },
        {
          title: 'Memasang skill DWP dan menyiapkan .dwp/',
          description:
            'Menyambungkan skill Deep Work Plan dan membuat folder .dwp/ yang di-gitignore untuk rencana dan draf, memasang review lokal AI Diff Reviewer yang wajib, lalu secara opsional menambahkan addon opt-in seperti dukungan devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Apa yang terjadi saat Anda menjalankannya',
      title: 'Satu instruksi. Repositori melakukan sisanya.',
      subtitle:
        'Anda tidak memilih metode pemasangan atau menyalin template. Anda menyerahkan satu baris kepada agent; ia memasang skill — mesin yang dapat dipakai ulang — dan menyesuaikan repositori Anda dengannya.',
      steps: [
        {
          title: 'Agent Anda membuka /init.md',
          description:
            'Ia membaca prompt onboarding di deepworkplan.com/init.md beserta metodologi, spesifikasi, dan kit yang ditautkannya — standar yang akan diadopsinya.',
        },
        {
          title: 'Ia memasang skill Deep Work Plan',
          description:
            'Skill adalah mesinnya — sama di setiap repositori. Satu perintah menarik router dan sub-skill-nya (create, execute, refine, resume, status, verify, onboard, author) untuk Claude Code, Cursor, Codex, Gemini, dan Copilot.',
        },
        {
          title: 'Ia menyesuaikan repositori Anda',
          description:
            'Dengan bernalar tentang stack nyata Anda — tidak pernah menyalin-tempel — ia menulis AGENTS.md, pohon docs/ yang terkategori, README per modul, kit .agents/ yang dipikirkan matang, dan .dwp/ yang di-gitignore. Repositori Anda menjadi harness.',
        },
        {
          title: 'Anda merencanakan dan mengeksekusi',
          description:
            'Hasilkan Deep Work Plan jangka panjang untuk tugas apa pun dan jalankan langkah demi langkah, dengan acceptance criteria yang eksplisit, validation gate, dan status yang dapat dilanjutkan — secara otonom, selama berjam-jam.',
        },
      ],
      note: 'Skill dipasang secara identik di mana saja; yang disesuaikan adalah repositori Anda — AGENTS.md, docs, dan kit .agents/ yang dipikirkan matang dan dihasilkan untuk stack Anda. Pemisahan itulah yang menjadikan metodologi sebagai standar yang dapat dipakai ulang, bukan perancah sekali pakai.',
    },
    outcomes: {
      badge: 'Apa yang Anda dapatkan',
      title: 'Semua yang dibutuhkan agent Anda untuk bekerja secara otonom.',
      subtitle:
        'Satu eksekusi, di-commit secara atomik. Setiap keluaran berupa Markdown dan setiap perubahan dapat diaudit.',
      items: [
        {
          label: 'AGENTS.md di akar repositori',
          detail:
            'Dipikirkan matang dari stack, perintah, dan struktur nyata repositori Anda — bukan template dengan placeholder. CLAUDE.md di-symlink ke AGENTS.md.',
        },
        {
          label: 'docs/ terkategori dan dokumentasi per modul',
          detail:
            'Arsitektur, penyiapan, standar, dan pemecahan masalah — ditambah README dan docs/ di dalam setiap modul utama, dihasilkan dari basis kode Anda.',
        },
        {
          label: '.agents/ dengan symlink .claude dan .cursor ke .agents',
          detail:
            'Direktori .agents/ lintas agent (skills, agents, commands) dengan symlink .claude dan .cursor ke .agents sehingga setiap alat membaca satu sumber kebenaran.',
        },
        {
          label: 'Skill Deep Work Plan, terpasang',
          detail:
            'create, execute, refine, resume, status, verify, onboard, dan author — tersedia untuk agent Anda sebagai satu paket skill, tanpa salinan per repositori.',
        },
        {
          label: 'Konformansi yang dapat Anda periksa',
          detail:
            '/dwp-verify menghasilkan laporan lulus/gagal yang objektif terhadap spesifikasi, sehingga "AI-first" diverifikasi, bukan sekadar diklaim — dan dapat diverifikasi ulang setelah setiap rencana.',
        },
        {
          label: 'Dua arketipe, tertangani',
          detail:
            'Onboarding mengklasifikasikan repositori Anda sebagai repo individual (kasus umum) atau orchestrator hub yang mengoordinasikan rencana turunan lintas repositori.',
        },
        {
          label: 'Kit hidup yang ditumbuhkan repositori Anda',
          detail:
            'Sub-skill author (skill-create, agent-create) memungkinkan repositori mengembangkan skill, agent, dan command-nya sendiri; addon perawatan opt-in seperti dependency-upgrade membantunya tetap mutakhir.',
        },
        {
          label: 'Git-native, dapat dilanjutkan, .dwp/',
          detail:
            'Tanpa daemon dan tanpa status eksternal. Rencana dan draf tersimpan di folder .dwp/ yang di-gitignore, dan tugas apa pun dapat dilanjutkan hanya dari git — bahkan setelah konteks meluap.',
        },
      ],
    },
    agents: {
      badge: 'Agent',
      title: 'Bekerja dengan agent yang sudah Anda pakai.',
      subtitle:
        'Satu metodologi, banyak adapter. Markdown tidak mengikat framework ke apa pun — setiap agent yang membaca Markdown dapat menjalankan Deep Work Plan.',
      fullLabel: 'Penuh',
      partialLabel: 'Sebagian',
      viewAllCta: 'Lihat semua agen',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implementasi referensi, dengan WebFetch native dan slash command.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Adapter penuh. Gunakan bundel offline jika WebFetch dibatasi.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Bundel offline disarankan; aturan dipasang di bawah .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Adapter penuh — command dwp-* berjalan melalui AGENTS.md dan prosedur #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Membutuhkan Gemini 2.5 Pro atau lebih baru, dengan WebFetch native.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Sumber terbuka. Membaca AGENTS.md secara native dan menjalankan dwp-* melalui command #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Aturan ditambah prosedur command # menjalankan loop Deep Work Plan secara penuh.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Sumber terbuka. Aturan Markdown dan command # menjalankan setiap langkah dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Adapter penuh dengan permukaan command native.',
        },
      ],
    },
    stacks: {
      badge: 'Stack',
      title: 'Preset penalaran untuk stack yang penting.',
      viewAllCta: 'Lihat semua preset',
      subtitle:
        'Ini adalah alat bantu penalaran, bukan template. Onboarding membaca manifes nyata repositori Anda dan menyesuaikan per stack — tidak pernah menyalin preset secara buta. Monorepo memperoleh dokumentasi per modul.',
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
        { name: 'Generik', sub: 'Stack apa pun' },
      ],
    },
    archetypes: {
      badge: 'Dua arketipe',
      title: 'Repositori individual, atau orchestrator hub.',
      subtitle:
        'Onboarding bercabang berdasarkan arketipe. Sebagian besar repositori adalah repo individual. Sebuah hub mengoordinasikan Deep Work Plan turunan lintas banyak repositori. Metodologi menangani keduanya sebagai warga kelas satu.',
      individual: {
        tag: 'Kasus umum',
        title: 'Repositori individual',
        description:
          'Satu basis kode dengan satu stack utama, perintah validasinya sendiri, dan dokumentasi per modul. Bawaan — onboarding mengasumsikannya kecuali repositori jelas merupakan sebuah hub.',
        example:
          'Misalnya, sebuah Django API, aplikasi Vue, atau layanan TypeScript Lambda.',
      },
      orchestrator: {
        tag: 'Koordinasi',
        title: 'Orchestrator hub',
        description:
          'Sebuah repositori koordinasi yang mengatur pekerjaan lintas sub-repositori melalui manifes orchestrator, memunculkan rencana turunan yang masing-masing di-commit di repositorinya sendiri, ditambah aturan batas dan indeks navigasi.',
        example:
          'Misalnya, sebuah hub yang mengoordinasikan lima repositori produk.',
      },
    },
    comparison: {
      badge: 'Metodologi versus alat',
      title: 'Lapisan yang berbeda. Saling melengkapi, bukan bersaing.',
      subtitle:
        'Deep Work Plan bukan scaffolder lain. Ia adalah lapisan metodologi di bawah alat spec-driven atau scaffolding mana pun, yang berfokus pada eksekusi otonom multijam.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Alat scaffolding / spec',
      rows: [
        {
          label: 'Fokus utama',
          dwp: 'Eksekusi otonom multijam',
          others: 'Pembuatan spec atau scaffold',
        },
        {
          label: 'Unit pekerjaan',
          dwp: 'Sebuah Deep Work Plan (sesi yang dapat dilanjutkan)',
          others: 'Sebuah dokumen spec atau scaffold',
        },
        {
          label: 'Model status',
          dwp: 'Folder .dwp/ git-native, dapat dilanjutkan',
          others: 'Sering eksternal atau di dalam IDE',
        },
        {
          label: 'Keterikatan agent',
          dwp: 'Agnostik terhadap agent (Markdown dan Bash)',
          others: 'Sering spesifik alat atau IDE',
        },
        {
          label: 'Pemulihan konteks',
          dwp: 'Melanjutkan setelah konteks meluap',
          others: 'Biasanya mengulang tugas dari awal',
        },
        {
          label: 'Lisensi',
          dwp: 'MIT, metodologi dan kit terbuka',
          others: 'Bervariasi',
        },
      ],
    },
    origin: {
      badge: 'Asal mula',
      quote:
        'Dibangun oleh Dailybot — perusahaan di balik standup asinkron untuk tim terdistribusi. Secara internal kami memakai Deep Work Plan untuk membuat repositori produksi yang mencakup Django, Vue, TypeScript Lambda, dan Astro dapat dikemudikan agent. Setelah berbulan-bulan penggunaan produksi, kami merilis metodologinya sebagai sumber terbuka di bawah lisensi MIT.',
      attribution: 'Tim teknik Dailybot',
      dailybotCta: 'Pelajari tentang Dailybot',
    },
    finalCta: {
      badge: 'Jadikan repositori Anda AI-first',
      title: 'Berikan deep work kepada agent Anda.',
      subtitle:
        'Serahkan satu baris kepada agent Anda — arahkan ke /init.md — dan ia menjadikan repositori Anda AI-first: memasang skill, bernalar tentang stack Anda, dan meng-commit hierarki AGENTS.md yang lengkap. Dari sana Anda membuat dan mengeksekusi Deep Work Plan yang berjalan otonom selama berjam-jam.',
      primaryCta: 'Buka prompt /init',
      secondaryCta: 'Baca metodologinya',
      tertiaryCta: 'Untuk agent & pengembang',
      meta: 'Berlisensi MIT · tanpa telemetri · keluaran ke folder .dwp/ yang di-gitignore.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Kontak',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    emailLabel: 'Email',
    emailPlaceholder: 'anda@email.com',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Tulis pesan Anda...',
    sendButton: 'Kirim pesan',
  },

  // About page
  aboutPage: {
    title: 'Tentang metodologi',
    subtitle: 'Metodologi terbuka · Berlisensi MIT',
    description:
      'Deep Work Plan adalah metodologi terbuka dan agnostik terhadap framework untuk pekerjaan teknik yang serius dengan AI coding agent. Dari mana asalnya dan siapa yang merawatnya.',
    heroDescription:
      'Struktur yang dapat diulang untuk merencanakan, mengeksekusi, dan memverifikasi deep work dengan AI coding agent — dibangun secara terbuka dan bebas dipakai.',
    bioTitle: 'Apa itu',
    bioText:
      'Deep Work Plan (DWP) adalah metodologi, bukan produk. Ia mendefinisikan cara mengubah sebuah tujuan menjadi rencana yang disepakati, memecah rencana itu menjadi tugas-tugas atomik yang dapat diverifikasi secara independen, dan menjalankan setiap tugas dalam loop yang fokus dan diakhiri dengan pemeriksaan.<br /><br />Ia sengaja dibuat agnostik terhadap AI agent atau stack yang Anda pakai — adapter menerjemahkan core loop yang sama ke Claude, Cursor, Copilot, Codex, Gemini, dan lainnya. Rencana, tugas, dan log eksekusi semuanya berupa Markdown polos, sehingga pekerjaan tetap dapat dibaca, ditinjau, dan dikendalikan versi.',
    passionsTitle: 'Prinsip inti',
    passions: [
      {
        title: 'Rencanakan sebelum eksekusi',
        description:
          'Tidak ada kode yang ditulis sebelum rencana disepakati. Rencana adalah kontrak antara Anda dan agent.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Tugas bersifat atomik',
        description:
          'Setiap tugas dibatasi agar dapat dieksekusi dan diverifikasi secara mandiri, lalu di-commit secara atomik.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verifikasi semuanya',
        description:
          'Setiap tugas diakhiri dengan pemeriksaan eksplisit sebelum tugas berikutnya dimulai, dengan kemajuan tercatat di git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Sekilas',
    quickFacts: [
      'Metodologi terbuka, berlisensi MIT',
      'Agnostik terhadap framework dan agent',
      'Dirawat oleh Dailybot dan komunitas',
      'Mencakup spesifikasi, command, adapter, preset, dan contoh',
      'Hanya Markdown — tanpa runtime, tanpa lock-in',
      'Mengubah repositori apa pun menjadi basis kode AI-first yang dapat dikemudikan agent',
    ],
    ctaTitle: 'Siapa yang merawatnya',
    ctaDescription:
      'Deep Work Plan tumbuh dari pekerjaan teknik nyata di Dailybot dan kini dirawat oleh Dailybot bersama komunitas sumber terbuka. Metodologi, spesifikasi, dan kit dirilis di bawah lisensi MIT — bebas dipakai, diadaptasi, dan dikembangkan.',
    ctaCv: 'Baca metodologinya',
    ctaContact: 'Mulai Cepat',
  },

  // Contact page
  contactPage: {
    title: 'Komunitas & kontak',
    subtitle: 'Sumber terbuka · Digerakkan komunitas',
    description:
      'Deep Work Plan dibangun secara terbuka. Temukan sumbernya, ajukan issue, atau ikut percakapan melalui kanal di bawah — kontribusi sangat dihargai.',
    heroDescription:
      'Pertanyaan, ide, atau perbaikan? Deep Work Plan dikembangkan secara publik — di sinilah Anda dapat menghubungi proyek dan para perawatnya.',
    formTitle: 'Kirim Pesan',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    emailLabel: 'Email',
    emailPlaceholder: 'anda@email.com',
    reasonLabel: 'Saya ingin menghubungi Anda tentang',
    reasonOptions: [
      { value: '', label: '— Pilih topik —' },
      { value: 'general', label: 'Umum / Sekadar menyapa' },
      { value: 'tech-talk', label: 'Tech talk / Undangan berbicara' },
      { value: 'collaboration', label: 'Kolaborasi / Kemitraan' },
      { value: 'project', label: 'Proyek / Tawaran kerja' },
      { value: 'dailybot', label: 'Pertanyaan tentang Dailybot' },
      { value: 'trading', label: 'Pertanyaan tentang trading saya' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Bergabung dengan The Library of Tomorrow',
      },
      { value: 'other', label: 'Lainnya' },
    ],
    subjectLabel: 'Subjek',
    subjectPlaceholder: 'Tentang apa ini?',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Tulis pesan Anda...',
    sendButton: 'Kirim Pesan',
    sendingButton: 'Mengirim...',
    successTitle: 'Pesan terkirim',
    successMessage:
      'Terima kasih telah menghubungi. Saya akan membalas secepat mungkin.',
    sendAnotherButton: 'Kirim pesan lain',
    requiredField: 'Bidang ini wajib diisi',
    invalidEmail: 'Masukkan alamat email yang valid',
    fallbackMessage:
      'Formulir kontak saat ini tidak tersedia. Anda dapat menghubungi saya langsung melalui email.',
    fallbackEmailText: 'Kirimkan saya email ke',
    formNote: 'Saya akan membalas secepat mungkin.',
    socialTitle: 'Terhubung Dengan Saya',
    locationTitle: 'Lokasi',
    locationText:
      'Berbasis di Kolombia. Terbuka untuk kolaborasi jarak jauh di seluruh dunia.',
    prefillSubjects: {
      generalInquiry: 'Pertanyaan Umum',
      collaboration: 'Peluang Kolaborasi',
      projectInquiry: 'Pertanyaan Proyek atau Kerja',
      projectCollaboration: 'Pertanyaan Kolaborasi Proyek',
      startupCollaboration: 'Peluang Kolaborasi Startup',
      techTalkInvitation: 'Undangan Berbicara Tech Talk',
      tradingQuestion: 'Pertanyaan Trading',
      dailybotQuestion: 'Pertanyaan Tentang Dailybot',
    },
  },

  contactSection: {
    title: 'Mari Terhubung',
    description:
      'Saya selalu terbuka untuk percakapan menarik, peluang kolaborasi, dan ide baru. Entah Anda ingin membahas teknologi, kewirausahaan, atau sekadar menyapa.',
    ctaText: 'Hubungi saya',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'id-ID',

  // 404 page
  notFoundPage: {
    title: 'Halaman Tidak Ditemukan',
    description:
      'Halaman yang Anda cari tidak ada atau telah dipindahkan. Jelajahi metodologinya atau kembali ke beranda untuk terus menelusuri.',
    heading: 'Halaman Tidak Ditemukan',
    message:
      'Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan. Coba kembali ke beranda atau jelajahi metodologinya.',
    backHome: 'Kembali ke beranda',
    exploreMethodology: 'Baca metodologinya',
    agentTitle: 'Untuk agent AI',
    agentIntro:
      'Path ini tidak ada. Link pemulihan di bawah (beserta padanan yang dapat dibaca mesin) mencantumkan setiap halaman di situs ini.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Metodologi Deep Work Plan',
      description:
        'Lima bab dari manifesto hingga arketipe: prinsip, core loop, template, skill dan agent, serta adaptasi di balik Deep Work Plan.',
    },
    eyebrow: 'Metodologi',
    title: 'Metodologi Deep Work Plan',
    intro:
      'Lima bab yang membawa Anda dari filosofi di balik Deep Work Plan ke loop praktis, template, dan adaptasi yang Anda pakai setiap hari.',
    chapterLabel: 'Bab',
    readChapter: 'Baca bab',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToIndex: 'Semua bab',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Spesifikasi Deep Work Plan',
      description:
        'Spesifikasi Deep Work Plan yang dapat dibaca: format DWP, protokol agent, arketipe, standar dokumentasi, dan addon. Acuan bersama manusia dan agent.',
    },
    eyebrow: 'Spesifikasi',
    title: 'Spesifikasi',
    intro:
      'Spesifikasi metodologi yang presisi dan mudah dibaca — struktur dan protokol yang dibagikan antara manusia dan agent.',
    tocTitle: 'Di halaman ini',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToIndex: 'Semua dokumen spesifikasi',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Kit Deep Work Plan',
      description:
        'Skill dan delapan sub-skill-nya, command, adapter, preset, addon opt-in, dan contoh yang membuat Deep Work Plan dapat dijalankan lintas agent dan stack.',
    },
    eyebrow: 'Kit',
    title: 'Kit',
    intro:
      'Semua yang Anda perlukan untuk menjalankan metodologi: skill dan sub-skill-nya, slash command, adapter agent, preset onboarding, review lokal yang wajib dan addon opt-in, serta contoh terkerjakan.',
    groups: {
      command: {
        title: 'Sub-skill & command',
        description:
          'Router skill dan sub-skill-nya (create, execute, refine, resume, status, verify, onboard, author), ditambah slash command tipis yang mendelegasikannya.',
      },
      adapter: {
        title: 'Adapter',
        description:
          'Integrasi per-agent yang tipis untuk Claude, Cursor, Codex, dan lainnya.',
      },
      preset: {
        title: 'Preset onboarding',
        description:
          'Panduan penalaran per-stack yang dipakai alur onboard untuk menyesuaikan docs, skill, dan perintah validasi dengan repositori Anda.',
      },
      example: {
        title: 'Contoh',
        description: 'Panduan langkah demi langkah, sebelum-dan-sesudah.',
      },
      addon: {
        title: 'Addon (opt-in)',
        description:
          'Kemampuan yang ditambahkan alur onboard ke sebuah repo: review lokal AI Diff Reviewer yang wajib ditambah empat addon opsional yang tidak pernah menjadi bagian dari baseline AI-first.',
      },
    },
    viewDetail: 'Lihat detail',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToIndex: 'Kembali ke kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Contoh Deep Work Plan',
      description:
        'Panduan sebelum-dan-sesudah yang menampilkan tugas teknik yang sama dengan dan tanpa Deep Work Plan — serta perbedaan keandalan dan peninjauannya.',
    },
    eyebrow: 'Contoh',
    title: 'Contoh',
    intro:
      'Lihat metodologinya bekerja — panduan konkret, sebelum-dan-sesudah, dari tugas teknik nyata.',
    viewExample: 'Baca panduannya',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    backToGallery: 'Semua contoh',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Mulai Cepat — Deep Work Plan',
      description:
        'Pasang skill, onboard repositori Anda, lalu rencanakan dan eksekusi dengan agent mana pun — langkah yang membuat repositori spec-driven dan dapat dikemudikan agent.',
    },
    eyebrow: 'Mulai Cepat',
    title: 'Mulai dalam hitungan menit',
    intro:
      'Pasang skill, onboard repositori Anda, lalu rencanakan dan eksekusi dengan agent mana pun — langkah yang membuat repositori spec-driven dan dapat dikemudikan agent.',
    sequenceTitle: 'Jalur adopsi',
    codeLabel: 'Terminal',
    orLabel: 'atau',
    steps: [
      {
        title: 'Pasang skill Deep Work Plan',
        description:
          'Tambahkan skill ke repositori Anda — sebuah router ditambah delapan sub-skill (create, execute, refine, resume, status, verify, onboard, author). Gunakan Skills CLI untuk jalur tercepat, atau klona repo dan jalankan setup di tempat git dan shell tersedia.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Onboard repositori',
        description:
          'Jalankan sub-skill onboard dan biarkan agent bernalar tentang repo Anda yang sebenarnya. Ia menghasilkan AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah .agents/ lintas agent (dengan symlink .claude → .agents dan .cursor → .agents), menyambungkan command dwp-* yang tipis, dan menyiapkan .dwp/ yang di-gitignore.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Kembangkan kit dan terima addon',
        description:
          'Gunakan /skill-create dan /agent-create (sub-skill author) untuk menumbuhkan skill, agent, dan command yang sesuai stack. Onboarding memasang review lokal AI Diff Reviewer yang wajib (gerbang CI-nya tetap opsional) dan menawarkan empat addon opt-in — devcontainer, Dailybot, dependency-upgrade, dan design-system — yang Anda terima hanya ketika cocok.',
      },
      {
        title: 'Rencanakan dan eksekusi',
        description:
          'Hasilkan Deep Work Plan dan jalankan tugas demi tugas, validasi setiap gate dan lanjutkan lintas sesi — mengemudikan repositori terhadap spec-nya sendiri.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Hasilnya',
    outcome:
      'Repositori Anda menjadi spec-driven dan dapat dikemudikan agent: rencana adalah sumber kebenaran yang tahan lama, dan repositori itu sendiri menjadi harness tempat agent mana pun bekerja.',
    nextStepsTitle: 'Langkah berikutnya',
    nextSteps: [
      { label: 'Baca metodologinya', href: '/methodology' },
      { label: 'Telusuri kit', href: '/kit' },
      { label: 'Lihat contoh', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Jadikan repositori Anda AI-first',
      description:
        'Adopsi metodologi Deep Work Plan di repositori mana pun. Pasang skill, jalankan onboarding agent, lalu rencanakan dan eksekusi dengan AI coding agent mana pun.',
    },
    eyebrow: 'Adopsi',
    title: 'Jadikan repositori ini AI-first',
    intro:
      'Satu endpoint untuk mengubah repositori apa pun menjadi basis kode spec-driven yang siap agent. Pasang skill, biarkan agent meng-onboard repo, lalu rencanakan dan eksekusi pekerjaan terstruktur dengan coding agent mana pun.',
    handoffTitle: 'Salin ke agent Anda',
    handoffBody:
      'Salin prompt init.md lengkap dan tempelkan ke AI coding agent Anda — Claude Code, Cursor, Codex, atau lainnya. Ia membaca metodologi dan spesifikasi, memasang skill, dan meng-onboard repositori ini untuk Deep Work Plan.',
    handoffInstruction:
      'Baca dan ikuti instruksi di https://deepworkplan.com/init.md untuk menjadikan repositori ini AI-first.',
    handoffMdLabel: 'Prompt agent mandiri',
    codeLabel: 'agent',
    whatTitle: 'Apa yang dilakukannya',
    whatBody: [
      'Adopsi mengubah repositori dengan dua cara yang tahan lama — kedua pilar metodologi.',
      'Pertama, repositori menjadi spec-driven: pekerjaan dimulai dari rencana dan spesifikasi tertulis, bukan dari prompt dadakan. Kedua, repositori itu sendiri menjadi agent harness — AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah skill .agents/ (dengan symlink .claude → .agents dan .cursor → .agents) memberi setiap agent konteks dan command yang dibutuhkannya.',
    ],
    sequenceTitle: 'Urutan adopsi',
    orLabel: 'atau',
    steps: [
      {
        title: 'Verifikasi sebelum memasang',
        description:
          'Perlakukan prompt dan skill sebagai tidak tepercaya sampai Anda telah memeriksanya. Keduanya bersumber terbuka dan berlisensi MIT; skill berbasis Markdown tanpa panggilan jaringan dan tanpa telemetri. Setiap rilis menerbitkan SHA256SUMS atas skill yang dikirimkan, sehingga Anda dapat mengonfirmasi salinan Anda cocok sebelum menjalankannya. Rilis ber-checksum, bukan bertanda tangan (penandatanganan adalah langkah berikutnya yang terdokumentasi).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Pasang skill',
        description:
          'Tambahkan skill Deep Work Plan agar agent mana pun dapat merencanakan dan mengeksekusi pekerjaan terstruktur. Skill ini membawa sebuah router ditambah delapan sub-skill — create, execute, refine, resume, status, verify, onboard, dan author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Jalankan onboarding repositori',
        description:
          'Panggil sub-skill onboard dan biarkan agent bernalar tentang repo yang sebenarnya — stack, package manager, dan perintah validasi nyatanya. Ia kemudian menghasilkan AGENTS.md, basis pengetahuan docs/, dokumentasi per modul, dan rumah .agents/ lintas agent (dengan symlink .claude → .agents dan .cursor → .agents), menyambungkan command dwp-* yang tipis, dan menyiapkan .dwp/ yang di-gitignore untuk rencana dan draf. Untuk repo besar, sub-skill onboard menggunakan jalur berbasis rencana: menyelesaikan rekognisi, lalu menghasilkan Deep Work Plan onboarding. Tidak ada yang ditemplatkan; semuanya disesuaikan dengan repositori Anda.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Review lokal dan addon opt-in',
        description:
          'Onboarding memasang review lokal AI Diff Reviewer yang wajib (gerbang CI-nya tetap opsional) dan menawarkan empat addon opt-in — devcontainer, Dailybot, dependency-upgrade, dan design-system — yang Anda terima hanya ketika cocok. Sebuah repo sepenuhnya konforman dengan nol addon opsional. Gunakan /skill-create dan /agent-create (sub-skill author) untuk menumbuhkan skill, agent, dan command yang sesuai stack di luar baseline.',
      },
      {
        title: 'Rencanakan dan eksekusi',
        description:
          'Hasilkan Deep Work Plan dengan /dwp-create dan jalankan dengan /dwp-execute, lalu /dwp-status, /dwp-refine, /dwp-resume, dan /dwp-verify seiring pekerjaan berjalan. Setiap rencana membawa tugas bernomor, validation gate, dan completion protocol — dan ditutup dengan tepat satu Final Review wajib (pemeriksaan keamanan, validasi status akhir, dan rekonsiliasi skills). Executive Report tetap tersedia atas permintaan.',
      },
      {
        title: 'Verifikasi kepatuhan',
        description:
          'Jalankan /dwp-verify untuk laporan lulus/gagal yang objektif terhadap spesifikasi. Konfirmasi bahwa AGENTS.md, docs/ (dengan konten nyata, bukan stub), .agents/ (dengan delegator dwp-* yang tipis dan katalog yang sesuai dengan disk), .dwp/, dan tmp/ sudah pada tempatnya — tidak ada yang ditemplatkan, semuanya dinalar untuk repo ini.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Hasilnya',
    outcome:
      'Repositori menjadi spec-driven dan repositori itu sendiri menjadi agent harness — konteks dan command ikut bersama kode.',
    nextStepsTitle: 'Baca selanjutnya',
    nextSteps: [
      { label: 'Mulai Cepat', href: '/quickstart' },
      { label: 'Metodologi', href: '/methodology' },
      { label: 'Spesifikasi', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  faqPage: {
    meta: {
      title: 'Pertanyaan yang sering diajukan — Deep Work Plan',
      description:
        'Jawaban atas pertanyaan seputar Deep Work Plan: apa yang dilakukannya, cara kerja gerbang dan pelanjutan, perbandingan dengan alat lain, dan cara adopsinya.',
    },
    eyebrow: 'FAQ',
    title: 'Pertanyaan yang sering diajukan',
    intro:
      'Jawaban singkat untuk hal yang paling sering ditanyakan tentang Deep Work Plan, masing-masing dengan tautan ke halaman yang membahas lebih dalam.',
    tocTitle: 'Di halaman ini',
    groups: [
      {
        id: 'what',
        title: 'Apa itu Deep Work Plan',
        items: [
          {
            id: 'what-is-it',
            question: 'Apa yang sebenarnya dilakukan Deep Work Plan?',
            answer:
              'Deep Work Plan mengubah sebuah repositori menjadi lingkungan terstruktur tempat coding agent dapat mengeksekusi pekerjaan panjang dengan andal. Ia terpasang sebagai skill agent, meng-onboard repositori satu kali (indeks `AGENTS.md`, pohon `docs/`, kit skill dan command `.agents/`, area keluaran `.dwp/` yang di-gitignore), dan setelah itu setiap tujuan menjadi rencana: tugas atomik, masing-masing dengan kriteria penerimaan dan gerbang verifikasi, dieksekusi satu per satu, di-commit saat lulus, dan dapat dilanjutkan dari disk oleh agent mana pun. Rencana ditutup dengan Final Review yang mengaudit keamanan dan memvalidasi status akhir. Metodologinya berlisensi MIT dan bekerja dengan coding agent mana pun yang membaca repositori.',
            linkLabel: 'Baca metodologinya',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Untuk siapa ini?',
            answer:
              'Pengembang dan tim yang menyerahkan pekerjaan nyata dan multilangkah kepada coding agent dan ingin pekerjaan itu selesai. Cocok ketika sebuah tugas melintasi lebih dari satu sesi, lebih dari satu kelompok file, atau lebih dari satu agent; ketika rekan tim harus bisa melanjutkan dari tempat agent berhenti; atau ketika "selesai" harus berarti "tervalidasi", bukan "kata agent begitu". Perbaikan satu baris tidak memerlukan rencana, dan metodologinya mengatakannya sendiri: aturan rigor proporsionalnya menyarankan tujuan, kriteria, dan gerbang inline sebagai gantinya.',
            linkLabel: 'Mulai Cepat',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: 'Apa bedanya rencana Lite dan rencana Full?',
            answer:
              'Pilihan representasi, bukan trade-off rigor. Setiap rencana dimulai sebagai folder Lite: README ringkas dengan catatan tugas berjangkar yang sudah dapat dieksekusi, bukan draf sebagian. `create` memperluas menjadi file tugas Full hanya ketika detail instruksi, dependensi, atau kontrak sebuah tugas tidak muat dalam catatan ringkas yang bisa ditinjau; permintaan eksplisit untuk salah satu format tetap dihormati, dan rencana Lite bisa dipromosikan ke Full kemudian tanpa kehilangan pekerjaan yang sudah selesai. Kedua format membawa kriteria penerimaan, gerbang verifikasi, bukti, dan Final Review wajib yang sama.',
            linkLabel: 'Baca metodologinya',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: 'Apakah ini tool, framework, atau metodologi?',
            answer:
              'Sebuah metodologi yang dikemas sebagai skill yang dapat dipasang. Tidak ada server, tidak ada akun, tidak ada format proprietary, dan tidak ada runtime selain coding agent yang sudah Anda pakai. Yang terpasang adalah instruksi yang dibaca agent, sejumlah kecil shell script untuk deteksi konteks dan pemeriksaan konformansi, serta konvensi yang diadopsi repositori Anda. Semua yang dihasilkan rencana berupa Markdown dan JSON di repositori Anda, dapat dibaca tanpa tool apa pun.',
            linkLabel: 'Baca spesifikasinya',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Dengan coding agent apa saja ia bekerja?',
            answer:
              'Agent mana pun yang membaca file repositori. Skill ini mengikuti standar Agent Skills terbuka dan konvensi `AGENTS.md`, sehingga Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, dan lainnya memuatnya melalui pemuatan skill dan instruksi normal mereka. Evaluasi milik metodologi ini sendiri menunjukkan sebuah rencana yang dimulai oleh agent dari satu vendor dan dilanjutkan oleh agent vendor lain, di kedua arah. Cakupan instalasi dan bukti perilaku didaftar per agent dalam matriks kompatibilitas, dan keduanya tidak pernah dicampuradukkan.',
            linkLabel: 'Telusuri kit',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: 'Bagaimana cara menggunakannya?',
            answer:
              'Tiga langkah. Pertama, pasang skill Deep Work Plan ke coding agent Anda — jalur tercepat adalah `npx skills add DailybotHQ/deepworkplan-skill` (atau clone repo skill dan jalankan `./setup.sh`). Kedua, onboard repositori sekali agar agent menyesuaikan `AGENTS.md`, `docs/`, kit `.agents/` dan area `.dwp/` yang di-gitignore dengan stack Anda: arahkan ke https://deepworkplan.com/init.md, atau jalankan `/deepworkplan-onboard`. Ketiga, rencanakan dan jalankan pekerjaan dengan command ringan: `/dwp-create <goal>` membangun rencana; `/dwp-execute` menjalankannya per tugas melawan setiap gerbang; `/dwp-refine` mengedit rencana yang sedang berjalan (cakupan, tugas, atau mempromosikan rencana Lite ke Full); `/dwp-resume` melanjutkan setelah gangguan; `/dwp-status` melaporkan progres tanpa mengeksekusi; `/dwp-verify` menghasilkan laporan kesesuaian objektif. Agent yang mengintercept `/` sering memakai `#` sebagai gantinya (misalnya `#dwp-execute`). Adoption endpoint dan Mulai Cepat menjelaskan jalur yang sama secara lebih rinci.',
            linkLabel: 'Mulai Cepat',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: 'Apa saja yang sebenarnya terpasang, dan di mana?',
            answer:
              'Skill agent terpasang di mana pun agent Anda memuat skill project atau user. Onboarding kemudian menyesuaikan repositori itu sendiri: ia membuat atau merekonsiliasi `AGENTS.md`, `docs/`, `.agents/`, dan area kerja `.dwp/` yang di-gitignore. Skill mengajari agent metodenya; repositori menyimpan konteks, kit, dan bukti rencana yang dibutuhkan agent lain untuk melanjutkan.',
            linkLabel: 'Lihat alur adopsinya',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Apakah Deep Work Plan memerlukan Git?',
            answer:
              'Git direkomendasikan untuk repositori karena riwayatnya menjadi bagian dari permukaan pemulihan dan tinjauan, tetapi metodologinya juga bisa berjalan di workspace agent tanpa repositori Git. Dalam kasus itu, lapisan status terbaca mesin, termasuk checkpoint `state.json` dan catatan gerbang, wajib ada agar pemulihan tidak bergantung pada transkrip chat.',
            linkLabel: 'Baca tentang arketipe repositori',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question: 'Apa bedanya skill, rencana, dan spesifikasi produk?',
            answer:
              'Sebuah skill mendeskripsikan cara agent menjalankan sebuah prosedur berulang. Rencana DWP mendeskripsikan perubahan konkret melalui cakupan, kriteria penerimaan, gerbang verifikasi, dan bukti. Spesifikasi produk mendeskripsikan perilaku produk saat ini dan berevolusi lewat delta setelah implementasi; skill dan rencana juga merupakan spesifikasi, tetapi keduanya mendeskripsikan prosedur dan perubahan, bukan merawat kontrak produk kanonis itu.',
            linkLabel: 'Baca spesifikasinya',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'Bagaimana sebuah rencana berjalan',
        items: [
          {
            id: 'gates',
            question:
              'Bagaimana gerbang verifikasi diimplementasikan? Apakah memerlukan persetujuan manusia?',
            answer:
              'Gerbang itu adalah asersi yang dapat dieksekusi dan dijalankan sendiri oleh agent. Persetujuan manusia mengapit jalannya rencana: seorang manusia menyetujui rencana sebelum eksekusi dan meninjau diff akhir saat pull request; eksekusi di antaranya berjalan otonom. Setiap tugas menyebutkan command konkret, biasanya gerbang kualitas milik repositori itu sendiri, yang dipilih dari permukaan yang disentuh tugas: test dari perilaku yang berubah beserta konsumennya, diperluas ke seluruh suite ketika perubahan bersifat shared atau tidak bisa dibatasi. Sebuah tugas ditandai selesai hanya ketika command itu keluar dengan sukses, dan tugas yang mengubah perilaku wajib memperluas test. Saat gagal, tugas ditandai terblokir dan agent berhenti.',
            linkLabel: 'Loop inti',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'Bagaimana rencana menghindari keusangan ketika orang mengubah kode di antara eksekusi?',
            answer:
              'Di tiga front. Tugas ditulis sebagai perilaku, bukan editan: sebuah kriteria penerimaan menyatakan apa yang harus dilakukan sistem, sehingga file yang diganti nama atau implementasi yang ditukar tidak membatalkannya. Setiap gerbang dijalankan ulang terhadap repositori apa adanya saat ini, sehingga asumsi yang rusak gagal keras pada eksekusi berikutnya alih-alih menyimpang diam-diam, dan kegagalan itulah isyarat untuk menyempurnakan. Menjaga dokumentasi tetap sinkron juga bagian dari pekerjaan: tugas yang mengubah perilaku turut memperbarui docs dan kit yang menghadap agent yang mendeskripsikannya, di dalam gerbangnya sendiri. Setiap eksekusi semestinya meninggalkan repositori lebih siap dihadapi agent daripada saat ia menemukannya.',
            linkLabel: 'Baca metodologinya',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Bisakah saya mengubah rencana di tengah eksekusi tanpa kehilangan pekerjaan yang sudah selesai?',
            answer:
              'Bisa; menyempurnakan rencana yang telah dieksekusi sebagian adalah langkah kelas satu. Definisi tugas dan status eksekusi disimpan terpisah: rencana berupa checklist di disk plus berkas status kecil, sehingga apa yang sudah selesai tetap tercatat terlepas dari teks tugasnya. Ketika sebuah tugas ternyata salah, agent menandainya terblokir dan berhenti alih-alih memaksakan jalan. Anda kemudian mengedit, mengurutkan ulang, memecah, atau menggugurkan tugas yang belum berjalan, sementara tugas yang selesai tetap selesai. Melanjutkan membangun ulang status dari disk dan repositori yang sebenarnya serta menjalankan ulang gerbang yang relevan, sehingga tidak ada pergeseran di bawah permukaan yang lolos begitu saja.',
            linkLabel: 'Loop inti',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Apakah ia terus memeriksa pekerjaan terhadap rencana, atau apakah rencana hanya urusan di awal?',
            answer:
              'Rencana adalah pemeriksaan berkelanjutan. Agent mengerjakan satu tugas kecil dalam satu waktu dan harus memvalidasi sebelum melanjutkan, sehingga ia bisa melenceng satu langkah, bukan tiga. Setiap tugas membawa kriteria penerimaan plus command persis yang membuktikannya, dan kemajuan ditulis ke repositori seiring berjalannya waktu, dengan status per tugas, sehingga penyimpangan menjadi terlihat oleh Anda, oleh sesi berikutnya, dan oleh agent berikutnya. Sebuah rencana belum selesai sampai semuanya tervalidasi, termasuk Final Review. Catatan yang jujur: metodologi tidak bisa menghentikan agent menulis kriteria penerimaan yang lemah sejak awal; ia menjadikan penyimpangan nyaring alih-alih senyap.',
            linkLabel: 'Loop inti',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Apakah rencana dibuat sekali lalu dirawat secara manual, atau apakah ia berevolusi bersama kode?',
            answer:
              'Bukan keduanya. Ia dibuat sekali dari sebuah tujuan, lalu dirawat sebagai bagian dari pekerjaan. Rencana sengaja tidak ditulis ulang dari diff kode, karena spesifikasi yang mengejar kode menjadi cermin yang tertinggal, dan penyimpangan itulah yang ingin dibasmi oleh metodologi ini. Ia berevolusi dengan sengaja: gerbang dijalankan ulang terhadap repositori saat ini, gerbang yang gagal memicu penyempurnaan, dan agent melakukan penyempurnaan itu selama eksekusi sementara Anda menyetujui di awal dan meninjau di akhir. Dokumentasi dan test berevolusi beriringan dengan kode sebagai akibat konstruksinya, karena memperbaruinya berada di dalam gerbang setiap tugas.',
            linkLabel: 'Baca metodologinya',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'Apa yang terjadi jika sesi mati di tengah jalan?',
            answer:
              'Kemajuan hidup di disk, bukan di chat. Centang README, log setiap tugas, indeks kerja yang terbatas, dan berkas status terbaca mesin diperbarui di setiap batas tugas, dan berkas status mencatat checkpoint sebelum setiap jeda yang direncanakan. Sesi baru, atau agent yang berbeda, membaca indeks ringkas itu, merekonsiliasikannya dengan repositori dan riwayat git, lalu melanjutkan dari tugas pertama yang belum selesai tanpa mengulang pekerjaan yang sudah beres. Bahkan pembuatan rencana yang terputus bisa dipulihkan: identitas rencana dan daftar tugas yang dimaksud ditulis sebelum file tugas mana pun, sehingga rencana yang setengah jadi bisa diselesaikan atau dibuang alih-alih ditebak-nebak.',
            linkLabel: 'Loop inti',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Apa itu Final Review?',
            answer:
              'Satu-satunya tugas penutup wajib dari setiap rencana. Secara berurutan: pemeriksaan keamanan atas seluruh kumpulan perubahan yang terkumpul dalam rencana, termasuk tinjauan lokal atas diff yang diwajibkan oleh skill AI Diff Reviewer, dengan temuan kritis memblokir penyelesaian sampai diperbaiki atau diterima secara eksplisit; validasi status akhir, artinya seluruh suite test, lint, type-check, dan format yang berlaku milik repositori pada kode akhir; dan rekonsiliasi keputusan skills yang dicatat setiap tugas. Agent kemudian melaporkan deliverable, bukti, dan keterbatasan, lalu menawarkan Executive Report satu kali, menghasilkannya hanya jika Anda meminta.',
            linkLabel: 'Spesifikasinya',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question:
              'Apa yang terjadi ketika sebuah gerbang verifikasi gagal?',
            answer:
              'Tugas dicatat sebagai terblokir dan agent berhenti sebelum mengklaim selesai. Anda bisa memeriksa buktinya, memperbaiki kode, atau menyempurnakan tugasnya, lalu melanjutkan; command yang gagal adalah isyarat untuk menyelesaikan ketidaksesuaian, bukan izin untuk melemahkan gerbangnya.',
            linkLabel: 'Baca protokol agent',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question:
              'Bisakah sebuah rencana berjalan tanpa pengawasan semalaman atau di CI?',
            answer:
              'Bisa, ketika rencana sudah disetujui sebelumnya, membawa lapisan status yang diwajibkan, dan memberi agent otoritas terbatas. Eksekusi tanpa pengawasan wajib berhenti dan mencatat blocker ketika kenyataan menyimpang, sebuah gerbang gagal di luar cakupan perbaikan yang direncanakan, atau dibutuhkan persetujuan atau kredensial baru.',
            linkLabel: 'Baca protokol tanpa pengawasan',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Perbandingannya dengan alat lain',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'Apa bedanya dengan tool spec-driven seperti Spec Kit, OpenSpec, atau Kiro?',
            answer:
              'Keduanya memecahkan masalah yang berdampingan. Tool spec-driven unggul dalam menangkap apa yang harus berubah: spesifikasi, kebutuhan, dan proposal perubahan dalam bentuk yang dapat diulang. Deep Work Plan soal bagaimana sebuah agent mengeksekusi berjam-jam tanpa menyimpang: harness hasil onboarding, gerbang verifikasi per tugas yang dipilih dari permukaan yang disentuh, status yang dapat dilanjutkan di disk, Final Review wajib dengan pemeriksaan keamanan, dan pemeriksa konformansi untuk repositorinya sendiri. Keduanya bisa digabungkan, dengan spesifikasi atau proposal perubahan yang menjadi masukan sebuah rencana. Halaman perbandingan menyandingkan kapabilitasnya berdampingan, menurut istilah masing-masing tool.',
            linkLabel: 'Lihat perbandingannya',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'Apa bedanya dengan perangkat alur kerja agent seperti BMAD, Superpowers, Get Shit Done, atau Gentle-AI?',
            answer:
              'Framework-framework itu membawa gaya kerja yang kuat: peran, prinsip, langkah test-first, dan kebiasaan verifikasi. Deep Work Plan berbeda dari keduanya dan berfokus pada apa yang tinggal di repositori dan apa yang bisa diperiksa: harness yang bisa dibaca agent mana pun dari nol, file tugas dengan kriteria penerimaan dan gerbang, status yang bertahan dari sesi, pemeriksa konformansi dengan exit code yang ramah CI, dan pengukuran terpublikasi atas berapa byte instruksi yang dimuat setiap alur. Ia agnostik terhadap tool menurut konstruksinya dan tidak menambahkan service, provider, atau secret ke core loop. Halaman perbandingan menunjukkan di mana setiap pendekatan bersifat bawaan, opsional, atau di luar cakupan. Gentle-AI mengonfigurasi coding agent yang sudah Anda pakai: memori persisten antar sesi (Engram), skill terkurasi, persona, server MCP, Spec-Driven Development opsional, dan tinjauan berbasis bukti opsional (Receipt-Driven Development). Ia menulis ke direktori konfigurasi setiap agent dan bisa menyimpan artefak perencanaan di Engram, di file OpenSpec, atau keduanya. Deep Work Plan terpasang ke repositori itu sendiri — harness yang bisa dibaca agent mana pun dari nol, file tugas dengan kriteria penerimaan dan gerbang, status on-disk yang bisa dilanjutkan, pemeriksa konformansi dengan exit code yang ramah CI, dan buku besar byte instruksi terpublikasi — tanpa menambahkan service, provider, atau secret ke core loop. Kedua lapisan bisa berdampingan: Gentle-AI melengkapi agent; Deep Work Plan membuat pekerjaan panjang tangguh dan dapat diperiksa di dalam repo.',
            linkLabel: 'Lihat perbandingannya',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Mengapa tidak sekadar memakai mode rencana bawaan agent saya?',
            answer:
              'Mode rencana bawaan berguna, dan Deep Work Plan membangun di atas substrat yang sama, konvensi `AGENTS.md` dan standar Agent Skills terbuka. Bedanya ada pada tempat rencana hidup dan apa yang menegakkannya. Rencana native biasanya hidup di luar repositori dan kedaluwarsa bersama sesi; Deep Work Plan menulis rencana, statusnya, dan buktinya ke dalam repositori, sehingga agent lain atau rekan tim bisa melanjutkannya, dan setiap tugas membawa gerbang yang dapat dieksekusi serta log yang tercatat. Anda tetap memakai mode rencana agent Anda untuk berpikir; metodologinya menambahkan loop eksekusi yang tahan lama dan dapat diverifikasi.',
            linkLabel: 'Lihat perbandingannya',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Mengadopsinya',
        items: [
          {
            id: 'install',
            question:
              'Apa yang ditulis onboarding ke repositori saya, dan apakah ia menyentuh file yang sudah ada?',
            answer:
              'Onboarding bersifat non-destruktif: ia mendeteksi `AGENTS.md`, `docs/`, `.agents/`, atau `CLAUDE.md` yang sudah ada, merekonsiliasi alih-alih menimpa, dan bertanya sebelum mengganti apa pun. Ia menulis indeks `AGENTS.md` dengan command nyata, pohon `docs/` yang beralasan, dokumentasi per modul, kit `.agents/` dengan command `dwp-*` yang tipis, area keluaran `.dwp/` yang di-gitignore, peta pengujian yang terverifikasi, dan tinjauan kode lokal yang diwajibkan (skill AI Diff Reviewer plus ekstensi review yang disesuaikan repo). Ia kemudian menjalankan self-check dan pemeriksa konformansi agar Anda bisa melihat apa yang dihasilkan. Repositori yang di-onboard di bawah versi sebelumnya mendapat upgrade tertarget yang hanya mengubah apa yang kurang.',
            linkLabel: 'Endpoint adopsi',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              'Bisakah saya memakai metodologi inti tanpa memasang add-on?',
            answer:
              'Bisa. Add-on adalah lapisan opt-in, dan repositori tanpa add-on apa pun tetap sepenuhnya konform DWP. Devcontainer, pelaporan Dailybot, upgrade dependensi, dukungan design-system, dan tinjauan CI opsional hanya ditawarkan ketika cocok dengan repositori Anda dan Anda menerimanya secara eksplisit.',
            linkLabel: 'Telusuri add-on',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question:
              'Bagaimana jika repositori saya belum punya test atau linting?',
            answer:
              'DWP tidak memperlakukan absennya toolchain sebagai jalan bebas. Selama onboarding, agent mengusulkan setup validasi yang sesuai dengan stack, mencatat command tersebut di dokumentasi repositori, dan memakai command itu sebagai target gerbang di masa depan; usulan itu tetap terlihat agar Anda bisa meninjaunya.',
            linkLabel: 'Baca protokol agent',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: 'Berapa biayanya, dan bagaimana efisiensi diukur?',
            answer:
              'Metodologi dan skill-nya berlisensi MIT dan gratis; tidak ada service, tidak ada kunci API, dan tidak ada telemetri di alur inti. Efisiensi dilaporkan sebagai jumlah byte instruksi yang dimuat setiap alur, diukur oleh script yang di-commit bersama skill dan dipublikasikan dalam ledger evaluasi, dengan kenaikan dilaporkan sejujur penurunannya. Efisiensi tidak dilaporkan sebagai persentase token atau penghematan biaya, karena inventarisasi byte tidak menetapkan hal itu; evaluasi publik yang praregistrasi direncanakan untuk mengukur hasilnya secara semestinya.',
            linkLabel: 'Kepercayaan dan pengungkapan',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Masih punya pertanyaan?',
      body: 'Buka diskusi atau issue di GitHub. Pertanyaan yang muncul berulang kali ditambahkan ke halaman ini.',
      ctaLabel: 'Tanya di GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan dibandingkan dengan alternatifnya',
      description:
        'Relasi Deep Work Plan dengan tool spec-driven, framework agent, dan mode rencana vendor: masing-masing menurut istilahnya, dengan sumber dan tanggal tinjauan.',
    },
    eyebrow: 'Perbandingan',
    title: 'Deep Work Plan dan alternatifnya',
    intro:
      'Pilih lapisan yang tepat untuk situasi Anda. Setiap alternatif dideskripsikan menurut istilahnya sendiri, setiap fakta merunut ke dokumentasi resminya, dan halaman ini mencantumkan kapan terakhir ia ditinjau. Ini adalah peta, bukan peringkat.',
    howToRead: {
      title: 'Cara membaca halaman ini',
      body: 'Tiga nilai mendeskripsikan setiap kapabilitas. Nilai itu menyatakan di mana sebuah kapabilitas berada di dalam sebuah tool, bukan seberapa bagus tool-nya.',
      values: {
        builtIn: 'Bawaan',
        optional: 'Opsional atau melalui ekstensi',
        notInScope: 'Di luar cakupan',
      },
    },
    reviewedOnLabel: 'Terakhir ditinjau',
    alternativesTitle: 'Alternatifnya, menurut istilah masing-masing',
    officialSiteLabel: 'Situs resmi',
    categories: {
      methodology: 'Metodologi',
      sdd: 'Tool spec-driven',
      agentFramework: 'Framework alur kerja agent',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: 'Mode rencana bawaan vendor',
    },
    matrix: {
      title: 'Matriks kapabilitas',
      caption:
        'Di mana setiap kapabilitas berada, per tool. Bawaan, opsional atau melalui ekstensi, atau di luar cakupan. Ditinjau terhadap dokumentasi resmi.',
      capabilityColumn: 'Kapabilitas',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Bekerja dengan coding agent mana pun',
        help: 'File repositori yang sama menggerakkan Claude Code, Codex, Cursor, Gemini CLI, dan lainnya.',
      },
      repoNativeHarness: {
        label: 'Menulis harness agent ke dalam repositori',
        help: 'Instruksi, docs, skill, dan command hidup di repositori, bukan di pengaturan satu tool.',
      },
      taskAcceptanceCriteria: {
        label: 'Kriteria penerimaan per tugas',
        help: 'Setiap tugas menyatakan kondisi yang teramati untuk dianggap selesai.',
      },
      perTaskGates: {
        label: 'Gerbang verifikasi per tugas',
        help: 'Setiap tugas menyebutkan command yang harus lulus, dipilih dari apa yang disentuhnya.',
      },
      resumableState: {
        label: 'Status yang dapat dilanjutkan di disk',
        help: 'Kemajuan bertahan dari reset sesi dan dapat diambil oleh agent lain atau rekan tim.',
      },
      finalReview: {
        label: 'Tinjauan penutup wajib dengan pemeriksaan keamanan',
        help: 'Rencana tidak dapat selesai tanpa tinjauan keamanan atas seluruh kumpulan perubahan dan validasi status akhir.',
      },
      conformanceChecker: {
        label: 'Pemeriksa konformansi yang dapat dieksekusi',
        help: 'Sebuah script memverifikasi repositori dan rencananya terhadap standar, dengan exit code yang ramah CI.',
      },
      instructionBudgetLedger: {
        label: 'Pengukuran beban instruksi yang dipublikasikan',
        help: 'Byte yang dimuat setiap alur diukur oleh script yang di-commit dan dipublikasikan beserta batasnya.',
      },
      onboardingScaffold: {
        label: 'Onboarding yang menyusun kerangka dokumentasi',
        help: 'Eksekusi pertama menulis dokumentasi yang menghadap agent dan kit milik repositori.',
      },
      brownfieldSpecs: {
        label: 'Spesifikasi hidup untuk sistem yang sudah ada',
        help: 'Perubahan dispesifikasikan sebagai delta yang menyatu ke dalam spesifikasi sistem yang terus bertumbuh.',
      },
      crossProjectMemory: {
        label: 'Memori agen yang persisten lintas proyek',
        help: 'Memori mengikuti agen di berbagai repositori dan sesi, bukan hanya status satu rencana yang tersimpan di disk.',
      },
      roleBasedAgents: {
        label: 'Peran agen khusus yang berbeda-beda',
        help: 'Persona bernama (seperti analis, arsitek, atau peninjau) membagi pekerjaan, alih-alih satu agen menjalankan semua langkah.',
      },
      nativeIdeProduct: {
        label: 'Hadir sebagai IDE atau editornya sendiri',
        help: 'Alat ini merupakan lingkungan pengembangan terintegrasi tersendiri, bukan tambahan untuk agen coding yang sudah ada.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Terpasang sebagai skill, meng-onboard repositori menjadi agent harness, dan menjalankan rencana jangka panjang dengan gerbang verifikasi per tugas, status di disk, serta Final Review yang wajib.',
        audience:
          'Pengembang dan tim yang menyerahkan pekerjaan multisesi kepada coding agent mana pun dan membutuhkannya selesai dalam keadaan terverifikasi.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Mengubah sebuah fitur menjadi spesifikasi yang dapat dieksekusi melalui konstitusi, spesifikasi, rencana, dan daftar tugas, digerakkan oleh slash command yang berintegrasi dengan lebih dari lima puluh coding agent, dan dapat memeriksa agar semua artefak tetap konsisten satu sama lain sebelum implementasi dimulai.',
        audience:
          'Tim yang menginginkan alur specify, plan, tasks, dan implement yang dapat diulang di dalam agent yang sudah mereka pakai.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Menangkap setiap perubahan sebagai proposal dengan spesifikasi delta (ditambahkan, diubah, dihapus) dan kebutuhan RFC 2119 beserta skenarionya, lalu mengarsipkannya menjadi spesifikasi hidup, dengan validator yang memeriksa kelengkapan proposal dan cakupan skenario sebelum sebuah perubahan diterima.',
        audience:
          'Tim yang bekerja pada sistem yang sudah ada dan ingin spesifikasinya bertumbuh satu perubahan dalam satu waktu.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'IDE dan CLI agentic yang spesifikasinya bergerak dari kebutuhan bergaya EARS ke desain lalu ke tugas, dengan file steering dan hook yang berjalan pada event editor, serta dapat menghasilkan spesifikasi untuk basis kode yang sudah ada guna menangkap celah kebutuhan sebelum desain dimulai.',
        audience:
          'Pengembang yang menginginkan pengembangan spec-driven di dalam editor mereka, dengan tooling yang ditopang AWS.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Framework agile berisi peran agent yang terspesialisasi (analisis, produk, arsitektur, pengembangan, kualitas) yang menghasilkan brief, kebutuhan, dokumen arsitektur, dan file story, dengan Definition of Done yang mewajibkan setiap story ditinjau oleh rekan tim atau peninjau sejawat AI sebelum dianggap selesai.',
        audience:
          'Tim yang menyukai seremoni berbasis peran dan menginginkan siklus hidup agile penuh untuk pekerjaan agent.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Pustaka skill dan alur kerja untuk brainstorming, perencanaan dalam langkah test-first kecil, eksekusi dengan subagent, dan peninjauan sebelum selesai, terintegrasi dengan lebih banyak host coding agent dibanding alternatif lain di sini, ditambah peninjauan subagent dua tahap (kesesuaian spec, lalu kualitas kode) pada setiap tugas.',
        audience:
          'Pengembang yang menginginkan eksekusi test-driven yang disiplin di dalam coding agent mereka.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'Sistem perencanaan dengan direktori .planning, id kebutuhan, rencana fase, eksekusi konteks segar, dan pemeriksaan verifikasi terhadap deliverable yang dapat diamati pengguna yang diekstrak dari ringkasan tiap rencana, dirancang khusus untuk melawan “context rot” dengan menjalankan riset, perencanaan, dan eksekusi dalam subagent sekali pakai serta menangkap verifikasi yang basi lewat pemeriksaan sidik jari konten.',
        audience:
          'Pengembang solo dan tim kecil yang menginginkan context engineering dan verifikasi dengan sedikit seremoni.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'Mengonfigurasi coding agent yang sudah Anda pakai dengan memori persisten yang juga merutekan lintas sesi dan model, skill terkurasi, server MCP, persona, dan opsi Spec-Driven Development atau Receipt-Driven Development. Konfigurasinya secara default ditulis ke pengaturan agent global Anda; pemasangan dengan cakupan workspace bersifat opt-in.',
        audience:
          'Pengembang yang menginginkan ekosistem agent yang sudah dikonfigurasi, mengingat pekerjaan lintas sesi, dan dapat menghasilkan bukti sesuai permintaan.',
      },
      'claude-ai-native-sdlc': {
        name: 'AI-native SDLC dari Claude',
        whatItDoesWell:
          'Loop enam tahap dari Plan dan Design melalui Build, Test, Deploy, dan Maintain, dengan persetujuan manusia yang diwajibkan di setiap tahap, artefak tahan lama yang di-commit ke repositori di antara tahap, satu putaran peninjauan berlabel keamanan khusus sebelum deploy, dan evaluasi berkelanjutan yang mempublikasikan indikator pengiriman leading dan lagging.',
        audience:
          'Tim yang mengevaluasi playbook pengiriman perangkat lunak ujung-ke-ujung dari Claude Code dan siklus umpan balik produksinya.',
      },
      'vendor-native': {
        name: 'Mode rencana bawaan vendor',
        whatItDoesWell:
          'Claude Code, Codex, Cursor, dan Gemini CLI dapat menghadirkan mode rencana, file instruksi, dan skill yang dibangun di atas standar AGENTS.md dan Agent Skills yang terbuka dan lintas vendor, meskipun perilaku mode rencana yang persis tetap bergantung pada vendor, klien, dan versinya. Agent Skills khususnya hanya memuat ringkasan singkat saat startup dan memuat instruksi lengkap hanya saat diaktifkan, sehingga kapasitas yang tidak dipakai tidak membebani konteks.',
        audience:
          'Siapa pun yang menginginkan perencanaan di dalam satu agent tanpa harus mengadopsi sebuah metodologi.',
      },
    },
    aiNative: {
      title: 'Posisi ini dalam AI-native SDLC',
      body: 'Playbook AI-native SDLC dari Claude menjelaskan satu loop penuh: Plan, Design, Build, Test, Deploy, dan Maintain. Setiap tahap meng-commit artefak yang dibaca tahap berikutnya, dengan gerbang persetujuan manusia di setiap tahap dan satu putaran peninjauan keamanan khusus sebelum deploy, sementara umpan balik dari produksi menjadi intent baru.',
      shared:
        'DWP berbagi gagasan artefak tahan lama dan persetujuan bergerbang: intent menjadi rencana, tugas meninggalkan bukti, satu putaran peninjauan keamanan berjalan sebelum selesai, dan repositori tetap dapat dibaca oleh agent berikutnya.',
      boundary:
        'Perbedaan sesungguhnya ada pada cakupan, bukan pada ketatnya proses: playbook ini dibangun khusus di sekitar Claude Code, sementara harness dan format rencana DWP dapat dibaca oleh agent mana pun yang mengikuti standar AGENTS.md dan Agent Skills. Playbook ini juga mencakup evaluasi berkelanjutan dan operasi produksi yang tidak diklaim oleh DWP; praktik operasional tersebut dapat melengkapi repositori yang dijalankan dengan DWP, bukan bersaing dengannya.',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'Lihat perbandingan',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Apa yang dibawa Deep Work Plan',
      items: [
        {
          title: 'Agnostik tool dan native repositori',
          body: 'Harness dan rencananya adalah file di repositori Anda, dibaca oleh agent mana pun yang mengikuti standar AGENTS.md dan Agent Skills. Berganti agent tidak kehilangan rencana.',
        },
        {
          title: 'Validasi dipilih dari apa yang disentuh setiap tugas',
          body: 'Setiap tugas menyatakan permukaan yang disentuhnya dan menjalankan test dari perilaku yang berubah beserta konsumennya, diperluas ke seluruh suite ketika dampaknya tidak bisa dibatasi. Nol test terpilih tidak pernah dianggap lulus.',
        },
        {
          title: 'Satu Final Review dengan pemeriksaan keamanan',
          body: 'Sebuah rencana ditutup dengan tinjauan keamanan atas kumpulan perubahan yang terkumpul, termasuk tinjauan lokal atas diff yang diwajibkan, dan validasi status akhir. Temuan kritis memblokir penyelesaian.',
        },
        {
          title: 'Status yang bertahan lintas sesi dan agent',
          body: 'Centang README, log tugas, indeks kerja yang terbatas, dan berkas status terbaca mesin ditulis di setiap batas, sehingga sesi lain atau agent lain melanjutkan dari disk. Bahkan pembuatan rencana yang terputus bisa dipulihkan.',
        },
        {
          title: 'Pemeriksa konformansi untuk repositorinya sendiri',
          body: 'Script baca-saja memverifikasi harness dan setiap rencana terhadap spesifikasi, memahami kedua siklus hidup rencana, dan keluar dengan kode yang ramah CI.',
        },
        {
          title: 'Beban instruksi diukur dan dipublikasikan',
          body: 'Script yang di-commit mengukur berapa byte yang dimuat setiap alur; hasilnya, termasuk kenaikan, dipublikasikan sebagai byte, tidak pernah sebagai persentase token atau biaya.',
        },
      ],
    },
    honestLimits: {
      title: 'Keterbatasan yang jujur',
      body: 'Deep Work Plan tidak memiliki mekanisme spesifikasi hidup maupun delta; OpenSpec dan tool sejenis lebih kuat di aspek itu. Belum ada benchmark independen atas metodologi ini; sebuah evaluasi publik yang praregistrasi sedang direncanakan. Ledger beban instruksi mengukur byte yang dimuat, bukan token, biaya, atau hasil. DWP secara sengaja dibatasi pada repositori: ini bukan sistem memori lintas proyek, bukan kerangka kerja agen berbasis peran, dan bukan IDE, sehingga tidak bersaing di sumbu-sumbu itu juga — padukan dengan alat yang mencakup salah satu sumbu tersebut saat pekerjaan membutuhkannya.',
    },
    correction: {
      title: 'Bantu kami menjaga keakuratan halaman ini',
      body: 'Halaman ini ditinjau pada tanggal yang tertera dan dikoreksi atas permintaan. Jika deskripsi tool Anda kedaluwarsa atau tidak lengkap, bukalah issue dan kami akan memperbaikinya.',
      ctaLabel: 'Buka issue',
    },
    sourcesTitle: 'Sumber',
  },

  trustPage: {
    meta: {
      title: 'Kepercayaan dan keamanan',
      description:
        'Mengapa Deep Work Plan aman untuk diadopsi: sumber terbuka dan berlisensi MIT, Markdown-first tanpa panggilan jaringan atau telemetri, non-destruktif berdasarkan desain, dengan instalasi yang dapat diverifikasi dan kebijakan pengungkapan kerentanan yang jelas.',
    },
    eyebrow: 'Kepercayaan & keamanan',
    title: 'Kepercayaan dan keamanan',
    intro:
      'Tidak ada yang harus memasang skill yang tidak bisa dipercaya. Deep Work Plan dibangun untuk diverifikasi, bukan diterima begitu saja: sumber terbuka, Markdown-first, non-destruktif, dan dapat diperiksa sebelum Anda menjalankannya. Halaman ini menyatakan dengan jelas apa yang dilakukannya, apa yang tidak dilakukannya, dan cara mengonfirmasi keduanya.',
    pillarsTitle: 'Apa yang Anda percayai',
    pillars: [
      {
        title: 'Sumber terbuka dan berlisensi MIT',
        body: 'Situs web dan skill keduanya publik dan dapat dibandingkan. Anda dapat membaca setiap baris sebelum menjalankannya, dan membandingkan salinan mana pun terhadap sumber pada rilis bertag.',
      },
      {
        title: 'Markdown-first — tanpa jaringan, tanpa telemetri',
        body: 'Skill tidak memiliki CLI, tidak ada HTTP API, dan tidak ada alur autentikasi. Ia tidak melakukan panggilan jaringan dan tidak mengirim telemetri; satu-satunya helper lokalnya membaca metadata git dan lingkungan. Tidak ada yang berkaitan dengan repositori Anda yang meninggalkan mesin Anda.',
      },
      {
        title: 'Non-destruktif berdasarkan desain',
        body: 'Satu-satunya tindakan yang relevan dari segi keamanan yang dilakukan skill adalah mengubah repositori Anda — dan ia merekonsiliasi alih-alih menimpa. Ia mendeteksi apa yang ada, mengusulkan rencana, dan bertanya sebelum mengganti apa pun. Keluaran rencana berada di direktori .dwp/ yang di-gitignore.',
      },
      {
        title: 'Tidak menyentuh rahasia',
        body: 'Metodologi tidak pernah melakukan commit rahasia dan menjaga status pekerjaan di luar kontrol versi. Onboarding menambahkan ke .gitignore alih-alih menulisnya ulang, dan setiap perubahan dimaksudkan untuk ditinjau dalam diff kecil yang mudah dibaca.',
      },
      {
        title: 'Asal-usul yang dapat diverifikasi',
        body: 'Setiap rilis menerbitkan checksum atas skill yang dikirimkan, sehingga Anda dapat mengonfirmasi bahwa salinan yang diunduh cocok dengan yang diterbitkan sebelum Anda mempercayainya.',
      },
    ],
    verifyTitle: 'Verifikasi sebelum menjalankan',
    verifyIntro:
      'Perlakukan skill sebagai tidak tepercaya sampai Anda telah memeriksanya. Setiap rilis melampirkan file SHA256SUMS yang mencakup skill yang dikirimkan. Unduh untuk versi yang ingin Anda pasang, lalu verifikasi bahwa salinan Anda cocok — keluaran non-zero berarti sebuah file tidak cocok dan Anda harus berhenti.',
    codeLabel: 'shell',
    verifyNote:
      'Rilis ber-checksum, bukan ditandatangani — penandatanganan (cosign atau GPG pengelola) adalah langkah berikutnya yang terdokumentasi, bukan klaim saat ini. Karena semuanya terbuka, Anda juga dapat membandingkan file mana pun terhadap repositori pada tag-nya.',
    disclosureTitle: 'Laporkan kerentanan',
    disclosureBody:
      'Menemukan masalah keamanan? Laporkan secara pribadi melalui pelaporan kerentanan privat GitHub di repositori yang relevan — skill atau situs web (lihat tautan kebijakan keamanan di bawah) — daripada membuka issue publik yang akan mengekspos masalah sebelum ada perbaikan.',
    resourcesTitle: 'Sumber daya kepercayaan',
    linkManifest: 'Manifes kepercayaan yang dapat dibaca mesin',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Kebijakan keamanan situs web',
    linkSkillPolicy: 'Kebijakan keamanan skill & model ancaman',
    limitationsTitle: 'Keterbatasan yang jujur',
    limitations: [
      'Rilis ber-checksum, belum ditandatangani secara kriptografis — penandatanganan direncanakan, belum dilakukan.',
      'Deep Work Plan menjalankan coding agent otonom terhadap repositori Anda. Tinjau rencana yang diusulkannya dan diff-nya; metodologi dirancang untuk tinjauan itu, bukan untuk menggantikannya.',
      'Klaim kepercayaan di sini hanya mendeskripsikan sumber resmi. Salinan yang dimodifikasi atau pihak ketiga yang telah menyimpang dari repositori tidak membawa satu pun dari jaminan ini — verifikasi dulu.',
    ],
    ctaTitle: 'Adopsi dengan penuh keyakinan',
    ctaBody:
      'Baca metodologi dan spesifikasinya, arahkan agent ke endpoint init, dan verifikasi instalasi sebelum Anda menjalankannya.',
    ctaPrimary: 'Baca metodologinya',
    ctaSecondary: 'Adopsi (init)',
  },

  // Developers — agent & developer surface
  developersPage: {
    meta: {
      title:
        'Pengembang — API agent, server MCP, dan dokumentasi Deep Work Plan',
      description:
        'Permukaan agent Deep Work Plan: API read-only tanpa autentikasi, spesifikasi OpenAPI, server MCP di /api/mcp, Markdown 17 bahasa, dan CLI npx skills.',
    },
    eyebrow: 'Permukaan agent & pengembang',
    title: 'Deep Work Plan untuk pengembang dan agent AI',
    intro:
      'deepworkplan.com menghadirkan permukaan yang dapat dibaca mesin di samping halamannya: API agent yang dideskripsikan OpenAPI, server MCP stateless, mirror Markdown native untuk setiap halaman dalam 17 bahasa, dan skill DWP yang dapat dipasang. Semua di halaman ini live, publik, dan gratis — tidak ada yang perlu didaftarkan.',
    accessTitle: 'Tanpa autentikasi secara desain',
    accessIntro:
      'Tidak ada kunci API untuk dibuat, tidak ada alur OAuth, dan tidak ada sandbox yang terpisah dari produksi — permukaan produksi itu sendirilah sandbox-nya. Ini adalah properti metodologi yang disengaja: agent tidak bisa mengisi formulir "hubungi sales", jadi situs ini tidak pernah memintanya.',
    accessPoints: [
      {
        title: 'Read-only',
        body: 'Setiap operasi adalah GET yang aman dan dapat di-cache — kecuali endpoint MCP, yang merupakan POST. Tidak ada operasi tulis, unggahan, atau perubahan status di mana pun.',
      },
      {
        title: 'Tanpa kunci API',
        body: 'Tidak ada registrasi, tidak ada token, tidak ada tingkat rate limit. Akses anonim adalah kontrak terdokumentasi, dinyatakan di /auth.md dan stub penemuan OAuth.',
      },
      {
        title: 'Gratis & open source',
        body: 'Konten situs dan skill DWP berlisensi MIT. Gunakan dalam pekerjaan komersial dan non-komersial tanpa perlu meminta izin.',
      },
      {
        title: 'Machine-first',
        body: 'Error JSON terstruktur pada path /api, body pemulihan 404 Markdown, katalog API RFC 9727, dan manifest kapabilitas ARD — dibangun untuk konsumsi agent.',
      },
    ],
    endpointsTitle: 'Endpoint',
    endpointsIntro:
      'Endpoint inti dari API agent. Spesifikasi lengkap dan bertipe — setiap operasi, parameter, dan skema respons — berada di dokumen OpenAPI.',
    endpointsNote:
      'Path /api/* yang tidak dikenal mengembalikan error JSON terstruktur dengan petunjuk resolusi, bukan halaman error HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Spesifikasi OpenAPI 3.1 dari seluruh API agent.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Indeks panduan LLM terkurasi — titik masuk yang direkomendasikan untuk agent.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Prompt adopsi DWP kanonik (jadikan repositori apa pun AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Halaman apa pun sebagai Markdown sumber native — dalam semua 17 bahasa (mis. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Penanda health statis dengan link ke spesifikasi dan portal ini.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Server MCP (Streamable HTTP, stateless): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifest kapabilitas ARD — agentmap yang dinyatakan di robots.txt.',
      },
    ],
    mcpTitle: 'Server MCP',
    mcpIntro:
      'Server Model Context Protocol stateless melalui Streamable HTTP. Tiga tool read-only: get_init_prompt, list_site_sections, dan read_page. Versi protokol 2025-03-26 dan 2025-06-18 didukung; tidak ada sesi yang diperlukan.',
    mcpCodeLabel: 'Terminal — JSON-RPC over HTTP',
    mcpNote:
      'Manifest MCP berada di /.well-known/mcp.json dan kartu server di /.well-known/mcp/server-card.json. Claude, ChatGPT, dan klien MCP apa pun dapat memanggil tool ini secara native.',
    markdownTitle: 'Markdown untuk agent',
    markdownIntro:
      'Setiap halaman yang dirender diterbitkan sebagai Markdown sumber native — bukan konversi HTML. Minta Markdown secara eksplisit dengan sufiks URL atau melalui negosiasi konten HTTP di halaman mana pun.',
    markdownCodeLabel: 'Terminal — negosiasi konten',
    markdownNote:
      'Negosiasi konten mengembalikan Markdown sumber yang sama dengan yang dirender situs, dalam bahasa URL yang Anda minta.',
    cliTitle: 'Pasang kit',
    cliIntro:
      'Jalur instalasi resmi untuk skill Deep Work Plan — perintah yang sama dengan yang diberikan endpoint /init kepada agent. Bekerja dengan coding agent apa pun yang kompatibel dengan skills (Claude Code, Cursor, Codex, Gemini, dan lainnya).',
    cliCodeLabel: 'Terminal — skills CLI',
    cliNote:
      'Skill di-vendor ke .agents/skills/deepworkplan/ di dalam repositori Anda, sehingga setiap agent yang menyentuh repo berbagi metodologi yang sama.',
    resourcesTitle: 'Sumber daya yang dapat dibaca mesin',
    resources: [
      {
        label: 'Spesifikasi OpenAPI (/openapi.json)',
        href: '/openapi.json',
      },
      {
        label: 'Deklarasi akses & autentikasi agent (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Katalog API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifest MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Kontak keamanan (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Deskriptor repo situs (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Arahkan sebuah agent ke sini',
    ctaBody:
      'Jalur tercepat tetap satu baris: berikan prompt /init kepada coding agent mana pun dan ia memasang skill, onboarding repositori Anda, dan mulai menyelesaikan deep work.',
    ctaPrimary: 'Buka prompt /init',
    ctaSecondary: 'Baca metodologinya',
  },

  // Privacy policy
  privacyPage: {
    meta: {
      title: 'Privasi — Deep Work Plan',
      description:
        'Kebijakan privasi deepworkplan.com: situs statis tanpa akun dan iklan, analitik tanpa cookie, serta penjelasan lugas data apa yang dikumpulkan formulir kontak.',
    },
    eyebrow: 'Kebijakan privasi',
    title: 'Privasi di deepworkplan.com',
    intro:
      'Deep Work Plan adalah situs dokumentasi dan metodologi statis. Halaman ini menjelaskan, secara lugas dan lengkap, data apa yang disentuh situs saat Anda berkunjung: tidak ada sistem akun, tidak ada iklan, dan tidak ada pelacakan lintas situs di dalamnya.',
    lastUpdated: '8 September 2026',
    sections: [
      {
        heading: 'Apa situs ini',
        body: 'deepworkplan.com adalah kumpulan halaman statis yang dilayani melalui CDN. Tidak ada login, tidak ada basis data pengguna, dan tidak ada cara bagi situs untuk menyimpan profil pribadi. Konten dikembangkan di repositori GitHub publik di bawah organisasi DailybotHQ, dan semua yang Anda baca di sini disajikan persis seperti yang dibangun.',
      },
      {
        heading: 'Analitik',
        body: 'Situs menggunakan Umami, layanan analitik tanpa cookie yang mengutamakan privasi, untuk menghitung tampilan halaman secara agregat. Umami tidak menetapkan cookie pelacakan dan tidak membangun profil lintas situs. Karena crawler AI tidak menjalankan JavaScript, sebuah edge function sisi server juga mencatat user agent dan path kunjungan bot otomatis sebagai peristiwa analitik anonim — ini mengidentifikasi perangkat lunak crawler (misalnya "GPTBot mengunjungi /init"), bukan pengunjung manusia.',
      },
      {
        heading: 'Cookie dan penyimpanan lokal',
        body: 'Situs tidak menetapkan cookie pelacakan. Satu-satunya hal yang disimpan di browser Anda adalah preferensi tema (mode terang atau gelap) yang disimpan di localStorage, yang tidak pernah meninggalkan perangkat Anda dan tidak dikirim ke mana pun. Jika Anda menghapus penyimpanan browser, situs cukup kembali ke tema bawaan sistem Anda.',
      },
      {
        heading: 'Layanan pihak ketiga',
        body: 'Hosting dan pengiriman berjalan di Cloudflare Pages, yang memproses log permintaan dan alamat IP di edge sebagai bagian dari mengoperasikan CDN dan memblokir penyalahgunaan, di bawah kebijakan privasi Cloudflare sendiri. Analitik agregat berjalan di Umami (cloud.umami.is). Jika Anda mengirimkan formulir kontak secara sukarela, jawaban Anda dikirim melalui Google Forms ke tim kami — itu satu-satunya tempat informasi yang Anda ketik dikumpulkan, dan hanya digunakan untuk membalas Anda.',
      },
      {
        heading: 'Yang tidak kami lakukan',
        body: 'Kami tidak menjual atau membagikan data pribadi, tidak menjalankan iklan atau piksel remarketing, tidak melakukan fingerprinting browser, dan tidak mengirim email pemasaran. Situs ini tidak memiliki pendaftaran buletin dan tidak ada telemetri di luar hitungan agregat tanpa cookie yang dijelaskan di atas.',
      },
      {
        heading: 'Pilihan Anda',
        body: 'Karena analitik di sini agregat dan tanpa cookie, tidak ada profil pribadi untuk diekspor atau dihapus. Anda dapat memblokir skrip analitik dengan pemblokir konten apa pun tanpa memengaruhi cara kerja situs. Jika Anda telah mengirimkan formulir kontak dan ingin pesan Anda dihapus, tulislah ke alamat kontak di bawah dan kami akan menghapusnya.',
      },
      {
        heading: 'Perubahan kebijakan ini',
        body: 'Jika kebijakan ini berubah secara material, tanggal pembaruan di bagian atas halaman ini ikut berubah, dan penyuntingan substantif di-commit ke repositori situs web publik tempat siapa pun dapat meninjau riwayatnya.',
      },
    ],
    contactTitle: 'Kontak dan keamanan',
    contactBody:
      'Untuk pertanyaan privasi, tulis ke security@dailybot.com. Untuk melaporkan kerentanan keamanan, gunakan pelaporan kerentanan privat GitHub untuk repositori situs web dan skill — lihat /.well-known/security.txt untuk alamat persisnya.',
  },
};
