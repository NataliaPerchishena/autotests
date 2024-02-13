context('Blauberg', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  })
  beforeEach(() => {
    let Url = Cypress.env('baubUrl');
    //  cy.login(Url);
    cy.visit(Url + '/smoke_fan')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.wait(1500);
    cy.checkBasic();
  })
  
  it('automatic_selection_number_smoke_fan', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1000);
    cy.get('div[class=wrapper]').next().should('include.text', 'Select fan number')
  })

})