context('Blauberg', () => {
  before(() => {
     Cypress.session.clearAllSavedSessions();
    Cypress.session.clearCurrentSessionData()
  })
  beforeEach(() => {
    //Cypress.session.clearAllSavedSessions();
    let Url = Cypress.env('baseUrl');
    
     cy.login(Url);
     cy.visit(Url + '/nrvu_bvu');

  })

  //pre-heater
  it('automatic_selection_pre_heater', () => {
  
    cy.get('#select2-supply_pre_heater-container').click()
    var pre_heater = ['not.exist', 'exist', 'exist']
    var i = 0;
    cy.get('#supply_pre_heater option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then(val => {
        cy.get('#supply_pre_heater').select(val, { force: true })
        cy.log(val)
        cy.get('#select2-supply_pre_heater-container').contains(val, { matchCase: false })
      })
      cy.get('#automatic_calculate-submit').click({ force: true })
      cy.wait(3000);
      cy.checkTitle();
      cy.get('#results-data').contains('Pre-heater').should(pre_heater[i])
      i++;
    });
    cy.checkPdf();
  })

//main heater
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

      cy.get('#results-data')
        .contains('Main heater')
        .should(heater[i])
      //  .then(() => {
      if (heater[i] === 'exist') {
        cy.log(water_heater[i]);
        cy.get('#results-data')
          .contains('Main heater')
          .parents('div')
          .next('div')
          .find('#calculation_heater_water_in')
          .should(water_heater[i]);
      }
      //    });
      i++;
    });
    cy.checkPdf();
  });


  //seasons
 it('automatic_selection_seasons', () => {
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
    cy.checkPdf();
  })


//type
  it('automatic_selection_recovery_type', () => {
    cy.get('#select2-recovery_type-container').click()
    cy.get('#recovery_type option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then(val => {
        cy.get('#recovery_type').select(val, { force: true })
        cy.log(val)
        cy.get('#select2-recovery_type-container').contains(val, { matchCase: false })
      })
      cy.get('#automatic_calculate-submit').click({ force: true })
      cy.wait(1000);
      cy.checkTitle();
    });
    cy.checkPdf();
  })

//rotary hygro
  it('automatic_selection_rotary_hygroscopic', () => {
    cy.get('#select2-recovery_type-container').click()
    cy.get('#recovery_type').select('rotary', { force: true })
    cy.get('#select2-recovery_type-container').contains('rotary', { matchCase: false })
    cy.get('#rotary_heatex_hygroscopic').check({ force: true })
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1000);
    cy.checkTitle();
  })

//install type ceiling, vertical, horizontal
  it('automatic_selection_recovery_type_and_install_type', () => {
    //var i = 0;
    cy.get('#select2-recovery_type-container').click()
    cy.get('#recovery_type option').each(($el) => {
      cy.get($el).invoke('attr', 'value').then(val => {
        cy.get('#recovery_type').select(val, { force: true })
        cy.log(val)
        cy.get('#select2-recovery_type-container').contains(val, { matchCase: false })
      })
      const istall_type = ['#inst_type_ceiling', '#inst_type_vertical', '#inst_type_horizontal'];
      cy.wrap(istall_type).each((istall_type) => {
        cy.log(istall_type)
        cy.get(istall_type).check({ force: true })
        cy.get('#automatic_calculate-submit').click({ force: true })
        cy.wait(1000);
        cy.checkTitle();
      })
      //i++;
    });
    cy.checkPdf();
  })

//   it.only('automatic_selection_app_code', () => {
//       cy.get('#automatic_calculate-submit').click({ force: true })
//       cy.wait(1000);
//       cy.checkTitle();
      
// //app_code
// cy.get('#app_code_container').should('be.visible').find('h5').should('exist').children('span').should('have.length', 21).should("not.be.empty");

//   })
  

  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });
    cy.checkBasicAfterAuth();
  })

})