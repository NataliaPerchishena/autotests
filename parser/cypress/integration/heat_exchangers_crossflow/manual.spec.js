context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('heat_exchanger/crossflow')
  })

  it('calculate_button', () => {
    cy.get('#submit').click({ force: true })

    cy.checkBasic()
  })
})
