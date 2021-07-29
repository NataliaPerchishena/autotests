context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/counterflow')
  })
  
  it('calculate_button', () => {
    cy.get('#model').select('HC-EX6 533', { force: true});
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
    cy.get('#calculation_winter_supply_h_output_airflow').should('have.text', '248.19');
    cy.get('#calculation_winter_supply_h_output_temperature').should('have.text', '17.9');
    cy.get('#calculation_winter_supply_h_output_relative_humidity').should('have.text', '36.11');
    cy.get('#calculation_winter_supply_h_output_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_winter_supply_h_output_wet_bulb_temperature').should('have.text', '10.22');
    cy.get('#calculation_winter_supply_h_output_enthalpy').should('have.text', '29.85');
    cy.get('#calculation_winter_supply_h_face_air_velocity').should('have.text', '0.96');
    cy.get('#calculation_winter_supply_h_air_pressure_drop').should('have.text', '68.52');
    cy.get('#calculation_winter_supply_h_temperature_efficiency_dry').should('have.text', '83.85');
    cy.get('#calculation_winter_supply_h_temperature_efficiency_wet').should('have.text', '83.85');
    cy.get('#calculation_winter_supply_h_heat_recovery_dry').should('have.text', '0.92');
    cy.get('#calculation_winter_supply_h_heat_recovery_wet').should('have.text', '0.92');
    cy.get('#calculation_winter_extract_c_input_airflow').should('have.text', '249.98');
    cy.get('#calculation_winter_extract_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_winter_extract_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_winter_extract_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_winter_extract_c_input_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_winter_extract_c_input_wet_bulb_temperature').should('have.text', '11.85');
    cy.get('#calculation_winter_extract_c_input_enthalpy').should('have.text', '33.81');
    cy.get('#calculation_winter_extract_c_output_airflow').should('have.text', '240.68');
    cy.get('#calculation_winter_extract_c_output_temperature').should('have.text', '9.1');
    cy.get('#calculation_winter_extract_c_output_relative_humidity').should('have.text', '74.73');
    cy.get('#calculation_winter_extract_c_output_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_winter_extract_c_output_wet_bulb_temperature').should('have.text', '7');
    cy.get('#calculation_winter_extract_c_output_enthalpy').should('have.text', '22.69');
    cy.get('#calculation_winter_extract_c_face_air_velocity').should('have.text', '1.01');
    cy.get('#calculation_winter_extract_c_air_pressure_drop').should('have.text', '72.66');
    cy.get('#calculation_winter_extract_c_temperature_efficiency_dry').should('have.text', '83.85');
    cy.get('#calculation_winter_extract_c_temperature_efficiency_wet').should('have.text', '83.85');
    cy.get('#calculation_winter_extract_c_heat_recovery_dry').should('have.text', '-0.92');
    cy.get('#calculation_winter_extract_c_heat_recovery_wet').should('have.text', '-0.92');
    cy.get('#calculation_winter_extract_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_supply_c_input_airflow').should('have.text', '262.78');
    cy.get('#calculation_summer_supply_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_supply_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_summer_supply_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_supply_c_input_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_summer_supply_c_input_wet_bulb_temperature').should('have.text', '23.82');
    cy.get('#calculation_summer_supply_c_input_enthalpy').should('have.text', '71.64');
    cy.get('#calculation_summer_supply_c_output_airflow').should('have.text', '257.08');
    cy.get('#calculation_summer_supply_c_output_temperature').should('have.text', '28.31');
    cy.get('#calculation_summer_supply_c_output_relative_humidity').should('have.text', '57.48');
    cy.get('#calculation_summer_supply_c_output_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_summer_supply_c_output_wet_bulb_temperature').should('have.text', '22.01');
    cy.get('#calculation_summer_supply_c_output_enthalpy').should('have.text', '64.71');
    cy.get('#calculation_summer_supply_c_face_air_velocity').should('have.text', '1.06');
    cy.get('#calculation_summer_supply_c_air_pressure_drop').should('have.text', '77.55');
    cy.get('#calculation_summer_supply_c_temperature_efficiency_dry').should('have.text', '83.58');
    cy.get('#calculation_summer_supply_c_temperature_efficiency_wet').should('have.text', '83.58');
    cy.get('#calculation_summer_supply_c_heat_recovery_dry').should('have.text', '-0.49');
    cy.get('#calculation_summer_supply_c_heat_recovery_wet').should('have.text', '-0.49');
    cy.get('#calculation_summer_supply_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_extract_h_input_airflow').should('have.text', '255.96');
    cy.get('#calculation_summer_extract_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_extract_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_summer_extract_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_summer_extract_h_input_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_summer_extract_h_input_wet_bulb_temperature').should('have.text', '18.95');
    cy.get('#calculation_summer_extract_h_input_enthalpy').should('have.text', '54');
    cy.get('#calculation_summer_extract_h_output_airflow').should('have.text', '261.66');
    cy.get('#calculation_summer_extract_h_output_temperature').should('have.text', '33.69');
    cy.get('#calculation_summer_extract_h_output_relative_humidity').should('have.text', '30.91');
    cy.get('#calculation_summer_extract_h_output_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_summer_extract_h_output_wet_bulb_temperature').should('have.text', '20.97');
    cy.get('#calculation_summer_extract_h_output_enthalpy').should('have.text', '60.88');
    cy.get('#calculation_summer_extract_h_face_air_velocity').should('have.text', '1.03');
    cy.get('#calculation_summer_extract_h_air_pressure_drop').should('have.text', '74.93');
    cy.get('#calculation_summer_extract_h_temperature_efficiency_dry').should('have.text', '83.58');
    cy.get('#calculation_summer_extract_h_temperature_efficiency_wet').should('have.text', '83.58');
    cy.get('#calculation_summer_extract_h_heat_recovery_dry').should('have.text', '0.49');
    cy.get('#calculation_summer_extract_h_heat_recovery_wet').should('have.text', '0.49');

    cy.checkBasic();
  })
})
