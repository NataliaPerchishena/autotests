context('Blauberg', () => {
  before( () => {
  //  Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
      cy.login(Url);
      cy.visit(Url+'/nrvu_uvu');
  
  })

  it('automatic_selection', () => {
    cy.get('#airflow').clear().type('2000')
    cy.get('#automatic_calculate-submit').click({ force: true })

       cy.checkBasicAfterAuth();
  })
})
