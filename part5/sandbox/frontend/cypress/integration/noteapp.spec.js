const api = "http://localhost:3000/api";
const host = "http://localhost:3001";

// https://docs.cypress.io/api/commands/should.html#Syntax

Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", `${api}/login/`, { username, password }).then(
    ({ body }) => {
      console.log(body);
      localStorage.setItem("user", JSON.stringify(body));
    }
  );
});

describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${api}/test/clear`);
    cy.request("POST", `${api}/test/populate`);
    cy.visit(host);
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("login");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#newuser").find("#name").should("be.visible");
    cy.get("#newuser").find("#username").should("be.visible");
    cy.get("#newuser").find("#password").should("be.visible");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      // cy.contains("login").click();
      // cy.get("#username").type("test");
      // cy.get("#password").type("password");
      // cy.get("#login").click();
      cy.login("test", "password");
      cy.visit(host);
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#newnote").find("input").type("a new note");
      cy.get("#newnote").find("button").click();
    });

    it("can change the importance of a note", function () {
      cy.contains("important").click();
      cy.get("#importanceToggle").contains("not important");
    });

    it("can logout", function () {
      cy.contains("logout", { matchCase: false }).as("logoutButton");
      cy.get("@logoutButton").click();
    });
  });

  describe("when failing to log in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("doesnotexist");
      cy.get("#password").type("wrongpassword");
      cy.get("#login").click();
    });

    it("displays an error message", function () {
      // cy.get(".error").contains("login failed").should("be.visible");
      cy.get(".error")
        .contains("login failed", { matchCase: false })
        .should("be.visible")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});
