context('Vents', () => {
  before(() => {
    // Cypress.session.clearAllSavedSessions();
  })
  beforeEach(() => {
    let Url = Cypress.env('baseUrl');
    cy.login(Url);
    cy.visit(Url + '/pre_configured_heat_recovery_unit');

  })

//check list of heater
  it('automatic_selection_heater', () => {
    cy.get('#select2-supply_heater-container').click();
    const heater = ['no', 'electric', 'water'];
    let i = 0
    cy.get('#supply_heater option').each(($el) => {
      cy.get($el).invoke('attr', 'value').should('eq', heater[i]).then((val) => {

        cy.get('#supply_heater').select(val, { force: true });
        cy.log(val);
        cy.get('#select2-supply_heater-container').contains(val, { matchCase: false });
        
      })
      
      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('eq', 200)
      i++
    });
    
  });


//check list of seasons
  it.only('automatic_selection_seasons', () => {
    cy.get('#select2-seasons-container').click()
    const seasons = ['both', 'summer', 'winter'];
    let i = 0
    cy.get('#seasons option').each(($el) => {
      cy.get($el).invoke('attr', 'value').should('eq', seasons[i]).then(val => {
        cy.log(val)
        cy.get('#seasons').select(val, { force: true })
        cy.get('#select2-seasons-container').contains(val, { matchCase: false })
      })
      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      i++
    });

  })

//check - list of fans
it('automatic_selection_fans', () => {
  cy.get('#select2-fan-container').click()
  const fan = ['ec', 'ec_fanwall'];
  let i = 0
  cy.get('#fan option').each(($el) => {

    cy.get($el).invoke('attr', 'value').should('eq', fan[i]).then(val => {
      cy.log(val)
      cy.get('#fan').select(val, { force: true })
    //  cy.get('#select2-fan-container').contains(val, { matchCase: false })
    })
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.checkTitle();
    i++
  });

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
  })

//check form - list of type for ceiling, for horizontal
  it('automatic_selection_rotary_hygroscopic', () => {
    cy.get('#select2-recovery_type-container').click()
    cy.get('#recovery_type').select('rotary', { force: true })
    cy.get('#select2-recovery_type-container').contains('rotary', { matchCase: false })
    cy.get('#rotary_heatex_hygroscopic').check({ force: true })
    cy.get('#automatic_calculate-submit').click({ force: true })
    cy.wait(1000);
    cy.checkTitle();
  })


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
  })


  it('automatic_selection', () => {
    cy.get('#automatic_calculate-submit').click({ force: true });
    cy.checkBasicAfterAuth();
  })

})



