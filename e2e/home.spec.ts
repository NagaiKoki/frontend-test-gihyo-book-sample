import { test, expect } from "@playwright/test";

// 本章（6 章）で学ぶ Playwright の API を、本書のコード例（コード6.6〜6.37）
// そのままのかたちで収録した E2E テスト。アプリ側（src/pages/）は
// これらのテストが通るように実装してある。

// コード6.6 Playwrightのテスト関数
test("ホームページのタイトルが正しく表示される", async ({ page }) => {
  // ページにアクセス
  await page.goto("/");

  // ページタイトルを確認
  await expect(page).toHaveTitle("My App");
});

// コード6.8 getByRoleで要素を取得する
test("ボタンが表示される", async ({ page }) => {
  await page.goto("/");

  // role が button の要素を取得
  const button = page.getByRole("button", { name: "送信" });

  await expect(button).toBeVisible();
});

// コード6.9 getByText()で要素を取得する
test("メッセージが表示される", async ({ page }) => {
  await page.goto("/");

  const message = page.getByText("ログインに成功しました");

  await expect(message).toBeVisible();
});

// コード6.10 getByLabel()で要素を取得する
test("フォームフィールドが表示される", async ({ page }) => {
  await page.goto("/login");

  const emailInput = page.getByLabel("メールアドレス");

  await expect(emailInput).toBeVisible();
});

// コード6.11 getByPlaceholder()で要素を取得する
test("プレースホルダーが設定されている", async ({ page }) => {
  await page.goto("/search");

  const searchInput = page.getByPlaceholder("キーワードを入力");

  await expect(searchInput).toBeVisible();
});

// コード6.12 getByTestId()で要素を取得する
test("カスタムコンポーネントが表示される", async ({ page }) => {
  await page.goto("/");

  const customElement = page.getByTestId("user-profile");

  await expect(customElement).toBeVisible();
});

// コード6.17 複数のマッチャーを組み合わせた実践的な例
test("ログインフォームの初期状態を検証", async ({ page }) => {
  await page.goto("/login");

  // 見出しが表示されている
  await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();

  // メールアドレス入力フィールドが表示されている
  const emailInput = page.getByLabel("メールアドレス");
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEnabled();
  await expect(emailInput).toHaveValue("");

  // パスワード入力フィールドが表示されている
  const passwordInput = page.getByLabel("パスワード");
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toHaveAttribute("type", "password");

  // 送信ボタンが表示され、有効になっている
  const submitButton = page.getByRole("button", { name: "ログイン" });
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
});

// コード6.18 click()メソッドを使用する
test("ボタンをクリックするとメッセージが表示される", async ({ page }) => {
  await page.goto("/");

  // ボタンをクリック
  await page.getByRole("button", { name: "表示" }).click();

  // メッセージが表示されることを確認
  await expect(page.getByText("ボタンがクリックされました")).toBeVisible();
});

// コード6.19 fill()メソッドを使用する
test("フォームに入力できる", async ({ page }) => {
  await page.goto("/contact");

  // 名前を入力
  await page.getByLabel("お名前").fill("山田太郎");

  // メールアドレスを入力
  await page.getByLabel("メールアドレス").fill("yamada@example.com");

  // メッセージを入力
  await page.getByLabel("お問い合わせ内容").fill("テスト送信です");

  // 入力された値を確認
  await expect(page.getByLabel("お名前")).toHaveValue("山田太郎");
  await expect(page.getByLabel("メールアドレス")).toHaveValue(
    "yamada@example.com",
  );
});

// コード6.21 チェックボックスを操作する
test("チェックボックスを選択できる", async ({ page }) => {
  await page.goto("/settings");

  // チェックボックスをオンにする
  await page.getByLabel("通知を受け取る").check();

  // チェックされていることを確認
  await expect(page.getByLabel("通知を受け取る")).toBeChecked();

  // チェックボックスをオフにする
  await page.getByLabel("通知を受け取る").uncheck();

  // チェックが外れていることを確認
  await expect(page.getByLabel("通知を受け取る")).not.toBeChecked();
});

// コード6.22 ドロップダウンメニューを操作する
test("セレクトボックスで選択できる", async ({ page }) => {
  await page.goto("/form");

  // 値で選択
  await page.getByLabel("都道府県").selectOption("tokyo");

  // ラベルテキストで選択
  await page.getByLabel("都道府県").selectOption({ label: "東京都" });

  // 選択されていることを確認
  await expect(page.getByLabel("都道府県")).toHaveValue("tokyo");
});

