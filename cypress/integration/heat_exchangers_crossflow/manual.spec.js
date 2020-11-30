context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heat_exchanger/crossflow')
  })

  it('calculate_button', () => {
    cy.get('#submit').click({ force: true })

    cy.checkBasic()
  })
})
