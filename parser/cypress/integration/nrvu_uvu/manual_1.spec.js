context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_uvu')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV12 UVU 5000', { force: true });
    cy.get('#airflow').clear().type('2000');  
    cy.get('#pressure_static').clear().type('200');
    cy.get('#supply_heater').select('water', { force: true});
    cy.get('#supply_cooler').select('freon', { force: true });
    cy.get('#supply_heater_water_temperature_after').clear().type('22');
    cy.get('#supply_heater_water_temperature_in').clear().type('80');
    cy.get('#supply_heater_water_temperature_out').clear().type('60');

    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);

    cy.get('#calculation_heater_on_temperature').should('have.text', '-15');
    cy.get('#calculation_heater_off_temperature').should('have.text', '22');
    cy.get('#calculation_heater_on_relative_humidity').should('have.text', '90');
    cy.get('#calculation_heater_off_relative_humidity').should('have.text', '5.62');
    cy.get('#calculation_heater_required_heating_power').should('have.text', '25.48');
    cy.get('#calculation_heater_maximum_heating_power').should('have.text', '56.61');
    cy.get('#calculation_heater_water_pressure_drop').should('have.text', '0.21');
    cy.get('#calculation_heater_water_flow').should('have.text', '0.3');
    cy.get('#calculation_heater_water_in').should('have.text', '80');
    cy.get('#calculation_heater_water_out').should('have.text', '60');
    cy.get('#calculation_heater_glycol').should('have.text', '0');
    cy.get('#calculation_cooler_summer_airflow').should('have.text', '2000');
    cy.get('#calculation_cooler_summer_on_temperature').should('have.text', '30');
    cy.get('#calculation_cooler_summer_off_temperature').should('have.text', '20');
    cy.get('#calculation_cooler_summer_on_relative_humidity').should('have.text', '40');
    cy.get('#calculation_cooler_summer_relative_humidity_output').should('have.text', '57.96');
    cy.get('#calculation_cooler_summer_evaporation_temperature').should('have.text', '5');
    cy.get('#calculation_cooler_summer_superheat').should('have.text', '2.5');
    cy.get('#calculation_cooler_summer_condensation_temperature').should('have.text', '45');
    cy.get('#calculation_cooler_summer_subcool').should('have.text', '2.5');
    cy.get('#calculation_cooler_summer_required_power').should('have.text', '10.61');
    cy.get('#calculation_cooler_summer_maximum_power').should('have.text', '29.22');
    cy.get('#calculation_cooler_summer_condensation').should('have.text', '-5.11');
    cy.get('#calculation_cooler_summer_air_pressure_drop').should('have.text', '8.49');
    cy.get('#calculation_cooler_summer_face_air_velocity').should('have.text', '0.67');
    cy.get('#calculation_cooler_summer_mass_freon_flow_rate').should('have.text', '249.42');
    cy.get('#calculation_cooler_summer_hydraulic_resistance').should('have.text', '0.08');
    cy.get('#calculation_cooler_summer_refrigerating_agent').should('have.text', 'R410A');
    cy.get('#calculation_fans_winter_ia').should('have.text', '0.48');
    cy.get('#calculation_fans_winter_number_of_fans').should('have.text', '1');
    cy.get('#calculation_fans_winter_sfp').should('have.text', '547.96');

    cy.checkBasic()
  })
})








