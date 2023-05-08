describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Camina Drummer',
      username: 'Drummer1',
      password: 'beltalowda'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')

  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('This note is not saved')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    //can also find via the classname of error message
    cy.get('.error').contains('Wrong credentials')
    //or through the "should" syntax. Should creates an assertion. Assertions are auto retried until they pass or time out. Allow for more diverse tests than contains which works based on text content only
    cy.get('.error').should('contain', 'Wrong credentials')
    //for example, with should we can check that the error message is red and has a border. Cypress requires colors to be given as rgb.
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
    //for same component, can chain them using and
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    //get html practically means the visible content of the entire application
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('Drummer1')
    cy.get('#password').type('beltalowda')
    cy.get('#login-button').click()
    cy.contains('Camina Drummer logged in')

  })

  describe('when Logged in', function() {
    beforeEach(function() {
      //instead of logging in using the UI, bypass it and login with HTTP requiest as this is much faster.
      //uses a custom command found in cypress/support/commands.js
      cy.login({ username: 'Drummer1', password: 'beltalowda' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      //as page only contains one input can usee .get('input') to get it.
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        //use custom commmand to create a note
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function () {
        // cy.contains('another note cypress')
        //   .contains('make not important')
        //   .click()
        cy.contains('another note cypress')
          .parent().find('button').should('contain', 'make not important').click()

        cy.contains('another note cypress')
          .parent().find('button').should('contain', 'make important')
        // cy.contains('another note cypress')
        //   .contains('make important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })

      })

      it('one of those can be made important', function () {
        //chaining here makes sure we click the correct button.
        //note if we add a span around content, it will break the test as it now won't be able to find the related button. To fix this we use .parent().find('button').click()
        // cy.contains('second note')
        //   .contains('make important')
        //   .click()

        //this method gets rid of any duplication expreienced in previous method.
        //first line finds the correction button and uses as to save it as theButton.
        //then the following lines can use the anmed element with cy.get('@theButton')
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')


        // cy.contains('second note').parent().find('button').click()

        // cy.contains('second note')
        //   .parent().find('button').should('contain', 'make not important')

      })
    })
  })


})