// コード6.23 ページ遷移の確認
test("リンクをクリックすると詳細ページに遷移する", async ({ page }) => {
  await page.goto("/");

  // リンクをクリック
  await page.getByRole("link", { name: "詳細を見る" }).click();

  // URL が変わったことを確認
  await expect(page).toHaveURL("/details");

  // 遷移先のページに期待する要素が表示されることを確認
  await expect(page.getByRole("heading", { name: "詳細情報" })).toBeVisible();
});

// コード6.24 ログインフォームに対するテストの例
test("ログインフォームに入力して送信できる", async ({ page }) => {
  await page.goto("/login");

  // フォームに入力
  await page.getByLabel("メールアドレス").fill("user@example.com");
  await page.getByLabel("パスワード").fill("password123");

  // 送信ボタンをクリック
  await page.getByRole("button", { name: "ログイン" }).click();

  // ダッシュボードページに遷移したことを確認
  await expect(page).toHaveURL("/dashboard");

  // ウェルカムメッセージが表示されることを確認
  await expect(page.getByText("ようこそ、user@example.com")).toBeVisible();
});

// コード6.28 フォーム送信に対するテストの例
test("フォーム送信後に成功メッセージが表示される", async ({ page }) => {
  await page.goto("/contact");

  // フォームに入力
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("メールアドレス").fill("yamada@example.com");
  await page.getByLabel("お問い合わせ内容").fill("お問い合わせです");

  // 送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click();

  // ローディング表示が出ることを確認(オプション)
  await expect(page.getByTestId("loading-spinner")).toBeVisible();

  // ローディングが消えるまで待つ
  await page.getByTestId("loading-spinner").waitFor({ state: "hidden" });

  // 成功メッセージが表示されることを確認
  await expect(page.getByText("送信が完了しました")).toBeVisible();

  // フォームがクリアされていることを確認
  await expect(page.getByLabel("お名前")).toHaveValue("");
});

// コード6.29 問い合わせフォームに対するテスト
test("お問い合わせフォームに入力して送信できる", async ({ page }) => {
  await page.goto("/contact");

  // フォームの初期状態を確認
  await expect(
    page.getByRole("heading", { name: "お問い合わせ" }),
  ).toBeVisible();

  // 各フィールドに入力
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("メールアドレス").fill("yamada@example.com");
  await page
    .getByLabel("お問い合わせ内容")
    .fill("製品の詳細について教えてください。");

  // 送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click();

  // 成功メッセージが表示されることを確認
  await expect(
    page.getByText("お問い合わせを受け付けました。ありがとうございます。"),
  ).toBeVisible();
});

// コード6.30 必須項目の未入力に対するテスト
test("必須フィールドが未入力の場合はエラーメッセージが表示される", async ({
  page,
}) => {
  await page.goto("/contact");

  // フィールドに入力せずに送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click();

  // 各フィールドにエラーメッセージが表示されることを確認
  await expect(page.getByText("お名前を入力してください")).toBeVisible();
  await expect(
    page.getByText("メールアドレスを入力してください"),
  ).toBeVisible();
  await expect(
    page.getByText("お問い合わせ内容を入力してください"),
  ).toBeVisible();

  // フォームが送信されていないことを確認(成功メッセージが表示されない)
  await expect(
    page.getByText("お問い合わせを受け付けました"),
  ).not.toBeVisible();
});

// コード6.31 入力形式のバリデーションのテスト
test("メールアドレスの形式が不正な場合はエラーメッセージが表示される", async ({
  page,
}) => {
  await page.goto("/contact");

  // 名前とお問い合わせ内容は正しく入力
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("お問い合わせ内容").fill("質問があります");

  // メールアドレスに不正な形式の値を入力
  await page.getByLabel("メールアドレス").fill("invalid-email");

  // 送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click();

  // メールアドレスのエラーメッセージが表示されることを確認
  await expect(
    page.getByText("正しいメールアドレスを入力してください"),
  ).toBeVisible();

  // フォームが送信されていないことを確認
  await expect(
    page.getByText("お問い合わせを受け付けました"),
  ).not.toBeVisible();
});

// コード6.32 エラー解消後の再送信のテスト
test("エラー解消後に正常に送信できる", async ({ page }) => {
  await page.goto("/contact");

  // まず不正な入力で送信してエラーを発生させる
  await page.getByLabel("メールアドレス").fill("invalid-email");
  await page.getByRole("button", { name: "送信" }).click();

  // エラーメッセージが表示されることを確認
  await expect(
    page.getByText("正しいメールアドレスを入力してください"),
  ).toBeVisible();

  // 正しい値を入力し直す
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("メールアドレス").fill("yamada@example.com");
  await page.getByLabel("お問い合わせ内容").fill("質問があります");

  // 再度送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click();

  // エラーメッセージが消えて成功メッセージが表示されることを確認
  await expect(
    page.getByText("正しいメールアドレスを入力してください"),
  ).not.toBeVisible();
  await expect(page.getByText("お問い合わせを受け付けました")).toBeVisible();
});

