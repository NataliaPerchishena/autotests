context('Vents', () => {
  before( () => {
 //   Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');

      cy.login(Url);
      cy.visit(Url + '/pre_configured_heat_recovery_unit');

  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#extract_airflow').clear().type('6000');
    cy.get('#supply_pressure').clear().type('200');
    cy.get('#extract_pressure').clear().type('200');
    cy.get('#supply_heater').select('no', { force: true });
    cy.get('#supply_cooler').select('no', { force: true });
    cy.get('#tabular_select_unit_size').find('input[value="AVS95 CFP8700"]').check()
    
    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);
    
    cy.get('[data-cy=title]').should('include.text', 'BLS95 CFP8700');
//heat exchenger summer
    cy.get('#calculation_summer_supply_output_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 23.6);
    cy.get('#calculation_summer_supply_output_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 57.7);
    cy.get('#calculation_summer_supply_condensation').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 0);
    cy.get('#calculation_summer_supply_temperature_efficiency_dry').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 80.5);
    cy.get('#calculation_summer_supply_temperature_efficiency_wet').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 80.5);
    cy.get('#calculation_summer_supply_heat_recovery_dry').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', -4.1);
    cy.get('#calculation_summer_supply_heat_recovery_wet').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', -4.1);
    cy.get('#calculation_summer_supply_air_pressure_drop').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 154.7);
    cy.get('#calculation_summer_supply_face_air_velocity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1.9);
    cy.get('#calculation_summer_supply_temperature_efficiency_at_balanced_flow').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 81);
    cy.get('#calculation_summer_extract_output_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 28.4);
    cy.get('#calculation_summer_extract_output_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 33.2);
    cy.get('#calculation_summer_extract_condensation').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 0);
    cy.get('#calculation_summer_extract_temperature_efficiency_dry').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 80.5);
    cy.get('#calculation_summer_extract_temperature_efficiency_wet').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 80.5);
    cy.get('#calculation_summer_extract_air_pressure_drop').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 149.4);
    cy.get('#calculation_summer_extract_face_air_velocity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1.9);
//heat exchenger winter
    cy.get('#calculation_winter_supply_output_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 17.2);
    cy.get('#calculation_winter_supply_output_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 7.4);
    cy.get('#calculation_winter_supply_condensation').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 0);
    cy.get('#calculation_winter_supply_temperature_efficiency_dry').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 81.5);
    cy.get('#calculation_winter_supply_temperature_efficiency_wet').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 87);
    cy.get('#calculation_winter_supply_heat_recovery_dry').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 20.4);
    cy.get('#calculation_winter_supply_heat_recovery_wet').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 21.8);
    cy.get('#calculation_winter_supply_air_pressure_drop').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 125.8)
    cy.get('#calculation_winter_supply_face_air_velocity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1.7)
    cy.get('#calculation_winter_supply_temperature_efficiency_at_balanced_flow').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 81);
    cy.get('#calculation_winter_extract_output_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', -1.3);
    cy.get('#calculation_winter_extract_output_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 91);
    cy.get('#calculation_winter_extract_condensation').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 8.4);
    cy.get('#calculation_winter_extract_temperature_efficiency_dry').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 81.5);
    cy.get('#calculation_winter_extract_temperature_efficiency_wet').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 63);
    cy.get('#calculation_winter_extract_air_pressure_drop').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 149.4);
    cy.get('#calculation_winter_extract_face_air_velocity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1.9);

//main heater
    cy.get('#calculation_heater_on_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 17.2);
    cy.get('#calculation_heater_off_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 22);
    cy.get('#calculation_heater_on_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 7.4);
    cy.get('#calculation_heater_off_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 5.5);
    cy.get('#calculation_heater_required_heating_power').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 3.3);
    cy.get('#calculation_heater_maximum_heating_power').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 9);
//cooler
    cy.get('#calculation_summer_airflow').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 2000);
    cy.get('#calculation_summer_on_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 23.6);
    cy.get('#calculation_summer_off_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 20);
    cy.get('#calculation_summer_on_relative_humidity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 57.7);
    cy.get('#calculation_summer_relative_humidity_output').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 64.6);
    cy.get('#calculation_summer_evaporation_temperature').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 5);
    cy.get('#calculation_summer_superheat').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2.5);
    cy.get('#calculation_summer_required_power').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 4.2);
    cy.get('#calculation_summer_maximum_power').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 8.3);
    cy.get('#calculation_summer_condensation').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', -2.4);
    cy.get('#calculation_summer_air_pressure_drop').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 64.6);
    cy.get('#calculation_summer_face_air_velocity').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2.6);
    cy.get('#calculation_summer_mass_freon_flow_rate').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 98.2);
    cy.get('#calculation_summer_hydraulic_resistance').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 0);
    cy.get('#calculation_summer_refrigerating_agent').should('include.text', 'R410A');
