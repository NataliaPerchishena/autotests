context('Vents', () => {
  before(() => {
    // Cypress.session.clearAllSavedSessions();
  })
  beforeEach(() => {
    let Url = Cypress.env('ventsUrl');
    cy.login(Url);
    cy.visit(Url + '/pre_configured_heat_recovery_unit');

  })


  it('automatic_selection_heater', () => {
    cy.get('#inst_type_horizontal').click({ force: true })
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
cy.checkBasicAfterAuth()
  });


  
 it('automatic_selection_seasons', () => {
  cy.get('#inst_type_horizontal').click({ force: true })
     cy.get('#select2-seasons-container').click()     
     cy.get('#seasons option').each(($el) => {
      
    cy.get($el).invoke('attr','value').then(val => {
      cy.log(val)
      cy.get('#seasons').select(val, {force: true})
     cy.get('#select2-seasons-container').contains(val, {matchCase: false})
     })
    cy.get('#automatic_calculate-submit').click({ force: true })
      cy.wait(1000);
    cy.checkTitle();

    });
  
    cy.checkPdf()
  })


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
   //pdf
   cy.intercept('pdf').as('postspdf');
   cy.get('[data-cy=pdf]').first().invoke('attr', 'target', '_self').click({ force: true }).wait(1000)
   cy.wait('@postspdf').its('response.statusCode').should('eq', 200)
  })

  it('automatic_selection_inst_type_recovery_unit_type_plate', () => {
    cy.get('#select2-type-container').click()
    cy.get('#type').select('counterflow', { force: true })
    const istall_type = ['#inst_type_ceiling', '#inst_type_horizontal','#inst_type_vertical'];
    cy.wrap(istall_type).each((istall_type) => {
      cy.log(istall_type)
      cy.get(istall_type).check({ force: true })
      cy.get('#automatic_calculate-submit').click({ force: true })
      cy.wait(1000);
      cy.checkTitle();
    })
    cy.checkPdf()
  })

//check form - list of type for ceiling, for horizontal
  

//check installation_configuration_ for horizontal (plate, rotory)
  it('automatic_selection_recovery_type_and_install_type', () => {
    //var i = 0;
    cy.get('#inst_type_horizontal').click({ force: true })
    cy.get('#pre_configured_heat_recovery_unit_type').click()
    cy.get('#type option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then(val => {
        cy.get('#type').select(val, { force: true })
        cy.log(val)
        cy.get('#select2-type-container').contains(val, { matchCase: false })
      })

      cy.get('#installation_configuration div.cc-selector').children('div').each((istall_type) => {
        cy.get(istall_type).children('input').check({ force: true })
        cy.get('#automatic_calculate-submit').click({ force: true })
        cy.wait(1000);
        cy.checkTitle();
      })
      //i++;
    });
    cy.checkPdf()
  })


  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });
    cy.checkBasicAfterAuth();
  })

})



