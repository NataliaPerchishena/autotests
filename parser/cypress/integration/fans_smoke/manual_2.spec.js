context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('smoke_fan')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_axis_fp').click({ force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('2', { force: true });
    cy.get('#model').select('VDO-630-4/8D/0.6/0.15-8/25/AL-300/2', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(5000);
  
    cy.get('#calculation_fans_low_fan_diameter').should('have.text', '630');
    cy.get('#calculation_fans_low_airflow').should('have.text', '1029.65');
    cy.get('#calculation_fans_low_static_pressure').should('have.text', '53.01');
    cy.get('#calculation_fans_low_rated_power').should('have.text', '150');
    cy.get('#calculation_fans_low_power').should('have.text', '36.77');
    cy.get('#calculation_fans_low_rated_current').should('have.text', '0.44');
    cy.get('#calculation_fans_low_necessary_current').should('have.text', '0.11');
    cy.get('#calculation_fans_low_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_low_voltage').should('have.text', '400');
    cy.get('#calculation_fans_low_phases').should('have.text', '3');
    cy.get('#calculation_fans_low_static_efficiency').should('have.text', '41.24');
    cy.get('#calculation_fans_low_total_efficiency').should('have.text', '41.64');
    cy.get('#calculation_fans_high_fan_diameter').should('have.text', '630');
    cy.get('#calculation_fans_high_airflow').should('have.text', '2059.93');
    cy.get('#calculation_fans_high_static_pressure').should('have.text', '212.17');
    cy.get('#calculation_fans_high_rated_power').should('have.text', '600');
    cy.get('#calculation_fans_high_power').should('have.text', '294.49');
    cy.get('#calculation_fans_high_rated_current').should('have.text', '1.76');
    cy.get('#calculation_fans_high_necessary_current').should('have.text', '0.86');
    cy.get('#calculation_fans_high_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_high_voltage').should('have.text', '400');
    cy.get('#calculation_fans_high_phases').should('have.text', '3');
    cy.get('#calculation_fans_high_static_efficiency').should('have.text', '41.22');
    cy.get('#calculation_fans_high_total_efficiency').should('have.text', '41.63');

    cy.checkBasic();
  })
})