context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('smoke_fan')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_axis_fp').click({ force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('1', { force: true });
    cy.get('#model').select('VDO-400-2D/0.55-6/25/AL-300/2', { force: true});

    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(5000);

    cy.get('#calculation_fans_value_fan_diameter').should('have.text', '400');
    cy.get('#calculation_fans_value_airflow').should('have.text', '2773.56');
    cy.get('#calculation_fans_value_static_pressure').should('have.text', '384.63');
    cy.get('#calculation_fans_value_rotation_per_minute_at_operating_point_without_frequency_drive').should('have.text', '2880');
    cy.get('#calculation_fans_value_rated_power').should('have.text', '550');
    cy.get('#calculation_fans_value_power').should('have.text', '593.2');
    cy.get('#calculation_fans_value_rated_current').should('have.text', '1.39');
    cy.get('#calculation_fans_value_necessary_current').should('have.text', '1.5');
    cy.get('#calculation_fans_value_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_value_voltage').should('have.text', '400');
    cy.get('#calculation_fans_value_phases').should('have.text', '3');
    cy.get('#calculation_fans_value_static_efficiency').should('have.text', '49.96');
    cy.get('#calculation_fans_value_total_efficiency').should('have.text', '52.95');

    cy.checkBasic();
  })
})