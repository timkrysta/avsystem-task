const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://angular-qa-recruitment-app.netlify.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
