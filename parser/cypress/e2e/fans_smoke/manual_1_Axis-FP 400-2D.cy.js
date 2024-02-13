context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
   //   cy.login(Url);
      cy.visit(Url+'/smoke_fan')
  })

  it('manual_selection_calc_smoke_fan', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_axis_fp').click({ force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('1', { force: true });
    cy.get('#model').select('VDO-400-2D/0.55-6/25/AL-300/2', { force: true});

    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);

    cy.get('.product-sku').should('includes.text', 'Axis-FP 400-2D/0.55-6/25/AL-U1-300/2');
    cy.get('#calculation_fans_value_fan_diameter').should('have.text', '400');
    cy.get('#calculation_fans_value_airflow').should('have.text', '2773.6');
    cy.get('#calculation_fans_value_static_pressure').should('have.text', '384.6');
    cy.get('#calculation_fans_value_rotation_per_minute_at_operating_point_without_frequency_drive').should('have.text', '2880');
    cy.get('#calculation_fans_value_rated_power').should('have.text', '550');
    cy.get('#calculation_fans_value_power').should('have.text', '593.2');
    cy.get('#calculation_fans_value_rated_current').should('have.text', '1.4');
    cy.get('#calculation_fans_value_necessary_current').should('have.text', '1.5');
    cy.get('#calculation_fans_value_network_frequency').should('have.text', '50');
    cy.get('#calculation_fans_value_voltage').should('have.text', '400');
    cy.get('#calculation_fans_value_phases').should('have.text', '3');
    cy.get('#calculation_fans_value_static_efficiency').should('have.text', '50');
    cy.get('#calculation_fans_value_total_efficiency').should('have.text', '52.9');

    cy.get('.selector-dimensions').children('div.table-responsive').find('tbody').find('tr').should('have.length.least', 7);
    cy.get('.product-calculations').parent().prev('div').find('div.chart-block').should('have.length', 2);
    // cy.get('[t=sound_chart_value]').should('be.visible').find('svg').should('exist');

    cy.checkBasic();
  })
   
it('manual_selection_accessories_smoke_fan', () => {
  cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_axis_fp').click({ force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('1', { force: true });
    cy.get('#model').select('VDO-400-2D/0.55-6/25/AL-300/2', { force: true});

    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1000);

cy.get('.accessories').find('a[data-action=collapse]').click()
cy.get('.accessories').children('.panel-body').find('tbody').first().find('tr').should('have.length.least', 0);
})

    
})