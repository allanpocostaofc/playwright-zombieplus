import { test } from "@playwright/test"
import { LandingPage, Lead } from "../pages/LandingPage"
import { Toast } from "../pages/Components"

let landingPage: LandingPage;
let toast: Toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page);
  await landingPage.visit();
});

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const lead: Lead = {
    name: "Allan Costa",
    email: "allan.costa@armcosta.com",
  };

  await landingPage.openModalLead();

  await landingPage.submitLeadForm(lead);

  const text: string = 
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toast.haveText(text);
});

test("Não deve cadastrar um lead com e-mail incorreto", async ({
  page,
}) => {
  const lead: Lead = {
    name: "Allan Costa",
    email: "allan.costa@armcosta",
  };

  await landingPage.openModalLead();

  await landingPage.submitLeadForm(lead);

  const text: string = "Email incorreto";
  await landingPage.alertHasText([text]);
});

test("Não deve cadastrar um lead sem o campo nome completo", async ({
  page,
}) => {
  const lead: Lead = {
    name: "",
    email: "allan.costa@armcosta.com",
  };

  await landingPage.openModalLead();

  await landingPage.submitLeadForm(lead);

  const text: string = "Campo obrigatório";
  await landingPage.alertHasText([text]);
});

test("Não deve cadastrar um lead sem o campo email", async ({
  page,
}) => {
  const lead: Lead = {
    name: "Allan Costa",
    email: "",
  };

  await landingPage.openModalLead();

  await landingPage.submitLeadForm(lead);
  const text: string = "Campo obrigatório";
  await landingPage.alertHasText([text]);
});

test("Não deve cadastrar um lead sem nenhum campo preenchido", async ({
  page,
}) => {
  const lead: Lead = {
    name: "",
    email: "",
  };

  await landingPage.openModalLead();

  await landingPage.submitLeadForm(lead);

  const text = "Campo obrigatório";
  await landingPage.alertHasText([text, text]);
});
