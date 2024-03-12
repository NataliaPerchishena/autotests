context('Blauberg', () => {
  before( () => {
  // Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baubUrl');
      cy.login(Url);
      cy.wait(1000)
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
  cy.get('#tabular_select_unit_size').find('input[value="BLQ09"]').check()

     cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
       cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)

      cy.get('#front_projection_drawing').should('be.visible');
      cy.checkBasicAfterAuth();



      // cy.intercept('pdf').as('postpdf');
      // cy.get('[data-cy=pdf]').first().click({ force: true }).wait(10000)
      // cy.wait('@postpdf').its('response.statusCode').should('eq', 200)
  


       // cy.intercept('GET', /\/modular_system\/pdf/).as('postpdf');
      //  cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true })
      //  cy.wait(15000)
      // cy.window().its('length').should('be.gt', 1);
 

  })

})
