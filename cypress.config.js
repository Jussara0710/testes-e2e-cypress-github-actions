const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Testes E2E - Automation Exercise',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    defaultCommandTimeout: 8000, // Aguarda até 8 segundos pelos elementos
    pageLoadTimeout: 60000,       // Aguarda até 60 segundos pelo carregamento completo da página
    experimentalStudio: true,     // Ativa a gravação visual de seletores e ações
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});