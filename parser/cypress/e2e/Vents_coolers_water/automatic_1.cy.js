context('Vents', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
   //   cy.login(Url);
      cy.visit(Url+'/cooler_water')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });
    cy.wait(1000);

    cy.checkBasic();
  })
})
