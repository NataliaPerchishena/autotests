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

  it('temperature_air_main', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_el = ['#summer_temperature_supply', '#summer_temperature_extract', '#winter_temperature_supply', '#winter_temperature_extract']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.get('#supply_heater').select('no', { force: true })
    cy.wrap(id_el).each(($el) => {
          cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
      })
      cy.wrap(id_el).each(($el) => {
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          if($el === '#summer_temperature_supply'|| $el === '#summer_temperature_extract') {
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in')
            .and('contain.text', 'Temperature SUMMER');
          } else {
            cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in')
            .and('contain.text', 'Temperature WINTER');
          }
        })  
        cy.get($el).clear().type('10');    
    })
  })

  it('temperature_air_heater_electric', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_heater_electric_temperature_before', '#supply_heater_electric_temperature_after']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_heater_electric_temperature_before') {
        cy.get('#supply_heater').select('electric', { force: true })
        cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before main heater');
        })
      }
      else {
        cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after heater');
        })
      }
    })
  })

  it('temperature_air_heater_water', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_w = ['#supply_heater_water_temperature_before', '#supply_heater_water_temperature_after']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_w).each(($el) => {
      if ($el === '#supply_heater_water_temperature_before') {
        cy.get('#supply_heater').select('water', { force: true })
        cy.get('select[id=supply_heater_water_temperature_settings_mode]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before heater');
        })
      }
      else {
        cy.get('select[id=supply_heater_water_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after heater');
        })
      }
    })
  })
   
  it('temperature_heater_water', () => {
    cy.get('#select2-supply_heater-container').click()

    const true_temp = [
      { int: '7', out: '2' },
      { int: '130', out: '125' }]

    const false_temp = [
      { int: '6.9', out: '1.9' },
      { int: '130.9', out: '125.9' },
      { int: '6', out: '1' },
      { int: '131', out: '126' }]

    const in_out_limit_temp = [
      { int: '10', out: '5.1' },
      { int: '120', out: '125' },
      { int: '130', out: '125.1' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_heater').select('water', { force: true })
      cy.get('#supply_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_heater').select('water', { force: true })
      cy.get('#supply_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })

    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_heater').select('water', { force: true })
      cy.get('#supply_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })
  })

  it('temperature_air_pre_heater_electric', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_pre_heater_electric_temperature_after_nrvu_bvu_pre_heater']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
   //   if ($el === '#supply_heater_electric_temperature_before') {
        cy.get('#supply_pre_heater').select('electric', { force: true })
   //     cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('manual', { force: true })
        // cy.wrap(temp_true).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
        //   cy.intercept('calculate').as('postcalc');
        //   cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
        //   cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        // })
        // cy.wrap(temp_false).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
        //   cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
        //     and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before heater');
        // })
   //   }
     // else {
        // cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_pre_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after pre-heater');
        })
   //   }
    })
  })

  it('temperature_air_pre_heater_water', () => {
    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_pre_heater_water_temperature_after_nrvu_bvu_pre_heater']

    cy.get('#supply_cooler').select('no', { force: true })
    cy.wrap(id_heater_el).each(($el) => {
   //   if ($el === '#supply_heater_electric_temperature_before') {
        cy.get('#supply_pre_heater').select('water', { force: true })
   //     cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('manual', { force: true })
        // cy.wrap(temp_true).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
        //   cy.intercept('calculate').as('postcalc');
        //   cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
        //   cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        // })
        // cy.wrap(temp_false).each(($temp) => {
        //   cy.get($el).clear().type($temp);
        //   cy.get('#block_supply_pre_heater').click({ force: true })
        //   cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
        //   cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
        //     and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before heater');
        // })
   //   }
     // else {
        // cy.get('select[id=supply_heater_electric_temperature_settings_mode]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_pre_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after pre-heater');
        })
   //   }
    })
  })

  it('temperature_pre_heater_water', () => {
    cy.get('#select2-supply_pre_heater-container').click()

    const true_temp = [
      { int: '7', out: '2' },
      { int: '130', out: '125' }]


    const false_temp = [
      { int: '6.9', out: '1.9' },
      { int: '130.9', out: '125.9' },
      { int: '6', out: '1' },
      { int: '131', out: '126' }]

    const in_out_limit_temp = [
      { int: '10', out: '5.1' },
      { int: '120', out: '125' },
      { int: '130', out: '125.1' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('#supply_pre_heater').select('water', { force: true })
      cy.get('#supply_pre_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_pre_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_pre_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      cy.checkTitle();
    })

    cy.wrap(false_temp).each(($el) => {
      cy.get('#supply_pre_heater').select('water', { force: true })
      cy.get('#supply_pre_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_pre_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_pre_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('#supply_pre_heater').select('water', { force: true })
      cy.get('#supply_pre_heater_water_temperature_out').clear().type($el.out);
      cy.get('#supply_pre_heater_water_temperature_in').clear().type($el.int);
      cy.get('#block_supply_pre_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

  it('temperature_air_post_heater_electric', () => {
    cy.get('#supply_post_heater').check({ force: true })
    cy.get('select[id="supply_post_heater_on_type"]').select('electric', { force: true })

    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_post_heater_on_temperature_before', '#supply_post_heater_on_temperature_after']

    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_post_heater_on_temperature_before') {
      
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before post-heater');
        })
      }
      else {
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after post-heater');
        })
      }
    })
  })

  it('temperature_air_post_heater_water', () => {
    cy.get('#supply_post_heater').check({ force: true })
    cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })

    const temp_true = ['-60', '60']
    const temp_false = ['-60.1', '-61', '60.1', '61']

    const id_heater_el = ['#supply_post_heater_on_temperature_before', '#supply_post_heater_on_temperature_after']

    cy.wrap(id_heater_el).each(($el) => {
      if ($el === '#supply_post_heater_on_temperature_before') {
      
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('manual', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature before post-heater');
        })
      }
      else {
        cy.get('select[id="supply_post_heater_on_temperature_settings_mode"]').select('automatic', { force: true })
        cy.wrap(temp_true).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')
          cy.intercept('calculate').as('postcalc');
          cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
          cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
        })
        cy.wrap(temp_false).each(($temp) => {
          cy.get($el).clear().type($temp);
          cy.get('#block_supply_post_heater').click({ force: true })
          cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
          cy.get('#form-errors').should('not.be.empty').find('li').should('exist').
            and('contain.text', 'temperature must be in').and('contain.text', 'Temperature after post-heater');
        })
      }
    })
  })

  it('temperature_post_heater_water', () => {
    cy.get('#supply_post_heater').check({ force: true })


    const true_temp = [
      { int: '7', out: '2' },
      { int: '130', out: '125' }]

    const false_temp = [
      { int: '6.9', out: '1.9' },
      { int: '130.9', out: '125.9' },
      { int: '6', out: '1' },
      { int: '131', out: '126' }]

    const in_out_limit_temp = [
      { int: '10', out: '5.1' },
      { int: '120', out: '125' },
      { int: '130', out: '125.1' }]

    cy.wrap(true_temp).each(($el) => {
      cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })
      cy.get('#supply_post_heater_on_temperature_out').clear().type($el.out);
      cy.get('#supply_post_heater_on_temperature_in').clear().type($el.int);
      cy.get('#block_supply_post_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('not.have.attr', 'disabled')

      cy.intercept('calculate').as('postcalc');
      cy.get('#automatic_calculate-submit').click({ force: true }).wait(1000)
      cy.wait('@postcalc').its('response.statusCode').should('not.eq', 500)
      //cy.checkTitle();
    })
    cy.wrap(false_temp).each(($el) => {
      cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })
      cy.get('#supply_post_heater_on_temperature_out').clear().type($el.out);
      cy.get('#supply_post_heater_on_temperature_in').clear().type($el.int);
      cy.get('#block_supply_post_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('temperature must be in').should('exist');
    })
    cy.wrap(in_out_limit_temp).each(($el) => {
      cy.get('select[id="supply_post_heater_on_type"]').select('water', { force: true })
      cy.get('#supply_post_heater_on_temperature_out').clear().type($el.out);
      cy.get('#supply_post_heater_on_temperature_in').clear().type($el.int);
      cy.get('#block_supply_post_heater').click({ force: true })
      cy.get('#automatic_calculate-submit').should('have.attr', 'disabled')
      cy.get('#form-errors').should('not.be.empty').find('li').contains('Out of limit').should('exist');
    })

  })

 


})