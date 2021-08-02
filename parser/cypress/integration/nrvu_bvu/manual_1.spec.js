context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_bvu')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV02 CFP 2500', { force: true });
    cy.get('#airflow_supply').clear().type('2000');
    cy.get('#airflow_extract').clear().type('2000');
    cy.get('#pressure_static_supply').clear().type('200');
    cy.get('#pressure_static_extract').clear().type('200');
    cy.get('#supply_heater').select('electric', { force: true });
    cy.get('#supply_cooler').select('freon', { force: true });
    
    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);
    
    cy.get('#calculation_summer_supply_output_temperature').should('have.text', '23.33');
    cy.get('#calculation_summer_supply_output_relative_humidity').should('have.text', '58.55');
    cy.get('#calculation_summer_supply_condensation').should('have.text', '0');
    cy.get('#calculation_summer_supply_temperature_efficiency_dry').should('have.text', '83.43');
    cy.get('#calculation_summer_supply_temperature_efficiency_wet').should('have.text', '83.43');
    cy.get('#calculation_summer_supply_heat_recovery_dry').should('have.text', '-4.21');
    cy.get('#calculation_summer_supply_heat_recovery_wet').should('have.text', '-4.21');
    cy.get('#calculation_summer_extract_output_temperature').should('have.text', '28.67');
    cy.get('#calculation_summer_extract_output_relative_humidity').should('have.text', '32.74');
    cy.get('#calculation_summer_extract_condensation').should('have.text', '0');
    cy.get('#calculation_summer_extract_temperature_efficiency_dry').should('have.text', '83.43');
    cy.get('#calculation_summer_extract_temperature_efficiency_wet').should('have.text', '83.43');
    cy.get('#calculation_winter_supply_output_temperature').should('have.text', '19.44');
    cy.get('#calculation_winter_supply_output_relative_humidity').should('have.text', '6.44');
    cy.get('#calculation_winter_supply_condensation').should('have.text', '0');
    cy.get('#calculation_winter_supply_temperature_efficiency_dry').should('have.text', '84.41');
    cy.get('#calculation_winter_supply_temperature_efficiency_wet').should('have.text', '93.09');
    cy.get('#calculation_winter_supply_heat_recovery_dry').should('have.text', '21.12');
    cy.get('#calculation_winter_supply_heat_recovery_wet').should('have.text', '23.32');
    cy.get('#calculation_winter_extract_output_temperature').should('have.text', '-2.93');
    cy.get('#calculation_winter_extract_output_relative_humidity').should('have.text', '95.3');
    cy.get('#calculation_winter_extract_condensation').should('have.text', '8.98');
    cy.get('#calculation_winter_extract_temperature_efficiency_dry').should('have.text', '84.41');
    cy.get('#calculation_winter_extract_temperature_efficiency_wet').should('have.text', '67.37');
    cy.get('#calculation_on_temperature').should('have.text', '19.44');
    cy.get('#calculation_off_temperature').should('have.text', '22');
    cy.get('#calculation_on_relative_humidity').should('have.text', '6.44');
    cy.get('#calculation_off_relative_humidity').should('have.text', '5.5');
    cy.get('#calculation_required_heating_power').should('have.text', '1.76');
    cy.get('#calculation_maximum_heating_power').should('have.text', '9');
    cy.get('#calculation_summer_airflow').should('have.text', '2000');
    cy.get('#calculation_summer_on_temperature').should('have.text', '23.33');
    cy.get('#calculation_summer_off_temperature').should('have.text', '20');
    cy.get('#calculation_summer_on_relative_humidity').should('have.text', '58.55');
    cy.get('#calculation_summer_relative_humidity_output').should('have.text', '65.01');
    cy.get('#calculation_summer_evaporation_temperature').should('have.text', '5');
    cy.get('#calculation_summer_superheat').should('have.text', '2.5');
    cy.get('#calculation_summer_required_power').should('have.text', '3.93');
    cy.get('#calculation_summer_maximum_power').should('have.text', '8.18');
    cy.get('#calculation_summer_condensation').should('have.text', '-2.26');
    cy.get('#calculation_summer_air_pressure_drop').should('have.text', '64.59');
    cy.get('#calculation_summer_face_air_velocity').should('have.text', '2.65');
    cy.get('#calculation_summer_mass_freon_flow_rate').should('have.text', '92.26');
    cy.get('#calculation_summer_hydraulic_resistance').should('have.text', '0.03');
    cy.get('#calculation_summer_refrigerating_agent').should('have.text', 'R410A');
    cy.get('#calculation_winter_supply_n1min').should('have.text', '2251.87');
    cy.get('#calculation_winter_supply_pew').should('have.text', '518.16');
    cy.get('#calculation_winter_supply_ia').should('have.text', '2.28');
    cy.get('#calculation_winter_supply_psf_pa').should('have.text', '549.17');
    cy.get('#calculation_winter_supply_nes').should('have.text', '58.88');
    cy.get('#calculation_winter_supply_qv_m3h').should('have.text', '2000');
    cy.get('#calculation_winter_supply_number_of_fans').should('have.text', '1');
    cy.get('#calculation_winter_supply_general_sound_pressure_three_meters_at_operating_point_with_a_filter').should('have.text', '27.33');
    cy.get('#calculation_winter_extract_n1min').should('have.text', '2181.7');
    cy.get('#calculation_winter_extract_pew').should('have.text', '475.03');
    cy.get('#calculation_winter_extract_ia').should('have.text', '2.09');
    cy.get('#calculation_winter_extract_psf_pa').should('have.text', '501.85');
    cy.get('#calculation_winter_extract_nes').should('have.text', '58.69');
    cy.get('#calculation_winter_extract_qv_m3h').should('have.text', '2000');
    cy.get('#calculation_winter_extract_number_of_fans').should('have.text', '1');
    cy.get('#calculation_winter_extract_general_sound_pressure_three_meters_at_operating_point_with_a_filter').should('have.text', '26.41');
  
    cy.checkBasic();
  })
})