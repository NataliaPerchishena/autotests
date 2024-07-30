context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      let Url = Cypress.env('baseUrl');
    //  cy.login(Url);
      cy.visit(Url+'/smoke_fan')
  })

  it('manual_selection_400x400-2__return_spring_single_louvre', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_smoke_dampers').click({ force: true });
    cy.get('#number_of_flanges').select('2', { force: true });
    cy.get('#width').select('400', { force: true });
    cy.get('#height').select('400', { force: true });    
    cy.get('#actuator_type').select('nenutec_return_spring', { force: true});
    cy.get('#type').select('single_louvre', { force: true});
    
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1500);
  
    cy.get('[data-cy=title]').should('includes.text', 'Smoke damper KPD-400x400-2-PNP230-O');
    cy.get('.table-responsive').should('be.visible');
    cy.get('.selector-calculations').contains('Number of flanges').next().should('contain', '2');
    cy.get('.selector-calculations').contains('Actuator type').next().should('contain', 'NENUTEC with a return spring', { matchCase: false });
    cy.get('.selector-dimensions').contains('B', { matchCase: false }).next().next().should('contain', '400');
    cy.get('.selector-dimensions').contains('H', { matchCase: false }).next().next().should('contain', '400');
    cy.get('.selector-dimensions').contains('B1', { matchCase: false }).next().next().should('contain', '420');
    cy.get('.selector-dimensions').contains('B2', { matchCase: false }).next().next().should('contain', '440');
    cy.get('.selector-dimensions').contains('H1', { matchCase: false }).next().next().should('contain', '420');
    cy.get('.selector-dimensions').contains('H2', { matchCase: false }).next().next().should('contain', '440');
    cy.get('.selector-dimensions').contains('L').next().next().should('contain', '410');

    cy.checkBasic();
  })

  it('manual_selection_700x800-1_two_position_multi_louvre_actuator', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#ctg_series_smoke_dampers').click({ force: true });
    cy.get('#number_of_flanges').select('1', { force: true });
    cy.get('#width').select('700', { force: true });
    cy.get('#height').select('800', { force: true });    
    cy.get('#actuator_type').select('siemens_two_position', { force: true});
    cy.get('#type').select('multi_louvre', { force: true});
    cy.get('#actuator_placement').select('inside', { force: true});
        
    
    cy.get('#manual_calculate-submit').click({ force: true })
    cy.wait(1500);
  
    cy.get('[data-cy=title]').should('includes.text', 'Smoke damper KPDU-700x800-1-PS230-I');
    cy.get('.table-responsive').should('be.visible');
    cy.get('.selector-calculations').contains('Number of flanges').next().should('contain', '1');
    cy.get('.selector-calculations').contains('Actuator type').next().should('contain', 'SIEMENS two-position (opened/closed)', { matchCase: false });
    cy.get('.selector-calculations').contains('Type').next().should('contain', 'Multi-louvre', { matchCase: false });
    cy.get('.selector-dimensions').contains('B', { matchCase: false }).next().next().should('contain', '700');
    cy.get('.selector-dimensions').contains('H', { matchCase: false }).next().next().should('contain', '800');
    cy.get('.selector-dimensions').contains('B1', { matchCase: false }).next().next().should('contain', '730');
    cy.get('.selector-dimensions').contains('B2', { matchCase: false }).next().next().should('contain', '760');
    cy.get('.selector-dimensions').contains('H1', { matchCase: false }).next().next().should('contain', '830');
    cy.get('.selector-dimensions').contains('H2', { matchCase: false }).next().next().should('contain', '860');
    cy.get('.selector-dimensions').contains('L').next().next().should('contain', '350');

    cy.checkBasic();
  })
})