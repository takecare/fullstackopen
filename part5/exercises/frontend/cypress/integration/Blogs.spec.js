const api = 'http://localhost:3001/api';
const app = 'http://localhost:3001';

Cypress.Commands.add('containsIgnoreCase', (content) => {
  cy.contains(content, { matchCase: false });
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request(`${api}/test/clear`);
    cy.request(`${api}/test/populate`);
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
    it('can login', function () {
      // 5.18
    });

    it('can fail login', function () {
      // 5.18
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
