context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
     // cy.login(Url);
      cy.visit(Url+'/fan')
  })

  it('automatic_selection', () => {
    cy.get('#number_of_speeds').select('2', { force: true })
    cy.get('#automatic_calculate-submit').click({ force: true });

    cy.wait(1000);

    cy.checkBasic();
  })
})