context('Vents', () => {

    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
      //cy.login(Url);
      cy.visit(Url+'/smoke_fan')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })
    
    cy.wait(1500);

    cy.checkBasic();
  })
})