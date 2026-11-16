---
title: "DWP v7：委任でき、すべてを記録する計画"
description: "Deep Work Plan v7 は v6 の契約とジャーナルを維持し、範囲の限られたタスクを他のエージェントへ委任でき、任意のアドオン 4 つを加えます。"
date: 2026-10-09
version: "v7 · 証拠を伴う委任"
kind: release
lang: ja
order: 0
featured: false
sourceLabel: "公開済み v7 スキーマ一式"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
  - label: "Skill release v7.10.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.0"
  - label: "Skill release v7.10.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.1"
  - label: "Skill release v7.10.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.2"
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.1"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
---

Deep Work Plan v7 は v6 の方法を維持します。契約が権威であり、追記専用のジャーナルが記憶であり、スケジューラが次に実行するものを決め、記録された証拠がタスクの基準を満たしたときにのみタスクが完了します。v7 は委任の能力を加え、その結果に対しても同じ規律を保ちます。

`agent_delegation` を付与した計画は、タスクを `parallel_safe` とマークして別のエージェントへ渡すことができます。委任先の応答は指示ではなくデータとして記録され、計画自身のゲートランナーが結果を観測するまで `asserted` のままです。`observed` の証拠を生成できるのはランナーだけなので、委任は完了の基準を下げることなく到達範囲を広げます。

4 つの任意アドオンが、委任を実用的な自律性に変えます。Herdr は、任意のマシン上のペインにいるエージェントへタスクを渡します。Agentkit は、すべてのターミナル向けコーディングエージェントの上に 1 つの `ak` コマンドを置き、既定で自律的に動作し、無効にもでき、範囲の限られたタスクを git worktree 内でヘッドレス実行します。Devcontainer は、既定で SSH 鍵を一切含まない再現可能なコンテナを各リポジトリに提供します（ホストエージェント経由の SSH による git。鍵ファイルは明示的な `[ssh] copy_keys` オプトイン時のみ）。DeepWorkPlan Vim は、計画ブラウザと Markdown ビューアを備えたターミナルエディタです。それぞれ独自のリポジトリを持つプロダクトにタグで固定されており、Deep Work Plan なしでも動作します。リポジトリはこれらを一つも使わなくても完全に準拠でき、`.dwp/config.json` のレジストリにどれが有効かが記録されます。

ベンチマークと学習モードは、各計画から得られた知見を記録し、後で分析できるようにします。リポジトリごとに 1 エージェントを割り当てた v7 オーケストレーター計画としてエコシステム全体の監査を実施したところ、v6 に対する挙動の退行は見つかりませんでした。パックのスイートはクリーンな環境で 807 件中 807 件が合格し、命令の読み込み量はフローごとに 0.1% から 3.9% 増加しました（パック全体では 4.6%）。これは両方のタグでバイト数として測定したもので、トークンとして推定したものではありません。

v7 はオーケストレーションと監査可能性における大きな前進ですが、完全なハンズオフの自律性にはまだ至っていません。リリース 7.2.0 は、その監査で見つかった不足を埋めます。ベンチマークと学習は v7 の計画を測定するようになり、前提条件が完了する前にタスクを開始することは拒否され、テストスイートはハーメティックに実行されます（クリーンな環境で 815 件中 815 件）。エージェントの成果の非劣性は測定されていません。既存の計画は記録された世代を維持し、暗黙のうちに移行されることはありません。新しい計画は既定で v7 契約を使用します。

リリース 7.6.0（2026-10-11）では、大規模オーケストレーションが導入されました。リポジトリまたはワークストリームごとに 1 つのレーン、余力に基づくアカウント選択（`ak usage`、`ak pick`）、無人起動、そしてすべてのアドオンを検出し、使用中のものをアップグレードし、適合するものを提案するオンボーディングです。

リリース 7.7.0（2026-10-12）では、群衆自律性（ガイド §17）が提供されました。キャパシティループ（`shared/swarm.py`）、ハンドオフパケット（`dwp-handoff-v1`）、エポックとフェンシングによるリード継承、レーン間リクエスト、AGENT_PROTOCOL §7.5 のエスカレーション分類（C1–C7：それ以外はすべて判断して記録）、品質基準（ゲートは仮説であり主張ではなく検証されるもの）、23 リポジトリで実行された 313 件の計画からの方法論的知見を含みます。既知の制限：v7 ジャーナルにはレーンのハンドオフやリードの継承専用のイベントがありません（取り消された委任と観察として記録されます）。

