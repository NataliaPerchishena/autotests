context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/cooler_water')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.checkBasic()
  })
})
