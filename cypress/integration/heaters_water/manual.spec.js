context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heater_water')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.checkBasic()
  })
})
