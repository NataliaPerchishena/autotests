context('Blauberg', () => {
    beforeEach(() => {
      cy.visit('cooler_water')
    })    
    
    it('calculate_button', () => {
      cy.contains('Manual selection').should('not.be.disabled').click({ force: true });
      cy.get('#seasons').select('both', { force: true });
      cy.get('#airflow').clear().type('200');
      cy.get('#model').select('OKW-400x200-3', { force: true });
      cy.get('#summer_on_temperature').clear().type('30');
      cy.get('#summer_on_relative_humidity').clear().type('40');
      cy.get('#summer_off_temperature').clear().type('24');
      cy.get('#summer_water_in').clear().type('7');
      cy.get('#summer_water_out').clear().type('12');
      cy.get('#winter_on_temperature').clear().type('-10');
      cy.get('#winter_on_relative_humidity').clear().type('90');
      cy.get('#winter_off_temperature').clear().type('10');
      cy.get('#winter_water_in').clear().type('60');
      cy.get('#winter_water_out').clear().type('30');

      cy.get('#manual_calculate-submit').click({ force: true });
      cy.wait(1000);
      
      cy.get('#calculation_summer_airflow').should('have.text', '200');
      cy.get('#calculation_winter_airflow').should('have.text', '200');
      cy.get('#calculation_summer_on_temperature').should('have.text', '30');
      cy.get('#calculation_winter_on_temperature').should('have.text', '-10');
      cy.get('#calculation_summer_off_temperature').should('have.text', '24');
      cy.get('#calculation_winter_off_temperature').should('have.text', '10');
      cy.get('#calculation_summer_water_in').should('have.text', '7');
      cy.get('#calculation_winter_water_in').should('have.text', '60');
      cy.get('#calculation_summer_water_out').should('have.text', '12');
      cy.get('#calculation_winter_water_out').should('have.text', '30');
      cy.get('#calculation_summer_on_relative_humidity').should('have.text', '40');
      cy.get('#calculation_winter_on_relative_humidity').should('have.text', '90');
      cy.get('#calculation_summer_off_relative_humidity').should('have.text', '50.08');
      cy.get('#calculation_winter_off_relative_humidity').should('have.text', '18.87');
      cy.get('#calculation_summer_glycol').should('have.text', '0');
      cy.get('#calculation_winter_glycol').should('have.text', '0');
      cy.get('#calculation_summer_required_cooling_power').should('have.text', '0.62');
      cy.get('#calculation_winter_required_cooling_power').should('have.text', '1.37');
      cy.get('#calculation_summer_maximum_cooling_power').should('have.text', '2.21');
      cy.get('#calculation_winter_maximum_cooling_power').should('have.text', '3.1');
      cy.get('#calculation_summer_condensation').should('have.text', '-0.28');
      cy.get('#calculation_winter_condensation').should('have.text', '0');
      cy.get('#calculation_summer_water_flow').should('have.text', '0.03');
      cy.get('#calculation_winter_water_flow').should('have.text', '0.01');
      cy.get('#calculation_summer_water_pressure_drop').should('have.text', '0.19');
      cy.get('#calculation_winter_water_pressure_drop').should('have.text', '0.03');
      cy.get('#calculation_summer_air_pressure_drop').should('have.text', '8.91');
      cy.get('#calculation_winter_air_pressure_drop').should('have.text', '8.91');
      cy.get('#calculation_summer_face_air_velocity').should('have.text', '0.69');
      cy.get('#calculation_winter_face_air_velocity').should('have.text', '0.69');

      cy.checkBasic()
    })
  })
  