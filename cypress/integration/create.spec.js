describe("Renderizar en la pagina Home", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  it("create test custom", () => {
    cy.visit("/");
  });
});
