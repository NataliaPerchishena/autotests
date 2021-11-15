context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/crossflow')
  })

  it('calculate_button', () => {
    cy.get('#model').select('Hp-EX4 200', { force: true});
    cy.get('#mode').select('both', { force: true});
    cy.get('#winter_standard_airflow').clear().type('250');
    cy.get('#winter_temperature_in_supply').clear().type('7');
    cy.get('#winter_temperature_in_extract').clear().type('20');
    cy.get('#winter_relative_humidity_in_supply').clear().type('75');
    cy.get('#winter_relative_humidity_in_extract').clear().type('37');
    cy.get('#summer_standard_airflow').clear().type('250');
    cy.get('#summer_temperature_in_supply').clear().type('35');
    cy.get('#summer_temperature_in_extract').clear().type('27');
    cy.get('#summer_relative_humidity_in_supply').clear().type('40');
    cy.get('#summer_relative_humidity_in_extract').clear().type('47');

    cy.get('#submit').click({ force: true });
    cy.wait(1000);

    cy.get('#calculation_winter_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_winter_h_input_temperature').should('have.text', '7');
    cy.get('#calculation_winter_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_winter_h_input_relative_humidity').should('have.text', '75');
    cy.get('#calculation_winter_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_winter_h_output_temperature').should('have.text', '14.33');
    cy.get('#calculation_winter_h_output_relative_humidity').should('have.text', '45.54');
    cy.get('#calculation_winter_h_face_air_velocity').should('have.text', '1.66');
    cy.get('#calculation_winter_h_condensation').should('have.text', '0');
    cy.get('#calculation_winter_h_temperature_efficiency_dry').should('have.text', '56.41');
    cy.get('#calculation_winter_h_air_pressure_drop').should('have.text', '119.04');
    cy.get('#calculation_winter_h_heat_recovery_dry').should('have.text', '0.62');

    cy.get('#calculation_summer_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_summer_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_summer_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_summer_c_output_temperature').should('have.text', '30.58');
    cy.get('#calculation_summer_c_output_relative_humidity').should('have.text', '50.16');
    cy.get('#calculation_summer_c_face_air_velocity').should('have.text', '1.82');
    cy.get('#calculation_summer_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_c_temperature_efficiency_dry').should('have.text', '55.23');
    cy.get('#calculation_summer_c_air_pressure_drop').should('have.text', '138.18');
    cy.get('#calculation_summer_c_heat_recovery_dry').should('have.text', '-0.31');

    cy.checkBasic();
  })
})
  