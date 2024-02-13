context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
    //  cy.login(Url);
      cy.visit(Url+'/cooler_water')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });
    cy.wait(1000);
    cy.get('[data-cy=calculations]').should('be.visible');
    //cy.get('[data-cy=dimensions]').should('be.visible');
    cy.checkBasic();
  })
})
