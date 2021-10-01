context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('smoke_fan')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })
    
    cy.wait(15000);

    cy.checkBasic();
  })
})