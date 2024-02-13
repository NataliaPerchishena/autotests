context('Vents', () => {
beforeEach(() => {
  let Url = Cypress.env('ventsUrl');
//  cy.login(Url);
  cy.visit(Url+'/fan')
})


  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#motor_type').select('ac', { force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('1', { force: true });
    cy.get('#model').select('Iso-K 250 4D', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);

    cy.get('.product-sku').should('includes.text', 'KSK 250 4D');
    cy.get('#calculation_fans_at_operating_point_rotation_speed').should('have.text', '1470');
    cy.get('#calculation_fans_at_operating_point_airflow').should('have.text', '2964.8');
    cy.get('#calculation_fans_at_operating_point_static_pressure').should('have.text', '439.5');
    cy.get('#calculation_fans_at_operating_point_static_efficiency').should('have.text', '24.1');
    cy.get('#calculation_fans_at_operating_point_total_efficiency').should('have.text', '33.6');
    cy.get('#calculation_fans_at_operating_point_specific_fan_power').should('have.text', '1.8');
    cy.get('#calculation_fans_at_operating_point_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_at_operating_point_phases').should('have.text', '3');
    cy.get('#calculation_fans_at_operating_point_voltage').should('have.text', '380-400');
    cy.get('#calculation_fans_at_operating_point_power').should('have.text', '1500');
    cy.get('#calculation_fans_at_operating_point_necessary_current').should('have.text', '2.2');
    cy.get('#calculation_fans_rated_rated_rotation_speed').should('have.text', '1470');
    cy.get('#calculation_fans_rated_rated_airflow').should('have.text', '3604');
    cy.get('#calculation_fans_rated_rated_static_pressure').should('have.text', '623');
    cy.get('#calculation_fans_rated_rated_power').should('have.text', '1500');
    cy.get('#calculation_fans_rated_rated_current').should('have.text', '2.2');

    cy.checkBasic();
  })
})