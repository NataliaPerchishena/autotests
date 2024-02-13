context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
   //   cy.login(Url);
      cy.visit(Url+'/fan')
     
  })

  it('manual_selection_poduct_calculations', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#number_of_speeds').select('3', { force: true });
    cy.get('#model').select('Primo 250', { force: true});
    cy.get('#airflow_at_operating_point').clear().type('500');
    cy.get('#static_pressure_at_operating_point').clear().type('100');
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);

    cy.get('.product-sku').should('includes.text', 'Primo 250');

cy.get('#calculation_fans_speed_1_rotation_speed').should('have.text', '2080.9');
cy.get('#calculation_fans_speed_2_rotation_speed').should('have.text', '2565.4');
cy.get('#calculation_fans_speed_3_rotation_speed').should('have.text', '2860');

cy.get('#calculation_fans_speed_1_airflow').should('have.text', '576.7');
cy.get('#calculation_fans_speed_2_airflow').should('have.text', '703.4');
cy.get('#calculation_fans_speed_3_airflow').should('have.text', '787.9');

cy.get('#calculation_fans_speed_1_static_pressure').should('have.text', '133');
cy.get('#calculation_fans_speed_2_static_pressure').should('have.text', '197.9');
cy.get('#calculation_fans_speed_3_static_pressure').should('have.text', '248.3');

cy.get('#calculation_fans_speed_1_static_efficiency').should('have.text', '16.9');
cy.get('#calculation_fans_speed_2_static_efficiency').should('have.text', '28.5');
cy.get('#calculation_fans_speed_3_static_efficiency').should('have.text', '35.1');

cy.get('#calculation_fans_speed_1_total_efficiency').should('have.text', '17.8');
cy.get('#calculation_fans_speed_2_total_efficiency').should('have.text', '29.9');
cy.get('#calculation_fans_speed_3_total_efficiency').should('have.text', '36.8');

cy.get('#calculation_fans_speed_1_specific_fan_power').should('have.text', '0.8');
cy.get('#calculation_fans_speed_2_specific_fan_power').should('have.text', '0.7');
cy.get('#calculation_fans_speed_3_specific_fan_power').should('have.text', '0.7');

cy.get('#calculation_fans_speed_1_network_frequency').should('have.text', '50');
cy.get('#calculation_fans_speed_2_network_frequency').should('have.text', '50');
cy.get('#calculation_fans_speed_3_network_frequency').should('have.text', '50');

cy.get('#calculation_fans_speed_1_phases').should('have.text', '1');
cy.get('#calculation_fans_speed_2_phases').should('have.text', '1');
cy.get('#calculation_fans_speed_3_phases').should('have.text', '1');

cy.get('#calculation_fans_speed_1_voltage').should('have.text', '220-240');
cy.get('#calculation_fans_speed_2_voltage').should('have.text', '220-240');
cy.get('#calculation_fans_speed_3_voltage').should('have.text', '220-240');

cy.get('#calculation_fans_speed_1_power').should('have.text', '126');
cy.get('#calculation_fans_speed_2_power').should('have.text', '135.8');
cy.get('#calculation_fans_speed_3_power').should('have.text', '155');

cy.get('#calculation_fans_speed_1_necessary_current').should('have.text', '0.5');
cy.get('#calculation_fans_speed_2_necessary_current').should('have.text', '0.6');
cy.get('#calculation_fans_speed_3_necessary_current').should('have.text', '0.7');

cy.get('#sound_table_speed_1').should('be.visible')
cy.get('#sound_table_speed_1 tbody').children('tr').should('have.length', 3).should("not.be.empty")
cy.get('#sound_table_speed_2').should('be.visible')
cy.get('#sound_table_speed_2 tbody').children('tr').should('have.length', 3).should("not.be.empty")
cy.get('#sound_table_speed_3').should('be.visible')
cy.get('#sound_table_speed_3 tbody').children('tr').should('have.length', 3).should("not.be.empty")

cy.get('div[t=asp_chart]').should('be.visible').should("not.be.empty")
cy.get('div[t=ap_chart]').should('be.visible').should("not.be.empty")
cy.get('div[t=sound_chart_speed_1]').should('be.visible').should("not.be.empty")
cy.get('div[t=sound_chart_speed_2]').should('be.visible').should("not.be.empty")
cy.get('div[t=sound_chart_speed_3]').should('be.visible').should("not.be.empty")

 
   cy.checkBasic();
  })

})
 