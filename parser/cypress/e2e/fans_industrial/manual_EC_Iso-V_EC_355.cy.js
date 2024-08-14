context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');
    //  cy.login(Url);
      cy.visit(Url+'/fan')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#motor_type').select('ec', { force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('0', { force: true });
    cy.get('#model').select('Iso-V EC 355', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);

    cy.get('.product-sku').should('includes.text', 'Iso-V EC 355');
    cy.get('#calculation_fans_at_operating_point_rotation_speed').should('have.text', '1105.5');
    cy.get('#calculation_fans_at_operating_point_airflow').should('have.text', '2000');
    cy.get('#calculation_fans_at_operating_point_static_pressure').should('have.text', '200');
    cy.get('#calculation_fans_at_operating_point_static_efficiency').should('have.text', '69.8');
    cy.get('#calculation_fans_at_operating_point_total_efficiency').should('have.text', '76.5');
    cy.get('#calculation_fans_at_operating_point_sfp_e').should('have.text', '0.3');
    cy.get('#calculation_fans_at_operating_point_phases').should('have.text', '1');
    cy.get('#calculation_fans_at_operating_point_voltage').should('have.text', '220-240');
    cy.get('#calculation_fans_at_operating_point_power').should('have.text', '159.3');
    cy.get('#calculation_fans_at_operating_point_necessary_current').should('have.text', '0.7');
    cy.get('#calculation_fans_rated_rated_rotation_speed').should('have.text', '1450');
    cy.get('#calculation_fans_rated_rated_airflow').should('have.text', '3832');
    cy.get('#calculation_fans_rated_rated_static_pressure').should('have.text', '584');
    cy.get('#calculation_fans_rated_rated_power').should('have.text', '250');
    cy.get('#calculation_fans_rated_rated_current').should('have.text', '1.1');

    cy.get('#sound_table_at_operating_point').should('be.visible')
    cy.get('#sound_table_at_operating_point tbody').children('tr').should('have.length', 3).should("not.be.empty")

    cy.get('div[t=asp_chart]').should('be.visible').should("not.be.empty")
    cy.get('div[t=ap_chart]').should('be.visible').should("not.be.empty")
    cy.get('div[t=sound_chart_at_operating_point]').should('be.visible').should("not.be.empty")

    cy.checkBasic();
  })
})