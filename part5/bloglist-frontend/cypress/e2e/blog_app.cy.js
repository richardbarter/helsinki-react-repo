describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'Drummer1',
      name: 'Camina Drummer',
      password: 'beltalowda'

    }
    const user2 = {
      username: 'Holden1',
      name: 'James Holden',
      password: 'earther'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
    cy.visit('')
  })
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('Login form is shown', function() {
    //click login button, then check if login form is visible.
    cy.contains('login').click()
    cy.contains('username')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'Drummer1', password: 'beltalowda' })
      cy.contains('Camina Drummer logged in')
    })

    it('fails with wrong credentials', function () {
      //when testing if username is wrong, cannot use the command login function because it results in 401.
      //cy.login({ username: 'noexists', password: 'Wrong' })
      cy.contains('login').click()
      cy.get('#username').type('fakedetails')
      cy.get('#password').type('incorrectPassword')
      cy.get('#login-btn').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Camina Drummer logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function() {
      //login as user 2, create a blog, logout > login as user 1 > create blogs, run tests.
      cy.login({ username: 'Holden1', password: 'earther' })
      const holdenBlog = {
        title: 'should not be deletable',
        author: 'holden author',
        url: 'google.com',
        likes: 25
      }
      cy.createBlog(holdenBlog)
      cy.logout()
      cy.login({ username: 'Drummer1', password: 'beltalowda' })

      const blog = {
        title: 'testing blog',
        author: 'testing author',
        url: 'google.com',
        likes: 52,
      }
      const blog2 = {
        title: 'another blog',
        author: 'another author',
        url: 'anotherurl.com',
        likes: 44,
      }
      cy.createBlog(blog2)
      cy.createBlog(blog)

    })

    it('A blog can be created', function() {
      const blog = {
        title: 'cypresstest blog',
        author: 'cypress author',
        url: 'cypress.com',
        likes: 43,
        user: '6458b3bffda03ba03c4aaff3'
      }
      cy.createBlog(blog)
    })

    it('a blog can be liked', function () {
      cy.contains('testing blog').parent().contains('view').click()
      cy.contains('testing blog').parent().find('.blog-like-btn').as('likesButton')
      cy.contains('testing blog').parent().find('.blog-likes').as('theLikes')
      cy.get('@theLikes').should('contain', 52)
      cy.get('@likesButton').click()
      cy.get('@theLikes').should('contain', 53)

    })

    it('a user that created a blog can delete it', function () {
      cy.contains('testing blog').parent().contains('view').click()
      cy.contains('remove')
      cy.contains('testing blog').parent().find('.delete-blog-btn').as('deleteButton')
      cy.get('@deleteButton').click()
      cy.get('html').should('not.contain', 'testing blog')

    })

    it('a user that did not create a blog cannot see the remove button', function () {
      cy.contains('should not be deletable')
      cy.contains('should not be deletable').parent().as('targetSection')
      cy.contains('should not be deletable').parent().contains('view').click()
      cy.get('@targetSection').should('not.contain', 'remove')

    })

    it('blogs are ordered according to likes. Ordered from most likes to least', function () {
      cy.get('.blog').eq(0).should('contain', 'testing blog')
      cy.get('.blog').eq(1).should('contain', 'another blog')
      cy.get('.blog').eq(2).should('contain', 'should not be deletable')
    })
  })
})