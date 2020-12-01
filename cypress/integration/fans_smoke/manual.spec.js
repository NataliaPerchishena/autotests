context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('smoke_fan')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })

    cy.get('#airflow_at_operating_point').clear().type('500')
    cy.get('#static_pressure_at_operating_point').clear().type('10')
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.wait(1000);

    cy.checkBasic()
  })
})
