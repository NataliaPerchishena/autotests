context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_bvu')
  })

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.checkBasic();
  })
})
