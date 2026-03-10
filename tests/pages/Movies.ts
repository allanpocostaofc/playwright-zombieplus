import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class MoviesPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("/admin/movies");
  }

  async isLoggedIn() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/.*admin\/movies/);
  }
}