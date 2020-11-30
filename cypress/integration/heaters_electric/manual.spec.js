context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heater_electric')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })
    cy.get('#airflow').clear().type('50')
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.checkBasic()
  })
})
