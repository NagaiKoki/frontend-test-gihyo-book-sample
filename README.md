# frontend-test-gihyo-book-sample

書籍『フロントエンドテスト』(技術評論社) のハンズオン用サンプルリポジトリです。Vite + React + TypeScript の最小構成からスタートし、本書を読み進めながら各章のテストツールを実際に導入していきます。**各章のハンズオンはブランチで管理**しているため、章を進めるときは対象のブランチに切り替えて作業します。

## 必要な環境

- **Node.js v20 以上（LTS 推奨）** — 本書 2.1.1 と整合。動作確認は v22 で行っています。`.nvmrc` を同梱しているので、nvm 利用時は `nvm use` でバージョンを揃えられます。
- npm（Node.js に同梱）
- Git
- エディタ（本書では VS Code を前提に解説します）

### 推奨 VS Code 拡張機能（本書 表2.2）

`.vscode/extensions.json` に以下を登録しています。VS Code でこのリポジトリを開くとインストールを推奨されます。

| 拡張機能                    | 識別子                     | 関連する章       |
| --------------------------- | -------------------------- | ---------------- |
| ESLint                      | `dbaeumer.vscode-eslint`   | 3 章             |
| Prettier - Code formatter   | `esbenp.prettier-vscode`   | 3 章             |
| Vitest                      | `vitest.explorer`          | 4〜5 章、8〜9 章 |
| Playwright Test for VS Code | `ms-playwright.playwright` | 6 章             |

## セットアップ

```bash
git clone <このリポジトリのURL>
cd frontend-test-gihyo-book-sample
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173/` にアクセスし、アプリケーションが表示されれば準備完了です。開発サーバーは `Ctrl + C` で停止できます。

## ブランチの使い方

本書のハンズオンは章ごとにブランチで管理しています。

```bash
git branch -a            # ブランチの一覧を表示
git checkout chapter-3   # 3 章を始めるブランチに切り替え
```

各 `chapter-N` ブランチは「**N 章を始める状態**」になっています。

- その章で新しく導入するツール（例: 3 章の Prettier）は**まだインストールされていません**。本書の手順に従って、自分で `npm i -D ...` しながら進めてください。
- N 章を終えた完成形は、次の `chapter-(N+1)` ブランチで確認できます。
- 本書のテストツールを一通り導入し終えた状態は `chapter-10`（MSW まで）/ `chapter-11`（AI 連携設定まで）で確認できます。

| ブランチ     | 内容                                                                                  |
| ------------ | ------------------------------------------------------------------------------------- |
| `main`       | 初期状態（本書 2 章のセットアップ完了時点）                                           |
| `chapter-3`  | 3 章「静的テスト」を始める状態（Prettier・ESLint・Stylelint・Biome のデモを同梱）     |
| `chapter-4`  | 4 章「ロジックテスト」を始める状態（= 3 章まで完了）                                  |
| `chapter-5`  | 5 章「コンポーネントテスト（jsdom）」を始める状態（= 4 章まで完了）                   |
| `chapter-6`  | 6 章「E2E テスト」を始める状態（= 5 章まで完了）                                      |
| `chapter-7`  | 7 章「ビジュアルリグレッションテスト」を始める状態（= 6 章まで完了）                  |
| `chapter-8`  | 8 章「コンポーネントテスト（実ブラウザ）」を始める状態（= 7 章まで完了）              |
| `chapter-9`  | 9 章「API 通信を含むテスト（MSW）」を始める状態（= 8 章まで完了）                     |
| `chapter-10` | 10 章「実践的なテスト戦略」を始める状態（= 9 章まで完了。MSW 一式まで導入済み）       |
| `chapter-11` | 11 章「AI 駆動開発とテスト」を始める状態（= 10 章まで完了。`CLAUDE.md`・Skills 同梱） |

## ディレクトリ構成（初期状態 / `main`）

```
frontend-test-gihyo-book-sample/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/      # 5, 7, 8, 9 章で使用（初期は空）
│   ├── hooks/           # 4 章で使用（初期は空）
│   ├── utils/           # 4 章で使用（初期は空）
│   ├── pages/           # 6 章で使用（初期は空）
│   ├── App.tsx          # ルートコンポーネント
│   ├── App.css
│   ├── main.tsx         # エントリーポイント
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── .vscode/             # 推奨拡張・エディタ設定
├── .nvmrc
└── README.md
```

章を進めるごとに、上記の空ディレクトリにコードが追加され、`e2e` などの新しいディレクトリや各種設定ファイル・スクリプトも順次追加されていきます。詳細は本書の該当章を参照してください。

## 利用可能なスクリプト（初期状態）

| スクリプト        | 説明                                                |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | 開発サーバーを起動 (`http://localhost:5173/`)       |
| `npm run build`   | TypeScript の型チェックと本番ビルドを実行 (`dist/`) |
| `npm run preview` | ビルド済みの成果物をローカルでプレビュー            |

3 章以降を進めると、`lint`・`test`・`test:e2e`・`storybook` などのスクリプトが順次追加されていきます。

> [!NOTE]
> 本書本文中のサンプルコードと本リポジトリのコードとで矛盾が生じる箇所（写経するとテストが失敗するケースなど）は、[ERRATA.md](./ERRATA.md) に原因と修正後コードをまとめています。
