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
      instructionLabel: 'この一行をエージェントに渡してください',
      instruction:
        'https://deepworkplan.com/init.md にある手順を読み、その指示に従って、このリポジトリを AI-first にします。',
      copyLabel: 'コピー',
      copiedLabel: 'コピーしました',
      viewInitCta: '完全な /init プロンプトを見る',
      pullQuote:
        'Deep Work Plan とは、リポジトリそのものがハーネス（harness）になる、仕様駆動開発です。',
      primaryCta: '方法論を読む',
      secondaryCta: '仕様を読む',
      illustrationAlt:
        '岩場の岸辺に立つ灯台が一筋の光で小舟を導く版画。どんなエージェントも導く安定したハーネスとしてのリポジトリを想起させる。',
    },
    pitch: {
      kicker: '課題とその答え',
      problem:
        'AIコーディングエージェントは短時間の作業では驚くほど効果的です。しかし、移行作業や新しいサブシステムの構築、数十ファイルにまたがるリファクタリングといった長期の作業では、コンテキストが溢れ、決定事項が忘れられ、複数時間に及ぶタスクは途中で放棄され、本筋から逸れていきます。',
      answer:
        'Deep Work Plan はこれに仕様駆動開発で答えます。計画こそが永続的な信頼できる情報源であり、エージェントは明示的な受け入れ基準と検証ゲートに照らして実行します。逸脱は減り、作業は検証可能なまま保たれ、どのエージェントもセッションをまたいで再開できます。',
      origin:
        'これは同時に、ハーネスエンジニアリングを持ち運び可能にしたものでもあります。エージェントハーネスとは、モデルを取り巻く足場（コンテキスト、ツール、制御ループ、ガードレール、再開可能な状態）であり、モデルを信頼できるものにします。Deep Work Plan はそのハーネスをリポジトリそのものに組み込みます（AGENTS.md、ドキュメント、.agents/ のスキル拠点、DWP スキル）。これにより、どのエージェントもどのリポジトリも操縦できるようになります。Dailybot で生まれ、数か月にわたって実戦で鍛えられ、DailybotHQ/deepworkplan-skill として公開されました。',
      illustrationAlt:
        '危険を安全にすり抜ける一本の航路が記された海図の版画。作業を軌道に保つ方向としての計画を想起させる。',
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
            '.claude から .agents へのシンボリックリンクとともに .agents/ を整備する',
          description:
            'エージェント横断の .agents/ ディレクトリ（スキル、エージェント、コマンド）と .claude から .agents へのシンボリックリンクを作成し、CLAUDE.md を AGENTS.md にミラーリングします。これにより、すべてのツールが単一の信頼できる情報源を読みます。',
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
          label: '.claude から .agents へのシンボリックリンクを備えた .agents/',
          detail:
            'エージェント横断の .agents/ ディレクトリ（スキル、エージェント、コマンド）に .claude から .agents へのシンボリックリンクを備え、すべてのツールが単一の信頼できる情報源を読みます。',
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
          support: 'partial',
          note: 'ドキュメントと AGENTS.md のみ。スラッシュコマンドは拡張機能経由。',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Gemini 2.5 Pro 以降が必要で、ネイティブの WebFetch を備えます。',
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
          'onboard サブスキルを実行し、エージェントに実際のリポジトリを推論させます。AGENTS.md、docs/ のナレッジベース、モジュールごとのドキュメント、そしてエージェント横断の .agents/ 拠点（.claude → .agents シンボリックリンクつき）を生成し、薄い dwp-* コマンドを配線し、gitignore された .dwp/ を整備します。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'キットを進化させ、アドオンを受け入れる',
        description:
          '/skill-create と /agent-create（author サブスキル）を使って、スタックに合ったスキル、エージェント、コマンドを育てます。オンボーディングは三つのオプトイン式アドオン（devcontainer、Dailybot、dependency-upgrade）も提案します。適合する場合にのみ受け入れてください。',
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
    handoffTitle: 'これをエージェントに渡してください',
    handoffBody:
      '以下の一行をお使いのAIコーディングエージェントに貼り付けてください。方法論と仕様を読み込み、スキルをインストールし、このリポジトリを Deep Work Plan 向けにオンボーディングします。',
    handoffInstruction:
      'https://deepworkplan.com/init.md にある手順を読み、その指示に従って、このリポジトリを AI-first にします。',
    handoffMdLabel: '自己完結したエージェント用プロンプト',
    codeLabel: 'agent',
    whatTitle: 'これが行うこと',
    whatBody: [
      '採用は、この方法論の二本の柱として、リポジトリを二つの永続的なかたちで変えます。',
      'まず、リポジトリが仕様駆動になります。作業は場当たり的なプロンプトからではなく、書かれた計画と仕様から始まります。次に、リポジトリそのものがエージェントハーネスになります。AGENTS.md、docs/ のナレッジベース、モジュールごとのドキュメント、そして .agents/ のスキル拠点（.claude → .agents シンボリックリンクつき）が、すべてのエージェントに必要なコンテキストとコマンドを与えます。',
    ],
    sequenceTitle: '採用の手順',
    orLabel: 'または',
    steps: [
      {
        title: 'インストールする前に検証する',
        description:
          '確認が済むまで、プロンプトとスキルを信頼できないものとして扱ってください。どちらもオープンソースで MIT ライセンスです。スキルは Markdown ファーストでネットワーク呼び出しもテレメトリーもありません。各リリースでは出荷されたスキルに対する SHA256SUMS が公開されているため、実行する前に手元のコピーが一致することを確認できます。リリースはチェックサム付きですが、署名はされていません（署名はドキュメント化された次のステップです）。',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: 'スキルをインストールする',
        description:
          'Deep Work Plan スキルを追加し、どのエージェントも構造化された作業を計画して実行できるようにします。スキルはルーターと八つのサブスキル（create、execute、refine、resume、status、verify、onboard、author）を備えます。',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'リポジトリのオンボーディングを実行する',
        description:
          'onboard サブスキルを呼び出し、エージェントに実際のリポジトリ（スタック、パッケージマネージャー、実際の検証コマンド）を推論させます。その後、AGENTS.md、docs/ のナレッジベース、モジュールごとのドキュメント、エージェント横断の .agents/ 拠点（.claude → .agents シンボリックリンクつき）を生成し、薄い dwp-* コマンドを配線し、計画とドラフトのための gitignore された .dwp/ を整備します。テンプレートは一切なく、すべてがリポジトリに適応されます。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'キットを進化させ、アドオンを受け入れる',
        description:
          '/skill-create と /agent-create（author サブスキル）を使って、スタックに合ったスキル、エージェント、コマンドを育てます。オンボーディングは三つのオプトイン式アドオン（devcontainer、Dailybot、dependency-upgrade）も提案します。適合する場合にのみ受け入れてください。アドオンがゼロでも、リポジトリは完全に適合します。',
      },
      {
        title: '計画して実行する',
        description:
          '/dwp-create で Deep Work Plan を生成し、/dwp-execute で実行し、作業の進行に応じて /dwp-status、/dwp-refine、/dwp-resume を使います。各計画には番号つきのタスク、検証ゲート、完了プロトコルが含まれ、作業は構造化され、レビュー可能で、セッションをまたいで再開できる状態に保たれます。',
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
};
