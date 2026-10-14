---
title: "DWP v7：委任でき、すべてを記録する計画"
description: "Deep Work Plan v7 は v6 の契約とジャーナルを維持し、範囲の限られたタスクを他のエージェントへ委任でき、任意のアドオン 4 つを加えます。"
date: 2026-10-09
version: "v7 · 証拠を伴う委任"
kind: release
lang: ja
order: 0
featured: true
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
---

Deep Work Plan v7 は v6 の方法を維持します。契約が権威であり、追記専用のジャーナルが記憶であり、スケジューラが次に実行するものを決め、記録された証拠がタスクの基準を満たしたときにのみタスクが完了します。v7 は委任の能力を加え、その結果に対しても同じ規律を保ちます。

`agent_delegation` を付与した計画は、タスクを `parallel_safe` とマークして別のエージェントへ渡すことができます。委任先の応答は指示ではなくデータとして記録され、計画自身のゲートランナーが結果を観測するまで `asserted` のままです。`observed` の証拠を生成できるのはランナーだけなので、委任は完了の基準を下げることなく到達範囲を広げます。

4 つの任意アドオンが、委任を実用的な自律性に変えます。Herdr は、任意のマシン上のペインにいるエージェントへタスクを渡します。Agentkit は、すべてのターミナル向けコーディングエージェントの上に 1 つの `ak` コマンドを置き、既定で自律的に動作し、無効にもでき、範囲の限られたタスクを git worktree 内でヘッドレス実行します。Devcontainer は、既定で SSH 鍵を一切含まない再現可能なコンテナを各リポジトリに提供します（ホストエージェント経由の SSH による git。鍵ファイルは明示的な `[ssh] copy_keys` オプトイン時のみ）。DeepWorkPlan Vim は、計画ブラウザと Markdown ビューアを備えたターミナルエディタです。それぞれ独自のリポジトリを持つプロダクトにタグで固定されており、Deep Work Plan なしでも動作します。リポジトリはこれらを一つも使わなくても完全に準拠でき、`.dwp/config.json` のレジストリにどれが有効かが記録されます。

ベンチマークと学習モードは、各計画から得られた知見を記録し、後で分析できるようにします。リポジトリごとに 1 エージェントを割り当てた v7 オーケストレーター計画としてエコシステム全体の監査を実施したところ、v6 に対する挙動の退行は見つかりませんでした。パックのスイートはクリーンな環境で 807 件中 807 件が合格し、命令の読み込み量はフローごとに 0.1% から 3.9% 増加しました（パック全体では 4.6%）。これは両方のタグでバイト数として測定したもので、トークンとして推定したものではありません。

v7 はオーケストレーションと監査可能性における大きな前進ですが、完全なハンズオフの自律性にはまだ至っていません。リリース 7.2.0 は、その監査で見つかった不足を埋めます。ベンチマークと学習は v7 の計画を測定するようになり、前提条件が完了する前にタスクを開始することは拒否され、テストスイートはハーメティックに実行されます（クリーンな環境で 815 件中 815 件）。エージェントの成果の非劣性は測定されていません。既存の計画は記録された世代を維持し、暗黙のうちに移行されることはありません。新しい計画は既定で v7 契約を使用します。

リリース 7.6.0（2026-10-11）では、大規模オーケストレーションが導入されました。リポジトリまたはワークストリームごとに 1 つのレーン、余力に基づくアカウント選択（`ak usage`、`ak pick`）、無人起動、そしてすべてのアドオンを検出し、使用中のものをアップグレードし、適合するものを提案するオンボーディングです。

リリース 7.7.0（2026-10-12）では、群衆自律性（ガイド §17）が提供されました。キャパシティループ（`shared/swarm.py`）、ハンドオフパケット（`dwp-handoff-v1`）、エポックとフェンシングによるリード継承、レーン間リクエスト、AGENT_PROTOCOL §7.5 のエスカレーション分類（C1–C7：それ以外はすべて判断して記録）、品質基準（ゲートは仮説であり主張ではなく検証されるもの）、23 リポジトリで実行された 313 件の計画からの方法論的知見を含みます。既知の制限：v7 ジャーナルにはレーンのハンドオフやリードの継承専用のイベントがありません（取り消された委任と観察として記録されます）。

リリース 7.8.0（2026-10-13）では Ecosystem 1.0 が確立されました。パックが統合するすべての製品が初の安定リリースに達し、セマンティックバージョニングのもとで v1.0.0 に固定されました（coding-agents-kit、herdr-peers、devcontainer-kit、deepworkplan-vim。それぞれ検証済みの `SHA256SUMS` ダイジェスト付き）。あわせて AI Diff Reviewer v3.3.14 と Dailybot agent-skill v3.23.17 も固定されています。続いて 7.8.1（2026-10-14）で coding-agents-kit と devcontainer-kit の v1.0.1 パッチリリースが固定されました。

インストール済みスキルのリリースは **7.8.1** です。7.0.0 以降、安定しています。
