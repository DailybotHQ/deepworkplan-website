/**
 * English translations
 */

import type { SiteTranslations } from './types';

export const en: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — structured execution for AI coding agents',
  siteDescription:
    'Deep Work Plan: an open methodology and reference kit for structured, validated, resumable multi-hour AI-agent execution.',

  // Navigation
  nav: {
    home: 'Home',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    // Deep Work Plan IA
    methodology: 'Methodology',
    spec: 'Spec',
    kit: 'Kit',
    examples: 'Examples',
    init: 'Init',
    github: 'GitHub',
    menu: 'Open menu',
    closeMenu: 'Close menu',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'All rights reserved.',
    poweredBy: 'Powered by',
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — turn any repository into an AI-first codebase',
      description:
        'A methodology and kit for planning and executing complex software work with AI agents: it documents your repo, produces long-horizon plans, and lets any agent pilot, validate, and resume the work.',
    },
    hero: {
      badge: 'Open methodology · MIT · Agent-agnostic',
      title: 'Make any repository AI-first.',
      titleEmphasis: 'Give your agent one instruction.',
      instructionLabel: 'Give your agent this',
      instruction:
        'Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.',
      instructionCaption:
        'Your agent reads the plan, installs the kit, and onboards your repository — reasoning about your actual stack, never pasting a template.',
      copyLabel: 'Copy',
      copiedLabel: 'Copied',
      viewInitCta: 'View the full /init prompt',
      pullQuote:
        'Deep Work Plan is spec-driven development where the repository itself becomes the harness.',
      primaryCta: 'Read the methodology',
      secondaryCta: 'Read the spec',
    },
    pitch: {
      kicker: 'The problem and the answer',
      problem:
        'AI coding agents are remarkably effective in short bursts. On long-horizon work — a migration, a new subsystem, a refactor across dozens of files — they drift: context fills up, decisions are forgotten, and multi-hour tasks are abandoned halfway through.',
      answer:
        'Deep Work Plan answers with spec-driven development: the plan is the durable source of truth, and agents execute against explicit acceptance criteria and validation gates. Drift drops, the work stays verifiable, and any agent can resume it across sessions.',
      origin:
        'It is also harness engineering made portable. An agent harness is the scaffolding around a model — context, tools, control loop, guardrails, resumable state — that makes it reliable. Deep Work Plan installs that harness into the repository itself (AGENTS.md, docs, the .agents/ skills home, the DWP skill), so any agent can pilot any repo. Born at Dailybot, battle-tested for months, and released as the DailybotHQ/deepworkplan-skill.',
    },
    onboarding: {
      badge: 'Reasoning-based onboarding',
      title: 'Point it at any repository. It reasons — it does not copy-paste.',
      subtitle:
        "The onboarding flow inspects your repository's actual languages, frameworks, package manager, and validation commands, then generates artifacts adapted to that repository. A generic stub is treated as a failure.",
      steps: [
        {
          title: 'Reasons about your stack and archetype',
          description:
            'Reads manifests, folder layout, and CI to infer the real test, lint, and build commands, then classifies the repository as an individual repo or an orchestrator hub.',
        },
        {
          title: 'Generates AGENTS.md, docs/, and per-module docs',
          description:
            "A reasoned AGENTS.md, a categorized docs/ hierarchy, and a README plus docs/ inside each major module — filled with your repository's real commands, not placeholders.",
        },
        {
          title: 'Scaffolds .agents/ with the .claude to .agents symlink',
          description:
            'A cross-agent .agents/ directory (skills, agents, commands) and the .claude to .agents symlink, mirroring CLAUDE.md to AGENTS.md, so every tool reads one source of truth.',
        },
        {
          title: 'Installs the DWP skill and scaffolds .dwp/',
          description:
            'Wires the Deep Work Plan skill and creates the gitignored .dwp/ folder for plans and drafts, then optionally layers opt-in addons such as devcontainer support.',
        },
      ],
    },
    quickstart: {
      badge: 'What happens when you run it',
      title: 'One instruction. The repository does the rest.',
      subtitle:
        'You do not pick an install method or copy a template. You hand your agent one line; it installs the skill — the reusable engine — and adapts your repository to it.',
      steps: [
        {
          title: 'Your agent opens /init.md',
          description:
            'It reads the onboarding prompt at deepworkplan.com/init.md and the methodology, specification, and kit it links to — the standard it is about to adopt.',
        },
        {
          title: 'It installs the Deep Work Plan skill',
          description:
            'The skill is the engine — the same in every repository. One command pulls in the router and its sub-skills (create, execute, refine, resume, status, onboard, author) for Claude Code, Cursor, Codex, Gemini, and Copilot.',
        },
        {
          title: 'It adapts your repository',
          description:
            'Reasoning about your real stack — never copy-pasting — it writes AGENTS.md, a categorized docs/ tree, per-module READMEs, a reasoned .agents/ kit, and a gitignored .dwp/. Your repository becomes the harness.',
        },
        {
          title: 'You plan and execute',
          description:
            'Generate long-horizon Deep Work Plans for any task and run them step by step, with explicit acceptance criteria, validation gates, and resumable state — autonomously, for hours.',
        },
      ],
      note: 'The skill is installed identically everywhere; what is adapted is your repository — the AGENTS.md, docs, and reasoned .agents/ kit generated for your stack. That split is what makes the methodology a reusable standard rather than a one-off scaffold.',
    },
    outcomes: {
      badge: 'What you get',
      title: 'Everything your agent needs to work autonomously.',
      subtitle:
        'One run, committed atomically. Every output is Markdown and every change is auditable.',
      items: [
        {
          label: 'AGENTS.md at the repository root',
          detail:
            "Reasoned from your repository's actual stack, commands, and structure — not a template with placeholders. CLAUDE.md is symlinked to AGENTS.md.",
        },
        {
          label: 'Categorized docs/ and per-module docs',
          detail:
            'Architecture, setup, standards, and troubleshooting — plus a README and docs/ inside each major module, generated from your codebase.',
        },
        {
          label: '.agents/ with the .claude to .agents symlink',
          detail:
            'A cross-agent .agents/ directory (skills, agents, commands) with the .claude to .agents symlink so every tool reads one source of truth.',
        },
        {
          label: 'The Deep Work Plan skill, installed',
          detail:
            'create, execute, refine, resume, status, and onboard — available to your agent as a single skill pack, with no per-repository copy.',
        },
        {
          label: 'Two archetypes, handled',
          detail:
            'Onboarding classifies your repository as an individual repo (the common case) or an orchestrator hub that coordinates child plans across repositories.',
        },
        {
          label: 'A living kit your repository grows',
          detail:
            'The author sub-skill (skill-create, agent-create) lets the repository evolve its own skills, agents, and commands; opt-in maintenance add-ons such as dependency-upgrade help it keep itself up to date.',
        },
        {
          label: 'Git-native, resumable, .dwp/',
          detail:
            'No daemon and no external state. Plans and drafts land in a gitignored .dwp/ folder, and any task resumes from git alone — even after context overflows.',
        },
      ],
    },
    agents: {
      badge: 'Agents',
      title: 'Works with the agent you already use.',
      subtitle:
        'One methodology, many adapters. Markdown couples the framework to nothing — every agent that reads Markdown can run a Deep Work Plan.',
      fullLabel: 'Full',
      partialLabel: 'Partial',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Reference implementation, with native WebFetch and slash commands.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Full adapter. Use the offline bundle if WebFetch is gated.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Offline bundle recommended; rules installed under .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'partial',
          note: 'Docs and AGENTS.md only. Slash commands via extensions.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Requires Gemini 2.5 Pro or newer, with native WebFetch.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Full adapter with a native command surface.',
        },
      ],
    },
    stacks: {
      badge: 'Stacks',
      title: 'Reasoning presets for the stacks that matter.',
      subtitle:
        "These are reasoning aids, not templates. Onboarding reads your repository's real manifests and adapts per stack — it never blind-copies a preset. Monorepos get per-module docs.",
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
        { name: 'Generic', sub: 'Any stack' },
      ],
    },
    archetypes: {
      badge: 'Two archetypes',
      title: 'Individual repository, or orchestrator hub.',
      subtitle:
        'Onboarding forks on the archetype. Most repositories are individual repos. A hub coordinates child Deep Work Plans across many repositories. The methodology handles both as first-class.',
      individual: {
        tag: 'Common case',
        title: 'Individual repository',
        description:
          'A single codebase with one primary stack, its own validation commands, and per-module docs. The default — onboarding assumes it unless the repository is clearly a hub.',
        example:
          'For example, a Django API, a Vue app, or a TypeScript Lambda service.',
      },
      orchestrator: {
        tag: 'Coordination',
        title: 'Orchestrator hub',
        description:
          'A coordination repository that orchestrates work across sub-repositories via an orchestrator manifest, spawning child plans that each commit in their own repository, plus boundary rules and a navigation index.',
        example: 'For example, a hub coordinating five product repositories.',
      },
    },
    comparison: {
      badge: 'Methodology versus tool',
      title: 'A different layer. Complementary, not competing.',
      subtitle:
        'Deep Work Plan is not another scaffolder. It is the methodology layer underneath any spec-driven or scaffolding tool, focused on multi-hour autonomous runs.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Scaffolding / spec tools',
      rows: [
        {
          label: 'Primary focus',
          dwp: 'Multi-hour autonomous execution',
          others: 'Spec or scaffold generation',
        },
        {
          label: 'Unit of work',
          dwp: 'A Deep Work Plan (resumable session)',
          others: 'A spec document or a scaffold',
        },
        {
          label: 'State model',
          dwp: 'Git-native .dwp/ folder, resumable',
          others: 'Often external or in-IDE',
        },
        {
          label: 'Agent coupling',
          dwp: 'Agent-agnostic (Markdown and Bash)',
          others: 'Often tool- or IDE-specific',
        },
        {
          label: 'Context recovery',
          dwp: 'Resumes after context overflow',
          others: 'Typically restarts the task',
        },
        {
          label: 'License',
          dwp: 'MIT, open methodology and kit',
          others: 'Varies',
        },
      ],
    },
    origin: {
      badge: 'Origin',
      quote:
        'Built by Dailybot — the company behind asynchronous standups for distributed teams. Internally we used Deep Work Plans to make production repositories spanning Django, Vue, TypeScript Lambda, and Astro agent-pilotable. After months of production use, we open-sourced the methodology under MIT.',
      attribution: 'The Dailybot engineering team',
      dailybotCta: 'Learn about Dailybot',
    },
    finalCta: {
      badge: 'Make your repository AI-first',
      title: 'Give your agents deep work.',
      subtitle:
        'Hand your agent one line — point it at /init.md — and it makes your repository AI-first: it installs the skill, reasons about your stack, and commits a complete AGENTS.md hierarchy. From there you create and execute Deep Work Plans that run autonomously for hours.',
      primaryCta: 'Open the /init prompt',
      secondaryCta: 'Read the methodology',
      meta: 'MIT-licensed · zero telemetry · outputs to a gitignored .dwp/ folder.',
    },
  },

  // Homepage hero
  hero: {
    tagline: 'CTO at Dailybot (YC S21) · Builder of Digital Products',
    description:
      'I build technology that empowers teams. CTO & Co-founder at <a href="https://dailybot.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-300 transition-colors underline">Dailybot (YC S21)</a>, a collaboration platform where human teams and AI agents work together. 14+ years shipping digital products, from AI-powered platforms to open source tools.',
    typewriterWords: [
      'CTO at Dailybot (YC S21)',
      'Builder of Digital Products',
      'Community Founder',
      'AI & Tech Explorer',
      'Open Source Contributor',
    ],
  },

  // Homepage sections
  homeSections: {
    about: {
      title: "Hello, I'm <span class='text-secondary'>Sergio</span>",
      description: `Today I lead engineering at Dailybot (YC S21), a modern collaboration platform that enables human teams and AI agents to work together seamlessly. I focus on product strategy, AI-powered workflows, and reliable systems that help hybrid teams move faster.<br /><br />
My strengths are turning complex ideas into simple products, scaling engineering teams, and shipping end-to-end: architecture, execution, and iteration based on real user feedback.<br /><br />
I currently focus on AI applications, developer productivity, and high-impact products that combine speed, quality, and measurable business results.`,
      cta: 'Learn more about me',
      cta2: 'View my CV',
    },
    dailybot: {
      title: 'Dailybot (YC S21)',
      subtitle: 'CTO & Cofounder',
      description:
        'I have led the development of a modern collaboration platform that enables both human teams and AI agents to work together seamlessly. It provides unified transparency and visibility into work across hybrid teams and intelligent workflows—supporting async standups, peer recognition, and AI agents reporting on progress—all inside Slack, Microsoft Teams, and Google Chat. In 2021, we were selected by Y Combinator, which accelerated our growth and reinforced our focus on customer satisfaction. \u{1F680}',
      cta: 'Learn more about Dailybot',
    },
    techTalks: {
      title: 'Tech Talks',
      subtitle: 'Cofounder & Speaker',
      description:
        'As cofounder and organizer of the Pereira Tech Talks community, I have driven the creation of spaces to share knowledge and connect technology professionals. I have had the opportunity to be a speaker at multiple technical talks, where I enjoy sharing experiences and learning alongside the community.',
      cta: 'Learn more about my talks',
    },
    makerHome: {
      title: 'What I Built',
      subtitle: 'Entrepreneur, maker & tech enthusiast',
      description:
        "Beyond Dailybot, I'm an entrepreneur and maker passionate about technology. I build side projects, explore AI, and contribute to open source — from Moltbot (AI on Raspberry Pi) to Syntro (AI-powered support) to SysPrompt (LLM prompt management). With 113+ repositories on GitHub, I believe the best way to learn is to build something real.",
      cta: 'View portfolio',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Projects & Open Source',
      description:
        'A curated timeline of my personal projects — from software and web applications to robotics and open source contributions. Each project represents a milestone in my journey as a maker and developer.',
      cta: 'Explore my portfolio',
    },
    trading: {
      title: 'Trading',
      subtitle: 'Enthusiastic trader & Algorithmic trading learner',
      description:
        'As an enthusiastic trader, I have dedicated the last two years to training in the foreign exchange market (forex) and deepening my knowledge of algorithmic trading, with the goal of optimizing and automating my investment strategies. I am motivated by continuous learning and financial market research, always looking for new tools and approaches to improve my performance and make more informed decisions.',
      cta: 'Learn more about trading',
    },
    foodie: {
      title: 'Foodie Enthusiast',
      subtitle: 'Content creator & Foodie lover',
      description:
        'Beyond technology, I am a passionate content creator and food lover. I enjoy exploring new places to eat, sharing recommendations and culinary experiences, and connecting with people through my social media. I am motivated to inspire others to discover unique places and live new experiences, combining my enthusiasm for communication, creativity and good food.',
      cta: 'Discover my foodie side',
    },
    hobbies: {
      title: 'Hobbies',
      subtitle: 'Sports and active lifestyle enthusiast',
      description:
        'Outside the professional world, I am passionate about sports and wellness. I enjoy cycling around the city and staying active through running, basketball and chess. Additionally, I find in video games a form of entertainment and mental challenge. Sports are a fundamental part of my life, as they inspire me to constantly improve and maintain a healthy balance.',
      cta: 'See my hobbies',
    },
    builder: {
      title: 'What I Build',
      subtitle: 'From AI-powered platforms to open source tools',
      description:
        'Building is what I do best. As CTO of <a href="https://dailybot.com" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white font-semibold underline hover:no-underline">Dailybot (YC S21)</a>, I\'ve architected a modern collaboration platform that enables human teams and AI agents to work together seamlessly—with unified transparency across hybrid teams and intelligent workflows. Beyond Dailybot, I\'m constantly shipping side projects \u2014 from Moltbot (AI on Raspberry Pi) to Syntro (AI-powered support) to SysPrompt (LLM prompt management).<br /><br />With 113+ repositories on GitHub and projects spanning Python, Go, TypeScript, and more, I believe the best way to learn new technology is to build something real with it.',
      cta: 'Explore my projects',
    },
    community: {
      title: 'Community & Speaking',
      subtitle: 'Sharing knowledge, building ecosystems',
      description:
        "I co-founded Pereira Tech Talks, a tech community dedicated to connecting professionals and sharing knowledge in Colombia. As a speaker, I've talked about Docker, serverless architectures, conversational AI, blockchain, and more at conferences and meetups across the region. The community has grown into a platform where developers, designers, and entrepreneurs connect, learn from each other, and push the boundaries of what's possible. I believe technology grows faster when we share what we learn \u2014 that's why I write this blog and speak at events.",
      cta: 'Explore community & talks',
    },
    beyondCode: {
      title: 'Beyond Code',
      subtitle: 'What fuels the builder',
      description:
        "When I'm not building products, I'm exploring other passions. I love reading, especially science fiction \u2014 Isaac Asimov is one of my favorite authors \u2014 and films about time travel, dystopian futures, and space exploration. I study financial markets and algorithmic trading to understand the world of business from a different angle. I stay active through cycling, running, and basketball \u2014 sports keep me energized and disciplined. And I love discovering great food and sharing culinary finds. Life is better when you're curious about everything.",
      cta: 'More about my interests',
    },
    latestArticles: 'Latest Articles',
    viewAllPosts: 'View all posts',
    portfolioProjectsTitle: 'Portfolio & Projects',
    portfolioProjectsViewAll: 'View all portfolio posts',
    portfolioProjectsEmpty: 'More projects coming soon.',
    techTalksPostsTitle: 'Recent Tech Talks',
    techTalksPostsViewAll: 'View all tech talks',
    techTalksPostsEmpty: 'More talks coming soon.',
    dailybotPostsTitle: 'Latest Dailybot Articles',
    dailybotPostsViewAll: 'View all Dailybot articles',
    dailybotPostsEmpty: 'Dailybot articles coming soon.',
    tradingPostsTitle: 'Trading Journal',
    tradingPostsViewAll: 'View all trading entries',
    tradingPostsEmpty: 'Trading journal entries coming soon.',
  },

  // Contact section (homepage)
  contact: {
    title: 'Contact',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Write your message...',
    sendButton: 'Send message',
  },

  // About page
  aboutPage: {
    title: 'About the methodology',
    subtitle: 'Open methodology · MIT licensed',
    description:
      'Deep Work Plan is an open, framework-agnostic methodology for running serious engineering work with AI coding agents. Learn where it came from and who maintains it.',
    heroDescription:
      'A repeatable structure for planning, executing, and verifying deep work with AI coding agents — built in the open and free to use.',
    bioTitle: 'What it is',
    bioText:
      'Deep Work Plan (DWP) is a methodology, not a product. It defines how to turn a goal into an agreed plan, break that plan into atomic and independently verifiable tasks, and run each task in a focused loop that ends with a check.<br /><br />It is deliberately agnostic about which AI agent or stack you use — adapters translate the same core loop to Claude, Cursor, Copilot, Codex, Gemini, and more. The plan, the tasks, and the running log are all plain Markdown, so the work stays readable, reviewable, and version-controlled.',
    passionsTitle: 'Core principles',
    passions: [
      {
        title: 'Plan before execution',
        description:
          'No code is written until the plan is agreed. The plan is a contract between you and the agent.',
        icon: '\u{1F5FA}\uFE0F',
        link: '/methodology',
      },
      {
        title: 'Tasks are atomic',
        description:
          'Each task is scoped so it can be executed and verified on its own, then committed atomically.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verify everything',
        description:
          'Every task ends with an explicit check before the next one begins, with progress recorded in git.',
        icon: '\u2705',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'At a glance',
    quickFacts: [
      'Open methodology, MIT licensed',
      'Framework- and agent-agnostic',
      'Maintained by Dailybot and the community',
      'Includes a spec, commands, adapters, presets, and examples',
      'Markdown-only — no runtime, no lock-in',
      'Turns any repository into an AI-first, agent-pilotable codebase',
    ],
    ctaTitle: 'Who maintains it',
    ctaDescription:
      'Deep Work Plan grew out of real engineering work at Dailybot and is now maintained by Dailybot together with the open-source community. The methodology, specification, and kit are released under the MIT license — free to use, adapt, and build on.',
    ctaCv: 'Read the methodology',
    ctaContact: 'Quickstart',
  },

  // Contact page
  contactPage: {
    title: 'Community & contact',
    subtitle: 'Open source · Community-driven',
    description:
      'Deep Work Plan is built in the open. Find the source, open an issue, or join the conversation through the channels below.',
    heroDescription:
      'Questions, ideas, or improvements? Deep Work Plan is developed in public — here is where to reach the project and its maintainers.',
    formTitle: 'Send a Message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'I want to contact you about',
    reasonOptions: [
      { value: '', label: '— Select a topic —' },
      { value: 'general', label: 'General / Just saying hello' },
      { value: 'tech-talk', label: 'Tech talk / Speaking invitation' },
      { value: 'collaboration', label: 'Collaboration / Partnership' },
      { value: 'project', label: 'Project / Work inquiry' },
      { value: 'dailybot', label: 'Question about Dailybot' },
      { value: 'trading', label: 'Questions about my trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Join The Library of Tomorrow',
      },
      { value: 'other', label: 'Other' },
    ],
    subjectLabel: 'Subject',
    subjectPlaceholder: 'What is this about?',
    messageLabel: 'Message',
    messagePlaceholder: 'Write your message...',
    sendButton: 'Send Message',
    sendingButton: 'Sending...',
    successTitle: 'Message sent!',
    successMessage:
      "Thank you for reaching out. I'll get back to you as soon as possible.",
    sendAnotherButton: 'Send another message',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    fallbackMessage:
      'The contact form is currently unavailable. You can reach me directly by email.',
    fallbackEmailText: 'Send me an email at',
    formNote: "I'll get back to you as soon as possible.",
    socialTitle: 'Connect With Me',
    locationTitle: 'Location',
    locationText: 'Based in Colombia. Open to remote collaboration worldwide.',
    prefillSubjects: {
      generalInquiry: 'General Inquiry',
      collaboration: 'Collaboration Opportunity',
      projectInquiry: 'Project or Work Inquiry',
      projectCollaboration: 'Project Collaboration Inquiry',
      startupCollaboration: 'Startup Collaboration Opportunity',
      techTalkInvitation: 'Tech Talk Speaking Invitation',
      tradingQuestion: 'Trading Question',
      dailybotQuestion: 'Question About Dailybot',
    },
  },

  contactSection: {
    title: "Let's Connect",
    description:
      "I'm always open to interesting conversations, collaboration opportunities, and new ideas. Whether you want to talk tech, entrepreneurship, or just say hello.",
    ctaText: 'Get in touch',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Search input
  searchPlaceholder: 'Search articles...',
  searchHint: 'Tip: press Esc to clear the search.',
  clearSearch: 'Clear',
  resultsFound: (count) => `${count} result${count !== 1 ? 's' : ''} found`,

  // Loading states
  loadingIndex: 'Loading search index...',
  searching: 'Searching articles...',

  // Results
  noResults: (query) => `No articles found matching "${query}"`,
  noResultsSuggestion: 'Try a broader keyword or browse all posts.',
  noPostsAvailable: 'No posts available yet.',

  // Pagination
  previous: 'Previous',
  next: 'Next',
  pageOf: (current, total) => `Page ${current} of ${total}`,

  // Blog header
  blogTitle: 'Blog',
  blogHeading: 'Articles & Stories',
  blogDescription:
    'Technology, entrepreneurship, personal life, and everything in between',
  allPosts: 'All Posts',
  showingArticles: (showing, total) =>
    `Showing ${showing} of ${total} articles`,
  articlesAvailable: (total) =>
    `${total} article${total !== 1 ? 's' : ''} available`,
  lastUpdatedOn: 'Updated',
  readingTime: (minutes) => `${minutes} min read`,
  relatedArticles: 'Related Articles',
  relatedArticlesDescription: 'You might also enjoy these posts',

  // Series navigation
  seriesPartOf: 'Part of the series',
  seriesChapter: (n) => `Chapter ${n}`,
  seriesPrevious: 'Previous chapter',
  seriesNext: 'Next chapter',
  seriesToC: 'All chapters',
  seriesChapterOf: (current, total) => `Chapter ${current} of ${total}`,

  // Floating indicators that link a blog post to its companion slide deck (and back).
  slideIndicator: {
    label: 'Slides',
    subtitle: 'Open deck →',
    ariaLabel: 'Open companion slide deck',
  },
  postIndicator: {
    label: 'Article',
    subtitle: 'Read post →',
    ariaLabel: 'Read companion blog post',
  },

  // Series pages
  seriesPage: {
    title: 'Series',
    breadcrumb: 'Series',
    chapters: 'chapters',
    chapter: 'Chapter',
    progress: (current, total) => `${current} of ${total} chapters`,
    readChapter: 'Read chapter',
    emptyState: 'No posts in this series yet.',
    backToSeries: 'All Series',
    backToBlog: 'Back to Blog',
    startReading: 'Start reading',
    continueReading: 'Continue reading',
  },
  seriesListingPage: {
    title: 'Blog Series',
    description:
      'Explore curated collections of articles organized into thematic series — deep dives into technology, entrepreneurship, and software engineering.',
    heading: 'Series',
    postsCount: (count) => `${count} ${count === 1 ? 'chapter' : 'chapters'}`,
    exploreSeries: 'Explore series',
    emptyState: 'No series available yet.',
  },

  // Scheduled posts (dev-only indicators)
  scheduledBadge: 'Scheduled',
  scheduledBannerTitle: 'Scheduled post',
  scheduledBannerMessage: (date) =>
    `This post will be published on ${date}. It is only visible in development mode.`,

  // Draft posts (dev + preview indicators)
  draftBadge: 'Draft',
  draftBannerTitle: 'Draft post',
  draftBannerMessage:
    'This post is a work in progress. It is visible here because you are on the dev server or a preview branch — it will not ship to production until the draft flag is removed.',

  // Tags
  postsTagged: (tag) => `Posts tagged "${tag}"`,
  allTags: 'All Tags',
  tagNames: {
    // Primary tags
    tech: 'Tech',
    personal: 'Personal',
    talks: 'Talks',
    trading: 'Trading',
    portfolio: 'Portfolio',
    dailybot: 'Dailybot',
    entrepreneur: 'Entrepreneur',
    // Secondary tags (topics)
    'web-development': 'Web Development',
    javascript: 'JavaScript',
    ai: 'AI & ML',
    blockchain: 'Blockchain',
    devops: 'DevOps',
    python: 'Python',
    university: 'University',
    database: 'Databases',
    iot: 'IoT',
    design: 'Design',
    mobile: 'Mobile',
    'ai-agents': 'AI Agents',
    // Subtopic tags
    astro: 'Astro',
    svelte: 'Svelte',
    cloudflare: 'Cloudflare',
    docker: 'Docker',
    graphql: 'GraphQL',
    django: 'Django',
    openclaw: 'OpenClaw',
    kotlin: 'Kotlin',
    claude: 'Claude',
    mcp: 'MCP',
    flutter: 'Flutter',
  },
  tagDescriptions: {
    // Primary tags
    tech: 'Tutorials, guides, and technical articles.',
    personal: 'Articles about my life and experiences.',
    talks: 'Tech talks, slides, videos, and events.',
    trading: 'Trading journal, analysis, and learnings.',
    portfolio: 'Personal projects, software, robotics, and open source work.',
    dailybot:
      'Dailybot articles: collaboration platform for human teams and AI agents, workflow automation, and hybrid team productivity.',
    entrepreneur:
      'Entrepreneurship journey, ventures, and startup experiences.',
    // Secondary tags (topics)
    'web-development':
      'Frameworks, frontend, fullstack — Astro, Vue, Svelte, Meteor, CSS, Webpack.',
    javascript:
      'JavaScript ecosystem — Vue.js, Webpack, Meteor, A-Frame, Node.',
    ai: 'Artificial intelligence, machine learning, deep learning, and LLMs.',
    blockchain:
      'Blockchain, cryptocurrency, Bitcoin, Ethereum, and smart contracts.',
    devops: 'Docker, containers, serverless, microservices, and deployment.',
    python: 'Python ecosystem — Django, TensorFlow, MyPy, Spark.',
    university: 'Academic coursework projects and exercises.',
    database: 'SQL, NoSQL, MongoDB, and multi-database architecture.',
    iot: 'Internet of Things, sensors, hardware, and voice interfaces.',
    design: 'Visual design, branding, web design, and UX.',
    mobile:
      'Mobile development — Android, iOS, cross-platform frameworks, and the journey of learning to ship for handhelds.',
    'ai-agents':
      'AI agents and the agentic web — autonomous systems, tool use, orchestration patterns, MCP, and the .well-known agent standards.',
    // Subtopic tags
    astro:
      'Astro framework — islands architecture, Content Collections, MDX, and static-site builds.',
    svelte:
      'Svelte and SvelteKit — reactive components, runes, and hydration patterns.',
    cloudflare: 'Cloudflare Pages, Workers, R2, and the agentic-web platform.',
    docker:
      'Docker containers, Dockerfile authoring, and multi-service orchestration.',
    graphql:
      'GraphQL APIs — schemas, resolvers, federation, and client patterns.',
    django:
      'Django framework — ORM, multi-database setups, admin, and deployment.',
    openclaw:
      'OpenClaw — the local-first personal AI agent and its design philosophy.',
    kotlin:
      'Kotlin language and ecosystem — Kotlin Multiplatform, Compose Multiplatform, Android, JVM tooling.',
    claude:
      "Claude — Anthropic's model family and the agent runtimes built on top (Claude Code, Skills, Files API).",
    mcp: 'Model Context Protocol — standardized agent↔tool communication, server cards, and the agentic-web standards layer.',
    flutter:
      'Flutter — Dart-based cross-platform mobile framework, widgets, and the trade-offs versus native and Kotlin Multiplatform.',
  },

  // Series names and descriptions (keyed by series slug)
  seriesNames: {
    'building-deepworkplan': 'Building Deep Work Plan',
    'trading-journey': 'Trading Journey: From Futures to Algorithms',
    'aeo-from-invisible-to-cited': 'AEO: From Invisible to Cited',
    'working-with-agents': 'Working with Agents',
    'building-agents': 'Building Agents',
    'the-library-of-tomorrow': 'The Library of Tomorrow',
    'mastering-openclaw': 'Mastering OpenClaw',
    'learning-mobile-development': 'Learning Mobile Development',
    'slides-as-code': 'Slides as Code',
  },
  seriesDescriptions: {
    'building-deepworkplan':
      'The complete story of building the Deep Work Plan website — from architecture decisions to performance optimization, analytics, and content scalability.',
    'trading-journey':
      'A 3-part series about my evolution from early discretionary trading to structured analysis with Market Profile and algorithmic execution with MQL4.',
    'aeo-from-invisible-to-cited':
      'A practical guide to building websites that AI answer engines can find, understand, cite, and use — from structured data and markdown endpoints to MCP server cards, WebMCP, and agent-readiness scoring.',
    'working-with-agents':
      'From writing code to orchestrating AI agents — exploring the new role, real workflows, what breaks, judgment, context, and team adoption.',
    'building-agents':
      'What it actually takes to go from using AI tools to engineering reliable agent systems — architecture, skills, and mental models behind real AI agents.',
    'the-library-of-tomorrow':
      "Reviews and reflections on sci-fi books, movies, and stories — where classic science fiction meets today's AI revolution. Born from a reading club inside the Pereira Tech Talks community.",
    'mastering-openclaw':
      'A deep dive into OpenClaw — the personal AI agent that lives on your machine, follows your rules, and gave rise to a new paradigm of local AI.',
    'learning-mobile-development':
      'An honest journey into mobile development — the state of the art, choosing tools, and learning to build for Android and iOS, documenting every step.',
    'slides-as-code':
      'A series exploring developer-oriented presentation tools, comparing alternatives, and documenting how to build a multilingual slide system inside a modern web framework.',
  },

  // Date formatting
  dateLocale: 'en-US',

  // Read more
  readMore: 'Read more',

  // Scroll to timeline
  scrollToTimeline: 'View Timeline',
  viewLabel: (label: string) => `View ${label}`,

  // 404 page
  notFoundPage: {
    title: 'Page Not Found',
    description:
      'The page you are looking for does not exist or has been moved. Explore the blog, portfolio, or head back to the homepage to keep browsing.',
    heading: 'Page Not Found',
    message:
      "Sorry, the page you are looking for doesn't exist or may have been moved. Try navigating back to the homepage or searching the blog.",
    backHome: 'Go back home',
    searchBlog: 'Read the methodology',
  },

  // Blog post engagement
  engagement: {
    // Share buttons
    shareTitle: 'Share this post',
    shareSeriesTitle: 'Share this series',
    shareOnTwitter: 'Share on X',
    shareOnLinkedIn: 'Share on LinkedIn',
    shareOnWhatsApp: 'Share on WhatsApp',
    copyLink: 'Copy link',
    linkCopied: 'Link copied!',

    // Newsletter
    newsletterTitle: 'Stay in the loop',
    newsletterDescription:
      'Get notified when I publish something new. No spam, unsubscribe anytime.',
    newsletterPlaceholder: 'your@email.com',
    newsletterButton: 'Subscribe',
    newsletterSubmitting: 'Subscribing...',
    newsletterSuccessTitle: 'You\u2019re subscribed!',
    newsletterSuccessMessage:
      'Thanks for subscribing. You\u2019ll hear from me when something new is published.',
    newsletterInvalidEmail: 'Please enter a valid email address.',
    newsletterAlreadySubscribed:
      'You\u2019re already subscribed. Thanks for being here!',
    newsletterResubscribe: 'Subscribe with a different email',
    newsletterPrivacy: 'No spam. Unsubscribe anytime.',

    // End-of-post CTA
    ctaTitle: 'Enjoyed this post?',
    ctaDescription:
      'Share it with your network or subscribe to get my latest posts delivered to your inbox.',
  },

  // Blog engagement (author + share)
  blogEngagement: {
    aboutAuthor: 'About the author',
    writtenBy: 'Written by',
  },

  // Errors
  searchError: 'An error occurred while searching. Please try again.',
  loadError: 'Failed to load search index. Please refresh the page.',
  retry: 'Try again',

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'The Deep Work Plan Methodology',
      description:
        'Five chapters from manifesto to archetypes: the principles, core loop, templates, skills, and adaptations behind Deep Work Plan.',
    },
    eyebrow: 'Methodology',
    title: 'The Deep Work Plan Methodology',
    intro:
      'Five chapters that take you from the philosophy behind Deep Work Plan to the practical loop, templates, and adaptations you use every day.',
    chapterLabel: 'Chapter',
    readChapter: 'Read chapter',
    prev: 'Previous',
    next: 'Next',
    backToIndex: 'All chapters',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan Specification',
      description:
        'The readable specification of the Deep Work Plan methodology: the DWP format, agent protocol, archetypes, documentation standard, and add-ons.',
    },
    eyebrow: 'Specification',
    title: 'Specification',
    intro:
      'The precise, readable specification of the methodology — the structures and protocols that humans and agents share.',
    tocTitle: 'On this page',
    backToIndex: 'All spec documents',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'The Deep Work Plan Kit',
      description:
        'Commands, adapters, presets, and examples that make the Deep Work Plan methodology runnable across agents and stacks.',
    },
    eyebrow: 'Kit',
    title: 'The Kit',
    intro:
      'Everything you need to run the methodology: the skill and its sub-skills, slash commands, agent adapters, onboarding presets, opt-in addons, and worked examples.',
    groups: {
      command: {
        title: 'Sub-skills & commands',
        description:
          'The skill router and its sub-skills (create, execute, refine, resume, status, onboard, author), plus the thin slash commands that delegate to them.',
      },
      adapter: {
        title: 'Adapters',
        description:
          'Thin per-agent integrations for Claude, Cursor, Codex, and more.',
      },
      preset: {
        title: 'Onboarding presets',
        description:
          'Per-stack reasoning guides the onboard flow uses to adapt docs, skills, and validation commands to your repository.',
      },
      example: {
        title: 'Examples',
        description: 'Worked, before-and-after walkthroughs.',
      },
      addon: {
        title: 'Addons (opt-in)',
        description:
          'Optional capabilities the onboard flow can layer onto a repo — never part of the AI-first baseline.',
      },
    },
    viewDetail: 'View details',
    backToIndex: 'Back to the kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan Examples',
      description:
        'Before-and-after walkthroughs showing the same engineering task with and without a Deep Work Plan.',
    },
    eyebrow: 'Examples',
    title: 'Examples',
    intro:
      'See the methodology in action — concrete, before-and-after walkthroughs of real engineering tasks.',
    viewExample: 'Read the walkthrough',
    backToGallery: 'All examples',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Quickstart — Deep Work Plan',
      description:
        'Install the skill, onboard your repository, then plan and execute with any agent — the steps that make your repository spec-driven and agent-pilotable.',
    },
    eyebrow: 'Quickstart',
    title: 'Start in minutes',
    intro:
      'Install the skill, onboard your repository, then plan and execute with any agent — the steps that make your repository spec-driven and agent-pilotable.',
    sequenceTitle: 'The adoption path',
    codeLabel: 'Terminal',
    orLabel: 'or',
    steps: [
      {
        title: 'Install the Deep Work Plan skill',
        description:
          'Add the skill to your repository — a router plus seven sub-skills (create, execute, refine, resume, status, onboard, author). Use the Skills CLI for the fastest path, or clone the repo and run setup where git and a shell are available.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Onboard the repository',
        description:
          'Run the onboard sub-skill and let the agent reason about your actual repo. It generates AGENTS.md, a docs/ knowledge base, per-module docs, and a cross-agent .agents/ home (with the .claude → .agents symlink), wires the thin dwp-* commands, and scaffolds a gitignored .dwp/.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolve the kit and accept addons',
        description:
          'Use /skill-create and /agent-create (the author sub-skill) to grow stack-appropriate skills, agents, and commands. Onboarding also offers three opt-in addons — devcontainer, Dailybot, and dependency-upgrade — that you accept only when they fit.',
      },
      {
        title: 'Plan and execute',
        description:
          'Generate a Deep Work Plan and run it task by task, validating each gate and resuming across sessions — piloting the repository against its own spec.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'The outcome',
    outcome:
      'Your repository becomes spec-driven and agent-pilotable: the plan is the durable source of truth, and the repository itself becomes the harness any agent runs against.',
    nextStepsTitle: 'Next steps',
    nextSteps: [
      { label: 'Read the methodology', href: '/methodology' },
      { label: 'Browse the kit', href: '/kit' },
      { label: 'See examples', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Make your repository AI-first',
      description:
        'Adopt the Deep Work Plan methodology in any repository. Install the skill, run agent onboarding, then plan and execute with any AI coding agent.',
    },
    eyebrow: 'Adoption',
    title: 'Make this repository AI-first',
    intro:
      'One endpoint to turn any repository into a spec-driven, agent-ready codebase. Install the skill, let an agent onboard the repo, then plan and execute structured work with any coding agent.',
    handoffTitle: 'Give this to your agent',
    handoffBody:
      'Paste the line below into your AI coding agent. It will read the methodology and specification, install the skill, and onboard this repository for Deep Work Plans.',
    handoffInstruction:
      'Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.',
    handoffMdLabel: 'Self-contained agent prompt',
    codeLabel: 'agent',
    whatTitle: 'What this does',
    whatBody: [
      'Adoption changes the repository in two durable ways — the pillars of the methodology.',
      'First, the repository becomes spec-driven: work begins from a written plan and specification, not from ad-hoc prompts. Second, the repository itself becomes the agent harness — an AGENTS.md, a docs/ knowledge base, per-module docs, and a .agents/ skill home (with the .claude → .agents symlink) give every agent the context and commands it needs.',
    ],
    sequenceTitle: 'The adoption sequence',
    orLabel: 'or',
    steps: [
      {
        title: 'Install the skill',
        description:
          'Add the Deep Work Plan skill so any agent can plan and execute structured work. The skill ships a router plus seven sub-skills — create, execute, refine, resume, status, onboard, and author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Run repository onboarding',
        description:
          'Invoke the onboard sub-skill and let the agent reason about the actual repo — its stack, package manager, and real validation commands. It then generates AGENTS.md, a docs/ knowledge base, per-module docs, and a cross-agent .agents/ home (with the .claude → .agents symlink), wires the thin dwp-* commands, and scaffolds a gitignored .dwp/ for plans and drafts. Nothing is templated; everything is adapted to your repository.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolve the kit and accept addons',
        description:
          'Use /skill-create and /agent-create (the author sub-skill) to grow stack-appropriate skills, agents, and commands. Onboarding also offers three opt-in addons — devcontainer, Dailybot, and dependency-upgrade — that you accept only when they fit. A repo is fully conformant with zero addons.',
      },
      {
        title: 'Plan and execute',
        description:
          'Generate Deep Work Plans with /dwp-create and run them with /dwp-execute, then /dwp-status, /dwp-refine, and /dwp-resume as work proceeds. Each plan carries numbered tasks, validation gates, and a completion protocol so work stays structured, reviewable, and resumable across sessions.',
      },
    ],
    outcomeTitle: 'The outcome',
    outcome:
      'The repository becomes spec-driven and the repository itself becomes the agent harness — context and commands travel with the code.',
    nextStepsTitle: 'Read next',
    nextSteps: [
      { label: 'Quickstart', href: '/quickstart' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Spec', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },
};
