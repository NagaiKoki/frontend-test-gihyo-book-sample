# プロジェクト概要

技術評論社『フロントエンドテスト』のサンプルリポジトリです。
React + TypeScript + Vite で構築されており、本書で扱うテスト手法（ロジックテスト・
コンポーネントテスト・E2E テスト・ビジュアルリグレッションテスト）を一通り体験できる
構成になっています。

## テストについて

### 使用するテストフレームワーク・ライブラリ

- ロジックテスト（純粋関数・カスタム Hook）：Vitest
- コンポーネントテスト：@storybook/addon-vitest（Storybook の play 関数を使用）
- jsdom 上のコンポーネントテスト：React Testing Library + Vitest
- E2E テスト：Playwright
- API モック：MSW（Mock Service Worker）
- ビジュアルリグレッションテスト：Chromatic（Storybook）

### ファイル命名規則

- ロジックテスト：`*.test.ts`（テスト対象ファイルと同じディレクトリに配置）
- jsdom コンポーネントテスト：`*.test.tsx`（テスト対象と同じディレクトリ）
- コンポーネントテスト：`*.stories.tsx`（play 関数付き）
- E2E テスト：`e2e/` ディレクトリ配下に `*.spec.ts`（Page Object は `e2e/pages/`）

### テストの記述スタイル

- テストケースの説明（describe・test の文字列）は日本語で記述する
- モックには `vi.fn()` を使用し、`vi.mock()` によるモジュールモックは避ける
- 非同期処理の待機には `waitFor` を使用する
- 要素の取得には `data-testid` ではなく role・label・text を優先する

### MSW ハンドラーの場所

- 共通ハンドラー：`src/mocks/handlers.ts`
- ドメイン別ハンドラー：`src/mocks/handlers/`（`users.ts` / `todos.ts`）
- モックデータ：`src/mocks/data/`
- ブラウザ用セットアップ：`src/mocks/browser.ts`

## よく使うコマンド

- `npm run dev`：開発サーバーを起動する
- `npm run build`：型チェック（`tsc -b`）とビルドを実行する
- `npm test`：Vitest を実行する（ロジック・jsdom コンポーネントテスト）
- `npm run test:storybook`：Storybook の play 関数によるコンポーネントテストを実行する
- `npm run test:e2e`：Playwright による E2E テストを実行する
- `npm run storybook`：Storybook を起動する
- `npm run chromatic`：Chromatic でビジュアルリグレッションテストを実行する
- `npm run lint` / `npm run lint:css`：ESLint / Stylelint を実行する
- `npm run format` / `npm run format:check`：Prettier で整形 / 整形チェックする

## ディレクトリ構成

```
src/
├── components/ # UI コンポーネント（*.tsx, *.stories.tsx, *.test.tsx）
├── pages/      # ルーティング単位のページコンポーネント
├── hooks/      # カスタム Hook（*.ts, *.test.ts）
├── utils/      # ユーティリティ関数・サービス（*.ts, *.test.ts）
├── types/      # 型定義
└── mocks/      # MSW のモックハンドラー・モックデータ
e2e/            # Playwright の E2E テスト（pages/ に Page Object）
```

## 運用方針

CLAUDE.md に書く内容は、チームで合意した「プロジェクトの標準」であるべきです。個人の
好みではなく、コードレビューで求められるルールを記述します。プロジェクトの状況が変わっ
たら CLAUDE.md も更新し、コードと同様にバージョン管理・レビューを経て更新します。
個人のみの設定は `CLAUDE.local.md` に記述してください（自動で `.gitignore` に追加されます）。
