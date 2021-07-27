context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/rotary')
  })

  it('calculate_button', () => {
    cy.get('#wheel_type').select('epoxy_coated_r_k_ex', { force: true});
    cy.get('#model').select('R-K-EX D400-1.6/7-0-1 600x600x295', { force: true});
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
    
    cy.get('#calculation_h_input_airflow').should('have.text', '237.96');
    cy.get('#calculation_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_h_input_temperature').should('have.text', '7');
    cy.get('#calculation_h_input_relative_humidity').should('have.text', '75');
    cy.get('#calculation_h_input_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_h_input_wet_bulb_temperature').should('have.text', '5.09');
    cy.get('#calculation_h_input_enthalpy').should('have.text', '18.75');
    cy.get('#calculation_h_output_airflow').should('have.text', '247.89');
    cy.get('#calculation_h_output_temperature').should('have.text', '18.69');
    cy.get('#calculation_h_output_relative_humidity').should('have.text', '34.33');
    cy.get('#calculation_h_output_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_h_output_wet_bulb_temperature').should('have.text', '10.49');
    cy.get('#calculation_h_output_enthalpy').should('have.text', '30.48');
    cy.get('#calculation_h_face_air_velocity').should('have.text', '1.05');
    cy.get('#calculation_h_air_pressure_drop').should('have.text', '44.9');
    cy.get('#calculation_h_temperature_efficiency_dry').should('have.text', '89.89');
    cy.get('#calculation_h_temperature_efficiency_wet').should('have.text', '89.89');
    cy.get('#calculation_h_heat_recovery_dry').should('have.text', '0.98');
    cy.get('#calculation_h_heat_recovery_wet').should('have.text', '0.98');
    cy.get('#calculation_h_recovery_of_moisture').should('have.text', '0');
    cy.get('#calculation_c_input_airflow').should('have.text', '249.01');
    cy.get('#calculation_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_c_input_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_c_input_wet_bulb_temperature').should('have.text', '11.85');
    cy.get('#calculation_c_input_enthalpy').should('have.text', '33.81');
    cy.get('#calculation_c_output_airflow').should('have.text', '239.08');
    cy.get('#calculation_c_output_temperature').should('have.text', '8.31');
    cy.get('#calculation_c_output_relative_humidity').should('have.text', '78.87');
    cy.get('#calculation_c_output_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_c_output_wet_bulb_temperature').should('have.text', '6.61');
    cy.get('#calculation_c_output_enthalpy').should('have.text', '21.86');
    cy.get('#calculation_c_face_air_velocity').should('have.text', '1.11');
    cy.get('#calculation_c_air_pressure_drop').should('have.text', '47.04');
    cy.get('#calculation_c_temperature_efficiency_dry').should('have.text', '89.89');
    cy.get('#calculation_c_temperature_efficiency_wet').should('have.text', '89.89');
    cy.get('#calculation_c_heat_recovery_dry').should('have.text', '-0.98');
    cy.get('#calculation_c_heat_recovery_wet').should('have.text', '-0.98');
    cy.get('#calculation_c_recovery_of_moisture').should('have.text', '0');
    cy.get('#calculation_c_input_airflow').should('have.text', '261.76');
    cy.get('#calculation_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_c_input_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_c_input_wet_bulb_temperature').should('have.text', '23.82');
    cy.get('#calculation_c_input_enthalpy').should('have.text', '71.64');
    cy.get('#calculation_c_output_airflow').should('have.text', '255.67');
    cy.get('#calculation_c_output_temperature').should('have.text', '27.84');
    cy.get('#calculation_c_output_relative_humidity').should('have.text', '59.15');
    cy.get('#calculation_c_output_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_c_output_wet_bulb_temperature').should('have.text', '21.72');
    cy.get('#calculation_c_output_enthalpy').should('have.text', '63.66');
    cy.get('#calculation_c_face_air_velocity').should('have.text', '1.16');
    cy.get('#calculation_c_air_pressure_drop').should('have.text', '49.51');
    cy.get('#calculation_c_temperature_efficiency_dry').should('have.text', '89.51');
    cy.get('#calculation_c_temperature_efficiency_wet').should('have.text', '89.51');
    cy.get('#calculation_c_heat_recovery_dry').should('have.text', '-0.53');
    cy.get('#calculation_c_heat_recovery_wet').should('have.text', '-0.53');
    cy.get('#calculation_c_recovery_of_moisture').should('have.text', '0');
    cy.get('#calculation_h_input_airflow').should('have.text', '254.96');
    cy.get('#calculation_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_h_input_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_h_input_wet_bulb_temperature').should('have.text', '18.95');
    cy.get('#calculation_h_input_enthalpy').should('have.text', '54');
    cy.get('#calculation_h_output_airflow').should('have.text', '261.04');
    cy.get('#calculation_h_output_temperature').should('have.text', '34.16');
    cy.get('#calculation_h_output_relative_humidity').should('have.text', '30.06');
    cy.get('#calculation_h_output_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_h_output_wet_bulb_temperature').should('have.text', '20.8');
    cy.get('#calculation_h_output_enthalpy').should('have.text', '60.35');
    cy.get('#calculation_h_face_air_velocity').should('have.text', '1.13');
    cy.get('#calculation_h_air_pressure_drop').should('have.text', '48.19');
    cy.get('#calculation_h_temperature_efficiency_dry').should('have.text', '89.49');
    cy.get('#calculation_h_temperature_efficiency_wet').should('have.text', '89.49');
    cy.get('#calculation_h_heat_recovery_dry').should('have.text', '0.53');
    cy.get('#calculation_h_heat_recovery_wet').should('have.text', '0.53');
    cy.get('#calculation_h_recovery_of_moisture').should('have.text', '0');

    cy.checkBasic();
  })
})
