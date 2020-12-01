context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('fan')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.wait(3000);

    cy.checkBasic()
  })
})