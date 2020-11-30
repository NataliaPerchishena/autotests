context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('cooler_water')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.checkBasic()
  })
})