リリース 7.8.0（2026-10-13）では Ecosystem 1.0 が確立されました。パックが統合するすべての製品が初の安定リリースに達し、セマンティックバージョニングのもとで v1.0.0 に固定されました（coding-agents-kit、herdr-peers、devcontainer-kit、deepworkplan-vim。それぞれ検証済みの `SHA256SUMS` ダイジェスト付き）。あわせて AI Diff Reviewer v3.3.14 と Dailybot agent-skill v3.23.17 も固定されています。続いて 7.8.1（2026-10-14）で coding-agents-kit と devcontainer-kit の v1.0.1 パッチリリースが固定されました。

リリース 7.9.0（2026-10-25）は Herdr アドオンを herdr-peers v1.1.0 に固定しました。そのネイティブの debate サブスキルにより、リードがピアのパネルをラウンドに沿って進め、意思決定記録で締めくくれます。また AI Diff Reviewer を v3.3.16 に固定しました。パックの CI は Python 3.9 の下限ジョブを ubuntu-24.04 で実行するようになりました。

リリース 7.10.0（2026-10-26）は、重大な意思決定をチームの決定に変えます。Herdr アドオンが有効で herdr-peers 1.1.0 以降を使用している場合、`create` は各重大な意思決定——実現可能な2つの選択肢のどちらを選んでも結果が実質的に異なり、取り消しが難しいか複数の領域にまたがり、リポジトリ内の何ものも決めていないもの——を、リストされた決定タスクとして計画し、`execute` はそのために herdr-peers の `decide` ディベートを投票なしで主催し、各席を読み取り専用の委任としてジャーナルに記録し、選択を選択記録とともに書き留めます。Herdr がなければ何も変わりません。前提条件の欠落やディベートの失敗はエージェント自身の決定記録にフォールバックし、`config.py decisions debate off` で単一エージェントの判断に戻せます。Dailybot アドオンの固定は、vendored 済みのリリースである agent-skill v3.23.20 に移動します。

リリース 7.10.1（2026-11-15）は Herdr アドオンを herdr-peers v1.2.1 に固定しました。その 1.2.x 系列は autopilot を追加します。人間だけが起動する任意のデーモンで、待機中の各エージェントの推奨オプションを受け入れ、複数ステップの対話を最後までたどり、ログインや権限バイパスの承認には決して触れません。プロトコル1は不変です。

リリース 7.10.2（2026-11-15）は、当日のリリースに合わせてエコシステムの固定を動かしました。Herdr アドオンを herdr-peers v1.2.2 へ。修正のみのパッチで、autopilot が選択肢の横にプレビュー付きで表示される質問に回答し、スペイン語・フランス語・ドイツ語・イタリア語の推奨マークを認識します。agentkit を coding-agents-kit v1.2.0 へ。その `ak last` は作業ディレクトリの最新セッションを任意のターミナルで再開し、Herdr ペイン内の起動は Herdr 再起動やマシン再起動の後にペインを復元します。devcontainer-kit を v1.1.2 へ、deepworkplan-vim は v1.0.1 のまま。リリースワークフローは一時的な拒否を吸収するため release tag のプッシュをリトライするようになりました。

リリース 7.11.0（2026-11-16）は、開発者の v7 ハードニング・シリーズを着地させます。耐久性の用語集と可視化された制御ルールがガイドに入り、`verify` に完了したプランの読み取り専用コンプライアンス監査が加わり、pack のドキュメントは耐久性とトークンの主張を正確に述べ、README のタグラインは理解テストの勝者に置き換わり、ライブの create 経路は Lite バンドルを指示予算内に保ちます。

リリース 7.12.0（2026-11-16）はプランを herdr-peers のループに登録します。プランは後継リスト付きでリードを請求し、`autopilot --loop` とフリート UI が開いているすべてのプランを見て終端まで走らせ続け、Dailybot ノティファイアがマイルストーンを報告します。アドオンの記述子は herdr-peers v1.3.1 と coding-agents-kit v1.3.0 に移りました。

リリース 7.12.1（2026-11-16）は Herdr アドオンの Dailybot ノティファイアを修正します。herdr-peers が発する `herdr-peers/plan-event-v1` というイベント名を受け入れ、ノティファイアの stdin を 64 KiB に制限し、`plan_lead_moved` をマッピングします。アドオンの記述子は coding-agents-kit v1.4.0 に移り、その `ak update` は人間が呼び出すことだけを意図したものとして文書化されます。

リリース 7.12.2（2026-11-16）では、Herdr アドオンが herdr-peers のプロトコル 1 と 2 の両方を受け入れ、herdr-peers v2.0.0 に固定されます。プロトコル 2 の環境でも検出が黙って失敗することはなくなり、アドオンは委任機能を維持します。

インストール済みスキルのリリースは **7.12.2** です。7.0.0 以降、安定しています。
