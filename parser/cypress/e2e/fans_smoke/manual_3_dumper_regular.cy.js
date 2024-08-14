context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');
    //  cy.login(Url);
      cy.visit(Url+'/smoke_fan')
  })

  it('manual_selection', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_fire_dampers_rectangular').click({ force: true });
    cy.get('#number_of_flanges').select('2', { force: true });
    cy.get('#width').select('400', { force: true });
    cy.get('#actuator_type').select('zern_return_spring_thermoelectric_breaker', { force: true});
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1500);
  
    cy.get('[data-cy=title]').should('includes.text', 'Fire dampers rectangular BSK1 40x30/2 PKP230T/O');
    cy.get('.table-responsive').should('be.visible');
    cy.get('.selector-calculations').contains('Number of flanges').next().should('contain', '2');
    cy.get('.selector-calculations').contains('Actuator type').next().should('contain', 'ZERN with return spring and thermoelectric breaker', { matchCase: false });
    cy.get('.selector-dimensions').contains('width', { matchCase: false }).next().next().should('contain', '400');
  
    cy.checkBasic(); 

  })
})