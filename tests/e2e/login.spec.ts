import { test } from "@playwright/test"
import { LoginPage, Account } from "../support/actions/LoginPage"

let loginPage: LoginPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  loginPage.visit();
});

test("Deve logar como administrador", async ({ page }) => {
  const account: Account = {
    email: "admin@zombieplus.com",
    password: "pwd123",
  };

  await loginPage.submitLoginForm(account);
  await loginPage.isLoggedIn();
});