---
name: test-hook
description: カスタム Hook のテストを Vitest で作成する
argument-hint: "[Hook のファイルパス]"
---

$ARGUMENTS で指定されたカスタム Hook のテストを Vitest で作成してください。

以下の制約に従ってください。

- renderHook を使って Hook をテストする
- 非同期処理の完了は waitFor で待機する
- API 呼び出しは vi.fn() でモックする（vi.mock() は避ける）
- テストケースの説明は日本語で記述する
- 以下の状態を必ず検証する
  - 正常系（期待した値が返ること）
  - ローディング中の状態（非同期 Hook の場合）
  - エラー発生時の状態
  - エッジケース（空配列・null・undefined など）

まず対象の Hook ファイルを読み込み、どのような検証が必要か確認した上で実装してください。
