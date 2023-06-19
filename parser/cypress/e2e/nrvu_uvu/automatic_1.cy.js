context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('nrvu_uvu')
  })

  it('automatic_selection', () => {
    cy.get('#airflow').clear().type('2000')
    cy.get('#automatic_calculate-submit').click({ force: true })

    cy.checkBasic();
  })
})
