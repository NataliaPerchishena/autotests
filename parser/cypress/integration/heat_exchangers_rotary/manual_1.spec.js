context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/rotary')
  })

  it('calculate_button', () => {
    cy.get('#wheel_type').select('condensation_rotor_r_ex', { force: true});
    cy.get('#model').select('RS-EX D400-1.6/7-0-1 600x600x295', { force: true});
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
    cy.get('#calculation_winter_h_output_temperature').should('have.text', '17.9');
    cy.get('#calculation_winter_h_output_relative_humidity').should('have.text', '36.1');
    cy.get('#calculation_winter_h_face_air_velocity').should('have.text', '1.06');
    cy.get('#calculation_winter_h_condensation').should('have.text', '0');
    cy.get('#calculation_winter_h_temperature_efficiency_dry').should('have.text', '83.87');
    cy.get('#calculation_winter_h_air_pressure_drop').should('have.text', '45.26');
    cy.get('#calculation_winter_h_heat_recovery_dry').should('have.text', '0.93');

    cy.get('#calculation_summer_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_summer_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_summer_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_summer_c_output_temperature').should('have.text', '28.32');
    cy.get('#calculation_summer_c_output_relative_humidity').should('have.text', '57.45');
    cy.get('#calculation_summer_c_face_air_velocity').should('have.text', '1.16');
    cy.get('#calculation_summer_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_c_temperature_efficiency_dry').should('have.text', '83.48');
    cy.get('#calculation_summer_c_air_pressure_drop').should('have.text', '49.79');
    cy.get('#calculation_summer_c_heat_recovery_dry').should('have.text', '-0.5');
  
    cy.checkBasic();
  })
})