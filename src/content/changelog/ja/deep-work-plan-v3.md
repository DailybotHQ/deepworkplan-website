---
title: "DWP v3：構造によるトークン効率化"
description: "Deep Work Plan v3 は、段階的な情報開示、影響範囲のみを対象とした検証、そして単一の必須 Final Review によって、コンテキストコストを軸にハーネスを再構築すると同時に、トラストと適合性の下限を引き上げます。"
date: 2026-09-10
version: "v3 · トークン効率化"
kind: release
lang: ja
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

本日、Deep Work Plan v3 をリリースします。コンテキストはエージェントにとって最も乏しいリソースであり、このリリースはそれを単なる非公式な約束ではなく、エンジニアリングの課題として扱います。削るのは足場であって、指示ではありません。

`GUIDE.md` は、すべてのエージェントが全文を読み込むドキュメントではなく、ルーティング用のインデックスになります。これにより、エージェントはその手順に実際に必要なガイダンスだけを読み込みます。検証ゲートは、変更のたびにフルスイートを再実行するのではなく、各タスクの影響範囲から選択されるようになりました。また、開発者がすでに望むものを把握している場合は、中間レビューを省略して計画作成を直接トラストモードに進めることができます。これらはいずれもゲートを弱めるものではなく、繰り返しの読み込み、冗長なコンテキストの読み込み、実際の変更内容と一致しない検証作業を取り除くものです。

効率化と並行して、このリリースはトラストの下限を引き上げます。かつて計画の締めくくりだった3つのクロージングタスクは、単一の必須 Final Review に置き換えられます。AI Diff Reviewer によるローカルレビューはベースラインの必須コンポーネントになり、適合性はオプションのアドオンがゼロの状態を起点とするようになりました——セキュリティと来歴は任意の仕上げではなく要件です。`AGENTS.md` にはリポジトリの DWP 標準の来歴が記録され、レガシーな計画は黙って書き換えられるのではなく、記録済みの形を保ったまま明示的な移行パスを与えられます。

このリリースは DWP 標準 `2.3.0` に準拠しています。命令量とリプレイ挙動は、架空の削減率としてではなく、公開の評価台帳に照らして測定されます。

[トークン効率アーキテクチャ](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md)と、その[評価記録](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md)をご覧ください。あるいは[規範仕様](https://deepworkplan.com/spec)や[キット](https://deepworkplan.com/kit/)をご覧ください。
