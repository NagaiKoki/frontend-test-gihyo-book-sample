# 正誤・免責事項

このファイルは、書籍『フロントエンドテスト』(技術評論社) 本文中のサンプルコードと、
本リポジトリのハンズオン用コードとの間で**矛盾が生じる箇所**をまとめたものです。
本書のコードをそのまま写経すると失敗するケースについて、原因と本リポジトリでの対応
（修正後コード）を記載します。

> [!NOTE]
> 本ファイルは本リポジトリの保守者による補足であり、書籍出版社・著者による公式な
> 正誤表ではありません。書籍の内容理解を補助する目的で記載しています。

---

## 6 章 E2E テスト ― スケルトンスクリーンのテスト

### 該当箇所

6.4「非同期処理を含むテスト」内、スケルトンスクリーンのテスト例。

### 本書の記載

```ts
// スケルトンスクリーンが表示されることを確認
const skeleton = page.getByTestId('skeleton-card');
await expect(skeleton).toBeVisible();
await expect(skeleton).toHaveCount(3); // 3つのプレースホルダー
```

### 問題点

`skeleton` は `data-testid="skeleton-card"` に**マッチするすべての要素**を指す
ロケーターです。本リポジトリの `ArticlesPage` は読み込み中にスケルトンカードを
**3 枚**描画します。

- `await expect(skeleton).toHaveCount(3)` … 「3 要素ある」ことを前提とするアサーション
- `await expect(skeleton).toBeVisible()` … Playwright のオートリトライ系アサーションで、
  ロケーターが**複数要素に解決すると strict mode 違反**（`locator resolved to 3 elements`）
  となり失敗する

つまり、要素が 1 つなら `toHaveCount(3)` が落ち、3 つなら `toBeVisible()` が落ちるため、
**この 2 つのアサーションは同じロケーターに対して同時には成立しません**。

同様に、末尾の「消えることを確認」も複数要素のままだと strict mode 違反になり得ます。

### 本リポジトリでの対応（修正後コード）

可視性は先頭要素 (`first()`) で確認し、件数は `toHaveCount()` で検証するように分離します。
非表示の確認は `toHaveCount(0)` に置き換えます。

```diff
  // スケルトンスクリーンが表示されることを確認
  const skeleton = page.getByTestId('skeleton-card');
- await expect(skeleton).toBeVisible();
- await expect(skeleton).toHaveCount(3); // 3つのプレースホルダー
+ await expect(skeleton.first()).toBeVisible(); // 可視性は先頭要素で確認
+ await expect(skeleton).toHaveCount(3); // 3つのプレースホルダー

  // データが読み込まれた後、実際のコンテンツが表示されることを確認
  await expect(page.getByText('記事タイトル1')).toBeVisible();
  await expect(page.getByText('著者A')).toBeVisible();

  // スケルトンスクリーンが消えることを確認
- await expect(skeleton).not.toBeVisible();
+ await expect(skeleton).toHaveCount(0);
```

修正後の全体像:

```ts
await page.goto('/articles');

// スケルトンスクリーンが表示されることを確認
const skeleton = page.getByTestId('skeleton-card');
await expect(skeleton.first()).toBeVisible(); // 可視性は先頭要素で確認
await expect(skeleton).toHaveCount(3); // 3つのプレースホルダー

// データが読み込まれた後、実際のコンテンツが表示されることを確認
await expect(page.getByText('記事タイトル1')).toBeVisible();
await expect(page.getByText('著者A')).toBeVisible();

// スケルトンスクリーンが消えることを確認
await expect(skeleton).toHaveCount(0);
```
