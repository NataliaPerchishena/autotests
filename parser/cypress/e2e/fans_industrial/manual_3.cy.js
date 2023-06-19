context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('fan')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#motor_type').select('ec', { force: true });
    cy.get('#airflow_at_operating_point').clear().type('2000');
    cy.get('#static_pressure_at_operating_point').clear().type('200');
    cy.get('#number_of_speeds').select('0', { force: true });
    cy.get('#model').select('Iso-V EC 355', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(15000);

    cy.get('#calculation_fans_at_operating_point_rotation_speed').should('have.text', '1105.46');
    cy.get('#calculation_fans_at_operating_point_airflow').should('have.text', '2000');
    cy.get('#calculation_fans_at_operating_point_static_pressure').should('have.text', '200');
    cy.get('#calculation_fans_at_operating_point_static_efficiency').should('have.text', '69.76');
    cy.get('#calculation_fans_at_operating_point_total_efficiency').should('have.text', '76.49');
    cy.get('#calculation_fans_at_operating_point_specific_fan_power').should('have.text', '0.29');
    cy.get('#calculation_fans_at_operating_point_phases').should('have.text', '1');
    cy.get('#calculation_fans_at_operating_point_voltage').should('have.text', '220-240');
    cy.get('#calculation_fans_at_operating_point_power').should('have.text', '159.27');
    cy.get('#calculation_fans_at_operating_point_necessary_current').should('have.text', '0.69');
    cy.get('#calculation_fans_rated_rated_rotation_speed').should('have.text', '1450');
    cy.get('#calculation_fans_rated_rated_airflow').should('have.text', '3832');
    cy.get('#calculation_fans_rated_rated_static_pressure').should('have.text', '584');
    cy.get('#calculation_fans_rated_rated_power').should('have.text', '250');
    cy.get('#calculation_fans_rated_rated_current').should('have.text', '1.09');

    cy.checkBasic();
  })
})