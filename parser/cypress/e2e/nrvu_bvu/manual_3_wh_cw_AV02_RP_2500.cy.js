context('Blauberg', () => {
  before(() => {
    //  Cypress.session.clearAllSavedSessions();
  })
  beforeEach(() => {
    let Url = Cypress.env('baubUrl');
    cy.login(Url);
    cy.visit(Url + '/nrvu_bvu')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#model').select('AV02 RP 2500', { force: true });
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

    cy.get('[data-cy=title]').should('include.text', 'BL02 RP 2500-HW-CW-S31');

    //heat exchanger winter   R2x510-1.6
    cy.get('#calculation_winter_supply_os_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 13.5);
    cy.get('#calculation_winter_supply_os_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 35.3);
    cy.get('#calculation_winter_supply_ds_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 77);
    cy.get('#calculation_winter_supply_ds_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 43.4);
    cy.get('#calculation_winter_supply_ds_heat_recovery_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 26.4);
    cy.get('#calculation_winter_supply_ds_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 155.2);
    cy.get('#calculation_winter_supply_s_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 2);
    cy.get('#calculation_winter_supply_temperature_efficiency_at_balanced_flow').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 80.6);
    cy.get('#calculation_winter_extract_oe_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', -10);
    cy.get('#calculation_winter_extract_oe_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 100);
    cy.get('#calculation_winter_extract_de_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 86.5);
    cy.get('#calculation_winter_extract_de_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 86.9);
    cy.get('#calculation_winter_extract_de_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 141.8);
    cy.get('#calculation_winter_extract_e_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 2.3);
    //heat exchanger summer  R2x510-1.6
    cy.get('#calculation_summer_supply_os_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 23.2);
    cy.get('#calculation_summer_supply_os_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 59.8);
    cy.get('#calculation_summer_supply_ds_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 85.4);
    cy.get('#calculation_summer_supply_ds_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 0);
    cy.get('#calculation_summer_supply_ds_heat_recovery_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', -4.5);
    cy.get('#calculation_summer_supply_ds_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 156.4);
    cy.get('#calculation_summer_supply_s_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 2.4);
    cy.get('#calculation_summer_supply_temperature_efficiency_at_balanced_flow').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 80.6);
    cy.get('#calculation_summer_extract_oe_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 28.7);
    cy.get('#calculation_summer_extract_oe_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 33.7);
    cy.get('#calculation_summer_extract_de_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 83.1);
    cy.get('#calculation_summer_extract_de_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 0);
    cy.get('#calculation_summer_extract_de_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 159.4);
    cy.get('#calculation_summer_extract_e_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 2.3);
    //fans R3G310RS01I1
    cy.get('#calculation_fans_winter_supply_number_of_fans').invoke('text').should('be.a', 'string').
      then(parseInt).should('be.a', 'number').and('equal', 1);
    cy.get('#calculation_winter_supply_n1min').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2537.6);
    cy.get('#calculation_winter_supply_pew').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 668.7);
    cy.get('#calculation_winter_supply_ia').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2.9);
      cy.get('#calculation_winter_supply_qv_m3h').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2000);
    cy.get('#calculation_winter_supply_pf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 730.1);
    cy.get('#calculation_winter_supply_psf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 705.2);
    cy.get('#calculation_winter_supply_nes').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 58.6);
    cy.get('#calculation_winter_supply_rated_power').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 740);
    cy.get('#calculation_winter_supply_rated_current').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 3.3);
    cy.get('#calculation_winter_supply_u_control_v').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 9.6);
    cy.get('#calculation_winter_supply_general_sound_pressure_three_meters_to_environment_at_operating_point_with_a_filter').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 34.5);
    cy.get('#calculation_fans_winter_extract_number_of_fans').invoke('text').should('be.a', 'string').
      then(parseInt).should('be.a', 'number').and('equal', 1);
    cy.get('#calculation_winter_extract_n1min').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2239.4);
    cy.get('#calculation_winter_extract_pew').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 473.7);
    cy.get('#calculation_winter_extract_ia').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2.1);
      cy.get('#calculation_winter_extract_qv_m3h').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2000);
    cy.get('#calculation_winter_extract_psf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 501.8);
    cy.get('#calculation_winter_extract_nes').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 58.9);
    cy.get('#calculation_winter_extract_rated_power').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 740);
    cy.get('#calculation_winter_extract_rated_current').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 3.3);
    cy.get('#calculation_winter_extract_u_control_v').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 8.5);
    cy.get('#calculation_winter_extract_general_sound_pressure_three_meters_to_environment_at_operating_point_with_a_filter').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 29.5);
    //erp
    cy.get('#erp_trade_mark_key').should('have.text', 'Trade mark');
    cy.get('#erp_trade_mark_value').should('have.text', 'Blauberg');
    cy.get('#erp_model_key').should('have.text', 'Model');
    cy.get('#erp_model_value').should('include.text', 'BL02 RP 2500');
    cy.get('#erp_declared_typology_key').should('have.text', 'Declared typology');
    cy.get('#erp_declared_typology_value').should('have.text', 'NRVU BVU');
    cy.get('#erp_type_of_drive_installed_key').should('have.text', 'Type of drive installed');
    cy.get('#erp_type_of_drive_installed_value').should('have.text', 'Integrated MSD');
    cy.get('#erp_type_of_heat_recovery_key').should('have.text', 'Type of heat recovery system');
    cy.get('#erp_type_of_heat_recovery_value').should('have.text', 'Rotary');
    cy.get('#erp_temperature_efficiency_at_balanced_flow_key').should('have.text', 'Thermal efficiency (ηt_nrvu)');
    cy.get('#erp_temperature_efficiency_at_balanced_flow_units').should('include.text', '%');
    cy.get('#erp_temperature_efficiency_at_balanced_flow_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 80.6);
    cy.get('#erp_supply_flow_rate_key').should('have.text', 'Supply flow rate');
    cy.get('#erp_supply_flow_rate_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 0.56);
    cy.get('#erp_effective_electric_power_input_key').should('have.text', 'Effective electric power input');
    cy.get('#erp_effective_electric_power_input_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 1142.4);
    cy.get('#erp_sfp_int_key').should('have.text', 'SFPint');
    cy.get('#erp_sfp_int_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 1050.9);
    cy.get('#erp_face_velocity_key').should('have.text', 'Face velocity at design flow rate');
    cy.get('#erp_face_velocity_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 1.7);
    cy.get('#erp_external_pressure_key').should('have.text', 'External pressure');
    cy.get('#erp_external_pressure_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 200);
    cy.get('#erp_internal_pressure_drop_key').should('have.text', 'Internal pressure drop of ventilation components');
    cy.get('#erp_internal_pressure_drop_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 315.2);
    cy.get('#erp_static_efficiency_of_fans_key').should('have.text', 'Static efficiency of fans');
    cy.get('#erp_static_efficiency_of_fans_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 58.6);
    cy.get('#erp_maximum_internal_leakage_key').should('include.text', 'Maximum leakage rates');
    cy.get('#erp_maximum_internal_leakage_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2.7);
    cy.get('#erp_maximum_external_leakage_key').should('include.text', 'Maximum leakage rates');
    cy.get('#erp_maximum_external_leakage_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2.7);
    cy.get('#erp_energy_performance_key').should('include.text', 'Filtration class');
    cy.get('#erp_energy_performance_value').should('have.text', 'B');
    cy.get('#erp_visual_filter_warning_key').should('include.text', 'Visual filter warning');
    cy.get('#erp_visual_filter_warning_value').should('include.text', 'Visual filter warning');
    cy.get('#erp_sound_power_level_key').should('include.text', 'Sound power level');
    cy.get('#erp_sound_power_level_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 55);

    cy.checkBasicAfterAuth();

  })
})

