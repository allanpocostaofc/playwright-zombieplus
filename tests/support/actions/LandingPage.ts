import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export interface Lead  {
  name: string;
  email: string;
}

export class LandingPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("/");
  }

  async openModalLead() {
    await this.page.getByRole("button", { name: /Aperte o play./ }).click();

    await expect(
      this.page.getByTestId("modal").getByRole("heading")
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(lead: Lead) {
    await this.page.getByPlaceholder("Informe seu nome").fill(lead.name);
    await this.page.getByPlaceholder("Informe seu email").fill(lead.email);

    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }

  async toastHasText(text: string) {
    const toast = this.page.locator(".toast");
    await expect(toast).toHaveText(text);
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }

  async alertHasText(text: string[]) {
    const alert = this.page.getByTestId("modal").locator(".alert");
    await expect(alert).toHaveText(text);
  }
}
