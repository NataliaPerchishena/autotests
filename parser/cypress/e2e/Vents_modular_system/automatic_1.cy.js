context('Vents', () => {

    beforeEach(() => {
      let Url = Cypress.env('ventsUrl');
      cy.login(Url);
      cy.wait(1500)
      cy.visit(Url+'/modular_system');
    
  })

  it('automatic_selection', () => {
   // cy.get('#automatic_calculate-submit').click({ force: true });
  //  cy.wait(1000);
  cy.get('#manual_selection').click({ force: true })
  cy.get('#select2-type-container').click() 
  cy.get('#type').select('crossflow', { force: true })
  cy.get('#select2-seasons-container').click()
  cy.get('#seasons').select('summer', {force: true})
  cy.get('#tabular_select_unit_size').find('input[value="AVQ09"]').check()

    cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)

      cy.get('#front_projection_drawing').should('be.visible');
      cy.checkDescription();
      cy.checkImage();
      cy.checkSaveAsAfterAuth();

      cy.intercept('pdf').as('postspdf');
      cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
      cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
        
  })
})
