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
    redirectionLimit: 100,         // Evita o erro de excesso de redirecionamentos (loop 302 do site)
    chromeWebSecurity: false,      // Evita bloqueios de segurança entre domínios/anúncios
    defaultCommandTimeout: 15000,  // Dá até 15s para elementos responderem no servidor remoto
    pageLoadTimeout: 120000,       // Dá até 2 minutos para carregamento de páginas lentas
    experimentalStudio: true,      // Mantém a gravação visual de testes no modo interativo
    retries: {
      runMode: 2,                  // No GitHub Actions, repete até 2 vezes caso o site oscile
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});