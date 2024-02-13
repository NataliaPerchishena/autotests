context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
    //  cy.login(Url);
      cy.visit(Url+'/heater_water')
  })

  it('calculate_button', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true });
    cy.get('#airflow').clear().type('200');
    cy.get('#on_relative_humidity').clear().type('90');
    cy.get('#water_in').clear().type('80');
    cy.get('#water_out').clear().type('60');
    cy.get('#on_temperature').clear().type('-10');
    cy.get('#off_temperature').clear().type('10');
    cy.get('#model').select('NKV-125-2', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);
    
    cy.get('.product-title').should('includes.text', 'WKH 125-2');
    cy.get('#calculation_airflow').should('have.text', '200');
    cy.get('#calculation_on_temperature').should('have.text', '-10');
    cy.get('#calculation_off_temperature').should('have.text', '10');
    cy.get('#calculation_water_in').should('have.text', '80');
    cy.get('#calculation_water_out').should('have.text', '60');
    cy.get('#calculation_on_relative_humidity').should('have.text', '90');
    cy.get('#calculation_off_relative_humidity').should('have.text', '19.1');
    cy.get('#calculation_required_heating_power').should('have.text', '1.4');
    cy.get('#calculation_maximum_heating_power').should('have.text', '4.2');
    cy.get('#calculation_water_pressure_drop').should('have.text', '0');
    cy.get('#calculation_water_flow').should('have.text', '0.02');
    cy.get('#calculation_face_air_velocity').should('have.text', '4.6');
    cy.get('#calculation_mass_air_velocity').should('have.text', '5.6');
    cy.get('#calculation_air_pressure_drop').should('have.text', '29');
    cy.get('#calculation_glycol').should('have.text', '0');

    cy.checkBasic();
  })
})
  