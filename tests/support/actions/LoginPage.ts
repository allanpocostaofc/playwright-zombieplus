import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export interface Account {
  email: string;
  password: string;
}

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("/admin/login");
  }

  async submitLoginForm(account: Account) {
    await this.page
      .locator(".login-form")
      .getByPlaceholder("E-mail")
      .fill(account.email);
    await this.page
      .locator(".login-form")
      .getByPlaceholder("Senha")
      .fill(account.password);
    await this.page
      .locator(".login-form")
      .getByText("Entrar")
      .click();
  }

  async isLoggedIn() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/.*admin\/movies/);
  }
}
