context('Blauberg', () => {
  before( () => {
    Cypress.session.clearAllSavedSessions();
  })
    beforeEach(() => {
      cy.visit('https://..../cooler_freon')
  })

  it('calculate_button', () => {
    cy.get('#manual_selection').click({ force: true })
    cy.get('#seasons').select('both', { force: true });
    cy.get('#airflow').clear().type('200');
    cy.get('#model').select('OKF-400x200-3', { force: true });
    cy.get('#summer_on_temperature').clear().type('30');
    cy.get('#summer_on_relative_humidity').clear().type('40');
    cy.get('#summer_off_temperature').clear().type('24');
    cy.get('#winter_on_temperature').clear().type('-10');
    cy.get('#winter_on_relative_humidity').clear().type('90');
    cy.get('#winter_off_temperature').clear().type('10');     
     
    cy.get('#manual_calculate-submit').click({ force: true });
    cy.wait(1000);

    cy.url().then(($url) => {
      if ($url.includes('blauberg')) {
        cy.get('.product-title').contains('KFK 40x20-3'); 
     }
      else
     {
      cy.get('.product-title').should('include.text', 'OKF 400x200-3');
        }
      })

    cy.get('#calculation_summer_airflow').should('have.text', '200');
    cy.get('#calculation_summer_on_temperature').should('have.text', '30');
    cy.get('#calculation_summer_off_temperature').should('have.text', '24');
    cy.get('#calculation_summer_evaporation_temperature').should('have.text', '5');
    cy.get('#calculation_summer_superheat').should('have.text', '2.5');
    cy.get('#calculation_summer_condensation_temperature').should('have.text', '45');
    cy.get('#calculation_summer_subcool').should('have.text', '2.5');
    cy.get('#calculation_summer_on_relative_humidity').should('have.text', '40');
    cy.get('#calculation_summer_relative_humidity_output').should('have.text', '49.5');
    cy.get('#calculation_summer_required_power').should('have.text', '0.6');
   // cy.get('#calculation_summer_maximum_power').should('have.text', '2');
    cy.get('#calculation_summer_mass_freon_flow_rate').should('have.text', '15');
    cy.get('#calculation_summer_hydraulic_resistance').should('have.text', '0');
    cy.get('#calculation_summer_air_pressure_drop').should('have.text', '9');
    cy.get('#calculation_summer_face_air_velocity').should('have.text', '0.7');
    cy.get('#calculation_summer_condensation').should('have.text', '-0.3');
    cy.get('#calculation_winter_airflow').should('have.text', '200');
    cy.get('#calculation_winter_on_temperature').should('have.text', '-10');
    cy.get('#calculation_winter_off_temperature').should('have.text', '10');
    cy.get('#calculation_winter_evaporation_temperature').should('have.text', '5');
    cy.get('#calculation_winter_superheat').should('have.text', '2.5');
    cy.get('#calculation_winter_condensation_temperature').should('have.text', '45');
    cy.get('#calculation_winter_subcool').should('have.text', '2.5');
    cy.get('#calculation_winter_on_relative_humidity').should('have.text', '90');
    cy.get('#calculation_winter_relative_humidity_output').should('have.text', '18.9');
    cy.get('#calculation_winter_required_power').should('have.text', '1.4');
   // cy.get('#calculation_winter_maximum_power').should('have.text', '3.3');
    cy.get('#calculation_winter_mass_freon_flow_rate').should('have.text', '25.9');
    cy.get('#calculation_winter_hydraulic_resistance').should('have.text', '0.1');
    cy.get('#calculation_winter_air_pressure_drop').should('have.text', '9');
    cy.get('#calculation_winter_face_air_velocity').should('have.text', '0.7');
    cy.get('#calculation_winter_condensation').should('have.text', '0');
    cy.get('#calculation_summer_refrigerating_agent').should('have.text', 'R410A');

    cy.get('[data-cy=dimensions]').should('be.visible')
    

    cy.checkBasic();
  })
})
