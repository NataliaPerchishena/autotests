context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_uvu')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV03 UVU 2500', { force: true });
    cy.get('#airflow').clear().type('2000');  
    cy.get('#pressure_static').clear().type('200');
    cy.get('#supply_heater').select('electric', { force: true});
    cy.get('#supply_cooler').select('water', { force: true });

    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);

    cy.get('#calculation_heater_on_temperature').should('have.text', '-15');
    cy.get('#calculation_heater_off_temperature').should('have.text', '22');
    cy.get('#calculation_heater_on_relative_humidity').should('have.text', '90');
    cy.get('#calculation_heater_off_relative_humidity').should('have.text', '5.62');
    cy.get('#calculation_heater_required_heating_power').should('have.text', '25.48');
    cy.get('#calculation_heater_maximum_heating_power').should('have.text', '36');
    cy.get('#calculation_cooler_summer_airflow').should('have.text', '2000');
    cy.get('#calculation_cooler_summer_on_temperature').should('have.text', '30');
    cy.get('#calculation_cooler_summer_off_temperature').should('have.text', '20');
    cy.get('#calculation_cooler_summer_water_in').should('have.text', '7');
    cy.get('#calculation_cooler_summer_water_out').should('have.text', '12');
    cy.get('#calculation_cooler_summer_on_relative_humidity').should('have.text', '40');
    cy.get('#calculation_cooler_summer_off_relative_humidity').should('have.text', '59.13');
    cy.get('#calculation_cooler_summer_glycol').should('have.text', '0');
    cy.get('#calculation_cooler_summer_required_cooling_power').should('have.text', '10.24');
    cy.get('#calculation_cooler_summer_maximum_cooling_power').should('have.text', '16.28');
    cy.get('#calculation_cooler_summer_condensation').should('have.text', '-4.69');
    cy.get('#calculation_cooler_summer_water_flow').should('have.text', '0.48');
    cy.get('#calculation_cooler_summer_water_pressure_drop').should('have.text', '2.71');
    cy.get('#calculation_cooler_summer_air_pressure_drop').should('have.text', '23.54');
    cy.get('#calculation_cooler_summer_face_air_velocity').should('have.text', '1.39');
    cy.get('#calculation_fans_winter_ia').should('have.text', '1.13');
    cy.get('#calculation_fans_winter_number_of_fans').should('have.text', '1');
    cy.get('#calculation_fans_winter_sfp').should('have.text', '463.7');
    
    cy.checkBasic();
  })
})