context('Blauberg', () => {
    before(() => {
        // Cypress.session.clearAllSavedSessions();
    })
    beforeEach(() => {
        let Url = Cypress.env('baubUrl');
        cy.login(Url);
        cy.visit(Url + '/modular_system');

    })
    //check list of service_side
    it('service_side_list', () => {
        
            cy.get('#select2-service_side-container').click()

            var i = 0
            var service_side = ['left', 'right']
            cy.get('#service_side option').each(($el) => {
                cy.get($el).invoke('attr', 'value').should('be.a', 'string').and('eq', service_side[i], { matchCase: false });
                i++
        
        })
    })


    //check service side in report 
    it('automatic_selection_service_side', () => {
   // cy.get('#modular_system_type').click()
    cy.get('#modular_system_type option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then(val => {
        cy.get('#type').select(val, { force: true })
        cy.log(val)
        cy.get('#select2-type-container').contains(val, { matchCase: false })

            cy.get('#select2-service_side-container').click()
            cy.get('#service_side option').each(($el) => {
                cy.get($el).invoke('attr', 'value').then(val => {
                    cy.get('#service_side').select(val, { force: true })
                    cy.log(val)
                    cy.get('#select2-service_side-container').contains(val, { matchCase: false })

                    cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000);
                    cy.get('#casing-table').should('be.visible').should("not.be.empty").
                        find('tbody').children('tr').eq(6).find('td').eq(1).contains(val, { matchCase: false })
                })
            })
        })
    })
    })

    it('automatic_selection', () => {
        cy.get('#automatic_calculate-submit').click({ force: true });
        cy.checkTitle();
        cy.checkImage();
        cy.checkSaveAsAfterAuth();
        cy.checkPdf200()

    })

}) 