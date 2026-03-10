import { test } from "@playwright/test";
import { LoginPage, Account } from "../pages/LoginPage";
import { MoviesPage } from "../pages/Movies";
import { Toast } from "../pages/Components";

let loginPage: LoginPage;
let moviesPage: MoviesPage;
let toast: Toast;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  moviesPage = new MoviesPage(page);
  toast = new Toast(page);
  loginPage.visit();
});

test("Deve logar como administrador", async ({ page }) => {
  const account: Account = {
    email: "admin@zombieplus.com",
    password: "pwd123",
  };

  await loginPage.submitLoginForm(account);
  await moviesPage.isLoggedIn();
});

test("Não deve logar com senha incorreta", async ({ page }) => {
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
  const account: Account = {
    email: "",
    password: "wrongpassword",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage = "Campo obrigatório";
  await loginPage.alertHaveText(errorMessage);
});

test("Não deve logar quando o campo senha estiver vazia", async ({ page }) => {
  const account: Account = {
    email: "admin@zombieplus.com",
    password: "",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage = "Campo obrigatório";
  await loginPage.alertHaveText(errorMessage);
});

test("Não deve logar quando nenhum campo estiver preenchido", async ({ page }) => {
  const account: Account = {
    email: "",
    password: "",
  };

  await loginPage.submitLoginForm(account);

  const errorMessage = "Campo obrigatório";
  await loginPage.alertHaveText([errorMessage, errorMessage]);
});
