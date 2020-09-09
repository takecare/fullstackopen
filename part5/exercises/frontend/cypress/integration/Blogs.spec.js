const api = 'http://localhost:3000/api';
const app = 'http://localhost:3001';

Cypress.Commands.add('containsIgnoreCase', (content) => {
  cy.contains(content, { matchCase: false });
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${api}/test/clear`);
    cy.request('POST', `${api}/test/populate`);
    cy.visit(app);
  });

  afterEach(function () {
    localStorage.clear();
  });

  it('front page can be opened', function () {
    cy.containsIgnoreCase('Blogs');
    cy.get('#login').within(() => {
      cy.get('#username').should('be.visible');
      cy.get('#password').should('be.visible');
    });
  });

  describe('login', function () {
    it('can fail login', function () {
      cy.get('#login').within(() => {
        cy.get('#username').type('wrong');
        cy.get('#password').type('wrong');
        cy.get('button').click();
      });

      cy.get('#notification')
        .contains('Could not login')
        .should('be.visible')
        .and('have.css', 'background-color', 'rgb(255, 238, 255)');
    });

    it('can login', function () {
      cy.get('#login').within(() => {
        cy.get('#username').type('test');
        cy.get('#password').type('password');
        cy.get('button').click();
      });
    });
  });

  it('create a new entry', function () {
    // 5.19
  });

  it('can "like" an entry', function () {
    // 5.20
  });

  it('poster of an entry can delete it', function () {
    // 5.21
  });

  it('entries are ordered by amount of "likes"', function () {
    // 5.22
  });
});

describe('Blog app', function () {
  //
});
