const api = 'http://localhost:3000/api';
const app = 'http://localhost:3001';

// https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State
// https://docs.cypress.io/guides/references/best-practices.html#Using-after-or-afterEach-hooks
// https://docs.cypress.io/api/events/catalog-of-events.html#Window-Confirm

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

describe('front page', function () {
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

  describe('logging in', function () {
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

  // it('entries are ordered by amount of "likes"', function () {
  //   // 5.22
  // });
});

describe('when logged in', function () {
  beforeEach(function () {
    cy.request('POST', `${api}/test/clear`);
    cy.request('POST', `${api}/test/populate`);
    cy.request('POST', `${api}/test/populate`, {
      username: 'person',
      password: 'person',
    });
    cy.clearLocalStorage();
    cy.visit(app);
  });

  beforeEach(function () {
    cy.get('#login').within(() => {
      cy.get('#username').type('test');
      cy.get('#password').type('password');
      cy.get('button').click();
    });
  });

  // these next 2 tests fail if they're in the reverse order. something is not
  // right with cypress
  it('can "like" an entry', function () {
    cy.testId('blog-details')
      .first()
      .within(() => {
        cy.testId('toggle').click();
        cy.testId('likes').within(() => {
          cy.get('button').click();
        });
      });
  });

  it('can delete an entry', function () {
    cy.on('window:confirm', (content) => {
      expect(content).to.contain('Remove blog');
      return true; // click "yes"
    });

    cy.testId('blog-details')
      .first()
      .within(() => {
        cy.testId('toggle').click();
        cy.testId('delete').within(() => {
          cy.get('button').click();
        });
      });
  });

  it('cannot delete an entry that is not ours', function () {
    cy.testId('blog-details')
      .last()
      .within(() => {
        cy.testId('toggle').click();
        cy.testId('delete').should('not.exist');
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

    cy.get('#notification').should('be.visible').contains('Added');
  });
});
