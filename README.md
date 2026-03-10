# Automação de Testes do ZombiePlus

Este projeto contém testes automatizados para a aplicação ZombiePlus.

## Tecnologias

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Estrutura do Projeto

O projeto segue o padrão Page Object Model (POM) para melhor organização e manutenção:

- **tests/**: Contém os cenários de teste (arquivos `.spec.ts`).
- **pages/**: Contém as classes de Page Objects que encapsulam as ações e elementos das páginas.
- **playwright.config.ts**: Configurações globais do Playwright.

## Instalação e Dependências

Este projeto utiliza o **Yarn** como gerenciador de pacotes principal para a instalação de dependências e execução de scripts. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu ambiente.

### Utilizando Yarn (Recomendado)

1. Instale as dependências do projeto:

   ```sh
   yarn install
   ```

2. Instale os navegadores necessários para o Playwright:

   ```sh
   yarn playwright install
   ```

### Utilizando NPM (Alternativa)

Caso prefira utilizar o **NPM**, execute os seguintes comandos:

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Instale os navegadores do Playwright:

   ```sh
   npx playwright install
   ```

## Como executar os testes

Existem diversas formas de executar os testes, dependendo da sua necessidade (execução completa, modo interativo, debug, etc).

### Execução padrão (Headless)

Executa todos os testes em modo headless (sem abrir o navegador visualmente).

```sh
yarn playwright test
# ou via npm
# npx playwright test
```

### Modo UI (Interativo)

Abre a interface gráfica do Playwright, permitindo explorar, executar e depurar testes de forma visual.

```sh
yarn playwright test --ui
```

### Execução com navegador visível (Headed)

Executa os testes abrindo a janela do navegador, útil para acompanhar a execução visualmente.

```sh
yarn playwright test --headed
```

### Executar um navegador específico

Roda os testes apenas no navegador especificado (configurado no `playwright.config.ts`).

```sh
yarn playwright test --project=chromium
```

### Executar um arquivo específico

Executa apenas os testes contidos em um arquivo específico.

```sh
yarn playwright test tests/login.spec.ts
```

### Executar no modo debug

Roda os testes no modo debug, útil para identificar erros sem interromper a execução.

```sh
yarn playwright test --debug
```

### Visualizar Relatório

Abre o relatório HTML gerado após a execução dos testes.

```sh
yarn playwright show-report
```
