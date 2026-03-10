import { expect, test } from "@playwright/test"
import { LandingPage, Lead } from "../pages/LandingPage"
import { Toast } from "../pages/Components"
import { faker } from "@faker-js/faker";

const MESSAGES = {
  SUCCESS: "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!",
  EXISTING_EMAIL: "O endereço de e-mail fornecido já está registrado em nossa fila de espera.",
  INVALID_EMAIL: "Email incorreto",
  REQUIRED_FIELD: "Campo obrigatório",
} as const;

test.beforeEach(async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.visit();
});

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const toast = new Toast(page);
  
  const lead: Lead = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };

  await landingPage.openModalLead();
  await landingPage.submitLeadForm(lead);
  await toast.haveText(MESSAGES.SUCCESS);
});

test("Não deve cadastrar um lead existente", async ({ page, request }) => {
  const landingPage = new LandingPage(page);
  const toast = new Toast(page);
  
  const lead: Lead = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };

  const newLead = await request.post('/api/leads', {
    data: lead
  });
  expect(newLead.ok()).toBeTruthy();

  await landingPage.openModalLead();
  await landingPage.submitLeadForm(lead);
  await toast.haveText(MESSAGES.EXISTING_EMAIL);
});

test("Não deve cadastrar um lead com e-mail incorreto", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  const lead: Lead = {
    name: "Allan Costa",
    email: "allan.costa@armcosta",
  };

  await landingPage.openModalLead();
  await landingPage.submitLeadForm(lead);
  await landingPage.alertHasText([MESSAGES.INVALID_EMAIL]);
});

test("Não deve cadastrar um lead sem o campo nome completo", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  const lead: Lead = {
    name: "",
    email: "allan.costa@armcosta.com",
  };

  await landingPage.openModalLead();
  await landingPage.submitLeadForm(lead);
  await landingPage.alertHasText([MESSAGES.REQUIRED_FIELD]);
});

test("Não deve cadastrar um lead sem o campo email", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  const lead: Lead = {
    name: "Allan Costa",
    email: "",
  };

  await landingPage.openModalLead();
  await landingPage.submitLeadForm(lead);
  await landingPage.alertHasText([MESSAGES.REQUIRED_FIELD]);
});

test("Não deve cadastrar um lead sem nenhum campo preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  const lead: Lead = {
    name: "",
    email: "",
  };

  await landingPage.openModalLead();
  await landingPage.submitLeadForm(lead);
  await landingPage.alertHasText([MESSAGES.REQUIRED_FIELD, MESSAGES.REQUIRED_FIELD]);
});
