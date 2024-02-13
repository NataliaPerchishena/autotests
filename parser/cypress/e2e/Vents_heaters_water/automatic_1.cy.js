context('Vents', () => {
 
    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
     // cy.login(Url);
      cy.visit(Url+'/heater_water')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.checkBasic();
  })
})
