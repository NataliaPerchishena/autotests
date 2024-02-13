module.exports = {
  viewportWidth: 1400,
  viewportHeight: 1200,
  chromeWebSecurity: false,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/production',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  //baseUrl: 'https://blaubergselector.com',
   baseUrl: 'https://blaubergselector.ensocore.com',
  }
}
