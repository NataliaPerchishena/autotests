context('Vents', () => {

    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
      cy.login(Url);
      cy.wait(1500);
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

    cy.get('#calculation_heater_on_temperature').should('include.text', '-15');
    cy.get('#calculation_heater_off_temperature').should('include.text', '22');
    cy.get('#calculation_heater_on_relative_humidity').should('include.text', '90');
    cy.get('#calculation_heater_off_relative_humidity').should('include.text', '5.6');
    cy.get('#calculation_heater_required_heating_power').should('include.text', '25.5');
    cy.get('#calculation_heater_maximum_heating_power').should('include.text', '59.7');
    cy.get('#calculation_heater_water_pressure_drop').should('include.text', '9.9');
    cy.get('#calculation_heater_water_flow').should('include.text', '0.3');
    cy.get('#calculation_heater_water_in').should('include.text', '80');
    cy.get('#calculation_heater_water_out').should('include.text', '60');
    cy.get('#calculation_heater_glycol').should('include.text', '0');
    cy.get('#calculation_cooler_summer_airflow').should('include.text', '2000');
    cy.get('#calculation_cooler_summer_on_temperature').should('include.text', '30');
    cy.get('#calculation_cooler_summer_off_temperature').should('include.text', '20');
    cy.get('#calculation_cooler_summer_on_relative_humidity').should('include.text', '40');
    cy.get('#calculation_cooler_summer_relative_humidity_output').should('include.text', '58');
    cy.get('#calculation_cooler_summer_evaporation_temperature').should('include.text', '5');
    cy.get('#calculation_cooler_summer_superheat').should('include.text', '2.5');
    cy.get('#calculation_cooler_summer_condensation_temperature').should('include.text', '45');
    cy.get('#calculation_cooler_summer_subcool').should('include.text', '2.5');
    cy.get('#calculation_cooler_summer_required_power').should('include.text', '10.6');
    cy.get('#calculation_cooler_summer_maximum_power').should('include.text', '17');
    cy.get('#calculation_cooler_summer_condensation').should('include.text', '-5.1');
    cy.get('#calculation_cooler_summer_air_pressure_drop').should('include.text', '17');
    cy.get('#calculation_cooler_summer_face_air_velocity').should('include.text', '1.1');
    cy.get('#calculation_cooler_summer_mass_freon_flow_rate').should('include.text', '249.4');
    cy.get('#calculation_cooler_summer_hydraulic_resistance').should('include.text', '0.2');
    cy.get('#calculation_cooler_summer_refrigerating_agent').should('include.text', 'R410A');
    cy.get('#calculation_fans_winter_ia').should('include.text', '0.8');
    cy.get('#calculation_fans_winter_number_of_fans').should('include.text', '1');
    cy.get('#calculation_fans_winter_sfp').should('include.text', '931.8');

    cy.checkBasicAfterAuth();
  })
})








