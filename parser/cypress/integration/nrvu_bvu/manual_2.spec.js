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
    cy.get('#supply_heater').select('water', { force: true });
    cy.get('#supply_cooler').select('water', { force: true });
    cy.get('#supply_heater_water_temperature_after').clear().type('22');
    cy.get('#supply_heater_water_temperature_in').clear().type('80');
    cy.get('#supply_heater_water_temperature_out').clear().type('60');
    
    cy.get('#manual_calculate-submit').click({ force: true })
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
    cy.get('#calculation_maximum_heating_power').should('have.text', '12.65');
    cy.get('#calculation_water_pressure_drop').should('have.text', '0.31');
    cy.get('#calculation_water_flow').should('have.text', '0.02');
    cy.get('#calculation_water_in').should('have.text', '80');
    cy.get('#calculation_water_out').should('have.text', '60');
    cy.get('#calculation_glycol').should('have.text', '0');
    cy.get('#calculation_summer_airflow').should('have.text', '2000');
    cy.get('#calculation_summer_on_temperature').should('have.text', '23.33');
    cy.get('#calculation_summer_off_temperature').should('have.text', '20');
    cy.get('#calculation_summer_water_in').should('have.text', '7');
    cy.get('#calculation_summer_water_out').should('have.text', '12');
    cy.get('#calculation_summer_on_relative_humidity').should('have.text', '58.55');
    cy.get('#calculation_summer_off_relative_humidity').should('have.text', '65.37');
    cy.get('#calculation_summer_glycol').should('have.text', '0');
    cy.get('#calculation_summer_required_cooling_power').should('have.text', '3.85');
    cy.get('#calculation_summer_maximum_cooling_power').should('have.text', '9.51');
    cy.get('#calculation_summer_condensation').should('have.text', '-2.13');
    cy.get('#calculation_summer_water_flow').should('have.text', '0.18');
    cy.get('#calculation_summer_water_pressure_drop').should('have.text', '1.72');
    cy.get('#calculation_summer_air_pressure_drop').should('have.text', '64.59');
    cy.get('#calculation_summer_face_air_velocity').should('have.text', '2.65');
    cy.get('#calculation_winter_supply_n1min').should('have.text', '2279.9');
    cy.get('#calculation_winter_supply_pew').should('have.text', '535.88');
    cy.get('#calculation_winter_supply_ia').should('have.text', '2.36');
    cy.get('#calculation_winter_supply_psf_pa').should('have.text', '568.39');
    cy.get('#calculation_winter_supply_nes').should('have.text', '58.93');
    cy.get('#calculation_winter_supply_qv_m3h').should('have.text', '2000');
    cy.get('#calculation_winter_supply_number_of_fans').should('have.text', '1');
    cy.get('#calculation_winter_supply_general_sound_pressure_three_meters_at_operating_point_with_a_filter').should('have.text', '27.75');
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