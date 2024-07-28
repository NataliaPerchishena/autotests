context('Vents', () => {
  before(() => {
    // Cypress.session.clearAllSavedSessions();
  // Cypress.session.clearCurrentSessionData()
  })
  beforeEach(() => {
   
    let Url = Cypress.env('baseUrl');

    cy.login(Url);
    cy.visit(Url + '/nrvu_bvu');

  })


  it('temperature_air_cooler_water', () => {
    const temp_true = ['-60', '60']
    const temp_true_after = ['12', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_cooler_water_temperature_before', '#supply_cooler_water_temperature_after']

    cy.get('#supply_heater').select('no', { force: true })
    cy.get('#supply_cooler').select('water', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_cooler_water_temperature_before') {        
        cy.get('select[id=supply_cooler_water_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before water cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_water_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true_after).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after cooling');
        })
      }
    })  
  })

  it('temperature_cooler_water', () => {

    const true_temp = [
      { int: '2', out: '4' },
      { int: '15', out: '25' }]

    const false_temp = [
      { int: '1.9', out: '3.9' },
      { int: '15.1', out: '25.1' },
      { int: '1', out: '3' },
      { int: '16', out: '26' }]

    const in_out_limit_temp = [
      { int: '15', out: '16.9' },
      { int: '4', out: '4' },
      { int: '4', out: '5.9' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler').select('water', { force: true })
      cy.get('#supply_cooler_water_temperature_in').clear().type($el.int);
      cy.get('#supply_cooler_water_temperature_out').clear().type($el.out);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

    cy.get('#supply_cooler').select('water', { force: true })
    cy.get('#supply_cooler_water_temperature_after').clear().type('14');
    cy.get('#supply_cooler_water_temperature_in').clear().type('5');
    cy.get('#block_supply_cooler').click({ force: true })
    cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
    cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    cy.get('#supply_cooler').select('water', { force: true })
    cy.get('#supply_cooler_water_temperature_in').clear().type('14');
    cy.get('#supply_cooler_water_temperature_after').clear().type('9');
    cy.get('#block_supply_cooler').click({ force: true })
    cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
    cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');

  })

  it('temperature_air_cooler_water_for_heating', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_w = ['#supply_cooler_for_heating_water_temperature_before', '#supply_cooler_for_heating_water_temperature_after']

    cy.get('#supply_cooler').select('water', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })
    cy.wrap(id_heater_w).each(($el) => {
      if ($el === '#supply_cooler_for_heating_water_temperature_before') {
        cy.get('select[id=supply_cooler_for_heating_water_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_for_heating_water_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after cooler');
        })
      }
    })
  })

  it('temperature_cooler_water_for_heating', () => {
    cy.get('#supply_cooler').select('water', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })

    const true_temp = [
      { int: '7', out: '2' },
      { int: '130', out: '125' }]

    const false_temp = [
      { int: '6.9', out: '1.9' },
      { int: '130.9', out: '125.9' },
      { int: '6', out: '1' },
      { int: '131', out: '126' }]

    const in_out_limit_temp = [
      { int: '15', out: '10.1' },
      { int: '120', out: '125' },
      { int: '130', out: '125.1' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_cooler_for_heating_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_for_heating_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler_for_heating').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_cooler_for_heating_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_for_heating_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler_for_heating').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler_for_heating_water_temperature_out').clear().type($el.out);
      cy.get('#supply_cooler_for_heating_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_cooler_for_heating').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

  it('temperature_air_cooler_freon', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_cooler_freon_temperature_before', '#supply_cooler_freon_temperature_after']

    cy.get('#supply_heater').select('no', { force: true })
    cy.get('#supply_cooler').select('freon', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_cooler_freon_temperature_before') {        
        cy.get('select[id=supply_cooler_freon_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before DX cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_freon_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after DX cooler');
        })
      }
    })  
  })

  it('temperature_cooler_freon', () => {

    const true_temp = [
      { evaporation: '-10', condensation: '15', superheat: '2', subcool: '2' },
      { evaporation: '15', condensation: '60', superheat: '50', subcool: '50' }]

    const false_temp = [
      { evaporation: '-10.1', condensation: '14.9', superheat: '1.9', subcool: '1.9' },
      { evaporation: '15.1', condensation: '60.1', superheat: '50.1', subcool: '50.1' },
      { evaporation: '-11', condensation: '14', superheat: '1', subcool: '1' },
      { evaporation: '16', condensation: '61', superheat: '51', subcool: '51' }]

    const in_out_limit_temp = [
      { evaporation: '15', condensation: '15', superheat: '2', subcool: '2' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_cooler').select('freon', { force: true })
      cy.get('#supply_cooler_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_cooler').select('freon', { force: true })
      cy.get('#supply_cooler_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_cooler').select('freon', { force: true })
      cy.get('#supply_cooler_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

  it('temperature_air_cooler_freon_for_heating', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_w = ['#supply_cooler_for_heating_freon_temperature_before', '#supply_cooler_for_heating_freon_temperature_after']

    cy.get('#supply_cooler').select('freon', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })
    cy.wrap(id_heater_w).each(($el) => {
      if ($el === '#supply_cooler_for_heating_freon_temperature_before') {
        cy.get('select[id=supply_cooler_for_heating_freon_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before cooler');
        })
      }
      else {
        cy.get('select[id=supply_cooler_for_heating_freon_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_cooler_for_heating').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after cooler');
        })
      }
    })
  })

  it('temperature_cooler_freon_for_heating', () => {
    cy.get('#supply_cooler').select('freon', { force: true })
    cy.get('#supply_cooler_for_heating').check({ force: true })

    const true_temp = [
      { evaporation: '-10', condensation: '15', superheat: '2', subcool: '2' },
      { evaporation: '15', condensation: '60', superheat: '50', subcool: '50' }]

    const false_temp = [
      { evaporation: '-10.1', condensation: '14.9', superheat: '1.9', subcool: '1.9' },
      { evaporation: '15.1', condensation: '60.1', superheat: '50.1', subcool: '50.1' },
      { evaporation: '-11', condensation: '14', superheat: '1', subcool: '1' },
      { evaporation: '16', condensation: '61', superheat: '51', subcool: '51' }]

    const in_out_limit_temp = [
      { evaporation: '15', condensation: '15', superheat: '2', subcool: '2' }]

    cy.wrap(true_temp).each(($el) => {

      cy.get('#supply_cooler_for_heating_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_for_heating_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_for_heating_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_for_heating_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {

      cy.get('#supply_cooler_for_heating_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_for_heating_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_for_heating_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_for_heating_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {

      cy.get('#supply_cooler_for_heating_freon_evaporation_temperature').clear().type($el.evaporation);
      cy.get('#supply_cooler_for_heating_freon_condensation_temperature').clear().type($el.condensation);
      cy.get('#supply_cooler_for_heating_freon_superheat').clear().type($el.superheat);
      cy.get('#supply_cooler_for_heating_freon_subcool').clear().type($el.subcool);
      cy.get('#block_supply_cooler').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

  // const pages=[]

  // pages.forEach((page)=>{
  //   cy.visit(page);
  //   ///
  // })




})