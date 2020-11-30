context('Blauberg', () => {
  beforeEach(() => {
    cy.visit('https://blaubergselector.com/heat_exchanger/rotary')
  })

  it('calculate_button', () => {
    cy.get('#winter_standard_airflow_supply').clear().type('1000')
    cy.get('#winter_standard_airflow_extract').clear().type('1000')
    cy.get('#submit').click({ force: true })

    cy.checkBasic()
  })
})
