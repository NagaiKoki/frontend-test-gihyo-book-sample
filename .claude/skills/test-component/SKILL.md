---
name: test-component
description: コンポーネントの Storybook Story ファイルを作成する
argument-hint: "[コンポーネントのファイルパス]"
---

$ARGUMENTS で指定されたコンポーネントの Storybook Story ファイルを作成してください。

以下の制約に従ってください。

- @storybook/addon-vitest を使用したテストとして実装する
- play 関数を使ってインタラクションを検証する
- テストの説明は日本語で記述する
- API 通信がある場合は MSW でモックする
- 既存の Story ファイルのスタイルに合わせる

まず対象のコンポーネントファイルを読み込み、どのような Story が必要か確認した上で実装してください。
