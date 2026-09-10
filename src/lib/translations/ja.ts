/**
 * ja translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const ja: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — AIコーディングエージェントのための構造化された実行',
  siteDescription:
    'Deep Work Plan: 構造化され、検証可能で、再開できる複数時間にわたるAIエージェント実行のためのオープンな方法論とリファレンスキット。',

  // Navigation
  nav: {
    home: 'ホーム',
    about: '概要',
    contact: 'お問い合わせ',
    // Deep Work Plan IA
    methodology: '方法論',
    spec: '仕様',
    kit: 'キット',
    examples: '事例',
    init: 'Init',
    quickstart: 'クイックスタート',
    trust: '信頼',
    developers: '開発者',
    privacy: 'プライバシー',
    github: 'GitHub',
    repo: {
      label: 'ソースコード',
      website: 'ウェブサイトのリポジトリ',
      websiteDesc: 'このサイト',
      skill: 'スキルのリポジトリ',
      skillDesc: 'インストール可能なスキル',
    },
    menu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'All rights reserved.',
    poweredBy: 'Powered by',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'New',
    text: 'Deep Work Plan が本日 Product Hunt に登場',
    tagline: 'エージェントに計画を',
    linkText: '応援する',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'サイトナビゲーション',
    sections: {
      methodology: '方法論',
      getStarted: 'はじめる',
      project: 'プロジェクト',
      connect: 'つながる',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title:
        'Deep Work Plan — AIコーディングエージェントのための構造化された実行',
      description:
        'モデルよりもコンテキストが重要です。Deep Work Plan はあらゆるリポジトリを、どのコーディングエージェントでも長期にわたる作業をやり遂げられる構造化された環境へと変えます。',
    },
    hero: {
      badge: 'オープンな方法論 · MIT · エージェント非依存',
      title: 'モデルは重要です。',
      titleEmphasis: 'コンテキストはさらに重要です。',
      subtitle:
        'Deep Work Plan はあらゆるリポジトリを、コンテキスト、ガードレール、そして永続的な計画を備えた構造化された環境へと変えます。そこではどのコーディングエージェントも正確に実行し、長期にわたる作業をやり遂げます。',
      instructionLabel: 'エージェントにコピーする',
      instruction:
        'init.md のプロンプトをコピーして、お使いのコーディングエージェント — Claude Code、Cursor、Codex、またはその他のツール — に貼り付けることで、あらゆるリポジトリを AI-first にします。',
      copyLabel: 'init.md をコピー',
      copiedLabel: 'コピーしました',
      viewInitCta: '完全な /init プロンプトを見る',
      pullQuote:
        'Deep Work Plan とは、リポジトリそのものがハーネス（harness）になる、仕様駆動開発です。',
      primaryCta: '方法論を読む',
      secondaryCta: '仕様を読む',
      illustrationAlt:
        '岩場の岸辺に立つ灯台が一筋の光で小舟を導く版画。どんなエージェントも導く安定したハーネスとしてのリポジトリを想起させる。',
      scrollCta: '仕組みを見る',
    },
    pitch: {
      kicker: '問題と答え',
      problem:
        'AIコーディングエージェントは短い作業では非常に有能です。長期の作業——移行、新しいサブシステム、大規模なリファクタリング——では、コンテキストが満杯になり、判断は失われ、数時間に及ぶタスクが中途で止まります。',
      answer:
        'Deep Work Planは仕様駆動開発で応えます。永続する計画、原子タスク、そしてエージェントが通過すべき検証ゲート。「完了」は気分ではなく——検証可能でレビューできる証拠になります。',
      efficiency:
        'コンテキストはエージェントにとって最も希少な資源です。だからハーネスはトークン効率のために設計されています：指示は段階的に読み込み、検証は変更された箇所だけに触れ、学習はタスクごとに記録——長期の作業でも経済的に続きます。',
      illustrationAlt:
        '彫版の二連作：片側は霧の中で岩場に漂う船、もう片側は同じ船が描かれた航路に沿って港の灯台へ穏やかに進む様子。',
    },
    story: {
      act1: {
        kicker: '方法論 · 第一幕',
        lead: '「完了」の意味と境界線を決めるのは人です。計画が意図を担い、エージェントが時間を担います。常時の監視も、二十分ごとの修正も不要です。',
        deepLinkLabel: '方法論を読む',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: '方法論 · 第二幕',
        lead: '長いタスクはどんなモデルのコンテキストを埋め尽くします。詳細は失われ、エージェントはドリフトします。書かれた計画——原子タスク、検証ゲート、再開可能な状態こそが、周回ごとに立ち返る拠り所です。',
        deepLinkLabel: 'コアループを見る',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: '方法論 · 第三幕',
        lead: '各タスクは受け入れ基準と、通過すべき検証を明記します。エージェントが「完了した気分」で終わることはできません。通過するか、タスクは開いたままです。',
        deepLinkLabel: '仕様を読む',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: '方法論 · 第四幕',
        lead: 'コンテキスト、ツール、ガードレール、状態は、どんなエージェントも読めるプレーンなファイルとしてリポジトリに宿ります。ロックインも外部ブレインもなく、コンテキストのリセットをまたいで生き残ります。',
        deepLinkLabel: 'オンボーディングの生成物を見る',
        deepLinkHref: '/quickstart',
      },
    },
    onboarding: {
      badge: '推論にもとづくオンボーディング',
      title:
        'どのリポジトリに向けても機能します。コピー＆ペーストではなく、推論します。',
      subtitle:
        'オンボーディングのフローは、リポジトリの実際の言語、フレームワーク、パッケージマネージャー、検証コマンドを調べ、そのリポジトリに適応させた成果物を生成します。汎用的なひな形は失敗とみなされます。',
      steps: [
        {
          title: 'スタックとアーキタイプを推論する',
          description:
            'マニフェスト、フォルダ構成、CI を読み取り、実際のテスト、リント、ビルドのコマンドを推測し、そのリポジトリを個別リポジトリかオーケストレーターハブかに分類します。',
        },
        {
          title: 'AGENTS.md、docs/、モジュールごとのドキュメントを生成する',
          description:
            '推論にもとづく AGENTS.md、分類された docs/ 階層、そして主要モジュールごとの README と docs/ を生成します。プレースホルダーではなく、リポジトリの実際のコマンドが書き込まれます。',
        },
        {
          title:
            '.claude と .cursor のシンボリックリンクとともに .agents/ を整備する',
          description:
            'エージェント横断の .agents/ ディレクトリ（スキル、エージェント、コマンド）と .claude および .cursor から .agents へのシンボリックリンクを作成し、すべてのツールが単一の信頼できる情報源を読みます。',
        },
        {
          title: 'DWP スキルをインストールし、.dwp/ を整備する',
          description:
            'Deep Work Plan スキルを組み込み、計画とドラフトのための gitignore された .dwp/ フォルダを作成します。その後、devcontainer サポートなどのオプトイン式アドオンを任意で重ねられます。',
        },
      ],
    },
    quickstart: {
      badge: '実行したときに起こること',
      title: '指示は一つ。あとはリポジトリがやり遂げます。',
      subtitle:
        'インストール方法を選んだり、テンプレートをコピーしたりする必要はありません。エージェントに一行を渡すだけで、再利用可能なエンジンであるスキルをインストールし、リポジトリをそれに適応させます。',
      steps: [
        {
          title: 'エージェントが /init.md を開く',
          description:
            'deepworkplan.com/init.md にあるオンボーディングプロンプトと、そこからリンクされた方法論、仕様、キット（これから採用する標準）を読み込みます。',
        },
        {
          title: 'Deep Work Plan スキルをインストールする',
          description:
            'スキルはエンジンであり、どのリポジトリでも同じものです。一つのコマンドで、ルーターとそのサブスキル（create、execute、refine、resume、status、verify、onboard、author）が Claude Code、Cursor、Codex、Gemini、Copilot 向けに取り込まれます。',
        },
        {
          title: 'リポジトリを適応させる',
          description:
            'コピー＆ペーストではなく実際のスタックを推論し、AGENTS.md、分類された docs/ ツリー、モジュールごとの README、推論にもとづく .agents/ キット、そして gitignore された .dwp/ を書き出します。こうしてリポジトリ自体がハーネスになります。',
        },
        {
          title: '計画して実行する',
          description:
            'あらゆるタスクに対して長期にわたる Deep Work Plan を生成し、明示的な受け入れ基準、検証ゲート、再開可能な状態とともに、ステップごとに実行します。自律的に、何時間でも。',
        },
      ],
      note: 'スキルはどこでも同一にインストールされます。適応されるのはリポジトリ側、つまりあなたのスタック向けに生成される AGENTS.md、ドキュメント、推論にもとづく .agents/ キットです。この切り分けこそが、この方法論を一度きりの足場ではなく再利用可能な標準にしています。',
    },
    outcomes: {
      badge: '得られるもの',
      title: 'エージェントが自律的に働くために必要なものすべて。',
      subtitle:
        '一度の実行で、アトミックにコミットされます。すべての出力は Markdown であり、すべての変更は監査可能です。',
      items: [
        {
          label: 'リポジトリのルートにある AGENTS.md',
          detail:
            'プレースホルダー入りのテンプレートではなく、リポジトリの実際のスタック、コマンド、構造から推論されます。CLAUDE.md は AGENTS.md にシンボリックリンクされます。',
        },
        {
          label: '分類された docs/ とモジュールごとのドキュメント',
          detail:
            'アーキテクチャ、セットアップ、規約、トラブルシューティングに加え、主要モジュールごとの README と docs/ を、コードベースから生成します。',
        },
        {
          label:
            '.claude と .cursor から .agents へのシンボリックリンクを備えた .agents/',
          detail:
            'エージェント横断の .agents/ ディレクトリ（スキル、エージェント、コマンド）に .claude および .cursor から .agents へのシンボリックリンクを備え、すべてのツールが単一の信頼できる情報源を読みます。',
        },
        {
          label: 'インストール済みの Deep Work Plan スキル',
          detail:
            'create、execute、refine、resume、status、verify、onboard、author を、リポジトリごとに複製することなく、単一のスキルパックとしてエージェントが利用できます。',
        },
        {
          label: '確認できる適合性',
          detail:
            '/dwp-verify が仕様に照らした客観的な合否レポートを生成するため、「AI-first」は主張ではなく検証され、各計画のあとに再検証できます。',
        },
        {
          label: '二つのアーキタイプに対応',
          detail:
            'オンボーディングは、リポジトリを個別リポジトリ（一般的なケース）か、リポジトリをまたいで子計画を調整するオーケストレーターハブかに分類します。',
        },
        {
          label: 'リポジトリとともに育つ生きたキット',
          detail:
            'author サブスキル（skill-create、agent-create）により、リポジトリは独自のスキル、エージェント、コマンドを進化させられます。dependency-upgrade などのオプトイン式メンテナンスアドオンが、最新の状態を保つ手助けをします。',
        },
        {
          label: 'Git ネイティブ、再開可能、.dwp/',
          detail:
            'デーモンも外部状態もありません。計画とドラフトは gitignore された .dwp/ フォルダに置かれ、どのタスクも git だけから再開できます。コンテキストが溢れたあとでも。',
        },
      ],
    },
    agents: {
      badge: 'エージェント',
      title: 'すでにお使いのエージェントで動きます。',
      subtitle:
        '一つの方法論に、多数のアダプター。Markdown はフレームワークをどこにも結びつけません。Markdown を読めるすべてのエージェントが Deep Work Plan を実行できます。',
      fullLabel: '完全',
      partialLabel: '部分的',
      viewAllCta: 'すべてのエージェントを見る',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'リファレンス実装。ネイティブの WebFetch とスラッシュコマンドを備えます。',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: '完全なアダプター。WebFetch が制限されている場合はオフラインバンドルを使用します。',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'オフラインバンドルを推奨。ルールは .codex/ 配下にインストールされます。',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: '完全なアダプター。dwp-* コマンドは AGENTS.md と # 手順を通じて実行されます。',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Gemini 2.5 Pro 以降が必要で、ネイティブの WebFetch を備えます。',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'オープンソース。AGENTS.md をネイティブに読み込み、dwp-* を # コマンドで実行します。',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'ルールと # コマンド手順が Deep Work Plan の完全なループを駆動します。',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'オープンソース。Markdown ルールと # コマンドがすべての dwp-* ステップを実行します。',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'ネイティブなコマンド面を備えた完全なアダプター。',
        },
      ],
    },
    stacks: {
      badge: 'スタック',
      title: '重要なスタックのための推論プリセット。',
      viewAllCta: 'すべてのプリセットを見る',
      subtitle:
        'これらはテンプレートではなく推論の補助です。オンボーディングはリポジトリの実際のマニフェストを読み、スタックごとに適応します。プリセットをそのまま盲目的にコピーすることはありません。モノレポにはモジュールごとのドキュメントが用意されます。',
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
        { name: 'Generic', sub: 'あらゆるスタック' },
      ],
    },
    archetypes: {
      badge: '二つのアーキタイプ',
      title: '個別リポジトリ、またはオーケストレーターハブ。',
      subtitle:
        'オンボーディングはアーキタイプによって分岐します。ほとんどのリポジトリは個別リポジトリです。ハブは多数のリポジトリにまたがって子 Deep Work Plan を調整します。この方法論は両者をいずれも一級市民として扱います。',
      individual: {
        tag: '一般的なケース',
        title: '個別リポジトリ',
        description:
          '一つの主要スタック、独自の検証コマンド、そしてモジュールごとのドキュメントを持つ単一のコードベース。これが既定であり、リポジトリが明らかにハブでない限り、オンボーディングはこれを前提とします。',
        example:
          'たとえば、Django の API、Vue のアプリ、TypeScript の Lambda サービスなど。',
      },
      orchestrator: {
        tag: '調整',
        title: 'オーケストレーターハブ',
        description:
          'オーケストレーターマニフェストを介して複数のサブリポジトリにまたがる作業を統括する調整用リポジトリ。子計画を生成し、それぞれが自身のリポジトリでコミットします。境界ルールとナビゲーション索引も備えます。',
        example: 'たとえば、五つのプロダクトリポジトリを調整するハブなど。',
      },
    },
    comparison: {
      badge: '方法論かツールか',
      title: '異なるレイヤー。競合ではなく補完。',
      subtitle:
        'Deep Work Plan はもう一つの足場生成ツールではありません。複数時間にわたる自律実行に焦点を当て、あらゆる仕様駆動ツールや足場生成ツールの下に位置する方法論のレイヤーです。',
      colDwp: 'Deep Work Plan',
      colOthers: '足場生成 / 仕様ツール',
      rows: [
        {
          label: '主な焦点',
          dwp: '複数時間にわたる自律実行',
          others: '仕様または足場の生成',
        },
        {
          label: '作業の単位',
          dwp: 'Deep Work Plan（再開可能なセッション）',
          others: '仕様ドキュメントまたは足場',
        },
        {
          label: '状態モデル',
          dwp: 'Git ネイティブの .dwp/ フォルダ、再開可能',
          others: '多くは外部または IDE 内',
        },
        {
          label: 'エージェントとの結合',
          dwp: 'エージェント非依存（Markdown と Bash）',
          others: '多くはツールまたは IDE 固有',
        },
        {
          label: 'コンテキストの回復',
          dwp: 'コンテキストの溢れ後に再開',
          others: '通常はタスクを最初からやり直す',
        },
        {
          label: 'ライセンス',
          dwp: 'MIT、オープンな方法論とキット',
          others: 'まちまち',
        },
      ],
    },
    origin: {
      badge: '由来',
      quote:
        '分散チームのための非同期スタンドアップを手がける Dailybot によって作られました。社内では Deep Work Plan を用いて、Django、Vue、TypeScript Lambda、Astro にまたがる本番リポジトリをエージェントが操縦できる状態にしました。数か月にわたる本番運用を経て、この方法論を MIT ライセンスのもとでオープンソース化しました。',
      attribution: 'Dailybot エンジニアリングチーム',
      dailybotCta: 'Dailybot について知る',
    },
    finalCta: {
      badge: 'リポジトリを AI-first にする',
      title: 'エージェントにディープワークを。',
      subtitle:
        'エージェントに一行を渡し、/init.md に向けるだけで、リポジトリが AI-first になります。スキルをインストールし、スタックを推論し、完全な AGENTS.md 階層をコミットします。そこから、何時間も自律的に走る Deep Work Plan を作成し、実行できます。',
      primaryCta: '/init プロンプトを開く',
      secondaryCta: '方法論を読む',
      tertiaryCta: 'エージェントと開発者向け',
      meta: 'MIT ライセンス · テレメトリーなし · 出力は gitignore された .dwp/ フォルダへ。',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'お問い合わせ',
    nameLabel: 'お名前',
    namePlaceholder: 'お名前',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'メッセージ',
    messagePlaceholder: 'メッセージをご記入ください...',
    sendButton: 'メッセージを送信',
  },

  // About page
  aboutPage: {
    title: '方法論について',
    subtitle: 'オープンな方法論 · MIT ライセンス',
    description:
      'Deep Work Plan は、AIコーディングエージェントによる本格的なエンジニアリング作業のための、フレームワーク非依存のオープンな方法論です。その起源と、誰が維持しているか。',
    heroDescription:
      'AIコーディングエージェントとともにディープワークを計画し、実行し、検証するための、再現可能な構造。オープンに作られ、自由に使えます。',
    bioTitle: 'これは何か',
    bioText:
      'Deep Work Plan（DWP）はプロダクトではなく方法論です。目標を合意済みの計画へと変え、その計画をアトミックで個別に検証可能なタスクに分解し、各タスクをチェックで締めくくる集中ループで実行する方法を定義します。<br /><br />どのAIエージェントやスタックを使うかについては意図的に非依存です。アダプターが同じ中核ループを Claude、Cursor、Copilot、Codex、Gemini などに変換します。計画、タスク、実行ログはすべてプレーンな Markdown であり、作業は読みやすく、レビュー可能で、バージョン管理されたまま保たれます。',
    passionsTitle: '中核原則',
    passions: [
      {
        title: '実行の前に計画する',
        description:
          '計画が合意されるまでコードは書きません。計画はあなたとエージェントのあいだの契約です。',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'タスクはアトミックである',
        description:
          '各タスクは単独で実行し検証できる範囲に区切られ、アトミックにコミットされます。',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'すべてを検証する',
        description:
          '各タスクは次のタスクが始まる前に明示的なチェックで締めくくられ、進捗は git に記録されます。',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: '一目でわかる',
    quickFacts: [
      'オープンな方法論、MIT ライセンス',
      'フレームワーク・エージェント非依存',
      'Dailybot とコミュニティによって維持',
      '仕様、コマンド、アダプター、プリセット、事例を含む',
      'Markdown のみ — ランタイムなし、ロックインなし',
      'あらゆるリポジトリを AI-first でエージェントが操縦できるコードベースに変える',
    ],
    ctaTitle: '誰が維持しているか',
    ctaDescription:
      'Deep Work Plan は Dailybot での実際のエンジニアリング作業から生まれ、現在は Dailybot とオープンソースコミュニティによって共同で維持されています。方法論、仕様、キットは MIT ライセンスのもとで公開されており、自由に使い、適応させ、その上に構築できます。',
    ctaCv: '方法論を読む',
    ctaContact: 'クイックスタート',
  },

  // Contact page
  contactPage: {
    title: 'コミュニティとお問い合わせ',
    subtitle: 'オープンソース · コミュニティ主導',
    description:
      'Deep Work Plan はオープンに作られています。ソースを見つけ、Issue を立て、あるいは以下のチャネルから会話に参加してください。コントリビューションを歓迎します。',
    heroDescription:
      '質問、アイデア、改善案はありますか。Deep Work Plan は公の場で開発されています。プロジェクトとそのメンテナーへの連絡先はこちらです。',
    formTitle: 'メッセージを送る',
    nameLabel: 'お名前',
    namePlaceholder: 'お名前',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'お問い合わせの目的',
    reasonOptions: [
      { value: '', label: '— トピックを選択 —' },
      { value: 'general', label: '一般 / ごあいさつ' },
      { value: 'tech-talk', label: 'テックトーク / 登壇のご依頼' },
      { value: 'collaboration', label: 'コラボレーション / 提携' },
      { value: 'project', label: 'プロジェクト / 業務のお問い合わせ' },
      { value: 'dailybot', label: 'Dailybot についての質問' },
      { value: 'trading', label: 'トレーディングについての質問' },
      {
        value: 'the-library-of-tomorrow',
        label: 'The Library of Tomorrow に参加する',
      },
      { value: 'other', label: 'その他' },
    ],
    subjectLabel: '件名',
    subjectPlaceholder: 'どのような件でしょうか',
    messageLabel: 'メッセージ',
    messagePlaceholder: 'メッセージをご記入ください...',
    sendButton: 'メッセージを送信',
    sendingButton: '送信中...',
    successTitle: 'メッセージを送信しました',
    successMessage:
      'お問い合わせいただきありがとうございます。できるだけ早くご返信いたします。',
    sendAnotherButton: 'もう一通送る',
    requiredField: 'この項目は必須です',
    invalidEmail: '有効なメールアドレスを入力してください',
    fallbackMessage:
      'お問い合わせフォームは現在ご利用いただけません。メールで直接ご連絡いただけます。',
    fallbackEmailText: 'メールはこちらへ',
    formNote: 'できるだけ早くご返信いたします。',
    socialTitle: 'つながる',
    locationTitle: '所在地',
    locationText:
      'コロンビアを拠点としています。世界中のリモートでのコラボレーションを歓迎します。',
    prefillSubjects: {
      generalInquiry: '一般的なお問い合わせ',
      collaboration: 'コラボレーションの機会',
      projectInquiry: 'プロジェクトまたは業務のお問い合わせ',
      projectCollaboration: 'プロジェクトコラボレーションのお問い合わせ',
      startupCollaboration: 'スタートアップコラボレーションの機会',
      techTalkInvitation: 'テックトーク登壇のご依頼',
      tradingQuestion: 'トレーディングについての質問',
      dailybotQuestion: 'Dailybot についての質問',
    },
  },

  contactSection: {
    title: 'つながりましょう',
    description:
      '興味深い対話、コラボレーションの機会、新しいアイデアにはいつでも開かれています。技術や起業について語りたい方も、ただごあいさつしたい方も、どうぞお気軽に。',
    ctaText: '連絡する',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'ja-JP',

  // 404 page
  notFoundPage: {
    title: 'ページが見つかりません',
    description:
      'お探しのページは存在しないか、移動されました。方法論を見るか、ホームページに戻って閲覧を続けてください。',
    heading: 'ページが見つかりません',
    message:
      '申し訳ありません。お探しのページは存在しないか、移動された可能性があります。ホームページに戻るか、方法論を見てみてください。',
    backHome: 'ホームに戻る',
    exploreMethodology: '方法論を読む',
    agentTitle: 'AI エージェント向け',
    agentIntro:
      'このパスは存在しません。下のリカバリーリンク（とその機械可読な等価物）に、このサイトのすべてのページが列挙されています。',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Deep Work Plan の方法論',
      description:
        'マニフェストからアーキタイプまでの五つの章。Deep Work Plan を支える原則、中核ループ、テンプレート、スキルとエージェント、そして適応のしくみ。',
    },
    eyebrow: '方法論',
    title: 'Deep Work Plan の方法論',
    intro:
      'Deep Work Plan を支える哲学から、日々使う実践的なループ、テンプレート、適応へと導く五つの章。',
    chapterLabel: '章',
    readChapter: '章を読む',
    prev: '前へ',
    next: '次へ',
    backToIndex: 'すべての章',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan の仕様',
      description:
        'Deep Work Plan 方法論の読める仕様。DWP のフォーマット、エージェントプロトコル、アーキタイプ、ドキュメント標準、アドオン。',
    },
    eyebrow: '仕様',
    title: '仕様',
    intro:
      'この方法論の正確で読みやすい仕様。人とエージェントが共有する構造とプロトコル。',
    tocTitle: 'このページの目次',
    prev: '前へ',
    next: '次へ',
    backToIndex: 'すべての仕様ドキュメント',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Deep Work Plan のキット',
      description:
        'スキルとその八つのサブスキル、コマンド、アダプター、プリセット、オプトイン式アドオン、そして事例。Deep Work Plan をエージェントとスタックをまたいで実行可能にします。',
    },
    eyebrow: 'キット',
    title: 'キット',
    intro:
      'この方法論を実行するために必要なものすべて。スキルとそのサブスキル、スラッシュコマンド、エージェントアダプター、オンボーディングプリセット、オプトイン式アドオン、そして実例つきのウォークスルー。',
    groups: {
      command: {
        title: 'サブスキルとコマンド',
        description:
          'スキルのルーターとそのサブスキル（create、execute、refine、resume、status、verify、onboard、author）、およびそれらに委譲する薄いスラッシュコマンド。',
      },
      adapter: {
        title: 'アダプター',
        description:
          'Claude、Cursor、Codex などのための、エージェントごとの薄い統合。',
      },
      preset: {
        title: 'オンボーディングプリセット',
        description:
          'onboard フローがドキュメント、スキル、検証コマンドをリポジトリに適応させるために使う、スタックごとの推論ガイド。',
      },
      example: {
        title: '事例',
        description: '実例つきの、ビフォー・アフターのウォークスルー。',
      },
      addon: {
        title: 'アドオン（オプトイン）',
        description:
          'onboard フローがリポジトリに重ねられる任意の機能。AI-first の基本構成には決して含まれません。',
      },
    },
    viewDetail: '詳細を見る',
    prev: '前へ',
    next: '次へ',
    backToIndex: 'キットに戻る',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan の事例',
      description:
        '同じエンジニアリング作業を Deep Work Plan ありとなしで比較するビフォー・アフターのウォークスルー。信頼性とレビューの違いを示します。',
    },
    eyebrow: '事例',
    title: '事例',
    intro:
      '方法論が実際に動くようすを見てください。実際のエンジニアリング作業の、具体的でビフォー・アフター形式のウォークスルー。',
    viewExample: 'ウォークスルーを読む',
    prev: '前へ',
    next: '次へ',
    backToGallery: 'すべての事例',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'クイックスタート — Deep Work Plan',
      description:
        'スキルをインストールし、リポジトリをオンボーディングし、どのエージェントでも計画して実行する。リポジトリを仕様駆動でエージェントが操縦できる状態にする手順。',
    },
    eyebrow: 'クイックスタート',
    title: '数分で始める',
    intro:
      'スキルをインストールし、リポジトリをオンボーディングし、どのエージェントでも計画して実行する。リポジトリを仕様駆動でエージェントが操縦できる状態にする手順。',
    sequenceTitle: '採用への道のり',
    codeLabel: 'ターミナル',
    orLabel: 'または',
    steps: [
      {
        title: 'Deep Work Plan スキルをインストールする',
        description:
          'スキルをリポジトリに追加します。ルーターと八つのサブスキル（create、execute、refine、resume、status、verify、onboard、author）です。最速の方法には Skills CLI を使うか、リポジトリをクローンして git とシェルが使える環境でセットアップを実行します。',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'リポジトリをオンボーディングする',
        description:
          'onboard サブスキルを実行し、エージェントに実際のリポジトリを推論させます。AGENTS.md、docs/ のナレッジベース、モジュールごとのドキュメント、そしてエージェント横断の .agents/ 拠点（.claude → .agents および .cursor → .agents シンボリックリンクつき）を生成し、薄い dwp-* コマンドを配線し、gitignore された .dwp/ を整備します。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'キットを進化させ、アドオンを受け入れる',
        description:
          '/skill-create と /agent-create（author サブスキル）を使って、スタックに合ったスキル、エージェント、コマンドを育てます。オンボーディングは五つのオプトイン式アドオン（devcontainer、Dailybot、dependency-upgrade、design-system、AI Diff Reviewer）も提案します。適合する場合にのみ受け入れてください。',
      },
      {
        title: '計画して実行する',
        description:
          'Deep Work Plan を生成し、各ゲートを検証しセッションをまたいで再開しながら、タスクごとに実行します。リポジトリを自身の仕様に照らして操縦します。',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: '成果',
    outcome:
      'リポジトリが仕様駆動でエージェントが操縦できる状態になります。計画が永続的な信頼できる情報源となり、リポジトリそのものが、どのエージェントも照らして走るハーネスになります。',
    nextStepsTitle: '次のステップ',
    nextSteps: [
      { label: '方法論を読む', href: '/methodology' },
      { label: 'キットを見る', href: '/kit' },
      { label: '事例を見る', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — リポジトリを AI-first にする',
      description:
        'あらゆるリポジトリで Deep Work Plan 方法論を採用する。スキルをインストールし、エージェントのオンボーディングを実行し、どのAIコーディングエージェントでも計画して実行します。',
    },
    eyebrow: '採用',
    title: 'このリポジトリを AI-first にする',
    intro:
      'あらゆるリポジトリを、仕様駆動でエージェント対応のコードベースに変える単一のエンドポイント。スキルをインストールし、エージェントにリポジトリをオンボーディングさせ、どのコーディングエージェントでも構造化された作業を計画して実行します。',
    handoffTitle: 'エージェントにコピーする',
    handoffBody:
      '完全な init.md プロンプトをコピーして、お使いの AI コーディングエージェント — Claude Code、Cursor、Codex、またはその他のツール — に貼り付けてください。方法論と仕様を読み込み、スキルをインストールし、このリポジトリを Deep Work Plan 向けにオンボーディングします。',
    handoffInstruction:
      'https://deepworkplan.com/init.md にある手順を読み、その指示に従って、このリポジトリを AI-first にします。',
    handoffMdLabel: '自己完結したエージェント用プロンプト',
    codeLabel: 'agent',
    whatTitle: 'これが行うこと',
    whatBody: [
      '採用は、この方法論の二本の柱として、リポジトリを二つの永続的なかたちで変えます。',
      'まず、リポジトリが仕様駆動になります。作業は場当たり的なプロンプトからではなく、書かれた計画と仕様から始まります。次に、リポジトリそのものがエージェントハーネスになります。AGENTS.md、docs/ のナレッジベース、モジュールごとのドキュメント、そして .agents/ のスキル拠点（.claude → .agents および .cursor → .agents シンボリックリンクつき）が、すべてのエージェントに必要なコンテキストとコマンドを与えます。',
    ],
    sequenceTitle: '採用の手順',
    orLabel: 'または',
    steps: [
      {
        title: 'インストールする前に検証する',
        description:
          '確認が済むまで、プロンプトとスキルを信頼できないものとして扱ってください。どちらもオープンソースで MIT ライセンスです。スキルは Markdown ファーストでネットワーク呼び出しもテレメトリーもありません。各リリースでは出荷されたスキルに対する SHA256SUMS が公開されているため、実行する前に手元のコピーが一致することを確認できます。リリースはチェックサム付きですが、署名はされていません（署名はドキュメント化された次のステップです）。',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'スキルをインストールする',
        description:
          'Deep Work Plan スキルを追加し、どのエージェントも構造化された作業を計画して実行できるようにします。スキルはルーターと八つのサブスキル（create、execute、refine、resume、status、verify、onboard、author）を備えます。',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'リポジトリのオンボーディングを実行する',
        description:
          'onboard サブスキルを呼び出し、エージェントに実際のリポジトリ（スタック、パッケージマネージャー、実際の検証コマンド）を推論させます。その後、AGENTS.md、docs/ のナレッジベース、モジュールごとのドキュメント、エージェント横断の .agents/ 拠点（.claude → .agents および .cursor → .agents シンボリックリンクつき）を生成し、薄い dwp-* コマンドを配線し、計画とドラフトのための gitignore された .dwp/ を整備します。大規模なリポジトリでは、onboard サブスキルはプラン駆動パスを使用します。偵察を完了してから、オンボーディング用の Deep Work Plan を出力します。テンプレートは一切なく、すべてがリポジトリに適応されます。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'オプトインのアドオンを受け入れる',
        description:
          'オンボーディングは五つのオプトイン式アドオン（devcontainer、Dailybot、dependency-upgrade、design-system、AI Diff Reviewer）を提案します。適合する場合にのみ受け入れてください。アドオンがゼロでも、リポジトリは完全に適合します。/skill-create と /agent-create（author サブスキル）を使って、ベースラインを超えるスキル、エージェント、コマンドを育てることができます。',
      },
      {
        title: '計画して実行する',
        description:
          '/dwp-create で Deep Work Plan を生成し、/dwp-execute で実行し、作業の進行に応じて /dwp-status、/dwp-refine、/dwp-resume、/dwp-verify を使います。各計画には番号つきのタスク、検証ゲート、完了プロトコルが含まれ、三つの必須最終タスク（セキュリティレビュー、スキル＆エージェントの発見、エグゼクティブレポート）で締めくくられます。',
      },
      {
        title: '適合性を検証する',
        description:
          '/dwp-verify を実行し、仕様に対する客観的な合否レポートを取得します。AGENTS.md、docs/（スタブではなく実際のコンテンツ）、.agents/（薄い dwp-* デリゲーターとディスクと一致するカタログを含む）、.dwp/、tmp/ が配置されていることを確認します。テンプレート的なものは何もなく、すべてがこのリポジトリのために推論されたものです。',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: '成果',
    outcome:
      'リポジトリが仕様駆動になり、リポジトリそのものがエージェントハーネスになります。コンテキストとコマンドがコードとともに移動します。',
    nextStepsTitle: '次に読む',
    nextSteps: [
      { label: 'クイックスタート', href: '/quickstart' },
      { label: '方法論', href: '/methodology' },
      { label: '仕様', href: '/spec' },
      { label: 'キット', href: '/kit' },
    ],
  },

  trustPage: {
    meta: {
      title: '信頼とセキュリティ',
      description:
        'なぜ Deep Work Plan は安心して採用できるのか：Open Source かつ MIT ライセンス、ネットワーク呼び出しやテレメトリーのない Markdown-first、設計上の非破壊性、検証可能なインストール、そして明確な脆弱性開示ポリシー。',
    },
    eyebrow: '信頼とセキュリティ',
    title: '信頼とセキュリティ',
    intro:
      '信頼できないスキルを誰もインストールすべきではありません。Deep Work Plan は信仰ではなく検証によって成り立つように設計されています。Open Source、Markdown-first、非破壊的で、実行する前に確認できます。このページでは、何をするか、何をしないか、そして両方をどう確かめるかを率直に述べます。',
    pillarsTitle: '何を信頼するのか',
    pillars: [
      {
        title: 'Open Source かつ MIT ライセンス',
        body: 'ウェブサイトもスキルも公開されており、diff 可能です。実行前にすべての行を読み、タグ付きリリースのソースと任意のコピーを比較できます。',
      },
      {
        title: 'Markdown-first — ネットワークなし、テレメトリーなし',
        body: 'スキルには CLI も HTTP API も認証フローもありません。ネットワーク呼び出しを一切行わず、テレメトリーも送信しません。唯一のローカルヘルパーは git と環境メタデータを読み取るだけです。リポジトリに関する情報がお使いのマシンの外に出ることはありません。',
      },
      {
        title: '設計上の非破壊性',
        body: 'スキルが行うセキュリティ上唯一関連する操作はリポジトリの変更ですが、それは上書きではなく調整です。既存のものを検出し、計画を提案し、何かを置き換える前に確認を求めます。計画の出力は gitignore された .dwp/ ディレクトリに保存されます。',
      },
      {
        title: '秘密情報に触れない',
        body: 'この方法論は決して秘密情報をコミットせず、作業状態をバージョン管理の外に置きます。オンボーディングは .gitignore を書き換えるのではなく追記し、すべての変更は小さく読みやすい diff でレビューできることを意図しています。',
      },
      {
        title: '検証可能な出所',
        body: '各リリースには出荷されたスキルのチェックサムが公開されるため、信頼する前にダウンロードしたコピーが公開内容と一致することを確認できます。',
      },
    ],
    verifyTitle: '実行前に検証する',
    verifyIntro:
      '確認が済むまでスキルを信頼できないものとして扱ってください。各リリースには出荷されたスキルを対象とした SHA256SUMS ファイルが添付されています。インストールしたいバージョンのものをダウンロードし、コピーが一致することを確認してください — ゼロ以外の終了コードはファイルが一致しないことを意味するため、その場合は中止してください。',
    codeLabel: 'shell',
    verifyNote:
      'リリースはチェックサム付きですが、署名はされていません — 署名（cosign またはメンテナー GPG）は文書化された次のステップであり、現在の主張ではありません。すべてが公開されているため、任意のファイルをそのタグのリポジトリと diff で比較することもできます。',
    disclosureTitle: '脆弱性を報告する',
    disclosureBody:
      'セキュリティ上の問題を見つけましたか？公開 Issue を立てるのではなく、該当リポジトリ（スキルまたはウェブサイト。下記にリンクされたセキュリティポリシーを参照）で GitHub のプライベート脆弱性報告を通じてプライベートに報告してください。公開 Issue を立てると修正が存在する前に問題が露出します。',
    resourcesTitle: '信頼リソース',
    linkManifest: '機械可読の信頼マニフェスト',
    linkSecurityTxt: 'security.txt（RFC 9116）',
    linkPolicy: 'ウェブサイトのセキュリティポリシー',
    linkSkillPolicy: 'スキルのセキュリティポリシーと脅威モデル',
    limitationsTitle: '正直な制限事項',
    limitations: [
      'リリースはチェックサム付きですが、まだ暗号的に署名されていません — 署名は計画中であり、まだ完了していません。',
      'Deep Work Plan はリポジトリに対して自律的なコーディングエージェントを実行します。提案された計画と diff を確認してください。この方法論はそのレビューのために設計されており、レビューを省くためのものではありません。',
      'ここでの信頼の主張は公式ソースのみを対象としています。リポジトリから乖離した改変済みまたはサードパーティのコピーには、これらの保証は一切ありません — まず検証してください。',
    ],
    ctaTitle: '自信を持って採用する',
    ctaBody:
      '方法論と仕様を読み、エージェントを init エンドポイントに向け、実行する前にインストールを検証してください。',
    ctaPrimary: '方法論を読む',
    ctaSecondary: '採用（Init）',
  },

  developersPage: {
    meta: {
      title:
        '開発者 — Deep Work Plan のエージェント API、MCP サーバーとドキュメント',
      description:
        'Deep Work Plan のエージェントサーフェス：OpenAPI 仕様付きの読み取り専用・認証不要 API、/api/mcp の MCP サーバー、17 言語のページ単位 Markdown、npx skills インストール CLI。',
    },
    eyebrow: 'エージェントと開発者のサーフェス',
    title: '開発者と AI エージェントのための Deep Work Plan',
    intro:
      'deepworkplan.com はページ群に加えて機械可読のサーフェスを提供します。OpenAPI で記述されたエージェント API、ステートレスな MCP サーバー、17 言語すべてのページをカバーするネイティブ Markdown ミラー、そしてインストール可能な DWP スキルです。このページのすべては本番環境で動作する公開・無料のものであり、登録は一切不要です。',
    accessTitle: '認証ゼロの設計',
    accessIntro:
      '生成すべき API キーも、OAuth の手順も、本番とは別のサンドボックスもありません——本番のサーフェス自体がサンドボックスです。これは方法論の意図的な性質です。エージェントは「営業に問い合わせる」フォームに記入できないため、このサイトがそのようなものを要求することは決してありません。',
    accessPoints: [
      {
        title: '読み取り専用',
        body: 'すべての操作は安全でキャッシュ可能な GET です——唯一の例外は POST を使う MCP エンドポイントです。書き込み操作、アップロード、状態変更はどこにも存在しません。',
      },
      {
        title: 'API キー不要',
        body: '登録なし、トークンなし、レート制限ティアなし。匿名アクセスが文書化された契約であり、/auth.md と OAuth ディスカバリスタブで宣言されています。',
      },
      {
        title: '無料かつオープンソース',
        body: 'サイトのコンテンツと DWP スキルは MIT ライセンスです。商用・非商用を問わず、許可を求めることなく利用できます。',
      },
      {
        title: 'マシンファースト',
        body: '/api パスでの構造化 JSON エラー、Markdown の 404 リカバリーボディ、RFC 9727 API カタログ、ARD 能力マニフェスト——エージェントによる利用のために構築されています。',
      },
    ],
    endpointsTitle: 'エンドポイント',
    endpointsIntro:
      'エージェント API の中核エンドポイントです。完全な型付き仕様（すべての操作、パラメータ、レスポンススキーマ）は OpenAPI ドキュメントにあります。',
    endpointsNote:
      '不明な /api/* パスは解決ヒント付きの構造化 JSON エラーを返し、HTML エラーページは決して返しません。',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'エージェント API 全体の OpenAPI 3.1 仕様。',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          '厳選された LLM ガイドインデックス——エージェントへの推奨入口。',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          '正規の DWP 採用プロンプト（任意のリポジトリを AI-first にする）。',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          '任意のページをネイティブのソース Markdown で——全 17 言語（例: /es/developers.md）。',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description: '仕様とこのポータルへのリンクを備えた静的ヘルスマーカー。',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP サーバー（Streamable HTTP、ステートレス）: initialize、ping、tools/list、tools/call。',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description: 'ARD 能力マニフェスト——robots.txt で宣言された agentmap。',
      },
    ],
    mcpTitle: 'MCP サーバー',
    mcpIntro:
      'Streamable HTTP 上のステートレスな Model Context Protocol サーバーです。読み取り専用の 3 つのツール: get_init_prompt、list_site_sections、read_page。プロトコルバージョン 2025-03-26 と 2025-06-18 をサポートしており、セッションは不要です。',
    mcpCodeLabel: 'ターミナル — HTTP 上の JSON-RPC',
    mcpNote:
      'MCP マニフェストは /.well-known/mcp.json に、サーバーカードは /.well-known/mcp/server-card.json にあります。Claude、ChatGPT、その他の MCP クライアントはこれらのツールをネイティブに呼び出せます。',
    markdownTitle: 'エージェントのための Markdown',
    markdownIntro:
      'レンダリングされるすべてのページは、HTML 変換ではなくネイティブのソース Markdown として公開されます。URL のサフィックスで明示的に Markdown を要求するか、任意のページで HTTP コンテンツネゴシエーションを利用してください。',
    markdownCodeLabel: 'ターミナル — コンテンツネゴシエーション',
    markdownNote:
      'コンテンツネゴシエーションは、サイトがレンダリングに使うのと同じソース Markdown を、要求した URL の言語で返します。',
    cliTitle: 'キットをインストール',
    cliIntro:
      'Deep Work Plan スキルの公式インストールパスです——/init エンドポイントがエージェントに与えるのと同じコマンドです。skills 互換の任意のコーディングエージェント（Claude Code、Cursor、Codex、Gemini など）で動作します。',
    cliCodeLabel: 'ターミナル — skills CLI',
    cliNote:
      'スキルはリポジトリ内の .agents/skills/deepworkplan/ にベンダーされるため、リポジトリを扱うすべてのエージェントが同じ方法論を共有します。',
    resourcesTitle: '機械可読リソース',
    resources: [
      { label: 'OpenAPI 仕様 (/openapi.json)', href: '/openapi.json' },
      {
        label: 'エージェントアクセスと認証宣言 (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'API カタログ、RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP マニフェスト (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'セキュリティ連絡先 (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'サイトリポジトリ記述子 (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'エージェントに向ける',
    ctaBody:
      '最速の道は依然として一行です。任意のコーディングエージェントに /init プロンプトを渡せば、スキルをインストールし、リポジトリをオンボードし、ディープワークを完了させ始めます。',
    ctaPrimary: '/init プロンプトを開く',
    ctaSecondary: '方法論を読む',
  },

  privacyPage: {
    meta: {
      title: 'プライバシー — Deep Work Plan',
      description:
        'deepworkplan.com のプライバシーポリシー: アカウントなし、広告なし、Cookie を使わないアナリティクスの静的サイトであり、お問い合わせフォームが収集するものを平易に説明します。',
    },
    eyebrow: 'プライバシーポリシー',
    title: 'deepworkplan.com のプライバシー',
    intro:
      'Deep Work Plan は静的なドキュメントと方法論のサイトです。このページでは、訪問時にサイトが扱うデータを平易かつ完全に説明します。アカウントシステムも広告もクロスサイトトラッキングも一切ありません。',
    lastUpdated: '2026年9月8日',
    sections: [
      {
        heading: 'サイトの仕組み',
        body: 'deepworkplan.com は CDN 経由で配信される静的ページの集まりです。ログインはなく、ユーザーデータベースもなく、個人のプロフィールを保存する仕組みもありません。コンテンツは DailybotHQ オーガニゼーション配下の公開 GitHub リポジトリで開発されており、ここで読むすべてのものはビルドされた通りに配信されます。',
      },
      {
        heading: 'アナリティクス',
        body: '当サイトは、Cookie を使わないプライバシー重視のアナリティクスサービス Umami を利用し、ページビューを集計しています。Umami はトラッキング Cookie を設定せず、クロスサイトのプロフィールも構築しません。AI クローラーは JavaScript を実行しないため、サーバーサイドのエッジ関数が、自動ボット訪問のユーザーエージェントとパスを匿名のアナリティクスイベントとして記録します——これはクローラーソフトウェアを識別するもので（例: 「GPTBot が /init を訪問」）、人間の訪問者を識別するものではありません。',
      },
      {
        heading: 'Cookie とローカルストレージ',
        body: '当サイトはトラッキング Cookie を設定しません。ブラウザに保存される唯一のものは、localStorage に保持されるテーマ設定（ライトまたはダークモード）で、デバイスの外に出ることも、どこへも送信されることもありません。ブラウザのストレージを消去すると、サイトは単にシステムのデフォルトテーマへ戻るだけです。',
      },
      {
        heading: 'サードパーティサービス',
        body: 'ホスティングと配信は Cloudflare Pages で行われており、CDN の運用と悪用のブロックの一環として、Cloudflare 自身のプライバシーポリシーに基づきリクエストログと IP アドレスがエッジで処理されます。集計アナリティクスは Umami（cloud.umami.is）で実行されます。お問い合わせフォームを自発的に送信した場合、回答は Google Forms 経由でチームに送られます——入力した情報が収集されるのはそこだけであり、返信のためだけに使われます。',
      },
      {
        heading: '行わないこと',
        body: '当社は個人データを販売または共有せず、広告やリマーケティングピクセルを実行せず、ブラウザのフィンガープリントも行わず、マーケティングメールも送信しません。サイトにニュースレター登録はなく、上記の集計型・Cookie なしのカウントを超えるテレメトリーもありません。',
      },
      {
        heading: 'あなたの選択',
        body: 'ここのアナリティクスは集計型で Cookie を使わないため、書き出しや削除すべき個人のプロフィールは存在しません。アナリティクススクリプトは、どんなコンテンツブロッカーでもブロックでき、サイトの動作には影響しません。お問い合わせフォームを送信済みでメッセージの削除を希望する場合は、下記の連絡先にご連絡ください。削除します。',
      },
      {
        heading: 'ポリシーの変更',
        body: 'このポリシーが実質的に変更された場合は、このページ上部の更新日付も変更され、実質的な編集は公開のウェブサイトリポジトリにコミットされるため、誰でも履歴を確認できます。',
      },
    ],
    contactTitle: '連絡先とセキュリティ',
    contactBody:
      'プライバシーに関する質問は security@dailybot.com までご連絡ください。セキュリティの脆弱性を報告する場合は、ウェブサイトとスキルのリポジトリに対して GitHub のプライベート脆弱性レポートを優先してください——正確な宛先は /.well-known/security.txt に記載されています。',
  },
};
