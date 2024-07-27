context('Blauberg', () => {
  before( () => {
  // Cypress.session.clearAllSavedSessions();
 //  Cypress.session.clearCurrentSessionData()

  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');

      cy.login(Url);
      cy.visit(Url+'/nrvu_bvu')
  })

  it('manual_selection_eh_cdx_AV02_CFP_2500', () => {
     cy.get('#manual_selection').click({ force: true })


    cy.fixture('manual12_eh_cdx_AV02_CFP_2500.json').then((elements) => {

      cy.fillForm(elements)
      cy.get('#supply_cooler_for_heating').click({ force: true });

      cy.get('#manual_calculate-submit').click({ force: true }).then(() => {
        cy.wait(1000);

        cy.get('[data-cy=title]').should('include.text', '02 CFP 2500');

       // cy.checkReportErrorLog(elements)
        cy.checkReportErrorFail(elements)
      });
      cy.get('#fans_sound_power_extract tbody').children('tr').should('have.length', 6).should("not.be.empty").should('be.visible')
      cy.get('#fans_sound_power_supply tbody').children('tr').should('have.length', 6).should("not.be.empty").should('be.visible')
    });
    cy.checkBasicAfterAuth();
})
})

