import { type Page, type Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByTestId("welcome-message");
    this.logoutButton = page.getByRole("button", { name: "ログアウト" });
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectWelcomeMessage(email: string) {
    await expect(this.welcomeMessage).toHaveText(`ようこそ、${email}`);
  }
}
