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
    cy.get('#model').select('AV02 RH 2500', { force: true });
    cy.get('#rotary_heatex_hygroscopic').check({ force: true })
    cy.get('#airflow_supply').clear().type('2000');
    cy.get('#airflow_extract').clear().type('2000');
    cy.get('#pressure_static_supply').clear().type('200');
    cy.get('#pressure_static_extract').clear().type('200');
    cy.get('#supply_heater').select('electric', { force: true });
    cy.get('#supply_cooler').select('freon', { force: true });

    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);

    cy.get('[data-cy=title]').should('include.text', 'BL02 RH 2500-HEE-CDX-S31');

    //heat exchanger winter   R800-1.6-E
    cy.get('#calculation_winter_supply_os_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 13.7);
    cy.get('#calculation_winter_supply_os_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 53.7);
    cy.get('#calculation_winter_supply_ds_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 77.7);
    cy.get('#calculation_winter_supply_ds_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 76.2);
    cy.get('#calculation_winter_supply_ds_heat_recovery_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 30.2);
    cy.get('#calculation_winter_supply_ds_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 180);
    cy.get('#calculation_winter_supply_s_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 2);
    cy.get('#calculation_winter_supply_temperature_efficiency_at_balanced_flow').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 81.6);
    cy.get('#calculation_winter_extract_oe_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', -10.9);
    cy.get('#calculation_winter_extract_oe_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 100);
    cy.get('#calculation_winter_extract_de_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 88.8);
    cy.get('#calculation_winter_extract_de_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 87.1);
    cy.get('#calculation_winter_extract_de_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 163.8);
    cy.get('#calculation_winter_extract_e_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 2.3);
    //heat exchanger summer  R800-1.6-E
    cy.get('#calculation_summer_supply_os_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 23.5);
    cy.get('#calculation_summer_supply_os_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 48.9);
    cy.get('#calculation_summer_supply_ds_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 81);
    cy.get('#calculation_summer_supply_ds_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 74.8);
    cy.get('#calculation_summer_supply_ds_heat_recovery_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', -7.2);
    cy.get('#calculation_summer_supply_ds_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 181.4);
    cy.get('#calculation_summer_supply_s_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 2.3);
    cy.get('#calculation_summer_supply_temperature_efficiency_at_balanced_flow').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('eq', 81.6);
    cy.get('#calculation_summer_extract_oe_temperature_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 28.4);
    cy.get('#calculation_summer_extract_oe_relative_humidity_after_heat_exchange').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 41.3);
    cy.get('#calculation_summer_extract_de_exchange_efficiency_dry').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 79.4);
    cy.get('#calculation_summer_extract_de_exchange_efficiency_wet').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 72.7);
    cy.get('#calculation_summer_extract_de_pressure_drop').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 184.6);
    cy.get('#calculation_summer_extract_e_face_air_velocity').invoke('text').should('be.a', 'string')
      .then(parseFloat).should('be.a', 'number').and('equal', 2.3);
    //fans R3G310RS01I1
    cy.get('#calculation_fans_winter_supply_number_of_fans').invoke('text').should('be.a', 'string').
      then(parseInt).should('be.a', 'number').and('equal', 1);
    cy.get('#calculation_winter_supply_n1min').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2399.7);
    cy.get('#calculation_winter_supply_pew').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 572.5);
    cy.get('#calculation_winter_supply_ia').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2.5);
      cy.get('#calculation_winter_supply_qv_m3h').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2000);
    cy.get('#calculation_winter_supply_pf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 631.8);
    cy.get('#calculation_winter_supply_psf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 607);
    cy.get('#calculation_winter_supply_nes').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 58.9);
    cy.get('#calculation_winter_supply_rated_power').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 740);
    cy.get('#calculation_winter_supply_rated_current').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 3.3);
    cy.get('#calculation_winter_supply_u_control_v').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 9.1);
    cy.get('#calculation_winter_supply_general_sound_pressure_three_meters_to_environment_at_operating_point_with_a_filter').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 32.5);
    cy.get('#calculation_fans_winter_extract_number_of_fans').invoke('text').should('be.a', 'string').
      then(parseInt).should('be.a', 'number').and('equal', 1);
    cy.get('#calculation_winter_extract_n1min').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2247.2);
    cy.get('#calculation_winter_extract_pew').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 478.2);
    cy.get('#calculation_winter_extract_ia').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2.1);
      cy.get('#calculation_winter_extract_qv_m3h').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 2000);
      cy.get('#calculation_winter_extract_pf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 531.6);
    cy.get('#calculation_winter_extract_psf_pa').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 506.8);
    cy.get('#calculation_winter_extract_nes').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 58.9);
    cy.get('#calculation_winter_extract_rated_power').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 740);
    cy.get('#calculation_winter_extract_rated_current').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 3.3);
    cy.get('#calculation_winter_extract_u_control_v').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 8.5);
    cy.get('#calculation_winter_extract_general_sound_pressure_three_meters_to_environment_at_operating_point_with_a_filter').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 30.5);
    //erp
    cy.get('#erp_trade_mark_key').should('have.text', 'Trade mark');
    cy.get('#erp_trade_mark_value').should('have.text', 'Blauberg');
    cy.get('#erp_model_key').should('have.text', 'Model');
    cy.get('#erp_model_value').should('include.text','BL02 RH 2500');
    cy.get('#erp_declared_typology_key').should('have.text', 'Declared typology');
    cy.get('#erp_declared_typology_value').should('have.text', 'NRVU BVU');
    cy.get('#erp_type_of_drive_installed_key').should('have.text', 'Type of drive installed');
    cy.get('#erp_type_of_drive_installed_value').should('have.text', 'Integrated MSD');
    cy.get('#erp_type_of_heat_recovery_key').should('have.text', 'Type of heat recovery system');
    cy.get('#erp_type_of_heat_recovery_value').should('have.text', 'Rotary');
    cy.get('#erp_temperature_efficiency_at_balanced_flow_key').should('have.text', 'Thermal efficiency (ηt_nrvu)');
    cy.get('#erp_temperature_efficiency_at_balanced_flow_units').should('include.text', '%');
    cy.get('#erp_temperature_efficiency_at_balanced_flow_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 81.6);
    cy.get('#erp_supply_flow_rate_key').should('have.text', 'Supply flow rate');
    cy.get('#erp_supply_flow_rate_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 0.56);
    cy.get('#erp_effective_electric_power_input_key').should('have.text', 'Effective electric power input');
    cy.get('#erp_effective_electric_power_input_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 1050.7);
    cy.get('#erp_sfp_int_key').should('have.text', 'SFPint');
    cy.get('#erp_sfp_int_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 1069.5);
    cy.get('#erp_face_velocity_key').should('have.text', 'Face velocity at design flow rate');
    cy.get('#erp_face_velocity_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 1.5);
    cy.get('#erp_external_pressure_key').should('have.text', 'External pressure');
    cy.get('#erp_external_pressure_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 200);
    cy.get('#erp_internal_pressure_drop_key').should('have.text', 'Internal pressure drop of ventilation components');
    cy.get('#erp_internal_pressure_drop_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 323);
    cy.get('#erp_static_efficiency_of_fans_key').should('have.text', 'Static efficiency of fans');
    cy.get('#erp_static_efficiency_of_fans_value').invoke('text').should('be.a', 'string').
      then(parseFloat).should('be.a', 'number').and('equal', 58.9);
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
      then(parseFloat).should('be.a', 'number').and('equal', 53);

    cy.checkBasicAfterAuth();
  })
})