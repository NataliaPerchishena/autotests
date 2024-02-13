context('Vents', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
    //  cy.login(Url);
      cy.visit(Url+'/fan')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });

    cy.wait(10000);

    cy.checkBasic();
  })
})