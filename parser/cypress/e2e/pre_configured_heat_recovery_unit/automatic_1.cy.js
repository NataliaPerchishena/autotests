context('Blauberg', () => {
  before(() => {
    // Cypress.session.clearAllSavedSessions();
  })
  beforeEach(() => {
    let Url = Cypress.env('baubUrl');
    cy.login(Url);
    cy.visit(Url + '/pre_configured_heat_recovery_unit');

  })


  it('automatic_selection_heater', () => {
    cy.get('#select2-supply_heater-container').click();
    const heater = ['not.exist', 'exist', 'exist'];
    const water_heater = ['not.exist', 'not.exist', 'exist'];
    let i = 0;

    cy.get('#supply_heater option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then((val) => {
        cy.get('#supply_heater').select(val, { force: true });
        cy.log(val);
        cy.get('#select2-supply_heater-container').contains(val, { matchCase: false });
      });
      cy.get('#automatic_calculate-submit').click({ force: true });
      cy.wait(1000);
      cy.checkTitle();

      cy.get('#results-data').find('h4')
        .contains('Heater')
        .should(heater[i])
      //  .then(() => {
      if (heater[i] === 'exist') {
        cy.log(water_heater[i]);
        cy.get('#results-data').find('h4')
        .contains('Heater')
          .parents('div')
          .next('div')
          .find('#heater_water_in_value')
          .should(water_heater[i]);
      }
      //    });
      i++;
    });
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
    cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
      
  });





  it('automatic_selection_recovery_unit_type_inst_type_horizontal', () => {
    cy.get('#inst_type_horizontal').click({ force: true })
    cy.get('#pre_configured_heat_recovery_unit_type').click()
    cy.get('#type option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then(val => {
        cy.get('#type').select(val, { force: true })
        cy.log(val)
        cy.get('#select2-type-container').contains(val, { matchCase: false })
      })
      cy.get('#automatic_calculate-submit').click({ force: true })
      cy.wait(1000);
      cy.checkTitle();
    });
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
    cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
  })

  it('automatic_selection_inst_type_recovery_unit_type_plate', () => {
    cy.get('#select2-type-container').click()
    cy.get('#type').select('counterflow', { force: true })
    const istall_type = ['#inst_type_ceiling', '#inst_type_horizontal'];
    cy.wrap(istall_type).each((istall_type) => {
      cy.log(istall_type)
      cy.get(istall_type).check({ force: true })
      cy.get('#automatic_calculate-submit').click({ force: true })
      cy.wait(1000);
      cy.checkTitle();
    })
    cy.intercept('pdf').as('postspdf');
    cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
    cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
  })

//check form - list of type for ceiling, for horizontal
  

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });
    cy.checkTitle();
    cy.checkImage();
    cy.checkSaveAsAfterAuth();
    cy.checkPdf200()
    
  })

})



