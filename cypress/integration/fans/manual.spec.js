context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('fan')
  })

  it('manual_selection', () => {
    cy.contains('Manual selection').should('not.be.disabled').click({ force: true })

    cy.get('#airflow_at_operating_point').clear().type('100')
    cy.get('#static_pressure_at_operating_point').clear().type('10')
    cy.get('#motor_type').select('ec', { force: true})
    cy.get('#manual_calculate-submit').click({ force: true })

    cy.wait(5000);

    cy.checkBasic()
  })
})