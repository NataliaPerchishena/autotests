context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('fan')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#motor_type').select('ac', { force: true });
    cy.get('#airflow_at_operating_point').clear().type('500');
    cy.get('#static_pressure_at_operating_point').clear().type('100');
    cy.get('#number_of_speeds').select('2', { force: true });
    cy.get('#model').select('Turbo 200', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(5000);

    cy.get('#calculation_fans_low_rotation_speed').should('have.text', '1796.79');
    cy.get('#calculation_fans_low_airflow').should('have.text', '571.59');
    cy.get('#calculation_fans_low_static_pressure').should('have.text', '130.69');
    cy.get('#calculation_fans_low_static_efficiency').should('have.text', '29.5');
    cy.get('#calculation_fans_low_total_efficiency').should('have.text', '33.03');
    cy.get('#calculation_fans_low_specific_fan_power').should('have.text', '0.44');
    cy.get('#calculation_fans_low_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_low_phases').should('have.text', '1');
    cy.get('#calculation_fans_low_voltage').should('have.text', '220-240');
    cy.get('#calculation_fans_low_power').should('have.text', '70.34');
    cy.get('#calculation_fans_low_necessary_current').should('have.text', '0.31');
    cy.get('#calculation_fans_high_rotation_speed').should('have.text', '2105.41');
    cy.get('#calculation_fans_high_airflow').should('have.text', '650.47');
    cy.get('#calculation_fans_high_static_pressure').should('have.text', '169.25');
    cy.get('#calculation_fans_high_static_efficiency').should('have.text', '30.02');
    cy.get('#calculation_fans_high_total_efficiency').should('have.text', '33.61');
    cy.get('#calculation_fans_high_specific_fan_power').should('have.text', '0.56');
    cy.get('#calculation_fans_high_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_high_phases').should('have.text', '1');
    cy.get('#calculation_fans_high_voltage').should('have.text', '220-240');
    cy.get('#calculation_fans_high_power').should('have.text', '101.88');
    cy.get('#calculation_fans_high_necessary_current').should('have.text', '0.44');
    cy.get('#calculation_fans_rated_rated_low_rotation_speed').should('have.text', '1915');
    cy.get('#calculation_fans_rated_rated_low_airflow').should('have.text', '830');
    cy.get('#calculation_fans_rated_rated_low_static_pressure').should('have.text', '255');
    cy.get('#calculation_fans_rated_rated_low_power').should('have.text', '76');
    cy.get('#calculation_fans_rated_rated_low_current').should('have.text', '0.33');
    cy.get('#calculation_fans_rated_rated_high_rotation_speed').should('have.text', '2380');
    cy.get('#calculation_fans_rated_rated_high_airflow').should('have.text', '1040');
    cy.get('#calculation_fans_rated_rated_high_static_pressure').should('have.text', '348');
    cy.get('#calculation_fans_rated_rated_high_power').should('have.text', '108');
    cy.get('#calculation_fans_rated_rated_high_current').should('have.text', '0.47');

    cy.checkBasic();
  })
})