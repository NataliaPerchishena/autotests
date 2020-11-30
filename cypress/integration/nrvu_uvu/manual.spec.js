context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_uvu')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })
    cy.get('#airflow').clear().type('1000')
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.checkBasic()
  })
})
