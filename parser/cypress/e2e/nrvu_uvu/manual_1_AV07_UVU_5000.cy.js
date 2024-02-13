context('Blauberg', () => {
  before( () => {
  //  Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
      cy.login(Url);
      cy.visit(Url+'/nrvu_uvu')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV07 UVU 5000', { force: true });
    cy.get('#airflow').clear().type('2000');  
    cy.get('#pressure_static').clear().type('200');
    cy.get('#supply_heater').select('water', { force: true});
    cy.get('#supply_cooler').select('freon', { force: true });
    cy.get('#supply_heater_water_temperature_after').clear().type('22');
    cy.get('#supply_heater_water_temperature_in').clear().type('80');
    cy.get('#supply_heater_water_temperature_out').clear().type('60');

    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);
    cy.get('[data-cy=title]').should('include.text', 'Air handler BL07 UVU 5000-HW-CDX');

    //NKV-1000x500-3 heater
    cy.get('#calculation_heater_on_temperature').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', -15);
    cy.get('#calculation_heater_off_temperature').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 22);
    cy.get('#calculation_heater_on_relative_humidity').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 90);
    cy.get('#calculation_heater_off_relative_humidity').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 5.6);
    cy.get('#calculation_heater_required_heating_power').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 25.5);
    cy.get('#calculation_heater_maximum_heating_power').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 59.7);
    cy.get('#calculation_heater_water_pressure_drop').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 9.9);
    cy.get('#calculation_heater_water_flow').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 0.3);
    cy.get('#calculation_heater_water_in').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 80);
    cy.get('#calculation_heater_water_out').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 60);
    cy.get('#calculation_heater_glycol').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 0);
// cooler OKF-1000x500-3
    cy.get('#calculation_cooler_summer_airflow').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 2000);
    cy.get('#calculation_cooler_summer_on_temperature').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 30);
    cy.get('#calculation_cooler_summer_off_temperature').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 20);
    cy.get('#calculation_cooler_summer_on_relative_humidity').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 40);
    cy.get('#calculation_cooler_summer_relative_humidity_output').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 58);
    cy.get('#calculation_cooler_summer_evaporation_temperature').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 5);
    cy.get('#calculation_cooler_summer_superheat').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 2.5);
    cy.get('#calculation_cooler_summer_condensation_temperature').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 45);
    cy.get('#calculation_cooler_summer_subcool').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 2.5);
    cy.get('#calculation_cooler_summer_required_power').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 10.6);
    cy.get('#calculation_cooler_summer_maximum_power').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 17);
    cy.get('#calculation_cooler_summer_condensation').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq',-5.1);
    cy.get('#calculation_cooler_summer_air_pressure_drop_wet').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 21);
    cy.get('#calculation_cooler_summer_air_pressure_drop').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 17);
    cy.get('#calculation_cooler_summer_face_air_velocity').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 1.1);
    cy.get('#calculation_cooler_summer_mass_freon_flow_rate').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 249.4);
    cy.get('#calculation_cooler_summer_hydraulic_resistance').invoke('text').should('be.a', 'string')
    .then(parseFloat).should('be.a', 'number').and('eq', 0.2);
    cy.get('#calculation_cooler_summer_refrigerating_agent').should('include.text', 'R410A');
//fan R3G500RL9601
    cy.get('#calculation_fans_winter_ia').should('include.text', '0.8');
    cy.get('#calculation_fans_winter_number_of_fans').should('include.text', '1');
    cy.get('#calculation_fans_winter_sfp').should('include.text', '934.7');

    cy.checkBasicAfterAuth()
  
  })
})








