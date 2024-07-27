context('Blauberg', () => {
  before( () => {
  // Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');
      cy.login(Url);
      cy.wait(1000)
      cy.visit(Url+'/modular_system');
    
  })

  it('automatic_selection', () => {
   cy.get('#automatic_calculate-submit').click({ force: true });
  //  cy.wait(1000);
  //cy.get('#manual_selection').click({ force: true })
  // cy.get('#select2-type-container').click() 
  // cy.get('#type').select('crossflow', { force: true })
  // cy.get('#select2-seasons-container').click()
  // cy.get('#seasons').select('summer', {force: true})
  // cy.get('#tabular_select_unit_size').find('input[value="BLQ09"]').check()

     cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
       cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)

      cy.get('#front_projection_drawing').should('be.visible');
      cy.checkBasicAfterAuth();
  })

//check list of heater and not 500
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


//check list of seasons and not 500
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
const fan = ['ac', 'ec', 'ec_fanwall'];
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


})
