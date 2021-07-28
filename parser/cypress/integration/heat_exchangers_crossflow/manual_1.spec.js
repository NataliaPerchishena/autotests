context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/crossflow')
  })

  it('calculate_button', () => {
    cy.get('#model').select('Hp-EX4 200', { force: true});
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
    cy.get('#calculation_winter_supply_h_output_airflow').should('have.text', '245.15');
    cy.get('#calculation_winter_supply_h_output_temperature').should('have.text', '14.33');
    cy.get('#calculation_winter_supply_h_output_relative_humidity').should('have.text', '45.54');
    cy.get('#calculation_winter_supply_h_output_absolute_humidity').should('have.text', '4.64');
    cy.get('#calculation_winter_supply_h_output_wet_bulb_temperature').should('have.text', '8.64');
    cy.get('#calculation_winter_supply_h_output_enthalpy').should('have.text', '26.22');
    cy.get('#calculation_winter_supply_h_face_air_velocity').should('have.text', '1.66');
    cy.get('#calculation_winter_supply_h_air_pressure_drop').should('have.text', '119.04');
    cy.get('#calculation_winter_supply_h_temperature_efficiency_dry').should('have.text', '56.41');
    cy.get('#calculation_winter_supply_h_temperature_efficiency_wet').should('have.text', '56.41');
    cy.get('#calculation_winter_supply_h_heat_recovery_dry').should('have.text', '0.62');
    cy.get('#calculation_winter_supply_h_heat_recovery_wet').should('have.text', '0.62');
    cy.get('#calculation_winter_extract_c_input_airflow').should('have.text', '249.98');
    cy.get('#calculation_winter_extract_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_winter_extract_c_input_temperature').should('have.text', '20');
    cy.get('#calculation_winter_extract_c_input_relative_humidity').should('have.text', '37');
    cy.get('#calculation_winter_extract_c_input_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_winter_extract_c_input_wet_bulb_temperature').should('have.text', '11.85');
    cy.get('#calculation_winter_extract_c_input_enthalpy').should('have.text', '33.81');
    cy.get('#calculation_winter_extract_c_output_airflow').should('have.text', '243.73');
    cy.get('#calculation_winter_extract_c_output_temperature').should('have.text', '12.67');
    cy.get('#calculation_winter_extract_c_output_relative_humidity').should('have.text', '58.73');
    cy.get('#calculation_winter_extract_c_output_absolute_humidity').should('have.text', '5.36');
    cy.get('#calculation_winter_extract_c_output_wet_bulb_temperature').should('have.text', '8.69');
    cy.get('#calculation_winter_extract_c_output_enthalpy').should('have.text', '26.33');
    cy.get('#calculation_winter_extract_c_face_air_velocity').should('have.text', '1.74');
    cy.get('#calculation_winter_extract_c_air_pressure_drop').should('have.text', '127.76');
    cy.get('#calculation_winter_extract_c_temperature_efficiency_dry').should('have.text', '56.41');
    cy.get('#calculation_winter_extract_c_temperature_efficiency_wet').should('have.text', '56.41');
    cy.get('#calculation_winter_extract_c_heat_recovery_dry').should('have.text', '-0.62');
    cy.get('#calculation_winter_extract_c_heat_recovery_wet').should('have.text', '-0.62');
    cy.get('#calculation_winter_extract_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_supply_c_input_airflow').should('have.text', '262.78');
    cy.get('#calculation_summer_supply_c_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_supply_c_input_temperature').should('have.text', '35');
    cy.get('#calculation_summer_supply_c_input_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_supply_c_input_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_summer_supply_c_input_wet_bulb_temperature').should('have.text', '23.82');
    cy.get('#calculation_summer_supply_c_input_enthalpy').should('have.text', '71.64');
    cy.get('#calculation_summer_supply_c_output_airflow').should('have.text', '259.01');
    cy.get('#calculation_summer_supply_c_output_temperature').should('have.text', '30.58');
    cy.get('#calculation_summer_supply_c_output_relative_humidity').should('have.text', '50.16');
    cy.get('#calculation_summer_supply_c_output_absolute_humidity').should('have.text', '14.14');
    cy.get('#calculation_summer_supply_c_output_wet_bulb_temperature').should('have.text', '22.65');
    cy.get('#calculation_summer_supply_c_output_enthalpy').should('have.text', '67.06');
    cy.get('#calculation_summer_supply_c_face_air_velocity').should('have.text', '1.82');
    cy.get('#calculation_summer_supply_c_air_pressure_drop').should('have.text', '138.18');
    cy.get('#calculation_summer_supply_c_temperature_efficiency_dry').should('have.text', '55.23');
    cy.get('#calculation_summer_supply_c_temperature_efficiency_wet').should('have.text', '55.23');
    cy.get('#calculation_summer_supply_c_heat_recovery_dry').should('have.text', '-0.31');
    cy.get('#calculation_summer_supply_c_heat_recovery_wet').should('have.text', '-0.31');
    cy.get('#calculation_summer_supply_c_condensation').should('have.text', '0');
    cy.get('#calculation_summer_extract_h_input_airflow').should('have.text', '255.96');
    cy.get('#calculation_summer_extract_h_standard_airflow').should('have.text', '250');
    cy.get('#calculation_summer_extract_h_input_temperature').should('have.text', '27');
    cy.get('#calculation_summer_extract_h_input_relative_humidity').should('have.text', '47');
    cy.get('#calculation_summer_extract_h_input_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_summer_extract_h_input_wet_bulb_temperature').should('have.text', '18.95');
    cy.get('#calculation_summer_extract_h_input_enthalpy').should('have.text', '54');
    cy.get('#calculation_summer_extract_h_output_airflow').should('have.text', '259.73');
    cy.get('#calculation_summer_extract_h_output_temperature').should('have.text', '31.42');
    cy.get('#calculation_summer_extract_h_output_relative_humidity').should('have.text', '35.35');
    cy.get('#calculation_summer_extract_h_output_absolute_humidity').should('have.text', '10.48');
    cy.get('#calculation_summer_extract_h_output_wet_bulb_temperature').should('have.text', '20.31');
    cy.get('#calculation_summer_extract_h_output_enthalpy').should('have.text', '58.54');
    cy.get('#calculation_summer_extract_h_face_air_velocity').should('have.text', '1.78');
    cy.get('#calculation_summer_extract_h_air_pressure_drop').should('have.text', '132.57');
    cy.get('#calculation_summer_extract_h_temperature_efficiency_dry').should('have.text', '55.23');
    cy.get('#calculation_summer_extract_h_temperature_efficiency_wet').should('have.text', '55.23');
    cy.get('#calculation_summer_extract_h_heat_recovery_dry').should('have.text', '0.31');
    cy.get('#calculation_summer_extract_h_heat_recovery_wet').should('have.text', '0.31');

    cy.checkBasic();
  })
})
  