// コード6.33 サーバーレスポンスの確認
test("フォーム送信時に正しい API リクエストが送信される", async ({ page }) => {
  await page.goto("/contact");

  // フォームに入力
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("メールアドレス").fill("yamada@example.com");
  await page.getByLabel("お問い合わせ内容").fill("質問があります");

  // レスポンスを待機しつつ送信ボタンをクリック
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/contact") && response.status() === 200,
  );

  await page.getByRole("button", { name: "送信" }).click();

  // レスポンスが返ってくることを確認
  const response = await responsePromise;
  expect(response.ok()).toBe(true);

  // 成功メッセージが表示されることを確認
  await expect(page.getByText("お問い合わせを受け付けました")).toBeVisible();
});

// コード6.34 エラーメッセージ表示の確認
test("サーバーエラー時にエラーメッセージが表示される", async ({ page }) => {
  // API レスポンスをモック化してエラーレスポンスを返す
  await page.route("/api/contact", (route) => {
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Internal Server Error" }),
    });
  });

  await page.goto("/contact");

  // フォームに入力
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("メールアドレス").fill("yamada@example.com");
  await page.getByLabel("お問い合わせ内容").fill("質問があります");

  // 送信ボタンをクリック
  await page.getByRole("button", { name: "送信" }).click();

  // サーバーエラーのメッセージが表示されることを確認
  await expect(
    page.getByText("送信に失敗しました。時間をおいて再度お試しください。"),
  ).toBeVisible();

  // 成功メッセージが表示されないことを確認
  await expect(
    page.getByText("お問い合わせを受け付けました"),
  ).not.toBeVisible();
});

// コード6.35 フォーム送信中の状態管理
test("フォーム送信中は送信ボタンが無効化される", async ({ page }) => {
  // API レスポンスを遅延させる
  await page.route("/api/contact", async (route) => {
    // 2秒待機してからレスポンスを返す
    await new Promise((resolve) => setTimeout(resolve, 2000));
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto("/contact");

  // フォームに入力
  await page.getByLabel("お名前").fill("山田太郎");
  await page.getByLabel("メールアドレス").fill("yamada@example.com");
  await page.getByLabel("お問い合わせ内容").fill("質問があります");

  const submitButton = page.getByRole("button", { name: "送信" });

  // 送信前はボタンが有効
  await expect(submitButton).toBeEnabled();

  // 送信ボタンをクリック
  await submitButton.click();

  // 送信中はボタンが無効化されることを確認
  await expect(submitButton).toBeDisabled();

  // ローディングスピナーが表示されることを確認
  await expect(page.getByTestId("loading-spinner")).toBeVisible();

  // 送信完了後はボタンが再度有効になることを確認
  await expect(page.getByText("お問い合わせを受け付けました")).toBeVisible();
  await expect(submitButton).toBeEnabled();

  // ローディングスピナーが非表示になることを確認
  await expect(page.getByTestId("loading-spinner")).not.toBeVisible();
});

// コード6.36 APIレスポンス待機の基本
test("API からデータを取得して表示する", async ({ page }) => {
  // ページ遷移前にレスポンスの待機を設定しておく
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/api/users") && response.ok(),
  );

  await page.goto("/users");

  // レスポンスが返ってくることを確認
  const response = await responsePromise;

  // レスポンスの内容を確認
  const data = await response.json();
  expect(data).toHaveProperty("users");
  expect(Array.isArray(data.users)).toBe(true);

  // データが画面に表示されることを確認
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("row")).toHaveCount(data.users.length + 1); // ヘッダー行を含む
});

// コード6.37 ローディング状態の確認
test("データ取得中はローディングスピナーが表示される", async ({ page }) => {
  // API レスポンスを遅延させる
  await page.route("/api/products", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        products: [
          { id: 1, name: "商品A", price: 1000 },
          { id: 2, name: "商品B", price: 2000 },
        ],
      }),
    });
  });

  await page.goto("/products");

  // ローディングスピナーが表示されることを確認
  const loadingSpinner = page.getByTestId("loading-spinner");
  await expect(loadingSpinner).toBeVisible();

  // データが表示されることを確認
  await expect(page.getByText("商品A")).toBeVisible();

  // ローディングスピナーが非表示になることを確認
  await expect(loadingSpinner).not.toBeVisible();
});
