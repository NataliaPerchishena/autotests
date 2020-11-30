context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_bvu')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })
    cy.get('#airflow_supply').clear().type('3000')
    cy.get('#airflow_extract').clear().type('3000')
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.checkBasic()
  })
})
