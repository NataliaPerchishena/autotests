context('Vents', () => {

    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
    //  cy.login(Url);
      cy.visit(Url+'/heater_electric')
  })
  
  it('calculate_button', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true });
    cy.get('#airflow').clear().type('200');
    cy.get('#on_relative_humidity').clear().type('90');
    cy.get('#on_temperature').clear().type('-10');
    cy.get('#off_temperature').clear().type('10');
    cy.get('#model').select('NK-100-1.6-1', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);

    cy.get('.product-title').should('includes.text', 'NK 100-1.6-1');
    cy.get('#calculation_airflow').should('have.text', '200');
    cy.get('#calculation_on_temperature').should('have.text', '-10');
    cy.get('#calculation_off_temperature').should('have.text', '10');
    cy.get('#calculation_on_relative_humidity').should('have.text', '90');
    cy.get('#calculation_off_relative_humidity').should('have.text', '19.1');
    cy.get('#calculation_required_heating_power').should('have.text', '1.4');
    cy.get('#calculation_air_pressure_drop').should('have.text', '107');
    cy.get('#calculation_phases').should('have.text', '1');
    cy.get('#calculation_maximum_heating_power').should('have.text', '1.6');
    cy.get('#calculation_face_air_velocity').should('have.text', '7.2');
    cy.get('#calculation_mass_air_velocity').should('have.text', '8.8');
    cy.get('#calculation_maximum_current').should('have.text', '7.3');
    cy.get('#calculation_required_current').should('have.text', '6.3');
    cy.get('#calculation_type_of_electric_connection').should('have.text', 'Y');

    cy.checkBasic();
  })
})
