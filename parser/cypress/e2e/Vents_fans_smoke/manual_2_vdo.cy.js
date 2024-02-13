context('Blauberg', () => {
  beforeEach(() => {
    let Url = Cypress.env('ventsUrl');
    
    cy.visit(Url+'/smoke_fan')
})

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_vdo').click({ force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('2', { force: true });
    cy.get('#model').select('VDO-630-4/8D/0.6/0.15-8/25/AL-300/2', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1500);
  
    cy.get('.product-sku').should('includes.text', 'VDO-630-4/8D/0.6/0.15-8/25/AL-U1-300/2');
    cy.get('#calculation_fans_low_fan_diameter').should('have.text', '630');
    cy.get('#calculation_fans_low_airflow').should('have.text', '1029.7');
    cy.get('#calculation_fans_low_static_pressure').should('have.text', '53');
    cy.get('#calculation_fans_low_rated_power').should('have.text', '150');
    cy.get('#calculation_fans_low_power').should('have.text', '36.8');
    cy.get('#calculation_fans_low_rated_current').should('have.text', '0.4');
    cy.get('#calculation_fans_low_necessary_current').should('have.text', '0.1');
    cy.get('#calculation_fans_low_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_low_voltage').should('have.text', '400');
    cy.get('#calculation_fans_low_phases').should('have.text', '3');
    cy.get('#calculation_fans_low_static_efficiency').should('have.text', '41.2');
    cy.get('#calculation_fans_low_total_efficiency').should('have.text', '41.6');
    cy.get('#calculation_fans_high_fan_diameter').should('have.text', '630');
    cy.get('#calculation_fans_high_airflow').should('have.text', '2059.9');
    cy.get('#calculation_fans_high_static_pressure').should('have.text', '212.2');
    cy.get('#calculation_fans_high_rated_power').should('have.text', '600');
    cy.get('#calculation_fans_high_power').should('have.text', '294.5');
    cy.get('#calculation_fans_high_rated_current').should('have.text', '1.8');
    cy.get('#calculation_fans_high_necessary_current').should('have.text', '0.9');
    cy.get('#calculation_fans_high_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_high_voltage').should('have.text', '400');
    cy.get('#calculation_fans_high_phases').should('have.text', '3');
    cy.get('#calculation_fans_high_static_efficiency').should('have.text', '41.2');
    cy.get('#calculation_fans_high_total_efficiency').should('have.text', '41.6');

    cy.checkBasic();
  })
})