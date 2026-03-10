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