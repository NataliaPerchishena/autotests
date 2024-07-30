context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');
    //  cy.login(Url);
      cy.visit(Url+'/cooler_freon')
  })

  it('automatic_selection', () => {
    cy.get('#seasons').select('both', { force: true });
    cy.get('#connection_type').select([1], {force: true})
    cy.get('#connection_size').select([2], { force: true })
    cy.get('#refrigerating_agent').select('R32', { force: true });
    cy.get('#airflow').clear().type('200');
    cy.get('#summer_on_temperature').clear().type('30');
    cy.get('#summer_on_relative_humidity').clear().type('40');
    cy.get('#summer_off_temperature').clear().type('24');
    cy.get('#summer_evaporation_temperature').clear().type('6');
    cy.get('#summer_superheat').clear().type('3');
    cy.get('#summer_condensation_temperature').clear().type('40');
    cy.get('#summer_subcool').clear().type('2.7');
    cy.get('#winter_on_temperature').clear().type('-10');
    cy.get('#winter_on_relative_humidity').clear().type('90');
    cy.get('#winter_off_temperature').clear().type('10');
    cy.get('#winter_evaporation_temperature').clear().type('6');
    cy.get('#winter_superheat').clear().type('3');
    cy.get('#winter_condensation_temperature').clear().type('40');
    cy.get('#winter_subcool').clear().type('2.7');
    
    cy.get('#automatic_calculate-submit').click({ force: true }).
    //cy.wait(1000);
    get('[data-cy=calculations]').should('be.visible');
    cy.get('[data-cy=dimensions]').should('be.visible');

    cy.checkBasic();
  })
})
