import { test, expect } from "@playwright/test";

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play./ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page.getByPlaceholder("Seu nome completo").fill("Allan Costa");

  await page
    .getByPlaceholder("Seu email principal")
    .fill("allan.costa@armcosta.com");

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await expect(page.locator(".toast")).toHaveText(message);

  await expect(page.locator(".toast")).toBeHidden({ timeout: 5000 });
});

test("Não deve cadastrar um lead com e-mail incorreto", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play./ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page.getByPlaceholder("Seu nome completo").fill("Allan Costa");

  await page
    .getByPlaceholder("Seu email principal")
    .fill("allan.costa@armcosta");

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  const message = "Email incorreto";
  await expect(page.getByTestId("modal").locator(".alert")).toHaveText(message);
});

test("Não deve cadastrar um lead sem o campo nome completo", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play./ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page
    .getByPlaceholder("Seu email principal")
    .fill("allan.costa@armcosta.com");

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  const message = "Campo obrigatório";
  await expect(page.getByTestId("modal").locator(".alert")).toHaveText(message);
});

test("Não deve cadastrar um lead sem o campo email", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play./ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page.getByPlaceholder("Seu nome completo").fill("Allan Costa");

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  const message = "Campo obrigatório";
  await expect(page.getByTestId("modal").locator(".alert")).toHaveText(message);
});

test("Não deve cadastrar um lead sem nenhum campo preenchido", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play./ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  const message = "Campo obrigatório";
  await expect(page.getByTestId("modal").locator(".alert")).toHaveText([message, message]);
});
