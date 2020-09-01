const api = "http://localhost:3000/api";
const host = "http://localhost:3001";

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
      cy.contains("login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("password");
      cy.get("#login").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#newnote").find("input").type("a new note");
      cy.get("#newnote").find("button").click();
    });
  });
});
