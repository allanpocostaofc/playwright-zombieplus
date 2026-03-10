import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class Toast {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async haveText(text: string) {
    const toast = this.page.locator(".toast");
    await expect(toast).toHaveText(text);
    await expect(toast).not.toBeVisible({ timeout: 6000 });
  }
}
