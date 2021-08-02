context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_bvu')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV02 RP 2500', { force: true });
    cy.get('#airflow_supply').clear().type('2000');
    cy.get('#airflow_extract').clear().type('2000');
    cy.get('#pressure_static_supply').clear().type('200');
    cy.get('#pressure_static_extract').clear().type('200');
    cy.get('#supply_heater').select('electric', { force: true });
    cy.get('#supply_cooler').select('freon', { force: true });
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);
    
    cy.get('#calculation_summer_supply_os_temperature_after_heat_exchange').should('have.text', '23.67');
    cy.get('#calculation_summer_supply_os_relative_humidity_after_heat_exchange').should('have.text', '58.03');
    cy.get('#calculation_summer_supply_ds_exchange_efficiency_dry').should('have.text', '79.07');
    cy.get('#calculation_summer_supply_ds_exchange_efficiency_wet').should('have.text', '0');
    cy.get('#calculation_summer_supply_ds_heat_recovery_wet').should('have.text', '-4.28');
    cy.get('#calculation_summer_extract_oe_temperature_after_heat_exchange').should('have.text', '28.33');
    cy.get('#calculation_summer_extract_oe_relative_humidity_after_heat_exchange').should('have.text', '34.3');
    cy.get('#calculation_summer_extract_de_exchange_efficiency_dry').should('have.text', '79.1');
    cy.get('#calculation_summer_extract_de_exchange_efficiency_wet').should('have.text', '0');
    cy.get('#calculation_winter_supply_os_temperature_after_heat_exchange').should('have.text', '14.23');
    cy.get('#calculation_winter_supply_os_relative_humidity_after_heat_exchange').should('have.text', '24.91');
    cy.get('#calculation_winter_supply_ds_exchange_efficiency_dry').should('have.text', '78.99');
    cy.get('#calculation_winter_supply_ds_exchange_efficiency_wet').should('have.text', '28');
    cy.get('#calculation_winter_supply_ds_heat_recovery_wet').should('have.text', '22.07');
    cy.get('#calculation_winter_extract_oe_temperature_after_heat_exchange').should('have.text', '-7.07');
    cy.get('#calculation_winter_extract_oe_relative_humidity_after_heat_exchange').should('have.text', '100');
    cy.get('#calculation_winter_extract_de_exchange_efficiency_dry').should('have.text', '78.6');
    cy.get('#calculation_winter_extract_de_exchange_efficiency_wet').should('have.text', '78');
    cy.get('#calculation_on_temperature').should('have.text', '14.23');
    cy.get('#calculation_off_temperature').should('have.text', '22');
    cy.get('#calculation_on_relative_humidity').should('have.text', '24.91');
    cy.get('#calculation_off_relative_humidity').should('have.text', '15.28');
    cy.get('#calculation_required_heating_power').should('have.text', '5.37');
    cy.get('#calculation_maximum_heating_power').should('have.text', '9');
    cy.get('#calculation_summer_airflow').should('have.text', '2000');
    cy.get('#calculation_summer_on_temperature').should('have.text', '23.67');
    cy.get('#calculation_summer_off_temperature').should('have.text', '20');
    cy.get('#calculation_summer_on_relative_humidity').should('have.text', '58.03');
    cy.get('#calculation_summer_relative_humidity_output').should('have.text', '65.18');
    cy.get('#calculation_summer_evaporation_temperature').should('have.text', '5');
    cy.get('#calculation_summer_superheat').should('have.text', '2.5');
    cy.get('#calculation_summer_condensation_temperature').should('have.text', '45');
    cy.get('#calculation_summer_subcool').should('have.text', '2.5');
    cy.get('#calculation_summer_required_power').should('have.text', '4.34');
    cy.get('#calculation_summer_maximum_power').should('have.text', '7.95');
    cy.get('#calculation_summer_condensation').should('have.text', '-2.51');
    cy.get('#calculation_summer_air_pressure_drop').should('have.text', '113.7');
    cy.get('#calculation_summer_face_air_velocity').should('have.text', '3.7');
    cy.get('#calculation_summer_mass_freon_flow_rate').should('have.text', '102.08');
    cy.get('#calculation_summer_hydraulic_resistance').should('have.text', '0.28');
    cy.get('#calculation_summer_refrigerating_agent').should('have.text', 'R410A');
    cy.get('#calculation_winter_supply_n1min').should('have.text', '2212.94');
    cy.get('#calculation_winter_supply_pew').should('have.text', '494.29');
    cy.get('#calculation_winter_supply_ia').should('have.text', '2.17');
    cy.get('#calculation_winter_supply_psf_pa').should('have.text', '522.97');
    cy.get('#calculation_winter_supply_nes').should('have.text', '58.78');
    cy.get('#calculation_winter_supply_qv_m3h').should('have.text', '2000');
    cy.get('#calculation_winter_supply_number_of_fans').should('have.text', '1');
    cy.get('#calculation_winter_supply_general_sound_pressure_three_meters_at_operating_point_with_a_filter').should('have.text', '26.8');
    cy.get('#calculation_winter_extract_n1min').should('have.text', '2040.16');
    cy.get('#calculation_winter_extract_pew').should('have.text', '390.64');
    cy.get('#calculation_winter_extract_ia').should('have.text', '1.72');
    cy.get('#calculation_winter_extract_psf_pa').should('have.text', '408.04');
    cy.get('#calculation_winter_extract_nes').should('have.text', '58.03');
    cy.get('#calculation_winter_extract_qv_m3h').should('have.text', '2000');
    cy.get('#calculation_winter_extract_number_of_fans').should('have.text', '1');
    cy.get('#calculation_winter_extract_general_sound_pressure_three_meters_at_operating_point_with_a_filter').should('have.text', '25.16');
  
    cy.checkBasic()
  })
})