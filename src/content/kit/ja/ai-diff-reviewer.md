---
title: AI Diff Reviewer
description: "オプションの DWP アドオン：ローカル AI Diff Reviewer パスでセキュリティレビューを強化、オプションの Flow B CI マージゲート（v2）、共有拡張ファイル、apply-review コンパニオン。"
kind: addon
lang: ja
order: 5
---

# AI Diff Reviewer アドオン

Deep Work Plan の実行を **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（マーケットプレイス掲載名 **"AI Diff Reviewer"**、現在のバージョン **v2.0.0**）に接続し、必須の最終タスク **セキュリティレビュー** に構造化されたローカルレビュー — 判定、検出結果テーブル、深刻度 — を追加します。Flow B を選択した場合、すべてのプルリクエストを CI の同じレビューでゲートできます。**オプション**のアドオンであり、AI-first 適合性には決して必要ありません。

Deep Work Plan のコア方法論は AI Diff Reviewer への依存が**ゼロ**です。アドオンが存在しないリポジトリでも完全に適合します。このアドオンは、開発者またはチームが構造化されたレビュー品質を求める場合にのみ提供してください。全員に自動インストールしないでください。常に Flow A か Flow B かを確認してください — デフォルトは設定しません。

## 使用するタイミング

| シグナル | アクション |
|--------|--------|
| チームが構造化された検出結果を持つ CI PR マージゲートを望んでいる | オンボーディング時に **Flow B を推奨** |
| 個人または実験的なリポジトリ；ローカルのプッシュ前レビューで十分 | **Flow A を提供** |
| 追加のレビュー面に対する需要がない | **スキップ** — ベースラインのセキュリティレビューは引き続き適用 |

## 2 つの採用フロー

| フロー | 得られるもの |
|------|----------------|
| **A — ローカルのみ** | ベンダー管理のスキル + 必須の `.review/extension.md`（`generate-extension` 経由）。ローカルパスでセキュリティレビューを強化。GitHub Actions ワークフローなし。 |
| **B — デュアルサーフェス** | Flow A に加え、`setup` が `.github/workflows/pr-review.yml`（Action `@v2`）を作成。ローカルと CI で同じ拡張ファイルを使用。CI が検出結果を投稿した後、オプションで `apply-review` コンパニオンを使用可能。 |

セキュリティレビュー強化の検出には、次のいずれかの場所に**スキル + 拡張ファイル**が必要です：`.review/extension.md`、`.github/ai-diff-reviewer/extension.md`、または `.github/ai-pr-reviewer/extension.md`。スキルだけでは不十分です。

## このアドオンが接続する内容（意図的に限定）

DWP アドオンはレビュアーを**再発明しません**。インストール、方法論、CI ウィザード、拡張オーサリング、PR 草案作成、CI 後のウォークスルーを、上流スキルの 5 つのサブスキル（親デフォルトフロー、`generate-extension`、`setup`、`open-pr`、`apply-review`）に委任します。

### セキュリティレビューの強化

検出された場合、`create` / `execute` は必須のセキュリティレビュータスクにローカルレビューステップを追加します。出力は `analysis_results/SECURITY_REVIEW.md` の `## AI Diff Reviewer local review` の下に追記されます。

- **ソフト失敗（呼び出しのみ）：** スキルの欠如、拡張の欠如、または呼び出しエラー → 一度警告して続行；このミスでタスクを失敗させません。
- **完了したパスの後のゲート：** `critical` の検出結果は修正または明示的に承認されるまでセキュリティレビューの完了をブロックし続けます（既存の SR 契約）。`warning` / `info` は記録されますがブロックしません。
- **Flow A に CI シークレットは不要。** 未設定の `CURSOR_API_KEY` はローカルパスを抑制してはなりません。

### Flow B CI ゲート（オプション）

固定 Action `DailybotHQ/ai-diff-reviewer@v2`、通常ラベルゲート（`ready`）、ブランチ保護用の安定した名前の **AI review gate** ジョブ、オプションのスキップラベル `skip-review-label: skip-ai-review`。共有の `prompt.md` + 拡張で方法論と深刻度を整合；反復認識レビューでは、CI の 2 回目以降のラウンドが短くなる場合がありますが、ローカルパスは完全に保たれます。

### オプションの `apply-review` コンパニオン

CI がレビューを投稿した後、開発者は `execute` 中に `apply-review` を呼び出して、検出結果を 1 つずつ（適用 / 延期 / スキップ）同意のもとで確認できます。デフォルトで読み取り専用；プランタスクファイルとしては使用しない（必須の最終タスク順序を壊す）。

## 動作

- **フローを確認；決して推測しない。** 未要求のワークフローをインストールすることは、Flow A にとどまるよりも大きなフットプリントになります。
- **調整する、上書きしない。** 既存のスキル、拡張、または `pr-review.yml` は保持；ギャップのみ埋める。
- **認証は延期。** CI のプロバイダーシークレットはメンテナーが設定；このアドオンは認証情報を保存しません。
- **ベンダー中立。** 辞退しても完全な AI-first リポジトリが残ります。

## 注意事項

オプションであり、必須ではありません。上流スキル：[DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)。スペックページ：[Add-ons](/spec/addons)。
