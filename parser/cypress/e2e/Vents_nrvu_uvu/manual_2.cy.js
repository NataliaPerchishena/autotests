context('Vents', () => {
  before( () => {
  //  Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
      cy.login(Url);
      cy.visit(Url+'/nrvu_uvu');
    
    })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV03 UVU 3500', { force: true });
    cy.get('#airflow').clear().type('2000');  
    cy.get('#pressure_static').clear().type('200');
    cy.get('#supply_heater').select('electric', { force: true});
    cy.get('#supply_cooler').select('water', { force: true });

    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);

    cy.get('#calculation_heater_on_temperature').should('include.text', '-15');
    cy.get('#calculation_heater_off_temperature').should('include.text', '22');
    cy.get('#calculation_heater_on_relative_humidity').should('include.text', '90');
    cy.get('#calculation_heater_off_relative_humidity').should('include.text', '5.6');
    cy.get('#calculation_heater_required_heating_power').should('include.text', '25.5');
    cy.get('#calculation_heater_maximum_heating_power').should('include.text', '45');
    cy.get('#calculation_cooler_summer_airflow').should('include.text', '2000');
    cy.get('#calculation_cooler_summer_on_temperature').should('include.text', '30');
    cy.get('#calculation_cooler_summer_off_temperature').should('include.text', '20');
    cy.get('#calculation_cooler_summer_water_in').should('include.text', '7');
    cy.get('#calculation_cooler_summer_water_out').should('include.text', '12');
    cy.get('#calculation_cooler_summer_on_relative_humidity').should('include.text', '40');
    cy.get('#calculation_cooler_summer_off_relative_humidity').should('include.text', '59.1');
    cy.get('#calculation_cooler_summer_glycol').should('include.text', '0');
    cy.get('#calculation_cooler_summer_required_cooling_power').should('include.text', '10.2');
    cy.get('#calculation_cooler_summer_maximum_cooling_power').should('include.text', '16.3');
    cy.get('#calculation_cooler_summer_condensation').should('include.text', '-4.7');
    cy.get('#calculation_cooler_summer_water_flow').should('include.text', '0.48');
    cy.get('#calculation_cooler_summer_water_pressure_drop').should('include.text', '2.7');
    cy.get('#calculation_cooler_summer_air_pressure_drop').should('include.text', '23.5');
    cy.get('#calculation_cooler_summer_face_air_velocity').should('include.text', '1.4');
    cy.get('#calculation_fans_winter_ia').should('include.text', '1.2');
    cy.get('#calculation_fans_winter_number_of_fans').should('include.text', '1');
    cy.get('#calculation_fans_winter_sfp').should('include.text', '1450');
    
    cy.checkBasicAfterAuth();
  })
})