//fans
  //supply
    cy.get('#calculation_winter_supply_n1min').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2238.4);
    cy.get('#calculation_winter_supply_pew').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 509.5);
    cy.get('#calculation_winter_supply_ia').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2.2);
    cy.get('#calculation_winter_supply_psf_pa').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 539.7);
    cy.get('#calculation_winter_supply_nes').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 58.9);
    cy.get('#calculation_winter_supply_qv_m3h').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 2000);
    cy.get('#calculation_fans_winter_supply_number_of_fans').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 1);
    cy.get('#calculation_winter_supply_general_sound_pressure_three_meters_to_environment_at_operating_point_with_a_filter').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 35.8);
    cy.get('#fans_sound_power_supply tbody').children('tr').should('have.length', 6).should("not.be.empty").should('be.visible')
  //extract
    cy.get('#calculation_winter_extract_n1min').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2172.7);
    cy.get('#calculation_winter_extract_pew').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 469.1);
    cy.get('#calculation_winter_extract_ia').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2.1);
    cy.get('#calculation_winter_extract_psf_pa').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 495.4);
    cy.get('#calculation_winter_extract_nes').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 58.7);
    cy.get('#calculation_winter_extract_qv_m3h').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 2000);
    cy.get('#calculation_fans_winter_extract_number_of_fans').invoke('text').should('be.a', 'string').
    then(parseInt).should('be.a', 'number').and('equal', 1);
    cy.get('#calculation_winter_extract_general_sound_pressure_three_meters_to_environment_at_operating_point_with_a_filter').invoke('text').should('be.a', 'string').
    then(parseFloat).should('be.a', 'number').and('equal', 35.1);
    cy.get('#fans_sound_power_extract tbody').children('tr').should('have.length', 6).should("not.be.empty").should('be.visible')
  
    cy.checkBasicAfterAuth();
  })
  //summer
  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('summer', { force: true });
   
    cy.get('#extract_airflow').clear().type('6000');
    cy.get('#supply_pressure').clear().type('200');
    cy.get('#extract_pressure').clear().type('200');
    cy.get('#supply_heater').select('no', { force: true });
    cy.get('#supply_cooler').select('no', { force: true });
    cy.get('#tabular_select_unit_size').find('input[value="BLS95 CFP8700"]').check()

    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);
    
    cy.get('[data-cy=title]').should('include.text', 'BLS95 CFP8700');
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
    
   cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
  })
    //winter
    it.only('manual_selection', () => {
      cy.get('#manual_selection').click({ force: true })
      cy.get('#seasons').select('winter', { force: true });
     
      cy.get('#supply_airflow').clear().type('6000');
      cy.get('#extract_airflow').clear().type('6000');
      cy.get('#supply_pressure').clear().type('200');
      cy.get('#extract_pressure').clear().type('200');
      cy.get('#supply_heater').select('no', { force: true });
      cy.get('#supply_cooler').select('no', { force: true });
      cy.get('#tabular_select_unit_size').find('input[value="AVS95 CFP8700"]').check()
  
      cy.get('#manual_calculate-submit').click({ force: true });
      cy.wait(1000);
      
      cy.get('[data-cy=title]').should('include.text', 'AVS95 CFP8700');
      cy.checkBasicAfterAuth()
    })
})