const api = 'http://localhost:3000/api';
const app = 'http://localhost:3001';

// https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State
// https://docs.cypress.io/guides/references/best-practices.html#Using-after-or-afterEach-hooks

Cypress.Commands.add('containsIgnoreCase', (content) => {
  cy.contains(content, { matchCase: false });
});

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', `${api}/login`, { username, password });
});

Cypress.Commands.add('logout', (username, password) => {
  // TODO
  cy.request('POST', `${api}/logout`, { username, password });
});

Cypress.Commands.add('testId', (id) => {
  return cy.get(`[data-testid="${id}"]`);
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${api}/test/clear`);
    cy.request('POST', `${api}/test/populate`);
    cy.clearLocalStorage();
    cy.visit(app);
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#login').within(() => {
        cy.get('#username').type('test');
        cy.get('#password').type('password');
        cy.get('button').click();
      });
    });

    it('can create a new entry', function () {
      cy.testId('newblog').within(() => {
        cy.testId('toggle').click();
        cy.get('form').within(() => {
          cy.get('#title').type('title');
          cy.get('#author').type('author');
          cy.get('#url').type('url');
          cy.testId('create').click();
        });
      });
    });

    it('can "like" an entry', function () {
      // 5.20
    });
  });

  it('poster of an entry can delete it', function () {
    // 5.21
  });

  it('entries are ordered by amount of "likes"', function () {
    // 5.22
  });
});
