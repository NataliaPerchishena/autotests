context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/counterflow')
  })
  
  it('calculate_button', () => {
    cy.get('#model').select('HC-EX6 230', { force: true});
    cy.get('#mode').select('both', { force: true});
    cy.get('#winter_standard_airflow_supply').clear().type('250');
    cy.get('#winter_standard_airflow_extract').clear().type('250');
    cy.get('#winter_temperature_in_supply').clear().type('7');
    cy.get('#winter_temperature_in_extract').clear().type('20');
    cy.get('#winter_relative_humidity_in_supply').clear().type('75');
    cy.get('#winter_relative_humidity_in_extract').clear().type('37');
    cy.get('#summer_standard_airflow_supply').clear().type('250');
    cy.get('#summer_standard_airflow_extract').clear().type('250');
    cy.get('#summer_temperature_in_supply').clear().type('35');
    cy.get('#summer_temperature_in_extract').clear().type('27');
    cy.get('#summer_relative_humidity_in_supply').clear().type('40');
    cy.get('#summer_relative_humidity_in_extract').clear().type('47');

    cy.get('#submit').click({ force: true });
    cy.wait(1000);

    cy.get('#calculation_h_input_airflow').should('have.text', '238.89');
    cy.get('#calculation_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_h_input_temperature').should('have.text', '7');
    cy.get('#calculation_h_input_relative_humidity').should('have.text', '75');
    cy.get('#calculation_h_input_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_h_input_wet_bulb_temperature').should('have.text', '5.09');
    cy.get('#calculation_h_input_enthalpy').should('have.text', '18.75');
    cy.get('#calculation_h_output_airflow').should('have.text', '247.81');
    cy.get('#calculation_h_output_temperature').should('have.text', '17.45');
    cy.get('#calculation_h_output_relative_humidity').should('have.text', '37.16');
    cy.get('#calculation_h_output_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_h_output_wet_bulb_temperature').should('have.text', '10.02');
    cy.get('#calculation_h_output_enthalpy').should('have.text', '29.39');
    cy.get('#calculation_h_face_air_velocity').should('have.text', '2.4');
    cy.get('#calculation_h_air_pressure_drop').should('have.text', '271.3');
    cy.get('#calculation_h_temperature_efficiency_dry').should('have.text', '80.4');
    cy.get('#calculation_h_temperature_efficiency_wet').should('have.text', '80.4');
    cy.get('#calculation_h_heat_recovery_dry').should('have.text', '0.88');
    cy.get('#calculation_h_heat_recovery_wet').should('have.text', '0.88');
    cy.get('#calculation_c_input_airflow').should('have.text', '249.98');
    cy.get('#calculation_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_c_input_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_c_input_wet_bulb_temperature').should('have.text', '11.85');
    cy.get('#calculation_c_input_enthalpy').should('have.text', '33.81');
    cy.get('#calculation_c_output_airflow').should('have.text', '241.07');
    cy.get('#calculation_c_output_temperature').should('have.text', '9.55');
    cy.get('#calculation_c_output_relative_humidity').should('have.text', '72.48');
    cy.get('#calculation_c_output_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_c_output_wet_bulb_temperature').should('have.text', '7.2');
    cy.get('#calculation_c_output_enthalpy').should('have.text', '23.15');
    cy.get('#calculation_c_face_air_velocity').should('have.text', '2.52');
    cy.get('#calculation_c_air_pressure_drop').should('have.text', '295.45');
    cy.get('#calculation_c_temperature_efficiency_dry').should('have.text', '80.4');
    cy.get('#calculation_c_temperature_efficiency_wet').should('have.text', '80.4');
    cy.get('#calculation_c_heat_recovery_dry').should('have.text', '-0.88');
    cy.get('#calculation_c_heat_recovery_wet').should('have.text', '-0.88');
    cy.get('#calculation_c_condensation').should('have.text', '0');
    cy.get('#calculation_c_input_airflow').should('have.text', '262.78');
    cy.get('#calculation_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_c_input_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_c_input_wet_bulb_temperature').should('have.text', '23.82');
    cy.get('#calculation_c_input_enthalpy').should('have.text', '71.64');
    cy.get('#calculation_c_output_airflow').should('have.text', '257.34');
    cy.get('#calculation_c_output_temperature').should('have.text', '28.62');
    cy.get('#calculation_c_output_relative_humidity').should('have.text', '56.43');
    cy.get('#calculation_c_output_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_c_output_wet_bulb_temperature').should('have.text', '22.1');
    cy.get('#calculation_c_output_enthalpy').should('have.text', '65.03');
    cy.get('#calculation_c_face_air_velocity').should('have.text', '2.64');
    cy.get('#calculation_c_air_pressure_drop').should('have.text', '324.58');
    cy.get('#calculation_c_temperature_efficiency_dry').should('have.text', '79.77');
    cy.get('#calculation_c_temperature_efficiency_wet').should('have.text', '79.77');
    cy.get('#calculation_c_heat_recovery_dry').should('have.text', '-0.47');
    cy.get('#calculation_c_heat_recovery_wet').should('have.text', '-0.47');
    cy.get('#calculation_c_condensation').should('have.text', '0');
    cy.get('#calculation_h_input_airflow').should('have.text', '255.96');
    cy.get('#calculation_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_h_input_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_h_input_wet_bulb_temperature').should('have.text', '18.95');
    cy.get('#calculation_h_input_enthalpy').should('have.text', '54');
    cy.get('#calculation_h_output_airflow').should('have.text', '261.4');
    cy.get('#calculation_h_output_temperature').should('have.text', '33.38');
    cy.get('#calculation_h_output_relative_humidity').should('have.text', '31.47');
    cy.get('#calculation_h_output_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_h_output_wet_bulb_temperature').should('have.text', '20.87');
    cy.get('#calculation_h_output_enthalpy').should('have.text', '60.57');
    cy.get('#calculation_h_face_air_velocity').should('have.text', '2.58');
    cy.get('#calculation_h_air_pressure_drop').should('have.text', '308.87');
    cy.get('#calculation_h_temperature_efficiency_dry').should('have.text', '79.77');
    cy.get('#calculation_h_temperature_efficiency_wet').should('have.text', '79.77');
    cy.get('#calculation_h_heat_recovery_dry').should('have.text', '0.47');
    cy.get('#calculation_h_heat_recovery_wet').should('have.text', '0.47');

    cy.checkBasic();
  })
})
