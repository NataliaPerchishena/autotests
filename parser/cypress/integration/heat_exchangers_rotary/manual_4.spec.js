context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/rotary')
  })

  it('calculate_button', () => {
    cy.get('#wheel_type').select('enthalpy_rotor_r_e_ex', { force: true});
    cy.get('#model').select('R-E-EX D400-1.6/7-0-1 600x600x295', { force: true});
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
    
    cy.get('#calculation_winter_supply_h_input_airflow').should('have.text', '238.89');
    cy.get('#calculation_winter_supply_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_winter_supply_h_input_temperature').should('have.text', '7');
    cy.get('#calculation_winter_supply_h_input_relative_humidity').should('have.text', '75');
    cy.get('#calculation_winter_supply_h_input_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_winter_supply_h_input_wet_bulb_temperature').should('have.text', '5.09');
    cy.get('#calculation_winter_supply_h_input_enthalpy').should('have.text', '18.75');
    cy.get('#calculation_winter_supply_h_output_airflow').should('have.text', '247.63');
    cy.get('#calculation_winter_supply_h_output_temperature').should('have.text', '17.25');
    cy.get('#calculation_winter_supply_h_output_relative_humidity').should('have.text', '39.18');
    cy.get('#calculation_winter_supply_h_output_absolute_humidity').should('have.text', '4.83');
    cy.get('#calculation_winter_supply_h_output_wet_bulb_temperature').should('have.text', '10.07');
    cy.get('#calculation_winter_supply_h_output_enthalpy').should('have.text', '29.51');
    cy.get('#calculation_winter_supply_h_face_air_velocity').should('have.text', '1.06');
    cy.get('#calculation_winter_supply_h_air_pressure_drop').should('have.text', '72.01');
    cy.get('#calculation_winter_supply_h_temperature_efficiency').should('have.text', '78.82');
    cy.get('#calculation_winter_supply_h_humidity_efficiency').should('have.text', '26.12');
    cy.get('#calculation_winter_supply_h_heat_recovery').should('have.text', '0.92');
    cy.get('#calculation_winter_supply_h_recovery_of_moisture').should('have.text', '0.06');
    cy.get('#calculation_winter_extract_c_input_airflow').should('have.text', '249.98');
    cy.get('#calculation_winter_extract_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_winter_extract_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_winter_extract_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_winter_extract_c_input_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_winter_extract_c_input_wet_bulb_temperature').should('have.text', '11.85');
    cy.get('#calculation_winter_extract_c_input_enthalpy').should('have.text', '33.81');
    cy.get('#calculation_winter_extract_c_output_airflow').should('have.text', '241.37');
    cy.get('#calculation_winter_extract_c_output_temperature').should('have.text', '9.91');
    cy.get('#calculation_winter_extract_c_output_relative_humidity').should('have.text', '68.25');
    cy.get('#calculation_winter_extract_c_output_absolute_humidity').should('have.text', '5.18');
    cy.get('#calculation_winter_extract_c_output_wet_bulb_temperature').should('have.text', '7.17');
    cy.get('#calculation_winter_extract_c_output_enthalpy').should('have.text', '23.04');
    cy.get('#calculation_winter_extract_c_face_air_velocity').should('have.text', '1.11');
    cy.get('#calculation_winter_extract_c_air_pressure_drop').should('have.text', '75.64');
    cy.get('#calculation_winter_extract_c_temperature_efficiency').should('have.text', '77.64');
    cy.get('#calculation_winter_extract_c_humidity_efficiency').should('have.text', '0');
    cy.get('#calculation_winter_extract_c_heat_recovery').should('have.text', '-0.92');
    cy.get('#calculation_winter_extract_c_recovery_of_moisture').should('have.text', '-0.06');
    cy.get('#calculation_summer_supply_c_input_airflow').should('have.text', '262.78');
    cy.get('#calculation_summer_supply_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_supply_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_summer_supply_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_supply_c_input_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_summer_supply_c_input_wet_bulb_temperature').should('have.text', '23.82');
    cy.get('#calculation_summer_supply_c_input_enthalpy').should('have.text', '71.64');
    cy.get('#calculation_summer_supply_c_output_airflow').should('have.text', '258.27');
    cy.get('#calculation_summer_supply_c_output_temperature').should('have.text', '29.71');
    cy.get('#calculation_summer_supply_c_output_relative_humidity').should('have.text', '49.28');
    cy.get('#calculation_summer_supply_c_output_absolute_humidity').should('have.text', '13.19');
    cy.get('#calculation_summer_supply_c_output_wet_bulb_temperature').should('have.text', '21.76');
    cy.get('#calculation_summer_supply_c_output_enthalpy').should('have.text', '63.73');
    cy.get('#calculation_summer_supply_c_face_air_velocity').should('have.text', '1.16');
    cy.get('#calculation_summer_supply_c_air_pressure_drop').should('have.text', '79.87');
    cy.get('#calculation_summer_supply_c_temperature_efficiency').should('have.text', '66.08');
    cy.get('#calculation_summer_supply_c_humidity_efficiency').should('have.text', '0');
    cy.get('#calculation_summer_supply_c_heat_recovery').should('have.text', '-0.67');
    cy.get('#calculation_summer_supply_c_recovery_of_moisture').should('have.text', '-0.29');
    cy.get('#calculation_summer_extract_h_input_airflow').should('have.text', '255.96');
    cy.get('#calculation_summer_extract_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_extract_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_summer_extract_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_summer_extract_h_input_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_summer_extract_h_input_wet_bulb_temperature').should('have.text', '18.95');
    cy.get('#calculation_summer_extract_h_input_enthalpy').should('have.text', '54');
    cy.get('#calculation_summer_extract_h_output_airflow').should('have.text', '261.31');
    cy.get('#calculation_summer_extract_h_output_temperature').should('have.text', '33.27');
    cy.get('#calculation_summer_extract_h_output_relative_humidity').should('have.text', '34.55');
    cy.get('#calculation_summer_extract_h_output_absolute_humidity').should('have.text', '11.43');
    cy.get('#calculation_summer_extract_h_output_wet_bulb_temperature').should('have.text', '21.26');
    cy.get('#calculation_summer_extract_h_output_enthalpy').should('have.text', '61.91');
    cy.get('#calculation_summer_extract_h_face_air_velocity').should('have.text', '1.13');
    cy.get('#calculation_summer_extract_h_air_pressure_drop').should('have.text', '77.61');
    cy.get('#calculation_summer_extract_h_temperature_efficiency').should('have.text', '78.4');
    cy.get('#calculation_summer_extract_h_humidity_efficiency').should('have.text', '25.96');
    cy.get('#calculation_summer_extract_h_heat_recovery').should('have.text', '0.67');
    cy.get('#calculation_summer_extract_h_recovery_of_moisture').should('have.text', '0.29');
    
    cy.checkBasic();
  })
})
