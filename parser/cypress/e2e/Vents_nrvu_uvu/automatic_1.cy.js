context('Vents', () => {
before( () => {
 // Cypress.session.clearAllSavedSessions();
})
  beforeEach(() => {
    let Url = Cypress.env('ventsUrl');
    cy.login(Url);
    cy.wait(1500);
    cy.visit(Url+'/nrvu_uvu');
  
  })

  it('automatic_selection', () => {
    cy.get('#airflow').clear().type('2000')
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1000)

       cy.checkBasicAfterAuth();
  })
  it('automatic_selection', () => {
    cy.get('#airflow').clear().type('4000')
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1000)

       cy.checkBasicAfterAuth();
  })
})
