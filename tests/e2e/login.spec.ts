import { test } from "@playwright/test";
import { LoginPage, Account } from "../pages/LoginPage";
import { MoviesPage } from "../pages/Movies";
import { Toast } from "../pages/Components";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.visit();
});

test("Deve logar como administrador", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const moviesPage = new MoviesPage(page);
  const account: Account = {
    email: "admin@zombieplus.com",
    password: "pwd123",
  };

  await loginPage.submitLoginForm(account).then(() => moviesPage.isLoggedIn());
});

test("Não deve logar com senha incorreta", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const toast = new Toast(page);
  const account: Account = {
    email: "admin@zombieplus.com",
    password: "wrongpassword",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await toast.haveText(errorMessage);
});

test("Não deve logar quando o campo email estiver vazio", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const account: Account = {
    email: "",
    password: "wrongpassword",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage = "Campo obrigatório";
  await loginPage.alertHaveText(errorMessage);
});

test("Não deve logar quando o campo senha estiver vazia", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const account: Account = {
    email: "admin@zombieplus.com",
    password: "",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage = "Campo obrigatório";
  await loginPage.alertHaveText(errorMessage);
});

test("Não deve logar quando nenhum campo estiver preenchido", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const account: Account = {
    email: "",
    password: "",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage = "Campo obrigatório";
  await loginPage.alertHaveText([errorMessage, errorMessage]);
});
