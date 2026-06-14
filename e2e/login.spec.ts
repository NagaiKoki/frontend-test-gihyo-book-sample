import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

test("正しい認証情報でログインできる", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");

  await expect(page).toHaveURL("/dashboard");
  await dashboardPage.expectWelcomeMessage("user@example.com");
});

test("誤った認証情報ではログインできない", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("user@example.com", "wrongpassword");

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(
    "メールアドレスまたはパスワードが正しくありません",
  );
  await expect(page).toHaveURL("/login");
});

test("必須項目が未入力の場合はエラーが表示される", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.submitButton.click();

  await expect(loginPage.emailInput).toHaveAttribute("aria-invalid", "true");
  await expect(
    page.getByText("メールアドレスを入力してください"),
  ).toBeVisible();
  await expect(page.getByText("パスワードを入力してください")).toBeVisible();
});

test("ログイン後にログアウトできる", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL("/dashboard");

  await dashboardPage.logout();
  await expect(page).toHaveURL("/login");
});
