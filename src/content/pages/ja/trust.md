---
title: "信頼とセキュリティ"
description: "なぜ Deep Work Plan は安心して採用できるのか：Open Source かつ MIT ライセンス、ネットワーク呼び出しやテレメトリーのない Markdown-first、設計上の非破壊性、検証可能なインストール、そして明確な脆弱性開示ポリシー。"
lastUpdated: 2026-06-05
---

## なぜ信頼できるのか

信頼できないスキルを誰もインストールすべきではありません。Deep Work Plan は信仰ではなく検証によって成り立つように設計されています。Open Source、Markdown-first、非破壊的で、実行する前に確認できます。

- **Open Source かつ MIT ライセンス** — ウェブサイトもスキルも公開されており diff 可能です。実行前にすべての行を読んでください。
- **Markdown-first — ネットワークなし、テレメトリーなし** — CLI も HTTP API も認証フローもありません。ネットワーク呼び出しを一切行わず、テレメトリーも送信しません。リポジトリに関する情報がお使いのマシンの外に出ることはありません。
- **設計上の非破壊性** — スキルが行うセキュリティ上唯一関連する操作はリポジトリの変更ですが、上書きではなく調整です。既存のものを検出し、計画を提案し、何かを置き換える前に確認を求めます。計画の出力は gitignore された `.dwp/` ディレクトリに保存されます。
- **秘密情報に触れない** — 決して秘密情報をコミットせず、`.gitignore` を書き換えるのではなく追記し、すべての変更は小さく読みやすい diff でレビューできます。
- **検証可能な出所** — 各リリースには出荷されたスキルのチェックサムが公開されます。

---

## 実行前に検証する

確認が済むまでスキルを信頼できないものとして扱ってください。各リリースには出荷されたスキルを対象とした `SHA256SUMS` ファイルが添付されています。インストールしたいバージョンのものをダウンロードし、コピーが一致することを確認してください — ゼロ以外の終了コードはファイルが一致しないことを意味するため、その場合は中止してください。

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (replace vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

リリースは**チェックサム付きですが、署名はされていません** — 署名（cosign またはメンテナー GPG）は文書化された次のステップであり、現在の主張ではありません。すべてが公開されているため、任意のファイルをそのタグのリポジトリと diff で比較することもできます。

---

## 脆弱性を報告する

公開 Issue を立てるのではなく、**security@dailybot.com** にプライベートで報告してください。報告は 3 営業日以内に確認し、有効な発見については深刻度に応じて 30 日以内に修正または緩和策を提供することを目指しています。ウェブサイトとスキルは同じポリシーを共有しています。

---

## 正直な制限事項

- リリースはチェックサム付きですが、まだ暗号的に署名されていません — 署名は計画中であり、まだ完了していません。
- Deep Work Plan はリポジトリに対して自律的なコーディングエージェントを実行します。提案された計画と diff を確認してください。この方法論はそのレビューのために設計されており、レビューを省くためのものではありません。
- ここでの信頼の主張は公式ソースのみを対象としています。リポジトリから乖離した改変済みまたはサードパーティのコピーには、これらの保証は一切ありません — まず検証してください。

---

## 信頼リソース

- [機械可読の信頼マニフェスト](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt（RFC 9116）](https://deepworkplan.com/.well-known/security.txt)
- [ウェブサイトのセキュリティポリシー](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [スキルのセキュリティポリシーと脅威モデル](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [方法論を読む](/methodology)
- [採用（Init）](/init)
