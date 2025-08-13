import { test } from "@playwright/test"
import { LoginPage, Login } from "../support/actions/LoginPage"

let loginPage: LoginPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  loginPage.visit();
});

test("Deve logar como administrador", async ({ page }) => {
  const account: Login = {
    email: "admin@zombieplus.com",
    password: "pwd123",
  };

  await loginPage.submitLoginForm(account);
  await loginPage.isLoggedIn();
});